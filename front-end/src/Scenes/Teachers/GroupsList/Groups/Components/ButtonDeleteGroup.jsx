import React from 'react';
import './ButtonEditGroup.scss';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import requestLoginInformation from '../../../../../Services/loginService';

class ButtonDeleteGroup extends React.Component {
  static propTypes = {
    onGroupDelete: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
    upDate: PropTypes.func.isRequired,
    groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  handleGroupDelete = (e) => {
    const { onGroupDelete, data, upDate, groups } = this.props;
    const object = {
      group: data,
      usersId: [requestLoginInformation().email],
    };
    onGroupDelete(object);
    upDate(groups, data);
    e.preventDefault();
  };

  render() {
    return (
      <Tooltip placement="top" title="Удалить">
        <Button
          onClick={this.handleGroupDelete}
          shape="circle"
          icon="close"
          className="button-table"
          size="small"
        />
      </Tooltip>
    );
  }
}

export default ButtonDeleteGroup;
