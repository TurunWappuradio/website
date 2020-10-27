import React from 'react';
import {
  useParams,
  Redirect
} from "react-router-dom";
import Helmet from 'react-helmet';

import { pageview } from '../../utils/analytics';
import MusicLibrary from '../MusicLibrary/MusicLibrary';
import MetadataForm from '../MetadataForm/MetadataForm';
import CalendarEvents from '../CalendarEvents/CalendarEvents';
import ShoutBox from '../ShoutBox/ShoutBox';
import Dashboard from '../Dashboard/Dashboard';
import './ContentPage.scss';
import ContentPage from './ContentPage';

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
      <ContentPage content={content} />
      {getCustomComponent(customComponent)}
    </>
  );
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
      return <ShoutBox />;
    case "Studionäkymä":
      return <Dashboard />;
  }
}
