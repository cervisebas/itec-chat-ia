import axios from 'axios';
import { ScrappingExtracBase } from '../classes/ScrappingExtracBase';
import type { ScrappingExtract } from '../interfaces/ScrappingExtract';
import parse from 'node-html-parser';
import { ScrappingUtils } from '../constants/ScrappingUtils';

export class ScrappingStudentsExamTables
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

    let text = main?.innerText;
    for (const aEl of main?.querySelectorAll('a') ?? []) {
      text = text?.replace(
        aEl.innerText,
        aEl.innerText + ': ' + aEl.getAttribute('href'),
      );
    }

    this.addContent(ScrappingUtils.REFERENCE(this.url, String(text).trim()));

    return this.content;
  }

  public getName(): string {
    return 'students-exam-tables';
  }
}
