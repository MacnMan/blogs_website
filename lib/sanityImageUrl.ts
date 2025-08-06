// import imageUrlBuilder from '@sanity/image-url'
// // import { client } from './sanity.client'
// import { sanityClient } from './sanity.client'
// import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// const builder = imageUrlBuilder(sanityClient)

// export function urlFor(source: any) {
//   return builder.image(source)
// }



// lib/sanityImageUrl.ts
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity.client'; // your existing client

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
