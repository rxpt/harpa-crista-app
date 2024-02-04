export interface Anthem {
  id: number;
  title: string;
  verses: Verse[];
}

export interface Verse {
  sequence: number;
  lyrics: string;
  chorus: boolean;
}

export interface Topic {
  id: number;
  title: string;
}
