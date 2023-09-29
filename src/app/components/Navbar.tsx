import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">My Store</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/pages/about" legacyBehavior>
              <a className="text-white hover:underline">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/pages/privacy" legacyBehavior>
              <a className="text-white hover:underline">Privacy</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
