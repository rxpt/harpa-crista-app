import {sample, padStart} from 'lodash';
import anthems from '../data/anthems.json';
import indexes from '../data/indexes.json';
import {Anthem, Indexes} from './interfaces';

export const normalize = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const randomAnthem = () => sample(anthems) as Anthem;

export const anthemAudioURL = (id: number) => {
  return `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
    id.toString(),
    3,
    '0',
  )}.mp3`;
};

export const getAnthem = (id: number) => {
  return anthems.find(anthem => anthem.id === id) as Anthem;
};

export const getIndexes = () => {
  return indexes as Indexes[];
};

export const getAnthemIndexes = (id: number) => {
  return indexes.find(index => index.anthems.includes(id)) as Indexes;
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
    }) as Anthem[];
  }

  return anthemsByIndex(index) as Anthem[];
};

export const anthemsByIndex = (index: number) => {
  if (index === -1) {
    return anthems as Anthem[];
  }

  return anthems.filter(anthem =>
    indexes[index].anthems.includes(anthem.id),
  ) as Anthem[];
};
