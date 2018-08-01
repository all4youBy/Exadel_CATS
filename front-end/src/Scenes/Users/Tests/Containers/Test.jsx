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
    testData: PropTypes.shape().isRequired,
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
    const { submitQuestion, testId, submitTest } = this.props;
    const { answers } = this.state;
    const answersToSubmit = answers.map(item => ({ ...item, testId }));
    answersToSubmit.forEach(item => submitQuestion(item));
    submitTest({ testId });
  };

  render() {
    const { testData } = this.props;
    const { answers } = this.state;
    const test = testData ? (testData.questions || []).map((item, i) => {
      switch (item.type) {
        case 'SINGLE_VARIANT':
          return (
            <Single
              value={item.id}
              index={i}
              text={item.text}
              variants={item.variants}
              answer={answers}
            />
          );
        case 'MULTI_VARIANT':
          return (
            <Multi
              value={item.id}
              text={item.text}
              index={i}
              variants={item.variants}
              answer={answers}
            />
          );
        case 'AUTOCHECK_TEXT':
          return (
            <SymbolAnswersQuestion
              value={item.id}
              index={i}
              text={item.text}
              answer={answers}
            />
          );
        case 'MANUAL_CHECK_TEXT':
          return (
            <OpenAnswer
              value={item.id}
              text={item.text}
              index={i}
              answer={answers}
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
          onClick={() => this.handleSubmitTest()}
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
