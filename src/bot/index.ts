import { Ollama } from './modules/ollama/Ollama';
import path from 'path';
import { Observable } from 'rxjs';

const assets_folder = path.resolve(__dirname, '..', 'bot', 'assets');

export class Bot {
  private model: string;
  private embedding_model: string;

  private ollama: Ollama;

  constructor(model: string, embedding_model: string) {
    this.model = model;
    this.embedding_model = embedding_model;

    this.ollama = new Ollama(
      path.resolve(assets_folder, 'info-folder'),
      path.resolve(assets_folder, 'info-folder'),
      this.model,
      this.embedding_model,
      path.resolve(assets_folder, 'prompt.system.txt'),
    );
  }

  public async init(): Promise<void> {
    await this.ollama.init();
  }

  public ask(message: string): Observable<string> {
    return new Observable<string>((susbcribe) => {
      (async () => {
        try {
          let text = '';

          const stream = await this.ollama.ask(message);
          for await (const chunk of stream) {
            if (chunk.answer) {
              text += chunk.answer;

              susbcribe.next(text);
            }
          }

          susbcribe.complete();
        } catch (error) {
          susbcribe.error(error);
        }
      })();
    });
  }
}
