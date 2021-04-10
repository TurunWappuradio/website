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
  const { loading, error, data } = useQuery(query);
  const [isMenuOpen, toggleMenu] = useState(false);

  if (loading || error) {
    return (
      <header className="Header"></header>
    );
  }

  const { links, burgerMenuLinks, burgerMenuLinksExt } = data.navigation.items[0];

  console.log({ links, burgerMenuLinks, burgerMenuLinksExt })

  return (
    <div className="Header">
      <ul className="HeaderLinks">
        <li>
          <Link to="/">
            <BiRadio />
          </Link>
        </li>
        <Hamburger onClick={() => toggleMenu(!isMenuOpen)} isActive={isMenuOpen} />
        {isMenuOpen && <Navigation links={burgerMenuLinks.items} extLinks={burgerMenuLinksExt.items} />}
      </ul>
    </div>
  );
}

export default Header;