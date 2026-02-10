import { ParsedSpell } from '../interface/spell.interface';
import { inferSlot } from '../helpers/infer-slot.helper';
import { safeGet } from '../helpers/safe-get.helper';
import { parseSpellCalculations } from './spell-calculation.parser';
import { parseDataValues } from './data-values.parser';


export function parseSpells(
    json: Record<string, any>,
    root: any,
): ParsedSpell[] {
    const spells: ParsedSpell[] = [];

    for (const abilityPath of root.mAbilities ?? []) {
        const ability = json[abilityPath];
        if (!ability?.mRootSpell) continue;
        const spellObject = json[ability.mRootSpell];
        const spellData = spellObject?.mSpell;

        if (!spellData) continue;
        spells.push({
            slot: inferSlot(abilityPath),

            nameKey: safeGet(
                spellData.mClientData?.mTooltipData?.mLocKeys?.keyName,
            ),

            tooltipKey: safeGet(
                spellData.mClientData?.mTooltipData?.mLocKeys?.keyTooltip,
            ),

            icon: safeGet(spellData.mImgIconName?.[0]),

            cooldown: safeGet(spellData.cooldownTime),
            range: safeGet(spellData.castRange),

            dataValues: parseDataValues(spellData),
            scalings: parseSpellCalculations(spellData),
            rootSpell: safeGet(ability.mRootSpell),
            abilityPath: abilityPath,
        });
    }
    return spells;
}

      

