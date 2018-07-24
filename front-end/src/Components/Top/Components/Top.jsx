import React from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TemplateTop from './TemplateTop';
import { addStudentTopByActivity, addStudentTopByTask, addStudentTopBySum } from '../Services/actions/actions';
import './Top.scss';

class Top extends React.Component {
  render() {
    const { topBySum, topByTask, topByActivity } = this.props;


    return (
      <Carousel autoplay effect="fade">
        <TemplateTop
          nameTop="По количеству набранных баллов"
          nameTheFirstColumn="Пользователь"
          nameTheSecondColumn="Баллы"
          listUsers={topBySum}
        />
        <TemplateTop
          nameTop="По итогам задачи"
          nameTheFirstColumn="Пользователь"
          nameTheSecondColumn="Баллы"
          listUsers={topByTask}
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
  topByTask: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  topByActivity: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  topBySum: state.top.topBySum,
  topByTask: state.top.topByTask,
  topByActivity: state.top.topByActivity,
});

const mapDispatchToProps = dispatch => ({
  addTopTask: (student) => {
    dispatch(addStudentTopByTask(student));
  },
  addTopSum: (student) => {
    dispatch(addStudentTopBySum(student));
  },
  addTopActivity: (student) => {
    dispatch(addStudentTopByActivity(student));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);
