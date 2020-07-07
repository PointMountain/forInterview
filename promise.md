## promise 优缺点
优点：
1. 可以解决异步嵌套问题
2. 可以解决多个异步并发问题
缺点
1. promise基于回调的
2. promise无法终止异步

## then
如果一个promise的then方法中的函数（成功和失败）返回的结果是一个promise的话，会自动将这个promise执行，并采用它的状态，如果成功会将成功的结果向外层的下一个then传递
如果返回的是一个普通值，那么会将这个普通值作为下一次成功的结果
如果要终止promise 可以返回一个pending的promise `return new Promise(()=>{})`
只有两种情况会失败
  - 返回一个失败的promise
  - 抛出异常

每次执行promise的之后都会返还一个新的promise实例
