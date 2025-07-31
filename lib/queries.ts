// lib/queries.ts
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
