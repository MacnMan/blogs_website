// // typesBlog.ts
// import { PortableTextBlock } from "@portabletext/types";

// export type SanityImage = {
//   asset: {
//     _id: string;
//     url: string;
//   };
//   alt?: string;
// };

// export type Section = {
//   title: string;
//   description: PortableTextBlock[];
//   image?: SanityImage;
// };

// export type BlogSuccessPost = {
//   conclusionTitle: any;
//   conclusionImage: any;
//   conclusionDescription: any;
//   allStories: any;
//   _id: string;
//   title: string;
//   slug: { current: string };
//   mainImage?: SanityImage;
//   type?: "article" | "news" | "case-study";
//   category?: "technology" | "innovation" | "smart-industry" | "smart-city" | "agriculture";
//   location?: string;
//   publishedAt: string;

//   // ✅ Four fixed sections
//   sectionOne?: Section;
//   sectionTwo?: Section;
//   sectionThree?: Section;
//   sectionFour?: Section;

//   // Links
//   linksTitle?: string;
//   exploreMore?: string;
//   readMoreLink?: string;
// };


import { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset: {
    _id: string;
    url: string;
  };
  alt?: string;
};

export type Section = {
  title: string;
  description: PortableTextBlock[];
  image?: SanityImage;
};

export type LinkSection = {
  linksTitle?: string;
  exploreMore?: string;
  readMoreLink?: string;
};

export type BlogSuccessPost = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  type?: "article" | "news" | "case-study";
  category?: "technology" | "innovation" | "smart-industry" | "smart-city" | "agriculture";
  location?: string;
  publishedAt: string;

  // Four fixed sections
  sectionOne?: Section;
  sectionTwo?: Section;
  sectionThree?: Section;
  sectionFour?: Section;

  // Links Section
  linksTitle?: string;
  exploreMore?: string;
  readMoreLink?: string;

  // Optional conclusion fields
  conclusionTitle?: string;
  conclusionImage?: SanityImage;
  conclusionDescription?: PortableTextBlock[];

  // Optional stories array
  allStories?: BlogSuccessPost[];
};
