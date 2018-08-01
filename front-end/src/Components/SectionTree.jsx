import React from 'react';
import 'antd/dist/antd.css';
import '../Scenes/Teachers/Tasks/AddTask/Components/AddTask.scss';
import { Cascader } from 'antd';
import PropTypes from 'prop-types';

const options = [{
  value: {
    text: 'программирование',
    id: '1',
  },
  label: 'Программирование',
  children: [{
    value: {
      text: 'java',
      id: '2',
    },
    label: 'java',
    children: [{
      value: {
        text: 'коллекции',
        id: '3',
      },
      label: 'Коллекции',
    }, {
      value: { text: 'наследование', id: '4' },
      label: 'Наследование',
    }],
  }, {
    value: { text: 'c++', id: '5' },
    label: 'C++',
    children: [{
      value: { text: 'массивы', id: '6' },
      label: 'Массивы',
    }],
  }],
}];

export default class SectionTree extends React.PureComponent {
  static propTypes = {
    addTag: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf.isRequired,
    // errorTopics: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { getTopics } = this.props;
    getTopics();
  }

  handleAddTag = (event) => {
    const { addTag } = this.props;
    console.log(event, 808);
    addTag(event[event.length - 1]);
  };

  render() {
    const { topics, addTag } = this.props;
    console.log(topics, 89765);
    console.log(addTag);
    return (
      <div className="tree-container">
        <Cascader
          className="section-tree"
          options={options}
          onChange={this.handleAddTag}
          changeOnSelect
          placeholder="Выберите раздел"
        />
      </div>
    );
  }
}
