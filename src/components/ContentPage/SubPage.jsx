import React from 'react';
import {
  useParams,
  Redirect
} from "react-router-dom";
import Helmet from 'react-helmet';

import { pageview } from '../../utils/analytics';
import './ContentPage.scss';
import ContentPage from './ContentPage';

export default ({ pageContent }) => {
  const { id } = useParams();

  // wait for content to load.
  if (!pageContent) return null;

  const page = pageContent.items.find(item => item.fields.slug.toLowerCase() === id);

  // redirect invalid slugs back to index.
  if (!page) return <Redirect to="/" />

  const { name, description, content } = page.fields;
  
  pageview("/" + id);

  return (
    <>
      <Helmet>
        <title>{name} | Turun Syssyradio</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <ContentPage content={content} />
    </>
  );
}
