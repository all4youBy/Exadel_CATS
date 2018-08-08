/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../../Services/loginService';

class ButtonDeleteGroup extends React.Component {
  static propTypes = {
    onStudentDelete: PropTypes.func.isRequired,
    student: PropTypes.string.isRequired,
    upDate: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
    groupName: PropTypes.string.isRequired,
  };

  handleStudentDelete = (e) => {
    const { onStudentDelete, student, upDate, groups, groupName } = this.props;
    console.log(student);
    const object = {
      group: groupName,
      userId: student,
    };
    console.log(object);
    onStudentDelete(object);
    // upDate(groups, data);
    e.preventDefault();
  };

  render() {
    return (
      <Tooltip placement="top" title="Удалить">
        <Button
          onClick={this.handleStudentDelete}
          shape="circle"
          icon="close"
          className="button-table"
          size="small"
        />
      </Tooltip>
    );
  }
}

export default ButtonDeleteGroup;
