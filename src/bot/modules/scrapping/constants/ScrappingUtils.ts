export const ScrappingUtils = {
  SEPARATOR: Array(160).fill('-').join(''),
  REFERENCE(link: string, content: string) {
    return `Enlace de referencia: ${link}\n\n${content}`;
  },
};
