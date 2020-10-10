import { useState, useEffect } from 'react';

import contentful from './contentful';
import { CURRENT_SHOWLIST } from '../constants/contentTypes';

const useLiveShows = () => {
  const [liveShowList, setLiveShowList] = useState([]);

  useEffect(() => {
    const getLiveShowList = async () => {
      // this requires 2 request because the delivery API only delivers entries of depth 1.
      const currentShowList = await contentful.getEntries({ content_type: CURRENT_SHOWLIST });
      const currentShowListId = currentShowList.includes.Entry[0].sys.id;
      const showList = await contentful.getEntry(currentShowListId);

      const showListMapped = showList.toPlainObject().fields.shows.map(show => {
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

      setLiveShowList(showListMapped);
    };
    getLiveShowList();
  }, []);
  return liveShowList;
}

export default useLiveShows;