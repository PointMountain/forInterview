class lazyMan{
	constructor(name){
		this.name = name
		this.taskList = []
		console.log(`${name}`)
		setTimeout(() => {
			this.next()
		}, 0);
	}
	eat(food){
		let _this = this
		let eatTask = (function (food) {
			return function () {
				console.log(`${food}`)
				_this.next()
			}
		})(food)
		this.taskList.push(eatTask)
		return this
	}
	sleep(time){
		let _this = this
		let eatTask = (function (time) {
			return function () {
				setTimeout(() => {
					console.log(`${time}s`)
					_this.next()
				}, time*1000);
			}
		})(time)
		this.taskList.push(eatTask)
		return this
	}
	next(){
		let task = this.taskList.shift()
		task && task()
	}
}

function LazyMan(name){
	return new lazyMan(name)
}
LazyMan('Tony').eat('lunch').sleep(1).eat('dinner')