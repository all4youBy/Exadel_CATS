import React from 'react';
import 'antd/dist/antd.css';
import './ButtonEditTest.scss';
import { Button } from 'antd';

class ButtonEditTest extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="edit" className="button-add-task" size="small"/>
    );
  }
}

export default ButtonEditTest;
