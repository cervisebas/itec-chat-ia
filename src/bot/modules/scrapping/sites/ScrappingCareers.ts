import axios from 'axios';
import { ScrappingExtracBase } from '../classes/ScrappingExtracBase';
import type { ScrappingExtract } from '../interfaces/ScrappingExtract';
import parse from 'node-html-parser';
import { ScrappingUtils } from '../constants/ScrappingUtils';
import { normalizeText } from '../../../common/utils/NormalizeText';

export class ScrappingCareers
  extends ScrappingExtracBase
  implements ScrappingExtract
{
  private url: string;
  private name: string;

  constructor(url: string) {
    super();
    this.url = url;
    this.name = '';
  }

  public async extract() {
    const { data } = await axios.get(this.url);
    const document = parse(data);
    const main = document.querySelector('main');

    this.name = document.querySelector('head title')?.innerText || '';
    this.name = this.name.replace('ISFT194 | ', '');
    this.name = normalizeText(this.name.toLowerCase());
    this.name = this.name.replace(/ /g, '-');
    this.name = this.name.trim();

    this.addContent(
      ScrappingUtils.REFERENCE(this.url, String(main?.innerText).trim()),
    );

    return this.content;
  }

  public getName(): string {
    return `career-${this.name}`;
  }
}
