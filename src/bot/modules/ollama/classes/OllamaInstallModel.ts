import { Ollama } from 'ollama';

const ollama = new Ollama();

export class OllamaInstallModel {
  public async checkInstalled(models: string[]): Promise<boolean> {
    let result = true;

    for (const model_item of models) {
      const { models } = await ollama.list();
      const find = models.find(({ model }) => model === model_item);

      if (find === undefined) {
        result = false;
      }
    }

    return result;
  }

  public async install(models: string[]): Promise<void> {
    for (const model of models) {
      console.clear();
      console.info(`Instalando modelo "${model}"`);

      const response = await ollama.pull({
        model: model,
        stream: true,
      });

      for await (const progress of response) {
        if (progress.status.includes('pulling')) {
          const stringProgress = (
            (progress.completed / progress.total) *
            100
          ).toFixed(2);

          console.clear();
          console.info(`Descargando modelo: ${stringProgress}%`);
          continue;
        }

        console.info(`Estado: ${progress.status}`);
      }
    }
  }
}
