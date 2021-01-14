import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import MusicLibrary from '../MusicLibrary/MusicLibrary';
import MetadataForm from '../MetadataForm/MetadataForm';
import CalendarEvents from '../CalendarEvents/CalendarEvents';
import ShoutBox from '../ShoutBox/ShoutBox';
import Dashboard from '../Dashboard/Dashboard';
import './ContentPage.scss';

export default ({ content, customComponent }) => (
  <>
    <div className="ContentPage">
      {documentToReactComponents(content, options)}
    </div>
    {getCustomComponent(customComponent)}
  </>
);

let options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { description, file } = node.data.target.fields;
      const { contentType, url } = file;

      switch (contentType) {
        case 'image/jpeg':
        case 'image/png':
          return (
            <div className="ImageContainer">
              <img className="embedded-image" src={url + '?w=900'} />
              <p>{description}</p>
            </div>
          );
        case 'video/mp4':
          return (
            <div className="VideoContainer">
              <video src={url} controls />
            </div>
          )
      }
    }
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
      return <ShoutBox />;
    case "Studionäkymä":
      return <Dashboard />;
  }
}
