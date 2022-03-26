const utilsModule = ((Function, Array) => {

  /**
   * 
   * @param ctx  为待绑定的this,执行上下文
   * @param ctx.originFn 待绑定的函数 与this绑定
   * @param this 调用此方法函数体
   * @returns ret 使用绑定了ctx的this并且使用传入的参数执行的原函数结果
   */
  Function.prototype.myCall = function (ctx) {
    console.log(ctx)
    console.log("this", this)
    ctx = ctx ? Object(ctx) : window // 如果传入的上下文为空,则使用window
    ctx.originFn = this // 将当前函数赋值给上下文的originFn
    let args = [];
    for (var i = 1; i < arguments.length; i++) {
      // console.log(arguments[i])
      args.push('arguments[' + i + ']')
    } // 将arguments转换为字符串
    console.log(args)
    let ret = eval('ctx.originFn(' + args + ')') // 此时this为ctx,所以调用ctx.originFn(arguments)时可以打印出ctx中的属性并且使用eval将原函数体调用传入的参数执行
    delete ctx.originFn // 删除originFn
    console.log(ret)

    return ret
  }

  Function.prototype.myApply = function (ctx, args) {
    ctx = ctx ? Object(ctx) : window
    ctx.originFn = this

    if (typeof args !== 'object' && typeof args !== 'fucntion') {
      throw new TypeError('CreateListFromArrayLike called on non-object')
    }

    if (!args || typeOf(args) !== 'Array') {
      return ctx.originFn()
    }

    // 将传入的参数转换为字符串并且绑定this的上下文调用
    let ret = eval('ctx.originFn(' + args + ')')
    delete ctx.originFn
    return ret
  }

  function typeOf(value) {
    if (value === null) {
      return 'null'
    }
    return typeof (value) === 'object' ? {
      '[object Object]': 'Object',
      '[object Array]': 'Array',
      '[object Number]': 'Number',
      '[object String]': 'String',
      '[object Boolean]': 'Boolean',
      '[object Function]': 'Function',
      '[object Date]': 'Date',
      '[object RegExp]': 'RegExp',
      '[object Error]': 'Error',
      '[object Arguments]': 'Arguments',
      '[object Promise]': 'Promise',
      '[object Map]': 'Map',
      '[object Set]': 'Set',
      '[object WeakMap]': 'WeakMap',
      '[object WeakSet]': 'WeakSet',
      '[object Symbol]': 'Symbol',
      '[object ArrayBuffer]': 'ArrayBuffer',
      '[object DataView]': 'DataView',
      '[object Float32Array]': 'Float32Array',
      '[object Float64Array]': 'Float64Array',
      '[object Int8Array]': 'Int8Array',
      '[object Int16Array]': 'Int16Array',
      '[object Int32Array]': 'Int32Array',
      '[object Uint8Array]': 'Uint8Array',
      '[object Uint16Array]': 'Uint16Array',
      '[object Uint32Array]': 'Uint32Array',
      '[object Uint8ClampedArray]': 'Uint8ClampedArray',
    }[({}).toString.call(value)] : typeof (value)
  }

  Function.prototype.myBind = function (ctx) {
    var originFn = this
    // bind传递的参数
    var args = [].slice.call(arguments, 1)
    var _tempFn = function () { }

    var newFn = function () {
      // 返回的新函数传递的参数
      var newArgs = [].slice.call(arguments)
      console.log('this', this)
      console.log('ctx', ctx)
      return originFn.apply(this instanceof newFn ? this : ctx, args.concat(newArgs))
    }

    _tempFn.prototype = this.prototype
    newFn.prototype = new _tempFn
    return newFn
  }

  function myNew() {
    // arguments[0] 为构造函数
    var constructor = [].shift.call(arguments)
    var _this = {}

    _this.__proto__ = constructor.prototype
    var res = constructor.apply(_this, arguments)
    return typeOf(res) === 'Object' ? res : _this
    // return _this
  }

  function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    var newObj = {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }

  function instanceOf(target, type) {
    console.log(target, type)
    type = type.prototype
    target = target.__proto__

    while (true) {
      if (target === null) {
        return false
      }
      if (target === type) {
        return true
      }
      target = target.__proto__
    }
  }

  Array.prototype.myForEach = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;

    for (var i = 0; i < _len; i++) {
      cb.apply(_arg2, [_arr[i], i, _arr])
    }
  }
  Array.prototype.myMap = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;
    var _newArr = [];
    var _item;
    var _res

    for (var i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      _res = cb.apply(_arg2, [_item, i, _arr])
      _newArr.push(_res)
    }
    return _newArr
  }

  Array.prototype.myFilter = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;
    var _newArr = [];
    var _item;
    var _res

    for (var i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      _res = cb.apply(_arg2, [_item, i, _arr])
      _res && _newArr.push(_item)
    }
    return _newArr

  }

  Array.prototype.myEvery = function (cb) {
    var _arr = this; // 原数组
    var _len = _arr.length; // 原数组长度
    var _arg2 = arguments[1] || window; // 可选参数  对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
    var _item; // 循环变量
    var _res

    console.log('_arg2', _arg2)

    for (var i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      _res = cb.apply(_arg2, [_item, i, _arr]) // 回调函数执行结果
      if (!_res) {
        return false
      }
    }
    return true
  }

  Array.prototype.mySome = function (cb) {
    var _arr = this; // 原数组
    var _len = _arr.length; // 原数组长度
    var _arg2 = arguments[1] || window; // 可选参数  对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
    var _item; // 循环变量
    var _res

    for (var i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      _res = cb.apply(_arg2, [_item, i, _arr]) // 回调函数执行结果
      if (_res) {
        return true
      }
    }
    return false
  }

  Array.prototype.myReduce = function (cb, initVal) {
    var _arr = this; // 原数组
    var _len = _arr.length; // 原数组长度
    var _arg3 = arguments[2] || window; // 可选参数  对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
    var _item

    for (var i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      initVal = cb.apply(_arg3, [initVal, _item, i, _arr])
    }
    return initVal
  }

  Array.prototype.myReduceRight = function (cb, initVal) {
    var _arr = this; // 原数组
    var _len = _arr.length; // 原数组长度
    var _arg3 = arguments[2] || window; // 可选参数  对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
    var _item

    for (var i = _len - 1; i >= 0; i--) {
      _item = deepClone(_arr[i]);
      initVal = cb.apply(_arg3, [initVal, _item, i, _arr])
    }
    return initVal
  }

  class MyPromise {
    constructor(exeuctor) {
      this.status = 'Pending'; // pending fulfilled rejected
      this.value = undefined;
      this.reason = undefined;

      this.onResolvedCallbacks = []; // 存储成功回调函数
      this.onRejectedCallbacks = []; // 存储失败回调函数

      const resolve = (value) => {
        if (this.status === 'Pending') {
          this.status = 'Fullfilled';
          this.value = value;
          this.onResolvedCallbacks.forEach(fn => fn());
        }
      }

      const reject = (reason) => {
        if (this.status === 'Pending') {
          this.status = 'Rejected'
          this.reason = reason
          this.onRejectedCallbacks.forEach(fn => fn())
        }
      }
      try {
        exeuctor(resolve, reject)
      }
      catch (e) {
        reject(e)
      }
    }
    then(onFulfilled, onRejected) {
      if (this.status === 'Fullfilled') {
        onFulfilled(this.value)
      }
      if (this.status === 'Rejected') {
        onRejected(this.reason)
      }
      if (this.status === 'Pending') {
        this.onResolvedCallbacks.push(() => {
          onFulfilled(this.value)
        })
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }

    }
    catch(onRejected) {
      this.then(undefined, onRejected)
    }


  }


  return {
    typeOf,
    myNew,
    instanceOf,
    deepClone,
    MyPromise,
  }
})(Function, Array)



export default utilsModule