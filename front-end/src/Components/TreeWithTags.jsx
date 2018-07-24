import React from 'react';
import PropTypes from 'prop-types';
import SectionTree from './SectionTree';
import EditableTagGroup from './AddTaskTags';
import './TreeWithTags.scss';

export default class TreeWithTags extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
  };

  render() {
    const { addTag, deleteTag, tags } = this.props;
    return (
      <div className="tags-container">
        <SectionTree addTag={addTag}/>
        <EditableTagGroup tags={tags} deleteTag={deleteTag} addTag={addTag}/>
      </div>
    );
  }
}
