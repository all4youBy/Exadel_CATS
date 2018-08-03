import React from 'react';
import './ButtonAssignTest.scss';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { history } from '../Services/ConfigureStore';

class ButtonAssignTest extends React.Component {
  static propTypes = {
    groupName: PropTypes.string.isRequired,
    addGroup: PropTypes.func.isRequired,
  };

  handleAddGroup = () => {
    const { groupName, addGroup } = this.props;
    history.push(`/assigntest/${groupName}`);
    addGroup(groupName);
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

export default ButtonAssignTest;
