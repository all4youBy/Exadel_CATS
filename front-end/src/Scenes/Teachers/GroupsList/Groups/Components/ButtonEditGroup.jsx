import React from 'react';
import './ButtonEditGroup.scss';
import { Button } from 'antd';

class ButtonEditGroup extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="edit" className="button-table" size="small"/>
    );
  }
}

export default ButtonEditGroup;
