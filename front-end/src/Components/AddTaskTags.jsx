/* eslint-disable no-return-assign */

import React from 'react';
import 'antd/dist/antd.css';
import { Tag, Input, Icon } from 'antd';
import PropTypes from 'prop-types';

export default class EditableTagGroup extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
  };

  state = {
    inputVisible: false,
    inputValue: '',
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    const { addTag } = this.props;
    const input = [inputValue];
    addTag(input);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => this.input = input;

  render() {
    const { tags, deleteTag } = this.props;
    const { inputVisible, inputValue } = this.state;
    const tagList = (tags || []).map((item, i) => (
      <Tag key={item} closable afterClose={() => deleteTag(item)}>{ tags[i] }</Tag>
    ));
    return (
      <div style={{ marginLeft: '50px' }}>
        { tagList }
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}
