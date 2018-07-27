import React from 'react';
import 'antd/dist/antd.css';
import { List, Button } from 'antd';
import PropTypes from 'prop-types';
import './GroupCreation.scss';

export default class StudentList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getData } = this.props;
    getData('users/students');
  }

  render() {
    const { data } = this.props;
    const listData = data[0];
    return (
      <List
        className="students-list"
        itemLayout="horizontal"
        size="large"
        locale={{
          emptyText: 'Загрузка...',
        }}
        pagination={{
          pageSize: 10,
        }}
        dataSource={listData}
        renderItem={(item) => {
          const { addStudent } = this.props;
          const desc = (
            <div>{item.email} {item.education.institution} {`${item.education.graduationYear} `}
              {item.education.specialization} {item.education.primarySkill}
            </div>
          );
          return (
            <List.Item key={item.firstName}>
              <List.Item.Meta
                title={<span>{item.lastName} {item.firstName}</span>}
                description={desc}
              />
              <Button
                shape="circle"
                icon="plus-circle"
                className="button-table"
                size="medium"
                onClick={() => addStudent(item)}
              />
            </List.Item>
          );
        }}
      />
    );
  }
}
