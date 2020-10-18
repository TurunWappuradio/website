import { useState, useEffect } from 'react';

import contentful from './contentful';
import { CURRENT_SHOWLIST } from '../constants/contentTypes';

const useLiveShowListId = () => {
  const [liveShowList, setLiveShowList] = useState(null);

  useEffect(() => {
    const getLiveShowList = async () => {
      const currentShowList = await contentful.getEntries({ content_type: CURRENT_SHOWLIST });
      const currentShowListId = currentShowList.includes
        ? currentShowList.includes.Entry[0].sys.id
        : 'no-showlist';

      setLiveShowList(currentShowListId);
    };
    getLiveShowList();
  }, []);
  return liveShowList;
}

export default useLiveShowListId;