import React from 'react';
import {
  useParams
} from "react-router-dom";

export default (props) => {
  const { id } = useParams();
  console.log(props.content);
  const content = getContent(props.content, id);
  console.log(content);
  return (
  <div className="ContentPage">{content && content.fields.name}</div>
  )
}

const getContent = (content, id) => {
  var returnVal;
  if (!content) return;
  content.items.forEach((item) => {
    if (item && item.fields.name === id){
      returnVal = item;
    }
  });
  return returnVal;
}
