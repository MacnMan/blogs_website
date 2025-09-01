"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogSuccessPost } from "@/types/typesBlog";

// ✅ Type for the props
type NewlyAddedBlogsProps = {
  blogs: BlogSuccessPost[];
};

// ✅ Utility to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NewlyAddedBlogs({ blogs }: NewlyAddedBlogsProps) {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 5); // Show latest 5 blogs

  return (
    <section className="rounded-3xl my-8 px-8">
      <h2 className="sm:text-3xl text-xl font-semibold sm:mb-8 mb-4">Newly Added Blogs</h2>

      <div className="md:gap-6 gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        {sortedBlogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blogs/blog-success-story/${blog.slug.current}`}
            className="rounded-xl sm:rounded-3xl shadow-sm transition bg-gray-100 overflow-hidden hover:shadow-md"
          >
            {/* Image */}
            {blog.mainImage?.asset && (
              <div className="w-full h-[150px] sm:h-[230px] relative overflow-hidden">
                <Image
                  src={blog.mainImage.asset.url}
                  alt={blog.mainImage.alt || blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Text Content */}
            <div className="p-2 sm:p-4">
              <h3 className="text-[12px] sm:text-sm font-semibold">{blog.title}</h3>

              {/* Category + Date */}
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs capitalize text-gray-600">
                  {blog.category || "No category"}
                </p>
                <p className="text-xs text-gray-500">
                  {blog.publishedAt ? formatDate(blog.publishedAt) : "No date"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
