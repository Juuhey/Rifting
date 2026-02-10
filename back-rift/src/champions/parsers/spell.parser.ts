import { ParsedSpell } from '../interface/spell.interface';
import { inferSlot } from '../helpers/infer-slot.helper';
import { safeGet } from '../helpers/safe-get.helper';
import { parseDataValues } from './data-values.parser';
import { parseSpellCalculations } from './spell-calculation.parser';

function isWrapperName(name: string | null | undefined) {
  if (!name) return false;
  const s = name.toLowerCase();
  return /wrapper|cast|dummy|proxy|ghost|placeholder/.test(s);
}

function isUsefulSpell(spellData: any, spellPath?: string): boolean {
  if (!spellData) return false;

  const hasData =
    (spellData.DataValues?.length ?? 0) > 0 ||
    Object.keys(spellData.mSpellCalculations ?? {}).length > 0;

  const scriptName = spellData.mScriptName ?? '';
  const pathName = spellPath ?? '';
  const isWrapper = isWrapperName(scriptName) || isWrapperName(pathName) || isWrapperName(spellData.mName);

  return hasData && !isWrapper;
}

function parseSpellFromPath(
  json: Record<string, any>,
  spellPath: string,
  abilityPath: string,
  variantIndex?: number | null,
): ParsedSpell | null {
  const spellObject = json[spellPath];
  const spellData = spellObject?.mSpell;
  if (!isUsefulSpell(spellData, spellPath)) return null;

  const canonicalName = (spellPath?.toString().split('/')?.pop() as string) ?? null;

  const scriptName = spellData?.mScriptName ?? '';
  const isWrapper = isWrapperName(scriptName) || isWrapperName(spellPath) || isWrapperName(spellData?.mName);

  return {
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

    rootSpell: spellPath,
    abilityPath,
    isWrapper,
    variantIndex: variantIndex ?? null,
    canonicalName,
  };
}

export function parseAbility(
  json: Record<string, any>,
  abilityPath: string,
) {
  const abilityObject = json[abilityPath];
  if (!abilityObject) return null;

  const rootSpell = safeGet(abilityObject.mRootSpell);
  const childSpells = safeGet(abilityObject.mChildSpells) ?? [];

  const spells: ParsedSpell[] = [];

  // Root spell (treat as variantIndex 0)
  if (rootSpell) {
    const parsed = parseSpellFromPath(json, rootSpell, abilityPath, 0);
    if (parsed) spells.push(parsed);
  }

  // Child spells (Q2, Q3, Hwei variants, etc.) — keep their variant index
  for (let i = 0; i < childSpells.length; i++) {
    const childPath = childSpells[i];
    const parsed = parseSpellFromPath(json, childPath, abilityPath, i + 1);
    if (parsed) spells.push(parsed);
  }

  if (spells.length === 0) return null;

  // detect combinatorial systems (e.g., Hwei 3x3 => 9 child spells)
  const isCombinatorial = (childSpells?.length ?? 0) > 6;

  return {
    path: abilityPath,
    rootSpell,
    childSpells,
    spells,
    isCombinatorial,
  };
}
