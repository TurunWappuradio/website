import React from 'react';
import { Link } from 'react-router-dom';

import { SHOWLISTS } from '../../constants/showLists';
import './ArchiveLinks.scss';

const ArchiveLinks = () => {
  return (
    <div className="ArchiveLinks">
      {Object.values(SHOWLISTS).map(({ title, url, buttonImage }, idx) => (
        <LinkCard text={title} url={url} backgroundImage={buttonImage} idx={idx} key={idx} />
      ))}
    </div>
  )
}

const LinkCard = ({ url, backgroundImage, idx, text }) => (
  <Link to={url}
    className={`
      ArchiveLinks-card
      ${idx % 2 === 0 ? 'ArchiveLinks-card--even' : 'ArchiveLinks-card--odd'}
    `}
    style={{ backgroundImage: `url(${backgroundImage})` }}>
    <h1>{text}</h1>
  </Link>
)

export default ArchiveLinks;