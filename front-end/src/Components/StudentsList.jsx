import React from 'react';
import 'antd/dist/antd.css';
import { List, Button, message, Radio } from 'antd';
import PropTypes from 'prop-types';
import './GroupCreation.scss';
import InputSearchStudent from './InputSearchStudent';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class StudentList extends React.PureComponent {
  static propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    getStudentsData: PropTypes.func.isRequired,
    getGroupsData: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  state = {
    type: '',
  };

  componentDidMount() {
    const { getStudentsData, getGroupsData } = this.props;
    getStudentsData();
    getGroupsData();
  }

  setList = (event) => {
    const { value } = event.target;
    this.setState({
      type: value,
    });
  };

  render() {
    const { students, groups, error, addStudent } = this.props;
    const { type } = this.state;
    if (error) {
      message.error(error);
      return <div/>;
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
          pageSize: 10,
        }}
        dataSource={students}
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
              pageSize: 10,
            }}
            dataSource={groups}
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
                    onClick={() => addStudent(item)}
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
        <InputSearchStudent/>
        <div>
          <RadioGroup defaultValue="a" className="parent-radio-button" onChange={this.setList}>
            <RadioButton value="GROUPS" className="parent-radio-button-groups">Группы</RadioButton>
            <RadioButton value="STUDENTS" className="parent-radio-button-students">Студенты</RadioButton>
          </RadioGroup>
        </div>
        {listData}
      </div>
    );
  }
}
