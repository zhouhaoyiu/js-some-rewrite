import utilsModule from "./libs/utils.js";
const { myNew, instanceOf } = utilsModule
// /**
//  * 
//  * test -> call() ->test()
//  * test -> this ->call的第一个参数
//  * test -> arguments ->call的第二个参数开始为参数列表
//  */
// function test(c, d) {
//   console.log(c, d)
//   return this.a
// }

// let ret = test.myCall({
//   a: 1,
//   b: 2
// }, '水水水', 'huang')

// console.log(ret)

// function test(a, b, c) {
//   console.log(a, b, c)
//   console.log(this, arguments)
// }
// test.myApply({ a: 1, b: 2 }, [3, 4, 5])
// test.myApply({ a: 1, b: 2 }, { a: 3, b: 4, c: 5 })


function test(user, car) {
  console.log(`${user}刚买了${car}`)
  console.log(this, arguments)
}

test.prototype.mylove = '李四'

// bind后返回一个新的函数，这个新的函数的this指向bind传入的this(第一个参数)，并且可以在后面给函数传入参数
// 返回的新的函数还可以继续传参,和call一样分离传参
// const t = test.bind({
//   a:1,
//   b:2
// },'张三')
// t('benchi')
// let newT = new t('benchi')
// console.log(newT.mylove)

const y = test.myBind({
  a: 1,
  b: 2
}, '张三')
// y('benchi')
let newY = new y('benchi')
console.log(newY.mylove)

//   ;(function () {
//     function Test(a, b) {
//       console.log(this)
//       this.a = a
//       this.b = b
//       return {
//         c: 3,
//         d: 4
//       }
//     }
//     Test.prototype.add = function () {
//       return this.a + this.b
//     }
//     window.Test = Test
//   })()

// const test1 = new Test(1, 2)
// const test2 = myNew(Test, 1, 2)
// console.log(test1, test2)

// class Test { }
// const test = new Test()
// console.log(test instanceof Test)
// console.log(instanceOf(test, Test))
// console.log(instanceOf([], Object))