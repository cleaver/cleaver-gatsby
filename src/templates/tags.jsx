import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Sidebar from '../components/sidebar';

const Tags = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { tag } = pageContext;
  const { nodes, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Posts tagged with ${tag}`} />

      <div className="main-content">
        <div className="pb-4 md:pb-8 mr-8 mb-8">
          <h1 className="font-display text-primary text-2xl mb-4 font-bold">
            {tagHeader}
          </h1>
          <ol className="list-none">
            {nodes.map((node) => {
              const { slug } = node.fields;
              const { title } = node.frontmatter;
              return (
                <li key={slug}>
                  <h2 className="mb-2 mt-0 text-primary hover:underline">
                    <Link to={slug}>{title}</Link>
                  </h2>
                </li>
              );
            })}
          </ol>
          <Link
            to="/tags"
            className="mt-4 font-display font-bold text-primary hover:underline"
          >
            All tags
          </Link>
        </div>
      </div>
      <Sidebar omitDefault={false} />
      <div className="invisible" />
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
