import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListCheckTests from '../Components/ListCheckTests';
import { fetchQuestionsToCheck, putManualCheck } from '../Services/Actions/actions';

class PageListCheckTests extends React.PureComponent {
  static propTypes = {
    userType: PropTypes.shape().isRequired,
    getQuestions: PropTypes.func.isRequired,
    submitManualCheck: PropTypes.func.isRequired,
    questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    const { getQuestions, userType: { logInInformation: { user: { email } } } } = this.props;
    getQuestions(email);
  }

  render() {
    const { questionList, submitManualCheck } = this.props;
    return (
      <div>
        <ListCheckTests questionList={questionList} submitManualCheck={submitManualCheck}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userType: state,
    questionList: state.checkQuestions.questionList,
  };
}

const mapDispatchToProps = dispatch => ({
  getQuestions: (email) => {
    dispatch(fetchQuestionsToCheck(email));
  },
  submitManualCheck: (answer) => {
    dispatch(putManualCheck(answer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageListCheckTests);
