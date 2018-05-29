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


