"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogSuccessPost } from "@/types/typesBlog";

// ✅ Type for the props
type NewlyAddedBlogsProps = {
  blogs: BlogSuccessPost[];
};

export default function NewlyAddedBlogs({ blogs }: NewlyAddedBlogsProps) {
  const sortedBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, 5); // Show latest 5 blogs

  return (
    <section className="rounded-3xl sm:mr-12 px-8">
      <h2 className="sm:text-3xl text-xl font-semibold sm:mb-8 mb-4 ml-4">
        Newly Added Blogs
      </h2>

      <div className="md:gap-12 gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2">
        {sortedBlogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blogs/${blog.slug.current}`}
            // href={`/blog-success-story/${blog.slug.current}`}
            className="rounded-xl sm:rounded-3xl transition overflow-hidden"
          >
            {/* Image */}
            {blog.mainImage?.asset && (
              <div className="w-full h-[170px] sm:h-[300px] relative overflow-hidden">
                {/* ✅ Mobile: taller image (200px), Laptop keeps 300px */}
                <Image
                  src={blog.mainImage.asset.url}
                  alt={blog.mainImage.alt || blog.title}
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            )}

            {/* Text Content */}
            <div className="p-2 sm:p-4">
              {blog.type && (
                <p className="text-[10px] sm:text-lg text-[#2F67FF] bg-[#ECF1FD] rounded-md backdrop-blur-sm px-3 sm:px-6 py-0 my-1 inline-block mb-2">
                  {/* ✅ Mobile: smaller font & padding */}
                  {blog.type
                    .split("-")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </p>
              )}

              <h3 className="text-[10px] sm:text-[18px] font-semibold">
                {/* ✅ Mobile: smaller title */}
                {blog.title}
              </h3>

              {/* Small description from sectionOne */}
              {blog.sectionOne?.description && (
                <p className="text-[8px] sm:text-sm text-[#989898] mt-1 line-clamp-2">
                  {/* ✅ Mobile: smaller description text */}
                  {blog.sectionOne.description
                    .map((block) =>
                      block.children
                        .map((child) => child.text)
                        .join("")
                    )
                    .join(" ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
