export interface ScrappingExtract {
  extract(): Promise<string>;
  getName(): string;
}
