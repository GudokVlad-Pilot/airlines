export const pagesQuery = `
  *[_type == "pages"]{
    title,
    description,
    "slug": slug.current,
    "image": image.asset -> url
  }
`