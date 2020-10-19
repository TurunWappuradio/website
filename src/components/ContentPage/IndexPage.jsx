import React from 'react';
import Helmet from 'react-helmet';
import ContentPage from './ContentPage';

const IndexPage = ({ content }) => {

  if (!content) return null;

  return (
    <>
      <Helmet>
        <title>Turun Syssyradio</title>
        <meta name="description" content="Syssyradio 27.-28.10."></meta>
      </Helmet>
      <ContentPage content={content} />
    </>
  );
}

export default IndexPage;