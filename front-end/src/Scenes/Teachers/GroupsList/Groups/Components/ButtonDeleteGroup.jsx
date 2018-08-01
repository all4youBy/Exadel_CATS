import React from 'react';
import './ButtonEditGroup.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../../Services/loginService';

class ButtonDeleteGroup extends React.Component {
  static propTypes = {
    onGroupDelete: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
  };

  handleGroupDelete(e) {
    const { onGroupDelete, data } = this.props;
    e.preventDefault();
    const object = {
      group: data,
      usersId: requestLoginInformation().email,
    };
    onGroupDelete(object);
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
