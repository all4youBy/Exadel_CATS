import React from 'react';
import './ViewUserTask.scss';
import { Tag, message } from 'antd';
import PropTypes from 'prop-types';
import Loading from '../../../../../Components/Loading';

// import { history } from '../../../../Services/ConfigureStore';


class ViewUserTask extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    getTaskInformation: PropTypes.func.isRequired,
    taskId: PropTypes.string.isRequired,
    taskInfo: PropTypes.arrayOf.isRequired,
    response: PropTypes.string.isRequired,
  };

  state = {
    uploading: false,
  };

  componentDidMount() {
    const { getTaskInformation, taskId } = this.props;
    getTaskInformation(taskId);
  }

  render() {
    let { uploading } = this.state;

    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = `0${dd}`;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${dd}.${mm}.${yy}`;
    }

    const { taskInfo, response, error } = this.props;
    let deadline = null;
    let tags = ['sas', 'sss', 'pos'];
    tags = tags.map(element => <Tag color="blue">{element}</Tag>);
    if (taskInfo.solution) {
      const date = new Date(taskInfo.solution.deadline);
      deadline = formatDate(date);
    }
    if (error) {
      message.error(error);
    }
    if (response) {
      uploading = false;
    }
    console.log(uploading);
    const container = taskInfo.solution ? (
      <div>
        <div className="task-title">
          <div className="text-task-title">{taskInfo.title}</div>
          <div className="author-task-title"> Автор: {taskInfo.solution.assignedBy}</div>
          <div>Дата сдачи: {deadline} </div>
        </div>
        <div className="tags">{tags}</div>
        <div className="task-text-border">
          <div className="task-text">{taskInfo.text}</div>
        </div>
      </div>) : <Loading/>;
    return (
      <div className="add-solution-task-container">
        {container}
      </div>);
  }
}


export default ViewUserTask;
