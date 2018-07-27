import React from 'react';
import './TestNameAndThemes.scss';

class TestNameAndThemes extends React.PureComponent {
  render() {
    const time = '10:00';
    return (
      <div className="test-title-border">
        <div className="test-title">
          <div className="text-test-title">Название теста</div>
          <div>Количество вопросов: 10</div>
          <div>Оставшееся время: {time}</div>
        </div>
      </div>
    );
  }
}

export default TestNameAndThemes;
