import React from 'react';
import './PagePassedTestList.css';
import TablePassedTests from '../Components/TablePassedTests';
import GeneralMenuStudent from '../../../../../Components/UserGeneralMenu';
import PageHeader from '../../../../../Components/PageHeader';
import PageFooter from '../../../../../Components/PageFooter';

class PagePassedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <PageHeader/>
        <div className="container-passed-test-list">
          <div className="general-menu">
            <GeneralMenuStudent/>
          </div>
          <div className="list-passed-tests">
            <TablePassedTests/>
          </div>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

export default PagePassedTestList;
