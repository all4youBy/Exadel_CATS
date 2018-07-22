import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAddLink.scss';
import { Button } from 'antd';

class ButtonAddLink extends React.Component {
  render() {
    return (
      <Button className="button-table-with-border" type="primary">Добавить ссылку</Button>
    );
  }
}

export default ButtonAddLink;
