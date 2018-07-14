import React from 'react';
import './PageAssignedTestList.scss';
import TableAssignedTests from '../Components/TableAssignedTests';
import UserGeneralMenu from '../../../../../Components/UserGeneralMenu';
import GlobalHeader from '../../../../../Components/GlobalHeader';
import GlobalFooter from '../../../../../Components/GlobalFooter';

class PageAssignedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <GlobalHeader/>
        <div className="container-assigned-test-list">
          <div className="general-menu">
            <UserGeneralMenu />
          </div>
          <div className="list-assigned-tests">
            <TableAssignedTests />
          </div>
        </div>
        <GlobalFooter/>
      </div>
    );
  }
}

export default PageAssignedTestList;
