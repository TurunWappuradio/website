import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const uri = "https://graphql.contentful.com/content/v1/spaces/" + process.env.REACT_APP_TWR_SPACE;

const httpLink = createHttpLink({
  fetch,
  uri,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_TWR_CMS_API_KEY}`, 
    'Content-Language': 'en-us',
   },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;