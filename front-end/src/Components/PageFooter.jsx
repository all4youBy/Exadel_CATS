import React from 'react';
import { Layout } from 'antd/lib/index';
import './PageFooter.css';

const { Footer } = Layout;

class PageFooter extends React.PureComponent {
  render() {
    return (
      <Footer className="page-footer">
        <p className="text-footer">Exadel</p>
      </Footer>
    );
  }
}

export default PageFooter;
