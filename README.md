# Zhaoyuechun
“请你讲一下闭包”——这道题几乎是前端面试必问的问题，今天我试着总结一下如何优雅的回答这道题



闭包是什么？

闭包是有权限访问其他函数作用域内的变量的一个函数。 



这是《JavaScript高级程序设计》中给出的定义，如果你想就用这一句话就把面试官搞定几乎是不可能的。



因为这句话还存在下面几个深入的问题：

■为什么其他非闭包的函数没有权限访问另一个函数的内部作用域

■为什么闭包有这个权限

■什么是函数作用域

面试官更想知道的是你是否知道上面的内容。



那好一个更周全的解释方法应运而生：

由于在JS中，变量的作用域属于函数作用域，在函数执行后作用域就会被清理、内存也随之回收，但是由于闭包是建立在一个函数内部的子函数，由于其可访问上级作用域的原因，即使上级函数执行完，作用域也不会随之销毁，这时的子函数——也就是闭包，便拥有了访问上级作用域中的变量的权限，即使上级函数执行完后作用域内的值也不会被销毁。



稍微有些啰嗦，但是一分钟以内应该足够了（如果流利的话）。这样一来，面试官基本上了解了你对于上面三个知识点是掌握的。



闭包解决了什么？

请放心，就凭上面那段话，面试官是不会善摆干休的。他一定会继续追问，一般来说会问——闭包解决了什么问题。



阮一峰在他的博客——《学习Javascript闭包（Closure）》中写到：在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。



阮一峰写的太文艺了，我想务实点的说法应该是下面这样：

由于闭包可以缓存上级作用域，那么就使得函数外部打破了“函数作用域”的束缚，可以访问函数内部的变量。以平时使用的Ajax成功回调为例，这里其实就是个闭包，由于上述的特性，回调就拥有了整个上级作用域的访问和操作能力，提高了极大的便利。开发者不用去写钩子函数来操作上级函数作用域内部的变量了。



闭包有哪些应用场景

这个问题也极有可能被追问。



我的回答会是下面的样子：

闭包随处可见，一个Ajax请求的成功回调，一个事件绑定的回调方法，一个setTimeout的延时回调，或者一个函数内部返回另一个匿名函数，这些都是闭包。简而言之，无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都有闭包的身影。



闭包有哪些

原理比较深奥：要想完全掌握闭包，一定要清楚函数作用域、内存回收机制、作用域继承等，然而闭包是随处可见的，很可能开发者在不经意间就写出了一个闭包，理解不够深入的话很可能造成运行结果与预期不符。 



代码难以维护：闭包内部是可以缓存上级作用域，而如果闭包又是异步执行的话，一定要清楚上级作用域都发生了什么，而这样就需要对代码的运行逻辑和JS运行机制相当了解才能弄明白究竟发生了什么。





总结

闭包是JavaScript这门语言中非常重要但又难以掌握的概念。如果掌握了闭包并运用自如的话，会让你“功力大增”



参考： 《JavaScript高级程序设计》 《你不知道的JavaScript》 阮一峰的网络日志《学习Javascript闭包（Closure）》

<h1>原型、构造函数、实例、原型链</h1>

使用 JavaScript 编写更好的条件语句

cuppar  大迁世界  4月19日

 大迁世界
大迁世界
我要先坚持分享20年，大家来一起见证吧。
580篇原创内容
公众号
 来源：cuppar
https://www.zcfy.cc/article/tips-to-write-better-conditionals-in-javascript-dev-community
在任何编程语言中，代码需要根据不同的条件在给定的输入中做不同的决定和执行相应的动作。
例如，在一个游戏中，如果玩家生命点为0，游戏结束。在天气应用中，如果在早上被查看，显示一个日出图片，如果是晚上，则显示星星和月亮。在这篇文章中，我们将探索JavaScript中所谓的条件语句如何工作。
如果你使用JavaScript工作，你将写很多包含条件调用的代码。条件调用可能初学很简单，但是还有比写一对对if/else更多的东西。这里有些编写更好更清晰的条件代码的有用提示。
数组方法 Array.includes
提前退出 / 提前返回
用对象字面量或Map替代Switch语句
默认参数和解构
用 Array.every & Array.some 匹配全部/部分内容
使用可选链和空值合并
1. 数组方法 Array.includes

使用 Array.includes 进行多条件选择
例如：
function printAnimals(animal) {
    if (animal === 'dog' || animal === 'cat') {
        console.log(I have a ${animal});
    }
}

console.log(printAnimals('dog')); // I have a dog
上面的代码看起来很好因为我们只检查了两个动物。然而，我们不确定用户输入。如果我们要检查任何其他动物呢？如果我们通过添加更多“或”语句来扩展，代码将变得难以维护和不清晰。
解决方案:
我们可以通过使用 Array.includes 来重写上面的条件
function printAnimals(animal) {
   const animals = ['dog', 'cat', 'hamster', 'turtle']; 

   if (animals.includes(animal)) {
     console.log(I have a ${animal});
   }
}

console.log(printAnimals('hamster')); // I have a hamster
这里，我们创建来一个动物数组，所以条件语句可以和代码的其余部分抽象分离出来。现在，如果我们想要检查任何其他动物，我们只需要添加一个新的数组项。
我们也能在这个函数作用域外部使用这个动物数组变量来在代码中的其他任意地方重用它。这是一个编写更清晰、易理解和维护的代码的方法，不是吗？
2. 提前退出 / 提前返回

这是一个精简你的代码的非常酷的技巧。我记得当我开始专业工作时，我在第一天学习使用提前退出来编写条件。
让我们在之前的例子上添加更多的条件。用包含确定属性的对象替代简单字符串的动物。
现在的需求是：
如果没有动物，抛出一个异常
打印动物类型
打印动物名字
打印动物性别
const printAnimalDetails = animal => {
  let result; // declare a variable to store the final value

  // condition 1: check if animal has a value
  if (animal) {

    // condition 2: check if animal has a type property
    if (animal.type) {

      // condition 3: check if animal has a name property
      if (animal.name) {

        // condition 4: check if animal has a gender property
        if (animal.gender) {
          result = ${animal.name} is a ${animal.gender} ${animal.type};;
        } else {
          result = "No animal gender";
        }
      } else {
        result = "No animal name";
      }
    } else {
      result = "No animal type";
    }
  } else {
    result = "No animal";
  }

  return result;
};

console.log(printAnimalDetails()); // 'No animal'

console.log(printAnimalDetails({ type: "dog", gender: "female" })); // 'No animal name'

console.log(printAnimalDetails({ type: "dog", name: "Lucy" })); // 'No animal gender'

console.log(
  printAnimalDetails({ type: "dog", name: "Lucy", gender: "female" })
); // 'Lucy is a female dog'
你觉得上面的代码怎么样？
它工作得很好，但是代码很长并且维护困难。如果不使用lint工具，找出闭合花括号在哪都会浪费很多时间。😄 想象如果代码有更复杂的逻辑会怎么样？大量的if..else语句。
我们能用三元运算符、&&条件等语法重构上面的功能，但让我们用多个返回语句编写更清晰的代码。
const printAnimalDetails = ({type, name, gender } = {}) => {
  if(!type) return 'No animal type';
  if(!name) return 'No animal name';
  if(!gender) return 'No animal gender';

// Now in this line of code, we're sure that we have an animal with all //the three properties here.

  return ${name} is a ${gender} ${type};
}

console.log(printAnimalDetails()); // 'No animal type'

console.log(printAnimalDetails({ type: dog })); // 'No animal name'

console.log(printAnimalDetails({ type: dog, gender: female })); // 'No animal name'

console.log(printAnimalDetails({ type: dog, name: 'Lucy', gender: 'female' })); // 'Lucy is a female dog'
在这个重构过的版本中，也包含了解构和默认参数。默认参数确保如果我们传递undefined作为一个方法的参数，我们仍然有值可以解构，在这里它是一个空对象{}。
通常，在专业领域，代码被写在这两种方法之间。
另一个例子：
function printVegetablesWithQuantity(vegetable, quantity) {
  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];

  // condition 1: vegetable should be present
   if (vegetable) {
     // condition 2: must be one of the item from the list
     if (vegetables.includes(vegetable)) {
       console.log(I like ${vegetable});

       // condition 3: must be large quantity
       if (quantity >= 10) {
         console.log('I have bought a large quantity');
       }
     }
   } else {
     throw new Error('No vegetable from the list!');
   }
}

printVegetablesWithQuantity(null); //  No vegetable from the list!
printVegetablesWithQuantity('cabbage'); // I like cabbage
printVegetablesWithQuantity('cabbage', 20); 
// 'I like cabbage
// 'I have bought a large quantity'
现在，我们有：
1 if/else 语句过滤非法条件
3 级嵌套if语句 (条件 1, 2, & 3)
一个普遍遵循的规则是：在非法条件匹配时提前退出。
function printVegetablesWithQuantity(vegetable, quantity) {

  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];

   // condition 1: throw error early
   if (!vegetable) throw new Error('No vegetable from the list!');

   // condition 2: must be in the list
   if (vegetables.includes(vegetable)) {
      console.log(I like ${vegetable});

     // condition 3: must be a large quantity
      if (quantity >= 10) {
        console.log('I have bought a large quantity');
      }
   }
}
通过这么做，我们少了一个嵌套层级。当你有一个长的if语句时，这种代码风格特别好。
我们能通过条件倒置和提前返回，进一步减少嵌套的if语句。查看下面的条件2，观察我们是怎么做的
function printVegetablesWithQuantity(vegetable, quantity) {

  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];

   if (!vegetable) throw new Error('No vegetable from the list!'); 
   // condition 1: throw error early

   if (!vegetables.includes(vegetable)) return; 
   // condition 2: return from the function is the vegetable is not in 
  //  the list 


  console.log(I like ${vegetable});

  // condition 3: must be a large quantity
  if (quantity >= 10) {
      console.log('I have bought a large quantity');
  }
}
通过倒置条件2，代码没有嵌套语句了。这种技术在我们有很多条件并且当任何特定条件不匹配时，我们想停止进一步处理的时候特别有用。
所以，总是关注更少的嵌套和提前返回，但也不要过度地使用。
3. 用对象字面量或Map替代Switch语句

让我们来看看下面的例子，我们想要基于颜色打印水果：
function printFruits(color) {
  // use switch case to find fruits by color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

printFruits(null); // []
printFruits('yellow'); // ['banana', 'pineapple']
上面的代码没有错误，但是它仍然有些冗长。相同的功能能用对象字面量以更清晰的语法实现：
// use object literal to find fruits by color
  const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };

function printFruits(color) {
  return fruitColor[color] || [];
}
另外，你也能用 Map 来实现相同的功能：
// use Map to find fruits by color
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function printFruits(color) {
  return fruitColor.get(color) || [];
}
Map 允许保存键值对，是自从ES2015以来可以使用的对象类型。
对于上面的例子，相同的功能也能用数组方法Array.filter 来实现。
const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
];

function printFruits(color) {
  return fruits.filter(fruit => fruit.color === color);
}
4. 默认参数和解构

当使用 JavaScript 工作时，我们总是需要检查 null/undefined 值并赋默认值，否则可能编译失败。
function printVegetablesWithQuantity(vegetable, quantity = 1) { 
// if quantity has no value, assign 1

  if (!vegetable) return;
    console.log(We have ${quantity} ${vegetable}!);
}

//results
printVegetablesWithQuantity('cabbage'); // We have 1 cabbage!
printVegetablesWithQuantity('potato', 2); // We have 2 potato!
如果 vegetable 是一个对象呢？我们能赋一个默认参数吗？
function printVegetableName(vegetable) { 
    if (vegetable && vegetable.name) {
     console.log (vegetable.name);
   } else {
    console.log('unknown');
   }
}

printVegetableName(undefined); // unknown
printVegetableName({}); // unknown
printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
在上面的例子中，如果vegetable 存在，我们想要打印 vegetable name, 否则打印"unknown"。
我们能通过使用默认参数和解构来避免条件语句 if (vegetable && vegetable.name) {} 。
// destructing - get name property only
// assign default empty object {}

function printVegetableName({name} = {}) {
   console.log (name || 'unknown');
}


printVegetableName(undefined); // unknown
printVegetableName({ }); // unknown
printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
因为我们只需要 name 属性，所以我们可以使用 { name } 解构参数，然后我们就能在代码中使用 name 作为变量，而不是 vegetable.name 。
我们还赋了一个空对象 {} 作为默认值，因为当执行 printVegetableName(undefined) 时会得到一个错误：不能从 undefined 或 null 解构属性 name ，因为在 undefined 中没有 name 属性。
5. 用 Array.every & Array.some 匹配全部/部分内容

我们能使用数组方法减少代码行。查看下面的代码，我们想要检查是否所有的水果都是红色的：
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}
这代码太长了！我们能用 Array.every 来减少代码行数：
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
相似地，如果我们想测试是否有任何红色的水果，我们能用一行 Array.some 来实现它。
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
6. 使用可选链和空值合并

这有两个为编写更清晰的条件语句而即将成为 JavaScript 增强的功能。当写这篇文章时，它们还没有被完全支持，你需要使用 Babel 来编译。
可选链允许我们没有明确检查中间节点是否存在地处理 tree-like 结构，空值合并和可选链组合起来工作得很好，以确保为不存在的值赋一个默认值。
这有一个例子：
const car = {
    model: 'Fiesta',
    manufacturer: {
    name: 'Ford',
    address: {
        street: 'Some Street Name',
        number: '5555',
        state: 'USA'
      }
    }
} 

// to get the car model
const model = car && car.model || 'default model';

// to get the manufacturer street
const street = car && car.manufacturer && car.manufacturer.address && 
car.manufacturer.address.street || 'default street';

// request an un-existing property
const phoneNumber = car && car.manufacturer && car.manufacturer.address 
&& car.manufacturer.phoneNumber;

console.log(model) // 'Fiesta'
console.log(street) // 'Some Street Name'
console.log(phoneNumber) // undefined
所以，如果我们想要打印是否车辆生产商来自美国，代码将看起来像这样：
const isManufacturerFromUSA = () => {
   if(car && car.manufacturer && car.manufacturer.address && 
 car.manufacturer.address.state === 'USA') {
     console.log('true');
   }
}


checkCarManufacturerState() // 'true'
你能清晰地看到当有一个更复杂的对象结构时，这能变得多乱。有一些第三方的库有它们自己的函数，像 lodash 或 idx。例如 lodash 有 _.get 方法。然而，JavaScript 语言本身被引入这个特性是非常酷的。
这展示了这些新特性如何工作：
// to get the car model
const model = car?.model ?? 'default model';

// to get the manufacturer street
const street = car?.manufacturer?.address?.street ?? 'default street';

// to check if the car manufacturer is from the USA
const isManufacturerFromUSA = () => {
   if(car?.manufacturer?.address?.state === 'USA') {
     console.log('true');
   }
}
这看起来很美观并容易维护。它已经到 TC39 stage 3 阶段，让我们等待它获得批准，然后我们就能无处不在地看到这难以置信的语法的使用。
总结

让我们为了编写更清晰、易维护的代码，学习并尝试新的技巧和技术，因为在几个月后，长长的条件看起来像搬石头砸自己的脚。😄
 大迁世界
大迁世界
我要先坚持分享20年，大家来一起见证吧。
580篇原创内容
公众号
阅读原文
阅读 199
赞2
在看1
分享此内容的人还喜欢
PHP弱数据类型安全,看看几个简单列子
PHP弱数据类型安全,看看几个简单列子 ...
阅读 394
Laravel技术社区
 不喜欢
不看的原因
确定
内容质量低 不看此公众号
只听说过CSS in JS，怎么还有JS in CSS？
只听说过CSS in JS，怎么还有JS in CSS？ ...
赞 31
前端先锋
 不喜欢
不看的原因
确定
内容质量低 不看此公众号
5个你想要在项目上使用的JavaScript动画库
5个你想要在项目上使用的JavaScript动画库 ...
阅读 421
大迁世界
 不喜欢
不看的原因
确定
内容质量低 不看此公众号
写下你的留言

