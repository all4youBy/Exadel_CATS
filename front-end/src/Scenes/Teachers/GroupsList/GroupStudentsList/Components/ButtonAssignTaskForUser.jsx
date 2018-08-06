import React from 'react';
import 'antd/dist/antd.css';
import '../../../../../Components/ButtonAssignTask.scss';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { history } from '../../../../../Services/ConfigureStore';

class ButtonAssignTaskForUser extends React.Component {
  static propTypes = {
    userData: PropTypes.string.isRequired,
  };

  handleAddGroup = () => {
    const { userData } = this.props;
    console.log(userData, 78);
    history.push(`/assigntask/${userData.email}`);
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

export default ButtonAssignTaskForUser;
