import React from 'react';
import './ButtonAssignTest.scss';
import { Button } from 'antd';
// import { Link } from 'react-router-dom';

class ButtonAssignTest extends React.Component {
  render() {
    return (
      <Button
        shape="circle"
        icon="profile"
        className="button-table"
        size="small"
        href="/assigntest"
      />
    );
  }
}

export default ButtonAssignTest;
