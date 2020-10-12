import React from 'react';
import { format, isWithinInterval } from 'date-fns';
import './ShowCard.scss';

export default props => {
  const { show, open, selectFn, index } = props;
  const {
    name,
    description,
    start,
    end,
    hosts,
    producer,
    picture
  } = show;

  const pictureResized = `${picture}?w=900`;

  const playingNow = isWithinInterval(new Date(), { start, end });

  return (
    <div
      key={`showCard-${'id'}`}
      className={`ShowCard ${open ? 'ShowCard-open' : ''} ${index % 2 === 0 ? 'ShowCard-even': 'ShowCard-odd'}`}
      onClick={selectFn}
      style={{
        cursor: selectFn ? 'pointer' : ''
      }}
      role="button">
      <div className="ShowCard-heroContainer">
        <img className="ShowCard-hero" src={pictureResized} alt="" />
        <div className="ShowCard-timeContainer">
          {playingNow && <h2 className="ShowCard-playingNow">Soi nyt</h2>}
          <h2
            className={`ShowCard-time ${index % 2 === 0 ? 'ShowCard-time-even': 'ShowCard-time-odd'}`}>
            {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
          </h2>
        </div>
        <div className="ShowCard-info">
          <div className={`ShowCard-creators  ${index % 2 === 0 ? 'ShowCard-creators-even': 'ShowCard-creators-odd'}`}>
            <h2 className="ShowCard-hosts">Juontaa: {hosts}</h2>
            <h2 className="ShowCard-hosts">Tuottaa: {producer}</h2>
          </div>
          <h2
            className={`ShowCard-title  ${index % 2 === 0 ? 'ShowCard-title-even': 'ShowCard-title-odd'}`}
            dangerouslySetInnerHTML={{ __html: name }}
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
