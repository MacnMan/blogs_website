// src/app/blogs/blog-success-story/[slug]/page.tsx
import { sanityClient } from "../../../../lib/sanity.client";
import { allBlogSuccessPostsQuery, blogSuccessPostBySlugQuery } from "@../../../lib/queriesBlogSuccess";
import { BlogSuccessPost } from "@/types/typesBlog";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import NavbarWrapper from "@/components/HomePageComponents/NavbarWrapper";
import MainContactUs from "@/components/HomePageComponents/MainContactUs";
import TermsAndConditions from "@/components/HomePageComponents/TermsAndConditions";
import Sitemap from "@/components/HomePageComponents/Sitemap";
import Authority from "@/components/HomePageComponents/Authority";
import BlogSuccessStoriesList from "@/components/BlogSuccessComponents/BlogSuccessStories";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function BlogSuccessStoryPage({ params }: Props) {
    const { slug } = await params;

    const posts = await sanityClient.fetch(allBlogSuccessPostsQuery);

    // Fetch single post
    const post: BlogSuccessPost = await sanityClient.fetch(blogSuccessPostBySlugQuery, { slug });
    if (!post) notFound();

    // Sidebar items
    const sidebarItems = ["sectionOne", "sectionTwo", "sectionThree", "sectionFour"]
        .map((sectionKey) => {
            const section = post[sectionKey as keyof BlogSuccessPost] as BlogSuccessPost["sectionOne"];
            if (!section || !section.title) return null;
            return { id: sectionKey, title: section.title };
        })
        .filter(Boolean) as { id: string; title: string }[];

    return (
        <>
            <div className="max-full mx-auto">
                {/* Header */}
                <header className="mb-4 rounded-3xl px-4 py-4">
                    <NavbarWrapper />
                    {post.mainImage && (
                        <div className="relative w-full h-[540px] mb-6">
                            <Image
                                src={post.mainImage.asset.url}
                                alt={post.mainImage.alt || post.title}
                                fill
                                className="object-cover rounded-3xl rounded-b-3xl"
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-start">
                                <div className="bg-white/20 backdrop-blur-md p-6 rounded-b-3xl w-full sm:w-full">
                                    <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
                                    <div className="flex gap-2">
                                        <span className="text-sm px-3 py-1 bg-white/30 rounded-full text-gray-800 shadow">{post.category}</span>
                                        <span className="text-sm px-3 py-1 bg-white/30 rounded-full text-gray-800 shadow">{post.type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                {/* Layout wrapper */}
                <div className="grid grid-cols-12 gap-8 pl-20 pr-8">
                    {/* Main Content - 60% */}
                    <article className="prose prose-lg max-w-none col-span-8">
                        {["sectionOne", "sectionTwo", "sectionThree", "sectionFour"].map((sectionKey) => {
                            const section = post[sectionKey as keyof BlogSuccessPost] as BlogSuccessPost["sectionOne"];
                            if (!section) return null;
                            return (
                                <section id={sectionKey} key={sectionKey} className="mb-12 scroll-mt-24">
                                    {section.title && <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>}
                                    {section.image && (
                                        <div className="relative w-full h-96 mb-6">
                                            <Image
                                                src={section.image.asset.url}
                                                alt={section.image.alt || ""}
                                                fill
                                                className="object-cover rounded-xl"
                                                sizes="100vw"
                                            />
                                        </div>
                                    )}
                                    {section.description && <PortableText value={section.description} />}
                                </section>
                            );
                        })}
                    </article>

                    {/* Sidebar - 20% */}
                    <aside className="col-span-3">
                        <div className="sticky top-20 px-4 border-l-[1.5px]">
                            <h3 className="font-semibold mb-4">On this page</h3>
                            <ul className="space-y-2 text-sm mb-6">
                                {sidebarItems.map((item) => (
                                    <li key={item.id} className="cursor-pointer">
                                        <a href={`#${item.id}`}>{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Social icons - 20% */}

                    <aside className="col-span-1">
                        <div className="sticky top-56 ">
                            <div className="bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.10),-6px_0_25px_rgba(0,0,0,0.1),6px_0_25px_rgba(0,0,0,0.1)] py-4 rounded-full flex flex-col items-center space-y-4 2xl:w-20">

                                <a
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#45A756] rounded-full shadow-md transition-transform"
                                >
                                    <Image src="/blogs/whatsapp.svg" alt="WhatsApp" width={22} height={22} />
                                </a>

                                <a
                                    href="https://www.linkedin.com/company/your-company"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-[#2F67FF] rounded-full shadow-md  transition-transform"
                                >
                                    <Image src="/blogs/linkedin.svg" alt="LinkedIn" width={22} height={22} />
                                </a>

                                <a
                                    href="mailto:info@yourcompany.com"
                                    className="p-3 bg-gradient-to-r from-[#2F67FF] to-[#FF5F9B] rounded-full shadow-md  transition-transform"
                                >
                                    <Image src="/blogs/envelope.svg" alt="Email" width={22} height={22} />
                                </a>

                                <a
                                    href="https://maps.google.com/?q=Your+Location"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gradient-to-r from-[#2F67FF] to-[#FF5F9B] rounded-full shadow-md  transition-transform"
                                >
                                    <Image src="/blogs/marker 2.svg" alt="Location" width={22} height={22} />
                                </a>
                            </div>
                        </div>
                    </aside>

                </div>



                {/* Links */}
                {post.linksTitle || post.exploreMore || post.readMoreLink ? (
                    <section id="links" className="scroll-mt-32 sm:mt-10 sm:mx-16">
                        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-3 sm:rounded-xl rounded-lg shadow-sm">
                            {post.linksTitle && <p className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">{post.linksTitle}</p>}
                            <div className="flex sm:gap-3 gap-10">
                                {post.readMoreLink && (
                                    <a
                                        href={post.readMoreLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-[14px] border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
                                    >
                                        Read Now
                                    </a>
                                )}
                                {post.exploreMore && (
                                    <a
                                        href={post.exploreMore}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-[14px] bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                                    >
                                        Explore More
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                ) : null}

                {/* Decorative image */}
                <div className="w-full my-10">
                    <Image
                        src="/blogs/Group 370.svg"
                        alt="products image macnman"
                        width={1920}
                        height={200}
                        className="w-full h-auto"
                    />
                </div>

                {posts.length > 0 && (
                    <section className="overflow-x-hidden sm:mt-12 mx-10">
                        <BlogSuccessStoriesList posts={posts} />
                    </section>
                )}
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
