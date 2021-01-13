import React from 'react';
import { Link, graphql } from 'gatsby';

import formatPath from '../util/format-path';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Sidebar from '../components/sidebar';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  return (
    <Layout location={location} title={title}>
      <SEO title="All tagged posts" />
      <div className="main-content">
        <div className="mb-4">
          <div>
            <h1 className="font-display text-primary text-2xl mb-4 font-bold">
              Tags
            </h1>
            <ul>
              {group.map((tag) => (
                <li
                  key={tag.fieldValue}
                  className="mb-2 mt-0 text-primary hover:underline"
                >
                  <Link to={`/tags/${formatPath(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Sidebar omitDefault={false} />
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
