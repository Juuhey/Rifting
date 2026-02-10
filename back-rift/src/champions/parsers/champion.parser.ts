import { safeGet } from '../helpers/safe-get.helper';
import { ParsedChampion } from '../interface/champion.interface';
import { parseAbility } from './spell.parser';

export function parseChampion(
  json: Record<string, any>,
  championName: string,
): ParsedChampion {
  const rootPath = `Characters/${championName}/CharacterRecords/Root`;
  const root = json[rootPath];

  if (!root) {
    throw new Error(`Données introuvables pour ${championName}`);
  }

  const parsedStats = {
    baseHP: safeGet(root.baseHP),
    hpPerLevel: safeGet(root.hpPerLevel),

    baseAD: safeGet(root.baseDamage),
    adPerLevel: safeGet(root.damagePerLevel),

    baseArmor: safeGet(root.baseArmor),
    armorPerLevel: safeGet(root.armorPerLevel),

    baseMR: safeGet(root.baseSpellBlock),
    mrPerLevel: safeGet(root.spellBlockPerLevel),

    baseMS: safeGet(root.baseMoveSpeed),

    attackRange: safeGet(root.attackRange),

    attackSpeed: safeGet(root.attackSpeed),

    attackSpeedPerLevel: safeGet(root.attackSpeedPerLevel),
  };

  const parsedResource = {
    arType: safeGet(root.primaryAbilityResource?.arType),
  };

  const toolData = root.characterToolData ?? {};
  const parsedToolData = {
    searchTags: safeGet(toolData.searchTags)?.split(',') ?? null,
    searchTagsSecondary:
      safeGet(toolData.searchTagsSecondary)?.split(',') ?? null,
    championId: safeGet(toolData.championId),
    roles: safeGet(toolData.roles)?.split(',') ?? null,
    difficultyRank: safeGet(toolData.difficultyRank),
    purchaseIdentities: safeGet(root.purchaseIdentities),
  };

  const abilities: ParsedChampion['abilities'] = [];

  for (const abilityPath of root.mAbilities ?? []) {
    const ability = parseAbility(json, abilityPath);
    if (ability) abilities.push(ability as any);
  }

  return {
    name: root.mCharacterName,
    stats: parsedStats,
    resource: parsedResource,
    toolData: parsedToolData,
    abilities,
  };
}
