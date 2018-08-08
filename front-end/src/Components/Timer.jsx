/* eslint-disable react/destructuring-assignment */
import React from 'react';
import 'antd/dist/antd.css';
import './Timer.scss';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';

export default class Timer extends React.Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    generalSeconds: 0,
    idInterval: 0,
  };

  componentDidMount() {
    const { endDate } = this.props;
    this.setState({
      generalSeconds: (new Date(endDate) - new Date()) / 1000,
    });
    const idInterval = setInterval(() => {
      this.setState((prevState) => {
        let newMinutes = prevState.generalSeconds / 60;
        let newHours = newMinutes / 60;
        newMinutes = (newHours - Math.floor(newHours)) * 60;
        newHours = Math.floor(newHours);
        const newSeconds = Math.floor((newMinutes - Math.floor(newMinutes)) * 60);
        newMinutes = Math.floor(newMinutes);
        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
          generalSeconds: prevState.generalSeconds - 1,
        };
      });
    }, 1000);
    this.setState({
      idInterval,
    });
  }

  componentWillUnmount() {
    const { idInterval } = this.state;
    clearInterval(idInterval);
  }

  render() {
    const { hours, minutes, seconds } = this.state;
    return (
      <div>
        <Input
          className="input-timer"
          prefix={<Icon type="clock-circle" className="color-circle"/>}
          value={`${hours} : ${minutes} : ${seconds}`}
        />
      </div>
    );
  }
}

Timer.propTypes = {
  endDate: PropTypes.string.isRequired,
};
