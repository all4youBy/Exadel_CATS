import React from 'react';
import './AllGroups.scss';
import TableGroupsList from '../Components/TableGroupsList';

class AllGroups extends React.PureComponent {
  render() {
    return (
      <div>
        <TableGroupsList/>
      </div>
    );
  }
}

export default AllGroups;
