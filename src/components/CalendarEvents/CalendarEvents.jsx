import React, { useState, useEffect } from 'react';
import { startOfDay, format } from 'date-fns';
import fi from 'date-fns/locale/fi';

const EVENT_COUNT = 3;
const dateMax = new Date()
// Fetch next 4 events but not more than six months from now
dateMax.setMonth(new Date().getMonth() + 3)
const TIME_MIN = startOfDay(Date()).toISOString()
const TIME_MAX = dateMax.toISOString()
const eventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?alwaysIncludeEmail=false&maxResults=${EVENT_COUNT}&timeMin=${TIME_MIN}&timeMax=${TIME_MAX}&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${process.env.GOOGLE_CALENDAR_API_KEY}&orderBy=startTime`

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
        const { summary, location } = event;
        const startDateTime = new Date(event.start.date || event.start.dateTime)
        const start = format(startDateTime, 'dddd, DD.MM. kello H:mm', { locale: fi })

        return (
          <div className="CalendarEvent" key={idx}>
            <p>{start}</p>
            <h3>{summary}</h3>
            <p>{location}</p>
          </div>
        );
      })}
      <div className="align-right">
        <a href={process.env.GOOGLE_CALENDAR_SHARE_URL}>Lisää omaan kalenteriin</a>
      </div>
    </div>
  )
};
