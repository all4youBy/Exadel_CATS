import React from 'react';
import './PageAssignedTestList.scss';
import TableAssignedTests from '../Components/TableAssignedTests';
import TeacherGeneralMenu from '../../../../../Components/TeacherGeneralMenu';

class PageAssignedTestList extends React.PureComponent {
  render() {
    return (
      <div>
        <TeacherGeneralMenu/>
        <TableAssignedTests/>
      </div>
    );
  }
}

export default PageAssignedTestList;
