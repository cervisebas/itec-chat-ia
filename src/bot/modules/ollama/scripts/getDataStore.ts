import path from 'path';
import fs from 'fs';

export async function getDataStore(folder_path: string): Promise<string> {
  console.log(folder_path);

  if (!fs.existsSync(folder_path)) {
    return '';
  }

  const dir = fs.readdirSync(folder_path, {
    withFileTypes: true,
  });
  const files: string[] = [];

  for (const file of dir) {
    const isTextPlain = file.name.includes('.txt');
    console.log(`Scan -> ${file.name} - ${isTextPlain ? 'yes' : 'no'}`);

    if (file.isFile() && isTextPlain) {
      files.push(path.resolve(folder_path, file.name));
    }
  }

  if (!files.length) {
    return '';
  }

  let text = '';

  for (const file of files) {
    text += '\n\n\n' + fs.readFileSync(file, 'utf-8');
  }

  return text;
}
