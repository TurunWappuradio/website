// Created with love using inspiration provided by Julius Rajala :)

import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_TWR_SPACE,
  accessToken: process.env.REACT_APP_TWR_CMS_API_KEY
});

export default (queryObject) => {
  const [entries, setEntries] = useState({ data: null, result: "" });
  useEffect(() => {
    if (entries.result === "") {
      client.getEntries(queryObject)
        .then((response => {
          console.log(response);
          setEntries({ data: response.items, result: "SUCCESS" });
        }))
    }
  });
  return entries;
}
