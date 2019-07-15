import React from 'react';
import { groupBy, keys, head } from 'ramda';
import { format, isWithinRange, isBefore } from 'date-fns';
import Dropdown from 'react-dropdown';
import fi from 'date-fns/locale/fi';

import ShowCard from '../ShowCard/ShowCard';
import { getProgramData } from '../../utils/data';

const getDateKeyFormat = dateTime => format(dateTime, 'DD.M');

const byDate = groupBy(item => getDateKeyFormat(item.startDatetime));

const showData = getProgramData();

const mobileSelectorOptions = (groupedShows, dates) => {
  return dates.map(date => {
    return {
      label: format(groupedShows[date][0].startDatetime, 'dddd DD.M.', {
        locale: fi
      }),
      value: date
    };
  });
};

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.getInitialState.bind(this);
    this.changeSelected.bind(this);
    this.selectDate.bind(this);
    this.setFilter.bind(this);

    this.state = this.getInitialState();
  }

  changeSelected(item) {
    this.setState(state => {
      if (state.selected === item.id) {
        return { selected: '' };
      }
      return { selected: item.id };
    });
  }

  getFirstShow(groupedData, dateKey, currentTime) {
    return (
      groupedData[dateKey].find(item => {
        return isWithinRange(currentTime, item.startDatetime, item.endDatetime);
      }) || groupedData[dateKey][0]
    );
  }

  getInitialState() {
    const currentTime = new Date();
    const groupedData = this.getGroupedData();
    const dateKeys = Object.keys(groupedData);
    const dateKey = getDateKeyFormat(currentTime);
    const inRange = dateKeys.includes(dateKey);
    console.log('Is in range', inRange);
    const currentShowId = inRange
      ? this.getFirstShow(groupedData, dateKey, currentTime).id
      : '';
    return {
      selected: currentShowId,
      openDate: inRange ? dateKey : dateKeys[0],
      filtered: true
    };
  }

  getGroupedData() {
    return byDate(showData);
  }

  setFilter() {
    this.setState(state => ({ ...state, filtered: !state.filtered }));
  }

  selectDate(dateString) {
    this.setState({ openDate: dateString });
  }

  render() {
    const { selected, openDate, filtered } = this.state;
    const groupedShows = this.getGroupedData();
    const dates = keys(groupedShows);
    const selectedTimes = openDate && groupedShows[openDate];
    const shouldApplyFilter =
      filtered && openDate === getDateKeyFormat(new Date());
    const timesWithAppliedFilter = shouldApplyFilter
      ? selectedTimes.filter(show => !isBefore(show.endDatetime, new Date()))
      : selectedTimes;
    return (
      <div className="ShowList">
        <div className="ShowList-header">
          <h1 className="ShowList-title">Ohjelmistossa</h1>
          <button
            className="ShowList-filterButton"
            onClick={() => this.setFilter()}>
            {filtered ? 'Näytä menneet' : 'Piilota menneet'}
          </button>
        </div>
        <div className="ShowList-selector">
          {dates.map(date => (
            <button
              className="ShowList-dayButton"
              key={date}
              style={openDate === date ? { color: '#A53A4D' } : {}}
              onClick={() => this.selectDate(date)}>
              {openDate === date
                ? format(groupedShows[date][0].startDatetime, 'dddd DD.M.', {
                    locale: fi
                  })
                : format(groupedShows[date][0].startDatetime, 'dd DD.M.', {
                    locale: fi
                  })}
            </button>
          ))}
        </div>
        <Dropdown
          className="ShowList-selector--mobile"
          options={mobileSelectorOptions(groupedShows, dates)}
          onChange={opt => this.selectDate(opt.value)}
          value={openDate}
          placeholder="Valitse päivä"
        />
        {timesWithAppliedFilter &&
          timesWithAppliedFilter.map((item, idx) => (
            <ShowCard
              index={idx}
              key={idx}
              show={item}
              open={item.id === selected}
              selectFn={() => this.changeSelected(item)}
            />
          ))}
      </div>
    );
  }
}
