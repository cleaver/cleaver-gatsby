import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Sidebar from '../components/sidebar';
import TagLinks from '../components/tag-links';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;
  let sidebarExtra;
  if (post.frontmatter.sidebar) {
    sidebarExtra = (
      <div>
        <h3 className="font-display text-lg">
          {post.frontmatter.sidebar.title}
        </h3>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.fields.sidebar_body_html }}
        />
      </div>
    );
  }
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      {post.frontmatter.hero_image && (
        <Img
          fluid={post.frontmatter.hero_image.childImageSharp.fluid}
          className="col-span-4"
        />
      )}
      <div className="main-content">
        <article
          className="pb-4 pt-2 md:mr-6 mb-2"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="mb-3">
            <h1
              itemProp="headline"
              className="font-display font-bold text-3xl mb-4 mt-0 text-primary"
            >
              {post.frontmatter.title}
            </h1>
            <small className="byline">
              by {post.frontmatter.author} on {post.frontmatter.date}
            </small>
          </header>
          <section
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr />
          <footer>
            <TagLinks tags={post.frontmatter.tags} />
          </footer>
        </article>
        <nav className="mb-4">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  to={`/blog${previous.fields.slug}`}
                  rel="prev"
                  className="font-display text-primary underline hover:no-underline"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={`/blog${next.fields.slug}`}
                  rel="next"
                  className="font-display text-primary underline hover:no-underline"
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <Sidebar
        className="col-span-1"
        omitDefault={post.frontmatter.sidebar?.omit_default}
      >
        {sidebarExtra}
      </Sidebar>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        sidebar {
          title
          body
          omit_default
        }
        hero_image {
          childImageSharp {
            fluid(maxWidth: 940) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        hero_caption
      }
      fields {
        sidebar_body_html
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
