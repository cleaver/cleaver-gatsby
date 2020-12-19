import React from 'react';

const Sidebar = ({ children, omitDefault }) => {
  let defaultSidebar;
  if (!omitDefault) {
    defaultSidebar = (
      <div>
        <p className="text-gray-600">
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
    <div className="sidebar flex-shrink-0">
      {defaultSidebar}
      {children}
    </div>
  );
};

export default Sidebar;
