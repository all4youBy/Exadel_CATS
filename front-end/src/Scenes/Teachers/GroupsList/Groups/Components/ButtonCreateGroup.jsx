import React from 'react';
import 'antd/dist/antd.css';
import './ButtonCreateGroup.scss';
import { Button } from 'antd';

class ButtonCreateGroup extends React.Component {
  render() {
    return (
      <Button className="button-table-with-border" type="primary">Создать группу</Button>
    );
  }
}

export default ButtonCreateGroup;
