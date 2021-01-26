import React, { useState, useEffect } from 'react';
import { startOfDay, format, differenceInDays } from 'date-fns';
import fi from 'date-fns/locale/fi';
import './CalendarEvents.scss'

const EVENT_COUNT = 3;
const dateMax = new Date();
// Fetch next 4 events but not more than six months from now
dateMax.setMonth(new Date().getMonth() + 3);
const TIME_MIN = startOfDay(new Date()).toISOString();
const TIME_MAX = dateMax.toISOString();
const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&maxResults=${EVENT_COUNT}&timeMin=${TIME_MIN}&timeMax=${TIME_MAX}&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY}&orderBy=startTime`;

export default () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(eventsUrl)
      .then(response => response.json())
      .then(json => setEvents(json.items));
  }, []);

  if (events.length === 0) return null;

  return (
    <div className="CalendarContainer">
      <h2>Tapahtumat</h2>
      {events.map((event, idx) => {
        const { summary, location, start, end } = event;

        return (
          <div className="CalendarEvent" key={idx}>
            <p>{formatTimestamp(start, end)}</p>
            <h3>{summary}</h3>
            <p>{location}</p>
          </div>
        );
      })}
      <div className="align-right">
        <a href={process.env.REACT_APP_GOOGLE_CALENDAR_SHARE_URL}>
          Lisää omaan kalenteriin
        </a>
      </div>
    </div>
  );
};

const formatTimestamp = (start, end) => {
  const loc = { locale: fi };

  // includes time for event.
  if (start.dateTime) {
    const startFormatted = format(new Date(start.dateTime), 'EEEE, dd.MM. \'kello\' H:mm', loc);
    const endFormatted = format(new Date(end.dateTime), 'H:mm', loc);
    return concat(startFormatted, endFormatted);
  }

  const startDate = new Date(start.date);
  const endDate = new Date(end.date);

  // event length is 1 day.
  if (differenceInDays(endDate, startDate) === 1) {
    return format(startDate, 'EEEE dd.MM.', loc);
  }

  const startFormatted = format(startDate, 'EEEE dd.MM.', loc);

  // subtract one, as the end date is always set to midnight causing an off-by-one
  const ONE_DAY_IN_MILLISECONDS = 86400000;
  const endFormatted = format(endDate - ONE_DAY_IN_MILLISECONDS, 'EEEE dd.MM.', loc);

  return concat(startFormatted, endFormatted);
}

const concat = (start, end) => `${start} - ${end}`;
