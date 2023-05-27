/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-04-24 21:32:12
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-21 17:19:14
 */

// import "./style/index.css";
import "./style/index.less";
// import pic from "./style/images/IMG_20221029_153035.jpg";
import axios from "axios";
console.log(1);
const a = 2;
console.log(a)


// var image = new Image();
// image.src = pic;
// document.body.appendChild(image)

// axios.get('/api/info').then(res=>{
//   console.log(res)
// })

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function(){
  var item = document.createElement('div');
  item.innerHTML = 'item';
  document.body.appendChild(item);
}

const arr = (a:any,b:any)=>{
  return new Promise((resolve)=>{
    resolve(1)
  })
}

export default {};