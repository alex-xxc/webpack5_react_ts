/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-04-24 21:32:12
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-21 17:18:53
 */
import React from "react";
import ReactDOM from "react-dom";
import other from './other';
import "./style/index.less";
// import $ from 'jquery';
class App extends React.Component{
  componentDidMount(){
    // console.log($(".iconfont"))
  }
  render() {
    return (
       <div><span className="iconfont icon-huiyuan"></span></div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))