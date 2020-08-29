// Created with love using inspiration provided by Julius Rajala :)

import { useState, useEffect } from 'react';
import {createClient} from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_TWR_SPACE,
  accessToken: process.env.REACT_APP_TWR_CMS_API_KEY
});

export default (assetId) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    client.getAsset(assetId)
      .then((response => 
        setUrl(response.fields.file.url)))
  });
  return url;
}
