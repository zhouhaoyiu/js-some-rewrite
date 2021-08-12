import utilsModule from "./libs/utils";
const { myNew, instanceOf } = utilsModule
// /**
//  * 
//  * test -> call()->test()
//  * test ->this ->call的第一个三叔
//  */
// function test (c) {
//   console.log(c)
//   return this.a
// }

// let ret = test.myCall({
//   a:1,
//   b:2
// },'水水水')

// console.log(ret)

// function test() {
//   console.log(this, arguments)
// }
// test.myApply({ a: 1, b: 2 }, [3, 4, 5])
// test.myApply({ a: 1, b: 2 }, [3, 4, 5])


// test.prototype.mylove = '李四'
// function test(user, car) {
//   console.log(`${user}刚买了${car}`)
//   console.log(this, arguments)
// }

// const t = test.bind({
//   a:1,
//   b:2
// },'张三')
// t('benchi')
// let newT = new t('benchi')
// console.log(newT.mylove)
// const y = test.myBind({
//   a:1,
//   b:2
// },'张三')
// y('benchi')
// let newY = new y('benchi')
// console.log(newY.mylove)

//   ; (function () {
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

class Test { }
const test = new Test()
console.log(test instanceof Test)
console.log(instanceOf(test, Test))
console.log(instanceOf([], Object))