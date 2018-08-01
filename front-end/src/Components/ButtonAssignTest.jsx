import React from 'react';
import './ButtonAssignTest.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';

class ButtonAssignTest extends React.Component {
  static propTypes = {
    groupName: PropTypes.string.isRequired,
  };

  render() {
    const { groupName } = this.props;
    const url = `/assigntest/${groupName}`;
    return (
      <Button
        shape="circle"
        icon="profile"
        className="button-table"
        size="small"
        href={url}
      />
    );
  }
}

export default ButtonAssignTest;
