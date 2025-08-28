// lib/queries.ts

// ✅ Blog Posts
export const blogPostsQuery = `
  *[_type == "post"] | order(_createdAt desc){
    _id,
    title,
    slug,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    body
  }
`;

// ✅ Success Stories (for homepage + newly added section)
export const successStoriesQuery = `
  *[_type == "successStory"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    slug,
    overview,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "category": coalesce(category->title, category, "uncategorized"),
    homeImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`;

// ✅ Stories
export const storiesQuery = `
  *[_type == "story"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    slug,
    overview,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "category": coalesce(category->title, category, "uncategorized"),
    homeImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`;

// ✅ Single Success Story (detail page)
export const newlyAddedStoriesQuery = `
  *[_type == "successStory" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "category": coalesce(category->title, category, "uncategorized"),
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

// ✅ Hero Section by Slug
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


// ✅ Success Stories V2 (for homepage or listing)
export const successStoriesV2Query = `
  *[_type == "successStoryVersion2"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    slug,
    overview,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "category": coalesce(category->title, category, "uncategorized"),
    homeImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`;

// ✅ Single Success Story V2 (detail page)
export const singleSuccessStoryV2Query = `
  *[_type == "successStoryVersion2" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "category": coalesce(category->title, category, "uncategorized"),
    homeImage {
      asset->{
        _id,
        url
      },
      alt
    },
    // include fields you need for V2 (deploymentFeatures, etc.)
  }
`;

// ✅ Hero Section V2 by Slug
export const topHeroSectionV2BySlugQuery = (slug: string) => `
  *[_type == "successStoryVersion2" && slug.current == "${slug}"][0]{
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
