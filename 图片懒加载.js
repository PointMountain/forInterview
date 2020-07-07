let imgs = document.querySelectorAll('.img')
let clientHeight = window.innerHeight || document.documentElement.clientHeight
let num = 0
let length = imgs.length
function lazyLoad() {
	for (let i = num; i < length; i++) {
		let distance = clientHeight - imgs[i].getBoundClientRect().top
		if(distance >= 0){
			imgs[i].src = imgs[i].getAttribute('data-src')
			num = i + 1
		}
	}
}

window.addEventListener('scroll', lazyLoad, false)