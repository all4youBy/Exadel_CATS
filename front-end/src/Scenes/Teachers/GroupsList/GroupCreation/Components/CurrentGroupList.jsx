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
    return (
      <List
        className="current-students-list"
        bordered
        locale={{
          emptyText: 'Список группы пуст. Добавьте студентов.',
        }}
        dataSource={students}
        renderItem={item => (
          <List.Item><List.Item.Meta
            title={<span>{item.lastName} {item.firstName}</span>}
          />
            <Button
              shape="circle"
              icon="close-circle"
              className="button-table"
              size="medium"
              onClick={() => delStudent(item)}
            />
          </List.Item>)}
      />
    );
  }
}
