import React from 'react';

import useSponsors from '../../utils/sponsors';
import './Sponsors.scss';

export default () => {
  const sponsors = useSponsors();

  return (
    <div className="RadioSponsors">
      <h2 className="Subtitle">Syssyradion tukena</h2>
      <div className="RadioSponsors-items">
        {sponsors.map(sponsor => (
          <a className="RadioSponsors-container" target="_blank" href={sponsor.link} key={sponsor.title}>
            <img className="RadioSponsors-logo" src={sponsor.imageUrl} alt={sponsor.title} />
          </a>
        ))}
      </div>
    </div>
  );
}