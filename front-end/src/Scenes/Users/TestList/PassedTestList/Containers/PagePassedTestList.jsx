import React from 'react';
import './PagePassedTestList.scss';
import TablePassedTests from '../Components/TablePassedTests';
import GeneralMenuStudent from '../../../../../Components/UserGeneralMenu';
import GlobalHeader from '../../../../../Components/GlobalHeader';
import GlobalFooter from '../../../../../Components/GlobalFooter';

class PagePassedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <GlobalHeader/>
        <div className="container-passed-test-list">
          <div className="general-menu">
            <GeneralMenuStudent/>
          </div>
          <div className="list-passed-tests">
            <TablePassedTests/>
          </div>
        </div>
        <GlobalFooter/>
      </div>
    );
  }
}

export default PagePassedTestList;
