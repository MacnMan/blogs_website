// lib/queries.ts
import groq from 'groq';

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
    introImage {
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
    introImage {
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
*[_type == "successStory"] | order(publishedAt desc)[0...6] {
  _id,
  title,
  slug,
  publishedAt,
  introImage {
    asset->{_ref, _id, url},
    alt
  }
}
`;

