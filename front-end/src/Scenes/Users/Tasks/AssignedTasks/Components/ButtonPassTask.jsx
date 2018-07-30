import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonPassTask.scss';
import { Button } from 'antd';

class ButtonPassTask extends React.Component {
  render() {
    return (
      <Button className="button-table-with-border" type="primary">
        <Link to="/task"> Начать </Link>
      </Button>
    );
  }
}

export default ButtonPassTask;
