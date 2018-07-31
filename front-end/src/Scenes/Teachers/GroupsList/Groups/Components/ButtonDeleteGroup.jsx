import React from 'react';
import './ButtonEditGroup.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ButtonDeleteGroup extends React.Component {
  static propTypes = {
    onGroupDelete: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
  };

  handleGroupDelete(e) {
    const { onGroupDelete, data } = this.props;
    e.preventDefault();
    onGroupDelete(data);
  }

  render() {
    return (
      <Button
        onClick={() => this.handleGroupDelete}
        shape="circle"
        icon="close"
        className="button-table"
        size="small"
      />
    );
  }
}

export default ButtonDeleteGroup;
