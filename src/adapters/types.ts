export interface Page {
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  slug: string;
  description: {
    en: string;
    ru: string;
    fi: string;
  };
  image?: string | null;
}
export interface Airport {
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  iata: string;
  city: {
    en: string;
    ru: string;
    fi: string;
  };
  country: {
    en: string;
    ru: string;
    fi: string;
  };
  description?: {
    en: string;
    ru: string;
    fi: string;
  };
  image?: string | null;
}

export interface Dictionary {
  title: string;
  phrase: {
    en: string;
    ru: string;
    fi: string;
  };
}
