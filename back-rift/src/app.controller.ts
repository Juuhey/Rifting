import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ChampionService } from './champions/services/champion.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly championService: ChampionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('champion/:name')
  async getChampion(@Param('name') championName: string) {
    return this.championService.getChampion(championName);
  }

}
