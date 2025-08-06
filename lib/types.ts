// types.ts
export interface successStory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  overview?: string;
  introImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}


export interface story {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  overview?: string;
  introImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
}
