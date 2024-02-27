import indexes from '../data/indexes.json';

// Interfaces
export interface IHistory {
  id: number;
  at: string;
}

export interface ObjectId {
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
export const objectId = (object: ObjectId) => object.$oid;

export const normalize = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const getIndexes = () => {
  return indexes as Indexes[];
};
