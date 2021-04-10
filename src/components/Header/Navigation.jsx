import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ links, linksExt }) => (
  <div className="Navigation">
    {links.map(({ name, slug }) => (
      <Link to={slug}>
        {name}
      </Link>
    ))}
  </div>
);

export default Navigation;