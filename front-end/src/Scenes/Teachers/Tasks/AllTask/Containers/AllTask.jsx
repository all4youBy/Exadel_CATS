import React from 'react';
import { connect } from 'react-redux';
import './AllTask.scss';
import PropTypes from 'prop-types';
import TableAllTasks from '../Components/TableAllTasks';
import {
  fetchTasks,
} from '../Services/Actions/actions';


class AllTask extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    getTasks: PropTypes.func.isRequired,
  };

  render() {
    const { tasks, error, getTasks } = this.props;
    return (
      <TableAllTasks tasks={tasks} error={error} getTasks={getTasks}/>
    );
  }
}


function mapStateToProps(state) {
  return {
    tasks: state.allTasks.tasks,
    error: state.allTasks.error,
  };
}

const mapDispatchToProps = dispatch => ({
  getTasks: () => {
    dispatch(fetchTasks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTask);
