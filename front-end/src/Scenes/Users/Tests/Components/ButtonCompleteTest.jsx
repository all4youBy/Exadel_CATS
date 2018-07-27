import React from 'react';
import 'antd/dist/antd.css';
import './ButtonCompleteTest.scss';
import { Button } from 'antd';

class ButtonCompleteTest extends React.Component {
  render() {
    return (
      <Button className="button-table-with-border" type="primary">Завершить</Button>
    );
  }
}

export default ButtonCompleteTest;
