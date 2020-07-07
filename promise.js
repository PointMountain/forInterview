// // let promise = new Promise((resolve, reject)=>{ //executor 执行器 会立刻执行

// // }).then(data => {
// // 		//成功
// // }, err=> {
// // 		//失败
// // })

// const Promise = require('./myPromise')

// let a = new Promise((resolve, reject)=>{
// 	resolve(100)
// })

// let c = a.then((data)=>{
// 	console.log(data)
// 	throw new Error('出错了')
// })

// c.then((data)=>{
// 	console.log(data)
// }, err => {
// 	console.log(err)
// 	return 10000
// }).then(data=>{
// 	console.log(data)
// },err =>{
// 	console.log(err)
// })

const promise = new Promise((resolve, reject)=>{
	
	resolve('success1')
	reject('error')
	
})

promise.then((res)=>{
	console.log(res)
}).catch(err=>{
	console.log(err)
})

