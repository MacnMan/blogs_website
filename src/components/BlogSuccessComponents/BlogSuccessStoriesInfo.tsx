"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { BlogSuccessPost } from "@/types/typesBlog";

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
        {[post.sectionOne, post.sectionTwo, post.sectionThree, post.sectionFour].flat().map(
          (section, idx) =>
            Array.isArray(section)
              ? section.map((subSection, subIdx) =>
                  subSection?.title && (
                    <div key={`${idx}-${subIdx}`} className="grid md:grid-cols-2 gap-6 items-center">
                      {/* Text */}
                      <div>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                          {subSection.title}
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                          <PortableText value={subSection.description} />
                        </div>
                      </div>

                      {/* Image */}
                      {subSection.image?.asset?.url && (
                        <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                          <Image
                            src={subSection.image.asset.url}
                            alt={subSection.image.alt || subSection.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )
                )
              : section?.title && (
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

      {/* ✅ Floating Social Share Buttons with custom icons */}
      <div className="fixed right-4 top-1/3 flex flex-col space-y-4 z-50">
        {/* WhatsApp */}
        <a
          href="https://wa.me/1234567890" // replace with your real WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/your-company" // replace with your LinkedIn page
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
        </a>

        {/* Email */}
        <a
          href="mailto:info@yourcompany.com" // replace with your email
          className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Image src="/envelope.svg" alt="Email" width={20} height={20} />
        </a>

        {/* Location Marker */}
        <a
          href="https://maps.google.com/?q=Your+Location" // replace with your actual location link
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Image src="/marker 2.svg" alt="Location" width={20} height={20} />
        </a>
      </div>
    </article>
  );
}
