import React, { useEffect, useState } from 'react';
import contentful from '../../utils/contentful';
import { INDEX_PAGE } from '../../constants/contentTypes';
import Helmet from 'react-helmet';
import ContentPage from './ContentPage';
import ArchiveLinks from '../ArchiveLinks/ArchiveLinks';

const IndexPage = () => {
  // TODO: create a hook for fetching index content. Or don't.
  const [pageContent, setContent] = useState(null);

  useEffect(() => {
    const fetchIndex = () => contentful.getEntries({ content_type: INDEX_PAGE })
      .then(res => setContent(res.items[0].fields));
    fetchIndex();
  }, []);

  if (!pageContent) return null;

  const { content, customComponent } = pageContent;

  return (
    <>
      <Helmet>
        <title>Turun Wappuradio</title>
        <meta name="description" content="Wappuradio 21.-30.4."></meta>
      </Helmet>
      <ContentPage content={content} customComponent={customComponent} />
    </>
  );
}

export default IndexPage;