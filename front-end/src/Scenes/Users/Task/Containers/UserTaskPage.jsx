import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './UserTaskPage.scss';
import UserTask from '../Components/UserTask';
import { postUploadFiles, fetchTaskInformation, postAddSolution } from '../Services/Actions/actions';

class UserTaskPage extends React.PureComponent {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    getTaskInformation: PropTypes.func.isRequired,
    taskInfo: PropTypes.arrayOf.isRequired,
    getAddSolution: PropTypes.func.isRequired,
    response: PropTypes.string.isRequired,
  };

  render() {
    const {
      uploadFiles, error, taskId, getTaskInformation, taskInfo,
      getAddSolution, response,
    } = this.props;
    return (
      <div className="task">
        <UserTask
          uploadFiles={uploadFiles}
          taskId={taskId}
          error={error}
          getTaskInformation={getTaskInformation}
          taskInfo={taskInfo}
          getAddSolution={getAddSolution}
          response={response}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    files: state.passTask.files,
    error: state.passTask.error,
    taskId: ownProps.match.params.taskId,
    taskInfo: state.passTask.taskInfo,
    response: state.passTask.response,
  };
}

const mapDispatchToProps = dispatch => ({
  uploadFiles: (data, id) => {
    dispatch(postUploadFiles(data, id));
  },
  getTaskInformation: (usersLogin, taskId) => {
    dispatch(fetchTaskInformation(usersLogin, taskId));
  },
  getAddSolution: (data, id) => {
    dispatch(postAddSolution(data, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTaskPage);
