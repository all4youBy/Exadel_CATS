function requestLoginInformation() {
  return JSON.parse(localStorage.getItem('user'));
}
export default requestLoginInformation;
