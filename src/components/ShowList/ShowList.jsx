import React from 'react';
import { groupBy, keys, head } from 'ramda';
import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';
import { getProgramData } from '../../utils/data';

const byDate = groupBy(item => format(item.startDatetime, 'DD.M').toString());

const mockShows = getProgramData();

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      openDate: head(keys(byDate(mockShows)))
    };

    this.changeSelected.bind(this);
    this.selectDate.bind(this);
  }

  changeSelected(item) {
    this.setState(state => {
      if (state.selected === item.id) {
        return { selected: '' };
      }
      return { selected: item.id };
    });
  }

  selectDate(dateString) {
    console.log(dateString);
    this.setState({ openDate: dateString });
  }

  render() {
    const { selected, openDate } = this.state;
    const groupedShows = byDate(mockShows);
    const dates = keys(groupedShows);
    const selectedTimes = openDate && groupedShows[openDate];
    return (
      <div className="ShowList">
        <h1 className="ShowList-title">Ohjelmat:</h1>
        <ul className="ShowList-selector">
          {dates.map(date => (
            <li
              key={date}
              style={{ color: openDate === date ? '#5bbfbf' : '#ffffff' }}
              role="button"
              onClick={() => this.selectDate(date)}>
              {openDate === date
                ? format(groupedShows[date][0].startDatetime, 'dddd DD.M.', {
                    locale: fi
                  })
                : date}
            </li>
          ))}
        </ul>
        {selectedTimes &&
          selectedTimes.map(item => (
            <ShowCard
              show={item}
              open={item.id === selected}
              selectFn={() => this.changeSelected(item)}
            />
          ))}
      </div>
    );
  }
}
