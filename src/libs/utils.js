const utilsModule = ((Function) => {
  Function.prototype.myCall = function (ctx) {
    ctx = ctx ? Object(ctx) : window
    ctx.originFn = this
    let args = [];
    for (var i = 1; i < arguments.length; i++) {
      // console.log(arguments[i])
      args.push('arguments[' + i + ']')
    }
    console.log(args.toString())
    let ret = eval('ctx.originFn(' + args + ')')
    delete ctx.originFn

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
      '[object Boolean]': 'Boolean'
    }[({}).toString.call(value)] : typeof (value)
  }

  Function.prototype.myBind = function (ctx) {
    var originFn = this
    var args = [].slice.call(arguments, 1)
    var _tempFn = function () { }

    var newFn = function () {
      var newArgs = [].slice.call(arguments)
      return originFn.apply(this instanceof newFn ? this : ctx, args.concat(newArgs))
    }

    _tempFn.prototype = this.prototype
    newFn.prototype = new _tempFn
    return newFn
  }

  function myNew() {
    var constructor = [].shift.call(arguments)
    var _this = {}

    _this.__proto__ = constructor.prototype
    var res = constructor.apply(_this, arguments)
    return typeOf(res) === 'Object' ? res : _this
    // return _this
  }

  function instanceOf(target, type) {
    console.log(target, type)
    type = type.prototype
    target = target.__proto__

    while(true){
      if(target === null){
        return false
      }
      if(target === type){
        return true
      }
      target = target.__proto__
    }
  }

  return {
    typeOf,
    myNew,
    instanceOf
  }
})(Function)



export default utilsModule