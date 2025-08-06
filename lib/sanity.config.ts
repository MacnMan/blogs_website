// sanity.config.ts

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,       // Replace with real Project ID from sanity.io/manage
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,              // Or whatever you selected during setup
  apiVersion: '2023-07-31',           // Use a fixed date (any recent date)
  useCdn: true,                       // Set to false for draft previews
}
