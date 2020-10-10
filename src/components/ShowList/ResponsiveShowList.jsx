import React from 'react';
import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';

export default ({
  dates,
  openDate,
  selected,
  groupedShows,
  timesWithAppliedFilter,
  onSelectDate,
  onSelectShow
}) => {
  return (
    <div className="ShowList-responsive">
      <div className="ShowList-selector">
        {dates.map(date => (
          <button
            className= {`ShowList-dayButton ${openDate === date ? 'ShowList-dayButton-open-day' : ''}`}
            key={date}
            onClick={() => onSelectDate(date)}>
            {openDate === date
              ? format(Date.parse(groupedShows[date][0].fields.start), 'EEEE dd.M.', {
                  locale: fi
                })
              : format(Date.parse(groupedShows[date][0].fields.start), 'E dd.M.', {
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
            selectFn={() => onSelectShow(item)}
          />
        ))}
    </div>
  );
};
