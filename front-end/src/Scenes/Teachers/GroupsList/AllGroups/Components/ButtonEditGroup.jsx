import React from 'react';
import './ButtonEditGroup.scss';
// import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';

class ButtonEditGroup extends React.Component {
  // static propTypes = {
  //   onEditGroup: PropTypes.func.isRequired,
  // };

  render() {
    return (
      <Tooltip placement="top" title="Редактировать">
        <Button
          shape="circle"
          icon="edit"
          onClick={() => this.handleGroupEdit()}
          className="button-table"
          size="small"
        />
      </Tooltip>
    );
  }
}

export default ButtonEditGroup;
