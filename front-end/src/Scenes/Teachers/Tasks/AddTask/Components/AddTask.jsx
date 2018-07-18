import React from 'react';
import 'antd/dist/antd.css';
import './AddTask.scss';
import { Input } from 'antd';
import SectionTree from './SectionTree';
import InputOutputSet from './InputOutputSet';


const { TextArea } = Input;

export default class AddTask extends React.PureComponent {
  render() {
    return (
      <div className="add-task-container">
        <SectionTree/>
        <Input className="input-task-name" placeholder="Название задачи"/>
        <TextArea placeholder="Описание задачи" className="input-task-desc" autosize />
        <p>Входные/выходные данные</p>
        <InputOutputSet/>
      </div>
    );
  }
}
