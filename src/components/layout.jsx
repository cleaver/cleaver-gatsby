/* global __PATH_PREFIX__ */
import React from 'react';
import { Link } from 'gatsby';

import Menu from './menu';

import cc from '../../content/assets/cc.svg';
import by from '../../content/assets/by.svg';
import sa from '../../content/assets/sa.svg';
import nc from '../../content/assets/nc.svg';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  const imageStyle = {
    height: '22px!important' /* stylelint-disable-line */,
    'margin-left': '3px' /* stylelint-disable-line */,
    'vertical-align': 'text-bottom',
  };
  const linkStyle = { display: 'inline-block' };
  let activePath = null;
  if (location.pathname.match(/^\/content\/about-me/)) {
    activePath = 'about';
  }
  if (location.pathname.match(/^(\/blog|\/\d*$)/)) {
    activePath = 'blog';
  }
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading inline-block">
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
    <div className="cbcontainer" data-is-root-path={isRootPath}>
      <header className="border-primary border-t-4 p-2">
        {header}
        <Menu active={activePath} />
      </header>
      {/* <main className="flex flex-col md:flex-row">{children}</main> */}
      <main className="grid grid-cols-1 md:grid-cols-4">{children}</main>
      <footer className="my-6">
        <p className="font-display text-sm">
          <a
            className="text-primary hover:underline"
            rel="cc:attributionURL"
            property="dct:title"
            href="https://cleaver.ca"
          >
            cleaver.ca website{' '}
          </a>{' '}
          by Cleaver Barnes is licensed under{' '}
          <a
            className="text-primary hover:underline"
            href="https://creativecommons.org/licenses/by-nc-sa/4.0?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
            style={linkStyle}
          >
            CC BY-NC-SA 4.0
          </a>
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
            style={linkStyle}
          >
            &nbsp;
            <img className="h-4 inline" src={cc} alt="creative commons" />{' '}
            <img className="h-4 inline" src={by} alt="attribution" />{' '}
            <img className="h-4 inline" src={sa} alt="share alike" />{' '}
            <img className="h-4 inline" src={nc} alt="non commercial" />
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
