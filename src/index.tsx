/*
 * @Description:
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-04-24 21:32:12
 * @LastEditors: xxc
 * @LastEditTime: 2023-06-14 21:47:32
 */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import other from './other';
import './style/index.less';
// import $ from 'jquery';
const Test = React.lazy(() => import(
  /* webpackChunkName: "test" */
  './Test'
));
// import Test from "./Test";
class App extends React.Component {
  componentDidMount() {
    // console.log($(".iconfont"))
  }

  render() {
    // const { a = '' } = { a: 2 };
    return (
      <div>
        <span className="iconfont icon-huiyuan" />
        <Suspense>
          <Test />
        </Suspense>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
