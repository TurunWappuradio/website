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
    'embedded-asset-block': (node) => {
      const { contentType, url } = node.data.target.fields.file;

      switch (contentType) {
        case 'image/jpeg':
        case 'image/png':
          return (
            <div className="ImageContainer">
              <img className="embedded-image" src={url + '?w=900'} />
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
