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

export const routesQuery = `
  *[_type == "routes"]{
  _id,
    origin->{
    _id,
    iata,
    title,
    city,
    country
  },
  destination->{
    _id,
    iata,
    title,
    city,
    country
  },
    departureTime,
    arrivalTime,
    price
  }
`;

export const staticRouteQuery = `
  *[_type == "routes"]{
    _id,
  }
`;

export const flightQuery = `
  *[_type == "routes" && _id == $id][0]{
    _id,
    origin->{
      _id,
      iata,
      title,
      city,
      country
    },
    destination->{
      _id,
      iata,
      title,
      city,
      country
    },
    departureTime,
    arrivalTime,
    price
  }
`;

export const mealsQuery = `
  *[_type == "food"] 
  | order(_createdAt asc) {
    _id,
    title,
    "image": image.asset->url,
    isActive,
    ingredients[]->{
      _id,
      title,
      category[]->{
        _id,
        title
      }
    }
  }
`;

export const extrasQuery = `
  *[_type == "extras"]{
    _id,
    title,
    "image": image.asset -> url,
    isActive,
    description,
    price,
  }
`;
