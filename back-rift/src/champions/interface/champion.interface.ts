import { ParsedSpell } from './spell.interface';

export interface ParsedChampion {
  name: string;

  stats: {
    baseHP: number;
    hpPerLevel: number | null;
    baseAD: number;
    adPerLevel: number | null;
    baseArmor: number;
    armorPerLevel: number | null;
    baseMR: number;
    mrPerLevel: number | null;
    baseMS: number;
    attackRange: number;
    attackSpeed: number;
    attackSpeedPerLevel: number | null;
  };

  resource: {
    arType: number | null;
  };

  toolData: {
    searchTags: string[];
    searchTagsSecondary: string[];
    championId: number | null;
    roles: string[];
    difficultyRank: number | null;
    purchaseIdentities: string[];
  };

  abilities: {
    path: string;
    rootSpell: string | null;
    childSpells: string[] | null;
    spells: ParsedSpell[];
    /** When true, this ability contains a combinatorial set of spells (e.g., 3x3 variants). Consumer may choose how to aggregate. */
    isCombinatorial?: boolean;
  }[];
}
