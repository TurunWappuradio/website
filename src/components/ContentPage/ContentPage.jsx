import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  useParams
} from "react-router-dom";

import './ContentPage.scss';

export default (props) => {
  const { id } = useParams();
  const content = getContent(props.content, id);
  return (
    <div className="ContentPage"> {content && documentToReactComponents(content.fields.content, options)} </div>
  )
}

const getContent = (content, id) => {
  var returnVal;
  if (!content) return;
  content.items.forEach((item) => {
    if (item && item.fields.name.toLowerCase() === id) {
      returnVal = item;
    }
  });
  return returnVal;
}

let options = {
  renderNode: {
    'embedded-asset-block': (node) =>
      <img className="embedded-image" src={node.data.target.fields.file.url} />
  }
}
