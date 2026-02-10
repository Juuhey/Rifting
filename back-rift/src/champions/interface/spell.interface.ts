import { SpellScalingPart } from './spellScaling.interface';

export interface ParsedSpell {
  slot: 'P' | 'Q' | 'W' | 'E' | 'R';

  nameKey: string | null;
  tooltipKey: string | null;

  icon: string | null;

  cooldown: number[] | null;
  range: number[] | null;

  dataValues: {
    name: string;
    values: number[];
  }[];

  scalings: {
    name: string;
    parts: SpellScalingPart[];
  }[];

  /** The id/key of the root spell object this ParsedSpell was created from (may be null) */
  rootSpell: string | null;

  /** The ability path in the champion data that produced this spell (e.g. 'Characters/Aatrox/.../Ability1') */
  abilityPath: string;

  /** Whether this parsed entry looks like a wrapper/cast/dummy helper that should be ignored for tooltips */
  isWrapper?: boolean;

  /** If this spell is one variant of a multi-variant ability, the variant index (0-based) */
  variantIndex?: number | null;

  /** A short canonical name derived from the spell path (last path segment) */
  canonicalName?: string | null;
}
