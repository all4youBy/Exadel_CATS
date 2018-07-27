/* eslint-disable react/no-unused-prop-types,no-unused-vars */
import React from 'react';
import 'antd/dist/antd.css';
import './GroupCreation.scss';
import { List, message, Spin, Button } from 'antd';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import PropTypes from 'prop-types';

// const fakeDataUrl = 'https://exadelcats.herokuapp.com/users/students';

export default class StudentList extends React.PureComponent {
  loadedRowsMap = {};

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    addStudent: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    getData: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
  };

  componentDidMount() {
    const { getData } = this.props;
    getData('users/students');
    /* this.getData((res) => {
      this.setState({
        data: res.results,
      });
    }); */
  }

  /* getData = (callback) => {
    const headers = new Headers({
      type: 'json',
      'Content-type': 'application/json',
    });
    const request = new Request(fakeDataUrl, {
      method: 'GET',
      headers,
    });
    fetch(request).then((res) => {
      res.json().then(callback);
    });
  }; */

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    const { data } = this.props;
    const { getData } = this.props;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i += 1) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: false,
      });
      return;
    }
    getData('users/students');
    this.setState({
      loading: false,
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index]

  renderItem = ({ index, key, style }) => {
    const { data, addStudent } = this.props;
    const item = data[0][index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          title={<a href="https://ant.design">{item.lastName}</a>}
          description={item.email}
        />
        <Button
          shape="circle"
          icon="plus-circle"
          className="button-table"
          size="medium"
          onClick={() => addStudent(item)}
        />
      </List.Item>
    );
  };

  render() {
    const { data } = this.props;
    const { loading } = this.state;
    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) => vlist({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
          width,
        })}
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) => autoSize({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
        })}
      </InfiniteLoader>
    );
    return (
      <List style={{ width: '50%' }}>
        {
          data.length > 0 && (
            <WindowScroller>
              {infiniteLoader}
            </WindowScroller>
          )
        }
        {loading && <Spin className="demo-loading"/>}
      </List>
    );
  }
}
