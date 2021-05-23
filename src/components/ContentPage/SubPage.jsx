import React from 'react';
import {
  useParams,
  Redirect
} from "react-router-dom";
import Helmet from 'react-helmet';

import { pageview } from '../../utils/analytics';
import ContentPage from './ContentPage';
import fetchEntries from '../../utils/dataEntries';
import { CONTENT_PAGE } from '../../constants/contentTypes';

import './ContentPage.scss';
import Hero from '../Hero/Hero';

export default () => {
  const pageContent = fetchEntries({
    content_type: CONTENT_PAGE,
  }).data;

  const { id } = useParams();

  // wait for content to load.
  if (!pageContent) return null;

  const page = pageContent.items.find(item => item.fields.slug.toLowerCase() === id);

  // redirect invalid slugs back to index.
  if (!page) return <Redirect to="/" />

  const { name, description, content, customComponent } = page.fields;
  
  pageview("/" + id);

  return (
    <>
      <Helmet>
        <title>{name} | Turun Wappuradio</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <Hero>
        <img src="leima.svg" alt="Turun Wappuradio" />
        <div>
          <h1>{name}</h1>
          <h2>{description}</h2>
        </div>
      </Hero>
      <ContentPage content={content} customComponent={customComponent} />
    </>
  );
}
