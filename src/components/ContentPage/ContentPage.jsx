import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import './ContentPage.scss';

export default ({ content }) => (
  <div className="ContentPage">
    {documentToReactComponents(content, options)}
  </div>
);

let options = {
  renderNode: {
    'embedded-asset-block': (node) =>
      <div className="ImageContainer">
        <img className="embedded-image" src={node.data.target.fields.file.url + '?w=900'} />
      </div>
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
