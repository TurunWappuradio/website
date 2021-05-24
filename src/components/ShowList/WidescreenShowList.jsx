import React, { useState } from 'react';
import { getISOWeek, format, differenceInMinutes, startOfDay } from 'date-fns';
import fi from 'date-fns/locale/fi';
import { groupBy } from 'ramda';

import ShowCard from '../ShowCard/ShowCard';
import SelectButton from '../common/SelectButton';

const groupByWeek = groupBy(day => getISOWeek(day[0].start)); 

const getInitialWeek = (weeks) => {
  const currentWeek = getISOWeek(new Date());
  if (weeks.includes(currentWeek)) {
    return currentWeek;
  }
  return weeks[0];
}

// prettier-ignore
const timeStamps = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
                    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

export default ({ showData, groupedShows }) => {
  const showsGroupedByWeek = groupByWeek(Object.values(groupedShows));

  const [openWeek, setWeek] = useState(getInitialWeek(Object.keys(showsGroupedByWeek)));
  const [selected, setSelected] = useState(null);
  const selectedIdx = showData.findIndex(item => item.id === selected);

  return (
    <div className="ShowList-widescreenContainer">
      {Object.keys(showsGroupedByWeek).length > 1 && (
        <div className="ShowList-weekselector">
          {Object.keys(showsGroupedByWeek).map(week => (
            <SelectButton
              selected={openWeek === week}
              key={week}
              onClick={() => setWeek(week)}>
              Viikko {week}
            </SelectButton>
          ))}
        </div>
      )}
      {selected !== null && (
        <ShowCard
          show={showData[selectedIdx]}
          forceOpen={true}
          index={selectedIdx}
        />
      )}
      <div className="ShowList-widescreen">
        <div className="ShowList-timestampContainer">
          {timeStamps.map((time, idx) => (
            <p key={idx} className="ShowList-timestamp">
              {time}
            </p>
          ))}
        </div>
        {Object.values(showsGroupedByWeek[openWeek]).map((day, idx) => (
          <div className="ShowList-day" key={idx}>
            <p className="ShowList-dayTitle">
              {format(day[0].start, 'EEEEEE dd.M.', {
                locale: fi
                
              })}
            </p>
            {// spacer for the first day, broadcast never starts at 00:00
            idx === 0 && (
              <div
                className={
                  'ShowList-daySpacer height-' +
                  differenceInMinutes(
                    day[0].start,
                    startOfDay(day[0].start)
                  )
                }
              />
            )}
            {day.map(({ name, start, end, color, id }, idx) => (
              <WidescreenCard
                title={name}
                showLength={differenceInMinutes(end, start)}
                color={color}
                onClick={() => setSelected(id)}
                key={idx}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const WidescreenCard = ({ title, showLength, color, onClick }) => (
  <div className={'ShowList-widescreenCardContainer height-' + showLength}>
    <div className={'ShowList-widescreenCard color-' + color} onClick={onClick}>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  </div>
);
