/* eslint-disable react/prop-types,no-unused-vars,react/forbid-prop-types */
import React from 'react';
import './Test.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Single from '../Components/SingleAnswerQuestion';
import Multi from '../Components/MultipleAnswersQuestion';
import OpenAnswer from '../Components/OpenAnswerQuestion';
import SymbolAnswersQuestion from '../Components/SymbolAnswerQuestion';
import TestNameAndThemes from '../Components/TestNameAndThemes';
import { fetchTestData, postTest, postTestAnswer } from '../Services/Actions/actions';
import Loading from '../../../../Components/Loading';

class Test extends React.PureComponent {
  static propTypes = {
    getTestData: PropTypes.func.isRequired,
    testData: PropTypes.objectOf.isRequired,
    testId: PropTypes.string.isRequired,
    submitQuestion: PropTypes.func.isRequired,
    submitTest: PropTypes.func.isRequired,
  };

  state = {
    answers: [],
  };

  componentDidMount() {
    const { getTestData, testId } = this.props;
    getTestData(testId);
  }

  handleSubmitTest = () => {
    const { testId, submitTest } = this.props;
    submitTest(testId);
  };

  render() {
    const { testData, error, history, submitQuestion, testId } = this.props;
    const { answers } = this.state;
    if (error) {
      history.push('/');
    }
    const test = testData ? (testData.questions || []).map((item, i) => {
      switch (item.type) {
        case 'SINGLE_VARIANT':
          return (
            <Single
              key={item.id}
              value={item.id}
              index={i}
              text={item.text}
              variants={item.variants}
              answer={answers}
              submit={submitQuestion}
              testId={testId}
            />
          );
        case 'MULTI_VARIANT':
          return (
            <Multi
              key={item.id}
              value={item.id}
              text={item.text}
              index={i}
              variants={item.variants}
              answer={answers}
              submit={submitQuestion}
              testId={testId}
            />
          );
        case 'AUTOCHECK_TEXT':
          return (
            <SymbolAnswersQuestion
              key={item.id}
              value={item.id}
              index={i}
              text={item.text}
              answer={answers}
              submit={submitQuestion}
              testId={testId}
            />
          );
        case 'MANUAL_CHECK_TEXT':
          return (
            <OpenAnswer
              key={item.id}
              value={item.id}
              text={item.text}
              index={i}
              answer={answers}
              submit={submitQuestion}
              testId={testId}
            />
          );
        default:
          return <Loading/>;
      }
    }) : <Loading/>;
    return (
      <div className="test">
        <TestNameAndThemes/>
        {test}
        <Button
          className="button-table-with-border"
          type="primary"
          onClick={this.handleSubmitTest}
        >Завершить
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    testId: ownProps.match.params.id,
    testData: state.completeTest.data,
  };
}

const mapDispatchToProps = dispatch => ({
  getTestData: (testId) => {
    dispatch(fetchTestData(testId));
  },
  submitQuestion: (data) => {
    dispatch(postTestAnswer(data));
  },
  submitTest: (testId) => {
    dispatch(postTest(testId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
