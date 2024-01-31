export interface Anthem {
  id: number;
  title: string;
}

export interface Verse {
  id: number;
  verse: string;
  order: number;
  isChorus: boolean;
  anthemId: number;
}

export interface Topic {
  id: number;
  title: string;
}
