export interface Anthem {
  _id: object;
  number: number;
  title: string;
  verses: Verse[];
  author?: string;
}

export interface Verse {
  sequence: number;
  lyrics: string;
  chorus: boolean;
}

export interface Indexes {
  title: string;
  data: number[]; // Array of anthem ids
}
