import React from 'react';
import { Layout } from 'antd/lib/index';
import TableAssignedTests from '../Components/TableAssignedTests';
import logo from './kittywithoutbackground.png';
import GeneralMenu from '../../../../../Components/UserGeneralMenu';
import './PageAssignedTestList.css';

const { Header, Footer } = Layout;

class PageAssignedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <Header><img src={logo} className="logo" alt="logo"/>CATS | Computer Automated Test Service</Header>
        <div className="container-assigned-test-list">
          <div className="general-menu">
            <GeneralMenu />
          </div>
          <div className="list-assigned-tests">
            <TableAssignedTests />
          </div>
        </div>
        <Footer>Exadel</Footer>
      </div>
    );
  }
}

export default PageAssignedTestList;
