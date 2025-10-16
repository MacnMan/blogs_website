import { sanityClient } from "../../../../lib/sanity.client";
import { blogSuccessPostBySlugQuery } from "@../../../lib/queriesBlogSuccess";
import { BlogSuccessPost } from "@/types/typesBlog";
import Image from "next/image";
import { notFound } from "next/navigation";
import NavbarWrapper from "@/components/HomePageComponents/NavbarWrapper";
import MainContactUs from "@/components/HomePageComponents/MainContactUs";
import TermsAndConditions from "@/components/HomePageComponents/TermsAndConditions";
import Sitemap from "@/components/HomePageComponents/Sitemap";
import Authority from "@/components/HomePageComponents/Authority";
import SidebarClient from "@/components/BlogSuccessComponents/SidebarClient";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export const portableTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
    textColor: ({ children, value }) => <span style={{ color: value?.color || "inherit" }}>{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href || "#"}
        target={value?.openInNewTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
    internalLink: ({ children, value }) => {
      if (!value?.reference?.slug?.current) return <>{children}</>;
      return (
        <Link
          href={`/success-stories-version/${value.reference.slug.current}`}
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold my-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-2">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-semibold my-1">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-semibold my-1">{children}</h6>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 my-2">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-gray-600 my-2">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside ml-4">{children}</ol>,
    checkmarks: ({ children }) => <ul className="list-inside ml-4">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
    checkmarks: ({ children }) => (
      <li className="mb-1 flex items-center gap-2">
        <span className="text-green-600">✔</span> {children}
      </li>
    ),
  },
};

export default async function BlogSuccessStoryPage({ params }: Props) {
  const { slug } = await params;

  const post: BlogSuccessPost = await sanityClient.fetch(blogSuccessPostBySlugQuery, { slug });
  if (!post) notFound();

  const sidebarItems: { id: string; title: string }[] = [];

  ['sectionOne', 'sectionTwo', 'sectionThree'].forEach((sectionKey) => {
    const section = post[sectionKey as keyof BlogSuccessPost] as typeof post['sectionOne'] | undefined;
    if (section && section.title) {
      sidebarItems.push({ id: sectionKey, title: section.title });
    }
  });

  if (post.sectionFour && Array.isArray(post.sectionFour)) {
    post.sectionFour.forEach((sec, idx) => {
      if (sec && sec.title) {
        sidebarItems.push({ id: `sectionFour-${idx}`, title: sec.title });
      }
    });
  }

  return (
    <>
      <div className="max-full sm:mx-4 sm:mt-4">
        <header className="mb-4 sm:rounded-3xl">
          <NavbarWrapper />
          {post.mainImage && (
            <div className="relative w-full h-[300px] sm:h-[560px] mb-6 sm:rounded-3xl sm:overflow-hidden">
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover sm:rounded-3xl"
                sizes="100vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end items-start">
                <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 w-full sm:rounded-b-3xl">
                  <h1 className="text-xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 bg-white/30 rounded-full text-white">
                      {post.category
                        ? post.category
                            .replace(/-/g, ' ')
                            .replace(/\b\w/g, (c) => c.toUpperCase())
                        : 'Unknown'}
                    </span>
                    <span className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 bg-white/30 rounded-full text-white">
                      {post.type
                        ? post.type
                            .replace(/-/g, ' ')
                            .replace(/\b\w/g, (c) => c.toUpperCase())
                        : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 sm:pl-20 sm:pr-8 px-4">
          <article className="prose prose-sm sm:prose-lg max-w-none col-span-8">
            {['sectionOne', 'sectionTwo', 'sectionThree'].map((sectionKey) => {
              const section = post[sectionKey as keyof BlogSuccessPost] as typeof post['sectionOne'] | undefined;
              if (!section) return null;
              return (
                <section id={sectionKey} key={sectionKey} className="mb-8 sm:mb-12 scroll-mt-24">
                  {section.title && (
                    <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">{section.title}</h2>
                  )}
                  {section.image && (
                    <div className="relative w-full h-52 sm:h-96 mb-4 sm:mb-6">
                      <Image
                        src={section.image.asset.url}
                        alt={section.image.alt || section.title || ''}
                        fill
                        className="object-cover rounded-xl"
                        sizes="100vw"
                      />
                    </div>
                  )}
                  {section.description && <PortableText value={section.description} components={portableTextComponents} />}
                </section>
              );
            })}

            {post.sectionFour &&
              post.sectionFour.map((sec, idx) => {
                if (!sec.title && !sec.description && !sec.image) return null;
                const sectionId = `sectionFour-${idx}`;
                return (
                  <section id={sectionId} key={sectionId} className="mb-8 sm:mb-12 scroll-mt-24">
                    {sec.title && (
                      <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4">{sec.title}</h2>
                    )}
                    {sec.image && (
                      <div className="relative w-full h-52 sm:h-96 mb-4 sm:mb-6">
                        <Image
                          src={sec.image.asset.url}
                          alt={sec.image.alt || sec.title || ''}
                          fill
                          className="object-cover rounded-xl"
                          sizes="100vw"
                        />
                      </div>
                    )}
                    {sec.description && <PortableText value={sec.description} components={portableTextComponents} />}
                  </section>
                );
              })}
          </article>

          <SidebarClient sidebarItems={sidebarItems} />

          {/* Social icons aside (desktop) */}
          <aside className="hidden sm:block col-span-1">
            <div className="sticky top-56">
              <div className="bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.10),-6px_0_25px_rgba(0,0,0,0.1),6px_0_25px_rgba(0,0,0,0.1)] py-4 rounded-full flex flex-col items-center space-y-4 2xl:w-20">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/7972856163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#45A756] rounded-full shadow-md transition-transform"
                >
                  <Image
                    src="/success-stories/whatsapp.svg"
                    alt="WhatsApp"
                    width={22}
                    height={22}
                  />
                </a>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/macnman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#2F67FF] rounded-full shadow-md transition-transform"
                >
                  <Image
                    src="/success-stories/linkedin.svg"
                    alt="LinkedIn"
                    width={22}
                    height={22}
                  />
                </a>
                {/* Email */}
                <a
                  href="mailto:info@macnman.in"
                  className="p-3 bg-gradient-to-r from-[#2F67FF] to-[#FF5F9B] rounded-full shadow-md transition-transform"
                >
                  <Image
                    src="/success-stories/envelope.svg"
                    alt="Email"
                    width={22}
                    height={22}
                  />
                </a>
                {/* Location */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=MACNMAN,+SHOP-15,+NEW+GAJARA+SOC,+635+1B,+Vaibhav+Society,+Bibwewadi,+Pune,+Maharashtra+411037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-[#2F67FF] to-[#FF5F9B] rounded-full shadow-md transition-transform"
                >
                  <Image
                    src="/success-stories/marker 2.svg"
                    alt="Location"
                    width={22}
                    height={22}
                  />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Sidebar + Social for mobile */}
        <div className="sm:hidden px-4 mt-8 space-y-6">
          {/* On this page list */}
          <div>
            <h3 className="font-semibold mb-2">On this page</h3>
            <ul className="space-y-1 text-xs">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Social icons mobile */}
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/7972856163"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#45A756] rounded-full shadow-md"
            >
              <Image
                src="/success-stories/whatsapp.svg"
                alt="WhatsApp"
                width={18}
                height={18}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/macnman/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#2F67FF] rounded-full shadow-md"
            >
              <Image
                src="/success-stories/linkedin.svg"
                alt="LinkedIn"
                width={18}
                height={18}
              />
            </a>
            <a
              href="mailto:info@macnman.in"
              className="p-2 bg-gradient-to-r from-[#2F67FF] to-[#FF5F9B] rounded-full shadow-md"
            >
              <Image
                src="/success-stories/envelope.svg"
                alt="Email"
                width={18}
                height={18}
              />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=MACNMAN,+SHOP-15,+NEW+GAJARA+SOC,+635+1B,+Vaibhav+Society,+Bibwewadi,+Pune,+Maharashtra+411037"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gradient-to-r from-[#2F67FF] to-[#FF5F9B] rounded-full shadow-md"
            >
              <Image
                src="/success-stories/marker 2.svg"
                alt="Location"
                width={18}
                height={18}
              />
            </a>
          </div>
        </div>

        {/* Decorative image */}
        <div className="w-full my-8 sm:my-10">
          <Image
            src="/success-stories/Group 370.svg"
            alt="products image macnman"
            width={1920}
            height={200}
            className="w-full h-auto"
          />
        </div>
      </div>

      <MainContactUs theme="light" />

      <div className="hidden md:block">
        <TermsAndConditions theme="light" />
        <Sitemap theme="light" />
        <Authority />
      </div>
    </>
  );
}
