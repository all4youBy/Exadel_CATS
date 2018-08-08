import React from 'react';
import 'antd/dist/antd.css';
import './TablePassedTests.scss';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../../Services/loginService';
import Loading from '../../../../../Components/Loading';

class TablePassedTests extends React.PureComponent {
  static propTypes = {
    getPassedTests: PropTypes.func.isRequired,
    tests: PropTypes.arrayOf.isRequired,
  };

  componentDidMount() {
    const { getPassedTests } = this.props;
    getPassedTests(requestLoginInformation().email);
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

    const columns = [{
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      className: 'column-break-point',
    }, {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      width: 500,
      className: 'column-break-point',
    }, {
      title: 'Дата выполнения',
      dataIndex: 'date',
      key: 'date',
      width: 800,
      className: 'column-break-point',
    }, {
      title: 'Результат',
      dataIndex: 'result',
      key: 'result',
      width: 200,
      className: 'column-break-point',
    },
    ];

    const data = [];
    if (tests && tests.length) {
      let deadline = null;
      const tags = [];
      tests.forEach((element, i) => {
        for (let index = 0; index < element.topics.length; index += 1) {
          if (tags[i]) {
            tags[i].push(<Tag color="blue">{element.topics[index]}</Tag>);
          } else {
            tags[i] = [<Tag color="blue">{element.topics[index]}</Tag>];
          }
        }
      });
      for (let i = 0; i < tests.length; i += 1) {
        const date = new Date(tests[i].deadline);
        deadline = formatDate(date);
        data.push({
          key: tests[i].testId,
          name: tests[i].title,
          theme: tags[i],
          author: `Автор ${i}`,
          date: deadline,
          result: tests[i].mark ? tests[i].mark : '---',
          description: 'success',
        });
      }
    }
    let container = null;
    if (tests) {
      if (tests.length) {
        container = (
          <Table
            columns={columns}
            dataSource={data}
          />);
      } else {
        container = (<div className="empty-list">Список пуст</div>);
      }
    } else {
      container = <Loading/>;
    }
    return (
      container
    );
  }
}

export default TablePassedTests;
