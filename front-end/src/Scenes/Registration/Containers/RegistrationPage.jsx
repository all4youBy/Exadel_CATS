import React from 'react';
import './RegistrationPage.scss';

import RegistrationForm from '../Components/RegistrationForm';

class RegistrationPage extends React.PureComponent {
  render() {
    return (
      <div className="registration-page">
        <h2 className="registration-label-class"> Регистрация </h2>
        <div className="form-registration">
          <RegistrationForm/>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
