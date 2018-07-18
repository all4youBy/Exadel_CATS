import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import { Cascader } from 'antd';

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

function onChange(value) {
  console.log(value);
}

export default class SectionTree extends React.PureComponent {
  render() {
    return (
      <Cascader classname="section-tree" options={options} onChange={onChange} changeOnSelect/>
    );
  }
}
