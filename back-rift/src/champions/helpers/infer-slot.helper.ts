import { ParsedSpell } from '../interface/spell.interface';

export function inferSlot(abilityPath: string): ParsedSpell['slot'] {
  if (abilityPath.includes('Passive')) return 'P';
  if (abilityPath.includes('QAbility')) return 'Q';
  if (abilityPath.includes('WAbility')) return 'W';
  if (abilityPath.includes('EAbility')) return 'E';
  if (abilityPath.includes('RAbility')) return 'R';
  return 'Q'; // fallback
}
