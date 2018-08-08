import React from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TemplateTop from './TemplateTop';
import { addStudentTopByActivity, addStudentTopByTests, addStudentTopBySum } from '../Services/actions/actions';
import './Top.scss';

class Top extends React.Component {
  componentDidMount() {
    const { addTopTask, addTopSum, addTopActivity } = this.props;
    addTopSum();
    addTopTask();
    addTopActivity();
  }

  render() {
    const { topBySum, topByTests, topByActivity } = this.props;

    return (
      <Carousel autoplay effect="fade" className="top-general">
        <TemplateTop
          nameTop="По баллам задач"
          nameTheFirstColumn="Пользователь"
          nameTheSecondColumn="Баллы"
          listUsers={topBySum}
        />
        <TemplateTop
          nameTop="По баллам тестов"
          nameTheFirstColumn="Пользователь"
          nameTheSecondColumn="Баллы"
          listUsers={topByTests}
        />
        <TemplateTop
          nameTop="По активности"
          nameTheFirstColumn="Пользователь"
          nameTheSecondColumn="Действия"
          listUsers={topByActivity}
        />
      </Carousel>
    );
  }
}

Top.propTypes = {
  topBySum: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  topByTests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  topByActivity: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addTopTask: PropTypes.func.isRequired,
  addTopSum: PropTypes.func.isRequired,
  addTopActivity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topBySum: state.top.topBySum,
  topByTests: state.top.topByTests,
  topByActivity: state.top.topByActivity,
});

const mapDispatchToProps = dispatch => ({
  addTopTask: () => {
    dispatch(addStudentTopByTests());
  },
  addTopSum: () => {
    dispatch(addStudentTopBySum());
  },
  addTopActivity: () => {
    dispatch(addStudentTopByActivity());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);
