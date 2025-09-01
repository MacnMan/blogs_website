// // queriesBlogSuccess.ts
// import { groq } from "next-sanity";


// export const allBlogSuccessPostsQuery = groq`
//   *[_type == "blogSuccessPost"] | order(publishedAt desc) {
//     _id,
//     title,
//     "slug": slug,
//     mainImage {
//       asset->{
//         _id,
//         url
//       },
//       alt
//     },
//     type,
//     category,
//     location,
//     publishedAt
//   }
// `


// // ✅ Single post with 4 sections
// export const blogSuccessPostBySlugQuery = groq`
//   *[_type == "blogSuccessPost" && slug.current == $slug][0]{
//     _id,
//     title,
//     "slug": slug,
//     mainImage {
//       asset->{
//         _id,
//         url
//       },
//       alt
//     },
//     type,
//     category,
//     location,
//     publishedAt,

//     sectionOne {
//       title,
//       description,
//       image {
//         asset->{
//           _id,
//           url
//         },
//         alt
//       }
//     },
//     sectionTwo {
//       title,
//       description,
//       image {
//         asset->{
//           _id,
//           url
//         },
//         alt
//       }
//     },
//     sectionThree {
//       title,
//       description,
//       image {
//         asset->{
//           _id,
//           url
//         },
//         alt
//       }
//     },
//     sectionFour {
//       title,
//       description,
//       image {
//         asset->{
//           _id,
//           url
//         },
//         alt
//       }
//     },

//     linksTitle,
//     exploreMore,
//     readMoreLink
//   }
// `;

// // ✅ Related posts (exclude current slug)
// export const relatedBlogSuccessPostsQuery = groq`
//   *[_type == "blogSuccessPost" && slug.current != $slug] | order(publishedAt desc)[0...3] {
//     _id,
//     title,
//     "slug": slug,
//     mainImage {
//       asset->{
//         _id,
//         url
//       },
//       alt
//     },
//     publishedAt
//   }
// `;



// queriesBlogSuccess.ts
import { groq } from "next-sanity";

// ✅ All blog success posts (list view)
export const allBlogSuccessPostsQuery = groq`
  *[_type == "blogSuccessPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    type,
    category,
    location,
    publishedAt,

    // 👇 include preview of sections so BlogSuccessList can show more than just title
    sectionOne {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    sectionTwo {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    sectionThree {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    sectionFour {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`

// ✅ Single post with all sections
export const blogSuccessPostBySlugQuery = groq`
  *[_type == "blogSuccessPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    type,
    category,
    location,
    publishedAt,

    sectionOne {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    sectionTwo {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    sectionThree {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    sectionFour {
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },

    linksTitle,
    exploreMore,
    readMoreLink
  }
`

// ✅ Related posts (small card previews)
export const relatedBlogSuccessPostsQuery = groq`
  *[_type == "blogSuccessPost" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt
  }
`
