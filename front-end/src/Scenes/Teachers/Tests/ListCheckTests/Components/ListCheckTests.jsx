import React from 'react';
import { List, Button } from 'antd';
import './ListCheckTests.scss';
import PropTypes from 'prop-types';
import Loading from '../../../../../Components/Loading';

class ListCheckTests extends React.Component {
  static propTypes = {
    questionList: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitManualCheck: PropTypes.func.isRequired,
    delItem: PropTypes.func.isRequired,
  };

  handleSubmitCheck = (item, answer) => {
    const { submitManualCheck, delItem } = this.props;
    const data = {
      status: answer,
      testId: item.testId,
      questionId: item.questionId,
      answer: item.answer,
    };
    console.log(data);
    submitManualCheck(data);
    delItem(item);
  };

  render() {
    const { questionList } = this.props;
    console.log(questionList);
    let list;
    if (!questionList) {
      list = <Loading/>;
    } else if (questionList.length) {
      list = (
        <List
          className="list-check-tests"
          size="large"
          pagination={{
            pageSize: 10,
          }}
          dataSource={questionList}
          renderItem={item => (
            <List.Item
              key={item.testId}
              className="check-test-list"
            >
              <List.Item.Meta
                title={item.questionText}
                description={(
                  <div>{item.answer}
                    <div className="description">
                      <Button
                        className="button-answer-right"
                        size="large"
                        onClick={() => this.handleSubmitCheck(item, 'ANSWERED_RIGHT')}
                        icon="check-circle"
                      >Верно
                      </Button>
                      <Button
                        className="button-answer-wrong"
                        size="large"
                        onClick={() => this.handleSubmitCheck(item, 'ANSWERED_WRONG')}
                        icon="close-circle"
                      >Неверно
                      </Button>
                    </div>
                  </div>
                )}
                className="test-description"
              />
            </List.Item>
          )}
        />);
    } else {
      list = <p className="empty-check-list">Нет ответов на проверку.</p>;
    }
    return list;
  }
}

export default ListCheckTests;
