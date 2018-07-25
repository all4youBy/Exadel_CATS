function requestLoginInformation() {
  let userInformation;
  try {
    userInformation = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    userInformation = null;
  }
  return userInformation;
}
export default requestLoginInformation;
