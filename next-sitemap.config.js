const { getAllDynamicPaths } = require('./sanity-sitemap');

module.exports = {
  siteUrl: 'https://www.macnman.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  transform: async (config, path) => ({
    loc: path.startsWith('http') ? path : `${config.siteUrl}${path}`,
    lastmod: new Date().toISOString(),
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
  }),

  additionalPaths: async (config) => {
    const sanityPaths = await getAllDynamicPaths();
    console.log(`🧩 Adding ${sanityPaths.length} Sanity dynamic paths...`);
    return sanityPaths;
  },
};
