import React from 'react';
import './ButtonEditGroup.scss';
// import PropTypes from 'prop-types';
import { Button } from 'antd';

class ButtonEditGroup extends React.Component {
  // static propTypes = {
  //   onEditGroup: PropTypes.func.isRequired,
  // };

  render() {
    return (
      <Button shape="circle" icon="edit" onClick={() => this.handleGroupEdit()} className="button-table" size="small"/>
    );
  }
}

export default ButtonEditGroup;
