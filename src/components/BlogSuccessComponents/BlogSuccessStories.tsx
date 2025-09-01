"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { BlogSuccessPost } from "@/types/typesBlog";

export default function BlogSuccessStoriesList({ posts }: { posts: BlogSuccessPost[] }) {
  return (
    <div className="sm:space-y-6 mt-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-3xl font-semibold mb-4 font-sans">
        Blog Success Stories
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        loop={true}
        grabCursor={true}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id} style={{ width: "auto" }}>
            <Link
              href={`/blog-success-story/${post.slug.current}`}
              className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
              style={{ width: "90vw", maxWidth: "400px" }}
            >
              {post.mainImage?.asset?.url && (
                <div className="w-full h-[150px] sm:h-[250px] overflow-hidden rounded-3xl">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt || post.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                {/* Category */}
                <h3 className="text-sm sm:text-md font-semibold break-words">
                  {post.title}
                </h3>
                {post.category && (
                  <span className="text-xs uppercase tracking-wide font-medium block mb-1">
                    {post.category}
                  </span>
                )}
                {/* Title */}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import { BlogSuccessPost } from "@/types/typesBlog";
// import { ROUTES } from "@/libs/routes"; // ✅ import routes

// export default function BlogSuccessStoriesList({ posts }: { posts: BlogSuccessPost[] }) {
//   return (
//     <div className="sm:space-y-6 mt-4 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-xl sm:text-3xl font-semibold mb-4 font-sans">
//         Blog Success Stories
//       </h2>

//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={20}
//         slidesPerView="auto"
//         autoplay={{ delay: 0, disableOnInteraction: false }}
//         speed={4000}
//         loop={true}
//         grabCursor={true}
//       >
//         {posts.map((post) => (
//           <SwiperSlide key={post._id} style={{ width: "auto" }}>
//             <Link
//               href={ROUTES.SUCCESSSTORY_DETAIL(post.slug.current)} // ✅ using route helper
//               className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition"
//               style={{ width: "90vw", maxWidth: "400px" }}
//             >
//               {post.mainImage?.asset?.url && (
//                 <div className="w-full h-[150px] sm:h-[250px] overflow-hidden rounded-3xl">
//                   <Image
//                     src={post.mainImage.asset.url}
//                     alt={post.mainImage.alt || post.title}
//                     width={400}
//                     height={250}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="p-3">
//                 {/* Category */}
//                 {post.category && (
//                   <span className="text-xs uppercase tracking-wide text-indigo-600 font-medium block mb-1">
//                     {post.category}
//                   </span>
//                 )}
//                 {/* Title */}
//                 <h3 className="text-sm sm:text-md font-semibold break-words">
//                   {post.title}
//                 </h3>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
