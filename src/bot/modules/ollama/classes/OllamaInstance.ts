import type { OllamaFeedbackItem } from '../interfaces/OllamaFeedbackDatabase';
import { ChatOllama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { OllamaInstanceVectors } from './OllamaInstanceVectors';

export class OllamaInstance {
  private systemPrompt: string;
  private model: string;

  private ollamaInstanceVectors: OllamaInstanceVectors;

  private retrievalChain?: Awaited<ReturnType<typeof createRetrievalChain>>;

  constructor(
    model: string,
    embedding_model: string,
    systemPrompt: string,
    dataStore: string,
    feeback: OllamaFeedbackItem[],
  ) {
    this.model = model;
    this.systemPrompt = systemPrompt;

    this.ollamaInstanceVectors = new OllamaInstanceVectors(
      embedding_model,
      dataStore,
      feeback,
    );
  }

  private async createRetrievalChain(): Promise<void> {
    const ollama = new ChatOllama({
      model: this.model,
      temperature: 0.0,
      keepAlive: '1h',
    });

    // Se obtienen los vectores de información
    await this.ollamaInstanceVectors.initialize();
    const combinedRetriever = this.ollamaInstanceVectors.getCombinedRetriever();

    // Plantilla para la pregunta al LLM
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', this.systemPrompt],
      ['human', '{input}'],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: ollama,
      prompt: prompt,
    });

    this.retrievalChain = await createRetrievalChain({
      combineDocsChain: combineDocsChain,
      retriever: combinedRetriever,
    });
  }

  public async ask(
    prompts: string[],
  ): ReturnType<Exclude<typeof this.retrievalChain, undefined>['stream']> {
    if (!this.retrievalChain) {
      console.clear();
      console.info('Initializing...');
      await this.createRetrievalChain();
    }

    return this.retrievalChain!.stream({
      input: prompts.at(-1)!,
    });
  }
}
