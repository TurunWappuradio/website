export const GA_ID = process.env.REACT_APP_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = path => {
  window.gtag('config', GA_ID, {
    page_path: path
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
