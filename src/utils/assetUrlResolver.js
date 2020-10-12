// Created with love using inspiration provided by Julius Rajala :)

import { useState, useEffect } from 'react';

import contentful from './contentful';

export default (assetId) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    contentful.getAsset(assetId)
      .then((response => 
        setUrl(response.fields.file.url)))
  });
  return url;
}
