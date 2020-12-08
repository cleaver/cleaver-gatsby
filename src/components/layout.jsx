/* global __PATH_PREFIX__ */
import React from 'react';
import { Link } from 'gatsby';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="main-heading header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="cbcontainer bg-indigo-50" data-is-root-path={isRootPath}>
      <header className="border-primary border-t-8 p-2">{header}</header>
      <main className="flex flex-col md:flex-row">{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
