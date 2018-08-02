import React from 'react';
import './TableAssignedTests.scss';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import ButtonPassTest from './ButtonPassTest';
import requestLoginInformation from '../../../../../Services/loginService';

let tags = ['aaaa', 'ssss', 'ffff'];

tags = tags.map(element => <Tag color="blue">{element}</Tag>);


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
  title: 'Кол. вопросов',
  dataIndex: 'countQuestions',
  key: 'countQuestions',
  width: 250,
  className: 'column-break-point',
}, {
  title: 'Время выполнения',
  dataIndex: 'time',
  key: 'time',
  width: 500,
  className: 'column-break-point',
}, {
  title: '',
  key: 'start',
  width: 100,
  className: 'column-break-point',
  render: (/* text, record */) => (
    <ButtonPassTest/>
  ),
}];

const data = [];
for (let i = 1; i <= 20; i += 1) {
  data.push({
    key: `${i}`,
    name: `Тест ${i}`,
    theme: tags,
    countQuestions: `${i}`,
    time: `${i} мин`,
  });
}


class TableAssignedTests extends React.PureComponent {
  static propTypes = {
    tests: PropTypes.arrayOf.isRequired,
    error: PropTypes.string.isRequired,
    getAssignedTests: PropTypes.func.isRequired,
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
    const { bordered, loading, pagination, size, title, showHeader } = this.state;
    return (
      <div>
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
        />
      </div>
    );
  }
}

export default TableAssignedTests;
