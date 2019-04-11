import React from 'react';
import { format } from 'date-fns';

const placeholderColors = ['#ee6b60', '#5bbfbf'];
const placeholderCards = ['blue_card.png', 'orange_card.png'];

export default props => {
  const { show, open, selectFn } = props;
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
  const background = imgSrc ? imgSrc : placeholderCards[id % 2];
  return (
    <div
      key={`showCard-${id}`}
      className={`ShowCard ${open ? 'ShowCard-open' : ''}`}
      onClick={selectFn}
      style={{ backgroundColor: placeholderColors[id % 2] }}
      role="button">
      <div className="ShowCard-heroContainer">
        <img className="ShowCard-hero" src={background} />
        <h2 className="ShowCard-time">
          {format(startDatetime, 'HH:mm')} - {format(endDatetime, 'HH:mm')}
        </h2>
        <div className="ShowCard-creators">
          <h2 className="ShowCard-hosts">Juontaa: {hosts}</h2>
          <h2 className="ShowCard-hosts">Tuottaa: {producers}</h2>
        </div>
        <h2
          className="ShowCard-title"
          style={{ backgroundColor: placeholderColors[id % 2] }}>
          {title}
        </h2>
      </div>
      {open && (
        <div className="ShowCard-description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
