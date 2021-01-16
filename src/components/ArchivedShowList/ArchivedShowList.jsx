import React, { useEffect } from 'react';
import { useDataSource } from '../../utils/dataEffect';
import ShowList from '../ShowList/ShowList'
import { SHOWLISTS } from '../../constants/showLists';
import useShowList from '../../utils/shows'

const ArchivedShowList = ({ showListKey }) => {
  const { contentfulId, folder } = SHOWLISTS[showListKey];

  return contentfulId
    ? <NewSchoolShowList contentfulId={contentfulId} />
    : <OldSchoolShowList folder={folder} />;
}

const OldSchoolShowList = ({ folder }) => {
  const { data, status } = useDataSource(`${folder}/program_data.json`);
  
  if (status !== 'SUCCESS') return null;

  // Contentful spits out Dates, so we have to convert our ISO-strings.
  const timesConverted = data.map(({ startDatetime, endDatetime, imgSrc, ...rest }) => ({
    start: Date.parse(startDatetime),
    end: Date.parse(endDatetime),
    picture: imgSrc ? `${folder}/${imgSrc}` : '/kuva_puuttuu_v2.jpg',
    ...rest
  }));

  return (
    <ShowList shows={timesConverted} />
  );
}

const NewSchoolShowList = ({ contentfulId }) => {
  const shows = useShowList(contentfulId);

  return (
    <ShowList shows={shows} />
  );
}

export default ArchivedShowList;