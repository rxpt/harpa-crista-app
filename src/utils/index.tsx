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

export const anthemAudioURL = (id: number) => {
  return `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
    id.toString(),
    3,
    '0',
  )}.mp3`;
};

export const getAnthem = (id: number) => {
  return anthems.find(anthem => anthem?.id === id) as Anthem;
};

export const filterFavorites = (favorites: number[]) => {
  return anthems.filter(anthem => favorites.includes(anthem?.id)) as Anthem[];
};

export const filterHistory = (history: number[]) => {
  return anthems.filter(anthem => history.includes(anthem?.id)) as Anthem[];
};

export const getIndexes = () => {
  return indexes as Indexes[];
};

export const getAnthemIndexes = (id: number) => {
  return indexes.find(index => index.data.includes(id)) as Indexes;
};

export const searchAnthems = (searchQuery: string) => {
  if (searchQuery) {
    return anthems.filter(anthem => {
      return (
        anthem?.id === parseInt(searchQuery, 10) ||
        anthem?.id.toString().includes(searchQuery.trim()) ||
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
    indexes[index].data.includes(anthem?.id),
  ) as Anthem[];
};

export const toggleFavorite = (favorites: number[], id: number) => {
  if (favorites.includes(id)) {
    return favorites.filter(favorite => favorite !== id);
  }

  return [...favorites, id];
};

export const firstAndLastAnthemIds = () => {
  return {
    first: anthems[0].id,
    last: anthems[anthems.length - 1].id,
  };
};
