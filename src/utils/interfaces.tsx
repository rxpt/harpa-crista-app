interface ObjectId {
  $oid: string;
}

export interface Anthem {
  _id: ObjectId;
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
  _id: ObjectId;
  title: string;
  data: number[]; // Array of anthem ids
}
