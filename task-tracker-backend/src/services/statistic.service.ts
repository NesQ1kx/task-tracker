import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStatisticItemDto } from "src/dto/create-statistic-item.dto";
import { Statistic, StatisticDocument } from "src/schemas/statistic.schema";
import { AuthService } from "./auth.service";

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel('statistics') private statiscticsModel: Model<StatisticDocument>,
    private authService: AuthService,
    ) {}

  public async createStatisticItem(item: CreateStatisticItemDto): Promise<void> {
    const createdItem = new this.statiscticsModel({
      ...item,
    });

    await createdItem.save();
  }

  public async getUserItems(authToken: string): Promise<Statistic[]> {
    const userEmail = this.authService.decode(authToken);
    return this.statiscticsModel.find({ userEmail });
  }
}