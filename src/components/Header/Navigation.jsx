import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ links, closeNav }) => (
  <div className="Navigation">
    {links.map(({ name, slug }) => (
      <Link to={slug} onClick={closeNav}>
        {name}
      </Link>
    ))}
  </div>
);

export default Navigation;