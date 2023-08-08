type Mods = Record<string, boolean | string>;

/* 
cls - main class
mods - various modificators (eg. hovered, selected)
additional - array of additional classes
*/

export function classNames(cls: string, mods?: Mods, additional?: string[]): string {
  return [
    cls,
    ...additional.filter(Boolean),
    Object.keys(mods)
      .filter((key) => mods[key])
      .join(' '),
  ]
    .join(' ')
    .trim();
}
