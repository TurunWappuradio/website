// Created with love using inspiration provided by Julius Rajala :)

import { useState, useEffect } from 'react';

import contentful from './contentful';

export default (queryObject) => {
  const [entries, setEntries] = useState({ data: null, result: "" });

  useEffect(() => {
    if (entries.result === "") {
      setEntries({ data: null, result: "PENDING" })
      contentful.getEntries(queryObject)
        .then(response => {
          setEntries({ data: response.toPlainObject(), result: "SUCCESS" });
        });
    }
  });
  return entries;
}
