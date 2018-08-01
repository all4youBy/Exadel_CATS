import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './UserTaskPage.scss';
import UserTask from '../Components/UserTask';
import { postUploadFiles } from '../Services/Actions/actions';

class UserTaskPage extends React.PureComponent {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  render() {
    const { uploadFiles, error } = this.props;
    return (
      <div className="task">
        <UserTask uploadFiles={uploadFiles} error={error}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.passTask.files,
    error: state.passTask.error,
  };
}

const mapDispatchToProps = dispatch => ({
  uploadFiles: () => {
    dispatch(postUploadFiles());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTaskPage);
