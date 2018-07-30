import React from 'react';
import { Layout } from 'antd/lib/index';
import './GlobalFooter.scss';

const { Footer } = Layout;

class GlobalFooter extends React.PureComponent {
  render() {
    return (
      <Footer className="page-footer">
        <p className="text-footer">Exadel</p>
      </Footer>
    );
  }
}

export default GlobalFooter;
