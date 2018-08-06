import React from 'react';
import './TableAssignedTests.scss';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import ButtonPassTest from './ButtonPassTest';
// import requestLoginInformation from '../../../../../Services/loginService';
import Loading from '../../../../../Components/Loading';
import requestLoginInformation from '../../../../../Services/loginService';

let tags = ['aaaa', 'ssss', 'ffff'];

tags = tags.map(element => <Tag color="blue">{element}</Tag>);


class TableAssignedTests extends React.PureComponent {
  static propTypes = {
    getAssignedTests: PropTypes.func.isRequired,
    students: PropTypes.objectOf(PropTypes.object).isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentDelete: PropTypes.func.isRequired,
    groupName: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    tests: PropTypes.arrayOf.isRequired,
  };

  state = {
    bordered: false,
    loading: false,
    pagination: { position: 'bottom' },
    size: 'middle',
    title: undefined,
    showHeader: true,
  };

  componentDidMount() {
    const { getAssignedTests } = this.props;
    getAssignedTests(requestLoginInformation().email);
  }

  render() {
    const { tests } = this.props;

    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = `0${dd}`;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${dd}.${mm}.${yy}`;
    }

    const data = [];
    let deadline = null;
    if (tests && tests.length) {
      for (let i = 0; i < 10; i += 1) {
        const date = new Date(tests[i].deadline);
        deadline = formatDate(date);
        data.push({
          key: tests[i].testId,
          name: tests[i].title,
          theme: tags,
          countQuestions: `${i}`,
          time: deadline,
        });
      }
    }
    const columns = [{
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      className: 'column-break-point',
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 600,
      className: 'column-break-point',
    }, {
      title: 'Дата сдачи',
      dataIndex: 'time',
      key: 'time',
      width: 500,
      className: 'column-break-point',
    }, {
      title: '',
      key: 'start',
      width: 100,
      className: 'column-break-point',
      render: (text, record) => (
        <ButtonPassTest testId={record.key}/>
      ),
    }];
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
    let container = null;
    if (tests) {
      if (tests.length) {
        container = (
          <Table
            {...{
              bordered,
              loading,
              pagination,
              size,
              title,
              showHeader,
            }}
            columns={columns}
            dataSource={data}
            rowClassName={() => 'abc'}
          />);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    return (
      <div>
        {container}
      </div>
    );
  }
}

export default TableAssignedTests;
