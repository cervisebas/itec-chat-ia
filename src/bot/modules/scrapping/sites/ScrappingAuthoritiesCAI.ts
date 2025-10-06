import axios from 'axios';
import { ScrappingExtracBase } from '../classes/ScrappingExtracBase';
import type { ScrappingExtract } from '../interfaces/ScrappingExtract';
import parse from 'node-html-parser';
import { ScrappingUtils } from '../constants/ScrappingUtils';

export class ScrappingAuthoritiesCAI
  extends ScrappingExtracBase
  implements ScrappingExtract
{
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public async extract() {
    const { data } = await axios.get(this.url);
    const document = parse(data);
    const main = document.querySelector('main');

    this.addContent(
      ScrappingUtils.REFERENCE(this.url, String(main?.innerText).trim()),
    );

    return this.content;
  }

  public getName(): string {
    return 'authorities-cai';
  }
}
