import React from 'react';
import 'antd/dist/antd.css';
import './ButtonCreateGroup.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonCreateGroup extends React.Component {
  static propTypes = {
    onAddGroup: PropTypes.func.isRequired,
  };

  handleStudentAdd(e) {
    const { onAddGroup } = this.props;
    e.preventDefault();
    onAddGroup({
      key: '4',
      number: '4',
      name: 'Вишняков Василий Петрович',
      test1: 'Тест 1',
      test2: 'Тест 2',
      countTasks: '4',
      countTests: '4',
    });
  }

  render() {
    return (
      <Button className="button-table-with-border" type="primary">Создать группу</Button>
    );
  }
}

export default ButtonCreateGroup;
