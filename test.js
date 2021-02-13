const feather = require('feather-icons');

// 获取 icons 总数

let icons = [];
for (let icon in feather.icons) {
  icons.push(icon)
}

console.log(icons.length)