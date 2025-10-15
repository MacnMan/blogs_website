const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-10-11',
  useCdn: false,
});

async function getAllDynamicPaths() {
  try {
    const results = await client.fetch(`{
      "posts": *[_type == "post"]{
        "slug": slug.current,
        "imageUrl": mainImage.asset->url
      },
      "blogSuccess": *[_type == "blogSuccess"]{
        "slug": slug.current,
        "imageUrl": mainImage.asset->url
      },
      "successStories": *[_type == "successStories"]{
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        "images": images[].asset->url,
        "videos": videos[].asset->url
      },
      "successStoriesVersion": *[_type == "successStoriesVersion"]{
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        title,
        "images": coalesce(images[].asset->url, []),
        "videos": coalesce(videos[].asset->url, []),
        "content": content[]{
          ...,
          _type == "image" => {
            "url": asset->url
          }
        }
      }
    }`);

    const urls = [];

    // Add static routes
    urls.push({
      loc: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0
    });

    // Add main sections
    ['blog-success-story', 'blogs'].forEach(section => {
      urls.push({
        loc: `/${section}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      });
    });

    // Process posts
    if (results.posts) {
      results.posts.forEach(post => {
        if (!post.slug) return;
        
        const url = {
          loc: `/post/${post.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7
        };

        if (post.imageUrl) {
          url.images = [{
            loc: post.imageUrl,
            title: post.title || 'Blog post image'
          }];
        }

        urls.push(url);
      });
    }

    // Process blog success stories
    if (results.blogSuccess) {
      results.blogSuccess.forEach(story => {
        if (!story.slug) return;

        const url = {
          loc: `/blog-success-story/${story.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7
        };

        if (story.imageUrl) {
          url.images = [{
            loc: story.imageUrl,
            title: story.title || 'Blog success story image'
          }];
        }

        urls.push(url);
      });
    }

    // Process success stories
    if (results.successStories) {
      results.successStories.forEach(story => {
        if (!story.slug) return;

        const url = {
          loc: `/success-stories/${story.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7
        };

        const images = [];
        
        if (story.imageUrl) {
          images.push({
            loc: story.imageUrl,
            title: story.title || 'Success story main image'
          });
        }

        if (story.images) {
          story.images.forEach(imageUrl => {
            if (imageUrl) {
              images.push({
                loc: imageUrl,
                title: 'Success story image'
              });
            }
          });
        }

        if (images.length > 0) {
          url.images = images;
        }

        if (story.videos) {
          url.videos = story.videos
            .filter(Boolean)
            .map(videoUrl => ({
              content_loc: videoUrl,
              title: 'Success story video',
              thumbnail_loc: videoUrl.replace(/\.[^/.]+$/, '_thumb.jpg')
            }));
        }

        urls.push(url);
      });
    }

    // Process success stories versions
    if (results.successStoriesVersion) {
      results.successStoriesVersion.forEach(version => {
        if (!version.slug) return;

        const url = {
          loc: `/blogs/success-stories-version/${version.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.7
        };

        const images = [];

        // Add main image
        if (version.imageUrl) {
          images.push({
            loc: version.imageUrl,
            title: version.title || 'Success story version image'
          });
        }

        // Add images from content
        if (version.images && version.images.length > 0) {
          version.images.forEach(imageUrl => {
            if (imageUrl) {
              images.push({
                loc: imageUrl,
                title: `${version.title || 'Success story'} - Additional image`
              });
            }
          });
        }

        // Add images from rich content
        if (version.content) {
          version.content.forEach(block => {
            if (block._type === 'image' && block.url) {
              images.push({
                loc: block.url,
                title: block.alt || `${version.title || 'Success story'} - Content image`
              });
            }
          });
        }

        if (images.length > 0) {
          url.images = images;
        }

        // Add videos
        if (version.videos && version.videos.length > 0) {
          url.videos = version.videos.map(videoUrl => ({
            content_loc: videoUrl,
            title: `${version.title || 'Success story'} - Video`,
            thumbnail_loc: videoUrl.replace(/\.[^/.]+$/, '_thumb.jpg')
          })).filter(Boolean);
        }

        urls.push(url);
      });
    }

    return urls;
  } catch (error) {
    console.error('Error fetching dynamic paths:', error);
    return [];
  }
}

module.exports = {
  siteUrl: 'https://www.macnman.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 1.0,
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.7
    }
  },
  additionalPaths: async (config) => {
    const paths = await getAllDynamicPaths();
    return paths;
  }
};







// next-sitemap.config.js
// next-sitemap.config.js
// const { createClient } = require('@sanity/client');

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: '2025-10-11',
//   useCdn: false,
// });

// async function getAllDynamicPaths() {
//   try {
//     const results = await client.fetch(`{
//       "posts": *[_type == "post"]{ "slug": slug.current },
//       "blogSuccess": *[_type == "blogSuccess"]{ "slug": slug.current },
//       "successStories": *[_type == "successStories"]{ "slug": slug.current },
//       "successStoriesVersion": *[_type == "successStoriesVersion"]{ "slug": slug.current }
//     }`);

//     const urls = [];

//     // Blog posts
//     results.posts?.forEach((post) => {
//       if (post.slug) urls.push(`/blogs/${post.slug}`);
//     });

//     // Blog success stories
//     results.blogSuccess?.forEach((story) => {
//       if (story.slug) urls.push(`/blogs/blog-success-story/${story.slug}`);
//     });

//     // Success stories
//     results.successStories?.forEach((story) => {
//       if (story.slug) urls.push(`/blogs/success-stories/${story.slug}`);
//     });

//     // Success stories versions
//     results.successStoriesVersion?.forEach((version) => {
//       if (version.slug) urls.push(`/blogs/success-stories-version/${version.slug}`);
//     });

//     return urls;
//   } catch (err) {
//     console.error('Error fetching dynamic paths:', err);
//     return [];
//   }
// }

// module.exports = {
//   siteUrl: 'https://www.macnman.in',
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   changefreq: 'weekly',
//   priority: 0.7,
//   transform: async (config, path) => {
//     // path can be string (from additionalPaths) or object
//     return {
//       loc: typeof path === 'string' ? path : path.loc,
//       lastmod: new Date().toISOString(),
//       changefreq: 'weekly',
//       priority: 0.7,
//     };
//   },
//   additionalPaths: async (config) => {
//     const paths = await getAllDynamicPaths();
//     return paths;
//   },
// };















// // next-sitemap.config.js
// const { getAllDynamicPaths } = require('./sanity-sitemap');

// module.exports = {
//   siteUrl: 'https://www.macnman.in',  // your main domain
//   generateRobotsTxt: true,
//   sitemapSize: 5000, // optional, splits sitemap if too big
//   changefreq: 'weekly',
//   priority: 0.7,
  
//   // transform paths into proper sitemap format
//   transform: async (config, path) => {
//     return {
//       loc: path.startsWith('http') ? path : `${config.siteUrl}${path}`,
//       lastmod: new Date().toISOString(),
//       changefreq: path === '/' ? 'daily' : 'weekly',
//       priority: path === '/' ? 1.0 : 0.7,
//     };
//   },

//   // add dynamic paths from Sanity CMS
//   additionalPaths: async (config) => {
//     const dynamicPaths = await getAllDynamicPaths();

//     // map dynamic paths to sitemap format
//     return dynamicPaths.map((path) => ({
//       loc: `${config.siteUrl}${path}`,
//       lastmod: new Date().toISOString(),
//       changefreq: 'weekly',
//       priority: 0.7,
//     }));
//   },
// };
