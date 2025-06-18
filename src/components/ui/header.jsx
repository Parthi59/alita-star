'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const userMenuRef = useRef(null);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/Categories' },
    { label: 'Cart', href: '/Cart' },
    { label: 'About', href: '/About' },
    { label: 'Contact', href: '/Contact' },
    { label: 'Admin', href: '/Admin' }
  ];

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-900 text-white px-4 py-4 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </nav>

        {/* Upload + Avatar */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/Upload">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition">
              + Upload
            </button>
          </Link>

          {/* Avatar with dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <UserCircle size={32} className="text-gray-300 hover:text-red-600 transition" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Signup</Link>
              </div>
            )}
          </div>
        </div>

        {/* ALITA STAR 🏬 on the Right */}
        <div className="ml-auto hidden md:block">
          <h1 className="text-3xl font-bold text-red-600">ALITA STAR 🏬</h1>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              mobile
              active={pathname === item.href}
            />
          ))}
          <Link href="/upload">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition">
              + Upload
            </button>
          </Link>
          <Link href="/login" className="block text-sm text-gray-700 hover:text-red-600">Login</Link>
          <Link href="/signup" className="block text-sm text-gray-700 hover:text-red-600">Signup</Link>
        </div>
      )}
    </header>
  );
}

function NavItem({ href, label, mobile, active }) {
  return (
    <Link
      href={href}
      className={`block ${mobile ? 'w-full py-2 text-sm' : 'relative group'} ${active ? 'text-red-600 font-semibold' : 'text-gray-300'} hover:text-red-600 transition`}
    >
      {label}
      {!mobile && active && (
        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600"></span>
      )}
    </Link>
  );
}
