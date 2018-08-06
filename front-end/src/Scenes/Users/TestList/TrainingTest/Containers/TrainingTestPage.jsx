/* eslint-disable no-undef,no-unused-vars,react/prop-types,no-empty-pattern */
import React from 'react';
import './TrainingTestPage.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import SectionTree from '../../../../../Components/SectionTree';
import { fetchTopics } from '../../../../Teachers/Tests/AssignTest/Services/Actions/actions';
import { addTopic, fetchTrainingTest } from '../Services/Actions/actions';

class TrainingTestPage extends React.PureComponent {
  static propTypes = {
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.string.isRequired,
    addTag: PropTypes.func.isRequired,
    getTrainingTest: PropTypes.func.isRequired,
    userType: PropTypes.shape().isRequired,
  };

  handleRequestTest = () => {
    const { topic: topicId, getTrainingTest,
      userType: { logInInformation: { user: { email } } } } = this.props;
    const data = {
      topicId,
      email,
    };
    console.log(data);
    getTrainingTest(data);
  };

  render() {
    const { getTopics, topics, addTag } = this.props;
    return (
      <div className="training-test-body">
        <SectionTree addTag={addTag} getTopics={getTopics} topics={topics}/>
        <Button
          className="button-table-with-border"
          type="primary"
          onClick={this.handleRequestTest}
        >Запросить тест
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topics: state.taskInformation.topics,
    topic: state.trainingTest.topic,
    userType: state,
  };
}

const mapDispatchToProps = dispatch => ({
  getTrainingTest: (topic) => {
    dispatch(fetchTrainingTest(topic));
  },
  getTopics: () => {
    dispatch(fetchTopics());
  },
  addTag: (tag) => {
    dispatch(addTopic(tag));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingTestPage);
