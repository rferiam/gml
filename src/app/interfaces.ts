export interface Address {
  organization?: string;
  address?: string;
  details?: string;
  city?: string;
  country?: string;
}

export interface Person {
  firstName?: string;
  lastName?: string;
  title?: string;
  charge?: string;
  address?: Address;
}

export enum Lang {
  spanish = "spanish",
  english = "english",
  french = "french",
  italian = "italian",
  german = "german"
}

export interface Letter {
  person: Person;
  lang: Lang | null;
  type: number | null;
}
