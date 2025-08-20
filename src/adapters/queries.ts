export const pagesQuery = `
  *[_type == "pages"]{
    title,
    description,
    "slug": slug.current,
    "image": image.asset -> url
  }
`;

export const dictionaryQuery = `
  *[_type == "dictionary"]{
      title,
      phrase,
  }
`;

export const airportsQuery = `
  *[_type == "airports"]{
      title,
      iata,
      city,
      country,
      description,
      "image": image.asset -> url
  }
`;
