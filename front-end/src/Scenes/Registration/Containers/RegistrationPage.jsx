import React from 'react';
import './RegistrationPage.scss';

import RegistrationForm from '../Components/RegistrationForm';

class RegistrationPage extends React.PureComponent {
  render() {
    return (
      <div>
        <p className="registration-label-class"> Регистрация </p>
        <div className="form-registration">
          <RegistrationForm/>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
