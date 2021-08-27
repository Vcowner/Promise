# Promise
用于学习 Promise 以及理解 Promise 源码

# 1. promise是什么
### 1. 从语法上来说：promise是一个构造函数
### 2. 从功能上来说：promise对象用来封装一个异步操作并可以获取其成功/失败的结果值
 #### 异步编程
fs 文件操作



数据库操作AJAX



定时器




# 2.为什么要用promise
### 2.1 指定回调函数的方式更加灵活
##### 1. 旧的： 必须在启动异步任务前指定
##### 2. promise： 启动异步任务 =》 返回 promise 对象 =》给 promise 对象绑定回调函数(甚至可以在异步任务结束后指定/多个)
### 2.2 支持链式调用，可以解决地狱回调问题
##### 1. 什么是地狱回调
 回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件




##### 2. 回调地狱的缺点
 不便于阅读
 不便于异常处理
##### 3. 解决方案
	promise 链式调用


#### promise 实例




#### promise 读取文件




#### promise Ajax封装实例




#### 封装一个 promise 的读取文件函数




#### 注： 可以使用 util.promisify() 方法 将就会掉函数 转为 promise 风格函数
### 3. promise
#### 	3.1 实例对象中的一个属性 [PromiseState] 状态
pending	未决定的resolved / fullfilled	成功rejected	失败##### 状态的改变只能由 pending -》 resolved  |  pending -》 rejected
##### 只有这两种，且一个 promise 对象只能改变一次

#### 3.2 实例对象的另一个属性 [PromiseResult]
保存着对象成功 / 失败的结果resolve    valuereject      reason


#### 4. Promise 的工作流程
**new Promise()**  pendding状态 **执行异步操作** 成功了执行 resolved() 失败了执行 rejected()**promise对象** resolved状态 | rejected状态**回调 onResolved | 回调onRejected **  then() | then()/cathe()**新的 promise() 对象**


#### 注： executor 会在 Promise 内部立即同步调用， 异步操作在执行器中执行


#### 5.Promise API
Promise.All(promises)返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了直接失败
Promise.resolve(data)如果传入的参数为非 promise 的对象，则返回的结果为成功 promise 对象如果传入的参数为 Promise 对象，则参数的结果决定了 resolve 的结果
Promise.reject(reason)传入的任何参数，返回的结果都是失败的
Promise.race(promises)返回一个新的 promise， 第一个完成的 promise 的结果就是最终的结果状态

#### 6. Promise 的问题
#### 1. 如何更改 promise 的状态
resolve 函数reject 函数抛出错误
#### 2. 一个 promise 指定多个成功  / 失败回调函数，都会调用吗
当 promise 改变为对应状态时都会调用
#### 3. 改变 promise 状态和指定回调函数谁先谁后(指定回调-改变状态-执行回调)
都有可能，在正常情况下是先指定回调在改变状态，但也可以先改状态在指定回调如何先改状态在指定回调？在执行器中直接调用 resolve() / reject() 延迟更长时间才调用 then（）
什么时候才能得到数据?如果先指定的回调，那当状态发生改变的时候，回调函数就会调用，得到数据如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

#### 4.  promise.then() 返回的新 promise 的结果状态由什么决定?
简单来说，由 then() 指定的回调函数执行的结果来决定的 详细表达如果抛出异常，新 promise 变为 rejected， reason 为抛出的异常如果返回的时非 promise 的任意值，新 promise 变为 resolved， value 为返回的值如果返回的是另一个新 promise， 此 promise 的结果就会成为新 promsie 的结果

#### 5. promise 如何串联多个操作任务
promise 的 then0 返沪一个新的 promise, 可以开成 then() 的链式调用通过 then() 的链式调用串联多个同步 / 异步任务
#### 6. promise 异常穿透
当使用 promise 的 then 链式调用时，可以在最后指定失败的回调前面任何操作出了异常， 都会传到最后失败的回调中处理
#### 7. 中断 promise 链
当使用 promise 的 then 链式调用时，在中间中断，不在调用后面的回调函数方法： 在回调函数中返回一个 pendding 状态的 promise 对象






### 4. 手动封装 promsie
#### 4.1 定义整体结构






### 5. asyn 函数
如果返回值是一个非 Promise 类型的对象，返回 成功的状态如果返回的是一个 promise 对象 同 promise dddd
### 6. wait 函数
await 右侧的表达式一般为 promise 对象， 但也可以是其他的值如果表达式是 promise 对象， await 返回的是 promise 成功的值如果表达式是其他的值，直接将此值作为 await 的返回值




