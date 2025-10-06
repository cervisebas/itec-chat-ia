import mime from 'mime';
import path from 'path';
import fs from 'fs';

export async function getDataStore(folder: string): Promise<string> {
  const folder_path = folder;

  if (!fs.existsSync(folder_path)) {
    return '';
  }

  const dir = fs.readdirSync(folder_path, { withFileTypes: true });
  const files: string[] = [];

  for (const file of dir) {
    const isTextPlain = mime.getType(file.name) === 'text/plain';

    if (file.isFile() && isTextPlain) {
      files.push(path.resolve(file.parentPath, file.name));
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
