import React from 'react';
import './Test.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleAnswer from '../Components/SingleAnswerQuestion';
import MultipleAnswer from '../Components/MultipleAnswersQuestion';
import OpenAnswer from '../Components/OpenAnswerQuestion';
import SymbolAnswersQuestion from '../Components/SymbolAnswerQuestion';
import TestNameAndThemes from '../Components/TestNameAndThemes';
import ButtonCompleteTest from '../Components/ButtonCompleteTest';
import { fetchTestData } from '../Services/Actions/actions';
import Loading from '../../../../Components/Loading';

class Test extends React.PureComponent {
  static propTypes = {
    getTestData: PropTypes.func.isRequired,
    testData: PropTypes.shape().isRequired,
    testId: PropTypes.string.isRequired,
  };

  state = {
    answers: [],
  };

  componentDidMount() {
    const { getTestData, testId } = this.props;
    getTestData(testId);
  }

  render() {
    const { testData } = this.props;
    const { answers } = this.state;
    const test = testData ? (testData.questions || []).map((item) => {
      switch (item.type) {
        case 'SINGLE_VARIANT':
          return <SingleAnswer text={item.text} variants={item.variants} answer={answers}/>;
        case 'MULTI_VARIANT':
          return <MultipleAnswer text={item.text} variants={item.variants} answer={answers}/>;
        case 'AUTOCHECK_TEXT':
          return <SymbolAnswersQuestion text={item.text} answer={answers}/>;
        case 'MANUAL_CHECK_TEXT':
          return <OpenAnswer text={item.text} answer={answers}/>;
        default:
          return <Loading/>;
      }
    }) : <Loading/>;
    return (
      <div className="test">
        <TestNameAndThemes/>
        {test}
        <ButtonCompleteTest/>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
