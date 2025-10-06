import axios from 'axios';
import { ScrappingExtracBase } from '../classes/ScrappingExtracBase';
import type { ScrappingExtract } from '../interfaces/ScrappingExtract';
import parse, { HTMLElement } from 'node-html-parser';
import { ScrappingUtils } from '../constants/ScrappingUtils';

export class ScrappingHome
  extends ScrappingExtracBase
  implements ScrappingExtract
{
  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  private getSocials(document: HTMLElement) {
    let text = document.querySelector('h2.titulo')?.innerText;

    for (const item of document.querySelectorAll('.servicio-ind')) {
      text += `\n\n
        ${item.querySelector('h3')?.innerText}\n
        ${item.querySelector('a')?.getAttribute('href')}
      `;
    }

    return text;
  }

  public async extract() {
    const { data } = await axios.get(this.url);

    const document = parse(data);

    this.addContent(document.querySelector('header h1')?.innerText);

    this.addContent(document.querySelector('.sobre-nosotros')?.innerText);

    this.addContent(document.querySelectorAll('.portafolio')[1]?.innerText);

    this.addContent(document.querySelector('.clientes.contenedor')?.innerText);

    this.addContent(this.getSocials(document));

    return ScrappingUtils.REFERENCE(this.url, String(this.content).trim());
  }

  public getName(): string {
    return 'home';
  }
}
