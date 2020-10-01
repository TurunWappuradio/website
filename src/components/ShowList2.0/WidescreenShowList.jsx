import React, { useState } from 'react';
import { format, differenceInMinutes, startOfDay } from 'date-fns';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';

// prettier-ignore
const timeStamps = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
                    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

export default ({ showData, groupedShows }) => {
  const [selected, setSelected] = useState(null);
  const selectedIdx = showData.findIndex(item => item.id === selected);

  const startTime = show => Date.parse(show.fields.start);
  const endTime = show => Date.parse(show.fields.end);

  return (
    <div className="ShowList-widescreenContainer">
      {selected !== null && (
        <ShowCard
          show={showData[selectedIdx]}
          open={true}
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
        {Object.values(groupedShows).map((day, idx) => (
          <div className="ShowList-day" key={idx}>
            <p className="ShowList-dayTitle">
              {format(startTime(day[0]), 'dd dd.M.', {
                locale: fi
              })}
            </p>
            {// spacer for the first day, broadcast never starts at 00:00
            idx === 0 && (
              <div
                className={
                  'ShowList-daySpacer height-' +
                  differenceInMinutes(
                    startTime(day[0]),
                    startOfDay(startTime(day[0]))
                  )
                }
              />
            )}
            {day.map((item, idx) => (
              <WidescreenCard
                title={item.fields.name}
                showLength={differenceInMinutes(
                  endTime(item),
                  startTime(item)
                )}
                color={item.color}
                onClick={() => setSelected(item.id)}
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
