import axios from 'axios';
import { ScrappingExtracBase } from '../classes/ScrappingExtracBase';
import type { ScrappingExtract } from '../interfaces/ScrappingExtract';
import parse from 'node-html-parser';
import { ScrappingUtils } from '../constants/ScrappingUtils';

export class ScrappingStudentsResolutions
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

    const title = document.querySelector('h2.titulo');
    const content = document.querySelector('.contenido-textos');

    let text = title?.innerText + '\n\n' + content?.innerText;
    for (const aEl of content?.querySelectorAll('a') ?? []) {
      text = text?.replace(
        aEl.innerText,
        aEl.innerText + ': ' + aEl.getAttribute('href'),
      );
    }

    text = text?.replaceAll('Click Aquí para descargar ', '');

    this.addContent(ScrappingUtils.REFERENCE(this.url, String(text).trim()));

    return this.content;
  }

  public getName(): string {
    return 'students-resolutions';
  }
}
