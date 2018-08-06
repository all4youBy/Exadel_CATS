import React from 'react';
import './AllGroups.scss';
import TableAllGroupsList from '../Components/TableAllGroupsList';

class AllGroups extends React.PureComponent {
  render() {
    return (
      <div>
        <TableAllGroupsList/>
      </div>
    );
  }
}

export default AllGroups;
