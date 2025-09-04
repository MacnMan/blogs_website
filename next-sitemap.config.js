// next-sitemap.config.js

async function getDynamicBlogPaths() {
  const res = await fetch(
    'https://pdp3nq38.api.sanity.io/v2025-09-04/data/query/production?query=*[_type=="post"]{slug}'
  );
  const data = await res.json();
  return data.result.map(post => `/blogs/${post.slug.current}`);
}

module.exports = {
  siteUrl: 'https://www.macnman.com', // your production site URL
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 1.0,
  additionalPaths: async () => {
    const paths = await getDynamicBlogPaths();
    return paths.map(path => ({
      loc: path,
      changefreq: 'daily',
      priority: 0.9,
    }));
  },
};
