import React from 'react';

export default (props) => {
  const { show, open, selectFn } = props;
  const {title, imgSrc, description } = show;
  console.log(open);
  return (
    <div
    role="button"
    onClick={selectFn}
    className={`ShowCard ${open ? 'ShowCard-open' : ''}`}
    style={{backgroundImage: `url(${imgSrc})`}}>
      <h2 className="ShowCard-title">{title}</h2>
      <p className="ShowCard-description">{description}</p>
    </div>
  );
}
