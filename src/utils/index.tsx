import {sample, padStart} from 'lodash';
import anthems from '../data/anthems.json';
import indexes from '../data/indexes.json';
/* import colors from './colors';
import styles from './styles'; */

// Interfaces
interface ObjectId {
  $oid: string;
}

export interface IAnthem {
  _id: ObjectId;
  number: number;
  title: string;
  verses: IVerse[];
  author?: string;
}

export interface IVerse {
  sequence: number;
  lyrics: string;
  chorus: boolean;
}

export interface Indexes {
  _id: ObjectId;
  title: string;
  data: number[]; // Array of anthem ids
}

// Functions
export const objectId = (object: {$oid: string}) => object.$oid;

export const normalize = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const randomAnthem = () => sample(anthems) as IAnthem;

export const anthemAudioURL = (number: number) => {
  return `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
    number.toString(),
    3,
    '0',
  )}.mp3`;
};

export const getAnthem = (number: number) => {
  return anthems.find(anthem => anthem?.number === number) as IAnthem;
};

export const filterFavorites = (favorites: number[]) => {
  return anthems.filter(anthem =>
    favorites.includes(anthem?.number),
  ) as IAnthem[];
};

export const filterHistory = (history: number[]) => {
  return anthems.filter(anthem =>
    history.includes(anthem?.number),
  ) as IAnthem[];
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
    }) as IAnthem[];
  }

  return anthems as IAnthem[];
};

export const anthemsByIndex = (index?: number) => {
  if (!index) {
    return anthems as IAnthem[];
  }

  return anthems.filter(anthem =>
    indexes[index].data.includes(anthem?.number),
  ) as IAnthem[];
};

export const toggleFavorite = (favorites: number[], number: number) => {
  if (favorites.includes(number)) {
    return favorites.filter(favorite => favorite !== number);
  }

  return [...favorites, number];
};

export const isFavorite = (favorites: number[], number: number) => {
  return favorites.includes(number);
};

export const firstAndLastAnthemIds = () => {
  return {
    first: anthems[0].number,
    last: anthems[anthems.length - 1].number,
  };
};
