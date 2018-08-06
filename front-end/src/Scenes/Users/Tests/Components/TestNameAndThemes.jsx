/* eslint-disable react/jsx-no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from '../../../../Components/Timer';
import Loading from '../../../../Components/Loading';
import './TestNameAndThemes.scss';

class TestNameAndThemes extends React.PureComponent {
  render() {
    const { deadline } = this.props;
    const timer = deadline
      ? (
        <Timer
          endDate={deadline}
        />
      )
      : (
        <Loading/>
      );
    return (
      <div className="test-title-border">
        <div className="test-title">
          <div className="text-test-title">Название теста</div>
          <div>Количество вопросов: 4</div>
          <div>Оставшееся время:
            {timer}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deadline: state.completeTest.data.deadline,
  };
}

TestNameAndThemes.propTypes = {
  deadline: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {})(TestNameAndThemes);
