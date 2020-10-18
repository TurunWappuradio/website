import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  useParams,
  Redirect
} from "react-router-dom";
import Helmet from 'react-helmet';

import { pageview } from '../../utils/analytics';
import CalendarEvents from '../CalendarEvents/CalendarEvents';
import MetadataForm from '../MetadataForm/MetadataForm';
import MusicLibrary from '../MusicLibrary/MusicLibrary';
import Chat from '../ShoutBox/ShoutBox';
import './ContentPage.scss';

export default ({ pageContent }) => {
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
        <title>{name} | Turun Syssyradio</title>
        <meta name="description" content={description}></meta>
      </Helmet>
      <div className="ContentPage">
        {documentToReactComponents(content, options)}
      </div>
      {customComponent && getCustomComponent(customComponent)}
    </>
  );
}

let options = {
  renderNode: {
    'embedded-asset-block': (node) =>
      <img className="embedded-image" src={node.data.target.fields.file.url} />
  }
}

const getCustomComponent = (componentName) => {
  switch(componentName) {
    case "Kalenteri":
      return <CalendarEvents />;
    case "Metadata-formi":
      return <MetadataForm />;
    case "Musakirjasto":
      return <MusicLibrary />;
    case "Shoutboxi":
      return <Chat />;
  }
}
