import React from 'react';
import 'antd/dist/antd.css';
import './GroupCreation.scss';
import { List, message, Spin, Button } from 'antd';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import PropTypes from 'prop-types';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default class StudentList extends React.PureComponent {

  loadedRowsMap = {};

  static propTypes = {
    addStudent: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  getData = (callback) => {
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
  };

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
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
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index]

  renderItem = ({ index, key, style }) => {
    const [{ data }, { addStudent }] = [this.state, this.props];
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          title={<a href="https://ant.design">{item.name.last}</a>}
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
    const { data } = this.state;
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
      <List>
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
