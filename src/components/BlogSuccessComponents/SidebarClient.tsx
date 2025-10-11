'use client';

import { useEffect, useState } from 'react';

type SidebarItem = { id: string; title: string };

interface SidebarClientProps {
  sidebarItems: SidebarItem[];
}

export default function SidebarClient({ sidebarItems }: SidebarClientProps) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px', // tweak this so that the section becomes “active” earlier or later
        threshold: 0.1,
      }
    );

    sidebarItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sidebarItems]);

  return (
    <aside className="hidden sm:block col-span-3">
      <div className="sticky top-20 px-4 border-l-[1.5px]">
        <h3 className="font-semibold mb-4">On this page</h3>
        <ul className="space-y-2 text-sm mb-6">
          {sidebarItems.map((item) => {
            const isActive = item.id === activeSectionId;
            return (
              <li
                key={item.id}
                className={`cursor-pointer ${
                  isActive ? 'border-l-[1.5px] border-black ml-[-17px] pl-[15.5px] text-gray-600' : ''
                }`}
              >
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
