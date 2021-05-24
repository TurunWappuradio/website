import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { MusicLibrary, MetadataForm, CalendarEvents, ShoutBox, Dashboard, ArchiveLinks, ArchivedShowList } from '..';

import './ContentPage.scss';

export default ({ content, customComponent }) => (
  <>
    <div className="Container">
      <div className="ContentPage">
        {documentToReactComponents(content, options)}
      </div>
    </div>
    <div className={`
      ComponentContainer
      ${customComponent && customComponent.startsWith('Ohjelmakartta-') ? 'ComponentContainer-showlist' : ''}
    `}>
      {getCustomComponent(customComponent)}
    </div>
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
    case "Ohjelmakarttalinkit":
      return <ArchiveLinks />;
    case "Ohjelmakartta-wappu2019":
      return <ArchivedShowList showListKey="wappuradio2019" />;
    case "Ohjelmakartta-syssy2019":
      return <ArchivedShowList showListKey="syssyradio2019" />;
    case "Ohjelmakartta-wappu2020":
      return <ArchivedShowList showListKey="wappuradio2020" />;
    case "Ohjelmakartta-syssy2020":
      return <ArchivedShowList showListKey="syssyradio2020" />;
    case "Ohjelmakartta-wappu2021":
      return <ArchivedShowList showListKey="wappuradio2021" />;
  }
}
