export interface Country {
  flags: Flag;
  name: Name;
  tld: string[];
  currencies: {
    [key: string]: Currency;
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  borders: string[];
  population: number;
}

interface Flag {
  png: string;
  svg: string;
  alt: string;
}

interface NativeName {
  official: string;
  common: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: {
    [key: string]: NativeName;
  };
}

interface Currency {
  name: string;
  symbol: string;
}
