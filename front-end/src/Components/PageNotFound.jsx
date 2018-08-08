import React from 'react';
import './PageNotFound.scss';


class PageNotFound extends React.PureComponent {
  render() {
    return (
      <div className="page-error">
        <div className="error">
          404
        </div>
        <div className="page-not-found"> PAGE NOT FOUND </div>
        <div className="tuna"/>
      </div>
    );
  }
}

export default PageNotFound;
