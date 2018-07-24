import React from 'react';
import 'antd/dist/antd.css';
import '../Scenes/Teachers/Tasks/AddTask/Components/AddTask.scss';
import { Cascader } from 'antd';
import PropTypes from 'prop-types';

const options = [{
  value: 'программирование',
  label: 'Программирование',
  children: [{
    value: 'java',
    label: 'Java',
    children: [{
      value: 'коллекции',
      label: 'Коллекции',
    },
    {
      value: 'наследование',
      label: 'Наследование',
    }],
  },
  {
    value: 'c++',
    label: 'C++',
    children: [{
      value: 'массивы',
      label: 'Массивы',
    }],
  }],
}];

export default class SectionTree extends React.PureComponent {
  static propTypes = {
    addTag: PropTypes.func.isRequired,
  };

  render() {
    const { addTag } = this.props;
    return (
      <div className="tree-container">
        <Cascader className="section-tree" options={options} onChange={addTag} changeOnSelect placeholder="Выберите раздел"/>
      </div>
    );
  }
}
