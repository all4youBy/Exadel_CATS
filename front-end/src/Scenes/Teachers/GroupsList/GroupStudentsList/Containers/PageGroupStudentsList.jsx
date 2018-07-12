import React from 'react';
import PageHeader from '../../../../../Components/PageHeader';
import TableGroupStudents from '../Components/TableGroupStudents';
import PageFooter from '../../../../../Components/PageFooter';
import TeacherGeneralMenu from '../../../../../Components/TeacherGeneralMenu';
import './PageGroupStudentsList.css';

class PageGroupStudentsList extends React.PureComponent {
  render() {
    return (
      <div className="main-container">
        <PageHeader/>
        <div className="container-assigned-test-list">
          <div className="general-menu">
            <TeacherGeneralMenu/>
          </div>
          <div className="list-assigned-tests">
            <TableGroupStudents/>
          </div>
        </div>
        <PageFooter/>
      </div>
    );
  }
}

export default PageGroupStudentsList;
