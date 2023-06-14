/*
 * @Description:
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-04-24 21:32:12
 * @LastEditors: xxc
 * @LastEditTime: 2023-06-10 21:49:49
 */

// import "./style/index.css";
import './style/index.less';
import axios from 'axios';
import pic from './style/images/IMG_20221029_153035.jpg';

console.log(1);
const a = 2;
console.log(a);

const image = new Image();
image.src = pic;
document.body.appendChild(image);

axios.get('/api/info').then((res) => {
  console.log(res);
});

const btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function () {
  const item = document.createElement('div');
  item.innerHTML = 'item';
  document.body.appendChild(item);
};

const arr = (t:any, b:any) => new Promise((resolve) => {
  resolve({ t, b });
});

export default {};
