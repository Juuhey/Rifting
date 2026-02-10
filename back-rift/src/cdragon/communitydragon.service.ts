import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommunityDragonService {
  private readonly baseUrl = 'https://raw.communitydragon.org/latest/game/data';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Récupère les données d'un champion depuis CommunityDragon
   * @param championName Nom du champion (ex: 'aatrox')
   * @returns Les données en JSON du champion
   */
  async getChampionData(championName: string) {
    const url = `${this.baseUrl}/characters/${championName}/${championName}.bin.json`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return {
        success: true,
        champion: championName.charAt(0).toUpperCase() + championName.slice(1).toLowerCase(),
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        champion: championName,
        error: `Erreur lors de la récupération des données: ${error.message}`,
      };
    }
  }
}
