import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { BiRadio } from 'react-icons/bi';

import './Header.scss';
import Hamburger from './Hamburger';
import Navigation from './Navigation';

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
  const [isMenuOpen, toggleMenu] = useState(false);

  if (loading || error) {
    return (
      <header className="Header"></header>
    );
  }

  const { links } = data.navigation.items[0];

  return (
    <div className="Header">
      <ul className="HeaderLinks">
        <li>
          <Link to="/">
            <BiRadio />
          </Link>
        </li>
        <Hamburger onClick={() => toggleMenu(!isMenuOpen)} isActive={isMenuOpen} />
      </ul>
      {isMenuOpen && <Navigation links={links.items} closeNav={() => toggleMenu(false)} />}
    </div>
  );
}

export default Header;