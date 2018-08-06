import React from 'react';
import './PagePassedTasks.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TablePassedTasks from '../Components/TablePassedTasks';
import fetchPassedTasks from '../Services/Actions/actions';

class PagePassedTasks extends React.PureComponent {
  static propTypes = {
    getPassedTasks: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
  };

  render() {
    const { getPassedTasks, tasks, error } = this.props;
    return (
      <div>
        <TablePassedTasks getPassedTasks={getPassedTasks} tasks={tasks} error={error}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.userPassedTasks.tasks,
    error: state.userPassedTasks.error,
  };
}

const mapDispatchToProps = dispatch => ({
  getPassedTasks: (userId) => {
    dispatch(fetchPassedTasks(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PagePassedTasks);
