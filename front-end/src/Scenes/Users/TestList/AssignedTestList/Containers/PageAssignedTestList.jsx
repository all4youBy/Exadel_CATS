import React from 'react';
import './PageAssignedTestList.scss';
import TableAssignedTests from '../Components/TableAssignedTests';

class PageAssignedTestList extends React.PureComponent {
  render() {
    return (
      <TableAssignedTests/>
    );
  }
}

export default PageAssignedTestList;
