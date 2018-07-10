import React from 'react';
import { Layout } from 'antd/lib/index';
import './PagePassedTestList.css';
import TablePassedTests from '../Components/TablePassedTests';
import logo from './kittywithoutbackground.png';
import GeneralMenuStudent from '../../../../../Components/UserGeneralMenu';

const { Header, Footer } = Layout;

class PagePassedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <Header><img src={logo} className="logo" alt="logo"/>CATS | Computer Automated Test Service</Header>
        <div className="container-passed-test-list">
          <div className="general-menu">
            <GeneralMenuStudent />
          </div>
          <div className="list-passed-tests">
            <TablePassedTests />
          </div>
        </div>
        <Footer>Exadel</Footer>
      </div>
    );
  }
}

export default PagePassedTestList;
