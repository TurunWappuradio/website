import { useState, useEffect } from 'react';

import contentful from './contentful';

const useShowList = (listId) => {
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    const getShowList = async () => {
      // Wait for listId to load.
      if (!listId || listId === '' || listId === 'no-showlist') return;

      const showListContent = await contentful.getEntry(listId);

      const showListMapped = showListContent.toPlainObject().fields.shows.map(show => {
        const { start, end, name, description, hosts, producer, picture, color } = show.fields;

        return {
          id: show.sys.id,
          start: Date.parse(start),
          end: Date.parse(end),
          name: name || 'Salainen ohjelma',
          description: description || 'Tämä ohjelmanumero on salainen. Me ei kerrota mikä se on.',
          hosts: hosts || 'Haamujuontaja',
          producer: producer || 'Toimitus',
          picture: picture ? picture.fields.file.url : 'kuva_puuttuu_v2.jpg',
          color: color || 'normal',
        };
      });

      setShowList(showListMapped);
    };
    getShowList();
  }, [listId]);
  return showList;
}

export default useShowList;