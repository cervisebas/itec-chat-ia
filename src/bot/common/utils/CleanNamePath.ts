const characters = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];

export function cleanNamePath(name: string): string {
  let clean = name;

  for (const character of characters) {
    clean = clean.replaceAll(character, '');
  }

  const namesReserved = [
    'CON',
    'PRN',
    'AUX',
    'NUL',
    'COM1',
    'COM2',
    'COM3',
    'COM4',
    'COM5',
    'COM6',
    'COM7',
    'COM8',
    'COM9',
    'LPT1',
    'LPT2',
    'LPT3',
    'LPT4',
    'LPT5',
    'LPT6',
    'LPT7',
    'LPT8',
    'LPT9',
  ];

  if (namesReserved.includes(clean.toUpperCase())) {
    clean = `_${clean}`;
  }

  return clean;
}
