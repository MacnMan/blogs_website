// // lib/sanity.image.ts
// import imageUrlBuilder from '@sanity/image-url'
// import { sanityClient } from './sanity.client'

// const builder = imageUrlBuilder(sanityClient)

// export function urlFor(source: any) {
//   return builder.image(source).url()
// }



import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity.client';

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}
