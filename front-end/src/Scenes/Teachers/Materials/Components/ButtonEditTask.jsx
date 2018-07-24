import React from 'react';
import 'antd/dist/antd.css';
import './ButtonEditTask.scss';
import { Button } from 'antd';

class ButtonEditTask extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="edit" className="button-add-task" size="small"/>
    );
  }
}

export default ButtonEditTask;
