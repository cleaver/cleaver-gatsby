import React from 'react';
import { graphql } from 'gatsby';

import CvInfo from '../components/cvinfo';
import Layout from '../components/layout';

const Cv = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  return (
    <Layout location={location} title={title}>
      <div className="main-content--cv">
        <div className="pb-4 md:pb-8 mr-8 mb-8">
          <CvInfo />
        </div>
      </div>
    </Layout>
  );
};

export default Cv;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
