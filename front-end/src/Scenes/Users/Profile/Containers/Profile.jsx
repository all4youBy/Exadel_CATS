import React from 'react';
import './Profile.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InformationUser from '../Components/InformationUser';
import { getUser } from '../Services/actions/actions';
import Top from '../../../../Components/Top';
import Loading from '../../../../Components/Loading';

class Profile extends React.Component {
  componentDidMount() {
    const { email, getUserInformation } = this.props;
    getUserInformation(email);
  }

  render() {
    const { user, email } = this.props;

    const userToProps = {
      email,
      firstName: user.firstName,
      secondName: user.lastName,
      job: user.job || '',
      teacher: user.role === 'TEACHER',
      faculty: user.affiliation ? user.affiliation.faculty : '',
      institution: user.affiliation ? user.affiliation.institution : '',
      yearTermination: user.affiliation ? Number(user.affiliation.graduationYear) : null,
      primarySkill: user.affiliation ? user.affiliation.primarySkill : '',
    };

    const profileDataJSX = email === user.email
      ? (
        <div>
          <InformationUser userData={userToProps}/>
          <div className="right-top">
            <Top/>
          </div>
        </div>
      )
      : (
        <Loading/>
      );

    return (
      <div className="profile">
        <div className="left-top">
          <div className="top-page" align="center">
            <p className="label-top">{user.firstName} {user.lastName} | {user.email}</p>
          </div>
          {profileDataJSX}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  getUserInformation: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  email: ownProps.match.params.email,
  user: state.userAuthorizedData,
});

const mapDispatchToProps = dispatch => ({
  getUserInformation: (email) => {
    dispatch(getUser(email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
