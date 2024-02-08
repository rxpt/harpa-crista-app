export interface Anthem {
  id: number;
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
  id: number;
  title: string;
  anthems: number[]; // Array of anthem ids
}
