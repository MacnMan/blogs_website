// 'use client';

// import { useState, useEffect } from 'react';

// const sections = [
//   'Overview',
//   'Challenges',
//   'Solution',
//   'Architecture',
//   'Deployment',
//   'Validation',
//   'Impact',
//   'Conclusion'
// ];

// export default function SectionNavigator() {
//   const [activeSection, setActiveSection] = useState('Overview');

//   useEffect(() => {
//     const handleScroll = () => {
//       for (let id of sections) {
//         const el = document.getElementById(id.toLowerCase());
//         if (el) {
//           const rect = el.getBoundingClientRect();
//           if (rect.top < window.innerHeight / 2 && rect.bottom > 100) {
//             setActiveSection(id);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (id: string) => {
//     const el = document.getElementById(id.toLowerCase());
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <div className="sticky top-[80px] z-30 bg-white border-b border-gray-200 overflow-x-auto">
//       <div className="flex justify-center gap-6 px-4 py-3 whitespace-nowrap">
//         {sections.map((section) => (
//           <button
//             key={section}
//             onClick={() => scrollToSection(section)}
//             className={`text-sm font-medium transition-colors ${
//               activeSection === section
//                 ? 'text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-500 hover:text-black'
//             }`}
//           >
//             {section}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


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

  // Handle scroll into view
  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  // Highlight active tab on scroll
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
  <div className="sticky mx-20 rounded-3xl top-6 z-50 backdrop-blur bg-transparent border-gray-100 flex justify-center items-center px-4 py-2">
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
