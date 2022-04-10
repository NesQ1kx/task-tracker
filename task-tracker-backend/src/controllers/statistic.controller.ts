import { Controller, UseGuards, Get, Req, Res } from "@nestjs/common";
import { StatisticService } from "src/services/statistic.service";
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request, Response } from "express";

@Controller('/api/v1/statistic')
export class StatisticController {
  constructor(private statisitcService: StatisticService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async getStatistic(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<void> {
    const authToken = request.headers.authorization.split('Bearer ')[1].trim();
    const items = await this.statisitcService.getUserItems(authToken);

    response.json(items);
  }
}