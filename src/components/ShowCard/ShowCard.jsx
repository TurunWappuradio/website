import React from 'react';
import { format } from 'date-fns';

const placeholderColors = ['#ee6b60', '#5bbfbf'];

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
  const background = imgSrc ? `url(${imgSrc})` : placeholderColors[id % 2];
  return (
    <div
      key={`showCard-${id}`}
      className={`ShowCard ${open ? 'ShowCard-open' : ''}`}
      onClick={selectFn}>
      <div className="ShowCard-hero" role="button" style={{ background }}>
        <h2 className="ShowCard-time">
          {format(startDatetime, 'HH:mm')} - {format(endDatetime, 'HH:mm')}
        </h2>
        <div className="ShowCard-creators">
          <h2 className="ShowCard-hosts">Juontaa: {hosts}</h2>
          <h2 className="ShowCard-hosts">Tuottaa: {producers}</h2>
        </div>
        <h2 className="ShowCard-title">{title}</h2>
      </div>
      <div
        style={{ borderColor: placeholderColors[id % 2] }}
        className="ShowCard-content">
        {open && <p className="ShowCard-description">{description}</p>}
      </div>
    </div>
  );
};
