import React from 'react';
import { format, differenceInHours, startOfDay, getHours } from 'date-fns';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';

const timeStamps = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23'
];

const placeholderColors = ['#ee6b60', '#5bbfbf'];

export default ({ groupedShows, onChangeSelected }) => {
  return (
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
            {format(day[0].startDatetime, 'dd DD.M.', {
              locale: fi
            })}
          </p>
          {// spacer for the first day, broadcast never starts at 00:00
          idx === 0 && (
            <div
              className={
                'ShowList-daySpacer height-' +
                differenceInHours(
                  day[0].startDatetime,
                  startOfDay(day[0].startDatetime)
                )
              }
            />
          )}
          {day.map((item, idx) => (
            <WidescreenCard
              title={item.title}
              showLength={differenceInHours(
                item.endDatetime,
                item.startDatetime
              )}
              endHour={getHours(item.endDatetime)}
              onClick={() => console.log('clicked')}
              key={idx}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const WidescreenCard = ({ title, showLength, endHour, onClick }) => (
  <div className={'ShowList-widescreenCardContainer height-' + showLength}>
    <div
      className={'ShowList-widescreenCard color-' + endHour}
      onClick={onClick}>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  </div>
);
