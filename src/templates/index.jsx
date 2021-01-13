import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Sidebar from '../components/sidebar';

const BlogIndex = (props) => {
  const { data, location, pageContext } = props;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage >= numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/' : `/${(currentPage - 1).toString()}`;
  const nextPage = `/${(currentPage + 1).toString()}`;

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

      <div className="main-content">
        <ol className="list-none">
          {posts.map((post) => {
            const title = post.frontmatter.title || post.fields.slug;
            const link = `/blog${post.fields.slug}`;
            return (
              <li key={link}>
                <article
                  className="py-4 mx-2 md:pt-4 md:pb-4 border-b-2 border-indigo-200"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header className="mb-3">
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-2 mt-0 text-primary">
                      <Link
                        className="no-underline hover:underline"
                        to={link}
                        itemProp="url"
                      >
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small className="byline">{post.frontmatter.date}</small>
                    {post.frontmatter.hero_image && (
                      <Img
                        fluid={
                          post.frontmatter.hero_image.childImageSharp.fluid
                        }
                        className="mt-2"
                      />
                    )}
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
                        to={link}
                        itemProp="url"
                        className="font-display hover:underline text-sm"
                        title={title}
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
        <ul>
          <li className="float-left">
            {!isFirst && (
              <Link
                to={prevPage}
                rel="prev"
                className="font-display text-primary underline hover:no-underline"
              >
                ← Previous Page
              </Link>
            )}
          </li>
          <li className="float-right">
            {!isLast && (
              <Link
                to={nextPage}
                rel="next"
                className="font-display text-primary underline hover:no-underline"
              >
                Next Page →
              </Link>
            )}
          </li>
        </ul>
      </div>
      <Sidebar className="col-span-1" omitDefault={false} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt(format: HTML)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          hero_image {
            childImageSharp {
              fluid(maxWidth: 940) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
