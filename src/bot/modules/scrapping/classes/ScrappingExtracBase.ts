export class ScrappingExtracBase {
  private _content: string;

  constructor() {
    this._content = '';
  }

  public addContent(text: string | undefined) {
    if (text === undefined) {
      return;
    }

    this._content += '\n\n' + text;
  }

  public get content(): string {
    return this._content;
  }
}
