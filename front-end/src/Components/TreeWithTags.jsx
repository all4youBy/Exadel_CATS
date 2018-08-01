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
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf.isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, topics, getTopics } = this.props;
    return (
      <div className="tags-container">
        <SectionTree addTag={addTag} topics={topics} getTopics={getTopics}/>
        <EditableTagGroup tags={tags} deleteTag={deleteTag}/>
      </div>
    );
  }
}
