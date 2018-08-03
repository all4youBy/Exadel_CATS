import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PageAssignedTasks.scss';
import TableAssignedTasks from '../Components/TableAssignedTasks';
import {
  fetchAssignedTasks,
} from '../Services/Actions/actions';


class PageAssignedTasks extends React.PureComponent {
  static propTypes = {
    getAssignedTasks: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
  };

  render() {
    const { getAssignedTasks, tasks, error } = this.props;
    return (
      <TableAssignedTasks getAssignedTasks={getAssignedTasks} tasks={tasks} error={error}/>
    );
  }
}


function mapStateToProps(state) {
  return {
    tasks: state.userAssignedTasks.tasks,
    error: state.userAssignedTasks.error,
  };
}

const mapDispatchToProps = dispatch => ({
  getAssignedTasks: (userId) => {
    dispatch(fetchAssignedTasks(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAssignedTasks);
