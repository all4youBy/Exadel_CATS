import React from 'react';
import './UserTaskPage.scss';
import UserTask from '../../../../Components/UserTask';

export default class UserTaskPage extends React.PureComponent {
  render() {
    return (
      <div className="task">
        <UserTask/>
      </div>
    );
  }
}
