import React from 'react';
import 'antd/dist/antd.css';
import './ButtonDeleteStudent.scss';
import { Button } from 'antd';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

/* import { bindActionCreators } from 'redux';
import * as actions from '../Services/Actions/actions'; */

class ButtonDeleteStudent extends React.PureComponent {
  // static propTypes = {
  //   student: PropTypes.shape().isRequired,
  // };

  // function deleteStudent(e) {
  //   e.preventDefault();
  //   props.selectStudent(e.target.id);
  // }

  deleteStudent = (e) => {
    e.preventDefault();
    // const { student } = this.props;
    // console.log(e.target.closest('.student-row'));
    // student.dispatch({ type: 'DELETE_STUDENT', payload: target.closest('.student-number') });
  };

  render() {
    return (
      <Button
        onClick={this.deleteStudent}
        shape="circle"
        icon="close"
        className="button-assign-test"
        size="small"
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state,
  };
}

/* function mapDispatchToProps(dispatch) {
  /* return bindActionCreators(actions, dispatch); */
/* return {
    onDeleteClick: () => {
      dispatch({ type: 'DELETE_STUDENT' });
    },
  };
} */

export default connect(
  mapStateToProps,
)(ButtonDeleteStudent);
