import ReactGA from 'react-ga';

const GA_ID = process.env.REACT_APP_GA_ID;

ReactGA.initialize(GA_ID);

export const pageview = () => GA_ID && ReactGA.pageview(window.location.pathname + window.location.search); 