import React from 'react';
import { connect } from 'react-redux';
import './AllQuestionsPage.scss';
import PropTypes from 'prop-types';
import TableAllQuestions from '../Components/TableAllQuestions';
import fetchQuestions from '../Services/Actions/actions';


class AllQuestionsPage extends React.Component {
  static propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    getQuestions: PropTypes.func.isRequired,
  };

  render() {
    const { questions, error, getQuestions } = this.props;
    return (
      <TableAllQuestions questions={questions} error={error} getQuestions={getQuestions}/>
    );
  }
}


function mapStateToProps(state) {
  return {
    questions: state.allQuestions.questions,
    error: state.allQuestions.error,
  };
}

const mapDispatchToProps = dispatch => ({
  getQuestions: () => {
    dispatch(fetchQuestions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllQuestionsPage);
