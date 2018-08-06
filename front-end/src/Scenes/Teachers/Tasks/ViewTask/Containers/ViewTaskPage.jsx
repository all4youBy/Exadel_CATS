import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ViewTaskPage.scss';
import ViewUserTask from '../Components/ViewUserTask';
import fetchTaskInformation from '../Services/Actions/actions';

class ViewTaskPage extends React.PureComponent {
  static propTypes = {
    error: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    getTaskInformation: PropTypes.func.isRequired,
    taskInfo: PropTypes.arrayOf.isRequired,
    response: PropTypes.string.isRequired,
  };

  render() {
    const {
      error, taskId, getTaskInformation, taskInfo, response,
    } = this.props;
    return (
      <div className="task">
        <ViewUserTask
          taskId={taskId}
          error={error}
          getTaskInformation={getTaskInformation}
          taskInfo={taskInfo}
          response={response}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    error: state.viewTask.error,
    taskId: ownProps.match.params.taskId,
    taskInfo: state.viewTask.taskInfo,
    response: state.viewTask.response,
  };
}

const mapDispatchToProps = dispatch => ({
  getTaskInformation: (taskId) => {
    dispatch(fetchTaskInformation(taskId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskPage);
