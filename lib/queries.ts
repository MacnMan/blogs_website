// lib/queries.ts
// import groq from 'groq';

export const blogPostsQuery = `
  *[_type == "post"] | order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
    body
  }
`;


// src/lib/queries.ts
export const successStoriesQuery = `
  *[_type == "successStory"]{
    _id,
    title,
    slug,
    overview,
    homeImage {
      asset->{
        _ref,
        _type,
        url
      },
      alt
    }
  }
`;


export const storiesQuery = `
  *[_type == "story"]{
    _id,
    title,
    slug,
    overview,
    homeImage  {
      asset->{
        _ref,
        _type,
        url
      },
      alt
    }
  }
`;


// lib/queries.ts
export const newlyAddedStoriesQuery = `
   *[_type == "successStory" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    category->{
      _id,
      title
    },
    homeImage {
      asset->{
        _id,
        url
      },
      alt
    },
    body
  }
`;





export const topHeroSectionBySlugQuery = (slug: string) => `
  *[_type == "successStory" && slug.current == "${slug}"][0]{
    topImage {
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      title,
      location
    }
  }
`;

