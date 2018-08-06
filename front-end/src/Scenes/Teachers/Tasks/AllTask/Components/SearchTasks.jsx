import React from 'react';
import './SearchTasks.scss';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

class SearchTasks extends React.Component {
  render() {
    const { fillDataFilterFields } = this.props;

    return (
      <Input
        className="search-tasks"
        disabled=""
        placeholder="Введите название группы"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}/>}
        onChange={
          (event) => {
            fillDataFilterFields(event.target.value);
          }
        }
        // ref={node => (this.userNameInput = node)}
      />
    );
  }
}

SearchTasks.propTypes = {
  fillDataFilterFields: PropTypes.func.isRequired,
};

export default SearchTasks;
