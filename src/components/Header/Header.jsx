import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import './Header.scss';

const query = gql`
  query getNavigation {
    navigation: navigationCollection(limit: 1) {
      items {
        links: pagesCollection(limit: 3) {
          items {
            name,
            slug
          }
        },
        burgerMenuLinks: burgerMenuLinksCollection(limit: 20) {
          items {
            name,
            slug
          }
        },
        burgerMenuLinksExt: burgerMenuLinksExtCollection(limit: 3) {
          items {
            title,
            url
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(query)

  if (loading || error) {
    return (
      <header className="Header"></header>
    );
  }

  const { links, burgerMenuLinks, burgerMenuLinksExt } = data.navigation.items[0];

  return (
    <div className="Header">
      <ul>
        <li>
          <Link to="/">
            Radio
          </Link>
        </li>
        {links.items.map((item, idx) => (
          <li key={idx}>
            <Link to={`/${item.slug.toLowerCase()}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;