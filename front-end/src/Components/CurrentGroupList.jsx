import { List, Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './GroupCreation.scss';

export default class CurrentGroupList extends React.PureComponent {
  static propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    delStudent: PropTypes.func.isRequired,
  };

  render() {
    const { students, delStudent } = this.props;
    console.log(students);
    const studentsArray = [];
    students.addedStudents.forEach((element) => {
      if (element.lastName && element.firstName) {
        studentsArray.push(`${element.lastName} ${element.firstName}`);
      }
    });
    students.groups.forEach((element) => {
      if (element) {
        studentsArray.push(element);
      }
    });

    return (
      <List
        className="current-students-list"
        bordered
        locale={{
          emptyText: 'Список группы пуст. Добавьте студентов.',
        }}
        dataSource={studentsArray}
        renderItem={item => (
          <List.Item><List.Item.Meta
            title={<span>{item}</span>}
          />
            <Button
              shape="circle"
              icon="close-circle"
              className="button-table"
              size="default"
              onClick={() => delStudent(item)}
            />
          </List.Item>)}
      />
    );
  }
}
