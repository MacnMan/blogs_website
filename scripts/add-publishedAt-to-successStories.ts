
import { createClient } from '@sanity/client';

// Initialize the Sanity client
const client = createClient({
  projectId: '3nk901p7',
  dataset: 'production', // or your dataset name
  apiVersion: '2023-01-01', // Use a safe API date
  token: 'skO86vV90P0bd7lu0BT4JEkMCAKIfiFcG2errj6GSb2FsUio5ASEL6JKoE2SshEa3vYqqQ5JOYbfPeRLSyrNHrBNtVns9NUMdqnY89R43W5IO6nwH67dWRiIs4MLV6mTnqi7yJDgGP8sNk7QBp2zMeH59GMbMJ6zxwMA37GiaMXODSYp3Lxr', // Needs write permissions
  useCdn: false,
});

async function migratePublishedAt() {
  const stories = await client.fetch(`*[_type == "successStory" && !defined(publishedAt)]{_id, _rev}`);

  console.log(`Found ${stories.length} stories without publishedAt`);

  for (const story of stories) {
    const publishedAt = new Date().toISOString();

    await client
      .patch(story._id)
      .set({ publishedAt })
      .commit();

    console.log(`✅ Set publishedAt for ${story._id}`);
  }

  console.log('Migration complete.');
}

migratePublishedAt().catch((err) => {
  console.error('Migration failed:', err);
});
