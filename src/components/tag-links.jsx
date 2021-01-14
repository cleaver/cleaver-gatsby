import { Link } from 'gatsby';
import React from 'react';

import formatPath from '../util/format-path';

const tagLinks = ({ tags }) => {
  let links = null;
  if (Array.isArray(tags) && tags.length > 0) {
    links = (
      <div>
        <span>Tags: </span>
        <ul className="inline">
          {tags.map((tag) => {
            const link = `/tags/${formatPath(tag)}`;
            return (
              <li key={tag} className="inline mx-2">
                <Link to={link}>{tag}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return links;
};

export default tagLinks;
