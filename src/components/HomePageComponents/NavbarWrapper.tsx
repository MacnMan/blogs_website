'use client';
import { useState } from 'react';
import Navbar from './NavbarComponents/Navbar';

export default function NavbarWrapper() {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
    <Navbar 
      activeDropdownIndex={activeDropdownIndex}
      setActiveDropdownIndex={setActiveDropdownIndex}
    />
    </div>
  );
}
