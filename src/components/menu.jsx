import React from 'react';
import { Link } from 'gatsby';

const Menu = ({ active }) => {
  const activeBlog = active === 'blog' ? 'font-bold' : '';
  const activeAbout = active === 'about' ? 'font-bold' : '';
  return (
    <nav className="mt-2 md:float-right md:mt-4">
      <ul>
        <li className={`inline font-display px-4 ${activeBlog}`}>
          <Link className="text-primary hover:underline" to="/">
            Blog
          </Link>
        </li>
        <li className={`inline font-display px-4 ${activeAbout}`}>
          <Link className="text-primary hover:underline" to="/content/about-me">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
