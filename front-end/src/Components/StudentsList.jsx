

import React from 'react';
import 'antd/dist/antd.css';
import { List, Button, message } from 'antd';
import PropTypes from 'prop-types';
import './GroupCreation.scss';
import InputSearchStudent from './InputSearchStudent';

class StudentsList extends React.PureComponent {
  static propTypes = {
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    getStudentsData: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { getStudentsData } = this.props;
    getStudentsData();
  }

  render() {
    const { students, error, addStudent } = this.props;
    if (error) {
      message.error(error);
    }
    return (
      <div className="student-list-content">
        <InputSearchStudent/>
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
      </div>
    );
  }
}

export default StudentsList;
