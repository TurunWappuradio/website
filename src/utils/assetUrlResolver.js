// Created with love using inspiration provided by Julius Rajala :)

import { useState, useEffect } from 'react';

import contentful from './contentful';

export default (assetId) => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === "") {
      setStatus("PENDING");
      contentful.getAsset(assetId)
        .then((response => {
          setStatus("SUCCESS");
          setUrl(response.fields.file.url);
        }))
    }
  });
  return url;
}
