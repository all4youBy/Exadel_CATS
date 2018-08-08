import React from 'react';
import PropTypes from 'prop-types';
import SectionTree from './SectionTree';
import EditableTagGroup from './AddTaskTags';
import './TreeWithTags.scss';

export default class TreeWithTags extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.any).isRequired,
    deleteTag: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.any).isRequired,
  };

  render() {
    const { addTag, deleteTag, tags, topics, getTopics } = this.props;
    return (
      <div>
        <div className="choose-tags">Выберите тему:</div>
        <div className="tags-container">
          <SectionTree addTag={addTag} topics={topics} getTopics={getTopics}/>
          <EditableTagGroup tags={tags} deleteTag={deleteTag}/>
        </div>
      </div>
    );
  }
}
