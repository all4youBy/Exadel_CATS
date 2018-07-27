import React from 'react';
import './ButtonEditGroup.scss';
import { Button } from 'antd';

class ButtonDeleteGroup extends React.Component {
  render() {
    return (
      <Button shape="circle" icon="close" className="button-table" size="small"/>
    );
  }
}

export default ButtonDeleteGroup;
