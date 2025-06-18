'use client'
import Link from 'next/link';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-700 px-6 pt-12 pb-4">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-red-600">ALITA STAR 🏬</h3>
          <p className="mt-2 text-sm">
            Fastest-growing shopping platform for smart buyers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/Categories" className="hover:text-white">Categories</Link></li>
            <li><Link href="/Cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/About" className="hover:text-white">About</Link></li>
            <li><Link href="/Contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/Admin" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>

        {/* Social & Payments */}
        <div>
          <h4 className="font-semibold mb-2 text-white">Connect & Pay</h4>
          <div className="flex gap-3 mb-4 flex-wrap">
            <SocialIcon href="https://github.com" Icon={FaGithub} color="#333" />
            <SocialIcon href="https://twitter.com" Icon={FaTwitter} color="#1DA1F2" />
            <SocialIcon href="https://linkedin.com" Icon={FaLinkedin} color="#0A66C2" />
            <SocialIcon href="https://instagram.com" Icon={FaInstagram} color="#E4405F" />
            <SocialIcon href="https://youtube.com" Icon={FaYoutube} color="#FF0000" />
            <SocialIcon href="https://facebook.com" Icon={FaFacebook} color="#1877F2" />
          </div>

          <div className="flex gap-4 text-white text-2xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500">
        &copy; 2025 ALITA STAR 🏬. All rights reserved.
      </div>
    </footer>
  );
}

function SocialIcon({ href, Icon, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full transition-transform hover:scale-110 hover:shadow-lg"
      style={{ backgroundColor: color }}
    >
      <Icon size={18} color="#fff" />
    </a>
  );
}
