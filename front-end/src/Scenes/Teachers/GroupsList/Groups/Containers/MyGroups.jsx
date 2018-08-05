import React from 'react';
import './MyGroups.scss';
import TableGroupsList from '../Components/TableGroupsList';

class MyGroups extends React.PureComponent {
  render() {
    return (
      <div>
        <TableGroupsList/>
      </div>
    );
  }
}

export default MyGroups;
