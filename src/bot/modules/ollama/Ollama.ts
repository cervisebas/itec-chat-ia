import { OllamaFeedback } from './classes/OllamaFeedback';
import { OllamaInstallModel } from './classes/OllamaInstallModel';
import { OllamaInstance } from './classes/OllamaInstance';
import { getDataStore } from './scripts/getDataStore';
import { getSystemPrompt } from './scripts/getSystemPrompt';

export class Ollama {
  private infoDataFolder: string;
  private models: string[];

  private instance?: OllamaInstance;
  private ollamaInstallModel: OllamaInstallModel;
  private ollamaFeedback: OllamaFeedback;

  private ollama_system_prompt_file: string;

  constructor(
    info_folder: string,
    feedback_folder: string,
    model: string,
    embedding_model: string,
    ollama_system_prompt_file: string,
  ) {
    this.ollamaFeedback = new OllamaFeedback(feedback_folder);
    this.ollamaInstallModel = new OllamaInstallModel();

    this.infoDataFolder = info_folder;
    this.models = [model, embedding_model];
    this.ollama_system_prompt_file = ollama_system_prompt_file;
  }

  public async init(): Promise<void> {
    console.log(`Iniciando ollama con modelo "${this.models[0]}"`);

    // Check Install models
    if (!(await this.ollamaInstallModel.checkInstalled(this.models))) {
      await this.ollamaInstallModel.install(this.models);
    }

    // Create instance
    this.instance = new OllamaInstance(
      this.models[0],
      this.models[1],
      await getSystemPrompt(this.ollama_system_prompt_file),
      await getDataStore(this.infoDataFolder),
      await this.ollamaFeedback.getFeedbackArray(),
    );
  }

  public async reinit(): Promise<void> {
    delete this.instance;
    await this.init();
  }

  public ask(
    prompt: string,
  ): ReturnType<Exclude<typeof this.instance, undefined>['ask']> {
    return this.instance!.ask([prompt]);
  }
}
