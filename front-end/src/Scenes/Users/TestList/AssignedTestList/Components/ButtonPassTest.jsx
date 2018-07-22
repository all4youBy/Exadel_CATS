import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonPassTest.scss';
import { Button } from 'antd';

class ButtonPassTest extends React.Component {
  render() {
    return (
      <Button className="button-table-with-border" type="primary">
        <Link to="/test"> Начать </Link>
      </Button>
    );
  }
}

export default ButtonPassTest;
