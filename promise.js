// 默认的3个状态
const MapState = {
  PENDING: "pending",
  FULLFILLED: "fullfilled",
  REJECTED: "rejected",
};
// 处理then链式调用
const resolvePromise = (x, promise2, resolve, reject) => {
  // 如果x和promise2相同，则是循环引用，抛出异常
  if (x === promise2) {
    return reject(new TypeError("循环引用"));
  }
  // 判断x是不是一个promise，首先必须是个对象或者函数，其次promise必须有then方法
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 判断是否有then方法
    let called = false; // 是否被调用过了
    try {
      let then = x.then; // 尝试取出then，可能会报错
      if (typeof then === "function") {
        // 这里then为function就认为是promise
        // 注意：x.then 会触发访问器的get方法，then.call 不会触发
        then.call(
          x,
          (y) => {
            if (called) return; // 只允许调用一次
            called = true;
            // 这里y可能还是一个promise，所以需要递归，直到返回一个普通值
            resolvePromise(y, promise2, resolve, reject);
          },
          (r) => {
            if (called) return; // 只允许调用一次
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x); // 不是函数直接返回
      }
    } catch (e) {
      if (called) return; // 只允许调用一次
      called = true;
      reject(e); // 让promise2变为reject状态
    }
  } else {
    resolve(x); // 普通值直接返回
  }
};
// 除了使用resolve和reject改变状态，还可以使用throw error抛出异常，也会执行失败逻辑
class Promise {
  constructor(executor) {
    this.state = MapState.PENDING; // 初始状态
    this.value = undefined; // 成功时返回的值
    this.reason = undefined; // 失败时返回的原因
    this.onFullfilledCbs = []; // 收集成功的回调
    this.onRejectedCbs = []; // 收集失败的回调
    this.resolve = (value) => {
      if (this.state !== MapState.PENDING) return; // 确保只有pendding状态下可以转变
      this.value = value;
      this.state = MapState.FULLFILLED;
      this.onFullfilledCbs.forEach((fn) => fn()); // 调用成功回调
    };
    this.reject = (reason) => {
      if (this.state !== MapState.PENDING) return;
      this.reason = reason;
      this.state = MapState.REJECTED;
      this.onRejectedCbs.forEach((fn) => fn()); // 调用失败回调
    };
    try {
      executor(this.resolve, this.reject); // 默认new Promise中的函数会立即执行
    } catch (err) {
      this.reject(err); // 如果失败直接调用reject
    }
  }
  then(onFullfilled, onRejected) {
    // 每次调用then方法都必须返回一个全新的promise，x就是上一次then的返回值，它决定了promise2走成功还是失败
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === MapState.PENDING) {
        this.onFullfilledCbs.push(() => onFullfilled); // 可在内部添加自定义逻辑
        this.onRejectedCbs.push(() => onRejected);
      }
      if (this.state === MapState.FULLFILLED) {
        setTimeout(() => {
          try {
            let x = onFullfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            console.log(e);
            reject(e);
          }
        }, 0);
      }
      if (this.state === MapState.REJECTED) {
        onRejected(this.reason);
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            console.log(e);
            reject(e);
          }
        }, 0);
      }
    });
  }
  deferred(resolve, reject) {}
}

module.exports = Promise;
