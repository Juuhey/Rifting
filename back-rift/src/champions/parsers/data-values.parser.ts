export function parseDataValues(spellData: any) {
  return (spellData.DataValues ?? []).map((dv: any) => ({
    name: dv.mName,
    values: dv.mValues ?? [],
  }));
}
