import type {
  OllamaFeedbackDatabase,
  OllamaFeedbackItem,
} from '../interfaces/OllamaFeedbackDatabase';
import { LocalStorage } from '../../localstorage/LocalStorage';
import path from 'path';

export class OllamaFeedback {
  private database: LocalStorage<OllamaFeedbackDatabase>;

  constructor(data_train_folder: string) {
    this.database = new LocalStorage(
      path.resolve(data_train_folder, 'feedback.json'),
    );
  }

  public async appendFeedback(item: OllamaFeedbackItem): Promise<void> {
    await this.database.initialize();

    await this.database.pushItem('items', item);
  }

  public async getFeedbackArray(): Promise<OllamaFeedbackItem[]> {
    await this.database.initialize();

    const items = this.database.getItem(
      'items',
    ) as never as OllamaFeedbackItem[];

    return items ?? [];
  }
}
