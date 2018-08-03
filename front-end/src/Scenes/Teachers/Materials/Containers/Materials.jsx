import React from 'react';
import 'antd/dist/antd.css';
import './Materials.scss';

import MaterialsList from '../Components/MaterialsList';

class Materials extends React.Component {
  render() {
    return (
      <div><MaterialsList/></div>
    );
  }
}

export default Materials;
