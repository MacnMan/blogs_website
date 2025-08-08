'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../../lib/sanityImageUrl';
import { PortableTextBlock } from '@portabletext/react';
import { useEffect, useRef } from 'react';

type successStory = {
  _id: string;
  title: string;
  slug: { current: string };
  homeImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  body: PortableTextBlock[];
};

export default function SuccessStoriesList({ stories }: { stories: successStory[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Auto-scroll seamlessly
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!container) return;

      container.scrollLeft += speed;

      // If we've reached halfway, reset to start smoothly
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Drag scroll support
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add('cursor-grabbing');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onMouseLeaveOrUp = () => {
      isDown = false;
      container.classList.remove('cursor-grabbing');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeaveOrUp);
    container.addEventListener('mouseup', onMouseLeaveOrUp);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeaveOrUp);
      container.removeEventListener('mouseup', onMouseLeaveOrUp);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Duplicate stories for infinite loop
  const loopedStories = [...stories, ...stories];

  return (
    <section className="space-y-6 ml-10 overflow-x-hidden">
      <h2 className="text-3xl font-semibold mb-4 ml-4 font-sans">Success Stories Videos</h2>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 gap-3 overflow-x-hidden no-scrollbar cursor-grab"
      >
        {loopedStories.map((story, index) => (
          <Link
            key={`${story._id}-${index}`}
            href={`/success-stories/${story.slug.current}`}
            className="w-[320px] flex-shrink-0 rounded-4xl transition bg-white overflow-hidden"
          >
            {story.homeImage?.asset && (
              <div className="mb-2">
                <div className="w-[320px] h-[230px] overflow-hidden rounded-4xl">
                  <Image
                    src={urlFor(story.homeImage).url()}
                    alt={story.homeImage.alt || story.title}
                    width={320}
                    height={230}
                    className="w-full h-full object-cover rounded-4xl"
                  />
                </div>
              </div>
            )}
            <div className="p-1">
              <h3 className="text-lg font-semibold break-words whitespace-normal">
                {story.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
