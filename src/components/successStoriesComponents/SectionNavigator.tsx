// components/successStoriesComponents/SectionNavigator.tsx
'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'deployment', label: 'Deployment' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'impact', label: 'Impact' },
  { id: 'validation', label: 'Validation' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'links', label: 'Link' },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('overview');

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="top-20 z-0 mx-20 rounded-3xl backdrop-blur-3xl bg-transparent border-gray-100 flex justify-center items-center px-4 py-2"
    >
      <div className="flex space-x-4">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`whitespace-nowrap text-sm px-3 py-1 rounded-full transition-all duration-300 ${
              activeSection === id
                ? 'bg-gray-400 text-white font-semibold shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
