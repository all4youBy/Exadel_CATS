import React from 'react';
import 'antd/dist/antd.css';
import { List, Button, message } from 'antd';
import PropTypes from 'prop-types';
import './GroupCreation.scss';

export default class StudentList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const { data, error } = this.props;

    if (error) {
      message.error('Не удалось загрузить список студентов');
      return <div/>;
    }
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
        dataSource={data}
        renderItem={(item) => {
          const { addStudent } = this.props;
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
  }
}
