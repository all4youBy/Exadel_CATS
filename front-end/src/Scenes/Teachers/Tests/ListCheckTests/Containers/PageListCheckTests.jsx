import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PageListCheckTests.scss';
import ListCheckTests from '../Components/ListCheckTests';
import { fetchQuestionsToCheck, putManualCheck, deleteItem } from '../Services/Actions/actions';

class PageListCheckTests extends React.PureComponent {
  static propTypes = {
    userType: PropTypes.shape().isRequired,
    getQuestions: PropTypes.func.isRequired,
    submitManualCheck: PropTypes.func.isRequired,
    delItem: PropTypes.func.isRequired,
    questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    const { getQuestions, userType: { logInInformation: { user: { email } } } } = this.props;
    getQuestions(email);
  }

  render() {
    const { questionList, submitManualCheck, delItem } = this.props;
    return (
      <div className="check-answers">
        <ListCheckTests
          questionList={questionList}
          submitManualCheck={submitManualCheck}
          delItem={delItem}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userType: state,
    questionList: state.checkQuestions.questionList,
    empty: state.checkQuestions.empty,
  };
}

const mapDispatchToProps = dispatch => ({
  getQuestions: (email) => {
    dispatch(fetchQuestionsToCheck(email));
  },
  submitManualCheck: (answer) => {
    dispatch(putManualCheck(answer));
  },
  delItem: (answer) => {
    dispatch(deleteItem(answer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageListCheckTests);
