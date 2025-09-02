"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { BlogSuccessPost } from "@/types/typesBlog";
import {
  Facebook,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";

type Props = {
  post: BlogSuccessPost;
};

export default function BlogSuccessStoriesInfo({ post }: Props) {
  if (!post) return null;

  return (
    <article className="max-w-5xl mx-auto">
      {/* ✅ Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[450px]">
        {post.mainImage?.asset?.url && (
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 sm:p-12">
          <span className="text-sm text-indigo-300 uppercase tracking-wide">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            {post.title}
          </h1>
          <p className="text-gray-200 text-sm mt-2">
            {post.location && `${post.location} •`}{" "}
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ✅ Content Sections */}
      <div className="px-6 sm:px-12 py-8 space-y-12">
        {[post.sectionOne, post.sectionTwo, post.sectionThree, post.sectionFour].map(
          (section, idx) =>
            section?.title && (
              <div key={idx} className="grid md:grid-cols-2 gap-6 items-center">
                {/* Text */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                    {section.title}
                  </h2>
                  <div className="prose max-w-none text-gray-700">
                    <PortableText value={section.description} />
                  </div>
                </div>

                {/* Image */}
                {section.image?.asset?.url && (
                  <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                    <Image
                      src={section.image.asset.url}
                      alt={section.image.alt || section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )
        )}
      </div>

      {/* ✅ Social Share Buttons */}
      <div className="fixed right-4 top-1/3 flex flex-col space-y-3 z-50">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.href : ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-600 rounded-full shadow-md text-white hover:bg-blue-700"
        >
          <Facebook size={20} />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.href : ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-700 rounded-full shadow-md text-white hover:bg-blue-800"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.href : ""
          )}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-sky-500 rounded-full shadow-md text-white hover:bg-sky-600"
        >
          <Twitter size={20} />
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(
            post.title
          )}&body=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.href : ""
          )}`}
          className="p-3 bg-gray-600 rounded-full shadow-md text-white hover:bg-gray-700"
        >
          <Mail size={20} />
        </a>
      </div>
    </article>
  );
}
