export interface Config {
  id: number;
  key: string;
  value: string;
}

export interface Anthem {
  id: number;
  title: string;
}

export interface Verse {
  id: number;
  verse: string;
  order: number;
  isChorus: boolean;
  idAnthem: number;
}
