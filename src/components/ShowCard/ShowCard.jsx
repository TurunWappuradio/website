import React from 'react';

export default props => {
  const { show, open, selectFn } = props;
  const { title, imgSrc, description } = show;
  console.log(open);
  return (
    <div
      className={`ShowCard ${open ? 'ShowCard-open' : ''}`}
      onClick={selectFn}>
      <div
        className="ShowCard-hero"
        role="button"
        style={{ backgroundImage: `url(${imgSrc})` }}>
        <h2 className="ShowCard-title">{title}</h2>
      </div>
      <div className="ShowCard-content">
        {open && <p className="ShowCard-description">{description}</p>}
      </div>
    </div>
  );
};
