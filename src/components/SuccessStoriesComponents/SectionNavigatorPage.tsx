
// components/successStoriesComponents/SectionNavigator.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Section = {
  id: string;
  label: string;
  image: string;
};

const sections: Section[] = [
  { id: "overview", label: "Overview", image: "/blogs/images/section-navigator/confetti.svg" },
  { id: "problem", label: "Problem", image: "/blogs/images/section-navigator/solution.svg" },
  { id: "solution", label: "Solution", image: "/blogs/images/section-navigator/solutionnew.svg" },
  { id: "architecture", label: "Architecture", image: "/blogs/images/section-navigator/architecture.svg" },
  { id: "deployment", label: "Deployment", image: "/blogs/images/section-navigator/deployment.svg" },
  { id: "challenges", label: "Challenges", image: "/blogs/images/section-navigator/solution.svg" },
  { id: "validation", label: "Validation", image: "/blogs/images/section-navigator/quiz-alt.svg" },
  { id: "impact", label: "Impact", image: "/blogs/images/section-navigator/impact.svg" },
  { id: "conclusion", label: "Conclusion", image: "/blogs/images/section-navigator/confetti.svg" },
  { id: "links", label: "Link", image: "/blogs/images/section-navigator/solution.svg" },
];

// ✅ Active state icon
const activeIcon = "/blogs/images/section-navigator/check-circle1.svg";

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Observe when nav leaves viewport -> make sticky
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1 }
    );

    const currentNav = navRef.current; 

    if (currentNav) observer.observe(currentNav);

    return () => {
      if (currentNav) observer.unobserve(currentNav);
    };
  }, []);

  return (
    <>
      {/* spacer marker at the bottom */}
      <div ref={navRef}></div>

      <div
        className={`max-w-[1200px] w-full mx-auto
    ${isSticky
            ? "fixed top-[72px] left-1/2 -translate-x-1/2  z-40"
            : "relative mt-2"
          }`}
      >
        <div className="mx-6 rounded-3xl backdrop-blur-3xl flex justify-center items-center py-2">
          <div className="flex flex-wrap gap-3">
            {sections.map(({ id, label, image }) => (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`flex items-center space-x-2 whitespace-nowrap text-sm px-2 py-1 rounded-full transition-all duration-300 ${activeSection === id
                  ? "bg-[#2F67FF] text-white font-semibold shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <Image
                  src={activeSection === id ? activeIcon : image}
                  alt={label}
                  width={18}
                  height={18}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}