import React from 'react';
import './PagePassedTasks.scss';
import TablePassedTasks from '../Components/TablePassedTasks';

class PagePassedTasks extends React.PureComponent {
  render() {
    return (
      <div>
        <TablePassedTasks/>
      </div>
    );
  }
}

export default PagePassedTasks;
