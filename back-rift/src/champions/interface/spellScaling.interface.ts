export interface SpellScalingPart {
  type: 'Stat' | 'DataValue' | 'Number';
  stat?: number;
  dataValue?: string;
  value?: number;
}
