import fs from 'fs';

export async function getSystemPrompt(
  ollama_system_prompt_file: string,
): Promise<string> {
  console.log(ollama_system_prompt_file);
  if (!fs.existsSync(ollama_system_prompt_file)) {
    return '';
  }

  return fs.readFileSync(ollama_system_prompt_file, 'utf-8') || '';
}
