import React from 'react';
import './SearchTasks.scss';
import { Input } from 'antd';
import PropTypes from 'prop-types';

class SearchTasks extends React.Component {
  render() {
    const { fillDataFilterFields } = this.props;

    return (
      <Input
        className="search-tasks"
        placeholder="Введите автора или название"
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
