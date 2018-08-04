import React from 'react';
import 'antd/dist/antd.css';
import '../Scenes/Teachers/Tasks/AddTask/Components/AddTask.scss';
import { Cascader } from 'antd';
import PropTypes from 'prop-types';

export default class SectionTree extends React.PureComponent {
  static propTypes = {
    addTag: PropTypes.func.isRequired,
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
    // errorTopics: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { getTopics } = this.props;
    getTopics();
  }

  handleAddTag = (event) => {
    const { addTag } = this.props;
    addTag(event[event.length - 1]);
  };

  render() {
    const { topics } = this.props;
    return (
      <div className="tree-container">
        <Cascader
          className="section-tree"
          options={topics}
          onChange={this.handleAddTag}
          changeOnSelect
          placeholder="Список тем"
        />
      </div>
    );
  }
}
