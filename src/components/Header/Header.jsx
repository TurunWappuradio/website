import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import './Header.scss';

const query = gql`
  query getNavigation {
    navigation: navigationCollection(limit: 1) {
      items {
        links: pagesCollection(limit: 20) {
          items {
            name,
            slug
          }
        }
      }
    }
  }
`;

// FIXME: Nav position is off. Causes horizontal scroll.
const Header = () => {
  const { loading, error, data } = useQuery(query);

  if (loading || error) {
    return (
      <header className="Header"></header>
    );
  }

  const { links } = data.navigation.items[0];

  return (
    <div className="Header">
      <ul>
        <li>
          <Link to="/">
            Radio
          </Link>
        </li>
        {links.items.map(link => (
          <li>
            <Link to={link.slug}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;