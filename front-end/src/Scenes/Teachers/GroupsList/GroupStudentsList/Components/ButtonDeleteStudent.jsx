import React from 'react';
import 'antd/dist/antd.css';
import './ButtonDeleteStudent.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonDeleteStudent extends React.PureComponent {
  static propTypes = {
    onStudentDelete: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
  };

  handleStudentDelete(e) {
    const { onStudentDelete, data } = this.props;
    e.preventDefault();
    onStudentDelete(data);
  }

  render() {
    return (
      <Button
        onClick={e => this.handleStudentDelete(e)}
        shape="circle"
        icon="close"
        className="button-table"
        size="small"
      />
    );
  }
}

export default ButtonDeleteStudent;
