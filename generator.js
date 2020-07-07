// const co = require('co')

function* read() {
	yield Promise.resolve(1)
	yield Promise.resolve(2)
	yield Promise.resolve(3)
	return 10
}
let it = read()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

co(it).then(data=>{
	console.log(data)
})

// function co(it) {
// 	return new Promise((resolve, reject) => {
// 		function next(data){
// 			let { value, done } = it.next(data)
// 			if(!done){
// 				Promise.resolve(value).then(data => next(data), reject)
// 			}else{
// 				resolve(value)
// 			}
// 		}
// 		next()
// 	})
// }


function co(it) {
	return new Promise((resolve, reject)=>{
		function next(data) {
			let { value, done } = it.next(data)
			if(!done){
				Promise.resolve(value).then(data=>next(data), reject)
			}else{
				resolve(value)
			}
		}
		next()
	})
}