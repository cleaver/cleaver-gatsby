const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a templates for blog post and content
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.jsx`);
  const pageTemplate = path.resolve(`./src/templates/content.jsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allFile(
          sort: {
            fields: [childMarkdownRemark___frontmatter___date]
            order: ASC
          }
          limit: 1000
        ) {
          nodes {
            sourceInstanceName
            childMarkdownRemark {
              id
              fields {
                slug
              }
            }
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allFile.nodes.filter(
    (node) => node.sourceInstanceName === 'blog' && node.childMarkdownRemark
  );

  const pages = result.data.allFile.nodes.filter(
    (node) => node.sourceInstanceName === 'content' && node.childMarkdownRemark
  );

  // Create blog posts pages
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId =
        index === 0 ? null : posts[index - 1].childMarkdownRemark.id;
      const nextPostId =
        index === posts.length - 1
          ? null
          : posts[index + 1].childMarkdownRemark.id;

      createPage({
        path: `blog${post.childMarkdownRemark.fields.slug}`,
        component: blogPostTemplate,
        context: {
          id: post.childMarkdownRemark.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  // Create content pages
  if (pages.length > 0) {
    pages.forEach((page, index) => {
      const previousPostId =
        index === 0 ? null : pages[index - 1].childMarkdownRemark.id;
      const nextPostId =
        index === pages.length - 1
          ? null
          : pages[index + 1].childMarkdownRemark.id;

      createPage({
        path: `content${page.childMarkdownRemark.fields.slug}`,
        component: pageTemplate,
        context: {
          id: page.childMarkdownRemark.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  // Create blog post list pages
  const blogList = path.resolve('./src/templates/index.jsx');
  const postsPerPage = 5;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create tag pages
  const tags = result.data.tagsGroup.group;
  const tagTemplate = path.resolve('./src/templates/tags.jsx');
  tags.forEach((tag) => {
    const tagPath = `/tags/${tag.fieldValue
      .toLowerCase()
      .replace(/\s+/gi, '-')}`;
    createPage({
      path: tagPath,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slugValue = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value: slugValue,
    });
    if (node.frontmatter && node.frontmatter.sidebar) {
      const sidebarBody = node.frontmatter.sidebar.body;
      if (sidebarBody) {
        const sidebarHtml = remark()
          .use(remarkHTML)
          .processSync(sidebarBody)
          .toString();
        createNodeField({
          name: `sidebar_body_html`,
          node,
          value: sidebarHtml,
        });
      }
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
