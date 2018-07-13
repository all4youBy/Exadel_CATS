import React from 'react';
import './PagePassedTestList.scss';
import TablePassedTests from '../Components/TablePassedTests';

class PagePassedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="container-passed-test-list">

          <div className="list-passed-tests">
            <TablePassedTests/>
          </div>
        </div>
      </div>
    );
  }
}

export default PagePassedTestList;
