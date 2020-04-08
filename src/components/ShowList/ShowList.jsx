import React from 'react';
import { groupBy, keys } from 'ramda';
import { format, isWithinRange, isBefore } from 'date-fns';

import { getProgramData } from '../../utils/data';
import ResponsiveShowList from './ResponsiveShowList';
import WidescreenShowList from './WidescreenShowList';

const getDateKeyFormat = dateTime => format(dateTime, 'DD.M');

const byDate = groupBy(item => getDateKeyFormat(item.startDatetime));

const showData = getProgramData();

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.getInitialState.bind(this);
    this.changeSelected.bind(this);
    this.selectDate.bind(this);
    this.setFilter.bind(this);
    this.updateWidth.bind(this);
    this.setWidescreenMode.bind(this);

    this.state = this.getInitialState();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  updateWidth() {
    this.setState(state => ({ ...state, screenWidth: window.innerWidth }));
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
    const currentShowId = inRange
      ? this.getFirstShow(groupedData, dateKey, currentTime).id
      : '';
    return {
      selected: currentShowId,
      openDate: inRange ? dateKey : dateKeys[0],
      filtered: true,
      widescreenMode: false,
      screenWidth: window.innerWidth
    };
  }

  getGroupedData() {
    return byDate(showData);
  }

  setFilter() {
    this.setState(state => ({ ...state, filtered: !state.filtered }));
  }

  setWidescreenMode() {
    this.setState(state => ({
      ...state,
      widescreenMode: !state.widescreenMode
    }));
  }

  selectDate(dateString) {
    this.setState({ openDate: dateString });
  }

  render() {
    const {
      selected,
      openDate,
      filtered,
      widescreenMode,
      screenWidth
    } = this.state;
    const groupedShows = this.getGroupedData();
    const dates = keys(groupedShows);
    const selectedTimes = openDate && groupedShows[openDate];
    const shouldApplyFilter =
      filtered && openDate === getDateKeyFormat(new Date());
    const timesWithAppliedFilter = shouldApplyFilter
      ? selectedTimes.filter(show => !isBefore(show.endDatetime, new Date()))
      : selectedTimes;
    const widescreen = screenWidth >= 1400 && widescreenMode;
    return (
      <div className="ShowList">
        <div className="ShowList-header">
          <h1 className="ShowList-title">Ohjelmistossa</h1>
          {!widescreen && (
            <button
              className="ShowList-filterButton"
              onClick={() => this.setFilter()}>
              {filtered ? 'Näytä menneet' : 'Piilota menneet'}
            </button>
          )}
          <button
            className="ShowList-widescreenButton"
            onClick={() => this.setWidescreenMode()}>
            {widescreenMode ? 'Ohjelmalista' : 'Ohjelmakartta'}
          </button>
        </div>
        {widescreen ? (
          <WidescreenShowList showData={showData} groupedShows={groupedShows} />
        ) : (
          <ResponsiveShowList
            dates={dates}
            openDate={openDate}
            selected={selected}
            groupedShows={groupedShows}
            timesWithAppliedFilter={timesWithAppliedFilter}
            onSelectDate={this.selectDate}
            onSelectShow={item => this.changeSelected(item)}
          />
        )}
      </div>
    );
  }
}
