import React from 'react';
import ShowCard from '../ShowCard/ShowCard';

const mockShows = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu efficitur, rhoncus ipsum quis, accumsan nibh. Curabitur porta augue in euismod feugiat. In elit elit, bibendum sit amet dolor in, bibendum posuere augue. Nulla quis aliquet dui. Vivamus sed eleifend nisl, et convallis libero. Donec tempor at lorem sit amet malesuada. Morbi luctus suscipit interdum. Fusce ac purus ultricies leo posuere tincidunt. Aenean vitae metus sapien. Nam convallis tincidunt lectus.',
    title: 'Radioshow 1',
    imgSrc: 'https://dummyimage.com/600x300/5bbfbf/000000&text=Ohjelma_1',
    id: 'y'
  },
  {
    description:
      'Donec hendrerit rhoncus risus in dictum. Aenean consectetur at orci nec ullamcorper. Aliquam vitae leo nec diam facilisis convallis non vel turpis. Sed ut felis in magna egestas maximus. Ut mollis nisi nec fermentum placerat. Nulla vel tempor risus. Quisque mattis rutrum turpis, eget vehicula quam porta in. Sed nec ullamcorper elit, vitae porttitor mi.',
    title: 'Radioshow 2',
    imgSrc: 'https://dummyimage.com/600x300/60a3ee/000000&text=Ohjelma_Kaksi',
    id: 'x'
  },
  {
    description:
      'Vestibulum eu efficitur sapien, vitae vestibulum ex. Nullam venenatis hendrerit nunc, iaculis semper est egestas vel. Nullam rutrum, quam vel euismod vulputate, neque massa vestibulum eros, ut consequat turpis nibh sed velit. Mauris aliquet lacus tempus nunc cursus, ut dictum purus eleifend. Nullam vehicula, nisl quis sollicitudin vulputate, nulla ex ultrices nisi, nec aliquam arcu quam ut sem. Ut eu quam interdum, egestas neque at, faucibus dui. Vestibulum diam augue.',
    title: 'Radioshow 3',
    imgSrc: 'https://dummyimage.com/600x300/ee6b60/000000&text=Ohjelma_Kolme',
    id: 'z'
  }
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
    this.changeSelected.bind(this);
  }

  changeSelected(item) {
    this.setState(state => {
      if (state.selected === item.id) {
        return { selected: '' };
      }
      return { selected: item.id };
    });
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="ShowList">
        <h1 className="ShowList-title">Ohjelmat:</h1>
        <ul className="ShowList-selector">
          <li>Tiistai</li>
          <li>Keskiviikko</li>
          <li>Torstai</li>
        </ul>
        {mockShows.map(item => (
          <ShowCard
            key={item.id}
            selectFn={() => this.changeSelected(item)}
            open={item.id === selected}
            show={item}
          />
        ))}
      </div>
    );
  }
}
