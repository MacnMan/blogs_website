
// sanity-sitemap.mjs
import 'dotenv/config'; // loads .env or .env.local automatically
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2023-01-01',
  useCdn: false,
});

/**
 * Fetch all dynamic paths from Sanity for sitemap
 */
export async function getAllDynamicPaths() {
  try {
    console.log('🔍 [sanity-sitemap] env:', {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ? 'OK' : 'MISSING',
      SANITY_DATASET: process.env.SANITY_DATASET ? 'OK' : 'MISSING',
    });

    const query = `{
      "blogSuccessStory": *[_type == "blogSuccessPost" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _id, _type },
      "successStoriesVersion": *[_type == "successStoryVersion2" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _id, _type }
    }`;

    console.log('🔁 Running GROQ query...');
    const data = await client.fetch(query);

    console.log('🧾 Raw Sanity response summary:');
    console.log('  blogSuccessStory length:', data.blogSuccessStory?.length || 0);
    console.log('  successStoriesVersion length:', data.successStoriesVersion?.length || 0);

    if (data.blogSuccessStory?.length) {
      console.log('  example blogSuccessStory slugs:', data.blogSuccessStory.slice(0, 5).map(d => d.slug));
    }

    if (data.successStoriesVersion?.length) {
      console.log('  example successStoriesVersion slugs:', data.successStoriesVersion.slice(0, 5).map(d => d.slug));
    }

    const urls = [
      { loc: `/`, changefreq: 'weekly', priority: 0.9 },
      // { loc: `/success-stories`, changefreq: 'weekly', priority: 0.9 },
      { loc: `/blogs`, changefreq: 'weekly', priority: 0.9 },
      // { loc: `/success-stories/blogs`, changefreq: 'weekly', priority: 0.9 },
    ];

    data.blogSuccessStory?.forEach(story => {
      if (story?.slug) {
        urls.push({
          loc: `/blogs/${story.slug}`,
          // loc: `/success-stories/blogs/${story.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
        });
      }
    });

    data.successStoriesVersion?.forEach(story => {
      if (story?.slug) {
        urls.push({
          loc: `/success-stories-version/${story.slug}`,
          // loc: `/success-stories/success-stories-version/${story.slug}`,
          changefreq: 'weekly',
          priority: 0.8,
        });
      }
    });

    console.log(`✅ Total URLs produced for sitemap: ${urls.length}`);
    return urls.map(url => ({ ...url, lastmod: new Date().toISOString() }));
  } catch (err) {
    console.error('❌ Error in getAllDynamicPaths:', err?.message || err);
    return [];
  }
}

// Quick test when run directly
if (import.meta.url === process.argv[1] || import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const paths = await getAllDynamicPaths();
    console.log('--- sample returned paths ---');
    console.log(paths.slice(0, 20));
  })();
}


