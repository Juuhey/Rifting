import { SpellScalingPart } from '../interface/spellScaling.interface';

export function parseSpellCalculations(spellData: any) {
  const calculations = spellData.mSpellCalculations ?? {};

  return Object.entries(calculations).map(([name, calc]: any) => ({
    name,
    parts: parseCalculationParts(calc.mFormulaParts ?? []),
  }));
}


export function parseCalculationParts(parts: any[]): SpellScalingPart[] {
  return parts.map((part) => {
    if (part.mStat !== undefined) {
      return {
        type: 'Stat',
        stat: part.mStat,
        dataValue: part.mDataValue,
      };
    }

    if (part.mDataValue) {
      return {
        type: 'DataValue',
        dataValue: part.mDataValue,
      };
    }

    if (part.mNumber !== undefined) {
      return {
        type: 'Number',
        value: part.mNumber,
      };
    }

    return { type: 'Number', value: 0 };
  });
}