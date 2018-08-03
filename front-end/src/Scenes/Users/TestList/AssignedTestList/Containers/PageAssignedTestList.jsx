import React from 'react';
import './PageAssignedTestList.scss';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import TableAssignedTests from '../Components/TableAssignedTests';
import {
  fetchUserAssignedTests,
} from '../Services/Actions/actions';


class PageAssignedTestList extends React.PureComponent {
  static propTypes = {
    tests: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
    getAssignedTests: PropTypes.func.isRequired,
  };

  render() {
    const {
      tests,
      error,
      getAssignedTests,
    } = this.props;
    return (
      <TableAssignedTests
        tests={tests}
        error={error}
        getAssignedTests={getAssignedTests}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    tests: state.userAssignedTests.tests,
    error: state.userAssignedTests.error,
  };
}


const mapDispatchToProps = dispatch => ({
  getAssignedTests: (userId) => {
    dispatch(fetchUserAssignedTests(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAssignedTestList);
