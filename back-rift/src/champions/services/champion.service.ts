import { Injectable } from '@nestjs/common';
import { CommunityDragonService as CDragonService } from '../../cdragon/communitydragon.service';
import { parseChampion } from '../parsers/champion.parser';

@Injectable()
export class ChampionService {
  constructor(private readonly cdragon: CDragonService) {}

  async getChampion(championName: string) {
    const result = await this.cdragon.getChampionData(championName);
    if (!result || result.success === false) {
      throw new Error(
        `Impossible de récupérer les données pour ${championName}: ${result?.error ?? 'unknown'}`,
      );
    }

    const raw = result.data as Record<string, any>;
    return parseChampion(raw, result.champion);
  }
}
