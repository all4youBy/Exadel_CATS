import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonPassTask.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonPassTask extends React.Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
  };

  render() {
    const { taskId } = this.props;
    console.log(taskId, 9);
    const link = `/assignedtasks/${taskId}`;
    return (
      <Button className="button-table-with-border" type="primary">
        <Link to={link}> Начать </Link>
      </Button>
    );
  }
}

export default ButtonPassTask;
