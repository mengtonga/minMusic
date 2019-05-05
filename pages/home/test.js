
//引入一个事件类
import Event from "../../lib/Event.js";
const mod = new Event();
mod.addEvent("onload", function () {
	console.log(1)
}),
 mod.addEvent("ss", function () {
	console.log(1)
}),

console.log(mod)
Page(mod)

// 引入一个封装好的类缓存
// import Storage from "../../lib/Storage.js";
// 实例化一个缓存
// const  db = new Storage("信息");
//  db.add({a:1}).save()
// console.log(db)