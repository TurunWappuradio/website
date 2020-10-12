import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  useParams,
  Redirect
} from "react-router-dom";
import Helmet from 'react-helmet';

import './ContentPage.scss';

export default ({ pageContent }) => {
  const { id } = useParams();

  // wait for content to load.
  if (!pageContent) return null;

  const page = pageContent.items.find(item => item.fields.slug.toLowerCase() === id);

  // redirect invalid slugs back to index.
  if (!page) return <Redirect to="/" />

  const { name, description, content } = page.fields;

  return (
    <>
      <Helmet>
        <title>{name} | Turun Syssyradio</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <div className="ContentPage">
        {documentToReactComponents(content, options)}
      </div>
    </>
  );
}

let options = {
  renderNode: {
    'embedded-asset-block': (node) =>
      <img className="embedded-image" src={node.data.target.fields.file.url} />
  }
}
