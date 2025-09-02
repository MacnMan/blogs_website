
import { sanityClient } from "../../../lib/sanity.client";
import { allBlogSuccessPostsQuery } from "../../../lib/queriesBlogSuccess";
import Image from "next/image";
import NavbarWrapper from "@/components/HomePageComponents/NavbarWrapper";
import MainContactUs from "@/components/HomePageComponents/MainContactUs";
import TermsAndConditions from "@/components/HomePageComponents/TermsAndConditions";
import Sitemap from "@/components/HomePageComponents/Sitemap";
import Authority from "@/components/HomePageComponents/Authority";
import HeroSection from "@/components/HomePageComponents/Hero";
import BlogSuccessStoriesList from "@/components/BlogSuccessComponents/BlogSuccessStories";
import SuccessStoriesListV2 from "@/components/SuccessStoriesVersionComponents/SuccessStoriesListV2";
import { groq } from "next-sanity";
import NewlyAddedBlogs from "@/components/BlogSuccessComponents/NewlyAddedBlogStories";

export default async function BlogSuccessPage() {
  const posts = await sanityClient.fetch(allBlogSuccessPostsQuery);
  // 👉 Also fetch all other V2 stories for carousel
  const allStories = await sanityClient.fetch(
    groq`*[_type == "successStoryVersion2" && defined(homeImage.asset._ref)]{
      _id,
      title,
      slug,
      homeImage { asset->{url}, alt },
      body
    }`
  );

  const blogs = await sanityClient.fetch(allBlogSuccessPostsQuery);

  return (
    <>
      <HeroSection />
      <NavbarWrapper />
      <main className="sm:ml-12 sm:py-8 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden">
        <section className="overflow-x-hidden">
          <BlogSuccessStoriesList posts={posts} />
        </section>
      </main>

      <section className="rounded-3xl my-8 px-2 mx-10">
        <NewlyAddedBlogs blogs={blogs} />
      </section>



      {/* Links Section (above decorative image) */}
      <section id="links" className="scroll-mt-32 sm:mt-10 sm:mx-16">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 px-4 py-3 sm:rounded-xl rounded-lg shadow-sm">
          {/* Title */}
          <p className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
            Transforming Industries: The Story of Sunita - Supervisor view on automation
          </p>

          {/* Buttons */}
          <div className="flex sm:gap-3 gap-10">
            <a
              href="https://macnman.com/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-[14px] border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Read Now
            </a>
            <a
              href="https://macnman.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-[14px] bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Explore More
            </a>
          </div>
        </div>
      </section>


      {/* Decorative image */}
      <div className="w-full my-10">
        <Image
          src="/blogs/Group 370.svg"
          alt="products image macnman"
          width={1920}   // set a large width for full coverage
          height={200}   // adjust height as needed
          className="w-full h-auto"
        />
      </div>
      {/* Carousel of other Version 2 stories */}
      {allStories.length > 0 && (
        <section className="overflow-x-hidden sm:mt-12 mx-10">
          <SuccessStoriesListV2 stories={allStories} />
        </section>
      )}
      <main className="sm:px-16 sm:py-2 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden"></main>
      <MainContactUs theme="light" />
      <div className="hidden md:block">
        <TermsAndConditions theme="light" />
        <Sitemap theme="light" />
        <Authority />
      </div>
    </>
  );
}
