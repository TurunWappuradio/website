import React, { useState, useEffect } from 'react';
import { groupBy, keys } from 'ramda';
import { format, isWithinInterval, isBefore } from 'date-fns';
import fetchEntries from '../../utils/dataEntries'

import ResponsiveShowList from './ResponsiveShowList';
import WidescreenShowList from './WidescreenShowList';
import './ShowList.scss'

const getDateKeyFormat = dateTime => format(dateTime, 'dd.M');

const byDate = groupBy(item => getDateKeyFormat(Date.parse(item.fields.start)));

export default () => {
  const [filtered, setFiltered] = useState(true);
  const [widescreenMode, setWidescreenMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selected, setSelected] = useState();
  const [openDate, setOpenDate] = useState();

  const showDataResult = fetchEntries({
    content_type: 'programme',
  });
  const showData = showDataResult.result !== "SUCCESS" ? null : showDataResult.data.items[0].fields.shows;
  const groupedShows = showData ? byDate(showData) : [];

  useEffect(() => {
    const resize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize)
    }
  })

  useEffect(() => {
    const currentTime = new Date();
    const dateKeys = Object.keys(groupedShows);
    const dateKey = getDateKeyFormat(currentTime);
    const inRange = dateKeys.includes(dateKey);

    const currentShowId = inRange
      ? getFirstShow(groupedShows, dateKey, currentTime).id
      : '';
    const initialOpenDate = inRange ? dateKey : dateKeys[0];
    setSelected(currentShowId);
    setOpenDate(initialOpenDate);
  }, [groupedShows])

  const dates = keys(groupedShows);
  const inRange = dates.includes(getDateKeyFormat(new Date()));
  const selectedTimes = openDate && groupedShows[openDate];
  const shouldApplyFilter =
    filtered && openDate === getDateKeyFormat(new Date());
  const timesWithAppliedFilter = shouldApplyFilter
    ? selectedTimes.filter(show => !isBefore(show.endDatetime, new Date()))
    : selectedTimes;
  const widescreen = screenWidth >= 1200 && widescreenMode;

  return (
    <div className="ShowList">
      <div className="ShowList-header">
        <h1 className="ShowList-title">Ohjelmistossa</h1>
        {!widescreen && inRange && (
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
      {widescreen ? (
        <WidescreenShowList showData={showData} groupedShows={groupedShows} />
      ) : (
          <ResponsiveShowList
            dates={dates}
            openDate={openDate}
            selected={selected}
            groupedShows={groupedShows}
            timesWithAppliedFilter={timesWithAppliedFilter}
            onSelectDate={date => setOpenDate(date)}
            onSelectShow={item => {
              if (selected === item.id) {
                setSelected('');
              } else {
                setSelected(item.id);
              }
            }}
          />
        )
      }
    </div>
  );
}

const getFirstShow = (groupedData, dateKey, currentTime) => {
  return (
    groupedData[dateKey].find(item => {
      return isWithinInterval(currentTime, { start: item.fields.start, end: item.fields.end });
    }) || groupedData[dateKey][0]
  );
}
