import { useEffect, useState } from "react";

const getRequest = uri => {
  return window.fetch(uri).then(response => response.json());
};

export const useDataSource = uri => {
  const [dataState, setData] = useState({ data: {}, status: "" });
  useEffect(() => {
    if (dataState.status === "") {
      getRequest(uri)
        .then(data => setData({ data, status: "SUCCESS" }))
        .catch(err => {
          console.error("Data fetching failed.", err);
          setData({ ...dataState, status: "FAILURE" });
        });
    }
  });

  return dataState;
};
