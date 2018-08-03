import React from 'react';
import './InputSearchStudent.scss';
import { Input, Icon } from 'antd';

class InputSearchStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  };

  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
    return (
      <Input
        className="input-search-student"
        placeholder="Поиск"
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }}/>}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        // ref={node => (this.userNameInput = node)}
      />
    );
  }
}


export default InputSearchStudent;
