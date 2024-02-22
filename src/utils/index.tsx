import {sample, padStart} from 'lodash';
import anthems from '../data/anthems.json';
import indexes from '../data/indexes.json';
import {Anthem, Indexes} from './interfaces';

export const normalize = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const randomAnthem = () => sample(anthems) as Anthem;

export const anthemAudioURL = (number: number) => {
  return `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
    number.toString(),
    3,
    '0',
  )}.mp3`;
};

export const getAnthem = (number: number) => {
  return anthems.find(anthem => anthem?.number === number) as Anthem;
};

export const filterFavorites = (favorites: number[]) => {
  return anthems.filter(anthem =>
    favorites.includes(anthem?.number),
  ) as Anthem[];
};

export const filterHistory = (history: number[]) => {
  return anthems.filter(anthem => history.includes(anthem?.number)) as Anthem[];
};

export const getIndexes = () => {
  return indexes as Indexes[];
};

export const getAnthemIndexes = (number: number) => {
  return indexes.find(index => index.data.includes(number)) as Indexes;
};

export const searchAnthems = (searchQuery: string) => {
  if (searchQuery) {
    return anthems.filter(anthem => {
      return (
        anthem?.number === parseInt(searchQuery, 10) ||
        anthem?.number.toString().includes(searchQuery.trim()) ||
        normalize(anthem?.title)
          .toLowerCase()
          .includes(normalize(searchQuery).toLowerCase())
      );
    }) as Anthem[];
  }

  return anthems as Anthem[];
};

export const anthemsByIndex = (index?: number) => {
  if (!index) {
    return anthems as Anthem[];
  }

  return anthems.filter(anthem =>
    indexes[index].data.includes(anthem?.number),
  ) as Anthem[];
};

export const toggleFavorite = (favorites: number[], number: number) => {
  if (favorites.includes(number)) {
    return favorites.filter(favorite => favorite !== number);
  }

  return [...favorites, number];
};

export const firstAndLastAnthemIds = () => {
  return {
    first: anthems[0].number,
    last: anthems[anthems.length - 1].number,
  };
};
