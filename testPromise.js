const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError('无法返回本身'))
	}
	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		try {
			let then = x.then
			if (typeof then === 'function') {
				try {
					then.call(x, y => {
						resolvePromise(promise2, y, resolve, reject)
					}, r => {
						reject(r)
					})
				} catch (error) {
					reject(error)
				}
			} else {
				resolve(x)
			}
		} catch (error) {
			reject(error)
		}
	} else {
		resolve(x)
	}
}

class Promise {
	constructor(executor) {
		this.status = PENDING
		this.value = undefined
		this.reason = undefined
		this.onFulfilledCallbacks = []
		this.onRejectedCallbacks = []

		let resolve = (value) => {
			if (this.status === PENDING) {
				this.value = value
				this.status = FULFILLED
				this.onFulfilledCallbacks.forEach(cb => cb())
			}
		}
		let reject = (reason) => {
			if (this.status === PENDING) {
				this.reason = reason
				this.status = REJECTED
				this.onRejectedCallbacks.forEach(cb => cb())
			}
		}
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}
	then(onfulfilled, onrejected) {
		onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v
		onrejected = typeof onrejected === 'function' ? onrejected : r => {
			throw r
		}

		let promise2 = new Promise((resolve, reject) => {
			if (this.status === PENDING) {

				this.onFulfilledCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onfulfilled(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					});
				})
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onrejected(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					});
				})

			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onrejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				});
			}
			if (this.status === FULFILLED) {
				setTimeout(() => {
					try {
						let x = onfulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				});
			}
		})
		return promise2
	}

	finally(cb){
		return this.then( data => {
			return Promise.resolve(cb()).then(() => data)
		}, error =>{
			return Promise.resolve(cb()).then(()=> {throw error})
		})
	}

	static resolve(value){
		return new Promise((resolve, reject)=>{
			resolve(value)
		})
	}
	static reject(reason){
		return new Promise((resolve, reject)=> {
			reject(reason)
		})
	}
	static race(promises){
		return new Promise((resolve, reject)=>{
			for (let i = 0; i < promises.length; i++) {
				Promise.resolve(promises[i]).then(resolve, reject)
			}
		})
	}
	static all(promises){
		return new Promise((resolve, reject)=>{
			let arr = []
			let index = 0
			function processData(data, i) {
				arr[i] = data
				index ++
				if(index === promises.length){
					resolve(arr)
				}
			}
			for (let i = 0; i < promises.length; i++) {
				Promise.resolve(promises[i]).then(d => processData(d, i), reject)
			}
		})
	}
}