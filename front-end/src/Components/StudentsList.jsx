/* eslint-disable spaced-comment,max-len */
import React from 'react';
import 'antd/dist/antd.css';
import { List, Button, message } from 'antd';
import PropTypes from 'prop-types';
import './GroupCreation.scss';
import InputSearchStudent from './InputSearchStudent';

class StudentsList extends React.PureComponent {
  static propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.arrayOf(PropTypes.any).isRequired,
    addStudent: PropTypes.func.isRequired,
    getStudentsData: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = {
    filterText: '',
  };

  componentDidMount() {
    const { getStudentsData, getGroups, teacher } = this.props;
    getStudentsData();
    getGroups(teacher);
  }

  setFilterText = text => this.setState({
    filterText: text,
  });

  render() {
    const { students, groups, error, addStudent, type } = this.props;
    const { filterText } = this.state;
    const newGroups = groups.filter(group => group.toLowerCase()
      .indexOf(filterText.toLowerCase()) !== -1);
    const newStudents = students.filter(student => ((student.firstName + student.lastName)
      .toLowerCase().indexOf(filterText.toLowerCase()) !== -1));
    if (error) {
      message.error(error);
    }
    const list = (
      <List
        className="students-list"
        itemLayout="horizontal"
        size="large"
        locale={{
          emptyText: 'Загрузка...',
        }}
        pagination={{
          pageSize: 5,
        }}
        dataSource={newStudents}
        renderItem={(item) => {
          const desc = item.affiliation ? (
            <div>{item.email} {item.affiliation.institution} {`${item.affiliation.graduationYear} `}
              {item.affiliation.specialization} {item.affiliation.primarySkill}
            </div>
          ) : 'No info';
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
                size="default"
                onClick={() => addStudent(item)}
              />
            </List.Item>
          );
        }}
      />
    );
    let listData = null;
    switch (type) {
      case 'GROUPS': {
        listData = (
          <List
            className="students-list"
            itemLayout="horizontal"
            size="large"
            locale={{
              emptyText: 'Загрузка...',
            }}
            pagination={{
              pageSize: 5,
            }}
            dataSource={newGroups}
            renderItem={(item) => {
              const desc = item;
              return (
                <List.Item key={item}>
                  <List.Item.Meta
                    description={desc}
                  />
                  <Button
                    shape="circle"
                    icon="plus-circle"
                    className="button-table"
                    size="default"
                    name={item}
                    onClick={() => addStudent(item, type)}
                  />
                </List.Item>
              );
            }}
          />
        );
        break;
      }
      case 'STUDENTS': {
        listData = list;
        break;
      }
      default: {
        listData = list;
      }
    }
    return (
      <div className="student-list-content">
        <InputSearchStudent setFilter={this.setFilterText}/>
        {listData}
      </div>
    );
  }
}

export default StudentsList;
