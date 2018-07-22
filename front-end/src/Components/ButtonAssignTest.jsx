import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAssignTest.scss';
import { Button } from 'antd';

class ButtonAssignTest extends React.Component {
  render() {
    return (
      <Button
        shape="circle"
        icon="profile"
        className="button-table"
        size="small"
      />
    );
  }
}

export default ButtonAssignTest;
