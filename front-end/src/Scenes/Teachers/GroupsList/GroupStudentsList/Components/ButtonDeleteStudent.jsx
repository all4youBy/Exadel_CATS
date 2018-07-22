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

  constructor(props) {
    super(props);
    this.handleStudentDelete = this.handleStudentDelete.bind(this);
  }

  handleStudentDelete(e) {
    const { onStudentDelete, data } = this.props;
    e.preventDefault();
    onStudentDelete(data);
  }

  render() {
    return (
      <Button
        onClick={this.handleStudentDelete}
        shape="circle"
        icon="close"
        className="button-table"
        size="small"
      />
    );
  }
}

export default ButtonDeleteStudent;
