import React from 'react';
import './PagePassedTestList.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TablePassedTests from '../Components/TablePassedTests';
import fetchPassedTests from '../Services/Actions/actions';

class PagePassedTestList extends React.PureComponent {
  static propTypes = {
    tests: PropTypes.arrayOf.isRequired,
    getPassedTests: PropTypes.func.isRequired,
  };

  render() {
    const {
      tests,
      getPassedTests,
    } = this.props;
    return (
      <div>
        <div className="container-passed-test-list">

          <div className="list-passed-tests">
            <TablePassedTests
              tests={tests}
              getPassedTests={getPassedTests}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tests: state.userPassedTests.tests,
  };
}

const mapDispatchToProps = dispatch => ({
  getPassedTests: (userId) => {
    dispatch(fetchPassedTests(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PagePassedTestList);
