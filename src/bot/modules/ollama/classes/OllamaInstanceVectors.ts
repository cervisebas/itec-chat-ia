import type { OllamaFeedbackItem } from '../interfaces/OllamaFeedbackDatabase';
import { OllamaEmbeddings } from '@langchain/ollama';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { EnsembleRetriever } from 'langchain/retrievers/ensemble';

export class OllamaInstanceVectors {
  private dataStore: string;
  private dataFeedback: OllamaFeedbackItem[];

  private embedding_model: string;

  private vectorStoreDocs?: MemoryVectorStore;
  private vectorStoreGoodFeedback?: MemoryVectorStore;
  private vectorStoreBadFeedback?: MemoryVectorStore;

  constructor(
    embedding_model: string,
    dataStore: string,
    dataFeedback: OllamaFeedbackItem[],
  ) {
    this.dataStore = dataStore;
    this.dataFeedback = dataFeedback;
    this.embedding_model = embedding_model;
  }

  private async createVectors(): Promise<void> {
    // ##### Data Vector #####
    const splitter = new CharacterTextSplitter({
      chunkSize: 2250,
      chunkOverlap: 100,
    });

    const docs = await splitter.createDocuments([this.dataStore]);
    const embeddings = new OllamaEmbeddings({
      model: this.embedding_model,
      keepAlive: '1h',
    });
    this.vectorStoreDocs = await MemoryVectorStore.fromDocuments(
      docs,
      embeddings,
    );

    // ##### Good Feedback Vector
    const feedbackGoodDocs = this.dataFeedback
      .filter((f) => f.like)
      .map((f) => ({
        pageContent: `Pregunta: ${f.question}\nRespuesta correcta: ${f.answer}`,
        metadata: {
          source: 'feedback',
          like: f.like,
        },
      }));

    this.vectorStoreGoodFeedback = await MemoryVectorStore.fromDocuments(
      feedbackGoodDocs,
      embeddings,
    );

    // ##### Bad Feedback Vector
    const feedbackBadDocs = this.dataFeedback
      .filter((f) => !f.like)
      .map((f) => ({
        pageContent: `Pregunta mal respondida: ${f.question}\nRespuesta mala: ${f.answer}\nRazon: ${f.reason}`,
        metadata: {
          source: 'feedback',
          like: f.like,
        },
      }));

    this.vectorStoreBadFeedback = await MemoryVectorStore.fromDocuments(
      feedbackBadDocs,
      embeddings,
    );
  }

  public getCombinedRetriever(): EnsembleRetriever {
    return new EnsembleRetriever({
      retrievers: [
        this.vectorStoreDocs!.asRetriever(),
        this.vectorStoreGoodFeedback!.asRetriever({
          k: 10,
          filter: (d) => d.metadata.like === false,
        }),
        this.vectorStoreBadFeedback!.asRetriever({
          k: 8,
          filter: (d) => d.metadata.like === false,
        }),
      ],
    });
  }

  async initialize(): Promise<void> {
    await this.createVectors();
  }
}
