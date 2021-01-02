import React from 'react';
import Helmet from 'react-helmet';
import ContentPage from './ContentPage';

const IndexPage = ({ content }) => {

  if (!content) return null;

  return (
    <>
      <Helmet>
        <title>Turun Wappuradio</title>
        <meta name="description" content="Wappuradio 21.-30.4."></meta>
      </Helmet>
      <ContentPage content={content} />
    </>
  );
}

export default IndexPage;