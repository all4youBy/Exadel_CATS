import React from 'react';
import './ButtonEditGroup.scss';
// import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

class ButtonEditGroup extends React.Component {
  static propTypes = {
    groupName: PropTypes.string.isRequired,
    onGroupEdit: PropTypes.func.isRequired,
  };

  handleGroupEdit = (groupName) => {
    const { onGroupEdit } = this.props;
    onGroupEdit(groupName);
  };

  render() {
    const { groupName } = this.props;
    return (
      <Tooltip placement="top" title="Редактировать">
        <Button
          shape="circle"
          icon="edit"
          className="button-table"
          size="small"
          onClick={() => this.handleGroupEdit(groupName)}
        />
      </Tooltip>
    );
  }
}

export default ButtonEditGroup;
