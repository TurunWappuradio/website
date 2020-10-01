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
      setLiveShowList(showList.toPlainObject().fields.shows);
    };
    getLiveShowList();
  }, []);
  return liveShowList;
}

export default useLiveShows;