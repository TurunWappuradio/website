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
      <img className="embedded-image" src={node.data.target.fields.file.url} />
  }
}
