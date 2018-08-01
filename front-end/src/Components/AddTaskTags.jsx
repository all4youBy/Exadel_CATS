/* eslint-disable no-return-assign */

import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

export default class EditableTagGroup extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
  };

  render() {
    const { tags, deleteTag } = this.props;
    console.log(tags);
    const tagList = (tags || []).map((item, i) => (
      <Tag color="blue" key={item.text} closable afterClose={() => deleteTag(item.text)}>{tags[i].text}</Tag>
    ));
    return (
      <div style={{ marginLeft: '50px' }}>
        {tagList}
      </div>
    );
  }
}
