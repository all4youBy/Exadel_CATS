import React from 'react';
import GlobalHeader from '../../../../../Components/GlobalHeader';
import TableGroupStudents from '../Components/TableGroupStudents';
import GlobalFooter from '../../../../../Components/GlobalFooter';
import TeacherGeneralMenu from '../../../../../Components/TeacherGeneralMenu';
import './PageGroupStudentsList.scss';

class PageGroupStudentsList extends React.PureComponent {
  render() {
    return (
      <div className="main-container">
        <GlobalHeader/>
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
