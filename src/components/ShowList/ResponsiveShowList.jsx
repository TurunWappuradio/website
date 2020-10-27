import React, { useState } from 'react';
import { format, isBefore } from 'date-fns';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';

const getDateKeyFormat = dateTime => format(dateTime, 'dd.M');

const initialDate = (dateKeys) => {
  const currentTime = new Date();
  const dateKey = getDateKeyFormat(currentTime);
  const inRange = dateKeys.includes(dateKey);
  const initial = inRange ? dateKey : dateKeys[0];
  return initial;
}

export default ({ showData, groupedShows, filtered }) => {
  // wait for shows to load.
  if (showData.length === 0) {
    return null;
  }

  const dateKeys = Object.keys(groupedShows);

  const [selected, setSelected] = useState();
  const [openDate, setOpenDate] = useState(initialDate(dateKeys));

  const selectedTimes = openDate && groupedShows[openDate];
  const shouldApplyFilter =
    filtered && openDate === getDateKeyFormat(new Date());
  const timesWithAppliedFilter = shouldApplyFilter
    ? selectedTimes.filter(show => !isBefore(show.end, new Date()))
    : selectedTimes;

  return (
    <div className="ShowList-responsive">
      <div className="ShowList-selector">
        {dateKeys.map(date => (
          <button
            className= {`ShowList-dayButton ${openDate === date ? 'ShowList-dayButton-open-day' : ''}`}
            key={date}
            onClick={() => setOpenDate(date)}>
            {format(groupedShows[date][0].start, 'EEEE dd.M.', {
              locale: fi
            })}
          </button>
        ))}
      </div>
      {timesWithAppliedFilter &&
        timesWithAppliedFilter.map((item, idx) => (
          <ShowCard
            index={idx}
            key={idx}
            show={item}
            open={item.id === selected}
            selectFn={() => setSelected(selected === item.id ? '' : item.id)}
          />
        ))}
    </div>
  );
};
