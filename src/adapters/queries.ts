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
