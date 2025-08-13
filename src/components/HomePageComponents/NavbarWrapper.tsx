// 'use client';
// import { useState } from 'react';
// import Navbar from './NavbarComponents/Navbar';

// export default function NavbarWrapper() {
//   const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 ">
//     <Navbar 
//       activeDropdownIndex={activeDropdownIndex}
//       setActiveDropdownIndex={setActiveDropdownIndex}
//     />
//     </div>
//   );
// }


'use client';
import { useState, useEffect } from 'react';
import Navbar from './NavbarComponents/Navbar';
import NavbarMobileDevices from './NavbarComponents/NavbarMobileDevices';

export default function NavbarWrapper() {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

  // Custom hook for media query
  function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      if (typeof window === 'undefined') return;

      const media = window.matchMedia(query);
      const listener = () => setMatches(media.matches);

      setMatches(media.matches); // Initial check
      media.addEventListener('change', listener);

      return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
  }

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {hasMounted && (
        isDesktop ? (
          <Navbar
            activeDropdownIndex={activeDropdownIndex}
            setActiveDropdownIndex={setActiveDropdownIndex}
          />
        ) : (
          <NavbarMobileDevices />
        )
      )}
    </div>
  );
}
