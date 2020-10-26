import { useState, useEffect } from 'react';

import contentful from './contentful';
import { SPONSORS } from '../constants/contentTypes';

const useSponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const getSponsors = async () => {
      const result = await contentful.getEntries({ content_type: SPONSORS });

      const sponsorsList = result.includes.Entry.map(sponsor => {
        const { title, link, logoImage } = sponsor.fields;

        return {
          title,
          link,
          imageUrl: logoImage.fields.file.url
        }
      })
      
      setSponsors(sponsorsList);
    };
    getSponsors();
  }, []);
  return sponsors;
}

export default useSponsors;