import React, { useState } from 'react';
import { format, isBefore } from 'date-fns';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';
import Dropdown from '../common/Dropdown';
import SelectButton from '../common/SelectButton';

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

  const [openDate, setOpenDate] = useState(initialDate(dateKeys));

  const selectedTimes = openDate && groupedShows[openDate];
  const shouldApplyFilter =
    filtered && openDate === getDateKeyFormat(new Date());
  const timesWithAppliedFilter = shouldApplyFilter
    ? selectedTimes.filter(show => !isBefore(show.end, new Date()))
    : selectedTimes;

  return (
    <div className="ShowListContainer">
      <div className="ShowList-selector">
        {dateKeys.map(date => (
          <SelectButton key={date} selected={openDate === date} onClick={() => setOpenDate(date)}>
            {format(groupedShows[date][0].start, 'EEEE d.M.', {
              locale: fi
            })}
          </SelectButton>
        ))}
      </div>
      <div className="ShowList-responsive">
        <Dropdown
          className="ShowList-selector--mobile"
          options={mobileSelectorOptions(groupedShows, dateKeys)}
          onChange={opt => setOpenDate(opt.value)}
          value={openDate}
          placeholder="Valitse päivä"
        />
        {timesWithAppliedFilter &&
          timesWithAppliedFilter.map((item, idx) => (
            <ShowCard
              index={idx}
              key={idx}
              show={item}
            />
          ))}
      </div>
    </div>
  );
};

const mobileSelectorOptions = (groupedShows, dates) => {
  return dates.map(date => {
    return {
      label: format(groupedShows[date][0].start, 'EEEE d.M.', {
        locale: fi
      }),
      value: date
    };
  });
};
