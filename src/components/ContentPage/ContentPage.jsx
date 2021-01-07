import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MARKS, BLOCKS } from '@contentful/rich-text-types';

import './ContentPage.scss';

export default ({ content }) => (
  <div className="ContentPage">
    {documentToReactComponents(content, options)}
  </div>
);

let options = {
  renderMark: {
    [MARKS.ITALIC]: text => (
      <div className="QuoteContainer">
        {text}
      </div>
    )
  },
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
