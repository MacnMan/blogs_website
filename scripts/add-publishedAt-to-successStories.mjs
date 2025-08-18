// import { createClient } from '@sanity/client';

// const client = createClient({
//   projectId: 'pdp3nq38',   // 👈 replace with your sanity.json or sanity.config
//   dataset: 'production',          // 👈 change if your dataset is not "production"
//   apiVersion: '2025-08-16',       // use today’s date or "2023-01-01"
//   useCdn: false,                  // `false` ensures fresh data
//   token: 'sk4QkCzSgbSlUZwLneuC20h2X2qNV4a1TEF5IiC9NmK53sspkZm7Wd0DTnzFmRYXE0C4xnhRCCAsRwz7CoAdgbF8BauAGo1fz8K06BmTErWv2wGDY2UV9Xo4vERMREGkkEpaQVCmL94LTY1jbWDeVEmgGxvQgbIMh5fIerWw5ylAENMX8LHU', // 👈 must have write access
// });

// async function addPublishedAt() {
//   const docs = await client.fetch(`*[_type == "successStory" && !defined(publishedAt)]{_id, title}`);

//   console.log(`Found ${docs.length} docs without publishedAt`);

//   for (const doc of docs) {
//     console.log(`Updating: ${doc.title} (${doc._id})`);

//     await client
//       .patch(doc._id)
//       .set({ publishedAt: new Date().toISOString() })
//       .commit();

//     console.log(`✅ Updated ${doc._id}`);
//   }

//   console.log("All done!");
// }

// addPublishedAt().catch((err) => {
//   console.error("❌ Error:", err);
//   process.exit(1);
// });


import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pdp3nq38',   // 👈 from sanity.config
  dataset: 'production',   // 👈 adjust if not production
  apiVersion: '2025-08-18', // 👈 today’s date or fixed schema date
  useCdn: false,
  token: 'sk4QkCzSgbSlUZwLneuC20h2X2qNV4a1TEF5IiC9NmK53sspkZm7Wd0DTnzFmRYXE0C4xnhRCCAsRwz7CoAdgbF8BauAGo1fz8K06BmTErWv2wGDY2UV9Xo4vERMREGkkEpaQVCmL94LTY1jbWDeVEmgGxvQgbIMh5fIerWw5ylAENMX8LHU', // 👈 must have write access
});

async function addPublishedAtAndCategory() {
  // Find docs where publishedAt or category is missing/null/empty
  const docs = await client.fetch(`
    *[_type == "successStory" && 
      (
        !defined(publishedAt) || publishedAt == null || publishedAt == "" ||
        !defined(category) || category == null || category == ""
      )
    ]{_id, title, publishedAt, category}
  `);

  console.log(`Found ${docs.length} docs to update`);

  for (const doc of docs) {
    console.log(`🔄 Updating: ${doc.title} (${doc._id})`);

    const patchData = {};

    // Set publishedAt if missing
    if (!doc.publishedAt) {
      patchData.publishedAt = new Date().toISOString();
    }

    // Set default category if missing
    if (!doc.category) {
      patchData.category = 'custom-development'; // 👈 pick a sensible default
    }

    if (Object.keys(patchData).length > 0) {
      await client.patch(doc._id).set(patchData).commit();
      console.log(`✅ Updated ${doc._id}`, patchData);
    }
  }

  console.log("🎉 All done!");
}

addPublishedAtAndCategory().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
