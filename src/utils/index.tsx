import anthems from '../data/anthems.json';
import indexes from '../data/indexes.json';

export const normalize = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const searchAnthems = (searchQuery: string, index: number = -1) => {
  if (searchQuery) {
    return anthemsByIndex(index).filter(anthem => {
      return (
        anthem.id === parseInt(searchQuery, 10) ||
        normalize(anthem.title)
          .toLowerCase()
          .includes(normalize(searchQuery).toLowerCase())
      );
    });
  }
  return anthemsByIndex(index);
};

export const anthemsByIndex = (index: number) => {
  if (index === -1) {
    return anthems;
  }

  return anthems.filter(anthem => indexes[index].anthems.includes(anthem.id));
};
