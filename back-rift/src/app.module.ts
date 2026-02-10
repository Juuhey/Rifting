import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunityDragonService } from './cdragon/communitydragon.service';
import { ChampionService } from './champions/services/champion.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, CommunityDragonService, ChampionService],
})
export class AppModule {}
