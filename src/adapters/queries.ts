export const pagesQuery = `
  *[_type == "pages"]{
    title,
    "slug": slug.current
  }
`