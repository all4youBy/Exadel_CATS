import React from 'react';
import 'antd/dist/antd.css';
import './ButtonAssignTask.scss';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { history } from '../Services/ConfigureStore';

class ButtonAssignTask extends React.Component {
  static propTypes = {
    groupName: PropTypes.string.isRequired,
  };

  handleAddGroup = () => {
    const { groupName } = this.props;
    localStorage.setItem('userStatusForAssign', JSON.stringify(groupName));
    history.push(`/assigntask/${groupName}`);
  };

  render() {
    return (
      <Tooltip placement="top" title="Назначить задачу">
        <Button
          shape="circle"
          icon="file"
          className="button-table"
          size="small"
          onClick={this.handleAddGroup}
        />
      </Tooltip>
    );
  }
}

export default ButtonAssignTask;
