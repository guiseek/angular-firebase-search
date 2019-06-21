import { SearchIndex } from '../interfaces';

export abstract class FirestoreSearch {
  protected createSearchIndexes?(text: string): SearchIndex {
    const termObj = {};
    const wordObj = {};
    let lastWordChar = '';
    text.toLowerCase().trim().split('').forEach((w) => {
      lastWordChar = lastWordChar + w;
      wordObj[lastWordChar] = true;
    });
    const terms = text.split(' ');
    terms.forEach((t) => {
      let lastTermChar = '';
      t.toLowerCase().split('').forEach((w) => {
        lastTermChar = lastTermChar + w.trim();
        termObj[lastTermChar] = true;
      });
    });
    return { ...termObj, ...wordObj };
  }
}
