function Promise(executor) {
  // 添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  this.callbacks = [];
  
  // 保存实例对象的 this 的值
  const self = this;

  // resolve 函数
  function resolve(data) {
    //判断状态
    if(self.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 [promiseState]
    self.PromiseState = 'fullfilled';
    // 2. 设置对象结果值 [promiseResult]
    self.PromiseResult = data;
    // 调用成功的回调函数
    setTimeout(()=> {
      self.callbacks.forEach(item => {
        item.onResolved(data);
      })
    })
  }
  
  // reject 函数
  function reject(data) {
    //判断状态
    if(self.PromiseState !== 'pending') return;
    // 1. 修改对象的状态 [promiseState]
    self.PromiseState = 'rejected';
    // 2. 设置对象结果值 [promiseResult]
    self.PromiseResult = data;
    // 调用失败的回调函数
     setTimeout(()=> {
      self.callbacks.forEach(item => {
        item.onRejected(data);
      })
    })
  }
  
  try {
    // 同步调用 [执行器函数]
    executor(resolve, reject);
  } catch(e) {
    // 修改 promise 对象状态为[失败]
    reject(e);
  }
}

// then 方法
Promise.prototype.then = function(onResolved, onRejected) {
  const self = this;
  // 判断回调函数参数  用于值传递
  if(typeof onRejcted !== 'function') {
    onRejected = reson => {
      throw reason;
    }
  }
  
   if(typeof onResolved !== 'function') {
    onResolved = reson => value;
  }

  return new Promise((resolve, reject) => {
    // 封装函数
    function callback(type) {
      try{
         // 获取回调执行结果
          let result = type(self.PromiseResult)
          // 判断执行结果是否为 promise 实例
          if(result instanceof Promise) {
            // 如果时 Promise 类型的对象
            result.then(v => {
              resolve(v);
            }, r => {
              reject(r);
            })
          }else {
            // 结果的对象状态为 [成功]
            resolve(result);
        }
       }catch(e) {
          reject(e);
       }
    }
  
    // 调用回调函数
    if(this.PromiseState === 'fullfilled') {
     setTimeout(() => {
       callback(onResolved);
     })
    }
    if(this.PromiseState === 'rejected') {
       setTimeout(() => {
        callback(onRejected);
     })
    }
    // 判断 pending 状态
    if(this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push[{
          callback(onResolved);
        },
        onRejected: function() {
          callback(onRejected);
        }
      }]
    }
  })
}

//添加 catch 方法
Promise.protype.catch = function(onRejected) {
  return this.then(undefined, onReject);
}

//添加 resolve 方法
Promise.resolve = function(value) => {
  //返回 promise 对象
  return new Promise((resolve, reject) => {
    if(value instanceof Promise) {
      value.then(v => {
        resolve(v);
      }, r => {
        reject(r);
      })
    }else {
      //设置状态为成功
      resolve(value);
    }
  })
}

//添加 reject 方法
Promise.reject = function(value) => {
  //返回 promise 对象
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

//添加 all 方法
Promise.all = function(promises) => {
  // 返回 promise 对象
  return new Promise((resolve, reject) => {
    // 声明变量
    let count = 0;
    let arr = [];
    
    for(let i=0; i < promises.length; i++) {
      promises[i].then(v => {
        // 得知对象的状态是成功
        // 每个promise对象 都成功
        count++;
        //将当前 promise 对象成功的结果存入到数组中
        arr[i] = v;
        // 判断
        if(count === promises.length) {
          // 修改状态
          resolve(arr);
        }
      }, r => {
        reject(r);
      })
    }
  })
}

//添加 race 方法
Promise.race = function(value) => {
  //返回 promise 对象
  return new Promise((resolve, reject) => {
    for(let i=0; i < promises.length; i++) {
      promises[i].then(v => {
        // 得知对象的状态是成功
        resolve(v);
      }, r => {
        reject(r);
      })
    }
  })
}
