import React from 'react';
import './InputSearchStudent.scss';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

class InputSearchStudent extends React.Component {
  render() {
    const { setFilter } = this.props;
    return (
      <Input
        className="input-search-student"
        placeholder="Поиск"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}/>}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
        // ref={node => (this.userNameInput = node)}
      />
    );
  }
}

InputSearchStudent.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default InputSearchStudent;
