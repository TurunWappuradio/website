import { createClient } from 'contentful';

const contentful = createClient({
  space: process.env.REACT_APP_TWR_SPACE,
  accessToken: process.env.REACT_APP_TWR_CMS_API_KEY
});

export default contentful;