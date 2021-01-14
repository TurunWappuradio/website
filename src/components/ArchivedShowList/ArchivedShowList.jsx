import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataSource } from '../../utils/dataEffect';
import ShowList from '../ShowList/ShowList'
import { SHOWLISTS } from '../../constants/showLists';
import useShowList from '../../utils/shows'

const ArchivedShowList = () => {
  const { showListKey } = useParams();

  const { contentfulId, title, folder } = SHOWLISTS[showListKey];

  if (contentfulId) {
    return (
      <NewSchoolShowList title={title} contentfulId={contentfulId} />
    );
  }

  return (
    <OldSchoolShowList title={title} folder={folder} />
  )
}

const OldSchoolShowList = ({ title, folder }) => {
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
    <ShowList title={title} shows={timesConverted} />
  );
}

const NewSchoolShowList = ({ title, contentfulId }) => {
  const shows = useShowList(contentfulId);

  return (
    <ShowList title={title} shows={shows} />
  );
}

export default ArchivedShowList;