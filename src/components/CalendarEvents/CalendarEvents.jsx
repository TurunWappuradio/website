import React, { useState, useEffect } from 'react';
import { startOfDay, format } from 'date-fns';
import fi from 'date-fns/locale/fi';
import './CalendarEvents.scss'

const EVENT_COUNT = 3;
const dateMax = new Date();
// Fetch next 4 events but not more than six months from now
dateMax.setMonth(new Date().getMonth() + 3);
const TIME_MIN = startOfDay(new Date()).toISOString();
const TIME_MAX = dateMax.toISOString();
const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&maxResults=${EVENT_COUNT}&timeMin=${TIME_MIN}&timeMax=${TIME_MAX}&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${process.env.GOOGLE_CALENDAR_API_KEY}&orderBy=startTime`;

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

        const formatRange = (start, end) => start + ' - ' + end;

        const loc = { locale: fi };
        const ONE_DAY_IN_MILLISECONDS = 86400000;
        const time = start.dateTime
          ? formatRange(
              format(new Date(start.dateTime), 'dddd, DD.MM. kello H:mm', loc),
              format(new Date(end.dateTime), 'H:mm', loc)
            )
          : formatRange(
              format(new Date(start.date), 'dddd DD.MM.', loc),
              format(
                new Date(end.date) - ONE_DAY_IN_MILLISECONDS,
                'dddd DD.MM.',
                loc
              )
            );

        return (
          <div className="CalendarEvent" key={idx}>
            <p>{time}</p>
            <h3>{summary}</h3>
            <p>{location}</p>
          </div>
        );
      })}
      <div className="align-right">
        <a href={process.env.GOOGLE_CALENDAR_SHARE_URL}>
          Lisää omaan kalenteriin
        </a>
      </div>
    </div>
  );
};
