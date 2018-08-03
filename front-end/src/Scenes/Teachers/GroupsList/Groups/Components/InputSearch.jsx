import React from 'react';
import './InputSearch.scss';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

class InputSearch extends React.Component {
  render() {
    const { filterList } = this.props;

    return (
      <Input
        className="input-search"
        placeholder="Найти группу"
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

InputSearch.propTypes = {
  filterList: PropTypes.func.isRequired,
};

export default InputSearch;
