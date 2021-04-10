import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { groupBy } from 'ramda';

import WidescreenShowList from './WidescreenShowList';
import './ShowList.scss';
import ResponsiveShowList from './ResponsiveShowList';

const getDateKeyFormat = dateTime => format(dateTime, 'dd.M');

const byDate = groupBy(item => getDateKeyFormat(item.start));

const ShowList = ({ shows }) => {
  const [widescreenMode, setWidescreenMode] = useState(false);
  const [filtered, setFiltered] = useState(true);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize)
    }
  });

  const widescreen = screenWidth >= 1000;

  const groupedShows = byDate(shows);

  return (
    <div className="ShowList">
      <div className="ShowList-header">
        <h1 className="ShowList-title">Ohjelmistossa</h1>
        {Object.keys(groupedShows).includes(getDateKeyFormat(new Date())) && (
          <button
            className="Button ShowList-button"
            onClick={() => setFiltered(!filtered)}>
            {filtered ? 'Näytä menneet' : 'Piilota menneet'}
          </button>
        )}
        {widescreen && (
          <button
            className="Button ShowList-button"
            onClick={() => setWidescreenMode(!widescreenMode)}>
            {widescreenMode ? 'Ohjelmalista' : 'Ohjelmakartta'}
          </button>
        )}
      </div>
      {
        widescreen && widescreenMode
          ? <WidescreenShowList showData={shows} groupedShows={groupedShows} />
          : <ResponsiveShowList showData={shows} groupedShows={groupedShows} filtered={filtered} />
      }
    </div>
  )
}

export default ShowList;