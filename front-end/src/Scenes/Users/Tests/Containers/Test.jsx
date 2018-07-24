import React from 'react';
import './Test.scss';
import SingleAnswer from '../Components/SingleAnswerQuestion';
import MultipleAnswer from '../Components/MultipleAnswersQuestion';
import OpenAnswer from '../Components/OpenAnswerQuestion';
import SymbolAnswersQuestion from '../Components/SymbolAnswerQuestion';
import TestNameAndThemes from '../Components/TestNameAndThemes';
import ButtonCompleteTest from '../Components/ButtonCompleteTest';

export default class Test extends React.PureComponent {
  render() {
    return (
      <div className="test">
        <TestNameAndThemes/>
        <SingleAnswer/>
        <MultipleAnswer/>
        <SymbolAnswersQuestion/>
        <OpenAnswer/>
        <ButtonCompleteTest/>
      </div>
    );
  }
}
