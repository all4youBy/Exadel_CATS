import React from 'react';
import 'antd/dist/antd.css';
import './ButtonDeleteStudent.css';
import { Button } from 'antd';

class ButtonDeleteStudent extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="close" className="button-assign-test" size="small"/>
    );
  }
}

export default ButtonDeleteStudent;
