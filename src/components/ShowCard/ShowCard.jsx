import React from 'react';
import { format, isWithinRange } from 'date-fns';

const placeholderColors = ['#ee6b60', '#5bbfbf'];
const placeholderCards = ['blue_card.png', 'orange_card.png'];

export default props => {
  const { show, open, selectFn, index } = props;
  const {
    title,
    imgSrc,
    description,
    startDatetime,
    endDatetime,
    id,
    hosts,
    producers
  } = show;
  const background = imgSrc ? imgSrc : 'kuva_puuttuu_v2.jpg';
  const playingNow = isWithinRange(new Date(), startDatetime, endDatetime);
  return (
    <div
      key={`showCard-${id}`}
      className={`ShowCard ${open ? 'ShowCard-open' : ''} ${index % 2 === 0 ? 'ShowCard-even': 'ShowCard-odd'}`}
      onClick={selectFn}
      style={{
        cursor: selectFn ? 'pointer' : ''
      }}
      role="button">
      <div className="ShowCard-heroContainer">
        <img className="ShowCard-hero" src={background} />
        <div className="ShowCard-timeContainer">
          {playingNow && <h2 className="ShowCard-playingNow">Soi nyt</h2>}
          <h2
            className={`ShowCard-time ${index % 2 === 0 ? 'ShowCard-time-even': 'ShowCard-time-odd'}`}>
            {format(startDatetime, 'HH:mm')} - {format(endDatetime, 'HH:mm')}
          </h2>
        </div>
        <div className="ShowCard-info">
          <div className={`ShowCard-creators  ${index % 2 === 0 ? 'ShowCard-creators-even': 'ShowCard-creators-odd'}`}>
            <h2 className="ShowCard-hosts">Juontaa: {hosts}</h2>
            <h2 className="ShowCard-hosts">Tuottaa: {producers}</h2>
          </div>
          <h2
            className={`ShowCard-title  ${index % 2 === 0 ? 'ShowCard-title-even': 'ShowCard-title-odd'}`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>
      {open && (
        <div className="ShowCard-description">
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}
    </div>
  );
};
