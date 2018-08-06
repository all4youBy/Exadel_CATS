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
    // response: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { getTaskInformation, taskId } = this.props;
    getTaskInformation(taskId);
  }

  render() {
    const { taskInfo, error } = this.props;
    let tags = [];
    if (taskInfo && taskInfo.topicIds) {
      tags = taskInfo.topicIds.map(element => <Tag color="blue">{element}</Tag>);
    }
    if (error) {
      message.error(error);
    }

    let sets = [];
    if (taskInfo && taskInfo.testingSets) {
      sets = taskInfo.testingSets.map(element => (
        <div className="parent-view-user-set">
          <div className="view-user-level-data">{element.difficultyLevel}</div>
          <div className="border-sets view-user-input-data"><span className="input-left">{element.input}</span></div>
          <div className="border-sets view-user-output-data"><span className="input-left">{element.output}</span></div>
        </div>
      ));
    }

    const container = taskInfo ? (
      <div>
        <div className="task-title">
          <div className="text-task-title">{taskInfo.title}</div>
          <div className="author-task-title"> Автор: {taskInfo.author}</div>
        </div>
        <div className="tags">{tags}</div>
        <div className="task-text-border">
          <div className="task-text">{taskInfo.text}</div>
        </div>
        <div className="contain-view-user-sets">
          <div className="sets-description">
            <span className="view-user-level">Сложность</span>
            <span className="view-user-input">Входные данные</span>
            <span className="view-user-output">Выходные данные</span>
            <span className="view-user-space"/>
          </div>
          {sets}
        </div>
      </div>) : <Loading/>;
    return (
      <div className="add-solution-task-container">
        {container}
      </div>);
  }
}


export default ViewUserTask;
