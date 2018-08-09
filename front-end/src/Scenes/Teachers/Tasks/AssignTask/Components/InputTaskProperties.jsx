import React from 'react';
import './InputTaskProperties.scss';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

class InputTaskProperties extends React.Component {
  render() {
    const { filterList } = this.props;

    return (
      <Input
        className="input-search"
        placeholder="Найти задачу"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}/>}
        onChange={
          (event) => {
            filterList(event.target.value);
          }
        }
        // ref={node => (this.userNameInput = node)}
      />
    );
  }
}

InputTaskProperties.propTypes = {
  filterList: PropTypes.func.isRequired,
};

export default InputTaskProperties;
