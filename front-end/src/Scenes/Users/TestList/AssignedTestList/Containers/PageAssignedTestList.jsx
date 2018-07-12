import React from 'react';
import './PageAssignedTestList.css';
import TableAssignedTests from '../Components/TableAssignedTests';
import UserGeneralMenu from '../../../../../Components/UserGeneralMenu';
import PageHeader from '../../../../../Components/PageHeader';
import PageFooter from '../../../../../Components/PageFooter';

class PageAssignedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <PageHeader/>
        <div className="container-assigned-test-list">
          <div className="general-menu">
            <UserGeneralMenu />
          </div>
          <div className="list-assigned-tests">
            <TableAssignedTests />
          </div>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

export default PageAssignedTestList;
