import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonPassTest.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonPassTest extends React.Component {
  static propTypes = {
    testId: PropTypes.string.isRequired,
  };

  render() {
    const { testId } = this.props;
    const link = `/test/${testId}`;
    return (
      <Button className="button-table-with-border" type="primary">
        <Link to={link}> Начать </Link>
      </Button>
    );
  }
}

export default ButtonPassTest;
