import React, { useState, useEffect } from 'react';
import { format, isWithinInterval } from 'date-fns';
import './ShowCard.scss';

export default props => {
  const { show, forceOpen, index } = props;
  const {
    name,
    description,
    start,
    end,
    hosts,
    producer,
    picture
  } = show;

  const [isOpen, toggleOpen] = useState(forceOpen);

  // close cards on day change.
  useEffect(() => {
    if (!forceOpen) {
      toggleOpen(false);
    }
  }, [name, forceOpen]);

  const handleClick = () => toggleOpen(!isOpen);

  const pictureResized = `${picture}?w=900`;

  const playingNow = isWithinInterval(new Date(), { start, end });

  return (
    <div
      key={`showCard-${'id'}`}
      className={`
        ShowCard
        ${isOpen ? 'ShowCard-open' : ''}
        ${index % 2 === 0 ? 'ShowCard-even': 'ShowCard-odd'}
        ${forceOpen ? '' : 'ShowCard-clickable'}
      `}
      onClick={forceOpen ? undefined : handleClick}
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
      {isOpen && (
        <div className="ShowCard-description">
          <h1 dangerouslySetInnerHTML={{ __html: name }}></h1>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}
    </div>
  );
};
