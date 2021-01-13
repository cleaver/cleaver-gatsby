import React from 'react';

const Sidebar = ({ children, omitDefault }) => {
  let defaultSidebar;
  if (!omitDefault) {
    defaultSidebar = (
      <div>
        <p className="text-gray-600 mt-4">
          I use{' '}
          <a href="https://www.digitalocean.com/?refcode=0601bc016218">
            Digital Ocean
          </a>{' '}
          to host this site. (
          <a href="/content/digital-ocean-referrals">About this.</a>)
        </p>
      </div>
    );
  }
  return (
    <div className="sidebar col-span-4 md:col-span-1 border-secondary border-t-4 border-opacity-40 p-4 sticky top-0">
      {children}
      {defaultSidebar}
    </div>
  );
};

export default Sidebar;
