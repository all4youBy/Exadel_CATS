import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAssignTest.scss';
import { Button } from 'antd';

class ButtonAssignTest extends React.Component {
  render() {
    // console.log(this.handleStudentAdd);
    return (
      <Button
        shape="circle"
        icon="profile"
        className="button-assign-test"
        size="small"
      />
    );
  }
}

export default ButtonAssignTest;
