// // lib/sanity.image.ts
// import imageUrlBuilder from '@sanity/image-url'
// import { sanityClient } from './sanity.client'

// const builder = imageUrlBuilder(sanityClient)

// export function urlFor(source: any) {
//   return builder.image(source).url()
// }


// build error of typescript and ESlint
// import imageUrlBuilder from '@sanity/image-url';
// import { sanityClient } from './sanity.client';

// const builder = imageUrlBuilder(sanityClient);
// export function urlFor(source: any) {
//   return builder.image(source);
// }


import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { sanityClient } from './sanity.client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Image | string) {
  return builder.image(source);
}
