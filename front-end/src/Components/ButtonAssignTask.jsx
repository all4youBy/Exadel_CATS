import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAssignTask.scss';
import { Button } from 'antd';

class ButtonAssignTask extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="file" className="button-table" size="small"/>
    );
  }
}

export default ButtonAssignTask;
