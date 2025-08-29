// src/types/types.ts
import { ReactNode } from 'react';

// ✅ Avoid unused type
// Removed: type MyType (was unused)

// ✅ Strongly typed Sanity image type
export interface SanityImage {
  asset: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
}

export interface IconItem {
  icon?: SanityImage;
  title: string;
  description: string;
}

export interface ArchitectureComponent {
  label: string;
  description: string;
  icon?: SanityImage;
}

export interface ChallengeItem {
  title: string;
  description: string;
}

export interface ImpactItem {
  title: string;
  description: string;
}

export interface ValidationTest {
  title: string;
  description: string;
}

export interface SuccessStory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  category:
    | 'smart-industry'
    | 'smart-city'
    | 'smart-building'
    | 'smart-agriculture'
    | 'custom-development'
    | 'utilities';
  overview?: string;
  introImage?: SanityImage;

  // Problem Section
  problemTitle?: string;
  problemDescription?: string;
  problems?: IconItem[];

  // Solution Section
  solutionTitle?: string;
  solutionDescription?: string;
  solutionFeatures?: IconItem[];

  // Architecture Section
  architectureTitle?: string;
  architectureDiagram?: SanityImage;
  architectureDescription?: string;
  architectureComponents?: ArchitectureComponent[];

  // Deployment Section
  deploymentTitle?: string;
  deploymentDiagram?: SanityImage;
  deploymentDescription?: string;

  // Challenge Section
  challengeTitle?: string;
  challengeImages?: SanityImage[];
  challenges?: ChallengeItem[];

  // Impact Section
  impactTitle?: string;
  inspectImage?: SanityImage;
  impacts?: ImpactItem[];

  // Validation Section
  validationTitle?: string;
  validationImage?: SanityImage;
  tests?: ValidationTest[];

  // Conclusion Section
  conclusionTitle: string;
  conclusionDescription: string;
  conclusionImage?: SanityImage;

  // Links Section
  linksTitle?: string;
  exploreMore?: string;
  readMoreLink?: string;
}

// ✅ Section item type
export type SectionItem = {
  icon: SanityImage; // 👈 replaced `any` with `SanityImage`
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  layoutType: 'text' | 'image' | 'grid' | 'list';
  listItems?: ListItem[];
  gridImages?: GridImage[];
};

// ✅ Grid image type
export type GridImage = {
  asset: SanityImage['asset']; // 👈 use strict asset typing
  alt: string;
  image: string;
  caption?: string;
};

// ✅ List item with JSX support
export type ListItem = {
  title: ReactNode | Iterable<ReactNode>;
  description: ReactNode | Iterable<ReactNode>;
  text: string;
  icon?: string;
};
// types/deployment.ts
export interface DeploymentIcon {
  asset: {
    url: string;
  };
  alt?: string;
}

export interface DeploymentFeatureType {
  icon?: DeploymentIcon;
  title: string;
  description: string;
}

export interface DeploymentDiagram {
  asset: {
    url: string;
  };
  alt?: string;
}

export interface DeploymentData {
  deploymentTitle: string;
  deploymentDescription: string;
  deploymentFeatures: DeploymentFeatureType[];
  deploymentDiagram?: DeploymentDiagram;
}
