import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;
          (or the directory you specified for the
          &quot;gatsby-source-filesystem&quot; plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="py-4 px-6 md:py-8 md:px-12 mb-8 bg-white rounded-md shadow-md"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="mb-3">
                  <h2 className="font-display font-bold text-3xl mb-4 mt-0 text-primary">
                    <Link
                      className="hover:underline"
                      to={post.fields.slug}
                      itemProp="url"
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small className="byline">{post.frontmatter.date}</small>
                </header>
                <section>
                  <div
                    className="text-md font-body"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt || post.frontmatter.description,
                    }}
                    itemProp="description"
                  />
                </section>
                <footer>
                  <p className="mb-0">
                    <Link
                      to={post.fields.slug}
                      itemProp="url"
                      className="font-display hover:underline text-sm"
                    >
                      Read more...
                    </Link>
                  </p>
                </footer>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(format: HTML)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
