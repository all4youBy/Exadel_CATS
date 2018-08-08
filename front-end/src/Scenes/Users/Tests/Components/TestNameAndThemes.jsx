/* eslint-disable react/jsx-no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../../../../Components/Timer';
import Loading from '../../../../Components/Loading';
import './TestNameAndThemes.scss';

class TestNameAndThemes extends React.PureComponent {
  render() {
    const { testData } = this.props;
    const timer = testData
      ? (
        <Timer
          endDate={testData.deadline}
        />
      )
      : (
        <Loading/>
      );
    const nameAndThemes = testData ? (
      <div className="test-title-border">
        <div className="test-title">
          <div className="text-test-title">{testData.title}</div>
          <div>Количество вопросов: {(testData.questions || []).length}</div>
          <div>Оставшееся время:
            {timer}
          </div>
        </div>
      </div>
    ) : <Loading/>;
    return (
      nameAndThemes
    );
  }
}

TestNameAndThemes.propTypes = {
  testData: PropTypes.shape().isRequired,
};

export default TestNameAndThemes;
