/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { history } from '../../../../../Services/ConfigureStore';

class ButtonAssignTestForUser extends React.Component {
  static propTypes = {
    groupName: PropTypes.string.isRequired,
  };

  handleAddGroup = () => {
    const { groupName } = this.props;
    localStorage.setItem('userStatusForAssign', JSON.stringify(groupName));
    history.push(`/assigntest/${groupName.email}`);
  };

  render() {
    return (
      <Tooltip placement="top" title="Назначить тест">
        <Button
          shape="circle"
          icon="profile"
          className="button-table"
          size="small"
          onClick={this.handleAddGroup}
        />
      </Tooltip>
    );
  }
}

export default ButtonAssignTestForUser;
