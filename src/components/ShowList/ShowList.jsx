import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { groupBy, keys } from 'ramda';

import useLiveShows from '../../utils/liveShows';
import WidescreenShowList from './WidescreenShowList';
import './ShowList.scss';

const getDateKeyFormat = dateTime => format(dateTime, 'dd.M');

const byDate = groupBy(item => getDateKeyFormat(item.start));

const ShowList = () => {
  const shows = useLiveShows();
  const [filtered, setFiltered] = useState(true);
  const [widescreenMode, setWidescreenMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize)
    }
  });

  console.log(shows);


  const groupedShows = byDate(shows)
  const dates = keys(groupedShows);
  const inRange = dates.includes(getDateKeyFormat(new Date()));
  const widescreen = screenWidth >= 1200 && widescreenMode;


  return (
    <div className="ShowList">
      <div className="ShowList-header">
        <h1 className="ShowList-title">Ohjelmistossa</h1>
        {inRange && (
          <button
            className="ShowList-filterButton"
            onClick={() => setFiltered(!filtered)}>
            {filtered ? 'Näytä menneet' : 'Piilota menneet'}
          </button>
        )}
        <button
          className="ShowList-widescreenButton"
          onClick={() => setWidescreenMode(!widescreenMode)}>
          {widescreenMode ? 'Ohjelmalista' : 'Ohjelmakartta'}
        </button>
      </div>
      <WidescreenShowList showData={shows} groupedShows={groupedShows} />
    </div>
  )
}

export default ShowList;