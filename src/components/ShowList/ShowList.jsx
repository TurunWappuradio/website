import React, { useState } from 'react';
import { format } from 'date-fns';
import { groupBy } from 'ramda';

import useLiveShows from '../../utils/liveShows';
import WidescreenShowList from './WidescreenShowList';
import './ShowList.scss';
import ResponsiveShowList from './ResponsiveShowList';

const getDateKeyFormat = dateTime => format(dateTime, 'dd.M');

const byDate = groupBy(item => getDateKeyFormat(item.start));

const ShowList = () => {
  const shows = useLiveShows();
  const [widescreenMode, setWidescreenMode] = useState(false);

  /* temporarily removed blocking fullsize showlist on mobile for Syssyradio. Uncomment for wappu.

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize)
    }
  });

  const widescreen = screenWidth >= 1200 && widescreenMode;
  */

  const groupedShows = byDate(shows);

  return (
    <div className="ShowList">
      <div className="ShowList-header">
        <h1 className="ShowList-title">Ohjelmistossa</h1>
        <button
          className="ShowList-widescreenButton"
          onClick={() => setWidescreenMode(!widescreenMode)}>
          {widescreenMode ? 'Ohjelmalista' : 'Ohjelmakartta'}
        </button>
      </div>
      {
        widescreenMode
          ? <WidescreenShowList showData={shows} groupedShows={groupedShows} />
          : <ResponsiveShowList showData={shows} groupedShows={groupedShows} />
      }
    </div>
  )
}

export default ShowList;