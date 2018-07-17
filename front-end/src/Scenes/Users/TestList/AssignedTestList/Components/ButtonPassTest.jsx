import React from 'react';
import 'antd/dist/antd.css';
import './ButtonPassTest.scss';
import { Button } from 'antd';

class ButtonPassTest extends React.Component {
  render() {
    return (
      <Button className="button-start-test" type="primary">Начать</Button>
    );
  }
}

export default ButtonPassTest;
