import React from 'react';
import fetchEntries from '../../utils/dataEntries';
import { NAVIGATION } from '../../constants/contentTypes';
import { Link } from 'react-router-dom';
import './Header.scss';


export default () => {
  const nav = fetchEntries({
    content_type: NAVIGATION,
  }).data;

  return (
    <div className="Header">
      <ul>
        <li>
          <Link to="/">Radio</Link>
        </li>
        {nav && nav.items && nav.items[0].fields.pages.map((item, idx) => (
          <li key={idx}>
            <Link to={`/${item.fields.slug.toLowerCase()}`}>
              {item.fields.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}