import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CreateStatisticItemDto } from "src/dto/create-statistic-item.dto";
import { ConnectTracker, CreateJiraIssue, CreateTrelloIssue, RemoveTracker, Tracker } from "src/utils/types";
import { StatisticService } from "./statistic.service";
import { UserService } from "./user.service";

@Injectable()
export class TrackerService {
  private TRELLO_API_LINK: string = 'https://api.trello.com/1/';

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private statisticService: StatisticService) {}

  public async addTracker(payload: ConnectTracker): Promise<void> {
    await this.userService.addTracker(payload.userEmail, payload.tracker);
  }

  public async removeTracker(payload: RemoveTracker):  Promise<void> {
    await this.userService.removeTracker(payload.userEmail, payload.tracker);
  }

  public async getJiraProjects(payload: Tracker): Promise<{ data: any[] }> {
    const { attlasianEmail, apiToken, projectLink } = payload;
    const jiraLink = `${projectLink}rest/api/latest/project`;
    const authHeader = `Basic ${Buffer.from(`${attlasianEmail}:${apiToken}`).toString('base64')}`;
    return await this.httpService.get(jiraLink.toString(), {
      headers: {
        'Authorization': authHeader,
      }
    }).toPromise();
  }

  public async createJiraIssue(payload: CreateJiraIssue): Promise<any> {
    const { attlasianEmail, apiToken, projectLink } = payload;
    const jiraLink = `${projectLink}rest/api/latest/issue`;
    const authHeader = `Basic ${Buffer.from(`${attlasianEmail}:${apiToken}`).toString('base64')}`;

    await this.httpService.post(jiraLink.toString(), {
      fields: {
        project: {
          id: payload.projectId,
        },
        summary: payload.summary,
        description: payload.description,
        issuetype: {
          name: 'Story'
        }
      }
    }, {
      headers: {
        'Authorization': authHeader,
      }
    }).toPromise();
    await this.createStatisticItem(payload.userEmail.toString(), 'Jira');
  }

  public async getTrelloBoards(payload: Tracker): Promise<any> {
    const { apiToken, apiKey } = payload;
    const link = `${this.TRELLO_API_LINK}members/me/boards?key=${apiKey}&token=${apiToken}&lists=open`;

    return this.httpService.get(link).toPromise();
  }

  public async createTrelloIssue(payload: CreateTrelloIssue): Promise<any> {
    const { apiToken, apiKey } = payload;
    const link = `${this.TRELLO_API_LINK}cards?key=${apiKey}&token=${apiToken}&name=${payload.taskName}&desc=${payload.description}&idList=${payload.listId}`;

    await this.httpService.post(link).toPromise();
    await this.createStatisticItem(payload.userEmail.toString(), 'Trello');
  }

  private async createStatisticItem(userEmail: string, trackerName: string): Promise<void> {
    const item: CreateStatisticItemDto = {
      userEmail,
      trackerName,
      date: Date.now()
    }

    await this.statisticService.createStatisticItem(item);
  }
}