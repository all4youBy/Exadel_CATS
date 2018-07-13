import React from 'react';
import TableGroupStudents from '../Components/TableGroupStudents';
import TeacherGeneralMenu from '../../../../../Components/TeacherGeneralMenu';
import './PageGroupStudentsList.scss';

class PageGroupStudentsList extends React.PureComponent {
  render() {
    return (
      <div className="main-container">
        <div className="container-assigned-test-list">
          <div className="general-menu">
            <TeacherGeneralMenu/>
          </div>
          <div className="list-assigned-tests">
            <TableGroupStudents/>
          </div>
        </div>
        <GlobalFooter/>
      </div>
    );
  }
}

export default PageGroupStudentsList;
