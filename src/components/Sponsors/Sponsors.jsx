import React from 'react';
import { useQuery, gql } from '@apollo/client';

import './Sponsors.scss';

const query = gql`
  query {
    sponsors: sponsorsCollection(limit:1) {
      items {
        sponsorsCollection {
          items {
            title,
            link,
            isRoundedBorders,
            logoImage {
              url
            }
          }
        }
      }
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(query);

  if (loading || error) return null;

  const sponsors = data.sponsors.items[0].sponsorsCollection.items;

  return (
    <div className="RadioSponsors">
      <h2 className="Subtitle">Wappuradion tukena</h2>
      <div className="RadioSponsors-items">
        {sponsors.map(({ link, title, isRoundedBorders, logoImage }) => (
          <a className="RadioSponsors-container" target="_blank" href={link} key={title}>
            <img 
              className="RadioSponsors-logo"
              style={{ borderRadius: isRoundedBorders ? '4px' : 0 }}
              src={logoImage.url}
              alt={title} />
          </a>
        ))}
      </div>
    </div>
  );
}