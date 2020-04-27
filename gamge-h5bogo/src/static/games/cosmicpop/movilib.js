
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PIXI=f()}})(function(){var define,module,exports;return(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(process,global){(function(){var async={};function noop(){}
function identity(v){return v;}
function toBool(v){return!!v;}
function notId(v){return!v;}
var previous_async;var root=typeof self==='object'&&self.self===self&&self||typeof global==='object'&&global.global===global&&global||this;if(root!=null){previous_async=root.async;}
async.noConflict=function(){root.async=previous_async;return async;};function only_once(fn){return function(){if(fn===null)throw new Error("Callback was already called.");fn.apply(this,arguments);fn=null;};}
function _once(fn){return function(){if(fn===null)return;fn.apply(this,arguments);fn=null;};}
var _toString=Object.prototype.toString;var _isArray=Array.isArray||function(obj){return _toString.call(obj)==='[object Array]';};var _isObject=function(obj){var type=typeof obj;return type==='function'||type==='object'&&!!obj;};function _isArrayLike(arr){return _isArray(arr)||(typeof arr.length==="number"&&arr.length>=0&&arr.length%1===0);}
function _arrayEach(arr,iterator){var index=-1,length=arr.length;while(++index<length){iterator(arr[index],index,arr);}}
function _map(arr,iterator){var index=-1,length=arr.length,result=Array(length);while(++index<length){result[index]=iterator(arr[index],index,arr);}
return result;}
function _range(count){return _map(Array(count),function(v,i){return i;});}
function _reduce(arr,iterator,memo){_arrayEach(arr,function(x,i,a){memo=iterator(memo,x,i,a);});return memo;}
function _forEachOf(object,iterator){_arrayEach(_keys(object),function(key){iterator(object[key],key);});}
function _indexOf(arr,item){for(var i=0;i<arr.length;i++){if(arr[i]===item)return i;}
return-1;}
var _keys=Object.keys||function(obj){var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k);}}
return keys;};function _keyIterator(coll){var i=-1;var len;var keys;if(_isArrayLike(coll)){len=coll.length;return function next(){i++;return i<len?i:null;};}else{keys=_keys(coll);len=keys.length;return function next(){i++;return i<len?keys[i]:null;};}}
function _restParam(func,startIndex){startIndex=startIndex==null?func.length-1:+startIndex;return function(){var length=Math.max(arguments.length-startIndex,0);var rest=Array(length);for(var index=0;index<length;index++){rest[index]=arguments[index+startIndex];}
switch(startIndex){case 0:return func.call(this,rest);case 1:return func.call(this,arguments[0],rest);}};}
function _withoutIndex(iterator){return function(value,index,callback){return iterator(value,callback);};}
var _setImmediate=typeof setImmediate==='function'&&setImmediate;var _delay=_setImmediate?function(fn){_setImmediate(fn);}:function(fn){setTimeout(fn,0);};if(typeof process==='object'&&typeof process.nextTick==='function'){async.nextTick=process.nextTick;}else{async.nextTick=_delay;}
async.setImmediate=_setImmediate?_delay:async.nextTick;async.forEach=async.each=function(arr,iterator,callback){return async.eachOf(arr,_withoutIndex(iterator),callback);};async.forEachSeries=async.eachSeries=function(arr,iterator,callback){return async.eachOfSeries(arr,_withoutIndex(iterator),callback);};async.forEachLimit=async.eachLimit=function(arr,limit,iterator,callback){return _eachOfLimit(limit)(arr,_withoutIndex(iterator),callback);};async.forEachOf=async.eachOf=function(object,iterator,callback){callback=_once(callback||noop);object=object||[];var iter=_keyIterator(object);var key,completed=0;while((key=iter())!=null){completed+=1;iterator(object[key],key,only_once(done));}
if(completed===0)callback(null);function done(err){completed--;if(err){callback(err);}
else if(key===null&&completed<=0){callback(null);}}};async.forEachOfSeries=async.eachOfSeries=function(obj,iterator,callback){callback=_once(callback||noop);obj=obj||[];var nextKey=_keyIterator(obj);var key=nextKey();function iterate(){var sync=true;if(key===null){return callback(null);}
iterator(obj[key],key,only_once(function(err){if(err){callback(err);}
else{key=nextKey();if(key===null){return callback(null);}else{if(sync){async.setImmediate(iterate);}else{iterate();}}}}));sync=false;}
iterate();};async.forEachOfLimit=async.eachOfLimit=function(obj,limit,iterator,callback){_eachOfLimit(limit)(obj,iterator,callback);};function _eachOfLimit(limit){return function(obj,iterator,callback){callback=_once(callback||noop);obj=obj||[];var nextKey=_keyIterator(obj);if(limit<=0){return callback(null);}
var done=false;var running=0;var errored=false;(function replenish(){if(done&&running<=0){return callback(null);}
while(running<limit&&!errored){var key=nextKey();if(key===null){done=true;if(running<=0){callback(null);}
return;}
running+=1;iterator(obj[key],key,only_once(function(err){running-=1;if(err){callback(err);errored=true;}
else{replenish();}}));}})();};}
function doParallel(fn){return function(obj,iterator,callback){return fn(async.eachOf,obj,iterator,callback);};}
function doParallelLimit(fn){return function(obj,limit,iterator,callback){return fn(_eachOfLimit(limit),obj,iterator,callback);};}
function doSeries(fn){return function(obj,iterator,callback){return fn(async.eachOfSeries,obj,iterator,callback);};}
function _asyncMap(eachfn,arr,iterator,callback){callback=_once(callback||noop);arr=arr||[];var results=_isArrayLike(arr)?[]:{};eachfn(arr,function(value,index,callback){iterator(value,function(err,v){results[index]=v;callback(err);});},function(err){callback(err,results);});}
async.map=doParallel(_asyncMap);async.mapSeries=doSeries(_asyncMap);async.mapLimit=doParallelLimit(_asyncMap);async.inject=async.foldl=async.reduce=function(arr,memo,iterator,callback){async.eachOfSeries(arr,function(x,i,callback){iterator(memo,x,function(err,v){memo=v;callback(err);});},function(err){callback(err,memo);});};async.foldr=async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,identity).reverse();async.reduce(reversed,memo,iterator,callback);};async.transform=function(arr,memo,iterator,callback){if(arguments.length===3){callback=iterator;iterator=memo;memo=_isArray(arr)?[]:{};}
async.eachOf(arr,function(v,k,cb){iterator(memo,v,k,cb);},function(err){callback(err,memo);});};function _filter(eachfn,arr,iterator,callback){var results=[];eachfn(arr,function(x,index,callback){iterator(x,function(v){if(v){results.push({index:index,value:x});}
callback();});},function(){callback(_map(results.sort(function(a,b){return a.index-b.index;}),function(x){return x.value;}));});}
async.select=async.filter=doParallel(_filter);async.selectLimit=async.filterLimit=doParallelLimit(_filter);async.selectSeries=async.filterSeries=doSeries(_filter);function _reject(eachfn,arr,iterator,callback){_filter(eachfn,arr,function(value,cb){iterator(value,function(v){cb(!v);});},callback);}
async.reject=doParallel(_reject);async.rejectLimit=doParallelLimit(_reject);async.rejectSeries=doSeries(_reject);function _createTester(eachfn,check,getResult){return function(arr,limit,iterator,cb){function done(){if(cb)cb(getResult(false,void 0));}
function iteratee(x,_,callback){if(!cb)return callback();iterator(x,function(v){if(cb&&check(v)){cb(getResult(true,x));cb=iterator=false;}
callback();});}
if(arguments.length>3){eachfn(arr,limit,iteratee,done);}else{cb=iterator;iterator=limit;eachfn(arr,iteratee,done);}};}
async.any=async.some=_createTester(async.eachOf,toBool,identity);async.someLimit=_createTester(async.eachOfLimit,toBool,identity);async.all=async.every=_createTester(async.eachOf,notId,notId);async.everyLimit=_createTester(async.eachOfLimit,notId,notId);function _findGetResult(v,x){return x;}
async.detect=_createTester(async.eachOf,identity,_findGetResult);async.detectSeries=_createTester(async.eachOfSeries,identity,_findGetResult);async.detectLimit=_createTester(async.eachOfLimit,identity,_findGetResult);async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){if(err){callback(err);}
else{callback(null,{value:x,criteria:criteria});}});},function(err,results){if(err){return callback(err);}
else{callback(null,_map(results.sort(comparator),function(x){return x.value;}));}});function comparator(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;}};async.auto=function(tasks,concurrency,callback){if(typeof arguments[1]==='function'){callback=concurrency;concurrency=null;}
callback=_once(callback||noop);var keys=_keys(tasks);var remainingTasks=keys.length;if(!remainingTasks){return callback(null);}
if(!concurrency){concurrency=remainingTasks;}
var results={};var runningTasks=0;var hasError=false;var listeners=[];function addListener(fn){listeners.unshift(fn);}
function removeListener(fn){var idx=_indexOf(listeners,fn);if(idx>=0)listeners.splice(idx,1);}
function taskComplete(){remainingTasks--;_arrayEach(listeners.slice(0),function(fn){fn();});}
addListener(function(){if(!remainingTasks){callback(null,results);}});_arrayEach(keys,function(k){if(hasError)return;var task=_isArray(tasks[k])?tasks[k]:[tasks[k]];var taskCallback=_restParam(function(err,args){runningTasks--;if(args.length<=1){args=args[0];}
if(err){var safeResults={};_forEachOf(results,function(val,rkey){safeResults[rkey]=val;});safeResults[k]=args;hasError=true;callback(err,safeResults);}
else{results[k]=args;async.setImmediate(taskComplete);}});var requires=task.slice(0,task.length-1);var len=requires.length;var dep;while(len--){if(!(dep=tasks[requires[len]])){throw new Error('Has nonexistent dependency in '+requires.join(', '));}
if(_isArray(dep)&&_indexOf(dep,k)>=0){throw new Error('Has cyclic dependencies');}}
function ready(){return runningTasks<concurrency&&_reduce(requires,function(a,x){return(a&&results.hasOwnProperty(x));},true)&&!results.hasOwnProperty(k);}
if(ready()){runningTasks++;task[task.length-1](taskCallback,results);}
else{addListener(listener);}
function listener(){if(ready()){runningTasks++;removeListener(listener);task[task.length-1](taskCallback,results);}}});};async.retry=function(times,task,callback){var DEFAULT_TIMES=5;var DEFAULT_INTERVAL=0;var attempts=[];var opts={times:DEFAULT_TIMES,interval:DEFAULT_INTERVAL};function parseTimes(acc,t){if(typeof t==='number'){acc.times=parseInt(t,10)||DEFAULT_TIMES;}else if(typeof t==='object'){acc.times=parseInt(t.times,10)||DEFAULT_TIMES;acc.interval=parseInt(t.interval,10)||DEFAULT_INTERVAL;}else{throw new Error('Unsupported argument type for \'times\': '+typeof t);}}
var length=arguments.length;if(length<1||length>3){throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');}else if(length<=2&&typeof times==='function'){callback=task;task=times;}
if(typeof times!=='function'){parseTimes(opts,times);}
opts.callback=callback;opts.task=task;function wrappedTask(wrappedCallback,wrappedResults){function retryAttempt(task,finalAttempt){return function(seriesCallback){task(function(err,result){seriesCallback(!err||finalAttempt,{err:err,result:result});},wrappedResults);};}
function retryInterval(interval){return function(seriesCallback){setTimeout(function(){seriesCallback(null);},interval);};}
while(opts.times){var finalAttempt=!(opts.times-=1);attempts.push(retryAttempt(opts.task,finalAttempt));if(!finalAttempt&&opts.interval>0){attempts.push(retryInterval(opts.interval));}}
async.series(attempts,function(done,data){data=data[data.length-1];(wrappedCallback||opts.callback)(data.err,data.result);});}
return opts.callback?wrappedTask():wrappedTask;};async.waterfall=function(tasks,callback){callback=_once(callback||noop);if(!_isArray(tasks)){var err=new Error('First argument to waterfall must be an array of functions');return callback(err);}
if(!tasks.length){return callback();}
function wrapIterator(iterator){return _restParam(function(err,args){if(err){callback.apply(null,[err].concat(args));}
else{var next=iterator.next();if(next){args.push(wrapIterator(next));}
else{args.push(callback);}
ensureAsync(iterator).apply(null,args);}});}
wrapIterator(async.iterator(tasks))();};function _parallel(eachfn,tasks,callback){callback=callback||noop;var results=_isArrayLike(tasks)?[]:{};eachfn(tasks,function(task,key,callback){task(_restParam(function(err,args){if(args.length<=1){args=args[0];}
results[key]=args;callback(err);}));},function(err){callback(err,results);});}
async.parallel=function(tasks,callback){_parallel(async.eachOf,tasks,callback);};async.parallelLimit=function(tasks,limit,callback){_parallel(_eachOfLimit(limit),tasks,callback);};async.series=function(tasks,callback){_parallel(async.eachOfSeries,tasks,callback);};async.iterator=function(tasks){function makeCallback(index){function fn(){if(tasks.length){tasks[index].apply(null,arguments);}
return fn.next();}
fn.next=function(){return(index<tasks.length-1)?makeCallback(index+1):null;};return fn;}
return makeCallback(0);};async.apply=_restParam(function(fn,args){return _restParam(function(callArgs){return fn.apply(null,args.concat(callArgs));});});function _concat(eachfn,arr,fn,callback){var result=[];eachfn(arr,function(x,index,cb){fn(x,function(err,y){result=result.concat(y||[]);cb(err);});},function(err){callback(err,result);});}
async.concat=doParallel(_concat);async.concatSeries=doSeries(_concat);async.whilst=function(test,iterator,callback){callback=callback||noop;if(test()){var next=_restParam(function(err,args){if(err){callback(err);}else if(test.apply(this,args)){iterator(next);}else{callback.apply(null,[null].concat(args));}});iterator(next);}else{callback(null);}};async.doWhilst=function(iterator,test,callback){var calls=0;return async.whilst(function(){return++calls<=1||test.apply(this,arguments);},iterator,callback);};async.until=function(test,iterator,callback){return async.whilst(function(){return!test.apply(this,arguments);},iterator,callback);};async.doUntil=function(iterator,test,callback){return async.doWhilst(iterator,function(){return!test.apply(this,arguments);},callback);};async.during=function(test,iterator,callback){callback=callback||noop;var next=_restParam(function(err,args){if(err){callback(err);}else{args.push(check);test.apply(this,args);}});var check=function(err,truth){if(err){callback(err);}else if(truth){iterator(next);}else{callback(null);}};test(check);};async.doDuring=function(iterator,test,callback){var calls=0;async.during(function(next){if(calls++<1){next(null,true);}else{test.apply(this,arguments);}},iterator,callback);};function _queue(worker,concurrency,payload){if(concurrency==null){concurrency=1;}
else if(concurrency===0){throw new Error('Concurrency must not be zero');}
function _insert(q,data,pos,callback){if(callback!=null&&typeof callback!=="function"){throw new Error("task callback must be a function");}
q.started=true;if(!_isArray(data)){data=[data];}
if(data.length===0&&q.idle()){return async.setImmediate(function(){q.drain();});}
_arrayEach(data,function(task){var item={data:task,callback:callback||noop};if(pos){q.tasks.unshift(item);}else{q.tasks.push(item);}
if(q.tasks.length===q.concurrency){q.saturated();}});async.setImmediate(q.process);}
function _next(q,tasks){return function(){workers-=1;var removed=false;var args=arguments;_arrayEach(tasks,function(task){_arrayEach(workersList,function(worker,index){if(worker===task&&!removed){workersList.splice(index,1);removed=true;}});task.callback.apply(task,args);});if(q.tasks.length+workers===0){q.drain();}
q.process();};}
var workers=0;var workersList=[];var q={tasks:[],concurrency:concurrency,payload:payload,saturated:noop,empty:noop,drain:noop,started:false,paused:false,push:function(data,callback){_insert(q,data,false,callback);},kill:function(){q.drain=noop;q.tasks=[];},unshift:function(data,callback){_insert(q,data,true,callback);},process:function(){while(!q.paused&&workers<q.concurrency&&q.tasks.length){var tasks=q.payload?q.tasks.splice(0,q.payload):q.tasks.splice(0,q.tasks.length);var data=_map(tasks,function(task){return task.data;});if(q.tasks.length===0){q.empty();}
workers+=1;workersList.push(tasks[0]);var cb=only_once(_next(q,tasks));worker(data,cb);}},length:function(){return q.tasks.length;},running:function(){return workers;},workersList:function(){return workersList;},idle:function(){return q.tasks.length+workers===0;},pause:function(){q.paused=true;},resume:function(){if(q.paused===false){return;}
q.paused=false;var resumeCount=Math.min(q.concurrency,q.tasks.length);for(var w=1;w<=resumeCount;w++){async.setImmediate(q.process);}}};return q;}
async.queue=function(worker,concurrency){var q=_queue(function(items,cb){worker(items[0],cb);},concurrency,1);return q;};async.priorityQueue=function(worker,concurrency){function _compareTasks(a,b){return a.priority-b.priority;}
function _binarySearch(sequence,item,compare){var beg=-1,end=sequence.length-1;while(beg<end){var mid=beg+((end-beg+1)>>>1);if(compare(item,sequence[mid])>=0){beg=mid;}else{end=mid-1;}}
return beg;}
function _insert(q,data,priority,callback){if(callback!=null&&typeof callback!=="function"){throw new Error("task callback must be a function");}
q.started=true;if(!_isArray(data)){data=[data];}
if(data.length===0){return async.setImmediate(function(){q.drain();});}
_arrayEach(data,function(task){var item={data:task,priority:priority,callback:typeof callback==='function'?callback:noop};q.tasks.splice(_binarySearch(q.tasks,item,_compareTasks)+1,0,item);if(q.tasks.length===q.concurrency){q.saturated();}
async.setImmediate(q.process);});}
var q=async.queue(worker,concurrency);q.push=function(data,priority,callback){_insert(q,data,priority,callback);};delete q.unshift;return q;};async.cargo=function(worker,payload){return _queue(worker,1,payload);};function _console_fn(name){return _restParam(function(fn,args){fn.apply(null,args.concat([_restParam(function(err,args){if(typeof console==='object'){if(err){if(console.error){console.error(err);}}
else if(console[name]){_arrayEach(args,function(x){console[name](x);});}}})]));});}
async.log=_console_fn('log');async.dir=_console_fn('dir');async.memoize=function(fn,hasher){var memo={};var queues={};var has=Object.prototype.hasOwnProperty;hasher=hasher||identity;var memoized=_restParam(function memoized(args){var callback=args.pop();var key=hasher.apply(null,args);if(has.call(memo,key)){async.setImmediate(function(){callback.apply(null,memo[key]);});}
else if(has.call(queues,key)){queues[key].push(callback);}
else{queues[key]=[callback];fn.apply(null,args.concat([_restParam(function(args){memo[key]=args;var q=queues[key];delete queues[key];for(var i=0,l=q.length;i<l;i++){q[i].apply(null,args);}})]));}});memoized.memo=memo;memoized.unmemoized=fn;return memoized;};async.unmemoize=function(fn){return function(){return(fn.unmemoized||fn).apply(null,arguments);};};function _times(mapper){return function(count,iterator,callback){mapper(_range(count),iterator,callback);};}
async.times=_times(async.map);async.timesSeries=_times(async.mapSeries);async.timesLimit=function(count,limit,iterator,callback){return async.mapLimit(_range(count),limit,iterator,callback);};async.seq=function(){var fns=arguments;return _restParam(function(args){var that=this;var callback=args[args.length-1];if(typeof callback=='function'){args.pop();}else{callback=noop;}
async.reduce(fns,args,function(newargs,fn,cb){fn.apply(that,newargs.concat([_restParam(function(err,nextargs){cb(err,nextargs);})]));},function(err,results){callback.apply(that,[err].concat(results));});});};async.compose=function(){return async.seq.apply(null,Array.prototype.reverse.call(arguments));};function _applyEach(eachfn){return _restParam(function(fns,args){var go=_restParam(function(args){var that=this;var callback=args.pop();return eachfn(fns,function(fn,_,cb){fn.apply(that,args.concat([cb]));},callback);});if(args.length){return go.apply(this,args);}
else{return go;}});}
async.applyEach=_applyEach(async.eachOf);async.applyEachSeries=_applyEach(async.eachOfSeries);async.forever=function(fn,callback){var done=only_once(callback||noop);var task=ensureAsync(fn);function next(err){if(err){return done(err);}
task(next);}
next();};function ensureAsync(fn){return _restParam(function(args){var callback=args.pop();args.push(function(){var innerArgs=arguments;if(sync){async.setImmediate(function(){callback.apply(null,innerArgs);});}else{callback.apply(null,innerArgs);}});var sync=true;fn.apply(this,args);sync=false;});}
async.ensureAsync=ensureAsync;async.constant=_restParam(function(values){var args=[null].concat(values);return function(callback){return callback.apply(this,args);};});async.wrapSync=async.asyncify=function asyncify(func){return _restParam(function(args){var callback=args.pop();var result;try{result=func.apply(this,args);}catch(e){return callback(e);}
if(_isObject(result)&&typeof result.then==="function"){result.then(function(value){callback(null,value);})["catch"](function(err){callback(err.message?err:new Error(err));});}else{callback(null,result);}});};if(typeof module==='object'&&module.exports){module.exports=async;}
else if(typeof define==='function'&&define.amd){define([],function(){return async;});}
else{root.async=async;}}());}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"_process":3}],2:[function(require,module,exports){(function(process){function normalizeArray(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==='.'){parts.splice(i,1);}else if(last==='..'){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}
if(allowAboveRoot){for(;up--;up){parts.unshift('..');}}
return parts;}
var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath=function(filename){return splitPathRe.exec(filename).slice(1);};exports.resolve=function(){var resolvedPath='',resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=(i>=0)?arguments[i]:process.cwd();if(typeof path!=='string'){throw new TypeError('Arguments to path.resolve must be strings');}else if(!path){continue;}
resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charAt(0)==='/';}
resolvedPath=normalizeArray(filter(resolvedPath.split('/'),function(p){return!!p;}),!resolvedAbsolute).join('/');return((resolvedAbsolute?'/':'')+resolvedPath)||'.';};exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==='/';path=normalizeArray(filter(path.split('/'),function(p){return!!p;}),!isAbsolute).join('/');if(!path&&!isAbsolute){path='.';}
if(path&&trailingSlash){path+='/';}
return(isAbsolute?'/':'')+path;};exports.isAbsolute=function(path){return path.charAt(0)==='/';};exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=='string'){throw new TypeError('Arguments to path.join must be strings');}
return p;}).join('/'));};exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=='')break;}
var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=='')break;}
if(start>end)return[];return arr.slice(start,end-start+1);}
var fromParts=trim(from.split('/'));var toParts=trim(to.split('/'));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break;}}
var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push('..');}
outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join('/');};exports.sep='/';exports.delimiter=':';exports.dirname=function(path){var result=splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return'.';}
if(dir){dir=dir.substr(0,dir.length-1);}
return root+dir;};exports.basename=function(path,ext){var f=splitPath(path)[2];if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length);}
return f;};exports.extname=function(path){return splitPath(path)[3];};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i]);}
return res;}
var substr='ab'.substr(-1)==='b'?function(str,start,len){return str.substr(start,len)}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len);};}).call(this,require('_process'))},{"_process":3}],3:[function(require,module,exports){var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}
if(queue.length){drainQueue();}}
function drainQueue(){if(draining){return;}
var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}
queueIndex=-1;len=queue.length;}
currentQueue=null;draining=false;clearTimeout(timeout);}
process.nextTick=function(fun){var args=[];args.length=arguments.length-1;if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}
queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}};function Item(fun,array){this.fun=fun;this.array=array;}
Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';process.versions={};function noop(){}
process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/'};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],4:[function(require,module,exports){(function(global){;(function(root){var freeExports=typeof exports=='object'&&exports&&!exports.nodeType&&exports;var freeModule=typeof module=='object'&&module&&!module.nodeType&&module;var freeGlobal=typeof global=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal||freeGlobal.self===freeGlobal){root=freeGlobal;}
var punycode,maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter='-',regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,key;function error(type){throw new RangeError(errors[type]);}
function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length]);}
return result;}
function mapDomain(string,fn){var parts=string.split('@');var result='';if(parts.length>1){result=parts[0]+'@';string=parts[1];}
string=string.replace(regexSeparators,'\x2E');var labels=string.split('.');var encoded=map(labels,fn).join('.');return result+encoded;}
function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{output.push(value);counter--;}}else{output.push(value);}}
return output;}
function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}
output+=stringFromCharCode(value);return output;}).join('');}
function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}
if(codePoint-65<26){return codePoint-65;}
if(codePoint-97<26){return codePoint-97;}
return base;}
function digitToBasic(digit,flag){return digit+22+75*(digit<26)-((flag!=0)<<5);}
function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}
return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}
function decode(input){var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,baseMinusT;basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}
for(j=0;j<basic;++j){if(input.charCodeAt(j)>=0x80){error('not-basic');}
output.push(input.charCodeAt(j));}
for(index=basic>0?basic+1:0;index<inputLength;){for(oldi=i,w=1,k=base;;k+=base){if(index>=inputLength){error('invalid-input');}
digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}
i+=digit*w;t=k<=bias?tMin:(k>=bias+tMax?tMax:k-bias);if(digit<t){break;}
baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}
w*=baseMinusT;}
out=output.length+1;bias=adapt(i-oldi,out,oldi==0);if(floor(i/out)>maxInt-n){error('overflow');}
n+=floor(i/out);i%=out;output.splice(i++,0,n);}
return ucs2encode(output);}
function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],inputLength,handledCPCountPlusOne,baseMinusT,qMinusT;input=ucs2decode(input);inputLength=input.length;n=initialN;delta=0;bias=initialBias;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}
handledCPCount=basicLength=output.length;if(basicLength){output.push(delimiter);}
while(handledCPCount<inputLength){for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}
delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}
if(currentValue==n){for(q=delta,k=base;;k+=base){t=k<=bias?tMin:(k>=bias+tMax?tMax:k-bias);if(q<t){break;}
qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}
output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}
++delta;++n;}
return output.join('');}
function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}
function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}
punycode={'version':'1.3.2','ucs2':{'decode':ucs2decode,'encode':ucs2encode},'decode':decode,'encode':encode,'toASCII':toASCII,'toUnicode':toUnicode};if(typeof define=='function'&&typeof define.amd=='object'&&define.amd){define('punycode',function(){return punycode;});}else if(freeExports&&freeModule){if(module.exports==freeExports){freeModule.exports=punycode;}else{for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else{root.punycode=punycode;}}(this));}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],5:[function(require,module,exports){'use strict';function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}
module.exports=function(qs,sep,eq,options){sep=sep||'&';eq=eq||'=';var obj={};if(typeof qs!=='string'||qs.length===0){return obj;}
var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1000;if(options&&typeof options.maxKeys==='number'){maxKeys=options.maxKeys;}
var len=qs.length;if(maxKeys>0&&len>maxKeys){len=maxKeys;}
for(var i=0;i<len;++i){var x=qs[i].replace(regexp,'%20'),idx=x.indexOf(eq),kstr,vstr,k,v;if(idx>=0){kstr=x.substr(0,idx);vstr=x.substr(idx+1);}else{kstr=x;vstr='';}
k=decodeURIComponent(kstr);v=decodeURIComponent(vstr);if(!hasOwnProperty(obj,k)){obj[k]=v;}else if(isArray(obj[k])){obj[k].push(v);}else{obj[k]=[obj[k],v];}}
return obj;};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};},{}],6:[function(require,module,exports){'use strict';var stringifyPrimitive=function(v){switch(typeof v){case'string':return v;case'boolean':return v?'true':'false';case'number':return isFinite(v)?v:'';default:return'';}};module.exports=function(obj,sep,eq,name){sep=sep||'&';eq=eq||'=';if(obj===null){obj=undefined;}
if(typeof obj==='object'){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v));}).join(sep);}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}
if(!name)return'';return encodeURIComponent(stringifyPrimitive(name))+eq+
encodeURIComponent(stringifyPrimitive(obj));};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i));}
return res;}
var objectKeys=Object.keys||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);}
return res;};},{}],7:[function(require,module,exports){'use strict';exports.decode=exports.parse=require('./decode');exports.encode=exports.stringify=require('./encode');},{"./decode":5,"./encode":6}],8:[function(require,module,exports){var punycode=require('punycode');exports.parse=urlParse;exports.resolve=urlResolve;exports.resolveObject=urlResolveObject;exports.format=urlFormat;exports.Url=Url;function Url(){this.protocol=null;this.slashes=null;this.auth=null;this.host=null;this.port=null;this.hostname=null;this.hash=null;this.search=null;this.query=null;this.pathname=null;this.path=null;this.href=null;}
var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,delims=['<','>','"','`',' ','\r','\n','\t'],unwise=['{','}','|','\\','^','`'].concat(delims),autoEscape=['\''].concat(unwise),nonHostChars=['%','/','?',';','#'].concat(autoEscape),hostEndingChars=['/','?','#'],hostnameMaxLen=255,hostnamePartPattern=/^[a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={'javascript':true,'javascript:':true},hostlessProtocol={'javascript':true,'javascript:':true},slashedProtocol={'http':true,'https':true,'ftp':true,'gopher':true,'file':true,'http:':true,'https:':true,'ftp:':true,'gopher:':true,'file:':true},querystring=require('querystring');function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&isObject(url)&&url instanceof Url)return url;var u=new Url;u.parse(url,parseQueryString,slashesDenoteHost);return u;}
Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(!isString(url)){throw new TypeError("Parameter 'url' must be a string, not "+typeof url);}
var rest=url;rest=rest.trim();var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto;rest=rest.substr(proto.length);}
if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){var slashes=rest.substr(0,2)==='//';if(slashes&&!(proto&&hostlessProtocol[proto])){rest=rest.substr(2);this.slashes=true;}}
if(!hostlessProtocol[proto]&&(slashes||(proto&&!slashedProtocol[proto]))){var hostEnd=-1;for(var i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))
hostEnd=hec;}
var auth,atSign;if(hostEnd===-1){atSign=rest.lastIndexOf('@');}else{atSign=rest.lastIndexOf('@',hostEnd);}
if(atSign!==-1){auth=rest.slice(0,atSign);rest=rest.slice(atSign+1);this.auth=decodeURIComponent(auth);}
hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd))
hostEnd=hec;}
if(hostEnd===-1)
hostEnd=rest.length;this.host=rest.slice(0,hostEnd);rest=rest.slice(hostEnd);this.parseHost();this.hostname=this.hostname||'';var ipv6Hostname=this.hostname[0]==='['&&this.hostname[this.hostname.length-1]===']';if(!ipv6Hostname){var hostparts=this.hostname.split(/\./);for(var i=0,l=hostparts.length;i<l;i++){var part=hostparts[i];if(!part)continue;if(!part.match(hostnamePartPattern)){var newpart='';for(var j=0,k=part.length;j<k;j++){if(part.charCodeAt(j)>127){newpart+='x';}else{newpart+=part[j];}}
if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i);var notHost=hostparts.slice(i+1);var bit=part.match(hostnamePartStart);if(bit){validParts.push(bit[1]);notHost.unshift(bit[2]);}
if(notHost.length){rest='/'+notHost.join('.')+rest;}
this.hostname=validParts.join('.');break;}}}}
if(this.hostname.length>hostnameMaxLen){this.hostname='';}else{this.hostname=this.hostname.toLowerCase();}
if(!ipv6Hostname){var domainArray=this.hostname.split('.');var newOut=[];for(var i=0;i<domainArray.length;++i){var s=domainArray[i];newOut.push(s.match(/[^A-Za-z0-9_-]/)?'xn--'+punycode.encode(s):s);}
this.hostname=newOut.join('.');}
var p=this.port?':'+this.port:'';var h=this.hostname||'';this.host=h+p;this.href+=this.host;if(ipv6Hostname){this.hostname=this.hostname.substr(1,this.hostname.length-2);if(rest[0]!=='/'){rest='/'+rest;}}}
if(!unsafeProtocol[lowerProto]){for(var i=0,l=autoEscape.length;i<l;i++){var ae=autoEscape[i];var esc=encodeURIComponent(ae);if(esc===ae){esc=escape(ae);}
rest=rest.split(ae).join(esc);}}
var hash=rest.indexOf('#');if(hash!==-1){this.hash=rest.substr(hash);rest=rest.slice(0,hash);}
var qm=rest.indexOf('?');if(qm!==-1){this.search=rest.substr(qm);this.query=rest.substr(qm+1);if(parseQueryString){this.query=querystring.parse(this.query);}
rest=rest.slice(0,qm);}else if(parseQueryString){this.search='';this.query={};}
if(rest)this.pathname=rest;if(slashedProtocol[lowerProto]&&this.hostname&&!this.pathname){this.pathname='/';}
if(this.pathname||this.search){var p=this.pathname||'';var s=this.search||'';this.path=p+s;}
this.href=this.format();return this;};function urlFormat(obj){if(isString(obj))obj=urlParse(obj);if(!(obj instanceof Url))return Url.prototype.format.call(obj);return obj.format();}
Url.prototype.format=function(){var auth=this.auth||'';if(auth){auth=encodeURIComponent(auth);auth=auth.replace(/%3A/i,':');auth+='@';}
var protocol=this.protocol||'',pathname=this.pathname||'',hash=this.hash||'',host=false,query='';if(this.host){host=auth+this.host;}else if(this.hostname){host=auth+(this.hostname.indexOf(':')===-1?this.hostname:'['+this.hostname+']');if(this.port){host+=':'+this.port;}}
if(this.query&&isObject(this.query)&&Object.keys(this.query).length){query=querystring.stringify(this.query);}
var search=this.search||(query&&('?'+query))||'';if(protocol&&protocol.substr(-1)!==':')protocol+=':';if(this.slashes||(!protocol||slashedProtocol[protocol])&&host!==false){host='//'+(host||'');if(pathname&&pathname.charAt(0)!=='/')pathname='/'+pathname;}else if(!host){host='';}
if(hash&&hash.charAt(0)!=='#')hash='#'+hash;if(search&&search.charAt(0)!=='?')search='?'+search;pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match);});search=search.replace('#','%23');return protocol+host+pathname+search+hash;};function urlResolve(source,relative){return urlParse(source,false,true).resolve(relative);}
Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,false,true)).format();};function urlResolveObject(source,relative){if(!source)return relative;return urlParse(source,false,true).resolveObject(relative);}
Url.prototype.resolveObject=function(relative){if(isString(relative)){var rel=new Url();rel.parse(relative,false,true);relative=rel;}
var result=new Url();Object.keys(this).forEach(function(k){result[k]=this[k];},this);result.hash=relative.hash;if(relative.href===''){result.href=result.format();return result;}
if(relative.slashes&&!relative.protocol){Object.keys(relative).forEach(function(k){if(k!=='protocol')
result[k]=relative[k];});if(slashedProtocol[result.protocol]&&result.hostname&&!result.pathname){result.path=result.pathname='/';}
result.href=result.format();return result;}
if(relative.protocol&&relative.protocol!==result.protocol){if(!slashedProtocol[relative.protocol]){Object.keys(relative).forEach(function(k){result[k]=relative[k];});result.href=result.format();return result;}
result.protocol=relative.protocol;if(!relative.host&&!hostlessProtocol[relative.protocol]){var relPath=(relative.pathname||'').split('/');while(relPath.length&&!(relative.host=relPath.shift()));if(!relative.host)relative.host='';if(!relative.hostname)relative.hostname='';if(relPath[0]!=='')relPath.unshift('');if(relPath.length<2)relPath.unshift('');result.pathname=relPath.join('/');}else{result.pathname=relative.pathname;}
result.search=relative.search;result.query=relative.query;result.host=relative.host||'';result.auth=relative.auth;result.hostname=relative.hostname||relative.host;result.port=relative.port;if(result.pathname||result.search){var p=result.pathname||'';var s=result.search||'';result.path=p+s;}
result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;}
var isSourceAbs=(result.pathname&&result.pathname.charAt(0)==='/'),isRelAbs=(relative.host||relative.pathname&&relative.pathname.charAt(0)==='/'),mustEndAbs=(isRelAbs||isSourceAbs||(result.host&&relative.pathname)),removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split('/')||[],relPath=relative.pathname&&relative.pathname.split('/')||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];if(psychotic){result.hostname='';result.port=null;if(result.host){if(srcPath[0]==='')srcPath[0]=result.host;else srcPath.unshift(result.host);}
result.host='';if(relative.protocol){relative.hostname=null;relative.port=null;if(relative.host){if(relPath[0]==='')relPath[0]=relative.host;else relPath.unshift(relative.host);}
relative.host=null;}
mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');}
if(isRelAbs){result.host=(relative.host||relative.host==='')?relative.host:result.host;result.hostname=(relative.hostname||relative.hostname==='')?relative.hostname:result.hostname;result.search=relative.search;result.query=relative.query;srcPath=relPath;}else if(relPath.length){if(!srcPath)srcPath=[];srcPath.pop();srcPath=srcPath.concat(relPath);result.search=relative.search;result.query=relative.query;}else if(!isNullOrUndefined(relative.search)){if(psychotic){result.hostname=result.host=srcPath.shift();var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}
result.search=relative.search;result.query=relative.query;if(!isNull(result.pathname)||!isNull(result.search)){result.path=(result.pathname?result.pathname:'')+
(result.search?result.search:'');}
result.href=result.format();return result;}
if(!srcPath.length){result.pathname=null;if(result.search){result.path='/'+result.search;}else{result.path=null;}
result.href=result.format();return result;}
var last=srcPath.slice(-1)[0];var hasTrailingSlash=((result.host||relative.host)&&(last==='.'||last==='..')||last==='');var up=0;for(var i=srcPath.length;i>=0;i--){last=srcPath[i];if(last=='.'){srcPath.splice(i,1);}else if(last==='..'){srcPath.splice(i,1);up++;}else if(up){srcPath.splice(i,1);up--;}}
if(!mustEndAbs&&!removeAllDots){for(;up--;up){srcPath.unshift('..');}}
if(mustEndAbs&&srcPath[0]!==''&&(!srcPath[0]||srcPath[0].charAt(0)!=='/')){srcPath.unshift('');}
if(hasTrailingSlash&&(srcPath.join('/').substr(-1)!=='/')){srcPath.push('');}
var isAbsolute=srcPath[0]===''||(srcPath[0]&&srcPath[0].charAt(0)==='/');if(psychotic){result.hostname=result.host=isAbsolute?'':srcPath.length?srcPath.shift():'';var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.host=result.hostname=authInHost.shift();}}
mustEndAbs=mustEndAbs||(result.host&&srcPath.length);if(mustEndAbs&&!isAbsolute){srcPath.unshift('');}
if(!srcPath.length){result.pathname=null;result.path=null;}else{result.pathname=srcPath.join('/');}
if(!isNull(result.pathname)||!isNull(result.search)){result.path=(result.pathname?result.pathname:'')+
(result.search?result.search:'');}
result.auth=relative.auth||result.auth;result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;};Url.prototype.parseHost=function(){var host=this.host;var port=portPattern.exec(host);if(port){port=port[0];if(port!==':'){this.port=port.substr(1);}
host=host.substr(0,host.length-port.length);}
if(host)this.hostname=host;};function isString(arg){return typeof arg==="string";}
function isObject(arg){return typeof arg==='object'&&arg!==null;}
function isNull(arg){return arg===null;}
function isNullOrUndefined(arg){return arg==null;}},{"punycode":4,"querystring":7}],9:[function(require,module,exports){'use strict';module.exports=earcut;function earcut(data,holeIndices,dim){dim=dim||2;var hasHoles=holeIndices&&holeIndices.length,outerLen=hasHoles?holeIndices[0]*dim:data.length,outerNode=linkedList(data,0,outerLen,dim,true),triangles=[];if(!outerNode)return triangles;var minX,minY,maxX,maxY,x,y,size;if(hasHoles)outerNode=eliminateHoles(data,holeIndices,outerNode,dim);if(data.length>80*dim){minX=maxX=data[0];minY=maxY=data[1];for(var i=dim;i<outerLen;i+=dim){x=data[i];y=data[i+1];if(x<minX)minX=x;if(y<minY)minY=y;if(x>maxX)maxX=x;if(y>maxY)maxY=y;}
size=Math.max(maxX-minX,maxY-minY);}
earcutLinked(outerNode,triangles,dim,minX,minY,size);return triangles;}
function linkedList(data,start,end,dim,clockwise){var sum=0,i,j,last;for(i=start,j=end-dim;i<end;i+=dim){sum+=(data[j]-data[i])*(data[i+1]+data[j+1]);j=i;}
if(clockwise===(sum>0)){for(i=start;i<end;i+=dim)last=insertNode(i,data[i],data[i+1],last);}else{for(i=end-dim;i>=start;i-=dim)last=insertNode(i,data[i],data[i+1],last);}
return last;}
function filterPoints(start,end){if(!start)return start;if(!end)end=start;var p=start,again;do{again=false;if(!p.steiner&&(equals(p,p.next)||area(p.prev,p,p.next)===0)){removeNode(p);p=end=p.prev;if(p===p.next)return null;again=true;}else{p=p.next;}}while(again||p!==end);return end;}
function earcutLinked(ear,triangles,dim,minX,minY,size,pass){if(!ear)return;if(!pass&&size)indexCurve(ear,minX,minY,size);var stop=ear,prev,next;while(ear.prev!==ear.next){prev=ear.prev;next=ear.next;if(size?isEarHashed(ear,minX,minY,size):isEar(ear)){triangles.push(prev.i/dim);triangles.push(ear.i/dim);triangles.push(next.i/dim);removeNode(ear);ear=next.next;stop=next.next;continue;}
ear=next;if(ear===stop){if(!pass){earcutLinked(filterPoints(ear),triangles,dim,minX,minY,size,1);}else if(pass===1){ear=cureLocalIntersections(ear,triangles,dim);earcutLinked(ear,triangles,dim,minX,minY,size,2);}else if(pass===2){splitEarcut(ear,triangles,dim,minX,minY,size);}
break;}}}
function isEar(ear){var a=ear.prev,b=ear,c=ear.next;if(area(a,b,c)>=0)return false;var p=ear.next.next;while(p!==ear.prev){if(pointInTriangle(a.x,a.y,b.x,b.y,c.x,c.y,p.x,p.y)&&area(p.prev,p,p.next)>=0)return false;p=p.next;}
return true;}
function isEarHashed(ear,minX,minY,size){var a=ear.prev,b=ear,c=ear.next;if(area(a,b,c)>=0)return false;var minTX=a.x<b.x?(a.x<c.x?a.x:c.x):(b.x<c.x?b.x:c.x),minTY=a.y<b.y?(a.y<c.y?a.y:c.y):(b.y<c.y?b.y:c.y),maxTX=a.x>b.x?(a.x>c.x?a.x:c.x):(b.x>c.x?b.x:c.x),maxTY=a.y>b.y?(a.y>c.y?a.y:c.y):(b.y>c.y?b.y:c.y);var minZ=zOrder(minTX,minTY,minX,minY,size),maxZ=zOrder(maxTX,maxTY,minX,minY,size);var p=ear.nextZ;while(p&&p.z<=maxZ){if(p!==ear.prev&&p!==ear.next&&pointInTriangle(a.x,a.y,b.x,b.y,c.x,c.y,p.x,p.y)&&area(p.prev,p,p.next)>=0)return false;p=p.nextZ;}
p=ear.prevZ;while(p&&p.z>=minZ){if(p!==ear.prev&&p!==ear.next&&pointInTriangle(a.x,a.y,b.x,b.y,c.x,c.y,p.x,p.y)&&area(p.prev,p,p.next)>=0)return false;p=p.prevZ;}
return true;}
function cureLocalIntersections(start,triangles,dim){var p=start;do{var a=p.prev,b=p.next.next;if(intersects(a,p,p.next,b)&&locallyInside(a,b)&&locallyInside(b,a)){triangles.push(a.i/dim);triangles.push(p.i/dim);triangles.push(b.i/dim);removeNode(p);removeNode(p.next);p=start=b;}
p=p.next;}while(p!==start);return p;}
function splitEarcut(start,triangles,dim,minX,minY,size){var a=start;do{var b=a.next.next;while(b!==a.prev){if(a.i!==b.i&&isValidDiagonal(a,b)){var c=splitPolygon(a,b);a=filterPoints(a,a.next);c=filterPoints(c,c.next);earcutLinked(a,triangles,dim,minX,minY,size);earcutLinked(c,triangles,dim,minX,minY,size);return;}
b=b.next;}
a=a.next;}while(a!==start);}
function eliminateHoles(data,holeIndices,outerNode,dim){var queue=[],i,len,start,end,list;for(i=0,len=holeIndices.length;i<len;i++){start=holeIndices[i]*dim;end=i<len-1?holeIndices[i+1]*dim:data.length;list=linkedList(data,start,end,dim,false);if(list===list.next)list.steiner=true;queue.push(getLeftmost(list));}
queue.sort(compareX);for(i=0;i<queue.length;i++){eliminateHole(queue[i],outerNode);outerNode=filterPoints(outerNode,outerNode.next);}
return outerNode;}
function compareX(a,b){return a.x-b.x;}
function eliminateHole(hole,outerNode){outerNode=findHoleBridge(hole,outerNode);if(outerNode){var b=splitPolygon(outerNode,hole);filterPoints(b,b.next);}}
function findHoleBridge(hole,outerNode){var p=outerNode,hx=hole.x,hy=hole.y,qx=-Infinity,m;do{if(hy<=p.y&&hy>=p.next.y){var x=p.x+(hy-p.y)*(p.next.x-p.x)/(p.next.y-p.y);if(x<=hx&&x>qx){qx=x;m=p.x<p.next.x?p:p.next;}}
p=p.next;}while(p!==outerNode);if(!m)return null;if(hole.x===m.x)return m.prev;var stop=m,tanMin=Infinity,tan;p=m.next;while(p!==stop){if(hx>=p.x&&p.x>=m.x&&pointInTriangle(hy<m.y?hx:qx,hy,m.x,m.y,hy<m.y?qx:hx,hy,p.x,p.y)){tan=Math.abs(hy-p.y)/(hx-p.x);if((tan<tanMin||(tan===tanMin&&p.x>m.x))&&locallyInside(p,hole)){m=p;tanMin=tan;}}
p=p.next;}
return m;}
function indexCurve(start,minX,minY,size){var p=start;do{if(p.z===null)p.z=zOrder(p.x,p.y,minX,minY,size);p.prevZ=p.prev;p.nextZ=p.next;p=p.next;}while(p!==start);p.prevZ.nextZ=null;p.prevZ=null;sortLinked(p);}
function sortLinked(list){var i,p,q,e,tail,numMerges,pSize,qSize,inSize=1;do{p=list;list=null;tail=null;numMerges=0;while(p){numMerges++;q=p;pSize=0;for(i=0;i<inSize;i++){pSize++;q=q.nextZ;if(!q)break;}
qSize=inSize;while(pSize>0||(qSize>0&&q)){if(pSize===0){e=q;q=q.nextZ;qSize--;}else if(qSize===0||!q){e=p;p=p.nextZ;pSize--;}else if(p.z<=q.z){e=p;p=p.nextZ;pSize--;}else{e=q;q=q.nextZ;qSize--;}
if(tail)tail.nextZ=e;else list=e;e.prevZ=tail;tail=e;}
p=q;}
tail.nextZ=null;inSize*=2;}while(numMerges>1);return list;}
function zOrder(x,y,minX,minY,size){x=32767*(x-minX)/size;y=32767*(y-minY)/size;x=(x|(x<<8))&0x00FF00FF;x=(x|(x<<4))&0x0F0F0F0F;x=(x|(x<<2))&0x33333333;x=(x|(x<<1))&0x55555555;y=(y|(y<<8))&0x00FF00FF;y=(y|(y<<4))&0x0F0F0F0F;y=(y|(y<<2))&0x33333333;y=(y|(y<<1))&0x55555555;return x|(y<<1);}
function getLeftmost(start){var p=start,leftmost=start;do{if(p.x<leftmost.x)leftmost=p;p=p.next;}while(p!==start);return leftmost;}
function pointInTriangle(ax,ay,bx,by,cx,cy,px,py){return(cx-px)*(ay-py)-(ax-px)*(cy-py)>=0&&(ax-px)*(by-py)-(bx-px)*(ay-py)>=0&&(bx-px)*(cy-py)-(cx-px)*(by-py)>=0;}
function isValidDiagonal(a,b){return equals(a,b)||a.next.i!==b.i&&a.prev.i!==b.i&&!intersectsPolygon(a,b)&&locallyInside(a,b)&&locallyInside(b,a)&&middleInside(a,b);}
function area(p,q,r){return(q.y-p.y)*(r.x-q.x)-(q.x-p.x)*(r.y-q.y);}
function equals(p1,p2){return p1.x===p2.x&&p1.y===p2.y;}
function intersects(p1,q1,p2,q2){return area(p1,q1,p2)>0!==area(p1,q1,q2)>0&&area(p2,q2,p1)>0!==area(p2,q2,q1)>0;}
function intersectsPolygon(a,b){var p=a;do{if(p.i!==a.i&&p.next.i!==a.i&&p.i!==b.i&&p.next.i!==b.i&&intersects(p,p.next,a,b))return true;p=p.next;}while(p!==a);return false;}
function locallyInside(a,b){return area(a.prev,a,a.next)<0?area(a,b,a.next)>=0&&area(a,a.prev,b)>=0:area(a,b,a.prev)<0||area(a,a.next,b)<0;}
function middleInside(a,b){var p=a,inside=false,px=(a.x+b.x)/2,py=(a.y+b.y)/2;do{if(((p.y>py)!==(p.next.y>py))&&(px<(p.next.x-p.x)*(py-p.y)/(p.next.y-p.y)+p.x))
inside=!inside;p=p.next;}while(p!==a);return inside;}
function splitPolygon(a,b){var a2=new Node(a.i,a.x,a.y),b2=new Node(b.i,b.x,b.y),an=a.next,bp=b.prev;a.next=b;b.prev=a;a2.next=an;an.prev=a2;b2.next=a2;a2.prev=b2;bp.next=b2;b2.prev=bp;return b2;}
function insertNode(i,x,y,last){var p=new Node(i,x,y);if(!last){p.prev=p;p.next=p;}else{p.next=last.next;p.prev=last;last.next.prev=p;last.next=p;}
return p;}
function removeNode(p){p.next.prev=p.prev;p.prev.next=p.next;if(p.prevZ)p.prevZ.nextZ=p.nextZ;if(p.nextZ)p.nextZ.prevZ=p.prevZ;}
function Node(i,x,y){this.i=i;this.x=x;this.y=y;this.prev=null;this.next=null;this.z=null;this.prevZ=null;this.nextZ=null;this.steiner=false;}},{}],10:[function(require,module,exports){'use strict';var prefix=typeof Object.create!=='function'?'~':false;function EE(fn,context,once){this.fn=fn;this.context=context;this.once=once||false;}
function EventEmitter(){}
EventEmitter.prototype._events=undefined;EventEmitter.prototype.listeners=function listeners(event,exists){var evt=prefix?prefix+event:event,available=this._events&&this._events[evt];if(exists)return!!available;if(!available)return[];if(available.fn)return[available.fn];for(var i=0,l=available.length,ee=[];i<l;i++){ee[i]=available[i].fn;}
return ee;};EventEmitter.prototype.emit=function emit(event,a1,a2,a3,a4,a5){var evt=prefix?prefix+event:event;if(!this._events||!this._events[evt])return false;var listeners=this._events[evt],len=arguments.length,args,i;if('function'===typeof listeners.fn){if(listeners.once)this.removeListener(event,listeners.fn,undefined,true);switch(len){case 1:return listeners.fn.call(listeners.context),true;case 2:return listeners.fn.call(listeners.context,a1),true;case 3:return listeners.fn.call(listeners.context,a1,a2),true;case 4:return listeners.fn.call(listeners.context,a1,a2,a3),true;case 5:return listeners.fn.call(listeners.context,a1,a2,a3,a4),true;case 6:return listeners.fn.call(listeners.context,a1,a2,a3,a4,a5),true;}
for(i=1,args=[];i<len;i++){args[i-1]=arguments[i];}
listeners.fn.apply(listeners.context,args);}else{var length=listeners.length,j;for(i=0;i<length;i++){if(listeners[i].once)this.removeListener(event,listeners[i].fn,undefined,true);switch(len){case 1:listeners[i].fn.call(listeners[i].context);break;case 2:listeners[i].fn.call(listeners[i].context,a1);break;case 3:listeners[i].fn.call(listeners[i].context,a1,a2);break;default:if(!args)for(j=1,args=[];j<len;j++){args[j-1]=arguments[j];}
listeners[i].fn.apply(listeners[i].context,args);}}}
return true;};EventEmitter.prototype.on=function on(event,fn,context){var listener=new EE(fn,context||this),evt=prefix?prefix+event:event;if(!this._events)this._events=prefix?{}:Object.create(null);if(!this._events[evt])this._events[evt]=listener;else{if(!this._events[evt].fn)this._events[evt].push(listener);else this._events[evt]=[this._events[evt],listener];}
return this;};EventEmitter.prototype.once=function once(event,fn,context){var listener=new EE(fn,context||this,true),evt=prefix?prefix+event:event;if(!this._events)this._events=prefix?{}:Object.create(null);if(!this._events[evt])this._events[evt]=listener;else{if(!this._events[evt].fn)this._events[evt].push(listener);else this._events[evt]=[this._events[evt],listener];}
return this;};EventEmitter.prototype.removeListener=function removeListener(event,fn,context,once){var evt=prefix?prefix+event:event;if(!this._events||!this._events[evt])return this;var listeners=this._events[evt],events=[];if(fn){if(listeners.fn){if(listeners.fn!==fn||(once&&!listeners.once)||(context&&listeners.context!==context)){events.push(listeners);}}else{for(var i=0,length=listeners.length;i<length;i++){if(listeners[i].fn!==fn||(once&&!listeners[i].once)||(context&&listeners[i].context!==context)){events.push(listeners[i]);}}}}
if(events.length){this._events[evt]=events.length===1?events[0]:events;}else{delete this._events[evt];}
return this;};EventEmitter.prototype.removeAllListeners=function removeAllListeners(event){if(!this._events)return this;if(event)delete this._events[prefix?prefix+event:event];else this._events=prefix?{}:Object.create(null);return this;};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.addListener=EventEmitter.prototype.on;EventEmitter.prototype.setMaxListeners=function setMaxListeners(){return this;};EventEmitter.prefixed=prefix;if('undefined'!==typeof module){module.exports=EventEmitter;}},{}],11:[function(require,module,exports){'use strict';var hasOwnProperty=Object.prototype.hasOwnProperty;var propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject(val){if(val===null||val===undefined){throw new TypeError('Object.assign cannot be called with null or undefined');}
return Object(val);}
module.exports=Object.assign||function(target,source){var from;var to=toObject(target);var symbols;for(var s=1;s<arguments.length;s++){from=Object(arguments[s]);for(var key in from){if(hasOwnProperty.call(from,key)){to[key]=from[key];}}
if(Object.getOwnPropertySymbols){symbols=Object.getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++){if(propIsEnumerable.call(from,symbols[i])){to[symbols[i]]=from[symbols[i]];}}}}
return to;};},{}],12:[function(require,module,exports){(function(process){(function(){var async={};var root,previous_async;root=this;if(root!=null){previous_async=root.async;}
async.noConflict=function(){root.async=previous_async;return async;};function only_once(fn){var called=false;return function(){if(called)throw new Error("Callback was already called.");called=true;fn.apply(root,arguments);}}
var _toString=Object.prototype.toString;var _isArray=Array.isArray||function(obj){return _toString.call(obj)==='[object Array]';};var _each=function(arr,iterator){for(var i=0;i<arr.length;i+=1){iterator(arr[i],i,arr);}};var _map=function(arr,iterator){if(arr.map){return arr.map(iterator);}
var results=[];_each(arr,function(x,i,a){results.push(iterator(x,i,a));});return results;};var _reduce=function(arr,iterator,memo){if(arr.reduce){return arr.reduce(iterator,memo);}
_each(arr,function(x,i,a){memo=iterator(memo,x,i,a);});return memo;};var _keys=function(obj){if(Object.keys){return Object.keys(obj);}
var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k);}}
return keys;};if(typeof process==='undefined'||!(process.nextTick)){if(typeof setImmediate==='function'){async.nextTick=function(fn){setImmediate(fn);};async.setImmediate=async.nextTick;}
else{async.nextTick=function(fn){setTimeout(fn,0);};async.setImmediate=async.nextTick;}}
else{async.nextTick=process.nextTick;if(typeof setImmediate!=='undefined'){async.setImmediate=function(fn){setImmediate(fn);};}
else{async.setImmediate=async.nextTick;}}
async.each=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback();}
var completed=0;_each(arr,function(x){iterator(x,only_once(done));});function done(err){if(err){callback(err);callback=function(){};}
else{completed+=1;if(completed>=arr.length){callback();}}}};async.forEach=async.each;async.eachSeries=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback();}
var completed=0;var iterate=function(){iterator(arr[completed],function(err){if(err){callback(err);callback=function(){};}
else{completed+=1;if(completed>=arr.length){callback();}
else{iterate();}}});};iterate();};async.forEachSeries=async.eachSeries;async.eachLimit=function(arr,limit,iterator,callback){var fn=_eachLimit(limit);fn.apply(null,[arr,iterator,callback]);};async.forEachLimit=async.eachLimit;var _eachLimit=function(limit){return function(arr,iterator,callback){callback=callback||function(){};if(!arr.length||limit<=0){return callback();}
var completed=0;var started=0;var running=0;(function replenish(){if(completed>=arr.length){return callback();}
while(running<limit&&started<arr.length){started+=1;running+=1;iterator(arr[started-1],function(err){if(err){callback(err);callback=function(){};}
else{completed+=1;running-=1;if(completed>=arr.length){callback();}
else{replenish();}}});}})();};};var doParallel=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.each].concat(args));};};var doParallelLimit=function(limit,fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[_eachLimit(limit)].concat(args));};};var doSeries=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.eachSeries].concat(args));};};var _asyncMap=function(eachfn,arr,iterator,callback){arr=_map(arr,function(x,i){return{index:i,value:x};});if(!callback){eachfn(arr,function(x,callback){iterator(x.value,function(err){callback(err);});});}else{var results=[];eachfn(arr,function(x,callback){iterator(x.value,function(err,v){results[x.index]=v;callback(err);});},function(err){callback(err,results);});}};async.map=doParallel(_asyncMap);async.mapSeries=doSeries(_asyncMap);async.mapLimit=function(arr,limit,iterator,callback){return _mapLimit(limit)(arr,iterator,callback);};var _mapLimit=function(limit){return doParallelLimit(limit,_asyncMap);};async.reduce=function(arr,memo,iterator,callback){async.eachSeries(arr,function(x,callback){iterator(memo,x,function(err,v){memo=v;callback(err);});},function(err){callback(err,memo);});};async.inject=async.reduce;async.foldl=async.reduce;async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,function(x){return x;}).reverse();async.reduce(reversed,memo,iterator,callback);};async.foldr=async.reduceRight;var _filter=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x};});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(v){results.push(x);}
callback();});},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index;}),function(x){return x.value;}));});};async.filter=doParallel(_filter);async.filterSeries=doSeries(_filter);async.select=async.filter;async.selectSeries=async.filterSeries;var _reject=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x};});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(!v){results.push(x);}
callback();});},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index;}),function(x){return x.value;}));});};async.reject=doParallel(_reject);async.rejectSeries=doSeries(_reject);var _detect=function(eachfn,arr,iterator,main_callback){eachfn(arr,function(x,callback){iterator(x,function(result){if(result){main_callback(x);main_callback=function(){};}
else{callback();}});},function(err){main_callback();});};async.detect=doParallel(_detect);async.detectSeries=doSeries(_detect);async.some=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(v){main_callback(true);main_callback=function(){};}
callback();});},function(err){main_callback(false);});};async.any=async.some;async.every=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(!v){main_callback(false);main_callback=function(){};}
callback();});},function(err){main_callback(true);});};async.all=async.every;async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){if(err){callback(err);}
else{callback(null,{value:x,criteria:criteria});}});},function(err,results){if(err){return callback(err);}
else{var fn=function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;};callback(null,_map(results.sort(fn),function(x){return x.value;}));}});};async.auto=function(tasks,callback){callback=callback||function(){};var keys=_keys(tasks);var remainingTasks=keys.length
if(!remainingTasks){return callback();}
var results={};var listeners=[];var addListener=function(fn){listeners.unshift(fn);};var removeListener=function(fn){for(var i=0;i<listeners.length;i+=1){if(listeners[i]===fn){listeners.splice(i,1);return;}}};var taskComplete=function(){remainingTasks--
_each(listeners.slice(0),function(fn){fn();});};addListener(function(){if(!remainingTasks){var theCallback=callback;callback=function(){};theCallback(null,results);}});_each(keys,function(k){var task=_isArray(tasks[k])?tasks[k]:[tasks[k]];var taskCallback=function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0];}
if(err){var safeResults={};_each(_keys(results),function(rkey){safeResults[rkey]=results[rkey];});safeResults[k]=args;callback(err,safeResults);callback=function(){};}
else{results[k]=args;async.setImmediate(taskComplete);}};var requires=task.slice(0,Math.abs(task.length-1))||[];var ready=function(){return _reduce(requires,function(a,x){return(a&&results.hasOwnProperty(x));},true)&&!results.hasOwnProperty(k);};if(ready()){task[task.length-1](taskCallback,results);}
else{var listener=function(){if(ready()){removeListener(listener);task[task.length-1](taskCallback,results);}};addListener(listener);}});};async.retry=function(times,task,callback){var DEFAULT_TIMES=5;var attempts=[];if(typeof times==='function'){callback=task;task=times;times=DEFAULT_TIMES;}
times=parseInt(times,10)||DEFAULT_TIMES;var wrappedTask=function(wrappedCallback,wrappedResults){var retryAttempt=function(task,finalAttempt){return function(seriesCallback){task(function(err,result){seriesCallback(!err||finalAttempt,{err:err,result:result});},wrappedResults);};};while(times){attempts.push(retryAttempt(task,!(times-=1)));}
async.series(attempts,function(done,data){data=data[data.length-1];(wrappedCallback||callback)(data.err,data.result);});}
return callback?wrappedTask():wrappedTask};async.waterfall=function(tasks,callback){callback=callback||function(){};if(!_isArray(tasks)){var err=new Error('First argument to waterfall must be an array of functions');return callback(err);}
if(!tasks.length){return callback();}
var wrapIterator=function(iterator){return function(err){if(err){callback.apply(null,arguments);callback=function(){};}
else{var args=Array.prototype.slice.call(arguments,1);var next=iterator.next();if(next){args.push(wrapIterator(next));}
else{args.push(callback);}
async.setImmediate(function(){iterator.apply(null,args);});}};};wrapIterator(async.iterator(tasks))();};var _parallel=function(eachfn,tasks,callback){callback=callback||function(){};if(_isArray(tasks)){eachfn.map(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0];}
callback.call(null,err,args);});}},callback);}
else{var results={};eachfn.each(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0];}
results[k]=args;callback(err);});},function(err){callback(err,results);});}};async.parallel=function(tasks,callback){_parallel({map:async.map,each:async.each},tasks,callback);};async.parallelLimit=function(tasks,limit,callback){_parallel({map:_mapLimit(limit),each:_eachLimit(limit)},tasks,callback);};async.series=function(tasks,callback){callback=callback||function(){};if(_isArray(tasks)){async.mapSeries(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0];}
callback.call(null,err,args);});}},callback);}
else{var results={};async.eachSeries(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0];}
results[k]=args;callback(err);});},function(err){callback(err,results);});}};async.iterator=function(tasks){var makeCallback=function(index){var fn=function(){if(tasks.length){tasks[index].apply(null,arguments);}
return fn.next();};fn.next=function(){return(index<tasks.length-1)?makeCallback(index+1):null;};return fn;};return makeCallback(0);};async.apply=function(fn){var args=Array.prototype.slice.call(arguments,1);return function(){return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)));};};var _concat=function(eachfn,arr,fn,callback){var r=[];eachfn(arr,function(x,cb){fn(x,function(err,y){r=r.concat(y||[]);cb(err);});},function(err){callback(err,r);});};async.concat=doParallel(_concat);async.concatSeries=doSeries(_concat);async.whilst=function(test,iterator,callback){if(test()){iterator(function(err){if(err){return callback(err);}
async.whilst(test,iterator,callback);});}
else{callback();}};async.doWhilst=function(iterator,test,callback){iterator(function(err){if(err){return callback(err);}
var args=Array.prototype.slice.call(arguments,1);if(test.apply(null,args)){async.doWhilst(iterator,test,callback);}
else{callback();}});};async.until=function(test,iterator,callback){if(!test()){iterator(function(err){if(err){return callback(err);}
async.until(test,iterator,callback);});}
else{callback();}};async.doUntil=function(iterator,test,callback){iterator(function(err){if(err){return callback(err);}
var args=Array.prototype.slice.call(arguments,1);if(!test.apply(null,args)){async.doUntil(iterator,test,callback);}
else{callback();}});};async.queue=function(worker,concurrency){if(concurrency===undefined){concurrency=1;}
function _insert(q,data,pos,callback){if(!q.started){q.started=true;}
if(!_isArray(data)){data=[data];}
if(data.length==0){return async.setImmediate(function(){if(q.drain){q.drain();}});}
_each(data,function(task){var item={data:task,callback:typeof callback==='function'?callback:null};if(pos){q.tasks.unshift(item);}else{q.tasks.push(item);}
if(q.saturated&&q.tasks.length===q.concurrency){q.saturated();}
async.setImmediate(q.process);});}
var workers=0;var q={tasks:[],concurrency:concurrency,saturated:null,empty:null,drain:null,started:false,paused:false,push:function(data,callback){_insert(q,data,false,callback);},kill:function(){q.drain=null;q.tasks=[];},unshift:function(data,callback){_insert(q,data,true,callback);},process:function(){if(!q.paused&&workers<q.concurrency&&q.tasks.length){var task=q.tasks.shift();if(q.empty&&q.tasks.length===0){q.empty();}
workers+=1;var next=function(){workers-=1;if(task.callback){task.callback.apply(task,arguments);}
if(q.drain&&q.tasks.length+workers===0){q.drain();}
q.process();};var cb=only_once(next);worker(task.data,cb);}},length:function(){return q.tasks.length;},running:function(){return workers;},idle:function(){return q.tasks.length+workers===0;},pause:function(){if(q.paused===true){return;}
q.paused=true;},resume:function(){if(q.paused===false){return;}
q.paused=false;for(var w=1;w<=q.concurrency;w++){async.setImmediate(q.process);}}};return q;};async.priorityQueue=function(worker,concurrency){function _compareTasks(a,b){return a.priority-b.priority;};function _binarySearch(sequence,item,compare){var beg=-1,end=sequence.length-1;while(beg<end){var mid=beg+((end-beg+1)>>>1);if(compare(item,sequence[mid])>=0){beg=mid;}else{end=mid-1;}}
return beg;}
function _insert(q,data,priority,callback){if(!q.started){q.started=true;}
if(!_isArray(data)){data=[data];}
if(data.length==0){return async.setImmediate(function(){if(q.drain){q.drain();}});}
_each(data,function(task){var item={data:task,priority:priority,callback:typeof callback==='function'?callback:null};q.tasks.splice(_binarySearch(q.tasks,item,_compareTasks)+1,0,item);if(q.saturated&&q.tasks.length===q.concurrency){q.saturated();}
async.setImmediate(q.process);});}
var q=async.queue(worker,concurrency);q.push=function(data,priority,callback){_insert(q,data,priority,callback);};delete q.unshift;return q;};async.cargo=function(worker,payload){var working=false,tasks=[];var cargo={tasks:tasks,payload:payload,saturated:null,empty:null,drain:null,drained:true,push:function(data,callback){if(!_isArray(data)){data=[data];}
_each(data,function(task){tasks.push({data:task,callback:typeof callback==='function'?callback:null});cargo.drained=false;if(cargo.saturated&&tasks.length===payload){cargo.saturated();}});async.setImmediate(cargo.process);},process:function process(){if(working)return;if(tasks.length===0){if(cargo.drain&&!cargo.drained)cargo.drain();cargo.drained=true;return;}
var ts=typeof payload==='number'?tasks.splice(0,payload):tasks.splice(0,tasks.length);var ds=_map(ts,function(task){return task.data;});if(cargo.empty)cargo.empty();working=true;worker(ds,function(){working=false;var args=arguments;_each(ts,function(data){if(data.callback){data.callback.apply(null,args);}});process();});},length:function(){return tasks.length;},running:function(){return working;}};return cargo;};var _console_fn=function(name){return function(fn){var args=Array.prototype.slice.call(arguments,1);fn.apply(null,args.concat([function(err){var args=Array.prototype.slice.call(arguments,1);if(typeof console!=='undefined'){if(err){if(console.error){console.error(err);}}
else if(console[name]){_each(args,function(x){console[name](x);});}}}]));};};async.log=_console_fn('log');async.dir=_console_fn('dir');async.memoize=function(fn,hasher){var memo={};var queues={};hasher=hasher||function(x){return x;};var memoized=function(){var args=Array.prototype.slice.call(arguments);var callback=args.pop();var key=hasher.apply(null,args);if(key in memo){async.nextTick(function(){callback.apply(null,memo[key]);});}
else if(key in queues){queues[key].push(callback);}
else{queues[key]=[callback];fn.apply(null,args.concat([function(){memo[key]=arguments;var q=queues[key];delete queues[key];for(var i=0,l=q.length;i<l;i++){q[i].apply(null,arguments);}}]));}};memoized.memo=memo;memoized.unmemoized=fn;return memoized;};async.unmemoize=function(fn){return function(){return(fn.unmemoized||fn).apply(null,arguments);};};async.times=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i);}
return async.map(counter,iterator,callback);};async.timesSeries=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i);}
return async.mapSeries(counter,iterator,callback);};async.seq=function(){var fns=arguments;return function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();async.reduce(fns,args,function(newargs,fn,cb){fn.apply(that,newargs.concat([function(){var err=arguments[0];var nextargs=Array.prototype.slice.call(arguments,1);cb(err,nextargs);}]))},function(err,results){callback.apply(that,[err].concat(results));});};};async.compose=function(){return async.seq.apply(null,Array.prototype.reverse.call(arguments));};var _applyEach=function(eachfn,fns){var go=function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();return eachfn(fns,function(fn,cb){fn.apply(that,args.concat([cb]));},callback);};if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);return go.apply(this,args);}
else{return go;}};async.applyEach=doParallel(_applyEach);async.applyEachSeries=doSeries(_applyEach);async.forever=function(fn,callback){function next(err){if(err){if(callback){return callback(err);}
throw err;}
fn(next);}
next();};if(typeof module!=='undefined'&&module.exports){module.exports=async;}
else if(typeof define!=='undefined'&&define.amd){define([],function(){return async;});}
else{root.async=async;}}());}).call(this,require('_process'))},{"_process":3}],13:[function(require,module,exports){var async=require('async'),urlParser=require('url'),Resource=require('./Resource'),EventEmitter=require('eventemitter3');function Loader(baseUrl,concurrency){EventEmitter.call(this);concurrency=concurrency||10;this.baseUrl=baseUrl||'';this.progress=0;this.loading=false;this._progressChunk=0;this._beforeMiddleware=[];this._afterMiddleware=[];this._boundLoadResource=this._loadResource.bind(this);this._boundOnLoad=this._onLoad.bind(this);this._buffer=[];this._numToLoad=0;this._queue=async.queue(this._boundLoadResource,concurrency);this.resources={};}
Loader.prototype=Object.create(EventEmitter.prototype);Loader.prototype.constructor=Loader;module.exports=Loader;Loader.prototype.add=Loader.prototype.enqueue=function(name,url,options,cb){if(Array.isArray(name)){for(var i=0;i<name.length;++i){this.add(name[i]);}
return this;}
if(typeof name==='object'){cb=url||name.callback||name.onComplete;options=name;url=name.url;name=name.name||name.key||name.url;}
if(typeof url!=='string'){cb=options;options=url;url=name;}
if(typeof url!=='string'){throw new Error('No url passed to add resource to loader.');}
if(typeof options==='function'){cb=options;options=null;}
if(this.resources[name]){throw new Error('Resource with name "'+name+'" already exists.');}
url=this._handleBaseUrl(url);this.resources[name]=new Resource(name,url,options);if(typeof cb==='function'){this.resources[name].once('afterMiddleware',cb);}
this._numToLoad++;if(this._queue.started){this._queue.push(this.resources[name]);this._progressChunk=(100-this.progress)/(this._queue.length()+this._queue.running());}
else{this._buffer.push(this.resources[name]);this._progressChunk=100/this._buffer.length;}
return this;};Loader.prototype._handleBaseUrl=function(url){var parsedUrl=urlParser.parse(url);if(parsedUrl.protocol||parsedUrl.pathname.indexOf('//')===0){return url;}
if(this.baseUrl.length&&this.baseUrl.lastIndexOf('/')!==this.baseUrl.length-1&&url.charAt(0)!=='/'){return this.baseUrl+'/'+url;}
else{return this.baseUrl+url;}};Loader.prototype.before=Loader.prototype.pre=function(fn){this._beforeMiddleware.push(fn);return this;};Loader.prototype.after=Loader.prototype.use=function(fn){this._afterMiddleware.push(fn);return this;};Loader.prototype.reset=function(){this.progress=0;this.loading=false;this._progressChunk=0;this._buffer.length=0;this._numToLoad=0;this._queue.kill();this._queue.started=false;this.resources={};};Loader.prototype.load=function(cb){if(typeof cb==='function'){this.once('complete',cb);}
if(this._queue.started){return this;}
this.emit('start',this);for(var i=0;i<this._buffer.length;++i){this._queue.push(this._buffer[i]);}
this._buffer.length=0;return this;};Loader.prototype._loadResource=function(resource,dequeue){var self=this;resource._dequeue=dequeue;this._runMiddleware(resource,this._beforeMiddleware,function(){resource.load(self._boundOnLoad);});};Loader.prototype._onComplete=function(){this.emit('complete',this,this.resources);};Loader.prototype._onLoad=function(resource){this.progress+=this._progressChunk;this.emit('progress',this,resource);this._runMiddleware(resource,this._afterMiddleware,function(){resource.emit('afterMiddleware',resource);this._numToLoad--;if(this._numToLoad===0){this.progress=100;this._onComplete();}
if(resource.error){this.emit('error',resource.error,this,resource);}
else{this.emit('load',this,resource);}});resource._dequeue();};Loader.prototype._runMiddleware=function(resource,fns,cb){var self=this;async.eachSeries(fns,function(fn,next){fn.call(self,resource,next);},cb.bind(this,resource));};Loader.LOAD_TYPE=Resource.LOAD_TYPE;Loader.XHR_READY_STATE=Resource.XHR_READY_STATE;Loader.XHR_RESPONSE_TYPE=Resource.XHR_RESPONSE_TYPE;},{"./Resource":14,"async":12,"eventemitter3":10,"url":8}],14:[function(require,module,exports){var EventEmitter=require('eventemitter3'),_url=require('url'),useXdr=!!(window.XDomainRequest&&!('withCredentials'in(new XMLHttpRequest()))),tempAnchor=null;function Resource(name,url,options){EventEmitter.call(this);options=options||{};if(typeof name!=='string'||typeof url!=='string'){throw new Error('Both name and url are required for constructing a resource.');}
this.name=name;this.url=url;this.isDataUrl=this.url.indexOf('data:')===0;this.data=null;this.crossOrigin=options.crossOrigin===true?'anonymous':options.crossOrigin;this.loadType=options.loadType||this._determineLoadType();this.xhrType=options.xhrType;this.metadata=options.metadata||{};this.error=null;this.xhr=null;this.isJson=false;this.isXml=false;this.isImage=false;this.isAudio=false;this.isVideo=false;this._dequeue=null;this._boundComplete=this.complete.bind(this);this._boundOnError=this._onError.bind(this);this._boundOnProgress=this._onProgress.bind(this);this._boundXhrOnError=this._xhrOnError.bind(this);this._boundXhrOnAbort=this._xhrOnAbort.bind(this);this._boundXhrOnLoad=this._xhrOnLoad.bind(this);this._boundXdrOnTimeout=this._xdrOnTimeout.bind(this);}
Resource.prototype=Object.create(EventEmitter.prototype);Resource.prototype.constructor=Resource;module.exports=Resource;Resource.prototype.complete=function(){if(this.data&&this.data.removeEventListener){this.data.removeEventListener('error',this._boundOnError);this.data.removeEventListener('load',this._boundComplete);this.data.removeEventListener('progress',this._boundOnProgress);this.data.removeEventListener('canplaythrough',this._boundComplete);}
if(this.xhr){if(this.xhr.removeEventListener){this.xhr.removeEventListener('error',this._boundXhrOnError);this.xhr.removeEventListener('abort',this._boundXhrOnAbort);this.xhr.removeEventListener('progress',this._boundOnProgress);this.xhr.removeEventListener('load',this._boundXhrOnLoad);}
else{this.xhr.onerror=null;this.xhr.ontimeout=null;this.xhr.onprogress=null;this.xhr.onload=null;}}
this.emit('complete',this);};Resource.prototype.load=function(cb){this.emit('start',this);if(cb){this.once('complete',cb);}
if(this.crossOrigin===false||typeof this.crossOrigin!=='string'){this.crossOrigin=this._determineCrossOrigin(this.url);}
switch(this.loadType){case Resource.LOAD_TYPE.IMAGE:this._loadImage();break;case Resource.LOAD_TYPE.AUDIO:this._loadElement('audio');break;case Resource.LOAD_TYPE.VIDEO:this._loadElement('video');break;case Resource.LOAD_TYPE.XHR:default:if(useXdr&&this.crossOrigin){this._loadXdr();}
else{this._loadXhr();}
break;}};Resource.prototype._loadImage=function(){this.data=new Image();if(this.crossOrigin){this.data.crossOrigin=this.crossOrigin;}
this.data.src=this.url;this.isImage=true;this.data.addEventListener('error',this._boundOnError,false);this.data.addEventListener('load',this._boundComplete,false);this.data.addEventListener('progress',this._boundOnProgress,false);};Resource.prototype._loadElement=function(type){if(type==='audio'&&typeof Audio!=='undefined'){this.data=new Audio();}
else{this.data=document.createElement(type);}
if(this.data===null){this.error=new Error('Unsupported element '+type);this.complete();return;}
if(navigator.isCocoonJS){this.data.src=Array.isArray(this.url)?this.url[0]:this.url;}
else{if(Array.isArray(this.url)){for(var i=0;i<this.url.length;++i){this.data.appendChild(this._createSource(type,this.url[i]));}}
else{this.data.appendChild(this._createSource(type,this.url));}}
this['is'+type[0].toUpperCase()+type.substring(1)]=true;this.data.addEventListener('error',this._boundOnError,false);this.data.addEventListener('load',this._boundComplete,false);this.data.addEventListener('progress',this._boundOnProgress,false);this.data.addEventListener('canplaythrough',this._boundComplete,false);this.data.load();};Resource.prototype._loadXhr=function(){if(typeof this.xhrType!=='string'){this.xhrType=this._determineXhrType();}
var xhr=this.xhr=new XMLHttpRequest();xhr.open('GET',this.url,true);if(this.xhrType===Resource.XHR_RESPONSE_TYPE.JSON||this.xhrType===Resource.XHR_RESPONSE_TYPE.DOCUMENT){xhr.responseType=Resource.XHR_RESPONSE_TYPE.TEXT;}
else{xhr.responseType=this.xhrType;}
xhr.addEventListener('error',this._boundXhrOnError,false);xhr.addEventListener('abort',this._boundXhrOnAbort,false);xhr.addEventListener('progress',this._boundOnProgress,false);xhr.addEventListener('load',this._boundXhrOnLoad,false);xhr.send();};Resource.prototype._loadXdr=function(){if(typeof this.xhrType!=='string'){this.xhrType=this._determineXhrType();}
var xdr=this.xhr=new XDomainRequest();xdr.timeout=5000;xdr.onerror=this._boundXhrOnError;xdr.ontimeout=this._boundXdrOnTimeout;xdr.onprogress=this._boundOnProgress;xdr.onload=this._boundXhrOnLoad;xdr.open('GET',this.url,true);setTimeout(function(){xdr.send();},0);};Resource.prototype._createSource=function(type,url,mime){if(!mime){mime=type+'/'+url.substr(url.lastIndexOf('.')+1);}
var source=document.createElement('source');source.src=url;source.type=mime;return source;};Resource.prototype._onError=function(event){this.error=new Error('Failed to load element using '+event.target.nodeName);this.complete();};Resource.prototype._onProgress=function(event){if(event&&event.lengthComputable){this.emit('progress',this,event.loaded/event.total);}};Resource.prototype._xhrOnError=function(){this.error=new Error(reqType(this.xhr)+' Request failed. '+'Status: '+this.xhr.status+', text: "'+this.xhr.statusText+'"');this.complete();};Resource.prototype._xhrOnAbort=function(){this.error=new Error(reqType(this.xhr)+' Request was aborted by the user.');this.complete();};Resource.prototype._xdrOnTimeout=function(){this.error=new Error(reqType(this.xhr)+' Request timed out.');this.complete();};Resource.prototype._xhrOnLoad=function(){var xhr=this.xhr,status=xhr.status!==undefined?xhr.status:200;if(status===200||status===204||(status===0&&xhr.responseText.length>0)){if(this.xhrType===Resource.XHR_RESPONSE_TYPE.TEXT){this.data=xhr.responseText;}
else if(this.xhrType===Resource.XHR_RESPONSE_TYPE.JSON){try{this.data=JSON.parse(xhr.responseText);this.isJson=true;}catch(e){this.error=new Error('Error trying to parse loaded json:',e);}}
else if(this.xhrType===Resource.XHR_RESPONSE_TYPE.DOCUMENT){try{if(window.DOMParser){var domparser=new DOMParser();this.data=domparser.parseFromString(xhr.responseText,'text/xml');}
else{var div=document.createElement('div');div.innerHTML=xhr.responseText;this.data=div;}
this.isXml=true;}catch(e){this.error=new Error('Error trying to parse loaded xml:',e);}}
else{this.data=xhr.response||xhr.responseText;}}
else{this.error=new Error('['+xhr.status+']'+xhr.statusText+':'+xhr.responseURL);}
this.complete();};function reqType(xhr){return xhr.toString().replace('object ','');}
Resource.prototype._determineCrossOrigin=function(url,loc){if(url.indexOf('data:')===0){return'';}
loc=loc||window.location;if(!tempAnchor){tempAnchor=document.createElement('a');}
tempAnchor.href=url;url=_url.parse(tempAnchor.href);var samePort=(!url.port&&loc.port==='')||(url.port===loc.port);if(url.hostname!==loc.hostname||!samePort||url.protocol!==loc.protocol){return'anonymous';}
return'';};Resource.prototype._determineXhrType=function(){return Resource._xhrTypeMap[this._getExtension()]||Resource.XHR_RESPONSE_TYPE.TEXT;};Resource.prototype._determineLoadType=function(){return Resource._loadTypeMap[this._getExtension()]||Resource.LOAD_TYPE.XHR;};Resource.prototype._getExtension=function(){var url=this.url,ext;if(this.isDataUrl){var slashIndex=url.indexOf('/');ext=url.substring(slashIndex+1,url.indexOf(';',slashIndex));}
else{var queryStart=url.indexOf('?');if(queryStart!==-1){url=url.substring(0,queryStart);}
ext=url.substring(url.lastIndexOf('.')+1);}
return ext;};Resource.prototype._getMimeFromXhrType=function(type){switch(type){case Resource.XHR_RESPONSE_TYPE.BUFFER:return'application/octet-binary';case Resource.XHR_RESPONSE_TYPE.BLOB:return'application/blob';case Resource.XHR_RESPONSE_TYPE.DOCUMENT:return'application/xml';case Resource.XHR_RESPONSE_TYPE.JSON:return'application/json';case Resource.XHR_RESPONSE_TYPE.DEFAULT:case Resource.XHR_RESPONSE_TYPE.TEXT:default:return'text/plain';}};Resource.LOAD_TYPE={XHR:1,IMAGE:2,AUDIO:3,VIDEO:4};Resource.XHR_READY_STATE={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4};Resource.XHR_RESPONSE_TYPE={DEFAULT:'text',BUFFER:'arraybuffer',BLOB:'blob',DOCUMENT:'document',JSON:'json',TEXT:'text'};Resource._loadTypeMap={'gif':Resource.LOAD_TYPE.IMAGE,'png':Resource.LOAD_TYPE.IMAGE,'bmp':Resource.LOAD_TYPE.IMAGE,'jpg':Resource.LOAD_TYPE.IMAGE,'jpeg':Resource.LOAD_TYPE.IMAGE,'tif':Resource.LOAD_TYPE.IMAGE,'tiff':Resource.LOAD_TYPE.IMAGE,'webp':Resource.LOAD_TYPE.IMAGE,'tga':Resource.LOAD_TYPE.IMAGE};Resource._xhrTypeMap={'xhtml':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'html':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'htm':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'xml':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'tmx':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'tsx':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'svg':Resource.XHR_RESPONSE_TYPE.DOCUMENT,'gif':Resource.XHR_RESPONSE_TYPE.BLOB,'png':Resource.XHR_RESPONSE_TYPE.BLOB,'bmp':Resource.XHR_RESPONSE_TYPE.BLOB,'jpg':Resource.XHR_RESPONSE_TYPE.BLOB,'jpeg':Resource.XHR_RESPONSE_TYPE.BLOB,'tif':Resource.XHR_RESPONSE_TYPE.BLOB,'tiff':Resource.XHR_RESPONSE_TYPE.BLOB,'webp':Resource.XHR_RESPONSE_TYPE.BLOB,'tga':Resource.XHR_RESPONSE_TYPE.BLOB,'json':Resource.XHR_RESPONSE_TYPE.JSON,'text':Resource.XHR_RESPONSE_TYPE.TEXT,'txt':Resource.XHR_RESPONSE_TYPE.TEXT};Resource.setExtensionLoadType=function(extname,loadType){setExtMap(Resource._loadTypeMap,extname,loadType);};Resource.setExtensionXhrType=function(extname,xhrType){setExtMap(Resource._xhrTypeMap,extname,xhrType);};function setExtMap(map,extname,val){if(extname&&extname.indexOf('.')===0){extname=extname.substring(1);}
if(!extname){return;}
map[extname]=val;}},{"eventemitter3":10,"url":8}],15:[function(require,module,exports){module.exports={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encodeBinary:function(input){var output="";var bytebuffer;var encodedCharIndexes=[];encodedCharIndexes.length=4;var inx=0;var jnx=0;var paddingBytes=0;while(inx<input.length){bytebuffer=[];bytebuffer.length=3;for(jnx=0;jnx<bytebuffer.length;jnx++){if(inx<input.length){bytebuffer[jnx]=input.charCodeAt(inx++)&0xff;}
else{bytebuffer[jnx]=0;}}
encodedCharIndexes[0]=bytebuffer[0]>>2;encodedCharIndexes[1]=((bytebuffer[0]&0x3)<<4)|(bytebuffer[1]>>4);encodedCharIndexes[2]=((bytebuffer[1]&0x0f)<<2)|(bytebuffer[2]>>6);encodedCharIndexes[3]=bytebuffer[2]&0x3f;paddingBytes=inx-(input.length-1);switch(paddingBytes){case 2:encodedCharIndexes[3]=64;encodedCharIndexes[2]=64;break;case 1:encodedCharIndexes[3]=64;break;default:break;}
for(jnx=0;jnx<encodedCharIndexes.length;jnx++){output+=this._keyStr.charAt(encodedCharIndexes[jnx]);}}
return output;}};},{}],16:[function(require,module,exports){module.exports=require('./Loader');module.exports.Resource=require('./Resource');module.exports.middleware={caching:{memory:require('./middlewares/caching/memory')},parsing:{blob:require('./middlewares/parsing/blob')}};},{"./Loader":13,"./Resource":14,"./middlewares/caching/memory":17,"./middlewares/parsing/blob":18}],17:[function(require,module,exports){var cache={};module.exports=function(){return function(resource,next){if(cache[resource.url]){resource.data=cache[resource.url];resource.complete();}
else{resource.once('complete',function(){cache[this.url]=this.data;});}
next();};};},{}],18:[function(require,module,exports){var Resource=require('../../Resource'),b64=require('../../b64');window.URL=window.URL||window.webkitURL;module.exports=function(){return function(resource,next){if(!resource.data){return next();}
if(resource.xhr&&resource.xhrType===Resource.XHR_RESPONSE_TYPE.BLOB){if(!window.Blob||typeof resource.data==='string'){var type=resource.xhr.getResponseHeader('content-type');if(type&&type.indexOf('image')===0){resource.data=new Image();resource.data.src='data:'+type+';base64,'+b64.encodeBinary(resource.xhr.responseText);resource.isImage=true;resource.data.onload=function(){resource.data.onload=null;next();};}}
else if(resource.data.type.indexOf('image')===0){var src=URL.createObjectURL(resource.data);resource.blob=resource.data;resource.data=new Image();resource.data.src=src;resource.isImage=true;resource.data.onload=function(){URL.revokeObjectURL(src);resource.data.onload=null;next();};}}
else{next();}};};},{"../../Resource":14,"../../b64":15}],19:[function(require,module,exports){var core=require('../core');Object.assign(core.DisplayObject.prototype,require('./accessibleTarget'));function AccessibilityManager(renderer)
{var div=document.createElement('div');div.style.width=100+'px';div.style.height=100+'px';div.style.position='absolute';div.style.top=0;div.style.left=0;div.style.zIndex=2;this.div=div;this.pool=[];this.renderId=0;this.debug=false;this.renderer=renderer;this.children=[];this._onKeyDown=this._onKeyDown.bind(this);this._onMouseMove=this._onMouseMove.bind(this);this.isActive=false;window.addEventListener('keydown',this._onKeyDown,false);}
AccessibilityManager.prototype.constructor=AccessibilityManager;module.exports=AccessibilityManager;AccessibilityManager.prototype.activate=function()
{if(this.isActive)
{return;}
this.isActive=true;window.document.addEventListener('mousemove',this._onMouseMove,true);window.removeEventListener('keydown',this._onKeyDown,false);this.renderer.on('postrender',this.update,this);this.renderer.view.parentNode.appendChild(this.div);};AccessibilityManager.prototype.deactivate=function()
{if(!this.isActive)
{return;}
this.isActive=false;window.document.removeEventListener('mousemove',this._onMouseMove);window.addEventListener('keydown',this._onKeyDown,false);this.renderer.off('postrender',this.update);this.div.parentNode.removeChild(this.div);};AccessibilityManager.prototype.updateAccessibleObjects=function(displayObject)
{if(!displayObject.visible)
{return;}
if(displayObject.accessible&&displayObject.interactive)
{if(!displayObject._accessibleActive)
{this.addChild(displayObject);}
displayObject.renderId=this.renderId;}
if(displayObject.interactiveChildren)
{var children=displayObject.children;for(var i=children.length-1;i>=0;i--){this.updateAccessibleObjects(children[i]);}}};AccessibilityManager.prototype.update=function()
{this.updateAccessibleObjects(this.renderer._lastObjectRendered);var rect=this.renderer.view.getBoundingClientRect();var sx=rect.width/this.renderer.width;var sy=rect.height/this.renderer.height;var div=this.div;div.style.left=rect.left+'px';div.style.top=rect.top+'px';div.style.width=this.renderer.width+'px';div.style.height=this.renderer.height+'px';for(var i=0;i<this.children.length;i++)
{var child=this.children[i];if(child.renderId!==this.renderId)
{child._accessibleActive=false;core.utils.removeItems(this.children,i,1);this.div.removeChild(child._accessibleDiv);this.pool.push(child._accessibleDiv);child._accessibleDiv=null;i--;if(this.children.length===0)
{this.deactivate();}}
else
{div=child._accessibleDiv;var hitArea=child.hitArea;var wt=child.worldTransform;if(child.hitArea)
{div.style.left=((wt.tx+(hitArea.x*wt.a))*sx)+'px';div.style.top=((wt.ty+(hitArea.y*wt.d))*sy)+'px';div.style.width=(hitArea.width*wt.a*sx)+'px';div.style.height=(hitArea.height*wt.d*sy)+'px';}
else
{hitArea=child.getBounds();this.capHitArea(hitArea);div.style.left=(hitArea.x*sx)+'px';div.style.top=(hitArea.y*sy)+'px';div.style.width=(hitArea.width*sx)+'px';div.style.height=(hitArea.height*sy)+'px';}}}
this.renderId++;};AccessibilityManager.prototype.capHitArea=function(hitArea)
{if(hitArea.x<0)
{hitArea.width+=hitArea.x;hitArea.x=0;}
if(hitArea.y<0)
{hitArea.height+=hitArea.y;hitArea.y=0;}
if(hitArea.x+hitArea.width>this.renderer.width)
{hitArea.width=this.renderer.width-hitArea.x;}
if(hitArea.y+hitArea.height>this.renderer.height)
{hitArea.height=this.renderer.height-hitArea.y;}};AccessibilityManager.prototype.addChild=function(displayObject)
{var div=this.pool.pop();if(!div)
{div=document.createElement('button');div.style.width=100+'px';div.style.height=100+'px';div.style.backgroundColor=this.debug?'rgba(255,0,0,0.5)':'transparent';div.style.position='absolute';div.style.zIndex=2;div.style.borderStyle='none';div.addEventListener('click',this._onClick.bind(this));div.addEventListener('focus',this._onFocus.bind(this));div.addEventListener('focusout',this._onFocusOut.bind(this));}
div.title=displayObject.accessibleTitle||'displayObject '+this.tabIndex;displayObject._accessibleActive=true;displayObject._accessibleDiv=div;div.displayObject=displayObject;this.children.push(displayObject);this.div.appendChild(displayObject._accessibleDiv);displayObject._accessibleDiv.tabIndex=displayObject.tabIndex;};AccessibilityManager.prototype._onClick=function(e)
{var interactionManager=this.renderer.plugins.interaction;interactionManager.dispatchEvent(e.target.displayObject,'click',interactionManager.eventData);};AccessibilityManager.prototype._onFocus=function(e)
{var interactionManager=this.renderer.plugins.interaction;interactionManager.dispatchEvent(e.target.displayObject,'mouseover',interactionManager.eventData);};AccessibilityManager.prototype._onFocusOut=function(e)
{var interactionManager=this.renderer.plugins.interaction;interactionManager.dispatchEvent(e.target.displayObject,'mouseout',interactionManager.eventData);};AccessibilityManager.prototype._onKeyDown=function(e)
{if(e.keyCode!==9)
{return;}
this.activate();};AccessibilityManager.prototype._onMouseMove=function()
{this.deactivate();};AccessibilityManager.prototype.destroy=function()
{this.div=null;for(var i=0;i<this.children.length;i++)
{this.children[i].div=null;}
window.document.removeEventListener('mousemove',this._onMouseMove);window.removeEventListener('keydown',this._onKeyDown);this.pool=null;this.children=null;this.renderer=null;};core.WebGLRenderer.registerPlugin('accessibility',AccessibilityManager);core.CanvasRenderer.registerPlugin('accessibility',AccessibilityManager);},{"../core":29,"./accessibleTarget":20}],20:[function(require,module,exports){var accessibleTarget={accessible:false,accessibleTitle:null,tabIndex:0,_accessibleActive:false,_accessibleDiv:false};module.exports=accessibleTarget;},{}],21:[function(require,module,exports){module.exports={accessibleTarget:require('./accessibleTarget'),AccessibilityManager:require('./AccessibilityManager')};},{"./AccessibilityManager":19,"./accessibleTarget":20}],22:[function(require,module,exports){var CONST={VERSION:'3.0.11',PI_2:Math.PI*2,RAD_TO_DEG:180/Math.PI,DEG_TO_RAD:Math.PI/180,TARGET_FPMS:0.06,RENDERER_TYPE:{UNKNOWN:0,WEBGL:1,CANVAS:2},BLEND_MODES:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},DRAW_MODES:{POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},SCALE_MODES:{DEFAULT:0,LINEAR:0,NEAREST:1},RETINA_PREFIX:/@(.+)x/,RESOLUTION:1,FILTER_RESOLUTION:1,DEFAULT_RENDER_OPTIONS:{view:null,resolution:1,antialias:false,forceFXAA:false,autoResize:false,transparent:false,backgroundColor:0x000000,clearBeforeRender:true,preserveDrawingBuffer:false,roundPixels:false},SHAPES:{POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4},SPRITE_BATCH_SIZE:2000};module.exports=CONST;},{}],23:[function(require,module,exports){var math=require('../math'),utils=require('../utils'),DisplayObject=require('./DisplayObject'),RenderTexture=require('../textures/RenderTexture'),_tempMatrix=new math.Matrix();function Container()
{DisplayObject.call(this);this.children=[];}
Container.prototype=Object.create(DisplayObject.prototype);Container.prototype.constructor=Container;module.exports=Container;Object.defineProperties(Container.prototype,{width:{get:function()
{return this.scale.x*this.getLocalBounds().width;},set:function(value)
{var width=this.getLocalBounds().width;if(width!==0)
{this.scale.x=value/width;}
else
{this.scale.x=1;}
this._width=value;}},height:{get:function()
{return this.scale.y*this.getLocalBounds().height;},set:function(value)
{var height=this.getLocalBounds().height;if(height!==0)
{this.scale.y=value/height;}
else
{this.scale.y=1;}
this._height=value;}}});Container.prototype.onChildrenChange=function(){};Container.prototype.addChild=function(child)
{var argumentsLength=arguments.length;if(argumentsLength>1)
{for(var i=0;i<argumentsLength;i++)
{this.addChild(arguments[i]);}}
else
{if(child.parent)
{child.parent.removeChild(child);}
child.parent=this;this.children.push(child);this.onChildrenChange(this.children.length-1);child.emit('added',this);}
return child;};Container.prototype.addChildAt=function(child,index)
{if(index>=0&&index<=this.children.length)
{if(child.parent)
{child.parent.removeChild(child);}
child.parent=this;this.children.splice(index,0,child);this.onChildrenChange(index);child.emit('added',this);return child;}
else
{throw new Error(child+'addChildAt: The index '+index+' supplied is out of bounds '+this.children.length);}};Container.prototype.swapChildren=function(child,child2)
{if(child===child2)
{return;}
var index1=this.getChildIndex(child);var index2=this.getChildIndex(child2);if(index1<0||index2<0)
{throw new Error('swapChildren: Both the supplied DisplayObjects must be children of the caller.');}
this.children[index1]=child2;this.children[index2]=child;this.onChildrenChange(index1<index2?index1:index2);};Container.prototype.getChildIndex=function(child)
{var index=this.children.indexOf(child);if(index===-1)
{throw new Error('The supplied DisplayObject must be a child of the caller');}
return index;};Container.prototype.setChildIndex=function(child,index)
{if(index<0||index>=this.children.length)
{throw new Error('The supplied index is out of bounds');}
var currentIndex=this.getChildIndex(child);utils.removeItems(this.children,currentIndex,1);this.children.splice(index,0,child);this.onChildrenChange(index);};Container.prototype.getChildAt=function(index)
{if(index<0||index>=this.children.length)
{throw new Error('getChildAt: Supplied index '+index+' does not exist in the child list, or the supplied DisplayObject is not a child of the caller');}
return this.children[index];};Container.prototype.removeChild=function(child)
{var argumentsLength=arguments.length;if(argumentsLength>1)
{for(var i=0;i<argumentsLength;i++)
{this.removeChild(arguments[i]);}}
else
{var index=this.children.indexOf(child);if(index===-1)
{return;}
child.parent=null;utils.removeItems(this.children,index,1);this.onChildrenChange(index);child.emit('removed',this);}
return child;};Container.prototype.removeChildAt=function(index)
{var child=this.getChildAt(index);child.parent=null;utils.removeItems(this.children,index,1);this.onChildrenChange(index);child.emit('removed',this);return child;};Container.prototype.removeChildren=function(beginIndex,endIndex)
{var begin=beginIndex||0;var end=typeof endIndex==='number'?endIndex:this.children.length;var range=end-begin;var removed,i;if(range>0&&range<=end)
{removed=this.children.splice(begin,range);for(i=0;i<removed.length;++i)
{removed[i].parent=null;}
this.onChildrenChange(beginIndex);for(i=0;i<removed.length;++i)
{removed[i].emit('removed',this);}
return removed;}
else if(range===0&&this.children.length===0)
{return[];}
else
{throw new RangeError('removeChildren: numeric values are outside the acceptable range.');}};Container.prototype.generateTexture=function(renderer,resolution,scaleMode)
{var bounds=this.getLocalBounds();var renderTexture=new RenderTexture(renderer,bounds.width|0,bounds.height|0,scaleMode,resolution);_tempMatrix.tx=-bounds.x;_tempMatrix.ty=-bounds.y;renderTexture.render(this,_tempMatrix);return renderTexture;};Container.prototype.updateTransform=function()
{if(!this.visible)
{return;}
this.displayObjectUpdateTransform();for(var i=0,j=this.children.length;i<j;++i)
{this.children[i].updateTransform();}};Container.prototype.containerUpdateTransform=Container.prototype.updateTransform;Container.prototype.getBounds=function()
{if(!this._currentBounds)
{if(this.children.length===0)
{return math.Rectangle.EMPTY;}
var minX=Infinity;var minY=Infinity;var maxX=-Infinity;var maxY=-Infinity;var childBounds;var childMaxX;var childMaxY;var childVisible=false;for(var i=0,j=this.children.length;i<j;++i)
{var child=this.children[i];if(!child.visible)
{continue;}
childVisible=true;childBounds=this.children[i].getBounds();minX=minX<childBounds.x?minX:childBounds.x;minY=minY<childBounds.y?minY:childBounds.y;childMaxX=childBounds.width+childBounds.x;childMaxY=childBounds.height+childBounds.y;maxX=maxX>childMaxX?maxX:childMaxX;maxY=maxY>childMaxY?maxY:childMaxY;}
if(!childVisible)
{return math.Rectangle.EMPTY;}
var bounds=this._bounds;bounds.x=minX;bounds.y=minY;bounds.width=maxX-minX;bounds.height=maxY-minY;this._currentBounds=bounds;}
return this._currentBounds;};Container.prototype.containerGetBounds=Container.prototype.getBounds;Container.prototype.getLocalBounds=function()
{var matrixCache=this.worldTransform;this.worldTransform=math.Matrix.IDENTITY;for(var i=0,j=this.children.length;i<j;++i)
{this.children[i].updateTransform();}
this.worldTransform=matrixCache;this._currentBounds=null;return this.getBounds(math.Matrix.IDENTITY);};Container.prototype.renderWebGL=function(renderer)
{if(!this.visible||this.worldAlpha<=0||!this.renderable)
{return;}
var i,j;if(this._mask||this._filters)
{renderer.currentRenderer.flush();if(this._filters&&this._filters.length)
{renderer.filterManager.pushFilter(this,this._filters);}
if(this._mask)
{renderer.maskManager.pushMask(this,this._mask);}
renderer.currentRenderer.start();this._renderWebGL(renderer);for(i=0,j=this.children.length;i<j;i++)
{this.children[i].renderWebGL(renderer);}
renderer.currentRenderer.flush();if(this._mask)
{renderer.maskManager.popMask(this,this._mask);}
if(this._filters)
{renderer.filterManager.popFilter();}
renderer.currentRenderer.start();}
else
{this._renderWebGL(renderer);for(i=0,j=this.children.length;i<j;++i)
{this.children[i].renderWebGL(renderer);}}};Container.prototype._renderWebGL=function(renderer)
{};Container.prototype._renderCanvas=function(renderer)
{};Container.prototype.renderCanvas=function(renderer)
{if(!this.visible||this.alpha<=0||!this.renderable)
{return;}
if(this._mask)
{renderer.maskManager.pushMask(this._mask,renderer);}
this._renderCanvas(renderer);for(var i=0,j=this.children.length;i<j;++i)
{this.children[i].renderCanvas(renderer);}
if(this._mask)
{renderer.maskManager.popMask(renderer);}};Container.prototype.destroy=function(destroyChildren)
{DisplayObject.prototype.destroy.call(this);if(destroyChildren)
{for(var i=0,j=this.children.length;i<j;++i)
{this.children[i].destroy(destroyChildren);}}
this.removeChildren();this.children=null;};},{"../math":33,"../textures/RenderTexture":71,"../utils":77,"./DisplayObject":24}],24:[function(require,module,exports){var math=require('../math'),RenderTexture=require('../textures/RenderTexture'),EventEmitter=require('eventemitter3'),CONST=require('../const'),_tempMatrix=new math.Matrix(),_tempDisplayObjectParent={worldTransform:new math.Matrix(),worldAlpha:1,children:[]};function DisplayObject()
{EventEmitter.call(this);this.position=new math.Point();this.scale=new math.Point(1,1);this.pivot=new math.Point(0,0);this.skew=new math.Point(0,0);this.rotation=0;this.alpha=1;this.visible=true;this.renderable=true;this.parent=null;this.worldAlpha=1;this.worldTransform=new math.Matrix();this.filterArea=null;this._sr=0;this._cr=1;this._bounds=new math.Rectangle(0,0,1,1);this._currentBounds=null;this._mask=null;}
DisplayObject.prototype=Object.create(EventEmitter.prototype);DisplayObject.prototype.constructor=DisplayObject;module.exports=DisplayObject;Object.defineProperties(DisplayObject.prototype,{x:{get:function()
{return this.position.x;},set:function(value)
{this.position.x=value;}},y:{get:function()
{return this.position.y;},set:function(value)
{this.position.y=value;}},worldVisible:{get:function()
{var item=this;do{if(!item.visible)
{return false;}
item=item.parent;}while(item);return true;}},mask:{get:function()
{return this._mask;},set:function(value)
{if(this._mask)
{this._mask.renderable=true;}
this._mask=value;if(this._mask)
{this._mask.renderable=false;}}},filters:{get:function()
{return this._filters&&this._filters.slice();},set:function(value)
{this._filters=value&&value.slice();}}});DisplayObject.prototype.updateTransform=function()
{var pt=this.parent.worldTransform;var wt=this.worldTransform;var a,b,c,d,tx,ty;if(this.skew.x||this.skew.y)
{_tempMatrix.setTransform(this.position.x,this.position.y,this.pivot.x,this.pivot.y,this.scale.x,this.scale.y,this.rotation,this.skew.x,this.skew.y);wt.a=_tempMatrix.a*pt.a+_tempMatrix.b*pt.c;wt.b=_tempMatrix.a*pt.b+_tempMatrix.b*pt.d;wt.c=_tempMatrix.c*pt.a+_tempMatrix.d*pt.c;wt.d=_tempMatrix.c*pt.b+_tempMatrix.d*pt.d;wt.tx=_tempMatrix.tx*pt.a+_tempMatrix.ty*pt.c+pt.tx;wt.ty=_tempMatrix.tx*pt.b+_tempMatrix.ty*pt.d+pt.ty;}
else
{if(this.rotation%CONST.PI_2)
{if(this.rotation!==this.rotationCache)
{this.rotationCache=this.rotation;this._sr=Math.sin(this.rotation);this._cr=Math.cos(this.rotation);}
a=this._cr*this.scale.x;b=this._sr*this.scale.x;c=-this._sr*this.scale.y;d=this._cr*this.scale.y;tx=this.position.x;ty=this.position.y;if(this.pivot.x||this.pivot.y)
{tx-=this.pivot.x*a+this.pivot.y*c;ty-=this.pivot.x*b+this.pivot.y*d;}
wt.a=a*pt.a+b*pt.c;wt.b=a*pt.b+b*pt.d;wt.c=c*pt.a+d*pt.c;wt.d=c*pt.b+d*pt.d;wt.tx=tx*pt.a+ty*pt.c+pt.tx;wt.ty=tx*pt.b+ty*pt.d+pt.ty;}
else
{a=this.scale.x;d=this.scale.y;tx=this.position.x-this.pivot.x*a;ty=this.position.y-this.pivot.y*d;wt.a=a*pt.a;wt.b=a*pt.b;wt.c=d*pt.c;wt.d=d*pt.d;wt.tx=tx*pt.a+ty*pt.c+pt.tx;wt.ty=tx*pt.b+ty*pt.d+pt.ty;}}
this.worldAlpha=this.alpha*this.parent.worldAlpha;this._currentBounds=null;};DisplayObject.prototype.displayObjectUpdateTransform=DisplayObject.prototype.updateTransform;DisplayObject.prototype.getBounds=function(matrix)
{return math.Rectangle.EMPTY;};DisplayObject.prototype.getLocalBounds=function()
{return this.getBounds(math.Matrix.IDENTITY);};DisplayObject.prototype.toGlobal=function(position)
{if(!this.parent)
{this.parent=_tempDisplayObjectParent;this.displayObjectUpdateTransform();this.parent=null;}
else
{this.displayObjectUpdateTransform();}
return this.worldTransform.apply(position);};DisplayObject.prototype.toLocal=function(position,from,point)
{if(from)
{position=from.toGlobal(position);}
if(!this.parent)
{this.parent=_tempDisplayObjectParent;this.displayObjectUpdateTransform();this.parent=null;}
else
{this.displayObjectUpdateTransform();}
return this.worldTransform.applyInverse(position,point);};DisplayObject.prototype.renderWebGL=function(renderer)
{};DisplayObject.prototype.renderCanvas=function(renderer)
{};DisplayObject.prototype.generateTexture=function(renderer,scaleMode,resolution)
{var bounds=this.getLocalBounds();var renderTexture=new RenderTexture(renderer,bounds.width|0,bounds.height|0,scaleMode,resolution);_tempMatrix.tx=-bounds.x;_tempMatrix.ty=-bounds.y;renderTexture.render(this,_tempMatrix);return renderTexture;};DisplayObject.prototype.setParent=function(container)
{if(!container||!container.addChild)
{throw new Error('setParent: Argument must be a Container');}
container.addChild(this);return container;};DisplayObject.prototype.setTransform=function(x,y,scaleX,scaleY,rotation,skewX,skewY,pivotX,pivotY)
{this.position.x=x||0;this.position.y=y||0;this.scale.x=!scaleX?1:scaleX;this.scale.y=!scaleY?1:scaleY;this.rotation=rotation||0;this.skew.x=skewX||0;this.skew.y=skewY||0;this.pivot.x=pivotX||0;this.pivot.y=pivotY||0;return this;};DisplayObject.prototype.destroy=function()
{this.position=null;this.scale=null;this.pivot=null;this.skew=null;this.parent=null;this._bounds=null;this._currentBounds=null;this._mask=null;this.worldTransform=null;this.filterArea=null;};},{"../const":22,"../math":33,"../textures/RenderTexture":71,"eventemitter3":10}],25:[function(require,module,exports){var Container=require('../display/Container'),Texture=require('../textures/Texture'),CanvasBuffer=require('../renderers/canvas/utils/CanvasBuffer'),CanvasGraphics=require('../renderers/canvas/utils/CanvasGraphics'),GraphicsData=require('./GraphicsData'),math=require('../math'),CONST=require('../const'),tempPoint=new math.Point();function Graphics()
{Container.call(this);this.fillAlpha=1;this.lineWidth=0;this.lineColor=0;this.graphicsData=[];this.tint=0xFFFFFF;this._prevTint=0xFFFFFF;this.blendMode=CONST.BLEND_MODES.NORMAL;this.currentPath=null;this._webGL={};this.isMask=false;this.boundsPadding=0;this._localBounds=new math.Rectangle(0,0,1,1);this.dirty=true;this.glDirty=false;this.boundsDirty=true;this.cachedSpriteDirty=false;}
Graphics.prototype=Object.create(Container.prototype);Graphics.prototype.constructor=Graphics;module.exports=Graphics;Graphics.prototype.clone=function()
{var clone=new Graphics();clone.renderable=this.renderable;clone.fillAlpha=this.fillAlpha;clone.lineWidth=this.lineWidth;clone.lineColor=this.lineColor;clone.tint=this.tint;clone.blendMode=this.blendMode;clone.isMask=this.isMask;clone.boundsPadding=this.boundsPadding;clone.dirty=true;clone.glDirty=true;clone.cachedSpriteDirty=this.cachedSpriteDirty;for(var i=0;i<this.graphicsData.length;++i)
{clone.graphicsData.push(this.graphicsData[i].clone());}
clone.currentPath=clone.graphicsData[clone.graphicsData.length-1];clone.updateLocalBounds();return clone;};Graphics.prototype.lineStyle=function(lineWidth,color,alpha)
{this.lineWidth=lineWidth||0;this.lineColor=color||0;this.lineAlpha=(alpha===undefined)?1:alpha;if(this.currentPath)
{if(this.currentPath.shape.points.length)
{var shape=new math.Polygon(this.currentPath.shape.points.slice(-2));shape.closed=false;this.drawShape(shape);}
else
{this.currentPath.lineWidth=this.lineWidth;this.currentPath.lineColor=this.lineColor;this.currentPath.lineAlpha=this.lineAlpha;}}
return this;};Graphics.prototype.moveTo=function(x,y)
{var shape=new math.Polygon([x,y]);shape.closed=false;this.drawShape(shape);return this;};Graphics.prototype.lineTo=function(x,y)
{this.currentPath.shape.points.push(x,y);this.dirty=true;return this;};Graphics.prototype.quadraticCurveTo=function(cpX,cpY,toX,toY)
{if(this.currentPath)
{if(this.currentPath.shape.points.length===0)
{this.currentPath.shape.points=[0,0];}}
else
{this.moveTo(0,0);}
var xa,ya,n=20,points=this.currentPath.shape.points;if(points.length===0)
{this.moveTo(0,0);}
var fromX=points[points.length-2];var fromY=points[points.length-1];var j=0;for(var i=1;i<=n;++i)
{j=i/n;xa=fromX+((cpX-fromX)*j);ya=fromY+((cpY-fromY)*j);points.push(xa+(((cpX+((toX-cpX)*j))-xa)*j),ya+(((cpY+((toY-cpY)*j))-ya)*j));}
this.dirty=this.boundsDirty=true;return this;};Graphics.prototype.bezierCurveTo=function(cpX,cpY,cpX2,cpY2,toX,toY)
{if(this.currentPath)
{if(this.currentPath.shape.points.length===0)
{this.currentPath.shape.points=[0,0];}}
else
{this.moveTo(0,0);}
var n=20,dt,dt2,dt3,t2,t3,points=this.currentPath.shape.points;var fromX=points[points.length-2];var fromY=points[points.length-1];var j=0;for(var i=1;i<=n;++i)
{j=i/n;dt=(1-j);dt2=dt*dt;dt3=dt2*dt;t2=j*j;t3=t2*j;points.push(dt3*fromX+3*dt2*j*cpX+3*dt*t2*cpX2+t3*toX,dt3*fromY+3*dt2*j*cpY+3*dt*t2*cpY2+t3*toY);}
this.dirty=this.boundsDirty=true;return this;};Graphics.prototype.arcTo=function(x1,y1,x2,y2,radius)
{if(this.currentPath)
{if(this.currentPath.shape.points.length===0)
{this.currentPath.shape.points.push(x1,y1);}}
else
{this.moveTo(x1,y1);}
var points=this.currentPath.shape.points,fromX=points[points.length-2],fromY=points[points.length-1],a1=fromY-y1,b1=fromX-x1,a2=y2-y1,b2=x2-x1,mm=Math.abs(a1*b2-b1*a2);if(mm<1.0e-8||radius===0)
{if(points[points.length-2]!==x1||points[points.length-1]!==y1)
{points.push(x1,y1);}}
else
{var dd=a1*a1+b1*b1,cc=a2*a2+b2*b2,tt=a1*a2+b1*b2,k1=radius*Math.sqrt(dd)/mm,k2=radius*Math.sqrt(cc)/mm,j1=k1*tt/dd,j2=k2*tt/cc,cx=k1*b2+k2*b1,cy=k1*a2+k2*a1,px=b1*(k2+j1),py=a1*(k2+j1),qx=b2*(k1+j2),qy=a2*(k1+j2),startAngle=Math.atan2(py-cy,px-cx),endAngle=Math.atan2(qy-cy,qx-cx);this.arc(cx+x1,cy+y1,radius,startAngle,endAngle,b1*a2>b2*a1);}
this.dirty=this.boundsDirty=true;return this;};Graphics.prototype.arc=function(cx,cy,radius,startAngle,endAngle,anticlockwise)
{anticlockwise=anticlockwise||false;if(startAngle===endAngle)
{return this;}
if(!anticlockwise&&endAngle<=startAngle)
{endAngle+=Math.PI*2;}
else if(anticlockwise&&startAngle<=endAngle)
{startAngle+=Math.PI*2;}
var sweep=anticlockwise?(startAngle-endAngle)*-1:(endAngle-startAngle);var segs=Math.ceil(Math.abs(sweep)/(Math.PI*2))*40;if(sweep===0)
{return this;}
var startX=cx+Math.cos(startAngle)*radius;var startY=cy+Math.sin(startAngle)*radius;if(this.currentPath)
{this.currentPath.shape.points.push(startX,startY);}
else
{this.moveTo(startX,startY);}
var points=this.currentPath.shape.points;var theta=sweep/(segs*2);var theta2=theta*2;var cTheta=Math.cos(theta);var sTheta=Math.sin(theta);var segMinus=segs-1;var remainder=(segMinus%1)/segMinus;for(var i=0;i<=segMinus;i++)
{var real=i+remainder*i;var angle=((theta)+startAngle+(theta2*real));var c=Math.cos(angle);var s=-Math.sin(angle);points.push(((cTheta*c)+(sTheta*s))*radius+cx,((cTheta*-s)+(sTheta*c))*radius+cy);}
this.dirty=this.boundsDirty=true;return this;};Graphics.prototype.beginFill=function(color,alpha)
{this.filling=true;this.fillColor=color||0;this.fillAlpha=(alpha===undefined)?1:alpha;if(this.currentPath)
{if(this.currentPath.shape.points.length<=2)
{this.currentPath.fill=this.filling;this.currentPath.fillColor=this.fillColor;this.currentPath.fillAlpha=this.fillAlpha;}}
return this;};Graphics.prototype.endFill=function()
{this.filling=false;this.fillColor=null;this.fillAlpha=1;return this;};Graphics.prototype.drawRect=function(x,y,width,height)
{this.drawShape(new math.Rectangle(x,y,width,height));return this;};Graphics.prototype.drawRoundedRect=function(x,y,width,height,radius)
{this.drawShape(new math.RoundedRectangle(x,y,width,height,radius));return this;};Graphics.prototype.drawCircle=function(x,y,radius)
{this.drawShape(new math.Circle(x,y,radius));return this;};Graphics.prototype.drawEllipse=function(x,y,width,height)
{this.drawShape(new math.Ellipse(x,y,width,height));return this;};Graphics.prototype.drawPolygon=function(path)
{var points=path;var closed=true;if(points instanceof math.Polygon)
{closed=points.closed;points=points.points;}
if(!Array.isArray(points))
{points=[];points.length=arguments.length;for(var i=0;i<points.length;++i)
{points[i]=arguments[i];}}
var shape=new math.Polygon(points);shape.closed=closed;this.drawShape(shape);return this;};Graphics.prototype.clear=function()
{this.lineWidth=0;this.filling=false;this.dirty=true;this.clearDirty=true;this.graphicsData=[];return this;};Graphics.prototype.generateTexture=function(renderer,resolution,scaleMode)
{resolution=resolution||1;var bounds=this.getLocalBounds();var canvasBuffer=new CanvasBuffer(bounds.width*resolution,bounds.height*resolution);var texture=Texture.fromCanvas(canvasBuffer.canvas,scaleMode);texture.baseTexture.resolution=resolution;canvasBuffer.context.scale(resolution,resolution);canvasBuffer.context.translate(-bounds.x,-bounds.y);CanvasGraphics.renderGraphics(this,canvasBuffer.context);return texture;};Graphics.prototype._renderWebGL=function(renderer)
{if(this.glDirty)
{this.dirty=true;this.glDirty=false;}
renderer.setObjectRenderer(renderer.plugins.graphics);renderer.plugins.graphics.render(this);};Graphics.prototype._renderCanvas=function(renderer)
{if(this.isMask===true)
{return;}
if(this._prevTint!==this.tint){this.dirty=true;}
var context=renderer.context;var transform=this.worldTransform;var compositeOperation=renderer.blendModes[this.blendMode];if(compositeOperation!==context.globalCompositeOperation)
{context.globalCompositeOperation=compositeOperation;}
var resolution=renderer.resolution;context.setTransform(transform.a*resolution,transform.b*resolution,transform.c*resolution,transform.d*resolution,transform.tx*resolution,transform.ty*resolution);CanvasGraphics.renderGraphics(this,context);};Graphics.prototype.getBounds=function(matrix)
{if(!this._currentBounds)
{if(!this.renderable)
{return math.Rectangle.EMPTY;}
if(this.boundsDirty)
{this.updateLocalBounds();this.glDirty=true;this.cachedSpriteDirty=true;this.boundsDirty=false;}
var bounds=this._localBounds;var w0=bounds.x;var w1=bounds.width+bounds.x;var h0=bounds.y;var h1=bounds.height+bounds.y;var worldTransform=matrix||this.worldTransform;var a=worldTransform.a;var b=worldTransform.b;var c=worldTransform.c;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var x1=a*w1+c*h1+tx;var y1=d*h1+b*w1+ty;var x2=a*w0+c*h1+tx;var y2=d*h1+b*w0+ty;var x3=a*w0+c*h0+tx;var y3=d*h0+b*w0+ty;var x4=a*w1+c*h0+tx;var y4=d*h0+b*w1+ty;var maxX=x1;var maxY=y1;var minX=x1;var minY=y1;minX=x2<minX?x2:minX;minX=x3<minX?x3:minX;minX=x4<minX?x4:minX;minY=y2<minY?y2:minY;minY=y3<minY?y3:minY;minY=y4<minY?y4:minY;maxX=x2>maxX?x2:maxX;maxX=x3>maxX?x3:maxX;maxX=x4>maxX?x4:maxX;maxY=y2>maxY?y2:maxY;maxY=y3>maxY?y3:maxY;maxY=y4>maxY?y4:maxY;this._bounds.x=minX;this._bounds.width=maxX-minX;this._bounds.y=minY;this._bounds.height=maxY-minY;this._currentBounds=this._bounds;}
return this._currentBounds;};Graphics.prototype.containsPoint=function(point)
{this.worldTransform.applyInverse(point,tempPoint);var graphicsData=this.graphicsData;for(var i=0;i<graphicsData.length;i++)
{var data=graphicsData[i];if(!data.fill)
{continue;}
if(data.shape)
{if(data.shape.contains(tempPoint.x,tempPoint.y))
{return true;}}}
return false;};Graphics.prototype.updateLocalBounds=function()
{var minX=Infinity;var maxX=-Infinity;var minY=Infinity;var maxY=-Infinity;if(this.graphicsData.length)
{var shape,points,x,y,w,h;for(var i=0;i<this.graphicsData.length;i++)
{var data=this.graphicsData[i];var type=data.type;var lineWidth=data.lineWidth;shape=data.shape;if(type===CONST.SHAPES.RECT||type===CONST.SHAPES.RREC)
{x=shape.x-lineWidth/2;y=shape.y-lineWidth/2;w=shape.width+lineWidth;h=shape.height+lineWidth;minX=x<minX?x:minX;maxX=x+w>maxX?x+w:maxX;minY=y<minY?y:minY;maxY=y+h>maxY?y+h:maxY;}
else if(type===CONST.SHAPES.CIRC)
{x=shape.x;y=shape.y;w=shape.radius+lineWidth/2;h=shape.radius+lineWidth/2;minX=x-w<minX?x-w:minX;maxX=x+w>maxX?x+w:maxX;minY=y-h<minY?y-h:minY;maxY=y+h>maxY?y+h:maxY;}
else if(type===CONST.SHAPES.ELIP)
{x=shape.x;y=shape.y;w=shape.width+lineWidth/2;h=shape.height+lineWidth/2;minX=x-w<minX?x-w:minX;maxX=x+w>maxX?x+w:maxX;minY=y-h<minY?y-h:minY;maxY=y+h>maxY?y+h:maxY;}
else
{points=shape.points;for(var j=0;j<points.length;j+=2)
{x=points[j];y=points[j+1];minX=x-lineWidth<minX?x-lineWidth:minX;maxX=x+lineWidth>maxX?x+lineWidth:maxX;minY=y-lineWidth<minY?y-lineWidth:minY;maxY=y+lineWidth>maxY?y+lineWidth:maxY;}}}}
else
{minX=0;maxX=0;minY=0;maxY=0;}
var padding=this.boundsPadding;this._localBounds.x=minX-padding;this._localBounds.width=(maxX-minX)+padding*2;this._localBounds.y=minY-padding;this._localBounds.height=(maxY-minY)+padding*2;};Graphics.prototype.drawShape=function(shape)
{if(this.currentPath)
{if(this.currentPath.shape.points.length<=2)
{this.graphicsData.pop();}}
this.currentPath=null;var data=new GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,shape);this.graphicsData.push(data);if(data.type===CONST.SHAPES.POLY)
{data.shape.closed=data.shape.closed||this.filling;this.currentPath=data;}
this.dirty=this.boundsDirty=true;return data;};Graphics.prototype.destroy=function(){Container.prototype.destroy.apply(this,arguments);for(var i=0;i<this.graphicsData.length;++i){this.graphicsData[i].destroy();}
for(var id in this._webgl){for(var j=0;j<this._webgl[id].data.length;++j){this._webgl[id].data[j].destroy();}}
this.graphicsData=null;this.currentPath=null;this._webgl=null;this._localBounds=null;};},{"../const":22,"../display/Container":23,"../math":33,"../renderers/canvas/utils/CanvasBuffer":45,"../renderers/canvas/utils/CanvasGraphics":46,"../textures/Texture":72,"./GraphicsData":26}],26:[function(require,module,exports){function GraphicsData(lineWidth,lineColor,lineAlpha,fillColor,fillAlpha,fill,shape)
{this.lineWidth=lineWidth;this.lineColor=lineColor;this.lineAlpha=lineAlpha;this._lineTint=lineColor;this.fillColor=fillColor;this.fillAlpha=fillAlpha;this._fillTint=fillColor;this.fill=fill;this.shape=shape;this.type=shape.type;}
GraphicsData.prototype.constructor=GraphicsData;module.exports=GraphicsData;GraphicsData.prototype.clone=function()
{return new GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape);};GraphicsData.prototype.destroy=function(){this.shape=null;};},{}],27:[function(require,module,exports){var utils=require('../../utils'),math=require('../../math'),CONST=require('../../const'),ObjectRenderer=require('../../renderers/webgl/utils/ObjectRenderer'),WebGLRenderer=require('../../renderers/webgl/WebGLRenderer'),WebGLGraphicsData=require('./WebGLGraphicsData'),earcut=require('earcut');function GraphicsRenderer(renderer)
{ObjectRenderer.call(this,renderer);this.graphicsDataPool=[];this.primitiveShader=null;this.complexPrimitiveShader=null;this.maximumSimplePolySize=200;}
GraphicsRenderer.prototype=Object.create(ObjectRenderer.prototype);GraphicsRenderer.prototype.constructor=GraphicsRenderer;module.exports=GraphicsRenderer;WebGLRenderer.registerPlugin('graphics',GraphicsRenderer);GraphicsRenderer.prototype.onContextChange=function()
{};GraphicsRenderer.prototype.destroy=function(){ObjectRenderer.prototype.destroy.call(this);for(var i=0;i<this.graphicsDataPool.length;++i){this.graphicsDataPool[i].destroy();}
this.graphicsDataPool=null;};GraphicsRenderer.prototype.render=function(graphics)
{var renderer=this.renderer;var gl=renderer.gl;var shader=renderer.shaderManager.plugins.primitiveShader,webGLData;if(graphics.dirty||!graphics._webGL[gl.id])
{this.updateGraphics(graphics);}
var webGL=graphics._webGL[gl.id];renderer.blendModeManager.setBlendMode(graphics.blendMode);for(var i=0,n=webGL.data.length;i<n;i++)
{webGLData=webGL.data[i];if(webGL.data[i].mode===1)
{renderer.stencilManager.pushStencil(graphics,webGLData);gl.uniform1f(renderer.shaderManager.complexPrimitiveShader.uniforms.alpha._location,graphics.worldAlpha*webGLData.alpha);gl.drawElements(gl.TRIANGLE_FAN,4,gl.UNSIGNED_SHORT,(webGLData.indices.length-4)*2);renderer.stencilManager.popStencil(graphics,webGLData);}
else
{shader=renderer.shaderManager.primitiveShader;renderer.shaderManager.setShader(shader);gl.uniformMatrix3fv(shader.uniforms.translationMatrix._location,false,graphics.worldTransform.toArray(true));gl.uniformMatrix3fv(shader.uniforms.projectionMatrix._location,false,renderer.currentRenderTarget.projectionMatrix.toArray(true));gl.uniform3fv(shader.uniforms.tint._location,utils.hex2rgb(graphics.tint));gl.uniform1f(shader.uniforms.alpha._location,graphics.worldAlpha);gl.bindBuffer(gl.ARRAY_BUFFER,webGLData.buffer);gl.vertexAttribPointer(shader.attributes.aVertexPosition,2,gl.FLOAT,false,4*6,0);gl.vertexAttribPointer(shader.attributes.aColor,4,gl.FLOAT,false,4*6,2*4);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,webGLData.indexBuffer);gl.drawElements(gl.TRIANGLE_STRIP,webGLData.indices.length,gl.UNSIGNED_SHORT,0);}
renderer.drawCount++;}};GraphicsRenderer.prototype.updateGraphics=function(graphics)
{var gl=this.renderer.gl;var webGL=graphics._webGL[gl.id];if(!webGL)
{webGL=graphics._webGL[gl.id]={lastIndex:0,data:[],gl:gl};}
graphics.dirty=false;var i;if(graphics.clearDirty)
{graphics.clearDirty=false;for(i=0;i<webGL.data.length;i++)
{var graphicsData=webGL.data[i];graphicsData.reset();this.graphicsDataPool.push(graphicsData);}
webGL.data=[];webGL.lastIndex=0;}
var webGLData;for(i=webGL.lastIndex;i<graphics.graphicsData.length;i++)
{var data=graphics.graphicsData[i];if(data.type===CONST.SHAPES.POLY)
{data.points=data.shape.points.slice();if(data.shape.closed)
{if(data.points[0]!==data.points[data.points.length-2]||data.points[1]!==data.points[data.points.length-1])
{data.points.push(data.points[0],data.points[1]);}}
if(data.fill)
{if(data.points.length>=6)
{if(data.points.length<this.maximumSimplePolySize*2)
{webGLData=this.switchMode(webGL,0);var canDrawUsingSimple=this.buildPoly(data,webGLData);if(!canDrawUsingSimple)
{webGLData=this.switchMode(webGL,1);this.buildComplexPoly(data,webGLData);}}
else
{webGLData=this.switchMode(webGL,1);this.buildComplexPoly(data,webGLData);}}}
if(data.lineWidth>0)
{webGLData=this.switchMode(webGL,0);this.buildLine(data,webGLData);}}
else
{webGLData=this.switchMode(webGL,0);if(data.type===CONST.SHAPES.RECT)
{this.buildRectangle(data,webGLData);}
else if(data.type===CONST.SHAPES.CIRC||data.type===CONST.SHAPES.ELIP)
{this.buildCircle(data,webGLData);}
else if(data.type===CONST.SHAPES.RREC)
{this.buildRoundedRectangle(data,webGLData);}}
webGL.lastIndex++;}
for(i=0;i<webGL.data.length;i++)
{webGLData=webGL.data[i];if(webGLData.dirty)
{webGLData.upload();}}};GraphicsRenderer.prototype.switchMode=function(webGL,type)
{var webGLData;if(!webGL.data.length)
{webGLData=this.graphicsDataPool.pop()||new WebGLGraphicsData(webGL.gl);webGLData.mode=type;webGL.data.push(webGLData);}
else
{webGLData=webGL.data[webGL.data.length-1];if((webGLData.points.length>320000)||webGLData.mode!==type||type===1)
{webGLData=this.graphicsDataPool.pop()||new WebGLGraphicsData(webGL.gl);webGLData.mode=type;webGL.data.push(webGLData);}}
webGLData.dirty=true;return webGLData;};GraphicsRenderer.prototype.buildRectangle=function(graphicsData,webGLData)
{var rectData=graphicsData.shape;var x=rectData.x;var y=rectData.y;var width=rectData.width;var height=rectData.height;if(graphicsData.fill)
{var color=utils.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var verts=webGLData.points;var indices=webGLData.indices;var vertPos=verts.length/6;verts.push(x,y);verts.push(r,g,b,alpha);verts.push(x+width,y);verts.push(r,g,b,alpha);verts.push(x,y+height);verts.push(r,g,b,alpha);verts.push(x+width,y+height);verts.push(r,g,b,alpha);indices.push(vertPos,vertPos,vertPos+1,vertPos+2,vertPos+3,vertPos+3);}
if(graphicsData.lineWidth)
{var tempPoints=graphicsData.points;graphicsData.points=[x,y,x+width,y,x+width,y+height,x,y+height,x,y];this.buildLine(graphicsData,webGLData);graphicsData.points=tempPoints;}};GraphicsRenderer.prototype.buildRoundedRectangle=function(graphicsData,webGLData)
{var rrectData=graphicsData.shape;var x=rrectData.x;var y=rrectData.y;var width=rrectData.width;var height=rrectData.height;var radius=rrectData.radius;var recPoints=[];recPoints.push(x,y+radius);this.quadraticBezierCurve(x,y+height-radius,x,y+height,x+radius,y+height,recPoints);this.quadraticBezierCurve(x+width-radius,y+height,x+width,y+height,x+width,y+height-radius,recPoints);this.quadraticBezierCurve(x+width,y+radius,x+width,y,x+width-radius,y,recPoints);this.quadraticBezierCurve(x+radius,y,x,y,x,y+radius+0.0000000001,recPoints);if(graphicsData.fill)
{var color=utils.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var verts=webGLData.points;var indices=webGLData.indices;var vecPos=verts.length/6;var triangles=earcut(recPoints,null,2);var i=0;for(i=0;i<triangles.length;i+=3)
{indices.push(triangles[i]+vecPos);indices.push(triangles[i]+vecPos);indices.push(triangles[i+1]+vecPos);indices.push(triangles[i+2]+vecPos);indices.push(triangles[i+2]+vecPos);}
for(i=0;i<recPoints.length;i++)
{verts.push(recPoints[i],recPoints[++i],r,g,b,alpha);}}
if(graphicsData.lineWidth)
{var tempPoints=graphicsData.points;graphicsData.points=recPoints;this.buildLine(graphicsData,webGLData);graphicsData.points=tempPoints;}};GraphicsRenderer.prototype.quadraticBezierCurve=function(fromX,fromY,cpX,cpY,toX,toY,out)
{var xa,ya,xb,yb,x,y,n=20,points=out||[];function getPt(n1,n2,perc){var diff=n2-n1;return n1+(diff*perc);}
var j=0;for(var i=0;i<=n;i++){j=i/n;xa=getPt(fromX,cpX,j);ya=getPt(fromY,cpY,j);xb=getPt(cpX,toX,j);yb=getPt(cpY,toY,j);x=getPt(xa,xb,j);y=getPt(ya,yb,j);points.push(x,y);}
return points;};GraphicsRenderer.prototype.buildCircle=function(graphicsData,webGLData)
{var circleData=graphicsData.shape;var x=circleData.x;var y=circleData.y;var width;var height;if(graphicsData.type===CONST.SHAPES.CIRC)
{width=circleData.radius;height=circleData.radius;}
else
{width=circleData.width;height=circleData.height;}
var totalSegs=Math.floor(30*Math.sqrt(circleData.radius))||Math.floor(15*Math.sqrt(circleData.width+circleData.height));var seg=(Math.PI*2)/totalSegs;var i=0;if(graphicsData.fill)
{var color=utils.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var verts=webGLData.points;var indices=webGLData.indices;var vecPos=verts.length/6;indices.push(vecPos);for(i=0;i<totalSegs+1;i++)
{verts.push(x,y,r,g,b,alpha);verts.push(x+Math.sin(seg*i)*width,y+Math.cos(seg*i)*height,r,g,b,alpha);indices.push(vecPos++,vecPos++);}
indices.push(vecPos-1);}
if(graphicsData.lineWidth)
{var tempPoints=graphicsData.points;graphicsData.points=[];for(i=0;i<totalSegs+1;i++)
{graphicsData.points.push(x+Math.sin(seg*i)*width,y+Math.cos(seg*i)*height);}
this.buildLine(graphicsData,webGLData);graphicsData.points=tempPoints;}};GraphicsRenderer.prototype.buildLine=function(graphicsData,webGLData)
{var i=0;var points=graphicsData.points;if(points.length===0)
{return;}
var firstPoint=new math.Point(points[0],points[1]);var lastPoint=new math.Point(points[points.length-2],points[points.length-1]);if(firstPoint.x===lastPoint.x&&firstPoint.y===lastPoint.y)
{points=points.slice();points.pop();points.pop();lastPoint=new math.Point(points[points.length-2],points[points.length-1]);var midPointX=lastPoint.x+(firstPoint.x-lastPoint.x)*0.5;var midPointY=lastPoint.y+(firstPoint.y-lastPoint.y)*0.5;points.unshift(midPointX,midPointY);points.push(midPointX,midPointY);}
var verts=webGLData.points;var indices=webGLData.indices;var length=points.length/2;var indexCount=points.length;var indexStart=verts.length/6;var width=graphicsData.lineWidth/2;var color=utils.hex2rgb(graphicsData.lineColor);var alpha=graphicsData.lineAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var px,py,p1x,p1y,p2x,p2y,p3x,p3y;var perpx,perpy,perp2x,perp2y,perp3x,perp3y;var a1,b1,c1,a2,b2,c2;var denom,pdist,dist;p1x=points[0];p1y=points[1];p2x=points[2];p2y=points[3];perpx=-(p1y-p2y);perpy=p1x-p2x;dist=Math.sqrt(perpx*perpx+perpy*perpy);perpx/=dist;perpy/=dist;perpx*=width;perpy*=width;verts.push(p1x-perpx,p1y-perpy,r,g,b,alpha);verts.push(p1x+perpx,p1y+perpy,r,g,b,alpha);for(i=1;i<length-1;i++)
{p1x=points[(i-1)*2];p1y=points[(i-1)*2+1];p2x=points[(i)*2];p2y=points[(i)*2+1];p3x=points[(i+1)*2];p3y=points[(i+1)*2+1];perpx=-(p1y-p2y);perpy=p1x-p2x;dist=Math.sqrt(perpx*perpx+perpy*perpy);perpx/=dist;perpy/=dist;perpx*=width;perpy*=width;perp2x=-(p2y-p3y);perp2y=p2x-p3x;dist=Math.sqrt(perp2x*perp2x+perp2y*perp2y);perp2x/=dist;perp2y/=dist;perp2x*=width;perp2y*=width;a1=(-perpy+p1y)-(-perpy+p2y);b1=(-perpx+p2x)-(-perpx+p1x);c1=(-perpx+p1x)*(-perpy+p2y)-(-perpx+p2x)*(-perpy+p1y);a2=(-perp2y+p3y)-(-perp2y+p2y);b2=(-perp2x+p2x)-(-perp2x+p3x);c2=(-perp2x+p3x)*(-perp2y+p2y)-(-perp2x+p2x)*(-perp2y+p3y);denom=a1*b2-a2*b1;if(Math.abs(denom)<0.1)
{denom+=10.1;verts.push(p2x-perpx,p2y-perpy,r,g,b,alpha);verts.push(p2x+perpx,p2y+perpy,r,g,b,alpha);continue;}
px=(b1*c2-b2*c1)/denom;py=(a2*c1-a1*c2)/denom;pdist=(px-p2x)*(px-p2x)+(py-p2y)*(py-p2y);if(pdist>140*140)
{perp3x=perpx-perp2x;perp3y=perpy-perp2y;dist=Math.sqrt(perp3x*perp3x+perp3y*perp3y);perp3x/=dist;perp3y/=dist;perp3x*=width;perp3y*=width;verts.push(p2x-perp3x,p2y-perp3y);verts.push(r,g,b,alpha);verts.push(p2x+perp3x,p2y+perp3y);verts.push(r,g,b,alpha);verts.push(p2x-perp3x,p2y-perp3y);verts.push(r,g,b,alpha);indexCount++;}
else
{verts.push(px,py);verts.push(r,g,b,alpha);verts.push(p2x-(px-p2x),p2y-(py-p2y));verts.push(r,g,b,alpha);}}
p1x=points[(length-2)*2];p1y=points[(length-2)*2+1];p2x=points[(length-1)*2];p2y=points[(length-1)*2+1];perpx=-(p1y-p2y);perpy=p1x-p2x;dist=Math.sqrt(perpx*perpx+perpy*perpy);perpx/=dist;perpy/=dist;perpx*=width;perpy*=width;verts.push(p2x-perpx,p2y-perpy);verts.push(r,g,b,alpha);verts.push(p2x+perpx,p2y+perpy);verts.push(r,g,b,alpha);indices.push(indexStart);for(i=0;i<indexCount;i++)
{indices.push(indexStart++);}
indices.push(indexStart-1);};GraphicsRenderer.prototype.buildComplexPoly=function(graphicsData,webGLData)
{var points=graphicsData.points.slice();if(points.length<6)
{return;}
var indices=webGLData.indices;webGLData.points=points;webGLData.alpha=graphicsData.fillAlpha;webGLData.color=utils.hex2rgb(graphicsData.fillColor);var minX=Infinity;var maxX=-Infinity;var minY=Infinity;var maxY=-Infinity;var x,y;for(var i=0;i<points.length;i+=2)
{x=points[i];y=points[i+1];minX=x<minX?x:minX;maxX=x>maxX?x:maxX;minY=y<minY?y:minY;maxY=y>maxY?y:maxY;}
points.push(minX,minY,maxX,minY,maxX,maxY,minX,maxY);var length=points.length/2;for(i=0;i<length;i++)
{indices.push(i);}};GraphicsRenderer.prototype.buildPoly=function(graphicsData,webGLData)
{var points=graphicsData.points;if(points.length<6)
{return;}
var verts=webGLData.points;var indices=webGLData.indices;var length=points.length/2;var color=utils.hex2rgb(graphicsData.fillColor);var alpha=graphicsData.fillAlpha;var r=color[0]*alpha;var g=color[1]*alpha;var b=color[2]*alpha;var triangles=earcut(points,null,2);if(!triangles){return false;}
var vertPos=verts.length/6;var i=0;for(i=0;i<triangles.length;i+=3)
{indices.push(triangles[i]+vertPos);indices.push(triangles[i]+vertPos);indices.push(triangles[i+1]+vertPos);indices.push(triangles[i+2]+vertPos);indices.push(triangles[i+2]+vertPos);}
for(i=0;i<length;i++)
{verts.push(points[i*2],points[i*2+1],r,g,b,alpha);}
return true;};},{"../../const":22,"../../math":33,"../../renderers/webgl/WebGLRenderer":49,"../../renderers/webgl/utils/ObjectRenderer":63,"../../utils":77,"./WebGLGraphicsData":28,"earcut":9}],28:[function(require,module,exports){function WebGLGraphicsData(gl){this.gl=gl;this.color=[0,0,0];this.points=[];this.indices=[];this.buffer=gl.createBuffer();this.indexBuffer=gl.createBuffer();this.mode=1;this.alpha=1;this.dirty=true;this.glPoints=null;this.glIndices=null;}
WebGLGraphicsData.prototype.constructor=WebGLGraphicsData;module.exports=WebGLGraphicsData;WebGLGraphicsData.prototype.reset=function(){this.points.length=0;this.indices.length=0;};WebGLGraphicsData.prototype.upload=function(){var gl=this.gl;this.glPoints=new Float32Array(this.points);gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);gl.bufferData(gl.ARRAY_BUFFER,this.glPoints,gl.STATIC_DRAW);this.glIndices=new Uint16Array(this.indices);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.glIndices,gl.STATIC_DRAW);this.dirty=false;};WebGLGraphicsData.prototype.destroy=function(){this.color=null;this.points=null;this.indices=null;this.gl.deleteBuffer(this.buffer);this.gl.deleteBuffer(this.indexBuffer);this.gl=null;this.buffer=null;this.indexBuffer=null;this.glPoints=null;this.glIndices=null;};},{}],29:[function(require,module,exports){var core=module.exports=Object.assign(require('./const'),require('./math'),{utils:require('./utils'),ticker:require('./ticker'),DisplayObject:require('./display/DisplayObject'),Container:require('./display/Container'),Sprite:require('./sprites/Sprite'),ParticleContainer:require('./particles/ParticleContainer'),SpriteRenderer:require('./sprites/webgl/SpriteRenderer'),ParticleRenderer:require('./particles/webgl/ParticleRenderer'),Text:require('./text/Text'),Graphics:require('./graphics/Graphics'),GraphicsData:require('./graphics/GraphicsData'),GraphicsRenderer:require('./graphics/webgl/GraphicsRenderer'),Texture:require('./textures/Texture'),BaseTexture:require('./textures/BaseTexture'),RenderTexture:require('./textures/RenderTexture'),VideoBaseTexture:require('./textures/VideoBaseTexture'),TextureUvs:require('./textures/TextureUvs'),CanvasRenderer:require('./renderers/canvas/CanvasRenderer'),CanvasGraphics:require('./renderers/canvas/utils/CanvasGraphics'),CanvasBuffer:require('./renderers/canvas/utils/CanvasBuffer'),WebGLRenderer:require('./renderers/webgl/WebGLRenderer'),WebGLManager:require('./renderers/webgl/managers/WebGLManager'),ShaderManager:require('./renderers/webgl/managers/ShaderManager'),Shader:require('./renderers/webgl/shaders/Shader'),TextureShader:require('./renderers/webgl/shaders/TextureShader'),PrimitiveShader:require('./renderers/webgl/shaders/PrimitiveShader'),ComplexPrimitiveShader:require('./renderers/webgl/shaders/ComplexPrimitiveShader'),ObjectRenderer:require('./renderers/webgl/utils/ObjectRenderer'),RenderTarget:require('./renderers/webgl/utils/RenderTarget'),AbstractFilter:require('./renderers/webgl/filters/AbstractFilter'),FXAAFilter:require('./renderers/webgl/filters/FXAAFilter'),SpriteMaskFilter:require('./renderers/webgl/filters/SpriteMaskFilter'),autoDetectRenderer:function(width,height,options,noWebGL)
{width=width||800;height=height||600;if(!noWebGL&&core.utils.isWebGLSupported())
{return new core.WebGLRenderer(width,height,options);}
return new core.CanvasRenderer(width,height,options);}});},{"./const":22,"./display/Container":23,"./display/DisplayObject":24,"./graphics/Graphics":25,"./graphics/GraphicsData":26,"./graphics/webgl/GraphicsRenderer":27,"./math":33,"./particles/ParticleContainer":39,"./particles/webgl/ParticleRenderer":41,"./renderers/canvas/CanvasRenderer":44,"./renderers/canvas/utils/CanvasBuffer":45,"./renderers/canvas/utils/CanvasGraphics":46,"./renderers/webgl/WebGLRenderer":49,"./renderers/webgl/filters/AbstractFilter":50,"./renderers/webgl/filters/FXAAFilter":51,"./renderers/webgl/filters/SpriteMaskFilter":52,"./renderers/webgl/managers/ShaderManager":56,"./renderers/webgl/managers/WebGLManager":58,"./renderers/webgl/shaders/ComplexPrimitiveShader":59,"./renderers/webgl/shaders/PrimitiveShader":60,"./renderers/webgl/shaders/Shader":61,"./renderers/webgl/shaders/TextureShader":62,"./renderers/webgl/utils/ObjectRenderer":63,"./renderers/webgl/utils/RenderTarget":65,"./sprites/Sprite":67,"./sprites/webgl/SpriteRenderer":68,"./text/Text":69,"./textures/BaseTexture":70,"./textures/RenderTexture":71,"./textures/Texture":72,"./textures/TextureUvs":73,"./textures/VideoBaseTexture":74,"./ticker":76,"./utils":77}],30:[function(require,module,exports){var ux=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1];var uy=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1];var vx=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1];var vy=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1];var tempMatrices=[];var Matrix=require('./Matrix');var mul=[];function signum(x){if(x<0){return-1;}
if(x>0){return 1;}
return 0;}
function init(){for(var i=0;i<16;i++){var row=[];mul.push(row);for(var j=0;j<16;j++){var _ux=signum(ux[i]*ux[j]+vx[i]*uy[j]);var _uy=signum(uy[i]*ux[j]+vy[i]*uy[j]);var _vx=signum(ux[i]*vx[j]+vx[i]*vy[j]);var _vy=signum(uy[i]*vx[j]+vy[i]*vy[j]);for(var k=0;k<16;k++){if(ux[k]===_ux&&uy[k]===_uy&&vx[k]===_vx&&vy[k]===_vy){row.push(k);break;}}}}
for(i=0;i<16;i++){var mat=new Matrix();mat.set(ux[i],uy[i],vx[i],vy[i],0,0);tempMatrices.push(mat);}}
init();var GroupD8={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MIRROR_HORIZONTAL:12,uX:function(ind){return ux[ind];},uY:function(ind){return uy[ind];},vX:function(ind){return vx[ind];},vY:function(ind){return vy[ind];},inv:function(rotation){if(rotation&8){return rotation&15;}
return(-rotation)&7;},add:function(rotationSecond,rotationFirst){return mul[rotationSecond][rotationFirst];},sub:function(rotationSecond,rotationFirst){return mul[rotationSecond][GroupD8.inv(rotationFirst)];},rotate180:function(rotation){return rotation^4;},isSwapWidthHeight:function(rotation){return(rotation&3)===2;},byDirection:function(dx,dy){if(Math.abs(dx)*2<=Math.abs(dy)){if(dy>=0){return GroupD8.S;}
else{return GroupD8.N;}}else if(Math.abs(dy)*2<=Math.abs(dx)){if(dx>0){return GroupD8.E;}
else{return GroupD8.W;}}else{if(dy>0){if(dx>0){return GroupD8.SE;}
else{return GroupD8.SW;}}
else if(dx>0){return GroupD8.NE;}
else{return GroupD8.NW;}}},matrixAppendRotationInv:function(matrix,rotation,tx,ty){var mat=tempMatrices[GroupD8.inv(rotation)];tx=tx||0;ty=ty||0;mat.tx=tx;mat.ty=ty;matrix.append(mat);}};module.exports=GroupD8;},{"./Matrix":31}],31:[function(require,module,exports){var Point=require('./Point');function Matrix()
{this.a=1;this.b=0;this.c=0;this.d=1;this.tx=0;this.ty=0;}
Matrix.prototype.constructor=Matrix;module.exports=Matrix;Matrix.prototype.fromArray=function(array)
{this.a=array[0];this.b=array[1];this.c=array[3];this.d=array[4];this.tx=array[2];this.ty=array[5];};Matrix.prototype.set=function(a,b,c,d,tx,ty)
{this.a=a;this.b=b;this.c=c;this.d=d;this.tx=tx;this.ty=ty;return this;};Matrix.prototype.toArray=function(transpose,out)
{if(!this.array)
{this.array=new Float32Array(9);}
var array=out||this.array;if(transpose)
{array[0]=this.a;array[1]=this.b;array[2]=0;array[3]=this.c;array[4]=this.d;array[5]=0;array[6]=this.tx;array[7]=this.ty;array[8]=1;}
else
{array[0]=this.a;array[1]=this.c;array[2]=this.tx;array[3]=this.b;array[4]=this.d;array[5]=this.ty;array[6]=0;array[7]=0;array[8]=1;}
return array;};Matrix.prototype.apply=function(pos,newPos)
{newPos=newPos||new Point();var x=pos.x;var y=pos.y;newPos.x=this.a*x+this.c*y+this.tx;newPos.y=this.b*x+this.d*y+this.ty;return newPos;};Matrix.prototype.applyInverse=function(pos,newPos)
{newPos=newPos||new Point();var id=1/(this.a*this.d+this.c*-this.b);var x=pos.x;var y=pos.y;newPos.x=this.d*id*x+-this.c*id*y+(this.ty*this.c-this.tx*this.d)*id;newPos.y=this.a*id*y+-this.b*id*x+(-this.ty*this.a+this.tx*this.b)*id;return newPos;};Matrix.prototype.translate=function(x,y)
{this.tx+=x;this.ty+=y;return this;};Matrix.prototype.scale=function(x,y)
{this.a*=x;this.d*=y;this.c*=x;this.b*=y;this.tx*=x;this.ty*=y;return this;};Matrix.prototype.rotate=function(angle)
{var cos=Math.cos(angle);var sin=Math.sin(angle);var a1=this.a;var c1=this.c;var tx1=this.tx;this.a=a1*cos-this.b*sin;this.b=a1*sin+this.b*cos;this.c=c1*cos-this.d*sin;this.d=c1*sin+this.d*cos;this.tx=tx1*cos-this.ty*sin;this.ty=tx1*sin+this.ty*cos;return this;};Matrix.prototype.append=function(matrix)
{var a1=this.a;var b1=this.b;var c1=this.c;var d1=this.d;this.a=matrix.a*a1+matrix.b*c1;this.b=matrix.a*b1+matrix.b*d1;this.c=matrix.c*a1+matrix.d*c1;this.d=matrix.c*b1+matrix.d*d1;this.tx=matrix.tx*a1+matrix.ty*c1+this.tx;this.ty=matrix.tx*b1+matrix.ty*d1+this.ty;return this;};Matrix.prototype.setTransform=function(x,y,pivotX,pivotY,scaleX,scaleY,rotation,skewX,skewY)
{var a,b,c,d,sr,cr,cy,sy,nsx,cx;sr=Math.sin(rotation);cr=Math.cos(rotation);cy=Math.cos(skewY);sy=Math.sin(skewY);nsx=-Math.sin(skewX);cx=Math.cos(skewX);a=cr*scaleX;b=sr*scaleX;c=-sr*scaleY;d=cr*scaleY;this.a=cy*a+sy*c;this.b=cy*b+sy*d;this.c=nsx*a+cx*c;this.d=nsx*b+cx*d;this.tx=x+(pivotX*a+pivotY*c);this.ty=y+(pivotX*b+pivotY*d);return this;};Matrix.prototype.prepend=function(matrix)
{var tx1=this.tx;if(matrix.a!==1||matrix.b!==0||matrix.c!==0||matrix.d!==1)
{var a1=this.a;var c1=this.c;this.a=a1*matrix.a+this.b*matrix.c;this.b=a1*matrix.b+this.b*matrix.d;this.c=c1*matrix.a+this.d*matrix.c;this.d=c1*matrix.b+this.d*matrix.d;}
this.tx=tx1*matrix.a+this.ty*matrix.c+matrix.tx;this.ty=tx1*matrix.b+this.ty*matrix.d+matrix.ty;return this;};Matrix.prototype.invert=function()
{var a1=this.a;var b1=this.b;var c1=this.c;var d1=this.d;var tx1=this.tx;var n=a1*d1-b1*c1;this.a=d1/n;this.b=-b1/n;this.c=-c1/n;this.d=a1/n;this.tx=(c1*this.ty-d1*tx1)/n;this.ty=-(a1*this.ty-b1*tx1)/n;return this;};Matrix.prototype.identity=function()
{this.a=1;this.b=0;this.c=0;this.d=1;this.tx=0;this.ty=0;return this;};Matrix.prototype.clone=function()
{var matrix=new Matrix();matrix.a=this.a;matrix.b=this.b;matrix.c=this.c;matrix.d=this.d;matrix.tx=this.tx;matrix.ty=this.ty;return matrix;};Matrix.prototype.copy=function(matrix)
{matrix.a=this.a;matrix.b=this.b;matrix.c=this.c;matrix.d=this.d;matrix.tx=this.tx;matrix.ty=this.ty;return matrix;};Matrix.IDENTITY=new Matrix();Matrix.TEMP_MATRIX=new Matrix();},{"./Point":32}],32:[function(require,module,exports){function Point(x,y)
{this.x=x||0;this.y=y||0;}
Point.prototype.constructor=Point;module.exports=Point;Point.prototype.clone=function()
{return new Point(this.x,this.y);};Point.prototype.copy=function(p){this.set(p.x,p.y);};Point.prototype.equals=function(p){return(p.x===this.x)&&(p.y===this.y);};Point.prototype.set=function(x,y)
{this.x=x||0;this.y=y||((y!==0)?this.x:0);};},{}],33:[function(require,module,exports){module.exports={Point:require('./Point'),Matrix:require('./Matrix'),GroupD8:require('./GroupD8'),Circle:require('./shapes/Circle'),Ellipse:require('./shapes/Ellipse'),Polygon:require('./shapes/Polygon'),Rectangle:require('./shapes/Rectangle'),RoundedRectangle:require('./shapes/RoundedRectangle')};},{"./GroupD8":30,"./Matrix":31,"./Point":32,"./shapes/Circle":34,"./shapes/Ellipse":35,"./shapes/Polygon":36,"./shapes/Rectangle":37,"./shapes/RoundedRectangle":38}],34:[function(require,module,exports){var Rectangle=require('./Rectangle'),CONST=require('../../const');function Circle(x,y,radius)
{this.x=x||0;this.y=y||0;this.radius=radius||0;this.type=CONST.SHAPES.CIRC;}
Circle.prototype.constructor=Circle;module.exports=Circle;Circle.prototype.clone=function()
{return new Circle(this.x,this.y,this.radius);};Circle.prototype.contains=function(x,y)
{if(this.radius<=0)
{return false;}
var dx=(this.x-x),dy=(this.y-y),r2=this.radius*this.radius;dx*=dx;dy*=dy;return(dx+dy<=r2);};Circle.prototype.getBounds=function()
{return new Rectangle(this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);};},{"../../const":22,"./Rectangle":37}],35:[function(require,module,exports){var Rectangle=require('./Rectangle'),CONST=require('../../const');function Ellipse(x,y,width,height)
{this.x=x||0;this.y=y||0;this.width=width||0;this.height=height||0;this.type=CONST.SHAPES.ELIP;}
Ellipse.prototype.constructor=Ellipse;module.exports=Ellipse;Ellipse.prototype.clone=function()
{return new Ellipse(this.x,this.y,this.width,this.height);};Ellipse.prototype.contains=function(x,y)
{if(this.width<=0||this.height<=0)
{return false;}
var normx=((x-this.x)/this.width),normy=((y-this.y)/this.height);normx*=normx;normy*=normy;return(normx+normy<=1);};Ellipse.prototype.getBounds=function()
{return new Rectangle(this.x-this.width,this.y-this.height,this.width,this.height);};},{"../../const":22,"./Rectangle":37}],36:[function(require,module,exports){var Point=require('../Point'),CONST=require('../../const');function Polygon(points_)
{var points=points_;if(!Array.isArray(points))
{points=[];points.length=arguments.length;for(var a=0;a<points.length;++a){points[a]=arguments[a];}}
if(points[0]instanceof Point)
{var p=[];for(var i=0,il=points.length;i<il;i++)
{p.push(points[i].x,points[i].y);}
points=p;}
this.closed=true;this.points=points;this.type=CONST.SHAPES.POLY;}
Polygon.prototype.constructor=Polygon;module.exports=Polygon;Polygon.prototype.clone=function()
{return new Polygon(this.points.slice());};Polygon.prototype.contains=function(x,y)
{var inside=false;var length=this.points.length/2;for(var i=0,j=length-1;i<length;j=i++)
{var xi=this.points[i*2],yi=this.points[i*2+1],xj=this.points[j*2],yj=this.points[j*2+1],intersect=((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi);if(intersect)
{inside=!inside;}}
return inside;};},{"../../const":22,"../Point":32}],37:[function(require,module,exports){var CONST=require('../../const');function Rectangle(x,y,width,height)
{this.x=x||0;this.y=y||0;this.width=width||0;this.height=height||0;this.type=CONST.SHAPES.RECT;}
Rectangle.prototype.constructor=Rectangle;module.exports=Rectangle;Rectangle.EMPTY=new Rectangle(0,0,0,0);Rectangle.prototype.clone=function()
{return new Rectangle(this.x,this.y,this.width,this.height);};Rectangle.prototype.contains=function(x,y)
{if(this.width<=0||this.height<=0)
{return false;}
if(x>=this.x&&x<this.x+this.width)
{if(y>=this.y&&y<this.y+this.height)
{return true;}}
return false;};},{"../../const":22}],38:[function(require,module,exports){var CONST=require('../../const');function RoundedRectangle(x,y,width,height,radius)
{this.x=x||0;this.y=y||0;this.width=width||0;this.height=height||0;this.radius=radius||20;this.type=CONST.SHAPES.RREC;}
RoundedRectangle.prototype.constructor=RoundedRectangle;module.exports=RoundedRectangle;RoundedRectangle.prototype.clone=function()
{return new RoundedRectangle(this.x,this.y,this.width,this.height,this.radius);};RoundedRectangle.prototype.contains=function(x,y)
{if(this.width<=0||this.height<=0)
{return false;}
if(x>=this.x&&x<=this.x+this.width)
{if(y>=this.y&&y<=this.y+this.height)
{return true;}}
return false;};},{"../../const":22}],39:[function(require,module,exports){var Container=require('../display/Container'),CONST=require('../const');function ParticleContainer(maxSize,properties,batchSize)
{Container.call(this);batchSize=batchSize||15000;maxSize=maxSize||15000;var maxBatchSize=16384;if(batchSize>maxBatchSize){batchSize=maxBatchSize;}
if(batchSize>maxSize){batchSize=maxSize;}
this._properties=[false,true,false,false,false];this._maxSize=maxSize;this._batchSize=batchSize;this._buffers=null;this._bufferToUpdate=0;this.interactiveChildren=false;this.blendMode=CONST.BLEND_MODES.NORMAL;this.roundPixels=true;this.setProperties(properties);}
ParticleContainer.prototype=Object.create(Container.prototype);ParticleContainer.prototype.constructor=ParticleContainer;module.exports=ParticleContainer;ParticleContainer.prototype.setProperties=function(properties)
{if(properties){this._properties[0]='scale'in properties?!!properties.scale:this._properties[0];this._properties[1]='position'in properties?!!properties.position:this._properties[1];this._properties[2]='rotation'in properties?!!properties.rotation:this._properties[2];this._properties[3]='uvs'in properties?!!properties.uvs:this._properties[3];this._properties[4]='alpha'in properties?!!properties.alpha:this._properties[4];}};ParticleContainer.prototype.updateTransform=function()
{this.displayObjectUpdateTransform();};ParticleContainer.prototype.renderWebGL=function(renderer)
{if(!this.visible||this.worldAlpha<=0||!this.children.length||!this.renderable)
{return;}
renderer.setObjectRenderer(renderer.plugins.particle);renderer.plugins.particle.render(this);};ParticleContainer.prototype.onChildrenChange=function(smallestChildIndex)
{var bufferIndex=Math.floor(smallestChildIndex/this._batchSize);if(bufferIndex<this._bufferToUpdate){this._bufferToUpdate=bufferIndex;}};ParticleContainer.prototype.renderCanvas=function(renderer)
{if(!this.visible||this.worldAlpha<=0||!this.children.length||!this.renderable)
{return;}
var context=renderer.context;var transform=this.worldTransform;var isRotated=true;var positionX=0;var positionY=0;var finalWidth=0;var finalHeight=0;var compositeOperation=renderer.blendModes[this.blendMode];if(compositeOperation!==context.globalCompositeOperation)
{context.globalCompositeOperation=compositeOperation;}
context.globalAlpha=this.worldAlpha;this.displayObjectUpdateTransform();for(var i=0;i<this.children.length;++i)
{var child=this.children[i];if(!child.visible)
{continue;}
var frame=child.texture.frame;context.globalAlpha=this.worldAlpha*child.alpha;if(child.rotation%(Math.PI*2)===0)
{if(isRotated)
{context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);isRotated=false;}
positionX=((child.anchor.x)*(-frame.width*child.scale.x)+child.position.x+0.5);positionY=((child.anchor.y)*(-frame.height*child.scale.y)+child.position.y+0.5);finalWidth=frame.width*child.scale.x;finalHeight=frame.height*child.scale.y;}
else
{if(!isRotated)
{isRotated=true;}
child.displayObjectUpdateTransform();var childTransform=child.worldTransform;if(renderer.roundPixels)
{context.setTransform(childTransform.a,childTransform.b,childTransform.c,childTransform.d,childTransform.tx|0,childTransform.ty|0);}
else
{context.setTransform(childTransform.a,childTransform.b,childTransform.c,childTransform.d,childTransform.tx,childTransform.ty);}
positionX=((child.anchor.x)*(-frame.width)+0.5);positionY=((child.anchor.y)*(-frame.height)+0.5);finalWidth=frame.width;finalHeight=frame.height;}
context.drawImage(child.texture.baseTexture.source,frame.x,frame.y,frame.width,frame.height,positionX,positionY,finalWidth,finalHeight);}};ParticleContainer.prototype.destroy=function(){Container.prototype.destroy.apply(this,arguments);if(this._buffers){for(var i=0;i<this._buffers.length;++i){this._buffers[i].destroy();}}
this._properties=null;this._buffers=null;};},{"../const":22,"../display/Container":23}],40:[function(require,module,exports){function ParticleBuffer(gl,properties,dynamicPropertyFlags,size)
{this.gl=gl;this.vertSize=2;this.vertByteSize=this.vertSize*4;this.size=size;this.dynamicProperties=[];this.staticProperties=[];for(var i=0;i<properties.length;i++)
{var property=properties[i];if(dynamicPropertyFlags[i])
{this.dynamicProperties.push(property);}
else
{this.staticProperties.push(property);}}
this.staticStride=0;this.staticBuffer=null;this.staticData=null;this.dynamicStride=0;this.dynamicBuffer=null;this.dynamicData=null;this.initBuffers();}
ParticleBuffer.prototype.constructor=ParticleBuffer;module.exports=ParticleBuffer;ParticleBuffer.prototype.initBuffers=function()
{var gl=this.gl;var i;var property;var dynamicOffset=0;this.dynamicStride=0;for(i=0;i<this.dynamicProperties.length;i++)
{property=this.dynamicProperties[i];property.offset=dynamicOffset;dynamicOffset+=property.size;this.dynamicStride+=property.size;}
this.dynamicData=new Float32Array(this.size*this.dynamicStride*4);this.dynamicBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.dynamicBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.dynamicData,gl.DYNAMIC_DRAW);var staticOffset=0;this.staticStride=0;for(i=0;i<this.staticProperties.length;i++)
{property=this.staticProperties[i];property.offset=staticOffset;staticOffset+=property.size;this.staticStride+=property.size;}
this.staticData=new Float32Array(this.size*this.staticStride*4);this.staticBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.staticBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.staticData,gl.DYNAMIC_DRAW);};ParticleBuffer.prototype.uploadDynamic=function(children,startIndex,amount)
{var gl=this.gl;for(var i=0;i<this.dynamicProperties.length;i++)
{var property=this.dynamicProperties[i];property.uploadFunction(children,startIndex,amount,this.dynamicData,this.dynamicStride,property.offset);}
gl.bindBuffer(gl.ARRAY_BUFFER,this.dynamicBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,this.dynamicData);};ParticleBuffer.prototype.uploadStatic=function(children,startIndex,amount)
{var gl=this.gl;for(var i=0;i<this.staticProperties.length;i++)
{var property=this.staticProperties[i];property.uploadFunction(children,startIndex,amount,this.staticData,this.staticStride,property.offset);}
gl.bindBuffer(gl.ARRAY_BUFFER,this.staticBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,this.staticData);};ParticleBuffer.prototype.bind=function()
{var gl=this.gl;var i,property;gl.bindBuffer(gl.ARRAY_BUFFER,this.dynamicBuffer);for(i=0;i<this.dynamicProperties.length;i++)
{property=this.dynamicProperties[i];gl.vertexAttribPointer(property.attribute,property.size,gl.FLOAT,false,this.dynamicStride*4,property.offset*4);}
gl.bindBuffer(gl.ARRAY_BUFFER,this.staticBuffer);for(i=0;i<this.staticProperties.length;i++)
{property=this.staticProperties[i];gl.vertexAttribPointer(property.attribute,property.size,gl.FLOAT,false,this.staticStride*4,property.offset*4);}};ParticleBuffer.prototype.destroy=function()
{this.dynamicProperties=null;this.dynamicData=null;this.gl.deleteBuffer(this.dynamicBuffer);this.staticProperties=null;this.staticData=null;this.gl.deleteBuffer(this.staticBuffer);};},{}],41:[function(require,module,exports){var ObjectRenderer=require('../../renderers/webgl/utils/ObjectRenderer'),WebGLRenderer=require('../../renderers/webgl/WebGLRenderer'),ParticleShader=require('./ParticleShader'),ParticleBuffer=require('./ParticleBuffer'),math=require('../../math');function ParticleRenderer(renderer)
{ObjectRenderer.call(this,renderer);var numIndices=98304;this.indices=new Uint16Array(numIndices);for(var i=0,j=0;i<numIndices;i+=6,j+=4)
{this.indices[i+0]=j+0;this.indices[i+1]=j+1;this.indices[i+2]=j+2;this.indices[i+3]=j+0;this.indices[i+4]=j+2;this.indices[i+5]=j+3;}
this.shader=null;this.indexBuffer=null;this.properties=null;this.tempMatrix=new math.Matrix();}
ParticleRenderer.prototype=Object.create(ObjectRenderer.prototype);ParticleRenderer.prototype.constructor=ParticleRenderer;module.exports=ParticleRenderer;WebGLRenderer.registerPlugin('particle',ParticleRenderer);ParticleRenderer.prototype.onContextChange=function()
{var gl=this.renderer.gl;this.shader=new ParticleShader(this.renderer.shaderManager);this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);this.properties=[{attribute:this.shader.attributes.aVertexPosition,size:2,uploadFunction:this.uploadVertices,offset:0},{attribute:this.shader.attributes.aPositionCoord,size:2,uploadFunction:this.uploadPosition,offset:0},{attribute:this.shader.attributes.aRotation,size:1,uploadFunction:this.uploadRotation,offset:0},{attribute:this.shader.attributes.aTextureCoord,size:2,uploadFunction:this.uploadUvs,offset:0},{attribute:this.shader.attributes.aColor,size:1,uploadFunction:this.uploadAlpha,offset:0}];};ParticleRenderer.prototype.start=function()
{var gl=this.renderer.gl;gl.activeTexture(gl.TEXTURE0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var shader=this.shader;this.renderer.shaderManager.setShader(shader);};ParticleRenderer.prototype.render=function(container)
{var children=container.children,totalChildren=children.length,maxSize=container._maxSize,batchSize=container._batchSize;if(totalChildren===0)
{return;}
else if(totalChildren>maxSize)
{totalChildren=maxSize;}
if(!container._buffers)
{container._buffers=this.generateBuffers(container);}
this.renderer.blendModeManager.setBlendMode(container.blendMode);var gl=this.renderer.gl;var m=container.worldTransform.copy(this.tempMatrix);m.prepend(this.renderer.currentRenderTarget.projectionMatrix);gl.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location,false,m.toArray(true));gl.uniform1f(this.shader.uniforms.uAlpha._location,container.worldAlpha);var baseTexture=children[0]._texture.baseTexture;if(!baseTexture._glTextures[gl.id])
{if(!this.renderer.updateTexture(baseTexture))
{return;}
if(!container._properties[0]||!container._properties[3])
{container._bufferToUpdate=0;}}
else
{gl.bindTexture(gl.TEXTURE_2D,baseTexture._glTextures[gl.id]);}
for(var i=0,j=0;i<totalChildren;i+=batchSize,j+=1)
{var amount=(totalChildren-i);if(amount>batchSize)
{amount=batchSize;}
var buffer=container._buffers[j];buffer.uploadDynamic(children,i,amount);if(container._bufferToUpdate===j)
{buffer.uploadStatic(children,i,amount);container._bufferToUpdate=j+1;}
buffer.bind(this.shader);gl.drawElements(gl.TRIANGLES,amount*6,gl.UNSIGNED_SHORT,0);this.renderer.drawCount++;}};ParticleRenderer.prototype.generateBuffers=function(container)
{var gl=this.renderer.gl,buffers=[],size=container._maxSize,batchSize=container._batchSize,dynamicPropertyFlags=container._properties,i;for(i=0;i<size;i+=batchSize)
{buffers.push(new ParticleBuffer(gl,this.properties,dynamicPropertyFlags,batchSize));}
return buffers;};ParticleRenderer.prototype.uploadVertices=function(children,startIndex,amount,array,stride,offset)
{var sprite,texture,trim,sx,sy,w0,w1,h0,h1;for(var i=0;i<amount;i++){sprite=children[startIndex+i];texture=sprite._texture;sx=sprite.scale.x;sy=sprite.scale.y;if(texture.trim)
{trim=texture.trim;w1=trim.x-sprite.anchor.x*trim.width;w0=w1+texture.crop.width;h1=trim.y-sprite.anchor.y*trim.height;h0=h1+texture.crop.height;}
else
{w0=(texture._frame.width)*(1-sprite.anchor.x);w1=(texture._frame.width)*-sprite.anchor.x;h0=texture._frame.height*(1-sprite.anchor.y);h1=texture._frame.height*-sprite.anchor.y;}
array[offset]=w1*sx;array[offset+1]=h1*sy;array[offset+stride]=w0*sx;array[offset+stride+1]=h1*sy;array[offset+stride*2]=w0*sx;array[offset+stride*2+1]=h0*sy;array[offset+stride*3]=w1*sx;array[offset+stride*3+1]=h0*sy;offset+=stride*4;}};ParticleRenderer.prototype.uploadPosition=function(children,startIndex,amount,array,stride,offset)
{for(var i=0;i<amount;i++)
{var spritePosition=children[startIndex+i].position;array[offset]=spritePosition.x;array[offset+1]=spritePosition.y;array[offset+stride]=spritePosition.x;array[offset+stride+1]=spritePosition.y;array[offset+stride*2]=spritePosition.x;array[offset+stride*2+1]=spritePosition.y;array[offset+stride*3]=spritePosition.x;array[offset+stride*3+1]=spritePosition.y;offset+=stride*4;}};ParticleRenderer.prototype.uploadRotation=function(children,startIndex,amount,array,stride,offset)
{for(var i=0;i<amount;i++)
{var spriteRotation=children[startIndex+i].rotation;array[offset]=spriteRotation;array[offset+stride]=spriteRotation;array[offset+stride*2]=spriteRotation;array[offset+stride*3]=spriteRotation;offset+=stride*4;}};ParticleRenderer.prototype.uploadUvs=function(children,startIndex,amount,array,stride,offset)
{for(var i=0;i<amount;i++)
{var textureUvs=children[startIndex+i]._texture._uvs;if(textureUvs)
{array[offset]=textureUvs.x0;array[offset+1]=textureUvs.y0;array[offset+stride]=textureUvs.x1;array[offset+stride+1]=textureUvs.y1;array[offset+stride*2]=textureUvs.x2;array[offset+stride*2+1]=textureUvs.y2;array[offset+stride*3]=textureUvs.x3;array[offset+stride*3+1]=textureUvs.y3;offset+=stride*4;}
else
{array[offset]=0;array[offset+1]=0;array[offset+stride]=0;array[offset+stride+1]=0;array[offset+stride*2]=0;array[offset+stride*2+1]=0;array[offset+stride*3]=0;array[offset+stride*3+1]=0;offset+=stride*4;}}};ParticleRenderer.prototype.uploadAlpha=function(children,startIndex,amount,array,stride,offset)
{for(var i=0;i<amount;i++)
{var spriteAlpha=children[startIndex+i].alpha;array[offset]=spriteAlpha;array[offset+stride]=spriteAlpha;array[offset+stride*2]=spriteAlpha;array[offset+stride*3]=spriteAlpha;offset+=stride*4;}};ParticleRenderer.prototype.destroy=function()
{if(this.renderer.gl){this.renderer.gl.deleteBuffer(this.indexBuffer);}
ObjectRenderer.prototype.destroy.apply(this,arguments);this.shader.destroy();this.indices=null;this.tempMatrix=null;};},{"../../math":33,"../../renderers/webgl/WebGLRenderer":49,"../../renderers/webgl/utils/ObjectRenderer":63,"./ParticleBuffer":40,"./ParticleShader":42}],42:[function(require,module,exports){var TextureShader=require('../../renderers/webgl/shaders/TextureShader');function ParticleShader(shaderManager)
{TextureShader.call(this,shaderManager,['attribute vec2 aVertexPosition;','attribute vec2 aTextureCoord;','attribute float aColor;','attribute vec2 aPositionCoord;','attribute vec2 aScale;','attribute float aRotation;','uniform mat3 projectionMatrix;','varying vec2 vTextureCoord;','varying float vColor;','void main(void){','   vec2 v = aVertexPosition;','   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);','   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);','   v = v + aPositionCoord;','   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);','   vTextureCoord = aTextureCoord;','   vColor = aColor;','}'].join('\n'),['precision lowp float;','varying vec2 vTextureCoord;','varying float vColor;','uniform sampler2D uSampler;','uniform float uAlpha;','void main(void){','  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;','  if (color.a == 0.0) discard;','  gl_FragColor = color;','}'].join('\n'),{uAlpha:{type:'1f',value:1}},{aPositionCoord:0,aRotation:0});}
ParticleShader.prototype=Object.create(TextureShader.prototype);ParticleShader.prototype.constructor=ParticleShader;module.exports=ParticleShader;},{"../../renderers/webgl/shaders/TextureShader":62}],43:[function(require,module,exports){var utils=require('../utils'),math=require('../math'),CONST=require('../const'),EventEmitter=require('eventemitter3');function SystemRenderer(system,width,height,options)
{EventEmitter.call(this);utils.sayHello(system);if(options)
{for(var i in CONST.DEFAULT_RENDER_OPTIONS)
{if(typeof options[i]==='undefined')
{options[i]=CONST.DEFAULT_RENDER_OPTIONS[i];}}}
else
{options=CONST.DEFAULT_RENDER_OPTIONS;}
this.type=CONST.RENDERER_TYPE.UNKNOWN;this.width=width||800;this.height=height||600;this.view=options.view||document.createElement('canvas');this.resolution=options.resolution;this.transparent=options.transparent;this.autoResize=options.autoResize||false;this.blendModes=null;this.preserveDrawingBuffer=options.preserveDrawingBuffer;this.clearBeforeRender=options.clearBeforeRender;this.roundPixels=options.roundPixels;this._backgroundColor=0x000000;this._backgroundColorRgb=[0,0,0];this._backgroundColorString='#000000';this.backgroundColor=options.backgroundColor||this._backgroundColor;this._tempDisplayObjectParent={worldTransform:new math.Matrix(),worldAlpha:1,children:[]};this._lastObjectRendered=this._tempDisplayObjectParent;}
SystemRenderer.prototype=Object.create(EventEmitter.prototype);SystemRenderer.prototype.constructor=SystemRenderer;module.exports=SystemRenderer;Object.defineProperties(SystemRenderer.prototype,{backgroundColor:{get:function()
{return this._backgroundColor;},set:function(val)
{this._backgroundColor=val;this._backgroundColorString=utils.hex2string(val);utils.hex2rgb(val,this._backgroundColorRgb);}}});SystemRenderer.prototype.resize=function(width,height){this.width=width*this.resolution;this.height=height*this.resolution;this.view.width=this.width;this.view.height=this.height;if(this.autoResize)
{this.view.style.width=this.width/this.resolution+'px';this.view.style.height=this.height/this.resolution+'px';}};SystemRenderer.prototype.destroy=function(removeView){if(removeView&&this.view.parentNode)
{this.view.parentNode.removeChild(this.view);}
this.type=CONST.RENDERER_TYPE.UNKNOWN;this.width=0;this.height=0;this.view=null;this.resolution=0;this.transparent=false;this.autoResize=false;this.blendModes=null;this.preserveDrawingBuffer=false;this.clearBeforeRender=false;this.roundPixels=false;this._backgroundColor=0;this._backgroundColorRgb=null;this._backgroundColorString=null;};},{"../const":22,"../math":33,"../utils":77,"eventemitter3":10}],44:[function(require,module,exports){var SystemRenderer=require('../SystemRenderer'),CanvasMaskManager=require('./utils/CanvasMaskManager'),utils=require('../../utils'),math=require('../../math'),CONST=require('../../const');function CanvasRenderer(width,height,options)
{options=options||{};SystemRenderer.call(this,'Canvas',width,height,options);this.type=CONST.RENDERER_TYPE.CANVAS;this.context=this.view.getContext('2d',{alpha:this.transparent});this.refresh=true;this.maskManager=new CanvasMaskManager();this.smoothProperty='imageSmoothingEnabled';if(!this.context.imageSmoothingEnabled)
{if(this.context.webkitImageSmoothingEnabled)
{this.smoothProperty='webkitImageSmoothingEnabled';}
else if(this.context.mozImageSmoothingEnabled)
{this.smoothProperty='mozImageSmoothingEnabled';}
else if(this.context.oImageSmoothingEnabled)
{this.smoothProperty='oImageSmoothingEnabled';}
else if(this.context.msImageSmoothingEnabled)
{this.smoothProperty='msImageSmoothingEnabled';}}
this.initPlugins();this._mapBlendModes();this._tempDisplayObjectParent={worldTransform:new math.Matrix(),worldAlpha:1};this.resize(width,height);}
CanvasRenderer.prototype=Object.create(SystemRenderer.prototype);CanvasRenderer.prototype.constructor=CanvasRenderer;module.exports=CanvasRenderer;utils.pluginTarget.mixin(CanvasRenderer);CanvasRenderer.prototype.render=function(object)
{this.emit('prerender');var cacheParent=object.parent;this._lastObjectRendered=object;object.parent=this._tempDisplayObjectParent;object.updateTransform();object.parent=cacheParent;this.context.setTransform(1,0,0,1,0,0);this.context.globalAlpha=1;this.context.globalCompositeOperation=this.blendModes[CONST.BLEND_MODES.NORMAL];if(navigator.isCocoonJS&&this.view.screencanvas)
{this.context.fillStyle='black';this.context.clear();}
if(this.clearBeforeRender)
{if(this.transparent)
{this.context.clearRect(0,0,this.width,this.height);}
else
{this.context.fillStyle=this._backgroundColorString;this.context.fillRect(0,0,this.width,this.height);}}
this.renderDisplayObject(object,this.context);this.emit('postrender');};CanvasRenderer.prototype.destroy=function(removeView)
{this.destroyPlugins();SystemRenderer.prototype.destroy.call(this,removeView);this.context=null;this.refresh=true;this.maskManager.destroy();this.maskManager=null;this.smoothProperty=null;};CanvasRenderer.prototype.renderDisplayObject=function(displayObject,context)
{var tempContext=this.context;this.context=context;displayObject.renderCanvas(this);this.context=tempContext;};CanvasRenderer.prototype.resize=function(w,h)
{SystemRenderer.prototype.resize.call(this,w,h);if(this.smoothProperty)
{this.context[this.smoothProperty]=(CONST.SCALE_MODES.DEFAULT===CONST.SCALE_MODES.LINEAR);}};CanvasRenderer.prototype._mapBlendModes=function()
{if(!this.blendModes)
{this.blendModes={};if(utils.canUseNewCanvasBlendModes())
{this.blendModes[CONST.BLEND_MODES.NORMAL]='source-over';this.blendModes[CONST.BLEND_MODES.ADD]='lighter';this.blendModes[CONST.BLEND_MODES.MULTIPLY]='multiply';this.blendModes[CONST.BLEND_MODES.SCREEN]='screen';this.blendModes[CONST.BLEND_MODES.OVERLAY]='overlay';this.blendModes[CONST.BLEND_MODES.DARKEN]='darken';this.blendModes[CONST.BLEND_MODES.LIGHTEN]='lighten';this.blendModes[CONST.BLEND_MODES.COLOR_DODGE]='color-dodge';this.blendModes[CONST.BLEND_MODES.COLOR_BURN]='color-burn';this.blendModes[CONST.BLEND_MODES.HARD_LIGHT]='hard-light';this.blendModes[CONST.BLEND_MODES.SOFT_LIGHT]='soft-light';this.blendModes[CONST.BLEND_MODES.DIFFERENCE]='difference';this.blendModes[CONST.BLEND_MODES.EXCLUSION]='exclusion';this.blendModes[CONST.BLEND_MODES.HUE]='hue';this.blendModes[CONST.BLEND_MODES.SATURATION]='saturate';this.blendModes[CONST.BLEND_MODES.COLOR]='color';this.blendModes[CONST.BLEND_MODES.LUMINOSITY]='luminosity';}
else
{this.blendModes[CONST.BLEND_MODES.NORMAL]='source-over';this.blendModes[CONST.BLEND_MODES.ADD]='lighter';this.blendModes[CONST.BLEND_MODES.MULTIPLY]='source-over';this.blendModes[CONST.BLEND_MODES.SCREEN]='source-over';this.blendModes[CONST.BLEND_MODES.OVERLAY]='source-over';this.blendModes[CONST.BLEND_MODES.DARKEN]='source-over';this.blendModes[CONST.BLEND_MODES.LIGHTEN]='source-over';this.blendModes[CONST.BLEND_MODES.COLOR_DODGE]='source-over';this.blendModes[CONST.BLEND_MODES.COLOR_BURN]='source-over';this.blendModes[CONST.BLEND_MODES.HARD_LIGHT]='source-over';this.blendModes[CONST.BLEND_MODES.SOFT_LIGHT]='source-over';this.blendModes[CONST.BLEND_MODES.DIFFERENCE]='source-over';this.blendModes[CONST.BLEND_MODES.EXCLUSION]='source-over';this.blendModes[CONST.BLEND_MODES.HUE]='source-over';this.blendModes[CONST.BLEND_MODES.SATURATION]='source-over';this.blendModes[CONST.BLEND_MODES.COLOR]='source-over';this.blendModes[CONST.BLEND_MODES.LUMINOSITY]='source-over';}}};},{"../../const":22,"../../math":33,"../../utils":77,"../SystemRenderer":43,"./utils/CanvasMaskManager":47}],45:[function(require,module,exports){function CanvasBuffer(width,height)
{this.canvas=document.createElement('canvas');this.context=this.canvas.getContext('2d');this.canvas.width=width;this.canvas.height=height;}
CanvasBuffer.prototype.constructor=CanvasBuffer;module.exports=CanvasBuffer;Object.defineProperties(CanvasBuffer.prototype,{width:{get:function()
{return this.canvas.width;},set:function(val)
{this.canvas.width=val;}},height:{get:function()
{return this.canvas.height;},set:function(val)
{this.canvas.height=val;}}});CanvasBuffer.prototype.clear=function()
{this.context.setTransform(1,0,0,1,0,0);this.context.clearRect(0,0,this.canvas.width,this.canvas.height);};CanvasBuffer.prototype.resize=function(width,height)
{this.canvas.width=width;this.canvas.height=height;};CanvasBuffer.prototype.destroy=function()
{this.context=null;this.canvas=null;};},{}],46:[function(require,module,exports){var CONST=require('../../../const');var CanvasGraphics={};module.exports=CanvasGraphics;CanvasGraphics.renderGraphics=function(graphics,context)
{var worldAlpha=graphics.worldAlpha;if(graphics.dirty)
{this.updateGraphicsTint(graphics);graphics.dirty=false;}
for(var i=0;i<graphics.graphicsData.length;i++)
{var data=graphics.graphicsData[i];var shape=data.shape;var fillColor=data._fillTint;var lineColor=data._lineTint;context.lineWidth=data.lineWidth;if(data.type===CONST.SHAPES.POLY)
{context.beginPath();var points=shape.points;context.moveTo(points[0],points[1]);for(var j=1;j<points.length/2;j++)
{context.lineTo(points[j*2],points[j*2+1]);}
if(shape.closed)
{context.lineTo(points[0],points[1]);}
if(points[0]===points[points.length-2]&&points[1]===points[points.length-1])
{context.closePath();}
if(data.fill)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle='#'+('00000'+(fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.strokeStyle='#'+('00000'+(lineColor|0).toString(16)).substr(-6);context.stroke();}}
else if(data.type===CONST.SHAPES.RECT)
{if(data.fillColor||data.fillColor===0)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle='#'+('00000'+(fillColor|0).toString(16)).substr(-6);context.fillRect(shape.x,shape.y,shape.width,shape.height);}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.strokeStyle='#'+('00000'+(lineColor|0).toString(16)).substr(-6);context.strokeRect(shape.x,shape.y,shape.width,shape.height);}}
else if(data.type===CONST.SHAPES.CIRC)
{context.beginPath();context.arc(shape.x,shape.y,shape.radius,0,2*Math.PI);context.closePath();if(data.fill)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle='#'+('00000'+(fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.strokeStyle='#'+('00000'+(lineColor|0).toString(16)).substr(-6);context.stroke();}}
else if(data.type===CONST.SHAPES.ELIP)
{var w=shape.width*2;var h=shape.height*2;var x=shape.x-w/2;var y=shape.y-h/2;context.beginPath();var kappa=0.5522848,ox=(w/2)*kappa,oy=(h/2)*kappa,xe=x+w,ye=y+h,xm=x+w/2,ym=y+h/2;context.moveTo(x,ym);context.bezierCurveTo(x,ym-oy,xm-ox,y,xm,y);context.bezierCurveTo(xm+ox,y,xe,ym-oy,xe,ym);context.bezierCurveTo(xe,ym+oy,xm+ox,ye,xm,ye);context.bezierCurveTo(xm-ox,ye,x,ym+oy,x,ym);context.closePath();if(data.fill)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle='#'+('00000'+(fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.strokeStyle='#'+('00000'+(lineColor|0).toString(16)).substr(-6);context.stroke();}}
else if(data.type===CONST.SHAPES.RREC)
{var rx=shape.x;var ry=shape.y;var width=shape.width;var height=shape.height;var radius=shape.radius;var maxRadius=Math.min(width,height)/2|0;radius=radius>maxRadius?maxRadius:radius;context.beginPath();context.moveTo(rx,ry+radius);context.lineTo(rx,ry+height-radius);context.quadraticCurveTo(rx,ry+height,rx+radius,ry+height);context.lineTo(rx+width-radius,ry+height);context.quadraticCurveTo(rx+width,ry+height,rx+width,ry+height-radius);context.lineTo(rx+width,ry+radius);context.quadraticCurveTo(rx+width,ry,rx+width-radius,ry);context.lineTo(rx+radius,ry);context.quadraticCurveTo(rx,ry,rx,ry+radius);context.closePath();if(data.fillColor||data.fillColor===0)
{context.globalAlpha=data.fillAlpha*worldAlpha;context.fillStyle='#'+('00000'+(fillColor|0).toString(16)).substr(-6);context.fill();}
if(data.lineWidth)
{context.globalAlpha=data.lineAlpha*worldAlpha;context.strokeStyle='#'+('00000'+(lineColor|0).toString(16)).substr(-6);context.stroke();}}}};CanvasGraphics.renderGraphicsMask=function(graphics,context)
{var len=graphics.graphicsData.length;if(len===0)
{return;}
context.beginPath();for(var i=0;i<len;i++)
{var data=graphics.graphicsData[i];var shape=data.shape;if(data.type===CONST.SHAPES.POLY)
{var points=shape.points;context.moveTo(points[0],points[1]);for(var j=1;j<points.length/2;j++)
{context.lineTo(points[j*2],points[j*2+1]);}
if(points[0]===points[points.length-2]&&points[1]===points[points.length-1])
{context.closePath();}}
else if(data.type===CONST.SHAPES.RECT)
{context.rect(shape.x,shape.y,shape.width,shape.height);context.closePath();}
else if(data.type===CONST.SHAPES.CIRC)
{context.arc(shape.x,shape.y,shape.radius,0,2*Math.PI);context.closePath();}
else if(data.type===CONST.SHAPES.ELIP)
{var w=shape.width*2;var h=shape.height*2;var x=shape.x-w/2;var y=shape.y-h/2;var kappa=0.5522848,ox=(w/2)*kappa,oy=(h/2)*kappa,xe=x+w,ye=y+h,xm=x+w/2,ym=y+h/2;context.moveTo(x,ym);context.bezierCurveTo(x,ym-oy,xm-ox,y,xm,y);context.bezierCurveTo(xm+ox,y,xe,ym-oy,xe,ym);context.bezierCurveTo(xe,ym+oy,xm+ox,ye,xm,ye);context.bezierCurveTo(xm-ox,ye,x,ym+oy,x,ym);context.closePath();}
else if(data.type===CONST.SHAPES.RREC)
{var rx=shape.x;var ry=shape.y;var width=shape.width;var height=shape.height;var radius=shape.radius;var maxRadius=Math.min(width,height)/2|0;radius=radius>maxRadius?maxRadius:radius;context.moveTo(rx,ry+radius);context.lineTo(rx,ry+height-radius);context.quadraticCurveTo(rx,ry+height,rx+radius,ry+height);context.lineTo(rx+width-radius,ry+height);context.quadraticCurveTo(rx+width,ry+height,rx+width,ry+height-radius);context.lineTo(rx+width,ry+radius);context.quadraticCurveTo(rx+width,ry,rx+width-radius,ry);context.lineTo(rx+radius,ry);context.quadraticCurveTo(rx,ry,rx,ry+radius);context.closePath();}}};CanvasGraphics.updateGraphicsTint=function(graphics)
{if(graphics.tint===0xFFFFFF&&graphics._prevTint===graphics.tint)
{return;}
graphics._prevTint=graphics.tint;var tintR=(graphics.tint>>16&0xFF)/255;var tintG=(graphics.tint>>8&0xFF)/255;var tintB=(graphics.tint&0xFF)/255;for(var i=0;i<graphics.graphicsData.length;i++)
{var data=graphics.graphicsData[i];var fillColor=data.fillColor|0;var lineColor=data.lineColor|0;data._fillTint=(((fillColor>>16&0xFF)/255*tintR*255<<16)+((fillColor>>8&0xFF)/255*tintG*255<<8)+(fillColor&0xFF)/255*tintB*255);data._lineTint=(((lineColor>>16&0xFF)/255*tintR*255<<16)+((lineColor>>8&0xFF)/255*tintG*255<<8)+(lineColor&0xFF)/255*tintB*255);}};},{"../../../const":22}],47:[function(require,module,exports){var CanvasGraphics=require('./CanvasGraphics');function CanvasMaskManager()
{}
CanvasMaskManager.prototype.constructor=CanvasMaskManager;module.exports=CanvasMaskManager;CanvasMaskManager.prototype.pushMask=function(maskData,renderer)
{renderer.context.save();var cacheAlpha=maskData.alpha;var transform=maskData.worldTransform;var resolution=renderer.resolution;renderer.context.setTransform(transform.a*resolution,transform.b*resolution,transform.c*resolution,transform.d*resolution,transform.tx*resolution,transform.ty*resolution);if(!maskData.texture)
{CanvasGraphics.renderGraphicsMask(maskData,renderer.context);renderer.context.clip();}
maskData.worldAlpha=cacheAlpha;};CanvasMaskManager.prototype.popMask=function(renderer)
{renderer.context.restore();};CanvasMaskManager.prototype.destroy=function(){};},{"./CanvasGraphics":46}],48:[function(require,module,exports){var utils=require('../../../utils');var CanvasTinter={};module.exports=CanvasTinter;CanvasTinter.getTintedTexture=function(sprite,color)
{var texture=sprite.texture;color=CanvasTinter.roundColor(color);var stringColor='#'+('00000'+(color|0).toString(16)).substr(-6);texture.tintCache=texture.tintCache||{};if(texture.tintCache[stringColor])
{return texture.tintCache[stringColor];}
var canvas=CanvasTinter.canvas||document.createElement('canvas');CanvasTinter.tintMethod(texture,color,canvas);if(CanvasTinter.convertTintToImage)
{var tintImage=new Image();tintImage.src=canvas.toDataURL();texture.tintCache[stringColor]=tintImage;}
else
{texture.tintCache[stringColor]=canvas;CanvasTinter.canvas=null;}
return canvas;};CanvasTinter.tintWithMultiply=function(texture,color,canvas)
{var context=canvas.getContext('2d');var resolution=texture.baseTexture.resolution;var crop=texture.crop.clone();crop.x*=resolution;crop.y*=resolution;crop.width*=resolution;crop.height*=resolution;canvas.width=crop.width;canvas.height=crop.height;context.fillStyle='#'+('00000'+(color|0).toString(16)).substr(-6);context.fillRect(0,0,crop.width,crop.height);context.globalCompositeOperation='multiply';context.drawImage(texture.baseTexture.source,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);context.globalCompositeOperation='destination-atop';context.drawImage(texture.baseTexture.source,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);};CanvasTinter.tintWithOverlay=function(texture,color,canvas)
{var context=canvas.getContext('2d');var resolution=texture.baseTexture.resolution;var crop=texture.crop.clone();crop.x*=resolution;crop.y*=resolution;crop.width*=resolution;crop.height*=resolution;canvas.width=crop.width;canvas.height=crop.height;context.globalCompositeOperation='copy';context.fillStyle='#'+('00000'+(color|0).toString(16)).substr(-6);context.fillRect(0,0,crop.width,crop.height);context.globalCompositeOperation='destination-atop';context.drawImage(texture.baseTexture.source,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);};CanvasTinter.tintWithPerPixel=function(texture,color,canvas)
{var context=canvas.getContext('2d');var resolution=texture.baseTexture.resolution;var crop=texture.crop.clone();crop.x*=resolution;crop.y*=resolution;crop.width*=resolution;crop.height*=resolution;canvas.width=crop.width;canvas.height=crop.height;context.globalCompositeOperation='copy';context.drawImage(texture.baseTexture.source,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);var rgbValues=utils.hex2rgb(color);var r=rgbValues[0],g=rgbValues[1],b=rgbValues[2];var pixelData=context.getImageData(0,0,crop.width,crop.height);var pixels=pixelData.data;for(var i=0;i<pixels.length;i+=4)
{pixels[i+0]*=r;pixels[i+1]*=g;pixels[i+2]*=b;}
context.putImageData(pixelData,0,0);};CanvasTinter.roundColor=function(color)
{var step=CanvasTinter.cacheStepsPerColorChannel;var rgbValues=utils.hex2rgb(color);rgbValues[0]=Math.min(255,(rgbValues[0]/step)*step);rgbValues[1]=Math.min(255,(rgbValues[1]/step)*step);rgbValues[2]=Math.min(255,(rgbValues[2]/step)*step);return utils.rgb2hex(rgbValues);};CanvasTinter.cacheStepsPerColorChannel=8;CanvasTinter.convertTintToImage=false;CanvasTinter.canUseMultiply=utils.canUseNewCanvasBlendModes();CanvasTinter.tintMethod=CanvasTinter.canUseMultiply?CanvasTinter.tintWithMultiply:CanvasTinter.tintWithPerPixel;},{"../../../utils":77}],49:[function(require,module,exports){var SystemRenderer=require('../SystemRenderer'),ShaderManager=require('./managers/ShaderManager'),MaskManager=require('./managers/MaskManager'),StencilManager=require('./managers/StencilManager'),FilterManager=require('./managers/FilterManager'),BlendModeManager=require('./managers/BlendModeManager'),RenderTarget=require('./utils/RenderTarget'),ObjectRenderer=require('./utils/ObjectRenderer'),FXAAFilter=require('./filters/FXAAFilter'),utils=require('../../utils'),CONST=require('../../const');function WebGLRenderer(width,height,options)
{options=options||{};SystemRenderer.call(this,'WebGL',width,height,options);this.type=CONST.RENDERER_TYPE.WEBGL;this.handleContextLost=this.handleContextLost.bind(this);this.handleContextRestored=this.handleContextRestored.bind(this);this.view.addEventListener('webglcontextlost',this.handleContextLost,false);this.view.addEventListener('webglcontextrestored',this.handleContextRestored,false);this._useFXAA=!!options.forceFXAA&&options.antialias;this._FXAAFilter=null;this._contextOptions={alpha:this.transparent,antialias:options.antialias,premultipliedAlpha:this.transparent&&this.transparent!=='notMultiplied',stencil:true,preserveDrawingBuffer:options.preserveDrawingBuffer};this.drawCount=0;this.shaderManager=new ShaderManager(this);this.maskManager=new MaskManager(this);this.stencilManager=new StencilManager(this);this.filterManager=new FilterManager(this);this.blendModeManager=new BlendModeManager(this);this.currentRenderTarget=null;this.currentRenderer=new ObjectRenderer(this);this.initPlugins();this._createContext();this._initContext();this._mapGlModes();this._managedTextures=[];this._renderTargetStack=[];}
WebGLRenderer.prototype=Object.create(SystemRenderer.prototype);WebGLRenderer.prototype.constructor=WebGLRenderer;module.exports=WebGLRenderer;utils.pluginTarget.mixin(WebGLRenderer);WebGLRenderer.glContextId=0;WebGLRenderer.prototype._createContext=function(){var gl=this.view.getContext('webgl',this._contextOptions)||this.view.getContext('experimental-webgl',this._contextOptions);this.gl=gl;if(!gl)
{throw new Error('This browser does not support webGL. Try using the canvas renderer');}
this.glContextId=WebGLRenderer.glContextId++;gl.id=this.glContextId;gl.renderer=this;};WebGLRenderer.prototype._initContext=function()
{var gl=this.gl;gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.enable(gl.BLEND);this.renderTarget=new RenderTarget(gl,this.width,this.height,null,this.resolution,true);this.setRenderTarget(this.renderTarget);this.emit('context',gl);this.resize(this.width,this.height);if(!this._useFXAA)
{this._useFXAA=(this._contextOptions.antialias&&!gl.getContextAttributes().antialias);}
if(this._useFXAA)
{window.console.warn('FXAA antialiasing being used instead of native antialiasing');this._FXAAFilter=[new FXAAFilter()];}};WebGLRenderer.prototype.render=function(object)
{this.emit('prerender');if(this.gl.isContextLost())
{return;}
this.drawCount=0;this._lastObjectRendered=object;if(this._useFXAA)
{this._FXAAFilter[0].uniforms.resolution.value.x=this.width;this._FXAAFilter[0].uniforms.resolution.value.y=this.height;object.filterArea=this.renderTarget.size;object.filters=this._FXAAFilter;}
var cacheParent=object.parent;object.parent=this._tempDisplayObjectParent;object.updateTransform();object.parent=cacheParent;var gl=this.gl;this.setRenderTarget(this.renderTarget);if(this.clearBeforeRender)
{if(this.transparent)
{gl.clearColor(0,0,0,0);}
else
{gl.clearColor(this._backgroundColorRgb[0],this._backgroundColorRgb[1],this._backgroundColorRgb[2],1);}
gl.clear(gl.COLOR_BUFFER_BIT);}
this.renderDisplayObject(object,this.renderTarget);this.emit('postrender');};WebGLRenderer.prototype.renderDisplayObject=function(displayObject,renderTarget,clear)
{this.setRenderTarget(renderTarget);if(clear)
{renderTarget.clear();}
this.filterManager.setFilterStack(renderTarget.filterStack);displayObject.renderWebGL(this);this.currentRenderer.flush();};WebGLRenderer.prototype.setObjectRenderer=function(objectRenderer)
{if(this.currentRenderer===objectRenderer)
{return;}
this.currentRenderer.stop();this.currentRenderer=objectRenderer;this.currentRenderer.start();};WebGLRenderer.prototype.setRenderTarget=function(renderTarget)
{if(this.currentRenderTarget===renderTarget)
{return;}
this.currentRenderTarget=renderTarget;this.currentRenderTarget.activate();this.stencilManager.setMaskStack(renderTarget.stencilMaskStack);};WebGLRenderer.prototype.resize=function(width,height)
{SystemRenderer.prototype.resize.call(this,width,height);this.filterManager.resize(width,height);this.renderTarget.resize(width,height);if(this.currentRenderTarget===this.renderTarget)
{this.renderTarget.activate();this.gl.viewport(0,0,this.width,this.height);}};WebGLRenderer.prototype.updateTexture=function(texture)
{texture=texture.baseTexture||texture;if(!texture.hasLoaded)
{return;}
var gl=this.gl;if(!texture._glTextures[gl.id])
{texture._glTextures[gl.id]=gl.createTexture();texture.on('update',this.updateTexture,this);texture.on('dispose',this.destroyTexture,this);this._managedTextures.push(texture);}
gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,texture.premultipliedAlpha);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,texture.source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,texture.scaleMode===CONST.SCALE_MODES.LINEAR?gl.LINEAR:gl.NEAREST);if(texture.mipmap&&texture.isPowerOfTwo)
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,texture.scaleMode===CONST.SCALE_MODES.LINEAR?gl.LINEAR_MIPMAP_LINEAR:gl.NEAREST_MIPMAP_NEAREST);gl.generateMipmap(gl.TEXTURE_2D);}
else
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,texture.scaleMode===CONST.SCALE_MODES.LINEAR?gl.LINEAR:gl.NEAREST);}
if(!texture.isPowerOfTwo)
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);}
else
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);}
return texture._glTextures[gl.id];};WebGLRenderer.prototype.destroyTexture=function(texture,_skipRemove)
{texture=texture.baseTexture||texture;if(!texture.hasLoaded)
{return;}
if(texture._glTextures[this.gl.id])
{this.gl.deleteTexture(texture._glTextures[this.gl.id]);delete texture._glTextures[this.gl.id];if(!_skipRemove)
{var i=this._managedTextures.indexOf(texture);if(i!==-1){utils.removeItems(this._managedTextures,i,1);}}}};WebGLRenderer.prototype.handleContextLost=function(event)
{event.preventDefault();};WebGLRenderer.prototype.handleContextRestored=function()
{this._initContext();for(var i=0;i<this._managedTextures.length;++i)
{var texture=this._managedTextures[i];if(texture._glTextures[this.gl.id])
{delete texture._glTextures[this.gl.id];}}};WebGLRenderer.prototype.destroy=function(removeView)
{this.destroyPlugins();this.view.removeEventListener('webglcontextlost',this.handleContextLost);this.view.removeEventListener('webglcontextrestored',this.handleContextRestored);for(var i=0;i<this._managedTextures.length;++i)
{var texture=this._managedTextures[i];this.destroyTexture(texture,true);texture.off('update',this.updateTexture,this);texture.off('dispose',this.destroyTexture,this);}
SystemRenderer.prototype.destroy.call(this,removeView);this.uid=0;this.shaderManager.destroy();this.maskManager.destroy();this.stencilManager.destroy();this.filterManager.destroy();this.blendModeManager.destroy();this.shaderManager=null;this.maskManager=null;this.filterManager=null;this.blendModeManager=null;this.currentRenderer=null;this.handleContextLost=null;this.handleContextRestored=null;this._contextOptions=null;this._managedTextures=null;this.drawCount=0;this.gl.useProgram(null);this.gl.flush();this.gl=null;};WebGLRenderer.prototype._mapGlModes=function()
{var gl=this.gl;if(!this.blendModes)
{this.blendModes={};this.blendModes[CONST.BLEND_MODES.NORMAL]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.ADD]=[gl.ONE,gl.DST_ALPHA];this.blendModes[CONST.BLEND_MODES.MULTIPLY]=[gl.DST_COLOR,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.SCREEN]=[gl.ONE,gl.ONE_MINUS_SRC_COLOR];this.blendModes[CONST.BLEND_MODES.OVERLAY]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.DARKEN]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.LIGHTEN]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.COLOR_DODGE]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.COLOR_BURN]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.HARD_LIGHT]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.SOFT_LIGHT]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.DIFFERENCE]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.EXCLUSION]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.HUE]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.SATURATION]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.COLOR]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];this.blendModes[CONST.BLEND_MODES.LUMINOSITY]=[gl.ONE,gl.ONE_MINUS_SRC_ALPHA];}
if(!this.drawModes)
{this.drawModes={};this.drawModes[CONST.DRAW_MODES.POINTS]=gl.POINTS;this.drawModes[CONST.DRAW_MODES.LINES]=gl.LINES;this.drawModes[CONST.DRAW_MODES.LINE_LOOP]=gl.LINE_LOOP;this.drawModes[CONST.DRAW_MODES.LINE_STRIP]=gl.LINE_STRIP;this.drawModes[CONST.DRAW_MODES.TRIANGLES]=gl.TRIANGLES;this.drawModes[CONST.DRAW_MODES.TRIANGLE_STRIP]=gl.TRIANGLE_STRIP;this.drawModes[CONST.DRAW_MODES.TRIANGLE_FAN]=gl.TRIANGLE_FAN;}};},{"../../const":22,"../../utils":77,"../SystemRenderer":43,"./filters/FXAAFilter":51,"./managers/BlendModeManager":53,"./managers/FilterManager":54,"./managers/MaskManager":55,"./managers/ShaderManager":56,"./managers/StencilManager":57,"./utils/ObjectRenderer":63,"./utils/RenderTarget":65}],50:[function(require,module,exports){var DefaultShader=require('../shaders/TextureShader');function AbstractFilter(vertexSrc,fragmentSrc,uniforms)
{this.shaders=[];this.padding=0;this.uniforms=uniforms||{};this.vertexSrc=vertexSrc||DefaultShader.defaultVertexSrc;this.fragmentSrc=fragmentSrc||DefaultShader.defaultFragmentSrc;}
AbstractFilter.prototype.constructor=AbstractFilter;module.exports=AbstractFilter;AbstractFilter.prototype.getShader=function(renderer)
{var gl=renderer.gl;var shader=this.shaders[gl.id];if(!shader)
{shader=new DefaultShader(renderer.shaderManager,this.vertexSrc,this.fragmentSrc,this.uniforms,this.attributes);this.shaders[gl.id]=shader;}
return shader;};AbstractFilter.prototype.applyFilter=function(renderer,input,output,clear)
{var shader=this.getShader(renderer);renderer.filterManager.applyFilter(shader,input,output,clear);};AbstractFilter.prototype.syncUniform=function(uniform)
{for(var i=0,j=this.shaders.length;i<j;++i)
{this.shaders[i].syncUniform(uniform);}};},{"../shaders/TextureShader":62}],51:[function(require,module,exports){var AbstractFilter=require('./AbstractFilter');function FXAAFilter()
{AbstractFilter.call(this,"\nprecision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n","precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it's\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n\"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n",{resolution:{type:'v2',value:{x:1,y:1}}});}
FXAAFilter.prototype=Object.create(AbstractFilter.prototype);FXAAFilter.prototype.constructor=FXAAFilter;module.exports=FXAAFilter;FXAAFilter.prototype.applyFilter=function(renderer,input,output)
{var filterManager=renderer.filterManager;var shader=this.getShader(renderer);filterManager.applyFilter(shader,input,output);};},{"./AbstractFilter":50}],52:[function(require,module,exports){var AbstractFilter=require('./AbstractFilter'),math=require('../../../math');function SpriteMaskFilter(sprite)
{var maskMatrix=new math.Matrix();AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n",{mask:{type:'sampler2D',value:sprite._texture},alpha:{type:'f',value:1},otherMatrix:{type:'mat3',value:maskMatrix.toArray(true)}});this.maskSprite=sprite;this.maskMatrix=maskMatrix;}
SpriteMaskFilter.prototype=Object.create(AbstractFilter.prototype);SpriteMaskFilter.prototype.constructor=SpriteMaskFilter;module.exports=SpriteMaskFilter;SpriteMaskFilter.prototype.applyFilter=function(renderer,input,output)
{var filterManager=renderer.filterManager;this.uniforms.mask.value=this.maskSprite._texture;filterManager.calculateMappedMatrix(input.frame,this.maskSprite,this.maskMatrix);this.uniforms.otherMatrix.value=this.maskMatrix.toArray(true);this.uniforms.alpha.value=this.maskSprite.worldAlpha;var shader=this.getShader(renderer);filterManager.applyFilter(shader,input,output);};Object.defineProperties(SpriteMaskFilter.prototype,{map:{get:function()
{return this.uniforms.mask.value;},set:function(value)
{this.uniforms.mask.value=value;}},offset:{get:function()
{return this.uniforms.offset.value;},set:function(value)
{this.uniforms.offset.value=value;}}});},{"../../../math":33,"./AbstractFilter":50}],53:[function(require,module,exports){var WebGLManager=require('./WebGLManager');function BlendModeManager(renderer)
{WebGLManager.call(this,renderer);this.currentBlendMode=99999;}
BlendModeManager.prototype=Object.create(WebGLManager.prototype);BlendModeManager.prototype.constructor=BlendModeManager;module.exports=BlendModeManager;BlendModeManager.prototype.setBlendMode=function(blendMode)
{if(this.currentBlendMode===blendMode)
{return false;}
this.currentBlendMode=blendMode;var mode=this.renderer.blendModes[this.currentBlendMode];this.renderer.gl.blendFunc(mode[0],mode[1]);return true;};},{"./WebGLManager":58}],54:[function(require,module,exports){var WebGLManager=require('./WebGLManager'),RenderTarget=require('../utils/RenderTarget'),CONST=require('../../../const'),Quad=require('../utils/Quad'),math=require('../../../math');function FilterManager(renderer)
{WebGLManager.call(this,renderer);this.filterStack=[];this.filterStack.push({renderTarget:renderer.currentRenderTarget,filter:[],bounds:null});this.texturePool=[];this.textureSize=new math.Rectangle(0,0,renderer.width,renderer.height);this.currentFrame=null;}
FilterManager.prototype=Object.create(WebGLManager.prototype);FilterManager.prototype.constructor=FilterManager;module.exports=FilterManager;FilterManager.prototype.onContextChange=function()
{this.texturePool.length=0;var gl=this.renderer.gl;this.quad=new Quad(gl);};FilterManager.prototype.setFilterStack=function(filterStack)
{this.filterStack=filterStack;};FilterManager.prototype.pushFilter=function(target,filters)
{var bounds=target.filterArea?target.filterArea.clone():target.getBounds();bounds.x=bounds.x|0;bounds.y=bounds.y|0;bounds.width=bounds.width|0;bounds.height=bounds.height|0;var padding=filters[0].padding|0;bounds.x-=padding;bounds.y-=padding;bounds.width+=padding*2;bounds.height+=padding*2;if(this.renderer.currentRenderTarget.transform)
{var transform=this.renderer.currentRenderTarget.transform;bounds.x+=transform.tx;bounds.y+=transform.ty;this.capFilterArea(bounds);bounds.x-=transform.tx;bounds.y-=transform.ty;}
else
{this.capFilterArea(bounds);}
if(bounds.width>0&&bounds.height>0)
{this.currentFrame=bounds;var texture=this.getRenderTarget();this.renderer.setRenderTarget(texture);texture.clear();this.filterStack.push({renderTarget:texture,filter:filters});}
else
{this.filterStack.push({renderTarget:null,filter:filters});}};FilterManager.prototype.popFilter=function()
{var filterData=this.filterStack.pop();var previousFilterData=this.filterStack[this.filterStack.length-1];var input=filterData.renderTarget;if(!filterData.renderTarget)
{return;}
var output=previousFilterData.renderTarget;var gl=this.renderer.gl;this.currentFrame=input.frame;this.quad.map(this.textureSize,input.frame);gl.bindBuffer(gl.ARRAY_BUFFER,this.quad.vertexBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.quad.indexBuffer);var filters=filterData.filter;gl.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aVertexPosition,2,gl.FLOAT,false,0,0);gl.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aTextureCoord,2,gl.FLOAT,false,0,2*4*4);gl.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aColor,4,gl.FLOAT,false,0,4*4*4);this.renderer.blendModeManager.setBlendMode(CONST.BLEND_MODES.NORMAL);if(filters.length===1)
{if(filters[0].uniforms.dimensions)
{filters[0].uniforms.dimensions.value[0]=this.renderer.width;filters[0].uniforms.dimensions.value[1]=this.renderer.height;filters[0].uniforms.dimensions.value[2]=this.quad.vertices[0];filters[0].uniforms.dimensions.value[3]=this.quad.vertices[5];}
filters[0].applyFilter(this.renderer,input,output);this.returnRenderTarget(input);}
else
{var flipTexture=input;var flopTexture=this.getRenderTarget(true);for(var i=0;i<filters.length-1;i++)
{var filter=filters[i];if(filter.uniforms.dimensions)
{filter.uniforms.dimensions.value[0]=this.renderer.width;filter.uniforms.dimensions.value[1]=this.renderer.height;filter.uniforms.dimensions.value[2]=this.quad.vertices[0];filter.uniforms.dimensions.value[3]=this.quad.vertices[5];}
filter.applyFilter(this.renderer,flipTexture,flopTexture);var temp=flipTexture;flipTexture=flopTexture;flopTexture=temp;}
filters[filters.length-1].applyFilter(this.renderer,flipTexture,output);this.returnRenderTarget(flipTexture);this.returnRenderTarget(flopTexture);}
return filterData.filter;};FilterManager.prototype.getRenderTarget=function(clear)
{var renderTarget=this.texturePool.pop()||new RenderTarget(this.renderer.gl,this.textureSize.width,this.textureSize.height,CONST.SCALE_MODES.LINEAR,this.renderer.resolution*CONST.FILTER_RESOLUTION);renderTarget.frame=this.currentFrame;if(clear)
{renderTarget.clear(true);}
return renderTarget;};FilterManager.prototype.returnRenderTarget=function(renderTarget)
{this.texturePool.push(renderTarget);};FilterManager.prototype.applyFilter=function(shader,inputTarget,outputTarget,clear)
{var gl=this.renderer.gl;this.renderer.setRenderTarget(outputTarget);if(clear)
{outputTarget.clear();}
this.renderer.shaderManager.setShader(shader);shader.uniforms.projectionMatrix.value=this.renderer.currentRenderTarget.projectionMatrix.toArray(true);shader.syncUniforms();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,inputTarget.texture);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);this.renderer.drawCount++;};FilterManager.prototype.calculateMappedMatrix=function(filterArea,sprite,outputMatrix)
{var worldTransform=sprite.worldTransform.copy(math.Matrix.TEMP_MATRIX),texture=sprite._texture.baseTexture;var mappedMatrix=outputMatrix.identity();var ratio=this.textureSize.height/this.textureSize.width;mappedMatrix.translate(filterArea.x/this.textureSize.width,filterArea.y/this.textureSize.height);mappedMatrix.scale(1,ratio);var translateScaleX=(this.textureSize.width/texture.width);var translateScaleY=(this.textureSize.height/texture.height);worldTransform.tx/=texture.width*translateScaleX;worldTransform.ty/=texture.width*translateScaleX;worldTransform.invert();mappedMatrix.prepend(worldTransform);mappedMatrix.scale(1,1/ratio);mappedMatrix.scale(translateScaleX,translateScaleY);mappedMatrix.translate(sprite.anchor.x,sprite.anchor.y);return mappedMatrix;};FilterManager.prototype.capFilterArea=function(filterArea)
{if(filterArea.x<0)
{filterArea.width+=filterArea.x;filterArea.x=0;}
if(filterArea.y<0)
{filterArea.height+=filterArea.y;filterArea.y=0;}
if(filterArea.x+filterArea.width>this.textureSize.width)
{filterArea.width=this.textureSize.width-filterArea.x;}
if(filterArea.y+filterArea.height>this.textureSize.height)
{filterArea.height=this.textureSize.height-filterArea.y;}};FilterManager.prototype.resize=function(width,height)
{this.textureSize.width=width;this.textureSize.height=height;for(var i=0;i<this.texturePool.length;i++)
{this.texturePool[i].resize(width,height);}};FilterManager.prototype.destroy=function()
{this.quad.destroy();WebGLManager.prototype.destroy.call(this);this.filterStack=null;this.offsetY=0;for(var i=0;i<this.texturePool.length;i++)
{this.texturePool[i].destroy();}
this.texturePool=null;};},{"../../../const":22,"../../../math":33,"../utils/Quad":64,"../utils/RenderTarget":65,"./WebGLManager":58}],55:[function(require,module,exports){var WebGLManager=require('./WebGLManager'),AlphaMaskFilter=require('../filters/SpriteMaskFilter');function MaskManager(renderer)
{WebGLManager.call(this,renderer);this.stencilStack=[];this.reverse=true;this.count=0;this.alphaMaskPool=[];}
MaskManager.prototype=Object.create(WebGLManager.prototype);MaskManager.prototype.constructor=MaskManager;module.exports=MaskManager;MaskManager.prototype.pushMask=function(target,maskData)
{if(maskData.texture)
{this.pushSpriteMask(target,maskData);}
else
{this.pushStencilMask(target,maskData);}};MaskManager.prototype.popMask=function(target,maskData)
{if(maskData.texture)
{this.popSpriteMask(target,maskData);}
else
{this.popStencilMask(target,maskData);}};MaskManager.prototype.pushSpriteMask=function(target,maskData)
{var alphaMaskFilter=this.alphaMaskPool.pop();if(!alphaMaskFilter)
{alphaMaskFilter=[new AlphaMaskFilter(maskData)];}
alphaMaskFilter[0].maskSprite=maskData;this.renderer.filterManager.pushFilter(target,alphaMaskFilter);};MaskManager.prototype.popSpriteMask=function()
{var filters=this.renderer.filterManager.popFilter();this.alphaMaskPool.push(filters);};MaskManager.prototype.pushStencilMask=function(target,maskData)
{this.renderer.stencilManager.pushMask(maskData);};MaskManager.prototype.popStencilMask=function(target,maskData)
{this.renderer.stencilManager.popMask(maskData);};},{"../filters/SpriteMaskFilter":52,"./WebGLManager":58}],56:[function(require,module,exports){var WebGLManager=require('./WebGLManager'),TextureShader=require('../shaders/TextureShader'),ComplexPrimitiveShader=require('../shaders/ComplexPrimitiveShader'),PrimitiveShader=require('../shaders/PrimitiveShader'),utils=require('../../../utils');function ShaderManager(renderer)
{WebGLManager.call(this,renderer);this.maxAttibs=10;this.attribState=[];this.tempAttribState=[];for(var i=0;i<this.maxAttibs;i++)
{this.attribState[i]=false;}
this.stack=[];this._currentId=-1;this.currentShader=null;}
ShaderManager.prototype=Object.create(WebGLManager.prototype);ShaderManager.prototype.constructor=ShaderManager;utils.pluginTarget.mixin(ShaderManager);module.exports=ShaderManager;ShaderManager.prototype.onContextChange=function()
{this.initPlugins();var gl=this.renderer.gl;this.maxAttibs=gl.getParameter(gl.MAX_VERTEX_ATTRIBS);this.attribState=[];for(var i=0;i<this.maxAttibs;i++)
{this.attribState[i]=false;}
this.defaultShader=new TextureShader(this);this.primitiveShader=new PrimitiveShader(this);this.complexPrimitiveShader=new ComplexPrimitiveShader(this);};ShaderManager.prototype.setAttribs=function(attribs)
{var i;for(i=0;i<this.tempAttribState.length;i++)
{this.tempAttribState[i]=false;}
for(var a in attribs)
{this.tempAttribState[attribs[a]]=true;}
var gl=this.renderer.gl;for(i=0;i<this.attribState.length;i++)
{if(this.attribState[i]!==this.tempAttribState[i])
{this.attribState[i]=this.tempAttribState[i];if(this.attribState[i])
{gl.enableVertexAttribArray(i);}
else
{gl.disableVertexAttribArray(i);}}}};ShaderManager.prototype.setShader=function(shader)
{if(this._currentId===shader.uid)
{return false;}
this._currentId=shader.uid;this.currentShader=shader;this.renderer.gl.useProgram(shader.program);this.setAttribs(shader.attributes);return true;};ShaderManager.prototype.destroy=function()
{this.primitiveShader.destroy();this.complexPrimitiveShader.destroy();WebGLManager.prototype.destroy.call(this);this.destroyPlugins();this.attribState=null;this.tempAttribState=null;};},{"../../../utils":77,"../shaders/ComplexPrimitiveShader":59,"../shaders/PrimitiveShader":60,"../shaders/TextureShader":62,"./WebGLManager":58}],57:[function(require,module,exports){var WebGLManager=require('./WebGLManager'),utils=require('../../../utils');function WebGLMaskManager(renderer)
{WebGLManager.call(this,renderer);this.stencilMaskStack=null;}
WebGLMaskManager.prototype=Object.create(WebGLManager.prototype);WebGLMaskManager.prototype.constructor=WebGLMaskManager;module.exports=WebGLMaskManager;WebGLMaskManager.prototype.setMaskStack=function(stencilMaskStack)
{this.stencilMaskStack=stencilMaskStack;var gl=this.renderer.gl;if(stencilMaskStack.stencilStack.length===0)
{gl.disable(gl.STENCIL_TEST);}
else
{gl.enable(gl.STENCIL_TEST);}};WebGLMaskManager.prototype.pushStencil=function(graphics,webGLData)
{this.renderer.currentRenderTarget.attachStencilBuffer();var gl=this.renderer.gl,sms=this.stencilMaskStack;this.bindGraphics(graphics,webGLData);if(sms.stencilStack.length===0)
{gl.enable(gl.STENCIL_TEST);gl.clear(gl.STENCIL_BUFFER_BIT);sms.reverse=true;sms.count=0;}
sms.stencilStack.push(webGLData);var level=sms.count;gl.colorMask(false,false,false,false);gl.stencilFunc(gl.ALWAYS,0,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);if(webGLData.mode===1)
{gl.drawElements(gl.TRIANGLE_FAN,webGLData.indices.length-4,gl.UNSIGNED_SHORT,0);if(sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-level,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);}
else
{gl.stencilFunc(gl.EQUAL,level,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);}
gl.drawElements(gl.TRIANGLE_FAN,4,gl.UNSIGNED_SHORT,(webGLData.indices.length-4)*2);if(sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-(level+1),0xFF);}
else
{gl.stencilFunc(gl.EQUAL,level+1,0xFF);}
sms.reverse=!sms.reverse;}
else
{if(!sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-level,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);}
else
{gl.stencilFunc(gl.EQUAL,level,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);}
gl.drawElements(gl.TRIANGLE_STRIP,webGLData.indices.length,gl.UNSIGNED_SHORT,0);if(!sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-(level+1),0xFF);}
else
{gl.stencilFunc(gl.EQUAL,level+1,0xFF);}}
gl.colorMask(true,true,true,true);gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);sms.count++;};WebGLMaskManager.prototype.bindGraphics=function(graphics,webGLData)
{var gl=this.renderer.gl;var shader;if(webGLData.mode===1)
{shader=this.renderer.shaderManager.complexPrimitiveShader;this.renderer.shaderManager.setShader(shader);gl.uniformMatrix3fv(shader.uniforms.translationMatrix._location,false,graphics.worldTransform.toArray(true));gl.uniformMatrix3fv(shader.uniforms.projectionMatrix._location,false,this.renderer.currentRenderTarget.projectionMatrix.toArray(true));gl.uniform3fv(shader.uniforms.tint._location,utils.hex2rgb(graphics.tint));gl.uniform3fv(shader.uniforms.color._location,webGLData.color);gl.uniform1f(shader.uniforms.alpha._location,graphics.worldAlpha);gl.bindBuffer(gl.ARRAY_BUFFER,webGLData.buffer);gl.vertexAttribPointer(shader.attributes.aVertexPosition,2,gl.FLOAT,false,4*2,0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,webGLData.indexBuffer);}
else
{shader=this.renderer.shaderManager.primitiveShader;this.renderer.shaderManager.setShader(shader);gl.uniformMatrix3fv(shader.uniforms.translationMatrix._location,false,graphics.worldTransform.toArray(true));gl.uniformMatrix3fv(shader.uniforms.projectionMatrix._location,false,this.renderer.currentRenderTarget.projectionMatrix.toArray(true));gl.uniform3fv(shader.uniforms.tint._location,utils.hex2rgb(graphics.tint));gl.uniform1f(shader.uniforms.alpha._location,graphics.worldAlpha);gl.bindBuffer(gl.ARRAY_BUFFER,webGLData.buffer);gl.vertexAttribPointer(shader.attributes.aVertexPosition,2,gl.FLOAT,false,4*6,0);gl.vertexAttribPointer(shader.attributes.aColor,4,gl.FLOAT,false,4*6,2*4);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,webGLData.indexBuffer);}};WebGLMaskManager.prototype.popStencil=function(graphics,webGLData)
{var gl=this.renderer.gl,sms=this.stencilMaskStack;sms.stencilStack.pop();sms.count--;if(sms.stencilStack.length===0)
{gl.disable(gl.STENCIL_TEST);}
else
{var level=sms.count;this.bindGraphics(graphics,webGLData);gl.colorMask(false,false,false,false);if(webGLData.mode===1)
{sms.reverse=!sms.reverse;if(sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-(level+1),0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);}
else
{gl.stencilFunc(gl.EQUAL,level+1,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);}
gl.drawElements(gl.TRIANGLE_FAN,4,gl.UNSIGNED_SHORT,(webGLData.indices.length-4)*2);gl.stencilFunc(gl.ALWAYS,0,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);gl.drawElements(gl.TRIANGLE_FAN,webGLData.indices.length-4,gl.UNSIGNED_SHORT,0);this.renderer.drawCount+=2;if(!sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-(level),0xFF);}
else
{gl.stencilFunc(gl.EQUAL,level,0xFF);}}
else
{if(!sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-(level+1),0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);}
else
{gl.stencilFunc(gl.EQUAL,level+1,0xFF);gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);}
gl.drawElements(gl.TRIANGLE_STRIP,webGLData.indices.length,gl.UNSIGNED_SHORT,0);this.renderer.drawCount++;if(!sms.reverse)
{gl.stencilFunc(gl.EQUAL,0xFF-(level),0xFF);}
else
{gl.stencilFunc(gl.EQUAL,level,0xFF);}}
gl.colorMask(true,true,true,true);gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);}};WebGLMaskManager.prototype.destroy=function()
{WebGLManager.prototype.destroy.call(this);this.stencilMaskStack.stencilStack=null;};WebGLMaskManager.prototype.pushMask=function(maskData)
{this.renderer.setObjectRenderer(this.renderer.plugins.graphics);if(maskData.dirty)
{this.renderer.plugins.graphics.updateGraphics(maskData,this.renderer.gl);}
if(!maskData._webGL[this.renderer.gl.id].data.length)
{return;}
this.pushStencil(maskData,maskData._webGL[this.renderer.gl.id].data[0]);};WebGLMaskManager.prototype.popMask=function(maskData)
{this.renderer.setObjectRenderer(this.renderer.plugins.graphics);this.popStencil(maskData,maskData._webGL[this.renderer.gl.id].data[0]);};},{"../../../utils":77,"./WebGLManager":58}],58:[function(require,module,exports){function WebGLManager(renderer)
{this.renderer=renderer;this.renderer.on('context',this.onContextChange,this);}
WebGLManager.prototype.constructor=WebGLManager;module.exports=WebGLManager;WebGLManager.prototype.onContextChange=function()
{};WebGLManager.prototype.destroy=function()
{this.renderer.off('context',this.onContextChange,this);this.renderer=null;};},{}],59:[function(require,module,exports){var Shader=require('./Shader');function ComplexPrimitiveShader(shaderManager)
{Shader.call(this,shaderManager,['attribute vec2 aVertexPosition;','uniform mat3 translationMatrix;','uniform mat3 projectionMatrix;','uniform vec3 tint;','uniform float alpha;','uniform vec3 color;','varying vec4 vColor;','void main(void){','   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);','   vColor = vec4(color * alpha * tint, alpha);','}'].join('\n'),['precision mediump float;','varying vec4 vColor;','void main(void){','   gl_FragColor = vColor;','}'].join('\n'),{tint:{type:'3f',value:[0,0,0]},alpha:{type:'1f',value:0},color:{type:'3f',value:[0,0,0]},translationMatrix:{type:'mat3',value:new Float32Array(9)},projectionMatrix:{type:'mat3',value:new Float32Array(9)}},{aVertexPosition:0});}
ComplexPrimitiveShader.prototype=Object.create(Shader.prototype);ComplexPrimitiveShader.prototype.constructor=ComplexPrimitiveShader;module.exports=ComplexPrimitiveShader;},{"./Shader":61}],60:[function(require,module,exports){var Shader=require('./Shader');function PrimitiveShader(shaderManager)
{Shader.call(this,shaderManager,['attribute vec2 aVertexPosition;','attribute vec4 aColor;','uniform mat3 translationMatrix;','uniform mat3 projectionMatrix;','uniform float alpha;','uniform float flipY;','uniform vec3 tint;','varying vec4 vColor;','void main(void){','   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);','   vColor = aColor * vec4(tint * alpha, alpha);','}'].join('\n'),['precision mediump float;','varying vec4 vColor;','void main(void){','   gl_FragColor = vColor;','}'].join('\n'),{tint:{type:'3f',value:[0,0,0]},alpha:{type:'1f',value:0},translationMatrix:{type:'mat3',value:new Float32Array(9)},projectionMatrix:{type:'mat3',value:new Float32Array(9)}},{aVertexPosition:0,aColor:0});}
PrimitiveShader.prototype=Object.create(Shader.prototype);PrimitiveShader.prototype.constructor=PrimitiveShader;module.exports=PrimitiveShader;},{"./Shader":61}],61:[function(require,module,exports){var utils=require('../../../utils');function Shader(shaderManager,vertexSrc,fragmentSrc,uniforms,attributes)
{if(!vertexSrc||!fragmentSrc)
{throw new Error('Pixi.js Error. Shader requires vertexSrc and fragmentSrc');}
this.uid=utils.uid();this.gl=shaderManager.renderer.gl;this.shaderManager=shaderManager;this.program=null;this.uniforms=uniforms||{};this.attributes=attributes||{};this.textureCount=1;this.vertexSrc=vertexSrc;this.fragmentSrc=fragmentSrc;this.init();}
Shader.prototype.constructor=Shader;module.exports=Shader;Shader.prototype.init=function()
{this.compile();this.gl.useProgram(this.program);this.cacheUniformLocations(Object.keys(this.uniforms));this.cacheAttributeLocations(Object.keys(this.attributes));};Shader.prototype.cacheUniformLocations=function(keys)
{for(var i=0;i<keys.length;++i)
{this.uniforms[keys[i]]._location=this.gl.getUniformLocation(this.program,keys[i]);}};Shader.prototype.cacheAttributeLocations=function(keys)
{for(var i=0;i<keys.length;++i)
{this.attributes[keys[i]]=this.gl.getAttribLocation(this.program,keys[i]);}};Shader.prototype.compile=function()
{var gl=this.gl;var glVertShader=this._glCompile(gl.VERTEX_SHADER,this.vertexSrc);var glFragShader=this._glCompile(gl.FRAGMENT_SHADER,this.fragmentSrc);var program=gl.createProgram();gl.attachShader(program,glVertShader);gl.attachShader(program,glFragShader);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))
{console.error('Pixi.js Error: Could not initialize shader.');console.error('gl.VALIDATE_STATUS',gl.getProgramParameter(program,gl.VALIDATE_STATUS));console.error('gl.getError()',gl.getError());if(gl.getProgramInfoLog(program)!=='')
{console.warn('Pixi.js Warning: gl.getProgramInfoLog()',gl.getProgramInfoLog(program));}
gl.deleteProgram(program);program=null;}
gl.deleteShader(glVertShader);gl.deleteShader(glFragShader);return(this.program=program);};Shader.prototype.syncUniform=function(uniform)
{var location=uniform._location,value=uniform.value,gl=this.gl,i,il;switch(uniform.type)
{case'b':case'bool':case'boolean':gl.uniform1i(location,value?1:0);break;case'i':case'1i':gl.uniform1i(location,value);break;case'f':case'1f':gl.uniform1f(location,value);break;case'2f':gl.uniform2f(location,value[0],value[1]);break;case'3f':gl.uniform3f(location,value[0],value[1],value[2]);break;case'4f':gl.uniform4f(location,value[0],value[1],value[2],value[3]);break;case'v2':gl.uniform2f(location,value.x,value.y);break;case'v3':gl.uniform3f(location,value.x,value.y,value.z);break;case'v4':gl.uniform4f(location,value.x,value.y,value.z,value.w);break;case'1iv':gl.uniform1iv(location,value);break;case'2iv':gl.uniform2iv(location,value);break;case'3iv':gl.uniform3iv(location,value);break;case'4iv':gl.uniform4iv(location,value);break;case'1fv':gl.uniform1fv(location,value);break;case'2fv':gl.uniform2fv(location,value);break;case'3fv':gl.uniform3fv(location,value);break;case'4fv':gl.uniform4fv(location,value);break;case'm2':case'mat2':case'Matrix2fv':gl.uniformMatrix2fv(location,uniform.transpose,value);break;case'm3':case'mat3':case'Matrix3fv':gl.uniformMatrix3fv(location,uniform.transpose,value);break;case'm4':case'mat4':case'Matrix4fv':gl.uniformMatrix4fv(location,uniform.transpose,value);break;case'c':if(typeof value==='number')
{value=utils.hex2rgb(value);}
gl.uniform3f(location,value[0],value[1],value[2]);break;case'iv1':gl.uniform1iv(location,value);break;case'iv':gl.uniform3iv(location,value);break;case'fv1':gl.uniform1fv(location,value);break;case'fv':gl.uniform3fv(location,value);break;case'v2v':if(!uniform._array)
{uniform._array=new Float32Array(2*value.length);}
for(i=0,il=value.length;i<il;++i)
{uniform._array[i*2]=value[i].x;uniform._array[i*2+1]=value[i].y;}
gl.uniform2fv(location,uniform._array);break;case'v3v':if(!uniform._array)
{uniform._array=new Float32Array(3*value.length);}
for(i=0,il=value.length;i<il;++i)
{uniform._array[i*3]=value[i].x;uniform._array[i*3+1]=value[i].y;uniform._array[i*3+2]=value[i].z;}
gl.uniform3fv(location,uniform._array);break;case'v4v':if(!uniform._array)
{uniform._array=new Float32Array(4*value.length);}
for(i=0,il=value.length;i<il;++i)
{uniform._array[i*4]=value[i].x;uniform._array[i*4+1]=value[i].y;uniform._array[i*4+2]=value[i].z;uniform._array[i*4+3]=value[i].w;}
gl.uniform4fv(location,uniform._array);break;case't':case'sampler2D':if(!uniform.value||!uniform.value.baseTexture.hasLoaded)
{break;}
gl.activeTexture(gl['TEXTURE'+this.textureCount]);var texture=uniform.value.baseTexture._glTextures[gl.id];if(!texture)
{this.initSampler2D(uniform);texture=uniform.value.baseTexture._glTextures[gl.id];}
gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(uniform._location,this.textureCount);this.textureCount++;break;default:console.warn('Pixi.js Shader Warning: Unknown uniform type: '+uniform.type);}};Shader.prototype.syncUniforms=function()
{this.textureCount=1;for(var key in this.uniforms)
{this.syncUniform(this.uniforms[key]);}};Shader.prototype.initSampler2D=function(uniform)
{var gl=this.gl;var texture=uniform.value.baseTexture;if(!texture.hasLoaded)
{return;}
if(uniform.textureData)
{var data=uniform.textureData;texture._glTextures[gl.id]=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,texture.premultipliedAlpha);gl.texImage2D(gl.TEXTURE_2D,0,data.luminance?gl.LUMINANCE:gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,texture.source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,data.magFilter?data.magFilter:gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,data.wrapS?data.wrapS:gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,data.wrapS?data.wrapS:gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,data.wrapT?data.wrapT:gl.CLAMP_TO_EDGE);}
else
{this.shaderManager.renderer.updateTexture(texture);}};Shader.prototype.destroy=function()
{this.gl.deleteProgram(this.program);this.gl=null;this.uniforms=null;this.attributes=null;this.vertexSrc=null;this.fragmentSrc=null;};Shader.prototype._glCompile=function(type,src)
{var shader=this.gl.createShader(type);this.gl.shaderSource(shader,src);this.gl.compileShader(shader);if(!this.gl.getShaderParameter(shader,this.gl.COMPILE_STATUS))
{return null;}
return shader;};},{"../../../utils":77}],62:[function(require,module,exports){var Shader=require('./Shader');function TextureShader(shaderManager,vertexSrc,fragmentSrc,customUniforms,customAttributes)
{var uniforms={uSampler:{type:'sampler2D',value:0},projectionMatrix:{type:'mat3',value:new Float32Array([1,0,0,0,1,0,0,0,1])}};if(customUniforms)
{for(var u in customUniforms)
{uniforms[u]=customUniforms[u];}}
var attributes={aVertexPosition:0,aTextureCoord:0,aColor:0};if(customAttributes)
{for(var a in customAttributes)
{attributes[a]=customAttributes[a];}}
vertexSrc=vertexSrc||TextureShader.defaultVertexSrc;fragmentSrc=fragmentSrc||TextureShader.defaultFragmentSrc;Shader.call(this,shaderManager,vertexSrc,fragmentSrc,uniforms,attributes);}
TextureShader.prototype=Object.create(Shader.prototype);TextureShader.prototype.constructor=TextureShader;module.exports=TextureShader;TextureShader.defaultVertexSrc=['precision lowp float;','attribute vec2 aVertexPosition;','attribute vec2 aTextureCoord;','attribute vec4 aColor;','uniform mat3 projectionMatrix;','varying vec2 vTextureCoord;','varying vec4 vColor;','void main(void){','   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);','   vTextureCoord = aTextureCoord;','   vColor = vec4(aColor.rgb * aColor.a, aColor.a);','}'].join('\n');TextureShader.defaultFragmentSrc=['precision lowp float;','varying vec2 vTextureCoord;','varying vec4 vColor;','uniform sampler2D uSampler;','void main(void){','   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;','}'].join('\n');},{"./Shader":61}],63:[function(require,module,exports){var WebGLManager=require('../managers/WebGLManager');function ObjectRenderer(renderer)
{WebGLManager.call(this,renderer);}
ObjectRenderer.prototype=Object.create(WebGLManager.prototype);ObjectRenderer.prototype.constructor=ObjectRenderer;module.exports=ObjectRenderer;ObjectRenderer.prototype.start=function()
{};ObjectRenderer.prototype.stop=function()
{this.flush();};ObjectRenderer.prototype.flush=function()
{};ObjectRenderer.prototype.render=function(object)
{};},{"../managers/WebGLManager":58}],64:[function(require,module,exports){function Quad(gl)
{this.gl=gl;this.vertices=new Float32Array([0,0,200,0,200,200,0,200]);this.uvs=new Float32Array([0,0,1,0,1,1,0,1]);this.colors=new Float32Array([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);this.indices=new Uint16Array([0,1,2,0,3,2]);this.vertexBuffer=gl.createBuffer();this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,(8+8+16)*4,gl.DYNAMIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);this.upload();}
Quad.prototype.constructor=Quad;Quad.prototype.map=function(rect,rect2)
{var x=0;var y=0;this.uvs[0]=x;this.uvs[1]=y;this.uvs[2]=x+rect2.width/rect.width;this.uvs[3]=y;this.uvs[4]=x+rect2.width/rect.width;this.uvs[5]=y+rect2.height/rect.height;this.uvs[6]=x;this.uvs[7]=y+rect2.height/rect.height;x=rect2.x;y=rect2.y;this.vertices[0]=x;this.vertices[1]=y;this.vertices[2]=x+rect2.width;this.vertices[3]=y;this.vertices[4]=x+rect2.width;this.vertices[5]=y+rect2.height;this.vertices[6]=x;this.vertices[7]=y+rect2.height;this.upload();};Quad.prototype.upload=function()
{var gl=this.gl;gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertices);gl.bufferSubData(gl.ARRAY_BUFFER,8*4,this.uvs);gl.bufferSubData(gl.ARRAY_BUFFER,(8+8)*4,this.colors);};Quad.prototype.destroy=function()
{var gl=this.gl;gl.deleteBuffer(this.vertexBuffer);gl.deleteBuffer(this.indexBuffer);};module.exports=Quad;},{}],65:[function(require,module,exports){var math=require('../../../math'),utils=require('../../../utils'),CONST=require('../../../const'),StencilMaskStack=require('./StencilMaskStack');var RenderTarget=function(gl,width,height,scaleMode,resolution,root)
{this.gl=gl;this.frameBuffer=null;this.texture=null;this.size=new math.Rectangle(0,0,1,1);this.resolution=resolution||CONST.RESOLUTION;this.projectionMatrix=new math.Matrix();this.transform=null;this.frame=null;this.stencilBuffer=null;this.stencilMaskStack=new StencilMaskStack();this.filterStack=[{renderTarget:this,filter:[],bounds:this.size}];this.scaleMode=scaleMode||CONST.SCALE_MODES.DEFAULT;this.root=root;if(!this.root)
{this.frameBuffer=gl.createFramebuffer();this.texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,scaleMode===CONST.SCALE_MODES.LINEAR?gl.LINEAR:gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,scaleMode===CONST.SCALE_MODES.LINEAR?gl.LINEAR:gl.NEAREST);var isPowerOfTwo=utils.isPowerOfTwo(width,height);if(!isPowerOfTwo)
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);}
else
{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);}
gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.texture,0);}
this.resize(width,height);};RenderTarget.prototype.constructor=RenderTarget;module.exports=RenderTarget;RenderTarget.prototype.clear=function(bind)
{var gl=this.gl;if(bind)
{gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);}
gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);};RenderTarget.prototype.attachStencilBuffer=function()
{if(this.stencilBuffer)
{return;}
if(!this.root)
{var gl=this.gl;this.stencilBuffer=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,this.stencilBuffer);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,this.stencilBuffer);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,this.size.width*this.resolution,this.size.height*this.resolution);}};RenderTarget.prototype.activate=function()
{var gl=this.gl;gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);var projectionFrame=this.frame||this.size;this.calculateProjection(projectionFrame);if(this.transform)
{this.projectionMatrix.append(this.transform);}
gl.viewport(0,0,projectionFrame.width*this.resolution,projectionFrame.height*this.resolution);};RenderTarget.prototype.calculateProjection=function(projectionFrame)
{var pm=this.projectionMatrix;pm.identity();if(!this.root)
{pm.a=1/projectionFrame.width*2;pm.d=1/projectionFrame.height*2;pm.tx=-1-projectionFrame.x*pm.a;pm.ty=-1-projectionFrame.y*pm.d;}
else
{pm.a=1/projectionFrame.width*2;pm.d=-1/projectionFrame.height*2;pm.tx=-1-projectionFrame.x*pm.a;pm.ty=1-projectionFrame.y*pm.d;}};RenderTarget.prototype.resize=function(width,height)
{width=width|0;height=height|0;if(this.size.width===width&&this.size.height===height){return;}
this.size.width=width;this.size.height=height;if(!this.root)
{var gl=this.gl;gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width*this.resolution,height*this.resolution,0,gl.RGBA,gl.UNSIGNED_BYTE,null);if(this.stencilBuffer)
{gl.bindRenderbuffer(gl.RENDERBUFFER,this.stencilBuffer);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,width*this.resolution,height*this.resolution);}}
var projectionFrame=this.frame||this.size;this.calculateProjection(projectionFrame);};RenderTarget.prototype.destroy=function()
{var gl=this.gl;gl.deleteRenderbuffer(this.stencilBuffer);gl.deleteFramebuffer(this.frameBuffer);gl.deleteTexture(this.texture);this.frameBuffer=null;this.texture=null;};},{"../../../const":22,"../../../math":33,"../../../utils":77,"./StencilMaskStack":66}],66:[function(require,module,exports){function StencilMaskStack()
{this.stencilStack=[];this.reverse=true;this.count=0;}
StencilMaskStack.prototype.constructor=StencilMaskStack;module.exports=StencilMaskStack;},{}],67:[function(require,module,exports){var math=require('../math'),Texture=require('../textures/Texture'),Container=require('../display/Container'),CanvasTinter=require('../renderers/canvas/utils/CanvasTinter'),utils=require('../utils'),CONST=require('../const'),tempPoint=new math.Point(),GroupD8=math.GroupD8,canvasRenderWorldTransform=new math.Matrix();function Sprite(texture)
{Container.call(this);this.anchor=new math.Point();this._texture=null;this._width=0;this._height=0;this.tint=0xFFFFFF;this.blendMode=CONST.BLEND_MODES.NORMAL;this.shader=null;this.cachedTint=0xFFFFFF;this.texture=texture||Texture.EMPTY;}
Sprite.prototype=Object.create(Container.prototype);Sprite.prototype.constructor=Sprite;module.exports=Sprite;Object.defineProperties(Sprite.prototype,{width:{get:function()
{return Math.abs(this.scale.x)*this.texture._frame.width;},set:function(value)
{var sign=utils.sign(this.scale.x)||1;this.scale.x=sign*value/this.texture._frame.width;this._width=value;}},height:{get:function()
{return Math.abs(this.scale.y)*this.texture._frame.height;},set:function(value)
{var sign=utils.sign(this.scale.y)||1;this.scale.y=sign*value/this.texture._frame.height;this._height=value;}},texture:{get:function()
{return this._texture;},set:function(value)
{if(this._texture===value)
{return;}
this._texture=value;this.cachedTint=0xFFFFFF;if(value)
{if(value.baseTexture.hasLoaded)
{this._onTextureUpdate();}
else
{value.once('update',this._onTextureUpdate,this);}}}}});Sprite.prototype._onTextureUpdate=function()
{if(this._width)
{this.scale.x=utils.sign(this.scale.x)*this._width/this.texture.frame.width;}
if(this._height)
{this.scale.y=utils.sign(this.scale.y)*this._height/this.texture.frame.height;}};Sprite.prototype._renderWebGL=function(renderer)
{renderer.setObjectRenderer(renderer.plugins.sprite);renderer.plugins.sprite.render(this);};Sprite.prototype.getBounds=function(matrix)
{if(!this._currentBounds)
{var width=this._texture._frame.width;var height=this._texture._frame.height;var w0=width*(1-this.anchor.x);var w1=width*-this.anchor.x;var h0=height*(1-this.anchor.y);var h1=height*-this.anchor.y;var worldTransform=matrix||this.worldTransform;var a=worldTransform.a;var b=worldTransform.b;var c=worldTransform.c;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var minX,maxX,minY,maxY;var x1=a*w1+c*h1+tx;var y1=d*h1+b*w1+ty;var x2=a*w0+c*h1+tx;var y2=d*h1+b*w0+ty;var x3=a*w0+c*h0+tx;var y3=d*h0+b*w0+ty;var x4=a*w1+c*h0+tx;var y4=d*h0+b*w1+ty;minX=x1;minX=x2<minX?x2:minX;minX=x3<minX?x3:minX;minX=x4<minX?x4:minX;minY=y1;minY=y2<minY?y2:minY;minY=y3<minY?y3:minY;minY=y4<minY?y4:minY;maxX=x1;maxX=x2>maxX?x2:maxX;maxX=x3>maxX?x3:maxX;maxX=x4>maxX?x4:maxX;maxY=y1;maxY=y2>maxY?y2:maxY;maxY=y3>maxY?y3:maxY;maxY=y4>maxY?y4:maxY;if(this.children.length)
{var childBounds=this.containerGetBounds();w0=childBounds.x;w1=childBounds.x+childBounds.width;h0=childBounds.y;h1=childBounds.y+childBounds.height;minX=(minX<w0)?minX:w0;minY=(minY<h0)?minY:h0;maxX=(maxX>w1)?maxX:w1;maxY=(maxY>h1)?maxY:h1;}
var bounds=this._bounds;bounds.x=minX;bounds.width=maxX-minX;bounds.y=minY;bounds.height=maxY-minY;this._currentBounds=bounds;}
return this._currentBounds;};Sprite.prototype.getLocalBounds=function()
{this._bounds.x=-this._texture._frame.width*this.anchor.x;this._bounds.y=-this._texture._frame.height*this.anchor.y;this._bounds.width=this._texture._frame.width;this._bounds.height=this._texture._frame.height;return this._bounds;};Sprite.prototype.containsPoint=function(point)
{this.worldTransform.applyInverse(point,tempPoint);var width=this._texture._frame.width;var height=this._texture._frame.height;var x1=-width*this.anchor.x;var y1;if(tempPoint.x>x1&&tempPoint.x<x1+width)
{y1=-height*this.anchor.y;if(tempPoint.y>y1&&tempPoint.y<y1+height)
{return true;}}
return false;};Sprite.prototype._renderCanvas=function(renderer)
{if(this.texture.crop.width<=0||this.texture.crop.height<=0)
{return;}
var compositeOperation=renderer.blendModes[this.blendMode];if(compositeOperation!==renderer.context.globalCompositeOperation)
{renderer.context.globalCompositeOperation=compositeOperation;}
if(this.texture.valid)
{var texture=this._texture,wt=this.worldTransform,dx,dy,width=texture.crop.width,height=texture.crop.height;renderer.context.globalAlpha=this.worldAlpha;var smoothingEnabled=texture.baseTexture.scaleMode===CONST.SCALE_MODES.LINEAR;if(renderer.smoothProperty&&renderer.context[renderer.smoothProperty]!==smoothingEnabled)
{renderer.context[renderer.smoothProperty]=smoothingEnabled;}
if((texture.rotate&3)===2){width=texture.crop.height;height=texture.crop.width;}
if(texture.trim){dx=texture.crop.width/2+texture.trim.x-this.anchor.x*texture.trim.width;dy=texture.crop.height/2+texture.trim.y-this.anchor.y*texture.trim.height;}else{dx=(0.5-this.anchor.x)*texture._frame.width;dy=(0.5-this.anchor.y)*texture._frame.height;}
if(texture.rotate){wt.copy(canvasRenderWorldTransform);wt=canvasRenderWorldTransform;GroupD8.matrixAppendRotationInv(wt,texture.rotate,dx,dy);dx=0;dy=0;}
dx-=width/2;dy-=height/2;if(renderer.roundPixels)
{renderer.context.setTransform(wt.a,wt.b,wt.c,wt.d,(wt.tx*renderer.resolution)|0,(wt.ty*renderer.resolution)|0);dx=dx|0;dy=dy|0;}
else
{renderer.context.setTransform(wt.a,wt.b,wt.c,wt.d,wt.tx*renderer.resolution,wt.ty*renderer.resolution);}
var resolution=texture.baseTexture.resolution;if(this.tint!==0xFFFFFF)
{if(this.cachedTint!==this.tint)
{this.cachedTint=this.tint;this.tintedTexture=CanvasTinter.getTintedTexture(this,this.tint);}
renderer.context.drawImage(this.tintedTexture,0,0,width*resolution,height*resolution,dx*renderer.resolution,dy*renderer.resolution,width*renderer.resolution,height*renderer.resolution);}
else
{renderer.context.drawImage(texture.baseTexture.source,texture.crop.x*resolution,texture.crop.y*resolution,width*resolution,height*resolution,dx*renderer.resolution,dy*renderer.resolution,width*renderer.resolution,height*renderer.resolution);}}};Sprite.prototype.destroy=function(destroyTexture,destroyBaseTexture)
{Container.prototype.destroy.call(this);this.anchor=null;if(destroyTexture)
{this._texture.destroy(destroyBaseTexture);}
this._texture=null;this.shader=null;};Sprite.fromFrame=function(frameId)
{var texture=utils.TextureCache[frameId];if(!texture)
{throw new Error('The frameId "'+frameId+'" does not exist in the texture cache');}
return new Sprite(texture);};Sprite.fromImage=function(imageId,crossorigin,scaleMode)
{return new Sprite(Texture.fromImage(imageId,crossorigin,scaleMode));};},{"../const":22,"../display/Container":23,"../math":33,"../renderers/canvas/utils/CanvasTinter":48,"../textures/Texture":72,"../utils":77}],68:[function(require,module,exports){var ObjectRenderer=require('../../renderers/webgl/utils/ObjectRenderer'),WebGLRenderer=require('../../renderers/webgl/WebGLRenderer'),CONST=require('../../const');function SpriteRenderer(renderer)
{ObjectRenderer.call(this,renderer);this.vertSize=5;this.vertByteSize=this.vertSize*4;this.size=CONST.SPRITE_BATCH_SIZE;var numVerts=(this.size*4)*this.vertByteSize;var numIndices=this.size*6;this.vertices=new ArrayBuffer(numVerts);this.positions=new Float32Array(this.vertices);this.colors=new Uint32Array(this.vertices);this.indices=new Uint16Array(numIndices);for(var i=0,j=0;i<numIndices;i+=6,j+=4)
{this.indices[i+0]=j+0;this.indices[i+1]=j+1;this.indices[i+2]=j+2;this.indices[i+3]=j+0;this.indices[i+4]=j+2;this.indices[i+5]=j+3;}
this.currentBatchSize=0;this.sprites=[];this.shader=null;}
SpriteRenderer.prototype=Object.create(ObjectRenderer.prototype);SpriteRenderer.prototype.constructor=SpriteRenderer;module.exports=SpriteRenderer;WebGLRenderer.registerPlugin('sprite',SpriteRenderer);SpriteRenderer.prototype.onContextChange=function()
{var gl=this.renderer.gl;this.shader=this.renderer.shaderManager.defaultShader;this.vertexBuffer=gl.createBuffer();this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.DYNAMIC_DRAW);this.currentBlendMode=99999;};SpriteRenderer.prototype.render=function(sprite)
{var texture=sprite._texture;if(this.currentBatchSize>=this.size)
{this.flush();}
var uvs=texture._uvs;if(!uvs)
{return;}
var aX=sprite.anchor.x;var aY=sprite.anchor.y;var w0,w1,h0,h1;if(texture.trim&&sprite.tileScale===undefined)
{var trim=texture.trim;w1=trim.x-aX*trim.width;w0=w1+texture.crop.width;h1=trim.y-aY*trim.height;h0=h1+texture.crop.height;}
else
{w0=(texture._frame.width)*(1-aX);w1=(texture._frame.width)*-aX;h0=texture._frame.height*(1-aY);h1=texture._frame.height*-aY;}
var index=this.currentBatchSize*this.vertByteSize;var worldTransform=sprite.worldTransform;var a=worldTransform.a;var b=worldTransform.b;var c=worldTransform.c;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var colors=this.colors;var positions=this.positions;if(this.renderer.roundPixels)
{var resolution=this.renderer.resolution;positions[index]=(((a*w1+c*h1+tx)*resolution)|0)/resolution;positions[index+1]=(((d*h1+b*w1+ty)*resolution)|0)/resolution;positions[index+5]=(((a*w0+c*h1+tx)*resolution)|0)/resolution;positions[index+6]=(((d*h1+b*w0+ty)*resolution)|0)/resolution;positions[index+10]=(((a*w0+c*h0+tx)*resolution)|0)/resolution;positions[index+11]=(((d*h0+b*w0+ty)*resolution)|0)/resolution;positions[index+15]=(((a*w1+c*h0+tx)*resolution)|0)/resolution;positions[index+16]=(((d*h0+b*w1+ty)*resolution)|0)/resolution;}
else
{positions[index]=a*w1+c*h1+tx;positions[index+1]=d*h1+b*w1+ty;positions[index+5]=a*w0+c*h1+tx;positions[index+6]=d*h1+b*w0+ty;positions[index+10]=a*w0+c*h0+tx;positions[index+11]=d*h0+b*w0+ty;positions[index+15]=a*w1+c*h0+tx;positions[index+16]=d*h0+b*w1+ty;}
positions[index+2]=uvs.x0;positions[index+3]=uvs.y0;positions[index+7]=uvs.x1;positions[index+8]=uvs.y1;positions[index+12]=uvs.x2;positions[index+13]=uvs.y2;positions[index+17]=uvs.x3;positions[index+18]=uvs.y3;var tint=sprite.tint;colors[index+4]=colors[index+9]=colors[index+14]=colors[index+19]=(tint>>16)+(tint&0xff00)+((tint&0xff)<<16)+(sprite.worldAlpha*255<<24);this.sprites[this.currentBatchSize++]=sprite;};SpriteRenderer.prototype.flush=function()
{if(this.currentBatchSize===0)
{return;}
var gl=this.renderer.gl;var shader;if(this.currentBatchSize>(this.size*0.5))
{gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertices);}
else
{var view=this.positions.subarray(0,this.currentBatchSize*this.vertByteSize);gl.bufferSubData(gl.ARRAY_BUFFER,0,view);}
var nextTexture,nextBlendMode,nextShader;var batchSize=0;var start=0;var currentBaseTexture=null;var currentBlendMode=this.renderer.blendModeManager.currentBlendMode;var currentShader=null;var blendSwap=false;var shaderSwap=false;var sprite;for(var i=0,j=this.currentBatchSize;i<j;i++)
{sprite=this.sprites[i];nextTexture=sprite._texture.baseTexture;nextBlendMode=sprite.blendMode;nextShader=sprite.shader||this.shader;blendSwap=currentBlendMode!==nextBlendMode;shaderSwap=currentShader!==nextShader;if(currentBaseTexture!==nextTexture||blendSwap||shaderSwap)
{this.renderBatch(currentBaseTexture,batchSize,start);start=i;batchSize=0;currentBaseTexture=nextTexture;if(blendSwap)
{currentBlendMode=nextBlendMode;this.renderer.blendModeManager.setBlendMode(currentBlendMode);}
if(shaderSwap)
{currentShader=nextShader;shader=currentShader.shaders?currentShader.shaders[gl.id]:currentShader;if(!shader)
{shader=currentShader.getShader(this.renderer);}
this.renderer.shaderManager.setShader(shader);shader.uniforms.projectionMatrix.value=this.renderer.currentRenderTarget.projectionMatrix.toArray(true);shader.syncUniforms();gl.activeTexture(gl.TEXTURE0);}}
batchSize++;}
this.renderBatch(currentBaseTexture,batchSize,start);this.currentBatchSize=0;};SpriteRenderer.prototype.renderBatch=function(texture,size,startIndex)
{if(size===0)
{return;}
var gl=this.renderer.gl;if(!texture._glTextures[gl.id])
{this.renderer.updateTexture(texture);}
else
{gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);}
gl.drawElements(gl.TRIANGLES,size*6,gl.UNSIGNED_SHORT,startIndex*6*2);this.renderer.drawCount++;};SpriteRenderer.prototype.start=function()
{var gl=this.renderer.gl;gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var stride=this.vertByteSize;gl.vertexAttribPointer(this.shader.attributes.aVertexPosition,2,gl.FLOAT,false,stride,0);gl.vertexAttribPointer(this.shader.attributes.aTextureCoord,2,gl.FLOAT,false,stride,2*4);gl.vertexAttribPointer(this.shader.attributes.aColor,4,gl.UNSIGNED_BYTE,true,stride,4*4);};SpriteRenderer.prototype.destroy=function()
{this.renderer.gl.deleteBuffer(this.vertexBuffer);this.renderer.gl.deleteBuffer(this.indexBuffer);ObjectRenderer.prototype.destroy.call(this);this.shader.destroy();this.renderer=null;this.vertices=null;this.positions=null;this.colors=null;this.indices=null;this.vertexBuffer=null;this.indexBuffer=null;this.sprites=null;this.shader=null;};},{"../../const":22,"../../renderers/webgl/WebGLRenderer":49,"../../renderers/webgl/utils/ObjectRenderer":63}],69:[function(require,module,exports){var Sprite=require('../sprites/Sprite'),Texture=require('../textures/Texture'),math=require('../math'),utils=require('../utils'),CONST=require('../const');function Text(text,style,resolution)
{this.canvas=document.createElement('canvas');this.context=this.canvas.getContext('2d');this.resolution=resolution||CONST.RESOLUTION;this._text=null;this._style=null;var texture=Texture.fromCanvas(this.canvas);texture.trim=new math.Rectangle();Sprite.call(this,texture);this.text=text;this.style=style;}
Text.prototype=Object.create(Sprite.prototype);Text.prototype.constructor=Text;module.exports=Text;Text.fontPropertiesCache={};Text.fontPropertiesCanvas=document.createElement('canvas');Text.fontPropertiesContext=Text.fontPropertiesCanvas.getContext('2d');Object.defineProperties(Text.prototype,{width:{get:function()
{if(this.dirty)
{this.updateText();}
return this.scale.x*this._texture._frame.width;},set:function(value)
{this.scale.x=value/this._texture._frame.width;this._width=value;}},height:{get:function()
{if(this.dirty)
{this.updateText();}
return this.scale.y*this._texture._frame.height;},set:function(value)
{this.scale.y=value/this._texture._frame.height;this._height=value;}},style:{get:function()
{return this._style;},set:function(style)
{style=style||{};if(typeof style.fill==='number'){style.fill=utils.hex2string(style.fill);}
if(typeof style.stroke==='number'){style.stroke=utils.hex2string(style.stroke);}
if(typeof style.dropShadowColor==='number'){style.dropShadowColor=utils.hex2string(style.dropShadowColor);}
style.font=style.font||'bold 20pt Arial';style.fill=style.fill||'black';style.align=style.align||'left';style.stroke=style.stroke||'black';style.strokeThickness=style.strokeThickness||0;style.wordWrap=style.wordWrap||false;style.wordWrapWidth=style.wordWrapWidth||100;style.breakWords=style.breakWords||false;style.letterSpacing=style.letterSpacing||0;style.dropShadow=style.dropShadow||false;style.dropShadowColor=style.dropShadowColor||'#000000';style.dropShadowAngle=style.dropShadowAngle!==undefined?style.dropShadowAngle:Math.PI/6;style.dropShadowDistance=style.dropShadowDistance!==undefined?style.dropShadowDistance:5;style.dropShadowBlur=style.dropShadowBlur!==undefined?style.dropShadowBlur:0;style.padding=style.padding||0;style.textBaseline=style.textBaseline||'alphabetic';style.lineJoin=style.lineJoin||'miter';style.miterLimit=style.miterLimit||10;this._style=style;this.dirty=true;}},text:{get:function()
{return this._text;},set:function(text){text=text.toString()||' ';if(this._text===text)
{return;}
this._text=text;this.dirty=true;}}});Text.prototype.updateText=function()
{var style=this._style;this.context.font=style.font;var outputText=style.wordWrap?this.wordWrap(this._text):this._text;var lines=outputText.split(/(?:\r\n|\r|\n)/);var lineWidths=[];lineWidths.length=lines.length;var maxLineWidth=0;var fontProperties=this.determineFontProperties(style.font);for(var i=0;i<lines.length;i++)
{var lineWidth=this.context.measureText(lines[i]).width+((lines[i].length-1)*style.letterSpacing);lineWidths[i]=lineWidth;maxLineWidth=Math.max(maxLineWidth,lineWidth);}
var width=maxLineWidth+style.strokeThickness;if(style.dropShadow)
{width+=style.dropShadowDistance;}
this.canvas.width=Math.ceil((width+this.context.lineWidth)*this.resolution);var lineHeight=this.style.lineHeight||fontProperties.fontSize+style.strokeThickness;var height=lineHeight*lines.length;if(style.dropShadow)
{height+=style.dropShadowDistance;}
this.canvas.height=Math.ceil((height+this._style.padding*2)*this.resolution);this.context.scale(this.resolution,this.resolution);if(navigator.isCocoonJS)
{this.context.clearRect(0,0,this.canvas.width,this.canvas.height);}
this.context.font=style.font;this.context.strokeStyle=style.stroke;this.context.lineWidth=style.strokeThickness;this.context.textBaseline=style.textBaseline;this.context.lineJoin=style.lineJoin;this.context.miterLimit=style.miterLimit;var linePositionX;var linePositionY;if(style.dropShadow)
{if(style.dropShadowBlur>0){this.context.shadowColor=style.dropShadowColor;this.context.shadowBlur=style.dropShadowBlur;}else{this.context.fillStyle=style.dropShadowColor;}
var xShadowOffset=Math.cos(style.dropShadowAngle)*style.dropShadowDistance;var yShadowOffset=Math.sin(style.dropShadowAngle)*style.dropShadowDistance;for(i=0;i<lines.length;i++)
{linePositionX=style.strokeThickness/2;linePositionY=(style.strokeThickness/2+i*lineHeight)+fontProperties.ascent;if(style.align==='right')
{linePositionX+=maxLineWidth-lineWidths[i];}
else if(style.align==='center')
{linePositionX+=(maxLineWidth-lineWidths[i])/2;}
if(style.fill)
{this.drawLetterSpacing(lines[i],linePositionX+xShadowOffset,linePositionY+yShadowOffset+style.padding);}}}
this.context.fillStyle=style.fill;for(i=0;i<lines.length;i++)
{linePositionX=style.strokeThickness/2;linePositionY=(style.strokeThickness/2+i*lineHeight)+fontProperties.ascent;if(style.align==='right')
{linePositionX+=maxLineWidth-lineWidths[i];}
else if(style.align==='center')
{linePositionX+=(maxLineWidth-lineWidths[i])/2;}
if(style.stroke&&style.strokeThickness)
{this.drawLetterSpacing(lines[i],linePositionX,linePositionY+style.padding,true);}
if(style.fill)
{this.drawLetterSpacing(lines[i],linePositionX,linePositionY+style.padding);}}
this.updateTexture();};Text.prototype.drawLetterSpacing=function(text,x,y,isStroke)
{var style=this._style;var letterSpacing=style.letterSpacing;if(letterSpacing===0)
{if(isStroke)
{this.context.strokeText(text,x,y);}
else
{this.context.fillText(text,x,y);}
return;}
var characters=String.prototype.split.call(text,''),index=0,current,currentPosition=x;while(index<text.length)
{current=characters[index++];if(isStroke)
{this.context.strokeText(current,currentPosition,y);}
else
{this.context.fillText(current,currentPosition,y);}
currentPosition+=this.context.measureText(current).width+letterSpacing;}};Text.prototype.updateTexture=function()
{var texture=this._texture;var style=this._style;texture.baseTexture.hasLoaded=true;texture.baseTexture.resolution=this.resolution;texture.baseTexture.width=this.canvas.width/this.resolution;texture.baseTexture.height=this.canvas.height/this.resolution;texture.crop.width=texture._frame.width=this.canvas.width/this.resolution;texture.crop.height=texture._frame.height=this.canvas.height/this.resolution;texture.trim.x=0;texture.trim.y=-style.padding;texture.trim.width=texture._frame.width;texture.trim.height=texture._frame.height-style.padding*2;this._width=this.canvas.width/this.resolution;this._height=this.canvas.height/this.resolution;texture.baseTexture.emit('update',texture.baseTexture);this.dirty=false;};Text.prototype.renderWebGL=function(renderer)
{if(this.dirty)
{this.updateText();}
Sprite.prototype.renderWebGL.call(this,renderer);};Text.prototype._renderCanvas=function(renderer)
{if(this.dirty)
{this.updateText();}
Sprite.prototype._renderCanvas.call(this,renderer);};Text.prototype.determineFontProperties=function(fontStyle)
{var properties=Text.fontPropertiesCache[fontStyle];if(!properties)
{properties={};var canvas=Text.fontPropertiesCanvas;var context=Text.fontPropertiesContext;context.font=fontStyle;var width=Math.ceil(context.measureText('|MÉq').width);var baseline=Math.ceil(context.measureText('M').width);var height=2*baseline;baseline=baseline*1.4|0;canvas.width=width;canvas.height=height;context.fillStyle='#f00';context.fillRect(0,0,width,height);context.font=fontStyle;context.textBaseline='alphabetic';context.fillStyle='#000';context.fillText('|MÉq',0,baseline);var imagedata=context.getImageData(0,0,width,height).data;var pixels=imagedata.length;var line=width*4;var i,j;var idx=0;var stop=false;for(i=0;i<baseline;i++)
{for(j=0;j<line;j+=4)
{if(imagedata[idx+j]!==255)
{stop=true;break;}}
if(!stop)
{idx+=line;}
else
{break;}}
properties.ascent=baseline-i;idx=pixels-line;stop=false;for(i=height;i>baseline;i--)
{for(j=0;j<line;j+=4)
{if(imagedata[idx+j]!==255)
{stop=true;break;}}
if(!stop)
{idx-=line;}
else
{break;}}
properties.descent=i-baseline;properties.fontSize=properties.ascent+properties.descent;Text.fontPropertiesCache[fontStyle]=properties;}
return properties;};Text.prototype.wordWrap=function(text)
{var result='';var lines=text.split('\n');var wordWrapWidth=this._style.wordWrapWidth;for(var i=0;i<lines.length;i++)
{var spaceLeft=wordWrapWidth;var words=lines[i].split(' ');for(var j=0;j<words.length;j++)
{var wordWidth=this.context.measureText(words[j]).width;if(this._style.breakWords&&wordWidth>wordWrapWidth)
{var characters=words[j].split('');for(var c=0;c<characters.length;c++)
{var characterWidth=this.context.measureText(characters[c]).width;if(characterWidth>spaceLeft)
{result+='\n'+characters[c];spaceLeft=wordWrapWidth-characterWidth;}
else
{if(c===0)
{result+=' ';}
result+=characters[c];spaceLeft-=characterWidth;}}}
else
{var wordWidthWithSpace=wordWidth+this.context.measureText(' ').width;if(j===0||wordWidthWithSpace>spaceLeft)
{if(j>0)
{result+='\n';}
result+=words[j];spaceLeft=wordWrapWidth-wordWidth;}
else
{spaceLeft-=wordWidthWithSpace;result+=' '+words[j];}}}
if(i<lines.length-1)
{result+='\n';}}
return result;};Text.prototype.getBounds=function(matrix)
{if(this.dirty)
{this.updateText();}
return Sprite.prototype.getBounds.call(this,matrix);};Text.prototype.destroy=function(destroyBaseTexture)
{this.context=null;this.canvas=null;this._style=null;this._texture.destroy(destroyBaseTexture===undefined?true:destroyBaseTexture);};},{"../const":22,"../math":33,"../sprites/Sprite":67,"../textures/Texture":72,"../utils":77}],70:[function(require,module,exports){var utils=require('../utils'),CONST=require('../const'),EventEmitter=require('eventemitter3');function BaseTexture(source,scaleMode,resolution)
{EventEmitter.call(this);this.uid=utils.uid();this.resolution=resolution||1;this.width=100;this.height=100;this.realWidth=100;this.realHeight=100;this.scaleMode=scaleMode||CONST.SCALE_MODES.DEFAULT;this.hasLoaded=false;this.isLoading=false;this.source=null;this.premultipliedAlpha=true;this.imageUrl=null;this.isPowerOfTwo=false;this.mipmap=false;this._glTextures={};if(source)
{this.loadSource(source);}}
BaseTexture.prototype=Object.create(EventEmitter.prototype);BaseTexture.prototype.constructor=BaseTexture;module.exports=BaseTexture;BaseTexture.prototype.update=function()
{this.realWidth=this.source.naturalWidth||this.source.width;this.realHeight=this.source.naturalHeight||this.source.height;this.width=this.realWidth/this.resolution;this.height=this.realHeight/this.resolution;this.isPowerOfTwo=utils.isPowerOfTwo(this.realWidth,this.realHeight);this.emit('update',this);};BaseTexture.prototype.loadSource=function(source)
{var wasLoading=this.isLoading;this.hasLoaded=false;this.isLoading=false;if(wasLoading&&this.source)
{this.source.onload=null;this.source.onerror=null;}
this.source=source;if((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)
{this._sourceLoaded();}
else if(!source.getContext)
{this.isLoading=true;var scope=this;source.onload=function()
{source.onload=null;source.onerror=null;if(!scope.isLoading)
{return;}
scope.isLoading=false;scope._sourceLoaded();scope.emit('loaded',scope);};source.onerror=function()
{source.onload=null;source.onerror=null;if(!scope.isLoading)
{return;}
scope.isLoading=false;scope.emit('error',scope);};if(source.complete&&source.src)
{this.isLoading=false;source.onload=null;source.onerror=null;if(source.width&&source.height)
{this._sourceLoaded();if(wasLoading)
{this.emit('loaded',this);}}
else
{if(wasLoading)
{this.emit('error',this);}}}}};BaseTexture.prototype._sourceLoaded=function()
{this.hasLoaded=true;this.update();};BaseTexture.prototype.destroy=function()
{if(this.imageUrl)
{delete utils.BaseTextureCache[this.imageUrl];delete utils.TextureCache[this.imageUrl];this.imageUrl=null;if(!navigator.isCocoonJS)
{this.source.src='';}}
else if(this.source&&this.source._pixiId)
{delete utils.BaseTextureCache[this.source._pixiId];}
this.source=null;this.dispose();};BaseTexture.prototype.dispose=function()
{this.emit('dispose',this);};BaseTexture.prototype.updateSourceImage=function(newSrc)
{this.source.src=newSrc;this.loadSource(this.source);};BaseTexture.fromImage=function(imageUrl,crossorigin,scaleMode)
{var baseTexture=utils.BaseTextureCache[imageUrl];if(crossorigin===undefined&&imageUrl.indexOf('data:')!==0)
{crossorigin=true;}
if(!baseTexture)
{var image=new Image();if(crossorigin)
{image.crossOrigin='';}
baseTexture=new BaseTexture(image,scaleMode);baseTexture.imageUrl=imageUrl;image.src=imageUrl;utils.BaseTextureCache[imageUrl]=baseTexture;baseTexture.resolution=utils.getResolutionOfUrl(imageUrl);}
return baseTexture;};BaseTexture.fromCanvas=function(canvas,scaleMode)
{if(!canvas._pixiId)
{canvas._pixiId='canvas_'+utils.uid();}
var baseTexture=utils.BaseTextureCache[canvas._pixiId];if(!baseTexture)
{baseTexture=new BaseTexture(canvas,scaleMode);utils.BaseTextureCache[canvas._pixiId]=baseTexture;}
return baseTexture;};},{"../const":22,"../utils":77,"eventemitter3":10}],71:[function(require,module,exports){var BaseTexture=require('./BaseTexture'),Texture=require('./Texture'),RenderTarget=require('../renderers/webgl/utils/RenderTarget'),FilterManager=require('../renderers/webgl/managers/FilterManager'),CanvasBuffer=require('../renderers/canvas/utils/CanvasBuffer'),math=require('../math'),CONST=require('../const'),tempMatrix=new math.Matrix();function RenderTexture(renderer,width,height,scaleMode,resolution)
{if(!renderer)
{throw new Error('Unable to create RenderTexture, you must pass a renderer into the constructor.');}
width=width||100;height=height||100;resolution=resolution||CONST.RESOLUTION;var baseTexture=new BaseTexture();baseTexture.width=width;baseTexture.height=height;baseTexture.resolution=resolution;baseTexture.scaleMode=scaleMode||CONST.SCALE_MODES.DEFAULT;baseTexture.hasLoaded=true;Texture.call(this,baseTexture,new math.Rectangle(0,0,width,height));this.width=width;this.height=height;this.resolution=resolution;this.render=null;this.renderer=renderer;if(this.renderer.type===CONST.RENDERER_TYPE.WEBGL)
{var gl=this.renderer.gl;this.textureBuffer=new RenderTarget(gl,this.width,this.height,baseTexture.scaleMode,this.resolution);this.baseTexture._glTextures[gl.id]=this.textureBuffer.texture;this.filterManager=new FilterManager(this.renderer);this.filterManager.onContextChange();this.filterManager.resize(width,height);this.render=this.renderWebGL;this.renderer.currentRenderer.start();this.renderer.currentRenderTarget.activate();}
else
{this.render=this.renderCanvas;this.textureBuffer=new CanvasBuffer(this.width*this.resolution,this.height*this.resolution);this.baseTexture.source=this.textureBuffer.canvas;}
this.valid=true;this._updateUvs();}
RenderTexture.prototype=Object.create(Texture.prototype);RenderTexture.prototype.constructor=RenderTexture;module.exports=RenderTexture;RenderTexture.prototype.resize=function(width,height,updateBase)
{if(width===this.width&&height===this.height)
{return;}
this.valid=(width>0&&height>0);this.width=this._frame.width=this.crop.width=width;this.height=this._frame.height=this.crop.height=height;if(updateBase)
{this.baseTexture.width=this.width;this.baseTexture.height=this.height;}
if(!this.valid)
{return;}
this.textureBuffer.resize(this.width,this.height);if(this.filterManager)
{this.filterManager.resize(this.width,this.height);}};RenderTexture.prototype.clear=function()
{if(!this.valid)
{return;}
if(this.renderer.type===CONST.RENDERER_TYPE.WEBGL)
{this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer);}
this.textureBuffer.clear();};RenderTexture.prototype.renderWebGL=function(displayObject,matrix,clear,updateTransform)
{if(!this.valid)
{return;}
updateTransform=(updateTransform!==undefined)?updateTransform:true;this.textureBuffer.transform=matrix;this.textureBuffer.activate();displayObject.worldAlpha=1;if(updateTransform)
{displayObject.worldTransform.identity();displayObject.currentBounds=null;var children=displayObject.children;var i,j;for(i=0,j=children.length;i<j;++i)
{children[i].updateTransform();}}
var temp=this.renderer.filterManager;this.renderer.filterManager=this.filterManager;this.renderer.renderDisplayObject(displayObject,this.textureBuffer,clear);this.renderer.filterManager=temp;};RenderTexture.prototype.renderCanvas=function(displayObject,matrix,clear,updateTransform)
{if(!this.valid)
{return;}
updateTransform=!!updateTransform;var wt=tempMatrix;wt.identity();if(matrix)
{wt.append(matrix);}
var cachedWt=displayObject.worldTransform;displayObject.worldTransform=wt;displayObject.worldAlpha=1;var children=displayObject.children;var i,j;for(i=0,j=children.length;i<j;++i)
{children[i].updateTransform();}
if(clear)
{this.textureBuffer.clear();}
var context=this.textureBuffer.context;var realResolution=this.renderer.resolution;this.renderer.resolution=this.resolution;this.renderer.renderDisplayObject(displayObject,context);this.renderer.resolution=realResolution;if(displayObject.worldTransform===wt)
{displayObject.worldTransform=cachedWt;}};RenderTexture.prototype.destroy=function()
{Texture.prototype.destroy.call(this,true);this.textureBuffer.destroy();if(this.filterManager)
{this.filterManager.destroy();}
this.renderer=null;};RenderTexture.prototype.getImage=function()
{var image=new Image();image.src=this.getBase64();return image;};RenderTexture.prototype.getBase64=function()
{return this.getCanvas().toDataURL();};RenderTexture.prototype.getCanvas=function()
{if(this.renderer.type===CONST.RENDERER_TYPE.WEBGL)
{var gl=this.renderer.gl;var width=this.textureBuffer.size.width;var height=this.textureBuffer.size.height;var webGLPixels=new Uint8Array(4*width*height);gl.bindFramebuffer(gl.FRAMEBUFFER,this.textureBuffer.frameBuffer);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,webGLPixels);gl.bindFramebuffer(gl.FRAMEBUFFER,null);var tempCanvas=new CanvasBuffer(width,height);var canvasData=tempCanvas.context.getImageData(0,0,width,height);canvasData.data.set(webGLPixels);tempCanvas.context.putImageData(canvasData,0,0);return tempCanvas.canvas;}
else
{return this.textureBuffer.canvas;}};RenderTexture.prototype.getPixels=function()
{var width,height;if(this.renderer.type===CONST.RENDERER_TYPE.WEBGL)
{var gl=this.renderer.gl;width=this.textureBuffer.size.width;height=this.textureBuffer.size.height;var webGLPixels=new Uint8Array(4*width*height);gl.bindFramebuffer(gl.FRAMEBUFFER,this.textureBuffer.frameBuffer);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,webGLPixels);gl.bindFramebuffer(gl.FRAMEBUFFER,null);return webGLPixels;}
else
{width=this.textureBuffer.canvas.width;height=this.textureBuffer.canvas.height;return this.textureBuffer.canvas.getContext('2d').getImageData(0,0,width,height).data;}};RenderTexture.prototype.getPixel=function(x,y)
{if(this.renderer.type===CONST.RENDERER_TYPE.WEBGL)
{var gl=this.renderer.gl;var webGLPixels=new Uint8Array(4);gl.bindFramebuffer(gl.FRAMEBUFFER,this.textureBuffer.frameBuffer);gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,webGLPixels);gl.bindFramebuffer(gl.FRAMEBUFFER,null);return webGLPixels;}
else
{return this.textureBuffer.canvas.getContext('2d').getImageData(x,y,1,1).data;}};},{"../const":22,"../math":33,"../renderers/canvas/utils/CanvasBuffer":45,"../renderers/webgl/managers/FilterManager":54,"../renderers/webgl/utils/RenderTarget":65,"./BaseTexture":70,"./Texture":72}],72:[function(require,module,exports){var BaseTexture=require('./BaseTexture'),VideoBaseTexture=require('./VideoBaseTexture'),TextureUvs=require('./TextureUvs'),EventEmitter=require('eventemitter3'),math=require('../math'),utils=require('../utils');function Texture(baseTexture,frame,crop,trim,rotate)
{EventEmitter.call(this);this.noFrame=false;if(!frame)
{this.noFrame=true;frame=new math.Rectangle(0,0,1,1);}
if(baseTexture instanceof Texture)
{baseTexture=baseTexture.baseTexture;}
this.baseTexture=baseTexture;this._frame=frame;this.trim=trim;this.valid=false;this.requiresUpdate=false;this._uvs=null;this.width=0;this.height=0;this.crop=crop||frame;this._rotate=+(rotate||0);if(rotate===true){this._rotate=2;}else{if(this._rotate%2!==0){throw'attempt to use diamond-shaped UVs. If you are sure, set rotation manually';}}
if(baseTexture.hasLoaded)
{if(this.noFrame)
{frame=new math.Rectangle(0,0,baseTexture.width,baseTexture.height);baseTexture.on('update',this.onBaseTextureUpdated,this);}
this.frame=frame;}
else
{baseTexture.once('loaded',this.onBaseTextureLoaded,this);}}
Texture.prototype=Object.create(EventEmitter.prototype);Texture.prototype.constructor=Texture;module.exports=Texture;Object.defineProperties(Texture.prototype,{frame:{get:function()
{return this._frame;},set:function(frame)
{this._frame=frame;this.noFrame=false;this.width=frame.width;this.height=frame.height;if(!this.trim&&!this.rotate&&(frame.x+frame.width>this.baseTexture.width||frame.y+frame.height>this.baseTexture.height))
{throw new Error('Texture Error: frame does not fit inside the base Texture dimensions '+this);}
this.valid=frame&&frame.width&&frame.height&&this.baseTexture.hasLoaded;if(this.trim)
{this.width=this.trim.width;this.height=this.trim.height;this._frame.width=this.trim.width;this._frame.height=this.trim.height;}
else
{this.crop=frame;}
if(this.valid)
{this._updateUvs();}}},rotate:{get:function()
{return this._rotate;},set:function(rotate)
{this._rotate=rotate;if(this.valid)
{this._updateUvs();}}}});Texture.prototype.update=function()
{this.baseTexture.update();};Texture.prototype.onBaseTextureLoaded=function(baseTexture)
{if(this.noFrame)
{this.frame=new math.Rectangle(0,0,baseTexture.width,baseTexture.height);}
else
{this.frame=this._frame;}
this.emit('update',this);};Texture.prototype.onBaseTextureUpdated=function(baseTexture)
{this._frame.width=baseTexture.width;this._frame.height=baseTexture.height;this.emit('update',this);};Texture.prototype.destroy=function(destroyBase)
{if(this.baseTexture)
{if(destroyBase)
{this.baseTexture.destroy();}
this.baseTexture.off('update',this.onBaseTextureUpdated,this);this.baseTexture.off('loaded',this.onBaseTextureLoaded,this);this.baseTexture=null;}
this._frame=null;this._uvs=null;this.trim=null;this.crop=null;this.valid=false;this.off('dispose',this.dispose,this);this.off('update',this.update,this);};Texture.prototype.clone=function()
{return new Texture(this.baseTexture,this.frame,this.crop,this.trim,this.rotate);};Texture.prototype._updateUvs=function()
{if(!this._uvs)
{this._uvs=new TextureUvs();}
this._uvs.set(this.crop,this.baseTexture,this.rotate);};Texture.fromImage=function(imageUrl,crossorigin,scaleMode)
{var texture=utils.TextureCache[imageUrl];if(!texture)
{texture=new Texture(BaseTexture.fromImage(imageUrl,crossorigin,scaleMode));utils.TextureCache[imageUrl]=texture;}
return texture;};Texture.fromFrame=function(frameId)
{var texture=utils.TextureCache[frameId];if(!texture)
{throw new Error('The frameId "'+frameId+'" does not exist in the texture cache');}
return texture;};Texture.fromCanvas=function(canvas,scaleMode)
{return new Texture(BaseTexture.fromCanvas(canvas,scaleMode));};Texture.fromVideo=function(video,scaleMode)
{if(typeof video==='string')
{return Texture.fromVideoUrl(video,scaleMode);}
else
{return new Texture(VideoBaseTexture.fromVideo(video,scaleMode));}};Texture.fromVideoUrl=function(videoUrl,scaleMode)
{return new Texture(VideoBaseTexture.fromUrl(videoUrl,scaleMode));};Texture.addTextureToCache=function(texture,id)
{utils.TextureCache[id]=texture;};Texture.removeTextureFromCache=function(id)
{var texture=utils.TextureCache[id];delete utils.TextureCache[id];delete utils.BaseTextureCache[id];return texture;};Texture.EMPTY=new Texture(new BaseTexture());},{"../math":33,"../utils":77,"./BaseTexture":70,"./TextureUvs":73,"./VideoBaseTexture":74,"eventemitter3":10}],73:[function(require,module,exports){function TextureUvs()
{this.x0=0;this.y0=0;this.x1=1;this.y1=0;this.x2=1;this.y2=1;this.x3=0;this.y3=1;}
module.exports=TextureUvs;var GroupD8=require('../math/GroupD8');TextureUvs.prototype.set=function(frame,baseFrame,rotate)
{var tw=baseFrame.width;var th=baseFrame.height;if(rotate)
{var swapWidthHeight=GroupD8.isSwapWidthHeight(rotate);var w2=(swapWidthHeight?frame.height:frame.width)/2/tw;var h2=(swapWidthHeight?frame.width:frame.height)/2/th;var cX=frame.x/tw+w2;var cY=frame.y/th+h2;rotate=GroupD8.add(rotate,GroupD8.NW);this.x0=cX+w2*GroupD8.uX(rotate);this.y0=cY+h2*GroupD8.uY(rotate);rotate=GroupD8.add(rotate,2);this.x1=cX+w2*GroupD8.uX(rotate);this.y1=cY+h2*GroupD8.uY(rotate);rotate=GroupD8.add(rotate,2);this.x2=cX+w2*GroupD8.uX(rotate);this.y2=cY+h2*GroupD8.uY(rotate);rotate=GroupD8.add(rotate,2);this.x3=cX+w2*GroupD8.uX(rotate);this.y3=cY+h2*GroupD8.uY(rotate);}
else
{this.x0=frame.x/tw;this.y0=frame.y/th;this.x1=(frame.x+frame.width)/tw;this.y1=frame.y/th;this.x2=(frame.x+frame.width)/tw;this.y2=(frame.y+frame.height)/th;this.x3=frame.x/tw;this.y3=(frame.y+frame.height)/th;}};},{"../math/GroupD8":30}],74:[function(require,module,exports){var BaseTexture=require('./BaseTexture'),utils=require('../utils');function VideoBaseTexture(source,scaleMode)
{if(!source)
{throw new Error('No video source element specified.');}
if((source.readyState===source.HAVE_ENOUGH_DATA||source.readyState===source.HAVE_FUTURE_DATA)&&source.width&&source.height)
{source.complete=true;}
BaseTexture.call(this,source,scaleMode);this.autoUpdate=false;this._onUpdate=this._onUpdate.bind(this);this._onCanPlay=this._onCanPlay.bind(this);if(!source.complete)
{source.addEventListener('canplay',this._onCanPlay);source.addEventListener('canplaythrough',this._onCanPlay);source.addEventListener('play',this._onPlayStart.bind(this));source.addEventListener('pause',this._onPlayStop.bind(this));}
this.__loaded=false;}
VideoBaseTexture.prototype=Object.create(BaseTexture.prototype);VideoBaseTexture.prototype.constructor=VideoBaseTexture;module.exports=VideoBaseTexture;VideoBaseTexture.prototype._onUpdate=function()
{if(this.autoUpdate)
{window.requestAnimationFrame(this._onUpdate);this.update();}};VideoBaseTexture.prototype._onPlayStart=function()
{if(!this.autoUpdate)
{window.requestAnimationFrame(this._onUpdate);this.autoUpdate=true;}};VideoBaseTexture.prototype._onPlayStop=function()
{this.autoUpdate=false;};VideoBaseTexture.prototype._onCanPlay=function()
{this.hasLoaded=true;if(this.source)
{this.source.removeEventListener('canplay',this._onCanPlay);this.source.removeEventListener('canplaythrough',this._onCanPlay);this.width=this.source.videoWidth;this.height=this.source.videoHeight;this.source.play();if(!this.__loaded)
{this.__loaded=true;this.emit('loaded',this);}}};VideoBaseTexture.prototype.destroy=function()
{if(this.source&&this.source._pixiId)
{delete utils.BaseTextureCache[this.source._pixiId];delete this.source._pixiId;}
BaseTexture.prototype.destroy.call(this);};VideoBaseTexture.fromVideo=function(video,scaleMode)
{if(!video._pixiId)
{video._pixiId='video_'+utils.uid();}
var baseTexture=utils.BaseTextureCache[video._pixiId];if(!baseTexture)
{baseTexture=new VideoBaseTexture(video,scaleMode);utils.BaseTextureCache[video._pixiId]=baseTexture;}
return baseTexture;};VideoBaseTexture.fromUrl=function(videoSrc,scaleMode)
{var video=document.createElement('video');if(Array.isArray(videoSrc))
{for(var i=0;i<videoSrc.length;++i)
{video.appendChild(createSource(videoSrc[i].src||videoSrc[i],videoSrc[i].mime));}}
else
{video.appendChild(createSource(videoSrc.src||videoSrc,videoSrc.mime));}
video.load();video.play();return VideoBaseTexture.fromVideo(video,scaleMode);};VideoBaseTexture.fromUrls=VideoBaseTexture.fromUrl;function createSource(path,type)
{if(!type)
{type='video/'+path.substr(path.lastIndexOf('.')+1);}
var source=document.createElement('source');source.src=path;source.type=type;return source;}},{"../utils":77,"./BaseTexture":70}],75:[function(require,module,exports){var CONST=require('../const'),EventEmitter=require('eventemitter3'),TICK='tick';function Ticker()
{var _this=this;this._tick=function _tick(time){_this._requestId=null;if(_this.started)
{_this.update(time);if(_this.started&&_this._requestId===null&&_this._emitter.listeners(TICK,true))
{_this._requestId=requestAnimationFrame(_this._tick);}}};this._emitter=new EventEmitter();this._requestId=null;this._maxElapsedMS=100;this.autoStart=false;this.deltaTime=1;this.elapsedMS=1/CONST.TARGET_FPMS;this.lastTime=0;this.speed=1;this.started=false;}
Object.defineProperties(Ticker.prototype,{FPS:{get:function()
{return 1000/this.elapsedMS;}},minFPS:{get:function()
{return 1000/this._maxElapsedMS;},set:function(fps)
{var minFPMS=Math.min(Math.max(0,fps)/1000,CONST.TARGET_FPMS);this._maxElapsedMS=1/minFPMS;}}});Ticker.prototype._requestIfNeeded=function _requestIfNeeded()
{if(this._requestId===null&&this._emitter.listeners(TICK,true))
{this.lastTime=performance.now();this._requestId=requestAnimationFrame(this._tick);}};Ticker.prototype._cancelIfNeeded=function _cancelIfNeeded()
{if(this._requestId!==null)
{cancelAnimationFrame(this._requestId);this._requestId=null;}};Ticker.prototype._startIfPossible=function _startIfPossible()
{if(this.started)
{this._requestIfNeeded();}
else if(this.autoStart)
{this.start();}};Ticker.prototype.add=function add(fn,context)
{this._emitter.on(TICK,fn,context);this._startIfPossible();return this;};Ticker.prototype.addOnce=function addOnce(fn,context)
{this._emitter.once(TICK,fn,context);this._startIfPossible();return this;};Ticker.prototype.remove=function remove(fn,context)
{this._emitter.off(TICK,fn,context);if(!this._emitter.listeners(TICK,true))
{this._cancelIfNeeded();}
return this;};Ticker.prototype.start=function start()
{if(!this.started)
{this.started=true;this._requestIfNeeded();}};Ticker.prototype.stop=function stop()
{if(this.started)
{this.started=false;this._cancelIfNeeded();}};Ticker.prototype.update=function update(currentTime)
{var elapsedMS;currentTime=currentTime||performance.now();elapsedMS=this.elapsedMS=currentTime-this.lastTime;if(elapsedMS>this._maxElapsedMS)
{elapsedMS=this._maxElapsedMS;}
this.deltaTime=elapsedMS*CONST.TARGET_FPMS*this.speed;this._emitter.emit(TICK,this.deltaTime);this.lastTime=currentTime;};module.exports=Ticker;},{"../const":22,"eventemitter3":10}],76:[function(require,module,exports){var Ticker=require('./Ticker');var shared=new Ticker();shared.autoStart=true;module.exports={shared:shared,Ticker:Ticker};},{"./Ticker":75}],77:[function(require,module,exports){var CONST=require('../const');var utils=module.exports={_uid:0,_saidHello:false,EventEmitter:require('eventemitter3'),pluginTarget:require('./pluginTarget'),async:require('async'),uid:function()
{return++utils._uid;},hex2rgb:function(hex,out)
{out=out||[];out[0]=(hex>>16&0xFF)/255;out[1]=(hex>>8&0xFF)/255;out[2]=(hex&0xFF)/255;return out;},hex2string:function(hex)
{hex=hex.toString(16);hex='000000'.substr(0,6-hex.length)+hex;return'#'+hex;},rgb2hex:function(rgb)
{return((rgb[0]*255<<16)+(rgb[1]*255<<8)+rgb[2]*255);},canUseNewCanvasBlendModes:function()
{if(typeof document==='undefined')
{return false;}
var pngHead='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';var pngEnd='AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';var magenta=new Image();magenta.src=pngHead+'AP804Oa6'+pngEnd;var yellow=new Image();yellow.src=pngHead+'/wCKxvRF'+pngEnd;var canvas=document.createElement('canvas');canvas.width=6;canvas.height=1;var context=canvas.getContext('2d');context.globalCompositeOperation='multiply';context.drawImage(magenta,0,0);context.drawImage(yellow,2,0);var data=context.getImageData(2,0,1,1).data;return(data[0]===255&&data[1]===0&&data[2]===0);},getNextPowerOfTwo:function(number)
{if(number>0&&(number&(number-1))===0)
{return number;}
else
{var result=1;while(result<number)
{result<<=1;}
return result;}},isPowerOfTwo:function(width,height)
{return(width>0&&(width&(width-1))===0&&height>0&&(height&(height-1))===0);},getResolutionOfUrl:function(url)
{var resolution=CONST.RETINA_PREFIX.exec(url);if(resolution)
{return parseFloat(resolution[1]);}
return 1;},sayHello:function(type)
{if(utils._saidHello)
{return;}
if(navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
{var args=['\n %c %c %c Pixi.js '+CONST.VERSION+' - ✰ '+type+' ✰  %c '+' %c '+' http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n','background: #ff66a5; padding:5px 0;','background: #ff66a5; padding:5px 0;','color: #ff66a5; background: #030307; padding:5px 0;','background: #ff66a5; padding:5px 0;','background: #ffc3dc; padding:5px 0;','background: #ff66a5; padding:5px 0;','color: #ff2424; background: #fff; padding:5px 0;','color: #ff2424; background: #fff; padding:5px 0;','color: #ff2424; background: #fff; padding:5px 0;'];}
else if(window.console)
{}
utils._saidHello=true;},isWebGLSupported:function()
{var contextOptions={stencil:true};try
{if(!window.WebGLRenderingContext)
{return false;}
var canvas=document.createElement('canvas'),gl=canvas.getContext('webgl',contextOptions)||canvas.getContext('experimental-webgl',contextOptions);return!!(gl&&gl.getContextAttributes().stencil);}
catch(e)
{return false;}},sign:function(n)
{return n?(n<0?-1:1):0;},removeItems:function(arr,startIdx,removeCount)
{var length=arr.length;if(startIdx>=length||removeCount===0)
{return;}
removeCount=(startIdx+removeCount>length?length-startIdx:removeCount);for(var i=startIdx,len=length-removeCount;i<len;++i)
{arr[i]=arr[i+removeCount];}
arr.length=len;},TextureCache:{},BaseTextureCache:{}};},{"../const":22,"./pluginTarget":78,"async":1,"eventemitter3":10}],78:[function(require,module,exports){function pluginTarget(obj)
{obj.__plugins={};obj.registerPlugin=function(pluginName,ctor)
{obj.__plugins[pluginName]=ctor;};obj.prototype.initPlugins=function()
{this.plugins=this.plugins||{};for(var o in obj.__plugins)
{this.plugins[o]=new(obj.__plugins[o])(this);}};obj.prototype.destroyPlugins=function()
{for(var o in this.plugins)
{this.plugins[o].destroy();this.plugins[o]=null;}
this.plugins=null;};}
module.exports={mixin:function mixin(obj)
{pluginTarget(obj);}};},{}],79:[function(require,module,exports){var core=require('./core'),mesh=require('./mesh'),extras=require('./extras'),filters=require('./filters');core.SpriteBatch=function()
{throw new ReferenceError('SpriteBatch does not exist any more, please use the new ParticleContainer instead.');};core.AssetLoader=function()
{throw new ReferenceError('The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.');};Object.defineProperties(core,{Stage:{get:function()
{console.warn('You do not need to use a PIXI Stage any more, you can simply render any container.');return core.Container;}},DisplayObjectContainer:{get:function()
{console.warn('DisplayObjectContainer has been shortened to Container, please use Container from now on.');return core.Container;}},Strip:{get:function()
{console.warn('The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on.');return mesh.Mesh;}},Rope:{get:function()
{console.warn('The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on.');return mesh.Rope;}},MovieClip:{get:function()
{console.warn('The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on.');return extras.MovieClip;}},TilingSprite:{get:function()
{console.warn('The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on.');return extras.TilingSprite;}},BitmapText:{get:function()
{console.warn('The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on.');return extras.BitmapText;}},blendModes:{get:function()
{console.warn('The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on.');return core.BLEND_MODES;}},scaleModes:{get:function()
{console.warn('The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on.');return core.SCALE_MODES;}},BaseTextureCache:{get:function()
{console.warn('The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on.');return core.utils.BaseTextureCache;}},TextureCache:{get:function()
{console.warn('The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on.');return core.utils.TextureCache;}},math:{get:function()
{console.warn('The math namespace is deprecated, please access members already accessible on PIXI.');return core;}}});core.Sprite.prototype.setTexture=function(texture)
{this.texture=texture;console.warn('setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;');};extras.BitmapText.prototype.setText=function(text)
{this.text=text;console.warn('setText is now deprecated, please use the text property, e.g : myBitmapText.text = \'my text\';');};core.Text.prototype.setText=function(text)
{this.text=text;console.warn('setText is now deprecated, please use the text property, e.g : myText.text = \'my text\';');};core.Text.prototype.setStyle=function(style)
{this.style=style;console.warn('setStyle is now deprecated, please use the style property, e.g : myText.style = style;');};core.Texture.prototype.setFrame=function(frame)
{this.frame=frame;console.warn('setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;');};Object.defineProperties(filters,{AbstractFilter:{get:function()
{console.warn('filters.AbstractFilter is an undocumented alias, please use AbstractFilter from now on.');return core.AbstractFilter;}},FXAAFilter:{get:function()
{console.warn('filters.FXAAFilter is an undocumented alias, please use FXAAFilter from now on.');return core.FXAAFilter;}},SpriteMaskFilter:{get:function()
{console.warn('filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on.');return core.SpriteMaskFilter;}}});core.utils.uuid=function()
{console.warn('utils.uuid() is deprecated, please use utils.uid() from now on.');return core.utils.uid();};},{"./core":29,"./extras":86,"./filters":103,"./mesh":128}],80:[function(require,module,exports){var core=require('../core');function BitmapText(text,style)
{core.Container.call(this);style=style||{};this.textWidth=0;this.textHeight=0;this._glyphs=[];this._font={tint:style.tint!==undefined?style.tint:0xFFFFFF,align:style.align||'left',name:null,size:0};this.font=style.font;this._text=text;this.maxWidth=0;this.maxLineHeight=0;this.dirty=false;this.updateText();}
BitmapText.prototype=Object.create(core.Container.prototype);BitmapText.prototype.constructor=BitmapText;module.exports=BitmapText;Object.defineProperties(BitmapText.prototype,{tint:{get:function()
{return this._font.tint;},set:function(value)
{this._font.tint=(typeof value==='number'&&value>=0)?value:0xFFFFFF;this.dirty=true;}},align:{get:function()
{return this._font.align;},set:function(value)
{this._font.align=value||'left';this.dirty=true;}},font:{get:function()
{return this._font;},set:function(value)
{if(!value){return;}
if(typeof value==='string'){value=value.split(' ');this._font.name=value.length===1?value[0]:value.slice(1).join(' ');this._font.size=value.length>=2?parseInt(value[0],10):BitmapText.fonts[this._font.name].size;}
else{this._font.name=value.name;this._font.size=typeof value.size==='number'?value.size:parseInt(value.size,10);}
this.dirty=true;}},text:{get:function()
{return this._text;},set:function(value)
{value=value.toString()||' ';if(this._text===value)
{return;}
this._text=value;this.dirty=true;}}});BitmapText.prototype.updateText=function()
{var data=BitmapText.fonts[this._font.name];var pos=new core.Point();var prevCharCode=null;var chars=[];var lastLineWidth=0;var maxLineWidth=0;var lineWidths=[];var line=0;var scale=this._font.size/data.size;var lastSpace=-1;var maxLineHeight=0;for(var i=0;i<this.text.length;i++)
{var charCode=this.text.charCodeAt(i);lastSpace=/(\s)/.test(this.text.charAt(i))?i:lastSpace;if(/(?:\r\n|\r|\n)/.test(this.text.charAt(i)))
{lineWidths.push(lastLineWidth);maxLineWidth=Math.max(maxLineWidth,lastLineWidth);line++;pos.x=0;pos.y+=data.lineHeight;prevCharCode=null;continue;}
if(lastSpace!==-1&&this.maxWidth>0&&pos.x*scale>this.maxWidth)
{core.utils.removeItems(chars,lastSpace,i-lastSpace);i=lastSpace;lastSpace=-1;lineWidths.push(lastLineWidth);maxLineWidth=Math.max(maxLineWidth,lastLineWidth);line++;pos.x=0;pos.y+=data.lineHeight;prevCharCode=null;continue;}
var charData=data.chars[charCode];if(!charData)
{continue;}
if(prevCharCode&&charData.kerning[prevCharCode])
{pos.x+=charData.kerning[prevCharCode];}
chars.push({texture:charData.texture,line:line,charCode:charCode,position:new core.Point(pos.x+charData.xOffset,pos.y+charData.yOffset)});lastLineWidth=pos.x+(charData.texture.width+charData.xOffset);pos.x+=charData.xAdvance;maxLineHeight=Math.max(maxLineHeight,(charData.yOffset+charData.texture.height));prevCharCode=charCode;}
lineWidths.push(lastLineWidth);maxLineWidth=Math.max(maxLineWidth,lastLineWidth);var lineAlignOffsets=[];for(i=0;i<=line;i++)
{var alignOffset=0;if(this._font.align==='right')
{alignOffset=maxLineWidth-lineWidths[i];}
else if(this._font.align==='center')
{alignOffset=(maxLineWidth-lineWidths[i])/2;}
lineAlignOffsets.push(alignOffset);}
var lenChars=chars.length;var tint=this.tint;for(i=0;i<lenChars;i++)
{var c=this._glyphs[i];if(c)
{c.texture=chars[i].texture;}
else
{c=new core.Sprite(chars[i].texture);this._glyphs.push(c);}
c.position.x=(chars[i].position.x+lineAlignOffsets[chars[i].line])*scale;c.position.y=chars[i].position.y*scale;c.scale.x=c.scale.y=scale;c.tint=tint;if(!c.parent)
{this.addChild(c);}}
for(i=lenChars;i<this._glyphs.length;++i)
{this.removeChild(this._glyphs[i]);}
this.textWidth=maxLineWidth*scale;this.textHeight=(pos.y+data.lineHeight)*scale;this.maxLineHeight=maxLineHeight*scale;};BitmapText.prototype.updateTransform=function()
{this.validate();this.containerUpdateTransform();};BitmapText.prototype.getLocalBounds=function()
{this.validate();return core.Container.prototype.getLocalBounds.call(this);};BitmapText.prototype.validate=function()
{if(this.dirty)
{this.updateText();this.dirty=false;}};BitmapText.fonts={};},{"../core":29}],81:[function(require,module,exports){var core=require('../core');function MovieClip(textures)
{core.Sprite.call(this,textures[0]instanceof core.Texture?textures[0]:textures[0].texture);this._textures=null;this._durations=null;this.textures=textures;this.animationSpeed=1;this.loop=true;this.onComplete=null;this._currentTime=0;this.playing=false;}
MovieClip.prototype=Object.create(core.Sprite.prototype);MovieClip.prototype.constructor=MovieClip;module.exports=MovieClip;Object.defineProperties(MovieClip.prototype,{totalFrames:{get:function()
{return this._textures.length;}},textures:{get:function()
{return this._textures;},set:function(value)
{if(value[0]instanceof core.Texture)
{this._textures=value;this._durations=null;}
else
{this._textures=[];this._durations=[];for(var i=0;i<value.length;i++)
{this._textures.push(value[i].texture);this._durations.push(value[i].time);}}}},currentFrame:{get:function()
{var currentFrame=Math.floor(this._currentTime)%this._textures.length;if(currentFrame<0)
{currentFrame+=this._textures.length;}
return currentFrame;}}});MovieClip.prototype.stop=function()
{if(!this.playing)
{return;}
this.playing=false;core.ticker.shared.remove(this.update,this);};MovieClip.prototype.play=function()
{if(this.playing)
{return;}
this.playing=true;core.ticker.shared.add(this.update,this);};MovieClip.prototype.gotoAndStop=function(frameNumber)
{this.stop();this._currentTime=frameNumber;this._texture=this._textures[this.currentFrame];};MovieClip.prototype.gotoAndPlay=function(frameNumber)
{this._currentTime=frameNumber;this.play();};MovieClip.prototype.update=function(deltaTime)
{var elapsed=this.animationSpeed*deltaTime;if(this._durations!==null)
{var lag=this._currentTime%1*this._durations[this.currentFrame];lag+=elapsed/60*1000;while(lag<0)
{this._currentTime--;lag+=this._durations[this.currentFrame];}
var sign=Math.sign(this.animationSpeed*deltaTime);this._currentTime=Math.floor(this._currentTime);while(lag>=this._durations[this.currentFrame])
{lag-=this._durations[this.currentFrame]*sign;this._currentTime+=sign;}
this._currentTime+=lag/this._durations[this.currentFrame];}
else
{this._currentTime+=elapsed;}
if(this._currentTime<0&&!this.loop)
{this.gotoAndStop(0);if(this.onComplete)
{this.onComplete();}}
else if(this._currentTime>=this._textures.length&&!this.loop)
{this.gotoAndStop(this._textures.length-1);if(this.onComplete)
{this.onComplete();}}
else
{this._texture=this._textures[this.currentFrame];}};MovieClip.prototype.destroy=function()
{this.stop();core.Sprite.prototype.destroy.call(this);};MovieClip.fromFrames=function(frames)
{var textures=[];for(var i=0;i<frames.length;++i)
{textures.push(new core.Texture.fromFrame(frames[i]));}
return new MovieClip(textures);};MovieClip.fromImages=function(images)
{var textures=[];for(var i=0;i<images.length;++i)
{textures.push(new core.Texture.fromImage(images[i]));}
return new MovieClip(textures);};},{"../core":29}],82:[function(require,module,exports){var core=require('../core'),tempPoint=new core.Point(),CanvasTinter=require('../core/renderers/canvas/utils/CanvasTinter');function TilingSprite(texture,width,height)
{core.Sprite.call(this,texture);this.tileScale=new core.Point(1,1);this.tilePosition=new core.Point(0,0);this._width=width||100;this._height=height||100;this._uvs=new core.TextureUvs();this._canvasPattern=null;this.shader=new core.AbstractFilter(['precision lowp float;','attribute vec2 aVertexPosition;','attribute vec2 aTextureCoord;','attribute vec4 aColor;','uniform mat3 projectionMatrix;','uniform vec4 uFrame;','uniform vec4 uTransform;','varying vec2 vTextureCoord;','varying vec4 vColor;','void main(void){','   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);','   vec2 coord = aTextureCoord;','   coord -= uTransform.xy;','   coord /= uTransform.zw;','   vTextureCoord = coord;','   vColor = vec4(aColor.rgb * aColor.a, aColor.a);','}'].join('\n'),['precision lowp float;','varying vec2 vTextureCoord;','varying vec4 vColor;','uniform sampler2D uSampler;','uniform vec4 uFrame;','uniform vec2 uPixelSize;','void main(void){','   vec2 coord = mod(vTextureCoord, uFrame.zw);','   coord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);','   coord += uFrame.xy;','   gl_FragColor =  texture2D(uSampler, coord) * vColor ;','}'].join('\n'),{uFrame:{type:'4fv',value:[0,0,1,1]},uTransform:{type:'4fv',value:[0,0,1,1]},uPixelSize:{type:'2fv',value:[1,1]}});}
TilingSprite.prototype=Object.create(core.Sprite.prototype);TilingSprite.prototype.constructor=TilingSprite;module.exports=TilingSprite;Object.defineProperties(TilingSprite.prototype,{width:{get:function()
{return this._width;},set:function(value)
{this._width=value;}},height:{get:function()
{return this._height;},set:function(value)
{this._height=value;}}});TilingSprite.prototype._onTextureUpdate=function()
{return;};TilingSprite.prototype._renderWebGL=function(renderer)
{var texture=this._texture;if(!texture||!texture._uvs)
{return;}
var tempUvs=texture._uvs,tempWidth=texture._frame.width,tempHeight=texture._frame.height,tw=texture.baseTexture.width,th=texture.baseTexture.height;texture._uvs=this._uvs;texture._frame.width=this.width;texture._frame.height=this.height;this.shader.uniforms.uPixelSize.value[0]=1.0/tw;this.shader.uniforms.uPixelSize.value[1]=1.0/th;this.shader.uniforms.uFrame.value[0]=tempUvs.x0;this.shader.uniforms.uFrame.value[1]=tempUvs.y0;this.shader.uniforms.uFrame.value[2]=tempUvs.x1-tempUvs.x0;this.shader.uniforms.uFrame.value[3]=tempUvs.y2-tempUvs.y0;this.shader.uniforms.uTransform.value[0]=(this.tilePosition.x%(tempWidth*this.tileScale.x))/this._width;this.shader.uniforms.uTransform.value[1]=(this.tilePosition.y%(tempHeight*this.tileScale.y))/this._height;this.shader.uniforms.uTransform.value[2]=(tw/this._width)*this.tileScale.x;this.shader.uniforms.uTransform.value[3]=(th/this._height)*this.tileScale.y;renderer.setObjectRenderer(renderer.plugins.sprite);renderer.plugins.sprite.render(this);texture._uvs=tempUvs;texture._frame.width=tempWidth;texture._frame.height=tempHeight;};TilingSprite.prototype._renderCanvas=function(renderer)
{var texture=this._texture;if(!texture.baseTexture.hasLoaded)
{return;}
var context=renderer.context,transform=this.worldTransform,resolution=renderer.resolution,baseTexture=texture.baseTexture,modX=(this.tilePosition.x/this.tileScale.x)%texture._frame.width,modY=(this.tilePosition.y/this.tileScale.y)%texture._frame.height;if(!this._canvasPattern)
{var tempCanvas=new core.CanvasBuffer(texture._frame.width*resolution,texture._frame.height*resolution);if(this.tint!==0xFFFFFF)
{if(this.cachedTint!==this.tint)
{this.cachedTint=this.tint;this.tintedTexture=CanvasTinter.getTintedTexture(this,this.tint);}
tempCanvas.context.drawImage(this.tintedTexture,0,0);}
else
{tempCanvas.context.drawImage(baseTexture.source,-texture._frame.x*resolution,-texture._frame.y*resolution);}
this._canvasPattern=tempCanvas.context.createPattern(tempCanvas.canvas,'repeat');}
context.globalAlpha=this.worldAlpha;context.setTransform(transform.a*resolution,transform.b*resolution,transform.c*resolution,transform.d*resolution,transform.tx*resolution,transform.ty*resolution);context.scale(this.tileScale.x/resolution,this.tileScale.y/resolution);context.translate(modX+(this.anchor.x*-this._width),modY+(this.anchor.y*-this._height));var compositeOperation=renderer.blendModes[this.blendMode];if(compositeOperation!==renderer.context.globalCompositeOperation)
{context.globalCompositeOperation=compositeOperation;}
context.fillStyle=this._canvasPattern;context.fillRect(-modX,-modY,this._width*resolution/this.tileScale.x,this._height*resolution/this.tileScale.y);};TilingSprite.prototype.getBounds=function()
{var width=this._width;var height=this._height;var w0=width*(1-this.anchor.x);var w1=width*-this.anchor.x;var h0=height*(1-this.anchor.y);var h1=height*-this.anchor.y;var worldTransform=this.worldTransform;var a=worldTransform.a;var b=worldTransform.b;var c=worldTransform.c;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var x1=a*w1+c*h1+tx;var y1=d*h1+b*w1+ty;var x2=a*w0+c*h1+tx;var y2=d*h1+b*w0+ty;var x3=a*w0+c*h0+tx;var y3=d*h0+b*w0+ty;var x4=a*w1+c*h0+tx;var y4=d*h0+b*w1+ty;var minX,maxX,minY,maxY;minX=x1;minX=x2<minX?x2:minX;minX=x3<minX?x3:minX;minX=x4<minX?x4:minX;minY=y1;minY=y2<minY?y2:minY;minY=y3<minY?y3:minY;minY=y4<minY?y4:minY;maxX=x1;maxX=x2>maxX?x2:maxX;maxX=x3>maxX?x3:maxX;maxX=x4>maxX?x4:maxX;maxY=y1;maxY=y2>maxY?y2:maxY;maxY=y3>maxY?y3:maxY;maxY=y4>maxY?y4:maxY;var bounds=this._bounds;bounds.x=minX;bounds.width=maxX-minX;bounds.y=minY;bounds.height=maxY-minY;this._currentBounds=bounds;return bounds;};TilingSprite.prototype.containsPoint=function(point)
{this.worldTransform.applyInverse(point,tempPoint);var width=this._width;var height=this._height;var x1=-width*this.anchor.x;var y1;if(tempPoint.x>x1&&tempPoint.x<x1+width)
{y1=-height*this.anchor.y;if(tempPoint.y>y1&&tempPoint.y<y1+height)
{return true;}}
return false;};TilingSprite.prototype.destroy=function(){core.Sprite.prototype.destroy.call(this);this.tileScale=null;this._tileScaleOffset=null;this.tilePosition=null;this._uvs=null;};TilingSprite.fromFrame=function(frameId,width,height)
{var texture=core.utils.TextureCache[frameId];if(!texture)
{throw new Error('The frameId "'+frameId+'" does not exist in the texture cache '+this);}
return new TilingSprite(texture,width,height);};TilingSprite.fromImage=function(imageId,width,height,crossorigin,scaleMode)
{return new TilingSprite(core.Texture.fromImage(imageId,crossorigin,scaleMode),width,height);};},{"../core":29,"../core/renderers/canvas/utils/CanvasTinter":48}],83:[function(require,module,exports){var core=require('../core'),DisplayObject=core.DisplayObject,_tempMatrix=new core.Matrix();DisplayObject.prototype._cacheAsBitmap=false;DisplayObject.prototype._originalRenderWebGL=null;DisplayObject.prototype._originalRenderCanvas=null;DisplayObject.prototype._originalUpdateTransform=null;DisplayObject.prototype._originalHitTest=null;DisplayObject.prototype._originalDestroy=null;DisplayObject.prototype._cachedSprite=null;Object.defineProperties(DisplayObject.prototype,{cacheAsBitmap:{get:function()
{return this._cacheAsBitmap;},set:function(value)
{if(this._cacheAsBitmap===value)
{return;}
this._cacheAsBitmap=value;if(value)
{this._originalRenderWebGL=this.renderWebGL;this._originalRenderCanvas=this.renderCanvas;this._originalUpdateTransform=this.updateTransform;this._originalGetBounds=this.getBounds;this._originalDestroy=this.destroy;this._originalContainsPoint=this.containsPoint;this.renderWebGL=this._renderCachedWebGL;this.renderCanvas=this._renderCachedCanvas;this.destroy=this._cacheAsBitmapDestroy;}
else
{if(this._cachedSprite)
{this._destroyCachedDisplayObject();}
this.renderWebGL=this._originalRenderWebGL;this.renderCanvas=this._originalRenderCanvas;this.getBounds=this._originalGetBounds;this.destroy=this._originalDestroy;this.updateTransform=this._originalUpdateTransform;this.containsPoint=this._originalContainsPoint;}}}});DisplayObject.prototype._renderCachedWebGL=function(renderer)
{if(!this.visible||this.worldAlpha<=0||!this.renderable)
{return;}
this._initCachedDisplayObject(renderer);this._cachedSprite.worldAlpha=this.worldAlpha;renderer.setObjectRenderer(renderer.plugins.sprite);renderer.plugins.sprite.render(this._cachedSprite);};DisplayObject.prototype._initCachedDisplayObject=function(renderer)
{if(this._cachedSprite)
{return;}
renderer.currentRenderer.flush();var bounds=this.getLocalBounds().clone();if(this._filters)
{var padding=this._filters[0].padding;bounds.x-=padding;bounds.y-=padding;bounds.width+=padding*2;bounds.height+=padding*2;}
var cachedRenderTarget=renderer.currentRenderTarget;var stack=renderer.filterManager.filterStack;var renderTexture=new core.RenderTexture(renderer,bounds.width|0,bounds.height|0);var m=_tempMatrix;m.tx=-bounds.x;m.ty=-bounds.y;this.renderWebGL=this._originalRenderWebGL;renderTexture.render(this,m,true,true);renderer.setRenderTarget(cachedRenderTarget);renderer.filterManager.filterStack=stack;this.renderWebGL=this._renderCachedWebGL;this.updateTransform=this.displayObjectUpdateTransform;this.getBounds=this._getCachedBounds;this._cachedSprite=new core.Sprite(renderTexture);this._cachedSprite.worldTransform=this.worldTransform;this._cachedSprite.anchor.x=-(bounds.x/bounds.width);this._cachedSprite.anchor.y=-(bounds.y/bounds.height);this.updateTransform();this.containsPoint=this._cachedSprite.containsPoint.bind(this._cachedSprite);};DisplayObject.prototype._renderCachedCanvas=function(renderer)
{if(!this.visible||this.worldAlpha<=0||!this.renderable)
{return;}
this._initCachedDisplayObjectCanvas(renderer);this._cachedSprite.worldAlpha=this.worldAlpha;this._cachedSprite.renderCanvas(renderer);};DisplayObject.prototype._initCachedDisplayObjectCanvas=function(renderer)
{if(this._cachedSprite)
{return;}
var bounds=this.getLocalBounds();var cachedRenderTarget=renderer.context;var renderTexture=new core.RenderTexture(renderer,bounds.width|0,bounds.height|0);var m=_tempMatrix;m.tx=-bounds.x;m.ty=-bounds.y;this.renderCanvas=this._originalRenderCanvas;renderTexture.render(this,m,true);renderer.context=cachedRenderTarget;this.renderCanvas=this._renderCachedCanvas;this.updateTransform=this.displayObjectUpdateTransform;this.getBounds=this._getCachedBounds;this._cachedSprite=new core.Sprite(renderTexture);this._cachedSprite.worldTransform=this.worldTransform;this._cachedSprite.anchor.x=-(bounds.x/bounds.width);this._cachedSprite.anchor.y=-(bounds.y/bounds.height);this.updateTransform();this.containsPoint=this._cachedSprite.containsPoint.bind(this._cachedSprite);};DisplayObject.prototype._getCachedBounds=function()
{this._cachedSprite._currentBounds=null;return this._cachedSprite.getBounds();};DisplayObject.prototype._destroyCachedDisplayObject=function()
{this._cachedSprite._texture.destroy();this._cachedSprite=null;};DisplayObject.prototype._cacheAsBitmapDestroy=function()
{this.cacheAsBitmap=false;this._originalDestroy();};},{"../core":29}],84:[function(require,module,exports){var core=require('../core');core.DisplayObject.prototype.name=null;core.Container.prototype.getChildByName=function(name)
{for(var i=0;i<this.children.length;i++)
{if(this.children[i].name===name)
{return this.children[i];}}
return null;};},{"../core":29}],85:[function(require,module,exports){var core=require('../core');core.DisplayObject.prototype.getGlobalPosition=function(point)
{point=point||new core.Point();if(this.parent)
{this.displayObjectUpdateTransform();point.x=this.worldTransform.tx;point.y=this.worldTransform.ty;}
else
{point.x=this.position.x;point.y=this.position.y;}
return point;};},{"../core":29}],86:[function(require,module,exports){require('./cacheAsBitmap');require('./getChildByName');require('./getGlobalPosition');module.exports={MovieClip:require('./MovieClip'),TilingSprite:require('./TilingSprite'),BitmapText:require('./BitmapText')};},{"./BitmapText":80,"./MovieClip":81,"./TilingSprite":82,"./cacheAsBitmap":83,"./getChildByName":84,"./getGlobalPosition":85}],87:[function(require,module,exports){var core=require('../../core');function AsciiFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n",{dimensions:{type:'4fv',value:new Float32Array([0,0,0,0])},pixelSize:{type:'1f',value:8}});}
AsciiFilter.prototype=Object.create(core.AbstractFilter.prototype);AsciiFilter.prototype.constructor=AsciiFilter;module.exports=AsciiFilter;Object.defineProperties(AsciiFilter.prototype,{size:{get:function()
{return this.uniforms.pixelSize.value;},set:function(value)
{this.uniforms.pixelSize.value=value;}}});},{"../../core":29}],88:[function(require,module,exports){var core=require('../../core'),BlurXFilter=require('../blur/BlurXFilter'),BlurYFilter=require('../blur/BlurYFilter');function BloomFilter()
{core.AbstractFilter.call(this);this.blurXFilter=new BlurXFilter();this.blurYFilter=new BlurYFilter();this.defaultFilter=new core.AbstractFilter();}
BloomFilter.prototype=Object.create(core.AbstractFilter.prototype);BloomFilter.prototype.constructor=BloomFilter;module.exports=BloomFilter;BloomFilter.prototype.applyFilter=function(renderer,input,output)
{var renderTarget=renderer.filterManager.getRenderTarget(true);this.defaultFilter.applyFilter(renderer,input,output);this.blurXFilter.applyFilter(renderer,input,renderTarget);renderer.blendModeManager.setBlendMode(core.BLEND_MODES.SCREEN);this.blurYFilter.applyFilter(renderer,renderTarget,output);renderer.blendModeManager.setBlendMode(core.BLEND_MODES.NORMAL);renderer.filterManager.returnRenderTarget(renderTarget);};Object.defineProperties(BloomFilter.prototype,{blur:{get:function()
{return this.blurXFilter.blur;},set:function(value)
{this.blurXFilter.blur=this.blurYFilter.blur=value;}},blurX:{get:function()
{return this.blurXFilter.blur;},set:function(value)
{this.blurXFilter.blur=value;}},blurY:{get:function()
{return this.blurYFilter.blur;},set:function(value)
{this.blurYFilter.blur=value;}}});},{"../../core":29,"../blur/BlurXFilter":91,"../blur/BlurYFilter":92}],89:[function(require,module,exports){var core=require('../../core');function BlurDirFilter(dirX,dirY)
{core.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform float dirX;\nuniform float dirY;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[3];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[0] = aTextureCoord + vec2( (0.004 * strength) * dirX, (0.004 * strength) * dirY );\n    vBlurTexCoords[1] = aTextureCoord + vec2( (0.008 * strength) * dirX, (0.008 * strength) * dirY );\n    vBlurTexCoords[2] = aTextureCoord + vec2( (0.012 * strength) * dirX, (0.012 * strength) * dirY );\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[3];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vTextureCoord     ) * 0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0]) * 0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1]) * 0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2]) * 0.004431848411938341;\n}\n",{strength:{type:'1f',value:1},dirX:{type:'1f',value:dirX||0},dirY:{type:'1f',value:dirY||0}});this.defaultFilter=new core.AbstractFilter();this.passes=1;this.dirX=dirX||0;this.dirY=dirY||0;this.strength=4;}
BlurDirFilter.prototype=Object.create(core.AbstractFilter.prototype);BlurDirFilter.prototype.constructor=BlurDirFilter;module.exports=BlurDirFilter;BlurDirFilter.prototype.applyFilter=function(renderer,input,output,clear){var shader=this.getShader(renderer);this.uniforms.strength.value=this.strength/4/this.passes*(input.frame.width/input.size.width);if(this.passes===1){renderer.filterManager.applyFilter(shader,input,output,clear);}else{var renderTarget=renderer.filterManager.getRenderTarget(true);renderer.filterManager.applyFilter(shader,input,renderTarget,clear);for(var i=0;i<this.passes-2;i++)
{renderer.filterManager.applyFilter(shader,renderTarget,renderTarget,clear);}
renderer.filterManager.applyFilter(shader,renderTarget,output,clear);renderer.filterManager.returnRenderTarget(renderTarget);}};Object.defineProperties(BlurDirFilter.prototype,{blur:{get:function()
{return this.strength;},set:function(value)
{this.padding=value*0.5;this.strength=value;}},dirX:{get:function()
{return this.dirX;},set:function(value)
{this.uniforms.dirX.value=value;}},dirY:{get:function()
{return this.dirY;},set:function(value)
{this.uniforms.dirY.value=value;}}});},{"../../core":29}],90:[function(require,module,exports){var core=require('../../core'),BlurXFilter=require('./BlurXFilter'),BlurYFilter=require('./BlurYFilter');function BlurFilter()
{core.AbstractFilter.call(this);this.blurXFilter=new BlurXFilter();this.blurYFilter=new BlurYFilter();}
BlurFilter.prototype=Object.create(core.AbstractFilter.prototype);BlurFilter.prototype.constructor=BlurFilter;module.exports=BlurFilter;BlurFilter.prototype.applyFilter=function(renderer,input,output)
{var renderTarget=renderer.filterManager.getRenderTarget(true);this.blurXFilter.applyFilter(renderer,input,renderTarget);this.blurYFilter.applyFilter(renderer,renderTarget,output);renderer.filterManager.returnRenderTarget(renderTarget);};Object.defineProperties(BlurFilter.prototype,{blur:{get:function()
{return this.blurXFilter.blur;},set:function(value)
{this.padding=Math.abs(value)*0.5;this.blurXFilter.blur=this.blurYFilter.blur=value;}},passes:{get:function()
{return this.blurXFilter.passes;},set:function(value)
{this.blurXFilter.passes=this.blurYFilter.passes=value;}},blurX:{get:function()
{return this.blurXFilter.blur;},set:function(value)
{this.blurXFilter.blur=value;}},blurY:{get:function()
{return this.blurYFilter.blur;},set:function(value)
{this.blurYFilter.blur=value;}}});},{"../../core":29,"./BlurXFilter":91,"./BlurYFilter":92}],91:[function(require,module,exports){var core=require('../../core');function BlurXFilter()
{core.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(-0.012 * strength, 0.0);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(-0.008 * strength, 0.0);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(-0.004 * strength, 0.0);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2( 0.004 * strength, 0.0);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2( 0.008 * strength, 0.0);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2( 0.012 * strength, 0.0);\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n",{strength:{type:'1f',value:1}});this.passes=1;this.strength=4;}
BlurXFilter.prototype=Object.create(core.AbstractFilter.prototype);BlurXFilter.prototype.constructor=BlurXFilter;module.exports=BlurXFilter;BlurXFilter.prototype.applyFilter=function(renderer,input,output,clear)
{var shader=this.getShader(renderer);this.uniforms.strength.value=this.strength/4/this.passes*(input.frame.width/input.size.width);if(this.passes===1)
{renderer.filterManager.applyFilter(shader,input,output,clear);}
else
{var renderTarget=renderer.filterManager.getRenderTarget(true);var flip=input;var flop=renderTarget;for(var i=0;i<this.passes-1;i++)
{renderer.filterManager.applyFilter(shader,flip,flop,true);var temp=flop;flop=flip;flip=temp;}
renderer.filterManager.applyFilter(shader,flip,output,clear);renderer.filterManager.returnRenderTarget(renderTarget);}};Object.defineProperties(BlurXFilter.prototype,{blur:{get:function()
{return this.strength;},set:function(value)
{this.padding=Math.abs(value)*0.5;this.strength=value;}}});},{"../../core":29}],92:[function(require,module,exports){var core=require('../../core');function BlurYFilter()
{core.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n",{strength:{type:'1f',value:1}});this.passes=1;this.strength=4;}
BlurYFilter.prototype=Object.create(core.AbstractFilter.prototype);BlurYFilter.prototype.constructor=BlurYFilter;module.exports=BlurYFilter;BlurYFilter.prototype.applyFilter=function(renderer,input,output,clear)
{var shader=this.getShader(renderer);this.uniforms.strength.value=Math.abs(this.strength)/4/this.passes*(input.frame.height/input.size.height);if(this.passes===1)
{renderer.filterManager.applyFilter(shader,input,output,clear);}
else
{var renderTarget=renderer.filterManager.getRenderTarget(true);var flip=input;var flop=renderTarget;for(var i=0;i<this.passes-1;i++)
{renderer.filterManager.applyFilter(shader,flip,flop,true);var temp=flop;flop=flip;flip=temp;}
renderer.filterManager.applyFilter(shader,flip,output,clear);renderer.filterManager.returnRenderTarget(renderTarget);}};Object.defineProperties(BlurYFilter.prototype,{blur:{get:function()
{return this.strength;},set:function(value)
{this.padding=Math.abs(value)*0.5;this.strength=value;}}});},{"../../core":29}],93:[function(require,module,exports){var core=require('../../core');function SmartBlurFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 delta;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n",{delta:{type:'v2',value:{x:0.1,y:0.0}}});}
SmartBlurFilter.prototype=Object.create(core.AbstractFilter.prototype);SmartBlurFilter.prototype.constructor=SmartBlurFilter;module.exports=SmartBlurFilter;},{"../../core":29}],94:[function(require,module,exports){var core=require('../../core');function ColorMatrixFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[25];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n}\n",{m:{type:'1fv',value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]}});}
ColorMatrixFilter.prototype=Object.create(core.AbstractFilter.prototype);ColorMatrixFilter.prototype.constructor=ColorMatrixFilter;module.exports=ColorMatrixFilter;ColorMatrixFilter.prototype._loadMatrix=function(matrix,multiply)
{multiply=!!multiply;var newMatrix=matrix;if(multiply){this._multiply(newMatrix,this.uniforms.m.value,matrix);newMatrix=this._colorMatrix(newMatrix);}
this.uniforms.m.value=newMatrix;};ColorMatrixFilter.prototype._multiply=function(out,a,b)
{out[0]=(a[0]*b[0])+(a[1]*b[5])+(a[2]*b[10])+(a[3]*b[15]);out[1]=(a[0]*b[1])+(a[1]*b[6])+(a[2]*b[11])+(a[3]*b[16]);out[2]=(a[0]*b[2])+(a[1]*b[7])+(a[2]*b[12])+(a[3]*b[17]);out[3]=(a[0]*b[3])+(a[1]*b[8])+(a[2]*b[13])+(a[3]*b[18]);out[4]=(a[0]*b[4])+(a[1]*b[9])+(a[2]*b[14])+(a[3]*b[19]);out[5]=(a[5]*b[0])+(a[6]*b[5])+(a[7]*b[10])+(a[8]*b[15]);out[6]=(a[5]*b[1])+(a[6]*b[6])+(a[7]*b[11])+(a[8]*b[16]);out[7]=(a[5]*b[2])+(a[6]*b[7])+(a[7]*b[12])+(a[8]*b[17]);out[8]=(a[5]*b[3])+(a[6]*b[8])+(a[7]*b[13])+(a[8]*b[18]);out[9]=(a[5]*b[4])+(a[6]*b[9])+(a[7]*b[14])+(a[8]*b[19]);out[10]=(a[10]*b[0])+(a[11]*b[5])+(a[12]*b[10])+(a[13]*b[15]);out[11]=(a[10]*b[1])+(a[11]*b[6])+(a[12]*b[11])+(a[13]*b[16]);out[12]=(a[10]*b[2])+(a[11]*b[7])+(a[12]*b[12])+(a[13]*b[17]);out[13]=(a[10]*b[3])+(a[11]*b[8])+(a[12]*b[13])+(a[13]*b[18]);out[14]=(a[10]*b[4])+(a[11]*b[9])+(a[12]*b[14])+(a[13]*b[19]);out[15]=(a[15]*b[0])+(a[16]*b[5])+(a[17]*b[10])+(a[18]*b[15]);out[16]=(a[15]*b[1])+(a[16]*b[6])+(a[17]*b[11])+(a[18]*b[16]);out[17]=(a[15]*b[2])+(a[16]*b[7])+(a[17]*b[12])+(a[18]*b[17]);out[18]=(a[15]*b[3])+(a[16]*b[8])+(a[17]*b[13])+(a[18]*b[18]);out[19]=(a[15]*b[4])+(a[16]*b[9])+(a[17]*b[14])+(a[18]*b[19]);return out;};ColorMatrixFilter.prototype._colorMatrix=function(matrix)
{var m=new Float32Array(matrix);m[4]/=255;m[9]/=255;m[14]/=255;m[19]/=255;return m;};ColorMatrixFilter.prototype.brightness=function(b,multiply)
{var matrix=[b,0,0,0,0,0,b,0,0,0,0,0,b,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.greyscale=function(scale,multiply)
{var matrix=[scale,scale,scale,0,0,scale,scale,scale,0,0,scale,scale,scale,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.grayscale=ColorMatrixFilter.prototype.greyscale;ColorMatrixFilter.prototype.blackAndWhite=function(multiply)
{var matrix=[0.3,0.6,0.1,0,0,0.3,0.6,0.1,0,0,0.3,0.6,0.1,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.hue=function(rotation,multiply)
{rotation=(rotation||0)/180*Math.PI;var cos=Math.cos(rotation),sin=Math.sin(rotation);var lumR=0.213,lumG=0.715,lumB=0.072;var matrix=[lumR+cos*(1-lumR)+sin*(-lumR),lumG+cos*(-lumG)+sin*(-lumG),lumB+cos*(-lumB)+sin*(1-lumB),0,0,lumR+cos*(-lumR)+sin*(0.143),lumG+cos*(1-lumG)+sin*(0.140),lumB+cos*(-lumB)+sin*(-0.283),0,0,lumR+cos*(-lumR)+sin*(-(1-lumR)),lumG+cos*(-lumG)+sin*(lumG),lumB+cos*(1-lumB)+sin*(lumB),0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.contrast=function(amount,multiply)
{var v=(amount||0)+1;var o=-128*(v-1);var matrix=[v,0,0,0,o,0,v,0,0,o,0,0,v,0,o,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.saturate=function(amount,multiply)
{var x=(amount||0)*2/3+1;var y=((x-1)*-0.5);var matrix=[x,y,y,0,0,y,x,y,0,0,y,y,x,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.desaturate=function(multiply)
{this.saturate(-1);};ColorMatrixFilter.prototype.negative=function(multiply)
{var matrix=[0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.sepia=function(multiply)
{var matrix=[0.393,0.7689999,0.18899999,0,0,0.349,0.6859999,0.16799999,0,0,0.272,0.5339999,0.13099999,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.technicolor=function(multiply)
{var matrix=[1.9125277891456083,-0.8545344976951645,-0.09155508482755585,0,11.793603434377337,-0.3087833385928097,1.7658908555458428,-0.10601743074722245,0,-70.35205161461398,-0.231103377548616,-0.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.polaroid=function(multiply)
{var matrix=[1.438,-0.062,-0.062,0,0,-0.122,1.378,-0.122,0,0,-0.016,-0.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.toBGR=function(multiply)
{var matrix=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.kodachrome=function(multiply)
{var matrix=[1.1285582396593525,-0.3967382283601348,-0.03992559172921793,0,63.72958762196502,-0.16404339962244616,1.0835251566291304,-0.05498805115633132,0,24.732407896706203,-0.16786010706155763,-0.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.browni=function(multiply)
{var matrix=[0.5997023498159715,0.34553243048391263,-0.2708298674538042,0,47.43192855600873,-0.037703249837783157,0.8609577587992641,0.15059552388459913,0,-36.96841498319127,0.24113635128153335,-0.07441037908422492,0.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.vintage=function(multiply)
{var matrix=[0.6279345635605994,0.3202183420819367,-0.03965408211312453,0,9.651285835294123,0.02578397704808868,0.6441188644374771,0.03259127616149294,0,7.462829176470591,0.0466055556782719,-0.0851232987247891,0.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.colorTone=function(desaturation,toned,lightColor,darkColor,multiply)
{desaturation=desaturation||0.2;toned=toned||0.15;lightColor=lightColor||0xFFE580;darkColor=darkColor||0x338000;var lR=((lightColor>>16)&0xFF)/255;var lG=((lightColor>>8)&0xFF)/255;var lB=(lightColor&0xFF)/255;var dR=((darkColor>>16)&0xFF)/255;var dG=((darkColor>>8)&0xFF)/255;var dB=(darkColor&0xFF)/255;var matrix=[0.3,0.59,0.11,0,0,lR,lG,lB,desaturation,0,dR,dG,dB,toned,0,lR-dR,lG-dG,lB-dB,0,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.night=function(intensity,multiply)
{intensity=intensity||0.1;var matrix=[intensity*(-2.0),-intensity,0,0,0,-intensity,0,intensity,0,0,0,intensity,intensity*2.0,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.predator=function(amount,multiply)
{var matrix=[11.224130630493164*amount,-4.794486999511719*amount,-2.8746118545532227*amount,0*amount,0.40342438220977783*amount,-3.6330697536468506*amount,9.193157196044922*amount,-2.951810836791992*amount,0*amount,-1.316135048866272*amount,-3.2184197902679443*amount,-4.2375030517578125*amount,7.476448059082031*amount,0*amount,0.8044459223747253*amount,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.lsd=function(multiply)
{var matrix=[2,-0.4,0.5,0,0,-0.5,2,-0.4,0,0,-0.4,-0.5,3,0,0,0,0,0,1,0];this._loadMatrix(matrix,multiply);};ColorMatrixFilter.prototype.reset=function()
{var matrix=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(matrix,false);};Object.defineProperties(ColorMatrixFilter.prototype,{matrix:{get:function()
{return this.uniforms.m.value;},set:function(value)
{this.uniforms.m.value=value;}}});},{"../../core":29}],95:[function(require,module,exports){var core=require('../../core');function ColorStepFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n",{step:{type:'1f',value:5}});}
ColorStepFilter.prototype=Object.create(core.AbstractFilter.prototype);ColorStepFilter.prototype.constructor=ColorStepFilter;module.exports=ColorStepFilter;Object.defineProperties(ColorStepFilter.prototype,{step:{get:function()
{return this.uniforms.step.value;},set:function(value)
{this.uniforms.step.value=value;}}});},{"../../core":29}],96:[function(require,module,exports){var core=require('../../core');function ConvolutionFilter(matrix,width,height)
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",{matrix:{type:'1fv',value:new Float32Array(matrix)},texelSize:{type:'v2',value:{x:1/width,y:1/height}}});}
ConvolutionFilter.prototype=Object.create(core.AbstractFilter.prototype);ConvolutionFilter.prototype.constructor=ConvolutionFilter;module.exports=ConvolutionFilter;Object.defineProperties(ConvolutionFilter.prototype,{matrix:{get:function()
{return this.uniforms.matrix.value;},set:function(value)
{this.uniforms.matrix.value=new Float32Array(value);}},width:{get:function()
{return 1/this.uniforms.texelSize.value.x;},set:function(value)
{this.uniforms.texelSize.value.x=1/value;}},height:{get:function()
{return 1/this.uniforms.texelSize.value.y;},set:function(value)
{this.uniforms.texelSize.value.y=1/value;}}});},{"../../core":29}],97:[function(require,module,exports){var core=require('../../core');function CrossHatchFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n");}
CrossHatchFilter.prototype=Object.create(core.AbstractFilter.prototype);CrossHatchFilter.prototype.constructor=CrossHatchFilter;module.exports=CrossHatchFilter;},{"../../core":29}],98:[function(require,module,exports){var core=require('../../core');function DisplacementFilter(sprite,scale)
{var maskMatrix=new core.Matrix();sprite.renderable=false;core.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision mediump float;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vMapCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));\n}\n",{mapSampler:{type:'sampler2D',value:sprite.texture},otherMatrix:{type:'mat3',value:maskMatrix.toArray(true)},scale:{type:'v2',value:{x:1,y:1}}});this.maskSprite=sprite;this.maskMatrix=maskMatrix;if(scale===null||scale===undefined)
{scale=20;}
this.scale=new core.Point(scale,scale);}
DisplacementFilter.prototype=Object.create(core.AbstractFilter.prototype);DisplacementFilter.prototype.constructor=DisplacementFilter;module.exports=DisplacementFilter;DisplacementFilter.prototype.applyFilter=function(renderer,input,output)
{var filterManager=renderer.filterManager;filterManager.calculateMappedMatrix(input.frame,this.maskSprite,this.maskMatrix);this.uniforms.otherMatrix.value=this.maskMatrix.toArray(true);this.uniforms.scale.value.x=this.scale.x*(1/input.frame.width);this.uniforms.scale.value.y=this.scale.y*(1/input.frame.height);var shader=this.getShader(renderer);filterManager.applyFilter(shader,input,output);};Object.defineProperties(DisplacementFilter.prototype,{map:{get:function()
{return this.uniforms.mapSampler.value;},set:function(value)
{this.uniforms.mapSampler.value=value;}}});},{"../../core":29}],99:[function(require,module,exports){var core=require('../../core');function DotScreenFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",{scale:{type:'1f',value:1},angle:{type:'1f',value:5},dimensions:{type:'4fv',value:[0,0,0,0]}});}
DotScreenFilter.prototype=Object.create(core.AbstractFilter.prototype);DotScreenFilter.prototype.constructor=DotScreenFilter;module.exports=DotScreenFilter;Object.defineProperties(DotScreenFilter.prototype,{scale:{get:function()
{return this.uniforms.scale.value;},set:function(value)
{this.uniforms.scale.value=value;}},angle:{get:function()
{return this.uniforms.angle.value;},set:function(value)
{this.uniforms.angle.value=value;}}});},{"../../core":29}],100:[function(require,module,exports){var core=require('../../core');function BlurYTintFilter()
{core.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform vec2 offset;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition+offset), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform float alpha;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    sum += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    sum += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    sum += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    sum += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n\n    gl_FragColor = vec4( color.rgb * sum.a * alpha, sum.a * alpha );\n}\n",{blur:{type:'1f',value:1/512},color:{type:'c',value:[0,0,0]},alpha:{type:'1f',value:0.7},offset:{type:'2f',value:[5,5]},strength:{type:'1f',value:1}});this.passes=1;this.strength=4;}
BlurYTintFilter.prototype=Object.create(core.AbstractFilter.prototype);BlurYTintFilter.prototype.constructor=BlurYTintFilter;module.exports=BlurYTintFilter;BlurYTintFilter.prototype.applyFilter=function(renderer,input,output,clear)
{var shader=this.getShader(renderer);this.uniforms.strength.value=this.strength/4/this.passes*(input.frame.height/input.size.height);if(this.passes===1)
{renderer.filterManager.applyFilter(shader,input,output,clear);}
else
{var renderTarget=renderer.filterManager.getRenderTarget(true);var flip=input;var flop=renderTarget;for(var i=0;i<this.passes-1;i++)
{renderer.filterManager.applyFilter(shader,flip,flop,clear);var temp=flop;flop=flip;flip=temp;}
renderer.filterManager.applyFilter(shader,flip,output,clear);renderer.filterManager.returnRenderTarget(renderTarget);}};Object.defineProperties(BlurYTintFilter.prototype,{blur:{get:function()
{return this.strength;},set:function(value)
{this.padding=value*0.5;this.strength=value;}}});},{"../../core":29}],101:[function(require,module,exports){var core=require('../../core'),BlurXFilter=require('../blur/BlurXFilter'),BlurYTintFilter=require('./BlurYTintFilter');function DropShadowFilter()
{core.AbstractFilter.call(this);this.blurXFilter=new BlurXFilter();this.blurYTintFilter=new BlurYTintFilter();this.defaultFilter=new core.AbstractFilter();this.padding=30;this._dirtyPosition=true;this._angle=45*Math.PI/180;this._distance=10;this.alpha=0.75;this.hideObject=false;this.blendMode=core.BLEND_MODES.MULTIPLY;}
DropShadowFilter.prototype=Object.create(core.AbstractFilter.prototype);DropShadowFilter.prototype.constructor=DropShadowFilter;module.exports=DropShadowFilter;DropShadowFilter.prototype.applyFilter=function(renderer,input,output)
{var renderTarget=renderer.filterManager.getRenderTarget(true);if(this._dirtyPosition)
{this._dirtyPosition=false;this.blurYTintFilter.uniforms.offset.value[0]=Math.sin(this._angle)*this._distance;this.blurYTintFilter.uniforms.offset.value[1]=Math.cos(this._angle)*this._distance;}
this.blurXFilter.applyFilter(renderer,input,renderTarget);renderer.blendModeManager.setBlendMode(this.blendMode);this.blurYTintFilter.applyFilter(renderer,renderTarget,output);renderer.blendModeManager.setBlendMode(core.BLEND_MODES.NORMAL);if(!this.hideObject)
{this.defaultFilter.applyFilter(renderer,input,output);}
renderer.filterManager.returnRenderTarget(renderTarget);};Object.defineProperties(DropShadowFilter.prototype,{blur:{get:function()
{return this.blurXFilter.blur;},set:function(value)
{this.blurXFilter.blur=this.blurYTintFilter.blur=value;}},blurX:{get:function()
{return this.blurXFilter.blur;},set:function(value)
{this.blurXFilter.blur=value;}},blurY:{get:function()
{return this.blurYTintFilter.blur;},set:function(value)
{this.blurYTintFilter.blur=value;}},color:{get:function()
{return core.utils.rgb2hex(this.blurYTintFilter.uniforms.color.value);},set:function(value)
{this.blurYTintFilter.uniforms.color.value=core.utils.hex2rgb(value);}},alpha:{get:function()
{return this.blurYTintFilter.uniforms.alpha.value;},set:function(value)
{this.blurYTintFilter.uniforms.alpha.value=value;}},distance:{get:function()
{return this._distance;},set:function(value)
{this._dirtyPosition=true;this._distance=value;}},angle:{get:function()
{return this._angle;},set:function(value)
{this._dirtyPosition=true;this._angle=value;}}});},{"../../core":29,"../blur/BlurXFilter":91,"./BlurYTintFilter":100}],102:[function(require,module,exports){var core=require('../../core');function GrayFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n",{gray:{type:'1f',value:1}});}
GrayFilter.prototype=Object.create(core.AbstractFilter.prototype);GrayFilter.prototype.constructor=GrayFilter;module.exports=GrayFilter;Object.defineProperties(GrayFilter.prototype,{gray:{get:function()
{return this.uniforms.gray.value;},set:function(value)
{this.uniforms.gray.value=value;}}});},{"../../core":29}],103:[function(require,module,exports){module.exports={AsciiFilter:require('./ascii/AsciiFilter'),BloomFilter:require('./bloom/BloomFilter'),BlurFilter:require('./blur/BlurFilter'),BlurXFilter:require('./blur/BlurXFilter'),BlurYFilter:require('./blur/BlurYFilter'),BlurDirFilter:require('./blur/BlurDirFilter'),ColorMatrixFilter:require('./color/ColorMatrixFilter'),ColorStepFilter:require('./color/ColorStepFilter'),ConvolutionFilter:require('./convolution/ConvolutionFilter'),CrossHatchFilter:require('./crosshatch/CrossHatchFilter'),DisplacementFilter:require('./displacement/DisplacementFilter'),DotScreenFilter:require('./dot/DotScreenFilter'),GrayFilter:require('./gray/GrayFilter'),DropShadowFilter:require('./dropshadow/DropShadowFilter'),InvertFilter:require('./invert/InvertFilter'),NoiseFilter:require('./noise/NoiseFilter'),PixelateFilter:require('./pixelate/PixelateFilter'),RGBSplitFilter:require('./rgb/RGBSplitFilter'),ShockwaveFilter:require('./shockwave/ShockwaveFilter'),SepiaFilter:require('./sepia/SepiaFilter'),SmartBlurFilter:require('./blur/SmartBlurFilter'),TiltShiftFilter:require('./tiltshift/TiltShiftFilter'),TiltShiftXFilter:require('./tiltshift/TiltShiftXFilter'),TiltShiftYFilter:require('./tiltshift/TiltShiftYFilter'),TwistFilter:require('./twist/TwistFilter')};},{"./ascii/AsciiFilter":87,"./bloom/BloomFilter":88,"./blur/BlurDirFilter":89,"./blur/BlurFilter":90,"./blur/BlurXFilter":91,"./blur/BlurYFilter":92,"./blur/SmartBlurFilter":93,"./color/ColorMatrixFilter":94,"./color/ColorStepFilter":95,"./convolution/ConvolutionFilter":96,"./crosshatch/CrossHatchFilter":97,"./displacement/DisplacementFilter":98,"./dot/DotScreenFilter":99,"./dropshadow/DropShadowFilter":101,"./gray/GrayFilter":102,"./invert/InvertFilter":104,"./noise/NoiseFilter":105,"./pixelate/PixelateFilter":106,"./rgb/RGBSplitFilter":107,"./sepia/SepiaFilter":108,"./shockwave/ShockwaveFilter":109,"./tiltshift/TiltShiftFilter":111,"./tiltshift/TiltShiftXFilter":112,"./tiltshift/TiltShiftYFilter":113,"./twist/TwistFilter":114}],104:[function(require,module,exports){var core=require('../../core');function InvertFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n",{invert:{type:'1f',value:1}});}
InvertFilter.prototype=Object.create(core.AbstractFilter.prototype);InvertFilter.prototype.constructor=InvertFilter;module.exports=InvertFilter;Object.defineProperties(InvertFilter.prototype,{invert:{get:function()
{return this.uniforms.invert.value;},set:function(value)
{this.uniforms.invert.value=value;}}});},{"../../core":29}],105:[function(require,module,exports){var core=require('../../core');function NoiseFilter()
{core.AbstractFilter.call(this,null,"precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n",{noise:{type:'1f',value:0.5}});}
NoiseFilter.prototype=Object.create(core.AbstractFilter.prototype);NoiseFilter.prototype.constructor=NoiseFilter;module.exports=NoiseFilter;Object.defineProperties(NoiseFilter.prototype,{noise:{get:function()
{return this.uniforms.noise.value;},set:function(value)
{this.uniforms.noise.value=value;}}});},{"../../core":29}],106:[function(require,module,exports){var core=require('../../core');function PixelateFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n",{dimensions:{type:'4fv',value:new Float32Array([0,0,0,0])},pixelSize:{type:'v2',value:{x:10,y:10}}});}
PixelateFilter.prototype=Object.create(core.AbstractFilter.prototype);PixelateFilter.prototype.constructor=PixelateFilter;module.exports=PixelateFilter;Object.defineProperties(PixelateFilter.prototype,{size:{get:function()
{return this.uniforms.pixelSize.value;},set:function(value)
{this.uniforms.pixelSize.value=value;}}});},{"../../core":29}],107:[function(require,module,exports){var core=require('../../core');function RGBSplitFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",{red:{type:'v2',value:{x:20,y:20}},green:{type:'v2',value:{x:-20,y:20}},blue:{type:'v2',value:{x:20,y:-20}},dimensions:{type:'4fv',value:[0,0,0,0]}});}
RGBSplitFilter.prototype=Object.create(core.AbstractFilter.prototype);RGBSplitFilter.prototype.constructor=RGBSplitFilter;module.exports=RGBSplitFilter;Object.defineProperties(RGBSplitFilter.prototype,{red:{get:function()
{return this.uniforms.red.value;},set:function(value)
{this.uniforms.red.value=value;}},green:{get:function()
{return this.uniforms.green.value;},set:function(value)
{this.uniforms.green.value=value;}},blue:{get:function()
{return this.uniforms.blue.value;},set:function(value)
{this.uniforms.blue.value=value;}}});},{"../../core":29}],108:[function(require,module,exports){var core=require('../../core');function SepiaFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n",{sepia:{type:'1f',value:1}});}
SepiaFilter.prototype=Object.create(core.AbstractFilter.prototype);SepiaFilter.prototype.constructor=SepiaFilter;module.exports=SepiaFilter;Object.defineProperties(SepiaFilter.prototype,{sepia:{get:function()
{return this.uniforms.sepia.value;},set:function(value)
{this.uniforms.sepia.value=value;}}});},{"../../core":29}],109:[function(require,module,exports){var core=require('../../core');function ShockwaveFilter()
{core.AbstractFilter.call(this,null,"precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n",{center:{type:'v2',value:{x:0.5,y:0.5}},params:{type:'v3',value:{x:10,y:0.8,z:0.1}},time:{type:'1f',value:0}});}
ShockwaveFilter.prototype=Object.create(core.AbstractFilter.prototype);ShockwaveFilter.prototype.constructor=ShockwaveFilter;module.exports=ShockwaveFilter;Object.defineProperties(ShockwaveFilter.prototype,{center:{get:function()
{return this.uniforms.center.value;},set:function(value)
{this.uniforms.center.value=value;}},params:{get:function()
{return this.uniforms.params.value;},set:function(value)
{this.uniforms.params.value=value;}},time:{get:function()
{return this.uniforms.time.value;},set:function(value)
{this.uniforms.time.value=value;}}});},{"../../core":29}],110:[function(require,module,exports){var core=require('../../core');function TiltShiftAxisFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n",{blur:{type:'1f',value:100},gradientBlur:{type:'1f',value:600},start:{type:'v2',value:{x:0,y:window.innerHeight/2}},end:{type:'v2',value:{x:600,y:window.innerHeight/2}},delta:{type:'v2',value:{x:30,y:30}},texSize:{type:'v2',value:{x:window.innerWidth,y:window.innerHeight}}});this.updateDelta();}
TiltShiftAxisFilter.prototype=Object.create(core.AbstractFilter.prototype);TiltShiftAxisFilter.prototype.constructor=TiltShiftAxisFilter;module.exports=TiltShiftAxisFilter;TiltShiftAxisFilter.prototype.updateDelta=function()
{this.uniforms.delta.value.x=0;this.uniforms.delta.value.y=0;};Object.defineProperties(TiltShiftAxisFilter.prototype,{blur:{get:function()
{return this.uniforms.blur.value;},set:function(value)
{this.uniforms.blur.value=value;}},gradientBlur:{get:function()
{return this.uniforms.gradientBlur.value;},set:function(value)
{this.uniforms.gradientBlur.value=value;}},start:{get:function()
{return this.uniforms.start.value;},set:function(value)
{this.uniforms.start.value=value;this.updateDelta();}},end:{get:function()
{return this.uniforms.end.value;},set:function(value)
{this.uniforms.end.value=value;this.updateDelta();}}});},{"../../core":29}],111:[function(require,module,exports){var core=require('../../core'),TiltShiftXFilter=require('./TiltShiftXFilter'),TiltShiftYFilter=require('./TiltShiftYFilter');function TiltShiftFilter()
{core.AbstractFilter.call(this);this.tiltShiftXFilter=new TiltShiftXFilter();this.tiltShiftYFilter=new TiltShiftYFilter();}
TiltShiftFilter.prototype=Object.create(core.AbstractFilter.prototype);TiltShiftFilter.prototype.constructor=TiltShiftFilter;module.exports=TiltShiftFilter;TiltShiftFilter.prototype.applyFilter=function(renderer,input,output)
{var renderTarget=renderer.filterManager.getRenderTarget(true);this.tiltShiftXFilter.applyFilter(renderer,input,renderTarget);this.tiltShiftYFilter.applyFilter(renderer,renderTarget,output);renderer.filterManager.returnRenderTarget(renderTarget);};Object.defineProperties(TiltShiftFilter.prototype,{blur:{get:function()
{return this.tiltShiftXFilter.blur;},set:function(value)
{this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=value;}},gradientBlur:{get:function()
{return this.tiltShiftXFilter.gradientBlur;},set:function(value)
{this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=value;}},start:{get:function()
{return this.tiltShiftXFilter.start;},set:function(value)
{this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=value;}},end:{get:function()
{return this.tiltShiftXFilter.end;},set:function(value)
{this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=value;}}});},{"../../core":29,"./TiltShiftXFilter":112,"./TiltShiftYFilter":113}],112:[function(require,module,exports){var TiltShiftAxisFilter=require('./TiltShiftAxisFilter');function TiltShiftXFilter()
{TiltShiftAxisFilter.call(this);}
TiltShiftXFilter.prototype=Object.create(TiltShiftAxisFilter.prototype);TiltShiftXFilter.prototype.constructor=TiltShiftXFilter;module.exports=TiltShiftXFilter;TiltShiftXFilter.prototype.updateDelta=function()
{var dx=this.uniforms.end.value.x-this.uniforms.start.value.x;var dy=this.uniforms.end.value.y-this.uniforms.start.value.y;var d=Math.sqrt(dx*dx+dy*dy);this.uniforms.delta.value.x=dx/d;this.uniforms.delta.value.y=dy/d;};},{"./TiltShiftAxisFilter":110}],113:[function(require,module,exports){var TiltShiftAxisFilter=require('./TiltShiftAxisFilter');function TiltShiftYFilter()
{TiltShiftAxisFilter.call(this);}
TiltShiftYFilter.prototype=Object.create(TiltShiftAxisFilter.prototype);TiltShiftYFilter.prototype.constructor=TiltShiftYFilter;module.exports=TiltShiftYFilter;TiltShiftYFilter.prototype.updateDelta=function()
{var dx=this.uniforms.end.value.x-this.uniforms.start.value.x;var dy=this.uniforms.end.value.y-this.uniforms.start.value.y;var d=Math.sqrt(dx*dx+dy*dy);this.uniforms.delta.value.x=-dy/d;this.uniforms.delta.value.y=dx/d;};},{"./TiltShiftAxisFilter":110}],114:[function(require,module,exports){var core=require('../../core');function TwistFilter()
{core.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n",{radius:{type:'1f',value:0.5},angle:{type:'1f',value:5},offset:{type:'v2',value:{x:0.5,y:0.5}}});}
TwistFilter.prototype=Object.create(core.AbstractFilter.prototype);TwistFilter.prototype.constructor=TwistFilter;module.exports=TwistFilter;Object.defineProperties(TwistFilter.prototype,{offset:{get:function()
{return this.uniforms.offset.value;},set:function(value)
{this.uniforms.offset.value=value;}},radius:{get:function()
{return this.uniforms.radius.value;},set:function(value)
{this.uniforms.radius.value=value;}},angle:{get:function()
{return this.uniforms.angle.value;},set:function(value)
{this.uniforms.angle.value=value;}}});},{"../../core":29}],115:[function(require,module,exports){(function(global){require('./polyfill');var core=module.exports=require('./core');core.extras=require('./extras');core.filters=require('./filters');core.interaction=require('./interaction');core.loaders=require('./loaders');core.mesh=require('./mesh');core.accessibility=require('./accessibility');core.loader=new core.loaders.Loader();Object.assign(core,require('./deprecation'));global.PIXI=core;}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./accessibility":21,"./core":29,"./deprecation":79,"./extras":86,"./filters":103,"./interaction":118,"./loaders":121,"./mesh":128,"./polyfill":133}],116:[function(require,module,exports){var core=require('../core');function InteractionData()
{this.global=new core.Point();this.target=null;this.originalEvent=null;}
InteractionData.prototype.constructor=InteractionData;module.exports=InteractionData;InteractionData.prototype.getLocalPosition=function(displayObject,point,globalPos)
{return displayObject.worldTransform.applyInverse(globalPos||this.global,point);};},{"../core":29}],117:[function(require,module,exports){var core=require('../core'),InteractionData=require('./InteractionData');Object.assign(core.DisplayObject.prototype,require('./interactiveTarget'));function InteractionManager(renderer,options)
{options=options||{};this.renderer=renderer;this.autoPreventDefault=options.autoPreventDefault!==undefined?options.autoPreventDefault:true;this.interactionFrequency=options.interactionFrequency||10;this.mouse=new InteractionData();this.eventData={stopped:false,target:null,type:null,data:this.mouse,stopPropagation:function(){this.stopped=true;}};this.interactiveDataPool=[];this.interactionDOMElement=null;this.moveWhenInside=false;this.eventsAdded=false;this.onMouseUp=this.onMouseUp.bind(this);this.processMouseUp=this.processMouseUp.bind(this);this.onMouseDown=this.onMouseDown.bind(this);this.processMouseDown=this.processMouseDown.bind(this);this.onMouseMove=this.onMouseMove.bind(this);this.processMouseMove=this.processMouseMove.bind(this);this.onMouseOut=this.onMouseOut.bind(this);this.processMouseOverOut=this.processMouseOverOut.bind(this);this.onTouchStart=this.onTouchStart.bind(this);this.processTouchStart=this.processTouchStart.bind(this);this.onTouchEnd=this.onTouchEnd.bind(this);this.processTouchEnd=this.processTouchEnd.bind(this);this.onTouchMove=this.onTouchMove.bind(this);this.processTouchMove=this.processTouchMove.bind(this);this.last=0;this.currentCursorStyle='inherit';this._tempPoint=new core.Point();this.resolution=1;this.setTargetElement(this.renderer.view,this.renderer.resolution);}
InteractionManager.prototype.constructor=InteractionManager;module.exports=InteractionManager;InteractionManager.prototype.setTargetElement=function(element,resolution)
{this.removeEvents();this.interactionDOMElement=element;this.resolution=resolution||1;this.addEvents();};InteractionManager.prototype.addEvents=function()
{if(!this.interactionDOMElement)
{return;}
core.ticker.shared.add(this.update,this);if(window.navigator.msPointerEnabled)
{this.interactionDOMElement.style['-ms-content-zooming']='none';this.interactionDOMElement.style['-ms-touch-action']='none';}
window.document.addEventListener('mousemove',this.onMouseMove,true);this.interactionDOMElement.addEventListener('mousedown',this.onMouseDown,true);this.interactionDOMElement.addEventListener('mouseout',this.onMouseOut,true);this.interactionDOMElement.addEventListener('touchstart',this.onTouchStart,true);this.interactionDOMElement.addEventListener('touchend',this.onTouchEnd,true);this.interactionDOMElement.addEventListener('touchmove',this.onTouchMove,true);window.addEventListener('mouseup',this.onMouseUp,true);this.eventsAdded=true;};InteractionManager.prototype.removeEvents=function()
{if(!this.interactionDOMElement)
{return;}
core.ticker.shared.remove(this.update);if(window.navigator.msPointerEnabled)
{this.interactionDOMElement.style['-ms-content-zooming']='';this.interactionDOMElement.style['-ms-touch-action']='';}
window.document.removeEventListener('mousemove',this.onMouseMove,true);this.interactionDOMElement.removeEventListener('mousedown',this.onMouseDown,true);this.interactionDOMElement.removeEventListener('mouseout',this.onMouseOut,true);this.interactionDOMElement.removeEventListener('touchstart',this.onTouchStart,true);this.interactionDOMElement.removeEventListener('touchend',this.onTouchEnd,true);this.interactionDOMElement.removeEventListener('touchmove',this.onTouchMove,true);this.interactionDOMElement=null;window.removeEventListener('mouseup',this.onMouseUp,true);this.eventsAdded=false;};InteractionManager.prototype.update=function(deltaTime)
{this._deltaTime+=deltaTime;if(this._deltaTime<this.interactionFrequency)
{return;}
this._deltaTime=0;if(!this.interactionDOMElement)
{return;}
if(this.didMove)
{this.didMove=false;return;}
this.cursor='inherit';this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,true);if(this.currentCursorStyle!==this.cursor)
{this.currentCursorStyle=this.cursor;this.interactionDOMElement.style.cursor=this.cursor;}};InteractionManager.prototype.dispatchEvent=function(displayObject,eventString,eventData)
{if(!eventData.stopped)
{eventData.target=displayObject;eventData.type=eventString;displayObject.emit(eventString,eventData);if(displayObject[eventString])
{displayObject[eventString](eventData);}}};InteractionManager.prototype.mapPositionToPoint=function(point,x,y)
{var rect=this.interactionDOMElement.getBoundingClientRect();point.x=((x-rect.left)*(this.interactionDOMElement.width/rect.width))/this.resolution;point.y=((y-rect.top)*(this.interactionDOMElement.height/rect.height))/this.resolution;};InteractionManager.prototype.processInteractive=function(point,displayObject,func,hitTest,interactive)
{if(!displayObject||!displayObject.visible)
{return false;}
var hit=false,interactiveParent=interactive=displayObject.interactive||interactive;if(displayObject.hitArea)
{interactiveParent=false;}
if(displayObject.interactiveChildren)
{var children=displayObject.children;for(var i=children.length-1;i>=0;i--)
{var child=children[i];if(this.processInteractive(point,child,func,hitTest,interactiveParent))
{if(!child.parent)
{continue;}
hit=true;interactiveParent=false;hitTest=false;}}}
if(interactive)
{if(hitTest&&!hit)
{if(displayObject.hitArea)
{displayObject.worldTransform.applyInverse(point,this._tempPoint);hit=displayObject.hitArea.contains(this._tempPoint.x,this._tempPoint.y);}
else if(displayObject.containsPoint)
{hit=displayObject.containsPoint(point);}}
if(displayObject.interactive)
{func(displayObject,hit);}}
return hit;};InteractionManager.prototype.onMouseDown=function(event)
{this.mouse.originalEvent=event;this.eventData.data=this.mouse;this.eventData.stopped=false;this.mapPositionToPoint(this.mouse.global,event.clientX,event.clientY);if(this.autoPreventDefault)
{this.mouse.originalEvent.preventDefault();}
this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseDown,true);};InteractionManager.prototype.processMouseDown=function(displayObject,hit)
{var e=this.mouse.originalEvent;var isRightButton=e.button===2||e.which===3;if(hit)
{displayObject[isRightButton?'_isRightDown':'_isLeftDown']=true;this.dispatchEvent(displayObject,isRightButton?'rightdown':'mousedown',this.eventData);}};InteractionManager.prototype.onMouseUp=function(event)
{this.mouse.originalEvent=event;this.eventData.data=this.mouse;this.eventData.stopped=false;this.mapPositionToPoint(this.mouse.global,event.clientX,event.clientY);this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseUp,true);};InteractionManager.prototype.processMouseUp=function(displayObject,hit)
{var e=this.mouse.originalEvent;var isRightButton=e.button===2||e.which===3;var isDown=isRightButton?'_isRightDown':'_isLeftDown';if(hit)
{this.dispatchEvent(displayObject,isRightButton?'rightup':'mouseup',this.eventData);if(displayObject[isDown])
{displayObject[isDown]=false;this.dispatchEvent(displayObject,isRightButton?'rightclick':'click',this.eventData);}}
else
{if(displayObject[isDown])
{displayObject[isDown]=false;this.dispatchEvent(displayObject,isRightButton?'rightupoutside':'mouseupoutside',this.eventData);}}};InteractionManager.prototype.onMouseMove=function(event)
{this.mouse.originalEvent=event;this.eventData.data=this.mouse;this.eventData.stopped=false;this.mapPositionToPoint(this.mouse.global,event.clientX,event.clientY);this.didMove=true;this.cursor='inherit';this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseMove,true);if(this.currentCursorStyle!==this.cursor)
{this.currentCursorStyle=this.cursor;this.interactionDOMElement.style.cursor=this.cursor;}};InteractionManager.prototype.processMouseMove=function(displayObject,hit)
{this.processMouseOverOut(displayObject,hit);if(!this.moveWhenInside||hit)
{this.dispatchEvent(displayObject,'mousemove',this.eventData);}};InteractionManager.prototype.onMouseOut=function(event)
{this.mouse.originalEvent=event;this.eventData.stopped=false;this.mapPositionToPoint(this.mouse.global,event.clientX,event.clientY);this.interactionDOMElement.style.cursor='inherit';this.mapPositionToPoint(this.mouse.global,event.clientX,event.clientY);this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,false);};InteractionManager.prototype.processMouseOverOut=function(displayObject,hit)
{if(hit)
{if(!displayObject._over)
{displayObject._over=true;this.dispatchEvent(displayObject,'mouseover',this.eventData);}
if(displayObject.buttonMode)
{this.cursor=displayObject.defaultCursor;}}
else
{if(displayObject._over)
{displayObject._over=false;this.dispatchEvent(displayObject,'mouseout',this.eventData);}}};InteractionManager.prototype.onTouchStart=function(event)
{if(this.autoPreventDefault)
{event.preventDefault();}
var changedTouches=event.changedTouches;var cLength=changedTouches.length;for(var i=0;i<cLength;i++)
{var touchEvent=changedTouches[i];var touchData=this.getTouchData(touchEvent);touchData.originalEvent=event;this.eventData.data=touchData;this.eventData.stopped=false;this.processInteractive(touchData.global,this.renderer._lastObjectRendered,this.processTouchStart,true);this.returnTouchData(touchData);}};InteractionManager.prototype.processTouchStart=function(displayObject,hit)
{if(hit)
{displayObject._touchDown=true;this.dispatchEvent(displayObject,'touchstart',this.eventData);}};InteractionManager.prototype.onTouchEnd=function(event)
{if(this.autoPreventDefault)
{event.preventDefault();}
var changedTouches=event.changedTouches;var cLength=changedTouches.length;for(var i=0;i<cLength;i++)
{var touchEvent=changedTouches[i];var touchData=this.getTouchData(touchEvent);touchData.originalEvent=event;this.eventData.data=touchData;this.eventData.stopped=false;this.processInteractive(touchData.global,this.renderer._lastObjectRendered,this.processTouchEnd,true);this.returnTouchData(touchData);}};InteractionManager.prototype.processTouchEnd=function(displayObject,hit)
{if(hit)
{this.dispatchEvent(displayObject,'touchend',this.eventData);if(displayObject._touchDown)
{displayObject._touchDown=false;this.dispatchEvent(displayObject,'tap',this.eventData);}}
else
{if(displayObject._touchDown)
{displayObject._touchDown=false;this.dispatchEvent(displayObject,'touchendoutside',this.eventData);}}};InteractionManager.prototype.onTouchMove=function(event)
{if(this.autoPreventDefault)
{event.preventDefault();}
var changedTouches=event.changedTouches;var cLength=changedTouches.length;for(var i=0;i<cLength;i++)
{var touchEvent=changedTouches[i];var touchData=this.getTouchData(touchEvent);touchData.originalEvent=event;this.eventData.data=touchData;this.eventData.stopped=false;this.processInteractive(touchData.global,this.renderer._lastObjectRendered,this.processTouchMove,this.moveWhenInside);this.returnTouchData(touchData);}};InteractionManager.prototype.processTouchMove=function(displayObject,hit)
{if(!this.moveWhenInside||hit)
{this.dispatchEvent(displayObject,'touchmove',this.eventData);}};InteractionManager.prototype.getTouchData=function(touchEvent)
{var touchData=this.interactiveDataPool.pop();if(!touchData)
{touchData=new InteractionData();}
touchData.identifier=touchEvent.identifier;this.mapPositionToPoint(touchData.global,touchEvent.clientX,touchEvent.clientY);if(navigator.isCocoonJS)
{touchData.global.x=touchData.global.x/this.resolution;touchData.global.y=touchData.global.y/this.resolution;}
touchEvent.globalX=touchData.global.x;touchEvent.globalY=touchData.global.y;return touchData;};InteractionManager.prototype.returnTouchData=function(touchData)
{this.interactiveDataPool.push(touchData);};InteractionManager.prototype.destroy=function(){this.removeEvents();this.renderer=null;this.mouse=null;this.eventData=null;this.interactiveDataPool=null;this.interactionDOMElement=null;this.onMouseUp=null;this.processMouseUp=null;this.onMouseDown=null;this.processMouseDown=null;this.onMouseMove=null;this.processMouseMove=null;this.onMouseOut=null;this.processMouseOverOut=null;this.onTouchStart=null;this.processTouchStart=null;this.onTouchEnd=null;this.processTouchEnd=null;this.onTouchMove=null;this.processTouchMove=null;this._tempPoint=null;};core.WebGLRenderer.registerPlugin('interaction',InteractionManager);core.CanvasRenderer.registerPlugin('interaction',InteractionManager);},{"../core":29,"./InteractionData":116,"./interactiveTarget":119}],118:[function(require,module,exports){module.exports={InteractionData:require('./InteractionData'),InteractionManager:require('./InteractionManager'),interactiveTarget:require('./interactiveTarget')};},{"./InteractionData":116,"./InteractionManager":117,"./interactiveTarget":119}],119:[function(require,module,exports){var interactiveTarget={interactive:false,buttonMode:false,interactiveChildren:true,defaultCursor:'pointer',_over:false,_touchDown:false};module.exports=interactiveTarget;},{}],120:[function(require,module,exports){var Resource=require('resource-loader').Resource,core=require('../core'),extras=require('../extras'),path=require('path');function parse(resource,texture){var data={};var info=resource.data.getElementsByTagName('info')[0];var common=resource.data.getElementsByTagName('common')[0];data.font=info.getAttribute('face');data.size=parseInt(info.getAttribute('size'),10);data.lineHeight=parseInt(common.getAttribute('lineHeight'),10);data.chars={};var letters=resource.data.getElementsByTagName('char');for(var i=0;i<letters.length;i++)
{var charCode=parseInt(letters[i].getAttribute('id'),10);var textureRect=new core.Rectangle(parseInt(letters[i].getAttribute('x'),10)+texture.frame.x,parseInt(letters[i].getAttribute('y'),10)+texture.frame.y,parseInt(letters[i].getAttribute('width'),10),parseInt(letters[i].getAttribute('height'),10));data.chars[charCode]={xOffset:parseInt(letters[i].getAttribute('xoffset'),10),yOffset:parseInt(letters[i].getAttribute('yoffset'),10),xAdvance:parseInt(letters[i].getAttribute('xadvance'),10),kerning:{},texture:new core.Texture(texture.baseTexture,textureRect)};}
var kernings=resource.data.getElementsByTagName('kerning');for(i=0;i<kernings.length;i++)
{var first=parseInt(kernings[i].getAttribute('first'),10);var second=parseInt(kernings[i].getAttribute('second'),10);var amount=parseInt(kernings[i].getAttribute('amount'),10);if(data.chars[second])
{data.chars[second].kerning[first]=amount;}}
resource.bitmapFont=data;extras.BitmapText.fonts[data.font]=data;}
module.exports=function()
{return function(resource,next)
{if(!resource.data||!resource.isXml)
{return next();}
if(resource.data.getElementsByTagName('page').length===0||resource.data.getElementsByTagName('info').length===0||resource.data.getElementsByTagName('info')[0].getAttribute('face')===null)
{return next();}
var xmlUrl=path.dirname(resource.url);if(xmlUrl==='.'){xmlUrl='';}
if(this.baseUrl&&xmlUrl){if(this.baseUrl.charAt(this.baseUrl.length-1)==='/'){xmlUrl+='/';}
xmlUrl=xmlUrl.replace(this.baseUrl,'');}
if(xmlUrl&&xmlUrl.charAt(xmlUrl.length-1)!=='/'){xmlUrl+='/';}
var textureUrl=xmlUrl+resource.data.getElementsByTagName('page')[0].getAttribute('file');if(core.utils.TextureCache[textureUrl]){parse(resource,core.utils.TextureCache[textureUrl]);next();}
else{var loadOptions={crossOrigin:resource.crossOrigin,loadType:Resource.LOAD_TYPE.IMAGE,metadata:resource.metadata.imageMetadata};this.add(resource.name+'_image',textureUrl,loadOptions,function(res){parse(resource,res.texture);next();});}};};},{"../core":29,"../extras":86,"path":2,"resource-loader":16}],121:[function(require,module,exports){module.exports={Loader:require('./loader'),bitmapFontParser:require('./bitmapFontParser'),spritesheetParser:require('./spritesheetParser'),textureParser:require('./textureParser'),Resource:require('resource-loader').Resource};},{"./bitmapFontParser":120,"./loader":122,"./spritesheetParser":123,"./textureParser":124,"resource-loader":16}],122:[function(require,module,exports){var ResourceLoader=require('resource-loader'),textureParser=require('./textureParser'),spritesheetParser=require('./spritesheetParser'),bitmapFontParser=require('./bitmapFontParser');function Loader(baseUrl,concurrency)
{ResourceLoader.call(this,baseUrl,concurrency);for(var i=0;i<Loader._pixiMiddleware.length;++i){this.use(Loader._pixiMiddleware[i]());}}
Loader.prototype=Object.create(ResourceLoader.prototype);Loader.prototype.constructor=Loader;module.exports=Loader;Loader._pixiMiddleware=[ResourceLoader.middleware.parsing.blob,textureParser,spritesheetParser,bitmapFontParser];Loader.addPixiMiddleware=function(fn){Loader._pixiMiddleware.push(fn);};var Resource=ResourceLoader.Resource;Resource.setExtensionXhrType('fnt',Resource.XHR_RESPONSE_TYPE.DOCUMENT);},{"./bitmapFontParser":120,"./spritesheetParser":123,"./textureParser":124,"resource-loader":16}],123:[function(require,module,exports){var Resource=require('resource-loader').Resource,path=require('path'),core=require('../core'),async=require('async');var BATCH_SIZE=1000;module.exports=function()
{return function(resource,next)
{var imageResourceName=resource.name+'_image';if(!resource.data||!resource.isJson||!resource.data.frames||this.resources[imageResourceName])
{return next();}
var loadOptions={crossOrigin:resource.crossOrigin,loadType:Resource.LOAD_TYPE.IMAGE,metadata:resource.metadata.imageMetadata};var route=path.dirname(resource.url.replace(this.baseUrl,''));this.add(imageResourceName,route+'/'+resource.data.meta.image,loadOptions,function(res)
{resource.textures={};var frames=resource.data.frames;var frameKeys=Object.keys(frames);var resolution=core.utils.getResolutionOfUrl(resource.url);var batchIndex=0;function processFrames(initialFrameIndex,maxFrames)
{var frameIndex=initialFrameIndex;while(frameIndex-initialFrameIndex<maxFrames&&frameIndex<frameKeys.length)
{var frame=frames[frameKeys[frameIndex]];var rect=frame.frame;if(rect)
{var size=null;var trim=null;if(frame.rotated)
{size=new core.Rectangle(rect.x,rect.y,rect.h,rect.w);}
else
{size=new core.Rectangle(rect.x,rect.y,rect.w,rect.h);}
if(frame.trimmed)
{trim=new core.Rectangle(frame.spriteSourceSize.x/resolution,frame.spriteSourceSize.y/resolution,frame.sourceSize.w/resolution,frame.sourceSize.h/resolution);}
if(frame.rotated)
{var temp=size.width;size.width=size.height;size.height=temp;}
size.x/=resolution;size.y/=resolution;size.width/=resolution;size.height/=resolution;resource.textures[frameKeys[frameIndex]]=new core.Texture(res.texture.baseTexture,size,size.clone(),trim,frame.rotated);core.utils.TextureCache[frameKeys[frameIndex]]=resource.textures[frameKeys[frameIndex]];}
frameIndex++;}}
function shouldProcessNextBatch()
{return batchIndex*BATCH_SIZE<frameKeys.length;}
function processNextBatch(done)
{processFrames(batchIndex*BATCH_SIZE,BATCH_SIZE);batchIndex++;setTimeout(done,0);}
if(frameKeys.length<=BATCH_SIZE)
{processFrames(0,BATCH_SIZE);next();}
else
{async.whilst(shouldProcessNextBatch,processNextBatch,next);}});};};},{"../core":29,"async":1,"path":2,"resource-loader":16}],124:[function(require,module,exports){var core=require('../core');module.exports=function()
{return function(resource,next)
{if(resource.data&&resource.isImage)
{var baseTexture=new core.BaseTexture(resource.data,null,core.utils.getResolutionOfUrl(resource.url));baseTexture.imageUrl=resource.url;resource.texture=new core.Texture(baseTexture);core.utils.BaseTextureCache[resource.url]=baseTexture;core.utils.TextureCache[resource.url]=resource.texture;}
next();};};},{"../core":29}],125:[function(require,module,exports){var core=require('../core'),tempPoint=new core.Point(),tempPolygon=new core.Polygon();function Mesh(texture,vertices,uvs,indices,drawMode)
{core.Container.call(this);this._texture=null;this.uvs=uvs||new Float32Array([0,0,1,0,1,1,0,1]);this.vertices=vertices||new Float32Array([0,0,100,0,100,100,0,100]);this.indices=indices||new Uint16Array([0,1,3,2]);this.dirty=true;this.blendMode=core.BLEND_MODES.NORMAL;this.canvasPadding=0;this.drawMode=drawMode||Mesh.DRAW_MODES.TRIANGLE_MESH;this.texture=texture;this.shader=null;}
Mesh.prototype=Object.create(core.Container.prototype);Mesh.prototype.constructor=Mesh;module.exports=Mesh;Object.defineProperties(Mesh.prototype,{texture:{get:function()
{return this._texture;},set:function(value)
{if(this._texture===value)
{return;}
this._texture=value;if(value)
{if(value.baseTexture.hasLoaded)
{this._onTextureUpdate();}
else
{value.once('update',this._onTextureUpdate,this);}}}}});Mesh.prototype._renderWebGL=function(renderer)
{renderer.setObjectRenderer(renderer.plugins.mesh);renderer.plugins.mesh.render(this);};Mesh.prototype._renderCanvas=function(renderer)
{var context=renderer.context;var transform=this.worldTransform;var res=renderer.resolution;if(renderer.roundPixels)
{context.setTransform(transform.a*res,transform.b*res,transform.c*res,transform.d*res,(transform.tx*res)|0,(transform.ty*res)|0);}
else
{context.setTransform(transform.a*res,transform.b*res,transform.c*res,transform.d*res,transform.tx*res,transform.ty*res);}
if(this.drawMode===Mesh.DRAW_MODES.TRIANGLE_MESH)
{this._renderCanvasTriangleMesh(context);}
else
{this._renderCanvasTriangles(context);}};Mesh.prototype._renderCanvasTriangleMesh=function(context)
{var vertices=this.vertices;var uvs=this.uvs;var length=vertices.length/2;for(var i=0;i<length-2;i++)
{var index=i*2;this._renderCanvasDrawTriangle(context,vertices,uvs,index,(index+2),(index+4));}};Mesh.prototype._renderCanvasTriangles=function(context)
{var vertices=this.vertices;var uvs=this.uvs;var indices=this.indices;var length=indices.length;for(var i=0;i<length;i+=3)
{var index0=indices[i]*2,index1=indices[i+1]*2,index2=indices[i+2]*2;this._renderCanvasDrawTriangle(context,vertices,uvs,index0,index1,index2);}};Mesh.prototype._renderCanvasDrawTriangle=function(context,vertices,uvs,index0,index1,index2)
{var base=this._texture.baseTexture;var textureSource=base.source;var textureWidth=base.width;var textureHeight=base.height;var x0=vertices[index0],x1=vertices[index1],x2=vertices[index2];var y0=vertices[index0+1],y1=vertices[index1+1],y2=vertices[index2+1];var u0=uvs[index0]*base.width,u1=uvs[index1]*base.width,u2=uvs[index2]*base.width;var v0=uvs[index0+1]*base.height,v1=uvs[index1+1]*base.height,v2=uvs[index2+1]*base.height;if(this.canvasPadding>0)
{var paddingX=this.canvasPadding/this.worldTransform.a;var paddingY=this.canvasPadding/this.worldTransform.d;var centerX=(x0+x1+x2)/3;var centerY=(y0+y1+y2)/3;var normX=x0-centerX;var normY=y0-centerY;var dist=Math.sqrt(normX*normX+normY*normY);x0=centerX+(normX/dist)*(dist+paddingX);y0=centerY+(normY/dist)*(dist+paddingY);normX=x1-centerX;normY=y1-centerY;dist=Math.sqrt(normX*normX+normY*normY);x1=centerX+(normX/dist)*(dist+paddingX);y1=centerY+(normY/dist)*(dist+paddingY);normX=x2-centerX;normY=y2-centerY;dist=Math.sqrt(normX*normX+normY*normY);x2=centerX+(normX/dist)*(dist+paddingX);y2=centerY+(normY/dist)*(dist+paddingY);}
context.save();context.beginPath();context.moveTo(x0,y0);context.lineTo(x1,y1);context.lineTo(x2,y2);context.closePath();context.clip();var delta=(u0*v1)+(v0*u2)+(u1*v2)-(v1*u2)-(v0*u1)-(u0*v2);var deltaA=(x0*v1)+(v0*x2)+(x1*v2)-(v1*x2)-(v0*x1)-(x0*v2);var deltaB=(u0*x1)+(x0*u2)+(u1*x2)-(x1*u2)-(x0*u1)-(u0*x2);var deltaC=(u0*v1*x2)+(v0*x1*u2)+(x0*u1*v2)-(x0*v1*u2)-(v0*u1*x2)-(u0*x1*v2);var deltaD=(y0*v1)+(v0*y2)+(y1*v2)-(v1*y2)-(v0*y1)-(y0*v2);var deltaE=(u0*y1)+(y0*u2)+(u1*y2)-(y1*u2)-(y0*u1)-(u0*y2);var deltaF=(u0*v1*y2)+(v0*y1*u2)+(y0*u1*v2)-(y0*v1*u2)-(v0*u1*y2)-(u0*y1*v2);context.transform(deltaA/delta,deltaD/delta,deltaB/delta,deltaE/delta,deltaC/delta,deltaF/delta);context.drawImage(textureSource,0,0,textureWidth*base.resolution,textureHeight*base.resolution,0,0,textureWidth,textureHeight);context.restore();};Mesh.prototype.renderMeshFlat=function(Mesh)
{var context=this.context;var vertices=Mesh.vertices;var length=vertices.length/2;context.beginPath();for(var i=1;i<length-2;i++)
{var index=i*2;var x0=vertices[index],x1=vertices[index+2],x2=vertices[index+4];var y0=vertices[index+1],y1=vertices[index+3],y2=vertices[index+5];context.moveTo(x0,y0);context.lineTo(x1,y1);context.lineTo(x2,y2);}
context.fillStyle='#FF0000';context.fill();context.closePath();};Mesh.prototype._onTextureUpdate=function()
{this.updateFrame=true;};Mesh.prototype.getBounds=function(matrix)
{if(!this._currentBounds){var worldTransform=matrix||this.worldTransform;var a=worldTransform.a;var b=worldTransform.b;var c=worldTransform.c;var d=worldTransform.d;var tx=worldTransform.tx;var ty=worldTransform.ty;var maxX=-Infinity;var maxY=-Infinity;var minX=Infinity;var minY=Infinity;var vertices=this.vertices;for(var i=0,n=vertices.length;i<n;i+=2){var rawX=vertices[i],rawY=vertices[i+1];var x=(a*rawX)+(c*rawY)+tx;var y=(d*rawY)+(b*rawX)+ty;minX=x<minX?x:minX;minY=y<minY?y:minY;maxX=x>maxX?x:maxX;maxY=y>maxY?y:maxY;}
if(minX===-Infinity||maxY===Infinity){return core.Rectangle.EMPTY;}
var bounds=this._bounds;bounds.x=minX;bounds.width=maxX-minX;bounds.y=minY;bounds.height=maxY-minY;this._currentBounds=bounds;}
return this._currentBounds;};Mesh.prototype.containsPoint=function(point){if(!this.getBounds().contains(point.x,point.y)){return false;}
this.worldTransform.applyInverse(point,tempPoint);var vertices=this.vertices;var points=tempPolygon.points;var i,len;if(this.drawMode===Mesh.DRAW_MODES.TRIANGLES){var indices=this.indices;len=this.indices.length;for(i=0;i<len;i+=3){var ind0=indices[i]*2,ind1=indices[i+1]*2,ind2=indices[i+2]*2;points[0]=vertices[ind0];points[1]=vertices[ind0+1];points[2]=vertices[ind1];points[3]=vertices[ind1+1];points[4]=vertices[ind2];points[5]=vertices[ind2+1];if(tempPolygon.contains(tempPoint.x,tempPoint.y)){return true;}}}else{len=vertices.length;for(i=0;i<len;i+=6){points[0]=vertices[i];points[1]=vertices[i+1];points[2]=vertices[i+2];points[3]=vertices[i+3];points[4]=vertices[i+4];points[5]=vertices[i+5];if(tempPolygon.contains(tempPoint.x,tempPoint.y)){return true;}}}
return false;};Mesh.DRAW_MODES={TRIANGLE_MESH:0,TRIANGLES:1};},{"../core":29}],126:[function(require,module,exports){var Mesh=require('./Mesh');function Plane(texture,segmentsX,segmentsY)
{Mesh.call(this,texture);this._ready=true;this.segmentsX=segmentsX||10;this.segmentsY=segmentsY||10;this.drawMode=Mesh.DRAW_MODES.TRIANGLES;this.refresh();}
Plane.prototype=Object.create(Mesh.prototype);Plane.prototype.constructor=Plane;module.exports=Plane;Plane.prototype.refresh=function()
{var total=this.segmentsX*this.segmentsY;var verts=[];var colors=[];var uvs=[];var indices=[];var texture=this.texture;var segmentsXSub=this.segmentsX-1;var segmentsYSub=this.segmentsY-1;var i=0;var sizeX=texture.width/segmentsXSub;var sizeY=texture.height/segmentsYSub;for(i=0;i<total;i++){var x=(i%this.segmentsX);var y=((i/this.segmentsX)|0);verts.push((x*sizeX),(y*sizeY));uvs.push(texture._uvs.x0+(texture._uvs.x1-texture._uvs.x0)*(x/(this.segmentsX-1)),texture._uvs.y0+(texture._uvs.y3-texture._uvs.y0)*(y/(this.segmentsY-1)));}
var totalSub=segmentsXSub*segmentsYSub;for(i=0;i<totalSub;i++){var xpos=i%segmentsXSub;var ypos=(i/segmentsXSub)|0;var value=(ypos*this.segmentsX)+xpos;var value2=(ypos*this.segmentsX)+xpos+1;var value3=((ypos+1)*this.segmentsX)+xpos;var value4=((ypos+1)*this.segmentsX)+xpos+1;indices.push(value,value2,value3);indices.push(value2,value4,value3);}
this.vertices=new Float32Array(verts);this.uvs=new Float32Array(uvs);this.colors=new Float32Array(colors);this.indices=new Uint16Array(indices);};Plane.prototype._onTextureUpdate=function()
{Mesh.prototype._onTextureUpdate.call(this);if(this._ready){this.refresh();}};},{"./Mesh":125}],127:[function(require,module,exports){var Mesh=require('./Mesh');var core=require('../core');function Rope(texture,points)
{Mesh.call(this,texture);this.points=points;this.vertices=new Float32Array(points.length*4);this.uvs=new Float32Array(points.length*4);this.colors=new Float32Array(points.length*2);this.indices=new Uint16Array(points.length*2);this._ready=true;this.refresh();}
Rope.prototype=Object.create(Mesh.prototype);Rope.prototype.constructor=Rope;module.exports=Rope;Rope.prototype.refresh=function()
{var points=this.points;if(points.length<1||!this._texture._uvs)
{return;}
var uvs=this.uvs;var indices=this.indices;var colors=this.colors;var textureUvs=this._texture._uvs;var offset=new core.Point(textureUvs.x0,textureUvs.y0);var factor=new core.Point(textureUvs.x2-textureUvs.x0,textureUvs.y2-textureUvs.y0);uvs[0]=0+offset.x;uvs[1]=0+offset.y;uvs[2]=0+offset.x;uvs[3]=1*factor.y+offset.y;colors[0]=1;colors[1]=1;indices[0]=0;indices[1]=1;var total=points.length,point,index,amount;for(var i=1;i<total;i++)
{point=points[i];index=i*4;amount=i/(total-1);uvs[index]=amount*factor.x+offset.x;uvs[index+1]=0+offset.y;uvs[index+2]=amount*factor.x+offset.x;uvs[index+3]=1*factor.y+offset.y;index=i*2;colors[index]=1;colors[index+1]=1;index=i*2;indices[index]=index;indices[index+1]=index+1;}
this.dirty=true;};Rope.prototype._onTextureUpdate=function()
{Mesh.prototype._onTextureUpdate.call(this);if(this._ready){this.refresh();}};Rope.prototype.updateTransform=function()
{var points=this.points;if(points.length<1)
{return;}
var lastPoint=points[0];var nextPoint;var perpX=0;var perpY=0;var vertices=this.vertices;var total=points.length,point,index,ratio,perpLength,num;for(var i=0;i<total;i++)
{point=points[i];index=i*4;if(i<points.length-1)
{nextPoint=points[i+1];}
else
{nextPoint=point;}
perpY=-(nextPoint.x-lastPoint.x);perpX=nextPoint.y-lastPoint.y;ratio=(1-(i/(total-1)))*10;if(ratio>1)
{ratio=1;}
perpLength=Math.sqrt(perpX*perpX+perpY*perpY);num=this._texture.height/2;perpX/=perpLength;perpY/=perpLength;perpX*=num;perpY*=num;vertices[index]=point.x+perpX;vertices[index+1]=point.y+perpY;vertices[index+2]=point.x-perpX;vertices[index+3]=point.y-perpY;lastPoint=point;}
this.containerUpdateTransform();};},{"../core":29,"./Mesh":125}],128:[function(require,module,exports){module.exports={Mesh:require('./Mesh'),Plane:require('./Plane'),Rope:require('./Rope'),MeshRenderer:require('./webgl/MeshRenderer'),MeshShader:require('./webgl/MeshShader')};},{"./Mesh":125,"./Plane":126,"./Rope":127,"./webgl/MeshRenderer":129,"./webgl/MeshShader":130}],129:[function(require,module,exports){var core=require('../../core'),Mesh=require('../Mesh');function MeshRenderer(renderer)
{core.ObjectRenderer.call(this,renderer);this.indices=new Uint16Array(15000);for(var i=0,j=0;i<15000;i+=6,j+=4)
{this.indices[i+0]=j+0;this.indices[i+1]=j+1;this.indices[i+2]=j+2;this.indices[i+3]=j+0;this.indices[i+4]=j+2;this.indices[i+5]=j+3;}
this.currentShader=null;}
MeshRenderer.prototype=Object.create(core.ObjectRenderer.prototype);MeshRenderer.prototype.constructor=MeshRenderer;module.exports=MeshRenderer;core.WebGLRenderer.registerPlugin('mesh',MeshRenderer);MeshRenderer.prototype.onContextChange=function()
{};MeshRenderer.prototype.render=function(mesh)
{if(!mesh._vertexBuffer)
{this._initWebGL(mesh);}
var renderer=this.renderer,gl=renderer.gl,texture=mesh._texture.baseTexture,shader=mesh.shader;var drawMode=mesh.drawMode===Mesh.DRAW_MODES.TRIANGLE_MESH?gl.TRIANGLE_STRIP:gl.TRIANGLES;renderer.blendModeManager.setBlendMode(mesh.blendMode);if(!shader)
{shader=renderer.shaderManager.plugins.meshShader;}
else
{shader=shader.shaders[gl.id]||shader.getShader(renderer);}
this.renderer.shaderManager.setShader(shader);shader.uniforms.translationMatrix.value=mesh.worldTransform.toArray(true);shader.uniforms.projectionMatrix.value=renderer.currentRenderTarget.projectionMatrix.toArray(true);shader.uniforms.alpha.value=mesh.worldAlpha;shader.syncUniforms();if(!mesh.dirty)
{gl.bindBuffer(gl.ARRAY_BUFFER,mesh._vertexBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,mesh.vertices);gl.vertexAttribPointer(shader.attributes.aVertexPosition,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,mesh._uvBuffer);gl.vertexAttribPointer(shader.attributes.aTextureCoord,2,gl.FLOAT,false,0,0);gl.activeTexture(gl.TEXTURE0);if(!texture._glTextures[gl.id])
{this.renderer.updateTexture(texture);}
else
{gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh._indexBuffer);gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER,0,mesh.indices);}
else
{mesh.dirty=false;gl.bindBuffer(gl.ARRAY_BUFFER,mesh._vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,mesh.vertices,gl.STATIC_DRAW);gl.vertexAttribPointer(shader.attributes.aVertexPosition,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,mesh._uvBuffer);gl.bufferData(gl.ARRAY_BUFFER,mesh.uvs,gl.STATIC_DRAW);gl.vertexAttribPointer(shader.attributes.aTextureCoord,2,gl.FLOAT,false,0,0);gl.activeTexture(gl.TEXTURE0);if(!texture._glTextures[gl.id])
{this.renderer.updateTexture(texture);}
else
{gl.bindTexture(gl.TEXTURE_2D,texture._glTextures[gl.id]);}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh._indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.indices,gl.STATIC_DRAW);}
gl.drawElements(drawMode,mesh.indices.length,gl.UNSIGNED_SHORT,0);};MeshRenderer.prototype._initWebGL=function(mesh)
{var gl=this.renderer.gl;mesh._vertexBuffer=gl.createBuffer();mesh._indexBuffer=gl.createBuffer();mesh._uvBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,mesh._vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,mesh.vertices,gl.DYNAMIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,mesh._uvBuffer);gl.bufferData(gl.ARRAY_BUFFER,mesh.uvs,gl.STATIC_DRAW);if(mesh.colors){mesh._colorBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,mesh._colorBuffer);gl.bufferData(gl.ARRAY_BUFFER,mesh.colors,gl.STATIC_DRAW);}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh._indexBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.indices,gl.STATIC_DRAW);};MeshRenderer.prototype.flush=function()
{};MeshRenderer.prototype.start=function()
{this.currentShader=null;};MeshRenderer.prototype.destroy=function()
{core.ObjectRenderer.prototype.destroy.call(this);};},{"../../core":29,"../Mesh":125}],130:[function(require,module,exports){var core=require('../../core');function MeshShader(shaderManager)
{core.Shader.call(this,shaderManager,['precision lowp float;','attribute vec2 aVertexPosition;','attribute vec2 aTextureCoord;','uniform mat3 translationMatrix;','uniform mat3 projectionMatrix;','varying vec2 vTextureCoord;','void main(void){','   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);','   vTextureCoord = aTextureCoord;','}'].join('\n'),['precision lowp float;','varying vec2 vTextureCoord;','uniform float alpha;','uniform sampler2D uSampler;','void main(void){','   gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha ;','}'].join('\n'),{alpha:{type:'1f',value:0},translationMatrix:{type:'mat3',value:new Float32Array(9)},projectionMatrix:{type:'mat3',value:new Float32Array(9)}},{aVertexPosition:0,aTextureCoord:0});}
MeshShader.prototype=Object.create(core.Shader.prototype);MeshShader.prototype.constructor=MeshShader;module.exports=MeshShader;core.ShaderManager.registerPlugin('meshShader',MeshShader);},{"../../core":29}],131:[function(require,module,exports){if(!Math.sign)
{Math.sign=function(x){x=+x;if(x===0||isNaN(x))
{return x;}
return x>0?1:-1;};}},{}],132:[function(require,module,exports){if(!Object.assign)
{Object.assign=require('object-assign');}},{"object-assign":11}],133:[function(require,module,exports){require('./Object.assign');require('./requestAnimationFrame');require('./Math.sign');},{"./Math.sign":131,"./Object.assign":132,"./requestAnimationFrame":134}],134:[function(require,module,exports){(function(global){if(!(Date.now&&Date.prototype.getTime)){Date.now=function now(){return new Date().getTime();};}
if(!(global.performance&&global.performance.now)){var startTime=Date.now();if(!global.performance){global.performance={};}
global.performance.now=function(){return Date.now()-startTime;};}
var lastTime=Date.now();var vendors=['ms','moz','webkit','o'];for(var x=0;x<vendors.length&&!global.requestAnimationFrame;++x){global.requestAnimationFrame=global[vendors[x]+'RequestAnimationFrame'];global.cancelAnimationFrame=global[vendors[x]+'CancelAnimationFrame']||global[vendors[x]+'CancelRequestAnimationFrame'];}
if(!global.requestAnimationFrame){global.requestAnimationFrame=function(callback){if(typeof callback!=='function'){throw new TypeError(callback+'is not a function');}
var currentTime=Date.now(),delay=16+lastTime-currentTime;if(delay<0){delay=0;}
lastTime=currentTime;return setTimeout(function(){lastTime=Date.now();callback(performance.now());},delay);};}
if(!global.cancelAnimationFrame){global.cancelAnimationFrame=function(id){clearTimeout(id);};}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}]},{},[115])(115)});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @namespace PIXI.spine
 */
module.exports = PIXI.spine = {
    Spine:          require('./Spine'),
    SpineRuntime:   require('./SpineRuntime'),
    loaders:        require('./loaders')
};

},{"./Spine":45,"./SpineRuntime":43,"./loaders":49}],2:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = function (name, timelines, duration)
{
    this.name = name;
    this.timelines = timelines;
    this.duration = duration;
};
spine.Animation.prototype = {
    apply: function (skeleton, lastTime, time, loop, events)
    {
        if (loop && this.duration != 0)
        {
            time %= this.duration;
            lastTime %= this.duration;
        }
        var timelines = this.timelines;
        for (var i = 0, n = timelines.length; i < n; i++)
            timelines[i].apply(skeleton, lastTime, time, events, 1);
    },
    mix: function (skeleton, lastTime, time, loop, events, alpha)
    {
        if (loop && this.duration != 0)
        {
            time %= this.duration;
            lastTime %= this.duration;
        }
        var timelines = this.timelines;
        for (var i = 0, n = timelines.length; i < n; i++)
            timelines[i].apply(skeleton, lastTime, time, events, alpha);
    }
};
spine.Animation.binarySearch = function (values, target, step)
{
    var low = 0;
    var high = Math.floor(values.length / step) - 2;
    if (!high) return step;
    var current = high >>> 1;
    while (true)
    {
        if (values[(current + 1) * step] <= target)
            low = current + 1;
        else
            high = current;
        if (low == high) return (low + 1) * step;
        current = (low + high) >>> 1;
    }
};
spine.Animation.binarySearch1 = function (values, target)
{
    var low = 0;
    var high = values.length - 2;
    if (!high) return 1;
    var current = high >>> 1;
    while (true)
    {
        if (values[current + 1] <= target)
            low = current + 1;
        else
            high = current;
        if (low == high) return low + 1;
        current = (low + high) >>> 1;
    }
};
spine.Animation.linearSearch = function (values, target, step)
{
    for (var i = 0, last = values.length - step; i <= last; i += step)
        if (values[i] > target) return i;
    return -1;
};
module.exports = spine.Animation;

},{"../SpineUtil":44}],3:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.TrackEntry = require('./TrackEntry');
spine.AnimationState = function (stateData)
{
    this.data = stateData;
    this.tracks = [];
    this.events = [];
};
spine.AnimationState.prototype = {
    onStart: null,
    onEnd: null,
    onComplete: null,
    onEvent: null,
    timeScale: 1,
    update: function (delta)
    {
        delta *= this.timeScale;
        for (var i = 0; i < this.tracks.length; i++)
        {
            var current = this.tracks[i];
            if (!current) continue;

            current.time += delta * current.timeScale;
            if (current.previous)
            {
                var previousDelta = delta * current.previous.timeScale;
                current.previous.time += previousDelta;
                current.mixTime += previousDelta;
            }

            var next = current.next;
            if (next)
            {
                next.time = current.lastTime - next.delay;
                if (next.time >= 0) this.setCurrent(i, next);
            } else {
                // End non-looping animation when it reaches its end time and there is no next entry.
                if (!current.loop && current.lastTime >= current.endTime) this.clearTrack(i);
            }
        }
    },
    apply: function (skeleton)
    {
        skeleton.resetDrawOrder();

        for (var i = 0; i < this.tracks.length; i++)
        {
            var current = this.tracks[i];
            if (!current) continue;

            this.events.length = 0;

            var time = current.time;
            var lastTime = current.lastTime;
            var endTime = current.endTime;
            var loop = current.loop;
            if (!loop && time > endTime) time = endTime;

            var previous = current.previous;
            if (!previous)
            {
                if (current.mix == 1)
                    current.animation.apply(skeleton, current.lastTime, time, loop, this.events);
                else
                    current.animation.mix(skeleton, current.lastTime, time, loop, this.events, current.mix);
            } else {
                var previousTime = previous.time;
                if (!previous.loop && previousTime > previous.endTime) previousTime = previous.endTime;
                previous.animation.apply(skeleton, previousTime, previousTime, previous.loop, null);

                var alpha = current.mixTime / current.mixDuration * current.mix;
                if (alpha >= 1)
                {
                    alpha = 1;
                    current.previous = null;
                }
                current.animation.mix(skeleton, current.lastTime, time, loop, this.events, alpha);
            }

            for (var ii = 0, nn = this.events.length; ii < nn; ii++)
            {
                var event = this.events[ii];
                if (current.onEvent) current.onEvent(i, event);
                if (this.onEvent) this.onEvent(i, event);
            }

            // Check if completed the animation or a loop iteration.
            if (loop ? (lastTime % endTime > time % endTime) : (lastTime < endTime && time >= endTime))
            {
                var count = Math.floor(time / endTime);
                if (current.onComplete) current.onComplete(i, count);
                if (this.onComplete) this.onComplete(i, count);
            }

            current.lastTime = current.time;
        }
    },
    clearTracks: function ()
    {
        for (var i = 0, n = this.tracks.length; i < n; i++)
            this.clearTrack(i);
        this.tracks.length = 0;
    },
    clearTrack: function (trackIndex)
    {
        if (trackIndex >= this.tracks.length) return;
        var current = this.tracks[trackIndex];
        if (!current) return;

        if (current.onEnd) current.onEnd(trackIndex);
        if (this.onEnd) this.onEnd(trackIndex);

        this.tracks[trackIndex] = null;
    },
    _expandToIndex: function (index)
    {
        if (index < this.tracks.length) return this.tracks[index];
        while (index >= this.tracks.length)
            this.tracks.push(null);
        return null;
    },
    setCurrent: function (index, entry)
    {
        var current = this._expandToIndex(index);
        if (current)
        {
            var previous = current.previous;
            current.previous = null;

            if (current.onEnd) current.onEnd(index);
            if (this.onEnd) this.onEnd(index);

            entry.mixDuration = this.data.getMix(current.animation, entry.animation);
            if (entry.mixDuration > 0)
            {
                entry.mixTime = 0;
                // If a mix is in progress, mix from the closest animation.
                if (previous && current.mixTime / current.mixDuration < 0.5)
                    entry.previous = previous;
                else
                    entry.previous = current;
            }
        }

        this.tracks[index] = entry;

        if (entry.onStart) entry.onStart(index);
        if (this.onStart) this.onStart(index);
    },
    setAnimationByName: function (trackIndex, animationName, loop)
    {
        var animation = this.data.skeletonData.findAnimation(animationName);
        if (!animation) throw "Animation not found: " + animationName;
        return this.setAnimation(trackIndex, animation, loop);
    },
    /** Set the current animation. Any queued animations are cleared. */
    setAnimation: function (trackIndex, animation, loop)
    {
        var entry = new spine.TrackEntry();
        entry.animation = animation;
        entry.loop = loop;
        entry.endTime = animation.duration;
        this.setCurrent(trackIndex, entry);
        return entry;
    },
    addAnimationByName: function (trackIndex, animationName, loop, delay)
    {
        var animation = this.data.skeletonData.findAnimation(animationName);
        if (!animation) throw "Animation not found: " + animationName;
        return this.addAnimation(trackIndex, animation, loop, delay);
    },
    /** Adds an animation to be played delay seconds after the current or last queued animation.
     * @param delay May be <= 0 to use duration of previous animation minus any mix duration plus the negative delay. */
    addAnimation: function (trackIndex, animation, loop, delay)
    {
        var entry = new spine.TrackEntry();
        entry.animation = animation;
        entry.loop = loop;
        entry.endTime = animation.duration;

        var last = this._expandToIndex(trackIndex);
        if (last)
        {
            while (last.next)
                last = last.next;
            last.next = entry;
        } else
            this.tracks[trackIndex] = entry;

        if (delay <= 0)
        {
            if (last)
                delay += last.endTime - this.data.getMix(last.animation, animation);
            else
                delay = 0;
        }
        entry.delay = delay;

        return entry;
    },
    /**
     * Returns true if animation exists in skeleton data
     * @param animationName
     * @returns {boolean}
     */
    hasAnimationByName: function (animationName)
    {
        var animation = this.data.skeletonData.findAnimation(animationName);
        return animation !== null;
    },
    /** May be null. */
    getCurrent: function (trackIndex)
    {
        if (trackIndex >= this.tracks.length) return null;
        return this.tracks[trackIndex];
    }
};
module.exports = spine.AnimationState;


},{"../SpineUtil":44,"./TrackEntry":37}],4:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AnimationStateData = function (skeletonData)
{
    this.skeletonData = skeletonData;
    this.animationToMixTime = {};
};
spine.AnimationStateData.prototype = {
    defaultMix: 0,
    setMixByName: function (fromName, toName, duration)
    {
        var from = this.skeletonData.findAnimation(fromName);
        if (!from) throw "Animation not found: " + fromName;
        var to = this.skeletonData.findAnimation(toName);
        if (!to) throw "Animation not found: " + toName;
        this.setMix(from, to, duration);
    },
    setMix: function (from, to, duration)
    {
        this.animationToMixTime[from.name + ":" + to.name] = duration;
    },
    getMix: function (from, to)
    {
        var key = from.name + ":" + to.name;
        return this.animationToMixTime.hasOwnProperty(key) ? this.animationToMixTime[key] : this.defaultMix;
    }
};
module.exports = spine.AnimationStateData;


},{"../SpineUtil":44}],5:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AtlasReader = require('./AtlasReader');
spine.AtlasPage = require('./AtlasPage');
spine.AtlasRegion = require('./AtlasRegion');
var syncImageLoaderAdapter = require('../loaders/syncImageLoaderAdapter.js')

spine.Atlas = function(atlasText, loaderFunction, callback) {
    this.pages = [];
    this.regions = [];
    if (typeof atlasText === "string") {
        this.addSpineAtlas.call(this, atlasText, loaderFunction, callback);
    }
};

spine.Atlas.prototype = {
    addTexture: function(name, texture) {
        var pages = this.pages;
        var page = null;
        for (var i=0;i<pages.length;i++) {
            if (pages[i].rendererObject === texture.baseTexture) {
                page = pages[i];
                break;
            }
        }
        if (page === null) {
            page = new spine.AtlasPage();
            page.name = 'texturePage';
            var baseTexture = texture.baseTexture;
            page.width = baseTexture.realWidth;
            page.height = baseTexture.realHeight;
            page.rendererObject = baseTexture;
            //those fields are not relevant in Pixi
            page.format = 'RGBA8888';
            page.minFilter = page.magFilter = "Nearest";
            page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
            page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
            pages.push(page);
        }
        var region = new spine.AtlasRegion();
        region.name = name;
        region.page = page;
        region.texture = texture;
        region.index = -1;
        this.regions.push(region);
        return region;
    },
    addTextureHash: function(textures, stripExtension) {
        for (var key in textures) {
            if (textures.hasOwnProperty(key)) {
                this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
            }
        }
    },
    addSpineAtlas: function (atlasText, loaderFunction, callback)
    {
        //TODO: remove this legacy later
        if (typeof loaderFunction !== "function") {
            //old syntax
            var baseUrl = loaderFunction;
            var crossOrigin = callback;
            loaderFunction = syncImageLoaderAdapter(baseUrl, crossOrigin);
            callback = null;
        }

        this.texturesLoading = 0;

        var self = this;

        var reader = new spine.AtlasReader(atlasText);
        var tuple = [];
        tuple.length = 4;
        var page = null;

        iterateParser();

        function iterateParser() {
            while (true) {
                var line = reader.readLine();
                if (line === null) {
                    return callback && callback(self);
                }
                line = reader.trim(line);
                if (!line.length)
                    page = null;
                else if (!page) {
                    page = new spine.AtlasPage();
                    page.name = line;

                    if (reader.readTuple(tuple) == 2) { // size is only optional for an atlas packed with an old TexturePacker.
                        page.width = parseInt(tuple[0]);
                        page.height = parseInt(tuple[1]);
                        reader.readTuple(tuple);
                    } else {
                        //old format, detect width and height by texture
                    }
                    page.format = spine.Atlas.Format[tuple[0]];

                    reader.readTuple(tuple);
                    page.minFilter = spine.Atlas.TextureFilter[tuple[0]];
                    page.magFilter = spine.Atlas.TextureFilter[tuple[1]];

                    var direction = reader.readValue();
                    page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
                    page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
                    if (direction == "x")
                        page.uWrap = spine.Atlas.TextureWrap.repeat;
                    else if (direction == "y")
                        page.vWrap = spine.Atlas.TextureWrap.repeat;
                    else if (direction == "xy")
                        page.uWrap = page.vWrap = spine.Atlas.TextureWrap.repeat;

                    // @ivanpopelyshev: I so want to use generators and "yield()" here, or at least promises
                    loaderFunction(line, function (texture) {
                        page.rendererObject = texture;
                        if (!texture.hasLoaded) {
                            texture.width = page.width;
                            texture.height = page.height;
                        }
                        self.pages.push(page);
                        if (!page.width || !page.height) {
                            page.width = texture.realWidth;
                            page.height = texture.realHeight;
                            if (!page.width || !page.height) {
                                console.log("ERROR spine atlas page " + page.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)");
                            }
                        }
                        iterateParser();
                    });
                    break;
                } else {
                    var region = new spine.AtlasRegion();
                    region.name = line;
                    region.page = page;

                    var rotate = reader.readValue() === "true" ? 6 : 0;

                    reader.readTuple(tuple);
                    var x = parseInt(tuple[0]);
                    var y = parseInt(tuple[1]);

                    reader.readTuple(tuple);
                    var width = parseInt(tuple[0]);
                    var height = parseInt(tuple[1]);

                    var resolution = page.rendererObject.resolution;
                    x /= resolution;
                    y /= resolution;
                    width /= resolution;
                    height /= resolution;

                    var frame = new PIXI.Rectangle(x, y, rotate ? height : width, rotate ? width : height);

                    if (reader.readTuple(tuple) == 4) { // split is optional
                        region.splits = [parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3])];

                        if (reader.readTuple(tuple) == 4) { // pad is optional, but only present with splits
                            region.pads = [parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3])];

                            reader.readTuple(tuple);
                        }
                    }

                    var originalWidth = parseInt(tuple[0]) / resolution;
                    var originalHeight = parseInt(tuple[1]) / resolution;
                    reader.readTuple(tuple);
                    var offsetX = parseInt(tuple[0]) / resolution;
                    var offsetY = parseInt(tuple[1]) / resolution;

                    var orig = new PIXI.Rectangle(0, 0, originalWidth, originalHeight);
                    var trim = new PIXI.Rectangle(offsetX, originalHeight - height - offsetY, width, height);

                    //TODO: pixiv3 uses different frame/crop/trim

                    if (PIXI.VERSION[0] == '4') {
                        // pixi v4.0.0
                        region.texture = new PIXI.Texture(region.page.rendererObject, frame, orig, trim, rotate);
                    } else {
                        // pixi v3.0.11
                        var frame2 = new PIXI.Rectangle(x, y, width, height);
                        var crop = frame2.clone();
                        trim.width = originalWidth;
                        trim.height = originalHeight;
                        region.texture = new PIXI.Texture(region.page.rendererObject, frame2, crop, trim, rotate);
                    }

                    region.index = parseInt(reader.readValue());
                    region.texture._updateUvs();

                    self.regions.push(region);
                }
            }
        }
    },
    findRegion: function (name)
    {
        var regions = this.regions;
        for (var i = 0, n = regions.length; i < n; i++)
            if (regions[i].name == name) return regions[i];
        return null;
    },
    dispose: function ()
    {
        var pages = this.pages;
        for (var i = 0, n = pages.length; i < n; i++)
            pages[i].rendererObject.destroy(true);
    },
    updateUVs: function (page)
    {
        var regions = this.regions;
        for (var i = 0, n = regions.length; i < n; i++)
        {
            var region = regions[i];
            if (region.page != page) continue;
            region.texture._updateUvs();
        }
    }
};

spine.Atlas.Format = {
    alpha: 0,
    intensity: 1,
    luminanceAlpha: 2,
    rgb565: 3,
    rgba4444: 4,
    rgb888: 5,
    rgba8888: 6
};

spine.Atlas.TextureFilter = {
    nearest: 0,
    linear: 1,
    mipMap: 2,
    mipMapNearestNearest: 3,
    mipMapLinearNearest: 4,
    mipMapNearestLinear: 5,
    mipMapLinearLinear: 6
};

spine.Atlas.TextureWrap = {
    mirroredRepeat: 0,
    clampToEdge: 1,
    repeat: 2
};
module.exports = spine.Atlas;

},{"../SpineUtil":44,"../loaders/syncImageLoaderAdapter.js":50,"./AtlasPage":7,"./AtlasReader":8,"./AtlasRegion":9}],6:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.RegionAttachment = require('./RegionAttachment');
spine.MeshAttachment = require('./MeshAttachment');
spine.WeightedMeshAttachment = require('./WeightedMeshAttachment');
spine.BoundingBoxAttachment = require('./BoundingBoxAttachment');
spine.AtlasAttachmentParser = function (atlas)
{
    this.atlas = atlas;
};
spine.AtlasAttachmentParser.prototype = {
    newRegionAttachment: function (skin, name, path)
    {
        var region = this.atlas.findRegion(path);
        if (!region) throw "Region not found in atlas: " + path + " (region attachment: " + name + ")";
        var attachment = new spine.RegionAttachment(name);
        attachment.rendererObject = region;
        attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
        attachment.regionOffsetX = region.offsetX;
        attachment.regionOffsetY = region.spineOffsetY;
        attachment.regionWidth = region.width;
        attachment.regionHeight = region.height;
        attachment.regionOriginalWidth = region.originalWidth;
        attachment.regionOriginalHeight = region.originalHeight;
        return attachment;
    },
    newMeshAttachment: function (skin, name, path)
    {
        var region = this.atlas.findRegion(path);
        if (!region) throw "Region not found in atlas: " + path + " (mesh attachment: " + name + ")";
        var attachment = new spine.MeshAttachment(name);
        attachment.rendererObject = region;
        // region.texture.on('update', spine.MeshAttachment.prototype.updateUVs.bind(attachment));
        return attachment;
    },
    newWeightedMeshAttachment: function (skin, name, path)
    {
        var region = this.atlas.findRegion(path);
        if (!region) throw "Region not found in atlas: " + path + " (skinned mesh attachment: " + name + ")";
        var attachment = new spine.WeightedMeshAttachment(name);
        attachment.rendererObject = region;
        // region.texture.on('update', spine.WeightedMeshAttachment.prototype.updateUVs.bind(attachment));
        return attachment;
    },
    newBoundingBoxAttachment: function (skin, name)
    {
        return new spine.BoundingBoxAttachment(name);
    }
};
module.exports = spine.AtlasAttachmentParser;


},{"../SpineUtil":44,"./BoundingBoxAttachment":14,"./MeshAttachment":25,"./RegionAttachment":26,"./WeightedMeshAttachment":42}],7:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AtlasPage = function ()
{};
spine.AtlasPage.prototype = {
    name: null,
    format: null,
    minFilter: null,
    magFilter: null,
    uWrap: null,
    vWrap: null,
    rendererObject: null,
    width: 0,
    height: 0
};
module.exports = spine.AtlasPage;


},{"../SpineUtil":44}],8:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AtlasReader = function (text)
{
    this.lines = text.split(/\r\n|\r|\n/);
};
spine.AtlasReader.prototype = {
    index: 0,
    trim: function (value)
    {
        return value.replace(/^\s+|\s+$/g, "");
    },
    readLine: function ()
    {
        if (this.index >= this.lines.length) return null;
        return this.lines[this.index++];
    },
    readValue: function ()
    {
        var line = this.readLine();
        var colon = line.indexOf(":");
        if (colon == -1) throw "Invalid line: " + line;
        return this.trim(line.substring(colon + 1));
    },
    /** Returns the number of tuple values read (1, 2 or 4). */
    readTuple: function (tuple)
    {
        var line = this.readLine();
        var colon = line.indexOf(":");
        if (colon == -1) throw "Invalid line: " + line;
        var i = 0, lastMatch = colon + 1;
        for (; i < 3; i++)
        {
            var comma = line.indexOf(",", lastMatch);
            if (comma == -1) break;
            tuple[i] = this.trim(line.substr(lastMatch, comma - lastMatch));
            lastMatch = comma + 1;
        }
        tuple[i] = this.trim(line.substring(lastMatch));
        return i + 1;
    }
};
module.exports = spine.AtlasReader;


},{"../SpineUtil":44}],9:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AtlasRegion = function ()
{};
spine.AtlasRegion.prototype = {
    name: null,
    /**
     * @member {PIXI.Texture}
     */
    texture: null,

    /**
     * @member {PIXI.spine.Spine.AtlasPage}
     */
    page: null,
    index: 0,
    splits: null,
    pads: null
};

Object.defineProperties(spine.AtlasRegion.prototype, {
    x: {
        get: function() {
            return this.texture.frame.x;
        }
    },
    y: {
        get: function() {
            return this.texture.frame.y;
        }
    },
    width: {
        get: function() {
            var tex = this.texture;
            if (PIXI.VERSION[0] == '3') {
                return tex.crop.width;
            }
            if (tex.trim) {
                return tex.trim.width;
            }
            return tex.orig.width;
        }
    },
    height: {
        get: function() {
            var tex = this.texture;
            if (PIXI.VERSION[0] == '3') {
                return tex.crop.height;
            }
            if (tex.trim) {
                return tex.trim.height;
            }
            return tex.orig.height;
        }
    },
    u: {
        get: function() {
            return this.texture._uvs.x0;
        }
    },
    v: {
        get: function() {
            return this.texture._uvs.y0;
        }
    },
    u2: {
        get: function() {
            return this.texture._uvs.x2;
        }
    },
    v2: {
        get: function() {
            return this.texture._uvs.y2;
        }
    },
    rotate: {
        get: function() {
            return !!this.texture.rotate;
        }
    },
    offsetX: {
        get: function() {
            var tex = this.texture;
            return tex.trim ? tex.trim.x : 0;
        }
    },
    offsetY: {
        get: function() {
            console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on.");
            return this.spineOffsetY;
        }
    },
    pixiOffsetY: {
        get: function() {
            var tex = this.texture;
            return tex.trim ? tex.trim.y : 0;
        }
    },
    spineOffsetY: {
        get: function() {
            var tex = this.texture;
            return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
        }
    },  
    originalWidth: {
        get: function() {
            var tex = this.texture;
            if (PIXI.VERSION[0] == '3') {
                if (tex.trim) {
                    return tex.trim.width;
                }
                return tex.crop.width;
            }
            return tex.orig.width;
        }
    },
    originalHeight: {
        get: function() {
            var tex = this.texture;
            if (PIXI.VERSION[0] == '3') {
                if (tex.trim) {
                    return tex.trim.height;
                }
                return tex.crop.height;
            }
            return tex.orig.height;
        }
    }
});

module.exports = spine.AtlasRegion;


},{"../SpineUtil":44}],10:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Curves = require('./Curves');
spine.Animation = require('./Animation');
spine.AttachmentTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, ...
    this.frames.length = frameCount;
    this.attachmentNames = [];
    this.attachmentNames.length = frameCount;
};
spine.AttachmentTimeline.prototype = {
    slotIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length;
    },
    setFrame: function (frameIndex, time, attachmentName)
    {
        this.frames[frameIndex] = time;
        this.attachmentNames[frameIndex] = attachmentName;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0])
        {
            if (lastTime > time) this.apply(skeleton, lastTime, Number.MAX_VALUE, null, 0);
            return;
        } else if (lastTime > time) //
            lastTime = -1;

        var frameIndex = time >= frames[frames.length - 1] ? frames.length - 1 : spine.Animation.binarySearch1(frames, time) - 1;
        if (frames[frameIndex] < lastTime) return;

        var attachmentName = this.attachmentNames[frameIndex];
        skeleton.slots[this.slotIndex].setAttachment(
            !attachmentName ? null : skeleton.getAttachmentBySlotIndex(this.slotIndex, attachmentName));
    }
};
module.exports = spine.AttachmentTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],11:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AttachmentType = {
    region: 0,
    boundingbox: 1,
    mesh: 2,
    weightedmesh : 3,
    skinnedmesh: 3,
    linkedmesh: 4,
    weightedlinkedmesh: 5
};
module.exports = spine.AttachmentType;


},{"../SpineUtil":44}],12:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Bone = function (boneData, skeleton, parent)
{
    this.data = boneData;
    this.skeleton = skeleton;
    this.parent = parent;
    this.matrix = new PIXI.Matrix();
    this.setToSetupPose();
};
spine.Bone.yDown = false;
spine.Bone.prototype = {
    x: 0, y: 0,
    rotation: 0, rotationIK: 0,
    scaleX: 1, scaleY: 1,
    shearX: 0, shearY: 0,
    flipX: false, flipY: false,

    worldSignX: 1, worldSignY: 1,
    update: function() {
        this.rotationIK = this.rotation;
        this.updateWorldTransform();
    },
    updateWorldTransform: function() {
        var rotation = this.rotationIK;
        var scaleX = this.scaleX;
        var scaleY = this.scaleY;
        var x = this.x;
        var y = this.y;
        var rotationX = rotation + this.shearX;
        var rotationY = rotation + 90 + this.shearY;

        var la = Math.cos(rotationX * spine.degRad) * scaleX, lb = Math.cos(rotationY * spine.degRad) * scaleY,
            lc = Math.sin(rotationX * spine.degRad) * scaleX, ld = Math.sin(rotationY * spine.degRad) * scaleY;
        var parent = this.parent;
        var m = this.matrix;
        var skeleton = this.skeleton;
        if (!parent) { // Root bone.
            if (skeleton.flipX) {
                x = -x;
                la = -la;
                lb = -lb;
            }
            if (skeleton.flipY !== spine.Bone.yDown) {
                y = -y;
                lc = -lc;
                ld = -ld;
            }
            m.a = la;
            m.c = lb;
            m.b = lc;
            m.d = ld;
            m.tx = x;
            m.ty = y;
            this.worldSignX = spine.signum(scaleX);
            this.worldSignY = spine.signum(scaleY);
            return;
        }


        var pa = parent.matrix.a, pb = parent.matrix.c, pc = parent.matrix.b, pd = parent.matrix.d;
        m.tx = pa * x + pb * y + parent.matrix.tx;
        m.ty = pc * x + pd * y + parent.matrix.ty;
        this.worldSignX = parent.worldSignX * spine.signum(scaleX);
        this.worldSignY = parent.worldSignY * spine.signum(scaleY);
        var data = this.data;

        if (data.inheritRotation && data.inheritScale) {
            m.a = pa * la + pb * lc;
            m.c = pa * lb + pb * ld;
            m.b = pc * la + pd * lc;
            m.d = pc * lb + pd * ld;
        } else {
            if (data.inheritRotation) { // No scale inheritance.
                pa = 1;
                pb = 0;
                pc = 0;
                pd = 1;
                do {
                    cos = Math.cos(parent.rotationIK * spine.degRad);
                    sin = Math.sin(parent.rotationIK * spine.degRad);
                    var temp = pa * cos + pb * sin;
                    pb = pa * -sin + pb * cos;
                    pa = temp;
                    temp = pc * cos + pd * sin;
                    pd = pc * -sin + pd * cos;
                    pc = temp;

                    if (!parent.data.inheritRotation) break;
                    parent = parent.parent;
                } while (parent != null);
                m.a = pa * la + pb * lc;
                m.c = pa * lb + pb * ld;
                m.b = pc * la + pd * lc;
                m.d = pc * lb + pd * ld;
            } else if (data.inheritScale) { // No rotation inheritance.
                pa = 1;
                pb = 0;
                pc = 0;
                pd = 1;
                do {
                    var r = parent.rotationIK;
                    cos = Math.cos(r * spine.degRad);
                    sin = Math.sin(r * spine.degRad);
                    var psx = parent.scaleX, psy = parent.scaleY;
                    var za = cos * psx, zb = -sin * psy, zc = sin * psx, zd = cos * psy;
                    temp = pa * za + pb * zc;
                    pb = pa * zb + pb * zd;
                    pa = temp;
                    temp = pc * za + pd * zc;
                    pd = pc * zb + pd * zd;
                    pc = temp;

                    if (psx < 0) {
                        r = -r;
                    } else {
                        sin = -sin;
                    }
                    temp = pa * cos + pb * sin;
                    pb = pa * -sin + pb * cos;
                    pa = temp;
                    temp = pc * cos + pd * sin;
                    pd = pc * -sin + pd * cos;
                    pc = temp;

                    if (!parent.data.inheritScale) break;
                    parent = parent.parent;
                } while (parent != null);
                m.a = pa * la + pb * lc;
                m.c = pa * lb + pb * ld;
                m.b = pc * la + pd * lc;
                m.d = pc * lb + pd * ld;
            } else {
                m.a = la;
                m.c = lb;
                m.b = lc;
                m.d = ld;
            }
            if (skeleton.flipX) {
                m.a = -m.a;
                m.c = -m.c;
            }
            if (skeleton.flipY !== spine.Bone.yDown) {
                m.b = -m.b;
                m.d = -m.d;
            }
        }
    },

    setToSetupPose: function ()
    {
        var data = this.data;
        this.x = data.x;
        this.y = data.y;
        this.rotation = data.rotation;
        this.rotationIK = this.rotation;
        this.scaleX = data.scaleX;
        this.scaleY = data.scaleY;
        this.shearX = data.shearX;
        this.shearY = data.shearY;
    },
    worldToLocal: function (world)
    {
        var m = this.matrix;
        var dx = world[0] - m.tx, dy = m.ty;
        var invDet = 1 / (m.a * m.d - m.b * m.c);
        //Yep, its a bug in original spine. I hope they'll fix it: https://github.com/EsotericSoftware/spine-runtimes/issues/544
        world[0] = dx * m.a * invDet - dy * m.c * invDet;
        world[1] = dy * m.d * invDet - dx * m.b * invDet;
    },
    localToWorld: function (local)
    {
        var localX = local[0], localY = local[1];
        var m = this.matrix;
        local[0] = localX * m.a + localY * m.c + m.tx;
        local[1] = localX * m.b + localY * m.d + m.ty;
    },
    getWorldRotationX: function() {
        return Math.atan2(this.matrix.b, this.matrix.a) * spine.radDeg;

    },
    getWorldRotationY: function() {
        return Math.atan2(this.matrix.d, this.matrix.c) * spine.radDeg;
    },
    getWorldScaleX: function() {
        var a = this.matrix.a;
        var b = this.matrix.b;
        return Math.sqrt(a*a+b*b);
    },
    getWorldScaleY: function() {
        var c = this.matrix.c;
        var d = this.matrix.d;
        return Math.sqrt(c * c + d * d);
    }
};

Object.defineProperties(spine.Bone.prototype, {
    worldX: {
        get: function() {
            return this.matrix.tx;
        }
    },
    worldY:  {
        get: function() {
            return this.matrix.ty;
        }
    }
});

module.exports = spine.Bone;

},{"../SpineUtil":44}],13:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.BoneData = function (name, parent)
{
    this.name = name;
    this.parent = parent;
};
spine.BoneData.prototype = {
    length: 0,
    x: 0, y: 0,
    rotation: 0,
    scaleX: 1, scaleY: 1,
    shearX: 0, shearY: 0,
    inheritScale: true,
    inheritRotation: true
};
module.exports = spine.BoneData;


},{"../SpineUtil":44}],14:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AttachmentType = require('./AttachmentType');
spine.BoundingBoxAttachment = function (name)
{
    this.name = name;
    this.vertices = [];
};
spine.BoundingBoxAttachment.prototype = {
    type: spine.AttachmentType.boundingbox,
    computeWorldVertices: function (x, y, bone, worldVertices)
    {
        x += bone.worldX;
        y += bone.worldY;
        var m00 = bone.matrix.a, m01 = bone.matrix.c, m10 = bone.matrix.b, m11 = bone.matrix.d;
        var vertices = this.vertices;
        for (var i = 0, n = vertices.length; i < n; i += 2)
        {
            var px = vertices[i];
            var py = vertices[i + 1];
            worldVertices[i] = px * m00 + py * m01 + x;
            worldVertices[i + 1] = px * m10 + py * m11 + y;
        }
    }
};
module.exports = spine.BoundingBoxAttachment;


},{"../SpineUtil":44,"./AttachmentType":11}],15:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.ColorTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, r, g, b, a, ...
    this.frames.length = frameCount * 5;
};
spine.ColorTimeline.prototype = {
    slotIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 5;
    },
    setFrame: function (frameIndex, time, r, g, b, a)
    {
        frameIndex *= 5;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = r;
        this.frames[frameIndex + 2] = g;
        this.frames[frameIndex + 3] = b;
        this.frames[frameIndex + 4] = a;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var r, g, b, a;
        if (time >= frames[frames.length - 5])
        {
            // Time is after last frame.
            var i = frames.length - 1;
            r = frames[i - 3];
            g = frames[i - 2];
            b = frames[i - 1];
            a = frames[i];
        } else {
            // Interpolate between the previous frame and the current frame.
            var frameIndex = spine.Animation.binarySearch(frames, time, 5);
            var prevFrameR = frames[frameIndex - 4];
            var prevFrameG = frames[frameIndex - 3];
            var prevFrameB = frames[frameIndex - 2];
            var prevFrameA = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex - 5/*PREV_FRAME_TIME*/] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent);

            r = prevFrameR + (frames[frameIndex + 1/*FRAME_R*/] - prevFrameR) * percent;
            g = prevFrameG + (frames[frameIndex + 2/*FRAME_G*/] - prevFrameG) * percent;
            b = prevFrameB + (frames[frameIndex + 3/*FRAME_B*/] - prevFrameB) * percent;
            a = prevFrameA + (frames[frameIndex + 4/*FRAME_A*/] - prevFrameA) * percent;
        }
        var slot = skeleton.slots[this.slotIndex];
        if (alpha < 1)
        {
            slot.r += (r - slot.r) * alpha;
            slot.g += (g - slot.g) * alpha;
            slot.b += (b - slot.b) * alpha;
            slot.a += (a - slot.a) * alpha;
        } else {
            slot.r = r;
            slot.g = g;
            slot.b = b;
            slot.a = a;
        }
    }
};
module.exports = spine.ColorTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],16:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Curves = function (frameCount)
{
    this.curves = []; // type, x, y, ...
    //this.curves.length = (frameCount - 1) * 19/*BEZIER_SIZE*/;
};
spine.Curves.prototype = {
    setLinear: function (frameIndex)
    {
        this.curves[frameIndex * 19/*BEZIER_SIZE*/] = 0/*LINEAR*/;
    },
    setStepped: function (frameIndex)
    {
        this.curves[frameIndex * 19/*BEZIER_SIZE*/] = 1/*STEPPED*/;
    },
    /** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
     * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
     * the difference between the keyframe's values. */
    setCurve: function (frameIndex, cx1, cy1, cx2, cy2)
    {
        var subdiv1 = 1 / 10/*BEZIER_SEGMENTS*/, subdiv2 = subdiv1 * subdiv1, subdiv3 = subdiv2 * subdiv1;
        var pre1 = 3 * subdiv1, pre2 = 3 * subdiv2, pre4 = 6 * subdiv2, pre5 = 6 * subdiv3;
        var tmp1x = -cx1 * 2 + cx2, tmp1y = -cy1 * 2 + cy2, tmp2x = (cx1 - cx2) * 3 + 1, tmp2y = (cy1 - cy2) * 3 + 1;
        var dfx = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv3, dfy = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv3;
        var ddfx = tmp1x * pre4 + tmp2x * pre5, ddfy = tmp1y * pre4 + tmp2y * pre5;
        var dddfx = tmp2x * pre5, dddfy = tmp2y * pre5;

        var i = frameIndex * 19/*BEZIER_SIZE*/;
        var curves = this.curves;
        curves[i++] = 2/*BEZIER*/;

        var x = dfx, y = dfy;
        for (var n = i + 19/*BEZIER_SIZE*/ - 1; i < n; i += 2)
        {
            curves[i] = x;
            curves[i + 1] = y;
            dfx += ddfx;
            dfy += ddfy;
            ddfx += dddfx;
            ddfy += dddfy;
            x += dfx;
            y += dfy;
        }
    },
    getCurvePercent: function (frameIndex, percent)
    {
        percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent);
        var curves = this.curves;
        var i = frameIndex * 19/*BEZIER_SIZE*/;
        var type = curves[i];
        if (type === 0/*LINEAR*/) return percent;
        if (type == 1/*STEPPED*/) return 0;
        i++;
        var x = 0;
        for (var start = i, n = i + 19/*BEZIER_SIZE*/ - 1; i < n; i += 2)
        {
            x = curves[i];
            if (x >= percent)
            {
                var prevX, prevY;
                if (i == start)
                {
                    prevX = 0;
                    prevY = 0;
                } else {
                    prevX = curves[i - 2];
                    prevY = curves[i - 1];
                }
                return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
            }
        }
        var y = curves[i - 1];
        return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
    }
};
module.exports = spine.Curves;


},{"../SpineUtil":44}],17:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.DrawOrderTimeline = function (frameCount)
{
    this.frames = []; // time, ...
    this.frames.length = frameCount;
    this.drawOrders = [];
    this.drawOrders.length = frameCount;
};
spine.DrawOrderTimeline.prototype = {
    getFrameCount: function ()
    {
        return this.frames.length;
    },
    setFrame: function (frameIndex, time, drawOrder)
    {
        this.frames[frameIndex] = time;
        this.drawOrders[frameIndex] = drawOrder;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var frameIndex;
        if (time >= frames[frames.length - 1]) // Time is after last frame.
            frameIndex = frames.length - 1;
        else
            frameIndex = spine.Animation.binarySearch1(frames, time) - 1;

        var drawOrder = skeleton.drawOrder;
        var slots = skeleton.slots;
        var drawOrderToSetupIndex = this.drawOrders[frameIndex];
        if (drawOrderToSetupIndex)
        {
            for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++)
            {
                drawOrder[i] = drawOrderToSetupIndex[i];
            }
        }

    }
};
module.exports = spine.DrawOrderTimeline;


},{"../SpineUtil":44,"./Animation":2}],18:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Event = function (data)
{
    this.data = data;
};
spine.Event.prototype = {
    intValue: 0,
    floatValue: 0,
    stringValue: null
};
module.exports = spine.Event;


},{"../SpineUtil":44}],19:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.EventData = function (name)
{
    this.name = name;
};
spine.EventData.prototype = {
    intValue: 0,
    floatValue: 0,
    stringValue: null
};
module.exports = spine.EventData;


},{"../SpineUtil":44}],20:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.EventTimeline = function (frameCount)
{
    this.frames = []; // time, ...
    this.frames.length = frameCount;
    this.events = [];
    this.events.length = frameCount;
};
spine.EventTimeline.prototype = {
    getFrameCount: function ()
    {
        return this.frames.length;
    },
    setFrame: function (frameIndex, time, event)
    {
        this.frames[frameIndex] = time;
        this.events[frameIndex] = event;
    },
    /** Fires events for frames > lastTime and <= time. */
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        if (!firedEvents) return;

        var frames = this.frames;
        var frameCount = frames.length;

        if (lastTime > time)
        { // Fire events after last time for looped animations.
            this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha);
            lastTime = -1;
        } else if (lastTime >= frames[frameCount - 1]) // Last time is after last frame.
            return;
        if (time < frames[0]) return; // Time is before first frame.

        var frameIndex;
        if (lastTime < frames[0])
            frameIndex = 0;
        else
        {
            frameIndex = spine.Animation.binarySearch1(frames, lastTime);
            var frame = frames[frameIndex];
            while (frameIndex > 0)
            { // Fire multiple events with the same frame.
                if (frames[frameIndex - 1] != frame) break;
                frameIndex--;
            }
        }
        var events = this.events;
        for (; frameIndex < frameCount && time >= frames[frameIndex]; frameIndex++)
            firedEvents.push(events[frameIndex]);
    }
};
module.exports = spine.EventTimeline;


},{"../SpineUtil":44,"./Animation":2}],21:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.FfdTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = [];
    this.frames.length = frameCount;
    this.frameVertices = [];
    this.frameVertices.length = frameCount;
};
spine.FfdTimeline.prototype = {
    slotIndex: 0,
    attachment: 0,
    getFrameCount: function ()
    {
        return this.frames.length;
    },
    setFrame: function (frameIndex, time, vertices)
    {
        this.frames[frameIndex] = time;
        this.frameVertices[frameIndex] = vertices;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var slot = skeleton.slots[this.slotIndex];
        var slotAttachment = slot.attachment;
        if (slotAttachment && (!slotAttachment.applyFFD || !slotAttachment.applyFFD(this.attachment))) return;

        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var frameVertices = this.frameVertices;
        var vertexCount = frameVertices[0].length;

        var vertices = slot.attachmentVertices;
        if (vertices.length != vertexCount) {
            vertices = slot.attachmentVertices = [];
            for (var k = 0; k < vertexCount; k++) vertices.push(0);
            // Don't mix from uninitialized slot vertices.
            alpha = 1;
        }

        if (time >= frames[frames.length - 1])
        { // Time is after last frame.
            var lastVertices = frameVertices[frames.length - 1];
            if (alpha < 1)
            {
                for (var i = 0; i < vertexCount; i++)
                    vertices[i] += (lastVertices[i] - vertices[i]) * alpha;
            } else {
                for (var i = 0; i < vertexCount; i++)
                    vertices[i] = lastVertices[i];
            }
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frameIndex = spine.Animation.binarySearch1(frames, time);
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex - 1] - frameTime);
        percent = this.curves.getCurvePercent(frameIndex - 1, percent < 0 ? 0 : (percent > 1 ? 1 : percent));

        var prevVertices = frameVertices[frameIndex - 1];
        var nextVertices = frameVertices[frameIndex];

        if (alpha < 1)
        {
            for (var i = 0; i < vertexCount; i++)
            {
                var prev = prevVertices[i];
                vertices[i] += (prev + (nextVertices[i] - prev) * percent - vertices[i]) * alpha;
            }
        } else {
            for (var i = 0; i < vertexCount; i++)
            {
                var prev = prevVertices[i];
                vertices[i] = prev + (nextVertices[i] - prev) * percent;
            }
        }
    }
};
module.exports = spine.FfdTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],22:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.IkConstraint = function (data, skeleton)
{
    this.data = data;
    this.mix = data.mix;
    this.bendDirection = data.bendDirection;

    this.bones = [];
    for (var i = 0, n = data.bones.length; i < n; i++)
        this.bones.push(skeleton.findBone(data.bones[i].name));
    this.target = skeleton.findBone(data.target.name);
};
spine.IkConstraint.prototype = {
    update: function() {
        this.apply();
    },
    apply: function ()
    {
        var target = this.target;
        var bones = this.bones;
        switch (bones.length)
        {
        case 1:
            spine.IkConstraint.apply1(bones[0], target.worldX, target.worldY, this.mix);
            break;
        case 2:
            spine.IkConstraint.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.mix);
            break;
        }
    }
};
/** Adjusts the bone rotation so the tip is as close to the target position as possible. The target is specified in the world
 * coordinate system. */
spine.IkConstraint.apply1 = function (bone, targetX, targetY, alpha)
{
    var parentRotation = bone.parent ? bone.parent.getWorldRotationX(): 0;
    var rotation = bone.rotation;
    var rotationIK = Math.atan2(targetY - bone.worldY, targetX - bone.worldX) * spine.radDeg - parentRotation;
    if ((bone.worldSignX != bone.worldSignY) != (bone.skeleton.flipX != (bone.skeleton.flipY != spine.Bone.yDown))) rotationIK = 360 - rotationIK;
    if (rotationIK > 180)
        rotationIK -= 360;
    else if (rotationIK < -180) rotationIK += 360;
    bone.rotationIK = rotation + (rotationIK - rotation) * alpha;
    bone.updateWorldTransform();
};
/** Adjusts the parent and child bone rotations so the tip of the child is as close to the target position as possible. The
 * target is specified in the world coordinate system.
 * @param child Any descendant bone of the parent. */
spine.IkConstraint.apply2 = function (parent, child, targetX, targetY, bendDir, alpha)
{
    if (alpha == 0) return;
    var px = parent.x, py = parent.y, psx = parent.scaleX, psy = parent.scaleY, csx = child.scaleX, cy = child.y;
    var offset1, offset2, sign2;
    if (psx < 0) {
        psx = -psx;
        offset1 = 180;
        sign2 = -1;
    } else {
        offset1 = 0;
        sign2 = 1;
    }
    if (psy < 0) {
        psy = -psy;
        sign2 = -sign2;
    }
    if (csx < 0) {
        csx = -csx;
        offset2 = 180;
    } else
        offset2 = 0;
    var pp = parent.parent;
    var ppm = pp.matrix;
    var tx, ty, dx, dy;
    if (pp == null) {
        tx = targetX - px;
        ty = targetY - py;
        dx = child.worldX - px;
        dy = child.worldY - py;
    } else {
        var a = ppm.a, b = ppm.c, c = ppm.b, d = ppm.d, invDet = 1 / (a * d - b * c);
        var wx = ppm.tx, wy = ppm.ty, x = targetX - wx, y = targetY - wy;
        tx = (x * d - y * b) * invDet - px;
        ty = (y * a - x * c) * invDet - py;
        x = child.worldX - wx;
        y = child.worldY - wy;
        dx = (x * d - y * b) * invDet - px;
        dy = (y * a - x * c) * invDet - py;
    }
    var l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.data.length * csx, a1, a2;
    outer:
        if (Math.abs(psx - psy) <= 0.0001) {
            l2 *= psx;
            var cos = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
            if (cos < -1)
                cos = -1;
            else if (cos > 1) cos = 1;
            a2 = Math.acos(cos) * bendDir;
            var a = l1 + l2 * cos, o = l2 * Math.sin(a2);
            a1 = Math.atan2(ty * a - tx * o, tx * a + ty * o);
        } else {
            cy = 0;
            var a = psx * l2, b = psy * l2, ta = Math.atan2(ty, tx);
            var aa = a * a, bb = b * b, ll = l1 * l1, dd = tx * tx + ty * ty;
            var c0 = bb * ll + aa * dd - aa * bb, c1 = -2 * bb * l1, c2 = bb - aa;
            var d = c1 * c1 - 4 * c2 * c0;
            if (d >= 0) {
                var q = Math.sqrt(d);
                if (c1 < 0) q = -q;
                q = -(c1 + q) / 2;
                var r0 = q / c2, r1 = c0 / q;
                var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                if (r * r <= dd) {
                    var y = Math.sqrt(dd - r * r) * bendDir;
                    a1 = ta - Math.atan2(y, r);
                    a2 = Math.atan2(y / psy, (r - l1) / psx);
                    break outer;
                }
            }
            var minAngle = 0, minDist = Infinity, minX = 0, minY = 0;
            var maxAngle = 0, maxDist = 0, maxX = 0, maxY = 0;
            var x = l1 + a, dist = x * x;
            if (dist > maxDist) {
                maxAngle = 0;
                maxDist = dist;
                maxX = x;
            }
            x = l1 - a;
            dist = x * x;
            if (dist < minDist) {
                minAngle = Math.PI;
                minDist = dist;
                minX = x;
            }
            var angle = Math.acos(-a * l1 / (aa - bb));
            x = a * Math.cos(angle) + l1;
            var y = b * Math.sin(angle);
            dist = x * x + y * y;
            if (dist < minDist) {
                minAngle = angle;
                minDist = dist;
                minX = x;
                minY = y;
            }
            if (dist > maxDist) {
                maxAngle = angle;
                maxDist = dist;
                maxX = x;
                maxY = y;
            }
            if (dd <= (minDist + maxDist) / 2) {
                a1 = ta - Math.atan2(minY * bendDir, minX);
                a2 = minAngle * bendDir;
            } else {
                a1 = ta - Math.atan2(maxY * bendDir, maxX);
                a2 = maxAngle * bendDir;
            }
        }
    var offset = Math.atan2(cy, child.x) * sign2;
    a1 = (a1 - offset) * spine.radDeg + offset1;
    a2 = (a2 + offset) * spine.radDeg * sign2 + offset2;
    if (a1 > 180)
        a1 -= 360;
    else if (a1 < -180) a1 += 360;
    if (a2 > 180)
        a2 -= 360;
    else if (a2 < -180) a2 += 360;
    var rotation = parent.rotation;
    parent.rotationIK = rotation + (a1 - rotation) * alpha;
    parent.updateWorldTransform();
    rotation = child.rotation;
    child.rotationIK = rotation + (a2 - rotation) * alpha;
    child.updateWorldTransform();
};
module.exports = spine.IkConstraint;


},{"../SpineUtil":44}],23:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.IkConstraintData = function (name)
{
    this.name = name;
    this.bones = [];
};
spine.IkConstraintData.prototype = {
    target: null,
    bendDirection: 1,
    mix: 1
};
module.exports = spine.IkConstraintData;


},{"../SpineUtil":44}],24:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.IkConstraintTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, mix, bendDirection, ...
    this.frames.length = frameCount * 3;
};
spine.IkConstraintTimeline.prototype = {
    ikConstraintIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 3;
    },
    setFrame: function (frameIndex, time, mix, bendDirection)
    {
        frameIndex *= 3;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = mix;
        this.frames[frameIndex + 2] = bendDirection;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var ikConstraint = skeleton.ikConstraints[this.ikConstraintIndex];

        if (time >= frames[frames.length - 3])
        { // Time is after last frame.
            ikConstraint.mix += (frames[frames.length - 2] - ikConstraint.mix) * alpha;
            ikConstraint.bendDirection = frames[frames.length - 1];
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frameIndex = spine.Animation.binarySearch(frames, time, 3);
        var prevFrameMix = frames[frameIndex + -2/*PREV_FRAME_MIX*/];
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*PREV_FRAME_TIME*/] - frameTime);
        percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

        var mix = prevFrameMix + (frames[frameIndex + 1/*FRAME_MIX*/] - prevFrameMix) * percent;
        ikConstraint.mix += (mix - ikConstraint.mix) * alpha;
        ikConstraint.bendDirection = frames[frameIndex + -1/*PREV_FRAME_BEND_DIRECTION*/];
    }
};
module.exports = spine.IkConstraintTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],25:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.AttachmentType = require('./AttachmentType');
spine.MeshAttachment = function (name)
{
    this.name = name;
};
spine.MeshAttachment.prototype = {
    type: spine.AttachmentType.mesh,
    parentMesh: null,
    inheritFFD: false,
    vertices: null,
    uvs: null,
    regionUVs: null,
    triangles: null,
    hullLength: 0,
    r: 1, g: 1, b: 1, a: 1,
    path: null,
    rendererObject: null,
    edges: null,
    width: 0, height: 0,
    updateUVs: function ()
    {
        var n = this.regionUVs.length;
        if (!this.uvs || this.uvs.length != n)
        {
            this.uvs = new spine.Float32Array(n);
        }
        var region = this.rendererObject;
        if (!region) return;
        var texture = region.texture;
        var r = texture._uvs;
        var w1 = region.width, h1 = region.height, w2 = region.originalWidth, h2 = region.originalHeight;
        var x = region.offsetX, y = region.pixiOffsetY;
        for (var i = 0; i < n; i += 2)
        {
            var u = this.regionUVs[i], v = this.regionUVs[i+1];
            u = (u * w2 - x) / w1;
            v = (v * h2 - y) / h1;
            this.uvs[i] = (r.x0 * (1 - u) + r.x1 * u) * (1-v) + (r.x3 * (1 - u) + r.x2 * u) * v;
            this.uvs[i+1] = (r.y0 * (1 - u) + r.y1 * u) * (1-v) + (r.y3 * (1 - u) + r.y2 * u) * v;
        }
    },
    computeWorldVertices: function (x, y, slot, worldVertices)
    {
        var bone = slot.bone;
        x += bone.worldX;
        y += bone.worldY;
        var m00 = bone.matrix.a, m01 = bone.matrix.c, m10 = bone.matrix.b, m11 = bone.matrix.d;
        var vertices = this.vertices;
        var verticesCount = vertices.length;
        if (slot.attachmentVertices.length == verticesCount) vertices = slot.attachmentVertices;
        for (var i = 0; i < verticesCount; i += 2)
        {
            var vx = vertices[i];
            var vy = vertices[i + 1];
            worldVertices[i] = vx * m00 + vy * m01 + x;
            worldVertices[i + 1] = vx * m10 + vy * m11 + y;
        }
    },
    applyFFD: function(sourceAttachment) {
        return this === sourceAttachment || (this.inheritFFD && parentMesh === sourceAttachment);
    },
    setParentMesh: function(parentMesh) {
        this.parentMesh = parentMesh;
        if (parentMesh != null) {
            this.vertices = parentMesh.vertices;
            this.regionUVs = parentMesh.regionUVs;
            this.triangles = parentMesh.triangles;
            this.hullLength = parentMesh.hullLength;
        }
    },
    hackRegion: function(newRegion) {
        if (!newRegion) {
            if (!this.oldRegion) return;
            newRegion = this.oldRegion;
        }
        if (!this.oldRegion) {
            this.oldRegion = this.rendererObject;
        }
        this.rendererObject = newRegion;
        this.updateUVs();
    }
};
module.exports = spine.MeshAttachment;


},{"../SpineUtil":44,"./AttachmentType":11}],26:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.AttachmentType = require('./AttachmentType');
spine.RegionAttachment = function (name)
{
    this.name = name;
    this.offset = [];
    this.offset.length = 8;
    this.uvs = [];
    this.uvs.length = 8;
};
spine.RegionAttachment.prototype = {
    type: spine.AttachmentType.region,
    x: 0, y: 0,
    rotation: 0,
    scaleX: 1, scaleY: 1,
    width: 0, height: 0,
    r: 1, g: 1, b: 1, a: 1,
    path: null,
    rendererObject: null,
    regionOffsetX: 0, regionOffsetY: 0,
    regionWidth: 0, regionHeight: 0,
    regionOriginalWidth: 0, regionOriginalHeight: 0,
    setUVs: function (u, v, u2, v2, rotate)
    {
        var uvs = this.uvs;
        if (rotate)
        {
            uvs[2/*X2*/] = u;
            uvs[3/*Y2*/] = v2;
            uvs[4/*X3*/] = u;
            uvs[5/*Y3*/] = v;
            uvs[6/*X4*/] = u2;
            uvs[7/*Y4*/] = v;
            uvs[0/*X1*/] = u2;
            uvs[1/*Y1*/] = v2;
        } else {
            uvs[0/*X1*/] = u;
            uvs[1/*Y1*/] = v2;
            uvs[2/*X2*/] = u;
            uvs[3/*Y2*/] = v;
            uvs[4/*X3*/] = u2;
            uvs[5/*Y3*/] = v;
            uvs[6/*X4*/] = u2;
            uvs[7/*Y4*/] = v2;
        }
    },
    updateOffset: function ()
    {
        var regionScaleX = this.width / this.regionOriginalWidth * this.scaleX;
        var regionScaleY = this.height / this.regionOriginalHeight * this.scaleY;
        var localX = -this.width / 2 * this.scaleX + this.regionOffsetX * regionScaleX;
        var localY = -this.height / 2 * this.scaleY + this.regionOffsetY * regionScaleY;
        var localX2 = localX + this.regionWidth * regionScaleX;
        var localY2 = localY + this.regionHeight * regionScaleY;
        var radians = this.rotation * spine.degRad;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var localXCos = localX * cos + this.x;
        var localXSin = localX * sin;
        var localYCos = localY * cos + this.y;
        var localYSin = localY * sin;
        var localX2Cos = localX2 * cos + this.x;
        var localX2Sin = localX2 * sin;
        var localY2Cos = localY2 * cos + this.y;
        var localY2Sin = localY2 * sin;
        var offset = this.offset;
        offset[0/*X1*/] = localXCos - localYSin;
        offset[1/*Y1*/] = localYCos + localXSin;
        offset[2/*X2*/] = localXCos - localY2Sin;
        offset[3/*Y2*/] = localY2Cos + localXSin;
        offset[4/*X3*/] = localX2Cos - localY2Sin;
        offset[5/*Y3*/] = localY2Cos + localX2Sin;
        offset[6/*X4*/] = localX2Cos - localYSin;
        offset[7/*Y4*/] = localYCos + localX2Sin;
    },
    computeVertices: function (x, y, bone, vertices)
    {
        x += bone.worldX;
        y += bone.worldY;
        var m00 = bone.matrix.a, m01 = bone.matrix.c, m10 = bone.matrix.b, m11 = bone.matrix.d;
        var offset = this.offset;
        vertices[0/*X1*/] = offset[0/*X1*/] * m00 + offset[1/*Y1*/] * m01 + x;
        vertices[1/*Y1*/] = offset[0/*X1*/] * m10 + offset[1/*Y1*/] * m11 + y;
        vertices[2/*X2*/] = offset[2/*X2*/] * m00 + offset[3/*Y2*/] * m01 + x;
        vertices[3/*Y2*/] = offset[2/*X2*/] * m10 + offset[3/*Y2*/] * m11 + y;
        vertices[4/*X3*/] = offset[4/*X3*/] * m00 + offset[5/*X3*/] * m01 + x;
        vertices[5/*X3*/] = offset[4/*X3*/] * m10 + offset[5/*X3*/] * m11 + y;
        vertices[6/*X4*/] = offset[6/*X4*/] * m00 + offset[7/*Y4*/] * m01 + x;
        vertices[7/*Y4*/] = offset[6/*X4*/] * m10 + offset[7/*Y4*/] * m11 + y;
    },
    hackRegion: function(newRegion) {
        if (!newRegion) {
            if (!this.oldRegion) return;
            newRegion = this.oldRegion;
        }
        if (!this.oldRegion) {
            this.oldRegion = this.rendererObject;
            this.oldRegion.size = { width: this.width, height: this.height };
        }
        this.rendererObject = newRegion;
        if (newRegion.size) {
            this.width = newRegion.size.width;
            this.height = newRegion.size.height;
        }
    }
};
module.exports = spine.RegionAttachment;


},{"../SpineUtil":44,"./AttachmentType":11}],27:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.RotateTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, angle, ...
    this.frames.length = frameCount * 2;
};
spine.RotateTimeline.prototype = {
    boneIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 2;
    },
    setFrame: function (frameIndex, time, angle)
    {
        frameIndex *= 2;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = angle;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var bone = skeleton.bones[this.boneIndex];

        if (time >= frames[frames.length - 2])
        { // Time is after last frame.
            var amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
            while (amount > 180)
                amount -= 360;
            while (amount < -180)
                amount += 360;
            bone.rotation += amount * alpha;
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frameIndex = spine.Animation.binarySearch(frames, time, 2);
        var prevFrameValue = frames[frameIndex - 1];
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex - 2/*PREV_FRAME_TIME*/] - frameTime);
        percent = this.curves.getCurvePercent(frameIndex / 2 - 1, percent);

        var amount = frames[frameIndex + 1/*FRAME_VALUE*/] - prevFrameValue;
        while (amount > 180)
            amount -= 360;
        while (amount < -180)
            amount += 360;
        amount = bone.data.rotation + (prevFrameValue + amount * percent) - bone.rotation;
        while (amount > 180)
            amount -= 360;
        while (amount < -180)
            amount += 360;
        bone.rotation += amount * alpha;
    }
};
module.exports = spine.RotateTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],28:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.ScaleTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, x, y, ...
    this.frames.length = frameCount * 3;
};
spine.ScaleTimeline.prototype = {
    boneIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 3;
    },
    setFrame: function (frameIndex, time, x, y)
    {
        frameIndex *= 3;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = x;
        this.frames[frameIndex + 2] = y;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var bone = skeleton.bones[this.boneIndex];

        if (time >= frames[frames.length - 3])
        { // Time is after last frame.
            bone.scaleX += (bone.data.scaleX * frames[frames.length - 2] - bone.scaleX) * alpha;
            bone.scaleY += (bone.data.scaleY * frames[frames.length - 1] - bone.scaleY) * alpha;
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frameIndex = spine.Animation.binarySearch(frames, time, 3);
        var prevFrameX = frames[frameIndex - 2];
        var prevFrameY = frames[frameIndex - 1];
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*PREV_FRAME_TIME*/] - frameTime);
        percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

        bone.scaleX += (bone.data.scaleX * (prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent) - bone.scaleX) * alpha;
        bone.scaleY += (bone.data.scaleY * (prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent) - bone.scaleY) * alpha;
    }
};
module.exports = spine.ScaleTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],29:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.ShearTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, x, y, ...
    this.frames.length = frameCount * 3;
};
spine.ShearTimeline.prototype = {
    boneIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 3;
    },
    setFrame: function (frameIndex, time, x, y)
    {
        frameIndex *= 3;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = x;
        this.frames[frameIndex + 2] = y;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var bone = skeleton.bones[this.boneIndex];

        if (time >= frames[frames.length - 3])
        { // Time is after last frame.
            bone.shearX += (bone.data.shearX + frames[frames.length - 2] - bone.shearX) * alpha;
            bone.shearY += (bone.data.shearY + frames[frames.length - 1] - bone.shearY) * alpha;
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frameIndex = spine.Animation.binarySearch(frames, time, 3);
        var prevFrameX = frames[frameIndex - 2];
        var prevFrameY = frames[frameIndex - 1];
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*PREV_FRAME_TIME*/] - frameTime);
        percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

        bone.shearX += (bone.data.shearX + (prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent) - bone.shearX) * alpha;
        bone.shearY += (bone.data.shearY + (prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent) - bone.shearY) * alpha;
    }
};
module.exports = spine.ShearTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],30:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Bone = require('./Bone');
spine.Slot = require('./Slot');
spine.IkConstraint = require('./IkConstraint');
spine.Skeleton = function (skeletonData)
{
    this.data = skeletonData;

    this.bones = [];
    for (var i = 0, n = skeletonData.bones.length; i < n; i++)
    {
        var boneData = skeletonData.bones[i];
        var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
        this.bones.push(new spine.Bone(boneData, this, parent));
    }

    this.slots = [];
    this.drawOrder = [];
    for (var i = 0, n = skeletonData.slots.length; i < n; i++)
    {
        var slotData = skeletonData.slots[i];
        var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
        var slot = new spine.Slot(slotData, bone);
        this.slots.push(slot);
        this.drawOrder.push(i);
    }

    this.ikConstraints = [];
    for (var i = 0, n = skeletonData.ikConstraints.length; i < n; i++)
        this.ikConstraints.push(new spine.IkConstraint(skeletonData.ikConstraints[i], this));

    this.transformConstraints = [];
    for (var i = 0, n = skeletonData.transformConstraints.length; i < n; i++)
        this.transformConstraints.push(new spine.TransformConstraint(skeletonData.transformConstraints[i], this));

    this.boneCache = [];
    this.updateCache();
};
spine.Skeleton.prototype = {
    x: 0, y: 0,
    skin: null,
    r: 1, g: 1, b: 1, a: 1,
    time: 0,
    flipX: false, flipY: false,
    /** Caches information about bones and IK constraints. Must be called if bones or IK constraints are added or removed. */
    updateCache: function ()
    {
        var ikConstraints = this.ikConstraints;
        var ikConstraintsCount = ikConstraints.length;
        var transformConstraints = this.transformConstraints;
        var transformConstraintsCount = transformConstraints.length;

        var boneCache = this.boneCache;
        boneCache.length = 0;
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
        {
            var bone = bones[i];
            boneCache.push(bone);
            for (var j=0; j < transformConstraintsCount; j++) {
                if (transformConstraints[j].bone == bone) {
                    boneCache.push(transformConstraints[j]);
                }
            }
            for (var j=0; j < ikConstraintsCount; j++) {
                if (ikConstraints[j].bones[ikConstraints[j].bones.length-1] == bone) {
                    boneCache.push(ikConstraints[j]);
                    break;
                }
            }
        }
    },
    /** Updates the world transform for each bone. */
    updateWorldTransform: function ()
    {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
        {
            var bone = bones[i];
            bone.rotationIK = bone.rotation;
        }
        var boneCache = this.boneCache;
        for (var i = 0, n = boneCache.length; i < n; i++) {
            boneCache[i].update();
        }
    },
    /** Sets the bones and slots to their setup pose values. */
    setToSetupPose: function ()
    {
        this.setBonesToSetupPose();
        this.setSlotsToSetupPose();
    },
    setBonesToSetupPose: function ()
    {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
            bones[i].setToSetupPose();

        var ikConstraints = this.ikConstraints;
        for (var i = 0, n = ikConstraints.length; i < n; i++)
        {
            var ikConstraint = ikConstraints[i];
            ikConstraint.bendDirection = ikConstraint.data.bendDirection;
            ikConstraint.mix = ikConstraint.data.mix;
        }

        var transformConstraints = this.transformConstraints;
        for (var i = 0, n = transformConstraints.length; i < n; i++)
        {
            var constraint = transformConstraints[i];
            var data = constraint.data;
            constraint.rotateMix = data.rotateMix;
            constraint.translateMix = data.translateMix;
            constraint.scaleMix = data.scaleMix;
            constraint.shearMix = data.shearMix;
        }
    },
    setSlotsToSetupPose: function ()
    {
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++)
        {
            slots[i].setToSetupPose(i);
        }

        this.resetDrawOrder();
    },
    /** @return May return null. */
    getRootBone: function ()
    {
        return this.bones.length ? this.bones[0] : null;
    },
    /** @return May be null. */
    findBone: function (boneName)
    {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
            if (bones[i].data.name == boneName) return bones[i];
        return null;
    },
    /** @return -1 if the bone was not found. */
    findBoneIndex: function (boneName)
    {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
            if (bones[i].data.name == boneName) return i;
        return -1;
    },
    /** @return May be null. */
    findSlot: function (slotName)
    {
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++)
            if (slots[i].data.name == slotName) return slots[i];
        return null;
    },
    /** @return -1 if the bone was not found. */
    findSlotIndex: function (slotName)
    {
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++)
            if (slots[i].data.name == slotName) return i;
        return -1;
    },
    setSkinByName: function (skinName)
    {
        var skin = this.data.findSkin(skinName);
        if (!skin) throw "Skin not found: " + skinName;
        this.setSkin(skin);
    },
    /** Sets the skin used to look up attachments before looking in the {@link SkeletonData#getDefaultSkin() default skin}.
     * Attachments from the new skin are attached if the corresponding attachment from the old skin was attached. If there was
     * no old skin, each slot's setup mode attachment is attached from the new skin.
     * @param newSkin May be null. */
    setSkin: function (newSkin)
    {
        if (newSkin)
        {
            if (this.skin)
                newSkin._attachAll(this, this.skin);
            else
            {
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                {
                    var slot = slots[i];
                    var name = slot.data.attachmentName;
                    if (name)
                    {
                        var attachment = newSkin.getAttachment(i, name);
                        if (attachment) slot.setAttachment(attachment);
                    }
                }
            }
        }
        this.skin = newSkin;
    },
    /** @return May be null. */
    getAttachmentBySlotName: function (slotName, attachmentName)
    {
        return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
    },
    /** @return May be null. */
    getAttachmentBySlotIndex: function (slotIndex, attachmentName)
    {
        if (this.skin)
        {
            var attachment = this.skin.getAttachment(slotIndex, attachmentName);
            if (attachment) return attachment;
        }
        if (this.data.defaultSkin) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
        return null;
    },
    /** @param attachmentName May be null. */
    setAttachment: function (slotName, attachmentName)
    {
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++)
        {
            var slot = slots[i];
            if (slot.data.name == slotName)
            {
                var attachment = null;
                if (attachmentName)
                {
                    attachment = this.getAttachmentBySlotIndex(i, attachmentName);
                    if (!attachment) throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
                }
                slot.setAttachment(attachment);
                return;
            }
        }
        throw "Slot not found: " + slotName;
    },
    /** @return May be null. */
    findIkConstraint: function (constraintName)
    {
        var constraints = this.ikConstraints;
        for (var i = 0, n = constraints.length; i < n; i++)
            if (constraints[i].data.name == constraintName) return constraints[i];
        return null;
    },
    findTransformConstraint: function (constraintName)
    {
        var constraints = this.transformConstraints;
        for (var i = 0, n = constraints.length; i < n; i++)
            if (constraints[i].data.name == constraintName) return constraints[i];
        return null;
    },
    update: function (delta)
    {
        this.time += delta;
    },
    resetDrawOrder: function () {
        for (var i = 0, n = this.drawOrder.length; i < n; i++)
        {
            this.drawOrder[i] = i;
        }
    }
};
module.exports = spine.Skeleton;


},{"../SpineUtil":44,"./Bone":12,"./IkConstraint":22,"./Slot":35}],31:[function(require,module,exports){
var spine = require('../SpineRuntime') || {};
spine.AttachmentType = require('./AttachmentType');
spine.SkeletonBounds = function ()
{
    this.polygonPool = [];
    this.polygons = [];
    this.boundingBoxes = [];
};
spine.SkeletonBounds.prototype = {
    minX: 0, minY: 0, maxX: 0, maxY: 0,
    update: function (skeleton, updateAabb)
    {
        var slots = skeleton.slots;
        var slotCount = slots.length;
        var x = skeleton.x, y = skeleton.y;
        var boundingBoxes = this.boundingBoxes;
        var polygonPool = this.polygonPool;
        var polygons = this.polygons;

        boundingBoxes.length = 0;
        for (var i = 0, n = polygons.length; i < n; i++)
            polygonPool.push(polygons[i]);
        polygons.length = 0;

        for (var i = 0; i < slotCount; i++)
        {
            var slot = slots[i];
            var boundingBox = slot.attachment;
            if (boundingBox.type != spine.AttachmentType.boundingbox) continue;
            boundingBoxes.push(boundingBox);

            var poolCount = polygonPool.length, polygon;
            if (poolCount > 0)
            {
                polygon = polygonPool[poolCount - 1];
                polygonPool.splice(poolCount - 1, 1);
            } else
                polygon = [];
            polygons.push(polygon);

            polygon.length = boundingBox.vertices.length;
            boundingBox.computeWorldVertices(x, y, slot.bone, polygon);
        }

        if (updateAabb) this.aabbCompute();
    },
    aabbCompute: function ()
    {
        var polygons = this.polygons;
        var minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;
        for (var i = 0, n = polygons.length; i < n; i++)
        {
            var vertices = polygons[i];
            for (var ii = 0, nn = vertices.length; ii < nn; ii += 2)
            {
                var x = vertices[ii];
                var y = vertices[ii + 1];
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    },
    /** Returns true if the axis aligned bounding box contains the point. */
    aabbContainsPoint: function (x, y)
    {
        return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
    },
    /** Returns true if the axis aligned bounding box intersects the line segment. */
    aabbIntersectsSegment: function (x1, y1, x2, y2)
    {
        var minX = this.minX, minY = this.minY, maxX = this.maxX, maxY = this.maxY;
        if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY))
            return false;
        var m = (y2 - y1) / (x2 - x1);
        var y = m * (minX - x1) + y1;
        if (y > minY && y < maxY) return true;
        y = m * (maxX - x1) + y1;
        if (y > minY && y < maxY) return true;
        var x = (minY - y1) / m + x1;
        if (x > minX && x < maxX) return true;
        x = (maxY - y1) / m + x1;
        if (x > minX && x < maxX) return true;
        return false;
    },
    /** Returns true if the axis aligned bounding box intersects the axis aligned bounding box of the specified bounds. */
    aabbIntersectsSkeleton: function (bounds)
    {
        return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
    },
    /** Returns the first bounding box attachment that contains the point, or null. When doing many checks, it is usually more
     * efficient to only call this method if {@link #aabbContainsPoint(float, float)} returns true. */
    containsPoint: function (x, y)
    {
        var polygons = this.polygons;
        for (var i = 0, n = polygons.length; i < n; i++)
            if (this.polygonContainsPoint(polygons[i], x, y)) return this.boundingBoxes[i];
        return null;
    },
    /** Returns the first bounding box attachment that contains the line segment, or null. When doing many checks, it is usually
     * more efficient to only call this method if {@link #aabbIntersectsSegment(float, float, float, float)} returns true. */
    intersectsSegment: function (x1, y1, x2, y2)
    {
        var polygons = this.polygons;
        for (var i = 0, n = polygons.length; i < n; i++)
            if (polygons[i].intersectsSegment(x1, y1, x2, y2)) return this.boundingBoxes[i];
        return null;
    },
    /** Returns true if the polygon contains the point. */
    polygonContainsPoint: function (polygon, x, y)
    {
        var nn = polygon.length;
        var prevIndex = nn - 2;
        var inside = false;
        for (var ii = 0; ii < nn; ii += 2)
        {
            var vertexY = polygon[ii + 1];
            var prevY = polygon[prevIndex + 1];
            if ((vertexY < y && prevY >= y) || (prevY < y && vertexY >= y))
            {
                var vertexX = polygon[ii];
                if (vertexX + (y - vertexY) / (prevY - vertexY) * (polygon[prevIndex] - vertexX) < x) inside = !inside;
            }
            prevIndex = ii;
        }
        return inside;
    },
    /** Returns true if the polygon contains the line segment. */
    polygonIntersectsSegment: function (polygon, x1, y1, x2, y2)
    {
        var nn = polygon.length;
        var width12 = x1 - x2, height12 = y1 - y2;
        var det1 = x1 * y2 - y1 * x2;
        var x3 = polygon[nn - 2], y3 = polygon[nn - 1];
        for (var ii = 0; ii < nn; ii += 2)
        {
            var x4 = polygon[ii], y4 = polygon[ii + 1];
            var det2 = x3 * y4 - y3 * x4;
            var width34 = x3 - x4, height34 = y3 - y4;
            var det3 = width12 * height34 - height12 * width34;
            var x = (det1 * width34 - width12 * det2) / det3;
            if (((x >= x3 && x <= x4) || (x >= x4 && x <= x3)) && ((x >= x1 && x <= x2) || (x >= x2 && x <= x1)))
            {
                var y = (det1 * height34 - height12 * det2) / det3;
                if (((y >= y3 && y <= y4) || (y >= y4 && y <= y3)) && ((y >= y1 && y <= y2) || (y >= y2 && y <= y1))) return true;
            }
            x3 = x4;
            y3 = y4;
        }
        return false;
    },
    getPolygon: function (attachment)
    {
        var index = this.boundingBoxes.indexOf(attachment);
        return index == -1 ? null : this.polygons[index];
    },
    getWidth: function ()
    {
        return this.maxX - this.minX;
    },
    getHeight: function ()
    {
        return this.maxY - this.minY;
    }
};
module.exports = spine.SkeletonBounds;


},{"../SpineRuntime":43,"./AttachmentType":11}],32:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.SkeletonData = function ()
{
    this.bones = [];
    this.slots = [];
    this.skins = [];
    this.events = [];
    this.animations = [];
    this.ikConstraints = [];
    this.transformConstraints = [];
};
spine.SkeletonData.prototype = {
    name: null,
    defaultSkin: null,
    width: 0, height: 0,
    version: null, hash: null,
    /** @return May be null. */
    findBone: function (boneName)
    {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
            if (bones[i].name == boneName) return bones[i];
        return null;
    },
    /** @return -1 if the bone was not found. */
    findBoneIndex: function (boneName)
    {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++)
            if (bones[i].name == boneName) return i;
        return -1;
    },
    /** @return May be null. */
    findSlot: function (slotName)
    {
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++)
        {
            if (slots[i].name == slotName) return this.slots[i];
        }
        return null;
    },
    /** @return -1 if the bone was not found. */
    findSlotIndex: function (slotName)
    {
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++)
            if (slots[i].name == slotName) return i;
        return -1;
    },
    /** @return May be null. */
    findSkin: function (skinName)
    {
        var skins = this.skins;
        for (var i = 0, n = skins.length; i < n; i++)
            if (skins[i].name == skinName) return skins[i];
        return null;
    },
    /** @return May be null. */
    findEvent: function (eventName)
    {
        var events = this.events;
        for (var i = 0, n = events.length; i < n; i++)
            if (events[i].name == eventName) return events[i];
        return null;
    },
    /** @return May be null. */
    findAnimation: function (animationName)
    {
        var animations = this.animations;
        for (var i = 0, n = animations.length; i < n; i++)
            if (animations[i].name == animationName) return animations[i];
        return null;
    },
    /** @return May be null. */
    findIkConstraint: function (constraintName)
    {
        var constraints = this.ikConstraints;
        for (var i = 0, n = constraints.length; i < n; i++)
            if (constraints[i].name == constraintName) return constraints[i];
        return null;
    },
    /** @return May be null. */
    findTransformConstraint: function (constraintName)
    {
        var constraints = this.transformConstraints;
        for (var i = 0, n = constraints.length; i < n; i++)
            if (constraints[i].name == constraintName) return constraints[i];
        return null;
    },
};
module.exports = spine.SkeletonData;


},{"../SpineUtil":44}],33:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.SkeletonData = require('./SkeletonData');
spine.BoneData = require('./BoneData');
spine.IkConstraintData = require('./IkConstraintData');
spine.TransformConstraintData = require('./TransformConstraintData');
spine.SlotData = require('./SlotData');
spine.Skin = require('./Skin');
spine.EventData = require('./EventData');
spine.AttachmentType = require('./AttachmentType');
spine.ColorTimeline = require('./ColorTimeline');
spine.AttachmentTimeline = require('./AttachmentTimeline');
spine.RotateTimeline = require('./RotateTimeline');
spine.ScaleTimeline = require('./ScaleTimeline');
spine.TranslateTimeline = require('./TranslateTimeline');
spine.ShearTimeline = require('./ShearTimeline');
spine.IkConstraintTimeline = require('./IkConstraintTimeline');
spine.TransformConstraintTimeline = require('./TransformConstraintTimeline');
spine.FfdTimeline = require('./FfdTimeline');
spine.DrawOrderTimeline = require('./DrawOrderTimeline');
spine.EventTimeline = require('./EventTimeline');
spine.Event = require('./Event');
spine.Animation = require('./Animation');

function LinkedMesh(mesh, skin, slotIndex, parent) {
    this.mesh = mesh;
    this.skin = skin;
    this.slotIndex = slotIndex;
    this.parent = parent;
}

spine.SkeletonJsonParser = function (attachmentLoader)
{
    if (attachmentLoader.pages) {
        //its an atlas, we have to wrap it
        this.attachmentLoader = new spine.AtlasAttachmentLoader(attachmentLoader);
    } else {
        //got a loader, thats good
        this.attachmentLoader = attachmentLoader;
    }
    if (!attachmentLoader.newRegionAttachment) {
        console.warn("SkeletonJsonParser accepts AtlasAttachmentLoader or atlas as first parameter");
    }
    this.linkedMeshes = [];
};
spine.SkeletonJsonParser.prototype = {
    scale: 1,
    readSkeletonData: function (root, name)
    {
        var skeletonData = new spine.SkeletonData();
        skeletonData.name = name;

        var scale = this.scale;
        // Skeleton.
        var skeletonMap = root["skeleton"];
        if (skeletonMap)
        {
            skeletonData.hash = skeletonMap["hash"];
            skeletonData.version = skeletonMap["spine"];
            skeletonData.width = skeletonMap["width"] || 0;
            skeletonData.height = skeletonMap["height"] || 0;
        }

        // Bones.
        var bones = root["bones"];
        for (var i = 0, n = bones.length; i < n; i++)
        {
            var boneMap = bones[i];
            var parent = null;
            if (boneMap["parent"])
            {
                parent = skeletonData.findBone(boneMap["parent"]);
                if (!parent) throw "Parent bone not found: " + boneMap["parent"];
            }
            var boneData = new spine.BoneData(boneMap["name"], parent);
            boneData.length = (boneMap["length"] || 0) * this.scale;
            boneData.x = (boneMap["x"] || 0) * this.scale;
            boneData.y = (boneMap["y"] || 0) * this.scale;
            boneData.rotation = (boneMap["rotation"] || 0);
            boneData.scaleX = boneMap.hasOwnProperty("scaleX") ? boneMap["scaleX"] : 1;
            boneData.scaleY = boneMap.hasOwnProperty("scaleY") ? boneMap["scaleY"] : 1;
            boneData.shearX = boneMap["shearX"] || 0;
            boneData.shearY = boneMap["shearY"] || 0;
            boneData.inheritScale = boneMap.hasOwnProperty("inheritScale") ? boneMap["inheritScale"] : true;
            boneData.inheritRotation = boneMap.hasOwnProperty("inheritRotation") ? boneMap["inheritRotation"] : true;
            skeletonData.bones.push(boneData);
        }

        // IK constraints.
        var ik = root["ik"];
        if (ik)
        {
            for (var i = 0, n = ik.length; i < n; i++)
            {
                var ikMap = ik[i];
                var ikConstraintData = new spine.IkConstraintData(ikMap["name"]);

                var bones = ikMap["bones"];
                for (var ii = 0, nn = bones.length; ii < nn; ii++)
                {
                    var bone = skeletonData.findBone(bones[ii]);
                    if (!bone) throw new Error( "IK bone not found: " + bones[ii] );
                    ikConstraintData.bones.push(bone);
                }

                ikConstraintData.target = skeletonData.findBone(ikMap["target"]);
                if (!ikConstraintData.target) throw new Error("Target bone not found: " + ikMap["target"]);

                ikConstraintData.bendDirection = (!ikMap.hasOwnProperty("bendPositive") || ikMap["bendPositive"]) ? 1 : -1;
                ikConstraintData.mix = ikMap.hasOwnProperty("mix") ? ikMap["mix"] : 1;

                skeletonData.ikConstraints.push(ikConstraintData);
            }
        }

        var transform = root["transform"];
        if (transform) {
            for (var i = 0, n = transform.length; i<n; i++) {
                var transformMap = transform[i];
                var transformData = new spine.TransformConstraintData(transformMap["name"]);
                transformData.bone = skeletonData.findBone(transformMap["bone"]);
                if (!transformData.bone) throw new Error("Transform bone not found: " + transformData["bone"]);
                transformData.target = skeletonData.findBone(transformMap["target"]);
                if (!transformData.target) throw new Error("Target bone not found: " + transformData["target"]);

                transformData.offsetRotation = transformMap["rotation"] || 0;
                transformData.offsetX = (transformMap["offsetX"] || 0) * scale;
                transformData.offsetY = (transformMap["offsetY"] || 0) * scale;
                transformData.offsetScaleX = (transformMap["scaleX"] || 0) * scale;
                transformData.offsetScaleY = (transformMap["scaleY"] || 0) * scale;
                transformData.offsetShearY = (transformMap["offsetShearY"] || 0) * scale;

                transformData.rotateMix = transformMap.hasOwnProperty("rotateMix") ? transformMap["rotateMix"] : 1;
                transformData.translateMix = transformMap.hasOwnProperty("translateMix") ? transformMap["translateMix"] : 1;
                transformData.scaleMix = transformMap.hasOwnProperty("scaleMix") ? transformMap["scaleMix"] : 1;
                transformData.shearMix = transformMap.hasOwnProperty("shearMix") ? transformMap["shearMix"] : 1;

                skeletonData.transformConstraints.push(transformData);
            }
        }

        // Slots.
        var slots = root["slots"];
        for (var i = 0, n = slots.length; i < n; i++)
        {
            var slotMap = slots[i];
            var boneData = skeletonData.findBone(slotMap["bone"]);
            if (!boneData) throw "Slot bone not found: " + slotMap["bone"];
            var slotData = new spine.SlotData(slotMap["name"], boneData);

            var color = slotMap["color"];
            if (color)
            {
                slotData.r = this.toColor(color, 0);
                slotData.g = this.toColor(color, 1);
                slotData.b = this.toColor(color, 2);
                slotData.a = this.toColor(color, 3);
            }

            slotData.attachmentName = slotMap["attachment"];


            slotData.blendMode = slotMap["blend"] && spine.SlotData.PIXI_BLEND_MODE_MAP[slotMap["blend"]] || spine.SlotData.PIXI_BLEND_MODE_MAP['normal'];

            skeletonData.slots.push(slotData);
        }

        // Skins.
        var skins = root["skins"];
        for (var skinName in skins)
        {
            if (!skins.hasOwnProperty(skinName)) continue;
            var skinMap = skins[skinName];
            var skin = new spine.Skin(skinName);
            for (var slotName in skinMap)
            {
                if (!skinMap.hasOwnProperty(slotName)) continue;
                var slotIndex = skeletonData.findSlotIndex(slotName);
                var slotEntry = skinMap[slotName];
                for (var attachmentName in slotEntry)
                {
                    if (!slotEntry.hasOwnProperty(attachmentName)) continue;
                    var attachment = this.readAttachment(skin, slotIndex, attachmentName, slotEntry[attachmentName]);
                    if (attachment) skin.addAttachment(slotIndex, attachmentName, attachment);
                }
            }
            skeletonData.skins.push(skin);
            if (skin.name == "default") skeletonData.defaultSkin = skin;
        }

        var linkedMeshes = this.linkedMeshes;
        // Linked meshes.
        for (var i = 0, n = linkedMeshes.size; i < n; i++) {
            var linkedMesh = linkedMeshes[i];
            var skin = linkedMesh.skin ? skeletonData.findSkin(linkedMesh.skin): skeletonData.defaultSkin;
            var parent = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
            linkedMesh.mesh.setParentMesh(parent);
            linkedMesh.mesh.updateUVs();
        }
        linkedMeshes.length = 0;

        // Events.
        var events = root["events"];
        for (var eventName in events)
        {
            if (!events.hasOwnProperty(eventName)) continue;
            var eventMap = events[eventName];
            var eventData = new spine.EventData(eventName);
            eventData.intValue = eventMap["int"] || 0;
            eventData.floatValue = eventMap["float"] || 0;
            eventData.stringValue = eventMap["string"] || null;
            skeletonData.events.push(eventData);
        }

        // Animations.
        var animations = root["animations"];
        for (var animationName in animations)
        {
            if (!animations.hasOwnProperty(animationName)) continue;
            this.readAnimation(animationName, animations[animationName], skeletonData);
        }

        return skeletonData;
    },
    readAttachment: function (skin, slotIndex, name, map)
    {
        name = map["name"] || name;

        var type = spine.AttachmentType[map["type"] || "region"];
        var path = map["path"] || name;

        var scale = this.scale;
        if (type == spine.AttachmentType.region)
        {
            var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
            if (!region) return null;
            region.path = path;
            region.x = (map["x"] || 0) * scale;
            region.y = (map["y"] || 0) * scale;
            region.scaleX = map.hasOwnProperty("scaleX") ? map["scaleX"] : 1;
            region.scaleY = map.hasOwnProperty("scaleY") ? map["scaleY"] : 1;
            region.rotation = map["rotation"] || 0;
            region.width = (map["width"] || 0) * scale;
            region.height = (map["height"] || 0) * scale;

            var color = map["color"];
            if (color)
            {
                region.r = this.toColor(color, 0);
                region.g = this.toColor(color, 1);
                region.b = this.toColor(color, 2);
                region.a = this.toColor(color, 3);
            }

            region.updateOffset();
            return region;
        } else if (type == spine.AttachmentType.boundingbox)
        {
            var attachment = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
            var vertices = map["vertices"];
            for (var i = 0, n = vertices.length; i < n; i++)
                attachment.vertices.push(vertices[i] * scale);
            return attachment;
        } else if (type == spine.AttachmentType.mesh || type == spine.AttachmentType.linkedmesh)
        {
            var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
            if (!mesh) return null;
            mesh.path = path;
            color = map["color"];
            if (color)
            {
                mesh.r = this.toColor(color, 0);
                mesh.g = this.toColor(color, 1);
                mesh.b = this.toColor(color, 2);
                mesh.a = this.toColor(color, 3);
            }
            mesh.width = (map["width"] || 0) * scale;
            mesh.height = (map["height"] || 0) * scale;

            var parent = map["parent"];
            if (!parent) {
                mesh.vertices = this.getFloatArray(map, "vertices", scale);
                mesh.triangles = this.getIntArray(map, "triangles");
                mesh.regionUVs = this.getFloatArray(map, "uvs", 1);
                mesh.updateUVs();
                mesh.hullLength = (map["hull"] || 0) * 2;
                if (map["edges"]) mesh.edges = this.getIntArray(map, "edges");
            } else {
                mesh.inheritFFD = !!map["ffd"];
                this.linkedMeshes.push(new LinkedMesh(mesh, map["skin"] || null, slotIndex, parent));
            }
            return mesh;
        } else if (type == spine.AttachmentType.weightedmesh || type == spine.AttachmentType.weightedlinkedmesh)
        {
            var mesh = this.attachmentLoader.newWeightedMeshAttachment(skin, name, path);
            if (!mesh) return null;
            mesh.path = path;
            color = map["color"];
            if (color)
            {
                mesh.r = this.toColor(color, 0);
                mesh.g = this.toColor(color, 1);
                mesh.b = this.toColor(color, 2);
                mesh.a = this.toColor(color, 3);
            }
            mesh.width = (map["width"] || 0) * scale;
            mesh.height = (map["height"] || 0) * scale;

            var parent = map["parent"];
            if (!parent) {
                var uvs = this.getFloatArray(map, "uvs", 1);
                var vertices = this.getFloatArray(map, "vertices", 1);
                var weights = [];
                var bones = [];
                for (var i = 0, n = vertices.length; i < n; )
                {
                    var boneCount = vertices[i++] | 0;
                    bones[bones.length] = boneCount;
                    for (var nn = i + boneCount * 4; i < nn; )
                    {
                        bones[bones.length] = vertices[i];
                        weights[weights.length] = vertices[i + 1] * scale;
                        weights[weights.length] = vertices[i + 2] * scale;
                        weights[weights.length] = vertices[i + 3];
                        i += 4;
                    }
                }
                mesh.bones = bones;
                mesh.weights = weights;
                mesh.triangles = this.getIntArray(map, "triangles");
                mesh.regionUVs = uvs;
                mesh.updateUVs();

                mesh.hullLength = (map["hull"] || 0) * 2;
                if (map["edges"]) mesh.edges = this.getIntArray(map, "edges");
            } else {
                mesh.inheritFFD = !!map["ffd"];
                this.linkedMeshes.push(new LinkedMesh(mesh, map["skin"] || null, slotIndex, parent));
            }
            return mesh;
        }
        throw "Unknown attachment type: " + type;
    },
    readAnimation: function (name, map, skeletonData)
    {
        var timelines = [];
        var duration = 0;

        var slots = map["slots"];
        for (var slotName in slots)
        {
            if (!slots.hasOwnProperty(slotName)) continue;
            var slotMap = slots[slotName];
            var slotIndex = skeletonData.findSlotIndex(slotName);

            for (var timelineName in slotMap)
            {
                if (!slotMap.hasOwnProperty(timelineName)) continue;
                var values = slotMap[timelineName];
                if (timelineName == "color")
                {
                    var timeline = new spine.ColorTimeline(values.length);
                    timeline.slotIndex = slotIndex;

                    var frameIndex = 0;
                    for (var i = 0, n = values.length; i < n; i++)
                    {
                        var valueMap = values[i];
                        var color = valueMap["color"];
                        var r = this.toColor(color, 0);
                        var g = this.toColor(color, 1);
                        var b = this.toColor(color, 2);
                        var a = this.toColor(color, 3);
                        timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
                        this.readCurve(timeline, frameIndex, valueMap);
                        frameIndex++;
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);

                } else if (timelineName == "attachment")
                {
                    var timeline = new spine.AttachmentTimeline(values.length);
                    timeline.slotIndex = slotIndex;

                    var frameIndex = 0;
                    for (var i = 0, n = values.length; i < n; i++)
                    {
                        var valueMap = values[i];
                        timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);

                } else
                    throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
            }
        }

        var bones = map["bones"];
        for (var boneName in bones)
        {
            if (!bones.hasOwnProperty(boneName)) continue;
            var boneIndex = skeletonData.findBoneIndex(boneName);
            if (boneIndex == -1) throw "Bone not found: " + boneName;
            var boneMap = bones[boneName];

            for (var timelineName in boneMap)
            {
                if (!boneMap.hasOwnProperty(timelineName)) continue;
                var values = boneMap[timelineName];
                if (timelineName == "rotate")
                {
                    var timeline = new spine.RotateTimeline(values.length);
                    timeline.boneIndex = boneIndex;

                    var frameIndex = 0;
                    for (var i = 0, n = values.length; i < n; i++)
                    {
                        var valueMap = values[i];
                        timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
                        this.readCurve(timeline, frameIndex, valueMap);
                        frameIndex++;
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);

                } else if (timelineName == "translate" || timelineName == "scale" || timelineName == "shear")
                {
                    var timeline;
                    var timelineScale = 1;
                    if (timelineName == "scale") {
                        timeline = new spine.ScaleTimeline(values.length);
                    } else if (timelineName == "shear") {
                        timeline = new spine.ShearTimeline(values.length);
                    }
                    else
                    {
                        timeline = new spine.TranslateTimeline(values.length);
                        timelineScale = this.scale;
                    }
                    timeline.boneIndex = boneIndex;

                    var frameIndex = 0;
                    for (var i = 0, n = values.length; i < n; i++)
                    {
                        var valueMap = values[i];
                        var x = (valueMap["x"] || 0) * timelineScale;
                        var y = (valueMap["y"] || 0) * timelineScale;
                        timeline.setFrame(frameIndex, valueMap["time"], x, y);
                        this.readCurve(timeline, frameIndex, valueMap);
                        frameIndex++;
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);

                } else if (timelineName == "flipX" || timelineName == "flipY")
                {
                    throw "flipX and flipY are not supported in spine v3: (" + boneName + ")";
                } else
                    throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
            }
        }

        var ikMap = map["ik"];
        for (var ikConstraintName in ikMap)
        {
            if (!ikMap.hasOwnProperty(ikConstraintName)) continue;
            var ikConstraint = skeletonData.findIkConstraint(ikConstraintName);
            var values = ikMap[ikConstraintName];
            var timeline = new spine.IkConstraintTimeline(values.length);
            timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(ikConstraint);
            var frameIndex = 0;
            for (var i = 0, n = values.length; i < n; i++)
            {
                var valueMap = values[i];
                var mix = valueMap.hasOwnProperty("mix") ? valueMap["mix"] : 1;
                var bendDirection = (!valueMap.hasOwnProperty("bendPositive") || valueMap["bendPositive"]) ? 1 : -1;
                timeline.setFrame(frameIndex, valueMap["time"], mix, bendDirection);
                this.readCurve(timeline, frameIndex, valueMap);
                frameIndex++;
            }
            timelines.push(timeline);
            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);
        }

        var transformMap = map["transform"];
        for (var transformConstraintName in transformMap)
        {
            if (!transformMap.hasOwnProperty(transformConstraintName)) continue;
            var transformConstraint = skeletonData.findTransformConstraint(transformConstraintName);
            var values = transformMap[transformConstraintName];
            var timeline = new spine.TransformConstraintTimeline(values.length);
            timeline.transformConstraintIndex = skeletonData.transformConstraints.indexOf(transformConstraint);
            var frameIndex = 0;
            for (var i = 0, n = values.length; i < n; i++)
            {
                var valueMap = values[i];
                var rotateMix = valueMap.hasOwnProperty("rotateMix") ? valueMap["rotateMix"] : 1;
                var translateMix = valueMap.hasOwnProperty("translateMix") ? valueMap["translateMix"] : 1;
                var scaleMix = valueMap.hasOwnProperty("scaleMix") ? valueMap["scaleMix"] : 1;
                var shearMix = valueMap.hasOwnProperty("shearMix") ? valueMap["shearMix"] : 1;
                timeline.setFrame(frameIndex, valueMap["time"], translateMix, scaleMix, shearMix);
                this.readCurve(timeline, frameIndex, valueMap);
                frameIndex++;
            }
            timelines.push(timeline);
            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);
        }

        var ffd = map["ffd"];
        for (var skinName in ffd)
        {
            var skin = skeletonData.findSkin(skinName);
            var slotMap = ffd[skinName];
            for (slotName in slotMap)
            {
                var slotIndex = skeletonData.findSlotIndex(slotName);
                var meshMap = slotMap[slotName];
                for (var meshName in meshMap)
                {
                    var values = meshMap[meshName];
                    var timeline = new spine.FfdTimeline(values.length);
                    var attachment = skin.getAttachment(slotIndex, meshName);
                    if (!attachment) throw "FFD attachment not found: " + meshName;
                    timeline.slotIndex = slotIndex;
                    timeline.attachment = attachment;

                    var isMesh = attachment.type == spine.AttachmentType.mesh;
                    var vertexCount;
                    if (isMesh)
                        vertexCount = attachment.vertices.length;
                    else
                        vertexCount = attachment.weights.length / 3 * 2;

                    var frameIndex = 0;
                    for (var i = 0, n = values.length; i < n; i++)
                    {
                        var valueMap = values[i];
                        var vertices;
                        if (!valueMap["vertices"])
                        {
                            if (isMesh)
                                vertices = attachment.vertices;
                            else
                            {
                                vertices = [];
                                for (var j = 0; j < vertexCount; ++j) vertices.push(0); //initialize to 0
                            }
                        } else {
                            var verticesValue = valueMap["vertices"];
                            vertices = [];
                            for (var j = 0; j < vertexCount; ++j) vertices.push(0); //initialize to 0
                            var start = valueMap["offset"] || 0;
                            var nn = verticesValue.length;
                            if (this.scale == 1)
                            {
                                for (var ii = 0; ii < nn; ii++)
                                    vertices[ii + start] = verticesValue[ii];
                            } else {
                                for (var ii = 0; ii < nn; ii++)
                                    vertices[ii + start] = verticesValue[ii] * this.scale;
                            }
                            if (isMesh)
                            {
                                var meshVertices = attachment.vertices;
                                for (var ii = 0, nn = vertices.length; ii < nn; ii++)
                                    vertices[ii] += meshVertices[ii];
                            }
                        }

                        timeline.setFrame(frameIndex, valueMap["time"], vertices);
                        this.readCurve(timeline, frameIndex, valueMap);
                        frameIndex++;
                    }
                    timelines[timelines.length] = timeline;
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
            }
        }

        var drawOrderValues = map["drawOrder"];
        if (!drawOrderValues) drawOrderValues = map["draworder"];
        if (drawOrderValues)
        {
            var timeline = new spine.DrawOrderTimeline(drawOrderValues.length);
            var slotCount = skeletonData.slots.length;
            var frameIndex = 0;
            for (var i = 0, n = drawOrderValues.length; i < n; i++)
            {
                var drawOrderMap = drawOrderValues[i];
                var drawOrder = null;
                if (drawOrderMap["offsets"])
                {
                    drawOrder = [];
                    drawOrder.length = slotCount;
                    for (var ii = slotCount - 1; ii >= 0; ii--)
                        drawOrder[ii] = -1;
                    var offsets = drawOrderMap["offsets"];
                    var unchanged = [];
                    unchanged.length = slotCount - offsets.length;
                    var originalIndex = 0, unchangedIndex = 0;
                    for (var ii = 0, nn = offsets.length; ii < nn; ii++)
                    {
                        var offsetMap = offsets[ii];
                        var slotIndex = skeletonData.findSlotIndex(offsetMap["slot"]);
                        if (slotIndex == -1) throw "Slot not found: " + offsetMap["slot"];
                        // Collect unchanged items.
                        while (originalIndex != slotIndex)
                            unchanged[unchangedIndex++] = originalIndex++;
                        // Set changed items.
                        drawOrder[originalIndex + offsetMap["offset"]] = originalIndex++;
                    }
                    // Collect remaining unchanged items.
                    while (originalIndex < slotCount)
                        unchanged[unchangedIndex++] = originalIndex++;
                    // Fill in unchanged items.
                    for (var ii = slotCount - 1; ii >= 0; ii--)
                        if (drawOrder[ii] == -1) drawOrder[ii] = unchanged[--unchangedIndex];
                }
                timeline.setFrame(frameIndex++, drawOrderMap["time"], drawOrder);
            }
            timelines.push(timeline);
            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
        }

        var events = map["events"];
        if (events)
        {
            var timeline = new spine.EventTimeline(events.length);
            var frameIndex = 0;
            for (var i = 0, n = events.length; i < n; i++)
            {
                var eventMap = events[i];
                var eventData = skeletonData.findEvent(eventMap["name"]);
                if (!eventData) throw "Event not found: " + eventMap["name"];
                var event = new spine.Event(eventData);
                event.intValue = eventMap.hasOwnProperty("int") ? eventMap["int"] : eventData.intValue;
                event.floatValue = eventMap.hasOwnProperty("float") ? eventMap["float"] : eventData.floatValue;
                event.stringValue = eventMap.hasOwnProperty("string") ? eventMap["string"] : eventData.stringValue;
                timeline.setFrame(frameIndex++, eventMap["time"], event);
            }
            timelines.push(timeline);
            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
        }

        skeletonData.animations.push(new spine.Animation(name, timelines, duration));
    },
    readCurve: function (timeline, frameIndex, valueMap)
    {
        var curve = valueMap["curve"];
        if (!curve)
            timeline.curves.setLinear(frameIndex);
        else if (curve == "stepped")
            timeline.curves.setStepped(frameIndex);
        else if (curve instanceof Array)
            timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
    },
    toColor: function (hexString, colorIndex)
    {
        if (hexString.length != 8) throw "Color hexidecimal length must be 8, recieved: " + hexString;
        return parseInt(hexString.substring(colorIndex * 2, (colorIndex * 2) + 2), 16) / 255;
    },
    getFloatArray: function (map, name, scale)
    {
        var list = map[name];
        var values = new spine.Float32Array(list.length);
        var i = 0, n = list.length;
        if (scale == 1)
        {
            for (; i < n; i++)
                values[i] = list[i];
        } else {
            for (; i < n; i++)
                values[i] = list[i] * scale;
        }
        return values;
    },
    getIntArray: function (map, name)
    {
        var list = map[name];
        var values = new spine.Uint16Array(list.length);
        for (var i = 0, n = list.length; i < n; i++)
            values[i] = list[i] | 0;
        return values;
    }
};
module.exports = spine.SkeletonJsonParser;


},{"../SpineUtil":44,"./Animation":2,"./AttachmentTimeline":10,"./AttachmentType":11,"./BoneData":13,"./ColorTimeline":15,"./DrawOrderTimeline":17,"./Event":18,"./EventData":19,"./EventTimeline":20,"./FfdTimeline":21,"./IkConstraintData":23,"./IkConstraintTimeline":24,"./RotateTimeline":27,"./ScaleTimeline":28,"./ShearTimeline":29,"./SkeletonData":32,"./Skin":34,"./SlotData":36,"./TransformConstraintData":39,"./TransformConstraintTimeline":40,"./TranslateTimeline":41}],34:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Skin = function (name)
{
    this.name = name;
    this.attachments = {};
};
spine.Skin.prototype = {
    addAttachment: function (slotIndex, name, attachment)
    {
        this.attachments[slotIndex + ":" + name] = attachment;
    },
    getAttachment: function (slotIndex, name)
    {
        return this.attachments[slotIndex + ":" + name];
    },
    _attachAll: function (skeleton, oldSkin)
    {
        for (var key in oldSkin.attachments)
        {
            var colon = key.indexOf(":");
            var slotIndex = parseInt(key.substring(0, colon));
            var name = key.substring(colon + 1);
            var slot = skeleton.slots[slotIndex];
            if (slot.attachment && slot.attachment.name == name)
            {
                var attachment = this.getAttachment(slotIndex, name);
                if (attachment) slot.setAttachment(attachment);
            }
        }
    }
};
module.exports = spine.Skin;


},{"../SpineUtil":44}],35:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Slot = function (slotData, bone)
{
    this.data = slotData;
    this.bone = bone;
    this.setToSetupPose();
};
spine.Slot.prototype = {
    r: 1, g: 1, b: 1, a: 1,
    _attachmentTime: 0,
    attachment: null,
    attachmentVertices: [],
    setAttachment: function (attachment)
    {
        this.attachment = attachment;
        this._attachmentTime = this.bone.skeleton.time;
        this.attachmentVertices.length = 0;
    },
    setAttachmentTime: function (time)
    {
        this._attachmentTime = this.bone.skeleton.time - time;
    },
    getAttachmentTime: function ()
    {
        return this.bone.skeleton.time - this._attachmentTime;
    },
    setToSetupPose: function ()
    {
        var data = this.data;
        this.r = data.r;
        this.g = data.g;
        this.b = data.b;
        this.a = data.a;
        this.blendMode = data.blendMode;

        var slotDatas = this.bone.skeleton.data.slots;
        for (var i = 0, n = slotDatas.length; i < n; i++)
        {
            if (slotDatas[i] == data)
            {
                this.setAttachment(!data.attachmentName ? null : this.bone.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
                break;
            }
        }
    }
};
module.exports = spine.Slot;


},{"../SpineUtil":44}],36:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.SlotData = function (name, boneData)
{
    this.name = name;
    this.boneData = boneData;
};

spine.SlotData.PIXI_BLEND_MODE_MAP = {
    'multiply': PIXI.BLEND_MODES.MULTIPLY,
    'screen': PIXI.BLEND_MODES.SCREEN,
    'additive': PIXI.BLEND_MODES.ADD,
    'normal': PIXI.BLEND_MODES.NORMAL
};

spine.SlotData.prototype = {
    r: 1, g: 1, b: 1, a: 1,
    attachmentName: null,
    blendMode: PIXI.BLEND_MODES.NORMAL


};


module.exports = spine.SlotData;


},{"../SpineUtil":44}],37:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.TrackEntry = function ()
{};
spine.TrackEntry.prototype = {
    next: null, previous: null,
    animation: null,
    loop: false,
    delay: 0, time: 0, lastTime: -1, endTime: 0,
    timeScale: 1,
    mixTime: 0, mixDuration: 0, mix: 1,
    onStart: null, onEnd: null, onComplete: null, onEvent: null
};
module.exports = spine.TrackEntry;


},{"../SpineUtil":44}],38:[function(require,module,exports){
var spine = require('../SpineUtil');
var tempVec = [0, 0];
spine.TransformConstraint = function (data, skeleton)
{
    this.data = data;
    this.translateMix = data.translateMix;
    this.rotateMix = data.rotateMix;
    this.scaleMix = data.scaleMix;
    this.shearMix = data.shearMix;
    this.offsetX = data.offsetX;
    this.offsetY = data.offsetY;
    this.offsetScaleX = data.offsetScaleX;
    this.offsetScaleY = data.offsetScaleY;
    this.offsetShearY = data.offsetShearY;

    this.bone = skeleton.findBone(data.bone.name);
    this.target = skeleton.findBone(data.target.name);
};

spine.TransformConstraint.prototype = {
    update: function() {
        this.apply();
    },
    apply: function ()
    {
        var bm = this.bone.matrix;
        var tm = this.target.matrix;

        var rotateMix = this.rotateMix;
        if (rotateMix > 0) {
            var a = bm.a, b = bm.c, c = bm.b, d = bm.d;
            var r = Math.atan2(tm.b, tm.a) - Math.atan2(c, a);
            if (r > Math.PI)
                r -= Math.PI*2;
            else if (r < -Math.PI) r += Math.PI*2;
            r *= rotateMix;
            var cos = Math.cos(r), sin = Math.sin(r);
            bm.a = cos * a - sin * c;
            bm.c = cos * b - sin * d;
            bm.b = sin * a + cos * c;
            bm.d = sin * b + cos * d;
        }

        var scaleMix = this.rotateMix;
        if (scaleMix > 0) {
            var bs = Math.sqrt(bm.a * bm.a + bm.b * bm.b);
            var ts = Math.sqrt(tm.a * tm.a + tm.b * tm.b);
            var s = bs > 0.00001 ? (bs + (ts - bs + this.offsetScaleX) * scaleMix) / bs : 0;
            bm.a *= s;
            bm.b *= s;
            bs = Math.sqrt(bm.c * bm.c + bm.d * bm.d);
            ts = Math.sqrt(bm.c * bm.c + bm.d * bm.d);
            s = bs > 0.00001 ? (bs + (ts - bs + this.offsetScaleY) * scaleMix) / bs : 0;
            bm.c *= s;
            bm.d *= s;
        }

        var shearMix = this.shearMix;
        if (shearMix > 0) {
            var b = bm.c, d = bm.d;
            var by = Math.atan2(d, b);
            var r = Math.atan2(tm.d, tm.c) - Math.atan2(tm.b, target.a) - (by - Math.atan2(bm.b, bm.a));
            if (r > Math.PI)
                r -= Math.PI*2;
            else if (r < -Math.PI) r += Math.PI*2;
            r = by + (r + this.offsetShearY * spine.degRad) * shearMix;
            var s = Math.sqrt(b * b + d * d);
            bm.c = Math.cos(r) * s;
            bm.d = Math.sin(r) * s;
        }

        var translateMix = this.translateMix;
        if (translateMix > 0) {
            tempVec[0] = this.offsetX;
            tempVec[1] = this.offsetY;
            this.target.localToWorld(tempVec);
            bm.tx += (tempVec[0] - bm.tx) * translateMix;
            bm.ty += (tempVec[1] - bm.ty) * translateMix;
        }
    }
};

module.exports = spine.TransformConstraint;

},{"../SpineUtil":44}],39:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.TransformConstraintData = function (name)
{
    this.name = name;
    this.bone = null;
};
spine.TransformConstraintData.prototype = {
    target: null,
    rotateMix: 1,
    translateMix: 1,
    scaleMix: 1,
    shearMix: 1,
    offsetRotation: 0,
    offsetX: 0,
    offsetY: 0,
    offsetScaleX: 0,
    offsetScaleY: 0,
    offsetShearY: 0
};
module.exports = spine.TransformConstraintData;


},{"../SpineUtil":44}],40:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.TransformConstraintTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, mix, bendDirection, ...
    this.frames.length = frameCount * 3;
};
spine.TransformConstraintTimeline.prototype = {
    transformConstraintIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 5;
    },
    setFrame: function (frameIndex, time, rotateMix, translateMix, scaleMix, shareMix)
    {
        frameIndex *= 5;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = rotateMix;
        this.frames[frameIndex + 2] = translateMix;
        this.frames[frameIndex + 3] = scaleMix;
        this.frames[frameIndex + 4] = shareMix;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var constraint = skeleton.transformConstraints[this.transformConstraintIndex];

        if (time >= frames[frames.length - 5])
        { // Time is after last frame.
            constraint.rotateMix += (frames[i - 3] - constraint.rotateMix) * alpha;
            constraint.translateMix += (frames[i - 2] - constraint.translateMix) * alpha;
            constraint.scaleMix += (frames[i - 1] - constraint.scaleMix) * alpha;
            constraint.shearMix += (frames[i] - constraint.shearMix) * alpha;
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frame = spine.Animation.binarySearch(frames, time, 5);
        var frameTime = frames[frame];
        var percent = 1 - (time - frameTime) / (frames[frame + -5/*PREV_FRAME_TIME*/] - frameTime);
        percent = this.curves.getCurvePercent(frame / 5 - 1, percent);

        var rotate = frames[frame + -4/*PREV_ROTATE_MIX*/];
        var translate = frames[frame + -3/*PREV_TRANSLATE_MIX*/];
        var scale = frames[frame + -2/*PREV_SCALE_MIX*/];
        var shear = frames[frame + -1/*PREV_SHEAR_MIX*/];
        constraint.rotateMix += (rotate + (frames[frame + 1/*ROTATE_MIX*/] - rotate) * percent - constraint.rotateMix) * alpha;
        constraint.translateMix += (translate + (frames[frame + 2/*TRANSLATE_MIX*/] - translate) * percent - constraint.translateMix)
            * alpha;
        constraint.scaleMix += (scale + (frames[frame + 3/*SCALE_MIX*/] - scale) * percent - constraint.scaleMix) * alpha;
        constraint.shearMix += (shear + (frames[frame + 4/*SHEAR_MIX*/] - shear) * percent - constraint.shearMix) * alpha;
    }
};
module.exports = spine.TransformConstraintTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],41:[function(require,module,exports){
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.Curves = require('./Curves');
spine.TranslateTimeline = function (frameCount)
{
    this.curves = new spine.Curves(frameCount);
    this.frames = []; // time, x, y, ...
    this.frames.length = frameCount * 3;
};
spine.TranslateTimeline.prototype = {
    boneIndex: 0,
    getFrameCount: function ()
    {
        return this.frames.length / 3;
    },
    setFrame: function (frameIndex, time, x, y)
    {
        frameIndex *= 3;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + 1] = x;
        this.frames[frameIndex + 2] = y;
    },
    apply: function (skeleton, lastTime, time, firedEvents, alpha)
    {
        var frames = this.frames;
        if (time < frames[0]) return; // Time is before first frame.

        var bone = skeleton.bones[this.boneIndex];

        if (time >= frames[frames.length - 3])
        { // Time is after last frame.
            bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
            bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
            return;
        }

        // Interpolate between the previous frame and the current frame.
        var frameIndex = spine.Animation.binarySearch(frames, time, 3);
        var prevFrameX = frames[frameIndex - 2];
        var prevFrameY = frames[frameIndex - 1];
        var frameTime = frames[frameIndex];
        var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*PREV_FRAME_TIME*/] - frameTime);
        percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

        bone.x += (bone.data.x + prevFrameX + (frames[frameIndex + 1/*FRAME_X*/] - prevFrameX) * percent - bone.x) * alpha;
        bone.y += (bone.data.y + prevFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - prevFrameY) * percent - bone.y) * alpha;
    }
};
module.exports = spine.TranslateTimeline;


},{"../SpineUtil":44,"./Animation":2,"./Curves":16}],42:[function(require,module,exports){
var spine = require('../SpineUtil') || {};
spine.AttachmentType = require('./AttachmentType');
spine.WeightedMeshAttachment = function (name)
{
    this.name = name;
};
spine.WeightedMeshAttachment.prototype = {
    type: spine.AttachmentType.weightedmesh,
    parentMesh: null,
    inheritFFD: false,
    bones: null,
    weights: null,
    uvs: null,
    regionUVs: null,
    triangles: null,
    hullLength: 0,
    r: 1, g: 1, b: 1, a: 1,
    path: null,
    rendererObject: null,
    edges: null,
    width: 0, height: 0,
    updateUVs: function (u, v, u2, v2, rotate)
    {
        var width = this.regionU2 - this.regionU, height = this.regionV2 - this.regionV;
        var n = this.regionUVs.length;
        if (!this.uvs || this.uvs.length != n)
        {
            this.uvs = new spine.Float32Array(n);
        }
        var region = this.rendererObject;
        if (!region) return;
        var texture = region.texture;
        var r = texture._uvs;
        var w1 = region.width, h1 = region.height, w2 = region.originalWidth, h2 = region.originalHeight;
        var x = region.offsetX, y = region.pixiOffsetY;
        for (var i = 0; i < n; i += 2)
        {
            var u = this.regionUVs[i], v = this.regionUVs[i+1];
            u = (u * w2 - x) / w1;
            v = (v * h2 - y) / h1;
            this.uvs[i] = (r.x0 * (1 - u) + r.x1 * u) * (1-v) + (r.x3 * (1 - u) + r.x2 * u) * v;
            this.uvs[i+1] = (r.y0 * (1 - u) + r.y1 * u) * (1-v) + (r.y3 * (1 - u) + r.y2 * u) * v;
        }
    },
    computeWorldVertices: function (x, y, slot, worldVertices)
    {
        var skeletonBones = slot.bone.skeleton.bones;
        var weights = this.weights;
        var bones = this.bones;

        var w = 0, v = 0, b = 0, f = 0, n = bones.length, nn;
        var wx, wy, vx, vy, weight;
        var m;
        if (!slot.attachmentVertices.length)
        {
            for (; v < n; w += 2)
            {
                wx = 0;
                wy = 0;
                nn = bones[v++] + v;
                for (; v < nn; v++, b += 3)
                {
                    m = skeletonBones[bones[v]].matrix;
                    vx = weights[b];
                    vy = weights[b + 1];
                    weight = weights[b + 2];
                    wx += (vx * m.a + vy * m.c + m.tx) * weight;
                    wy += (vx * m.b + vy * m.d + m.ty) * weight;
                }
                worldVertices[w] = wx + x;
                worldVertices[w + 1] = wy + y;
            }
        } else {
            var ffd = slot.attachmentVertices;
            for (; v < n; w += 2)
            {
                wx = 0;
                wy = 0;
                nn = bones[v++] + v;
                for (; v < nn; v++, b += 3, f += 2)
                {
                    m = skeletonBones[bones[v]].matrix;
                    vx = weights[b] + ffd[f];
                    vy = weights[b + 1] + ffd[f + 1];
                    weight = weights[b + 2];
                    wx += (vx * m.a + vy * m.c + m.tx) * weight;
                    wy += (vx * m.b + vy * m.d + m.ty) * weight;
                }
                worldVertices[w] = wx + x;
                worldVertices[w + 1] = wy + y;
            }
        }
    },
    applyFFD: function(sourceAttachment) {
        return this === sourceAttachment || (this.inheritFFD && parentMesh === sourceAttachment);
    },
    setParentMesh: function(parentMesh) {
        this.parentMesh = parentMesh;
        if (parentMesh != null) {
            this.bones = parentMesh.bones;
            this.weights = parentMesh.weights;
            this.regionUVs = parentMesh.regionUVs;
            this.triangles = parentMesh.triangles;
            this.hullLength = parentMesh.hullLength;
        }
    }
};
module.exports = spine.WeightedMeshAttachment;


},{"../SpineUtil":44,"./AttachmentType":11}],43:[function(require,module,exports){
/******************************************************************************
 * Spine Runtimes Software License
 * Version 2.1
 *
 * Copyright (c) 2013, Esoteric Software
 * All rights reserved.
 *
 * You are granted a perpetual, non-exclusive, non-sublicensable and
 * non-transferable license to install, execute and perform the Spine Runtimes
 * Software (the "Software") solely for internal use. Without the written
 * permission of Esoteric Software (typically granted by licensing Spine), you
 * may not (a) modify, translate, adapt or otherwise create derivative works,
 * improvements of the Software or develop new applications using the Software
 * or (b) remove, delete, alter or obscure any trademarks or any copyright,
 * trademark, patent or other intellectual property or proprietary rights
 * notices on or in the Software, including any copy thereof. Redistributions
 * in binary or source form must include this license and terms.
 *
 * THIS SOFTWARE IS PROVIDED BY ESOTERIC SOFTWARE "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL ESOTERIC SOFTARE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
var spine = require('../SpineUtil');
spine.Animation = require('./Animation');
spine.AnimationStateData = require('./AnimationStateData');
spine.AnimationState = require('./AnimationState');
spine.AtlasAttachmentParser = require('./AtlasAttachmentParser');
spine.Atlas = require('./Atlas');
spine.AtlasPage = require('./AtlasPage');
spine.AtlasReader = require('./AtlasReader');
spine.AtlasRegion = require('./AtlasRegion');
spine.AttachmentTimeline = require('./AttachmentTimeline');
spine.AttachmentType = require('./AttachmentType');
spine.BoneData = require('./BoneData');
spine.Bone = require('./Bone');
spine.BoundingBoxAttachment = require('./BoundingBoxAttachment');
spine.ColorTimeline = require('./ColorTimeline');
spine.Curves = require('./Curves');
spine.DrawOrderTimeline = require('./DrawOrderTimeline');
spine.EventData = require('./EventData');
spine.Event = require('./Event');
spine.EventTimeline = require('./EventTimeline');
spine.FfdTimeline = require('./FfdTimeline');
spine.IkConstraintData = require('./IkConstraintData');
spine.IkConstraint = require('./IkConstraint');
spine.IkConstraintTimeline = require('./IkConstraintTimeline');
spine.TransformConstraintData = require('./TransformConstraintData');
spine.TransformConstraint = require('./TransformConstraint');
spine.TransformConstraintTimeline = require('./TransformConstraintTimeline');
spine.MeshAttachment = require('./MeshAttachment');
spine.RegionAttachment = require('./RegionAttachment');
spine.RotateTimeline = require('./RotateTimeline');
spine.ScaleTimeline = require('./ScaleTimeline');
spine.ShearTimeline = require('./ShearTimeline');
spine.SkeletonBounds = require('./SkeletonBounds');
spine.SkeletonData = require('./SkeletonData');
spine.Skeleton = require('./Skeleton');
spine.SkeletonJsonParser = require('./SkeletonJsonParser');
spine.Skin = require('./Skin.js');
spine.WeightedMeshAttachment = require('./WeightedMeshAttachment');
spine.SlotData = require('./SlotData');
spine.Slot = require('./Slot');
spine.TrackEntry = require('./TrackEntry');
spine.TranslateTimeline = require('./TranslateTimeline');
module.exports = spine;

},{"../SpineUtil":44,"./Animation":2,"./AnimationState":3,"./AnimationStateData":4,"./Atlas":5,"./AtlasAttachmentParser":6,"./AtlasPage":7,"./AtlasReader":8,"./AtlasRegion":9,"./AttachmentTimeline":10,"./AttachmentType":11,"./Bone":12,"./BoneData":13,"./BoundingBoxAttachment":14,"./ColorTimeline":15,"./Curves":16,"./DrawOrderTimeline":17,"./Event":18,"./EventData":19,"./EventTimeline":20,"./FfdTimeline":21,"./IkConstraint":22,"./IkConstraintData":23,"./IkConstraintTimeline":24,"./MeshAttachment":25,"./RegionAttachment":26,"./RotateTimeline":27,"./ScaleTimeline":28,"./ShearTimeline":29,"./Skeleton":30,"./SkeletonBounds":31,"./SkeletonData":32,"./SkeletonJsonParser":33,"./Skin.js":34,"./Slot":35,"./SlotData":36,"./TrackEntry":37,"./TransformConstraint":38,"./TransformConstraintData":39,"./TransformConstraintTimeline":40,"./TranslateTimeline":41,"./WeightedMeshAttachment":42}],44:[function(require,module,exports){
module.exports = {
    radDeg: 180 / Math.PI,
    degRad: Math.PI / 180,
    temp: [],
    Float32Array: (typeof(Float32Array) === 'undefined') ? Array : Float32Array,
    Uint16Array: (typeof(Uint16Array) === 'undefined') ? Array : Uint16Array,
    signum: function(x) {
        if (x>0) return 1;
        if (x<0) return -1;
        return 0;
    }
};


},{}],45:[function(require,module,exports){
var spine = require('../SpineRuntime');
var atlasParser = require('../loaders/atlasParser');

/* Esoteric Software SPINE wrapper for pixi.js */
spine.Bone.yDown = true;

/**
 * A class that enables the you to import and run your spine animations in pixi.
 * The Spine animation data needs to be loaded using either the Loader or a SpineLoader before it can be used by this class
 * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
 *
 * ```js
 * var spineAnimation = new PIXI.Spine(spineData);
 * ```
 *
 * @class
 * @extends Container
 * @memberof PIXI.spine
 * @param spineData {object} The spine data loaded from a spine atlas.
 */
function Spine(spineData)
{
    PIXI.Container.call(this);

    if (!spineData)
    {
        throw new Error('The spineData param is required.');
    }

    if ((typeof spineData) === "string")
    {
        throw new Error('spineData param cant be string. Please use PIXI.spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
    }

    /**
     * The spineData object
     *
     * @member {object}
     */
    this.spineData = spineData;

    /**
     * A spine Skeleton object
     *
     * @member {object}
     */
    this.skeleton = new spine.Skeleton(spineData);
    this.skeleton.updateWorldTransform();

    /**
     * A spine AnimationStateData object created from the spine data passed in the constructor
     *
     * @member {object}
     */
    this.stateData = new spine.AnimationStateData(spineData);

    /**
     * A spine AnimationState object created from the spine AnimationStateData object
     *
     * @member {object}
     */
    this.state = new spine.AnimationState(this.stateData);

    /**
     * An array of containers
     *
     * @member {Container[]}
     */
    this.slotContainers = [];

    for (var i = 0, n = this.skeleton.slots.length; i < n; i++)
    {
        var slot = this.skeleton.slots[i];
        var attachment = slot.attachment;
        var slotContainer = new PIXI.Container();
        this.slotContainers.push(slotContainer);
        this.addChild(slotContainer);

        if (attachment instanceof spine.RegionAttachment)
        {
            var spriteName = attachment.rendererObject.name;
            var sprite = this.createSprite(slot, attachment);
            slot.currentSprite = sprite;
            slot.currentSpriteName = spriteName;
            slotContainer.addChild(sprite);
        }
        else if (attachment instanceof spine.MeshAttachment)
        {
            var mesh = this.createMesh(slot, attachment);
            slot.currentMesh = mesh;
            slot.currentMeshName = attachment.name;
            slotContainer.addChild(mesh);
        }
        else
        {
            continue;
        }

    }

    /**
     * Should the Spine object update its transforms
     *
     * @member {boolean}
     */
    this.autoUpdate = true;
}

Spine.fromAtlas = function(resourceName) {
    var skeletonData = atlasParser.AnimCache[resourceName];

    if (!skeletonData)
    {
        throw new Error('Spine data "' + resourceName + '" does not exist in the animation cache');
    }

    return new Spine(skeletonData);
}

Spine.prototype = Object.create(PIXI.Container.prototype);
Spine.prototype.constructor = Spine;
module.exports = Spine;

Spine.globalAutoUpdate = true;

Object.defineProperties(Spine.prototype, {
    /**
     * If this flag is set to true, the spine animation will be autoupdated every time
     * the object id drawn. The down side of this approach is that the delta time is
     * automatically calculated and you could miss out on cool effects like slow motion,
     * pause, skip ahead and the sorts. Most of these effects can be achieved even with
     * autoupdate enabled but are harder to achieve.
     *
     * @member {boolean}
     * @memberof Spine#
     * @default true
     */
    autoUpdate: {
        get: function ()
        {
            return (this.updateTransform === Spine.prototype.autoUpdateTransform);
        },

        set: function (value)
        {
            this.updateTransform = value ? Spine.prototype.autoUpdateTransform : PIXI.Container.prototype.updateTransform;
        }
    }
});

/**
 * Update the spine skeleton and its animations by delta time (dt)
 *
 * @param dt {number} Delta time. Time by which the animation should be updated
 */
Spine.prototype.update = function (dt)
{
    this.state.update(dt);
    this.state.apply(this.skeleton);
    this.skeleton.updateWorldTransform();

    var drawOrder = this.skeleton.drawOrder;
    var slots = this.skeleton.slots;

    for (var i = 0, n = drawOrder.length; i < n; i++)
    {
        this.children[i] = this.slotContainers[drawOrder[i]];
    }

    for (i = 0, n = slots.length; i < n; i++)
    {
        var slot = slots[i];
        var attachment = slot.attachment;
        var slotContainer = this.slotContainers[i];

        if (!attachment)
        {
            slotContainer.visible = false;
            continue;
        }

        var type = attachment.type;
        if (type === spine.AttachmentType.region)
        {
            if (attachment.rendererObject)
            {
                if (!slot.currentSpriteName || slot.currentSpriteName !== attachment.rendererObject.name)
                {
                    var spriteName = attachment.rendererObject.name;
                    if (slot.currentSprite !== undefined)
                    {
                        slot.currentSprite.visible = false;
                    }
                    slot.sprites = slot.sprites || {};
                    if (slot.sprites[spriteName] !== undefined)
                    {
                        slot.sprites[spriteName].visible = true;
                    }
                    else
                    {
                        var sprite = this.createSprite(slot, attachment);
                        slotContainer.addChild(sprite);
                    }
                    slot.currentSprite = slot.sprites[spriteName];
                    slot.currentSpriteName = spriteName;
                }
            }

            if (slotContainer.transform ) {
                var transform = slotContainer.transform;
                var lt;
                if (slotContainer.transform.matrix2d) {
                    //gameofbombs pixi fork
                    lt = transform.matrix2d;
                    transform._dirtyVersion++;
                    transform.version = transform._dirtyVersion;
                    transform.isStatic = true;
                    transform.operMode = 0;
                } else
                if (PIXI.TransformManual) {
                    //PIXI v4.0
                    if (transform.position) {
                        transform = new PIXI.TransformManual();
                        slotContainer.transform = transform;
                    }
                    lt = transform.localTransform;
                } else {
                    //PIXI v4.0rc
                    if (!transform._dirtyLocal) {
                        transform = new PIXI.TransformStatic();
                        slotContainer.transform = transform;
                    }
                    lt = transform.localTransform;
                    transform._dirtyParentVersion = -1;
                    transform._dirtyLocal = 1;
                    transform._versionLocal = 1;
                }
                slot.bone.matrix.copy(lt);
                lt.tx += slot.bone.skeleton.x;
                lt.ty += slot.bone.skeleton.y;
            } else {
                //PIXI v3
                var lt = slotContainer.localTransform || new PIXI.Matrix();
                slot.bone.matrix.copy(lt);
                lt.tx += slot.bone.skeleton.x;
                lt.ty += slot.bone.skeleton.y;
                slotContainer.localTransform = lt;
                slotContainer.displayObjectUpdateTransform = SlotContainerUpdateTransformV3;
            }

            slot.currentSprite.blendMode = slot.blendMode;
            slot.currentSprite.tint = PIXI.utils.rgb2hex([slot.r * attachment.r, slot.g * attachment.g, slot.b * attachment.b]);
        }
        else if (type === spine.AttachmentType.skinnedmesh || type === spine.AttachmentType.mesh || type === spine.AttachmentType.linkedmesh)
        {
            if (!slot.currentMeshName || slot.currentMeshName !== attachment.name)
            {
                var meshName = attachment.name;
                if (slot.currentMesh !== undefined)
                {
                    slot.currentMesh.visible = false;
                }

                slot.meshes = slot.meshes || {};

                if (slot.meshes[meshName] !== undefined)
                {
                    slot.meshes[meshName].visible = true;
                }
                else
                {
                    var mesh = this.createMesh(slot, attachment);
                    slotContainer.addChild(mesh);
                }

                slot.currentMesh = slot.meshes[meshName];
                slot.currentMeshName = meshName;
            }
            attachment.computeWorldVertices(slot.bone.skeleton.x, slot.bone.skeleton.y, slot, slot.currentMesh.vertices);
            if (PIXI.VERSION[0] !== '3') {
                // PIXI version 4
                slot.currentMesh.dirty = true;
            }
        }
        else
        {
            slotContainer.visible = false;
            continue;
        }
        slotContainer.visible = true;

        slotContainer.alpha = slot.a;
    }
};

/**
 * When autoupdate is set to yes this function is used as pixi's updateTransform function
 *
 * @private
 */
Spine.prototype.autoUpdateTransform = function ()
{
    if (Spine.globalAutoUpdate) {
        this.lastTime = this.lastTime || Date.now();
        var timeDelta = (Date.now() - this.lastTime) * 0.001;
        this.lastTime = Date.now();
        this.update(timeDelta);
    } else {
        this.lastTime = 0;
    }

    PIXI.Container.prototype.updateTransform.call(this);
};

/**
 * Create a new sprite to be used with spine.RegionAttachment
 *
 * @param slot {spine.Slot} The slot to which the attachment is parented
 * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
 * @private
 */
Spine.prototype.createSprite = function (slot, attachment)
{
    var descriptor = attachment.rendererObject;
    var texture = descriptor.texture;
    var sprite = new PIXI.Sprite(texture);
    sprite.scale.x = attachment.scaleX * attachment.width / descriptor.originalWidth;
    sprite.scale.y = - attachment.scaleY * attachment.height / descriptor.originalHeight;
    sprite.rotation = attachment.rotation * spine.degRad;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.position.x = attachment.x;
    sprite.position.y = attachment.y;
    sprite.alpha = attachment.a;

    slot.sprites = slot.sprites || {};
    slot.sprites[descriptor.name] = sprite;
    return sprite;
};

/**
 * Creates a Strip from the spine data
 * @param slot {spine.Slot} The slot to which the attachment is parented
 * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
 * @private
 */
Spine.prototype.createMesh = function (slot, attachment)
{
    var descriptor = attachment.rendererObject;
    var baseTexture = descriptor.page.rendererObject;
    var texture = new PIXI.Texture(baseTexture);

    var strip = new PIXI.mesh.Mesh(
        texture,
        new Float32Array(attachment.uvs.length),
        new Float32Array(attachment.uvs),
        new Uint16Array(attachment.triangles),
        PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);

    strip.canvasPadding = 1.5;

    strip.alpha = attachment.a;

    slot.meshes = slot.meshes || {};
    slot.meshes[attachment.name] = strip;

    return strip;
};

/**
 * Changes texture in attachment in specific slot.
 *
 * PIXI runtime feature, it was made to satisfy our users.
 *
 * @param slotName {string}
 * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
 * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
 * @returns {boolean} Success flag
 */
Spine.prototype.hackTextureBySlotIndex = function(slotIndex, texture, size) {
    var slot = this.skeleton.slots[slotIndex];
    if (!slot) {
        return false;
    }
    var attachment = slot.attachment;
    if (!attachment || !attachment.hackRegion) {
        return false;
    }
    var region = null;
    if (texture) {
        region = new spine.AtlasRegion();
        region.texture = texture;
        region.size = size;
    }

    attachment.hackRegion(region);
    var descriptor = attachment.rendererObject;
    if (slot.currentSprite) {
        var sprite = slot.currentSprite;
        sprite.texture = descriptor.texture;
        sprite.scale.x = attachment.width / descriptor.originalWidth;
        sprite.scale.y = - attachment.height / descriptor.originalHeight;
    }
    if (slot.currentMesh) {
        var mesh = slot.currentMesh;
        mesh.texture = descriptor.texture;
        for (var i = 0; i < attachment.uvs.length; i++) {
            mesh.uvs[i] = attachment.uvs[i];
        }
        if (PIXI.VERSION[0] !== '3') {
            // PIXI version 4
            mesh.indexDirty = true;
        } else {
            // PIXI version 3
            mesh.dirty = true;
        }
    }
    return true;
};

/**
 * Changes texture in attachment in specific slot.
 *
 * PIXI runtime feature, it was made to satisfy our users.
 *
 * @param slotName {string}
 * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
 * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
 * @returns {boolean} Success flag
 */
Spine.prototype.hackTextureBySlotName = function(slotName, texture, size) {
    var index = this.skeleton.findSlotIndex(slotName);
    if (index == -1) {
        return false;
    }
    return this.hackTextureBySlotIndex(index,texture, size);
};

function SlotContainerUpdateTransformV3()
{
    var pt = this.parent.worldTransform;
    var wt = this.worldTransform;
    var lt = this.localTransform;
    wt.a  = lt.a  * pt.a + lt.b  * pt.c;
    wt.b  = lt.a  * pt.b + lt.b  * pt.d;
    wt.c  = lt.c  * pt.a + lt.d  * pt.c;
    wt.d  = lt.c  * pt.b + lt.d  * pt.d;
    wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
    wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
    this._currentBounds = null;
};

},{"../SpineRuntime":43,"../loaders/atlasParser":47}],46:[function(require,module,exports){
/**
 * @file        Spine resource loader
 * @author      Ivan Popelyshev <ivan.popelyshev@gmail.com>
 * @copyright   2013-2015 GoodBoyDigital
 * @license     {@link https://github.com/GoodBoyDigital/pixi.js/blob/master/LICENSE|MIT License}
 */

/**
 * @namespace PIXI.loaders
 */

var atlasParser = require('./atlasParser');

PIXI.loaders.Loader.addPixiMiddleware(atlasParser);
PIXI.loader.use(atlasParser());

},{"./atlasParser":47}],47:[function(require,module,exports){
var Resource = PIXI.loaders.Resource,
    spine = require('../SpineRuntime'),
    imageLoaderAdapter = require('./imageLoaderAdapter');

var atlasParser = module.exports = function () {
    return function (resource, next) {
        // skip if no data, its not json, or it isn't atlas data
        if (!resource.data || !resource.isJson || !resource.data.bones) {
            return next();
        }

        var metadataAtlas = resource.metadata ? resource.metadata.spineAtlas: null;
        if (metadataAtlas === false) {
            return next();
        }
        if (metadataAtlas && metadataAtlas.pages) {
            //its an atlas!
            var spineJsonParser = new spine.SkeletonJsonParser(new spine.AtlasAttachmentParser(metadataAtlas));
            var skeletonData = spineJsonParser.readSkeletonData(resource.data);

            resource.spineData = skeletonData;
            resource.spineAtlas = metadataAtlas;
            if (atlasParser.enableCaching) {
                atlasParser.AnimCache[resource.name] = resource.spineData;
            }

            return next();
        }

        var metadataAtlasSuffix = '.atlas';
        if (resource.metadata && resource.metadata.spineAtlasSuffix) {
            metadataAtlasSuffix = resource.metadata.spineAtlasSuffix;
        }

        /**
         * use a bit of hackery to load the atlas file, here we assume that the .json, .atlas and .png files
         * that correspond to the spine file are in the same base URL and that the .json and .atlas files
         * have the same name
         */
        var atlasPath = resource.url.substr(0, resource.url.lastIndexOf('.')) + metadataAtlasSuffix;
        //remove the baseUrl
        atlasPath = atlasPath.replace(this.baseUrl, '');

        var atlasOptions = {
            crossOrigin: resource.crossOrigin,
            xhrType: Resource.XHR_RESPONSE_TYPE.TEXT,
            metadata: resource.metadata ? resource.metadata.spineMetadata : null
        };
        var imageOptions = {
            crossOrigin: resource.crossOrigin,
            metadata: resource.metadata ? resource.metadata.imageMetadata: null
        };
        var baseUrl = resource.url.substr(0, resource.url.lastIndexOf('/') + 1);
        //remove the baseUrl
        baseUrl = baseUrl.replace(this.baseUrl, '');

        var adapter = imageLoaderAdapter(this, resource.name + '_atlas_page_', baseUrl, imageOptions);

        this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (res) {
            new spine.Atlas(this.xhr.responseText, adapter, function(spineAtlas) {
                var spineJsonParser = new spine.SkeletonJsonParser(new spine.AtlasAttachmentParser(spineAtlas));
                var skeletonData = spineJsonParser.readSkeletonData(resource.data);

                resource.spineData = skeletonData;
                resource.spineAtlas = spineAtlas;
                if (atlasParser.enableCaching) {
                    atlasParser.AnimCache[resource.name] = resource.spineData;
                }

                next();
            });
        });
    };
};

atlasParser.AnimCache = {};
atlasParser.enableCaching = false;

},{"../SpineRuntime":43,"./imageLoaderAdapter":48}],48:[function(require,module,exports){
var spine = require('../SpineRuntime');

module.exports = function (loader, namePrefix, baseUrl, imageOptions) {
    if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length-1))
    {
        baseUrl += '/';
    }
    return function(line, callback) {
        var name = namePrefix + line;
        var url = baseUrl + line;
        loader.add(name, url, imageOptions, function(resource) {
            callback(resource.texture.baseTexture);
        });
    }
};

},{"../SpineRuntime":43}],49:[function(require,module,exports){
module.exports = {
    atlasParser: require('./atlasParser'),
    Loader: require('./Loader'),
    syncImageLoaderAdapter: require('./syncImageLoaderAdapter'),
    imageLoaderAdapter: require('./imageLoaderAdapter')
};

},{"./Loader":46,"./atlasParser":47,"./imageLoaderAdapter":48,"./syncImageLoaderAdapter":50}],50:[function(require,module,exports){
var spine = require('../SpineRuntime');

module.exports = function (baseUrl, crossOrigin) {
    if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length-1))
    {
        baseUrl += '/';
    }
    return function(line, callback) {
        callback(PIXI.BaseTexture.fromImage(line, crossOrigin));
    }
};

},{"../SpineRuntime":43}]},{},[1])


/*!
 * VERSION: 1.18.0
 * DATE: 2015-09-05
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},r=function(t,e,i){var s,r,n=t.cycle;for(s in n)r=n[s],t[s]="function"==typeof r?r.call(e[i],i):r[i%r.length];delete t.cycle},n=function(t,e,s){i.call(this,t,e,s),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=n.prototype.render},a=1e-10,o=i._internals,l=o.isSelector,h=o.isArray,_=n.prototype=i.to({},.1,{}),u=[];n.version="1.18.0",_.constructor=n,_.kill()._gc=!1,n.killTweensOf=n.killDelayedCallsTo=i.killTweensOf,n.getTweensOf=i.getTweensOf,n.lagSmoothing=i.lagSmoothing,n.ticker=i.ticker,n.render=i.render,_.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},_.updateTo=function(t,e){var s,r=this.ratio,n=this.vars.immediateRender||t.immediateRender;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(s in t)this.vars[s]=t[s];if(this._initted||n)if(e)this._initted=!1,n&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var a=this._time;this.render(0,!0,!1),this._initted=!1,this.render(a,!0,!1)}else if(this._time>0||n){this._initted=!1,this._init();for(var o,l=1/(1-r),h=this._firstPT;h;)o=h.s+h.c,h.c*=l,h.s=o-h.c,h=h._next}return this},_.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var s,r,n,l,h,_,u,c,f=this._dirty?this.totalDuration():this._totalDuration,p=this._time,m=this._totalTime,d=this._cycle,g=this._duration,v=this._rawPrevTime;if(t>=f?(this._totalTime=f,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=g,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===g&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>v||v===a)&&v!==t&&(i=!0,v>a&&(r="onReverseComplete")),this._rawPrevTime=c=!e||t||v===t?t:a)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==m||0===g&&v>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===g&&(this._initted||!this.vars.lazy||i)&&(v>=0&&(i=!0),this._rawPrevTime=c=!e||t||v===t?t:a)),this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(l=g+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=g-this._time),this._time>g?this._time=g:0>this._time&&(this._time=0)),this._easeType?(h=this._time/g,_=this._easeType,u=this._easePower,(1===_||3===_&&h>=.5)&&(h=1-h),3===_&&(h*=2),1===u?h*=h:2===u?h*=h*h:3===u?h*=h*h*h:4===u&&(h*=h*h*h*h),this.ratio=1===_?1-h:2===_?h:.5>this._time/g?h/2:1-h/2):this.ratio=this._ease.getRatio(this._time/g)),p===this._time&&!i&&d===this._cycle)return m!==this._totalTime&&this._onUpdate&&(e||this._callback("onUpdate")),void 0;if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=p,this._totalTime=m,this._rawPrevTime=v,this._cycle=d,o.lazyTweens.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/g):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==p&&t>=0&&(this._active=!0),0===m&&(2===this._initted&&t>0&&this._init(),this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===g)&&(e||this._callback("onStart"))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==m||s)&&this._callback("onUpdate")),this._cycle!==d&&(e||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this._callback(r),0===g&&this._rawPrevTime===a&&c!==a&&(this._rawPrevTime=0))},n.to=function(t,e,i){return new n(t,e,i)},n.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new n(t,e,i)},n.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new n(t,e,s)},n.staggerTo=n.allTo=function(t,e,a,o,_,c,f){o=o||0;var p,m,d,g,v=a.delay||0,y=[],T=function(){a.onComplete&&a.onComplete.apply(a.onCompleteScope||this,arguments),_.apply(f||a.callbackScope||this,c||u)},x=a.cycle,w=a.startAt&&a.startAt.cycle;for(h(t)||("string"==typeof t&&(t=i.selector(t)||t),l(t)&&(t=s(t))),t=t||[],0>o&&(t=s(t),t.reverse(),o*=-1),p=t.length-1,d=0;p>=d;d++){m={};for(g in a)m[g]=a[g];if(x&&r(m,t,d),w){w=m.startAt={};for(g in a.startAt)w[g]=a.startAt[g];r(m.startAt,t,d)}m.delay=v,d===p&&_&&(m.onComplete=T),y[d]=new n(t[d],e,m),v+=o}return y},n.staggerFrom=n.allFrom=function(t,e,i,s,r,a,o){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,n.staggerTo(t,e,i,s,r,a,o)},n.staggerFromTo=n.allFromTo=function(t,e,i,s,r,a,o,l){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,n.staggerTo(t,e,s,r,a,o,l)},n.delayedCall=function(t,e,i,s,r){return new n(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:s,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,useFrames:r,overwrite:0})},n.set=function(t,e){return new n(t,0,e)},n.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var c=function(t,e){for(var s=[],r=0,n=t._first;n;)n instanceof i?s[r++]=n:(e&&(s[r++]=n),s=s.concat(c(n,e)),r=s.length),n=n._next;return s},f=n.getAllTweens=function(e){return c(t._rootTimeline,e).concat(c(t._rootFramesTimeline,e))};n.killAll=function(t,i,s,r){null==i&&(i=!0),null==s&&(s=!0);var n,a,o,l=f(0!=r),h=l.length,_=i&&s&&r;for(o=0;h>o;o++)a=l[o],(_||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&(t?a.totalTime(a._reversed?0:a.totalDuration()):a._enabled(!1,!1))},n.killChildTweensOf=function(t,e){if(null!=t){var r,a,_,u,c,f=o.tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),l(t)&&(t=s(t)),h(t))for(u=t.length;--u>-1;)n.killChildTweensOf(t[u],e);else{r=[];for(_ in f)for(a=f[_].target.parentNode;a;)a===t&&(r=r.concat(f[_].tweens)),a=a.parentNode;for(c=r.length,u=0;c>u;u++)e&&r[u].totalTime(r[u].totalDuration()),r[u]._enabled(!1,!1)}}};var p=function(t,i,s,r){i=i!==!1,s=s!==!1,r=r!==!1;for(var n,a,o=f(r),l=i&&s&&r,h=o.length;--h>-1;)a=o[h],(l||a instanceof e||(n=a.target===a.vars.onComplete)&&s||i&&!n)&&a.paused(t)};return n.pauseAll=function(t,e,i){p(!0,t,e,i)},n.resumeAll=function(t,e,i){p(!1,t,e,i)},n.globalTimeScale=function(e){var s=t._rootTimeline,r=i.ticker.time;return arguments.length?(e=e||a,s._startTime=r-(r-s._startTime)*s._timeScale/e,s=t._rootFramesTimeline,r=i.ticker.frame,s._startTime=r-(r-s._startTime)*s._timeScale/e,s._timeScale=t._rootTimeline._timeScale=e,e):s._timeScale},_.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},_.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},_.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},_.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},_.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},_.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},_.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},_.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},n},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],l(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));l(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,l=n.isArray,h=n.lazyTweens,_=n.lazyRender,u=_gsScope._gsDefine.globals,c=function(t){var e,i={};for(e in t)i[e]=t[e];return i},f=function(t,e,i){var s,r,n=t.cycle;for(s in n)r=n[s],t[s]="function"==typeof r?r.call(e[i],i):r[i%r.length];delete t.cycle},p=a.pauseCallback=function(){},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.18.0",d.constructor=s,d.kill()._gc=d._forcingPlayhead=d._hasPause=!1,d.to=function(t,e,s,r){var n=s.repeat&&u.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&u.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&u.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,l,h,_){var u,p,d=new s({onComplete:l,onCompleteParams:h,callbackScope:_,smoothChildTiming:this.smoothChildTiming}),g=r.cycle;for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),p=0;t.length>p;p++)u=c(r),u.startAt&&(u.startAt=c(u.startAt),u.startAt.cycle&&f(u.startAt,t,p)),g&&f(u,t,p),d.to(t[p],e,u,p*n);return this.add(d,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,l){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,l)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var h,_,u,c,f,p;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&l(r)){for(a=a||"normal",o=o||0,h=n,_=r.length,u=0;_>u;u++)l(c=r[u])&&(c=new s({tweens:c})),this.add(c,h),"string"!=typeof c&&"function"!=typeof c&&("sequence"===a?h=c._startTime+c.totalDuration()/c._timeScale:"start"===a&&(c._startTime-=c.delay())),h+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(f=this,p=f.rawTime()>r._startTime;f._timeline;)p&&f._timeline.smoothChildTiming?f.totalTime(f._totalTime,!0):f._gc&&f._enabled(!0,!1),f=f._timeline;return this},d.remove=function(e){if(e instanceof t){this._remove(e,!1);var i=e._timeline=e.vars.useFrames?t._rootFramesTimeline:t._rootTimeline;return e._startTime=(e._paused?e._pauseTime:i._time)-(e._reversed?e.totalDuration()-e._totalTime:e._totalTime)/e._timeScale,this}if(e instanceof Array||e&&e.push&&l(e)){for(var s=e.length;--s>-1;)this.remove(e[s]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,p,s,r||this);return n.vars.onComplete=n.vars.onReverseComplete=e,n.data="isPause",this._hasPause=!0,this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&l(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,l,u,c=this._dirty?this.totalDuration():this._totalDuration,f=this._time,p=this._startTime,m=this._timeScale,d=this._paused;if(t>=c)this._totalTime=this._time=c,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",l=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(l=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=c+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==f||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(l=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(l=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(l=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!e){if(t>=f)for(s=this._first;s&&t>=s._startTime&&!u;)s._duration||"isPause"!==s.data||s.ratio||0===s._startTime&&0===this._rawPrevTime||(u=s),s=s._next;else for(s=this._last;s&&s._startTime>=t&&!u;)s._duration||"isPause"===s.data&&s._rawPrevTime>0&&(u=s),s=s._prev;u&&(this._time=t=u._startTime,this._totalTime=t+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=t}if(this._time!==f&&this._first||i||l||u){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==f&&t>0&&(this._active=!0),0===f&&this.vars.onStart&&0!==this._time&&(e||this._callback("onStart")),this._time>=f)for(s=this._first;s&&(a=s._next,!this._paused||d);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(u===s&&this.pause(),s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||d);){if(s._active||f>=s._startTime&&!s._paused&&!s._gc){if(u===s){for(u=s._prev;u&&u.endTime()>this._time;)u.render(u._reversed?u.totalDuration()-(t-u._startTime)*u._timeScale:(t-u._startTime)*u._timeScale,e,i),u=u._prev;u=null,this.pause()}s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)}s=a}this._onUpdate&&(e||(h.length&&_(),this._callback("onUpdate"))),o&&(this._gc||(p===this._startTime||m!==this._timeScale)&&(0===this._time||c>=this.totalDuration())&&(n&&(h.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this._callback(o)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var s=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},r=1e-10,n=e._internals,a=n.lazyTweens,o=n.lazyRender,l=new i(null,null,1,0),h=s.prototype=new t;return h.constructor=s,h.kill()._gc=!1,s.version="1.18.0",h.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},h.addCallback=function(t,i,s,r){return this.add(e.delayedCall(0,t,s,r),i)},h.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),s=i.length,r=this._parseTimeOrLabel(e);--s>-1;)i[s]._startTime===r&&i[s]._enabled(!1,!1);return this},h.removePause=function(e){return this.removeCallback(t._internals.pauseCallback,e)},h.tweenTo=function(t,i){i=i||{};var s,r,n,a={ease:l,useFrames:this.usesFrames(),immediateRender:!1};for(r in i)a[r]=i[r];return a.time=this._parseTimeOrLabel(t),s=Math.abs(Number(a.time)-this._time)/this._timeScale||.001,n=new e(this,s,a),a.onStart=function(){n.target.paused(!0),n.vars.time!==n.target.time()&&s===n.duration()&&n.duration(Math.abs(n.vars.time-n.target.time())/n.target._timeScale),i.onStart&&n._callback("onStart")},n},h.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],callbackScope:this},i.immediateRender=i.immediateRender!==!1;var s=this.tweenTo(e,i);return s.duration(Math.abs(s.vars.time-t)/this._timeScale||.001)},h.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,l,h,_,u,c,f=this._dirty?this.totalDuration():this._totalDuration,p=this._duration,m=this._time,d=this._totalTime,g=this._startTime,v=this._timeScale,y=this._rawPrevTime,T=this._paused,x=this._cycle;if(t>=f)this._locked||(this._totalTime=f,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(n=!0,h="onComplete",_=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>y||y===r)&&y!==t&&this._first&&(_=!0,y>r&&(h="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=p,t=p+1e-4);else if(1e-7>t)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==m||0===p&&y!==r&&(y>0||0>t&&y>=0)&&!this._locked)&&(h="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(_=n=!0,h="onReverseComplete"):y>=0&&this._first&&(_=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=p||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(_=!0)}else if(0===p&&0>y&&(_=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(u=p+this._repeatDelay,this._cycle=this._totalTime/u>>0,0!==this._cycle&&this._cycle===this._totalTime/u&&this._cycle--,this._time=this._totalTime-this._cycle*u,this._yoyo&&0!==(1&this._cycle)&&(this._time=p-this._time),this._time>p?(this._time=p,t=p+1e-4):0>this._time?this._time=t=0:t=this._time)),this._hasPause&&!this._forcingPlayhead&&!e){if(t=this._time,t>=m)for(s=this._first;s&&t>=s._startTime&&!c;)s._duration||"isPause"!==s.data||s.ratio||0===s._startTime&&0===this._rawPrevTime||(c=s),s=s._next;else for(s=this._last;s&&s._startTime>=t&&!c;)s._duration||"isPause"===s.data&&s._rawPrevTime>0&&(c=s),s=s._prev;c&&(this._time=t=c._startTime,this._totalTime=t+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==x&&!this._locked){var w=this._yoyo&&0!==(1&x),b=w===(this._yoyo&&0!==(1&this._cycle)),P=this._totalTime,k=this._cycle,S=this._rawPrevTime,R=this._time;if(this._totalTime=x*p,x>this._cycle?w=!w:this._totalTime+=p,this._time=m,this._rawPrevTime=0===p?y-1e-4:y,this._cycle=x,this._locked=!0,m=w?0:p,this.render(m,e,0===p),e||this._gc||this.vars.onRepeat&&this._callback("onRepeat"),b&&(m=w?p+1e-4:-1e-4,this.render(m,!0,!1)),this._locked=!1,this._paused&&!T)return;this._time=R,this._totalTime=P,this._cycle=k,this._rawPrevTime=S}if(!(this._time!==m&&this._first||i||_||c))return d!==this._totalTime&&this._onUpdate&&(e||this._callback("onUpdate")),void 0;if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==d&&t>0&&(this._active=!0),0===d&&this.vars.onStart&&0!==this._totalTime&&(e||this._callback("onStart")),this._time>=m)for(s=this._first;s&&(l=s._next,!this._paused||T);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(c===s&&this.pause(),s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=l;else for(s=this._last;s&&(l=s._prev,!this._paused||T);){if(s._active||m>=s._startTime&&!s._paused&&!s._gc){if(c===s){for(c=s._prev;c&&c.endTime()>this._time;)c.render(c._reversed?c.totalDuration()-(t-c._startTime)*c._timeScale:(t-c._startTime)*c._timeScale,e,i),c=c._prev;c=null,this.pause()}s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)}s=l}this._onUpdate&&(e||(a.length&&o(),this._callback("onUpdate"))),h&&(this._locked||this._gc||(g===this._startTime||v!==this._timeScale)&&(0===this._time||f>=this.totalDuration())&&(n&&(a.length&&o(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[h]&&this._callback(h)))},h.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var s,r,n=[],a=this.getChildren(t,e,i),o=0,l=a.length;for(s=0;l>s;s++)r=a[s],r.isActive()&&(n[o++]=r);return n},h.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),s=i.length;for(e=0;s>e;e++)if(i[e].time>t)return i[e].name;return null},h.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(t>e[i].time)return e[i].name;return null},h.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},h.progress=function(t,e){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),e):this._time/this.duration()},h.totalProgress=function(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this._totalTime/this.totalDuration()},h.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},h.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},h.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},h.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},h.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},h.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},s},!0),function(){var t=180/Math.PI,e=[],i=[],s=[],r={},n=_gsScope._gsDefine.globals,a=function(t,e,i,s){this.a=t,this.b=e,this.c=i,this.d=s,this.da=s-t,this.ca=i-t,this.ba=e-t},o=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",l=function(t,e,i,s){var r={a:t},n={},a={},o={c:s},l=(t+e)/2,h=(e+i)/2,_=(i+s)/2,u=(l+h)/2,c=(h+_)/2,f=(c-u)/8;return r.b=l+(t-l)/4,n.b=u+f,r.c=n.a=(r.b+n.b)/2,n.c=a.a=(u+c)/2,a.b=c-f,o.b=_+(s-_)/4,a.c=o.a=(a.b+o.b)/2,[r,n,a,o]},h=function(t,r,n,a,o){var h,_,u,c,f,p,m,d,g,v,y,T,x,w=t.length-1,b=0,P=t[0].a;for(h=0;w>h;h++)f=t[b],_=f.a,u=f.d,c=t[b+1].d,o?(y=e[h],T=i[h],x=.25*(T+y)*r/(a?.5:s[h]||.5),p=u-(u-_)*(a?.5*r:0!==y?x/y:0),m=u+(c-u)*(a?.5*r:0!==T?x/T:0),d=u-(p+((m-p)*(3*y/(y+T)+.5)/4||0))):(p=u-.5*(u-_)*r,m=u+.5*(c-u)*r,d=u-(p+m)/2),p+=d,m+=d,f.c=g=p,f.b=0!==h?P:P=f.a+.6*(f.c-f.a),f.da=u-_,f.ca=g-_,f.ba=P-_,n?(v=l(_,P,g,u),t.splice(b,1,v[0],v[1],v[2],v[3]),b+=4):b++,P=m;f=t[b],f.b=P,f.c=P+.4*(f.d-P),f.da=f.d-f.a,f.ca=f.c-f.a,f.ba=P-f.a,n&&(v=l(f.a,P,f.c,f.d),t.splice(b,1,v[0],v[1],v[2],v[3]))},_=function(t,s,r,n){var o,l,h,_,u,c,f=[];if(n)for(t=[n].concat(t),l=t.length;--l>-1;)"string"==typeof(c=t[l][s])&&"="===c.charAt(1)&&(t[l][s]=n[s]+Number(c.charAt(0)+c.substr(2)));if(o=t.length-2,0>o)return f[0]=new a(t[0][s],0,0,t[-1>o?0:1][s]),f;for(l=0;o>l;l++)h=t[l][s],_=t[l+1][s],f[l]=new a(h,0,0,_),r&&(u=t[l+2][s],e[l]=(e[l]||0)+(_-h)*(_-h),i[l]=(i[l]||0)+(u-_)*(u-_));return f[l]=new a(t[l][s],0,0,t[l+1][s]),f},u=function(t,n,a,l,u,c){var f,p,m,d,g,v,y,T,x={},w=[],b=c||t[0];u="string"==typeof u?","+u+",":o,null==n&&(n=1);for(p in t[0])w.push(p);if(t.length>1){for(T=t[t.length-1],y=!0,f=w.length;--f>-1;)if(p=w[f],Math.abs(b[p]-T[p])>.05){y=!1;break}y&&(t=t.concat(),c&&t.unshift(c),t.push(t[1]),c=t[t.length-3])}for(e.length=i.length=s.length=0,f=w.length;--f>-1;)p=w[f],r[p]=-1!==u.indexOf(","+p+","),x[p]=_(t,p,r[p],c);for(f=e.length;--f>-1;)e[f]=Math.sqrt(e[f]),i[f]=Math.sqrt(i[f]);if(!l){for(f=w.length;--f>-1;)if(r[p])for(m=x[w[f]],v=m.length-1,d=0;v>d;d++)g=m[d+1].da/i[d]+m[d].da/e[d],s[d]=(s[d]||0)+g*g;for(f=s.length;--f>-1;)s[f]=Math.sqrt(s[f])}for(f=w.length,d=a?4:1;--f>-1;)p=w[f],m=x[p],h(m,n,a,l,r[p]),y&&(m.splice(0,d),m.splice(m.length-d,d));return x},c=function(t,e,i){e=e||"soft";var s,r,n,o,l,h,_,u,c,f,p,m={},d="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||d+1>t.length)throw"invalid Bezier data";for(c in t[0])v.push(c);for(h=v.length;--h>-1;){for(c=v[h],m[c]=l=[],f=0,u=t.length,_=0;u>_;_++)s=null==i?t[_][c]:"string"==typeof(p=t[_][c])&&"="===p.charAt(1)?i[c]+Number(p.charAt(0)+p.substr(2)):Number(p),g&&_>1&&u-1>_&&(l[f++]=(s+l[f-2])/2),l[f++]=s;for(u=f-d+1,f=0,_=0;u>_;_+=d)s=l[_],r=l[_+1],n=l[_+2],o=2===d?0:l[_+3],l[f++]=p=3===d?new a(s,r,n,o):new a(s,(2*r+s)/3,(2*r+n)/3,n);l.length=f}return m},f=function(t,e,i){for(var s,r,n,a,o,l,h,_,u,c,f,p=1/i,m=t.length;--m>-1;)for(c=t[m],n=c.a,a=c.d-n,o=c.c-n,l=c.b-n,s=r=0,_=1;i>=_;_++)h=p*_,u=1-h,s=r-(r=(h*h*a+3*u*(h*o+u*l))*h),f=m*i+_-1,e[f]=(e[f]||0)+s*s},p=function(t,e){e=e>>0||6;var i,s,r,n,a=[],o=[],l=0,h=0,_=e-1,u=[],c=[];for(i in t)f(t[i],a,e);for(r=a.length,s=0;r>s;s++)l+=Math.sqrt(a[s]),n=s%e,c[n]=l,n===_&&(h+=l,n=s/e>>0,u[n]=c,o[n]=h,l=0,c=[]);return{length:h,lengths:o,segments:u}},m=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var s,r,n,a,o,l=e.values||[],h={},_=l[0],f=e.autoRotate||i.vars.orientToBezier;this._autoRotate=f?f instanceof Array?f:[["x","y","rotation",f===!0?0:Number(f)||0]]:null;
for(s in _)this._props.push(s);for(n=this._props.length;--n>-1;)s=this._props[n],this._overwriteProps.push(s),r=this._func[s]="function"==typeof t[s],h[s]=r?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]():parseFloat(t[s]),o||h[s]!==l[0][s]&&(o=h);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?u(l,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,o):c(l,e.type,h),this._segCount=this._beziers[s].length,this._timeRes){var m=p(this._beziers,this._timeRes);this._length=m.length,this._lengths=m.lengths,this._segments=m.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(f=this._autoRotate)for(this._initialRotations=[],f[0]instanceof Array||(this._autoRotate=f=[f]),n=f.length;--n>-1;){for(a=0;3>a;a++)s=f[n][a],this._func[s]="function"==typeof t[s]?t[s.indexOf("set")||"function"!=typeof t["get"+s.substr(3)]?s:"get"+s.substr(3)]:!1;s=f[n][2],this._initialRotations[n]=this._func[s]?this._func[s].call(this._target):this._target[s]}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(e){var i,s,r,n,a,o,l,h,_,u,c=this._segCount,f=this._func,p=this._target,m=e!==this._startRatio;if(this._timeRes){if(_=this._lengths,u=this._curSeg,e*=this._length,r=this._li,e>this._l2&&c-1>r){for(h=c-1;h>r&&e>=(this._l2=_[++r]););this._l1=_[r-1],this._li=r,this._curSeg=u=this._segments[r],this._s2=u[this._s1=this._si=0]}else if(this._l1>e&&r>0){for(;r>0&&(this._l1=_[--r])>=e;);0===r&&this._l1>e?this._l1=0:r++,this._l2=_[r],this._li=r,this._curSeg=u=this._segments[r],this._s1=u[(this._si=u.length-1)-1]||0,this._s2=u[this._si]}if(i=r,e-=this._l1,r=this._si,e>this._s2&&u.length-1>r){for(h=u.length-1;h>r&&e>=(this._s2=u[++r]););this._s1=u[r-1],this._si=r}else if(this._s1>e&&r>0){for(;r>0&&(this._s1=u[--r])>=e;);0===r&&this._s1>e?this._s1=0:r++,this._s2=u[r],this._si=r}o=(r+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?c-1:c*e>>0,o=(e-i*(1/c))*c;for(s=1-o,r=this._props.length;--r>-1;)n=this._props[r],a=this._beziers[n][i],l=(o*o*a.da+3*s*(o*a.ca+s*a.ba))*o+a.a,this._round[n]&&(l=Math.round(l)),f[n]?p[n](l):p[n]=l;if(this._autoRotate){var d,g,v,y,T,x,w,b=this._autoRotate;for(r=b.length;--r>-1;)n=b[r][2],x=b[r][3]||0,w=b[r][4]===!0?1:t,a=this._beziers[b[r][0]],d=this._beziers[b[r][1]],a&&d&&(a=a[i],d=d[i],g=a.a+(a.b-a.a)*o,y=a.b+(a.c-a.b)*o,g+=(y-g)*o,y+=(a.c+(a.d-a.c)*o-y)*o,v=d.a+(d.b-d.a)*o,T=d.b+(d.c-d.b)*o,v+=(T-v)*o,T+=(d.c+(d.d-d.c)*o-T)*o,l=m?Math.atan2(T-v,y-g)*w+x:this._initialRotations[r],f[n]?p[n](l):p[n]=l)}}}),d=m.prototype;m.bezierThrough=u,m.cubicToQuadratic=l,m._autoCSS=!0,m.quadraticToCubic=function(t,e,i){return new a(t,(2*e+t)/3,(2*e+i)/3,i)},m._cssRegister=function(){var t=n.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,s=e._setPluginRatio,r=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,n,a,o,l){e instanceof Array&&(e={values:e}),l=new m;var h,_,u,c=e.values,f=c.length-1,p=[],d={};if(0>f)return o;for(h=0;f>=h;h++)u=i(t,c[h],a,o,l,f!==h),p[h]=u.end;for(_ in e)d[_]=e[_];return d.values=p,o=new r(t,"bezier",0,0,u.pt,2),o.data=u,o.plugin=l,o.setRatio=s,0===d.autoRotate&&(d.autoRotate=!0),!d.autoRotate||d.autoRotate instanceof Array||(h=d.autoRotate===!0?0:Number(d.autoRotate),d.autoRotate=null!=u.end.left?[["left","top","rotation",h,!1]]:null!=u.end.x?[["x","y","rotation",h,!1]]:!1),d.autoRotate&&(a._transform||a._enableTransforms(!1),u.autoRotate=a._target._gsTransform),l._onInitTween(u.proxy,d,a._tween),o}})}},d._roundProps=function(t,e){for(var i=this._overwriteProps,s=i.length;--s>-1;)(t[i[s]]||t.bezier||t.bezierThrough)&&(this._round[i[s]]=e)},d._kill=function(t){var e,i,s=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=s.length;--i>-1;)s[i]===e&&s.splice(i,1);return this._super._kill.call(this,t)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,s,r,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o=_gsScope._gsDefine.globals,l={},h=a.prototype=new t("css");h.constructor=a,a.version="1.18.0",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",a.defaultSmoothOrigin=!0,h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var _,u,c,f,p,m,d=/(?:\d|\-\d|\.\d|\-\.\d)+/g,g=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,v=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,y=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,T=/(?:\d|\-|\+|=|#|\.)*/g,x=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,b=/alpha\(opacity *=.+?\)/i,P=/^(rgb|hsl)/,k=/([A-Z])/g,S=/-([a-z])/gi,R=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,O=function(t,e){return e.toUpperCase()},A=/(?:Left|Right|Width)/i,C=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,D=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,M=/,(?=[^\)]*(?:\(|$))/gi,z=Math.PI/180,F=180/Math.PI,I={},E=document,N=function(t){return E.createElementNS?E.createElementNS("http://www.w3.org/1999/xhtml",t):E.createElement(t)},L=N("div"),X=N("img"),B=a._internals={_specialProps:l},j=navigator.userAgent,Y=function(){var t=j.indexOf("Android"),e=N("a");return c=-1!==j.indexOf("Safari")&&-1===j.indexOf("Chrome")&&(-1===t||Number(j.substr(t+8,1))>3),p=c&&6>Number(j.substr(j.indexOf("Version/")+8,1)),f=-1!==j.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(j)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(j))&&(m=parseFloat(RegExp.$1)),e?(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity)):!1}(),U=function(t){return x.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},q=function(t){window.console&&console.log(t)},V="",G="",W=function(t,e){e=e||L;var i,s,r=e.style;if(void 0!==r[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],s=5;--s>-1&&void 0===r[i[s]+t];);return s>=0?(G=3===s?"ms":i[s],V="-"+G.toLowerCase()+"-",G+t):null},Z=E.defaultView?E.defaultView.getComputedStyle:function(){},Q=a.getStyle=function(t,e,i,s,r){var n;return Y||"opacity"!==e?(!s&&t.style[e]?n=t.style[e]:(i=i||Z(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(k,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==r||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:r):U(t)},$=B.convertToPixels=function(t,i,s,r,n){if("px"===r||!r)return s;if("auto"===r||!s)return 0;var o,l,h,_=A.test(i),u=t,c=L.style,f=0>s;if(f&&(s=-s),"%"===r&&-1!==i.indexOf("border"))o=s/100*(_?t.clientWidth:t.clientHeight);else{if(c.cssText="border:0 solid red;position:"+Q(t,"position")+";line-height:0;","%"!==r&&u.appendChild&&"v"!==r.charAt(0)&&"rem"!==r)c[_?"borderLeftWidth":"borderTopWidth"]=s+r;else{if(u=t.parentNode||E.body,l=u._gsCache,h=e.ticker.frame,l&&_&&l.time===h)return l.width*s/100;c[_?"width":"height"]=s+r}u.appendChild(L),o=parseFloat(L[_?"offsetWidth":"offsetHeight"]),u.removeChild(L),_&&"%"===r&&a.cacheWidths!==!1&&(l=u._gsCache=u._gsCache||{},l.time=h,l.width=100*(o/s)),0!==o||n||(o=$(t,i,s,r,!0))}return f?-o:o},H=B.calculateOffset=function(t,e,i){if("absolute"!==Q(t,"position",i))return 0;var s="left"===e?"Left":"Top",r=Q(t,"margin"+s,i);return t["offset"+s]-($(t,e,parseFloat(r),r.replace(T,""))||0)},K=function(t,e){var i,s,r,n={};if(e=e||Z(t,null))if(i=e.length)for(;--i>-1;)r=e[i],(-1===r.indexOf("-transform")||ke===r)&&(n[r.replace(S,O)]=e.getPropertyValue(r));else for(i in e)(-1===i.indexOf("Transform")||Pe===i)&&(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(S,O)]=e[i]);return Y||(n.opacity=U(t)),s=Ne(t,e,!1),n.rotation=s.rotation,n.skewX=s.skewX,n.scaleX=s.scaleX,n.scaleY=s.scaleY,n.x=s.x,n.y=s.y,Re&&(n.z=s.z,n.rotationX=s.rotationX,n.rotationY=s.rotationY,n.scaleZ=s.scaleZ),n.filters&&delete n.filters,n},J=function(t,e,i,s,r){var n,a,o,l={},h=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||r&&r[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(l[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(y,"")?n:0:H(t,a),void 0!==h[a]&&(o=new pe(h,a,h[a],o)));if(s)for(a in s)"className"!==a&&(l[a]=s[a]);return{difs:l,firstMPT:o}},te={width:["Left","Right"],height:["Top","Bottom"]},ee=["marginLeft","marginRight","marginTop","marginBottom"],ie=function(t,e,i){var s=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),r=te[e],n=r.length;for(i=i||Z(t,null);--n>-1;)s-=parseFloat(Q(t,"padding"+r[n],i,!0))||0,s-=parseFloat(Q(t,"border"+r[n]+"Width",i,!0))||0;return s},se=function(t,e){if("contain"===t||"auto"===t||"auto auto"===t)return t+" ";(null==t||""===t)&&(t="0 0");var i=t.split(" "),s=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],r=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==r?r="center"===s?"50%":"0":"center"===r&&(r="50%"),("center"===s||isNaN(parseFloat(s))&&-1===(s+"").indexOf("="))&&(s="50%"),t=s+" "+r+(i.length>2?" "+i[2]:""),e&&(e.oxp=-1!==s.indexOf("%"),e.oyp=-1!==r.indexOf("%"),e.oxr="="===s.charAt(1),e.oyr="="===r.charAt(1),e.ox=parseFloat(s.replace(y,"")),e.oy=parseFloat(r.replace(y,"")),e.v=t),e||t},re=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},ne=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ae=function(t,e,i,s){var r,n,a,o,l,h=1e-6;return null==t?o=e:"number"==typeof t?o=t:(r=360,n=t.split("_"),l="="===t.charAt(1),a=(l?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:F)-(l?0:e),n.length&&(s&&(s[i]=e+a),-1!==t.indexOf("short")&&(a%=r,a!==a%(r/2)&&(a=0>a?a+r:a-r)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*r)%r-(0|a/r)*r:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*r)%r-(0|a/r)*r)),o=e+a),h>o&&o>-h&&(o=0),o},oe={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},le=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},he=a.parseColor=function(t,e){var i,s,r,n,a,o,l,h,_,u,c;if(t)if("number"==typeof t)i=[t>>16,255&t>>8,255&t];else{if(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),oe[t])i=oe[t];else if("#"===t.charAt(0))4===t.length&&(s=t.charAt(1),r=t.charAt(2),n=t.charAt(3),t="#"+s+s+r+r+n+n),t=parseInt(t.substr(1),16),i=[t>>16,255&t>>8,255&t];else if("hsl"===t.substr(0,3))if(i=c=t.match(d),e){if(-1!==t.indexOf("="))return t.match(g)}else a=Number(i[0])%360/360,o=Number(i[1])/100,l=Number(i[2])/100,r=.5>=l?l*(o+1):l+o-l*o,s=2*l-r,i.length>3&&(i[3]=Number(t[3])),i[0]=le(a+1/3,s,r),i[1]=le(a,s,r),i[2]=le(a-1/3,s,r);else i=t.match(d)||oe.transparent;i[0]=Number(i[0]),i[1]=Number(i[1]),i[2]=Number(i[2]),i.length>3&&(i[3]=Number(i[3]))}else i=oe.black;return e&&!c&&(s=i[0]/255,r=i[1]/255,n=i[2]/255,h=Math.max(s,r,n),_=Math.min(s,r,n),l=(h+_)/2,h===_?a=o=0:(u=h-_,o=l>.5?u/(2-h-_):u/(h+_),a=h===s?(r-n)/u+(n>r?6:0):h===r?(n-s)/u+2:(s-r)/u+4,a*=60),i[0]=0|a+.5,i[1]=0|100*o+.5,i[2]=0|100*l+.5),i},_e=function(t,e){var i,s,r,n=t.match(ue)||[],a=0,o=n.length?"":t;for(i=0;n.length>i;i++)s=n[i],r=t.substr(a,t.indexOf(s,a)-a),a+=r.length+s.length,s=he(s,e),3===s.length&&s.push(1),o+=r+(e?"hsla("+s[0]+","+s[1]+"%,"+s[2]+"%,"+s[3]:"rgba("+s.join(","))+")";return o},ue="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in oe)ue+="|"+h+"\\b";ue=RegExp(ue+")","gi"),a.colorStringFilter=function(t){var e,i=t[0]+t[1];ue.lastIndex=0,ue.test(i)&&(e=-1!==i.indexOf("hsl(")||-1!==i.indexOf("hsla("),t[0]=_e(t[0],e),t[1]=_e(t[1],e))},e.defaultStringFilter||(e.defaultStringFilter=a.colorStringFilter);var ce=function(t,e,i,s){if(null==t)return function(t){return t};var r,n=e?(t.match(ue)||[""])[0]:"",a=t.split(n).join("").match(v)||[],o=t.substr(0,t.indexOf(a[0])),l=")"===t.charAt(t.length-1)?")":"",h=-1!==t.indexOf(" ")?" ":",",_=a.length,u=_>0?a[0].replace(d,""):"";return _?r=e?function(t){var e,c,f,p;if("number"==typeof t)t+=u;else if(s&&M.test(t)){for(p=t.replace(M,"|").split("|"),f=0;p.length>f;f++)p[f]=r(p[f]);return p.join(",")}if(e=(t.match(ue)||[n])[0],c=t.split(e).join("").match(v)||[],f=c.length,_>f--)for(;_>++f;)c[f]=i?c[0|(f-1)/2]:a[f];return o+c.join(h)+h+e+l+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,c;if("number"==typeof t)t+=u;else if(s&&M.test(t)){for(n=t.replace(M,"|").split("|"),c=0;n.length>c;c++)n[c]=r(n[c]);return n.join(",")}if(e=t.match(v)||[],c=e.length,_>c--)for(;_>++c;)e[c]=i?e[0|(c-1)/2]:a[c];return o+e.join(h)+l}:function(t){return t}},fe=function(t){return t=t.split(","),function(e,i,s,r,n,a,o){var l,h=(i+"").split(" ");for(o={},l=0;4>l;l++)o[t[l]]=h[l]=h[l]||h[(l-1)/2>>0];return r.parse(e,o,n,a)}},pe=(B._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,s,r,n=this.data,a=n.proxy,o=n.firstMPT,l=1e-6;o;)e=a[o.v],o.r?e=Math.round(e):l>e&&e>-l&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(r=i.xs0+i.s+i.xs1,s=1;i.l>s;s++)r+=i["xn"+s]+i["xs"+(s+1)];i.e=r}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,s,r){this.t=t,this.p=e,this.v=i,this.r=r,s&&(s._prev=this,this._next=s)}),me=(B._parseToProxy=function(t,e,i,s,r,n){var a,o,l,h,_,u=s,c={},f={},p=i._transform,m=I;for(i._transform=null,I=e,s=_=i.parse(t,e,s,r),I=m,n&&(i._transform=p,u&&(u._prev=null,u._prev&&(u._prev._next=null)));s&&s!==u;){if(1>=s.type&&(o=s.p,f[o]=s.s+s.c,c[o]=s.s,n||(h=new pe(s,"s",o,h,s.r),s.c=0),1===s.type))for(a=s.l;--a>0;)l="xn"+a,o=s.p+"_"+l,f[o]=s.data[l],c[o]=s[l],n||(h=new pe(s,l,o,h,s.rxp[l]));s=s._next}return{proxy:c,end:f,firstMPT:h,pt:_}},B.CSSPropTween=function(t,e,s,r,a,o,l,h,_,u,c){this.t=t,this.p=e,this.s=s,this.c=r,this.n=l||e,t instanceof me||n.push(this.n),this.r=h,this.type=o||0,_&&(this.pr=_,i=!0),this.b=void 0===u?s:u,this.e=void 0===c?s+r:c,a&&(this._next=a,a._prev=this)}),de=function(t,e,i,s,r,n){var a=new me(t,e,i,s-i,r,-1,n);return a.b=i,a.e=a.xs0=s,a},ge=a.parseComplex=function(t,e,i,s,r,n,a,o,l,h){i=i||n||"",a=new me(t,e,0,0,a,h?2:1,null,!1,o,i,s),s+="";var u,c,f,p,m,v,y,T,x,w,b,P,k,S=i.split(", ").join(",").split(" "),R=s.split(", ").join(",").split(" "),O=S.length,A=_!==!1;for((-1!==s.indexOf(",")||-1!==i.indexOf(","))&&(S=S.join(" ").replace(M,", ").split(" "),R=R.join(" ").replace(M,", ").split(" "),O=S.length),O!==R.length&&(S=(n||"").split(" "),O=S.length),a.plugin=l,a.setRatio=h,ue.lastIndex=0,u=0;O>u;u++)if(p=S[u],m=R[u],T=parseFloat(p),T||0===T)a.appendXtra("",T,re(m,T),m.replace(g,""),A&&-1!==m.indexOf("px"),!0);else if(r&&ue.test(p))P=","===m.charAt(m.length-1)?"),":")",k=-1!==m.indexOf("hsl")&&Y,p=he(p,k),m=he(m,k),x=p.length+m.length>6,x&&!Y&&0===m[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(R[u]).join("transparent")):(Y||(x=!1),k?a.appendXtra(x?"hsla(":"hsl(",p[0],re(m[0],p[0]),",",!1,!0).appendXtra("",p[1],re(m[1],p[1]),"%,",!1).appendXtra("",p[2],re(m[2],p[2]),x?"%,":"%"+P,!1):a.appendXtra(x?"rgba(":"rgb(",p[0],m[0]-p[0],",",!0,!0).appendXtra("",p[1],m[1]-p[1],",",!0).appendXtra("",p[2],m[2]-p[2],x?",":P,!0),x&&(p=4>p.length?1:p[3],a.appendXtra("",p,(4>m.length?1:m[3])-p,P,!1))),ue.lastIndex=0;else if(v=p.match(d)){if(y=m.match(g),!y||y.length!==v.length)return a;for(f=0,c=0;v.length>c;c++)b=v[c],w=p.indexOf(b,f),a.appendXtra(p.substr(f,w-f),Number(b),re(y[c],b),"",A&&"px"===p.substr(w+b.length,2),0===c),f=w+b.length;a["xs"+a.l]+=p.substr(f)}else a["xs"+a.l]+=a.l?" "+p:p;if(-1!==s.indexOf("=")&&a.data){for(P=a.xs0+a.data.s,u=1;a.l>u;u++)P+=a["xs"+u]+a.data["xn"+u];a.e=P+a["xs"+u]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},ve=9;for(h=me.prototype,h.l=h.pr=0;--ve>0;)h["xn"+ve]=0,h["xs"+ve]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,s,r,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=s||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=r,a["xn"+o]=e,a.plugin||(a.xfirst=new me(a,"xn"+o,e,i,a.xfirst||a,0,a.n,r,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=r,a)):(a["xs"+o]+=e+(s||""),a)};var ye=function(t,e){e=e||{},this.p=e.prefix?W(t)||t:t,l[t]=l[this.p]=this,this.format=e.formatter||ce(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},Te=B._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var s,r,n=t.split(","),a=e.defaultValue;for(i=i||[a],s=0;n.length>s;s++)e.prefix=0===s&&e.prefix,e.defaultValue=i[s]||a,r=new ye(n[s],e)},xe=function(t){if(!l[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";Te(t,{parser:function(t,i,s,r,n,a,h){var _=o.com.greensock.plugins[e];return _?(_._cssRegister(),l[s].parse(t,i,s,r,n,a,h)):(q("Error: "+e+" js file not loaded."),n)}})}};h=ye.prototype,h.parseComplex=function(t,e,i,s,r,n){var a,o,l,h,_,u,c=this.keyword;if(this.multi&&(M.test(i)||M.test(e)?(o=e.replace(M,"|").split("|"),l=i.replace(M,"|").split("|")):c&&(o=[e],l=[i])),l){for(h=l.length>o.length?l.length:o.length,a=0;h>a;a++)e=o[a]=o[a]||this.dflt,i=l[a]=l[a]||this.dflt,c&&(_=e.indexOf(c),u=i.indexOf(c),_!==u&&(-1===u?o[a]=o[a].split(c).join(""):-1===_&&(o[a]+=" "+c)));e=o.join(", "),i=l.join(", ")}return ge(t,this.p,e,i,this.clrs,this.dflt,s,this.pr,r,n)},h.parse=function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(Q(t,this.p,r,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){Te(t,{parser:function(t,s,r,n,a,o){var l=new me(t,r,0,0,a,2,r,!1,i);return l.plugin=o,l.setRatio=e(t,s,n._tween,r),l},priority:i})},a.useSVGTransformAttr=c||f;var we,be="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Pe=W("transform"),ke=V+"transform",Se=W("transformOrigin"),Re=null!==W("perspective"),Oe=B.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Re?a.defaultForce3D||"auto":!1},Ae=window.SVGElement,Ce=function(t,e,i){var s,r=E.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(s in i)r.setAttributeNS(null,s.replace(n,"$1-$2").toLowerCase(),i[s]);return e.appendChild(r),r},De=E.documentElement,Me=function(){var t,e,i,s=m||/Android/i.test(j)&&!window.chrome;return E.createElementNS&&!s&&(t=Ce("svg",De),e=Ce("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[Se]="50% 50%",e.style[Pe]="scaleX(0.5)",s=i===e.getBoundingClientRect().width&&!(f&&Re),De.removeChild(t)),s}(),ze=function(t,e,i,s,r){var n,o,l,h,_,u,c,f,p,m,d,g,v,y,T=t._gsTransform,x=Ee(t,!0);T&&(v=T.xOrigin,y=T.yOrigin),(!s||2>(n=s.split(" ")).length)&&(c=t.getBBox(),e=se(e).split(" "),n=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*c.width:parseFloat(e[0]))+c.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*c.height:parseFloat(e[1]))+c.y]),i.xOrigin=h=parseFloat(n[0]),i.yOrigin=_=parseFloat(n[1]),s&&x!==Ie&&(u=x[0],c=x[1],f=x[2],p=x[3],m=x[4],d=x[5],g=u*p-c*f,o=h*(p/g)+_*(-f/g)+(f*d-p*m)/g,l=h*(-c/g)+_*(u/g)-(u*d-c*m)/g,h=i.xOrigin=n[0]=o,_=i.yOrigin=n[1]=l),T&&(r||r!==!1&&a.defaultSmoothOrigin!==!1?(o=h-v,l=_-y,T.xOffset+=o*x[0]+l*x[2]-o,T.yOffset+=o*x[1]+l*x[3]-l):T.xOffset=T.yOffset=0),t.setAttribute("data-svg-origin",n.join(" "))},Fe=function(t){return!!(Ae&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM))},Ie=[1,0,0,1,0,0],Ee=function(t,e){var i,s,r,n,a,o=t._gsTransform||new Oe,l=1e5;if(Pe?s=Q(t,ke,null,!0):t.currentStyle&&(s=t.currentStyle.filter.match(C),s=s&&4===s.length?[s[0].substr(4),Number(s[2].substr(4)),Number(s[1].substr(4)),s[3].substr(4),o.x||0,o.y||0].join(","):""),i=!s||"none"===s||"matrix(1, 0, 0, 1, 0, 0)"===s,(o.svg||t.getBBox&&Fe(t))&&(i&&-1!==(t.style[Pe]+"").indexOf("matrix")&&(s=t.style[Pe],i=0),r=t.getAttribute("transform"),i&&r&&(-1!==r.indexOf("matrix")?(s=r,i=0):-1!==r.indexOf("translate")&&(s="matrix(1,0,0,1,"+r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",i=0))),i)return Ie;for(r=(s||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],ve=r.length;--ve>-1;)n=Number(r[ve]),r[ve]=(a=n-(n|=0))?(0|a*l+(0>a?-.5:.5))/l+n:n;return e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r},Ne=B.getTransform=function(t,i,s,n){if(t._gsTransform&&s&&!n)return t._gsTransform;var o,l,h,_,u,c,f=s?t._gsTransform||new Oe:new Oe,p=0>f.scaleX,m=2e-5,d=1e5,g=Re?parseFloat(Q(t,Se,i,!1,"0 0 0").split(" ")[2])||f.zOrigin||0:0,v=parseFloat(a.defaultTransformPerspective)||0;if(f.svg=!(!t.getBBox||!Fe(t)),f.svg&&(ze(t,Q(t,Se,r,!1,"50% 50%")+"",f,t.getAttribute("data-svg-origin")),we=a.useSVGTransformAttr||Me),o=Ee(t),o!==Ie){if(16===o.length){var y,T,x,w,b,P=o[0],k=o[1],S=o[2],R=o[3],O=o[4],A=o[5],C=o[6],D=o[7],M=o[8],z=o[9],I=o[10],E=o[12],N=o[13],L=o[14],X=o[11],B=Math.atan2(C,I);f.zOrigin&&(L=-f.zOrigin,E=M*L-o[12],N=z*L-o[13],L=I*L+f.zOrigin-o[14]),f.rotationX=B*F,B&&(w=Math.cos(-B),b=Math.sin(-B),y=O*w+M*b,T=A*w+z*b,x=C*w+I*b,M=O*-b+M*w,z=A*-b+z*w,I=C*-b+I*w,X=D*-b+X*w,O=y,A=T,C=x),B=Math.atan2(M,I),f.rotationY=B*F,B&&(w=Math.cos(-B),b=Math.sin(-B),y=P*w-M*b,T=k*w-z*b,x=S*w-I*b,z=k*b+z*w,I=S*b+I*w,X=R*b+X*w,P=y,k=T,S=x),B=Math.atan2(k,P),f.rotation=B*F,B&&(w=Math.cos(-B),b=Math.sin(-B),P=P*w+O*b,T=k*w+A*b,A=k*-b+A*w,C=S*-b+C*w,k=T),f.rotationX&&Math.abs(f.rotationX)+Math.abs(f.rotation)>359.9&&(f.rotationX=f.rotation=0,f.rotationY+=180),f.scaleX=(0|Math.sqrt(P*P+k*k)*d+.5)/d,f.scaleY=(0|Math.sqrt(A*A+z*z)*d+.5)/d,f.scaleZ=(0|Math.sqrt(C*C+I*I)*d+.5)/d,f.skewX=0,f.perspective=X?1/(0>X?-X:X):0,f.x=E,f.y=N,f.z=L,f.svg&&(f.x-=f.xOrigin-(f.xOrigin*P-f.yOrigin*O),f.y-=f.yOrigin-(f.yOrigin*k-f.xOrigin*A))}else if(!(Re&&!n&&o.length&&f.x===o[4]&&f.y===o[5]&&(f.rotationX||f.rotationY)||void 0!==f.x&&"none"===Q(t,"display",i))){var j=o.length>=6,Y=j?o[0]:1,U=o[1]||0,q=o[2]||0,V=j?o[3]:1;f.x=o[4]||0,f.y=o[5]||0,h=Math.sqrt(Y*Y+U*U),_=Math.sqrt(V*V+q*q),u=Y||U?Math.atan2(U,Y)*F:f.rotation||0,c=q||V?Math.atan2(q,V)*F+u:f.skewX||0,Math.abs(c)>90&&270>Math.abs(c)&&(p?(h*=-1,c+=0>=u?180:-180,u+=0>=u?180:-180):(_*=-1,c+=0>=c?180:-180)),f.scaleX=h,f.scaleY=_,f.rotation=u,f.skewX=c,Re&&(f.rotationX=f.rotationY=f.z=0,f.perspective=v,f.scaleZ=1),f.svg&&(f.x-=f.xOrigin-(f.xOrigin*Y+f.yOrigin*q),f.y-=f.yOrigin-(f.xOrigin*U+f.yOrigin*V))}f.zOrigin=g;for(l in f)m>f[l]&&f[l]>-m&&(f[l]=0)}return s&&(t._gsTransform=f,f.svg&&(we&&t.style[Pe]?e.delayedCall(.001,function(){je(t.style,Pe)}):!we&&t.getAttribute("transform")&&e.delayedCall(.001,function(){t.removeAttribute("transform")}))),f},Le=function(t){var e,i,s=this.data,r=-s.rotation*z,n=r+s.skewX*z,a=1e5,o=(0|Math.cos(r)*s.scaleX*a)/a,l=(0|Math.sin(r)*s.scaleX*a)/a,h=(0|Math.sin(n)*-s.scaleY*a)/a,_=(0|Math.cos(n)*s.scaleY*a)/a,u=this.t.style,c=this.t.currentStyle;if(c){i=l,l=-h,h=-i,e=c.filter,u.filter="";var f,p,d=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==c.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+l+", M21="+h+", M22="+_,w=s.x+d*s.xPercent/100,b=s.y+g*s.yPercent/100;if(null!=s.ox&&(f=(s.oxp?.01*d*s.ox:s.ox)-d/2,p=(s.oyp?.01*g*s.oy:s.oy)-g/2,w+=f-(f*o+p*l),b+=p-(f*h+p*_)),v?(f=d/2,p=g/2,y+=", Dx="+(f-(f*o+p*l)+w)+", Dy="+(p-(f*h+p*_)+b)+")"):y+=", sizingMethod='auto expand')",u.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(D,y):y+" "+e,(0===t||1===t)&&1===o&&0===l&&0===h&&1===_&&(v&&-1===y.indexOf("Dx=0, Dy=0")||x.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&u.removeAttribute("filter")),!v){var P,k,S,R=8>m?1:-1;for(f=s.ieOffsetX||0,p=s.ieOffsetY||0,s.ieOffsetX=Math.round((d-((0>o?-o:o)*d+(0>l?-l:l)*g))/2+w),s.ieOffsetY=Math.round((g-((0>_?-_:_)*g+(0>h?-h:h)*d))/2+b),ve=0;4>ve;ve++)k=ee[ve],P=c[k],i=-1!==P.indexOf("px")?parseFloat(P):$(this.t,k,parseFloat(P),P.replace(T,""))||0,S=i!==s[k]?2>ve?-s.ieOffsetX:-s.ieOffsetY:2>ve?f-s.ieOffsetX:p-s.ieOffsetY,u[k]=(s[k]=Math.round(i-S*(0===ve||2===ve?1:R)))+"px"}}},Xe=B.set3DTransformRatio=B.setTransformRatio=function(t){var e,i,s,r,n,a,o,l,h,_,u,c,p,m,d,g,v,y,T,x,w,b,P,k=this.data,S=this.t.style,R=k.rotation,O=k.rotationX,A=k.rotationY,C=k.scaleX,D=k.scaleY,M=k.scaleZ,F=k.x,I=k.y,E=k.z,N=k.svg,L=k.perspective,X=k.force3D;if(!(((1!==t&&0!==t||"auto"!==X||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&X||E||L||A||O)&&(!we||!N)&&Re))return R||k.skewX||N?(R*=z,b=k.skewX*z,P=1e5,e=Math.cos(R)*C,r=Math.sin(R)*C,i=Math.sin(R-b)*-D,n=Math.cos(R-b)*D,b&&"simple"===k.skewType&&(v=Math.tan(b),v=Math.sqrt(1+v*v),i*=v,n*=v,k.skewY&&(e*=v,r*=v)),N&&(F+=k.xOrigin-(k.xOrigin*e+k.yOrigin*i)+k.xOffset,I+=k.yOrigin-(k.xOrigin*r+k.yOrigin*n)+k.yOffset,we&&(k.xPercent||k.yPercent)&&(m=this.t.getBBox(),F+=.01*k.xPercent*m.width,I+=.01*k.yPercent*m.height),m=1e-6,m>F&&F>-m&&(F=0),m>I&&I>-m&&(I=0)),T=(0|e*P)/P+","+(0|r*P)/P+","+(0|i*P)/P+","+(0|n*P)/P+","+F+","+I+")",N&&we?this.t.setAttribute("transform","matrix("+T):S[Pe]=(k.xPercent||k.yPercent?"translate("+k.xPercent+"%,"+k.yPercent+"%) matrix(":"matrix(")+T):S[Pe]=(k.xPercent||k.yPercent?"translate("+k.xPercent+"%,"+k.yPercent+"%) matrix(":"matrix(")+C+",0,0,"+D+","+F+","+I+")",void 0;if(f&&(m=1e-4,m>C&&C>-m&&(C=M=2e-5),m>D&&D>-m&&(D=M=2e-5),!L||k.z||k.rotationX||k.rotationY||(L=0)),R||k.skewX)R*=z,d=e=Math.cos(R),g=r=Math.sin(R),k.skewX&&(R-=k.skewX*z,d=Math.cos(R),g=Math.sin(R),"simple"===k.skewType&&(v=Math.tan(k.skewX*z),v=Math.sqrt(1+v*v),d*=v,g*=v,k.skewY&&(e*=v,r*=v))),i=-g,n=d;else{if(!(A||O||1!==M||L||N))return S[Pe]=(k.xPercent||k.yPercent?"translate("+k.xPercent+"%,"+k.yPercent+"%) translate3d(":"translate3d(")+F+"px,"+I+"px,"+E+"px)"+(1!==C||1!==D?" scale("+C+","+D+")":""),void 0;e=n=1,i=r=0}h=1,s=a=o=l=_=u=0,c=L?-1/L:0,p=k.zOrigin,m=1e-6,x=",",w="0",R=A*z,R&&(d=Math.cos(R),g=Math.sin(R),o=-g,_=c*-g,s=e*g,a=r*g,h=d,c*=d,e*=d,r*=d),R=O*z,R&&(d=Math.cos(R),g=Math.sin(R),v=i*d+s*g,y=n*d+a*g,l=h*g,u=c*g,s=i*-g+s*d,a=n*-g+a*d,h*=d,c*=d,i=v,n=y),1!==M&&(s*=M,a*=M,h*=M,c*=M),1!==D&&(i*=D,n*=D,l*=D,u*=D),1!==C&&(e*=C,r*=C,o*=C,_*=C),(p||N)&&(p&&(F+=s*-p,I+=a*-p,E+=h*-p+p),N&&(F+=k.xOrigin-(k.xOrigin*e+k.yOrigin*i)+k.xOffset,I+=k.yOrigin-(k.xOrigin*r+k.yOrigin*n)+k.yOffset),m>F&&F>-m&&(F=w),m>I&&I>-m&&(I=w),m>E&&E>-m&&(E=0)),T=k.xPercent||k.yPercent?"translate("+k.xPercent+"%,"+k.yPercent+"%) matrix3d(":"matrix3d(",T+=(m>e&&e>-m?w:e)+x+(m>r&&r>-m?w:r)+x+(m>o&&o>-m?w:o),T+=x+(m>_&&_>-m?w:_)+x+(m>i&&i>-m?w:i)+x+(m>n&&n>-m?w:n),O||A?(T+=x+(m>l&&l>-m?w:l)+x+(m>u&&u>-m?w:u)+x+(m>s&&s>-m?w:s),T+=x+(m>a&&a>-m?w:a)+x+(m>h&&h>-m?w:h)+x+(m>c&&c>-m?w:c)+x):T+=",0,0,0,0,1,0,",T+=F+x+I+x+E+x+(L?1+-E/L:1)+")",S[Pe]=T};h=Oe.prototype,h.x=h.y=h.z=h.skewX=h.skewY=h.rotation=h.rotationX=h.rotationY=h.zOrigin=h.xPercent=h.yPercent=h.xOffset=h.yOffset=0,h.scaleX=h.scaleY=h.scaleZ=1,Te("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(t,e,i,s,n,o,l){if(s._lastParsedTransform===l)return n;s._lastParsedTransform=l;var h,_,u,c,f,p,m,d,g,v,y=t._gsTransform,T=t.style,x=1e-6,w=be.length,b=l,P={},k="transformOrigin";if(l.display?(c=Q(t,"display"),T.display="block",h=Ne(t,r,!0,l.parseTransform),T.display=c):h=Ne(t,r,!0,l.parseTransform),s._transform=h,"string"==typeof b.transform&&Pe)c=L.style,c[Pe]=b.transform,c.display="block",c.position="absolute",E.body.appendChild(L),_=Ne(L,null,!1),E.body.removeChild(L),_.perspective||(_.perspective=h.perspective),null!=b.xPercent&&(_.xPercent=ne(b.xPercent,h.xPercent)),null!=b.yPercent&&(_.yPercent=ne(b.yPercent,h.yPercent));else if("object"==typeof b){if(_={scaleX:ne(null!=b.scaleX?b.scaleX:b.scale,h.scaleX),scaleY:ne(null!=b.scaleY?b.scaleY:b.scale,h.scaleY),scaleZ:ne(b.scaleZ,h.scaleZ),x:ne(b.x,h.x),y:ne(b.y,h.y),z:ne(b.z,h.z),xPercent:ne(b.xPercent,h.xPercent),yPercent:ne(b.yPercent,h.yPercent),perspective:ne(b.transformPerspective,h.perspective)},d=b.directionalRotation,null!=d)if("object"==typeof d)for(c in d)b[c]=d[c];else b.rotation=d;"string"==typeof b.x&&-1!==b.x.indexOf("%")&&(_.x=0,_.xPercent=ne(b.x,h.xPercent)),"string"==typeof b.y&&-1!==b.y.indexOf("%")&&(_.y=0,_.yPercent=ne(b.y,h.yPercent)),_.rotation=ae("rotation"in b?b.rotation:"shortRotation"in b?b.shortRotation+"_short":"rotationZ"in b?b.rotationZ:h.rotation,h.rotation,"rotation",P),Re&&(_.rotationX=ae("rotationX"in b?b.rotationX:"shortRotationX"in b?b.shortRotationX+"_short":h.rotationX||0,h.rotationX,"rotationX",P),_.rotationY=ae("rotationY"in b?b.rotationY:"shortRotationY"in b?b.shortRotationY+"_short":h.rotationY||0,h.rotationY,"rotationY",P)),_.skewX=null==b.skewX?h.skewX:ae(b.skewX,h.skewX),_.skewY=null==b.skewY?h.skewY:ae(b.skewY,h.skewY),(u=_.skewY-h.skewY)&&(_.skewX+=u,_.rotation+=u)}for(Re&&null!=b.force3D&&(h.force3D=b.force3D,m=!0),h.skewType=b.skewType||h.skewType||a.defaultSkewType,p=h.force3D||h.z||h.rotationX||h.rotationY||_.z||_.rotationX||_.rotationY||_.perspective,p||null==b.scale||(_.scaleZ=1);--w>-1;)i=be[w],f=_[i]-h[i],(f>x||-x>f||null!=b[i]||null!=I[i])&&(m=!0,n=new me(h,i,h[i],f,n),i in P&&(n.e=P[i]),n.xs0=0,n.plugin=o,s._overwriteProps.push(n.n));return f=b.transformOrigin,h.svg&&(f||b.svgOrigin)&&(g=h.xOffset,v=h.yOffset,ze(t,se(f),_,b.svgOrigin,b.smoothOrigin),n=de(h,"xOrigin",(y?h:_).xOrigin,_.xOrigin,n,k),n=de(h,"yOrigin",(y?h:_).yOrigin,_.yOrigin,n,k),(g!==h.xOffset||v!==h.yOffset)&&(n=de(h,"xOffset",y?g:h.xOffset,h.xOffset,n,k),n=de(h,"yOffset",y?v:h.yOffset,h.yOffset,n,k)),f=we?null:"0px 0px"),(f||Re&&p&&h.zOrigin)&&(Pe?(m=!0,i=Se,f=(f||Q(t,i,r,!1,"50% 50%"))+"",n=new me(T,i,0,0,n,-1,k),n.b=T[i],n.plugin=o,Re?(c=h.zOrigin,f=f.split(" "),h.zOrigin=(f.length>2&&(0===c||"0px"!==f[2])?parseFloat(f[2]):c)||0,n.xs0=n.e=f[0]+" "+(f[1]||"50%")+" 0px",n=new me(h,"zOrigin",0,0,n,-1,n.n),n.b=c,n.xs0=n.e=h.zOrigin):n.xs0=n.e=f):se(f+"",h)),m&&(s._transformType=h.svg&&we||!p&&3!==this._transformType?2:3),n},prefix:!0}),Te("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),Te("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,l,h,_,u,c,f,p,m,d,g,v,y,T,x,w,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(m=parseFloat(t.offsetWidth),d=parseFloat(t.offsetHeight),o=e.split(" "),l=0;b.length>l;l++)this.p.indexOf("border")&&(b[l]=W(b[l])),u=_=Q(t,b[l],r,!1,"0px"),-1!==u.indexOf(" ")&&(_=u.split(" "),u=_[0],_=_[1]),c=h=o[l],f=parseFloat(u),v=u.substr((f+"").length),y="="===c.charAt(1),y?(p=parseInt(c.charAt(0)+"1",10),c=c.substr(2),p*=parseFloat(c),g=c.substr((p+"").length-(0>p?1:0))||""):(p=parseFloat(c),g=c.substr((p+"").length)),""===g&&(g=s[i]||v),g!==v&&(T=$(t,"borderLeft",f,v),x=$(t,"borderTop",f,v),"%"===g?(u=100*(T/m)+"%",_=100*(x/d)+"%"):"em"===g?(w=$(t,"borderLeft",1,"em"),u=T/w+"em",_=x/w+"em"):(u=T+"px",_=x+"px"),y&&(c=parseFloat(u)+p+g,h=parseFloat(_)+p+g)),a=ge(P,b[l],u+" "+_,c+" "+h,!1,"0px",a);return a},prefix:!0,formatter:ce("0px 0px 0px 0px",!1,!0)}),Te("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,s,n,a){var o,l,h,_,u,c,f="background-position",p=r||Z(t,null),d=this.format((p?m?p.getPropertyValue(f+"-x")+" "+p.getPropertyValue(f+"-y"):p.getPropertyValue(f):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);
if(-1!==d.indexOf("%")!=(-1!==g.indexOf("%"))&&(c=Q(t,"backgroundImage").replace(R,""),c&&"none"!==c)){for(o=d.split(" "),l=g.split(" "),X.setAttribute("src",c),h=2;--h>-1;)d=o[h],_=-1!==d.indexOf("%"),_!==(-1!==l[h].indexOf("%"))&&(u=0===h?t.offsetWidth-X.width:t.offsetHeight-X.height,o[h]=_?parseFloat(d)/100*u+"px":100*(parseFloat(d)/u)+"%");d=o.join(" ")}return this.parseComplex(t.style,d,g,n,a)},formatter:se}),Te("backgroundSize",{defaultValue:"0 0",formatter:se}),Te("perspective",{defaultValue:"0px",prefix:!0}),Te("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),Te("transformStyle",{prefix:!0}),Te("backfaceVisibility",{prefix:!0}),Te("userSelect",{prefix:!0}),Te("margin",{parser:fe("marginTop,marginRight,marginBottom,marginLeft")}),Te("padding",{parser:fe("paddingTop,paddingRight,paddingBottom,paddingLeft")}),Te("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,s,n,a){var o,l,h;return 9>m?(l=t.currentStyle,h=8>m?" ":",",o="rect("+l.clipTop+h+l.clipRight+h+l.clipBottom+h+l.clipLeft+")",e=this.format(e).split(",").join(h)):(o=this.format(Q(t,this.p,r,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),Te("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),Te("autoRound,strictUnits",{parser:function(t,e,i,s,r){return r}}),Te("border",{defaultValue:"0px solid #000",parser:function(t,e,i,s,n,a){return this.parseComplex(t.style,this.format(Q(t,"borderTopWidth",r,!1,"0px")+" "+Q(t,"borderTopStyle",r,!1,"solid")+" "+Q(t,"borderTopColor",r,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(ue)||["#000"])[0]}}),Te("borderWidth",{parser:fe("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),Te("float,cssFloat,styleFloat",{parser:function(t,e,i,s,r){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new me(n,a,0,0,r,-1,i,!1,0,n[a],e)}});var Be=function(t){var e,i=this.t,s=i.filter||Q(this.data,"filter")||"",r=0|this.s+this.c*t;100===r&&(-1===s.indexOf("atrix(")&&-1===s.indexOf("radient(")&&-1===s.indexOf("oader(")?(i.removeAttribute("filter"),e=!Q(this.data,"filter")):(i.filter=s.replace(b,""),e=!0)),e||(this.xn1&&(i.filter=s=s||"alpha(opacity="+r+")"),-1===s.indexOf("pacity")?0===r&&this.xn1||(i.filter=s+" alpha(opacity="+r+")"):i.filter=s.replace(x,"opacity="+r))};Te("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,s,n,a){var o=parseFloat(Q(t,"opacity",r,!1,"1")),l=t.style,h="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),h&&1===o&&"hidden"===Q(t,"visibility",r)&&0!==e&&(o=0),Y?n=new me(l,"opacity",o,e-o,n):(n=new me(l,"opacity",100*o,100*(e-o),n),n.xn1=h?1:0,l.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Be),h&&(n=new me(l,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",s._overwriteProps.push(n.n),s._overwriteProps.push(i)),n}});var je=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(k,"-$1").toLowerCase())):t.removeAttribute(e))},Ye=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:je(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};Te("className",{parser:function(t,e,s,n,a,o,l){var h,_,u,c,f,p=t.getAttribute("class")||"",m=t.style.cssText;if(a=n._classNamePT=new me(t,s,0,0,a,2),a.setRatio=Ye,a.pr=-11,i=!0,a.b=p,_=K(t,r),u=t._gsClassPT){for(c={},f=u.data;f;)c[f.p]=1,f=f._next;u.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:p.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",a.e),h=J(t,_,K(t),l,c),t.setAttribute("class",p),a.data=h.firstMPT,t.style.cssText=m,a=a.xfirst=n.parse(t,h.difs,a,o)}});var Ue=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,s,r,n,a=this.t.style,o=l.transform.parse;if("all"===this.e)a.cssText="",r=!0;else for(e=this.e.split(" ").join("").split(","),s=e.length;--s>-1;)i=e[s],l[i]&&(l[i].parse===o?r=!0:i="transformOrigin"===i?Se:l[i].p),je(a,i);r&&(je(a,Pe),n=this.t._gsTransform,n&&(n.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(Te("clearProps",{parser:function(t,e,s,r,n){return n=new me(t,s,0,0,n,2),n.setRatio=Ue,n.e=e,n.pr=-10,n.data=r._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),ve=h.length;ve--;)xe(h[ve]);h=a.prototype,h._firstPT=h._lastParsedTransform=h._transform=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,_=e.autoRound,i=!1,s=e.suffixMap||a.suffixMap,r=Z(t,""),n=this._overwriteProps;var h,f,m,d,g,v,y,T,x,b=t.style;if(u&&""===b.zIndex&&(h=Q(t,"zIndex",r),("auto"===h||""===h)&&this._addLazySet(b,"zIndex",0)),"string"==typeof e&&(d=b.cssText,h=K(t,r),b.cssText=d+";"+e,h=J(t,h,K(t)).difs,!Y&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,b.cssText=d),this._firstPT=f=e.className?l.className.parse(t,e.className,"className",this,null,null,e):this.parse(t,e,null),this._transformType){for(x=3===this._transformType,Pe?c&&(u=!0,""===b.zIndex&&(y=Q(t,"zIndex",r),("auto"===y||""===y)&&this._addLazySet(b,"zIndex",0)),p&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(x?"visible":"hidden"))):b.zoom=1,m=f;m&&m._next;)m=m._next;T=new me(t,"transform",0,0,null,2),this._linkCSSP(T,null,m),T.setRatio=Pe?Xe:Le,T.data=this._transform||Ne(t,r,!0),T.tween=o,T.pr=-1,n.pop()}if(i){for(;f;){for(v=f._next,m=d;m&&m.pr>f.pr;)m=m._next;(f._prev=m?m._prev:g)?f._prev._next=f:d=f,(f._next=m)?m._prev=f:g=f,f=v}this._firstPT=d}return!0},h.parse=function(t,e,i,n){var a,o,h,u,c,f,p,m,d,g,v=t.style;for(a in e)f=e[a],o=l[a],o?i=o.parse(t,f,a,this,i,n,e):(c=Q(t,a,r)+"",d="string"==typeof f,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||d&&P.test(f)?(d||(f=he(f),f=(f.length>3?"rgba(":"rgb(")+f.join(",")+")"),i=ge(v,a,c,f,!0,"transparent",i,0,n)):!d||-1===f.indexOf(" ")&&-1===f.indexOf(",")?(h=parseFloat(c),p=h||0===h?c.substr((h+"").length):"",(""===c||"auto"===c)&&("width"===a||"height"===a?(h=ie(t,a,r),p="px"):"left"===a||"top"===a?(h=H(t,a,r),p="px"):(h="opacity"!==a?0:1,p="")),g=d&&"="===f.charAt(1),g?(u=parseInt(f.charAt(0)+"1",10),f=f.substr(2),u*=parseFloat(f),m=f.replace(T,"")):(u=parseFloat(f),m=d?f.replace(T,""):""),""===m&&(m=a in s?s[a]:p),f=u||0===u?(g?u+h:u)+m:e[a],p!==m&&""!==m&&(u||0===u)&&h&&(h=$(t,a,h,p),"%"===m?(h/=$(t,a,100,"%")/100,e.strictUnits!==!0&&(c=h+"%")):"em"===m||"rem"===m?h/=$(t,a,1,m):"px"!==m&&(u=$(t,a,u,m),m="px"),g&&(u||0===u)&&(f=u+h+m)),g&&(u+=h),!h&&0!==h||!u&&0!==u?void 0!==v[a]&&(f||"NaN"!=f+""&&null!=f)?(i=new me(v,a,u||h||0,0,i,-1,a,!1,0,c,f),i.xs0="none"!==f||"display"!==a&&-1===a.indexOf("Style")?f:c):q("invalid "+a+" tween value: "+e[a]):(i=new me(v,a,h,u-h,i,0,a,_!==!1&&("px"===m||"zIndex"===a),0,c,f),i.xs0=m)):i=ge(v,a,c,f,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);return i},h.setRatio=function(t){var e,i,s,r=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;r;){if(e=r.c*t+r.s,r.r?e=Math.round(e):n>e&&e>-n&&(e=0),r.type)if(1===r.type)if(s=r.l,2===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2;else if(3===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3;else if(4===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4;else if(5===s)r.t[r.p]=r.xs0+e+r.xs1+r.xn1+r.xs2+r.xn2+r.xs3+r.xn3+r.xs4+r.xn4+r.xs5;else{for(i=r.xs0+e+r.xs1,s=1;r.l>s;s++)i+=r["xn"+s]+r["xs"+(s+1)];r.t[r.p]=i}else-1===r.type?r.t[r.p]=r.xs0:r.setRatio&&r.setRatio(t);else r.t[r.p]=e+r.xs0;r=r._next}else for(;r;)2!==r.type?r.t[r.p]=r.b:r.setRatio(t),r=r._next;else for(;r;){if(2!==r.type)if(r.r&&-1!==r.type)if(e=Math.round(r.s+r.c),r.type){if(1===r.type){for(s=r.l,i=r.xs0+e+r.xs1,s=1;r.l>s;s++)i+=r["xn"+s]+r["xs"+(s+1)];r.t[r.p]=i}}else r.t[r.p]=e+r.xs0;else r.t[r.p]=r.e;else r.setRatio(t);r=r._next}},h._enableTransforms=function(t){this._transform=this._transform||Ne(this._target,r,!0),this._transformType=this._transform.svg&&we||!t&&3!==this._transformType?2:3};var qe=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};h._addLazySet=function(t,e,i){var s=this._firstPT=new me(t,e,0,0,this._firstPT,2);s.e=i,s.setRatio=qe,s.data=this},h._linkCSSP=function(t,e,i,s){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,s=!0),i?i._next=t:s||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,s,r,n=e;if(e.autoAlpha||e.alpha){n={};for(s in e)n[s]=e[s];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(r=i.xfirst,r&&r._prev?this._linkCSSP(r._prev,i._next,r._prev._prev):r===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,r._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var Ve=function(t,e,i){var s,r,n,a;if(t.slice)for(r=t.length;--r>-1;)Ve(t[r],e,i);else for(s=t.childNodes,r=s.length;--r>-1;)n=s[r],a=n.type,n.style&&(e.push(K(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||Ve(n,e,i)};return a.cascadeTo=function(t,i,s){var r,n,a,o,l=e.to(t,i,s),h=[l],_=[],u=[],c=[],f=e._internals.reservedProps;for(t=l._targets||l.target,Ve(t,_,c),l.render(i,!0,!0),Ve(t,u),l.render(0,!0,!0),l._enabled(!0),r=c.length;--r>-1;)if(n=J(c[r],_[r],u[r]),n.firstMPT){n=n.difs;for(a in s)f[a]&&(n[a]=s[a]);o={};for(a in n)o[a]=_[r][a];h.push(e.fromTo(c[r],i,o,n))}return h},t.activate([a]),a},!0),function(){var t=_gsScope._gsDefine.plugin({propName:"roundProps",version:"1.5",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=function(t){for(;t;)t.f||t.blob||(t.r=1),t=t._next},i=t.prototype;i._onInitAllProps=function(){for(var t,i,s,r=this._tween,n=r.vars.roundProps.join?r.vars.roundProps:r.vars.roundProps.split(","),a=n.length,o={},l=r._propLookup.roundProps;--a>-1;)o[n[a]]=1;for(a=n.length;--a>-1;)for(t=n[a],i=r._firstPT;i;)s=i._next,i.pg?i.t._roundProps(o,!0):i.n===t&&(2===i.f&&i.t?e(i.t._firstPT):(this._add(i.t,t,i.s,i.c),s&&(s._prev=i._prev),i._prev?i._prev._next=s:r._firstPT===i&&(r._firstPT=s),i._next=i._prev=null,r._propLookup[t]=l)),i=s;return!1},i._add=function(t,e,i,s){this._addTween(t,e,i,i+s,e,!0),this._overwriteProps.push(e)}}(),function(){_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.5.0",init:function(t,e){var i;if("function"!=typeof t.setAttribute)return!1;for(i in e)this._addTween(t,"setAttribute",t.getAttribute(i)+"",e[i]+"",i,!1,i),this._overwriteProps.push(i);return!0}})}(),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(t,e){"object"!=typeof e&&(e={rotation:e}),this.finals={};var i,s,r,n,a,o,l=e.useRadians===!0?2*Math.PI:360,h=1e-6;for(i in e)"useRadians"!==i&&(o=(e[i]+"").split("_"),s=o[0],r=parseFloat("function"!=typeof t[i]?t[i]:t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]()),n=this.finals[i]="string"==typeof s&&"="===s.charAt(1)?r+parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)):Number(s)||0,a=n-r,o.length&&(s=o.join("_"),-1!==s.indexOf("short")&&(a%=l,a!==a%(l/2)&&(a=0>a?a+l:a-l)),-1!==s.indexOf("_cw")&&0>a?a=(a+9999999999*l)%l-(0|a/l)*l:-1!==s.indexOf("ccw")&&a>0&&(a=(a-9999999999*l)%l-(0|a/l)*l)),(a>h||-h>a)&&(this._addTween(t,i,r,r+a,i),this._overwriteProps.push(i)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=_gsScope.GreenSockGlobals||_gsScope,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,l=n._class,h=function(e,i){var s=l("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=l("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},c=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},f=function(e,i){var s=l("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},p=u("Back",f("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),f("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),f("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=l("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=l("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=l("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,l=e.taper||"none",h=[],_=0,u=0|(e.points||20),f=u,p=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--f>-1;)i=p?Math.random():1/u*f,s=d?d.getRatio(i):i,"none"===l?r=g:"out"===l?(n=1-i,r=n*n*g):"in"===l?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),p?s+=Math.random()*r-.5*r:f%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),h[_++]={x:i,y:s};for(h.sort(function(t,e){return t.x-e.x}),o=new c(1,1,null),f=u;--f>-1;)a=h[f],o=new c(a.x,a.y,o);this._prev=new c(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",h("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),h("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),h("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",h("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),h("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),h("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=l("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||s)/(1>t?t:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)+1},.45)),u("Expo",h("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),h("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),h("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",h("SineOut",function(t){return Math.sin(t*o)}),h("SineIn",function(t){return-Math.cos(t*o)+1}),h("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),l("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),p},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var s,r,n,a,o,l=function(t){var e,s=t.split("."),r=i;for(e=0;s.length>e;e++)r[s[e]]=r=r[s[e]]||{};return r},h=l("com.greensock"),_=1e-10,u=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},c=function(){},f=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),p={},m=function(s,r,n,a){this.sc=p[s]?p[s].sc:[],p[s]=this,this.gsClass=null,this.func=n;var o=[];this.check=function(h){for(var _,u,c,f,d,g=r.length,v=g;--g>-1;)(_=p[r[g]]||new m(r[g],[])).gsClass?(o[g]=_.gsClass,v--):h&&_.sc.push(this);if(0===v&&n)for(u=("com.greensock."+s).split("."),c=u.pop(),f=l(u.join("."))[c]=this.gsClass=n.apply(n,o),a&&(i[c]=f,d="undefined"!=typeof module&&module.exports,!d&&"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+s.split(".").pop(),[],function(){return f}):s===e&&d&&(module.exports=f)),g=0;this.sc.length>g;g++)this.sc[g].check()},this.check(!0)},d=t._gsDefine=function(t,e,i,s){return new m(t,e,i,s)},g=h._class=function(t,e,i){return e=e||function(){},d(t,[],function(){return e},i),e};d.globals=i;var v=[0,0,1,1],y=[],T=g("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?v.concat(e):v},!0),x=T.map={},w=T.register=function(t,e,i,s){for(var r,n,a,o,l=e.split(","),_=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=l[_],r=s?g("easing."+n,null,!0):h.easing[n]||{},a=u.length;--a>-1;)o=u[a],x[n+"."+o]=x[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(n=T.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},s=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=s.length;--r>-1;)n=s[r]+",Power"+r,w(new T(null,null,1,r),n,"easeOut",!0),w(new T(null,null,2,r),n,"easeIn"+(0===r?",easeNone":"")),w(new T(null,null,3,r),n,"easeInOut");x.linear=h.easing.Linear.easeIn,x.swing=h.easing.Quad.easeInOut;var b=g("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=b.prototype,n.addEventListener=function(t,e,i,s,r){r=r||0;var n,l,h=this._listeners[t],_=0;for(null==h&&(this._listeners[t]=h=[]),l=h.length;--l>-1;)n=h[l],n.c===e&&n.s===i?h.splice(l,1):0===_&&r>n.pr&&(_=l+1);h.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==a||o||a.wake()},n.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},n.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s&&(s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i))};var P=t.requestAnimationFrame,k=t.cancelAnimationFrame,S=Date.now||function(){return(new Date).getTime()},R=S();for(s=["ms","moz","webkit","o"],r=s.length;--r>-1&&!P;)P=t[s[r]+"RequestAnimationFrame"],k=t[s[r]+"CancelAnimationFrame"]||t[s[r]+"CancelRequestAnimationFrame"];g("Ticker",function(t,e){var i,s,r,n,l,h=this,u=S(),f=e!==!1&&P,p=500,m=33,d="tick",g=function(t){var e,a,o=S()-R;o>p&&(u+=o-m),R+=o,h.time=(R-u)/1e3,e=h.time-l,(!i||e>0||t===!0)&&(h.frame++,l+=e+(e>=n?.004:n-e),a=!0),t!==!0&&(r=s(g)),a&&h.dispatchEvent(d)};b.call(h),h.time=h.frame=0,h.tick=function(){g(!0)},h.lagSmoothing=function(t,e){p=t||1/_,m=Math.min(e,p,0)},h.sleep=function(){null!=r&&(f&&k?k(r):clearTimeout(r),s=c,r=null,h===a&&(o=!1))},h.wake=function(){null!==r?h.sleep():h.frame>10&&(R=S()-p+5),s=0===i?c:f&&P?P:function(t){return setTimeout(t,0|1e3*(l-h.time)+1)},h===a&&(o=!0),g(2)},h.fps=function(t){return arguments.length?(i=t,n=1/(i||60),l=this.time+n,h.wake(),void 0):i},h.useRAF=function(t){return arguments.length?(h.sleep(),f=t,h.fps(i),void 0):f},h.fps(t),setTimeout(function(){f&&5>h.frame&&h.useRAF(!1)},1500)}),n=h.Ticker.prototype=new h.events.EventDispatcher,n.constructor=h.Ticker;var O=g("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,W){o||a.wake();var i=this.vars.useFrames?G:W;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=O.ticker=new h.Ticker,n=O.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var A=function(){o&&S()-R>2e3&&a.wake(),setTimeout(A,2e3)};A(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return o||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n._callback=function(t){var e=this.vars;e[t].apply(e[t+"Scope"]||e.callbackScope||this,e[t+"Params"]||y)},n.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=f(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(F.length&&Q(),this.render(t,e,!1),F.length&&Q())}return this},n.progress=n.totalProgress=function(t,e){var i=this.duration();return arguments.length?this.totalTime(i*t,e):i?this._time/i:this.ratio},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||_,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;var e,i,s=this._timeline;return t!=this._paused&&s&&(o||t||a.wake(),e=s.rawTime(),i=e-this._pauseTime,!t&&s.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&(e=s.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,this.render(e,e===this._totalTime,!0))),this._gc&&!t&&this._enabled(!0,!1),this};var C=g("core.SimpleTimeline",function(t){O.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=C.prototype=new O,n.constructor=C,n.kill()._gc=!1,n._first=n._last=n._recent=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},n.rawTime=function(){return o||a.wake(),this._totalTime};var D=g("TweenLite",function(e,i,s){if(O.call(this,i,s),this.render=D.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:D.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),l=this.vars.overwrite;if(this._overwrite=l=null==l?V[D.defaultOverwrite]:"number"==typeof l?l>>0:V[l],(o||e instanceof Array||e.push&&f(e))&&"number"!=typeof e[0])for(this._targets=a=u(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(u(n))):(this._siblings[r]=$(n,this,!1),1===l&&this._siblings[r].length>1&&K(n,this,null,1,this._siblings[r])):(n=a[r--]=D.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=$(e,this,!1),1===l&&this._siblings.length>1&&K(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-_,this.render(-this._delay))},!0),M=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},z=function(t,e){var i,s={};for(i in t)q[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!j[i]||j[i]&&j[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};n=D.prototype=new O,n.constructor=D,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,D.version="1.18.0",D.defaultEase=n._ease=new T(null,null,1,1),D.defaultOverwrite="auto",D.ticker=a,D.autoSleep=120,D.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},D.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(D.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var F=[],I={},E=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,N=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.blob?t?this.join(""):this.start:i.c*t+i.s,i.r?e=Math.round(e):s>e&&e>-s&&(e=0),i.f?i.fp?i.t[i.p](i.fp,e):i.t[i.p](e):i.t[i.p]=e,i=i._next},L=function(t,e,i,s){var r,n,a,o,l,h,_,u=[t,e],c=0,f="",p=0;for(u.start=t,i&&(i(u),t=u[0],e=u[1]),u.length=0,r=t.match(E)||[],n=e.match(E)||[],s&&(s._next=null,s.blob=1,u._firstPT=s),l=n.length,o=0;l>o;o++)_=n[o],h=e.substr(c,e.indexOf(_,c)-c),f+=h||!o?h:",",c+=h.length,p?p=(p+1)%5:"rgba("===h.substr(-5)&&(p=1),_===r[o]||o>=r.length?f+=_:(f&&(u.push(f),f=""),a=parseFloat(r[o]),u.push(a),u._firstPT={_next:u._firstPT,t:u,p:u.length-1,s:a,c:("="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*parseFloat(_.substr(2)):parseFloat(_)-a)||0,f:0,r:p&&4>p}),c+=_.length;return f+=e.substr(c),f&&u.push(f),u.setRatio=N,u},X=function(t,e,i,s,r,n,a,o){var l,h,_="get"===i?t[e]:i,u=typeof t[e],c="string"==typeof s&&"="===s.charAt(1),f={t:t,p:e,s:_,f:"function"===u,pg:0,n:r||e,r:n,pr:0,c:c?parseInt(s.charAt(0)+"1",10)*parseFloat(s.substr(2)):parseFloat(s)-_||0};return"number"!==u&&("function"===u&&"get"===i&&(h=e.indexOf("set")||"function"!=typeof t["get"+e.substr(3)]?e:"get"+e.substr(3),f.s=_=a?t[h](a):t[h]()),"string"==typeof _&&(a||isNaN(_))?(f.fp=a,l=L(_,s,o||D.defaultStringFilter,f),f={t:l,p:"setRatio",s:0,c:1,f:2,pg:0,n:r||e,pr:0}):c||(f.c=parseFloat(s)-parseFloat(_)||0)),f.c?((f._next=this._firstPT)&&(f._next._prev=f),this._firstPT=f,f):void 0},B=D._internals={isArray:f,isSelector:M,lazyTweens:F,blobDif:L},j=D._plugins={},Y=B.tweenLookup={},U=0,q=B.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1},V={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},G=O._rootFramesTimeline=new C,W=O._rootTimeline=new C,Z=30,Q=B.lazyRender=function(){var t,e=F.length;for(I={};--e>-1;)t=F[e],t&&t._lazy!==!1&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);F.length=0};W._startTime=a.time,G._startTime=a.frame,W._active=G._active=!0,setTimeout(Q,1),O._updateRoot=D.render=function(){var t,e,i;if(F.length&&Q(),W.render((a.time-W._startTime)*W._timeScale,!1,!1),G.render((a.frame-G._startTime)*G._timeScale,!1,!1),F.length&&Q(),a.frame>=Z){Z=a.frame+(parseInt(D.autoSleep,10)||120);
for(i in Y){for(e=Y[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete Y[i]}if(i=W._first,(!i||i._paused)&&D.autoSleep&&!G._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",O._updateRoot);var $=function(t,e,i){var s,r,n=t._gsTweenID;if(Y[n||(t._gsTweenID=n="t"+U++)]||(Y[n]={target:t,tweens:[]}),e&&(s=Y[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return Y[n].tweens},H=function(t,e,i,s){var r,n,a=t.vars.onOverwrite;return a&&(r=a(t,e,i,s)),a=D.onOverwrite,a&&(n=a(t,e,i,s)),r!==!1&&n!==!1},K=function(t,e,i,s,r){var n,a,o,l;if(1===s||s>=4){for(l=r.length,n=0;l>n;n++)if((o=r[n])!==e)o._gc||o._kill(null,t,e)&&(a=!0);else if(5===s)break;return a}var h,u=e._startTime+_,c=[],f=0,p=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(h=h||J(e,0,p),0===J(o,h,p)&&(c[f++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((p||!o._initted)&&2e-10>=u-o._startTime||(c[f++]=o)));for(n=f;--n>-1;)if(o=c[n],2===s&&o._kill(i,t,e)&&(a=!0),2!==s||!o._firstPT&&o._initted){if(2!==s&&!H(o,e))continue;o._enabled(!1,!1)&&(a=!0)}return a},J=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*_>n-e?_:(n+=t.totalDuration()/t._timeScale/r)>e+_?0:n-e-_};n._init=function(){var t,e,i,s,r,n=this.vars,a=this._overwrittenProps,o=this._duration,l=!!n.immediateRender,h=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={};for(s in n.startAt)r[s]=n.startAt[s];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=l&&n.lazy!==!1,r.startAt=r.delay=null,this._startAt=D.to(this.target,0,r),l)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(n.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(l=!1),i={};for(s in n)q[s]&&"autoCSS"!==s||(i[s]=n[s]);if(i.overwrite=0,i.data="isFromStart",i.lazy=l&&n.lazy!==!1,i.immediateRender=l,this._startAt=D.to(this.target,0,i),l){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=h=h?h instanceof T?h:"function"==typeof h?new T(h,n.easeParams):x[h]||D.defaultEase:D.defaultEase,n.easeParams instanceof Array&&h.config&&(this._ease=h.config.apply(h,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&D._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,s,r){var n,a,o,l,h,_;if(null==e)return!1;I[e._gsTweenID]&&Q(),this.vars.css||e.style&&e!==t&&e.nodeType&&j.css&&this.vars.autoCSS!==!1&&z(this.vars,e);for(n in this.vars)if(_=this.vars[n],q[n])_&&(_ instanceof Array||_.push&&f(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(j[n]&&(l=new j[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=h={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:1,n:n,pg:1,pr:l._priority},a=l._overwriteProps.length;--a>-1;)i[l._overwriteProps[a]]=this._firstPT;(l._priority||l._onInitAllProps)&&(o=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0),h._next&&(h._next._prev=h)}else i[n]=X.call(this,e,n,"get",_,n,0,null,this.vars.stringFilter);return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&K(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(I[e._gsTweenID]=!0),o)},n.render=function(t,e,i){var s,r,n,a,o=this._time,l=this._duration,h=this._rawPrevTime;if(t>=l)this._totalTime=this._time=l,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===l&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>h||h===_&&"isPause"!==this.data)&&h!==t&&(i=!0,h>_&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||h===t?t:_);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===l&&h>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===l&&(this._initted||!this.vars.lazy||i)&&(h>=0&&(h!==_||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=a=!e||t||h===t?t:_)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var u=t/l,c=this._easeType,f=this._easePower;(1===c||3===c&&u>=.5)&&(u=1-u),3===c&&(u*=2),1===f?u*=u:2===f?u*=u*u:3===f?u*=u*u*u:4===f&&(u*=u*u*u*u),this.ratio=1===c?1-u:2===c?u:.5>t/l?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/l);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=h,F.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/l):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===l)&&(e||this._callback("onStart"))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&t!==-1e-4&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._callback("onUpdate")),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&t!==-1e-4&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this._callback(r),0===l&&this._rawPrevTime===_&&a!==_&&(this._rawPrevTime=0))}},n._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:D.selector(e)||e;var s,r,n,a,o,l,h,_,u,c=i&&this._time&&i._startTime===this._startTime&&this._timeline===i._timeline;if((f(e)||M(e))&&"number"!=typeof e[0])for(s=e.length;--s>-1;)this._kill(t,e[s],i)&&(l=!0);else{if(this._targets){for(s=this._targets.length;--s>-1;)if(e===this._targets[s]){o=this._propLookup[s]||{},this._overwrittenProps=this._overwrittenProps||[],r=this._overwrittenProps[s]=t?this._overwrittenProps[s]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,r=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(h=t||o,_=t!==r&&"all"!==r&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(D.onOverwrite||this.vars.onOverwrite)){for(n in h)o[n]&&(u||(u=[]),u.push(n));if((u||!t)&&!H(this,i,e,u))return!1}for(n in h)(a=o[n])&&(c&&(a.f?a.t[a.p](a.s):a.t[a.p]=a.s,l=!0),a.pg&&a.t._kill(h)&&(l=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[n]),_&&(r[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},n.invalidate=function(){return this._notifyPluginsOfEnabled&&D._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],O.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-_,this.render(-this._delay)),this},n._enabled=function(t,e){if(o||a.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=$(s[i],this,!0);else this._siblings=$(this.target,this,!0)}return O.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?D._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},D.to=function(t,e,i){return new D(t,e,i)},D.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new D(t,e,i)},D.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new D(t,e,s)},D.delayedCall=function(t,e,i,s,r){return new D(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:s,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,lazy:!1,useFrames:r,overwrite:0})},D.set=function(t,e){return new D(t,0,e)},D.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:D.selector(t)||t;var i,s,r,n;if((f(t)||M(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(D.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=$(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},D.killTweensOf=D.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=D.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var te=g("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=te.prototype},!0);if(n=te.prototype,te.version="1.18.0",te.API=2,n._firstPT=null,n._addTween=X,n.setRatio=N,n._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},D._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},te.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===te.API&&(j[(new t[e])._propName]=t[e]);return!0},d.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=g("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){te.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new te(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,te.activate([a]),a},s=t._gsQueue){for(r=0;s.length>r;r++)s[r]();for(n in p)p[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}o=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");
/*! howler.js v2.0.4 | (c) 2013-2017, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._counter=1e3,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.mobileAutoEnable=!0,e._setup(),e},volume:function(e){var o=this||n;if(e=parseFloat(e),o.ctx||_(),void 0!==e&&e>=0&&e<=1){if(o._volume=e,o._muted)return o;o.usingWebAudio&&(o.masterGain.gain.value=e);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.volume=u._volume*e)}return o}return o._volume},mute:function(e){var o=this||n;o.ctx||_(),o._muted=e,o.usingWebAudio&&(o.masterGain.gain.value=e?0:o._volume);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.muted=!!e||u._muted)}return o},unload:function(){for(var e=this||n,o=e._howls.length-1;o>=0;o--)e._howls[o].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx?e.ctx.state||"running":"running",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{var o=new Audio;void 0===o.oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{var o=new Audio;o.muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,o=null;try{o="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!o||"function"!=typeof o.canPlayType)return e;var t=o.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!t&&!o.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(o.canPlayType("audio/x-flac;")||o.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||n,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator&&e._navigator.userAgent),t=!!("ontouchend"in window||e._navigator&&e._navigator.maxTouchPoints>0||e._navigator&&e._navigator.msMaxTouchPoints>0);if(!e._mobileEnabled&&e.ctx&&(o||t)){e._mobileEnabled=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var r=function(){n._autoResume();var o=e.ctx.createBufferSource();o.buffer=e._scratchBuffer,o.connect(e.ctx.destination),void 0===o.start?o.noteOn(0):o.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),o.onended=function(){o.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&n.usingWebAudio){for(var o=0;o<e._howls.length;o++)if(e._howls[o]._webAudio)for(var t=0;t<e._howls[o]._sounds.length;t++)if(!e._howls[o]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,o=function(e){var n=this;if(!e.src||0===e.src.length)return void console.error("An array of source files must be passed with any new Howl.");n.init(e)};o.prototype={init:function(e){var o=this;return n.ctx||_(),o._autoplay=e.autoplay||!1,o._format="string"!=typeof e.format?e.format:[e.format],o._html5=e.html5||!1,o._muted=e.mute||!1,o._loop=e.loop||!1,o._pool=e.pool||5,o._preload="boolean"!=typeof e.preload||e.preload,o._rate=e.rate||1,o._sprite=e.sprite||{},o._src="string"!=typeof e.src?e.src:[e.src],o._volume=void 0!==e.volume?e.volume:1,o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._onend=e.onend?[{fn:e.onend}]:[],o._onfade=e.onfade?[{fn:e.onfade}]:[],o._onload=e.onload?[{fn:e.onload}]:[],o._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],o._onpause=e.onpause?[{fn:e.onpause}]:[],o._onplay=e.onplay?[{fn:e.onplay}]:[],o._onstop=e.onstop?[{fn:e.onstop}]:[],o._onmute=e.onmute?[{fn:e.onmute}]:[],o._onvolume=e.onvolume?[{fn:e.onvolume}]:[],o._onrate=e.onrate?[{fn:e.onrate}]:[],o._onseek=e.onseek?[{fn:e.onseek}]:[],o._onresume=[],o._webAudio=n.usingWebAudio&&!o._html5,void 0!==n.ctx&&n.ctx&&n.mobileAutoEnable&&n._enableMobileAudio(),n._howls.push(o),o._autoplay&&o._queue.push({event:"play",action:function(){o.play()}}),o._preload&&o.load(),o},load:function(){var e=this,o=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var u,i;if(e._format&&e._format[r])u=e._format[r];else{if("string"!=typeof(i=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}u=/^data:audio\/([^;,]+);/i.exec(i),u||(u=/\.([^.]+)$/.exec(i.split("?",1)[0])),u&&(u=u[1].toLowerCase())}if(u||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),u&&n.codecs(u)){o=e._src[r];break}}return o?(e._src=o,e._state="loading","https:"===window.location.protocol&&"http:"===o.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new t(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,o){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e){e="__default";for(var a=0,u=0;u<t._sounds.length;u++)t._sounds[u]._paused&&!t._sounds[u]._ended&&(a++,r=t._sounds[u]._id);1===a?e=null:r=null}}var i=r?t._soundById(r):t._inactiveSound();if(!i)return null;if(r&&!e&&(e=i._sprite||"__default"),"loaded"!==t._state){i._sprite=e,i._ended=!1;var d=i._id;return t._queue.push({event:"play",action:function(){t.play(d)}}),d}if(r&&!i._paused)return o||setTimeout(function(){t._emit("play",i._id)},0),i._id;t._webAudio&&n._autoResume();var _=Math.max(0,i._seek>0?i._seek:t._sprite[e][0]/1e3),s=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-_),l=1e3*s/Math.abs(i._rate);i._paused=!1,i._ended=!1,i._sprite=e,i._seek=_,i._start=t._sprite[e][0]/1e3,i._stop=(t._sprite[e][0]+t._sprite[e][1])/1e3,i._loop=!(!i._loop&&!t._sprite[e][2]);var c=i._node;if(t._webAudio){var f=function(){t._refreshBuffer(i);var e=i._muted||t._muted?0:i._volume;c.gain.setValueAtTime(e,n.ctx.currentTime),i._playStart=n.ctx.currentTime,void 0===c.bufferSource.start?i._loop?c.bufferSource.noteGrainOn(0,_,86400):c.bufferSource.noteGrainOn(0,_,s):i._loop?c.bufferSource.start(0,_,86400):c.bufferSource.start(0,_,s),l!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),l)),o||setTimeout(function(){t._emit("play",i._id)},0)},p="running"===n.state;if("loaded"===t._state&&p)f();else{var v=p||"loaded"!==t._state?"load":"resume";t.once(v,f,p?i._id:null),t._clearTimer(i._id)}}else{var m=function(){c.currentTime=_,c.muted=i._muted||t._muted||n._muted||c.muted,c.volume=i._volume*n.volume(),c.playbackRate=i._rate,c.play(),l!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),l)),o||t._emit("play",i._id)},h="loaded"===t._state&&(window&&window.ejecta||!c.readyState&&n._navigator.isCocoonJS);if(4===c.readyState||h)m();else{var g=function(){m(),c.removeEventListener(n._canPlayEvent,g,!1)};c.addEventListener(n._canPlayEvent,g,!1),t._clearTimer(i._id)}}return i._id},pause:function(e){var n=this;if("loaded"!==n._state)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused&&(r._seek=n.seek(o[t]),r._rateSeek=0,r._paused=!0,n._stopFade(o[t]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var o=this;if("loaded"!==o._state)return o._queue.push({event:"stop",action:function(){o.stop(e)}}),o;for(var t=o._getSoundIds(e),r=0;r<t.length;r++){o._clearTimer(t[r]);var a=o._soundById(t[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,o._stopFade(t[r]),a._node&&(o._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),o._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause())),n||o._emit("stop",a._id))}return o},mute:function(e,o){var t=this;if("loaded"!==t._state)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if(void 0===o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),a=0;a<r.length;a++){var u=t._soundById(r[a]);u&&(u._muted=e,t._webAudio&&u._node?u._node.gain.setValueAtTime(e?0:u._volume,n.ctx.currentTime):u._node&&(u._node.muted=!!n._muted||e),t._emit("mute",u._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length||2===r.length&&void 0===r[1]){t._getSoundIds().indexOf(r[0])>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var a;if(!(void 0!==e&&e>=0&&e<=1))return a=o?t._soundById(o):t._sounds[0],a?a._volume:0;if("loaded"!==t._state)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;void 0===o&&(t._volume=e),o=t._getSoundIds(o);for(var u=0;u<o.length;u++)(a=t._soundById(o[u]))&&(a._volume=e,r[2]||t._stopFade(o[u]),t._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(e,n.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=e*n.volume()),t._emit("volume",a._id));return t},fade:function(e,o,t,r){var a=this,u=Math.abs(e-o),i=e>o?"out":"in",d=u/.01,_=d>0?t/d:t;if(_<4&&(d=Math.ceil(d/(4/_)),_=4),"loaded"!==a._state)return a._queue.push({event:"fade",action:function(){a.fade(e,o,t,r)}}),a;a.volume(e,r);for(var s=a._getSoundIds(r),l=0;l<s.length;l++){var c=a._soundById(s[l]);if(c){if(r||a._stopFade(s[l]),a._webAudio&&!c._muted){var f=n.ctx.currentTime,p=f+t/1e3;c._volume=e,c._node.gain.setValueAtTime(e,f),c._node.gain.linearRampToValueAtTime(o,p)}var v=e;c._interval=setInterval(function(n,t){d>0&&(v+="in"===i?.01:-.01),v=Math.max(0,v),v=Math.min(1,v),v=Math.round(100*v)/100,a._webAudio?(void 0===r&&(a._volume=v),t._volume=v):a.volume(v,n,!0),(o<e&&v<=o||o>e&&v>=o)&&(clearInterval(t._interval),t._interval=null,a.volume(o,n),a._emit("fade",n))}.bind(a,s[l],c),_)}}return a},_stopFade:function(e){var o=this,t=o._soundById(e);return t&&t._interval&&(o._webAudio&&t._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(t._interval),t._interval=null,o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(o=t._soundById(parseInt(r[0],10)))&&o._loop;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=t._getSoundIds(n),u=0;u<a.length;u++)(o=t._soundById(a[u]))&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e,e&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop)));return t},rate:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if("number"!=typeof e)return i=t._soundById(o),i?i._rate:t._rate;if("loaded"!==t._state)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;void 0===o&&(t._rate=e),o=t._getSoundIds(o);for(var d=0;d<o.length;d++)if(i=t._soundById(o[d])){i._rateSeek=t.seek(o[d]),i._playStart=t._webAudio?n.ctx.currentTime:i._playStart,i._rate=e,t._webAudio&&i._node&&i._node.bufferSource?i._node.bufferSource.playbackRate.value=e:i._node&&(i._node.playbackRate=e);var _=t.seek(o[d]),s=(t._sprite[i._sprite][0]+t._sprite[i._sprite][1])/1e3-_,l=1e3*s/Math.abs(i._rate);!t._endTimers[o[d]]&&i._paused||(t._clearTimer(o[d]),t._endTimers[o[d]]=setTimeout(t._ended.bind(t,i),l)),t._emit("rate",i._id)}return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if(void 0===o)return t;if("loaded"!==t._state)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var i=t._soundById(o);if(i){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var d=t.playing(o)?n.ctx.currentTime-i._playStart:0,_=i._rateSeek?i._rateSeek-i._seek:0;return i._seek+(_+d*Math.abs(i._rate))}return i._node.currentTime}var s=t.playing(o);s&&t.pause(o,!0),i._seek=e,i._ended=!1,t._clearTimer(o),s&&t.play(o,!0),!t._webAudio&&i._node&&(i._node.currentTime=e),t._emit("seek",o)}return t},playing:function(e){var n=this;if("number"==typeof e){var o=n._soundById(e);return!!o&&!o._paused}for(var t=0;t<n._sounds.length;t++)if(!n._sounds[t]._paused)return!0;return!1},duration:function(e){var n=this,o=n._duration,t=n._soundById(e);return t&&(o=n._sprite[t._sprite][1]/1e3),o},state:function(){return this._state},unload:function(){for(var e=this,o=e._sounds,t=0;t<o.length;t++){if(o[t]._paused||e.stop(o[t]._id),!e._webAudio){/MSIE |Trident\//.test(n._navigator&&n._navigator.userAgent)||(o[t]._node.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"),o[t]._node.removeEventListener("error",o[t]._errorFn,!1),o[t]._node.removeEventListener(n._canPlayEvent,o[t]._loadFn,!1)}delete o[t]._node,e._clearTimer(o[t]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1)}var u=!0;for(t=0;t<n._howls.length;t++)if(n._howls[t]._src===e._src){u=!1;break}return r&&u&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,a=r["_on"+e];return"function"==typeof n&&a.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e],a=0;if("number"==typeof n&&(o=n,n=null),n||o)for(a=0;a<r.length;a++){var u=o===r[a].id;if(n===r[a].fn&&u||!n&&u){r.splice(a,1);break}}else if(e)t["_on"+e]=[];else{var i=Object.keys(t);for(a=0;a<i.length;a++)0===i[a].indexOf("_on")&&Array.isArray(t[i[a]])&&(t[i[a]]=[])}return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[a].fn),0),r[a].once&&t.off(e,r[a].fn,r[a].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite;if(!o._webAudio&&o._node&&!o._node.ended)return setTimeout(o._ended.bind(o,e),100),o;var r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id,!0).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),a)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,o._clearTimer(e._id),o._cleanBuffer(e._node),n._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new t(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(o<=n)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if(void 0===e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[o._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=e._rate,o},_cleanBuffer:function(e){var n=this;if(n._scratchBuffer){e.bufferSource.onended=null,e.bufferSource.disconnect(0);try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}}return e.bufferSource=null,n}};var t=function(e){this._parent=e,this.init()};t.prototype={init:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,o._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=n._muted||e._muted||e._parent._muted?0:e._volume;return o._webAudio?(e._node=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(t,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t*n.volume(),e._node.load()),e},reset:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._rate=o._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,o=e._parent;o._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(o._sprite).length&&(o._sprite={__default:[0,1e3*o._duration]}),"loaded"!==o._state&&(o._state="loaded",o._emit("load"),o._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void d(e);if(/^data:[^;]+;base64,/.test(n)){for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),a=0;a<o.length;++a)t[a]=o.charCodeAt(a);i(t.buffer,e)}else{var _=new XMLHttpRequest;_.open("GET",n,!0),_.responseType="arraybuffer",_.onload=function(){var n=(_.status+"")[0];if("0"!==n&&"2"!==n&&"3"!==n)return void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");i(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},u(_)}},u=function(e){try{e.send()}catch(n){e.onerror()}},i=function(e,o){n.ctx.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(r[o._src]=e,d(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},d=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},_=function(){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),o=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=o?parseInt(o[1],10):null;if(e&&t&&t<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());(n._navigator&&n._navigator.standalone&&!r||n._navigator&&!n._navigator.standalone&&!r)&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.value=n._muted?0:1,n.masterGain.connect(n.ctx.destination)),n._setup()};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:o}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=o),"undefined"!=typeof window?(window.HowlerGlobal=e,window.Howler=n,window.Howl=o,window.Sound=t):"undefined"!=typeof global&&(global.HowlerGlobal=e,global.Howler=n,global.Howl=o,global.Sound=t)}();
/*! Spatial Plugin */
!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(n){var e=this;if(!e.ctx||!e.ctx.listener)return e;for(var o=e._howls.length-1;o>=0;o--)e._howls[o].stereo(n);return e},HowlerGlobal.prototype.pos=function(n,e,o){var t=this;return t.ctx&&t.ctx.listener?(e="number"!=typeof e?t._pos[1]:e,o="number"!=typeof o?t._pos[2]:o,"number"!=typeof n?t._pos:(t._pos=[n,e,o],t.ctx.listener.setPosition(t._pos[0],t._pos[1],t._pos[2]),t)):t},HowlerGlobal.prototype.orientation=function(n,e,o,t,r,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var p=a._orientation;return e="number"!=typeof e?p[1]:e,o="number"!=typeof o?p[2]:o,t="number"!=typeof t?p[3]:t,r="number"!=typeof r?p[4]:r,i="number"!=typeof i?p[5]:i,"number"!=typeof n?p:(a._orientation=[n,e,o,t,r,i],a.ctx.listener.setOrientation(n,e,o,t,r,i),a)},Howl.prototype.init=function(n){return function(e){var o=this;return o._orientation=e.orientation||[1,0,0],o._stereo=e.stereo||null,o._pos=e.pos||null,o._pannerAttr={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:360,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:360,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:0,distanceModel:void 0!==e.distanceModel?e.distanceModel:"inverse",maxDistance:void 0!==e.maxDistance?e.maxDistance:1e4,panningModel:void 0!==e.panningModel?e.panningModel:"HRTF",refDistance:void 0!==e.refDistance?e.refDistance:1,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:1},o._onstereo=e.onstereo?[{fn:e.onstereo}]:[],o._onpos=e.onpos?[{fn:e.onpos}]:[],o._onorientation=e.onorientation?[{fn:e.onorientation}]:[],n.call(this,e)}}(Howl.prototype.init),Howl.prototype.stereo=function(e,o){var t=this;if(!t._webAudio)return t;if("loaded"!==t._state)return t._queue.push({event:"stereo",action:function(){t.stereo(e,o)}}),t;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===o){if("number"!=typeof e)return t._stereo;t._stereo=e,t._pos=[e,0,0]}for(var i=t._getSoundIds(o),a=0;a<i.length;a++){var p=t._soundById(i[a]);if(p){if("number"!=typeof e)return p._stereo;p._stereo=e,p._pos=[e,0,0],p._node&&(p._pannerAttr.panningModel="equalpower",p._panner&&p._panner.pan||n(p,r),"spatial"===r?p._panner.setPosition(e,0,0):p._panner.pan.value=e),t._emit("stereo",p._id)}}return t},Howl.prototype.pos=function(e,o,t,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"pos",action:function(){i.pos(e,o,t,r)}}),i;if(o="number"!=typeof o?0:o,t="number"!=typeof t?-.5:t,void 0===r){if("number"!=typeof e)return i._pos;i._pos=[e,o,t]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var s=i._soundById(a[p]);if(s){if("number"!=typeof e)return s._pos;s._pos=[e,o,t],s._node&&(s._panner&&!s._panner.pan||n(s,"spatial"),s._panner.setPosition(e,o,t)),i._emit("pos",s._id)}}return i},Howl.prototype.orientation=function(e,o,t,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"orientation",action:function(){i.orientation(e,o,t,r)}}),i;if(o="number"!=typeof o?i._orientation[1]:o,t="number"!=typeof t?i._orientation[2]:t,void 0===r){if("number"!=typeof e)return i._orientation;i._orientation=[e,o,t]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var s=i._soundById(a[p]);if(s){if("number"!=typeof e)return s._orientation;s._orientation=[e,o,t],s._node&&(s._panner||(s._pos||(s._pos=i._pos||[0,0,-.5]),n(s,"spatial")),s._panner.setOrientation(e,o,t)),i._emit("orientation",s._id)}}return i},Howl.prototype.pannerAttr=function(){var e,o,t,r=this,i=arguments;if(!r._webAudio)return r;if(0===i.length)return r._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return t=r._soundById(parseInt(i[0],10)),t?t._pannerAttr:r._pannerAttr;e=i[0],void 0===o&&(r._pannerAttr={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:r._distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:r._maxDistance,panningModel:void 0!==e.panningModel?e.panningModel:r._panningModel,refDistance:void 0!==e.refDistance?e.refDistance:r._refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:r._rolloffFactor})}else 2===i.length&&(e=i[0],o=parseInt(i[1],10));for(var a=r._getSoundIds(o),p=0;p<a.length;p++)if(t=r._soundById(a[p])){var s=t._pannerAttr;s={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:s.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:s.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:s.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:s.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:s.maxDistance,panningModel:void 0!==e.panningModel?e.panningModel:s.panningModel,refDistance:void 0!==e.refDistance?e.refDistance:s.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:s.rolloffFactor};var l=t._panner;l?(l.coneInnerAngle=s.coneInnerAngle,l.coneOuterAngle=s.coneOuterAngle,l.coneOuterGain=s.coneOuterGain,l.distanceModel=s.distanceModel,l.maxDistance=s.maxDistance,l.panningModel=s.panningModel,l.refDistance=s.refDistance,l.rolloffFactor=s.rolloffFactor):(t._pos||(t._pos=r._pos||[0,0,-.5]),n(t,"spatial"))}return r},Sound.prototype.init=function(n){return function(){var e=this,o=e._parent;e._orientation=o._orientation,e._stereo=o._stereo,e._pos=o._pos,e._pannerAttr=o._pannerAttr,n.call(this),e._stereo?o.stereo(e._stereo):e._pos&&o.pos(e._pos[0],e._pos[1],e._pos[2],e._id)}}(Sound.prototype.init),Sound.prototype.reset=function(n){return function(){var e=this,o=e._parent;return e._orientation=o._orientation,e._pos=o._pos,e._pannerAttr=o._pannerAttr,n.call(this)}}(Sound.prototype.reset);var n=function(n,e){e=e||"spatial","spatial"===e?(n._panner=Howler.ctx.createPanner(),n._panner.coneInnerAngle=n._pannerAttr.coneInnerAngle,n._panner.coneOuterAngle=n._pannerAttr.coneOuterAngle,n._panner.coneOuterGain=n._pannerAttr.coneOuterGain,n._panner.distanceModel=n._pannerAttr.distanceModel,n._panner.maxDistance=n._pannerAttr.maxDistance,n._panner.panningModel=n._pannerAttr.panningModel,n._panner.refDistance=n._pannerAttr.refDistance,n._panner.rolloffFactor=n._pannerAttr.rolloffFactor,n._panner.setPosition(n._pos[0],n._pos[1],n._pos[2]),n._panner.setOrientation(n._orientation[0],n._orientation[1],n._orientation[2])):(n._panner=Howler.ctx.createStereoPanner(),n._panner.pan.value=n._stereo),n._panner.connect(n._node),n._paused||n._parent.pause(n._id,!0).play(n._id)}}();