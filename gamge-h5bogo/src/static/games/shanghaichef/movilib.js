!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.PIXI=t()}}(function(){var t;return function e(t,r,i){function n(s,a){if(!r[s]){if(!t[s]){var h="function"==typeof require&&require;if(!a&&h)return h(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[s]={exports:{}};t[s][0].call(l.exports,function(e){var r=t[s][1][e];return n(r?r:e)},l,l.exports,e,t,r,i)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(e,r,i){(function(e,i){!function(){function n(){}function o(t){return t}function s(t){return!!t}function a(t){return!t}function h(t){return function(){if(null===t)throw new Error("Callback was already called.");t.apply(this,arguments),t=null}}function u(t){return function(){null!==t&&(t.apply(this,arguments),t=null)}}function l(t){return j(t)||"number"==typeof t.length&&t.length>=0&&t.length%1===0}function c(t,e){for(var r=-1,i=t.length;++r<i;)e(t[r],r,t)}function p(t,e){for(var r=-1,i=t.length,n=Array(i);++r<i;)n[r]=e(t[r],r,t);return n}function d(t){return p(Array(t),function(t,e){return e})}function f(t,e,r){return c(t,function(t,i,n){r=e(r,t,i,n)}),r}function v(t,e){c(Y(t),function(r){e(t[r],r)})}function g(t,e){for(var r=0;r<t.length;r++)if(t[r]===e)return r;return-1}function m(t){var e,r,i=-1;return l(t)?(e=t.length,function(){return i++,e>i?i:null}):(r=Y(t),e=r.length,function(){return i++,e>i?r[i]:null})}function y(t,e){return e=null==e?t.length-1:+e,function(){for(var r=Math.max(arguments.length-e,0),i=Array(r),n=0;r>n;n++)i[n]=arguments[n+e];switch(e){case 0:return t.call(this,i);case 1:return t.call(this,arguments[0],i)}}}function x(t){return function(e,r,i){return t(e,i)}}function b(t){return function(e,r,i){i=u(i||n),e=e||[];var o=m(e);if(0>=t)return i(null);var s=!1,a=0,l=!1;!function c(){if(s&&0>=a)return i(null);for(;t>a&&!l;){var n=o();if(null===n)return s=!0,void(0>=a&&i(null));a+=1,r(e[n],n,h(function(t){a-=1,t?(i(t),l=!0):c()}))}}()}}function _(t){return function(e,r,i){return t(N.eachOf,e,r,i)}}function T(t){return function(e,r,i,n){return t(b(r),e,i,n)}}function E(t){return function(e,r,i){return t(N.eachOfSeries,e,r,i)}}function S(t,e,r,i){i=u(i||n),e=e||[];var o=l(e)?[]:{};t(e,function(t,e,i){r(t,function(t,r){o[e]=r,i(t)})},function(t){i(t,o)})}function w(t,e,r,i){var n=[];t(e,function(t,e,i){r(t,function(r){r&&n.push({index:e,value:t}),i()})},function(){i(p(n.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})}function A(t,e,r,i){w(t,e,function(t,e){r(t,function(t){e(!t)})},i)}function C(t,e,r){return function(i,n,o,s){function a(){s&&s(r(!1,void 0))}function h(t,i,n){return s?void o(t,function(i){s&&e(i)&&(s(r(!0,t)),s=o=!1),n()}):n()}arguments.length>3?t(i,n,h,a):(s=o,o=n,t(i,h,a))}}function M(t,e){return e}function R(t,e,r){r=r||n;var i=l(e)?[]:{};t(e,function(t,e,r){t(y(function(t,n){n.length<=1&&(n=n[0]),i[e]=n,r(t)}))},function(t){r(t,i)})}function O(t,e,r,i){var n=[];t(e,function(t,e,i){r(t,function(t,e){n=n.concat(e||[]),i(t)})},function(t){i(t,n)})}function P(t,e,r){function i(t,e,r,i){if(null!=i&&"function"!=typeof i)throw new Error("task callback must be a function");return t.started=!0,j(e)||(e=[e]),0===e.length&&t.idle()?N.setImmediate(function(){t.drain()}):(c(e,function(e){var o={data:e,callback:i||n};r?t.tasks.unshift(o):t.tasks.push(o),t.tasks.length===t.concurrency&&t.saturated()}),void N.setImmediate(t.process))}function o(t,e){return function(){s-=1;var r=!1,i=arguments;c(e,function(t){c(a,function(e,i){e!==t||r||(a.splice(i,1),r=!0)}),t.callback.apply(t,i)}),t.tasks.length+s===0&&t.drain(),t.process()}}if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var s=0,a=[],u={tasks:[],concurrency:e,payload:r,saturated:n,empty:n,drain:n,started:!1,paused:!1,push:function(t,e){i(u,t,!1,e)},kill:function(){u.drain=n,u.tasks=[]},unshift:function(t,e){i(u,t,!0,e)},process:function(){for(;!u.paused&&s<u.concurrency&&u.tasks.length;){var e=u.payload?u.tasks.splice(0,u.payload):u.tasks.splice(0,u.tasks.length),r=p(e,function(t){return t.data});0===u.tasks.length&&u.empty(),s+=1,a.push(e[0]);var i=h(o(u,e));t(r,i)}},length:function(){return u.tasks.length},running:function(){return s},workersList:function(){return a},idle:function(){return u.tasks.length+s===0},pause:function(){u.paused=!0},resume:function(){if(u.paused!==!1){u.paused=!1;for(var t=Math.min(u.concurrency,u.tasks.length),e=1;t>=e;e++)N.setImmediate(u.process)}}};return u}function F(t){return y(function(e,r){e.apply(null,r.concat([y(function(e,r){"object"==typeof console&&(e?console.error&&console.error(e):console[t]&&c(r,function(e){console[t](e)}))})]))})}function D(t){return function(e,r,i){t(d(e),r,i)}}function B(t){return y(function(e,r){var i=y(function(r){var i=this,n=r.pop();return t(e,function(t,e,n){t.apply(i,r.concat([n]))},n)});return r.length?i.apply(this,r):i})}function L(t){return y(function(e){var r=e.pop();e.push(function(){var t=arguments;i?N.setImmediate(function(){r.apply(null,t)}):r.apply(null,t)});var i=!0;t.apply(this,e),i=!1})}var I,N={},U="object"==typeof self&&self.self===self&&self||"object"==typeof i&&i.global===i&&i||this;null!=U&&(I=U.async),N.noConflict=function(){return U.async=I,N};var k=Object.prototype.toString,j=Array.isArray||function(t){return"[object Array]"===k.call(t)},X=function(t){var e=typeof t;return"function"===e||"object"===e&&!!t},Y=Object.keys||function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);return e},G="function"==typeof setImmediate&&setImmediate,z=G?function(t){G(t)}:function(t){setTimeout(t,0)};"object"==typeof e&&"function"==typeof e.nextTick?N.nextTick=e.nextTick:N.nextTick=z,N.setImmediate=G?z:N.nextTick,N.forEach=N.each=function(t,e,r){return N.eachOf(t,x(e),r)},N.forEachSeries=N.eachSeries=function(t,e,r){return N.eachOfSeries(t,x(e),r)},N.forEachLimit=N.eachLimit=function(t,e,r,i){return b(e)(t,x(r),i)},N.forEachOf=N.eachOf=function(t,e,r){function i(t){a--,t?r(t):null===o&&0>=a&&r(null)}r=u(r||n),t=t||[];for(var o,s=m(t),a=0;null!=(o=s());)a+=1,e(t[o],o,h(i));0===a&&r(null)},N.forEachOfSeries=N.eachOfSeries=function(t,e,r){function i(){var n=!0;return null===s?r(null):(e(t[s],s,h(function(t){if(t)r(t);else{if(s=o(),null===s)return r(null);n?N.setImmediate(i):i()}})),void(n=!1))}r=u(r||n),t=t||[];var o=m(t),s=o();i()},N.forEachOfLimit=N.eachOfLimit=function(t,e,r,i){b(e)(t,r,i)},N.map=_(S),N.mapSeries=E(S),N.mapLimit=T(S),N.inject=N.foldl=N.reduce=function(t,e,r,i){N.eachOfSeries(t,function(t,i,n){r(e,t,function(t,r){e=r,n(t)})},function(t){i(t,e)})},N.foldr=N.reduceRight=function(t,e,r,i){var n=p(t,o).reverse();N.reduce(n,e,r,i)},N.transform=function(t,e,r,i){3===arguments.length&&(i=r,r=e,e=j(t)?[]:{}),N.eachOf(t,function(t,i,n){r(e,t,i,n)},function(t){i(t,e)})},N.select=N.filter=_(w),N.selectLimit=N.filterLimit=T(w),N.selectSeries=N.filterSeries=E(w),N.reject=_(A),N.rejectLimit=T(A),N.rejectSeries=E(A),N.any=N.some=C(N.eachOf,s,o),N.someLimit=C(N.eachOfLimit,s,o),N.all=N.every=C(N.eachOf,a,a),N.everyLimit=C(N.eachOfLimit,a,a),N.detect=C(N.eachOf,o,M),N.detectSeries=C(N.eachOfSeries,o,M),N.detectLimit=C(N.eachOfLimit,o,M),N.sortBy=function(t,e,r){function i(t,e){var r=t.criteria,i=e.criteria;return i>r?-1:r>i?1:0}N.map(t,function(t,r){e(t,function(e,i){e?r(e):r(null,{value:t,criteria:i})})},function(t,e){return t?r(t):void r(null,p(e.sort(i),function(t){return t.value}))})},N.auto=function(t,e,r){function i(t){m.unshift(t)}function o(t){var e=g(m,t);e>=0&&m.splice(e,1)}function s(){h--,c(m.slice(0),function(t){t()})}"function"==typeof arguments[1]&&(r=e,e=null),r=u(r||n);var a=Y(t),h=a.length;if(!h)return r(null);e||(e=h);var l={},p=0,d=!1,m=[];i(function(){h||r(null,l)}),c(a,function(n){function a(){return e>p&&f(x,function(t,e){return t&&l.hasOwnProperty(e)},!0)&&!l.hasOwnProperty(n)}function h(){a()&&(p++,o(h),c[c.length-1](m,l))}if(!d){for(var u,c=j(t[n])?t[n]:[t[n]],m=y(function(t,e){if(p--,e.length<=1&&(e=e[0]),t){var i={};v(l,function(t,e){i[e]=t}),i[n]=e,d=!0,r(t,i)}else l[n]=e,N.setImmediate(s)}),x=c.slice(0,c.length-1),b=x.length;b--;){if(!(u=t[x[b]]))throw new Error("Has nonexistent dependency in "+x.join(", "));if(j(u)&&g(u,n)>=0)throw new Error("Has cyclic dependencies")}a()?(p++,c[c.length-1](m,l)):i(h)}})},N.retry=function(t,e,r){function i(t,e){if("number"==typeof e)t.times=parseInt(e,10)||o;else{if("object"!=typeof e)throw new Error("Unsupported argument type for 'times': "+typeof e);t.times=parseInt(e.times,10)||o,t.interval=parseInt(e.interval,10)||s}}function n(t,e){function r(t,r){return function(i){t(function(t,e){i(!t||r,{err:t,result:e})},e)}}function i(t){return function(e){setTimeout(function(){e(null)},t)}}for(;h.times;){var n=!(h.times-=1);a.push(r(h.task,n)),!n&&h.interval>0&&a.push(i(h.interval))}N.series(a,function(e,r){r=r[r.length-1],(t||h.callback)(r.err,r.result)})}var o=5,s=0,a=[],h={times:o,interval:s},u=arguments.length;if(1>u||u>3)throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");return 2>=u&&"function"==typeof t&&(r=e,e=t),"function"!=typeof t&&i(h,t),h.callback=r,h.task=e,h.callback?n():n},N.waterfall=function(t,e){function r(t){return y(function(i,n){if(i)e.apply(null,[i].concat(n));else{var o=t.next();o?n.push(r(o)):n.push(e),L(t).apply(null,n)}})}if(e=u(e||n),!j(t)){var i=new Error("First argument to waterfall must be an array of functions");return e(i)}return t.length?void r(N.iterator(t))():e()},N.parallel=function(t,e){R(N.eachOf,t,e)},N.parallelLimit=function(t,e,r){R(b(e),t,r)},N.series=function(t,e){R(N.eachOfSeries,t,e)},N.iterator=function(t){function e(r){function i(){return t.length&&t[r].apply(null,arguments),i.next()}return i.next=function(){return r<t.length-1?e(r+1):null},i}return e(0)},N.apply=y(function(t,e){return y(function(r){return t.apply(null,e.concat(r))})}),N.concat=_(O),N.concatSeries=E(O),N.whilst=function(t,e,r){if(r=r||n,t()){var i=y(function(n,o){n?r(n):t.apply(this,o)?e(i):r.apply(null,[null].concat(o))});e(i)}else r(null)},N.doWhilst=function(t,e,r){var i=0;return N.whilst(function(){return++i<=1||e.apply(this,arguments)},t,r)},N.until=function(t,e,r){return N.whilst(function(){return!t.apply(this,arguments)},e,r)},N.doUntil=function(t,e,r){return N.doWhilst(t,function(){return!e.apply(this,arguments)},r)},N.during=function(t,e,r){r=r||n;var i=y(function(e,i){e?r(e):(i.push(o),t.apply(this,i))}),o=function(t,n){t?r(t):n?e(i):r(null)};t(o)},N.doDuring=function(t,e,r){var i=0;N.during(function(t){i++<1?t(null,!0):e.apply(this,arguments)},t,r)},N.queue=function(t,e){var r=P(function(e,r){t(e[0],r)},e,1);return r},N.priorityQueue=function(t,e){function r(t,e){return t.priority-e.priority}function i(t,e,r){for(var i=-1,n=t.length-1;n>i;){var o=i+(n-i+1>>>1);r(e,t[o])>=0?i=o:n=o-1}return i}function o(t,e,o,s){if(null!=s&&"function"!=typeof s)throw new Error("task callback must be a function");return t.started=!0,j(e)||(e=[e]),0===e.length?N.setImmediate(function(){t.drain()}):void c(e,function(e){var a={data:e,priority:o,callback:"function"==typeof s?s:n};t.tasks.splice(i(t.tasks,a,r)+1,0,a),t.tasks.length===t.concurrency&&t.saturated(),N.setImmediate(t.process)})}var s=N.queue(t,e);return s.push=function(t,e,r){o(s,t,e,r)},delete s.unshift,s},N.cargo=function(t,e){return P(t,1,e)},N.log=F("log"),N.dir=F("dir"),N.memoize=function(t,e){var r={},i={},n=Object.prototype.hasOwnProperty;e=e||o;var s=y(function(o){var s=o.pop(),a=e.apply(null,o);n.call(r,a)?N.setImmediate(function(){s.apply(null,r[a])}):n.call(i,a)?i[a].push(s):(i[a]=[s],t.apply(null,o.concat([y(function(t){r[a]=t;var e=i[a];delete i[a];for(var n=0,o=e.length;o>n;n++)e[n].apply(null,t)})])))});return s.memo=r,s.unmemoized=t,s},N.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},N.times=D(N.map),N.timesSeries=D(N.mapSeries),N.timesLimit=function(t,e,r,i){return N.mapLimit(d(t),e,r,i)},N.seq=function(){var t=arguments;return y(function(e){var r=this,i=e[e.length-1];"function"==typeof i?e.pop():i=n,N.reduce(t,e,function(t,e,i){e.apply(r,t.concat([y(function(t,e){i(t,e)})]))},function(t,e){i.apply(r,[t].concat(e))})})},N.compose=function(){return N.seq.apply(null,Array.prototype.reverse.call(arguments))},N.applyEach=B(N.eachOf),N.applyEachSeries=B(N.eachOfSeries),N.forever=function(t,e){function r(t){return t?i(t):void o(r)}var i=h(e||n),o=L(t);r()},N.ensureAsync=L,N.constant=y(function(t){var e=[null].concat(t);return function(t){return t.apply(this,e)}}),N.wrapSync=N.asyncify=function(t){return y(function(e){var r,i=e.pop();try{r=t.apply(this,e)}catch(n){return i(n)}X(r)&&"function"==typeof r.then?r.then(function(t){i(null,t)})["catch"](function(t){i(t.message?t:new Error(t))}):i(null,r)})},"object"==typeof r&&r.exports?r.exports=N:"function"==typeof t&&t.amd?t([],function(){return N}):U.async=N}()}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:3}],2:[function(t,e,r){(function(t){function e(t,e){for(var r=0,i=t.length-1;i>=0;i--){var n=t[i];"."===n?t.splice(i,1):".."===n?(t.splice(i,1),r++):r&&(t.splice(i,1),r--)}if(e)for(;r--;r)t.unshift("..");return t}function i(t,e){if(t.filter)return t.filter(e);for(var r=[],i=0;i<t.length;i++)e(t[i],i,t)&&r.push(t[i]);return r}var n=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(t){return n.exec(t).slice(1)};r.resolve=function(){for(var r="",n=!1,o=arguments.length-1;o>=-1&&!n;o--){var s=o>=0?arguments[o]:t.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(r=s+"/"+r,n="/"===s.charAt(0))}return r=e(i(r.split("/"),function(t){return!!t}),!n).join("/"),(n?"/":"")+r||"."},r.normalize=function(t){var n=r.isAbsolute(t),o="/"===s(t,-1);return t=e(i(t.split("/"),function(t){return!!t}),!n).join("/"),t||n||(t="."),t&&o&&(t+="/"),(n?"/":"")+t},r.isAbsolute=function(t){return"/"===t.charAt(0)},r.join=function(){var t=Array.prototype.slice.call(arguments,0);return r.normalize(i(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},r.relative=function(t,e){function i(t){for(var e=0;e<t.length&&""===t[e];e++);for(var r=t.length-1;r>=0&&""===t[r];r--);return e>r?[]:t.slice(e,r-e+1)}t=r.resolve(t).substr(1),e=r.resolve(e).substr(1);for(var n=i(t.split("/")),o=i(e.split("/")),s=Math.min(n.length,o.length),a=s,h=0;s>h;h++)if(n[h]!==o[h]){a=h;break}for(var u=[],h=a;h<n.length;h++)u.push("..");return u=u.concat(o.slice(a)),u.join("/")},r.sep="/",r.delimiter=":",r.dirname=function(t){var e=o(t),r=e[0],i=e[1];return r||i?(i&&(i=i.substr(0,i.length-1)),r+i):"."},r.basename=function(t,e){var r=o(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},r.extname=function(t){return o(t)[3]};var s="b"==="ab".substr(-1)?function(t,e,r){return t.substr(e,r)}:function(t,e,r){return 0>e&&(e=t.length+e),t.substr(e,r)}}).call(this,t("_process"))},{_process:3}],3:[function(t,e,r){function i(){l=!1,a.length?u=a.concat(u):c=-1,u.length&&n()}function n(){if(!l){var t=setTimeout(i);l=!0;for(var e=u.length;e;){for(a=u,u=[];++c<e;)a&&a[c].run();c=-1,e=u.length}a=null,l=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function s(){}var a,h=e.exports={},u=[],l=!1,c=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new o(t,e)),1!==u.length||l||setTimeout(n,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=s,h.addListener=s,h.once=s,h.off=s,h.removeListener=s,h.removeAllListeners=s,h.emit=s,h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},{}],4:[function(e,r,i){(function(e){!function(n){function o(t){throw new RangeError(B[t])}function s(t,e){for(var r=t.length,i=[];r--;)i[r]=e(t[r]);return i}function a(t,e){var r=t.split("@"),i="";r.length>1&&(i=r[0]+"@",t=r[1]),t=t.replace(D,".");var n=t.split("."),o=s(n,e).join(".");return i+o}function h(t){for(var e,r,i=[],n=0,o=t.length;o>n;)e=t.charCodeAt(n++),e>=55296&&56319>=e&&o>n?(r=t.charCodeAt(n++),56320==(64512&r)?i.push(((1023&e)<<10)+(1023&r)+65536):(i.push(e),n--)):i.push(e);return i}function u(t){return s(t,function(t){var e="";return t>65535&&(t-=65536,e+=N(t>>>10&1023|55296),t=56320|1023&t),e+=N(t)}).join("")}function l(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:E}function c(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function p(t,e,r){var i=0;for(t=r?I(t/C):t>>1,t+=I(t/e);t>L*w>>1;i+=E)t=I(t/L);return I(i+(L+1)*t/(t+A))}function d(t){var e,r,i,n,s,a,h,c,d,f,v=[],g=t.length,m=0,y=R,x=M;for(r=t.lastIndexOf(O),0>r&&(r=0),i=0;r>i;++i)t.charCodeAt(i)>=128&&o("not-basic"),v.push(t.charCodeAt(i));for(n=r>0?r+1:0;g>n;){for(s=m,a=1,h=E;n>=g&&o("invalid-input"),c=l(t.charCodeAt(n++)),(c>=E||c>I((T-m)/a))&&o("overflow"),m+=c*a,d=x>=h?S:h>=x+w?w:h-x,!(d>c);h+=E)f=E-d,a>I(T/f)&&o("overflow"),a*=f;e=v.length+1,x=p(m-s,e,0==s),I(m/e)>T-y&&o("overflow"),y+=I(m/e),m%=e,v.splice(m++,0,y)}return u(v)}function f(t){var e,r,i,n,s,a,u,l,d,f,v,g,m,y,x,b=[];for(t=h(t),g=t.length,e=R,r=0,s=M,a=0;g>a;++a)v=t[a],128>v&&b.push(N(v));for(i=n=b.length,n&&b.push(O);g>i;){for(u=T,a=0;g>a;++a)v=t[a],v>=e&&u>v&&(u=v);for(m=i+1,u-e>I((T-r)/m)&&o("overflow"),r+=(u-e)*m,e=u,a=0;g>a;++a)if(v=t[a],e>v&&++r>T&&o("overflow"),v==e){for(l=r,d=E;f=s>=d?S:d>=s+w?w:d-s,!(f>l);d+=E)x=l-f,y=E-f,b.push(N(c(f+x%y,0))),l=I(x/y);b.push(N(c(l,0))),s=p(r,m,i==n),r=0,++i}++r,++e}return b.join("")}function v(t){return a(t,function(t){return P.test(t)?d(t.slice(4).toLowerCase()):t})}function g(t){return a(t,function(t){return F.test(t)?"xn--"+f(t):t})}var m="object"==typeof i&&i&&!i.nodeType&&i,y="object"==typeof r&&r&&!r.nodeType&&r,x="object"==typeof e&&e;(x.global===x||x.window===x||x.self===x)&&(n=x);var b,_,T=2147483647,E=36,S=1,w=26,A=38,C=700,M=72,R=128,O="-",P=/^xn--/,F=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,B={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},L=E-S,I=Math.floor,N=String.fromCharCode;if(b={version:"1.3.2",ucs2:{decode:h,encode:u},decode:d,encode:f,toASCII:g,toUnicode:v},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return b});else if(m&&y)if(r.exports==m)y.exports=b;else for(_ in b)b.hasOwnProperty(_)&&(m[_]=b[_]);else n.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(t,e,r){"use strict";function i(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,r,o){e=e||"&",r=r||"=";var s={};if("string"!=typeof t||0===t.length)return s;var a=/\+/g;t=t.split(e);var h=1e3;o&&"number"==typeof o.maxKeys&&(h=o.maxKeys);var u=t.length;h>0&&u>h&&(u=h);for(var l=0;u>l;++l){var c,p,d,f,v=t[l].replace(a,"%20"),g=v.indexOf(r);g>=0?(c=v.substr(0,g),p=v.substr(g+1)):(c=v,p=""),d=decodeURIComponent(c),f=decodeURIComponent(p),i(s,d)?n(s[d])?s[d].push(f):s[d]=[s[d],f]:s[d]=f}return s};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],6:[function(t,e,r){"use strict";function i(t,e){if(t.map)return t.map(e);for(var r=[],i=0;i<t.length;i++)r.push(e(t[i],i));return r}var n=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,r,a){return e=e||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?i(s(t),function(s){var a=encodeURIComponent(n(s))+r;return o(t[s])?i(t[s],function(t){return a+encodeURIComponent(n(t))}).join(e):a+encodeURIComponent(n(t[s]))}).join(e):a?encodeURIComponent(n(a))+r+encodeURIComponent(n(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.push(r);return e}},{}],7:[function(t,e,r){"use strict";r.decode=r.parse=t("./decode"),r.encode=r.stringify=t("./encode")},{"./decode":5,"./encode":6}],8:[function(t,e,r){function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function n(t,e,r){if(t&&u(t)&&t instanceof i)return t;var n=new i;return n.parse(t,e,r),n}function o(t){return h(t)&&(t=n(t)),t instanceof i?t.format():i.prototype.format.call(t)}function s(t,e){return n(t,!1,!0).resolve(e)}function a(t,e){return t?n(t,!1,!0).resolveObject(e):e}function h(t){return"string"==typeof t}function u(t){return"object"==typeof t&&null!==t}function l(t){return null===t}function c(t){return null==t}var p=t("punycode");r.parse=n,r.resolve=s,r.resolveObject=a,r.format=o,r.Url=i;var d=/^([a-z0-9.+-]+:)/i,f=/:[0-9]*$/,v=["<",">",'"',"`"," ","\r","\n","	"],g=["{","}","|","\\","^","`"].concat(v),m=["'"].concat(g),y=["%","/","?",";","#"].concat(m),x=["/","?","#"],b=255,_=/^[a-z0-9A-Z_-]{0,63}$/,T=/^([a-z0-9A-Z_-]{0,63})(.*)$/,E={javascript:!0,"javascript:":!0},S={javascript:!0,"javascript:":!0},w={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},A=t("querystring");i.prototype.parse=function(t,e,r){if(!h(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var i=t;i=i.trim();var n=d.exec(i);if(n){n=n[0];var o=n.toLowerCase();this.protocol=o,i=i.substr(n.length)}if(r||n||i.match(/^\/\/[^@\/]+@[^@\/]+/)){var s="//"===i.substr(0,2);!s||n&&S[n]||(i=i.substr(2),this.slashes=!0)}if(!S[n]&&(s||n&&!w[n])){for(var a=-1,u=0;u<x.length;u++){var l=i.indexOf(x[u]);-1!==l&&(-1===a||a>l)&&(a=l)}var c,f;f=-1===a?i.lastIndexOf("@"):i.lastIndexOf("@",a),-1!==f&&(c=i.slice(0,f),i=i.slice(f+1),this.auth=decodeURIComponent(c)),a=-1;for(var u=0;u<y.length;u++){var l=i.indexOf(y[u]);-1!==l&&(-1===a||a>l)&&(a=l)}-1===a&&(a=i.length),this.host=i.slice(0,a),i=i.slice(a),this.parseHost(),this.hostname=this.hostname||"";var v="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!v)for(var g=this.hostname.split(/\./),u=0,C=g.length;C>u;u++){var M=g[u];if(M&&!M.match(_)){for(var R="",O=0,P=M.length;P>O;O++)R+=M.charCodeAt(O)>127?"x":M[O];if(!R.match(_)){var F=g.slice(0,u),D=g.slice(u+1),B=M.match(T);B&&(F.push(B[1]),D.unshift(B[2])),D.length&&(i="/"+D.join(".")+i),this.hostname=F.join(".");break}}}if(this.hostname.length>b?this.hostname="":this.hostname=this.hostname.toLowerCase(),!v){for(var L=this.hostname.split("."),I=[],u=0;u<L.length;++u){var N=L[u];I.push(N.match(/[^A-Za-z0-9_-]/)?"xn--"+p.encode(N):N)}this.hostname=I.join(".")}var U=this.port?":"+this.port:"",k=this.hostname||"";this.host=k+U,this.href+=this.host,v&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==i[0]&&(i="/"+i))}if(!E[o])for(var u=0,C=m.length;C>u;u++){var j=m[u],X=encodeURIComponent(j);X===j&&(X=escape(j)),i=i.split(j).join(X)}var Y=i.indexOf("#");-1!==Y&&(this.hash=i.substr(Y),i=i.slice(0,Y));var G=i.indexOf("?");if(-1!==G?(this.search=i.substr(G),this.query=i.substr(G+1),e&&(this.query=A.parse(this.query)),i=i.slice(0,G)):e&&(this.search="",this.query={}),i&&(this.pathname=i),w[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var U=this.pathname||"",N=this.search||"";this.path=U+N}return this.href=this.format(),this},i.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",r=this.pathname||"",i=this.hash||"",n=!1,o="";this.host?n=t+this.host:this.hostname&&(n=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(n+=":"+this.port)),this.query&&u(this.query)&&Object.keys(this.query).length&&(o=A.stringify(this.query));var s=this.search||o&&"?"+o||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||w[e])&&n!==!1?(n="//"+(n||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):n||(n=""),i&&"#"!==i.charAt(0)&&(i="#"+i),s&&"?"!==s.charAt(0)&&(s="?"+s),r=r.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),s=s.replace("#","%23"),e+n+r+s+i},i.prototype.resolve=function(t){return this.resolveObject(n(t,!1,!0)).format()},i.prototype.resolveObject=function(t){if(h(t)){var e=new i;e.parse(t,!1,!0),t=e}var r=new i;if(Object.keys(this).forEach(function(t){r[t]=this[t]},this),r.hash=t.hash,""===t.href)return r.href=r.format(),r;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){"protocol"!==e&&(r[e]=t[e])}),w[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r;if(t.protocol&&t.protocol!==r.protocol){if(!w[t.protocol])return Object.keys(t).forEach(function(e){r[e]=t[e]}),r.href=r.format(),r;if(r.protocol=t.protocol,t.host||S[t.protocol])r.pathname=t.pathname;else{for(var n=(t.pathname||"").split("/");n.length&&!(t.host=n.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==n[0]&&n.unshift(""),n.length<2&&n.unshift(""),r.pathname=n.join("/")}if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var o=r.pathname||"",s=r.search||"";r.path=o+s}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var a=r.pathname&&"/"===r.pathname.charAt(0),u=t.host||t.pathname&&"/"===t.pathname.charAt(0),p=u||a||r.host&&t.pathname,d=p,f=r.pathname&&r.pathname.split("/")||[],n=t.pathname&&t.pathname.split("/")||[],v=r.protocol&&!w[r.protocol];if(v&&(r.hostname="",r.port=null,r.host&&(""===f[0]?f[0]=r.host:f.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===n[0]?n[0]=t.host:n.unshift(t.host)),t.host=null),p=p&&(""===n[0]||""===f[0])),u)r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,f=n;else if(n.length)f||(f=[]),f.pop(),f=f.concat(n),r.search=t.search,r.query=t.query;else if(!c(t.search)){if(v){r.hostname=r.host=f.shift();var g=r.host&&r.host.indexOf("@")>0?r.host.split("@"):!1;g&&(r.auth=g.shift(),r.host=r.hostname=g.shift())}return r.search=t.search,r.query=t.query,l(r.pathname)&&l(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!f.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var m=f.slice(-1)[0],y=(r.host||t.host)&&("."===m||".."===m)||""===m,x=0,b=f.length;b>=0;b--)m=f[b],"."==m?f.splice(b,1):".."===m?(f.splice(b,1),x++):x&&(f.splice(b,1),x--);if(!p&&!d)for(;x--;x)f.unshift("..");!p||""===f[0]||f[0]&&"/"===f[0].charAt(0)||f.unshift(""),y&&"/"!==f.join("/").substr(-1)&&f.push("");var _=""===f[0]||f[0]&&"/"===f[0].charAt(0);if(v){r.hostname=r.host=_?"":f.length?f.shift():"";var g=r.host&&r.host.indexOf("@")>0?r.host.split("@"):!1;g&&(r.auth=g.shift(),r.host=r.hostname=g.shift())}return p=p||r.host&&f.length,p&&!_&&f.unshift(""),f.length?r.pathname=f.join("/"):(r.pathname=null,r.path=null),l(r.pathname)&&l(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},i.prototype.parseHost=function(){var t=this.host,e=f.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{punycode:4,querystring:7}],9:[function(t,e,r){"use strict";function i(t,e,r){r=r||2;var i=e&&e.length,o=i?e[0]*r:t.length,a=n(t,0,o,r,!0),h=[];if(!a)return h;var u,l,p,d,f,v,g;if(i&&(a=c(t,e,a,r)),t.length>80*r){u=p=t[0],l=d=t[1];for(var m=r;o>m;m+=r)f=t[m],v=t[m+1],u>f&&(u=f),l>v&&(l=v),f>p&&(p=f),v>d&&(d=v);g=Math.max(p-u,d-l)}return s(a,h,r,u,l,g),h}function n(t,e,r,i,n){var o,s,a,h=0;for(o=e,s=r-i;r>o;o+=i)h+=(t[s]-t[o])*(t[o+1]+t[s+1]),s=o;if(n===h>0)for(o=e;r>o;o+=i)a=M(o,t[o],t[o+1],a);else for(o=r-i;o>=e;o-=i)a=M(o,t[o],t[o+1],a);return a}function o(t,e){if(!t)return t;e||(e=t);var r,i=t;do if(r=!1,i.steiner||!T(i,i.next)&&0!==_(i.prev,i,i.next))i=i.next;else{if(R(i),i=e=i.prev,i===i.next)return null;r=!0}while(r||i!==e);return e}function s(t,e,r,i,n,c,p){if(t){!p&&c&&v(t,i,n,c);for(var d,f,g=t;t.prev!==t.next;)if(d=t.prev,f=t.next,c?h(t,i,n,c):a(t))e.push(d.i/r),e.push(t.i/r),e.push(f.i/r),R(t),t=f.next,g=f.next;else if(t=f,t===g){p?1===p?(t=u(t,e,r),s(t,e,r,i,n,c,2)):2===p&&l(t,e,r,i,n,c):s(o(t),e,r,i,n,c,1);break}}}function a(t){var e=t.prev,r=t,i=t.next;if(_(e,r,i)>=0)return!1;for(var n=t.next.next;n!==t.prev;){if(x(e.x,e.y,r.x,r.y,i.x,i.y,n.x,n.y)&&_(n.prev,n,n.next)>=0)return!1;n=n.next}return!0}function h(t,e,r,i){var n=t.prev,o=t,s=t.next;if(_(n,o,s)>=0)return!1;for(var a=n.x<o.x?n.x<s.x?n.x:s.x:o.x<s.x?o.x:s.x,h=n.y<o.y?n.y<s.y?n.y:s.y:o.y<s.y?o.y:s.y,u=n.x>o.x?n.x>s.x?n.x:s.x:o.x>s.x?o.x:s.x,l=n.y>o.y?n.y>s.y?n.y:s.y:o.y>s.y?o.y:s.y,c=m(a,h,e,r,i),p=m(u,l,e,r,i),d=t.nextZ;d&&d.z<=p;){if(d!==t.prev&&d!==t.next&&x(n.x,n.y,o.x,o.y,s.x,s.y,d.x,d.y)&&_(d.prev,d,d.next)>=0)return!1;d=d.nextZ}for(d=t.prevZ;d&&d.z>=c;){if(d!==t.prev&&d!==t.next&&x(n.x,n.y,o.x,o.y,s.x,s.y,d.x,d.y)&&_(d.prev,d,d.next)>=0)return!1;d=d.prevZ}return!0}function u(t,e,r){var i=t;do{var n=i.prev,o=i.next.next;E(n,i,i.next,o)&&w(n,o)&&w(o,n)&&(e.push(n.i/r),e.push(i.i/r),e.push(o.i/r),R(i),R(i.next),i=t=o),i=i.next}while(i!==t);return i}function l(t,e,r,i,n,a){var h=t;do{for(var u=h.next.next;u!==h.prev;){if(h.i!==u.i&&b(h,u)){var l=C(h,u);return h=o(h,h.next),l=o(l,l.next),s(h,e,r,i,n,a),void s(l,e,r,i,n,a)}u=u.next}h=h.next}while(h!==t)}function c(t,e,r,i){var s,a,h,u,l,c=[];for(s=0,a=e.length;a>s;s++)h=e[s]*i,u=a-1>s?e[s+1]*i:t.length,l=n(t,h,u,i,!1),l===l.next&&(l.steiner=!0),c.push(y(l));for(c.sort(p),s=0;s<c.length;s++)d(c[s],r),r=o(r,r.next);return r}function p(t,e){return t.x-e.x}function d(t,e){if(e=f(t,e)){var r=C(e,t);o(r,r.next)}}function f(t,e){var r,i=e,n=t.x,o=t.y,s=-(1/0);do{if(o<=i.y&&o>=i.next.y){var a=i.x+(o-i.y)*(i.next.x-i.x)/(i.next.y-i.y);n>=a&&a>s&&(s=a,r=i.x<i.next.x?i:i.next)}i=i.next}while(i!==e);if(!r)return null;if(t.x===r.x)return r.prev;var h,u=r,l=1/0;for(i=r.next;i!==u;)n>=i.x&&i.x>=r.x&&x(o<r.y?n:s,o,r.x,r.y,o<r.y?s:n,o,i.x,i.y)&&(h=Math.abs(o-i.y)/(n-i.x),(l>h||h===l&&i.x>r.x)&&w(i,t)&&(r=i,l=h)),i=i.next;return r}function v(t,e,r,i){var n=t;do null===n.z&&(n.z=m(n.x,n.y,e,r,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==t);n.prevZ.nextZ=null,n.prevZ=null,g(n)}function g(t){var e,r,i,n,o,s,a,h,u=1;do{for(r=t,t=null,o=null,s=0;r;){for(s++,i=r,a=0,e=0;u>e&&(a++,i=i.nextZ,i);e++);for(h=u;a>0||h>0&&i;)0===a?(n=i,i=i.nextZ,h--):0!==h&&i?r.z<=i.z?(n=r,r=r.nextZ,a--):(n=i,i=i.nextZ,h--):(n=r,r=r.nextZ,a--),o?o.nextZ=n:t=n,n.prevZ=o,o=n;r=i}o.nextZ=null,u*=2}while(s>1);return t}function m(t,e,r,i,n){return t=32767*(t-r)/n,e=32767*(e-i)/n,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1}function y(t){var e=t,r=t;do e.x<r.x&&(r=e),e=e.next;while(e!==t);return r}function x(t,e,r,i,n,o,s,a){return(n-s)*(e-a)-(t-s)*(o-a)>=0&&(t-s)*(i-a)-(r-s)*(e-a)>=0&&(r-s)*(o-a)-(n-s)*(i-a)>=0}function b(t,e){return T(t,e)||t.next.i!==e.i&&t.prev.i!==e.i&&!S(t,e)&&w(t,e)&&w(e,t)&&A(t,e)}function _(t,e,r){return(e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function T(t,e){return t.x===e.x&&t.y===e.y}function E(t,e,r,i){return _(t,e,r)>0!=_(t,e,i)>0&&_(r,i,t)>0!=_(r,i,e)>0}function S(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&E(r,r.next,t,e))return!0;
r=r.next}while(r!==t);return!1}function w(t,e){return _(t.prev,t,t.next)<0?_(t,e,t.next)>=0&&_(t,t.prev,e)>=0:_(t,e,t.prev)<0||_(t,t.next,e)<0}function A(t,e){var r=t,i=!1,n=(t.x+e.x)/2,o=(t.y+e.y)/2;do r.y>o!=r.next.y>o&&n<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;while(r!==t);return i}function C(t,e){var r=new O(t.i,t.x,t.y),i=new O(e.i,e.x,e.y),n=t.next,o=e.prev;return t.next=e,e.prev=t,r.next=n,n.prev=r,i.next=r,r.prev=i,o.next=i,i.prev=o,i}function M(t,e,r,i){var n=new O(t,e,r);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function R(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function O(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}e.exports=i},{}],10:[function(t,e,r){"use strict";function i(t,e,r){this.fn=t,this.context=e,this.once=r||!1}function n(){}var o="function"!=typeof Object.create?"~":!1;n.prototype._events=void 0,n.prototype.listeners=function(t,e){var r=o?o+t:t,i=this._events&&this._events[r];if(e)return!!i;if(!i)return[];if(i.fn)return[i.fn];for(var n=0,s=i.length,a=new Array(s);s>n;n++)a[n]=i[n].fn;return a},n.prototype.emit=function(t,e,r,i,n,s){var a=o?o+t:t;if(!this._events||!this._events[a])return!1;var h,u,l=this._events[a],c=arguments.length;if("function"==typeof l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),c){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,i),!0;case 5:return l.fn.call(l.context,e,r,i,n),!0;case 6:return l.fn.call(l.context,e,r,i,n,s),!0}for(u=1,h=new Array(c-1);c>u;u++)h[u-1]=arguments[u];l.fn.apply(l.context,h)}else{var p,d=l.length;for(u=0;d>u;u++)switch(l[u].once&&this.removeListener(t,l[u].fn,void 0,!0),c){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,e);break;case 3:l[u].fn.call(l[u].context,e,r);break;default:if(!h)for(p=1,h=new Array(c-1);c>p;p++)h[p-1]=arguments[p];l[u].fn.apply(l[u].context,h)}}return!0},n.prototype.on=function(t,e,r){var n=new i(e,r||this),s=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],n]:this._events[s].push(n):this._events[s]=n,this},n.prototype.once=function(t,e,r){var n=new i(e,r||this,!0),s=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],n]:this._events[s].push(n):this._events[s]=n,this},n.prototype.removeListener=function(t,e,r,i){var n=o?o+t:t;if(!this._events||!this._events[n])return this;var s=this._events[n],a=[];if(e)if(s.fn)(s.fn!==e||i&&!s.once||r&&s.context!==r)&&a.push(s);else for(var h=0,u=s.length;u>h;h++)(s[h].fn!==e||i&&!s[h].once||r&&s[h].context!==r)&&a.push(s[h]);return a.length?this._events[n]=1===a.length?a[0]:a:delete this._events[n],this},n.prototype.removeAllListeners=function(t){return this._events?(t?delete this._events[o?o+t:t]:this._events=o?{}:Object.create(null),this):this},n.prototype.off=n.prototype.removeListener,n.prototype.addListener=n.prototype.on,n.prototype.setMaxListeners=function(){return this},n.prefixed=o,"undefined"!=typeof e&&(e.exports=n)},{}],11:[function(t,e,r){"use strict";function i(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=Object.assign||function(t,e){for(var r,s,a=i(t),h=1;h<arguments.length;h++){r=Object(arguments[h]);for(var u in r)n.call(r,u)&&(a[u]=r[u]);if(Object.getOwnPropertySymbols){s=Object.getOwnPropertySymbols(r);for(var l=0;l<s.length;l++)o.call(r,s[l])&&(a[s[l]]=r[s[l]])}}return a}},{}],12:[function(e,r,i){(function(e){!function(){function i(t){var e=!1;return function(){if(e)throw new Error("Callback was already called.");e=!0,t.apply(n,arguments)}}var n,o,s={};n=this,null!=n&&(o=n.async),s.noConflict=function(){return n.async=o,s};var a=Object.prototype.toString,h=Array.isArray||function(t){return"[object Array]"===a.call(t)},u=function(t,e){for(var r=0;r<t.length;r+=1)e(t[r],r,t)},l=function(t,e){if(t.map)return t.map(e);var r=[];return u(t,function(t,i,n){r.push(e(t,i,n))}),r},c=function(t,e,r){return t.reduce?t.reduce(e,r):(u(t,function(t,i,n){r=e(r,t,i,n)}),r)},p=function(t){if(Object.keys)return Object.keys(t);var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);return e};"undefined"!=typeof e&&e.nextTick?(s.nextTick=e.nextTick,"undefined"!=typeof setImmediate?s.setImmediate=function(t){setImmediate(t)}:s.setImmediate=s.nextTick):"function"==typeof setImmediate?(s.nextTick=function(t){setImmediate(t)},s.setImmediate=s.nextTick):(s.nextTick=function(t){setTimeout(t,0)},s.setImmediate=s.nextTick),s.each=function(t,e,r){function n(e){e?(r(e),r=function(){}):(o+=1,o>=t.length&&r())}if(r=r||function(){},!t.length)return r();var o=0;u(t,function(t){e(t,i(n))})},s.forEach=s.each,s.eachSeries=function(t,e,r){if(r=r||function(){},!t.length)return r();var i=0,n=function(){e(t[i],function(e){e?(r(e),r=function(){}):(i+=1,i>=t.length?r():n())})};n()},s.forEachSeries=s.eachSeries,s.eachLimit=function(t,e,r,i){var n=d(e);n.apply(null,[t,r,i])},s.forEachLimit=s.eachLimit;var d=function(t){return function(e,r,i){if(i=i||function(){},!e.length||0>=t)return i();var n=0,o=0,s=0;!function a(){if(n>=e.length)return i();for(;t>s&&o<e.length;)o+=1,s+=1,r(e[o-1],function(t){t?(i(t),i=function(){}):(n+=1,s-=1,n>=e.length?i():a())})}()}},f=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[s.each].concat(e))}},v=function(t,e){return function(){var r=Array.prototype.slice.call(arguments);return e.apply(null,[d(t)].concat(r))}},g=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[s.eachSeries].concat(e))}},m=function(t,e,r,i){if(e=l(e,function(t,e){return{index:e,value:t}}),i){var n=[];t(e,function(t,e){r(t.value,function(r,i){n[t.index]=i,e(r)})},function(t){i(t,n)})}else t(e,function(t,e){r(t.value,function(t){e(t)})})};s.map=f(m),s.mapSeries=g(m),s.mapLimit=function(t,e,r,i){return y(e)(t,r,i)};var y=function(t){return v(t,m)};s.reduce=function(t,e,r,i){s.eachSeries(t,function(t,i){r(e,t,function(t,r){e=r,i(t)})},function(t){i(t,e)})},s.inject=s.reduce,s.foldl=s.reduce,s.reduceRight=function(t,e,r,i){var n=l(t,function(t){return t}).reverse();s.reduce(n,e,r,i)},s.foldr=s.reduceRight;var x=function(t,e,r,i){var n=[];e=l(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){r(t.value,function(r){r&&n.push(t),e()})},function(t){i(l(n.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};s.filter=f(x),s.filterSeries=g(x),s.select=s.filter,s.selectSeries=s.filterSeries;var b=function(t,e,r,i){var n=[];e=l(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){r(t.value,function(r){r||n.push(t),e()})},function(t){i(l(n.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};s.reject=f(b),s.rejectSeries=g(b);var _=function(t,e,r,i){t(e,function(t,e){r(t,function(r){r?(i(t),i=function(){}):e()})},function(t){i()})};s.detect=f(_),s.detectSeries=g(_),s.some=function(t,e,r){s.each(t,function(t,i){e(t,function(t){t&&(r(!0),r=function(){}),i()})},function(t){r(!1)})},s.any=s.some,s.every=function(t,e,r){s.each(t,function(t,i){e(t,function(t){t||(r(!1),r=function(){}),i()})},function(t){r(!0)})},s.all=s.every,s.sortBy=function(t,e,r){s.map(t,function(t,r){e(t,function(e,i){e?r(e):r(null,{value:t,criteria:i})})},function(t,e){if(t)return r(t);var i=function(t,e){var r=t.criteria,i=e.criteria;return i>r?-1:r>i?1:0};r(null,l(e.sort(i),function(t){return t.value}))})},s.auto=function(t,e){e=e||function(){};var r=p(t),i=r.length;if(!i)return e();var n={},o=[],a=function(t){o.unshift(t)},l=function(t){for(var e=0;e<o.length;e+=1)if(o[e]===t)return void o.splice(e,1)},d=function(){i--,u(o.slice(0),function(t){t()})};a(function(){if(!i){var t=e;e=function(){},t(null,n)}}),u(r,function(r){var i=h(t[r])?t[r]:[t[r]],o=function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1&&(i=i[0]),t){var o={};u(p(n),function(t){o[t]=n[t]}),o[r]=i,e(t,o),e=function(){}}else n[r]=i,s.setImmediate(d)},f=i.slice(0,Math.abs(i.length-1))||[],v=function(){return c(f,function(t,e){return t&&n.hasOwnProperty(e)},!0)&&!n.hasOwnProperty(r)};if(v())i[i.length-1](o,n);else{var g=function(){v()&&(l(g),i[i.length-1](o,n))};a(g)}})},s.retry=function(t,e,r){var i=5,n=[];"function"==typeof t&&(r=e,e=t,t=i),t=parseInt(t,10)||i;var o=function(i,o){for(var a=function(t,e){return function(r){t(function(t,i){r(!t||e,{err:t,result:i})},o)}};t;)n.push(a(e,!(t-=1)));s.series(n,function(t,e){e=e[e.length-1],(i||r)(e.err,e.result)})};return r?o():o},s.waterfall=function(t,e){if(e=e||function(){},!h(t)){var r=new Error("First argument to waterfall must be an array of functions");return e(r)}if(!t.length)return e();var i=function(t){return function(r){if(r)e.apply(null,arguments),e=function(){};else{var n=Array.prototype.slice.call(arguments,1),o=t.next();o?n.push(i(o)):n.push(e),s.setImmediate(function(){t.apply(null,n)})}}};i(s.iterator(t))()};var T=function(t,e,r){if(r=r||function(){},h(e))t.map(e,function(t,e){t&&t(function(t){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),e.call(null,t,r)})},r);else{var i={};t.each(p(e),function(t,r){e[t](function(e){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),i[t]=n,r(e)})},function(t){r(t,i)})}};s.parallel=function(t,e){T({map:s.map,each:s.each},t,e)},s.parallelLimit=function(t,e,r){T({map:y(e),each:d(e)},t,r)},s.series=function(t,e){if(e=e||function(){},h(t))s.mapSeries(t,function(t,e){t&&t(function(t){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),e.call(null,t,r)})},e);else{var r={};s.eachSeries(p(t),function(e,i){t[e](function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),r[e]=n,i(t)})},function(t){e(t,r)})}},s.iterator=function(t){var e=function(r){var i=function(){return t.length&&t[r].apply(null,arguments),i.next()};return i.next=function(){return r<t.length-1?e(r+1):null},i};return e(0)},s.apply=function(t){var e=Array.prototype.slice.call(arguments,1);return function(){return t.apply(null,e.concat(Array.prototype.slice.call(arguments)))}};var E=function(t,e,r,i){var n=[];t(e,function(t,e){r(t,function(t,r){n=n.concat(r||[]),e(t)})},function(t){i(t,n)})};s.concat=f(E),s.concatSeries=g(E),s.whilst=function(t,e,r){t()?e(function(i){return i?r(i):void s.whilst(t,e,r)}):r()},s.doWhilst=function(t,e,r){t(function(i){if(i)return r(i);var n=Array.prototype.slice.call(arguments,1);e.apply(null,n)?s.doWhilst(t,e,r):r()})},s.until=function(t,e,r){t()?r():e(function(i){return i?r(i):void s.until(t,e,r)})},s.doUntil=function(t,e,r){t(function(i){if(i)return r(i);var n=Array.prototype.slice.call(arguments,1);e.apply(null,n)?r():s.doUntil(t,e,r)})},s.queue=function(t,e){function r(t,e,r,i){return t.started||(t.started=!0),h(e)||(e=[e]),0==e.length?s.setImmediate(function(){t.drain&&t.drain()}):void u(e,function(e){var n={data:e,callback:"function"==typeof i?i:null};r?t.tasks.unshift(n):t.tasks.push(n),t.saturated&&t.tasks.length===t.concurrency&&t.saturated(),s.setImmediate(t.process)})}void 0===e&&(e=1);var n=0,o={tasks:[],concurrency:e,saturated:null,empty:null,drain:null,started:!1,paused:!1,push:function(t,e){r(o,t,!1,e)},kill:function(){o.drain=null,o.tasks=[]},unshift:function(t,e){r(o,t,!0,e)},process:function(){if(!o.paused&&n<o.concurrency&&o.tasks.length){var e=o.tasks.shift();o.empty&&0===o.tasks.length&&o.empty(),n+=1;var r=function(){n-=1,e.callback&&e.callback.apply(e,arguments),o.drain&&o.tasks.length+n===0&&o.drain(),o.process()},s=i(r);t(e.data,s)}},length:function(){return o.tasks.length},running:function(){return n},idle:function(){return o.tasks.length+n===0},pause:function(){o.paused!==!0&&(o.paused=!0)},resume:function(){if(o.paused!==!1){o.paused=!1;for(var t=1;t<=o.concurrency;t++)s.setImmediate(o.process)}}};return o},s.priorityQueue=function(t,e){function r(t,e){return t.priority-e.priority}function i(t,e,r){for(var i=-1,n=t.length-1;n>i;){var o=i+(n-i+1>>>1);r(e,t[o])>=0?i=o:n=o-1}return i}function n(t,e,n,o){return t.started||(t.started=!0),h(e)||(e=[e]),0==e.length?s.setImmediate(function(){t.drain&&t.drain()}):void u(e,function(e){var a={data:e,priority:n,callback:"function"==typeof o?o:null};t.tasks.splice(i(t.tasks,a,r)+1,0,a),t.saturated&&t.tasks.length===t.concurrency&&t.saturated(),s.setImmediate(t.process)})}var o=s.queue(t,e);return o.push=function(t,e,r){n(o,t,e,r)},delete o.unshift,o},s.cargo=function(t,e){var r=!1,i=[],n={tasks:i,payload:e,saturated:null,empty:null,drain:null,drained:!0,push:function(t,r){h(t)||(t=[t]),u(t,function(t){i.push({data:t,callback:"function"==typeof r?r:null}),n.drained=!1,n.saturated&&i.length===e&&n.saturated()}),s.setImmediate(n.process)},process:function o(){if(!r){if(0===i.length)return n.drain&&!n.drained&&n.drain(),void(n.drained=!0);var s="number"==typeof e?i.splice(0,e):i.splice(0,i.length),a=l(s,function(t){return t.data});n.empty&&n.empty(),r=!0,t(a,function(){r=!1;var t=arguments;u(s,function(e){e.callback&&e.callback.apply(null,t)}),o()})}},length:function(){return i.length},running:function(){return r}};return n};var S=function(t){return function(e){var r=Array.prototype.slice.call(arguments,1);e.apply(null,r.concat([function(e){var r=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(e?console.error&&console.error(e):console[t]&&u(r,function(e){console[t](e)}))}]))}};s.log=S("log"),s.dir=S("dir"),s.memoize=function(t,e){var r={},i={};e=e||function(t){return t};var n=function(){var n=Array.prototype.slice.call(arguments),o=n.pop(),a=e.apply(null,n);a in r?s.nextTick(function(){o.apply(null,r[a])}):a in i?i[a].push(o):(i[a]=[o],t.apply(null,n.concat([function(){r[a]=arguments;var t=i[a];delete i[a];for(var e=0,n=t.length;n>e;e++)t[e].apply(null,arguments)}])))};return n.memo=r,n.unmemoized=t,n},s.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},s.times=function(t,e,r){for(var i=[],n=0;t>n;n++)i.push(n);return s.map(i,e,r)},s.timesSeries=function(t,e,r){for(var i=[],n=0;t>n;n++)i.push(n);return s.mapSeries(i,e,r)},s.seq=function(){var t=arguments;return function(){var e=this,r=Array.prototype.slice.call(arguments),i=r.pop();s.reduce(t,r,function(t,r,i){r.apply(e,t.concat([function(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);i(t,e)}]))},function(t,r){i.apply(e,[t].concat(r))})}},s.compose=function(){return s.seq.apply(null,Array.prototype.reverse.call(arguments))};var w=function(t,e){var r=function(){var r=this,i=Array.prototype.slice.call(arguments),n=i.pop();return t(e,function(t,e){t.apply(r,i.concat([e]))},n)};if(arguments.length>2){var i=Array.prototype.slice.call(arguments,2);return r.apply(this,i)}return r};s.applyEach=f(w),s.applyEachSeries=g(w),s.forever=function(t,e){function r(i){if(i){if(e)return e(i);throw i}t(r)}r()},"undefined"!=typeof r&&r.exports?r.exports=s:"undefined"!=typeof t&&t.amd?t([],function(){return s}):n.async=s}()}).call(this,e("_process"))},{_process:3}],13:[function(t,e,r){function i(t,e){a.call(this),e=e||10,this.baseUrl=t||"",this.progress=0,this.loading=!1,this._progressChunk=0,this._beforeMiddleware=[],this._afterMiddleware=[],this._boundLoadResource=this._loadResource.bind(this),this._boundOnLoad=this._onLoad.bind(this),this._buffer=[],this._numToLoad=0,this._queue=n.queue(this._boundLoadResource,e),this.resources={}}var n=t("async"),o=t("url"),s=t("./Resource"),a=t("eventemitter3");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.add=i.prototype.enqueue=function(t,e,r,i){if(Array.isArray(t)){for(var n=0;n<t.length;++n)this.add(t[n]);return this}if("object"==typeof t&&(i=e||t.callback||t.onComplete,r=t,e=t.url,t=t.name||t.key||t.url),"string"!=typeof e&&(i=r,r=e,e=t),"string"!=typeof e)throw new Error("No url passed to add resource to loader.");if("function"==typeof r&&(i=r,r=null),this.resources[t])throw new Error('Resource with name "'+t+'" already exists.');return e=this._handleBaseUrl(e),this.resources[t]=new s(t,e,r),"function"==typeof i&&this.resources[t].once("afterMiddleware",i),this._numToLoad++,this._queue.started?(this._queue.push(this.resources[t]),this._progressChunk=(100-this.progress)/(this._queue.length()+this._queue.running())):(this._buffer.push(this.resources[t]),this._progressChunk=100/this._buffer.length),this},i.prototype._handleBaseUrl=function(t){var e=o.parse(t);return e.protocol||0===e.pathname.indexOf("//")?t:this.baseUrl.length&&this.baseUrl.lastIndexOf("/")!==this.baseUrl.length-1&&"/"!==t.charAt(0)?this.baseUrl+"/"+t:this.baseUrl+t},i.prototype.before=i.prototype.pre=function(t){return this._beforeMiddleware.push(t),this},i.prototype.after=i.prototype.use=function(t){return this._afterMiddleware.push(t),this},i.prototype.reset=function(){this.progress=0,this.loading=!1,this._progressChunk=0,this._buffer.length=0,this._numToLoad=0,this._queue.kill(),this._queue.started=!1,this.resources={}},i.prototype.load=function(t){if("function"==typeof t&&this.once("complete",t),this._queue.started)return this;this.emit("start",this);for(var e=0;e<this._buffer.length;++e)this._queue.push(this._buffer[e]);return this._buffer.length=0,this},i.prototype._loadResource=function(t,e){var r=this;t._dequeue=e,this._runMiddleware(t,this._beforeMiddleware,function(){t.load(r._boundOnLoad)})},i.prototype._onComplete=function(){this.emit("complete",this,this.resources)},i.prototype._onLoad=function(t){this.progress+=this._progressChunk,this.emit("progress",this,t),this._runMiddleware(t,this._afterMiddleware,function(){t.emit("afterMiddleware",t),this._numToLoad--,0===this._numToLoad&&(this.progress=100,this._onComplete()),t.error?this.emit("error",t.error,this,t):this.emit("load",this,t)}),t._dequeue()},i.prototype._runMiddleware=function(t,e,r){var i=this;n.eachSeries(e,function(e,r){e.call(i,t,r)},r.bind(this,t))},i.LOAD_TYPE=s.LOAD_TYPE,i.XHR_READY_STATE=s.XHR_READY_STATE,i.XHR_RESPONSE_TYPE=s.XHR_RESPONSE_TYPE},{"./Resource":14,async:12,eventemitter3:10,url:8}],14:[function(t,e,r){function i(t,e,r){if(s.call(this),r=r||{},"string"!=typeof t||"string"!=typeof e)throw new Error("Both name and url are required for constructing a resource.");this.name=t,this.url=e,this.isDataUrl=0===this.url.indexOf("data:"),this.data=null,this.crossOrigin=r.crossOrigin===!0?"anonymous":r.crossOrigin,this.loadType=r.loadType||this._determineLoadType(),this.xhrType=r.xhrType,this.metadata=r.metadata||{},this.error=null,this.xhr=null,this.isJson=!1,this.isXml=!1,this.isImage=!1,this.isAudio=!1,this.isVideo=!1,this._dequeue=null,this._boundComplete=this.complete.bind(this),this._boundOnError=this._onError.bind(this),this._boundOnProgress=this._onProgress.bind(this),this._boundXhrOnError=this._xhrOnError.bind(this),this._boundXhrOnAbort=this._xhrOnAbort.bind(this),this._boundXhrOnLoad=this._xhrOnLoad.bind(this),this._boundXdrOnTimeout=this._xdrOnTimeout.bind(this)}function n(t){return t.toString().replace("object ","")}function o(t,e,r){e&&0===e.indexOf(".")&&(e=e.substring(1)),e&&(t[e]=r)}var s=t("eventemitter3"),a=t("url"),h=!(!window.XDomainRequest||"withCredentials"in new XMLHttpRequest),u=null;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.complete=function(){this.data&&this.data.removeEventListener&&(this.data.removeEventListener("error",this._boundOnError),this.data.removeEventListener("load",this._boundComplete),this.data.removeEventListener("progress",this._boundOnProgress),this.data.removeEventListener("canplaythrough",this._boundComplete)),this.xhr&&(this.xhr.removeEventListener?(this.xhr.removeEventListener("error",this._boundXhrOnError),this.xhr.removeEventListener("abort",this._boundXhrOnAbort),this.xhr.removeEventListener("progress",this._boundOnProgress),this.xhr.removeEventListener("load",this._boundXhrOnLoad)):(this.xhr.onerror=null,this.xhr.ontimeout=null,this.xhr.onprogress=null,this.xhr.onload=null)),this.emit("complete",this)},i.prototype.load=function(t){switch(this.emit("start",this),t&&this.once("complete",t),(this.crossOrigin===!1||"string"!=typeof this.crossOrigin)&&(this.crossOrigin=this._determineCrossOrigin(this.url)),this.loadType){case i.LOAD_TYPE.IMAGE:this._loadImage();break;case i.LOAD_TYPE.AUDIO:this._loadElement("audio");break;case i.LOAD_TYPE.VIDEO:this._loadElement("video");break;case i.LOAD_TYPE.XHR:default:h&&this.crossOrigin?this._loadXdr():this._loadXhr()}},i.prototype._loadImage=function(){this.data=new Image,this.crossOrigin&&(this.data.crossOrigin=this.crossOrigin),this.data.src=this.url,this.isImage=!0,this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1)},i.prototype._loadElement=function(t){if("audio"===t&&"undefined"!=typeof Audio?this.data=new Audio:this.data=document.createElement(t),null===this.data)return this.error=new Error("Unsupported element "+t),void this.complete();if(navigator.isCocoonJS)this.data.src=Array.isArray(this.url)?this.url[0]:this.url;else if(Array.isArray(this.url))for(var e=0;e<this.url.length;++e)this.data.appendChild(this._createSource(t,this.url[e]));else this.data.appendChild(this._createSource(t,this.url));this["is"+t[0].toUpperCase()+t.substring(1)]=!0,this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1),this.data.addEventListener("canplaythrough",this._boundComplete,!1),this.data.load()},i.prototype._loadXhr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XMLHttpRequest;t.open("GET",this.url,!0),this.xhrType===i.XHR_RESPONSE_TYPE.JSON||this.xhrType===i.XHR_RESPONSE_TYPE.DOCUMENT?t.responseType=i.XHR_RESPONSE_TYPE.TEXT:t.responseType=this.xhrType,t.addEventListener("error",this._boundXhrOnError,!1),t.addEventListener("abort",this._boundXhrOnAbort,!1),t.addEventListener("progress",this._boundOnProgress,!1),t.addEventListener("load",this._boundXhrOnLoad,!1),t.send()},i.prototype._loadXdr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XDomainRequest;t.timeout=5e3,t.onerror=this._boundXhrOnError,t.ontimeout=this._boundXdrOnTimeout,t.onprogress=this._boundOnProgress,t.onload=this._boundXhrOnLoad,t.open("GET",this.url,!0),setTimeout(function(){t.send()},0)},i.prototype._createSource=function(t,e,r){r||(r=t+"/"+e.substr(e.lastIndexOf(".")+1));var i=document.createElement("source");return i.src=e,i.type=r,i},i.prototype._onError=function(t){this.error=new Error("Failed to load element using "+t.target.nodeName),this.complete()},i.prototype._onProgress=function(t){t&&t.lengthComputable&&this.emit("progress",this,t.loaded/t.total)},i.prototype._xhrOnError=function(){this.error=new Error(n(this.xhr)+" Request failed. Status: "+this.xhr.status+', text: "'+this.xhr.statusText+'"'),this.complete()},i.prototype._xhrOnAbort=function(){this.error=new Error(n(this.xhr)+" Request was aborted by the user."),this.complete()},i.prototype._xdrOnTimeout=function(){this.error=new Error(n(this.xhr)+" Request timed out."),this.complete()},i.prototype._xhrOnLoad=function(){var t=this.xhr,e=void 0!==t.status?t.status:200;if(200===e||204===e||0===e&&t.responseText.length>0)if(this.xhrType===i.XHR_RESPONSE_TYPE.TEXT)this.data=t.responseText;else if(this.xhrType===i.XHR_RESPONSE_TYPE.JSON)try{this.data=JSON.parse(t.responseText),this.isJson=!0}catch(r){this.error=new Error("Error trying to parse loaded json:",r)}else if(this.xhrType===i.XHR_RESPONSE_TYPE.DOCUMENT)try{if(window.DOMParser){var n=new DOMParser;this.data=n.parseFromString(t.responseText,"text/xml")}else{var o=document.createElement("div");o.innerHTML=t.responseText,this.data=o}this.isXml=!0}catch(r){this.error=new Error("Error trying to parse loaded xml:",r)}else this.data=t.response||t.responseText;else this.error=new Error("["+t.status+"]"+t.statusText+":"+t.responseURL);this.complete()},i.prototype._determineCrossOrigin=function(t,e){if(0===t.indexOf("data:"))return"";e=e||window.location,u||(u=document.createElement("a")),u.href=t,t=a.parse(u.href);var r=!t.port&&""===e.port||t.port===e.port;return t.hostname===e.hostname&&r&&t.protocol===e.protocol?"":"anonymous"},i.prototype._determineXhrType=function(){return i._xhrTypeMap[this._getExtension()]||i.XHR_RESPONSE_TYPE.TEXT},i.prototype._determineLoadType=function(){return i._loadTypeMap[this._getExtension()]||i.LOAD_TYPE.XHR},i.prototype._getExtension=function(){var t,e=this.url;if(this.isDataUrl){var r=e.indexOf("/");t=e.substring(r+1,e.indexOf(";",r))}else{var i=e.indexOf("?");-1!==i&&(e=e.substring(0,i)),t=e.substring(e.lastIndexOf(".")+1)}return t},i.prototype._getMimeFromXhrType=function(t){switch(t){case i.XHR_RESPONSE_TYPE.BUFFER:return"application/octet-binary";case i.XHR_RESPONSE_TYPE.BLOB:return"application/blob";case i.XHR_RESPONSE_TYPE.DOCUMENT:return"application/xml";case i.XHR_RESPONSE_TYPE.JSON:return"application/json";case i.XHR_RESPONSE_TYPE.DEFAULT:case i.XHR_RESPONSE_TYPE.TEXT:default:return"text/plain"}},i.LOAD_TYPE={XHR:1,IMAGE:2,AUDIO:3,VIDEO:4},i.XHR_READY_STATE={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},i.XHR_RESPONSE_TYPE={DEFAULT:"text",BUFFER:"arraybuffer",BLOB:"blob",DOCUMENT:"document",JSON:"json",TEXT:"text"},i._loadTypeMap={gif:i.LOAD_TYPE.IMAGE,png:i.LOAD_TYPE.IMAGE,bmp:i.LOAD_TYPE.IMAGE,jpg:i.LOAD_TYPE.IMAGE,jpeg:i.LOAD_TYPE.IMAGE,tif:i.LOAD_TYPE.IMAGE,tiff:i.LOAD_TYPE.IMAGE,webp:i.LOAD_TYPE.IMAGE,tga:i.LOAD_TYPE.IMAGE},i._xhrTypeMap={xhtml:i.XHR_RESPONSE_TYPE.DOCUMENT,html:i.XHR_RESPONSE_TYPE.DOCUMENT,htm:i.XHR_RESPONSE_TYPE.DOCUMENT,xml:i.XHR_RESPONSE_TYPE.DOCUMENT,tmx:i.XHR_RESPONSE_TYPE.DOCUMENT,tsx:i.XHR_RESPONSE_TYPE.DOCUMENT,svg:i.XHR_RESPONSE_TYPE.DOCUMENT,gif:i.XHR_RESPONSE_TYPE.BLOB,png:i.XHR_RESPONSE_TYPE.BLOB,bmp:i.XHR_RESPONSE_TYPE.BLOB,jpg:i.XHR_RESPONSE_TYPE.BLOB,jpeg:i.XHR_RESPONSE_TYPE.BLOB,tif:i.XHR_RESPONSE_TYPE.BLOB,tiff:i.XHR_RESPONSE_TYPE.BLOB,webp:i.XHR_RESPONSE_TYPE.BLOB,tga:i.XHR_RESPONSE_TYPE.BLOB,json:i.XHR_RESPONSE_TYPE.JSON,text:i.XHR_RESPONSE_TYPE.TEXT,txt:i.XHR_RESPONSE_TYPE.TEXT},i.setExtensionLoadType=function(t,e){o(i._loadTypeMap,t,e)},i.setExtensionXhrType=function(t,e){o(i._xhrTypeMap,t,e)}},{eventemitter3:10,url:8}],15:[function(t,e,r){e.exports={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encodeBinary:function(t){for(var e,r="",i=new Array(4),n=0,o=0,s=0;n<t.length;){for(e=new Array(3),o=0;o<e.length;o++)n<t.length?e[o]=255&t.charCodeAt(n++):e[o]=0;switch(i[0]=e[0]>>2,i[1]=(3&e[0])<<4|e[1]>>4,i[2]=(15&e[1])<<2|e[2]>>6,i[3]=63&e[2],s=n-(t.length-1)){case 2:i[3]=64,i[2]=64;break;case 1:i[3]=64}for(o=0;o<i.length;o++)r+=this._keyStr.charAt(i[o])}return r}}},{}],16:[function(t,e,r){e.exports=t("./Loader"),e.exports.Resource=t("./Resource"),e.exports.middleware={caching:{memory:t("./middlewares/caching/memory")},parsing:{blob:t("./middlewares/parsing/blob")}}},{"./Loader":13,"./Resource":14,"./middlewares/caching/memory":17,"./middlewares/parsing/blob":18}],17:[function(t,e,r){var i={};e.exports=function(){return function(t,e){i[t.url]?(t.data=i[t.url],t.complete()):t.once("complete",function(){i[this.url]=this.data}),e()}}},{}],18:[function(t,e,r){var i=t("../../Resource"),n=t("../../b64");window.URL=window.URL||window.webkitURL,e.exports=function(){return function(t,e){if(!t.data)return e();if(t.xhr&&t.xhrType===i.XHR_RESPONSE_TYPE.BLOB)if(window.Blob&&"string"!=typeof t.data){if(0===t.data.type.indexOf("image")){var r=URL.createObjectURL(t.data);t.blob=t.data,t.data=new Image,t.data.src=r,t.isImage=!0,t.data.onload=function(){URL.revokeObjectURL(r),t.data.onload=null,e()}}}else{var o=t.xhr.getResponseHeader("content-type");o&&0===o.indexOf("image")&&(t.data=new Image,t.data.src="data:"+o+";base64,"+n.encodeBinary(t.xhr.responseText),t.isImage=!0,t.data.onload=function(){t.data.onload=null,e()})}else e()}}},{"../../Resource":14,"../../b64":15}],19:[function(t,e,r){function i(t){var e=document.createElement("div");e.style.width="100px",e.style.height="100px",e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.zIndex=2,this.div=e,this.pool=[],this.renderId=0,this.debug=!1,this.renderer=t,this.children=[],this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this.isActive=!1,window.addEventListener("keydown",this._onKeyDown,!1)}var n=t("../core");Object.assign(n.DisplayObject.prototype,t("./accessibleTarget")),i.prototype.constructor=i,e.exports=i,i.prototype.activate=function(){this.isActive||(this.isActive=!0,window.document.addEventListener("mousemove",this._onMouseMove,!0),window.removeEventListener("keydown",this._onKeyDown,!1),this.renderer.on("postrender",this.update,this),this.renderer.view.parentNode.appendChild(this.div))},i.prototype.deactivate=function(){this.isActive&&(this.isActive=!1,window.document.removeEventListener("mousemove",this._onMouseMove),window.addEventListener("keydown",this._onKeyDown,!1),this.renderer.off("postrender",this.update),this.div.parentNode.removeChild(this.div))},i.prototype.updateAccessibleObjects=function(t){if(t.visible&&(t.accessible&&t.interactive&&(t._accessibleActive||this.addChild(t),t.renderId=this.renderId),t.interactiveChildren))for(var e=t.children,r=e.length-1;r>=0;r--)this.updateAccessibleObjects(e[r])},i.prototype.update=function(){this.updateAccessibleObjects(this.renderer._lastObjectRendered);var t=this.renderer.view.getBoundingClientRect(),e=t.width/this.renderer.width,r=t.height/this.renderer.height,i=this.div;i.style.left=t.left+"px",i.style.top=t.top+"px",i.style.width=this.renderer.width+"px",i.style.height=this.renderer.height+"px";for(var o=0;o<this.children.length;o++){var s=this.children[o];if(s.renderId!==this.renderId)s._accessibleActive=!1,n.utils.removeItems(this.children,o,1),this.div.removeChild(s._accessibleDiv),this.pool.push(s._accessibleDiv),s._accessibleDiv=null,o--,0===this.children.length&&this.deactivate();else{i=s._accessibleDiv;var a=s.hitArea,h=s.worldTransform;s.hitArea?(i.style.left=(h.tx+a.x*h.a)*e+"px",i.style.top=(h.ty+a.y*h.d)*r+"px",i.style.width=a.width*h.a*e+"px",i.style.height=a.height*h.d*r+"px"):(a=s.getBounds(),this.capHitArea(a),i.style.left=a.x*e+"px",i.style.top=a.y*r+"px",i.style.width=a.width*e+"px",i.style.height=a.height*r+"px")}}this.renderId++},i.prototype.capHitArea=function(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0),t.x+t.width>this.renderer.width&&(t.width=this.renderer.width-t.x),t.y+t.height>this.renderer.height&&(t.height=this.renderer.height-t.y)},i.prototype.addChild=function(t){var e=this.pool.pop();e||(e=document.createElement("button"),e.style.width="100px",e.style.height="100px",e.style.backgroundColor=this.debug?"rgba(255,0,0,0.5)":"transparent",e.style.position="absolute",e.style.zIndex=2,e.style.borderStyle="none",e.addEventListener("click",this._onClick.bind(this)),e.addEventListener("focus",this._onFocus.bind(this)),e.addEventListener("focusout",this._onFocusOut.bind(this))),e.title=t.accessibleTitle||"displayObject "+this.tabIndex,t._accessibleActive=!0,t._accessibleDiv=e,e.displayObject=t,this.children.push(t),this.div.appendChild(t._accessibleDiv),t._accessibleDiv.tabIndex=t.tabIndex},i.prototype._onClick=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"click",e.eventData)},i.prototype._onFocus=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"mouseover",e.eventData)},i.prototype._onFocusOut=function(t){var e=this.renderer.plugins.interaction;
e.dispatchEvent(t.target.displayObject,"mouseout",e.eventData)},i.prototype._onKeyDown=function(t){9===t.keyCode&&this.activate()},i.prototype._onMouseMove=function(){this.deactivate()},i.prototype.destroy=function(){this.div=null;for(var t=0;t<this.children.length;t++)this.children[t].div=null;window.document.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("keydown",this._onKeyDown),this.pool=null,this.children=null,this.renderer=null},n.WebGLRenderer.registerPlugin("accessibility",i),n.CanvasRenderer.registerPlugin("accessibility",i)},{"../core":29,"./accessibleTarget":20}],20:[function(t,e,r){var i={accessible:!1,accessibleTitle:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:!1};e.exports=i},{}],21:[function(t,e,r){e.exports={accessibleTarget:t("./accessibleTarget"),AccessibilityManager:t("./AccessibilityManager")}},{"./AccessibilityManager":19,"./accessibleTarget":20}],22:[function(t,e,r){var i={VERSION:"3.0.10",PI_2:2*Math.PI,RAD_TO_DEG:180/Math.PI,DEG_TO_RAD:Math.PI/180,TARGET_FPMS:.06,RENDERER_TYPE:{UNKNOWN:0,WEBGL:1,CANVAS:2},BLEND_MODES:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},DRAW_MODES:{POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},SCALE_MODES:{DEFAULT:0,LINEAR:0,NEAREST:1},RETINA_PREFIX:/@(.+)x/,RESOLUTION:1,FILTER_RESOLUTION:1,DEFAULT_RENDER_OPTIONS:{view:null,resolution:1,antialias:!1,forceFXAA:!1,autoResize:!1,transparent:!1,backgroundColor:0,clearBeforeRender:!0,preserveDrawingBuffer:!1,roundPixels:!1},SHAPES:{POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4},SPRITE_BATCH_SIZE:2e3};e.exports=i},{}],23:[function(t,e,r){function i(){s.call(this),this.children=[]}var n=t("../math"),o=t("../utils"),s=t("./DisplayObject"),a=t("../textures/RenderTexture"),h=new n.Matrix;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(t){var e=this.getLocalBounds().width;0!==e?this.scale.x=t/e:this.scale.x=1,this._width=t}},height:{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(t){var e=this.getLocalBounds().height;0!==e?this.scale.y=t/e:this.scale.y=1,this._height=t}}}),i.prototype.onChildrenChange=function(){},i.prototype.addChild=function(t){var e=arguments.length;if(e>1)for(var r=0;e>r;r++)this.addChild(arguments[r]);else t.parent&&t.parent.removeChild(t),t.parent=this,this.children.push(t),this.onChildrenChange(this.children.length-1),t.emit("added",this);return t},i.prototype.addChildAt=function(t,e){if(e>=0&&e<=this.children.length)return t.parent&&t.parent.removeChild(t),t.parent=this,this.children.splice(e,0,t),this.onChildrenChange(e),t.emit("added",this),t;throw new Error(t+"addChildAt: The index "+e+" supplied is out of bounds "+this.children.length)},i.prototype.swapChildren=function(t,e){if(t!==e){var r=this.getChildIndex(t),i=this.getChildIndex(e);if(0>r||0>i)throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");this.children[r]=e,this.children[i]=t,this.onChildrenChange(i>r?r:i)}},i.prototype.getChildIndex=function(t){var e=this.children.indexOf(t);if(-1===e)throw new Error("The supplied DisplayObject must be a child of the caller");return e},i.prototype.setChildIndex=function(t,e){if(0>e||e>=this.children.length)throw new Error("The supplied index is out of bounds");var r=this.getChildIndex(t);o.removeItems(this.children,r,1),this.children.splice(e,0,t),this.onChildrenChange(e)},i.prototype.getChildAt=function(t){if(0>t||t>=this.children.length)throw new Error("getChildAt: Supplied index "+t+" does not exist in the child list, or the supplied DisplayObject is not a child of the caller");return this.children[t]},i.prototype.removeChild=function(t){var e=arguments.length;if(e>1)for(var r=0;e>r;r++)this.removeChild(arguments[r]);else{var i=this.children.indexOf(t);if(-1===i)return;t.parent=null,o.removeItems(this.children,i,1),this.onChildrenChange(i),t.emit("removed",this)}return t},i.prototype.removeChildAt=function(t){var e=this.getChildAt(t);return e.parent=null,o.removeItems(this.children,t,1),this.onChildrenChange(t),e.emit("removed",this),e},i.prototype.removeChildren=function(t,e){var r,i,n=t||0,o="number"==typeof e?e:this.children.length,s=o-n;if(s>0&&o>=s){for(r=this.children.splice(n,s),i=0;i<r.length;++i)r[i].parent=null;for(this.onChildrenChange(t),i=0;i<r.length;++i)r[i].emit("removed",this);return r}if(0===s&&0===this.children.length)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},i.prototype.generateTexture=function(t,e,r){var i=this.getLocalBounds(),n=new a(t,0|i.width,0|i.height,r,e);return h.tx=-i.x,h.ty=-i.y,n.render(this,h),n},i.prototype.updateTransform=function(){if(this.visible){this.displayObjectUpdateTransform();for(var t=0,e=this.children.length;e>t;++t)this.children[t].updateTransform()}},i.prototype.containerUpdateTransform=i.prototype.updateTransform,i.prototype.getBounds=function(){if(!this._currentBounds){if(0===this.children.length)return n.Rectangle.EMPTY;for(var t,e,r,i=1/0,o=1/0,s=-(1/0),a=-(1/0),h=!1,u=0,l=this.children.length;l>u;++u){var c=this.children[u];c.visible&&(h=!0,t=this.children[u].getBounds(),i=i<t.x?i:t.x,o=o<t.y?o:t.y,e=t.width+t.x,r=t.height+t.y,s=s>e?s:e,a=a>r?a:r)}if(!h)return n.Rectangle.EMPTY;var p=this._bounds;p.x=i,p.y=o,p.width=s-i,p.height=a-o,this._currentBounds=p}return this._currentBounds},i.prototype.containerGetBounds=i.prototype.getBounds,i.prototype.getLocalBounds=function(){var t=this.worldTransform;this.worldTransform=n.Matrix.IDENTITY;for(var e=0,r=this.children.length;r>e;++e)this.children[e].updateTransform();return this.worldTransform=t,this._currentBounds=null,this.getBounds(n.Matrix.IDENTITY)},i.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable){var e,r;if(this._mask||this._filters){for(t.currentRenderer.flush(),this._filters&&this._filters.length&&t.filterManager.pushFilter(this,this._filters),this._mask&&t.maskManager.pushMask(this,this._mask),t.currentRenderer.start(),this._renderWebGL(t),e=0,r=this.children.length;r>e;e++)this.children[e].renderWebGL(t);t.currentRenderer.flush(),this._mask&&t.maskManager.popMask(this,this._mask),this._filters&&t.filterManager.popFilter(),t.currentRenderer.start()}else for(this._renderWebGL(t),e=0,r=this.children.length;r>e;++e)this.children[e].renderWebGL(t)}},i.prototype._renderWebGL=function(t){},i.prototype._renderCanvas=function(t){},i.prototype.renderCanvas=function(t){if(this.visible&&!(this.alpha<=0)&&this.renderable){this._mask&&t.maskManager.pushMask(this._mask,t),this._renderCanvas(t);for(var e=0,r=this.children.length;r>e;++e)this.children[e].renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},i.prototype.destroy=function(t){if(s.prototype.destroy.call(this),t)for(var e=0,r=this.children.length;r>e;++e)this.children[e].destroy(t);this.removeChildren(),this.children=null}},{"../math":33,"../textures/RenderTexture":71,"../utils":77,"./DisplayObject":24}],24:[function(t,e,r){function i(){s.call(this),this.position=new n.Point,this.scale=new n.Point(1,1),this.pivot=new n.Point(0,0),this.skew=new n.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.renderable=!0,this.parent=null,this.worldAlpha=1,this.worldTransform=new n.Matrix,this.filterArea=null,this._sr=0,this._cr=1,this._bounds=new n.Rectangle(0,0,1,1),this._currentBounds=null,this._mask=null}var n=t("../math"),o=t("../textures/RenderTexture"),s=t("eventemitter3"),a=t("../const"),h=new n.Matrix,u={worldTransform:new n.Matrix,worldAlpha:1,children:[]};i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{x:{get:function(){return this.position.x},set:function(t){this.position.x=t}},y:{get:function(){return this.position.y},set:function(t){this.position.y=t}},worldVisible:{get:function(){var t=this;do{if(!t.visible)return!1;t=t.parent}while(t);return!0}},mask:{get:function(){return this._mask},set:function(t){this._mask&&(this._mask.renderable=!0),this._mask=t,this._mask&&(this._mask.renderable=!1)}},filters:{get:function(){return this._filters&&this._filters.slice()},set:function(t){this._filters=t&&t.slice()}}}),i.prototype.updateTransform=function(){var t,e,r,i,n,o,s=this.parent.worldTransform,u=this.worldTransform;this.skew.x||this.skew.y?(h.setTransform(this.position.x,this.position.y,this.pivot.x,this.pivot.y,this.scale.x,this.scale.y,this.rotation,this.skew.x,this.skew.y),u.a=h.a*s.a+h.b*s.c,u.b=h.a*s.b+h.b*s.d,u.c=h.c*s.a+h.d*s.c,u.d=h.c*s.b+h.d*s.d,u.tx=h.tx*s.a+h.ty*s.c+s.tx,u.ty=h.tx*s.b+h.ty*s.d+s.ty):this.rotation%a.PI_2?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),t=this._cr*this.scale.x,e=this._sr*this.scale.x,r=-this._sr*this.scale.y,i=this._cr*this.scale.y,n=this.position.x,o=this.position.y,(this.pivot.x||this.pivot.y)&&(n-=this.pivot.x*t+this.pivot.y*r,o-=this.pivot.x*e+this.pivot.y*i),u.a=t*s.a+e*s.c,u.b=t*s.b+e*s.d,u.c=r*s.a+i*s.c,u.d=r*s.b+i*s.d,u.tx=n*s.a+o*s.c+s.tx,u.ty=n*s.b+o*s.d+s.ty):(t=this.scale.x,i=this.scale.y,n=this.position.x-this.pivot.x*t,o=this.position.y-this.pivot.y*i,u.a=t*s.a,u.b=t*s.b,u.c=i*s.c,u.d=i*s.d,u.tx=n*s.a+o*s.c+s.tx,u.ty=n*s.b+o*s.d+s.ty),this.worldAlpha=this.alpha*this.parent.worldAlpha,this._currentBounds=null},i.prototype.displayObjectUpdateTransform=i.prototype.updateTransform,i.prototype.getBounds=function(t){return n.Rectangle.EMPTY},i.prototype.getLocalBounds=function(){return this.getBounds(n.Matrix.IDENTITY)},i.prototype.toGlobal=function(t){return this.parent?this.displayObjectUpdateTransform():(this.parent=u,this.displayObjectUpdateTransform(),this.parent=null),this.worldTransform.apply(t)},i.prototype.toLocal=function(t,e,r){return e&&(t=e.toGlobal(t)),this.parent?this.displayObjectUpdateTransform():(this.parent=u,this.displayObjectUpdateTransform(),this.parent=null),this.worldTransform.applyInverse(t,r)},i.prototype.renderWebGL=function(t){},i.prototype.renderCanvas=function(t){},i.prototype.generateTexture=function(t,e,r){var i=this.getLocalBounds(),n=new o(t,0|i.width,0|i.height,e,r);return h.tx=-i.x,h.ty=-i.y,n.render(this,h),n},i.prototype.setParent=function(t){if(!t||!t.addChild)throw new Error("setParent: Argument must be a Container");return t.addChild(this),t},i.prototype.setTransform=function(t,e,r,i,n,o,s,a,h){return this.position.x=t||0,this.position.y=e||0,this.scale.x=r?r:1,this.scale.y=i?i:1,this.rotation=n||0,this.skew.x=o||0,this.skew.y=s||0,this.pivot.x=a||0,this.pivot.y=h||0,this},i.prototype.destroy=function(){this.position=null,this.scale=null,this.pivot=null,this.skew=null,this.parent=null,this._bounds=null,this._currentBounds=null,this._mask=null,this.worldTransform=null,this.filterArea=null}},{"../const":22,"../math":33,"../textures/RenderTexture":71,eventemitter3:10}],25:[function(t,e,r){function i(){n.call(this),this.fillAlpha=1,this.lineWidth=0,this.lineColor=0,this.graphicsData=[],this.tint=16777215,this._prevTint=16777215,this.blendMode=l.BLEND_MODES.NORMAL,this.currentPath=null,this._webGL={},this.isMask=!1,this.boundsPadding=0,this._localBounds=new u.Rectangle(0,0,1,1),this.dirty=!0,this.glDirty=!1,this.boundsDirty=!0,this.cachedSpriteDirty=!1}var n=t("../display/Container"),o=t("../textures/Texture"),s=t("../renderers/canvas/utils/CanvasBuffer"),a=t("../renderers/canvas/utils/CanvasGraphics"),h=t("./GraphicsData"),u=t("../math"),l=t("../const"),c=new u.Point;i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){var t=new i;t.renderable=this.renderable,t.fillAlpha=this.fillAlpha,t.lineWidth=this.lineWidth,t.lineColor=this.lineColor,t.tint=this.tint,t.blendMode=this.blendMode,t.isMask=this.isMask,t.boundsPadding=this.boundsPadding,t.dirty=!0,t.glDirty=!0,t.cachedSpriteDirty=this.cachedSpriteDirty;for(var e=0;e<this.graphicsData.length;++e)t.graphicsData.push(this.graphicsData[e].clone());return t.currentPath=t.graphicsData[t.graphicsData.length-1],t.updateLocalBounds(),t},i.prototype.lineStyle=function(t,e,r){if(this.lineWidth=t||0,this.lineColor=e||0,this.lineAlpha=void 0===r?1:r,this.currentPath)if(this.currentPath.shape.points.length){var i=new u.Polygon(this.currentPath.shape.points.slice(-2));i.closed=!1,this.drawShape(i)}else this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha;return this},i.prototype.moveTo=function(t,e){var r=new u.Polygon([t,e]);return r.closed=!1,this.drawShape(r),this},i.prototype.lineTo=function(t,e){return this.currentPath.shape.points.push(t,e),this.dirty=!0,this},i.prototype.quadraticCurveTo=function(t,e,r,i){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var n,o,s=20,a=this.currentPath.shape.points;0===a.length&&this.moveTo(0,0);for(var h=a[a.length-2],u=a[a.length-1],l=0,c=1;s>=c;++c)l=c/s,n=h+(t-h)*l,o=u+(e-u)*l,a.push(n+(t+(r-t)*l-n)*l,o+(e+(i-e)*l-o)*l);return this.dirty=this.boundsDirty=!0,this},i.prototype.bezierCurveTo=function(t,e,r,i,n,o){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);for(var s,a,h,u,l,c=20,p=this.currentPath.shape.points,d=p[p.length-2],f=p[p.length-1],v=0,g=1;c>=g;++g)v=g/c,s=1-v,a=s*s,h=a*s,u=v*v,l=u*v,p.push(h*d+3*a*v*t+3*s*u*r+l*n,h*f+3*a*v*e+3*s*u*i+l*o);return this.dirty=this.boundsDirty=!0,this},i.prototype.arcTo=function(t,e,r,i,n){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(t,e):this.moveTo(t,e);var o=this.currentPath.shape.points,s=o[o.length-2],a=o[o.length-1],h=a-e,u=s-t,l=i-e,c=r-t,p=Math.abs(h*c-u*l);if(1e-8>p||0===n)(o[o.length-2]!==t||o[o.length-1]!==e)&&o.push(t,e);else{var d=h*h+u*u,f=l*l+c*c,v=h*l+u*c,g=n*Math.sqrt(d)/p,m=n*Math.sqrt(f)/p,y=g*v/d,x=m*v/f,b=g*c+m*u,_=g*l+m*h,T=u*(m+y),E=h*(m+y),S=c*(g+x),w=l*(g+x),A=Math.atan2(E-_,T-b),C=Math.atan2(w-_,S-b);this.arc(b+t,_+e,n,A,C,u*l>c*h)}return this.dirty=this.boundsDirty=!0,this},i.prototype.arc=function(t,e,r,i,n,o){if(o=o||!1,i===n)return this;!o&&i>=n?n+=2*Math.PI:o&&n>=i&&(i+=2*Math.PI);var s=o?-1*(i-n):n-i,a=40*Math.ceil(Math.abs(s)/(2*Math.PI));if(0===s)return this;var h=t+Math.cos(i)*r,u=e+Math.sin(i)*r;this.currentPath?this.currentPath.shape.points.push(h,u):this.moveTo(h,u);for(var l=this.currentPath.shape.points,c=s/(2*a),p=2*c,d=Math.cos(c),f=Math.sin(c),v=a-1,g=v%1/v,m=0;v>=m;m++){var y=m+g*m,x=c+i+p*y,b=Math.cos(x),_=-Math.sin(x);l.push((d*b+f*_)*r+t,(d*-_+f*b)*r+e)}return this.dirty=this.boundsDirty=!0,this},i.prototype.beginFill=function(t,e){return this.filling=!0,this.fillColor=t||0,this.fillAlpha=void 0===e?1:e,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},i.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},i.prototype.drawRect=function(t,e,r,i){return this.drawShape(new u.Rectangle(t,e,r,i)),this},i.prototype.drawRoundedRect=function(t,e,r,i,n){return this.drawShape(new u.RoundedRectangle(t,e,r,i,n)),this},i.prototype.drawCircle=function(t,e,r){return this.drawShape(new u.Circle(t,e,r)),this},i.prototype.drawEllipse=function(t,e,r,i){return this.drawShape(new u.Ellipse(t,e,r,i)),this},i.prototype.drawPolygon=function(t){var e=t,r=!0;if(e instanceof u.Polygon&&(r=e.closed,e=e.points),!Array.isArray(e)){e=new Array(arguments.length);for(var i=0;i<e.length;++i)e[i]=arguments[i]}var n=new u.Polygon(e);return n.closed=r,this.drawShape(n),this},i.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[],this},i.prototype.generateTexture=function(t,e,r){e=e||1;var i=this.getLocalBounds(),n=new s(i.width*e,i.height*e),h=o.fromCanvas(n.canvas,r);return h.baseTexture.resolution=e,n.context.scale(e,e),n.context.translate(-i.x,-i.y),a.renderGraphics(this,n.context),h},i.prototype._renderWebGL=function(t){this.glDirty&&(this.dirty=!0,this.glDirty=!1),t.setObjectRenderer(t.plugins.graphics),t.plugins.graphics.render(this)},i.prototype._renderCanvas=function(t){if(this.isMask!==!0){this._prevTint!==this.tint&&(this.dirty=!0);var e=t.context,r=this.worldTransform,i=t.blendModes[this.blendMode];i!==e.globalCompositeOperation&&(e.globalCompositeOperation=i);var n=t.resolution;e.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n,r.ty*n),a.renderGraphics(this,e)}},i.prototype.getBounds=function(t){if(!this._currentBounds){if(!this.renderable)return u.Rectangle.EMPTY;this.boundsDirty&&(this.updateLocalBounds(),this.glDirty=!0,this.cachedSpriteDirty=!0,this.boundsDirty=!1);var e=this._localBounds,r=e.x,i=e.width+e.x,n=e.y,o=e.height+e.y,s=t||this.worldTransform,a=s.a,h=s.b,l=s.c,c=s.d,p=s.tx,d=s.ty,f=a*i+l*o+p,v=c*o+h*i+d,g=a*r+l*o+p,m=c*o+h*r+d,y=a*r+l*n+p,x=c*n+h*r+d,b=a*i+l*n+p,_=c*n+h*i+d,T=f,E=v,S=f,w=v;S=S>g?g:S,S=S>y?y:S,S=S>b?b:S,w=w>m?m:w,w=w>x?x:w,w=w>_?_:w,T=g>T?g:T,T=y>T?y:T,T=b>T?b:T,E=m>E?m:E,E=x>E?x:E,E=_>E?_:E,this._bounds.x=S,this._bounds.width=T-S,this._bounds.y=w,this._bounds.height=E-w,this._currentBounds=this._bounds}return this._currentBounds},i.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,c);for(var e=this.graphicsData,r=0;r<e.length;r++){var i=e[r];if(i.fill&&i.shape&&i.shape.contains(c.x,c.y))return!0}return!1},i.prototype.updateLocalBounds=function(){var t=1/0,e=-(1/0),r=1/0,i=-(1/0);if(this.graphicsData.length)for(var n,o,s,a,h,u,c=0;c<this.graphicsData.length;c++){var p=this.graphicsData[c],d=p.type,f=p.lineWidth;if(n=p.shape,d===l.SHAPES.RECT||d===l.SHAPES.RREC)s=n.x-f/2,a=n.y-f/2,h=n.width+f,u=n.height+f,t=t>s?s:t,e=s+h>e?s+h:e,r=r>a?a:r,i=a+u>i?a+u:i;else if(d===l.SHAPES.CIRC)s=n.x,a=n.y,h=n.radius+f/2,u=n.radius+f/2,t=t>s-h?s-h:t,e=s+h>e?s+h:e,r=r>a-u?a-u:r,i=a+u>i?a+u:i;else if(d===l.SHAPES.ELIP)s=n.x,a=n.y,h=n.width+f/2,u=n.height+f/2,t=t>s-h?s-h:t,e=s+h>e?s+h:e,r=r>a-u?a-u:r,i=a+u>i?a+u:i;else{o=n.points;for(var v=0;v<o.length;v+=2)s=o[v],a=o[v+1],t=t>s-f?s-f:t,e=s+f>e?s+f:e,r=r>a-f?a-f:r,i=a+f>i?a+f:i}}else t=0,e=0,r=0,i=0;var g=this.boundsPadding;this._localBounds.x=t-g,this._localBounds.width=e-t+2*g,this._localBounds.y=r-g,this._localBounds.height=i-r+2*g},i.prototype.drawShape=function(t){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null;var e=new h(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,t);return this.graphicsData.push(e),e.type===l.SHAPES.POLY&&(e.shape.closed=e.shape.closed||this.filling,this.currentPath=e),this.dirty=this.boundsDirty=!0,e},i.prototype.destroy=function(){n.prototype.destroy.apply(this,arguments);for(var t=0;t<this.graphicsData.length;++t)this.graphicsData[t].destroy();for(var e in this._webgl)for(var r=0;r<this._webgl[e].data.length;++r)this._webgl[e].data[r].destroy();this.graphicsData=null,this.currentPath=null,this._webgl=null,this._localBounds=null}},{"../const":22,"../display/Container":23,"../math":33,"../renderers/canvas/utils/CanvasBuffer":45,"../renderers/canvas/utils/CanvasGraphics":46,"../textures/Texture":72,"./GraphicsData":26}],26:[function(t,e,r){function i(t,e,r,i,n,o,s){this.lineWidth=t,this.lineColor=e,this.lineAlpha=r,this._lineTint=e,this.fillColor=i,this.fillAlpha=n,this._fillTint=i,this.fill=o,this.shape=s,this.type=s.type}i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape)},i.prototype.destroy=function(){this.shape=null}},{}],27:[function(t,e,r){function i(t){a.call(this,t),this.graphicsDataPool=[],this.primitiveShader=null,this.complexPrimitiveShader=null,this.maximumSimplePolySize=200}var n=t("../../utils"),o=t("../../math"),s=t("../../const"),a=t("../../renderers/webgl/utils/ObjectRenderer"),h=t("../../renderers/webgl/WebGLRenderer"),u=t("./WebGLGraphicsData"),l=t("earcut");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,h.registerPlugin("graphics",i),i.prototype.onContextChange=function(){},i.prototype.destroy=function(){a.prototype.destroy.call(this);for(var t=0;t<this.graphicsDataPool.length;++t)this.graphicsDataPool[t].destroy();this.graphicsDataPool=null},i.prototype.render=function(t){var e,r=this.renderer,i=r.gl,o=r.shaderManager.plugins.primitiveShader;(t.dirty||!t._webGL[i.id])&&this.updateGraphics(t);var s=t._webGL[i.id];r.blendModeManager.setBlendMode(t.blendMode);for(var a=0,h=s.data.length;h>a;a++)e=s.data[a],1===s.data[a].mode?(r.stencilManager.pushStencil(t,e),i.uniform1f(r.shaderManager.complexPrimitiveShader.uniforms.alpha._location,t.worldAlpha*e.alpha),i.drawElements(i.TRIANGLE_FAN,4,i.UNSIGNED_SHORT,2*(e.indices.length-4)),r.stencilManager.popStencil(t,e)):(o=r.shaderManager.primitiveShader,r.shaderManager.setShader(o),i.uniformMatrix3fv(o.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),i.uniformMatrix3fv(o.uniforms.projectionMatrix._location,!1,r.currentRenderTarget.projectionMatrix.toArray(!0)),i.uniform3fv(o.uniforms.tint._location,n.hex2rgb(t.tint)),i.uniform1f(o.uniforms.alpha._location,t.worldAlpha),i.bindBuffer(i.ARRAY_BUFFER,e.buffer),i.vertexAttribPointer(o.attributes.aVertexPosition,2,i.FLOAT,!1,24,0),i.vertexAttribPointer(o.attributes.aColor,4,i.FLOAT,!1,24,8),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer),i.drawElements(i.TRIANGLE_STRIP,e.indices.length,i.UNSIGNED_SHORT,0)),r.drawCount++},i.prototype.updateGraphics=function(t){var e=this.renderer.gl,r=t._webGL[e.id];r||(r=t._webGL[e.id]={lastIndex:0,data:[],gl:e}),t.dirty=!1;var i;if(t.clearDirty){for(t.clearDirty=!1,i=0;i<r.data.length;i++){var n=r.data[i];n.reset(),this.graphicsDataPool.push(n)}r.data=[],r.lastIndex=0}var o;for(i=r.lastIndex;i<t.graphicsData.length;i++){var a=t.graphicsData[i];if(a.type===s.SHAPES.POLY){if(a.points=a.shape.points.slice(),a.shape.closed&&(a.points[0]!==a.points[a.points.length-2]||a.points[1]!==a.points[a.points.length-1])&&a.points.push(a.points[0],a.points[1]),a.fill&&a.points.length>=6)if(a.points.length<2*this.maximumSimplePolySize){o=this.switchMode(r,0);var h=this.buildPoly(a,o);h||(o=this.switchMode(r,1),this.buildComplexPoly(a,o))}else o=this.switchMode(r,1),this.buildComplexPoly(a,o);a.lineWidth>0&&(o=this.switchMode(r,0),this.buildLine(a,o))}else o=this.switchMode(r,0),a.type===s.SHAPES.RECT?this.buildRectangle(a,o):a.type===s.SHAPES.CIRC||a.type===s.SHAPES.ELIP?this.buildCircle(a,o):a.type===s.SHAPES.RREC&&this.buildRoundedRectangle(a,o);r.lastIndex++}for(i=0;i<r.data.length;i++)o=r.data[i],o.dirty&&o.upload()},i.prototype.switchMode=function(t,e){var r;return t.data.length?(r=t.data[t.data.length-1],(r.points.length>32e4||r.mode!==e||1===e)&&(r=this.graphicsDataPool.pop()||new u(t.gl),r.mode=e,t.data.push(r))):(r=this.graphicsDataPool.pop()||new u(t.gl),r.mode=e,t.data.push(r)),r.dirty=!0,r},i.prototype.buildRectangle=function(t,e){var r=t.shape,i=r.x,o=r.y,s=r.width,a=r.height;if(t.fill){var h=n.hex2rgb(t.fillColor),u=t.fillAlpha,l=h[0]*u,c=h[1]*u,p=h[2]*u,d=e.points,f=e.indices,v=d.length/6;d.push(i,o),d.push(l,c,p,u),d.push(i+s,o),d.push(l,c,p,u),d.push(i,o+a),d.push(l,c,p,u),d.push(i+s,o+a),d.push(l,c,p,u),f.push(v,v,v+1,v+2,v+3,v+3)}if(t.lineWidth){var g=t.points;t.points=[i,o,i+s,o,i+s,o+a,i,o+a,i,o],this.buildLine(t,e),t.points=g}},i.prototype.buildRoundedRectangle=function(t,e){var r=t.shape,i=r.x,o=r.y,s=r.width,a=r.height,h=r.radius,u=[];if(u.push(i,o+h),this.quadraticBezierCurve(i,o+a-h,i,o+a,i+h,o+a,u),this.quadraticBezierCurve(i+s-h,o+a,i+s,o+a,i+s,o+a-h,u),this.quadraticBezierCurve(i+s,o+h,i+s,o,i+s-h,o,u),this.quadraticBezierCurve(i+h,o,i,o,i,o+h+1e-10,u),t.fill){var c=n.hex2rgb(t.fillColor),p=t.fillAlpha,d=c[0]*p,f=c[1]*p,v=c[2]*p,g=e.points,m=e.indices,y=g.length/6,x=l(u,null,2),b=0;for(b=0;b<x.length;b+=3)m.push(x[b]+y),m.push(x[b]+y),m.push(x[b+1]+y),m.push(x[b+2]+y),m.push(x[b+2]+y);for(b=0;b<u.length;b++)g.push(u[b],u[++b],d,f,v,p)}if(t.lineWidth){var _=t.points;t.points=u,this.buildLine(t,e),t.points=_}},i.prototype.quadraticBezierCurve=function(t,e,r,i,n,o,s){function a(t,e,r){var i=e-t;return t+i*r}for(var h,u,l,c,p,d,f=20,v=s||[],g=0,m=0;f>=m;m++)g=m/f,h=a(t,r,g),u=a(e,i,g),l=a(r,n,g),c=a(i,o,g),p=a(h,l,g),d=a(u,c,g),v.push(p,d);return v},i.prototype.buildCircle=function(t,e){var r,i,o=t.shape,a=o.x,h=o.y;t.type===s.SHAPES.CIRC?(r=o.radius,i=o.radius):(r=o.width,i=o.height);var u=Math.floor(30*Math.sqrt(o.radius))||Math.floor(15*Math.sqrt(o.width+o.height)),l=2*Math.PI/u,c=0;if(t.fill){var p=n.hex2rgb(t.fillColor),d=t.fillAlpha,f=p[0]*d,v=p[1]*d,g=p[2]*d,m=e.points,y=e.indices,x=m.length/6;for(y.push(x),c=0;u+1>c;c++)m.push(a,h,f,v,g,d),m.push(a+Math.sin(l*c)*r,h+Math.cos(l*c)*i,f,v,g,d),y.push(x++,x++);y.push(x-1)}if(t.lineWidth){var b=t.points;for(t.points=[],c=0;u+1>c;c++)t.points.push(a+Math.sin(l*c)*r,h+Math.cos(l*c)*i);this.buildLine(t,e),t.points=b}},i.prototype.buildLine=function(t,e){var r=0,i=t.points;if(0!==i.length){var s=new o.Point(i[0],i[1]),a=new o.Point(i[i.length-2],i[i.length-1]);if(s.x===a.x&&s.y===a.y){i=i.slice(),i.pop(),i.pop(),a=new o.Point(i[i.length-2],i[i.length-1]);var h=a.x+.5*(s.x-a.x),u=a.y+.5*(s.y-a.y);i.unshift(h,u),i.push(h,u)}var l,c,p,d,f,v,g,m,y,x,b,_,T,E,S,w,A,C,M,R,O,P,F,D=e.points,B=e.indices,L=i.length/2,I=i.length,N=D.length/6,U=t.lineWidth/2,k=n.hex2rgb(t.lineColor),j=t.lineAlpha,X=k[0]*j,Y=k[1]*j,G=k[2]*j;for(p=i[0],d=i[1],f=i[2],v=i[3],y=-(d-v),x=p-f,F=Math.sqrt(y*y+x*x),y/=F,x/=F,y*=U,x*=U,D.push(p-y,d-x,X,Y,G,j),D.push(p+y,d+x,X,Y,G,j),r=1;L-1>r;r++)p=i[2*(r-1)],d=i[2*(r-1)+1],f=i[2*r],v=i[2*r+1],g=i[2*(r+1)],m=i[2*(r+1)+1],y=-(d-v),x=p-f,F=Math.sqrt(y*y+x*x),y/=F,x/=F,y*=U,x*=U,b=-(v-m),_=f-g,F=Math.sqrt(b*b+_*_),b/=F,_/=F,b*=U,_*=U,S=-x+d-(-x+v),w=-y+f-(-y+p),A=(-y+p)*(-x+v)-(-y+f)*(-x+d),C=-_+m-(-_+v),M=-b+f-(-b+g),R=(-b+g)*(-_+v)-(-b+f)*(-_+m),O=S*M-C*w,Math.abs(O)<.1?(O+=10.1,D.push(f-y,v-x,X,Y,G,j),D.push(f+y,v+x,X,Y,G,j)):(l=(w*R-M*A)/O,c=(C*A-S*R)/O,P=(l-f)*(l-f)+(c-v)*(c-v),P>19600?(T=y-b,E=x-_,F=Math.sqrt(T*T+E*E),T/=F,E/=F,T*=U,E*=U,D.push(f-T,v-E),D.push(X,Y,G,j),D.push(f+T,v+E),D.push(X,Y,G,j),D.push(f-T,v-E),D.push(X,Y,G,j),I++):(D.push(l,c),D.push(X,Y,G,j),D.push(f-(l-f),v-(c-v)),D.push(X,Y,G,j)));for(p=i[2*(L-2)],d=i[2*(L-2)+1],f=i[2*(L-1)],v=i[2*(L-1)+1],y=-(d-v),x=p-f,F=Math.sqrt(y*y+x*x),y/=F,x/=F,y*=U,x*=U,D.push(f-y,v-x),D.push(X,Y,G,j),D.push(f+y,v+x),D.push(X,Y,G,j),B.push(N),r=0;I>r;r++)B.push(N++);B.push(N-1)}},i.prototype.buildComplexPoly=function(t,e){var r=t.points.slice();if(!(r.length<6)){var i=e.indices;e.points=r,e.alpha=t.fillAlpha,e.color=n.hex2rgb(t.fillColor);for(var o,s,a=1/0,h=-(1/0),u=1/0,l=-(1/0),c=0;c<r.length;c+=2)o=r[c],s=r[c+1],a=a>o?o:a,h=o>h?o:h,u=u>s?s:u,l=s>l?s:l;r.push(a,u,h,u,h,l,a,l);var p=r.length/2;for(c=0;p>c;c++)i.push(c)}},i.prototype.buildPoly=function(t,e){var r=t.points;if(!(r.length<6)){var i=e.points,o=e.indices,s=r.length/2,a=n.hex2rgb(t.fillColor),h=t.fillAlpha,u=a[0]*h,c=a[1]*h,p=a[2]*h,d=l(r,null,2);if(!d)return!1;var f=i.length/6,v=0;for(v=0;v<d.length;v+=3)o.push(d[v]+f),o.push(d[v]+f),o.push(d[v+1]+f),o.push(d[v+2]+f),o.push(d[v+2]+f);for(v=0;s>v;v++)i.push(r[2*v],r[2*v+1],u,c,p,h);return!0}}},{"../../const":22,"../../math":33,"../../renderers/webgl/WebGLRenderer":49,"../../renderers/webgl/utils/ObjectRenderer":63,"../../utils":77,"./WebGLGraphicsData":28,earcut:9}],28:[function(t,e,r){function i(t){this.gl=t,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),this.mode=1,this.alpha=1,this.dirty=!0,this.glPoints=null,this.glIndices=null}i.prototype.constructor=i,e.exports=i,i.prototype.reset=function(){this.points.length=0,this.indices.length=0},i.prototype.upload=function(){var t=this.gl;this.glPoints=new Float32Array(this.points),t.bindBuffer(t.ARRAY_BUFFER,this.buffer),t.bufferData(t.ARRAY_BUFFER,this.glPoints,t.STATIC_DRAW),this.glIndices=new Uint16Array(this.indices),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.glIndices,t.STATIC_DRAW),this.dirty=!1},i.prototype.destroy=function(){this.color=null,this.points=null,this.indices=null,this.gl.deleteBuffer(this.buffer),this.gl.deleteBuffer(this.indexBuffer),this.gl=null,this.buffer=null,this.indexBuffer=null,this.glPoints=null,this.glIndices=null}},{}],29:[function(t,e,r){var i=e.exports=Object.assign(t("./const"),t("./math"),{utils:t("./utils"),ticker:t("./ticker"),DisplayObject:t("./display/DisplayObject"),Container:t("./display/Container"),Sprite:t("./sprites/Sprite"),ParticleContainer:t("./particles/ParticleContainer"),SpriteRenderer:t("./sprites/webgl/SpriteRenderer"),ParticleRenderer:t("./particles/webgl/ParticleRenderer"),Text:t("./text/Text"),Graphics:t("./graphics/Graphics"),GraphicsData:t("./graphics/GraphicsData"),GraphicsRenderer:t("./graphics/webgl/GraphicsRenderer"),Texture:t("./textures/Texture"),BaseTexture:t("./textures/BaseTexture"),RenderTexture:t("./textures/RenderTexture"),VideoBaseTexture:t("./textures/VideoBaseTexture"),TextureUvs:t("./textures/TextureUvs"),CanvasRenderer:t("./renderers/canvas/CanvasRenderer"),CanvasGraphics:t("./renderers/canvas/utils/CanvasGraphics"),CanvasBuffer:t("./renderers/canvas/utils/CanvasBuffer"),WebGLRenderer:t("./renderers/webgl/WebGLRenderer"),WebGLManager:t("./renderers/webgl/managers/WebGLManager"),ShaderManager:t("./renderers/webgl/managers/ShaderManager"),Shader:t("./renderers/webgl/shaders/Shader"),TextureShader:t("./renderers/webgl/shaders/TextureShader"),PrimitiveShader:t("./renderers/webgl/shaders/PrimitiveShader"),ComplexPrimitiveShader:t("./renderers/webgl/shaders/ComplexPrimitiveShader"),ObjectRenderer:t("./renderers/webgl/utils/ObjectRenderer"),RenderTarget:t("./renderers/webgl/utils/RenderTarget"),AbstractFilter:t("./renderers/webgl/filters/AbstractFilter"),FXAAFilter:t("./renderers/webgl/filters/FXAAFilter"),SpriteMaskFilter:t("./renderers/webgl/filters/SpriteMaskFilter"),autoDetectRenderer:function(t,e,r,n){return t=t||800,e=e||600,!n&&i.utils.isWebGLSupported()?new i.WebGLRenderer(t,e,r):new i.CanvasRenderer(t,e,r)}})},{"./const":22,"./display/Container":23,"./display/DisplayObject":24,"./graphics/Graphics":25,"./graphics/GraphicsData":26,"./graphics/webgl/GraphicsRenderer":27,"./math":33,"./particles/ParticleContainer":39,"./particles/webgl/ParticleRenderer":41,"./renderers/canvas/CanvasRenderer":44,"./renderers/canvas/utils/CanvasBuffer":45,"./renderers/canvas/utils/CanvasGraphics":46,"./renderers/webgl/WebGLRenderer":49,"./renderers/webgl/filters/AbstractFilter":50,"./renderers/webgl/filters/FXAAFilter":51,"./renderers/webgl/filters/SpriteMaskFilter":52,"./renderers/webgl/managers/ShaderManager":56,"./renderers/webgl/managers/WebGLManager":58,"./renderers/webgl/shaders/ComplexPrimitiveShader":59,"./renderers/webgl/shaders/PrimitiveShader":60,"./renderers/webgl/shaders/Shader":61,"./renderers/webgl/shaders/TextureShader":62,"./renderers/webgl/utils/ObjectRenderer":63,"./renderers/webgl/utils/RenderTarget":65,"./sprites/Sprite":67,"./sprites/webgl/SpriteRenderer":68,"./text/Text":69,"./textures/BaseTexture":70,"./textures/RenderTexture":71,"./textures/Texture":72,"./textures/TextureUvs":73,"./textures/VideoBaseTexture":74,"./ticker":76,"./utils":77}],30:[function(t,e,r){function i(t){return 0>t?-1:t>0?1:0}function n(){for(var t=0;16>t;t++){var e=[];c.push(e);for(var r=0;16>r;r++)for(var n=i(o[t]*o[r]+a[t]*s[r]),p=i(s[t]*o[r]+h[t]*s[r]),d=i(o[t]*a[r]+a[t]*h[r]),f=i(s[t]*a[r]+h[t]*h[r]),v=0;16>v;v++)if(o[v]===n&&s[v]===p&&a[v]===d&&h[v]===f){e.push(v);break}}for(t=0;16>t;t++){var g=new l;
g.set(o[t],s[t],a[t],h[t],0,0),u.push(g)}}var o=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],s=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],a=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],h=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],u=[],l=t("./Matrix"),c=[];n();var p={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MIRROR_HORIZONTAL:12,uX:function(t){return o[t]},uY:function(t){return s[t]},vX:function(t){return a[t]},vY:function(t){return h[t]},inv:function(t){return 8&t?15&t:7&-t},add:function(t,e){return c[t][e]},sub:function(t,e){return c[t][p.inv(e)]},rotate180:function(t){return 4^t},isSwapWidthHeight:function(t){return 2===(3&t)},byDirection:function(t,e){return 2*Math.abs(t)<=Math.abs(e)?e>=0?p.S:p.N:2*Math.abs(e)<=Math.abs(t)?t>0?p.E:p.W:e>0?t>0?p.SE:p.SW:t>0?p.NE:p.NW},matrixAppendRotationInv:function(t,e,r,i){var n=u[p.inv(e)];r=r||0,i=i||0,n.tx=r,n.ty=i,t.append(n)}};e.exports=p},{"./Matrix":31}],31:[function(t,e,r){function i(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0}var n=t("./Point");i.prototype.constructor=i,e.exports=i,i.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},i.prototype.set=function(t,e,r,i,n,o){return this.a=t,this.b=e,this.c=r,this.d=i,this.tx=n,this.ty=o,this},i.prototype.toArray=function(t,e){this.array||(this.array=new Float32Array(9));var r=e||this.array;return t?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty,r[8]=1):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0,r[8]=1),r},i.prototype.apply=function(t,e){e=e||new n;var r=t.x,i=t.y;return e.x=this.a*r+this.c*i+this.tx,e.y=this.b*r+this.d*i+this.ty,e},i.prototype.applyInverse=function(t,e){e=e||new n;var r=1/(this.a*this.d+this.c*-this.b),i=t.x,o=t.y;return e.x=this.d*r*i+-this.c*r*o+(this.ty*this.c-this.tx*this.d)*r,e.y=this.a*r*o+-this.b*r*i+(-this.ty*this.a+this.tx*this.b)*r,e},i.prototype.translate=function(t,e){return this.tx+=t,this.ty+=e,this},i.prototype.scale=function(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this},i.prototype.rotate=function(t){var e=Math.cos(t),r=Math.sin(t),i=this.a,n=this.c,o=this.tx;return this.a=i*e-this.b*r,this.b=i*r+this.b*e,this.c=n*e-this.d*r,this.d=n*r+this.d*e,this.tx=o*e-this.ty*r,this.ty=o*r+this.ty*e,this},i.prototype.append=function(t){var e=this.a,r=this.b,i=this.c,n=this.d;return this.a=t.a*e+t.b*i,this.b=t.a*r+t.b*n,this.c=t.c*e+t.d*i,this.d=t.c*r+t.d*n,this.tx=t.tx*e+t.ty*i+this.tx,this.ty=t.tx*r+t.ty*n+this.ty,this},i.prototype.setTransform=function(t,e,r,i,n,o,s,a,h){var u,l,c,p,d,f,v,g,m,y;return d=Math.sin(s),f=Math.cos(s),v=Math.cos(h),g=Math.sin(h),m=-Math.sin(a),y=Math.cos(a),u=f*n,l=d*n,c=-d*o,p=f*o,this.a=v*u+g*c,this.b=v*l+g*p,this.c=m*u+y*c,this.d=m*l+y*p,this.tx=t+(r*u+i*c),this.ty=e+(r*l+i*p),this},i.prototype.prepend=function(t){var e=this.tx;if(1!==t.a||0!==t.b||0!==t.c||1!==t.d){var r=this.a,i=this.c;this.a=r*t.a+this.b*t.c,this.b=r*t.b+this.b*t.d,this.c=i*t.a+this.d*t.c,this.d=i*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this},i.prototype.invert=function(){var t=this.a,e=this.b,r=this.c,i=this.d,n=this.tx,o=t*i-e*r;return this.a=i/o,this.b=-e/o,this.c=-r/o,this.d=t/o,this.tx=(r*this.ty-i*n)/o,this.ty=-(t*this.ty-e*n)/o,this},i.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},i.prototype.clone=function(){var t=new i;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},i.prototype.copy=function(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},i.IDENTITY=new i,i.TEMP_MATRIX=new i},{"./Point":32}],32:[function(t,e,r){function i(t,e){this.x=t||0,this.y=e||0}i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y)},i.prototype.copy=function(t){this.set(t.x,t.y)},i.prototype.equals=function(t){return t.x===this.x&&t.y===this.y},i.prototype.set=function(t,e){this.x=t||0,this.y=e||(0!==e?this.x:0)}},{}],33:[function(t,e,r){e.exports={Point:t("./Point"),Matrix:t("./Matrix"),GroupD8:t("./GroupD8"),Circle:t("./shapes/Circle"),Ellipse:t("./shapes/Ellipse"),Polygon:t("./shapes/Polygon"),Rectangle:t("./shapes/Rectangle"),RoundedRectangle:t("./shapes/RoundedRectangle")}},{"./GroupD8":30,"./Matrix":31,"./Point":32,"./shapes/Circle":34,"./shapes/Ellipse":35,"./shapes/Polygon":36,"./shapes/Rectangle":37,"./shapes/RoundedRectangle":38}],34:[function(t,e,r){function i(t,e,r){this.x=t||0,this.y=e||0,this.radius=r||0,this.type=o.SHAPES.CIRC}var n=t("./Rectangle"),o=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y,this.radius)},i.prototype.contains=function(t,e){if(this.radius<=0)return!1;var r=this.x-t,i=this.y-e,n=this.radius*this.radius;return r*=r,i*=i,n>=r+i},i.prototype.getBounds=function(){return new n(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)}},{"../../const":22,"./Rectangle":37}],35:[function(t,e,r){function i(t,e,r,i){this.x=t||0,this.y=e||0,this.width=r||0,this.height=i||0,this.type=o.SHAPES.ELIP}var n=t("./Rectangle"),o=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y,this.width,this.height)},i.prototype.contains=function(t,e){if(this.width<=0||this.height<=0)return!1;var r=(t-this.x)/this.width,i=(e-this.y)/this.height;return r*=r,i*=i,1>=r+i},i.prototype.getBounds=function(){return new n(this.x-this.width,this.y-this.height,this.width,this.height)}},{"../../const":22,"./Rectangle":37}],36:[function(t,e,r){function i(t){var e=t;if(!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;++r)e[r]=arguments[r]}if(e[0]instanceof n){for(var i=[],s=0,a=e.length;a>s;s++)i.push(e[s].x,e[s].y);e=i}this.closed=!0,this.points=e,this.type=o.SHAPES.POLY}var n=t("../Point"),o=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.points.slice())},i.prototype.contains=function(t,e){for(var r=!1,i=this.points.length/2,n=0,o=i-1;i>n;o=n++){var s=this.points[2*n],a=this.points[2*n+1],h=this.points[2*o],u=this.points[2*o+1],l=a>e!=u>e&&(h-s)*(e-a)/(u-a)+s>t;l&&(r=!r)}return r}},{"../../const":22,"../Point":32}],37:[function(t,e,r){function i(t,e,r,i){this.x=t||0,this.y=e||0,this.width=r||0,this.height=i||0,this.type=n.SHAPES.RECT}var n=t("../../const");i.prototype.constructor=i,e.exports=i,i.EMPTY=new i(0,0,0,0),i.prototype.clone=function(){return new i(this.x,this.y,this.width,this.height)},i.prototype.contains=function(t,e){return this.width<=0||this.height<=0?!1:t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height?!0:!1}},{"../../const":22}],38:[function(t,e,r){function i(t,e,r,i,o){this.x=t||0,this.y=e||0,this.width=r||0,this.height=i||0,this.radius=o||20,this.type=n.SHAPES.RREC}var n=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y,this.width,this.height,this.radius)},i.prototype.contains=function(t,e){return this.width<=0||this.height<=0?!1:t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height?!0:!1}},{"../../const":22}],39:[function(t,e,r){function i(t,e,r){n.call(this),r=r||15e3,t=t||15e3;var i=16384;r>i&&(r=i),r>t&&(r=t),this._properties=[!1,!0,!1,!1,!1],this._maxSize=t,this._batchSize=r,this._buffers=null,this._bufferToUpdate=0,this.interactiveChildren=!1,this.blendMode=o.BLEND_MODES.NORMAL,this.roundPixels=!0,this.setProperties(e)}var n=t("../display/Container"),o=t("../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.setProperties=function(t){t&&(this._properties[0]="scale"in t?!!t.scale:this._properties[0],this._properties[1]="position"in t?!!t.position:this._properties[1],this._properties[2]="rotation"in t?!!t.rotation:this._properties[2],this._properties[3]="uvs"in t?!!t.uvs:this._properties[3],this._properties[4]="alpha"in t?!!t.alpha:this._properties[4])},i.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},i.prototype.renderWebGL=function(t){this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable&&(t.setObjectRenderer(t.plugins.particle),t.plugins.particle.render(this))},i.prototype.onChildrenChange=function(t){var e=Math.floor(t/this._batchSize);e<this._bufferToUpdate&&(this._bufferToUpdate=e)},i.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable){var e=t.context,r=this.worldTransform,i=!0,n=0,o=0,s=0,a=0,h=t.blendModes[this.blendMode];h!==e.globalCompositeOperation&&(e.globalCompositeOperation=h),e.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var u=0;u<this.children.length;++u){var l=this.children[u];if(l.visible){var c=l.texture.frame;if(e.globalAlpha=this.worldAlpha*l.alpha,l.rotation%(2*Math.PI)===0)i&&(e.setTransform(r.a,r.b,r.c,r.d,r.tx,r.ty),i=!1),n=l.anchor.x*(-c.width*l.scale.x)+l.position.x+.5,o=l.anchor.y*(-c.height*l.scale.y)+l.position.y+.5,s=c.width*l.scale.x,a=c.height*l.scale.y;else{i||(i=!0),l.displayObjectUpdateTransform();var p=l.worldTransform;t.roundPixels?e.setTransform(p.a,p.b,p.c,p.d,0|p.tx,0|p.ty):e.setTransform(p.a,p.b,p.c,p.d,p.tx,p.ty),n=l.anchor.x*-c.width+.5,o=l.anchor.y*-c.height+.5,s=c.width,a=c.height}e.drawImage(l.texture.baseTexture.source,c.x,c.y,c.width,c.height,n,o,s,a)}}}},i.prototype.destroy=function(){if(n.prototype.destroy.apply(this,arguments),this._buffers)for(var t=0;t<this._buffers.length;++t)this._buffers[t].destroy();this._properties=null,this._buffers=null}},{"../const":22,"../display/Container":23}],40:[function(t,e,r){function i(t,e,r,i){this.gl=t,this.vertSize=2,this.vertByteSize=4*this.vertSize,this.size=i,this.dynamicProperties=[],this.staticProperties=[];for(var n=0;n<e.length;n++){var o=e[n];r[n]?this.dynamicProperties.push(o):this.staticProperties.push(o)}this.staticStride=0,this.staticBuffer=null,this.staticData=null,this.dynamicStride=0,this.dynamicBuffer=null,this.dynamicData=null,this.initBuffers()}i.prototype.constructor=i,e.exports=i,i.prototype.initBuffers=function(){var t,e,r=this.gl,i=0;for(this.dynamicStride=0,t=0;t<this.dynamicProperties.length;t++)e=this.dynamicProperties[t],e.offset=i,i+=e.size,this.dynamicStride+=e.size;this.dynamicData=new Float32Array(this.size*this.dynamicStride*4),this.dynamicBuffer=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,this.dynamicBuffer),r.bufferData(r.ARRAY_BUFFER,this.dynamicData,r.DYNAMIC_DRAW);var n=0;for(this.staticStride=0,t=0;t<this.staticProperties.length;t++)e=this.staticProperties[t],e.offset=n,n+=e.size,this.staticStride+=e.size;this.staticData=new Float32Array(this.size*this.staticStride*4),this.staticBuffer=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,this.staticBuffer),r.bufferData(r.ARRAY_BUFFER,this.staticData,r.DYNAMIC_DRAW)},i.prototype.uploadDynamic=function(t,e,r){for(var i=this.gl,n=0;n<this.dynamicProperties.length;n++){var o=this.dynamicProperties[n];o.uploadFunction(t,e,r,this.dynamicData,this.dynamicStride,o.offset)}i.bindBuffer(i.ARRAY_BUFFER,this.dynamicBuffer),i.bufferSubData(i.ARRAY_BUFFER,0,this.dynamicData)},i.prototype.uploadStatic=function(t,e,r){for(var i=this.gl,n=0;n<this.staticProperties.length;n++){var o=this.staticProperties[n];o.uploadFunction(t,e,r,this.staticData,this.staticStride,o.offset)}i.bindBuffer(i.ARRAY_BUFFER,this.staticBuffer),i.bufferSubData(i.ARRAY_BUFFER,0,this.staticData)},i.prototype.bind=function(){var t,e,r=this.gl;for(r.bindBuffer(r.ARRAY_BUFFER,this.dynamicBuffer),t=0;t<this.dynamicProperties.length;t++)e=this.dynamicProperties[t],r.vertexAttribPointer(e.attribute,e.size,r.FLOAT,!1,4*this.dynamicStride,4*e.offset);for(r.bindBuffer(r.ARRAY_BUFFER,this.staticBuffer),t=0;t<this.staticProperties.length;t++)e=this.staticProperties[t],r.vertexAttribPointer(e.attribute,e.size,r.FLOAT,!1,4*this.staticStride,4*e.offset)},i.prototype.destroy=function(){this.dynamicProperties=null,this.dynamicData=null,this.gl.deleteBuffer(this.dynamicBuffer),this.staticProperties=null,this.staticData=null,this.gl.deleteBuffer(this.staticBuffer)}},{}],41:[function(t,e,r){function i(t){n.call(this,t);var e=98304;this.indices=new Uint16Array(e);for(var r=0,i=0;e>r;r+=6,i+=4)this.indices[r+0]=i+0,this.indices[r+1]=i+1,this.indices[r+2]=i+2,this.indices[r+3]=i+0,this.indices[r+4]=i+2,this.indices[r+5]=i+3;this.shader=null,this.indexBuffer=null,this.properties=null,this.tempMatrix=new h.Matrix}var n=t("../../renderers/webgl/utils/ObjectRenderer"),o=t("../../renderers/webgl/WebGLRenderer"),s=t("./ParticleShader"),a=t("./ParticleBuffer"),h=t("../../math");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,o.registerPlugin("particle",i),i.prototype.onContextChange=function(){var t=this.renderer.gl;this.shader=new s(this.renderer.shaderManager),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),this.properties=[{attribute:this.shader.attributes.aVertexPosition,size:2,uploadFunction:this.uploadVertices,offset:0},{attribute:this.shader.attributes.aPositionCoord,size:2,uploadFunction:this.uploadPosition,offset:0},{attribute:this.shader.attributes.aRotation,size:1,uploadFunction:this.uploadRotation,offset:0},{attribute:this.shader.attributes.aTextureCoord,size:2,uploadFunction:this.uploadUvs,offset:0},{attribute:this.shader.attributes.aColor,size:1,uploadFunction:this.uploadAlpha,offset:0}]},i.prototype.start=function(){var t=this.renderer.gl;t.activeTexture(t.TEXTURE0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var e=this.shader;this.renderer.shaderManager.setShader(e)},i.prototype.render=function(t){var e=t.children,r=e.length,i=t._maxSize,n=t._batchSize;if(0!==r){r>i&&(r=i),t._buffers||(t._buffers=this.generateBuffers(t)),this.renderer.blendModeManager.setBlendMode(t.blendMode);var o=this.renderer.gl,s=t.worldTransform.copy(this.tempMatrix);s.prepend(this.renderer.currentRenderTarget.projectionMatrix),o.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location,!1,s.toArray(!0)),o.uniform1f(this.shader.uniforms.uAlpha._location,t.worldAlpha);var a=e[0]._texture.baseTexture;if(a._glTextures[o.id])o.bindTexture(o.TEXTURE_2D,a._glTextures[o.id]);else{if(!this.renderer.updateTexture(a))return;t._properties[0]&&t._properties[3]||(t._bufferToUpdate=0)}for(var h=0,u=0;r>h;h+=n,u+=1){var l=r-h;l>n&&(l=n);var c=t._buffers[u];c.uploadDynamic(e,h,l),t._bufferToUpdate===u&&(c.uploadStatic(e,h,l),t._bufferToUpdate=u+1),c.bind(this.shader),o.drawElements(o.TRIANGLES,6*l,o.UNSIGNED_SHORT,0),this.renderer.drawCount++}}},i.prototype.generateBuffers=function(t){var e,r=this.renderer.gl,i=[],n=t._maxSize,o=t._batchSize,s=t._properties;for(e=0;n>e;e+=o)i.push(new a(r,this.properties,s,o));return i},i.prototype.uploadVertices=function(t,e,r,i,n,o){for(var s,a,h,u,l,c,p,d,f,v=0;r>v;v++)s=t[e+v],a=s._texture,u=s.scale.x,l=s.scale.y,a.trim?(h=a.trim,p=h.x-s.anchor.x*h.width,c=p+a.crop.width,f=h.y-s.anchor.y*h.height,d=f+a.crop.height):(c=a._frame.width*(1-s.anchor.x),p=a._frame.width*-s.anchor.x,d=a._frame.height*(1-s.anchor.y),f=a._frame.height*-s.anchor.y),i[o]=p*u,i[o+1]=f*l,i[o+n]=c*u,i[o+n+1]=f*l,i[o+2*n]=c*u,i[o+2*n+1]=d*l,i[o+3*n]=p*u,i[o+3*n+1]=d*l,o+=4*n},i.prototype.uploadPosition=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s].position;i[o]=a.x,i[o+1]=a.y,i[o+n]=a.x,i[o+n+1]=a.y,i[o+2*n]=a.x,i[o+2*n+1]=a.y,i[o+3*n]=a.x,i[o+3*n+1]=a.y,o+=4*n}},i.prototype.uploadRotation=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s].rotation;i[o]=a,i[o+n]=a,i[o+2*n]=a,i[o+3*n]=a,o+=4*n}},i.prototype.uploadUvs=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s]._texture._uvs;a?(i[o]=a.x0,i[o+1]=a.y0,i[o+n]=a.x1,i[o+n+1]=a.y1,i[o+2*n]=a.x2,i[o+2*n+1]=a.y2,i[o+3*n]=a.x3,i[o+3*n+1]=a.y3,o+=4*n):(i[o]=0,i[o+1]=0,i[o+n]=0,i[o+n+1]=0,i[o+2*n]=0,i[o+2*n+1]=0,i[o+3*n]=0,i[o+3*n+1]=0,o+=4*n)}},i.prototype.uploadAlpha=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s].alpha;i[o]=a,i[o+n]=a,i[o+2*n]=a,i[o+3*n]=a,o+=4*n}},i.prototype.destroy=function(){this.renderer.gl&&this.renderer.gl.deleteBuffer(this.indexBuffer),n.prototype.destroy.apply(this,arguments),this.shader.destroy(),this.indices=null,this.tempMatrix=null}},{"../../math":33,"../../renderers/webgl/WebGLRenderer":49,"../../renderers/webgl/utils/ObjectRenderer":63,"./ParticleBuffer":40,"./ParticleShader":42}],42:[function(t,e,r){function i(t){n.call(this,t,["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","varying float vColor;","void main(void){","   vec2 v = aVertexPosition;","   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);","   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);","   v = v + aPositionCoord;","   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"].join("\n"),["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","uniform float uAlpha;","void main(void){","  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;","  if (color.a == 0.0) discard;","  gl_FragColor = color;","}"].join("\n"),{uAlpha:{type:"1f",value:1}},{aPositionCoord:0,aRotation:0})}var n=t("../../renderers/webgl/shaders/TextureShader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i},{"../../renderers/webgl/shaders/TextureShader":62}],43:[function(t,e,r){function i(t,e,r,i){if(a.call(this),n.sayHello(t),i)for(var h in s.DEFAULT_RENDER_OPTIONS)"undefined"==typeof i[h]&&(i[h]=s.DEFAULT_RENDER_OPTIONS[h]);else i=s.DEFAULT_RENDER_OPTIONS;this.type=s.RENDERER_TYPE.UNKNOWN,this.width=e||800,this.height=r||600,this.view=i.view||document.createElement("canvas"),this.resolution=i.resolution,this.transparent=i.transparent,this.autoResize=i.autoResize||!1,this.blendModes=null,this.preserveDrawingBuffer=i.preserveDrawingBuffer,this.clearBeforeRender=i.clearBeforeRender,this.roundPixels=i.roundPixels,this._backgroundColor=0,this._backgroundColorRgb=[0,0,0],this._backgroundColorString="#000000",this.backgroundColor=i.backgroundColor||this._backgroundColor,this._tempDisplayObjectParent={worldTransform:new o.Matrix,worldAlpha:1,children:[]},this._lastObjectRendered=this._tempDisplayObjectParent}var n=t("../utils"),o=t("../math"),s=t("../const"),a=t("eventemitter3");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{backgroundColor:{get:function(){return this._backgroundColor},set:function(t){this._backgroundColor=t,this._backgroundColorString=n.hex2string(t),n.hex2rgb(t,this._backgroundColorRgb)}}}),i.prototype.resize=function(t,e){this.width=t*this.resolution,this.height=e*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px")},i.prototype.destroy=function(t){t&&this.view.parentNode&&this.view.parentNode.removeChild(this.view),this.type=s.RENDERER_TYPE.UNKNOWN,this.width=0,this.height=0,this.view=null,this.resolution=0,this.transparent=!1,this.autoResize=!1,this.blendModes=null,this.preserveDrawingBuffer=!1,this.clearBeforeRender=!1,this.roundPixels=!1,this._backgroundColor=0,this._backgroundColorRgb=null,this._backgroundColorString=null}},{"../const":22,"../math":33,"../utils":77,eventemitter3:10}],44:[function(t,e,r){function i(t,e,r){r=r||{},n.call(this,"Canvas",t,e,r),this.type=h.RENDERER_TYPE.CANVAS,this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.maskManager=new o,this.smoothProperty="imageSmoothingEnabled",this.context.imageSmoothingEnabled||(this.context.webkitImageSmoothingEnabled?this.smoothProperty="webkitImageSmoothingEnabled":this.context.mozImageSmoothingEnabled?this.smoothProperty="mozImageSmoothingEnabled":this.context.oImageSmoothingEnabled?this.smoothProperty="oImageSmoothingEnabled":this.context.msImageSmoothingEnabled&&(this.smoothProperty="msImageSmoothingEnabled")),this.initPlugins(),this._mapBlendModes(),this._tempDisplayObjectParent={worldTransform:new a.Matrix,worldAlpha:1},this.resize(t,e)}var n=t("../SystemRenderer"),o=t("./utils/CanvasMaskManager"),s=t("../../utils"),a=t("../../math"),h=t("../../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,s.pluginTarget.mixin(i),i.prototype.render=function(t){this.emit("prerender");var e=t.parent;this._lastObjectRendered=t,t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=e,this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.context.globalCompositeOperation=this.blendModes[h.BLEND_MODES.NORMAL],navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width,this.height):(this.context.fillStyle=this._backgroundColorString,this.context.fillRect(0,0,this.width,this.height))),this.renderDisplayObject(t,this.context),this.emit("postrender")},i.prototype.destroy=function(t){this.destroyPlugins(),n.prototype.destroy.call(this,t),this.context=null,this.refresh=!0,this.maskManager.destroy(),this.maskManager=null,this.smoothProperty=null},i.prototype.renderDisplayObject=function(t,e){var r=this.context;this.context=e,t.renderCanvas(this),this.context=r},i.prototype.resize=function(t,e){n.prototype.resize.call(this,t,e),this.smoothProperty&&(this.context[this.smoothProperty]=h.SCALE_MODES.DEFAULT===h.SCALE_MODES.LINEAR)},i.prototype._mapBlendModes=function(){this.blendModes||(this.blendModes={},s.canUseNewCanvasBlendModes()?(this.blendModes[h.BLEND_MODES.NORMAL]="source-over",this.blendModes[h.BLEND_MODES.ADD]="lighter",this.blendModes[h.BLEND_MODES.MULTIPLY]="multiply",this.blendModes[h.BLEND_MODES.SCREEN]="screen",this.blendModes[h.BLEND_MODES.OVERLAY]="overlay",this.blendModes[h.BLEND_MODES.DARKEN]="darken",this.blendModes[h.BLEND_MODES.LIGHTEN]="lighten",this.blendModes[h.BLEND_MODES.COLOR_DODGE]="color-dodge",this.blendModes[h.BLEND_MODES.COLOR_BURN]="color-burn",this.blendModes[h.BLEND_MODES.HARD_LIGHT]="hard-light",this.blendModes[h.BLEND_MODES.SOFT_LIGHT]="soft-light",this.blendModes[h.BLEND_MODES.DIFFERENCE]="difference",this.blendModes[h.BLEND_MODES.EXCLUSION]="exclusion",this.blendModes[h.BLEND_MODES.HUE]="hue",this.blendModes[h.BLEND_MODES.SATURATION]="saturate",this.blendModes[h.BLEND_MODES.COLOR]="color",this.blendModes[h.BLEND_MODES.LUMINOSITY]="luminosity"):(this.blendModes[h.BLEND_MODES.NORMAL]="source-over",this.blendModes[h.BLEND_MODES.ADD]="lighter",this.blendModes[h.BLEND_MODES.MULTIPLY]="source-over",this.blendModes[h.BLEND_MODES.SCREEN]="source-over",this.blendModes[h.BLEND_MODES.OVERLAY]="source-over",this.blendModes[h.BLEND_MODES.DARKEN]="source-over",this.blendModes[h.BLEND_MODES.LIGHTEN]="source-over",this.blendModes[h.BLEND_MODES.COLOR_DODGE]="source-over",this.blendModes[h.BLEND_MODES.COLOR_BURN]="source-over",this.blendModes[h.BLEND_MODES.HARD_LIGHT]="source-over",this.blendModes[h.BLEND_MODES.SOFT_LIGHT]="source-over",this.blendModes[h.BLEND_MODES.DIFFERENCE]="source-over",this.blendModes[h.BLEND_MODES.EXCLUSION]="source-over",this.blendModes[h.BLEND_MODES.HUE]="source-over",this.blendModes[h.BLEND_MODES.SATURATION]="source-over",this.blendModes[h.BLEND_MODES.COLOR]="source-over",this.blendModes[h.BLEND_MODES.LUMINOSITY]="source-over"))}},{"../../const":22,"../../math":33,"../../utils":77,"../SystemRenderer":43,"./utils/CanvasMaskManager":47}],45:[function(t,e,r){function i(t,e){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=t,this.canvas.height=e}i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return this.canvas.width},set:function(t){this.canvas.width=t}},height:{get:function(){return this.canvas.height},set:function(t){this.canvas.height=t}}}),i.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},i.prototype.resize=function(t,e){this.canvas.width=t,this.canvas.height=e},i.prototype.destroy=function(){this.context=null,this.canvas=null}},{}],46:[function(t,e,r){var i=t("../../../const"),n={};e.exports=n,n.renderGraphics=function(t,e){var r=t.worldAlpha;t.dirty&&(this.updateGraphicsTint(t),t.dirty=!1);for(var n=0;n<t.graphicsData.length;n++){var o=t.graphicsData[n],s=o.shape,a=o._fillTint,h=o._lineTint;if(e.lineWidth=o.lineWidth,o.type===i.SHAPES.POLY){e.beginPath();var u=s.points;e.moveTo(u[0],u[1]);for(var l=1;l<u.length/2;l++)e.lineTo(u[2*l],u[2*l+1]);s.closed&&e.lineTo(u[0],u[1]),u[0]===u[u.length-2]&&u[1]===u[u.length-1]&&e.closePath(),o.fill&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}else if(o.type===i.SHAPES.RECT)(o.fillColor||0===o.fillColor)&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fillRect(s.x,s.y,s.width,s.height)),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.strokeRect(s.x,s.y,s.width,s.height));else if(o.type===i.SHAPES.CIRC)e.beginPath(),e.arc(s.x,s.y,s.radius,0,2*Math.PI),e.closePath(),o.fill&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke());else if(o.type===i.SHAPES.ELIP){var c=2*s.width,p=2*s.height,d=s.x-c/2,f=s.y-p/2;e.beginPath();var v=.5522848,g=c/2*v,m=p/2*v,y=d+c,x=f+p,b=d+c/2,_=f+p/2;e.moveTo(d,_),e.bezierCurveTo(d,_-m,b-g,f,b,f),e.bezierCurveTo(b+g,f,y,_-m,y,_),e.bezierCurveTo(y,_+m,b+g,x,b,x),e.bezierCurveTo(b-g,x,d,_+m,d,_),e.closePath(),o.fill&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}else if(o.type===i.SHAPES.RREC){var T=s.x,E=s.y,S=s.width,w=s.height,A=s.radius,C=Math.min(S,w)/2|0;A=A>C?C:A,e.beginPath(),e.moveTo(T,E+A),e.lineTo(T,E+w-A),e.quadraticCurveTo(T,E+w,T+A,E+w),e.lineTo(T+S-A,E+w),e.quadraticCurveTo(T+S,E+w,T+S,E+w-A),e.lineTo(T+S,E+A),e.quadraticCurveTo(T+S,E,T+S-A,E),e.lineTo(T+A,E),e.quadraticCurveTo(T,E,T,E+A),e.closePath(),(o.fillColor||0===o.fillColor)&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}}},n.renderGraphicsMask=function(t,e){var r=t.graphicsData.length;if(0!==r){e.beginPath();for(var n=0;r>n;n++){var o=t.graphicsData[n],s=o.shape;if(o.type===i.SHAPES.POLY){var a=s.points;e.moveTo(a[0],a[1]);for(var h=1;h<a.length/2;h++)e.lineTo(a[2*h],a[2*h+1]);a[0]===a[a.length-2]&&a[1]===a[a.length-1]&&e.closePath()}else if(o.type===i.SHAPES.RECT)e.rect(s.x,s.y,s.width,s.height),e.closePath();else if(o.type===i.SHAPES.CIRC)e.arc(s.x,s.y,s.radius,0,2*Math.PI),e.closePath();else if(o.type===i.SHAPES.ELIP){var u=2*s.width,l=2*s.height,c=s.x-u/2,p=s.y-l/2,d=.5522848,f=u/2*d,v=l/2*d,g=c+u,m=p+l,y=c+u/2,x=p+l/2;e.moveTo(c,x),e.bezierCurveTo(c,x-v,y-f,p,y,p),e.bezierCurveTo(y+f,p,g,x-v,g,x),e.bezierCurveTo(g,x+v,y+f,m,y,m),e.bezierCurveTo(y-f,m,c,x+v,c,x),e.closePath()}else if(o.type===i.SHAPES.RREC){var b=s.x,_=s.y,T=s.width,E=s.height,S=s.radius,w=Math.min(T,E)/2|0;S=S>w?w:S,e.moveTo(b,_+S),e.lineTo(b,_+E-S),e.quadraticCurveTo(b,_+E,b+S,_+E),e.lineTo(b+T-S,_+E),e.quadraticCurveTo(b+T,_+E,b+T,_+E-S),e.lineTo(b+T,_+S),e.quadraticCurveTo(b+T,_,b+T-S,_),e.lineTo(b+S,_),e.quadraticCurveTo(b,_,b,_+S),e.closePath()}}}},n.updateGraphicsTint=function(t){if(16777215!==t.tint||t._prevTint!==t.tint){t._prevTint=t.tint;for(var e=(t.tint>>16&255)/255,r=(t.tint>>8&255)/255,i=(255&t.tint)/255,n=0;n<t.graphicsData.length;n++){var o=t.graphicsData[n],s=0|o.fillColor,a=0|o.lineColor;o._fillTint=((s>>16&255)/255*e*255<<16)+((s>>8&255)/255*r*255<<8)+(255&s)/255*i*255,o._lineTint=((a>>16&255)/255*e*255<<16)+((a>>8&255)/255*r*255<<8)+(255&a)/255*i*255}}}},{"../../../const":22}],47:[function(t,e,r){function i(){}var n=t("./CanvasGraphics");i.prototype.constructor=i,e.exports=i,i.prototype.pushMask=function(t,e){e.context.save();var r=t.alpha,i=t.worldTransform,o=e.resolution;e.context.setTransform(i.a*o,i.b*o,i.c*o,i.d*o,i.tx*o,i.ty*o),t.texture||(n.renderGraphicsMask(t,e.context),e.context.clip()),t.worldAlpha=r},i.prototype.popMask=function(t){t.context.restore()},i.prototype.destroy=function(){}},{"./CanvasGraphics":46}],48:[function(t,e,r){var i=t("../../../utils"),n={};e.exports=n,n.getTintedTexture=function(t,e){var r=t.texture;e=n.roundColor(e);var i="#"+("00000"+(0|e).toString(16)).substr(-6);if(r.tintCache=r.tintCache||{},r.tintCache[i])return r.tintCache[i];var o=n.canvas||document.createElement("canvas");if(n.tintMethod(r,e,o),n.convertTintToImage){var s=new Image;s.src=o.toDataURL(),r.tintCache[i]=s}else r.tintCache[i]=o,n.canvas=null;return o},n.tintWithMultiply=function(t,e,r){var i=r.getContext("2d"),n=t.baseTexture.resolution,o=t.crop.clone();o.x*=n,o.y*=n,o.width*=n,o.height*=n,r.width=o.width,r.height=o.height,i.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),i.fillRect(0,0,o.width,o.height),i.globalCompositeOperation="multiply",i.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height),i.globalCompositeOperation="destination-atop",i.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height)},n.tintWithOverlay=function(t,e,r){var i=r.getContext("2d"),n=t.baseTexture.resolution,o=t.crop.clone();o.x*=n,o.y*=n,o.width*=n,o.height*=n,r.width=o.width,r.height=o.height,i.globalCompositeOperation="copy",i.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),i.fillRect(0,0,o.width,o.height),i.globalCompositeOperation="destination-atop",i.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height)},n.tintWithPerPixel=function(t,e,r){var n=r.getContext("2d"),o=t.baseTexture.resolution,s=t.crop.clone();s.x*=o,s.y*=o,s.width*=o,s.height*=o,r.width=s.width,r.height=s.height,n.globalCompositeOperation="copy",n.drawImage(t.baseTexture.source,s.x,s.y,s.width,s.height,0,0,s.width,s.height);for(var a=i.hex2rgb(e),h=a[0],u=a[1],l=a[2],c=n.getImageData(0,0,s.width,s.height),p=c.data,d=0;d<p.length;d+=4)p[d+0]*=h,p[d+1]*=u,p[d+2]*=l;n.putImageData(c,0,0)},n.roundColor=function(t){var e=n.cacheStepsPerColorChannel,r=i.hex2rgb(t);return r[0]=Math.min(255,r[0]/e*e),r[1]=Math.min(255,r[1]/e*e),r[2]=Math.min(255,r[2]/e*e),i.rgb2hex(r)},n.cacheStepsPerColorChannel=8,n.convertTintToImage=!1,n.canUseMultiply=i.canUseNewCanvasBlendModes(),n.tintMethod=n.canUseMultiply?n.tintWithMultiply:n.tintWithPerPixel},{"../../../utils":77}],49:[function(t,e,r){function i(t,e,r){r=r||{},n.call(this,"WebGL",t,e,r),this.type=f.RENDERER_TYPE.WEBGL,this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this),this.view.addEventListener("webglcontextlost",this.handleContextLost,!1),this.view.addEventListener("webglcontextrestored",this.handleContextRestored,!1),this._useFXAA=!!r.forceFXAA&&r.antialias,this._FXAAFilter=null,this._contextOptions={alpha:this.transparent,antialias:r.antialias,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:r.preserveDrawingBuffer},this.drawCount=0,this.shaderManager=new o(this),this.maskManager=new s(this),
this.stencilManager=new a(this),this.filterManager=new h(this),this.blendModeManager=new u(this),this.currentRenderTarget=null,this.currentRenderer=new c(this),this.initPlugins(),this._createContext(),this._initContext(),this._mapGlModes(),this._managedTextures=[],this._renderTargetStack=[]}var n=t("../SystemRenderer"),o=t("./managers/ShaderManager"),s=t("./managers/MaskManager"),a=t("./managers/StencilManager"),h=t("./managers/FilterManager"),u=t("./managers/BlendModeManager"),l=t("./utils/RenderTarget"),c=t("./utils/ObjectRenderer"),p=t("./filters/FXAAFilter"),d=t("../../utils"),f=t("../../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,d.pluginTarget.mixin(i),i.glContextId=0,i.prototype._createContext=function(){var t=this.view.getContext("webgl",this._contextOptions)||this.view.getContext("experimental-webgl",this._contextOptions);if(this.gl=t,!t)throw new Error("This browser does not support webGL. Try using the canvas renderer");this.glContextId=i.glContextId++,t.id=this.glContextId,t.renderer=this},i.prototype._initContext=function(){var t=this.gl;t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.enable(t.BLEND),this.renderTarget=new l(t,this.width,this.height,null,this.resolution,!0),this.setRenderTarget(this.renderTarget),this.emit("context",t),this.resize(this.width,this.height),this._useFXAA||(this._useFXAA=this._contextOptions.antialias&&!t.getContextAttributes().antialias),this._useFXAA&&(window.console.warn("FXAA antialiasing being used instead of native antialiasing"),this._FXAAFilter=[new p])},i.prototype.render=function(t){if(this.emit("prerender"),!this.gl.isContextLost()){this.drawCount=0,this._lastObjectRendered=t,this._useFXAA&&(this._FXAAFilter[0].uniforms.resolution.value.x=this.width,this._FXAAFilter[0].uniforms.resolution.value.y=this.height,t.filterArea=this.renderTarget.size,t.filters=this._FXAAFilter);var e=t.parent;t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=e;var r=this.gl;this.setRenderTarget(this.renderTarget),this.clearBeforeRender&&(this.transparent?r.clearColor(0,0,0,0):r.clearColor(this._backgroundColorRgb[0],this._backgroundColorRgb[1],this._backgroundColorRgb[2],1),r.clear(r.COLOR_BUFFER_BIT)),this.renderDisplayObject(t,this.renderTarget),this.emit("postrender")}},i.prototype.renderDisplayObject=function(t,e,r){this.setRenderTarget(e),r&&e.clear(),this.filterManager.setFilterStack(e.filterStack),t.renderWebGL(this),this.currentRenderer.flush()},i.prototype.setObjectRenderer=function(t){this.currentRenderer!==t&&(this.currentRenderer.stop(),this.currentRenderer=t,this.currentRenderer.start())},i.prototype.setRenderTarget=function(t){this.currentRenderTarget!==t&&(this.currentRenderTarget=t,this.currentRenderTarget.activate(),this.stencilManager.setMaskStack(t.stencilMaskStack))},i.prototype.resize=function(t,e){n.prototype.resize.call(this,t,e),this.filterManager.resize(t,e),this.renderTarget.resize(t,e),this.currentRenderTarget===this.renderTarget&&(this.renderTarget.activate(),this.gl.viewport(0,0,this.width,this.height))},i.prototype.updateTexture=function(t){if(t=t.baseTexture||t,t.hasLoaded){var e=this.gl;return t._glTextures[e.id]||(t._glTextures[e.id]=e.createTexture(),t.on("update",this.updateTexture,this),t.on("dispose",this.destroyTexture,this),this._managedTextures.push(t)),e.bindTexture(e.TEXTURE_2D,t._glTextures[e.id]),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultipliedAlpha),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.source),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t.scaleMode===f.SCALE_MODES.LINEAR?e.LINEAR:e.NEAREST),t.mipmap&&t.isPowerOfTwo?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===f.SCALE_MODES.LINEAR?e.LINEAR_MIPMAP_LINEAR:e.NEAREST_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D)):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===f.SCALE_MODES.LINEAR?e.LINEAR:e.NEAREST),t.isPowerOfTwo?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT)):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),t._glTextures[e.id]}},i.prototype.destroyTexture=function(t,e){if(t=t.baseTexture||t,t.hasLoaded&&t._glTextures[this.gl.id]&&(this.gl.deleteTexture(t._glTextures[this.gl.id]),delete t._glTextures[this.gl.id],!e)){var r=this._managedTextures.indexOf(t);-1!==r&&d.removeItems(this._managedTextures,r,1)}},i.prototype.handleContextLost=function(t){t.preventDefault()},i.prototype.handleContextRestored=function(){this._initContext();for(var t=0;t<this._managedTextures.length;++t){var e=this._managedTextures[t];e._glTextures[this.gl.id]&&delete e._glTextures[this.gl.id]}},i.prototype.destroy=function(t){this.destroyPlugins(),this.view.removeEventListener("webglcontextlost",this.handleContextLost),this.view.removeEventListener("webglcontextrestored",this.handleContextRestored);for(var e=0;e<this._managedTextures.length;++e){var r=this._managedTextures[e];this.destroyTexture(r,!0),r.off("update",this.updateTexture,this),r.off("dispose",this.destroyTexture,this)}n.prototype.destroy.call(this,t),this.uid=0,this.shaderManager.destroy(),this.maskManager.destroy(),this.stencilManager.destroy(),this.filterManager.destroy(),this.blendModeManager.destroy(),this.shaderManager=null,this.maskManager=null,this.filterManager=null,this.blendModeManager=null,this.currentRenderer=null,this.handleContextLost=null,this.handleContextRestored=null,this._contextOptions=null,this._managedTextures=null,this.drawCount=0,this.gl.useProgram(null),this.gl=null},i.prototype._mapGlModes=function(){var t=this.gl;this.blendModes||(this.blendModes={},this.blendModes[f.BLEND_MODES.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.ADD]=[t.ONE,t.DST_ALPHA],this.blendModes[f.BLEND_MODES.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.SCREEN]=[t.ONE,t.ONE_MINUS_SRC_COLOR],this.blendModes[f.BLEND_MODES.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA]),this.drawModes||(this.drawModes={},this.drawModes[f.DRAW_MODES.POINTS]=t.POINTS,this.drawModes[f.DRAW_MODES.LINES]=t.LINES,this.drawModes[f.DRAW_MODES.LINE_LOOP]=t.LINE_LOOP,this.drawModes[f.DRAW_MODES.LINE_STRIP]=t.LINE_STRIP,this.drawModes[f.DRAW_MODES.TRIANGLES]=t.TRIANGLES,this.drawModes[f.DRAW_MODES.TRIANGLE_STRIP]=t.TRIANGLE_STRIP,this.drawModes[f.DRAW_MODES.TRIANGLE_FAN]=t.TRIANGLE_FAN)}},{"../../const":22,"../../utils":77,"../SystemRenderer":43,"./filters/FXAAFilter":51,"./managers/BlendModeManager":53,"./managers/FilterManager":54,"./managers/MaskManager":55,"./managers/ShaderManager":56,"./managers/StencilManager":57,"./utils/ObjectRenderer":63,"./utils/RenderTarget":65}],50:[function(t,e,r){function i(t,e,r){this.shaders=[],this.padding=0,this.uniforms=r||{},this.vertexSrc=t||n.defaultVertexSrc,this.fragmentSrc=e||n.defaultFragmentSrc}var n=t("../shaders/TextureShader");i.prototype.constructor=i,e.exports=i,i.prototype.getShader=function(t){var e=t.gl,r=this.shaders[e.id];return r||(r=new n(t.shaderManager,this.vertexSrc,this.fragmentSrc,this.uniforms,this.attributes),this.shaders[e.id]=r),r},i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);t.filterManager.applyFilter(n,e,r,i)},i.prototype.syncUniform=function(t){for(var e=0,r=this.shaders.length;r>e;++e)this.shaders[e].syncUniform(t)}},{"../shaders/TextureShader":62}],51:[function(t,e,r){function i(){n.call(this,"\nprecision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n",'precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n',{resolution:{type:"v2",value:{x:1,y:1}}})}var n=t("./AbstractFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager,n=this.getShader(t);i.applyFilter(n,e,r)}},{"./AbstractFilter":50}],52:[function(t,e,r){function i(t){var e=new o.Matrix;n.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n",{mask:{type:"sampler2D",value:t._texture},alpha:{type:"f",value:1},otherMatrix:{type:"mat3",value:e.toArray(!0)}}),this.maskSprite=t,this.maskMatrix=e}var n=t("./AbstractFilter"),o=t("../../../math");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager;this.uniforms.mask.value=this.maskSprite._texture,i.calculateMappedMatrix(e.frame,this.maskSprite,this.maskMatrix),this.uniforms.otherMatrix.value=this.maskMatrix.toArray(!0),this.uniforms.alpha.value=this.maskSprite.worldAlpha;var n=this.getShader(t);i.applyFilter(n,e,r)},Object.defineProperties(i.prototype,{map:{get:function(){return this.uniforms.mask.value},set:function(t){this.uniforms.mask.value=t}},offset:{get:function(){return this.uniforms.offset.value},set:function(t){this.uniforms.offset.value=t}}})},{"../../../math":33,"./AbstractFilter":50}],53:[function(t,e,r){function i(t){n.call(this,t),this.currentBlendMode=99999}var n=t("./WebGLManager");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.setBlendMode=function(t){if(this.currentBlendMode===t)return!1;this.currentBlendMode=t;var e=this.renderer.blendModes[this.currentBlendMode];return this.renderer.gl.blendFunc(e[0],e[1]),!0}},{"./WebGLManager":58}],54:[function(t,e,r){function i(t){n.call(this,t),this.filterStack=[],this.filterStack.push({renderTarget:t.currentRenderTarget,filter:[],bounds:null}),this.texturePool=[],this.textureSize=new h.Rectangle(0,0,t.width,t.height),this.currentFrame=null}var n=t("./WebGLManager"),o=t("../utils/RenderTarget"),s=t("../../../const"),a=t("../utils/Quad"),h=t("../../../math");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.onContextChange=function(){this.texturePool.length=0;var t=this.renderer.gl;this.quad=new a(t)},i.prototype.setFilterStack=function(t){this.filterStack=t},i.prototype.pushFilter=function(t,e){var r=t.filterArea?t.filterArea.clone():t.getBounds();r.x=0|r.x,r.y=0|r.y,r.width=0|r.width,r.height=0|r.height;var i=0|e[0].padding;if(r.x-=i,r.y-=i,r.width+=2*i,r.height+=2*i,this.renderer.currentRenderTarget.transform){var n=this.renderer.currentRenderTarget.transform;r.x+=n.tx,r.y+=n.ty,this.capFilterArea(r),r.x-=n.tx,r.y-=n.ty}else this.capFilterArea(r);if(r.width>0&&r.height>0){this.currentFrame=r;var o=this.getRenderTarget();this.renderer.setRenderTarget(o),o.clear(),this.filterStack.push({renderTarget:o,filter:e})}else this.filterStack.push({renderTarget:null,filter:e})},i.prototype.popFilter=function(){var t=this.filterStack.pop(),e=this.filterStack[this.filterStack.length-1],r=t.renderTarget;if(t.renderTarget){var i=e.renderTarget,n=this.renderer.gl;this.currentFrame=r.frame,this.quad.map(this.textureSize,r.frame),n.bindBuffer(n.ARRAY_BUFFER,this.quad.vertexBuffer),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,this.quad.indexBuffer);var o=t.filter;if(n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aVertexPosition,2,n.FLOAT,!1,0,0),n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aTextureCoord,2,n.FLOAT,!1,0,32),n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aColor,4,n.FLOAT,!1,0,64),this.renderer.blendModeManager.setBlendMode(s.BLEND_MODES.NORMAL),1===o.length)o[0].uniforms.dimensions&&(o[0].uniforms.dimensions.value[0]=this.renderer.width,o[0].uniforms.dimensions.value[1]=this.renderer.height,o[0].uniforms.dimensions.value[2]=this.quad.vertices[0],o[0].uniforms.dimensions.value[3]=this.quad.vertices[5]),o[0].applyFilter(this.renderer,r,i),this.returnRenderTarget(r);else{for(var a=r,h=this.getRenderTarget(!0),u=0;u<o.length-1;u++){var l=o[u];l.uniforms.dimensions&&(l.uniforms.dimensions.value[0]=this.renderer.width,l.uniforms.dimensions.value[1]=this.renderer.height,l.uniforms.dimensions.value[2]=this.quad.vertices[0],l.uniforms.dimensions.value[3]=this.quad.vertices[5]),l.applyFilter(this.renderer,a,h);var c=a;a=h,h=c}o[o.length-1].applyFilter(this.renderer,a,i),this.returnRenderTarget(a),this.returnRenderTarget(h)}return t.filter}},i.prototype.getRenderTarget=function(t){var e=this.texturePool.pop()||new o(this.renderer.gl,this.textureSize.width,this.textureSize.height,s.SCALE_MODES.LINEAR,this.renderer.resolution*s.FILTER_RESOLUTION);return e.frame=this.currentFrame,t&&e.clear(!0),e},i.prototype.returnRenderTarget=function(t){this.texturePool.push(t)},i.prototype.applyFilter=function(t,e,r,i){var n=this.renderer.gl;this.renderer.setRenderTarget(r),i&&r.clear(),this.renderer.shaderManager.setShader(t),t.uniforms.projectionMatrix.value=this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),t.syncUniforms(),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.texture),n.drawElements(n.TRIANGLES,6,n.UNSIGNED_SHORT,0),this.renderer.drawCount++},i.prototype.calculateMappedMatrix=function(t,e,r){var i=e.worldTransform.copy(h.Matrix.TEMP_MATRIX),n=e._texture.baseTexture,o=r.identity(),s=this.textureSize.height/this.textureSize.width;o.translate(t.x/this.textureSize.width,t.y/this.textureSize.height),o.scale(1,s);var a=this.textureSize.width/n.width,u=this.textureSize.height/n.height;return i.tx/=n.width*a,i.ty/=n.width*a,i.invert(),o.prepend(i),o.scale(1,1/s),o.scale(a,u),o.translate(e.anchor.x,e.anchor.y),o},i.prototype.capFilterArea=function(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0),t.x+t.width>this.textureSize.width&&(t.width=this.textureSize.width-t.x),t.y+t.height>this.textureSize.height&&(t.height=this.textureSize.height-t.y)},i.prototype.resize=function(t,e){this.textureSize.width=t,this.textureSize.height=e;for(var r=0;r<this.texturePool.length;r++)this.texturePool[r].resize(t,e)},i.prototype.destroy=function(){this.quad.destroy(),n.prototype.destroy.call(this),this.filterStack=null,this.offsetY=0;for(var t=0;t<this.texturePool.length;t++)this.texturePool[t].destroy();this.texturePool=null}},{"../../../const":22,"../../../math":33,"../utils/Quad":64,"../utils/RenderTarget":65,"./WebGLManager":58}],55:[function(t,e,r){function i(t){n.call(this,t),this.stencilStack=[],this.reverse=!0,this.count=0,this.alphaMaskPool=[]}var n=t("./WebGLManager"),o=t("../filters/SpriteMaskFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.pushMask=function(t,e){e.texture?this.pushSpriteMask(t,e):this.pushStencilMask(t,e)},i.prototype.popMask=function(t,e){e.texture?this.popSpriteMask(t,e):this.popStencilMask(t,e)},i.prototype.pushSpriteMask=function(t,e){var r=this.alphaMaskPool.pop();r||(r=[new o(e)]),r[0].maskSprite=e,this.renderer.filterManager.pushFilter(t,r)},i.prototype.popSpriteMask=function(){var t=this.renderer.filterManager.popFilter();this.alphaMaskPool.push(t)},i.prototype.pushStencilMask=function(t,e){this.renderer.stencilManager.pushMask(e)},i.prototype.popStencilMask=function(t,e){this.renderer.stencilManager.popMask(e)}},{"../filters/SpriteMaskFilter":52,"./WebGLManager":58}],56:[function(t,e,r){function i(t){n.call(this,t),this.maxAttibs=10,this.attribState=[],this.tempAttribState=[];for(var e=0;e<this.maxAttibs;e++)this.attribState[e]=!1;this.stack=[],this._currentId=-1,this.currentShader=null}var n=t("./WebGLManager"),o=t("../shaders/TextureShader"),s=t("../shaders/ComplexPrimitiveShader"),a=t("../shaders/PrimitiveShader"),h=t("../../../utils");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,h.pluginTarget.mixin(i),e.exports=i,i.prototype.onContextChange=function(){this.initPlugins();var t=this.renderer.gl;this.maxAttibs=t.getParameter(t.MAX_VERTEX_ATTRIBS),this.attribState=[];for(var e=0;e<this.maxAttibs;e++)this.attribState[e]=!1;this.defaultShader=new o(this),this.primitiveShader=new a(this),this.complexPrimitiveShader=new s(this)},i.prototype.setAttribs=function(t){var e;for(e=0;e<this.tempAttribState.length;e++)this.tempAttribState[e]=!1;for(var r in t)this.tempAttribState[t[r]]=!0;var i=this.renderer.gl;for(e=0;e<this.attribState.length;e++)this.attribState[e]!==this.tempAttribState[e]&&(this.attribState[e]=this.tempAttribState[e],this.attribState[e]?i.enableVertexAttribArray(e):i.disableVertexAttribArray(e))},i.prototype.setShader=function(t){return this._currentId===t.uid?!1:(this._currentId=t.uid,this.currentShader=t,this.renderer.gl.useProgram(t.program),this.setAttribs(t.attributes),!0)},i.prototype.destroy=function(){this.primitiveShader.destroy(),this.complexPrimitiveShader.destroy(),n.prototype.destroy.call(this),this.destroyPlugins(),this.attribState=null,this.tempAttribState=null}},{"../../../utils":77,"../shaders/ComplexPrimitiveShader":59,"../shaders/PrimitiveShader":60,"../shaders/TextureShader":62,"./WebGLManager":58}],57:[function(t,e,r){function i(t){n.call(this,t),this.stencilMaskStack=null}var n=t("./WebGLManager"),o=t("../../../utils");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.setMaskStack=function(t){this.stencilMaskStack=t;var e=this.renderer.gl;0===t.stencilStack.length?e.disable(e.STENCIL_TEST):e.enable(e.STENCIL_TEST)},i.prototype.pushStencil=function(t,e){this.renderer.currentRenderTarget.attachStencilBuffer();var r=this.renderer.gl,i=this.stencilMaskStack;this.bindGraphics(t,e),0===i.stencilStack.length&&(r.enable(r.STENCIL_TEST),r.clear(r.STENCIL_BUFFER_BIT),i.reverse=!0,i.count=0),i.stencilStack.push(e);var n=i.count;r.colorMask(!1,!1,!1,!1),r.stencilFunc(r.ALWAYS,0,255),r.stencilOp(r.KEEP,r.KEEP,r.INVERT),1===e.mode?(r.drawElements(r.TRIANGLE_FAN,e.indices.length-4,r.UNSIGNED_SHORT,0),i.reverse?(r.stencilFunc(r.EQUAL,255-n,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)):(r.stencilFunc(r.EQUAL,n,255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)),r.drawElements(r.TRIANGLE_FAN,4,r.UNSIGNED_SHORT,2*(e.indices.length-4)),i.reverse?r.stencilFunc(r.EQUAL,255-(n+1),255):r.stencilFunc(r.EQUAL,n+1,255),i.reverse=!i.reverse):(i.reverse?(r.stencilFunc(r.EQUAL,n,255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)):(r.stencilFunc(r.EQUAL,255-n,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)),r.drawElements(r.TRIANGLE_STRIP,e.indices.length,r.UNSIGNED_SHORT,0),i.reverse?r.stencilFunc(r.EQUAL,n+1,255):r.stencilFunc(r.EQUAL,255-(n+1),255)),r.colorMask(!0,!0,!0,!0),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),i.count++},i.prototype.bindGraphics=function(t,e){var r,i=this.renderer.gl;1===e.mode?(r=this.renderer.shaderManager.complexPrimitiveShader,this.renderer.shaderManager.setShader(r),i.uniformMatrix3fv(r.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),i.uniformMatrix3fv(r.uniforms.projectionMatrix._location,!1,this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)),i.uniform3fv(r.uniforms.tint._location,o.hex2rgb(t.tint)),i.uniform3fv(r.uniforms.color._location,e.color),i.uniform1f(r.uniforms.alpha._location,t.worldAlpha),i.bindBuffer(i.ARRAY_BUFFER,e.buffer),i.vertexAttribPointer(r.attributes.aVertexPosition,2,i.FLOAT,!1,8,0),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer)):(r=this.renderer.shaderManager.primitiveShader,this.renderer.shaderManager.setShader(r),i.uniformMatrix3fv(r.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),i.uniformMatrix3fv(r.uniforms.projectionMatrix._location,!1,this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)),i.uniform3fv(r.uniforms.tint._location,o.hex2rgb(t.tint)),i.uniform1f(r.uniforms.alpha._location,t.worldAlpha),i.bindBuffer(i.ARRAY_BUFFER,e.buffer),i.vertexAttribPointer(r.attributes.aVertexPosition,2,i.FLOAT,!1,24,0),i.vertexAttribPointer(r.attributes.aColor,4,i.FLOAT,!1,24,8),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer))},i.prototype.popStencil=function(t,e){var r=this.renderer.gl,i=this.stencilMaskStack;if(i.stencilStack.pop(),i.count--,0===i.stencilStack.length)r.disable(r.STENCIL_TEST);else{var n=i.count;this.bindGraphics(t,e),r.colorMask(!1,!1,!1,!1),1===e.mode?(i.reverse=!i.reverse,i.reverse?(r.stencilFunc(r.EQUAL,255-(n+1),255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)):(r.stencilFunc(r.EQUAL,n+1,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)),r.drawElements(r.TRIANGLE_FAN,4,r.UNSIGNED_SHORT,2*(e.indices.length-4)),r.stencilFunc(r.ALWAYS,0,255),r.stencilOp(r.KEEP,r.KEEP,r.INVERT),r.drawElements(r.TRIANGLE_FAN,e.indices.length-4,r.UNSIGNED_SHORT,0),this.renderer.drawCount+=2,i.reverse?r.stencilFunc(r.EQUAL,n,255):r.stencilFunc(r.EQUAL,255-n,255)):(i.reverse?(r.stencilFunc(r.EQUAL,n+1,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)):(r.stencilFunc(r.EQUAL,255-(n+1),255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)),r.drawElements(r.TRIANGLE_STRIP,e.indices.length,r.UNSIGNED_SHORT,0),this.renderer.drawCount++,i.reverse?r.stencilFunc(r.EQUAL,n,255):r.stencilFunc(r.EQUAL,255-n,255)),r.colorMask(!0,!0,!0,!0),r.stencilOp(r.KEEP,r.KEEP,r.KEEP)}},i.prototype.destroy=function(){n.prototype.destroy.call(this),this.stencilMaskStack.stencilStack=null},i.prototype.pushMask=function(t){this.renderer.setObjectRenderer(this.renderer.plugins.graphics),t.dirty&&this.renderer.plugins.graphics.updateGraphics(t,this.renderer.gl),t._webGL[this.renderer.gl.id].data.length&&this.pushStencil(t,t._webGL[this.renderer.gl.id].data[0])},i.prototype.popMask=function(t){this.renderer.setObjectRenderer(this.renderer.plugins.graphics),this.popStencil(t,t._webGL[this.renderer.gl.id].data[0])}},{"../../../utils":77,"./WebGLManager":58}],58:[function(t,e,r){function i(t){this.renderer=t,this.renderer.on("context",this.onContextChange,this)}i.prototype.constructor=i,e.exports=i,i.prototype.onContextChange=function(){},i.prototype.destroy=function(){this.renderer.off("context",this.onContextChange,this),this.renderer=null}},{}],59:[function(t,e,r){function i(t){n.call(this,t,["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"].join("\n"),["precision mediump float;","varying vec4 vColor;","void main(void){","   gl_FragColor = vColor;","}"].join("\n"),{tint:{type:"3f",value:[0,0,0]},alpha:{type:"1f",value:0},color:{type:"3f",value:[0,0,0]},translationMatrix:{type:"mat3",value:new Float32Array(9)},projectionMatrix:{type:"mat3",value:new Float32Array(9)}},{aVertexPosition:0})}var n=t("./Shader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i},{"./Shader":61}],60:[function(t,e,r){function i(t){n.call(this,t,["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","uniform float alpha;","uniform float flipY;","uniform vec3 tint;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"].join("\n"),["precision mediump float;","varying vec4 vColor;","void main(void){","   gl_FragColor = vColor;","}"].join("\n"),{tint:{type:"3f",value:[0,0,0]},alpha:{type:"1f",value:0},translationMatrix:{type:"mat3",value:new Float32Array(9)},projectionMatrix:{type:"mat3",value:new Float32Array(9)}},{aVertexPosition:0,aColor:0})}var n=t("./Shader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i},{"./Shader":61}],61:[function(t,e,r){function i(t,e,r,i,o){if(!e||!r)throw new Error("Pixi.js Error. Shader requires vertexSrc and fragmentSrc");this.uid=n.uid(),this.gl=t.renderer.gl,this.shaderManager=t,this.program=null,this.uniforms=i||{},this.attributes=o||{},this.textureCount=1,this.vertexSrc=e,this.fragmentSrc=r,this.init()}var n=t("../../../utils");i.prototype.constructor=i,e.exports=i,i.prototype.init=function(){this.compile(),this.gl.useProgram(this.program),this.cacheUniformLocations(Object.keys(this.uniforms)),this.cacheAttributeLocations(Object.keys(this.attributes))},i.prototype.cacheUniformLocations=function(t){for(var e=0;e<t.length;++e)this.uniforms[t[e]]._location=this.gl.getUniformLocation(this.program,t[e])},i.prototype.cacheAttributeLocations=function(t){for(var e=0;e<t.length;++e)this.attributes[t[e]]=this.gl.getAttribLocation(this.program,t[e])},i.prototype.compile=function(){var t=this.gl,e=this._glCompile(t.VERTEX_SHADER,this.vertexSrc),r=this._glCompile(t.FRAGMENT_SHADER,this.fragmentSrc),i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),
t.getProgramParameter(i,t.LINK_STATUS)||(console.error("Pixi.js Error: Could not initialize shader."),console.error("gl.VALIDATE_STATUS",t.getProgramParameter(i,t.VALIDATE_STATUS)),console.error("gl.getError()",t.getError()),""!==t.getProgramInfoLog(i)&&console.warn("Pixi.js Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(i)),t.deleteProgram(i),i=null),t.deleteShader(e),t.deleteShader(r),this.program=i},i.prototype.syncUniform=function(t){var e,r,i=t._location,o=t.value,s=this.gl;switch(t.type){case"b":case"bool":case"boolean":s.uniform1i(i,o?1:0);break;case"i":case"1i":s.uniform1i(i,o);break;case"f":case"1f":s.uniform1f(i,o);break;case"2f":s.uniform2f(i,o[0],o[1]);break;case"3f":s.uniform3f(i,o[0],o[1],o[2]);break;case"4f":s.uniform4f(i,o[0],o[1],o[2],o[3]);break;case"v2":s.uniform2f(i,o.x,o.y);break;case"v3":s.uniform3f(i,o.x,o.y,o.z);break;case"v4":s.uniform4f(i,o.x,o.y,o.z,o.w);break;case"1iv":s.uniform1iv(i,o);break;case"2iv":s.uniform2iv(i,o);break;case"3iv":s.uniform3iv(i,o);break;case"4iv":s.uniform4iv(i,o);break;case"1fv":s.uniform1fv(i,o);break;case"2fv":s.uniform2fv(i,o);break;case"3fv":s.uniform3fv(i,o);break;case"4fv":s.uniform4fv(i,o);break;case"m2":case"mat2":case"Matrix2fv":s.uniformMatrix2fv(i,t.transpose,o);break;case"m3":case"mat3":case"Matrix3fv":s.uniformMatrix3fv(i,t.transpose,o);break;case"m4":case"mat4":case"Matrix4fv":s.uniformMatrix4fv(i,t.transpose,o);break;case"c":"number"==typeof o&&(o=n.hex2rgb(o)),s.uniform3f(i,o[0],o[1],o[2]);break;case"iv1":s.uniform1iv(i,o);break;case"iv":s.uniform3iv(i,o);break;case"fv1":s.uniform1fv(i,o);break;case"fv":s.uniform3fv(i,o);break;case"v2v":for(t._array||(t._array=new Float32Array(2*o.length)),e=0,r=o.length;r>e;++e)t._array[2*e]=o[e].x,t._array[2*e+1]=o[e].y;s.uniform2fv(i,t._array);break;case"v3v":for(t._array||(t._array=new Float32Array(3*o.length)),e=0,r=o.length;r>e;++e)t._array[3*e]=o[e].x,t._array[3*e+1]=o[e].y,t._array[3*e+2]=o[e].z;s.uniform3fv(i,t._array);break;case"v4v":for(t._array||(t._array=new Float32Array(4*o.length)),e=0,r=o.length;r>e;++e)t._array[4*e]=o[e].x,t._array[4*e+1]=o[e].y,t._array[4*e+2]=o[e].z,t._array[4*e+3]=o[e].w;s.uniform4fv(i,t._array);break;case"t":case"sampler2D":if(!t.value||!t.value.baseTexture.hasLoaded)break;s.activeTexture(s["TEXTURE"+this.textureCount]);var a=t.value.baseTexture._glTextures[s.id];a||(this.initSampler2D(t),a=t.value.baseTexture._glTextures[s.id]),s.bindTexture(s.TEXTURE_2D,a),s.uniform1i(t._location,this.textureCount),this.textureCount++;break;default:console.warn("Pixi.js Shader Warning: Unknown uniform type: "+t.type)}},i.prototype.syncUniforms=function(){this.textureCount=1;for(var t in this.uniforms)this.syncUniform(this.uniforms[t])},i.prototype.initSampler2D=function(t){var e=this.gl,r=t.value.baseTexture;if(r.hasLoaded)if(t.textureData){var i=t.textureData;r._glTextures[e.id]=e.createTexture(),e.bindTexture(e.TEXTURE_2D,r._glTextures[e.id]),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultipliedAlpha),e.texImage2D(e.TEXTURE_2D,0,i.luminance?e.LUMINANCE:e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r.source),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i.magFilter?i.magFilter:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i.wrapS?i.wrapS:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,i.wrapS?i.wrapS:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i.wrapT?i.wrapT:e.CLAMP_TO_EDGE)}else this.shaderManager.renderer.updateTexture(r)},i.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.gl=null,this.uniforms=null,this.attributes=null,this.vertexSrc=null,this.fragmentSrc=null},i.prototype._glCompile=function(t,e){var r=this.gl.createShader(t);return this.gl.shaderSource(r,e),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)?r:(console.log(this.gl.getShaderInfoLog(r)),null)}},{"../../../utils":77}],62:[function(t,e,r){function i(t,e,r,o,s){var a={uSampler:{type:"sampler2D",value:0},projectionMatrix:{type:"mat3",value:new Float32Array([1,0,0,0,1,0,0,0,1])}};if(o)for(var h in o)a[h]=o[h];var u={aVertexPosition:0,aTextureCoord:0,aColor:0};if(s)for(var l in s)u[l]=s[l];e=e||i.defaultVertexSrc,r=r||i.defaultFragmentSrc,n.call(this,t,e,r,a,u)}var n=t("./Shader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.defaultVertexSrc=["precision lowp float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"].join("\n"),i.defaultFragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void){","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"].join("\n")},{"./Shader":61}],63:[function(t,e,r){function i(t){n.call(this,t)}var n=t("../managers/WebGLManager");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.start=function(){},i.prototype.stop=function(){this.flush()},i.prototype.flush=function(){},i.prototype.render=function(t){}},{"../managers/WebGLManager":58}],64:[function(t,e,r){function i(t){this.gl=t,this.vertices=new Float32Array([0,0,200,0,200,200,0,200]),this.uvs=new Float32Array([0,0,1,0,1,1,0,1]),this.colors=new Float32Array([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),this.indices=new Uint16Array([0,1,2,0,3,2]),this.vertexBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,128,t.DYNAMIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),this.upload()}i.prototype.constructor=i,i.prototype.map=function(t,e){var r=0,i=0;this.uvs[0]=r,this.uvs[1]=i,this.uvs[2]=r+e.width/t.width,this.uvs[3]=i,this.uvs[4]=r+e.width/t.width,this.uvs[5]=i+e.height/t.height,this.uvs[6]=r,this.uvs[7]=i+e.height/t.height,r=e.x,i=e.y,this.vertices[0]=r,this.vertices[1]=i,this.vertices[2]=r+e.width,this.vertices[3]=i,this.vertices[4]=r+e.width,this.vertices[5]=i+e.height,this.vertices[6]=r,this.vertices[7]=i+e.height,this.upload()},i.prototype.upload=function(){var t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices),t.bufferSubData(t.ARRAY_BUFFER,32,this.uvs),t.bufferSubData(t.ARRAY_BUFFER,64,this.colors)},i.prototype.destroy=function(){var t=this.gl;t.deleteBuffer(this.vertexBuffer),t.deleteBuffer(this.indexBuffer)},e.exports=i},{}],65:[function(t,e,r){var i=t("../../../math"),n=t("../../../utils"),o=t("../../../const"),s=t("./StencilMaskStack"),a=function(t,e,r,a,h,u){if(this.gl=t,this.frameBuffer=null,this.texture=null,this.size=new i.Rectangle(0,0,1,1),this.resolution=h||o.RESOLUTION,this.projectionMatrix=new i.Matrix,this.transform=null,this.frame=null,this.stencilBuffer=null,this.stencilMaskStack=new s,this.filterStack=[{renderTarget:this,filter:[],bounds:this.size}],this.scaleMode=a||o.SCALE_MODES.DEFAULT,this.root=u,!this.root){this.frameBuffer=t.createFramebuffer(),this.texture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.texture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,a===o.SCALE_MODES.LINEAR?t.LINEAR:t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a===o.SCALE_MODES.LINEAR?t.LINEAR:t.NEAREST);var l=n.isPowerOfTwo(e,r);l?(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)),t.bindFramebuffer(t.FRAMEBUFFER,this.frameBuffer),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.texture,0)}this.resize(e,r)};a.prototype.constructor=a,e.exports=a,a.prototype.clear=function(t){var e=this.gl;t&&e.bindFramebuffer(e.FRAMEBUFFER,this.frameBuffer),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)},a.prototype.attachStencilBuffer=function(){if(!this.stencilBuffer&&!this.root){var t=this.gl;this.stencilBuffer=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,this.stencilBuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,this.stencilBuffer),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,this.size.width*this.resolution,this.size.height*this.resolution)}},a.prototype.activate=function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.frameBuffer);var e=this.frame||this.size;this.calculateProjection(e),this.transform&&this.projectionMatrix.append(this.transform),t.viewport(0,0,e.width*this.resolution,e.height*this.resolution)},a.prototype.calculateProjection=function(t){var e=this.projectionMatrix;e.identity(),this.root?(e.a=1/t.width*2,e.d=-1/t.height*2,e.tx=-1-t.x*e.a,e.ty=1-t.y*e.d):(e.a=1/t.width*2,e.d=1/t.height*2,e.tx=-1-t.x*e.a,e.ty=-1-t.y*e.d)},a.prototype.resize=function(t,e){if(t=0|t,e=0|e,this.size.width!==t||this.size.height!==e){if(this.size.width=t,this.size.height=e,!this.root){var r=this.gl;r.bindTexture(r.TEXTURE_2D,this.texture),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,t*this.resolution,e*this.resolution,0,r.RGBA,r.UNSIGNED_BYTE,null),this.stencilBuffer&&(r.bindRenderbuffer(r.RENDERBUFFER,this.stencilBuffer),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,t*this.resolution,e*this.resolution))}var i=this.frame||this.size;this.calculateProjection(i)}},a.prototype.destroy=function(){var t=this.gl;t.deleteRenderbuffer(this.stencilBuffer),t.deleteFramebuffer(this.frameBuffer),t.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null}},{"../../../const":22,"../../../math":33,"../../../utils":77,"./StencilMaskStack":66}],66:[function(t,e,r){function i(){this.stencilStack=[],this.reverse=!0,this.count=0}i.prototype.constructor=i,e.exports=i},{}],67:[function(t,e,r){function i(t){s.call(this),this.anchor=new n.Point,this._texture=null,this._width=0,this._height=0,this.tint=16777215,this.blendMode=u.BLEND_MODES.NORMAL,this.shader=null,this.cachedTint=16777215,this.texture=t||o.EMPTY}var n=t("../math"),o=t("../textures/Texture"),s=t("../display/Container"),a=t("../renderers/canvas/utils/CanvasTinter"),h=t("../utils"),u=t("../const"),l=new n.Point,c=n.GroupD8,p=new n.Matrix;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return Math.abs(this.scale.x)*this.texture._frame.width},set:function(t){var e=h.sign(this.scale.x)||1;this.scale.x=e*t/this.texture._frame.width,this._width=t}},height:{get:function(){return Math.abs(this.scale.y)*this.texture._frame.height},set:function(t){var e=h.sign(this.scale.y)||1;this.scale.y=e*t/this.texture._frame.height,this._height=t}},texture:{get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,this.cachedTint=16777215,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}}),i.prototype._onTextureUpdate=function(){this._width&&(this.scale.x=h.sign(this.scale.x)*this._width/this.texture.frame.width),this._height&&(this.scale.y=h.sign(this.scale.y)*this._height/this.texture.frame.height)},i.prototype._renderWebGL=function(t){t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this)},i.prototype.getBounds=function(t){if(!this._currentBounds){var e,r,i,n,o=this._texture._frame.width,s=this._texture._frame.height,a=o*(1-this.anchor.x),h=o*-this.anchor.x,u=s*(1-this.anchor.y),l=s*-this.anchor.y,c=t||this.worldTransform,p=c.a,d=c.b,f=c.c,v=c.d,g=c.tx,m=c.ty,y=p*h+f*l+g,x=v*l+d*h+m,b=p*a+f*l+g,_=v*l+d*a+m,T=p*a+f*u+g,E=v*u+d*a+m,S=p*h+f*u+g,w=v*u+d*h+m;if(e=y,e=e>b?b:e,e=e>T?T:e,e=e>S?S:e,i=x,i=i>_?_:i,i=i>E?E:i,i=i>w?w:i,r=y,r=b>r?b:r,r=T>r?T:r,r=S>r?S:r,n=x,n=_>n?_:n,n=E>n?E:n,n=w>n?w:n,this.children.length){var A=this.containerGetBounds();a=A.x,h=A.x+A.width,u=A.y,l=A.y+A.height,e=a>e?e:a,i=u>i?i:u,r=r>h?r:h,n=n>l?n:l}var C=this._bounds;C.x=e,C.width=r-e,C.y=i,C.height=n-i,this._currentBounds=C}return this._currentBounds},i.prototype.getLocalBounds=function(){return this._bounds.x=-this._texture._frame.width*this.anchor.x,this._bounds.y=-this._texture._frame.height*this.anchor.y,this._bounds.width=this._texture._frame.width,this._bounds.height=this._texture._frame.height,this._bounds},i.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,l);var e,r=this._texture._frame.width,i=this._texture._frame.height,n=-r*this.anchor.x;return l.x>n&&l.x<n+r&&(e=-i*this.anchor.y,l.y>e&&l.y<e+i)?!0:!1},i.prototype._renderCanvas=function(t){if(!(this.texture.crop.width<=0||this.texture.crop.height<=0)){var e=t.blendModes[this.blendMode];if(e!==t.context.globalCompositeOperation&&(t.context.globalCompositeOperation=e),this.texture.valid){var r,i,n=this._texture,o=this.worldTransform,s=n.crop.width,h=n.crop.height;t.context.globalAlpha=this.worldAlpha;var l=n.baseTexture.scaleMode===u.SCALE_MODES.LINEAR;t.smoothProperty&&t.context[t.smoothProperty]!==l&&(t.context[t.smoothProperty]=l),2===(3&n.rotate)&&(s=n.crop.height,h=n.crop.width),n.trim?(r=n.crop.width/2+n.trim.x-this.anchor.x*n.trim.width,i=n.crop.height/2+n.trim.y-this.anchor.y*n.trim.height):(r=(.5-this.anchor.x)*n._frame.width,i=(.5-this.anchor.y)*n._frame.height),n.rotate&&(o.copy(p),o=p,c.matrixAppendRotationInv(o,n.rotate,r,i),r=0,i=0),r-=s/2,i-=h/2,t.roundPixels?(t.context.setTransform(o.a,o.b,o.c,o.d,o.tx*t.resolution|0,o.ty*t.resolution|0),r=0|r,i=0|i):t.context.setTransform(o.a,o.b,o.c,o.d,o.tx*t.resolution,o.ty*t.resolution);var d=n.baseTexture.resolution;16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=a.getTintedTexture(this,this.tint)),t.context.drawImage(this.tintedTexture,0,0,s*d,h*d,r*t.resolution,i*t.resolution,s*t.resolution,h*t.resolution)):t.context.drawImage(n.baseTexture.source,n.crop.x*d,n.crop.y*d,s*d,h*d,r*t.resolution,i*t.resolution,s*t.resolution,h*t.resolution)}}},i.prototype.destroy=function(t,e){s.prototype.destroy.call(this),this.anchor=null,t&&this._texture.destroy(e),this._texture=null,this.shader=null},i.fromFrame=function(t){var e=h.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return new i(e)},i.fromImage=function(t,e,r){return new i(o.fromImage(t,e,r))}},{"../const":22,"../display/Container":23,"../math":33,"../renderers/canvas/utils/CanvasTinter":48,"../textures/Texture":72,"../utils":77}],68:[function(t,e,r){function i(t){n.call(this,t),this.vertSize=5,this.vertByteSize=4*this.vertSize,this.size=s.SPRITE_BATCH_SIZE;var e=4*this.size*this.vertByteSize,r=6*this.size;this.vertices=new ArrayBuffer(e),this.positions=new Float32Array(this.vertices),this.colors=new Uint32Array(this.vertices),this.indices=new Uint16Array(r);for(var i=0,o=0;r>i;i+=6,o+=4)this.indices[i+0]=o+0,this.indices[i+1]=o+1,this.indices[i+2]=o+2,this.indices[i+3]=o+0,this.indices[i+4]=o+2,this.indices[i+5]=o+3;this.currentBatchSize=0,this.sprites=[],this.shader=null}var n=t("../../renderers/webgl/utils/ObjectRenderer"),o=t("../../renderers/webgl/WebGLRenderer"),s=t("../../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,o.registerPlugin("sprite",i),i.prototype.onContextChange=function(){var t=this.renderer.gl;this.shader=this.renderer.shaderManager.defaultShader,this.vertexBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,this.vertices,t.DYNAMIC_DRAW),this.currentBlendMode=99999},i.prototype.render=function(t){var e=t._texture;this.currentBatchSize>=this.size&&this.flush();var r=e._uvs;if(r){var i,n,o,s,a=t.anchor.x,h=t.anchor.y;if(e.trim&&void 0===t.tileScale){var u=e.trim;n=u.x-a*u.width,i=n+e.crop.width,s=u.y-h*u.height,o=s+e.crop.height}else i=e._frame.width*(1-a),n=e._frame.width*-a,o=e._frame.height*(1-h),s=e._frame.height*-h;var l=this.currentBatchSize*this.vertByteSize,c=t.worldTransform,p=c.a,d=c.b,f=c.c,v=c.d,g=c.tx,m=c.ty,y=this.colors,x=this.positions;if(this.renderer.roundPixels){var b=this.renderer.resolution;x[l]=((p*n+f*s+g)*b|0)/b,x[l+1]=((v*s+d*n+m)*b|0)/b,x[l+5]=((p*i+f*s+g)*b|0)/b,x[l+6]=((v*s+d*i+m)*b|0)/b,x[l+10]=((p*i+f*o+g)*b|0)/b,x[l+11]=((v*o+d*i+m)*b|0)/b,x[l+15]=((p*n+f*o+g)*b|0)/b,x[l+16]=((v*o+d*n+m)*b|0)/b}else x[l]=p*n+f*s+g,x[l+1]=v*s+d*n+m,x[l+5]=p*i+f*s+g,x[l+6]=v*s+d*i+m,x[l+10]=p*i+f*o+g,x[l+11]=v*o+d*i+m,x[l+15]=p*n+f*o+g,x[l+16]=v*o+d*n+m;x[l+2]=r.x0,x[l+3]=r.y0,x[l+7]=r.x1,x[l+8]=r.y1,x[l+12]=r.x2,x[l+13]=r.y2,x[l+17]=r.x3,x[l+18]=r.y3;var _=t.tint;y[l+4]=y[l+9]=y[l+14]=y[l+19]=(_>>16)+(65280&_)+((255&_)<<16)+(255*t.worldAlpha<<24),this.sprites[this.currentBatchSize++]=t}},i.prototype.flush=function(){if(0!==this.currentBatchSize){var t,e=this.renderer.gl;if(this.currentBatchSize>.5*this.size)e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices);else{var r=this.positions.subarray(0,this.currentBatchSize*this.vertByteSize);e.bufferSubData(e.ARRAY_BUFFER,0,r)}for(var i,n,o,s,a=0,h=0,u=null,l=this.renderer.blendModeManager.currentBlendMode,c=null,p=!1,d=!1,f=0,v=this.currentBatchSize;v>f;f++)s=this.sprites[f],i=s._texture.baseTexture,n=s.blendMode,o=s.shader||this.shader,p=l!==n,d=c!==o,(u!==i||p||d)&&(this.renderBatch(u,a,h),h=f,a=0,u=i,p&&(l=n,this.renderer.blendModeManager.setBlendMode(l)),d&&(c=o,t=c.shaders?c.shaders[e.id]:c,t||(t=c.getShader(this.renderer)),this.renderer.shaderManager.setShader(t),t.uniforms.projectionMatrix.value=this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),t.syncUniforms(),e.activeTexture(e.TEXTURE0))),a++;this.renderBatch(u,a,h),this.currentBatchSize=0}},i.prototype.renderBatch=function(t,e,r){if(0!==e){var i=this.renderer.gl;t._glTextures[i.id]?i.bindTexture(i.TEXTURE_2D,t._glTextures[i.id]):this.renderer.updateTexture(t),i.drawElements(i.TRIANGLES,6*e,i.UNSIGNED_SHORT,6*r*2),this.renderer.drawCount++}},i.prototype.start=function(){var t=this.renderer.gl;t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var e=this.vertByteSize;t.vertexAttribPointer(this.shader.attributes.aVertexPosition,2,t.FLOAT,!1,e,0),t.vertexAttribPointer(this.shader.attributes.aTextureCoord,2,t.FLOAT,!1,e,8),t.vertexAttribPointer(this.shader.attributes.aColor,4,t.UNSIGNED_BYTE,!0,e,16)},i.prototype.destroy=function(){this.renderer.gl.deleteBuffer(this.vertexBuffer),this.renderer.gl.deleteBuffer(this.indexBuffer),n.prototype.destroy.call(this),this.shader.destroy(),this.renderer=null,this.vertices=null,this.positions=null,this.colors=null,this.indices=null,this.vertexBuffer=null,this.indexBuffer=null,this.sprites=null,this.shader=null}},{"../../const":22,"../../renderers/webgl/WebGLRenderer":49,"../../renderers/webgl/utils/ObjectRenderer":63}],69:[function(t,e,r){function i(t,e,r){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.resolution=r||h.RESOLUTION,this._text=null,this._style=null;var i=o.fromCanvas(this.canvas);i.trim=new s.Rectangle,n.call(this,i),this.text=t,this.style=e}var n=t("../sprites/Sprite"),o=t("../textures/Texture"),s=t("../math"),a=t("../utils"),h=t("../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.fontPropertiesCache={},i.fontPropertiesCanvas=document.createElement("canvas"),i.fontPropertiesContext=i.fontPropertiesCanvas.getContext("2d"),Object.defineProperties(i.prototype,{width:{get:function(){return this.dirty&&this.updateText(),this.scale.x*this._texture._frame.width},set:function(t){this.scale.x=t/this._texture._frame.width,this._width=t}},height:{get:function(){return this.dirty&&this.updateText(),this.scale.y*this._texture._frame.height},set:function(t){this.scale.y=t/this._texture._frame.height,this._height=t}},style:{get:function(){return this._style},set:function(t){t=t||{},"number"==typeof t.fill&&(t.fill=a.hex2string(t.fill)),"number"==typeof t.stroke&&(t.stroke=a.hex2string(t.stroke)),"number"==typeof t.dropShadowColor&&(t.dropShadowColor=a.hex2string(t.dropShadowColor)),t.font=t.font||"bold 20pt Arial",t.fill=t.fill||"black",t.align=t.align||"left",t.stroke=t.stroke||"black",t.strokeThickness=t.strokeThickness||0,t.wordWrap=t.wordWrap||!1,t.wordWrapWidth=t.wordWrapWidth||100,t.dropShadow=t.dropShadow||!1,t.dropShadowColor=t.dropShadowColor||"#000000",t.dropShadowAngle=void 0!==t.dropShadowAngle?t.dropShadowAngle:Math.PI/6,t.dropShadowDistance=void 0!==t.dropShadowDistance?t.dropShadowDistance:5,t.dropShadowBlur=void 0!==t.dropShadowBlur?t.dropShadowBlur:0,t.padding=t.padding||0,t.textBaseline=t.textBaseline||"alphabetic",t.lineJoin=t.lineJoin||"miter",t.miterLimit=t.miterLimit||10,this._style=t,this.dirty=!0}},text:{get:function(){return this._text},set:function(t){t=t.toString()||" ",this._text!==t&&(this._text=t,this.dirty=!0)}}}),i.prototype.updateText=function(){var t=this._style;this.context.font=t.font;for(var e=t.wordWrap?this.wordWrap(this._text):this._text,r=e.split(/(?:\r\n|\r|\n)/),i=new Array(r.length),n=0,o=this.determineFontProperties(t.font),s=0;s<r.length;s++){var a=this.context.measureText(r[s]).width;i[s]=a,n=Math.max(n,a)}var h=n+t.strokeThickness;t.dropShadow&&(h+=t.dropShadowDistance),this.canvas.width=(h+this.context.lineWidth)*this.resolution;var u=this.style.lineHeight||o.fontSize+t.strokeThickness,l=u*r.length;t.dropShadow&&(l+=t.dropShadowDistance),this.canvas.height=(l+2*this._style.padding)*this.resolution,this.context.scale(this.resolution,this.resolution),navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.font=t.font,this.context.strokeStyle=t.stroke,this.context.lineWidth=t.strokeThickness,this.context.textBaseline=t.textBaseline,this.context.lineJoin=t.lineJoin,this.context.miterLimit=t.miterLimit;var c,p;if(t.dropShadow){t.dropShadowBlur>0?(this.context.shadowColor=t.dropShadowColor,this.context.shadowBlur=t.dropShadowBlur):this.context.fillStyle=t.dropShadowColor;var d=Math.cos(t.dropShadowAngle)*t.dropShadowDistance,f=Math.sin(t.dropShadowAngle)*t.dropShadowDistance;for(s=0;s<r.length;s++)c=t.strokeThickness/2,p=t.strokeThickness/2+s*u+o.ascent,"right"===t.align?c+=n-i[s]:"center"===t.align&&(c+=(n-i[s])/2),t.fill&&this.context.fillText(r[s],c+d,p+f+this._style.padding)}for(this.context.fillStyle=t.fill,s=0;s<r.length;s++)c=t.strokeThickness/2,p=t.strokeThickness/2+s*u+o.ascent,"right"===t.align?c+=n-i[s]:"center"===t.align&&(c+=(n-i[s])/2),t.stroke&&t.strokeThickness&&this.context.strokeText(r[s],c,p+this._style.padding),t.fill&&this.context.fillText(r[s],c,p+this._style.padding);this.updateTexture()},i.prototype.updateTexture=function(){var t=this._texture;t.baseTexture.hasLoaded=!0,t.baseTexture.resolution=this.resolution,t.baseTexture.width=this.canvas.width/this.resolution,t.baseTexture.height=this.canvas.height/this.resolution,t.crop.width=t._frame.width=this.canvas.width/this.resolution,t.crop.height=t._frame.height=this.canvas.height/this.resolution,t.trim.x=0,t.trim.y=-this._style.padding,t.trim.width=t._frame.width,t.trim.height=t._frame.height-2*this._style.padding,this._width=this.canvas.width/this.resolution,this._height=this.canvas.height/this.resolution,t.baseTexture.emit("update",t.baseTexture),this.dirty=!1},i.prototype.renderWebGL=function(t){this.dirty&&this.updateText(),n.prototype.renderWebGL.call(this,t)},i.prototype._renderCanvas=function(t){this.dirty&&this.updateText(),n.prototype._renderCanvas.call(this,t)},i.prototype.determineFontProperties=function(t){var e=i.fontPropertiesCache[t];if(!e){e={};var r=i.fontPropertiesCanvas,n=i.fontPropertiesContext;n.font=t;var o=Math.ceil(n.measureText("|MÉq").width),s=Math.ceil(n.measureText("M").width),a=2*s;s=1.4*s|0,r.width=o,r.height=a,n.fillStyle="#f00",n.fillRect(0,0,o,a),n.font=t,n.textBaseline="alphabetic",n.fillStyle="#000",n.fillText("|MÉq",0,s);var h,u,l=n.getImageData(0,0,o,a).data,c=l.length,p=4*o,d=0,f=!1;for(h=0;s>h;h++){for(u=0;p>u;u+=4)if(255!==l[d+u]){f=!0;break}if(f)break;d+=p}for(e.ascent=s-h,d=c-p,f=!1,h=a;h>s;h--){for(u=0;p>u;u+=4)if(255!==l[d+u]){f=!0;break}if(f)break;d-=p}e.descent=h-s,e.fontSize=e.ascent+e.descent,i.fontPropertiesCache[t]=e}return e},i.prototype.wordWrap=function(t){for(var e="",r=t.split("\n"),i=this._style.wordWrapWidth,n=0;n<r.length;n++){for(var o=i,s=r[n].split(" "),a=0;a<s.length;a++){var h=this.context.measureText(s[a]).width,u=h+this.context.measureText(" ").width;0===a||u>o?(a>0&&(e+="\n"),e+=s[a],o=i-h):(o-=u,e+=" "+s[a])}n<r.length-1&&(e+="\n")}return e},i.prototype.getBounds=function(t){return this.dirty&&this.updateText(),n.prototype.getBounds.call(this,t)},i.prototype.destroy=function(t){this.context=null,this.canvas=null,this._style=null,this._texture.destroy(void 0===t?!0:t)}},{"../const":22,"../math":33,"../sprites/Sprite":67,"../textures/Texture":72,"../utils":77}],70:[function(t,e,r){function i(t,e,r){s.call(this),this.uid=n.uid(),this.resolution=r||1,this.width=100,this.height=100,this.realWidth=100,this.realHeight=100,this.scaleMode=e||o.SCALE_MODES.DEFAULT,this.hasLoaded=!1,this.isLoading=!1,this.source=null,this.premultipliedAlpha=!0,this.imageUrl=null,this.isPowerOfTwo=!1,this.mipmap=!1,this._glTextures={},t&&this.loadSource(t)}var n=t("../utils"),o=t("../const"),s=t("eventemitter3");i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.update=function(){this.realWidth=this.source.naturalWidth||this.source.width,this.realHeight=this.source.naturalHeight||this.source.height,this.width=this.realWidth/this.resolution,this.height=this.realHeight/this.resolution,this.isPowerOfTwo=n.isPowerOfTwo(this.realWidth,this.realHeight),this.emit("update",this)},i.prototype.loadSource=function(t){var e=this.isLoading;if(this.hasLoaded=!1,this.isLoading=!1,e&&this.source&&(this.source.onload=null,this.source.onerror=null),this.source=t,(this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)this._sourceLoaded();else if(!t.getContext){this.isLoading=!0;var r=this;t.onload=function(){t.onload=null,t.onerror=null,r.isLoading&&(r.isLoading=!1,r._sourceLoaded(),r.emit("loaded",r))},t.onerror=function(){t.onload=null,t.onerror=null,r.isLoading&&(r.isLoading=!1,r.emit("error",r))},t.complete&&t.src&&(this.isLoading=!1,t.onload=null,t.onerror=null,t.width&&t.height?(this._sourceLoaded(),e&&this.emit("loaded",this)):e&&this.emit("error",this))}},i.prototype._sourceLoaded=function(){this.hasLoaded=!0,this.update()},i.prototype.destroy=function(){this.imageUrl?(delete n.BaseTextureCache[this.imageUrl],delete n.TextureCache[this.imageUrl],this.imageUrl=null,navigator.isCocoonJS||(this.source.src="")):this.source&&this.source._pixiId&&delete n.BaseTextureCache[this.source._pixiId],this.source=null,this.dispose()},i.prototype.dispose=function(){this.emit("dispose",this)},i.prototype.updateSourceImage=function(t){this.source.src=t,this.loadSource(this.source)},i.fromImage=function(t,e,r){var o=n.BaseTextureCache[t];if(void 0===e&&0!==t.indexOf("data:")&&(e=!0),!o){var s=new Image;e&&(s.crossOrigin=""),o=new i(s,r),o.imageUrl=t,s.src=t,n.BaseTextureCache[t]=o,o.resolution=n.getResolutionOfUrl(t)}return o},i.fromCanvas=function(t,e){t._pixiId||(t._pixiId="canvas_"+n.uid());var r=n.BaseTextureCache[t._pixiId];return r||(r=new i(t,e),n.BaseTextureCache[t._pixiId]=r),r}},{"../const":22,"../utils":77,eventemitter3:10}],71:[function(t,e,r){function i(t,e,r,i,c){if(!t)throw new Error("Unable to create RenderTexture, you must pass a renderer into the constructor.");e=e||100,r=r||100,c=c||l.RESOLUTION;var p=new n;if(p.width=e,p.height=r,p.resolution=c,p.scaleMode=i||l.SCALE_MODES.DEFAULT,p.hasLoaded=!0,o.call(this,p,new u.Rectangle(0,0,e,r)),this.width=e,this.height=r,this.resolution=c,this.render=null,this.renderer=t,this.renderer.type===l.RENDERER_TYPE.WEBGL){var d=this.renderer.gl;this.textureBuffer=new s(d,this.width,this.height,p.scaleMode,this.resolution),this.baseTexture._glTextures[d.id]=this.textureBuffer.texture,this.filterManager=new a(this.renderer),this.filterManager.onContextChange(),this.filterManager.resize(e,r),this.render=this.renderWebGL,this.renderer.currentRenderer.start(),this.renderer.currentRenderTarget.activate()}else this.render=this.renderCanvas,this.textureBuffer=new h(this.width*this.resolution,this.height*this.resolution),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,this._updateUvs()}var n=t("./BaseTexture"),o=t("./Texture"),s=t("../renderers/webgl/utils/RenderTarget"),a=t("../renderers/webgl/managers/FilterManager"),h=t("../renderers/canvas/utils/CanvasBuffer"),u=t("../math"),l=t("../const"),c=new u.Matrix;i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.resize=function(t,e,r){(t!==this.width||e!==this.height)&&(this.valid=t>0&&e>0,this.width=this._frame.width=this.crop.width=t,this.height=this._frame.height=this.crop.height=e,r&&(this.baseTexture.width=this.width,this.baseTexture.height=this.height),this.valid&&(this.textureBuffer.resize(this.width,this.height),this.filterManager&&this.filterManager.resize(this.width,this.height)))},i.prototype.clear=function(){this.valid&&(this.renderer.type===l.RENDERER_TYPE.WEBGL&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear())},i.prototype.renderWebGL=function(t,e,r,i){if(this.valid){if(i=void 0!==i?i:!0,this.textureBuffer.transform=e,this.textureBuffer.activate(),t.worldAlpha=1,i){t.worldTransform.identity(),t.currentBounds=null;var n,o,s=t.children;for(n=0,o=s.length;o>n;++n)s[n].updateTransform()}var a=this.renderer.filterManager;this.renderer.filterManager=this.filterManager,this.renderer.renderDisplayObject(t,this.textureBuffer,r),this.renderer.filterManager=a}},i.prototype.renderCanvas=function(t,e,r,i){if(this.valid){i=!!i;var n=c;n.identity(),e&&n.append(e);var o=t.worldTransform;t.worldTransform=n,t.worldAlpha=1;var s,a,h=t.children;for(s=0,a=h.length;a>s;++s)h[s].updateTransform();r&&this.textureBuffer.clear();var u=this.textureBuffer.context,l=this.renderer.resolution;this.renderer.resolution=this.resolution,this.renderer.renderDisplayObject(t,u),this.renderer.resolution=l,t.worldTransform===n&&(t.worldTransform=o)}},i.prototype.destroy=function(){o.prototype.destroy.call(this,!0),this.textureBuffer.destroy(),this.filterManager&&this.filterManager.destroy(),this.renderer=null},i.prototype.getImage=function(){var t=new Image;return t.src=this.getBase64(),t},i.prototype.getBase64=function(){return this.getCanvas().toDataURL()},i.prototype.getCanvas=function(){if(this.renderer.type===l.RENDERER_TYPE.WEBGL){var t=this.renderer.gl,e=this.textureBuffer.size.width,r=this.textureBuffer.size.height,i=new Uint8Array(4*e*r);t.bindFramebuffer(t.FRAMEBUFFER,this.textureBuffer.frameBuffer),t.readPixels(0,0,e,r,t.RGBA,t.UNSIGNED_BYTE,i),t.bindFramebuffer(t.FRAMEBUFFER,null);var n=new h(e,r),o=n.context.getImageData(0,0,e,r);return o.data.set(i),n.context.putImageData(o,0,0),n.canvas}return this.textureBuffer.canvas},i.prototype.getPixels=function(){var t,e;if(this.renderer.type===l.RENDERER_TYPE.WEBGL){var r=this.renderer.gl;t=this.textureBuffer.size.width,e=this.textureBuffer.size.height;var i=new Uint8Array(4*t*e);return r.bindFramebuffer(r.FRAMEBUFFER,this.textureBuffer.frameBuffer),r.readPixels(0,0,t,e,r.RGBA,r.UNSIGNED_BYTE,i),r.bindFramebuffer(r.FRAMEBUFFER,null),i}return t=this.textureBuffer.canvas.width,e=this.textureBuffer.canvas.height,this.textureBuffer.canvas.getContext("2d").getImageData(0,0,t,e).data},i.prototype.getPixel=function(t,e){if(this.renderer.type===l.RENDERER_TYPE.WEBGL){var r=this.renderer.gl,i=new Uint8Array(4);return r.bindFramebuffer(r.FRAMEBUFFER,this.textureBuffer.frameBuffer),
r.readPixels(t,e,1,1,r.RGBA,r.UNSIGNED_BYTE,i),r.bindFramebuffer(r.FRAMEBUFFER,null),i}return this.textureBuffer.canvas.getContext("2d").getImageData(t,e,1,1).data}},{"../const":22,"../math":33,"../renderers/canvas/utils/CanvasBuffer":45,"../renderers/webgl/managers/FilterManager":54,"../renderers/webgl/utils/RenderTarget":65,"./BaseTexture":70,"./Texture":72}],72:[function(t,e,r){function i(t,e,r,n,o){if(a.call(this),this.noFrame=!1,e||(this.noFrame=!0,e=new h.Rectangle(0,0,1,1)),t instanceof i&&(t=t.baseTexture),this.baseTexture=t,this._frame=e,this.trim=n,this.valid=!1,this.requiresUpdate=!1,this._uvs=null,this.width=0,this.height=0,this.crop=r||e,this._rotate=+(o||0),o===!0)this._rotate=2;else if(this._rotate%2!==0)throw"attempt to use diamond-shaped UVs. If you are sure, set rotation manually";t.hasLoaded?(this.noFrame&&(e=new h.Rectangle(0,0,t.width,t.height),t.on("update",this.onBaseTextureUpdated,this)),this.frame=e):t.once("loaded",this.onBaseTextureLoaded,this)}var n=t("./BaseTexture"),o=t("./VideoBaseTexture"),s=t("./TextureUvs"),a=t("eventemitter3"),h=t("../math"),u=t("../utils");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{frame:{get:function(){return this._frame},set:function(t){if(this._frame=t,this.noFrame=!1,this.width=t.width,this.height=t.height,!this.trim&&!this.rotate&&(t.x+t.width>this.baseTexture.width||t.y+t.height>this.baseTexture.height))throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.valid=t&&t.width&&t.height&&this.baseTexture.hasLoaded,this.trim?(this.width=this.trim.width,this.height=this.trim.height,this._frame.width=this.trim.width,this._frame.height=this.trim.height):this.crop=t,this.valid&&this._updateUvs()}},rotate:{get:function(){return this._rotate},set:function(t){this._rotate=t,this.valid&&this._updateUvs()}}}),i.prototype.update=function(){this.baseTexture.update()},i.prototype.onBaseTextureLoaded=function(t){this.noFrame?this.frame=new h.Rectangle(0,0,t.width,t.height):this.frame=this._frame,this.emit("update",this)},i.prototype.onBaseTextureUpdated=function(t){this._frame.width=t.width,this._frame.height=t.height,this.emit("update",this)},i.prototype.destroy=function(t){this.baseTexture&&(t&&this.baseTexture.destroy(),this.baseTexture.off("update",this.onBaseTextureUpdated,this),this.baseTexture.off("loaded",this.onBaseTextureLoaded,this),this.baseTexture=null),this._frame=null,this._uvs=null,this.trim=null,this.crop=null,this.valid=!1,this.off("dispose",this.dispose,this),this.off("update",this.update,this)},i.prototype.clone=function(){return new i(this.baseTexture,this.frame,this.crop,this.trim,this.rotate)},i.prototype._updateUvs=function(){this._uvs||(this._uvs=new s),this._uvs.set(this.crop,this.baseTexture,this.rotate)},i.fromImage=function(t,e,r){var o=u.TextureCache[t];return o||(o=new i(n.fromImage(t,e,r)),u.TextureCache[t]=o),o},i.fromFrame=function(t){var e=u.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return e},i.fromCanvas=function(t,e){return new i(n.fromCanvas(t,e))},i.fromVideo=function(t,e){return"string"==typeof t?i.fromVideoUrl(t,e):new i(o.fromVideo(t,e))},i.fromVideoUrl=function(t,e){return new i(o.fromUrl(t,e))},i.addTextureToCache=function(t,e){u.TextureCache[e]=t},i.removeTextureFromCache=function(t){var e=u.TextureCache[t];return delete u.TextureCache[t],delete u.BaseTextureCache[t],e},i.EMPTY=new i(new n)},{"../math":33,"../utils":77,"./BaseTexture":70,"./TextureUvs":73,"./VideoBaseTexture":74,eventemitter3:10}],73:[function(t,e,r){function i(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1}e.exports=i;var n=t("../math/GroupD8");i.prototype.set=function(t,e,r){var i=e.width,o=e.height;if(r){var s=n.isSwapWidthHeight(r),a=(s?t.height:t.width)/2/i,h=(s?t.width:t.height)/2/o,u=t.x/i+a,l=t.y/o+h;r=n.add(r,n.NW),this.x0=u+a*n.uX(r),this.y0=l+h*n.uY(r),r=n.add(r,2),this.x1=u+a*n.uX(r),this.y1=l+h*n.uY(r),r=n.add(r,2),this.x2=u+a*n.uX(r),this.y2=l+h*n.uY(r),r=n.add(r,2),this.x3=u+a*n.uX(r),this.y3=l+h*n.uY(r)}else this.x0=t.x/i,this.y0=t.y/o,this.x1=(t.x+t.width)/i,this.y1=t.y/o,this.x2=(t.x+t.width)/i,this.y2=(t.y+t.height)/o,this.x3=t.x/i,this.y3=(t.y+t.height)/o}},{"../math/GroupD8":30}],74:[function(t,e,r){function i(t,e){if(!t)throw new Error("No video source element specified.");(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),o.call(this,t,e),this.autoUpdate=!1,this._onUpdate=this._onUpdate.bind(this),this._onCanPlay=this._onCanPlay.bind(this),t.complete||(t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlay),t.addEventListener("play",this._onPlayStart.bind(this)),t.addEventListener("pause",this._onPlayStop.bind(this))),this.__loaded=!1}function n(t,e){e||(e="video/"+t.substr(t.lastIndexOf(".")+1));var r=document.createElement("source");return r.src=t,r.type=e,r}var o=t("./BaseTexture"),s=t("../utils");i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i,i.prototype._onUpdate=function(){this.autoUpdate&&(window.requestAnimationFrame(this._onUpdate),this.update())},i.prototype._onPlayStart=function(){this.autoUpdate||(window.requestAnimationFrame(this._onUpdate),this.autoUpdate=!0)},i.prototype._onPlayStop=function(){this.autoUpdate=!1},i.prototype._onCanPlay=function(){this.hasLoaded=!0,this.source&&(this.source.removeEventListener("canplay",this._onCanPlay),this.source.removeEventListener("canplaythrough",this._onCanPlay),this.width=this.source.videoWidth,this.height=this.source.videoHeight,this.source.play(),this.__loaded||(this.__loaded=!0,this.emit("loaded",this)))},i.prototype.destroy=function(){this.source&&this.source._pixiId&&(delete s.BaseTextureCache[this.source._pixiId],delete this.source._pixiId),o.prototype.destroy.call(this)},i.fromVideo=function(t,e){t._pixiId||(t._pixiId="video_"+s.uid());var r=s.BaseTextureCache[t._pixiId];return r||(r=new i(t,e),s.BaseTextureCache[t._pixiId]=r),r},i.fromUrl=function(t,e){var r=document.createElement("video");if(Array.isArray(t))for(var o=0;o<t.length;++o)r.appendChild(n(t[o].src||t[o],t[o].mime));else r.appendChild(n(t.src||t,t.mime));return r.load(),r.play(),i.fromVideo(r,e)},i.fromUrls=i.fromUrl},{"../utils":77,"./BaseTexture":70}],75:[function(t,e,r){function i(){var t=this;this._tick=function(e){t._requestId=null,t.started&&(t.update(e),t.started&&null===t._requestId&&t._emitter.listeners(s,!0)&&(t._requestId=requestAnimationFrame(t._tick)))},this._emitter=new o,this._requestId=null,this._maxElapsedMS=100,this.autoStart=!1,this.deltaTime=1,this.elapsedMS=1/n.TARGET_FPMS,this.lastTime=0,this.speed=1,this.started=!1}var n=t("../const"),o=t("eventemitter3"),s="tick";Object.defineProperties(i.prototype,{FPS:{get:function(){return 1e3/this.elapsedMS}},minFPS:{get:function(){return 1e3/this._maxElapsedMS},set:function(t){var e=Math.min(Math.max(0,t)/1e3,n.TARGET_FPMS);this._maxElapsedMS=1/e}}}),i.prototype._requestIfNeeded=function(){null===this._requestId&&this._emitter.listeners(s,!0)&&(this.lastTime=performance.now(),this._requestId=requestAnimationFrame(this._tick))},i.prototype._cancelIfNeeded=function(){null!==this._requestId&&(cancelAnimationFrame(this._requestId),this._requestId=null)},i.prototype._startIfPossible=function(){this.started?this._requestIfNeeded():this.autoStart&&this.start()},i.prototype.add=function(t,e){return this._emitter.on(s,t,e),this._startIfPossible(),this},i.prototype.addOnce=function(t,e){return this._emitter.once(s,t,e),this._startIfPossible(),this},i.prototype.remove=function(t,e){return this._emitter.off(s,t,e),this._emitter.listeners(s,!0)||this._cancelIfNeeded(),this},i.prototype.start=function(){this.started||(this.started=!0,this._requestIfNeeded())},i.prototype.stop=function(){this.started&&(this.started=!1,this._cancelIfNeeded())},i.prototype.update=function(t){var e;t=t||performance.now(),e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),this.deltaTime=e*n.TARGET_FPMS*this.speed,this._emitter.emit(s,this.deltaTime),this.lastTime=t},e.exports=i},{"../const":22,eventemitter3:10}],76:[function(t,e,r){var i=t("./Ticker"),n=new i;n.autoStart=!0,e.exports={shared:n,Ticker:i}},{"./Ticker":75}],77:[function(t,e,r){var i=t("../const"),n=e.exports={_uid:0,_saidHello:!1,EventEmitter:t("eventemitter3"),pluginTarget:t("./pluginTarget"),async:t("async"),uid:function(){return++n._uid},hex2rgb:function(t,e){return e=e||[],e[0]=(t>>16&255)/255,e[1]=(t>>8&255)/255,e[2]=(255&t)/255,e},hex2string:function(t){return t=t.toString(16),t="000000".substr(0,6-t.length)+t,"#"+t},rgb2hex:function(t){return(255*t[0]<<16)+(255*t[1]<<8)+255*t[2]},canUseNewCanvasBlendModes:function(){if("undefined"==typeof document)return!1;var t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",e="AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",r=new Image;r.src=t+"AP804Oa6"+e;var i=new Image;i.src=t+"/wCKxvRF"+e;var n=document.createElement("canvas");n.width=6,n.height=1;var o=n.getContext("2d");o.globalCompositeOperation="multiply",o.drawImage(r,0,0),o.drawImage(i,2,0);var s=o.getImageData(2,0,1,1).data;return 255===s[0]&&0===s[1]&&0===s[2]},getNextPowerOfTwo:function(t){if(t>0&&0===(t&t-1))return t;for(var e=1;t>e;)e<<=1;return e},isPowerOfTwo:function(t,e){return t>0&&0===(t&t-1)&&e>0&&0===(e&e-1)},getResolutionOfUrl:function(t){var e=i.RETINA_PREFIX.exec(t);return e?parseFloat(e[1]):1},sayHello:function(t){if(!n._saidHello){if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var e=["\n %c %c %c Pixi.js "+i.VERSION+" - ✰ "+t+" ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n","background: #ff66a5; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff66a5; background: #030307; padding:5px 0;","background: #ff66a5; padding:5px 0;","background: #ffc3dc; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;"];window.console.log.apply(console,e)}else window.console&&window.console.log("Pixi.js "+i.VERSION+" - "+t+" - http://www.pixijs.com/");n._saidHello=!0}},isWebGLSupported:function(){var t={stencil:!0};try{if(!window.WebGLRenderingContext)return!1;var e=document.createElement("canvas"),r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t);return!(!r||!r.getContextAttributes().stencil)}catch(i){return!1}},sign:function(t){return t?0>t?-1:1:0},removeItems:function(t,e,r){var i=t.length;if(!(e>=i||0===r)){r=e+r>i?i-e:r;for(var n=e,o=i-r;o>n;++n)t[n]=t[n+r];t.length=o}},TextureCache:{},BaseTextureCache:{}}},{"../const":22,"./pluginTarget":78,async:1,eventemitter3:10}],78:[function(t,e,r){function i(t){t.__plugins={},t.registerPlugin=function(e,r){t.__plugins[e]=r},t.prototype.initPlugins=function(){this.plugins=this.plugins||{};for(var e in t.__plugins)this.plugins[e]=new t.__plugins[e](this)},t.prototype.destroyPlugins=function(){for(var t in this.plugins)this.plugins[t].destroy(),this.plugins[t]=null;this.plugins=null}}e.exports={mixin:function(t){i(t)}}},{}],79:[function(t,e,r){var i=t("./core"),n=t("./mesh"),o=t("./extras"),s=t("./filters");i.SpriteBatch=function(){throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")},i.AssetLoader=function(){throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")},Object.defineProperties(i,{Stage:{get:function(){return console.warn("You do not need to use a PIXI Stage any more, you can simply render any container."),i.Container}},DisplayObjectContainer:{get:function(){return console.warn("DisplayObjectContainer has been shortened to Container, please use Container from now on."),i.Container}},Strip:{get:function(){return console.warn("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."),n.Mesh}},Rope:{get:function(){return console.warn("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."),n.Rope}},MovieClip:{get:function(){return console.warn("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."),o.MovieClip}},TilingSprite:{get:function(){return console.warn("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."),o.TilingSprite}},BitmapText:{get:function(){return console.warn("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."),o.BitmapText}},blendModes:{get:function(){return console.warn("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."),i.BLEND_MODES}},scaleModes:{get:function(){return console.warn("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."),i.SCALE_MODES}},BaseTextureCache:{get:function(){return console.warn("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."),i.utils.BaseTextureCache}},TextureCache:{get:function(){return console.warn("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."),i.utils.TextureCache}},math:{get:function(){return console.warn("The math namespace is deprecated, please access members already accessible on PIXI."),i}}}),i.Sprite.prototype.setTexture=function(t){this.texture=t,console.warn("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")},o.BitmapText.prototype.setText=function(t){this.text=t,console.warn("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")},i.Text.prototype.setText=function(t){this.text=t,console.warn("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")},i.Text.prototype.setStyle=function(t){this.style=t,console.warn("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")},i.Texture.prototype.setFrame=function(t){this.frame=t,console.warn("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")},Object.defineProperties(s,{AbstractFilter:{get:function(){return console.warn("filters.AbstractFilter is an undocumented alias, please use AbstractFilter from now on."),i.AbstractFilter}},FXAAFilter:{get:function(){return console.warn("filters.FXAAFilter is an undocumented alias, please use FXAAFilter from now on."),i.FXAAFilter}},SpriteMaskFilter:{get:function(){return console.warn("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."),i.SpriteMaskFilter}}}),i.utils.uuid=function(){return console.warn("utils.uuid() is deprecated, please use utils.uid() from now on."),i.utils.uid()}},{"./core":29,"./extras":86,"./filters":103,"./mesh":128}],80:[function(t,e,r){function i(t,e){n.Container.call(this),e=e||{},this.textWidth=0,this.textHeight=0,this._glyphs=[],this._font={tint:void 0!==e.tint?e.tint:16777215,align:e.align||"left",name:null,size:0},this.font=e.font,this._text=t,this.maxWidth=0,this.maxLineHeight=0,this.dirty=!1,this.updateText()}var n=t("../core");i.prototype=Object.create(n.Container.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{tint:{get:function(){return this._font.tint},set:function(t){this._font.tint="number"==typeof t&&t>=0?t:16777215,this.dirty=!0}},align:{get:function(){return this._font.align},set:function(t){this._font.align=t||"left",this.dirty=!0}},font:{get:function(){return this._font},set:function(t){t&&("string"==typeof t?(t=t.split(" "),this._font.name=1===t.length?t[0]:t.slice(1).join(" "),this._font.size=t.length>=2?parseInt(t[0],10):i.fonts[this._font.name].size):(this._font.name=t.name,this._font.size="number"==typeof t.size?t.size:parseInt(t.size,10)),this.dirty=!0)}},text:{get:function(){return this._text},set:function(t){t=t.toString()||" ",this._text!==t&&(this._text=t,this.dirty=!0)}}}),i.prototype.updateText=function(){for(var t=i.fonts[this._font.name],e=new n.Point,r=null,o=[],s=0,a=0,h=[],u=0,l=this._font.size/t.size,c=-1,p=0,d=0;d<this.text.length;d++){var f=this.text.charCodeAt(d);if(c=/(\s)/.test(this.text.charAt(d))?d:c,/(?:\r\n|\r|\n)/.test(this.text.charAt(d)))h.push(s),a=Math.max(a,s),u++,e.x=0,e.y+=t.lineHeight,r=null;else if(-1!==c&&this.maxWidth>0&&e.x*l>this.maxWidth)n.utils.removeItems(o,c,d-c),d=c,c=-1,h.push(s),a=Math.max(a,s),u++,e.x=0,e.y+=t.lineHeight,r=null;else{var v=t.chars[f];v&&(r&&v.kerning[r]&&(e.x+=v.kerning[r]),o.push({texture:v.texture,line:u,charCode:f,position:new n.Point(e.x+v.xOffset,e.y+v.yOffset)}),s=e.x+(v.texture.width+v.xOffset),e.x+=v.xAdvance,p=Math.max(p,v.yOffset+v.texture.height),r=f)}}h.push(s),a=Math.max(a,s);var g=[];for(d=0;u>=d;d++){var m=0;"right"===this._font.align?m=a-h[d]:"center"===this._font.align&&(m=(a-h[d])/2),g.push(m)}var y=o.length,x=this.tint;for(d=0;y>d;d++){var b=this._glyphs[d];b?b.texture=o[d].texture:(b=new n.Sprite(o[d].texture),this._glyphs.push(b)),b.position.x=(o[d].position.x+g[o[d].line])*l,b.position.y=o[d].position.y*l,b.scale.x=b.scale.y=l,b.tint=x,b.parent||this.addChild(b)}for(d=y;d<this._glyphs.length;++d)this.removeChild(this._glyphs[d]);this.textWidth=a*l,this.textHeight=(e.y+t.lineHeight)*l,this.maxLineHeight=p*l},i.prototype.updateTransform=function(){this.validate(),this.containerUpdateTransform()},i.prototype.getLocalBounds=function(){return this.validate(),n.Container.prototype.getLocalBounds.call(this)},i.prototype.validate=function(){this.dirty&&(this.updateText(),this.dirty=!1)},i.fonts={}},{"../core":29}],81:[function(t,e,r){function i(t){n.Sprite.call(this,t[0]instanceof n.Texture?t[0]:t[0].texture),this._textures=null,this._durations=null,this.textures=t,this.animationSpeed=1,this.loop=!0,this.onComplete=null,this._currentTime=0,this.playing=!1}var n=t("../core");i.prototype=Object.create(n.Sprite.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{totalFrames:{get:function(){return this._textures.length}},textures:{get:function(){return this._textures},set:function(t){if(t[0]instanceof n.Texture)this._textures=t,this._durations=null;else{this._textures=[],this._durations=[];for(var e=0;e<t.length;e++)this._textures.push(t[e].texture),this._durations.push(t[e].time)}}},currentFrame:{get:function(){var t=Math.floor(this._currentTime)%this._textures.length;return 0>t&&(t+=this._textures.length),t}}}),i.prototype.stop=function(){this.playing&&(this.playing=!1,n.ticker.shared.remove(this.update,this))},i.prototype.play=function(){this.playing||(this.playing=!0,n.ticker.shared.add(this.update,this))},i.prototype.gotoAndStop=function(t){this.stop(),this._currentTime=t,this._texture=this._textures[this.currentFrame]},i.prototype.gotoAndPlay=function(t){this._currentTime=t,this.play()},i.prototype.update=function(t){var e=this.animationSpeed*t;if(null!==this._durations){var r=this._currentTime%1*this._durations[this.currentFrame];for(r+=e/60*1e3;0>r;)this._currentTime--,r+=this._durations[this.currentFrame];var i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);r>=this._durations[this.currentFrame];)r-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=r/this._durations[this.currentFrame]}else this._currentTime+=e;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):this._texture=this._textures[this.currentFrame]},i.prototype.destroy=function(){this.stop(),n.Sprite.prototype.destroy.call(this)},i.fromFrames=function(t){for(var e=[],r=0;r<t.length;++r)e.push(new n.Texture.fromFrame(t[r]));return new i(e)},i.fromImages=function(t){for(var e=[],r=0;r<t.length;++r)e.push(new n.Texture.fromImage(t[r]));return new i(e)}},{"../core":29}],82:[function(t,e,r){function i(t,e,r){n.Sprite.call(this,t),this.tileScale=new n.Point(1,1),this.tilePosition=new n.Point(0,0),this._width=e||100,this._height=r||100,this._uvs=new n.TextureUvs,this._canvasPattern=null,this.shader=new n.AbstractFilter(["precision lowp float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 projectionMatrix;","uniform vec4 uFrame;","uniform vec4 uTransform;","varying vec2 vTextureCoord;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vec2 coord = aTextureCoord;","   coord -= uTransform.xy;","   coord /= uTransform.zw;","   vTextureCoord = coord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"].join("\n"),["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","uniform vec4 uFrame;","uniform vec2 uPixelSize;","void main(void){","   vec2 coord = mod(vTextureCoord, uFrame.zw);","   coord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);","   coord += uFrame.xy;","   gl_FragColor =  texture2D(uSampler, coord) * vColor ;","}"].join("\n"),{uFrame:{type:"4fv",value:[0,0,1,1]},uTransform:{type:"4fv",value:[0,0,1,1]},uPixelSize:{type:"2fv",value:[1,1]}})}var n=t("../core"),o=new n.Point,s=t("../core/renderers/canvas/utils/CanvasTinter");i.prototype=Object.create(n.Sprite.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return this._width},set:function(t){this._width=t}},height:{get:function(){return this._height},set:function(t){this._height=t}}}),i.prototype._onTextureUpdate=function(){},i.prototype._renderWebGL=function(t){var e=this._texture;if(e&&e._uvs){var r=e._uvs,i=e._frame.width,n=e._frame.height,o=e.baseTexture.width,s=e.baseTexture.height;e._uvs=this._uvs,e._frame.width=this.width,e._frame.height=this.height,this.shader.uniforms.uPixelSize.value[0]=1/o,this.shader.uniforms.uPixelSize.value[1]=1/s,this.shader.uniforms.uFrame.value[0]=r.x0,this.shader.uniforms.uFrame.value[1]=r.y0,this.shader.uniforms.uFrame.value[2]=r.x1-r.x0,this.shader.uniforms.uFrame.value[3]=r.y2-r.y0,this.shader.uniforms.uTransform.value[0]=this.tilePosition.x%(i*this.tileScale.x)/this._width,this.shader.uniforms.uTransform.value[1]=this.tilePosition.y%(n*this.tileScale.y)/this._height,this.shader.uniforms.uTransform.value[2]=o/this._width*this.tileScale.x,this.shader.uniforms.uTransform.value[3]=s/this._height*this.tileScale.y,t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this),e._uvs=r,e._frame.width=i,e._frame.height=n}},i.prototype._renderCanvas=function(t){var e=this._texture;if(e.baseTexture.hasLoaded){var r=t.context,i=this.worldTransform,o=t.resolution,a=e.baseTexture,h=this.tilePosition.x/this.tileScale.x%e._frame.width,u=this.tilePosition.y/this.tileScale.y%e._frame.height;if(!this._canvasPattern){var l=new n.CanvasBuffer(e._frame.width,e._frame.height);16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=s.getTintedTexture(this,this.tint)),l.context.drawImage(this.tintedTexture,0,0)):l.context.drawImage(a.source,-e._frame.x,-e._frame.y),this._canvasPattern=l.context.createPattern(l.canvas,"repeat")}r.globalAlpha=this.worldAlpha,r.setTransform(i.a*o,i.b*o,i.c*o,i.d*o,i.tx*o,i.ty*o),r.scale(this.tileScale.x,this.tileScale.y),r.translate(h+this.anchor.x*-this._width,u+this.anchor.y*-this._height);var c=t.blendModes[this.blendMode];c!==t.context.globalCompositeOperation&&(r.globalCompositeOperation=c),r.fillStyle=this._canvasPattern,r.fillRect(-h,-u,this._width/this.tileScale.x,this._height/this.tileScale.y)}},i.prototype.getBounds=function(){var t,e,r,i,n=this._width,o=this._height,s=n*(1-this.anchor.x),a=n*-this.anchor.x,h=o*(1-this.anchor.y),u=o*-this.anchor.y,l=this.worldTransform,c=l.a,p=l.b,d=l.c,f=l.d,v=l.tx,g=l.ty,m=c*a+d*u+v,y=f*u+p*a+g,x=c*s+d*u+v,b=f*u+p*s+g,_=c*s+d*h+v,T=f*h+p*s+g,E=c*a+d*h+v,S=f*h+p*a+g;t=m,t=t>x?x:t,t=t>_?_:t,t=t>E?E:t,r=y,r=r>b?b:r,r=r>T?T:r,r=r>S?S:r,e=m,e=x>e?x:e,e=_>e?_:e,e=E>e?E:e,i=y,i=b>i?b:i,i=T>i?T:i,i=S>i?S:i;var w=this._bounds;return w.x=t,w.width=e-t,w.y=r,w.height=i-r,this._currentBounds=w,w},i.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,o);var e,r=this._width,i=this._height,n=-r*this.anchor.x;return o.x>n&&o.x<n+r&&(e=-i*this.anchor.y,o.y>e&&o.y<e+i)?!0:!1},i.prototype.destroy=function(){n.Sprite.prototype.destroy.call(this),this.tileScale=null,this._tileScaleOffset=null,this.tilePosition=null,this._uvs=null},i.fromFrame=function(t,e,r){var o=n.utils.TextureCache[t];if(!o)throw new Error('The frameId "'+t+'" does not exist in the texture cache '+this);return new i(o,e,r)},i.fromImage=function(t,e,r,o,s){return new i(n.Texture.fromImage(t,o,s),e,r)}},{"../core":29,"../core/renderers/canvas/utils/CanvasTinter":48}],83:[function(t,e,r){var i=t("../core"),n=i.DisplayObject,o=new i.Matrix;n.prototype._cacheAsBitmap=!1,n.prototype._originalRenderWebGL=null,n.prototype._originalRenderCanvas=null,n.prototype._originalUpdateTransform=null,n.prototype._originalHitTest=null,n.prototype._originalDestroy=null,n.prototype._cachedSprite=null,Object.defineProperties(n.prototype,{cacheAsBitmap:{get:function(){return this._cacheAsBitmap},set:function(t){this._cacheAsBitmap!==t&&(this._cacheAsBitmap=t,t?(this._originalRenderWebGL=this.renderWebGL,this._originalRenderCanvas=this.renderCanvas,this._originalUpdateTransform=this.updateTransform,this._originalGetBounds=this.getBounds,this._originalDestroy=this.destroy,this._originalContainsPoint=this.containsPoint,this.renderWebGL=this._renderCachedWebGL,this.renderCanvas=this._renderCachedCanvas,this.destroy=this._cacheAsBitmapDestroy):(this._cachedSprite&&this._destroyCachedDisplayObject(),this.renderWebGL=this._originalRenderWebGL,this.renderCanvas=this._originalRenderCanvas,this.getBounds=this._originalGetBounds,this.destroy=this._originalDestroy,this.updateTransform=this._originalUpdateTransform,this.containsPoint=this._originalContainsPoint))}}}),n.prototype._renderCachedWebGL=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObject(t),this._cachedSprite.worldAlpha=this.worldAlpha,t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this._cachedSprite))},n.prototype._initCachedDisplayObject=function(t){if(!this._cachedSprite){t.currentRenderer.flush();var e=this.getLocalBounds().clone();if(this._filters){var r=this._filters[0].padding;e.x-=r,e.y-=r,e.width+=2*r,e.height+=2*r}var n=t.currentRenderTarget,s=t.filterManager.filterStack,a=new i.RenderTexture(t,0|e.width,0|e.height),h=o;h.tx=-e.x,h.ty=-e.y,this.renderWebGL=this._originalRenderWebGL,a.render(this,h,!0,!0),t.setRenderTarget(n),t.filterManager.filterStack=s,this.renderWebGL=this._renderCachedWebGL,this.updateTransform=this.displayObjectUpdateTransform,this.getBounds=this._getCachedBounds,this._cachedSprite=new i.Sprite(a),this._cachedSprite.worldTransform=this.worldTransform,this._cachedSprite.anchor.x=-(e.x/e.width),this._cachedSprite.anchor.y=-(e.y/e.height),this.updateTransform(),this.containsPoint=this._cachedSprite.containsPoint.bind(this._cachedSprite)}},n.prototype._renderCachedCanvas=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObjectCanvas(t),this._cachedSprite.worldAlpha=this.worldAlpha,this._cachedSprite.renderCanvas(t))},n.prototype._initCachedDisplayObjectCanvas=function(t){if(!this._cachedSprite){var e=this.getLocalBounds(),r=t.context,n=new i.RenderTexture(t,0|e.width,0|e.height),s=o;s.tx=-e.x,s.ty=-e.y,this.renderCanvas=this._originalRenderCanvas,n.render(this,s,!0),t.context=r,this.renderCanvas=this._renderCachedCanvas,this.updateTransform=this.displayObjectUpdateTransform,this.getBounds=this._getCachedBounds,this._cachedSprite=new i.Sprite(n),this._cachedSprite.worldTransform=this.worldTransform,this._cachedSprite.anchor.x=-(e.x/e.width),this._cachedSprite.anchor.y=-(e.y/e.height),this.updateTransform(),this.containsPoint=this._cachedSprite.containsPoint.bind(this._cachedSprite)}},n.prototype._getCachedBounds=function(){return this._cachedSprite._currentBounds=null,this._cachedSprite.getBounds()},n.prototype._destroyCachedDisplayObject=function(){this._cachedSprite._texture.destroy(),this._cachedSprite=null},n.prototype._cacheAsBitmapDestroy=function(){this.cacheAsBitmap=!1,this._originalDestroy()}},{"../core":29}],84:[function(t,e,r){var i=t("../core");i.DisplayObject.prototype.name=null,i.Container.prototype.getChildByName=function(t){for(var e=0;e<this.children.length;e++)if(this.children[e].name===t)return this.children[e];return null}},{"../core":29}],85:[function(t,e,r){var i=t("../core");i.DisplayObject.prototype.getGlobalPosition=function(t){return t=t||new i.Point,this.parent?(this.displayObjectUpdateTransform(),t.x=this.worldTransform.tx,t.y=this.worldTransform.ty):(t.x=this.position.x,t.y=this.position.y),t}},{"../core":29}],86:[function(t,e,r){t("./cacheAsBitmap"),t("./getChildByName"),t("./getGlobalPosition"),e.exports={MovieClip:t("./MovieClip"),TilingSprite:t("./TilingSprite"),BitmapText:t("./BitmapText")}},{"./BitmapText":80,"./MovieClip":81,"./TilingSprite":82,"./cacheAsBitmap":83,"./getChildByName":84,"./getGlobalPosition":85}],87:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n",{dimensions:{type:"4fv",value:new Float32Array([0,0,0,0])},pixelSize:{type:"1f",value:8}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{size:{get:function(){return this.uniforms.pixelSize.value},set:function(t){this.uniforms.pixelSize.value=t}}})},{"../../core":29}],88:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.blurXFilter=new o,this.blurYFilter=new s,this.defaultFilter=new n.AbstractFilter}var n=t("../../core"),o=t("../blur/BlurXFilter"),s=t("../blur/BlurYFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this.defaultFilter.applyFilter(t,e,r),this.blurXFilter.applyFilter(t,e,i),t.blendModeManager.setBlendMode(n.BLEND_MODES.SCREEN),this.blurYFilter.applyFilter(t,i,r),t.blendModeManager.setBlendMode(n.BLEND_MODES.NORMAL),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=this.blurYFilter.blur=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t}},blurY:{get:function(){return this.blurYFilter.blur},set:function(t){this.blurYFilter.blur=t}}})},{"../../core":29,"../blur/BlurXFilter":91,"../blur/BlurYFilter":92
}],89:[function(t,e,r){function i(t,e){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform float dirX;\nuniform float dirY;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[3];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[0] = aTextureCoord + vec2( (0.004 * strength) * dirX, (0.004 * strength) * dirY );\n    vBlurTexCoords[1] = aTextureCoord + vec2( (0.008 * strength) * dirX, (0.008 * strength) * dirY );\n    vBlurTexCoords[2] = aTextureCoord + vec2( (0.012 * strength) * dirX, (0.012 * strength) * dirY );\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[3];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vTextureCoord     ) * 0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0]) * 0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1]) * 0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2]) * 0.004431848411938341;\n}\n",{strength:{type:"1f",value:1},dirX:{type:"1f",value:t||0},dirY:{type:"1f",value:e||0}}),this.defaultFilter=new n.AbstractFilter,this.passes=1,this.dirX=t||0,this.dirY=e||0,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=this.strength/4/this.passes*(e.frame.width/e.size.width),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{var o=t.filterManager.getRenderTarget(!0);t.filterManager.applyFilter(n,e,o,i);for(var s=0;s<this.passes-2;s++)t.filterManager.applyFilter(n,o,o,i);t.filterManager.applyFilter(n,o,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*t,this.strength=t}},dirX:{get:function(){return this.dirX},set:function(t){this.uniforms.dirX.value=t}},dirY:{get:function(){return this.dirY},set:function(t){this.uniforms.dirY.value=t}}})},{"../../core":29}],90:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.blurXFilter=new o,this.blurYFilter=new s}var n=t("../../core"),o=t("./BlurXFilter"),s=t("./BlurYFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this.blurXFilter.applyFilter(t,e,i),this.blurYFilter.applyFilter(t,i,r),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.padding=.5*Math.abs(t),this.blurXFilter.blur=this.blurYFilter.blur=t}},passes:{get:function(){return this.blurXFilter.passes},set:function(t){this.blurXFilter.passes=this.blurYFilter.passes=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t}},blurY:{get:function(){return this.blurYFilter.blur},set:function(t){this.blurYFilter.blur=t}}})},{"../../core":29,"./BlurXFilter":91,"./BlurYFilter":92}],91:[function(t,e,r){function i(){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(-0.012 * strength, 0.0);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(-0.008 * strength, 0.0);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(-0.004 * strength, 0.0);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2( 0.004 * strength, 0.0);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2( 0.008 * strength, 0.0);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2( 0.012 * strength, 0.0);\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n",{strength:{type:"1f",value:1}}),this.passes=1,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=this.strength/4/this.passes*(e.frame.width/e.size.width),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{for(var o=t.filterManager.getRenderTarget(!0),s=e,a=o,h=0;h<this.passes-1;h++){t.filterManager.applyFilter(n,s,a,!0);var u=a;a=s,s=u}t.filterManager.applyFilter(n,s,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*Math.abs(t),this.strength=t}}})},{"../../core":29}],92:[function(t,e,r){function i(){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n",{strength:{type:"1f",value:1}}),this.passes=1,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=Math.abs(this.strength)/4/this.passes*(e.frame.height/e.size.height),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{for(var o=t.filterManager.getRenderTarget(!0),s=e,a=o,h=0;h<this.passes-1;h++){t.filterManager.applyFilter(n,s,a,!0);var u=a;a=s,s=u}t.filterManager.applyFilter(n,s,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*Math.abs(t),this.strength=t}}})},{"../../core":29}],93:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 delta;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n",{delta:{type:"v2",value:{x:.1,y:0}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i},{"../../core":29}],94:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[25];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4];\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9];\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14];\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19];\n\n}\n",{m:{type:"1fv",value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype._loadMatrix=function(t,e){e=!!e;var r=t;e&&(this._multiply(r,this.uniforms.m.value,t),r=this._colorMatrix(r)),this.uniforms.m.value=r},i.prototype._multiply=function(t,e,r){return t[0]=e[0]*r[0]+e[1]*r[5]+e[2]*r[10]+e[3]*r[15],t[1]=e[0]*r[1]+e[1]*r[6]+e[2]*r[11]+e[3]*r[16],t[2]=e[0]*r[2]+e[1]*r[7]+e[2]*r[12]+e[3]*r[17],t[3]=e[0]*r[3]+e[1]*r[8]+e[2]*r[13]+e[3]*r[18],t[4]=e[0]*r[4]+e[1]*r[9]+e[2]*r[14]+e[3]*r[19],t[5]=e[5]*r[0]+e[6]*r[5]+e[7]*r[10]+e[8]*r[15],t[6]=e[5]*r[1]+e[6]*r[6]+e[7]*r[11]+e[8]*r[16],t[7]=e[5]*r[2]+e[6]*r[7]+e[7]*r[12]+e[8]*r[17],t[8]=e[5]*r[3]+e[6]*r[8]+e[7]*r[13]+e[8]*r[18],t[9]=e[5]*r[4]+e[6]*r[9]+e[7]*r[14]+e[8]*r[19],t[10]=e[10]*r[0]+e[11]*r[5]+e[12]*r[10]+e[13]*r[15],t[11]=e[10]*r[1]+e[11]*r[6]+e[12]*r[11]+e[13]*r[16],t[12]=e[10]*r[2]+e[11]*r[7]+e[12]*r[12]+e[13]*r[17],t[13]=e[10]*r[3]+e[11]*r[8]+e[12]*r[13]+e[13]*r[18],t[14]=e[10]*r[4]+e[11]*r[9]+e[12]*r[14]+e[13]*r[19],t[15]=e[15]*r[0]+e[16]*r[5]+e[17]*r[10]+e[18]*r[15],t[16]=e[15]*r[1]+e[16]*r[6]+e[17]*r[11]+e[18]*r[16],t[17]=e[15]*r[2]+e[16]*r[7]+e[17]*r[12]+e[18]*r[17],t[18]=e[15]*r[3]+e[16]*r[8]+e[17]*r[13]+e[18]*r[18],t[19]=e[15]*r[4]+e[16]*r[9]+e[17]*r[14]+e[18]*r[19],t},i.prototype._colorMatrix=function(t){var e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e},i.prototype.brightness=function(t,e){var r=[t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.greyscale=function(t,e){var r=[t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.grayscale=i.prototype.greyscale,i.prototype.blackAndWhite=function(t){var e=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.hue=function(t,e){t=(t||0)/180*Math.PI;var r=Math.cos(t),i=Math.sin(t),n=.213,o=.715,s=.072,a=[n+r*(1-n)+i*-n,o+r*-o+i*-o,s+r*-s+i*(1-s),0,0,n+r*-n+.143*i,o+r*(1-o)+.14*i,s+r*-s+i*-.283,0,0,n+r*-n+i*-(1-n),o+r*-o+i*o,s+r*(1-s)+i*s,0,0,0,0,0,1,0];this._loadMatrix(a,e)},i.prototype.contrast=function(t,e){var r=(t||0)+1,i=-128*(r-1),n=[r,0,0,0,i,0,r,0,0,i,0,0,r,0,i,0,0,0,1,0];this._loadMatrix(n,e)},i.prototype.saturate=function(t,e){var r=2*(t||0)/3+1,i=(r-1)*-.5,n=[r,i,i,0,0,i,r,i,0,0,i,i,r,0,0,0,0,0,1,0];this._loadMatrix(n,e)},i.prototype.desaturate=function(t){this.saturate(-1)},i.prototype.negative=function(t){var e=[0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.sepia=function(t){var e=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.technicolor=function(t){var e=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.polaroid=function(t){var e=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.toBGR=function(t){var e=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.kodachrome=function(t){var e=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.browni=function(t){var e=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.vintage=function(t){var e=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.colorTone=function(t,e,r,i,n){t=t||.2,e=e||.15,r=r||16770432,i=i||3375104;var o=(r>>16&255)/255,s=(r>>8&255)/255,a=(255&r)/255,h=(i>>16&255)/255,u=(i>>8&255)/255,l=(255&i)/255,c=[.3,.59,.11,0,0,o,s,a,t,0,h,u,l,e,0,o-h,s-u,a-l,0,0];this._loadMatrix(c,n)},i.prototype.night=function(t,e){t=t||.1;var r=[-2*t,-t,0,0,0,-t,0,t,0,0,0,t,2*t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.predator=function(t,e){var r=[11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.lsd=function(t){var e=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.reset=function(){var t=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(t,!1)},Object.defineProperties(i.prototype,{matrix:{get:function(){return this.uniforms.m.value},set:function(t){this.uniforms.m.value=t}}})},{"../../core":29}],95:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n",{step:{type:"1f",value:5}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{step:{get:function(){return this.uniforms.step.value},set:function(t){this.uniforms.step.value=t}}})},{"../../core":29}],96:[function(t,e,r){function i(t,e,r){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",{matrix:{type:"1fv",value:new Float32Array(t)},texelSize:{type:"v2",value:{x:1/e,y:1/r}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{matrix:{get:function(){return this.uniforms.matrix.value},set:function(t){this.uniforms.matrix.value=new Float32Array(t)}},width:{get:function(){return 1/this.uniforms.texelSize.value.x},set:function(t){this.uniforms.texelSize.value.x=1/t}},height:{get:function(){return 1/this.uniforms.texelSize.value.y},set:function(t){this.uniforms.texelSize.value.y=1/t}}})},{"../../core":29}],97:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i},{"../../core":29}],98:[function(t,e,r){function i(t,e){var r=new n.Matrix;t.renderable=!1,n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision mediump float;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vMapCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));\n}\n",{mapSampler:{type:"sampler2D",value:t.texture},otherMatrix:{type:"mat3",value:r.toArray(!0)},scale:{type:"v2",value:{x:1,y:1}}}),this.maskSprite=t,this.maskMatrix=r,(null===e||void 0===e)&&(e=20),this.scale=new n.Point(e,e)}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager;i.calculateMappedMatrix(e.frame,this.maskSprite,this.maskMatrix),this.uniforms.otherMatrix.value=this.maskMatrix.toArray(!0),this.uniforms.scale.value.x=this.scale.x*(1/e.frame.width),this.uniforms.scale.value.y=this.scale.y*(1/e.frame.height);var n=this.getShader(t);i.applyFilter(n,e,r)},Object.defineProperties(i.prototype,{map:{get:function(){return this.uniforms.mapSampler.value},set:function(t){this.uniforms.mapSampler.value=t}}})},{"../../core":29}],99:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",{scale:{type:"1f",value:1},angle:{type:"1f",value:5},dimensions:{type:"4fv",value:[0,0,0,0]}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{scale:{get:function(){return this.uniforms.scale.value},set:function(t){this.uniforms.scale.value=t}},angle:{get:function(){return this.uniforms.angle.value},set:function(t){this.uniforms.angle.value=t}}})},{"../../core":29}],100:[function(t,e,r){function i(){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform vec2 offset;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition+offset), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform float alpha;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    sum += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    sum += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    sum += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    sum += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n\n    gl_FragColor = vec4( color.rgb * sum.a * alpha, sum.a * alpha );\n}\n",{blur:{type:"1f",value:1/512},color:{type:"c",value:[0,0,0]},alpha:{type:"1f",value:.7},offset:{type:"2f",value:[5,5]},strength:{type:"1f",value:1}}),this.passes=1,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=this.strength/4/this.passes*(e.frame.height/e.size.height),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{for(var o=t.filterManager.getRenderTarget(!0),s=e,a=o,h=0;h<this.passes-1;h++){t.filterManager.applyFilter(n,s,a,i);var u=a;a=s,s=u}t.filterManager.applyFilter(n,s,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*t,this.strength=t}}})},{"../../core":29}],101:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.blurXFilter=new o,this.blurYTintFilter=new s,this.defaultFilter=new n.AbstractFilter,this.padding=30,this._dirtyPosition=!0,this._angle=45*Math.PI/180,this._distance=10,this.alpha=.75,this.hideObject=!1,this.blendMode=n.BLEND_MODES.MULTIPLY}var n=t("../../core"),o=t("../blur/BlurXFilter"),s=t("./BlurYTintFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this._dirtyPosition&&(this._dirtyPosition=!1,this.blurYTintFilter.uniforms.offset.value[0]=Math.sin(this._angle)*this._distance,this.blurYTintFilter.uniforms.offset.value[1]=Math.cos(this._angle)*this._distance),this.blurXFilter.applyFilter(t,e,i),t.blendModeManager.setBlendMode(this.blendMode),this.blurYTintFilter.applyFilter(t,i,r),t.blendModeManager.setBlendMode(n.BLEND_MODES.NORMAL),this.hideObject||this.defaultFilter.applyFilter(t,e,r),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=this.blurYTintFilter.blur=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t}},blurY:{get:function(){return this.blurYTintFilter.blur},set:function(t){this.blurYTintFilter.blur=t}},color:{get:function(){return n.utils.rgb2hex(this.blurYTintFilter.uniforms.color.value)},set:function(t){this.blurYTintFilter.uniforms.color.value=n.utils.hex2rgb(t)}},alpha:{get:function(){return this.blurYTintFilter.uniforms.alpha.value},set:function(t){this.blurYTintFilter.uniforms.alpha.value=t}},distance:{get:function(){return this._distance},set:function(t){this._dirtyPosition=!0,this._distance=t}},angle:{get:function(){return this._angle},set:function(t){this._dirtyPosition=!0,this._angle=t}}})},{"../../core":29,"../blur/BlurXFilter":91,"./BlurYTintFilter":100}],102:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n",{gray:{type:"1f",value:1}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{gray:{get:function(){return this.uniforms.gray.value},set:function(t){this.uniforms.gray.value=t}}})},{"../../core":29}],103:[function(t,e,r){e.exports={AsciiFilter:t("./ascii/AsciiFilter"),BloomFilter:t("./bloom/BloomFilter"),BlurFilter:t("./blur/BlurFilter"),BlurXFilter:t("./blur/BlurXFilter"),BlurYFilter:t("./blur/BlurYFilter"),BlurDirFilter:t("./blur/BlurDirFilter"),ColorMatrixFilter:t("./color/ColorMatrixFilter"),ColorStepFilter:t("./color/ColorStepFilter"),ConvolutionFilter:t("./convolution/ConvolutionFilter"),CrossHatchFilter:t("./crosshatch/CrossHatchFilter"),DisplacementFilter:t("./displacement/DisplacementFilter"),DotScreenFilter:t("./dot/DotScreenFilter"),GrayFilter:t("./gray/GrayFilter"),DropShadowFilter:t("./dropshadow/DropShadowFilter"),InvertFilter:t("./invert/InvertFilter"),NoiseFilter:t("./noise/NoiseFilter"),PixelateFilter:t("./pixelate/PixelateFilter"),RGBSplitFilter:t("./rgb/RGBSplitFilter"),ShockwaveFilter:t("./shockwave/ShockwaveFilter"),SepiaFilter:t("./sepia/SepiaFilter"),SmartBlurFilter:t("./blur/SmartBlurFilter"),TiltShiftFilter:t("./tiltshift/TiltShiftFilter"),TiltShiftXFilter:t("./tiltshift/TiltShiftXFilter"),TiltShiftYFilter:t("./tiltshift/TiltShiftYFilter"),TwistFilter:t("./twist/TwistFilter")}},{"./ascii/AsciiFilter":87,"./bloom/BloomFilter":88,"./blur/BlurDirFilter":89,"./blur/BlurFilter":90,"./blur/BlurXFilter":91,"./blur/BlurYFilter":92,"./blur/SmartBlurFilter":93,"./color/ColorMatrixFilter":94,"./color/ColorStepFilter":95,"./convolution/ConvolutionFilter":96,"./crosshatch/CrossHatchFilter":97,"./displacement/DisplacementFilter":98,"./dot/DotScreenFilter":99,"./dropshadow/DropShadowFilter":101,"./gray/GrayFilter":102,"./invert/InvertFilter":104,"./noise/NoiseFilter":105,"./pixelate/PixelateFilter":106,"./rgb/RGBSplitFilter":107,"./sepia/SepiaFilter":108,"./shockwave/ShockwaveFilter":109,"./tiltshift/TiltShiftFilter":111,"./tiltshift/TiltShiftXFilter":112,"./tiltshift/TiltShiftYFilter":113,"./twist/TwistFilter":114}],104:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n",{invert:{type:"1f",value:1}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{invert:{get:function(){return this.uniforms.invert.value},set:function(t){this.uniforms.invert.value=t}}})},{"../../core":29}],105:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n",{noise:{type:"1f",value:.5}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{noise:{get:function(){return this.uniforms.noise.value},set:function(t){this.uniforms.noise.value=t}}})},{"../../core":29}],106:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n",{dimensions:{type:"4fv",value:new Float32Array([0,0,0,0])},pixelSize:{type:"v2",value:{x:10,y:10}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{size:{
get:function(){return this.uniforms.pixelSize.value},set:function(t){this.uniforms.pixelSize.value=t}}})},{"../../core":29}],107:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",{red:{type:"v2",value:{x:20,y:20}},green:{type:"v2",value:{x:-20,y:20}},blue:{type:"v2",value:{x:20,y:-20}},dimensions:{type:"4fv",value:[0,0,0,0]}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{red:{get:function(){return this.uniforms.red.value},set:function(t){this.uniforms.red.value=t}},green:{get:function(){return this.uniforms.green.value},set:function(t){this.uniforms.green.value=t}},blue:{get:function(){return this.uniforms.blue.value},set:function(t){this.uniforms.blue.value=t}}})},{"../../core":29}],108:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n",{sepia:{type:"1f",value:1}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{sepia:{get:function(){return this.uniforms.sepia.value},set:function(t){this.uniforms.sepia.value=t}}})},{"../../core":29}],109:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n",{center:{type:"v2",value:{x:.5,y:.5}},params:{type:"v3",value:{x:10,y:.8,z:.1}},time:{type:"1f",value:0}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{center:{get:function(){return this.uniforms.center.value},set:function(t){this.uniforms.center.value=t}},params:{get:function(){return this.uniforms.params.value},set:function(t){this.uniforms.params.value=t}},time:{get:function(){return this.uniforms.time.value},set:function(t){this.uniforms.time.value=t}}})},{"../../core":29}],110:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n",{blur:{type:"1f",value:100},gradientBlur:{type:"1f",value:600},start:{type:"v2",value:{x:0,y:window.innerHeight/2}},end:{type:"v2",value:{x:600,y:window.innerHeight/2}},delta:{type:"v2",value:{x:30,y:30}},texSize:{type:"v2",value:{x:window.innerWidth,y:window.innerHeight}}}),this.updateDelta()}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.updateDelta=function(){this.uniforms.delta.value.x=0,this.uniforms.delta.value.y=0},Object.defineProperties(i.prototype,{blur:{get:function(){return this.uniforms.blur.value},set:function(t){this.uniforms.blur.value=t}},gradientBlur:{get:function(){return this.uniforms.gradientBlur.value},set:function(t){this.uniforms.gradientBlur.value=t}},start:{get:function(){return this.uniforms.start.value},set:function(t){this.uniforms.start.value=t,this.updateDelta()}},end:{get:function(){return this.uniforms.end.value},set:function(t){this.uniforms.end.value=t,this.updateDelta()}}})},{"../../core":29}],111:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.tiltShiftXFilter=new o,this.tiltShiftYFilter=new s}var n=t("../../core"),o=t("./TiltShiftXFilter"),s=t("./TiltShiftYFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this.tiltShiftXFilter.applyFilter(t,e,i),this.tiltShiftYFilter.applyFilter(t,i,r),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.tiltShiftXFilter.blur},set:function(t){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=t}},gradientBlur:{get:function(){return this.tiltShiftXFilter.gradientBlur},set:function(t){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=t}},start:{get:function(){return this.tiltShiftXFilter.start},set:function(t){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=t}},end:{get:function(){return this.tiltShiftXFilter.end},set:function(t){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=t}}})},{"../../core":29,"./TiltShiftXFilter":112,"./TiltShiftYFilter":113}],112:[function(t,e,r){function i(){n.call(this)}var n=t("./TiltShiftAxisFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.updateDelta=function(){var t=this.uniforms.end.value.x-this.uniforms.start.value.x,e=this.uniforms.end.value.y-this.uniforms.start.value.y,r=Math.sqrt(t*t+e*e);this.uniforms.delta.value.x=t/r,this.uniforms.delta.value.y=e/r}},{"./TiltShiftAxisFilter":110}],113:[function(t,e,r){function i(){n.call(this)}var n=t("./TiltShiftAxisFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.updateDelta=function(){var t=this.uniforms.end.value.x-this.uniforms.start.value.x,e=this.uniforms.end.value.y-this.uniforms.start.value.y,r=Math.sqrt(t*t+e*e);this.uniforms.delta.value.x=-e/r,this.uniforms.delta.value.y=t/r}},{"./TiltShiftAxisFilter":110}],114:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n",{radius:{type:"1f",value:.5},angle:{type:"1f",value:5},offset:{type:"v2",value:{x:.5,y:.5}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{offset:{get:function(){return this.uniforms.offset.value},set:function(t){this.uniforms.offset.value=t}},radius:{get:function(){return this.uniforms.radius.value},set:function(t){this.uniforms.radius.value=t}},angle:{get:function(){return this.uniforms.angle.value},set:function(t){this.uniforms.angle.value=t}}})},{"../../core":29}],115:[function(t,e,r){(function(r){t("./polyfill");var i=e.exports=t("./core");i.extras=t("./extras"),i.filters=t("./filters"),i.interaction=t("./interaction"),i.loaders=t("./loaders"),i.mesh=t("./mesh"),i.accessibility=t("./accessibility"),i.loader=new i.loaders.Loader,Object.assign(i,t("./deprecation")),r.PIXI=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./accessibility":21,"./core":29,"./deprecation":79,"./extras":86,"./filters":103,"./interaction":118,"./loaders":121,"./mesh":128,"./polyfill":133}],116:[function(t,e,r){function i(){this.global=new n.Point,this.target=null,this.originalEvent=null}var n=t("../core");i.prototype.constructor=i,e.exports=i,i.prototype.getLocalPosition=function(t,e,r){return t.worldTransform.applyInverse(r||this.global,e)}},{"../core":29}],117:[function(t,e,r){function i(t,e){e=e||{},this.renderer=t,this.autoPreventDefault=void 0!==e.autoPreventDefault?e.autoPreventDefault:!0,this.interactionFrequency=e.interactionFrequency||10,this.mouse=new o,this.eventData={stopped:!1,target:null,type:null,data:this.mouse,stopPropagation:function(){this.stopped=!0}},this.interactiveDataPool=[],this.interactionDOMElement=null,this.moveWhenInside=!1,this.eventsAdded=!1,this.onMouseUp=this.onMouseUp.bind(this),this.processMouseUp=this.processMouseUp.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.processMouseDown=this.processMouseDown.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.processMouseMove=this.processMouseMove.bind(this),this.onMouseOut=this.onMouseOut.bind(this),this.processMouseOverOut=this.processMouseOverOut.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.processTouchStart=this.processTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.processTouchEnd=this.processTouchEnd.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.processTouchMove=this.processTouchMove.bind(this),this.last=0,this.currentCursorStyle="inherit",this._tempPoint=new n.Point,this.resolution=1,this.setTargetElement(this.renderer.view,this.renderer.resolution)}var n=t("../core"),o=t("./InteractionData");Object.assign(n.DisplayObject.prototype,t("./interactiveTarget")),i.prototype.constructor=i,e.exports=i,i.prototype.setTargetElement=function(t,e){this.removeEvents(),this.interactionDOMElement=t,this.resolution=e||1,this.addEvents()},i.prototype.addEvents=function(){this.interactionDOMElement&&(n.ticker.shared.add(this.update,this),window.navigator.msPointerEnabled&&(this.interactionDOMElement.style["-ms-content-zooming"]="none",this.interactionDOMElement.style["-ms-touch-action"]="none"),window.document.addEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.addEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.addEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.addEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.addEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.addEventListener("touchmove",this.onTouchMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0),this.eventsAdded=!0)},i.prototype.removeEvents=function(){this.interactionDOMElement&&(n.ticker.shared.remove(this.update),window.navigator.msPointerEnabled&&(this.interactionDOMElement.style["-ms-content-zooming"]="",this.interactionDOMElement.style["-ms-touch-action"]=""),window.document.removeEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.removeEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.removeEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.removeEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.removeEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.removeEventListener("touchmove",this.onTouchMove,!0),this.interactionDOMElement=null,window.removeEventListener("mouseup",this.onMouseUp,!0),this.eventsAdded=!1)},i.prototype.update=function(t){if(this._deltaTime+=t,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this.interactionDOMElement)){if(this.didMove)return void(this.didMove=!1);this.cursor="inherit",this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,!0),this.currentCursorStyle!==this.cursor&&(this.currentCursorStyle=this.cursor,this.interactionDOMElement.style.cursor=this.cursor)}},i.prototype.dispatchEvent=function(t,e,r){r.stopped||(r.target=t,r.type=e,t.emit(e,r),t[e]&&t[e](r))},i.prototype.mapPositionToPoint=function(t,e,r){var i=this.interactionDOMElement.getBoundingClientRect();t.x=(e-i.left)*(this.interactionDOMElement.width/i.width)/this.resolution,t.y=(r-i.top)*(this.interactionDOMElement.height/i.height)/this.resolution},i.prototype.processInteractive=function(t,e,r,i,n){if(!e||!e.visible)return!1;var o=!1,s=n=e.interactive||n;if(e.hitArea&&(s=!1),e.interactiveChildren)for(var a=e.children,h=a.length-1;h>=0;h--){var u=a[h];if(this.processInteractive(t,u,r,i,s)){if(!u.parent)continue;o=!0,s=!1,u.interactive&&(i=!1)}}return n&&(i&&!o&&(e.hitArea?(e.worldTransform.applyInverse(t,this._tempPoint),o=e.hitArea.contains(this._tempPoint.x,this._tempPoint.y)):e.containsPoint&&(o=e.containsPoint(t))),e.interactive&&r(e,o)),o},i.prototype.onMouseDown=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.autoPreventDefault&&this.mouse.originalEvent.preventDefault(),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseDown,!0)},i.prototype.processMouseDown=function(t,e){var r=this.mouse.originalEvent,i=2===r.button||3===r.which;e&&(t[i?"_isRightDown":"_isLeftDown"]=!0,this.dispatchEvent(t,i?"rightdown":"mousedown",this.eventData))},i.prototype.onMouseUp=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseUp,!0)},i.prototype.processMouseUp=function(t,e){var r=this.mouse.originalEvent,i=2===r.button||3===r.which,n=i?"_isRightDown":"_isLeftDown";e?(this.dispatchEvent(t,i?"rightup":"mouseup",this.eventData),t[n]&&(t[n]=!1,this.dispatchEvent(t,i?"rightclick":"click",this.eventData))):t[n]&&(t[n]=!1,this.dispatchEvent(t,i?"rightupoutside":"mouseupoutside",this.eventData))},i.prototype.onMouseMove=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.didMove=!0,this.cursor="inherit",this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseMove,!0),this.currentCursorStyle!==this.cursor&&(this.currentCursorStyle=this.cursor,this.interactionDOMElement.style.cursor=this.cursor)},i.prototype.processMouseMove=function(t,e){this.processMouseOverOut(t,e),(!this.moveWhenInside||e)&&this.dispatchEvent(t,"mousemove",this.eventData)},i.prototype.onMouseOut=function(t){this.mouse.originalEvent=t,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.interactionDOMElement.style.cursor="inherit",this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,!1)},i.prototype.processMouseOverOut=function(t,e){e?(t._over||(t._over=!0,this.dispatchEvent(t,"mouseover",this.eventData)),t.buttonMode&&(this.cursor=t.defaultCursor)):t._over&&(t._over=!1,this.dispatchEvent(t,"mouseout",this.eventData))},i.prototype.onTouchStart=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,r=e.length,i=0;r>i;i++){var n=e[i],o=this.getTouchData(n);o.originalEvent=t,this.eventData.data=o,this.eventData.stopped=!1,this.processInteractive(o.global,this.renderer._lastObjectRendered,this.processTouchStart,!0),this.returnTouchData(o)}},i.prototype.processTouchStart=function(t,e){e&&(t._touchDown=!0,this.dispatchEvent(t,"touchstart",this.eventData))},i.prototype.onTouchEnd=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,r=e.length,i=0;r>i;i++){var n=e[i],o=this.getTouchData(n);o.originalEvent=t,this.eventData.data=o,this.eventData.stopped=!1,this.processInteractive(o.global,this.renderer._lastObjectRendered,this.processTouchEnd,!0),this.returnTouchData(o)}},i.prototype.processTouchEnd=function(t,e){e?(this.dispatchEvent(t,"touchend",this.eventData),t._touchDown&&(t._touchDown=!1,this.dispatchEvent(t,"tap",this.eventData))):t._touchDown&&(t._touchDown=!1,this.dispatchEvent(t,"touchendoutside",this.eventData))},i.prototype.onTouchMove=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,r=e.length,i=0;r>i;i++){var n=e[i],o=this.getTouchData(n);o.originalEvent=t,this.eventData.data=o,this.eventData.stopped=!1,this.processInteractive(o.global,this.renderer._lastObjectRendered,this.processTouchMove,this.moveWhenInside),this.returnTouchData(o)}},i.prototype.processTouchMove=function(t,e){(!this.moveWhenInside||e)&&this.dispatchEvent(t,"touchmove",this.eventData)},i.prototype.getTouchData=function(t){var e=this.interactiveDataPool.pop();return e||(e=new o),e.identifier=t.identifier,this.mapPositionToPoint(e.global,t.clientX,t.clientY),navigator.isCocoonJS&&(e.global.x=e.global.x/this.resolution,e.global.y=e.global.y/this.resolution),t.globalX=e.global.x,t.globalY=e.global.y,e},i.prototype.returnTouchData=function(t){this.interactiveDataPool.push(t)},i.prototype.destroy=function(){this.removeEvents(),this.renderer=null,this.mouse=null,this.eventData=null,this.interactiveDataPool=null,this.interactionDOMElement=null,this.onMouseUp=null,this.processMouseUp=null,this.onMouseDown=null,this.processMouseDown=null,this.onMouseMove=null,this.processMouseMove=null,this.onMouseOut=null,this.processMouseOverOut=null,this.onTouchStart=null,this.processTouchStart=null,this.onTouchEnd=null,this.processTouchEnd=null,this.onTouchMove=null,this.processTouchMove=null,this._tempPoint=null},n.WebGLRenderer.registerPlugin("interaction",i),n.CanvasRenderer.registerPlugin("interaction",i)},{"../core":29,"./InteractionData":116,"./interactiveTarget":119}],118:[function(t,e,r){e.exports={InteractionData:t("./InteractionData"),InteractionManager:t("./InteractionManager"),interactiveTarget:t("./interactiveTarget")}},{"./InteractionData":116,"./InteractionManager":117,"./interactiveTarget":119}],119:[function(t,e,r){var i={interactive:!1,buttonMode:!1,interactiveChildren:!0,defaultCursor:"pointer",_over:!1,_touchDown:!1};e.exports=i},{}],120:[function(t,e,r){function i(t,e){var r={},i=t.data.getElementsByTagName("info")[0],n=t.data.getElementsByTagName("common")[0];r.font=i.getAttribute("face"),r.size=parseInt(i.getAttribute("size"),10),r.lineHeight=parseInt(n.getAttribute("lineHeight"),10),r.chars={};for(var a=t.data.getElementsByTagName("char"),h=0;h<a.length;h++){var u=parseInt(a[h].getAttribute("id"),10),l=new o.Rectangle(parseInt(a[h].getAttribute("x"),10)+e.frame.x,parseInt(a[h].getAttribute("y"),10)+e.frame.y,parseInt(a[h].getAttribute("width"),10),parseInt(a[h].getAttribute("height"),10));r.chars[u]={xOffset:parseInt(a[h].getAttribute("xoffset"),10),yOffset:parseInt(a[h].getAttribute("yoffset"),10),xAdvance:parseInt(a[h].getAttribute("xadvance"),10),kerning:{},texture:new o.Texture(e.baseTexture,l)}}var c=t.data.getElementsByTagName("kerning");for(h=0;h<c.length;h++){var p=parseInt(c[h].getAttribute("first"),10),d=parseInt(c[h].getAttribute("second"),10),f=parseInt(c[h].getAttribute("amount"),10);r.chars[d]&&(r.chars[d].kerning[p]=f)}t.bitmapFont=r,s.BitmapText.fonts[r.font]=r}var n=t("resource-loader").Resource,o=t("../core"),s=t("../extras"),a=t("path");e.exports=function(){return function(t,e){if(!t.data||!t.isXml)return e();if(0===t.data.getElementsByTagName("page").length||0===t.data.getElementsByTagName("info").length||null===t.data.getElementsByTagName("info")[0].getAttribute("face"))return e();var r=a.dirname(t.url);"."===r&&(r=""),this.baseUrl&&r&&("/"===this.baseUrl.charAt(this.baseUrl.length-1)&&(r+="/"),r=r.replace(this.baseUrl,"")),r&&"/"!==r.charAt(r.length-1)&&(r+="/");var s=r+t.data.getElementsByTagName("page")[0].getAttribute("file");if(o.utils.TextureCache[s])i(t,o.utils.TextureCache[s]),e();else{var h={crossOrigin:t.crossOrigin,loadType:n.LOAD_TYPE.IMAGE,metadata:t.metadata.imageMetadata};this.add(t.name+"_image",s,h,function(r){i(t,r.texture),e()})}}}},{"../core":29,"../extras":86,path:2,"resource-loader":16}],121:[function(t,e,r){e.exports={Loader:t("./loader"),bitmapFontParser:t("./bitmapFontParser"),spritesheetParser:t("./spritesheetParser"),textureParser:t("./textureParser"),Resource:t("resource-loader").Resource}},{"./bitmapFontParser":120,"./loader":122,"./spritesheetParser":123,"./textureParser":124,"resource-loader":16}],122:[function(t,e,r){function i(t,e){n.call(this,t,e);for(var r=0;r<i._pixiMiddleware.length;++r)this.use(i._pixiMiddleware[r]())}var n=t("resource-loader"),o=t("./textureParser"),s=t("./spritesheetParser"),a=t("./bitmapFontParser");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i._pixiMiddleware=[n.middleware.parsing.blob,o,s,a],i.addPixiMiddleware=function(t){i._pixiMiddleware.push(t)};var h=n.Resource;h.setExtensionXhrType("fnt",h.XHR_RESPONSE_TYPE.DOCUMENT)},{"./bitmapFontParser":120,"./spritesheetParser":123,"./textureParser":124,"resource-loader":16}],123:[function(t,e,r){var i=t("resource-loader").Resource,n=t("path"),o=t("../core");e.exports=function(){return function(t,e){if(!t.data||!t.isJson||!t.data.frames)return e();var r={crossOrigin:t.crossOrigin,loadType:i.LOAD_TYPE.IMAGE,metadata:t.metadata.imageMetadata},s=n.dirname(t.url.replace(this.baseUrl,"")),a=o.utils.getResolutionOfUrl(t.url);this.add(t.name+"_image",s+"/"+t.data.meta.image,r,function(r){t.textures={};var i=t.data.frames;for(var n in i){var s=i[n].frame;if(s){var h=null,u=null;if(h=i[n].rotated?new o.Rectangle(s.x,s.y,s.h,s.w):new o.Rectangle(s.x,s.y,s.w,s.h),i[n].trimmed&&(u=new o.Rectangle(i[n].spriteSourceSize.x/a,i[n].spriteSourceSize.y/a,i[n].sourceSize.w/a,i[n].sourceSize.h/a)),i[n].rotated){var l=h.width;h.width=h.height,h.height=l}h.x/=a,h.y/=a,h.width/=a,h.height/=a,t.textures[n]=new o.Texture(r.texture.baseTexture,h,h.clone(),u,i[n].rotated?2:0),o.utils.TextureCache[n]=t.textures[n]}}e()})}}},{"../core":29,path:2,"resource-loader":16}],124:[function(t,e,r){var i=t("../core");e.exports=function(){return function(t,e){if(t.data&&t.isImage){var r=new i.BaseTexture(t.data,null,i.utils.getResolutionOfUrl(t.url));r.imageUrl=t.url,t.texture=new i.Texture(r),i.utils.BaseTextureCache[t.url]=r,i.utils.TextureCache[t.url]=t.texture}e()}}},{"../core":29}],125:[function(t,e,r){function i(t,e,r,o,s){n.Container.call(this),this._texture=null,this.uvs=r||new Float32Array([0,0,1,0,1,1,0,1]),this.vertices=e||new Float32Array([0,0,100,0,100,100,0,100]),this.indices=o||new Uint16Array([0,1,3,2]),this.dirty=!0,this.blendMode=n.BLEND_MODES.NORMAL,this.canvasPadding=0,this.drawMode=s||i.DRAW_MODES.TRIANGLE_MESH,this.texture=t,this.shader=null}var n=t("../core"),o=new n.Point,s=new n.Polygon;i.prototype=Object.create(n.Container.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{texture:{get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}}),i.prototype._renderWebGL=function(t){t.setObjectRenderer(t.plugins.mesh),t.plugins.mesh.render(this)},i.prototype._renderCanvas=function(t){var e=t.context,r=this.worldTransform;t.roundPixels?e.setTransform(r.a,r.b,r.c,r.d,0|r.tx,0|r.ty):e.setTransform(r.a,r.b,r.c,r.d,r.tx,r.ty),this.drawMode===i.DRAW_MODES.TRIANGLE_MESH?this._renderCanvasTriangleMesh(e):this._renderCanvasTriangles(e)},i.prototype._renderCanvasTriangleMesh=function(t){for(var e=this.vertices,r=this.uvs,i=e.length/2,n=0;i-2>n;n++){var o=2*n;this._renderCanvasDrawTriangle(t,e,r,o,o+2,o+4)}},i.prototype._renderCanvasTriangles=function(t){for(var e=this.vertices,r=this.uvs,i=this.indices,n=i.length,o=0;n>o;o+=3){var s=2*i[o],a=2*i[o+1],h=2*i[o+2];this._renderCanvasDrawTriangle(t,e,r,s,a,h)}},i.prototype._renderCanvasDrawTriangle=function(t,e,r,i,n,o){var s=this._texture.baseTexture.source,a=this._texture.baseTexture.width,h=this._texture.baseTexture.height,u=e[i],l=e[n],c=e[o],p=e[i+1],d=e[n+1],f=e[o+1],v=r[i]*a,g=r[n]*a,m=r[o]*a,y=r[i+1]*h,x=r[n+1]*h,b=r[o+1]*h;if(this.canvasPadding>0){var _=this.canvasPadding/this.worldTransform.a,T=this.canvasPadding/this.worldTransform.d,E=(u+l+c)/3,S=(p+d+f)/3,w=u-E,A=p-S,C=Math.sqrt(w*w+A*A);u=E+w/C*(C+_),p=S+A/C*(C+T),w=l-E,A=d-S,C=Math.sqrt(w*w+A*A),l=E+w/C*(C+_),d=S+A/C*(C+T),w=c-E,A=f-S,C=Math.sqrt(w*w+A*A),c=E+w/C*(C+_),f=S+A/C*(C+T)}t.save(),t.beginPath(),t.moveTo(u,p),t.lineTo(l,d),t.lineTo(c,f),t.closePath(),t.clip();var M=v*x+y*m+g*b-x*m-y*g-v*b,R=u*x+y*c+l*b-x*c-y*l-u*b,O=v*l+u*m+g*c-l*m-u*g-v*c,P=v*x*c+y*l*m+u*g*b-u*x*m-y*g*c-v*l*b,F=p*x+y*f+d*b-x*f-y*d-p*b,D=v*d+p*m+g*f-d*m-p*g-v*f,B=v*x*f+y*d*m+p*g*b-p*x*m-y*g*f-v*d*b;t.transform(R/M,F/M,O/M,D/M,P/M,B/M),t.drawImage(s,0,0),t.restore()},i.prototype.renderMeshFlat=function(t){var e=this.context,r=t.vertices,i=r.length/2;e.beginPath();for(var n=1;i-2>n;n++){var o=2*n,s=r[o],a=r[o+2],h=r[o+4],u=r[o+1],l=r[o+3],c=r[o+5];e.moveTo(s,u),e.lineTo(a,l),e.lineTo(h,c)}e.fillStyle="#FF0000",e.fill(),e.closePath()},i.prototype._onTextureUpdate=function(){this.updateFrame=!0},i.prototype.getBounds=function(t){if(!this._currentBounds){for(var e=t||this.worldTransform,r=e.a,i=e.b,o=e.c,s=e.d,a=e.tx,h=e.ty,u=-(1/0),l=-(1/0),c=1/0,p=1/0,d=this.vertices,f=0,v=d.length;v>f;f+=2){var g=d[f],m=d[f+1],y=r*g+o*m+a,x=s*m+i*g+h;c=c>y?y:c,p=p>x?x:p,u=y>u?y:u,l=x>l?x:l}if(c===-(1/0)||l===1/0)return n.Rectangle.EMPTY;var b=this._bounds;b.x=c,b.width=u-c,b.y=p,b.height=l-p,this._currentBounds=b}return this._currentBounds},i.prototype.containsPoint=function(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,o);var e,r,n=this.vertices,a=s.points;if(this.drawMode===i.DRAW_MODES.TRIANGLES){var h=this.indices;for(r=this.indices.length,e=0;r>e;e+=3){var u=2*h[e],l=2*h[e+1],c=2*h[e+2];if(a[0]=n[u],a[1]=n[u+1],a[2]=n[l],a[3]=n[l+1],a[4]=n[c],a[5]=n[c+1],s.contains(o.x,o.y))return!0}}else for(r=n.length,e=0;r>e;e+=6)if(a[0]=n[e],a[1]=n[e+1],a[2]=n[e+2],a[3]=n[e+3],a[4]=n[e+4],a[5]=n[e+5],s.contains(o.x,o.y))return!0;return!1},i.DRAW_MODES={TRIANGLE_MESH:0,TRIANGLES:1}},{"../core":29}],126:[function(t,e,r){function i(t,e,r){n.call(this,t),this._ready=!0,this.segmentsX=e||10,this.segmentsY=r||10,this.drawMode=n.DRAW_MODES.TRIANGLES,this.refresh()}var n=t("./Mesh");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.refresh=function(){var t=this.segmentsX*this.segmentsY,e=[],r=[],i=[],n=[],o=this.texture,s=this.segmentsX-1,a=this.segmentsY-1,h=0,u=o.width/s,l=o.height/a;for(h=0;t>h;h++){var c=h%this.segmentsX,p=h/this.segmentsX|0;e.push(c*u,p*l),i.push(o._uvs.x0+(o._uvs.x1-o._uvs.x0)*(c/(this.segmentsX-1)),o._uvs.y0+(o._uvs.y3-o._uvs.y0)*(p/(this.segmentsY-1)))}var d=s*a;for(h=0;d>h;h++){var f=h%s,v=h/s|0,g=v*this.segmentsX+f,m=v*this.segmentsX+f+1,y=(v+1)*this.segmentsX+f,x=(v+1)*this.segmentsX+f+1;n.push(g,m,y),n.push(m,x,y)}this.vertices=new Float32Array(e),this.uvs=new Float32Array(i),this.colors=new Float32Array(r),this.indices=new Uint16Array(n)},i.prototype._onTextureUpdate=function(){n.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()}},{"./Mesh":125}],127:[function(t,e,r){function i(t,e){n.call(this,t),this.points=e,this.vertices=new Float32Array(4*e.length),this.uvs=new Float32Array(4*e.length),this.colors=new Float32Array(2*e.length),this.indices=new Uint16Array(2*e.length),this._ready=!0,this.refresh()}var n=t("./Mesh"),o=t("../core");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.refresh=function(){var t=this.points;if(!(t.length<1)&&this._texture._uvs){var e=this.uvs,r=this.indices,i=this.colors,n=this._texture._uvs,s=new o.Point(n.x0,n.y0),a=new o.Point(n.x2-n.x0,n.y2-n.y0);e[0]=0+s.x,e[1]=0+s.y,e[2]=0+s.x,e[3]=1*a.y+s.y,i[0]=1,i[1]=1,r[0]=0,r[1]=1;for(var h,u,l,c=t.length,p=1;c>p;p++)h=t[p],u=4*p,l=p/(c-1),e[u]=l*a.x+s.x,e[u+1]=0+s.y,e[u+2]=l*a.x+s.x,e[u+3]=1*a.y+s.y,u=2*p,i[u]=1,i[u+1]=1,u=2*p,r[u]=u,r[u+1]=u+1;this.dirty=!0}},i.prototype._onTextureUpdate=function(){n.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()},i.prototype.updateTransform=function(){var t=this.points;if(!(t.length<1)){for(var e,r,i,n,o,s,a=t[0],h=0,u=0,l=this.vertices,c=t.length,p=0;c>p;p++)r=t[p],i=4*p,e=p<t.length-1?t[p+1]:r,u=-(e.x-a.x),h=e.y-a.y,n=10*(1-p/(c-1)),n>1&&(n=1),o=Math.sqrt(h*h+u*u),s=this._texture.height/2,h/=o,u/=o,h*=s,u*=s,l[i]=r.x+h,l[i+1]=r.y+u,l[i+2]=r.x-h,l[i+3]=r.y-u,a=r;this.containerUpdateTransform()}}},{"../core":29,"./Mesh":125}],128:[function(t,e,r){e.exports={Mesh:t("./Mesh"),Plane:t("./Plane"),Rope:t("./Rope"),MeshRenderer:t("./webgl/MeshRenderer"),MeshShader:t("./webgl/MeshShader")}},{"./Mesh":125,"./Plane":126,"./Rope":127,"./webgl/MeshRenderer":129,"./webgl/MeshShader":130}],129:[function(t,e,r){function i(t){n.ObjectRenderer.call(this,t),this.indices=new Uint16Array(15e3);for(var e=0,r=0;15e3>e;e+=6,r+=4)this.indices[e+0]=r+0,this.indices[e+1]=r+1,this.indices[e+2]=r+2,this.indices[e+3]=r+0,this.indices[e+4]=r+2,this.indices[e+5]=r+3;this.currentShader=null}var n=t("../../core"),o=t("../Mesh");i.prototype=Object.create(n.ObjectRenderer.prototype),i.prototype.constructor=i,e.exports=i,n.WebGLRenderer.registerPlugin("mesh",i),i.prototype.onContextChange=function(){},i.prototype.render=function(t){t._vertexBuffer||this._initWebGL(t);var e=this.renderer,r=e.gl,i=t._texture.baseTexture,n=t.shader,s=t.drawMode===o.DRAW_MODES.TRIANGLE_MESH?r.TRIANGLE_STRIP:r.TRIANGLES;e.blendModeManager.setBlendMode(t.blendMode),n=n?n.shaders[r.id]||n.getShader(e):e.shaderManager.plugins.meshShader,this.renderer.shaderManager.setShader(n),n.uniforms.translationMatrix.value=t.worldTransform.toArray(!0),n.uniforms.projectionMatrix.value=e.currentRenderTarget.projectionMatrix.toArray(!0),n.uniforms.alpha.value=t.worldAlpha,n.syncUniforms(),t.dirty?(t.dirty=!1,r.bindBuffer(r.ARRAY_BUFFER,t._vertexBuffer),r.bufferData(r.ARRAY_BUFFER,t.vertices,r.STATIC_DRAW),r.vertexAttribPointer(n.attributes.aVertexPosition,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,t._uvBuffer),r.bufferData(r.ARRAY_BUFFER,t.uvs,r.STATIC_DRAW),r.vertexAttribPointer(n.attributes.aTextureCoord,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),i._glTextures[r.id]?r.bindTexture(r.TEXTURE_2D,i._glTextures[r.id]):this.renderer.updateTexture(i),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t._indexBuffer),r.bufferData(r.ELEMENT_ARRAY_BUFFER,t.indices,r.STATIC_DRAW)):(r.bindBuffer(r.ARRAY_BUFFER,t._vertexBuffer),r.bufferSubData(r.ARRAY_BUFFER,0,t.vertices),
r.vertexAttribPointer(n.attributes.aVertexPosition,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,t._uvBuffer),r.vertexAttribPointer(n.attributes.aTextureCoord,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),i._glTextures[r.id]?r.bindTexture(r.TEXTURE_2D,i._glTextures[r.id]):this.renderer.updateTexture(i),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t._indexBuffer),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,0,t.indices)),r.drawElements(s,t.indices.length,r.UNSIGNED_SHORT,0)},i.prototype._initWebGL=function(t){var e=this.renderer.gl;t._vertexBuffer=e.createBuffer(),t._indexBuffer=e.createBuffer(),t._uvBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t._vertexBuffer),e.bufferData(e.ARRAY_BUFFER,t.vertices,e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,t._uvBuffer),e.bufferData(e.ARRAY_BUFFER,t.uvs,e.STATIC_DRAW),t.colors&&(t._colorBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t._colorBuffer),e.bufferData(e.ARRAY_BUFFER,t.colors,e.STATIC_DRAW)),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t._indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,t.indices,e.STATIC_DRAW)},i.prototype.flush=function(){},i.prototype.start=function(){this.currentShader=null},i.prototype.destroy=function(){n.ObjectRenderer.prototype.destroy.call(this)}},{"../../core":29,"../Mesh":125}],130:[function(t,e,r){function i(t){n.Shader.call(this,t,["precision lowp float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"].join("\n"),["precision lowp float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void){","   gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha ;","}"].join("\n"),{alpha:{type:"1f",value:0},translationMatrix:{type:"mat3",value:new Float32Array(9)},projectionMatrix:{type:"mat3",value:new Float32Array(9)}},{aVertexPosition:0,aTextureCoord:0})}var n=t("../../core");i.prototype=Object.create(n.Shader.prototype),i.prototype.constructor=i,e.exports=i,n.ShaderManager.registerPlugin("meshShader",i)},{"../../core":29}],131:[function(t,e,r){Math.sign||(Math.sign=function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1})},{}],132:[function(t,e,r){Object.assign||(Object.assign=t("object-assign"))},{"object-assign":11}],133:[function(t,e,r){t("./Object.assign"),t("./requestAnimationFrame"),t("./Math.sign")},{"./Math.sign":131,"./Object.assign":132,"./requestAnimationFrame":134}],134:[function(t,e,r){(function(t){if(Date.now&&Date.prototype.getTime||(Date.now=function(){return(new Date).getTime()}),!t.performance||!t.performance.now){var e=Date.now();t.performance||(t.performance={}),t.performance.now=function(){return Date.now()-e}}for(var r=Date.now(),i=["ms","moz","webkit","o"],n=0;n<i.length&&!t.requestAnimationFrame;++n)t.requestAnimationFrame=t[i[n]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[i[n]+"CancelAnimationFrame"]||t[i[n]+"CancelRequestAnimationFrame"];t.requestAnimationFrame||(t.requestAnimationFrame=function(t){if("function"!=typeof t)throw new TypeError(t+"is not a function");var e=Date.now(),i=16+r-e;return 0>i&&(i=0),r=e,setTimeout(function(){r=Date.now(),t(performance.now())},i)}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){clearTimeout(t)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[115])(115)});
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Animation = (function () {
            function Animation(name, timelines, duration) {
                if (name == null)
                    throw new Error("name cannot be null.");
                if (timelines == null)
                    throw new Error("timelines cannot be null.");
                this.name = name;
                this.timelines = timelines;
                this.duration = duration;
            }
            Animation.prototype.apply = function (skeleton, lastTime, time, loop, events, alpha, setupPose, mixingOut) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                if (loop && this.duration != 0) {
                    time %= this.duration;
                    if (lastTime > 0)
                        lastTime %= this.duration;
                }
                var timelines = this.timelines;
                for (var i = 0, n = timelines.length; i < n; i++)
                    timelines[i].apply(skeleton, lastTime, time, events, alpha, setupPose, mixingOut);
            };
            Animation.binarySearch = function (values, target, step) {
                if (step === void 0) { step = 1; }
                var low = 0;
                var high = values.length / step - 2;
                if (high == 0)
                    return step;
                var current = high >>> 1;
                while (true) {
                    if (values[(current + 1) * step] <= target)
                        low = current + 1;
                    else
                        high = current;
                    if (low == high)
                        return (low + 1) * step;
                    current = (low + high) >>> 1;
                }
            };
            Animation.linearSearch = function (values, target, step) {
                for (var i = 0, last = values.length - step; i <= last; i += step)
                    if (values[i] > target)
                        return i;
                return -1;
            };
            return Animation;
        }());
        core.Animation = Animation;
        (function (TimelineType) {
            TimelineType[TimelineType["rotate"] = 0] = "rotate";
            TimelineType[TimelineType["translate"] = 1] = "translate";
            TimelineType[TimelineType["scale"] = 2] = "scale";
            TimelineType[TimelineType["shear"] = 3] = "shear";
            TimelineType[TimelineType["attachment"] = 4] = "attachment";
            TimelineType[TimelineType["color"] = 5] = "color";
            TimelineType[TimelineType["deform"] = 6] = "deform";
            TimelineType[TimelineType["event"] = 7] = "event";
            TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
            TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
            TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
            TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
            TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
            TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
        })(core.TimelineType || (core.TimelineType = {}));
        var TimelineType = core.TimelineType;
        var CurveTimeline = (function () {
            function CurveTimeline(frameCount) {
                if (frameCount <= 0)
                    throw new Error("frameCount must be > 0: " + frameCount);
                this.curves = core.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
            }
            CurveTimeline.prototype.getFrameCount = function () {
                return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
            };
            CurveTimeline.prototype.setLinear = function (frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
            };
            CurveTimeline.prototype.setStepped = function (frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
            };
            CurveTimeline.prototype.getCurveType = function (frameIndex) {
                var index = frameIndex * CurveTimeline.BEZIER_SIZE;
                if (index == this.curves.length)
                    return CurveTimeline.LINEAR;
                var type = this.curves[index];
                if (type == CurveTimeline.LINEAR)
                    return CurveTimeline.LINEAR;
                if (type == CurveTimeline.STEPPED)
                    return CurveTimeline.STEPPED;
                return CurveTimeline.BEZIER;
            };
            CurveTimeline.prototype.setCurve = function (frameIndex, cx1, cy1, cx2, cy2) {
                var tmpx = (-cx1 * 2 + cx2) * 0.03, tmpy = (-cy1 * 2 + cy2) * 0.03;
                var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006, dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
                var ddfx = tmpx * 2 + dddfx, ddfy = tmpy * 2 + dddfy;
                var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667, dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var curves = this.curves;
                curves[i++] = CurveTimeline.BEZIER;
                var x = dfx, y = dfy;
                for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    curves[i] = x;
                    curves[i + 1] = y;
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    x += dfx;
                    y += dfy;
                }
            };
            CurveTimeline.prototype.getCurvePercent = function (frameIndex, percent) {
                percent = core.MathUtils.clamp(percent, 0, 1);
                var curves = this.curves;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var type = curves[i];
                if (type == CurveTimeline.LINEAR)
                    return percent;
                if (type == CurveTimeline.STEPPED)
                    return 0;
                i++;
                var x = 0;
                for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    x = curves[i];
                    if (x >= percent) {
                        var prevX = void 0, prevY = void 0;
                        if (i == start) {
                            prevX = 0;
                            prevY = 0;
                        }
                        else {
                            prevX = curves[i - 2];
                            prevY = curves[i - 1];
                        }
                        return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                    }
                }
                var y = curves[i - 1];
                return y + (1 - y) * (percent - x) / (1 - x);
            };
            CurveTimeline.LINEAR = 0;
            CurveTimeline.STEPPED = 1;
            CurveTimeline.BEZIER = 2;
            CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
            return CurveTimeline;
        }());
        core.CurveTimeline = CurveTimeline;
        var RotateTimeline = (function (_super) {
            __extends(RotateTimeline, _super);
            function RotateTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount << 1);
            }
            RotateTimeline.prototype.getPropertyId = function () {
                return (TimelineType.rotate << 24) + this.boneIndex;
            };
            RotateTimeline.prototype.setFrame = function (frameIndex, time, degrees) {
                frameIndex <<= 1;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
            };
            RotateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    if (setupPose)
                        bone.rotation = bone.data.rotation;
                    return;
                }
                if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                    if (setupPose)
                        bone.rotation = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] * alpha;
                    else {
                        var r_1 = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] - bone.rotation;
                        r_1 -= (16384 - ((16384.499999999996 - r_1 / 360) | 0)) * 360;
                        bone.rotation += r_1 * alpha;
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
                var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
                var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
                r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                r = prevRotation + r * percent;
                if (setupPose) {
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation = bone.data.rotation + r * alpha;
                }
                else {
                    r = bone.data.rotation + r - bone.rotation;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation += r * alpha;
                }
            };
            RotateTimeline.ENTRIES = 2;
            RotateTimeline.PREV_TIME = -2;
            RotateTimeline.PREV_ROTATION = -1;
            RotateTimeline.ROTATION = 1;
            return RotateTimeline;
        }(CurveTimeline));
        core.RotateTimeline = RotateTimeline;
        var TranslateTimeline = (function (_super) {
            __extends(TranslateTimeline, _super);
            function TranslateTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
            }
            TranslateTimeline.prototype.getPropertyId = function () {
                return (TimelineType.translate << 24) + this.boneIndex;
            };
            TranslateTimeline.prototype.setFrame = function (frameIndex, time, x, y) {
                frameIndex *= TranslateTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TranslateTimeline.X] = x;
                this.frames[frameIndex + TranslateTimeline.Y] = y;
            };
            TranslateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    if (setupPose) {
                        bone.x = bone.data.x;
                        bone.y = bone.data.y;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                    x = frames[frames.length + TranslateTimeline.PREV_X];
                    y = frames[frames.length + TranslateTimeline.PREV_Y];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                    x = frames[frame + TranslateTimeline.PREV_X];
                    y = frames[frame + TranslateTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                    x += (frames[frame + TranslateTimeline.X] - x) * percent;
                    y += (frames[frame + TranslateTimeline.Y] - y) * percent;
                }
                if (setupPose) {
                    bone.x = bone.data.x + x * alpha;
                    bone.y = bone.data.y + y * alpha;
                }
                else {
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                }
            };
            TranslateTimeline.ENTRIES = 3;
            TranslateTimeline.PREV_TIME = -3;
            TranslateTimeline.PREV_X = -2;
            TranslateTimeline.PREV_Y = -1;
            TranslateTimeline.X = 1;
            TranslateTimeline.Y = 2;
            return TranslateTimeline;
        }(CurveTimeline));
        core.TranslateTimeline = TranslateTimeline;
        var ScaleTimeline = (function (_super) {
            __extends(ScaleTimeline, _super);
            function ScaleTimeline(frameCount) {
                _super.call(this, frameCount);
            }
            ScaleTimeline.prototype.getPropertyId = function () {
                return (TimelineType.scale << 24) + this.boneIndex;
            };
            ScaleTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    if (setupPose) {
                        bone.scaleX = bone.data.scaleX;
                        bone.scaleY = bone.data.scaleY;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                    x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                    y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                    x = frames[frame + ScaleTimeline.PREV_X];
                    y = frames[frame + ScaleTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                    x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                    y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
                }
                if (alpha == 1) {
                    bone.scaleX = x;
                    bone.scaleY = y;
                }
                else {
                    var bx = 0, by = 0;
                    if (setupPose) {
                        bx = bone.data.scaleX;
                        by = bone.data.scaleY;
                    }
                    else {
                        bx = bone.scaleX;
                        by = bone.scaleY;
                    }
                    if (mixingOut) {
                        x = Math.abs(x) * core.MathUtils.signum(bx);
                        y = Math.abs(y) * core.MathUtils.signum(by);
                    }
                    else {
                        bx = Math.abs(bx) * core.MathUtils.signum(x);
                        by = Math.abs(by) * core.MathUtils.signum(y);
                    }
                    bone.scaleX = bx + (x - bx) * alpha;
                    bone.scaleY = by + (y - by) * alpha;
                }
            };
            return ScaleTimeline;
        }(TranslateTimeline));
        core.ScaleTimeline = ScaleTimeline;
        var ShearTimeline = (function (_super) {
            __extends(ShearTimeline, _super);
            function ShearTimeline(frameCount) {
                _super.call(this, frameCount);
            }
            ShearTimeline.prototype.getPropertyId = function () {
                return (TimelineType.shear << 24) + this.boneIndex;
            };
            ShearTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    if (setupPose) {
                        bone.shearX = bone.data.shearX;
                        bone.shearY = bone.data.shearY;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                    x = frames[frames.length + ShearTimeline.PREV_X];
                    y = frames[frames.length + ShearTimeline.PREV_Y];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                    x = frames[frame + ShearTimeline.PREV_X];
                    y = frames[frame + ShearTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                    x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                    y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
                }
                if (setupPose) {
                    bone.shearX = bone.data.shearX + x * alpha;
                    bone.shearY = bone.data.shearY + y * alpha;
                }
                else {
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                }
            };
            return ShearTimeline;
        }(TranslateTimeline));
        core.ShearTimeline = ShearTimeline;
        var ColorTimeline = (function (_super) {
            __extends(ColorTimeline, _super);
            function ColorTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
            }
            ColorTimeline.prototype.getPropertyId = function () {
                return (TimelineType.color << 24) + this.slotIndex;
            };
            ColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a) {
                frameIndex *= ColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + ColorTimeline.R] = r;
                this.frames[frameIndex + ColorTimeline.G] = g;
                this.frames[frameIndex + ColorTimeline.B] = b;
                this.frames[frameIndex + ColorTimeline.A] = a;
            };
            ColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, setupPose, mixingOut) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    if (setupPose)
                        slot.color.setFromColor(slot.data.color);
                    return;
                }
                var r = 0, g = 0, b = 0, a = 0;
                if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + ColorTimeline.PREV_R];
                    g = frames[i + ColorTimeline.PREV_G];
                    b = frames[i + ColorTimeline.PREV_B];
                    a = frames[i + ColorTimeline.PREV_A];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                    r = frames[frame + ColorTimeline.PREV_R];
                    g = frames[frame + ColorTimeline.PREV_G];
                    b = frames[frame + ColorTimeline.PREV_B];
                    a = frames[frame + ColorTimeline.PREV_A];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + ColorTimeline.R] - r) * percent;
                    g += (frames[frame + ColorTimeline.G] - g) * percent;
                    b += (frames[frame + ColorTimeline.B] - b) * percent;
                    a += (frames[frame + ColorTimeline.A] - a) * percent;
                }
                if (alpha == 1)
                    slot.color.set(r, g, b, a);
                else {
                    var color = slot.color;
                    if (setupPose)
                        color.setFromColor(slot.data.color);
                    color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
                }
            };
            ColorTimeline.ENTRIES = 5;
            ColorTimeline.PREV_TIME = -5;
            ColorTimeline.PREV_R = -4;
            ColorTimeline.PREV_G = -3;
            ColorTimeline.PREV_B = -2;
            ColorTimeline.PREV_A = -1;
            ColorTimeline.R = 1;
            ColorTimeline.G = 2;
            ColorTimeline.B = 3;
            ColorTimeline.A = 4;
            return ColorTimeline;
        }(CurveTimeline));
        core.ColorTimeline = ColorTimeline;
        var AttachmentTimeline = (function () {
            function AttachmentTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.attachmentNames = new Array(frameCount);
            }
            AttachmentTimeline.prototype.getPropertyId = function () {
                return (TimelineType.attachment << 24) + this.slotIndex;
            };
            AttachmentTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            AttachmentTimeline.prototype.setFrame = function (frameIndex, time, attachmentName) {
                this.frames[frameIndex] = time;
                this.attachmentNames[frameIndex] = attachmentName;
            };
            AttachmentTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, setupPose, mixingOut) {
                var slot = skeleton.slots[this.slotIndex];
                if (mixingOut && setupPose) {
                    var attachmentName_1 = slot.data.attachmentName;
                    slot.setAttachment(attachmentName_1 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_1));
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (setupPose) {
                        var attachmentName_2 = slot.data.attachmentName;
                        slot.setAttachment(attachmentName_2 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_2));
                    }
                    return;
                }
                var frameIndex = 0;
                if (time >= frames[frames.length - 1])
                    frameIndex = frames.length - 1;
                else
                    frameIndex = Animation.binarySearch(frames, time, 1) - 1;
                var attachmentName = this.attachmentNames[frameIndex];
                skeleton.slots[this.slotIndex]
                    .setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
            };
            return AttachmentTimeline;
        }());
        core.AttachmentTimeline = AttachmentTimeline;
        var DeformTimeline = (function (_super) {
            __extends(DeformTimeline, _super);
            function DeformTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount);
                this.frameVertices = new Array(frameCount);
            }
            DeformTimeline.prototype.getPropertyId = function () {
                return (TimelineType.deform << 24) + this.slotIndex;
            };
            DeformTimeline.prototype.setFrame = function (frameIndex, time, vertices) {
                this.frames[frameIndex] = time;
                this.frameVertices[frameIndex] = vertices;
            };
            DeformTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var slot = skeleton.slots[this.slotIndex];
                var slotAttachment = slot.getAttachment();
                if (!(slotAttachment instanceof core.VertexAttachment) || !slotAttachment.applyDeform(this.attachment))
                    return;
                var frames = this.frames;
                var verticesArray = slot.attachmentVertices;
                if (time < frames[0]) {
                    if (setupPose)
                        core.Utils.setArraySize(verticesArray, 0);
                    return;
                }
                var frameVertices = this.frameVertices;
                var vertexCount = frameVertices[0].length;
                if (verticesArray.length != vertexCount)
                    alpha = 1;
                var vertices = core.Utils.setArraySize(verticesArray, vertexCount);
                if (time >= frames[frames.length - 1]) {
                    var lastVertices = frameVertices[frames.length - 1];
                    if (alpha == 1) {
                        core.Utils.arrayCopy(lastVertices, 0, vertices, 0, vertexCount);
                    }
                    else if (setupPose) {
                        var vertexAttachment = slotAttachment;
                        if (vertexAttachment.bones == null) {
                            var setupVertices = vertexAttachment.vertices;
                            for (var i = 0; i < vertexCount; i++) {
                                var setup = setupVertices[i];
                                vertices[i] = setup + (lastVertices[i] - setup) * alpha;
                            }
                        }
                        else {
                            for (var i = 0; i < vertexCount; i++)
                                vertices[i] = lastVertices[i] * alpha;
                        }
                    }
                    else {
                        for (var i = 0; i < vertexCount; i++)
                            vertices[i] += (lastVertices[i] - vertices[i]) * alpha;
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time);
                var prevVertices = frameVertices[frame - 1];
                var nextVertices = frameVertices[frame];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
                if (alpha == 1) {
                    for (var i = 0; i < vertexCount; i++) {
                        var prev = prevVertices[i];
                        vertices[i] = prev + (nextVertices[i] - prev) * percent;
                    }
                }
                else if (setupPose) {
                    var vertexAttachment = slotAttachment;
                    if (vertexAttachment.bones == null) {
                        var setupVertices = vertexAttachment.vertices;
                        for (var i = 0; i < vertexCount; i++) {
                            var prev = prevVertices[i], setup = setupVertices[i];
                            vertices[i] = setup + (prev + (nextVertices[i] - prev) * percent - setup) * alpha;
                        }
                    }
                    else {
                        for (var i = 0; i < vertexCount; i++) {
                            var prev = prevVertices[i];
                            vertices[i] = (prev + (nextVertices[i] - prev) * percent) * alpha;
                        }
                    }
                }
                else {
                    for (var i = 0; i < vertexCount; i++) {
                        var prev = prevVertices[i];
                        vertices[i] += (prev + (nextVertices[i] - prev) * percent - vertices[i]) * alpha;
                    }
                }
            };
            return DeformTimeline;
        }(CurveTimeline));
        core.DeformTimeline = DeformTimeline;
        var EventTimeline = (function () {
            function EventTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.events = new Array(frameCount);
            }
            EventTimeline.prototype.getPropertyId = function () {
                return TimelineType.event << 24;
            };
            EventTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            EventTimeline.prototype.setFrame = function (frameIndex, event) {
                this.frames[frameIndex] = event.time;
                this.events[frameIndex] = event;
            };
            EventTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                if (firedEvents == null)
                    return;
                var frames = this.frames;
                var frameCount = this.frames.length;
                if (lastTime > time) {
                    this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, setupPose, mixingOut);
                    lastTime = -1;
                }
                else if (lastTime >= frames[frameCount - 1])
                    return;
                if (time < frames[0])
                    return;
                var frame = 0;
                if (lastTime < frames[0])
                    frame = 0;
                else {
                    frame = Animation.binarySearch(frames, lastTime);
                    var frameTime = frames[frame];
                    while (frame > 0) {
                        if (frames[frame - 1] != frameTime)
                            break;
                        frame--;
                    }
                }
                for (; frame < frameCount && time >= frames[frame]; frame++)
                    firedEvents.push(this.events[frame]);
            };
            return EventTimeline;
        }());
        core.EventTimeline = EventTimeline;
        var DrawOrderTimeline = (function () {
            function DrawOrderTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.drawOrders = new Array(frameCount);
            }
            DrawOrderTimeline.prototype.getPropertyId = function () {
                return TimelineType.drawOrder << 24;
            };
            DrawOrderTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            DrawOrderTimeline.prototype.setFrame = function (frameIndex, time, drawOrder) {
                this.frames[frameIndex] = time;
                this.drawOrders[frameIndex] = drawOrder;
            };
            DrawOrderTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var drawOrder = skeleton.drawOrder;
                var slots = skeleton.slots;
                if (mixingOut && setupPose) {
                    core.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (setupPose)
                        core.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frame = 0;
                if (time >= frames[frames.length - 1])
                    frame = frames.length - 1;
                else
                    frame = Animation.binarySearch(frames, time) - 1;
                var drawOrderToSetupIndex = this.drawOrders[frame];
                if (drawOrderToSetupIndex == null)
                    core.Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);
                else {
                    for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++)
                        drawOrder[i] = slots[drawOrderToSetupIndex[i]];
                }
            };
            return DrawOrderTimeline;
        }());
        core.DrawOrderTimeline = DrawOrderTimeline;
        var IkConstraintTimeline = (function (_super) {
            __extends(IkConstraintTimeline, _super);
            function IkConstraintTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
            }
            IkConstraintTimeline.prototype.getPropertyId = function () {
                return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
            };
            IkConstraintTimeline.prototype.setFrame = function (frameIndex, time, mix, bendDirection) {
                frameIndex *= IkConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
                this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
            };
            IkConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
                if (time < frames[0]) {
                    if (setupPose) {
                        constraint.mix = constraint.data.mix;
                        constraint.bendDirection = constraint.data.bendDirection;
                    }
                    return;
                }
                if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                    if (setupPose) {
                        constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                        constraint.bendDirection = mixingOut ? constraint.data.bendDirection
                            : frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    else {
                        constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                        if (!mixingOut)
                            constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
                var mix = frames[frame + IkConstraintTimeline.PREV_MIX];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));
                if (setupPose) {
                    constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                    constraint.bendDirection = mixingOut ? constraint.data.bendDirection : frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
                else {
                    constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                    if (!mixingOut)
                        constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
            };
            IkConstraintTimeline.ENTRIES = 3;
            IkConstraintTimeline.PREV_TIME = -3;
            IkConstraintTimeline.PREV_MIX = -2;
            IkConstraintTimeline.PREV_BEND_DIRECTION = -1;
            IkConstraintTimeline.MIX = 1;
            IkConstraintTimeline.BEND_DIRECTION = 2;
            return IkConstraintTimeline;
        }(CurveTimeline));
        core.IkConstraintTimeline = IkConstraintTimeline;
        var TransformConstraintTimeline = (function (_super) {
            __extends(TransformConstraintTimeline, _super);
            function TransformConstraintTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
            }
            TransformConstraintTimeline.prototype.getPropertyId = function () {
                return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
            };
            TransformConstraintTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
                frameIndex *= TransformConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
                this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
                this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
            };
            TransformConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
                if (time < frames[0]) {
                    if (setupPose) {
                        var data = constraint.data;
                        constraint.rotateMix = data.rotateMix;
                        constraint.translateMix = data.rotateMix;
                        constraint.scaleMix = data.scaleMix;
                        constraint.shearMix = data.shearMix;
                    }
                    return;
                }
                var rotate = 0, translate = 0, scale = 0, shear = 0;
                if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                    var i = frames.length;
                    rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                    rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                    scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                    shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
                }
                if (setupPose) {
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix + (rotate - data.rotateMix) * alpha;
                    constraint.translateMix = data.translateMix + (translate - data.translateMix) * alpha;
                    constraint.scaleMix = data.scaleMix + (scale - data.scaleMix) * alpha;
                    constraint.shearMix = data.shearMix + (shear - data.shearMix) * alpha;
                }
                else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                    constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                    constraint.shearMix += (shear - constraint.shearMix) * alpha;
                }
            };
            TransformConstraintTimeline.ENTRIES = 5;
            TransformConstraintTimeline.PREV_TIME = -5;
            TransformConstraintTimeline.PREV_ROTATE = -4;
            TransformConstraintTimeline.PREV_TRANSLATE = -3;
            TransformConstraintTimeline.PREV_SCALE = -2;
            TransformConstraintTimeline.PREV_SHEAR = -1;
            TransformConstraintTimeline.ROTATE = 1;
            TransformConstraintTimeline.TRANSLATE = 2;
            TransformConstraintTimeline.SCALE = 3;
            TransformConstraintTimeline.SHEAR = 4;
            return TransformConstraintTimeline;
        }(CurveTimeline));
        core.TransformConstraintTimeline = TransformConstraintTimeline;
        var PathConstraintPositionTimeline = (function (_super) {
            __extends(PathConstraintPositionTimeline, _super);
            function PathConstraintPositionTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
            }
            PathConstraintPositionTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
            };
            PathConstraintPositionTimeline.prototype.setFrame = function (frameIndex, time, value) {
                frameIndex *= PathConstraintPositionTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
            };
            PathConstraintPositionTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    if (setupPose)
                        constraint.position = constraint.data.position;
                    return;
                }
                var position = 0;
                if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES])
                    position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                    position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                    position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
                }
                if (setupPose)
                    constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
                else
                    constraint.position += (position - constraint.position) * alpha;
            };
            PathConstraintPositionTimeline.ENTRIES = 2;
            PathConstraintPositionTimeline.PREV_TIME = -2;
            PathConstraintPositionTimeline.PREV_VALUE = -1;
            PathConstraintPositionTimeline.VALUE = 1;
            return PathConstraintPositionTimeline;
        }(CurveTimeline));
        core.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
        var PathConstraintSpacingTimeline = (function (_super) {
            __extends(PathConstraintSpacingTimeline, _super);
            function PathConstraintSpacingTimeline(frameCount) {
                _super.call(this, frameCount);
            }
            PathConstraintSpacingTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
            };
            PathConstraintSpacingTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    if (setupPose)
                        constraint.spacing = constraint.data.spacing;
                    return;
                }
                var spacing = 0;
                if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES])
                    spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                    spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                    spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
                }
                if (setupPose)
                    constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
                else
                    constraint.spacing += (spacing - constraint.spacing) * alpha;
            };
            return PathConstraintSpacingTimeline;
        }(PathConstraintPositionTimeline));
        core.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
        var PathConstraintMixTimeline = (function (_super) {
            __extends(PathConstraintMixTimeline, _super);
            function PathConstraintMixTimeline(frameCount) {
                _super.call(this, frameCount);
                this.frames = core.Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
            }
            PathConstraintMixTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
            };
            PathConstraintMixTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix) {
                frameIndex *= PathConstraintMixTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
            };
            PathConstraintMixTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, setupPose, mixingOut) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    if (setupPose) {
                        constraint.rotateMix = constraint.data.rotateMix;
                        constraint.translateMix = constraint.data.translateMix;
                    }
                    return;
                }
                var rotate = 0, translate = 0;
                if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                    rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                    rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
                }
                if (setupPose) {
                    constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                    constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
                }
                else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                }
            };
            PathConstraintMixTimeline.ENTRIES = 3;
            PathConstraintMixTimeline.PREV_TIME = -3;
            PathConstraintMixTimeline.PREV_ROTATE = -2;
            PathConstraintMixTimeline.PREV_TRANSLATE = -1;
            PathConstraintMixTimeline.ROTATE = 1;
            PathConstraintMixTimeline.TRANSLATE = 2;
            return PathConstraintMixTimeline;
        }(CurveTimeline));
        core.PathConstraintMixTimeline = PathConstraintMixTimeline;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AnimationState = (function () {
            function AnimationState(data) {
                this.tracks = new Array();
                this.events = new Array();
                this.listeners = new Array();
                this.queue = new EventQueue(this);
                this.propertyIDs = new core.IntSet();
                this.animationsChanged = false;
                this.timeScale = 1;
                this.trackEntryPool = new core.Pool(function () { return new TrackEntry(); });
                this.data = data;
            }
            AnimationState.prototype.update = function (delta) {
                delta *= this.timeScale;
                var tracks = this.tracks;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null)
                        continue;
                    current.animationLast = current.nextAnimationLast;
                    current.trackLast = current.nextTrackLast;
                    var currentDelta = delta * current.timeScale;
                    if (current.delay > 0) {
                        current.delay -= currentDelta;
                        if (current.delay > 0)
                            continue;
                        currentDelta = -current.delay;
                        current.delay = 0;
                    }
                    var next = current.next;
                    if (next != null) {
                        var nextTime = current.trackLast - next.delay;
                        if (nextTime >= 0) {
                            next.delay = 0;
                            next.trackTime = nextTime + delta * next.timeScale;
                            current.trackTime += currentDelta;
                            this.setCurrent(i, next, true);
                            while (next.mixingFrom != null) {
                                next.mixTime += currentDelta;
                                next = next.mixingFrom;
                            }
                            continue;
                        }
                    }
                    else {
                        if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                            tracks[i] = null;
                            this.queue.end(current);
                            this.disposeNext(current);
                            continue;
                        }
                    }
                    this.updateMixingFrom(current, delta);
                    current.trackTime += currentDelta;
                }
                this.queue.drain();
            };
            AnimationState.prototype.updateMixingFrom = function (entry, delta) {
                var from = entry.mixingFrom;
                if (from == null)
                    return;
                this.updateMixingFrom(from, delta);
                if (entry.mixTime >= entry.mixDuration && from.mixingFrom != null && entry.mixTime > 0) {
                    entry.mixingFrom = null;
                    this.queue.end(from);
                    return;
                }
                from.animationLast = from.nextAnimationLast;
                from.trackLast = from.nextTrackLast;
                from.trackTime += delta * from.timeScale;
                entry.mixTime += delta * from.timeScale;
            };
            AnimationState.prototype.apply = function (skeleton) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                if (this.animationsChanged)
                    this._animationsChanged();
                var events = this.events;
                var tracks = this.tracks;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null || current.delay > 0)
                        continue;
                    var mix = current.alpha;
                    if (current.mixingFrom != null)
                        mix *= this.applyMixingFrom(current, skeleton);
                    else if (current.trackTime >= current.trackEnd)
                        mix = 0;
                    var animationLast = current.animationLast, animationTime = current.getAnimationTime();
                    var timelineCount = current.animation.timelines.length;
                    var timelines = current.animation.timelines;
                    if (mix == 1) {
                        for (var ii = 0; ii < timelineCount; ii++)
                            timelines[ii].apply(skeleton, animationLast, animationTime, events, 1, true, false);
                    }
                    else {
                        var firstFrame = current.timelinesRotation.length == 0;
                        if (firstFrame)
                            core.Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                        var timelinesRotation = current.timelinesRotation;
                        var timelinesFirst = current.timelinesFirst;
                        for (var ii = 0; ii < timelineCount; ii++) {
                            var timeline = timelines[ii];
                            if (timeline instanceof core.RotateTimeline) {
                                this.applyRotateTimeline(timeline, skeleton, animationTime, mix, timelinesFirst[ii], timelinesRotation, ii << 1, firstFrame);
                            }
                            else
                                timeline.apply(skeleton, animationLast, animationTime, events, mix, timelinesFirst[ii], false);
                        }
                    }
                    this.queueEvents(current, animationTime);
                    events.length = 0;
                    current.nextAnimationLast = animationTime;
                    current.nextTrackLast = current.trackTime;
                }
                this.queue.drain();
            };
            AnimationState.prototype.applyMixingFrom = function (entry, skeleton) {
                var from = entry.mixingFrom;
                if (from.mixingFrom != null)
                    this.applyMixingFrom(from, skeleton);
                var mix = 0;
                if (entry.mixDuration == 0)
                    mix = 1;
                else {
                    mix = entry.mixTime / entry.mixDuration;
                    if (mix > 1)
                        mix = 1;
                }
                var events = mix < from.eventThreshold ? this.events : null;
                var attachments = mix < from.attachmentThreshold, drawOrder = mix < from.drawOrderThreshold;
                var animationLast = from.animationLast, animationTime = from.getAnimationTime();
                var timelineCount = from.animation.timelines.length;
                var timelines = from.animation.timelines;
                var timelinesFirst = from.timelinesFirst;
                var alpha = from.alpha * entry.mixAlpha * (1 - mix);
                var firstFrame = from.timelinesRotation.length == 0;
                if (firstFrame)
                    core.Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
                var timelinesRotation = from.timelinesRotation;
                for (var i = 0; i < timelineCount; i++) {
                    var timeline = timelines[i];
                    var setupPose = timelinesFirst[i];
                    if (timeline instanceof core.RotateTimeline)
                        this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, setupPose, timelinesRotation, i << 1, firstFrame);
                    else {
                        if (!setupPose) {
                            if (!attachments && timeline instanceof core.AttachmentTimeline)
                                continue;
                            if (!drawOrder && timeline instanceof core.DrawOrderTimeline)
                                continue;
                        }
                        timeline.apply(skeleton, animationLast, animationTime, events, alpha, setupPose, true);
                    }
                }
                if (entry.mixDuration > 0)
                    this.queueEvents(from, animationTime);
                this.events.length = 0;
                from.nextAnimationLast = animationTime;
                from.nextTrackLast = from.trackTime;
                return mix;
            };
            AnimationState.prototype.applyRotateTimeline = function (timeline, skeleton, time, alpha, setupPose, timelinesRotation, i, firstFrame) {
                if (firstFrame)
                    timelinesRotation[i] = 0;
                if (alpha == 1) {
                    timeline.apply(skeleton, 0, time, null, 1, setupPose, false);
                    return;
                }
                var rotateTimeline = timeline;
                var frames = rotateTimeline.frames;
                var bone = skeleton.bones[rotateTimeline.boneIndex];
                if (time < frames[0]) {
                    if (setupPose)
                        bone.rotation = bone.data.rotation;
                    return;
                }
                var r2 = 0;
                if (time >= frames[frames.length - core.RotateTimeline.ENTRIES])
                    r2 = bone.data.rotation + frames[frames.length + core.RotateTimeline.PREV_ROTATION];
                else {
                    var frame = core.Animation.binarySearch(frames, time, core.RotateTimeline.ENTRIES);
                    var prevRotation = frames[frame + core.RotateTimeline.PREV_ROTATION];
                    var frameTime = frames[frame];
                    var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + core.RotateTimeline.PREV_TIME] - frameTime));
                    r2 = frames[frame + core.RotateTimeline.ROTATION] - prevRotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                    r2 = prevRotation + r2 * percent + bone.data.rotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                }
                var r1 = setupPose ? bone.data.rotation : bone.rotation;
                var total = 0, diff = r2 - r1;
                if (diff == 0) {
                    total = timelinesRotation[i];
                }
                else {
                    diff -= (16384 - ((16384.499999999996 - diff / 360) | 0)) * 360;
                    var lastTotal = 0, lastDiff = 0;
                    if (firstFrame) {
                        lastTotal = 0;
                        lastDiff = diff;
                    }
                    else {
                        lastTotal = timelinesRotation[i];
                        lastDiff = timelinesRotation[i + 1];
                    }
                    var current = diff > 0, dir = lastTotal >= 0;
                    if (core.MathUtils.signum(lastDiff) != core.MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                        if (Math.abs(lastTotal) > 180)
                            lastTotal += 360 * core.MathUtils.signum(lastTotal);
                        dir = current;
                    }
                    total = diff + lastTotal - lastTotal % 360;
                    if (dir != current)
                        total += 360 * core.MathUtils.signum(lastTotal);
                    timelinesRotation[i] = total;
                }
                timelinesRotation[i + 1] = diff;
                r1 += total * alpha;
                bone.rotation = r1 - (16384 - ((16384.499999999996 - r1 / 360) | 0)) * 360;
            };
            AnimationState.prototype.queueEvents = function (entry, animationTime) {
                var animationStart = entry.animationStart, animationEnd = entry.animationEnd;
                var duration = animationEnd - animationStart;
                var trackLastWrapped = entry.trackLast % duration;
                var events = this.events;
                var i = 0, n = events.length;
                for (; i < n; i++) {
                    var event_1 = events[i];
                    if (event_1.time < trackLastWrapped)
                        break;
                    if (event_1.time > animationEnd)
                        continue;
                    this.queue.event(entry, event_1);
                }
                if (entry.loop ? (trackLastWrapped > entry.trackTime % duration)
                    : (animationTime >= animationEnd && entry.animationLast < animationEnd)) {
                    this.queue.complete(entry);
                }
                for (; i < n; i++) {
                    var event_2 = events[i];
                    if (event_2.time < animationStart)
                        continue;
                    this.queue.event(entry, events[i]);
                }
            };
            AnimationState.prototype.clearTracks = function () {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++)
                    this.clearTrack(i);
                this.tracks.length = 0;
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            };
            AnimationState.prototype.clearTrack = function (trackIndex) {
                if (trackIndex >= this.tracks.length)
                    return;
                var current = this.tracks[trackIndex];
                if (current == null)
                    return;
                this.queue.end(current);
                this.disposeNext(current);
                var entry = current;
                while (true) {
                    var from = entry.mixingFrom;
                    if (from == null)
                        break;
                    this.queue.end(from);
                    entry.mixingFrom = null;
                    entry = from;
                }
                this.tracks[current.trackIndex] = null;
                this.queue.drain();
            };
            AnimationState.prototype.setCurrent = function (index, current, interrupt) {
                var from = this.expandToIndex(index);
                this.tracks[index] = current;
                if (from != null) {
                    if (interrupt)
                        this.queue.interrupt(from);
                    current.mixingFrom = from;
                    current.mixTime = 0;
                    from.timelinesRotation.length = 0;
                    if (from.mixingFrom != null && from.mixDuration > 0)
                        current.mixAlpha *= Math.min(from.mixTime / from.mixDuration, 1);
                }
                this.queue.start(current);
            };
            AnimationState.prototype.setAnimation = function (trackIndex, animationName, loop) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null)
                    throw new Error("Animation not found: " + animationName);
                return this.setAnimationWith(trackIndex, animation, loop);
            };
            AnimationState.prototype.setAnimationWith = function (trackIndex, animation, loop) {
                if (animation == null)
                    throw new Error("animation cannot be null.");
                var interrupt = true;
                var current = this.expandToIndex(trackIndex);
                if (current != null) {
                    if (current.nextTrackLast == -1) {
                        this.tracks[trackIndex] = current.mixingFrom;
                        this.queue.interrupt(current);
                        this.queue.end(current);
                        this.disposeNext(current);
                        current = current.mixingFrom;
                        interrupt = false;
                    }
                    else
                        this.disposeNext(current);
                }
                var entry = this.trackEntry(trackIndex, animation, loop, current);
                this.setCurrent(trackIndex, entry, interrupt);
                this.queue.drain();
                return entry;
            };
            AnimationState.prototype.addAnimation = function (trackIndex, animationName, loop, delay) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null)
                    throw new Error("Animation not found: " + animationName);
                return this.addAnimationWith(trackIndex, animation, loop, delay);
            };
            AnimationState.prototype.addAnimationWith = function (trackIndex, animation, loop, delay) {
                if (animation == null)
                    throw new Error("animation cannot be null.");
                var last = this.expandToIndex(trackIndex);
                if (last != null) {
                    while (last.next != null)
                        last = last.next;
                }
                var entry = this.trackEntry(trackIndex, animation, loop, last);
                if (last == null) {
                    this.setCurrent(trackIndex, entry, true);
                    this.queue.drain();
                }
                else {
                    last.next = entry;
                    if (delay <= 0) {
                        var duration = last.animationEnd - last.animationStart;
                        if (duration != 0)
                            delay += duration * (1 + ((last.trackTime / duration) | 0)) - this.data.getMix(last.animation, animation);
                        else
                            delay = 0;
                    }
                }
                entry.delay = delay;
                return entry;
            };
            AnimationState.prototype.setEmptyAnimation = function (trackIndex, mixDuration) {
                var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            };
            AnimationState.prototype.addEmptyAnimation = function (trackIndex, mixDuration, delay) {
                if (delay <= 0)
                    delay -= mixDuration;
                var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            };
            AnimationState.prototype.setEmptyAnimations = function (mixDuration) {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var current = this.tracks[i];
                    if (current != null)
                        this.setEmptyAnimation(current.trackIndex, mixDuration);
                }
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            };
            AnimationState.prototype.expandToIndex = function (index) {
                if (index < this.tracks.length)
                    return this.tracks[index];
                core.Utils.ensureArrayCapacity(this.tracks, index - this.tracks.length + 1, null);
                this.tracks.length = index + 1;
                return null;
            };
            AnimationState.prototype.trackEntry = function (trackIndex, animation, loop, last) {
                var entry = this.trackEntryPool.obtain();
                entry.trackIndex = trackIndex;
                entry.animation = animation;
                entry.loop = loop;
                entry.eventThreshold = 0;
                entry.attachmentThreshold = 0;
                entry.drawOrderThreshold = 0;
                entry.animationStart = 0;
                entry.animationEnd = animation.duration;
                entry.animationLast = -1;
                entry.nextAnimationLast = -1;
                entry.delay = 0;
                entry.trackTime = 0;
                entry.trackLast = -1;
                entry.nextTrackLast = -1;
                entry.trackEnd = Number.MAX_VALUE;
                entry.timeScale = 1;
                entry.alpha = 1;
                entry.mixAlpha = 1;
                entry.mixTime = 0;
                entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
                return entry;
            };
            AnimationState.prototype.disposeNext = function (entry) {
                var next = entry.next;
                while (next != null) {
                    this.queue.dispose(next);
                    next = next.next;
                }
                entry.next = null;
            };
            AnimationState.prototype._animationsChanged = function () {
                this.animationsChanged = false;
                var propertyIDs = this.propertyIDs;
                var i = 0, n = this.tracks.length;
                propertyIDs.clear();
                for (; i < n; i++) {
                    var entry = this.tracks[i];
                    if (entry == null)
                        continue;
                    this.setTimelinesFirst(entry);
                    i++;
                    break;
                }
                for (; i < n; i++) {
                    var entry = this.tracks[i];
                    if (entry != null)
                        this.checkTimelinesFirst(entry);
                }
            };
            AnimationState.prototype.setTimelinesFirst = function (entry) {
                if (entry.mixingFrom != null) {
                    this.setTimelinesFirst(entry.mixingFrom);
                    this.checkTimelinesUsage(entry, entry.timelinesFirst);
                    return;
                }
                var propertyIDs = this.propertyIDs;
                var timelines = entry.animation.timelines;
                var n = timelines.length;
                var usage = core.Utils.setArraySize(entry.timelinesFirst, n, false);
                for (var i = 0; i < n; i++) {
                    propertyIDs.add(timelines[i].getPropertyId());
                    usage[i] = true;
                }
            };
            AnimationState.prototype.checkTimelinesFirst = function (entry) {
                if (entry.mixingFrom != null)
                    this.checkTimelinesFirst(entry.mixingFrom);
                this.checkTimelinesUsage(entry, entry.timelinesFirst);
            };
            AnimationState.prototype.checkTimelinesUsage = function (entry, usageArray) {
                var propertyIDs = this.propertyIDs;
                var timelines = entry.animation.timelines;
                var n = timelines.length;
                var usage = core.Utils.setArraySize(usageArray, n);
                for (var i = 0; i < n; i++)
                    usage[i] = propertyIDs.add(timelines[i].getPropertyId());
            };
            AnimationState.prototype.getCurrent = function (trackIndex) {
                if (trackIndex >= this.tracks.length)
                    return null;
                return this.tracks[trackIndex];
            };
            AnimationState.prototype.addListener = function (listener) {
                if (listener == null)
                    throw new Error("listener cannot be null.");
                this.listeners.push(listener);
            };
            AnimationState.prototype.removeListener = function (listener) {
                var index = this.listeners.indexOf(listener);
                if (index >= 0)
                    this.listeners.splice(index, 1);
            };
            AnimationState.prototype.clearListeners = function () {
                this.listeners.length = 0;
            };
            AnimationState.prototype.clearListenerNotifications = function () {
                this.queue.clear();
            };
            AnimationState.prototype.setAnimationByName = function (trackIndex, animationName, loop) {
                if (!AnimationState.deprecatedWarning1) {
                    AnimationState.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: AnimationState.setAnimationByName is deprecated, please use setAnimation from now on.");
                }
                this.setAnimation(trackIndex, animationName, loop);
            };
            AnimationState.prototype.addAnimationByName = function (trackIndex, animationName, loop, delay) {
                if (!AnimationState.deprecatedWarning2) {
                    AnimationState.deprecatedWarning2 = true;
                    console.warn("Deprecation Warning: AnimationState.addAnimationByName is deprecated, please use addAnimation from now on.");
                }
                this.addAnimation(trackIndex, animationName, loop, delay);
            };
            AnimationState.prototype.hasAnimationByName = function (animationName) {
                if (!AnimationState.deprecatedWarning3) {
                    AnimationState.deprecatedWarning3 = true;
                    console.warn("Deprecation Warning: AnimationState.hasAnimationByName is deprecated, please use hasAnimation from now on.");
                }
                var animation = this.data.skeletonData.findAnimation(animationName);
                return animation !== null;
            };
            AnimationState.emptyAnimation = new core.Animation("<empty>", [], 0);
            AnimationState.deprecatedWarning1 = false;
            AnimationState.deprecatedWarning2 = false;
            AnimationState.deprecatedWarning3 = false;
            return AnimationState;
        }());
        core.AnimationState = AnimationState;
        var TrackEntry = (function () {
            function TrackEntry() {
                this.timelinesFirst = new Array();
                this.timelinesRotation = new Array();
            }
            TrackEntry.prototype.reset = function () {
                this.next = null;
                this.mixingFrom = null;
                this.animation = null;
                this.listener = null;
                this.timelinesFirst.length = 0;
                this.timelinesRotation.length = 0;
            };
            TrackEntry.prototype.getAnimationTime = function () {
                if (this.loop) {
                    var duration = this.animationEnd - this.animationStart;
                    if (duration == 0)
                        return this.animationStart;
                    return (this.trackTime % duration) + this.animationStart;
                }
                return Math.min(this.trackTime + this.animationStart, this.animationEnd);
            };
            TrackEntry.prototype.setAnimationLast = function (animationLast) {
                this.animationLast = animationLast;
                this.nextAnimationLast = animationLast;
            };
            TrackEntry.prototype.isComplete = function () {
                return this.trackTime >= this.animationEnd - this.animationStart;
            };
            TrackEntry.prototype.resetRotationDirections = function () {
                this.timelinesRotation.length = 0;
            };
            Object.defineProperty(TrackEntry.prototype, "time", {
                get: function () {
                    if (!TrackEntry.deprecatedWarning1) {
                        TrackEntry.deprecatedWarning1 = true;
                        console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                    }
                    return this.trackTime;
                },
                set: function (value) {
                    if (!TrackEntry.deprecatedWarning1) {
                        TrackEntry.deprecatedWarning1 = true;
                        console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                    }
                    this.trackTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TrackEntry.prototype, "endTime", {
                get: function () {
                    if (!TrackEntry.deprecatedWarning2) {
                        TrackEntry.deprecatedWarning2 = true;
                        console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                    }
                    return this.trackTime;
                },
                set: function (value) {
                    if (!TrackEntry.deprecatedWarning2) {
                        TrackEntry.deprecatedWarning2 = true;
                        console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                    }
                    this.trackTime = value;
                },
                enumerable: true,
                configurable: true
            });
            TrackEntry.prototype.loopsCount = function () {
                return Math.floor(this.trackTime / this.trackEnd);
            };
            TrackEntry.deprecatedWarning1 = false;
            TrackEntry.deprecatedWarning2 = false;
            return TrackEntry;
        }());
        core.TrackEntry = TrackEntry;
        var EventQueue = (function () {
            function EventQueue(animState) {
                this.objects = [];
                this.drainDisabled = false;
                this.animState = animState;
            }
            EventQueue.prototype.start = function (entry) {
                this.objects.push(EventType.start);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            };
            EventQueue.prototype.interrupt = function (entry) {
                this.objects.push(EventType.interrupt);
                this.objects.push(entry);
            };
            EventQueue.prototype.end = function (entry) {
                this.objects.push(EventType.end);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            };
            EventQueue.prototype.dispose = function (entry) {
                this.objects.push(EventType.dispose);
                this.objects.push(entry);
            };
            EventQueue.prototype.complete = function (entry) {
                this.objects.push(EventType.complete);
                this.objects.push(entry);
            };
            EventQueue.prototype.event = function (entry, event) {
                this.objects.push(EventType.event);
                this.objects.push(entry);
                this.objects.push(event);
            };
            EventQueue.prototype.deprecateStuff = function () {
                if (!EventQueue.deprecatedWarning1) {
                    EventQueue.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: onComplete, onStart, onEnd, onEvent art deprecated, please use listeners from now on. 'state.addListener({ complete: function(track, event) { } })'");
                }
                return true;
            };
            EventQueue.prototype.drain = function () {
                if (this.drainDisabled)
                    return;
                this.drainDisabled = true;
                var objects = this.objects;
                var listeners = this.animState.listeners;
                for (var i = 0; i < objects.length; i += 2) {
                    var type = objects[i];
                    var entry = objects[i + 1];
                    switch (type) {
                        case EventType.start:
                            if (entry.listener != null && entry.listener.start)
                                entry.listener.start(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].start)
                                    listeners[ii].start(entry);
                            entry.onStart && this.deprecateStuff() && entry.onStart(entry.trackIndex);
                            this.animState.onStart && this.deprecateStuff() && this.deprecateStuff && this.animState.onStart(entry.trackIndex);
                            break;
                        case EventType.interrupt:
                            if (entry.listener != null && entry.listener.interrupt)
                                entry.listener.interrupt(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].interrupt)
                                    listeners[ii].interrupt(entry);
                            break;
                        case EventType.end:
                            if (entry.listener != null && entry.listener.end)
                                entry.listener.end(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].end)
                                    listeners[ii].end(entry);
                            entry.onEnd && this.deprecateStuff() && entry.onEnd(entry.trackIndex);
                            this.animState.onEnd && this.deprecateStuff() && this.animState.onEnd(entry.trackIndex);
                        case EventType.dispose:
                            if (entry.listener != null && entry.listener.dispose)
                                entry.listener.dispose(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].dispose)
                                    listeners[ii].dispose(entry);
                            this.animState.trackEntryPool.free(entry);
                            break;
                        case EventType.complete:
                            if (entry.listener != null && entry.listener.complete)
                                entry.listener.complete(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].complete)
                                    listeners[ii].complete(entry);
                            var count = core.MathUtils.toInt(entry.loopsCount());
                            entry.onComplete && this.deprecateStuff() && entry.onComplete(entry.trackIndex, count);
                            this.animState.onComplete && this.deprecateStuff() && this.animState.onComplete(entry.trackIndex, count);
                            break;
                        case EventType.event:
                            var event_3 = objects[i++ + 2];
                            if (entry.listener != null && entry.listener.event)
                                entry.listener.event(entry, event_3);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].event)
                                    listeners[ii].event(entry, event_3);
                            entry.onEvent && this.deprecateStuff() && entry.onEvent(entry.trackIndex, event_3);
                            this.animState.onEvent && this.deprecateStuff() && this.animState.onEvent(entry.trackIndex, event_3);
                            break;
                    }
                }
                this.clear();
                this.drainDisabled = false;
            };
            EventQueue.prototype.clear = function () {
                this.objects.length = 0;
            };
            EventQueue.deprecatedWarning1 = false;
            return EventQueue;
        }());
        core.EventQueue = EventQueue;
        (function (EventType) {
            EventType[EventType["start"] = 0] = "start";
            EventType[EventType["interrupt"] = 1] = "interrupt";
            EventType[EventType["end"] = 2] = "end";
            EventType[EventType["dispose"] = 3] = "dispose";
            EventType[EventType["complete"] = 4] = "complete";
            EventType[EventType["event"] = 5] = "event";
        })(core.EventType || (core.EventType = {}));
        var EventType = core.EventType;
        var AnimationStateAdapter2 = (function () {
            function AnimationStateAdapter2() {
            }
            AnimationStateAdapter2.prototype.start = function (entry) {
            };
            AnimationStateAdapter2.prototype.interrupt = function (entry) {
            };
            AnimationStateAdapter2.prototype.end = function (entry) {
            };
            AnimationStateAdapter2.prototype.dispose = function (entry) {
            };
            AnimationStateAdapter2.prototype.complete = function (entry) {
            };
            AnimationStateAdapter2.prototype.event = function (entry, event) {
            };
            return AnimationStateAdapter2;
        }());
        core.AnimationStateAdapter2 = AnimationStateAdapter2;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AnimationStateData = (function () {
            function AnimationStateData(skeletonData) {
                this.animationToMixTime = {};
                this.defaultMix = 0;
                if (skeletonData == null)
                    throw new Error("skeletonData cannot be null.");
                this.skeletonData = skeletonData;
            }
            AnimationStateData.prototype.setMix = function (fromName, toName, duration) {
                var from = this.skeletonData.findAnimation(fromName);
                if (from == null)
                    throw new Error("Animation not found: " + fromName);
                var to = this.skeletonData.findAnimation(toName);
                if (to == null)
                    throw new Error("Animation not found: " + toName);
                this.setMixWith(from, to, duration);
            };
            AnimationStateData.prototype.setMixByName = function (fromName, toName, duration) {
                if (!AnimationStateData.deprecatedWarning1) {
                    AnimationStateData.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: AnimationStateData.setMixByName is deprecated, please use setMix from now on.");
                }
                this.setMix(fromName, toName, duration);
            };
            AnimationStateData.prototype.setMixWith = function (from, to, duration) {
                if (from == null)
                    throw new Error("from cannot be null.");
                if (to == null)
                    throw new Error("to cannot be null.");
                var key = from.name + to.name;
                this.animationToMixTime[key] = duration;
            };
            AnimationStateData.prototype.getMix = function (from, to) {
                var key = from.name + to.name;
                var value = this.animationToMixTime[key];
                return value === undefined ? this.defaultMix : value;
            };
            AnimationStateData.deprecatedWarning1 = false;
            return AnimationStateData;
        }());
        core.AnimationStateData = AnimationStateData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AtlasAttachmentLoader = (function () {
            function AtlasAttachmentLoader(atlas) {
                this.atlas = atlas;
            }
            AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
                var attachment = new core.RegionAttachment(name);
                attachment.region = region;
                return attachment;
            };
            AtlasAttachmentLoader.prototype.newMeshAttachment = function (skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (mesh attachment: " + name + ")");
                var attachment = new core.MeshAttachment(name);
                attachment.region = region;
                return attachment;
            };
            AtlasAttachmentLoader.prototype.newBoundingBoxAttachment = function (skin, name) {
                return new core.BoundingBoxAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newPathAttachment = function (skin, name) {
                return new core.PathAttachment(name);
            };
            return AtlasAttachmentLoader;
        }());
        core.AtlasAttachmentLoader = AtlasAttachmentLoader;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Attachment = (function () {
            function Attachment(name) {
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            return Attachment;
        }());
        core.Attachment = Attachment;
        var VertexAttachment = (function (_super) {
            __extends(VertexAttachment, _super);
            function VertexAttachment(name) {
                _super.call(this, name);
                this.worldVerticesLength = 0;
            }
            VertexAttachment.prototype.computeWorldVertices = function (slot, worldVertices) {
                this.computeWorldVerticesWith(slot, 0, this.worldVerticesLength, worldVertices, 0);
            };
            VertexAttachment.prototype.computeWorldVerticesWith = function (slot, start, count, worldVertices, offset) {
                count += offset;
                var skeleton = slot.bone.skeleton;
                var deformArray = slot.attachmentVertices;
                var vertices = this.vertices;
                var bones = this.bones;
                if (bones == null) {
                    if (deformArray.length > 0)
                        vertices = deformArray;
                    var bone = slot.bone;
                    var m = bone.matrix;
                    var x = m.tx;
                    var y = m.ty;
                    var a = m.a, b = m.c, c = m.b, d = m.d;
                    for (var v_1 = start, w = offset; w < count; v_1 += 2, w += 2) {
                        var vx = vertices[v_1], vy = vertices[v_1 + 1];
                        worldVertices[w] = vx * a + vy * b + x;
                        worldVertices[w + 1] = vx * c + vy * d + y;
                    }
                    return;
                }
                var v = 0, skip = 0;
                for (var i = 0; i < start; i += 2) {
                    var n = bones[v];
                    v += n + 1;
                    skip += n;
                }
                var skeletonBones = skeleton.bones;
                if (deformArray.length == 0) {
                    for (var w = offset, b = skip * 3; w < count; w += 2) {
                        var wx = 0, wy = 0;
                        var n = bones[v++];
                        n += v;
                        for (; v < n; v++, b += 3) {
                            var bone = skeletonBones[bones[v]];
                            var m = bone.matrix;
                            var vx = vertices[b], vy = vertices[b + 1], weight = vertices[b + 2];
                            wx += (vx * m.a + vy * m.c + m.tx) * weight;
                            wy += (vx * m.b + vy * m.d + m.ty) * weight;
                        }
                        worldVertices[w] = wx;
                        worldVertices[w + 1] = wy;
                    }
                }
                else {
                    var deform = deformArray;
                    for (var w = offset, b = skip * 3, f = skip << 1; w < count; w += 2) {
                        var wx = 0, wy = 0;
                        var n = bones[v++];
                        n += v;
                        for (; v < n; v++, b += 3, f += 2) {
                            var bone = skeletonBones[bones[v]];
                            var m = bone.matrix;
                            var vx = vertices[b] + deform[f], vy = vertices[b + 1] + deform[f + 1], weight = vertices[b + 2];
                            wx += (vx * m.a + vy * m.c + m.tx) * weight;
                            wy += (vx * m.b + vy * m.d + m.ty) * weight;
                        }
                        worldVertices[w] = wx;
                        worldVertices[w + 1] = wy;
                    }
                }
            };
            VertexAttachment.prototype.applyDeform = function (sourceAttachment) {
                return this == sourceAttachment;
            };
            return VertexAttachment;
        }(Attachment));
        core.VertexAttachment = VertexAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        (function (AttachmentType) {
            AttachmentType[AttachmentType["Region"] = 0] = "Region";
            AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
            AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
            AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
            AttachmentType[AttachmentType["Path"] = 4] = "Path";
        })(core.AttachmentType || (core.AttachmentType = {}));
        var AttachmentType = core.AttachmentType;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BoundingBoxAttachment = (function (_super) {
            __extends(BoundingBoxAttachment, _super);
            function BoundingBoxAttachment(name) {
                _super.call(this, name);
                this.color = new core.Color(1, 1, 1, 1);
            }
            return BoundingBoxAttachment;
        }(core.VertexAttachment));
        core.BoundingBoxAttachment = BoundingBoxAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var MeshAttachment = (function (_super) {
            __extends(MeshAttachment, _super);
            function MeshAttachment(name) {
                _super.call(this, name);
                this.color = new core.Color(1, 1, 1, 1);
                this.inheritDeform = false;
                this.tempColor = new core.Color(0, 0, 0, 0);
            }
            MeshAttachment.prototype.updateWorldVertices = function (slot, premultipliedAlpha) {
                return [];
            };
            MeshAttachment.prototype.updateUVs = function (region, uvs) {
                var regionUVs = this.regionUVs;
                var n = regionUVs.length;
                if (!uvs || uvs.length != n) {
                    uvs = core.Utils.newFloatArray(n);
                }
                if (region == null) {
                    return;
                }
                var texture = region.texture;
                var r = texture._uvs;
                var w1 = region.width, h1 = region.height, w2 = region.originalWidth, h2 = region.originalHeight;
                var x = region.offsetX, y = region.pixiOffsetY;
                for (var i = 0; i < n; i += 2) {
                    var u = this.regionUVs[i], v = this.regionUVs[i + 1];
                    u = (u * w2 - x) / w1;
                    v = (v * h2 - y) / h1;
                    uvs[i] = (r.x0 * (1 - u) + r.x1 * u) * (1 - v) + (r.x3 * (1 - u) + r.x2 * u) * v;
                    uvs[i + 1] = (r.y0 * (1 - u) + r.y1 * u) * (1 - v) + (r.y3 * (1 - u) + r.y2 * u) * v;
                }
                return uvs;
            };
            MeshAttachment.prototype.applyDeform = function (sourceAttachment) {
                return this == sourceAttachment || (this.inheritDeform && this.parentMesh == sourceAttachment);
            };
            MeshAttachment.prototype.getParentMesh = function () {
                return this.parentMesh;
            };
            MeshAttachment.prototype.setParentMesh = function (parentMesh) {
                this.parentMesh = parentMesh;
                if (parentMesh != null) {
                    this.bones = parentMesh.bones;
                    this.vertices = parentMesh.vertices;
                    this.regionUVs = parentMesh.regionUVs;
                    this.triangles = parentMesh.triangles;
                    this.hullLength = parentMesh.hullLength;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                }
            };
            return MeshAttachment;
        }(core.VertexAttachment));
        core.MeshAttachment = MeshAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathAttachment = (function (_super) {
            __extends(PathAttachment, _super);
            function PathAttachment(name) {
                _super.call(this, name);
                this.closed = false;
                this.constantSpeed = false;
                this.color = new core.Color(1, 1, 1, 1);
            }
            return PathAttachment;
        }(core.VertexAttachment));
        core.PathAttachment = PathAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var RegionAttachment = (function (_super) {
            __extends(RegionAttachment, _super);
            function RegionAttachment(name) {
                _super.call(this, name);
                this.x = 0;
                this.y = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.rotation = 0;
                this.width = 0;
                this.height = 0;
                this.color = new core.Color(1, 1, 1, 1);
            }
            RegionAttachment.prototype.updateWorldVertices = function (slot, premultipliedAlpha) {
                return [];
            };
            return RegionAttachment;
        }(core.Attachment));
        core.RegionAttachment = RegionAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        (function (BlendMode) {
            BlendMode[BlendMode["Normal"] = 0] = "Normal";
            BlendMode[BlendMode["Additive"] = 1] = "Additive";
            BlendMode[BlendMode["Multiply"] = 2] = "Multiply";
            BlendMode[BlendMode["Screen"] = 3] = "Screen";
        })(core.BlendMode || (core.BlendMode = {}));
        var BlendMode = core.BlendMode;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Bone = (function () {
            function Bone(data, skeleton, parent) {
                this.matrix = new PIXI.Matrix();
                this.children = new Array();
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scaleX = 0;
                this.scaleY = 0;
                this.shearX = 0;
                this.shearY = 0;
                this.ax = 0;
                this.ay = 0;
                this.arotation = 0;
                this.ascaleX = 0;
                this.ascaleY = 0;
                this.ashearX = 0;
                this.ashearY = 0;
                this.appliedValid = false;
                this.sorted = false;
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.skeleton = skeleton;
                this.parent = parent;
                this.setToSetupPose();
            }
            Object.defineProperty(Bone.prototype, "worldX", {
                get: function () {
                    return this.matrix.tx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Bone.prototype, "worldY", {
                get: function () {
                    return this.matrix.ty;
                },
                enumerable: true,
                configurable: true
            });
            Bone.prototype.update = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            };
            Bone.prototype.updateWorldTransform = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            };
            Bone.prototype.updateWorldTransformWith = function (x, y, rotation, scaleX, scaleY, shearX, shearY) {
                this.ax = x;
                this.ay = y;
                this.arotation = rotation;
                this.ascaleX = scaleX;
                this.ascaleY = scaleY;
                this.ashearX = shearX;
                this.ashearY = shearY;
                this.appliedValid = true;
                var parent = this.parent;
                var m = this.matrix;
                if (parent == null) {
                    var rotationY = rotation + 90 + shearY;
                    var la = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                    var lb = core.MathUtils.cosDeg(rotationY) * scaleY;
                    var lc = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                    var ld = core.MathUtils.sinDeg(rotationY) * scaleY;
                    var skeleton = this.skeleton;
                    if (skeleton.flipX) {
                        x = -x;
                        la = -la;
                        lb = -lb;
                    }
                    if (skeleton.flipY !== Bone.yDown) {
                        y = -y;
                        lc = -lc;
                        ld = -ld;
                    }
                    m.a = la;
                    m.c = lb;
                    m.b = lc;
                    m.d = ld;
                    m.tx = x + skeleton.x;
                    m.ty = y + skeleton.y;
                    return;
                }
                var pa = parent.matrix.a, pb = parent.matrix.c, pc = parent.matrix.b, pd = parent.matrix.d;
                m.tx = pa * x + pb * y + parent.matrix.tx;
                m.ty = pc * x + pd * y + parent.matrix.ty;
                switch (this.data.transformMode) {
                    case core.TransformMode.Normal: {
                        var rotationY = rotation + 90 + shearY;
                        var la = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        var lb = core.MathUtils.cosDeg(rotationY) * scaleY;
                        var lc = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        var ld = core.MathUtils.sinDeg(rotationY) * scaleY;
                        m.a = pa * la + pb * lc;
                        m.c = pa * lb + pb * ld;
                        m.b = pc * la + pd * lc;
                        m.d = pc * lb + pd * ld;
                        return;
                    }
                    case core.TransformMode.OnlyTranslation: {
                        var rotationY = rotation + 90 + shearY;
                        m.a = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        m.c = core.MathUtils.cosDeg(rotationY) * scaleY;
                        m.b = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        m.d = core.MathUtils.sinDeg(rotationY) * scaleY;
                        break;
                    }
                    case core.TransformMode.NoRotationOrReflection: {
                        var s = pa * pa + pc * pc;
                        var prx = 0;
                        if (s > 0.0001) {
                            s = Math.abs(pa * pd - pb * pc) / s;
                            pb = pc * s;
                            pd = pa * s;
                            prx = Math.atan2(pc, pa) * core.MathUtils.radDeg;
                        }
                        else {
                            pa = 0;
                            pc = 0;
                            prx = 90 - Math.atan2(pd, pb) * core.MathUtils.radDeg;
                        }
                        var rx = rotation + shearX - prx;
                        var ry = rotation + shearY - prx + 90;
                        var la = core.MathUtils.cosDeg(rx) * scaleX;
                        var lb = core.MathUtils.cosDeg(ry) * scaleY;
                        var lc = core.MathUtils.sinDeg(rx) * scaleX;
                        var ld = core.MathUtils.sinDeg(ry) * scaleY;
                        m.a = pa * la - pb * lc;
                        m.c = pa * lb - pb * ld;
                        m.b = pc * la + pd * lc;
                        m.d = pc * lb + pd * ld;
                        break;
                    }
                    case core.TransformMode.NoScale:
                    case core.TransformMode.NoScaleOrReflection: {
                        var cos = core.MathUtils.cosDeg(rotation);
                        var sin = core.MathUtils.sinDeg(rotation);
                        var za = pa * cos + pb * sin;
                        var zc = pc * cos + pd * sin;
                        var s = Math.sqrt(za * za + zc * zc);
                        if (s > 0.00001)
                            s = 1 / s;
                        za *= s;
                        zc *= s;
                        s = Math.sqrt(za * za + zc * zc);
                        var r = Math.PI / 2 + Math.atan2(zc, za);
                        var zb = Math.cos(r) * s;
                        var zd = Math.sin(r) * s;
                        var la = core.MathUtils.cosDeg(shearX) * scaleX;
                        var lb = core.MathUtils.cosDeg(90 + shearY) * scaleY;
                        var lc = core.MathUtils.sinDeg(shearX) * scaleX;
                        var ld = core.MathUtils.sinDeg(90 + shearY) * scaleY;
                        m.a = za * la + zb * lc;
                        m.c = za * lb + zb * ld;
                        m.b = zc * la + zd * lc;
                        m.d = zc * lb + zd * ld;
                        if (this.data.transformMode != core.TransformMode.NoScaleOrReflection ? pa * pd - pb * pc < 0 : ((this.skeleton.flipX != this.skeleton.flipY) != Bone.yDown)) {
                            m.c = -m.c;
                            m.d = -m.d;
                        }
                        return;
                    }
                }
                if (this.skeleton.flipX) {
                    m.a = -m.a;
                    m.c = -m.c;
                }
                if (this.skeleton.flipY != Bone.yDown) {
                    m.b = -m.b;
                    m.d = -m.d;
                }
            };
            Bone.prototype.setToSetupPose = function () {
                var data = this.data;
                this.x = data.x;
                this.y = data.y;
                this.rotation = data.rotation;
                this.scaleX = data.scaleX;
                this.scaleY = data.scaleY;
                this.shearX = data.shearX;
                this.shearY = data.shearY;
            };
            Bone.prototype.getWorldRotationX = function () {
                return Math.atan2(this.matrix.b, this.matrix.a) * core.MathUtils.radDeg;
            };
            Bone.prototype.getWorldRotationY = function () {
                return Math.atan2(this.matrix.d, this.matrix.c) * core.MathUtils.radDeg;
            };
            Bone.prototype.getWorldScaleX = function () {
                var m = this.matrix;
                return Math.sqrt(m.a * m.a + m.c * m.c);
            };
            Bone.prototype.getWorldScaleY = function () {
                var m = this.matrix;
                return Math.sqrt(m.b * m.b + m.d * m.d);
            };
            Bone.prototype.worldToLocalRotationX = function () {
                var parent = this.parent;
                if (parent == null)
                    return this.arotation;
                var pm = parent.matrix, m = this.matrix;
                return Math.atan2(pm.a * m.b - pm.b * m.a, pm.d * m.a - pm.c * m.b) * core.MathUtils.radDeg;
            };
            Bone.prototype.worldToLocalRotationY = function () {
                var parent = this.parent;
                if (parent == null)
                    return this.arotation;
                var pm = parent.matrix, m = this.matrix;
                return Math.atan2(pm.a * m.d - pm.b * m.c, pm.d * m.c - pm.c * m.d) * core.MathUtils.radDeg;
            };
            Bone.prototype.rotateWorld = function (degrees) {
                var m = this.matrix;
                var a = this.matrix.a, b = m.c, c = m.b, d = m.d;
                var cos = core.MathUtils.cosDeg(degrees), sin = core.MathUtils.sinDeg(degrees);
                m.a = cos * a - sin * c;
                m.c = cos * b - sin * d;
                m.b = sin * a + cos * c;
                m.d = sin * b + cos * d;
                this.appliedValid = false;
            };
            Bone.prototype.updateAppliedTransform = function () {
                this.appliedValid = true;
                var parent = this.parent;
                var m = this.matrix;
                if (parent == null) {
                    this.ax = m.tx;
                    this.ay = m.ty;
                    this.arotation = Math.atan2(m.b, m.a) * core.MathUtils.radDeg;
                    this.ascaleX = Math.sqrt(m.a * m.a + m.b * m.b);
                    this.ascaleY = Math.sqrt(m.c * m.c + m.d * m.d);
                    this.ashearX = 0;
                    this.ashearY = Math.atan2(m.a * m.c + m.b * m.d, m.a * m.d - m.b * m.c) * core.MathUtils.radDeg;
                    return;
                }
                var pm = parent.matrix;
                var pid = 1 / (pm.a * pm.d - pm.b * pm.c);
                var dx = m.tx - pm.tx, dy = m.ty - pm.ty;
                this.ax = (dx * pm.d * pid - dy * pm.c * pid);
                this.ay = (dy * pm.a * pid - dx * pm.b * pid);
                var ia = pid * pm.d;
                var id = pid * pm.a;
                var ib = pid * pm.c;
                var ic = pid * pm.b;
                var ra = ia * m.a - ib * m.b;
                var rb = ia * m.c - ib * m.d;
                var rc = id * m.b - ic * m.a;
                var rd = id * m.d - ic * m.c;
                this.ashearX = 0;
                this.ascaleX = Math.sqrt(ra * ra + rc * rc);
                if (this.ascaleX > 0.0001) {
                    var det = ra * rd - rb * rc;
                    this.ascaleY = det / this.ascaleX;
                    this.ashearY = Math.atan2(ra * rb + rc * rd, det) * core.MathUtils.radDeg;
                    this.arotation = Math.atan2(rc, ra) * core.MathUtils.radDeg;
                }
                else {
                    this.ascaleX = 0;
                    this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                    this.ashearY = 0;
                    this.arotation = 90 - Math.atan2(rd, rb) * core.MathUtils.radDeg;
                }
            };
            Bone.prototype.worldToLocal = function (world) {
                var m = this.matrix;
                var a = m.a, b = m.c, c = m.b, d = m.d;
                var invDet = 1 / (a * d - b * c);
                var x = world.x - m.tx, y = world.y - m.ty;
                world.x = (x * d * invDet - y * b * invDet);
                world.y = (y * a * invDet - x * c * invDet);
                return world;
            };
            Bone.prototype.localToWorld = function (local) {
                var m = this.matrix;
                var x = local.x, y = local.y;
                local.x = x * m.a + y * m.c + m.tx;
                local.y = x * m.b + y * m.d + m.ty;
                return local;
            };
            Bone.yDown = false;
            return Bone;
        }());
        core.Bone = Bone;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BoneData = (function () {
            function BoneData(index, name, parent) {
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.shearX = 0;
                this.shearY = 0;
                this.transformMode = TransformMode.Normal;
                if (index < 0)
                    throw new Error("index must be >= 0.");
                if (name == null)
                    throw new Error("name cannot be null.");
                this.index = index;
                this.name = name;
                this.parent = parent;
            }
            return BoneData;
        }());
        core.BoneData = BoneData;
        (function (TransformMode) {
            TransformMode[TransformMode["Normal"] = 0] = "Normal";
            TransformMode[TransformMode["OnlyTranslation"] = 1] = "OnlyTranslation";
            TransformMode[TransformMode["NoRotationOrReflection"] = 2] = "NoRotationOrReflection";
            TransformMode[TransformMode["NoScale"] = 3] = "NoScale";
            TransformMode[TransformMode["NoScaleOrReflection"] = 4] = "NoScaleOrReflection";
        })(core.TransformMode || (core.TransformMode = {}));
        var TransformMode = core.TransformMode;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Event = (function () {
            function Event(time, data) {
                if (data == null)
                    throw new Error("data cannot be null.");
                this.time = time;
                this.data = data;
            }
            return Event;
        }());
        core.Event = Event;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var EventData = (function () {
            function EventData(name) {
                this.name = name;
            }
            return EventData;
        }());
        core.EventData = EventData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IkConstraint = (function () {
            function IkConstraint(data, skeleton) {
                this.mix = 1;
                this.bendDirection = 0;
                this.level = 0;
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.mix = data.mix;
                this.bendDirection = data.bendDirection;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findBone(data.target.name);
            }
            IkConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            IkConstraint.prototype.apply = function () {
                this.update();
            };
            IkConstraint.prototype.update = function () {
                var target = this.target;
                var bones = this.bones;
                switch (bones.length) {
                    case 1:
                        this.apply1(bones[0], target.worldX, target.worldY, this.mix);
                        break;
                    case 2:
                        this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.mix);
                        break;
                }
            };
            IkConstraint.prototype.apply1 = function (bone, targetX, targetY, alpha) {
                if (!bone.appliedValid)
                    bone.updateAppliedTransform();
                var pp = bone.parent.matrix;
                var id = 1 / (pp.a * pp.d - pp.b * pp.c);
                var x = targetX - pp.tx, y = targetY - pp.ty;
                var tx = (x * pp.d - y * pp.c) * id - bone.ax, ty = (y * pp.a - x * pp.b) * id - bone.ay;
                var rotationIK = Math.atan2(ty, tx) * core.MathUtils.radDeg - bone.ashearX - bone.arotation;
                if (bone.ascaleX < 0)
                    rotationIK += 180;
                if (rotationIK > 180)
                    rotationIK -= 360;
                else if (rotationIK < -180)
                    rotationIK += 360;
                bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, bone.ascaleX, bone.ascaleY, bone.ashearX, bone.ashearY);
            };
            IkConstraint.prototype.apply2 = function (parent, child, targetX, targetY, bendDir, alpha) {
                if (alpha == 0) {
                    child.updateWorldTransform();
                    return;
                }
                if (!parent.appliedValid)
                    parent.updateAppliedTransform();
                if (!child.appliedValid)
                    child.updateAppliedTransform();
                var px = parent.ax, py = parent.ay, psx = parent.ascaleX, psy = parent.ascaleY, csx = child.ascaleX;
                var os1 = 0, os2 = 0, s2 = 0;
                if (psx < 0) {
                    psx = -psx;
                    os1 = 180;
                    s2 = -1;
                }
                else {
                    os1 = 0;
                    s2 = 1;
                }
                if (psy < 0) {
                    psy = -psy;
                    s2 = -s2;
                }
                if (csx < 0) {
                    csx = -csx;
                    os2 = 180;
                }
                else
                    os2 = 0;
                var pm = parent.matrix;
                var cx = child.ax, cy = 0, cwx = 0, cwy = 0, a = pm.a, b = pm.c, c = pm.b, d = pm.d;
                var u = Math.abs(psx - psy) <= 0.0001;
                if (!u) {
                    cy = 0;
                    cwx = a * cx + pm.tx;
                    cwy = c * cx + pm.ty;
                }
                else {
                    cy = child.ay;
                    cwx = a * cx + b * cy + pm.tx;
                    cwy = c * cx + d * cy + pm.ty;
                }
                var pp = parent.parent;
                var ppm = parent.parent.matrix;
                a = ppm.a;
                b = ppm.c;
                c = ppm.b;
                d = ppm.d;
                var id = 1 / (a * d - b * c), x = targetX - ppm.tx, y = targetY - ppm.ty;
                var tx = (x * d - y * b) * id - px, ty = (y * a - x * c) * id - py;
                x = cwx - ppm.tx;
                y = cwy - ppm.ty;
                var dx = (x * d - y * b) * id - px, dy = (y * a - x * c) * id - py;
                var l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.data.length * csx, a1 = 0, a2 = 0;
                outer: if (u) {
                    l2 *= psx;
                    var cos = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                    if (cos < -1)
                        cos = -1;
                    else if (cos > 1)
                        cos = 1;
                    a2 = Math.acos(cos) * bendDir;
                    a = l1 + l2 * cos;
                    b = l2 * Math.sin(a2);
                    a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
                }
                else {
                    a = psx * l2;
                    b = psy * l2;
                    var aa = a * a, bb = b * b, dd = tx * tx + ty * ty, ta = Math.atan2(ty, tx);
                    c = bb * l1 * l1 + aa * dd - aa * bb;
                    var c1 = -2 * bb * l1, c2 = bb - aa;
                    d = c1 * c1 - 4 * c2 * c;
                    if (d >= 0) {
                        var q = Math.sqrt(d);
                        if (c1 < 0)
                            q = -q;
                        q = -(c1 + q) / 2;
                        var r0 = q / c2, r1 = c / q;
                        var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                        if (r * r <= dd) {
                            y = Math.sqrt(dd - r * r) * bendDir;
                            a1 = ta - Math.atan2(y, r);
                            a2 = Math.atan2(y / psy, (r - l1) / psx);
                            break outer;
                        }
                    }
                    var minAngle = 0, minDist = Number.MAX_VALUE, minX = 0, minY = 0;
                    var maxAngle = 0, maxDist = 0, maxX = 0, maxY = 0;
                    x = l1 + a;
                    d = x * x;
                    if (d > maxDist) {
                        maxAngle = 0;
                        maxDist = d;
                        maxX = x;
                    }
                    x = l1 - a;
                    d = x * x;
                    if (d < minDist) {
                        minAngle = core.MathUtils.PI;
                        minDist = d;
                        minX = x;
                    }
                    var angle = Math.acos(-a * l1 / (aa - bb));
                    x = a * Math.cos(angle) + l1;
                    y = b * Math.sin(angle);
                    d = x * x + y * y;
                    if (d < minDist) {
                        minAngle = angle;
                        minDist = d;
                        minX = x;
                        minY = y;
                    }
                    if (d > maxDist) {
                        maxAngle = angle;
                        maxDist = d;
                        maxX = x;
                        maxY = y;
                    }
                    if (dd <= (minDist + maxDist) / 2) {
                        a1 = ta - Math.atan2(minY * bendDir, minX);
                        a2 = minAngle * bendDir;
                    }
                    else {
                        a1 = ta - Math.atan2(maxY * bendDir, maxX);
                        a2 = maxAngle * bendDir;
                    }
                }
                var os = Math.atan2(cy, cx) * s2;
                var rotation = parent.arotation;
                a1 = (a1 - os) * core.MathUtils.radDeg + os1 - rotation;
                if (a1 > 180)
                    a1 -= 360;
                else if (a1 < -180)
                    a1 += 360;
                parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, parent.ascaleX, parent.ascaleY, 0, 0);
                rotation = child.arotation;
                a2 = ((a2 + os) * core.MathUtils.radDeg - child.ashearX) * s2 + os2 - rotation;
                if (a2 > 180)
                    a2 -= 360;
                else if (a2 < -180)
                    a2 += 360;
                child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
            };
            return IkConstraint;
        }());
        core.IkConstraint = IkConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IkConstraintData = (function () {
            function IkConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.bendDirection = 1;
                this.mix = 1;
                this.name = name;
            }
            return IkConstraintData;
        }());
        core.IkConstraintData = IkConstraintData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathConstraint = (function () {
            function PathConstraint(data, skeleton) {
                this.position = 0;
                this.spacing = 0;
                this.rotateMix = 0;
                this.translateMix = 0;
                this.spaces = new Array();
                this.positions = new Array();
                this.world = new Array();
                this.curves = new Array();
                this.lengths = new Array();
                this.segments = new Array();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.bones = new Array();
                for (var i = 0, n = data.bones.length; i < n; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findSlot(data.target.name);
                this.position = data.position;
                this.spacing = data.spacing;
                this.rotateMix = data.rotateMix;
                this.translateMix = data.translateMix;
            }
            PathConstraint.prototype.apply = function () {
                this.update();
            };
            PathConstraint.prototype.update = function () {
                var attachment = this.target.getAttachment();
                if (!(attachment instanceof core.PathAttachment))
                    return;
                var rotateMix = this.rotateMix, translateMix = this.translateMix;
                var translate = translateMix > 0, rotate = rotateMix > 0;
                if (!translate && !rotate)
                    return;
                var data = this.data;
                var spacingMode = data.spacingMode;
                var lengthSpacing = spacingMode == core.SpacingMode.Length;
                var rotateMode = data.rotateMode;
                var tangents = rotateMode == core.RotateMode.Tangent, scale = rotateMode == core.RotateMode.ChainScale;
                var boneCount = this.bones.length, spacesCount = tangents ? boneCount : boneCount + 1;
                var bones = this.bones;
                var spaces = core.Utils.setArraySize(this.spaces, spacesCount), lengths = null;
                var spacing = this.spacing;
                if (scale || lengthSpacing) {
                    if (scale)
                        lengths = core.Utils.setArraySize(this.lengths, boneCount);
                    for (var i = 0, n = spacesCount - 1; i < n;) {
                        var bone = bones[i];
                        var m = bone.matrix;
                        var length_1 = bone.data.length, x = length_1 * m.a, y = length_1 * m.b;
                        length_1 = Math.sqrt(x * x + y * y);
                        if (scale)
                            lengths[i] = length_1;
                        spaces[++i] = lengthSpacing ? Math.max(0, length_1 + spacing) : spacing;
                    }
                }
                else {
                    for (var i = 1; i < spacesCount; i++)
                        spaces[i] = spacing;
                }
                var positions = this.computeWorldPositions(attachment, spacesCount, tangents, data.positionMode == core.PositionMode.Percent, spacingMode == core.SpacingMode.Percent);
                var boneX = positions[0], boneY = positions[1], offsetRotation = data.offsetRotation;
                var tip = false;
                if (offsetRotation == 0)
                    tip = rotateMode == core.RotateMode.Chain;
                else {
                    tip = false;
                    var pm = this.target.bone.matrix;
                    offsetRotation *= pm.a * pm.d - pm.b * pm.c > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                }
                for (var i = 0, p = 3; i < boneCount; i++, p += 3) {
                    var bone = bones[i];
                    var m = bone.matrix;
                    m.tx += (boneX - m.tx) * translateMix;
                    m.ty += (boneY - m.ty) * translateMix;
                    var x = positions[p], y = positions[p + 1], dx = x - boneX, dy = y - boneY;
                    if (scale) {
                        var length_2 = lengths[i];
                        if (length_2 != 0) {
                            var s = (Math.sqrt(dx * dx + dy * dy) / length_2 - 1) * rotateMix + 1;
                            m.a *= s;
                            m.b *= s;
                        }
                    }
                    boneX = x;
                    boneY = y;
                    if (rotate) {
                        var a = m.a, b = m.c, c = m.b, d = m.d, r = 0, cos = 0, sin = 0;
                        if (tangents)
                            r = positions[p - 1];
                        else if (spaces[i + 1] == 0)
                            r = positions[p + 2];
                        else
                            r = Math.atan2(dy, dx);
                        r -= Math.atan2(c, a);
                        if (tip) {
                            cos = Math.cos(r);
                            sin = Math.sin(r);
                            var length_3 = bone.data.length;
                            boneX += (length_3 * (cos * a - sin * c) - dx) * rotateMix;
                            boneY += (length_3 * (sin * a + cos * c) - dy) * rotateMix;
                        }
                        else {
                            r += offsetRotation;
                        }
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        cos = Math.cos(r);
                        sin = Math.sin(r);
                        m.a = cos * a - sin * c;
                        m.c = cos * b - sin * d;
                        m.b = sin * a + cos * c;
                        m.d = sin * b + cos * d;
                    }
                    bone.appliedValid = false;
                }
            };
            PathConstraint.prototype.computeWorldPositions = function (path, spacesCount, tangents, percentPosition, percentSpacing) {
                var target = this.target;
                var position = this.position;
                var spaces = this.spaces, out = core.Utils.setArraySize(this.positions, spacesCount * 3 + 2), world = null;
                var closed = path.closed;
                var verticesLength = path.worldVerticesLength, curveCount = verticesLength / 6, prevCurve = PathConstraint.NONE;
                if (!path.constantSpeed) {
                    var lengths = path.lengths;
                    curveCount -= closed ? 1 : 2;
                    var pathLength_1 = lengths[curveCount];
                    if (percentPosition)
                        position *= pathLength_1;
                    if (percentSpacing) {
                        for (var i = 0; i < spacesCount; i++)
                            spaces[i] *= pathLength_1;
                    }
                    world = core.Utils.setArraySize(this.world, 8);
                    for (var i = 0, o = 0, curve = 0; i < spacesCount; i++, o += 3) {
                        var space = spaces[i];
                        position += space;
                        var p = position;
                        if (closed) {
                            p %= pathLength_1;
                            if (p < 0)
                                p += pathLength_1;
                            curve = 0;
                        }
                        else if (p < 0) {
                            if (prevCurve != PathConstraint.BEFORE) {
                                prevCurve = PathConstraint.BEFORE;
                                path.computeWorldVerticesWith(target, 2, 4, world, 0);
                            }
                            this.addBeforePosition(p, world, 0, out, o);
                            continue;
                        }
                        else if (p > pathLength_1) {
                            if (prevCurve != PathConstraint.AFTER) {
                                prevCurve = PathConstraint.AFTER;
                                path.computeWorldVerticesWith(target, verticesLength - 6, 4, world, 0);
                            }
                            this.addAfterPosition(p - pathLength_1, world, 0, out, o);
                            continue;
                        }
                        for (;; curve++) {
                            var length_4 = lengths[curve];
                            if (p > length_4)
                                continue;
                            if (curve == 0)
                                p /= length_4;
                            else {
                                var prev = lengths[curve - 1];
                                p = (p - prev) / (length_4 - prev);
                            }
                            break;
                        }
                        if (curve != prevCurve) {
                            prevCurve = curve;
                            if (closed && curve == curveCount) {
                                path.computeWorldVerticesWith(target, verticesLength - 4, 4, world, 0);
                                path.computeWorldVerticesWith(target, 0, 4, world, 4);
                            }
                            else
                                path.computeWorldVerticesWith(target, curve * 6 + 2, 8, world, 0);
                        }
                        this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || (i > 0 && space == 0));
                    }
                    return out;
                }
                if (closed) {
                    verticesLength += 2;
                    world = core.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVerticesWith(target, 2, verticesLength - 4, world, 0);
                    path.computeWorldVerticesWith(target, 0, 2, world, verticesLength - 4);
                    world[verticesLength - 2] = world[0];
                    world[verticesLength - 1] = world[1];
                }
                else {
                    curveCount--;
                    verticesLength -= 4;
                    world = core.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVerticesWith(target, 2, verticesLength, world, 0);
                }
                var curves = core.Utils.setArraySize(this.curves, curveCount);
                var pathLength = 0;
                var x1 = world[0], y1 = world[1], cx1 = 0, cy1 = 0, cx2 = 0, cy2 = 0, x2 = 0, y2 = 0;
                var tmpx = 0, tmpy = 0, dddfx = 0, dddfy = 0, ddfx = 0, ddfy = 0, dfx = 0, dfy = 0;
                for (var i = 0, w = 2; i < curveCount; i++, w += 6) {
                    cx1 = world[w];
                    cy1 = world[w + 1];
                    cx2 = world[w + 2];
                    cy2 = world[w + 3];
                    x2 = world[w + 4];
                    y2 = world[w + 5];
                    tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
                    tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
                    dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
                    dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
                    ddfx = tmpx * 2 + dddfx;
                    ddfy = tmpy * 2 + dddfy;
                    dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
                    dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx + dddfx;
                    dfy += ddfy + dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    curves[i] = pathLength;
                    x1 = x2;
                    y1 = y2;
                }
                if (percentPosition)
                    position *= pathLength;
                if (percentSpacing) {
                    for (var i = 0; i < spacesCount; i++)
                        spaces[i] *= pathLength;
                }
                var segments = this.segments;
                var curveLength = 0;
                for (var i = 0, o = 0, curve = 0, segment = 0; i < spacesCount; i++, o += 3) {
                    var space = spaces[i];
                    position += space;
                    var p = position;
                    if (closed) {
                        p %= pathLength;
                        if (p < 0)
                            p += pathLength;
                        curve = 0;
                    }
                    else if (p < 0) {
                        this.addBeforePosition(p, world, 0, out, o);
                        continue;
                    }
                    else if (p > pathLength) {
                        this.addAfterPosition(p - pathLength, world, verticesLength - 4, out, o);
                        continue;
                    }
                    for (;; curve++) {
                        var length_5 = curves[curve];
                        if (p > length_5)
                            continue;
                        if (curve == 0)
                            p /= length_5;
                        else {
                            var prev = curves[curve - 1];
                            p = (p - prev) / (length_5 - prev);
                        }
                        break;
                    }
                    if (curve != prevCurve) {
                        prevCurve = curve;
                        var ii = curve * 6;
                        x1 = world[ii];
                        y1 = world[ii + 1];
                        cx1 = world[ii + 2];
                        cy1 = world[ii + 3];
                        cx2 = world[ii + 4];
                        cy2 = world[ii + 5];
                        x2 = world[ii + 6];
                        y2 = world[ii + 7];
                        tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
                        tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
                        dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
                        dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
                        ddfx = tmpx * 2 + dddfx;
                        ddfy = tmpy * 2 + dddfy;
                        dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
                        dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
                        curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[0] = curveLength;
                        for (ii = 1; ii < 8; ii++) {
                            dfx += ddfx;
                            dfy += ddfy;
                            ddfx += dddfx;
                            ddfy += dddfy;
                            curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                            segments[ii] = curveLength;
                        }
                        dfx += ddfx;
                        dfy += ddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[8] = curveLength;
                        dfx += ddfx + dddfx;
                        dfy += ddfy + dddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[9] = curveLength;
                        segment = 0;
                    }
                    p *= curveLength;
                    for (;; segment++) {
                        var length_6 = segments[segment];
                        if (p > length_6)
                            continue;
                        if (segment == 0)
                            p /= length_6;
                        else {
                            var prev = segments[segment - 1];
                            p = segment + (p - prev) / (length_6 - prev);
                        }
                        break;
                    }
                    this.addCurvePosition(p * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents || (i > 0 && space == 0));
                }
                return out;
            };
            PathConstraint.prototype.addBeforePosition = function (p, temp, i, out, o) {
                var x1 = temp[i], y1 = temp[i + 1], dx = temp[i + 2] - x1, dy = temp[i + 3] - y1, r = Math.atan2(dy, dx);
                out[o] = x1 + p * Math.cos(r);
                out[o + 1] = y1 + p * Math.sin(r);
                out[o + 2] = r;
            };
            PathConstraint.prototype.addAfterPosition = function (p, temp, i, out, o) {
                var x1 = temp[i + 2], y1 = temp[i + 3], dx = x1 - temp[i], dy = y1 - temp[i + 1], r = Math.atan2(dy, dx);
                out[o] = x1 + p * Math.cos(r);
                out[o + 1] = y1 + p * Math.sin(r);
                out[o + 2] = r;
            };
            PathConstraint.prototype.addCurvePosition = function (p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
                if (p == 0 || isNaN(p))
                    p = 0.0001;
                var tt = p * p, ttt = tt * p, u = 1 - p, uu = u * u, uuu = uu * u;
                var ut = u * p, ut3 = ut * 3, uut3 = u * ut3, utt3 = ut3 * p;
                var x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt, y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
                out[o] = x;
                out[o + 1] = y;
                if (tangents)
                    out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
            };
            PathConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            PathConstraint.NONE = -1;
            PathConstraint.BEFORE = -2;
            PathConstraint.AFTER = -3;
            return PathConstraint;
        }());
        core.PathConstraint = PathConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathConstraintData = (function () {
            function PathConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.name = name;
            }
            return PathConstraintData;
        }());
        core.PathConstraintData = PathConstraintData;
        (function (PositionMode) {
            PositionMode[PositionMode["Fixed"] = 0] = "Fixed";
            PositionMode[PositionMode["Percent"] = 1] = "Percent";
        })(core.PositionMode || (core.PositionMode = {}));
        var PositionMode = core.PositionMode;
        (function (SpacingMode) {
            SpacingMode[SpacingMode["Length"] = 0] = "Length";
            SpacingMode[SpacingMode["Fixed"] = 1] = "Fixed";
            SpacingMode[SpacingMode["Percent"] = 2] = "Percent";
        })(core.SpacingMode || (core.SpacingMode = {}));
        var SpacingMode = core.SpacingMode;
        (function (RotateMode) {
            RotateMode[RotateMode["Tangent"] = 0] = "Tangent";
            RotateMode[RotateMode["Chain"] = 1] = "Chain";
            RotateMode[RotateMode["ChainScale"] = 2] = "ChainScale";
        })(core.RotateMode || (core.RotateMode = {}));
        var RotateMode = core.RotateMode;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Skeleton = (function () {
            function Skeleton(data) {
                this._updateCache = new Array();
                this.updateCacheReset = new Array();
                this.time = 0;
                this.flipX = false;
                this.flipY = false;
                this.x = 0;
                this.y = 0;
                if (data == null)
                    throw new Error("data cannot be null.");
                this.data = data;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++) {
                    var boneData = data.bones[i];
                    var bone = void 0;
                    if (boneData.parent == null)
                        bone = new core.Bone(boneData, this, null);
                    else {
                        var parent_1 = this.bones[boneData.parent.index];
                        bone = new core.Bone(boneData, this, parent_1);
                        parent_1.children.push(bone);
                    }
                    this.bones.push(bone);
                }
                this.slots = new Array();
                this.drawOrder = new Array();
                for (var i = 0; i < data.slots.length; i++) {
                    var slotData = data.slots[i];
                    var bone = this.bones[slotData.boneData.index];
                    var slot = new core.Slot(slotData, bone);
                    this.slots.push(slot);
                    this.drawOrder.push(slot);
                }
                this.ikConstraints = new Array();
                for (var i = 0; i < data.ikConstraints.length; i++) {
                    var ikConstraintData = data.ikConstraints[i];
                    this.ikConstraints.push(new core.IkConstraint(ikConstraintData, this));
                }
                this.transformConstraints = new Array();
                for (var i = 0; i < data.transformConstraints.length; i++) {
                    var transformConstraintData = data.transformConstraints[i];
                    this.transformConstraints.push(new core.TransformConstraint(transformConstraintData, this));
                }
                this.pathConstraints = new Array();
                for (var i = 0; i < data.pathConstraints.length; i++) {
                    var pathConstraintData = data.pathConstraints[i];
                    this.pathConstraints.push(new core.PathConstraint(pathConstraintData, this));
                }
                this.color = new core.Color(1, 1, 1, 1);
                this.updateCache();
            }
            Skeleton.prototype.updateCache = function () {
                var updateCache = this._updateCache;
                updateCache.length = 0;
                this.updateCacheReset.length = 0;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    bones[i].sorted = false;
                var ikConstraints = this.ikConstraints;
                var transformConstraints = this.transformConstraints;
                var pathConstraints = this.pathConstraints;
                var ikCount = ikConstraints.length, transformCount = transformConstraints.length, pathCount = pathConstraints.length;
                var constraintCount = ikCount + transformCount + pathCount;
                outer: for (var i = 0; i < constraintCount; i++) {
                    for (var ii = 0; ii < ikCount; ii++) {
                        var constraint = ikConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortIkConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var ii = 0; ii < transformCount; ii++) {
                        var constraint = transformConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortTransformConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var ii = 0; ii < pathCount; ii++) {
                        var constraint = pathConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortPathConstraint(constraint);
                            continue outer;
                        }
                    }
                }
                for (var i = 0, n = bones.length; i < n; i++)
                    this.sortBone(bones[i]);
            };
            Skeleton.prototype.sortIkConstraint = function (constraint) {
                var target = constraint.target;
                this.sortBone(target);
                var constrained = constraint.bones;
                var parent = constrained[0];
                this.sortBone(parent);
                if (constrained.length > 1) {
                    var child = constrained[constrained.length - 1];
                    if (!(this._updateCache.indexOf(child) > -1))
                        this.updateCacheReset.push(child);
                }
                this._updateCache.push(constraint);
                this.sortReset(parent.children);
                constrained[constrained.length - 1].sorted = true;
            };
            Skeleton.prototype.sortPathConstraint = function (constraint) {
                var slot = constraint.target;
                var slotIndex = slot.data.index;
                var slotBone = slot.bone;
                if (this.skin != null)
                    this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
                if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin)
                    this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
                for (var ii = 0, nn = this.data.skins.length; ii < nn; ii++)
                    this.sortPathConstraintAttachment(this.data.skins[ii], slotIndex, slotBone);
                var attachment = slot.getAttachment();
                if (attachment instanceof core.PathAttachment)
                    this.sortPathConstraintAttachmentWith(attachment, slotBone);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                for (var ii = 0; ii < boneCount; ii++)
                    this.sortBone(constrained[ii]);
                this._updateCache.push(constraint);
                for (var ii = 0; ii < boneCount; ii++)
                    this.sortReset(constrained[ii].children);
                for (var ii = 0; ii < boneCount; ii++)
                    constrained[ii].sorted = true;
            };
            Skeleton.prototype.sortTransformConstraint = function (constraint) {
                this.sortBone(constraint.target);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                for (var ii = 0; ii < boneCount; ii++)
                    this.sortBone(constrained[ii]);
                this._updateCache.push(constraint);
                for (var ii = 0; ii < boneCount; ii++)
                    this.sortReset(constrained[ii].children);
                for (var ii = 0; ii < boneCount; ii++)
                    constrained[ii].sorted = true;
            };
            Skeleton.prototype.sortPathConstraintAttachment = function (skin, slotIndex, slotBone) {
                var attachments = skin.attachments[slotIndex];
                if (!attachments)
                    return;
                for (var key in attachments) {
                    this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
                }
            };
            Skeleton.prototype.sortPathConstraintAttachmentWith = function (attachment, slotBone) {
                if (!(attachment instanceof core.PathAttachment))
                    return;
                var pathBones = attachment.bones;
                if (pathBones == null)
                    this.sortBone(slotBone);
                else {
                    var bones = this.bones;
                    var i = 0;
                    while (i < pathBones.length) {
                        var boneCount = pathBones[i++];
                        for (var n = i + boneCount; i < n; i++) {
                            var boneIndex = pathBones[i];
                            this.sortBone(bones[boneIndex]);
                        }
                    }
                }
            };
            Skeleton.prototype.sortBone = function (bone) {
                if (bone.sorted)
                    return;
                var parent = bone.parent;
                if (parent != null)
                    this.sortBone(parent);
                bone.sorted = true;
                this._updateCache.push(bone);
            };
            Skeleton.prototype.sortReset = function (bones) {
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.sorted)
                        this.sortReset(bone.children);
                    bone.sorted = false;
                }
            };
            Skeleton.prototype.updateWorldTransform = function () {
                var updateCacheReset = this.updateCacheReset;
                for (var i = 0, n = updateCacheReset.length; i < n; i++) {
                    var bone = updateCacheReset[i];
                    bone.ax = bone.x;
                    bone.ay = bone.y;
                    bone.arotation = bone.rotation;
                    bone.ascaleX = bone.scaleX;
                    bone.ascaleY = bone.scaleY;
                    bone.ashearX = bone.shearX;
                    bone.ashearY = bone.shearY;
                    bone.appliedValid = true;
                }
                var updateCache = this._updateCache;
                for (var i = 0, n = updateCache.length; i < n; i++)
                    updateCache[i].update();
            };
            Skeleton.prototype.setToSetupPose = function () {
                this.setBonesToSetupPose();
                this.setSlotsToSetupPose();
            };
            Skeleton.prototype.setBonesToSetupPose = function () {
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    bones[i].setToSetupPose();
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.mix = constraint.data.mix;
                }
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                    constraint.scaleMix = data.scaleMix;
                    constraint.shearMix = data.shearMix;
                }
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    var data = constraint.data;
                    constraint.position = data.position;
                    constraint.spacing = data.spacing;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                }
            };
            Skeleton.prototype.setSlotsToSetupPose = function () {
                var slots = this.slots;
                core.Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
                for (var i = 0, n = slots.length; i < n; i++)
                    slots[i].setToSetupPose();
            };
            Skeleton.prototype.getRootBone = function () {
                if (this.bones.length == 0)
                    return null;
                return this.bones[0];
            };
            Skeleton.prototype.findBone = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.data.name == boneName)
                        return bone;
                }
                return null;
            };
            Skeleton.prototype.findBoneIndex = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    if (bones[i].data.name == boneName)
                        return i;
                return -1;
            };
            Skeleton.prototype.findSlot = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName)
                        return slot;
                }
                return null;
            };
            Skeleton.prototype.findSlotIndex = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                    if (slots[i].data.name == slotName)
                        return i;
                return -1;
            };
            Skeleton.prototype.setSkinByName = function (skinName) {
                var skin = this.data.findSkin(skinName);
                if (skin == null)
                    throw new Error("Skin not found: " + skinName);
                this.setSkin(skin);
            };
            Skeleton.prototype.setSkin = function (newSkin) {
                if (newSkin != null) {
                    if (this.skin != null)
                        newSkin.attachAll(this, this.skin);
                    else {
                        var slots = this.slots;
                        for (var i = 0, n = slots.length; i < n; i++) {
                            var slot = slots[i];
                            var name_1 = slot.data.attachmentName;
                            if (name_1 != null) {
                                var attachment = newSkin.getAttachment(i, name_1);
                                if (attachment != null)
                                    slot.setAttachment(attachment);
                            }
                        }
                    }
                }
                this.skin = newSkin;
            };
            Skeleton.prototype.getAttachmentByName = function (slotName, attachmentName) {
                return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
            };
            Skeleton.prototype.getAttachment = function (slotIndex, attachmentName) {
                if (attachmentName == null)
                    throw new Error("attachmentName cannot be null.");
                if (this.skin != null) {
                    var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                    if (attachment != null)
                        return attachment;
                }
                if (this.data.defaultSkin != null)
                    return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
                return null;
            };
            Skeleton.prototype.setAttachment = function (slotName, attachmentName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName) {
                        var attachment = null;
                        if (attachmentName != null) {
                            attachment = this.getAttachment(i, attachmentName);
                            if (attachment == null)
                                throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                        }
                        slot.setAttachment(attachment);
                        return;
                    }
                }
                throw new Error("Slot not found: " + slotName);
            };
            Skeleton.prototype.findIkConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var ikConstraint = ikConstraints[i];
                    if (ikConstraint.data.name == constraintName)
                        return ikConstraint;
                }
                return null;
            };
            Skeleton.prototype.findTransformConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.data.name == constraintName)
                        return constraint;
                }
                return null;
            };
            Skeleton.prototype.findPathConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.data.name == constraintName)
                        return constraint;
                }
                return null;
            };
            Skeleton.prototype.getBounds = function (offset, size) {
                if (offset == null)
                    throw new Error("offset cannot be null.");
                if (size == null)
                    throw new Error("size cannot be null.");
                var drawOrder = this.drawOrder;
                var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
                for (var i = 0, n = drawOrder.length; i < n; i++) {
                    var slot = drawOrder[i];
                    var vertices = null;
                    var attachment = slot.getAttachment();
                    if (attachment instanceof core.RegionAttachment)
                        vertices = attachment.updateWorldVertices(slot, false);
                    else if (attachment instanceof core.MeshAttachment)
                        vertices = attachment.updateWorldVertices(slot, true);
                    if (vertices != null) {
                        for (var ii = 0, nn = vertices.length; ii < nn; ii += 8) {
                            var x = vertices[ii], y = vertices[ii + 1];
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }
                offset.set(minX, minY);
                size.set(maxX - minX, maxY - minY);
            };
            Skeleton.prototype.update = function (delta) {
                this.time += delta;
            };
            return Skeleton;
        }());
        core.Skeleton = Skeleton;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonBounds = (function () {
            function SkeletonBounds() {
                this.minX = 0;
                this.minY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.boundingBoxes = new Array();
                this.polygons = new Array();
                this.polygonPool = new core.Pool(function () {
                    return core.Utils.newFloatArray(16);
                });
            }
            SkeletonBounds.prototype.update = function (skeleton, updateAabb) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                var boundingBoxes = this.boundingBoxes;
                var polygons = this.polygons;
                var polygonPool = this.polygonPool;
                var slots = skeleton.slots;
                var slotCount = slots.length;
                boundingBoxes.length = 0;
                polygonPool.freeAll(polygons);
                polygons.length = 0;
                for (var i = 0; i < slotCount; i++) {
                    var slot = slots[i];
                    var attachment = slot.getAttachment();
                    if (attachment instanceof core.BoundingBoxAttachment) {
                        var boundingBox = attachment;
                        boundingBoxes.push(boundingBox);
                        var polygon = polygonPool.obtain();
                        if (polygon.length != boundingBox.worldVerticesLength) {
                            polygon = core.Utils.newFloatArray(boundingBox.worldVerticesLength);
                        }
                        polygons.push(polygon);
                        boundingBox.computeWorldVertices(slot, polygon);
                    }
                }
                if (updateAabb)
                    this.aabbCompute();
            };
            SkeletonBounds.prototype.aabbCompute = function () {
                var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++) {
                    var polygon = polygons[i];
                    var vertices = polygon;
                    for (var ii = 0, nn = polygon.length; ii < nn; ii += 2) {
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
            };
            SkeletonBounds.prototype.aabbContainsPoint = function (x, y) {
                return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
            };
            SkeletonBounds.prototype.aabbIntersectsSegment = function (x1, y1, x2, y2) {
                var minX = this.minX;
                var minY = this.minY;
                var maxX = this.maxX;
                var maxY = this.maxY;
                if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY))
                    return false;
                var m = (y2 - y1) / (x2 - x1);
                var y = m * (minX - x1) + y1;
                if (y > minY && y < maxY)
                    return true;
                y = m * (maxX - x1) + y1;
                if (y > minY && y < maxY)
                    return true;
                var x = (minY - y1) / m + x1;
                if (x > minX && x < maxX)
                    return true;
                x = (maxY - y1) / m + x1;
                if (x > minX && x < maxX)
                    return true;
                return false;
            };
            SkeletonBounds.prototype.aabbIntersectsSkeleton = function (bounds) {
                return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
            };
            SkeletonBounds.prototype.containsPoint = function (x, y) {
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++)
                    if (this.containsPointPolygon(polygons[i], x, y))
                        return this.boundingBoxes[i];
                return null;
            };
            SkeletonBounds.prototype.containsPointPolygon = function (polygon, x, y) {
                var vertices = polygon;
                var nn = polygon.length;
                var prevIndex = nn - 2;
                var inside = false;
                for (var ii = 0; ii < nn; ii += 2) {
                    var vertexY = vertices[ii + 1];
                    var prevY = vertices[prevIndex + 1];
                    if ((vertexY < y && prevY >= y) || (prevY < y && vertexY >= y)) {
                        var vertexX = vertices[ii];
                        if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x)
                            inside = !inside;
                    }
                    prevIndex = ii;
                }
                return inside;
            };
            SkeletonBounds.prototype.intersectsSegment = function (x1, y1, x2, y2) {
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++)
                    if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2))
                        return this.boundingBoxes[i];
                return null;
            };
            SkeletonBounds.prototype.intersectsSegmentPolygon = function (polygon, x1, y1, x2, y2) {
                var vertices = polygon;
                var nn = polygon.length;
                var width12 = x1 - x2, height12 = y1 - y2;
                var det1 = x1 * y2 - y1 * x2;
                var x3 = vertices[nn - 2], y3 = vertices[nn - 1];
                for (var ii = 0; ii < nn; ii += 2) {
                    var x4 = vertices[ii], y4 = vertices[ii + 1];
                    var det2 = x3 * y4 - y3 * x4;
                    var width34 = x3 - x4, height34 = y3 - y4;
                    var det3 = width12 * height34 - height12 * width34;
                    var x = (det1 * width34 - width12 * det2) / det3;
                    if (((x >= x3 && x <= x4) || (x >= x4 && x <= x3)) && ((x >= x1 && x <= x2) || (x >= x2 && x <= x1))) {
                        var y = (det1 * height34 - height12 * det2) / det3;
                        if (((y >= y3 && y <= y4) || (y >= y4 && y <= y3)) && ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)))
                            return true;
                    }
                    x3 = x4;
                    y3 = y4;
                }
                return false;
            };
            SkeletonBounds.prototype.getPolygon = function (boundingBox) {
                if (boundingBox == null)
                    throw new Error("boundingBox cannot be null.");
                var index = this.boundingBoxes.indexOf(boundingBox);
                return index == -1 ? null : this.polygons[index];
            };
            SkeletonBounds.prototype.getWidth = function () {
                return this.maxX - this.minX;
            };
            SkeletonBounds.prototype.getHeight = function () {
                return this.maxY - this.minY;
            };
            return SkeletonBounds;
        }());
        core.SkeletonBounds = SkeletonBounds;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonData = (function () {
            function SkeletonData() {
                this.bones = new Array();
                this.slots = new Array();
                this.skins = new Array();
                this.events = new Array();
                this.animations = new Array();
                this.ikConstraints = new Array();
                this.transformConstraints = new Array();
                this.pathConstraints = new Array();
                this.fps = 0;
            }
            SkeletonData.prototype.findBone = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.name == boneName)
                        return bone;
                }
                return null;
            };
            SkeletonData.prototype.findBoneIndex = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    if (bones[i].name == boneName)
                        return i;
                return -1;
            };
            SkeletonData.prototype.findSlot = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.name == slotName)
                        return slot;
                }
                return null;
            };
            SkeletonData.prototype.findSlotIndex = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                    if (slots[i].name == slotName)
                        return i;
                return -1;
            };
            SkeletonData.prototype.findSkin = function (skinName) {
                if (skinName == null)
                    throw new Error("skinName cannot be null.");
                var skins = this.skins;
                for (var i = 0, n = skins.length; i < n; i++) {
                    var skin = skins[i];
                    if (skin.name == skinName)
                        return skin;
                }
                return null;
            };
            SkeletonData.prototype.findEvent = function (eventDataName) {
                if (eventDataName == null)
                    throw new Error("eventDataName cannot be null.");
                var events = this.events;
                for (var i = 0, n = events.length; i < n; i++) {
                    var event_4 = events[i];
                    if (event_4.name == eventDataName)
                        return event_4;
                }
                return null;
            };
            SkeletonData.prototype.findAnimation = function (animationName) {
                if (animationName == null)
                    throw new Error("animationName cannot be null.");
                var animations = this.animations;
                for (var i = 0, n = animations.length; i < n; i++) {
                    var animation = animations[i];
                    if (animation.name == animationName)
                        return animation;
                }
                return null;
            };
            SkeletonData.prototype.findIkConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findTransformConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findPathConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findPathConstraintIndex = function (pathConstraintName) {
                if (pathConstraintName == null)
                    throw new Error("pathConstraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++)
                    if (pathConstraints[i].name == pathConstraintName)
                        return i;
                return -1;
            };
            return SkeletonData;
        }());
        core.SkeletonData = SkeletonData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonJson = (function () {
            function SkeletonJson(attachmentLoader) {
                this.scale = 1;
                this.linkedMeshes = new Array();
                this.attachmentLoader = attachmentLoader;
            }
            SkeletonJson.prototype.readSkeletonData = function (json) {
                var scale = this.scale;
                var skeletonData = new core.SkeletonData();
                var root = typeof (json) === "string" ? JSON.parse(json) : json;
                var skeletonMap = root.skeleton;
                if (skeletonMap != null) {
                    skeletonData.hash = skeletonMap.hash;
                    skeletonData.version = skeletonMap.spine;
                    skeletonData.width = skeletonMap.width;
                    skeletonData.height = skeletonMap.height;
                    skeletonData.fps = skeletonMap.fps;
                    skeletonData.imagesPath = skeletonMap.images;
                }
                if (root.bones) {
                    for (var i = 0; i < root.bones.length; i++) {
                        var boneMap = root.bones[i];
                        var parent_2 = null;
                        var parentName = this.getValue(boneMap, "parent", null);
                        if (parentName != null) {
                            parent_2 = skeletonData.findBone(parentName);
                            if (parent_2 == null)
                                throw new Error("Parent bone not found: " + parentName);
                        }
                        var data = new core.BoneData(skeletonData.bones.length, boneMap.name, parent_2);
                        data.length = this.getValue(boneMap, "length", 0) * scale;
                        data.x = this.getValue(boneMap, "x", 0) * scale;
                        data.y = this.getValue(boneMap, "y", 0) * scale;
                        data.rotation = this.getValue(boneMap, "rotation", 0);
                        data.scaleX = this.getValue(boneMap, "scaleX", 1);
                        data.scaleY = this.getValue(boneMap, "scaleY", 1);
                        data.shearX = this.getValue(boneMap, "shearX", 0);
                        data.shearY = this.getValue(boneMap, "shearY", 0);
                        if (boneMap.hasOwnProperty("inheritScale") || boneMap.hasOwnProperty("inheritRotation")) {
                            data.transformMode = SkeletonJson.transformModeLegacy(this.getValue(boneMap, "inheritRotation", true), this.getValue(boneMap, "inheritScale", true));
                        }
                        else {
                            data.transformMode = SkeletonJson.transformModeFromString(this.getValue(boneMap, "transform", "normal"));
                        }
                        skeletonData.bones.push(data);
                    }
                }
                if (root.slots) {
                    for (var i = 0; i < root.slots.length; i++) {
                        var slotMap = root.slots[i];
                        var slotName = slotMap.name;
                        var boneName = slotMap.bone;
                        var boneData = skeletonData.findBone(boneName);
                        if (boneData == null)
                            throw new Error("Slot bone not found: " + boneName);
                        var data = new core.SlotData(skeletonData.slots.length, slotName, boneData);
                        var color = this.getValue(slotMap, "color", null);
                        if (color != null)
                            data.color.setFromString(color);
                        data.attachmentName = this.getValue(slotMap, "attachment", null);
                        data.blendMode = SkeletonJson.blendModeFromString(this.getValue(slotMap, "blend", "normal"));
                        skeletonData.slots.push(data);
                    }
                }
                if (root.ik) {
                    for (var i = 0; i < root.ik.length; i++) {
                        var constraintMap = root.ik[i];
                        var data = new core.IkConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("IK bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findBone(targetName);
                        if (data.target == null)
                            throw new Error("IK target bone not found: " + targetName);
                        data.bendDirection = this.getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                        data.mix = this.getValue(constraintMap, "mix", 1);
                        skeletonData.ikConstraints.push(data);
                    }
                }
                if (root.transform) {
                    for (var i = 0; i < root.transform.length; i++) {
                        var constraintMap = root.transform[i];
                        var data = new core.TransformConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("Transform constraint bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findBone(targetName);
                        if (data.target == null)
                            throw new Error("Transform constraint target bone not found: " + targetName);
                        data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                        data.offsetX = this.getValue(constraintMap, "x", 0) * scale;
                        data.offsetY = this.getValue(constraintMap, "y", 0) * scale;
                        data.offsetScaleX = this.getValue(constraintMap, "scaleX", 0);
                        data.offsetScaleY = this.getValue(constraintMap, "scaleY", 0);
                        data.offsetShearY = this.getValue(constraintMap, "shearY", 0);
                        data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                        data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                        data.scaleMix = this.getValue(constraintMap, "scaleMix", 1);
                        data.shearMix = this.getValue(constraintMap, "shearMix", 1);
                        skeletonData.transformConstraints.push(data);
                    }
                }
                if (root.path) {
                    for (var i = 0; i < root.path.length; i++) {
                        var constraintMap = root.path[i];
                        var data = new core.PathConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("Transform constraint bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findSlot(targetName);
                        if (data.target == null)
                            throw new Error("Path target slot not found: " + targetName);
                        data.positionMode = SkeletonJson.positionModeFromString(this.getValue(constraintMap, "positionMode", "percent"));
                        data.spacingMode = SkeletonJson.spacingModeFromString(this.getValue(constraintMap, "spacingMode", "length"));
                        data.rotateMode = SkeletonJson.rotateModeFromString(this.getValue(constraintMap, "rotateMode", "tangent"));
                        data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                        data.position = this.getValue(constraintMap, "position", 0);
                        if (data.positionMode == core.PositionMode.Fixed)
                            data.position *= scale;
                        data.spacing = this.getValue(constraintMap, "spacing", 0);
                        if (data.spacingMode == core.SpacingMode.Length || data.spacingMode == core.SpacingMode.Fixed)
                            data.spacing *= scale;
                        data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                        data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                        skeletonData.pathConstraints.push(data);
                    }
                }
                if (root.skins) {
                    for (var skinName in root.skins) {
                        var skinMap = root.skins[skinName];
                        var skin = new core.Skin(skinName);
                        for (var slotName in skinMap) {
                            var slotIndex = skeletonData.findSlotIndex(slotName);
                            if (slotIndex == -1)
                                throw new Error("Slot not found: " + slotName);
                            var slotMap = skinMap[slotName];
                            for (var entryName in slotMap) {
                                var attachment = this.readAttachment(slotMap[entryName], skin, slotIndex, entryName);
                                if (attachment != null)
                                    skin.addAttachment(slotIndex, entryName, attachment);
                            }
                        }
                        skeletonData.skins.push(skin);
                        if (skin.name == "default")
                            skeletonData.defaultSkin = skin;
                    }
                }
                for (var i = 0, n = this.linkedMeshes.length; i < n; i++) {
                    var linkedMesh = this.linkedMeshes[i];
                    var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                    if (skin == null)
                        throw new Error("Skin not found: " + linkedMesh.skin);
                    var parent_3 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                    if (parent_3 == null)
                        throw new Error("Parent mesh not found: " + linkedMesh.parent);
                    linkedMesh.mesh.setParentMesh(parent_3);
                }
                this.linkedMeshes.length = 0;
                if (root.events) {
                    for (var eventName in root.events) {
                        var eventMap = root.events[eventName];
                        var data = new core.EventData(eventName);
                        data.intValue = this.getValue(eventMap, "int", 0);
                        data.floatValue = this.getValue(eventMap, "float", 0);
                        data.stringValue = this.getValue(eventMap, "string", "");
                        skeletonData.events.push(data);
                    }
                }
                if (root.animations) {
                    for (var animationName in root.animations) {
                        var animationMap = root.animations[animationName];
                        this.readAnimation(animationMap, animationName, skeletonData);
                    }
                }
                return skeletonData;
            };
            SkeletonJson.prototype.readAttachment = function (map, skin, slotIndex, name) {
                var scale = this.scale;
                name = this.getValue(map, "name", name);
                var type = this.getValue(map, "type", "region");
                switch (type) {
                    case "region": {
                        var path = this.getValue(map, "path", name);
                        var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                        if (region == null)
                            return null;
                        region.path = path;
                        region.x = this.getValue(map, "x", 0) * scale;
                        region.y = this.getValue(map, "y", 0) * scale;
                        region.scaleX = this.getValue(map, "scaleX", 1);
                        region.scaleY = this.getValue(map, "scaleY", 1);
                        region.rotation = this.getValue(map, "rotation", 0);
                        region.width = map.width * scale;
                        region.height = map.height * scale;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            region.color.setFromString(color);
                        return region;
                    }
                    case "boundingbox": {
                        var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                        if (box == null)
                            return null;
                        this.readVertices(map, box, map.vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            box.color.setFromString(color);
                        return box;
                    }
                    case "weightedmesh":
                    case "skinnedmesh":
                    case "mesh":
                    case "linkedmesh": {
                        var path = this.getValue(map, "path", name);
                        var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                        if (mesh == null)
                            return null;
                        mesh.path = path;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            mesh.color.setFromString(color);
                        var parent_4 = this.getValue(map, "parent", null);
                        if (parent_4 != null) {
                            mesh.inheritDeform = this.getValue(map, "deform", true);
                            this.linkedMeshes.push(new LinkedMesh(mesh, this.getValue(map, "skin", null), slotIndex, parent_4));
                            return mesh;
                        }
                        var uvs = map.uvs;
                        this.readVertices(map, mesh, uvs.length);
                        mesh.triangles = map.triangles;
                        mesh.regionUVs = uvs;
                        mesh.hullLength = this.getValue(map, "hull", 0) * 2;
                        return mesh;
                    }
                    case "path": {
                        var path = this.attachmentLoader.newPathAttachment(skin, name);
                        if (path == null)
                            return null;
                        path.closed = this.getValue(map, "closed", false);
                        path.constantSpeed = this.getValue(map, "constantSpeed", true);
                        var vertexCount = map.vertexCount;
                        this.readVertices(map, path, vertexCount << 1);
                        var lengths = core.Utils.newArray(vertexCount / 3, 0);
                        for (var i = 0; i < map.lengths.length; i++)
                            lengths[i++] = map.lengths[i] * scale;
                        path.lengths = lengths;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            path.color.setFromString(color);
                        return path;
                    }
                }
                return null;
            };
            SkeletonJson.prototype.readVertices = function (map, attachment, verticesLength) {
                var scale = this.scale;
                attachment.worldVerticesLength = verticesLength;
                var vertices = map.vertices;
                if (verticesLength == vertices.length) {
                    if (scale != 1) {
                        for (var i = 0, n = vertices.length; i < n; i++)
                            vertices[i] *= scale;
                    }
                    attachment.vertices = core.Utils.toFloatArray(vertices);
                    return;
                }
                var weights = new Array();
                var bones = new Array();
                for (var i = 0, n = vertices.length; i < n;) {
                    var boneCount = vertices[i++];
                    bones.push(boneCount);
                    for (var nn = i + boneCount * 4; i < nn; i += 4) {
                        bones.push(vertices[i]);
                        weights.push(vertices[i + 1] * scale);
                        weights.push(vertices[i + 2] * scale);
                        weights.push(vertices[i + 3]);
                    }
                }
                attachment.bones = bones;
                attachment.vertices = core.Utils.toFloatArray(weights);
            };
            SkeletonJson.prototype.readAnimation = function (map, name, skeletonData) {
                var scale = this.scale;
                var timelines = new Array();
                var duration = 0;
                if (map.slots) {
                    for (var slotName in map.slots) {
                        var slotMap = map.slots[slotName];
                        var slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1)
                            throw new Error("Slot not found: " + slotName);
                        for (var timelineName in slotMap) {
                            var timelineMap = slotMap[timelineName];
                            if (timelineName == "color") {
                                var timeline = new core.ColorTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var color = new core.Color();
                                    color.setFromString(valueMap.color);
                                    timeline.setFrame(frameIndex, valueMap.time, color.r, color.g, color.b, color.a);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.ColorTimeline.ENTRIES]);
                            }
                            else if (timelineName = "attachment") {
                                var timeline = new core.AttachmentTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex++, valueMap.time, valueMap.name);
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            }
                            else
                                throw new Error("Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")");
                        }
                    }
                }
                if (map.bones) {
                    for (var boneName in map.bones) {
                        var boneMap = map.bones[boneName];
                        var boneIndex = skeletonData.findBoneIndex(boneName);
                        if (boneIndex == -1)
                            throw new Error("Bone not found: " + boneName);
                        for (var timelineName in boneMap) {
                            var timelineMap = boneMap[timelineName];
                            if (timelineName === "rotate") {
                                var timeline = new core.RotateTimeline(timelineMap.length);
                                timeline.boneIndex = boneIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, valueMap.angle);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.RotateTimeline.ENTRIES]);
                            }
                            else if (timelineName === "translate" || timelineName === "scale" || timelineName === "shear") {
                                var timeline = null;
                                var timelineScale = 1;
                                if (timelineName === "scale")
                                    timeline = new core.ScaleTimeline(timelineMap.length);
                                else if (timelineName === "shear")
                                    timeline = new core.ShearTimeline(timelineMap.length);
                                else {
                                    timeline = new core.TranslateTimeline(timelineMap.length);
                                    timelineScale = scale;
                                }
                                timeline.boneIndex = boneIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var x = this.getValue(valueMap, "x", 0), y = this.getValue(valueMap, "y", 0);
                                    timeline.setFrame(frameIndex, valueMap.time, x * timelineScale, y * timelineScale);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TranslateTimeline.ENTRIES]);
                            }
                            else
                                throw new Error("Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")");
                        }
                    }
                }
                if (map.ik) {
                    for (var constraintName in map.ik) {
                        var constraintMap = map.ik[constraintName];
                        var constraint = skeletonData.findIkConstraint(constraintName);
                        var timeline = new core.IkConstraintTimeline(constraintMap.length);
                        timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                        var frameIndex = 0;
                        for (var i = 0; i < constraintMap.length; i++) {
                            var valueMap = constraintMap[i];
                            timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "mix", 1), this.getValue(valueMap, "bendPositive", true) ? 1 : -1);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.IkConstraintTimeline.ENTRIES]);
                    }
                }
                if (map.transform) {
                    for (var constraintName in map.transform) {
                        var constraintMap = map.transform[constraintName];
                        var constraint = skeletonData.findTransformConstraint(constraintName);
                        var timeline = new core.TransformConstraintTimeline(constraintMap.length);
                        timeline.transformConstraintIndex = skeletonData.transformConstraints.indexOf(constraint);
                        var frameIndex = 0;
                        for (var i = 0; i < constraintMap.length; i++) {
                            var valueMap = constraintMap[i];
                            timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1), this.getValue(valueMap, "scaleMix", 1), this.getValue(valueMap, "shearMix", 1));
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TransformConstraintTimeline.ENTRIES]);
                    }
                }
                if (map.paths) {
                    for (var constraintName in map.paths) {
                        var constraintMap = map.paths[constraintName];
                        var index = skeletonData.findPathConstraintIndex(constraintName);
                        if (index == -1)
                            throw new Error("Path constraint not found: " + constraintName);
                        var data = skeletonData.pathConstraints[index];
                        for (var timelineName in constraintMap) {
                            var timelineMap = constraintMap[timelineName];
                            if (timelineName === "position" || timelineName === "spacing") {
                                var timeline = null;
                                var timelineScale = 1;
                                if (timelineName === "spacing") {
                                    timeline = new core.PathConstraintSpacingTimeline(timelineMap.length);
                                    if (data.spacingMode == core.SpacingMode.Length || data.spacingMode == core.SpacingMode.Fixed)
                                        timelineScale = scale;
                                }
                                else {
                                    timeline = new core.PathConstraintPositionTimeline(timelineMap.length);
                                    if (data.positionMode == core.PositionMode.Fixed)
                                        timelineScale = scale;
                                }
                                timeline.pathConstraintIndex = index;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, timelineName, 0) * timelineScale);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.PathConstraintPositionTimeline.ENTRIES]);
                            }
                            else if (timelineName === "mix") {
                                var timeline = new core.PathConstraintMixTimeline(timelineMap.length);
                                timeline.pathConstraintIndex = index;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1));
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.PathConstraintMixTimeline.ENTRIES]);
                            }
                        }
                    }
                }
                if (map.deform) {
                    for (var deformName in map.deform) {
                        var deformMap = map.deform[deformName];
                        var skin = skeletonData.findSkin(deformName);
                        if (skin == null)
                            throw new Error("Skin not found: " + deformName);
                        for (var slotName in deformMap) {
                            var slotMap = deformMap[slotName];
                            var slotIndex = skeletonData.findSlotIndex(slotName);
                            if (slotIndex == -1)
                                throw new Error("Slot not found: " + slotMap.name);
                            for (var timelineName in slotMap) {
                                var timelineMap = slotMap[timelineName];
                                var attachment = skin.getAttachment(slotIndex, timelineName);
                                if (attachment == null)
                                    throw new Error("Deform attachment not found: " + timelineMap.name);
                                var weighted = attachment.bones != null;
                                var vertices = attachment.vertices;
                                var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                                var timeline = new core.DeformTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                timeline.attachment = attachment;
                                var frameIndex = 0;
                                for (var j = 0; j < timelineMap.length; j++) {
                                    var valueMap = timelineMap[j];
                                    var deform = void 0;
                                    var verticesValue = this.getValue(valueMap, "vertices", null);
                                    if (verticesValue == null)
                                        deform = weighted ? core.Utils.newFloatArray(deformLength) : vertices;
                                    else {
                                        deform = core.Utils.newFloatArray(deformLength);
                                        var start = this.getValue(valueMap, "offset", 0);
                                        core.Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                                        if (scale != 1) {
                                            for (var i = start, n = i + verticesValue.length; i < n; i++)
                                                deform[i] *= scale;
                                        }
                                        if (!weighted) {
                                            for (var i = 0; i < deformLength; i++)
                                                deform[i] += vertices[i];
                                        }
                                    }
                                    timeline.setFrame(frameIndex, valueMap.time, deform);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            }
                        }
                    }
                }
                var drawOrderNode = map.drawOrder;
                if (drawOrderNode == null)
                    drawOrderNode = map.draworder;
                if (drawOrderNode != null) {
                    var timeline = new core.DrawOrderTimeline(drawOrderNode.length);
                    var slotCount = skeletonData.slots.length;
                    var frameIndex = 0;
                    for (var j = 0; j < drawOrderNode.length; j++) {
                        var drawOrderMap = drawOrderNode[j];
                        var drawOrder = null;
                        var offsets = this.getValue(drawOrderMap, "offsets", null);
                        if (offsets != null) {
                            drawOrder = core.Utils.newArray(slotCount, -1);
                            var unchanged = core.Utils.newArray(slotCount - offsets.length, 0);
                            var originalIndex = 0, unchangedIndex = 0;
                            for (var i = 0; i < offsets.length; i++) {
                                var offsetMap = offsets[i];
                                var slotIndex = skeletonData.findSlotIndex(offsetMap.slot);
                                if (slotIndex == -1)
                                    throw new Error("Slot not found: " + offsetMap.slot);
                                while (originalIndex != slotIndex)
                                    unchanged[unchangedIndex++] = originalIndex++;
                                drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                            }
                            while (originalIndex < slotCount)
                                unchanged[unchangedIndex++] = originalIndex++;
                            for (var i = slotCount - 1; i >= 0; i--)
                                if (drawOrder[i] == -1)
                                    drawOrder[i] = unchanged[--unchangedIndex];
                        }
                        timeline.setFrame(frameIndex++, drawOrderMap.time, drawOrder);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
                if (map.events) {
                    var timeline = new core.EventTimeline(map.events.length);
                    var frameIndex = 0;
                    for (var i = 0; i < map.events.length; i++) {
                        var eventMap = map.events[i];
                        var eventData = skeletonData.findEvent(eventMap.name);
                        if (eventData == null)
                            throw new Error("Event not found: " + eventMap.name);
                        var event_5 = new core.Event(eventMap.time, eventData);
                        event_5.intValue = this.getValue(eventMap, "int", eventData.intValue);
                        event_5.floatValue = this.getValue(eventMap, "float", eventData.floatValue);
                        event_5.stringValue = this.getValue(eventMap, "string", eventData.stringValue);
                        timeline.setFrame(frameIndex++, event_5);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
                if (isNaN(duration)) {
                    throw new Error("Error while parsing animation, duration is NaN");
                }
                skeletonData.animations.push(new core.Animation(name, timelines, duration));
            };
            SkeletonJson.prototype.readCurve = function (map, timeline, frameIndex) {
                if (!map.curve)
                    return;
                if (map.curve === "stepped")
                    timeline.setStepped(frameIndex);
                else if (Object.prototype.toString.call(map.curve) === '[object Array]') {
                    var curve = map.curve;
                    timeline.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
                }
            };
            SkeletonJson.prototype.getValue = function (map, prop, defaultValue) {
                return map[prop] !== undefined ? map[prop] : defaultValue;
            };
            SkeletonJson.blendModeFromString = function (str) {
                if (str === 'multiply')
                    return PIXI.BLEND_MODES.MULTIPLY;
                if (str === 'additive')
                    return PIXI.BLEND_MODES.ADD;
                if (str === 'screen')
                    return PIXI.BLEND_MODES.SCREEN;
                if (str === 'normal')
                    return PIXI.BLEND_MODES.NORMAL;
                throw new Error("Unknown blend mode: " + str);
            };
            SkeletonJson.positionModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "fixed")
                    return core.PositionMode.Fixed;
                if (str == "percent")
                    return core.PositionMode.Percent;
                throw new Error("Unknown position mode: " + str);
            };
            SkeletonJson.spacingModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "length")
                    return core.SpacingMode.Length;
                if (str == "fixed")
                    return core.SpacingMode.Fixed;
                if (str == "percent")
                    return core.SpacingMode.Percent;
                throw new Error("Unknown position mode: " + str);
            };
            SkeletonJson.rotateModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "tangent")
                    return core.RotateMode.Tangent;
                if (str == "chain")
                    return core.RotateMode.Chain;
                if (str == "chainscale")
                    return core.RotateMode.ChainScale;
                throw new Error("Unknown rotate mode: " + str);
            };
            SkeletonJson.transformModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "normal")
                    return core.TransformMode.Normal;
                if (str == "onlytranslation")
                    return core.TransformMode.OnlyTranslation;
                if (str == "norotationorreflection")
                    return core.TransformMode.NoRotationOrReflection;
                if (str == "noscale")
                    return core.TransformMode.NoScale;
                if (str == "noscaleorreflection")
                    return core.TransformMode.NoScaleOrReflection;
                throw new Error("Unknown transform mode: " + str);
            };
            SkeletonJson.transformModeLegacy = function (inheritRotation, inheritScale) {
                console.log("Deprecation Warning: re-export your model with spine 3.5, or downgrade to pixi-spine 1.1 branch. There were many breaking changes, place breakpoint here if you want to know which model is broken");
                if (inheritRotation && inheritScale) {
                    return core.TransformMode.Normal;
                }
                else if (inheritRotation) {
                    return core.TransformMode.NoScaleOrReflection;
                }
                else if (inheritScale) {
                    return core.TransformMode.NoRotationOrReflection;
                }
                else {
                    return core.TransformMode.OnlyTranslation;
                }
            };
            return SkeletonJson;
        }());
        core.SkeletonJson = SkeletonJson;
        var LinkedMesh = (function () {
            function LinkedMesh(mesh, skin, slotIndex, parent) {
                this.mesh = mesh;
                this.skin = skin;
                this.slotIndex = slotIndex;
                this.parent = parent;
            }
            return LinkedMesh;
        }());
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Skin = (function () {
            function Skin(name) {
                this.attachments = new Array();
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            Skin.prototype.addAttachment = function (slotIndex, name, attachment) {
                if (attachment == null)
                    throw new Error("attachment cannot be null.");
                var attachments = this.attachments;
                if (slotIndex >= attachments.length)
                    attachments.length = slotIndex + 1;
                if (!attachments[slotIndex])
                    attachments[slotIndex] = {};
                attachments[slotIndex][name] = attachment;
            };
            Skin.prototype.getAttachment = function (slotIndex, name) {
                var dictionary = this.attachments[slotIndex];
                return dictionary ? dictionary[name] : null;
            };
            Skin.prototype.attachAll = function (skeleton, oldSkin) {
                var slotIndex = 0;
                for (var i = 0; i < skeleton.slots.length; i++) {
                    var slot = skeleton.slots[i];
                    var slotAttachment = slot.getAttachment();
                    if (slotAttachment && slotIndex < oldSkin.attachments.length) {
                        var dictionary = oldSkin.attachments[slotIndex];
                        for (var key in dictionary) {
                            var skinAttachment = dictionary[key];
                            if (slotAttachment == skinAttachment) {
                                var attachment = this.getAttachment(slotIndex, name);
                                if (attachment != null)
                                    slot.setAttachment(attachment);
                                break;
                            }
                        }
                    }
                    slotIndex++;
                }
            };
            return Skin;
        }());
        core.Skin = Skin;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Slot = (function () {
            function Slot(data, bone) {
                this.attachmentVertices = new Array();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (bone == null)
                    throw new Error("bone cannot be null.");
                this.data = data;
                this.bone = bone;
                this.color = new core.Color();
                this.blendMode = data.blendMode;
                this.setToSetupPose();
            }
            Slot.prototype.getAttachment = function () {
                return this.attachment;
            };
            Slot.prototype.setAttachment = function (attachment) {
                if (this.attachment == attachment)
                    return;
                this.attachment = attachment;
                this.attachmentTime = this.bone.skeleton.time;
                this.attachmentVertices.length = 0;
            };
            Slot.prototype.setAttachmentTime = function (time) {
                this.attachmentTime = this.bone.skeleton.time - time;
            };
            Slot.prototype.getAttachmentTime = function () {
                return this.bone.skeleton.time - this.attachmentTime;
            };
            Slot.prototype.setToSetupPose = function () {
                this.color.setFromColor(this.data.color);
                if (this.data.attachmentName == null)
                    this.attachment = null;
                else {
                    this.attachment = null;
                    this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
                }
            };
            return Slot;
        }());
        core.Slot = Slot;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SlotData = (function () {
            function SlotData(index, name, boneData) {
                this.color = new core.Color(1, 1, 1, 1);
                if (index < 0)
                    throw new Error("index must be >= 0.");
                if (name == null)
                    throw new Error("name cannot be null.");
                if (boneData == null)
                    throw new Error("boneData cannot be null.");
                this.index = index;
                this.name = name;
                this.boneData = boneData;
            }
            return SlotData;
        }());
        core.SlotData = SlotData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Texture = (function () {
            function Texture(image) {
                this._image = image;
            }
            Texture.prototype.getImage = function () {
                return this._image;
            };
            Texture.filterFromString = function (text) {
                switch (text.toLowerCase()) {
                    case "nearest": return TextureFilter.Nearest;
                    case "linear": return TextureFilter.Linear;
                    case "mipmap": return TextureFilter.MipMap;
                    case "mipmapnearestnearest": return TextureFilter.MipMapNearestNearest;
                    case "mipmaplinearnearest": return TextureFilter.MipMapLinearNearest;
                    case "mipmapnearestlinear": return TextureFilter.MipMapNearestLinear;
                    case "mipmaplinearlinear": return TextureFilter.MipMapLinearLinear;
                    default: throw new Error("Unknown texture filter " + text);
                }
            };
            Texture.wrapFromString = function (text) {
                switch (text.toLowerCase()) {
                    case "mirroredtepeat": return TextureWrap.MirroredRepeat;
                    case "clamptoedge": return TextureWrap.ClampToEdge;
                    case "repeat": return TextureWrap.Repeat;
                    default: throw new Error("Unknown texture wrap " + text);
                }
            };
            return Texture;
        }());
        core.Texture = Texture;
        (function (TextureFilter) {
            TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
            TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
            TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
            TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
            TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
            TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
            TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear";
        })(core.TextureFilter || (core.TextureFilter = {}));
        var TextureFilter = core.TextureFilter;
        (function (TextureWrap) {
            TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
            TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
            TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat";
        })(core.TextureWrap || (core.TextureWrap = {}));
        var TextureWrap = core.TextureWrap;
        var TextureRegion = (function () {
            function TextureRegion() {
                this.size = null;
            }
            Object.defineProperty(TextureRegion.prototype, "width", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        return tex.crop.width;
                    }
                    if (tex.trim) {
                        return tex.trim.width;
                    }
                    return tex.orig.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "height", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        return tex.crop.height;
                    }
                    if (tex.trim) {
                        return tex.trim.height;
                    }
                    return tex.orig.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "u", {
                get: function () {
                    return this.texture._uvs.x0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "v", {
                get: function () {
                    return this.texture._uvs.y0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "u2", {
                get: function () {
                    return this.texture._uvs.x2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "v2", {
                get: function () {
                    return this.texture._uvs.y2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "offsetX", {
                get: function () {
                    var tex = this.texture;
                    return tex.trim ? tex.trim.x : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "offsetY", {
                get: function () {
                    console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on.");
                    return this.spineOffsetY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "pixiOffsetY", {
                get: function () {
                    var tex = this.texture;
                    return tex.trim ? tex.trim.y : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "spineOffsetY", {
                get: function () {
                    var tex = this.texture;
                    return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "originalWidth", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        if (tex.trim) {
                            return tex.trim.width;
                        }
                        return tex.crop.width;
                    }
                    return tex.orig.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "originalHeight", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        if (tex.trim) {
                            return tex.trim.height;
                        }
                        return tex.crop.height;
                    }
                    return tex.orig.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "x", {
                get: function () {
                    return this.texture.frame.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "y", {
                get: function () {
                    return this.texture.frame.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "rotate", {
                get: function () {
                    return this.texture.rotate !== 0;
                },
                enumerable: true,
                configurable: true
            });
            return TextureRegion;
        }());
        core.TextureRegion = TextureRegion;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TextureAtlas = (function () {
            function TextureAtlas(atlasText, textureLoader, callback) {
                this.pages = new Array();
                this.regions = new Array();
                if (atlasText) {
                    this.addSpineAtlas(atlasText, textureLoader, callback);
                }
            }
            TextureAtlas.prototype.addTexture = function (name, texture) {
                var pages = this.pages;
                var page = null;
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].baseTexture === texture.baseTexture) {
                        page = pages[i];
                        break;
                    }
                }
                if (page === null) {
                    page = new TextureAtlasPage();
                    page.name = 'texturePage';
                    var baseTexture = texture.baseTexture;
                    page.width = baseTexture.realWidth;
                    page.height = baseTexture.realHeight;
                    page.baseTexture = baseTexture;
                    page.minFilter = page.magFilter = core.TextureFilter.Nearest;
                    page.uWrap = core.TextureWrap.ClampToEdge;
                    page.vWrap = core.TextureWrap.ClampToEdge;
                    pages.push(page);
                }
                var region = new TextureAtlasRegion();
                region.name = name;
                region.page = page;
                region.texture = texture;
                region.index = -1;
                this.regions.push(region);
                return region;
            };
            TextureAtlas.prototype.addTextureHash = function (textures, stripExtension) {
                for (var key in textures) {
                    if (textures.hasOwnProperty(key)) {
                        this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
                    }
                }
            };
            TextureAtlas.prototype.addSpineAtlas = function (atlasText, textureLoader, callback) {
                return this.load(atlasText, textureLoader, callback);
            };
            TextureAtlas.prototype.load = function (atlasText, textureLoader, callback) {
                var _this = this;
                if (textureLoader == null)
                    throw new Error("textureLoader cannot be null.");
                var reader = new TextureAtlasReader(atlasText);
                var tuple = new Array(4);
                var page = null;
                var iterateParser = function () {
                    while (true) {
                        var line = reader.readLine();
                        if (line == null) {
                            return callback && callback(_this);
                        }
                        line = line.trim();
                        if (line.length == 0)
                            page = null;
                        else if (!page) {
                            page = new TextureAtlasPage();
                            page.name = line;
                            if (reader.readTuple(tuple) == 2) {
                                page.width = parseInt(tuple[0]);
                                page.height = parseInt(tuple[1]);
                                reader.readTuple(tuple);
                            }
                            reader.readTuple(tuple);
                            page.minFilter = core.Texture.filterFromString(tuple[0]);
                            page.magFilter = core.Texture.filterFromString(tuple[1]);
                            var direction = reader.readValue();
                            page.uWrap = core.TextureWrap.ClampToEdge;
                            page.vWrap = core.TextureWrap.ClampToEdge;
                            if (direction == "x")
                                page.uWrap = core.TextureWrap.Repeat;
                            else if (direction == "y")
                                page.vWrap = core.TextureWrap.Repeat;
                            else if (direction == "xy")
                                page.uWrap = page.vWrap = core.TextureWrap.Repeat;
                            textureLoader(line, function (texture) {
                                page.baseTexture = texture;
                                if (!texture.hasLoaded) {
                                    texture.width = page.width;
                                    texture.height = page.height;
                                }
                                _this.pages.push(page);
                                page.setFilters();
                                if (!page.width || !page.height) {
                                    page.width = texture.realWidth;
                                    page.height = texture.realHeight;
                                    if (!page.width || !page.height) {
                                        console.log("ERROR spine atlas page " + page.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)");
                                    }
                                }
                                iterateParser();
                            });
                            _this.pages.push(page);
                            break;
                        }
                        else {
                            var region = new TextureAtlasRegion();
                            region.name = line;
                            region.page = page;
                            var rotate = reader.readValue() == "true" ? 6 : 0;
                            reader.readTuple(tuple);
                            var x = parseInt(tuple[0]);
                            var y = parseInt(tuple[1]);
                            reader.readTuple(tuple);
                            var width = parseInt(tuple[0]);
                            var height = parseInt(tuple[1]);
                            var resolution = page.baseTexture.resolution;
                            x /= resolution;
                            y /= resolution;
                            width /= resolution;
                            height /= resolution;
                            var frame = new PIXI.Rectangle(x, y, rotate ? height : width, rotate ? width : height);
                            if (reader.readTuple(tuple) == 4) {
                                if (reader.readTuple(tuple) == 4) {
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
                            if (PIXI.VERSION[0] == '4') {
                                region.texture = new PIXI.Texture(region.page.baseTexture, frame, orig, trim, rotate);
                            }
                            else {
                                var frame2 = new PIXI.Rectangle(x, y, width, height);
                                var crop = frame2.clone();
                                trim.width = originalWidth;
                                trim.height = originalHeight;
                                region.texture = new PIXI.Texture(region.page.baseTexture, frame2, crop, trim, rotate);
                            }
                            region.index = parseInt(reader.readValue());
                            region.texture._updateUvs();
                            _this.regions.push(region);
                        }
                    }
                };
                iterateParser();
            };
            TextureAtlas.prototype.findRegion = function (name) {
                for (var i = 0; i < this.regions.length; i++) {
                    if (this.regions[i].name == name) {
                        return this.regions[i];
                    }
                }
                return null;
            };
            TextureAtlas.prototype.dispose = function () {
                for (var i = 0; i < this.pages.length; i++) {
                    this.pages[i].baseTexture.dispose();
                }
            };
            return TextureAtlas;
        }());
        core.TextureAtlas = TextureAtlas;
        var TextureAtlasReader = (function () {
            function TextureAtlasReader(text) {
                this.index = 0;
                this.lines = text.split(/\r\n|\r|\n/);
            }
            TextureAtlasReader.prototype.readLine = function () {
                if (this.index >= this.lines.length)
                    return null;
                return this.lines[this.index++];
            };
            TextureAtlasReader.prototype.readValue = function () {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1)
                    throw new Error("Invalid line: " + line);
                return line.substring(colon + 1).trim();
            };
            TextureAtlasReader.prototype.readTuple = function (tuple) {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1)
                    throw new Error("Invalid line: " + line);
                var i = 0, lastMatch = colon + 1;
                for (; i < 3; i++) {
                    var comma = line.indexOf(",", lastMatch);
                    if (comma == -1)
                        break;
                    tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
                    lastMatch = comma + 1;
                }
                tuple[i] = line.substring(lastMatch).trim();
                return i + 1;
            };
            return TextureAtlasReader;
        }());
        var TextureAtlasPage = (function () {
            function TextureAtlasPage() {
            }
            TextureAtlasPage.prototype.setFilters = function () {
                var tex = this.baseTexture;
                var filter = this.minFilter;
                if (filter == core.TextureFilter.Linear) {
                    tex.scaleMode = PIXI.SCALE_MODES.LINEAR;
                }
                else if (this.minFilter == core.TextureFilter.Nearest) {
                    tex.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
                else {
                    tex.mipmap = true;
                    if (filter == core.TextureFilter.MipMapNearestNearest) {
                        tex.scaleMode = PIXI.SCALE_MODES.NEAREST;
                    }
                    else {
                        tex.scaleMode = PIXI.SCALE_MODES.LINEAR;
                    }
                }
            };
            return TextureAtlasPage;
        }());
        core.TextureAtlasPage = TextureAtlasPage;
        var TextureAtlasRegion = (function (_super) {
            __extends(TextureAtlasRegion, _super);
            function TextureAtlasRegion() {
                _super.apply(this, arguments);
            }
            return TextureAtlasRegion;
        }(core.TextureRegion));
        core.TextureAtlasRegion = TextureAtlasRegion;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TransformConstraint = (function () {
            function TransformConstraint(data, skeleton) {
                this.rotateMix = 0;
                this.translateMix = 0;
                this.scaleMix = 0;
                this.shearMix = 0;
                this.temp = new core.Vector2();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.rotateMix = data.rotateMix;
                this.translateMix = data.translateMix;
                this.scaleMix = data.scaleMix;
                this.shearMix = data.shearMix;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findBone(data.target.name);
            }
            TransformConstraint.prototype.apply = function () {
                this.update();
            };
            TransformConstraint.prototype.update = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                var ta = target.matrix.a, tb = target.matrix.c, tc = target.matrix.b, td = target.matrix.d;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var m = bone.matrix;
                    var modified = false;
                    if (rotateMix != 0) {
                        var a = m.a, b = m.c, c = m.b, d = m.d;
                        var r = Math.atan2(tc, ta) - Math.atan2(c, a) + this.data.offsetRotation * core.MathUtils.degRad;
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        var cos = Math.cos(r), sin = Math.sin(r);
                        m.a = cos * a - sin * c;
                        m.c = cos * b - sin * d;
                        m.b = sin * a + cos * c;
                        m.d = sin * b + cos * d;
                        modified = true;
                    }
                    if (translateMix != 0) {
                        var temp = this.temp;
                        target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                        m.tx += (temp.x - m.tx) * translateMix;
                        m.ty += (temp.y - m.ty) * translateMix;
                        modified = true;
                    }
                    if (scaleMix > 0) {
                        var s = Math.sqrt(m.a * m.a + m.b * m.b);
                        var ts = Math.sqrt(ta * ta + tc * tc);
                        if (s > 0.00001)
                            s = (s + (ts - s + this.data.offsetScaleX) * scaleMix) / s;
                        m.a *= s;
                        m.b *= s;
                        s = Math.sqrt(m.c * m.c + m.d * m.d);
                        ts = Math.sqrt(tb * tb + td * td);
                        if (s > 0.00001)
                            s = (s + (ts - s + this.data.offsetScaleY) * scaleMix) / s;
                        m.c *= s;
                        m.d *= s;
                        modified = true;
                    }
                    if (shearMix > 0) {
                        var b = m.c, d = m.d;
                        var by = Math.atan2(d, b);
                        var r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(m.b, m.a));
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r = by + (r + this.data.offsetShearY * core.MathUtils.degRad) * shearMix;
                        var s = Math.sqrt(b * b + d * d);
                        m.c = Math.cos(r) * s;
                        m.d = Math.sin(r) * s;
                        modified = true;
                    }
                    if (modified)
                        bone.appliedValid = false;
                }
            };
            TransformConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            return TransformConstraint;
        }());
        core.TransformConstraint = TransformConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TransformConstraintData = (function () {
            function TransformConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.rotateMix = 0;
                this.translateMix = 0;
                this.scaleMix = 0;
                this.shearMix = 0;
                this.offsetRotation = 0;
                this.offsetX = 0;
                this.offsetY = 0;
                this.offsetScaleX = 0;
                this.offsetScaleY = 0;
                this.offsetShearY = 0;
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            return TransformConstraintData;
        }());
        core.TransformConstraintData = TransformConstraintData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IntSet = (function () {
            function IntSet() {
                this.array = new Array();
            }
            IntSet.prototype.add = function (value) {
                var contains = this.contains(value);
                this.array[value | 0] = value | 0;
                return !contains;
            };
            IntSet.prototype.contains = function (value) {
                return this.array[value | 0] != undefined;
            };
            IntSet.prototype.remove = function (value) {
                this.array[value | 0] = undefined;
            };
            IntSet.prototype.clear = function () {
                this.array.length = 0;
            };
            return IntSet;
        }());
        core.IntSet = IntSet;
        var Color = (function () {
            function Color(r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 0; }
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
            Color.prototype.set = function (r, g, b, a) {
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.clamp();
                return this;
            };
            Color.prototype.setFromColor = function (c) {
                this.r = c.r;
                this.g = c.g;
                this.b = c.b;
                this.a = c.a;
                return this;
            };
            Color.prototype.setFromString = function (hex) {
                hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
                this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
                this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
                this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
                this.a = (hex.length != 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
                return this;
            };
            Color.prototype.add = function (r, g, b, a) {
                this.r += r;
                this.g += g;
                this.b += b;
                this.a += a;
                this.clamp();
                return this;
            };
            Color.prototype.clamp = function () {
                if (this.r < 0)
                    this.r = 0;
                else if (this.r > 1)
                    this.r = 1;
                if (this.g < 0)
                    this.g = 0;
                else if (this.g > 1)
                    this.g = 1;
                if (this.b < 0)
                    this.b = 0;
                else if (this.b > 1)
                    this.b = 1;
                if (this.a < 0)
                    this.a = 0;
                else if (this.a > 1)
                    this.a = 1;
                return this;
            };
            Color.WHITE = new Color(1, 1, 1, 1);
            Color.RED = new Color(1, 0, 0, 1);
            Color.GREEN = new Color(0, 1, 0, 1);
            Color.BLUE = new Color(0, 0, 1, 1);
            Color.MAGENTA = new Color(1, 0, 1, 1);
            return Color;
        }());
        core.Color = Color;
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.clamp = function (value, min, max) {
                if (value < min)
                    return min;
                if (value > max)
                    return max;
                return value;
            };
            MathUtils.cosDeg = function (degrees) {
                return Math.cos(degrees * MathUtils.degRad);
            };
            MathUtils.sinDeg = function (degrees) {
                return Math.sin(degrees * MathUtils.degRad);
            };
            MathUtils.signum = function (value) {
                return value > 0 ? 1 : value < 0 ? -1 : 0;
            };
            MathUtils.toInt = function (x) {
                return x > 0 ? Math.floor(x) : Math.ceil(x);
            };
            MathUtils.cbrt = function (x) {
                var y = Math.pow(Math.abs(x), 1 / 3);
                return x < 0 ? -y : y;
            };
            MathUtils.PI = 3.1415927;
            MathUtils.PI2 = MathUtils.PI * 2;
            MathUtils.radiansToDegrees = 180 / MathUtils.PI;
            MathUtils.radDeg = MathUtils.radiansToDegrees;
            MathUtils.degreesToRadians = MathUtils.PI / 180;
            MathUtils.degRad = MathUtils.degreesToRadians;
            return MathUtils;
        }());
        core.MathUtils = MathUtils;
        var Utils = (function () {
            function Utils() {
            }
            Utils.arrayCopy = function (source, sourceStart, dest, destStart, numElements) {
                for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                    dest[j] = source[i];
                }
            };
            Utils.setArraySize = function (array, size, value) {
                if (value === void 0) { value = 0; }
                var oldSize = array.length;
                if (oldSize == size)
                    return array;
                array.length = size;
                if (oldSize < size) {
                    for (var i = oldSize; i < size; i++)
                        array[i] = value;
                }
                return array;
            };
            Utils.ensureArrayCapacity = function (array, size, value) {
                if (value === void 0) { value = 0; }
                if (array.length >= size)
                    return array;
                return Utils.setArraySize(array, size, value);
            };
            Utils.newArray = function (size, defaultValue) {
                var array = new Array(size);
                for (var i = 0; i < size; i++)
                    array[i] = defaultValue;
                return array;
            };
            Utils.newFloatArray = function (size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Float32Array(size);
                }
                else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++)
                        array[i] = 0;
                    return array;
                }
            };
            Utils.toFloatArray = function (array) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
            };
            Utils.SUPPORTS_TYPED_ARRAYS = typeof (Float32Array) !== "undefined";
            return Utils;
        }());
        core.Utils = Utils;
        var DebugUtils = (function () {
            function DebugUtils() {
            }
            DebugUtils.logBones = function (skeleton) {
                for (var i = 0; i < skeleton.bones.length; i++) {
                    var bone = skeleton.bones[i];
                    var mat = bone.matrix;
                    console.log(bone.data.name + ", " + mat.a + ", " + mat.b + ", " + mat.c + ", " + mat.d + ", " + mat.tx + ", " + mat.ty);
                }
            };
            return DebugUtils;
        }());
        core.DebugUtils = DebugUtils;
        var Pool = (function () {
            function Pool(instantiator) {
                this.items = new Array();
                this.instantiator = instantiator;
            }
            Pool.prototype.obtain = function () {
                return this.items.length > 0 ? this.items.pop() : this.instantiator();
            };
            Pool.prototype.free = function (item) {
                if (item.reset)
                    item.reset();
                this.items.push(item);
            };
            Pool.prototype.freeAll = function (items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].reset)
                        items[i].reset();
                    this.items[i] = items[i];
                }
            };
            Pool.prototype.clear = function () {
                this.items.length = 0;
            };
            return Pool;
        }());
        core.Pool = Pool;
        var Vector2 = (function () {
            function Vector2(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Vector2.prototype.set = function (x, y) {
                this.x = x;
                this.y = y;
                return this;
            };
            Vector2.prototype.length = function () {
                var x = this.x;
                var y = this.y;
                return Math.sqrt(x * x + y * y);
            };
            Vector2.prototype.normalize = function () {
                var len = this.length();
                if (len != 0) {
                    this.x /= len;
                    this.y /= len;
                }
                return this;
            };
            return Vector2;
        }());
        core.Vector2 = Vector2;
        var TimeKeeper = (function () {
            function TimeKeeper() {
                this.maxDelta = 0.064;
                this.framesPerSecond = 0;
                this.delta = 0;
                this.totalTime = 0;
                this.lastTime = Date.now() / 1000;
                this.frameCount = 0;
                this.frameTime = 0;
            }
            TimeKeeper.prototype.update = function () {
                var now = Date.now() / 1000;
                this.delta = now - this.lastTime;
                this.frameTime += this.delta;
                this.totalTime += this.delta;
                if (this.delta > this.maxDelta)
                    this.delta = this.maxDelta;
                this.lastTime = now;
                this.frameCount++;
                if (this.frameTime > 1) {
                    this.framesPerSecond = this.frameCount / this.frameTime;
                    this.frameTime = 0;
                    this.frameCount = 0;
                }
            };
            return TimeKeeper;
        }());
        core.TimeKeeper = TimeKeeper;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    function isJson(resource) {
        var TYPE = PIXI.loaders.Resource.TYPE;
        if (TYPE) {
            return resource.type === TYPE.JSON;
        }
        return resource.isJson;
    }
    function atlasParser() {
        return function (resource, next) {
            if (!resource.data ||
                !isJson(resource) ||
                !resource.data.bones) {
                return next();
            }
            var metadataAtlas = resource.metadata ? resource.metadata.spineAtlas : null;
            if (metadataAtlas === false) {
                return next();
            }
            if (metadataAtlas && metadataAtlas.pages) {
                var spineJsonParser = new pixi_spine.core.SkeletonJson(new pixi_spine.core.AtlasAttachmentLoader(metadataAtlas));
                var skeletonData = spineJsonParser.readSkeletonData(resource.data);
                resource.spineData = skeletonData;
                resource.spineAtlas = metadataAtlas;
                return next();
            }
            var metadataAtlasSuffix = '.atlas';
            if (resource.metadata && resource.metadata.spineAtlasSuffix) {
                metadataAtlasSuffix = resource.metadata.spineAtlasSuffix;
            }
            var atlasPath = resource.url.substr(0, resource.url.lastIndexOf('.')) + metadataAtlasSuffix;
            atlasPath = atlasPath.replace(this.baseUrl, '');
            var atlasOptions = {
                crossOrigin: resource.crossOrigin,
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
                metadata: resource.metadata ? resource.metadata.spineMetadata : null,
                parentResource: resource
            };
            var imageOptions = {
                crossOrigin: resource.crossOrigin,
                metadata: resource.metadata ? resource.metadata.imageMetadata : null,
                parentResource: resource
            };
            var baseUrl = resource.url.substr(0, resource.url.lastIndexOf('/') + 1);
            baseUrl = baseUrl.replace(this.baseUrl, '');
            var adapter = imageLoaderAdapter(this, resource.name + '_atlas_page_', baseUrl, imageOptions);
            this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (atlasResource) {
                new pixi_spine.core.TextureAtlas(atlasResource.xhr.responseText, adapter, function (spineAtlas) {
                    var spineJsonParser = new pixi_spine.core.SkeletonJson(new pixi_spine.core.AtlasAttachmentLoader(spineAtlas));
                    var skeletonData = spineJsonParser.readSkeletonData(resource.data);
                    resource.spineData = skeletonData;
                    resource.spineAtlas = spineAtlas;
                    next();
                });
            });
        };
    }
    pixi_spine.atlasParser = atlasParser;
    function imageLoaderAdapter(loader, namePrefix, baseUrl, imageOptions) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            var name = namePrefix + line;
            var url = baseUrl + line;
            loader.add(name, url, imageOptions, function (resource) {
                callback(resource.texture.baseTexture);
            });
        };
    }
    pixi_spine.imageLoaderAdapter = imageLoaderAdapter;
    function syncImageLoaderAdapter(baseUrl, crossOrigin) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            callback(PIXI.BaseTexture.fromImage(line, crossOrigin));
        };
    }
    pixi_spine.syncImageLoaderAdapter = syncImageLoaderAdapter;
    PIXI.loaders.Loader.addPixiMiddleware(atlasParser);
    PIXI.loader.use(atlasParser());
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    pixi_spine.core.Bone.yDown = true;
    var tempRgb = [0, 0, 0];
    var SpineSprite = (function (_super) {
        __extends(SpineSprite, _super);
        function SpineSprite(tex) {
            _super.call(this, tex);
        }
        return SpineSprite;
    }(PIXI.Sprite));
    pixi_spine.SpineSprite = SpineSprite;
    var SpineMesh = (function (_super) {
        __extends(SpineMesh, _super);
        function SpineMesh(texture, vertices, uvs, indices, drawMode) {
            _super.call(this, texture, vertices, uvs, indices, drawMode);
        }
        return SpineMesh;
    }(PIXI.mesh.Mesh));
    pixi_spine.SpineMesh = SpineMesh;
    var Spine = (function (_super) {
        __extends(Spine, _super);
        function Spine(spineData) {
            _super.call(this);
            this.hackTextureBySlotName = function (slotName, texture, size) {
                if (texture === void 0) { texture = null; }
                if (size === void 0) { size = null; }
                var index = this.skeleton.findSlotIndex(slotName);
                if (index == -1) {
                    return false;
                }
                return this.hackTextureBySlotIndex(index, texture, size);
            };
            if (!spineData) {
                throw new Error('The spineData param is required.');
            }
            if ((typeof spineData) === "string") {
                throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
            }
            this.spineData = spineData;
            this.skeleton = new pixi_spine.core.Skeleton(spineData);
            this.skeleton.updateWorldTransform();
            this.stateData = new pixi_spine.core.AnimationStateData(spineData);
            this.state = new pixi_spine.core.AnimationState(this.stateData);
            this.slotContainers = [];
            for (var i = 0, n = this.skeleton.slots.length; i < n; i++) {
                var slot = this.skeleton.slots[i];
                var attachment = slot.attachment;
                var slotContainer = new PIXI.Container();
                this.slotContainers.push(slotContainer);
                this.addChild(slotContainer);
                if (attachment instanceof pixi_spine.core.RegionAttachment) {
                    var spriteName = attachment.region.name;
                    var sprite = this.createSprite(slot, attachment, spriteName);
                    slot.currentSprite = sprite;
                    slot.currentSpriteName = spriteName;
                    slotContainer.addChild(sprite);
                }
                else if (attachment instanceof pixi_spine.core.MeshAttachment) {
                    var mesh = this.createMesh(slot, attachment);
                    slot.currentMesh = mesh;
                    slot.currentMeshName = attachment.name;
                    slotContainer.addChild(mesh);
                }
                else {
                    continue;
                }
            }
            this.autoUpdate = true;
            this.tintRgb = new Float32Array([1, 1, 1]);
        }
        Object.defineProperty(Spine.prototype, "autoUpdate", {
            get: function () {
                return (this.updateTransform === Spine.prototype.autoUpdateTransform);
            },
            set: function (value) {
                this.updateTransform = value ? Spine.prototype.autoUpdateTransform : PIXI.Container.prototype.updateTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spine.prototype, "tint", {
            get: function () {
                return PIXI.utils.rgb2hex(this.tintRgb);
            },
            set: function (value) {
                this.tintRgb = PIXI.utils.hex2rgb(value, this.tintRgb);
            },
            enumerable: true,
            configurable: true
        });
        Spine.prototype.update = function (dt) {
            this.state.update(dt);
            this.state.apply(this.skeleton);
            this.skeleton.updateWorldTransform();
            var drawOrder = this.skeleton.drawOrder;
            var slots = this.skeleton.slots;
            for (var i = 0, n = drawOrder.length; i < n; i++) {
                this.children[i] = this.slotContainers[drawOrder[i].data.index];
            }
            var r0 = this.tintRgb[0];
            var g0 = this.tintRgb[1];
            var b0 = this.tintRgb[2];
            for (i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                var attachment = slot.attachment;
                var slotContainer = this.slotContainers[i];
                if (!attachment) {
                    slotContainer.visible = false;
                    continue;
                }
                var attColor = attachment.color;
                if (attachment instanceof pixi_spine.core.RegionAttachment) {
                    var region = attachment.region;
                    if (region) {
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                            slot.currentMesh = null;
                            slot.currentMeshName = undefined;
                        }
                        var ar = region;
                        if (!slot.currentSpriteName || slot.currentSpriteName !== ar.name) {
                            var spriteName = ar.name;
                            if (slot.currentSprite) {
                                slot.currentSprite.visible = false;
                            }
                            slot.sprites = slot.sprites || {};
                            if (slot.sprites[spriteName] !== undefined) {
                                slot.sprites[spriteName].visible = true;
                            }
                            else {
                                var sprite = this.createSprite(slot, attachment, spriteName);
                                slotContainer.addChild(sprite);
                            }
                            slot.currentSprite = slot.sprites[spriteName];
                            slot.currentSpriteName = spriteName;
                        }
                    }
                    if (slotContainer.transform) {
                        var transform = slotContainer.transform;
                        var transAny = transform;
                        var lt_1 = void 0;
                        if (transAny.matrix2d) {
                            lt_1 = transAny.matrix2d;
                            transAny._dirtyVersion++;
                            transAny.version = transAny._dirtyVersion;
                            transAny.isStatic = true;
                            transAny.operMode = 0;
                        }
                        else {
                            if (transAny.position) {
                                transform = new PIXI.TransformBase();
                                slotContainer.transform = transform;
                            }
                            lt_1 = transform.localTransform;
                        }
                        slot.bone.matrix.copy(lt_1);
                    }
                    else {
                        var lt = slotContainer.localTransform || new PIXI.Matrix();
                        slot.bone.matrix.copy(lt);
                        slotContainer.localTransform = lt;
                        slotContainer.displayObjectUpdateTransform = SlotContainerUpdateTransformV3;
                    }
                    tempRgb[0] = r0 * slot.color.r * attColor.r;
                    tempRgb[1] = g0 * slot.color.g * attColor.g;
                    tempRgb[2] = b0 * slot.color.b * attColor.b;
                    slot.currentSprite.tint = PIXI.utils.rgb2hex(tempRgb);
                    slot.currentSprite.blendMode = slot.blendMode;
                }
                else if (attachment instanceof pixi_spine.core.MeshAttachment) {
                    if (slot.currentSprite) {
                        slot.currentSprite.visible = false;
                        slot.currentSprite = null;
                        slot.currentSpriteName = undefined;
                        if (slotContainer.transform) {
                            slotContainer.transform = new PIXI.TransformStatic();
                        }
                        else {
                            slotContainer.localTransform = new PIXI.Matrix();
                            slotContainer.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform;
                        }
                    }
                    if (!slot.currentMeshName || slot.currentMeshName !== attachment.name) {
                        var meshName = attachment.name;
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                        }
                        slot.meshes = slot.meshes || {};
                        if (slot.meshes[meshName] !== undefined) {
                            slot.meshes[meshName].visible = true;
                        }
                        else {
                            var mesh = this.createMesh(slot, attachment);
                            slotContainer.addChild(mesh);
                        }
                        slot.currentMesh = slot.meshes[meshName];
                        slot.currentMeshName = meshName;
                    }
                    attachment.computeWorldVertices(slot, slot.currentMesh.vertices);
                    if (PIXI.VERSION[0] !== '3') {
                        var tintRgb = slot.currentMesh.tintRgb;
                        tintRgb[0] = r0 * slot.color.r * attColor.r;
                        tintRgb[1] = g0 * slot.color.g * attColor.g;
                        tintRgb[2] = b0 * slot.color.b * attColor.b;
                    }
                    slot.currentMesh.blendMode = slot.blendMode;
                }
                else {
                    slotContainer.visible = false;
                    continue;
                }
                slotContainer.visible = true;
                slotContainer.alpha = slot.color.a;
            }
        };
        ;
        Spine.prototype.setSpriteRegion = function (attachment, sprite, region) {
            sprite.region = region;
            sprite.texture = region.texture;
            if (!region.size) {
                sprite.scale.x = attachment.scaleX * attachment.width / region.originalWidth;
                sprite.scale.y = -attachment.scaleY * attachment.height / region.originalHeight;
            }
            else {
                sprite.scale.x = region.size.width / region.originalWidth;
                sprite.scale.y = -region.size.height / region.originalHeight;
            }
        };
        Spine.prototype.setMeshRegion = function (attachment, mesh, region) {
            mesh.region = region;
            mesh.texture = region.texture;
            attachment.updateUVs(region, mesh.uvs);
            mesh.dirty++;
        };
        Spine.prototype.autoUpdateTransform = function () {
            if (Spine.globalAutoUpdate) {
                this.lastTime = this.lastTime || Date.now();
                var timeDelta = (Date.now() - this.lastTime) * 0.001;
                this.lastTime = Date.now();
                this.update(timeDelta);
            }
            else {
                this.lastTime = 0;
            }
            PIXI.Container.prototype.updateTransform.call(this);
        };
        ;
        Spine.prototype.createSprite = function (slot, attachment, defName) {
            var region = attachment.region;
            if (slot.tempAttachment === attachment) {
                region = slot.tempRegion;
                slot.tempAttachment = null;
                slot.tempRegion = null;
            }
            var texture = region.texture;
            var sprite = new SpineSprite(texture);
            sprite.rotation = attachment.rotation * pixi_spine.core.MathUtils.degRad;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.position.x = attachment.x;
            sprite.position.y = attachment.y;
            sprite.alpha = attachment.color.a;
            sprite.region = attachment.region;
            this.setSpriteRegion(attachment, sprite, attachment.region);
            slot.sprites = slot.sprites || {};
            slot.sprites[defName] = sprite;
            return sprite;
        };
        ;
        Spine.prototype.createMesh = function (slot, attachment) {
            var region = attachment.region;
            if (slot.tempAttachment === attachment) {
                region = slot.tempRegion;
                slot.tempAttachment = null;
                slot.tempRegion = null;
            }
            var strip = new SpineMesh(region.texture, new Float32Array(attachment.regionUVs.length), new Float32Array(attachment.regionUVs.length), new Uint16Array(attachment.triangles), PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);
            strip.canvasPadding = 1.5;
            strip.alpha = attachment.color.a;
            strip.region = attachment.region;
            this.setMeshRegion(attachment, strip, region);
            slot.meshes = slot.meshes || {};
            slot.meshes[attachment.name] = strip;
            return strip;
        };
        ;
        Spine.prototype.hackTextureBySlotIndex = function (slotIndex, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            var attachment = slot.attachment;
            var region = attachment.region;
            if (texture) {
                region = new pixi_spine.core.TextureRegion();
                region.texture = texture;
                region.size = size;
            }
            if (slot.currentSprite && slot.currentSprite.region != region) {
                this.setSpriteRegion(attachment, slot.currentSprite, region);
                slot.currentSprite.region = region;
            }
            else if (slot.currentMesh && slot.currentMesh.region != region) {
                this.setMeshRegion(attachment, slot.currentMesh, region);
            }
            else {
                slot.tempRegion = region;
                slot.tempAttachment = attachment;
            }
            return true;
        };
        Spine.globalAutoUpdate = true;
        return Spine;
    }(PIXI.Container));
    pixi_spine.Spine = Spine;
    function SlotContainerUpdateTransformV3() {
        var pt = this.parent.worldTransform;
        var wt = this.worldTransform;
        var lt = this.localTransform;
        wt.a = lt.a * pt.a + lt.b * pt.c;
        wt.b = lt.a * pt.b + lt.b * pt.d;
        wt.c = lt.c * pt.a + lt.d * pt.c;
        wt.d = lt.c * pt.b + lt.d * pt.d;
        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
        this._currentBounds = null;
    }
})(pixi_spine || (pixi_spine = {}));
PIXI.spine = pixi_spine;
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
/*! howler.js v2.0.3 | (c) 2013-2017, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";var e=function(){this.init()};e.prototype={init:function(){var e=this||n;return e._counter=0,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.mobileAutoEnable=!0,e._setup(),e},volume:function(e){var o=this||n;if(e=parseFloat(e),o.ctx||_(),void 0!==e&&e>=0&&e<=1){if(o._volume=e,o._muted)return o;o.usingWebAudio&&(o.masterGain.gain.value=e);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.volume=u._volume*e)}return o}return o._volume},mute:function(e){var o=this||n;o.ctx||_(),o._muted=e,o.usingWebAudio&&(o.masterGain.gain.value=e?0:o._volume);for(var t=0;t<o._howls.length;t++)if(!o._howls[t]._webAudio)for(var r=o._howls[t]._getSoundIds(),a=0;a<r.length;a++){var u=o._howls[t]._soundById(r[a]);u&&u._node&&(u._node.muted=!!e||u._muted)}return o},unload:function(){for(var e=this||n,o=e._howls.length-1;o>=0;o--)e._howls[o].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,_()),e},codecs:function(e){return(this||n)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||n;if(e.state=e.ctx?e.ctx.state||"running":"running",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{var o=new Audio;void 0===o.oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{var o=new Audio;o.muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||n,o=null;try{o="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!o||"function"!=typeof o.canPlayType)return e;var t=o.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!t&&!o.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!o.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!o.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(o.canPlayType("audio/x-m4a;")||o.canPlayType("audio/m4a;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(o.canPlayType("audio/x-mp4;")||o.canPlayType("audio/mp4;")||o.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(o.canPlayType("audio/x-flac;")||o.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||n,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator&&e._navigator.userAgent),t=!!("ontouchend"in window||e._navigator&&e._navigator.maxTouchPoints>0||e._navigator&&e._navigator.msMaxTouchPoints>0);if(!e._mobileEnabled&&e.ctx&&(o||t)){e._mobileEnabled=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var r=function(){var n=e.ctx.createBufferSource();n.buffer=e._scratchBuffer,n.connect(e.ctx.destination),void 0===n.start?n.noteOn(0):n.start(0),n.onended=function(){n.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&n.usingWebAudio){for(var o=0;o<e._howls.length;o++)if(e._howls[o]._webAudio)for(var t=0;t<e._howls[o]._sounds.length;t++)if(!e._howls[o]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&n.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.state="resuming",e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var n=new e,o=function(e){var n=this;if(!e.src||0===e.src.length)return void console.error("An array of source files must be passed with any new Howl.");n.init(e)};o.prototype={init:function(e){var o=this;return n.ctx||_(),o._autoplay=e.autoplay||!1,o._format="string"!=typeof e.format?e.format:[e.format],o._html5=e.html5||!1,o._muted=e.mute||!1,o._loop=e.loop||!1,o._pool=e.pool||5,o._preload="boolean"!=typeof e.preload||e.preload,o._rate=e.rate||1,o._sprite=e.sprite||{},o._src="string"!=typeof e.src?e.src:[e.src],o._volume=void 0!==e.volume?e.volume:1,o._duration=0,o._state="unloaded",o._sounds=[],o._endTimers={},o._queue=[],o._onend=e.onend?[{fn:e.onend}]:[],o._onfade=e.onfade?[{fn:e.onfade}]:[],o._onload=e.onload?[{fn:e.onload}]:[],o._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],o._onpause=e.onpause?[{fn:e.onpause}]:[],o._onplay=e.onplay?[{fn:e.onplay}]:[],o._onstop=e.onstop?[{fn:e.onstop}]:[],o._onmute=e.onmute?[{fn:e.onmute}]:[],o._onvolume=e.onvolume?[{fn:e.onvolume}]:[],o._onrate=e.onrate?[{fn:e.onrate}]:[],o._onseek=e.onseek?[{fn:e.onseek}]:[],o._onresume=[],o._webAudio=n.usingWebAudio&&!o._html5,void 0!==n.ctx&&n.ctx&&n.mobileAutoEnable&&n._enableMobileAudio(),n._howls.push(o),o._autoplay&&o._queue.push({event:"play",action:function(){o.play()}}),o._preload&&o.load(),o},load:function(){var e=this,o=null;if(n.noAudio)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var r=0;r<e._src.length;r++){var u,i;if(e._format&&e._format[r])u=e._format[r];else{if("string"!=typeof(i=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}u=/^data:audio\/([^;,]+);/i.exec(i),u||(u=/\.([^.]+)$/.exec(i.split("?",1)[0])),u&&(u=u[1].toLowerCase())}if(u||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),u&&n.codecs(u)){o=e._src[r];break}}return o?(e._src=o,e._state="loading","https:"===window.location.protocol&&"http:"===o.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new t(e),e._webAudio&&a(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e,o){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e){e="__default";for(var a=0,u=0;u<t._sounds.length;u++)t._sounds[u]._paused&&!t._sounds[u]._ended&&(a++,r=t._sounds[u]._id);1===a?e=null:r=null}}var i=r?t._soundById(r):t._inactiveSound();if(!i)return null;if(r&&!e&&(e=i._sprite||"__default"),"loaded"!==t._state&&!t._sprite[e])return t._queue.push({event:"play",action:function(){t.play(t._soundById(i._id)?i._id:void 0)}}),i._id;if(r&&!i._paused)return o||setTimeout(function(){t._emit("play",i._id)},0),i._id;t._webAudio&&n._autoResume();var d=Math.max(0,i._seek>0?i._seek:t._sprite[e][0]/1e3),_=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-d),s=1e3*_/Math.abs(i._rate);i._paused=!1,i._ended=!1,i._sprite=e,i._seek=d,i._start=t._sprite[e][0]/1e3,i._stop=(t._sprite[e][0]+t._sprite[e][1])/1e3,i._loop=!(!i._loop&&!t._sprite[e][2]);var l=i._node;if(t._webAudio){var c=function(){t._refreshBuffer(i);var e=i._muted||t._muted?0:i._volume;l.gain.setValueAtTime(e,n.ctx.currentTime),i._playStart=n.ctx.currentTime,void 0===l.bufferSource.start?i._loop?l.bufferSource.noteGrainOn(0,d,86400):l.bufferSource.noteGrainOn(0,d,_):i._loop?l.bufferSource.start(0,d,86400):l.bufferSource.start(0,d,_),s!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),s)),o||setTimeout(function(){t._emit("play",i._id)},0)},f="running"===n.state;if("loaded"===t._state&&f)c();else{var p=f||"loaded"!==t._state?"load":"resume";t.once(p,c,f?i._id:null),t._clearTimer(i._id)}}else{var v=function(){l.currentTime=d,l.muted=i._muted||t._muted||n._muted||l.muted,l.volume=i._volume*n.volume(),l.playbackRate=i._rate,l.play(),s!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),s)),o||t._emit("play",i._id)},m="loaded"===t._state&&(window&&window.ejecta||!l.readyState&&n._navigator.isCocoonJS);if(4===l.readyState||m)v();else{var h=function(){v(),l.removeEventListener(n._canPlayEvent,h,!1)};l.addEventListener(n._canPlayEvent,h,!1),t._clearTimer(i._id)}}return i._id},pause:function(e){var n=this;if("loaded"!==n._state)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused&&(r._seek=n.seek(o[t]),r._rateSeek=0,r._paused=!0,n._stopFade(o[t]),r._node))if(n._webAudio){if(!r._node.bufferSource)return n;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var o=this;if("loaded"!==o._state)return o._queue.push({event:"stop",action:function(){o.stop(e)}}),o;for(var t=o._getSoundIds(e),r=0;r<t.length;r++){o._clearTimer(t[r]);var a=o._soundById(t[r]);if(a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,o._stopFade(t[r]),a._node))if(o._webAudio){if(!a._node.bufferSource)return n||o._emit("stop",a._id),o;void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),o._cleanBuffer(a._node)}else isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause());a&&!n&&o._emit("stop",a._id)}return o},mute:function(e,o){var t=this;if("loaded"!==t._state)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if(void 0===o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),a=0;a<r.length;a++){var u=t._soundById(r[a]);u&&(u._muted=e,t._webAudio&&u._node?u._node.gain.setValueAtTime(e?0:u._volume,n.ctx.currentTime):u._node&&(u._node.muted=!!n._muted||e),t._emit("mute",u._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length||2===r.length&&void 0===r[1]){t._getSoundIds().indexOf(r[0])>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var a;if(!(void 0!==e&&e>=0&&e<=1))return a=o?t._soundById(o):t._sounds[0],a?a._volume:0;if("loaded"!==t._state)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;void 0===o&&(t._volume=e),o=t._getSoundIds(o);for(var u=0;u<o.length;u++)(a=t._soundById(o[u]))&&(a._volume=e,r[2]||t._stopFade(o[u]),t._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(e,n.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=e*n.volume()),t._emit("volume",a._id));return t},fade:function(e,o,t,r){var a=this,u=Math.abs(e-o),i=e>o?"out":"in",d=u/.01,_=d>0?t/d:t;if(_<4&&(d=Math.ceil(d/(4/_)),_=4),"loaded"!==a._state)return a._queue.push({event:"fade",action:function(){a.fade(e,o,t,r)}}),a;a.volume(e,r);for(var s=a._getSoundIds(r),l=0;l<s.length;l++){var c=a._soundById(s[l]);if(c){if(r||a._stopFade(s[l]),a._webAudio&&!c._muted){var f=n.ctx.currentTime,p=f+t/1e3;c._volume=e,c._node.gain.setValueAtTime(e,f),c._node.gain.linearRampToValueAtTime(o,p)}var v=e;c._interval=setInterval(function(n,t){d>0&&(v+="in"===i?.01:-.01),v=Math.max(0,v),v=Math.min(1,v),v=Math.round(100*v)/100,a._webAudio?(void 0===r&&(a._volume=v),t._volume=v):a.volume(v,n,!0),(o<e&&v<=o||o>e&&v>=o)&&(clearInterval(t._interval),t._interval=null,a.volume(o,n),a._emit("fade",n))}.bind(a,s[l],c),_)}}return a},_stopFade:function(e){var o=this,t=o._soundById(e);return t&&t._interval&&(o._webAudio&&t._node.gain.cancelScheduledValues(n.ctx.currentTime),clearInterval(t._interval),t._interval=null,o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(o=t._soundById(parseInt(r[0],10)))&&o._loop;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=t._getSoundIds(n),u=0;u<a.length;u++)(o=t._soundById(a[u]))&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e,e&&(o._node.bufferSource.loopStart=o._start||0,o._node.bufferSource.loopEnd=o._stop)));return t},rate:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if("number"!=typeof e)return i=t._soundById(o),i?i._rate:t._rate;if("loaded"!==t._state)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;void 0===o&&(t._rate=e),o=t._getSoundIds(o);for(var d=0;d<o.length;d++)if(i=t._soundById(o[d])){i._rateSeek=t.seek(o[d]),i._playStart=t._webAudio?n.ctx.currentTime:i._playStart,i._rate=e,t._webAudio&&i._node&&i._node.bufferSource?i._node.bufferSource.playbackRate.value=e:i._node&&(i._node.playbackRate=e);var _=t.seek(o[d]),s=(t._sprite[i._sprite][0]+t._sprite[i._sprite][1])/1e3-_,l=1e3*s/Math.abs(i._rate);!t._endTimers[o[d]]&&i._paused||(t._clearTimer(o[d]),t._endTimers[o[d]]=setTimeout(t._ended.bind(t,i),l)),t._emit("rate",i._id)}return t},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var a=t._getSoundIds(),u=a.indexOf(r[0]);u>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if(void 0===o)return t;if("loaded"!==t._state)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var i=t._soundById(o);if(i){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var d=t.playing(o)?n.ctx.currentTime-i._playStart:0,_=i._rateSeek?i._rateSeek-i._seek:0;return i._seek+(_+d*Math.abs(i._rate))}return i._node.currentTime}var s=t.playing(o);s&&t.pause(o,!0),i._seek=e,i._ended=!1,t._clearTimer(o),s&&t.play(o,!0),!t._webAudio&&i._node&&(i._node.currentTime=e),t._emit("seek",o)}return t},playing:function(e){var n=this;if("number"==typeof e){var o=n._soundById(e);return!!o&&!o._paused}for(var t=0;t<n._sounds.length;t++)if(!n._sounds[t]._paused)return!0;return!1},duration:function(e){var n=this,o=n._duration,t=n._soundById(e);return t&&(o=n._sprite[t._sprite][1]/1e3),o},state:function(){return this._state},unload:function(){for(var e=this,o=e._sounds,t=0;t<o.length;t++){o[t]._paused||e.stop(o[t]._id),e._webAudio||(o[t]._node.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA",o[t]._node.removeEventListener("error",o[t]._errorFn,!1),o[t]._node.removeEventListener(n._canPlayEvent,o[t]._loadFn,!1)),delete o[t]._node,e._clearTimer(o[t]._id);var a=n._howls.indexOf(e);a>=0&&n._howls.splice(a,1)}var u=!0;for(t=0;t<n._howls.length;t++)if(n._howls[t]._src===e._src){u=!1;break}return r&&u&&delete r[e._src],n.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,a=r["_on"+e];return"function"==typeof n&&a.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e],a=0;if(n){for(a=0;a<r.length;a++)if(n===r[a].fn&&o===r[a].id){r.splice(a,1);break}}else if(e)t["_on"+e]=[];else{var u=Object.keys(t);for(a=0;a<u.length;a++)0===u[a].indexOf("_on")&&Array.isArray(t[u[a]])&&(t[u[a]]=[])}return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[a].fn),0),r[a].once&&t.off(e,r[a].fn,r[a].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite,r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id,!0).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=n.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),a)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,o._clearTimer(e._id),o._cleanBuffer(e._node),n._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new t(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(o<=n)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if(void 0===e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.ctx.createBufferSource(),e._node.bufferSource.buffer=r[o._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=e._rate,o},_cleanBuffer:function(e){var n=this;if(n._scratchBuffer){e.bufferSource.onended=null,e.bufferSource.disconnect(0);try{e.bufferSource.buffer=n._scratchBuffer}catch(e){}}return e.bufferSource=null,n}};var t=function(e){this._parent=e,this.init()};t.prototype={init:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._muted=o._muted,e._rate=o._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,o._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=n._muted||e._muted||e._parent._muted?0:e._volume;return o._webAudio?(e._node=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),e._node.gain.setValueAtTime(t,n.ctx.currentTime),e._node.paused=!0,e._node.connect(n.masterGain)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(n._canPlayEvent,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t*n.volume(),e._node.load()),e},reset:function(){var e=this,o=e._parent;return e._muted=o._muted,e._loop=o._loop,e._volume=o._volume,e._muted=o._muted,e._rate=o._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++n._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,o=e._parent;o._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(o._sprite).length&&(o._sprite={__default:[0,1e3*o._duration]}),"loaded"!==o._state&&(o._state="loaded",o._emit("load"),o._loadQueue()),e._node.removeEventListener(n._canPlayEvent,e._loadFn,!1)}};var r={},a=function(e){var n=e._src;if(r[n])return e._duration=r[n].duration,void d(e);if(/^data:[^;]+;base64,/.test(n)){for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),a=0;a<o.length;++a)t[a]=o.charCodeAt(a);i(t.buffer,e)}else{var _=new XMLHttpRequest;_.open("GET",n,!0),_.responseType="arraybuffer",_.onload=function(){var n=(_.status+"")[0];if("0"!==n&&"2"!==n&&"3"!==n)return void e._emit("loaderror",null,"Failed loading audio file with status: "+_.status+".");i(_.response,e)},_.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete r[n],e.load())},u(_)}},u=function(e){try{e.send()}catch(n){e.onerror()}},i=function(e,o){n.ctx.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(r[o._src]=e,d(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},d=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},_=function(){try{"undefined"!=typeof AudioContext?n.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?n.ctx=new webkitAudioContext:n.usingWebAudio=!1}catch(e){n.usingWebAudio=!1}var e=/iP(hone|od|ad)/.test(n._navigator&&n._navigator.platform),o=n._navigator&&n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=o?parseInt(o[1],10):null;if(e&&t&&t<9){var r=/safari/.test(n._navigator&&n._navigator.userAgent.toLowerCase());(n._navigator&&n._navigator.standalone&&!r||n._navigator&&!n._navigator.standalone&&!r)&&(n.usingWebAudio=!1)}n.usingWebAudio&&(n.masterGain=void 0===n.ctx.createGain?n.ctx.createGainNode():n.ctx.createGain(),n.masterGain.gain.value=1,n.masterGain.connect(n.ctx.destination)),n._setup()};"function"==typeof define&&define.amd&&define([],function(){return{Howler:n,Howl:o}}),"undefined"!=typeof exports&&(exports.Howler=n,exports.Howl=o),"undefined"!=typeof window?(window.HowlerGlobal=e,window.Howler=n,window.Howl=o,window.Sound=t):"undefined"!=typeof global&&(global.HowlerGlobal=e,global.Howler=n,global.Howl=o,global.Sound=t)}();
/*! Spatial Plugin */
!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(n){var e=this;if(!e.ctx||!e.ctx.listener)return e;for(var o=e._howls.length-1;o>=0;o--)e._howls[o].stereo(n);return e},HowlerGlobal.prototype.pos=function(n,e,o){var t=this;return t.ctx&&t.ctx.listener?(e="number"!=typeof e?t._pos[1]:e,o="number"!=typeof o?t._pos[2]:o,"number"!=typeof n?t._pos:(t._pos=[n,e,o],t.ctx.listener.setPosition(t._pos[0],t._pos[1],t._pos[2]),t)):t},HowlerGlobal.prototype.orientation=function(n,e,o,t,r,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var p=a._orientation;return e="number"!=typeof e?p[1]:e,o="number"!=typeof o?p[2]:o,t="number"!=typeof t?p[3]:t,r="number"!=typeof r?p[4]:r,i="number"!=typeof i?p[5]:i,"number"!=typeof n?p:(a._orientation=[n,e,o,t,r,i],a.ctx.listener.setOrientation(n,e,o,t,r,i),a)},Howl.prototype.init=function(n){return function(e){var o=this;return o._orientation=e.orientation||[1,0,0],o._stereo=e.stereo||null,o._pos=e.pos||null,o._pannerAttr={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:360,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:360,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:0,distanceModel:void 0!==e.distanceModel?e.distanceModel:"inverse",maxDistance:void 0!==e.maxDistance?e.maxDistance:1e4,panningModel:void 0!==e.panningModel?e.panningModel:"HRTF",refDistance:void 0!==e.refDistance?e.refDistance:1,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:1},o._onstereo=e.onstereo?[{fn:e.onstereo}]:[],o._onpos=e.onpos?[{fn:e.onpos}]:[],o._onorientation=e.onorientation?[{fn:e.onorientation}]:[],n.call(this,e)}}(Howl.prototype.init),Howl.prototype.stereo=function(e,o){var t=this;if(!t._webAudio)return t;if("loaded"!==t._state)return t._queue.push({event:"stereo",action:function(){t.stereo(e,o)}}),t;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===o){if("number"!=typeof e)return t._stereo;t._stereo=e,t._pos=[e,0,0]}for(var i=t._getSoundIds(o),a=0;a<i.length;a++){var p=t._soundById(i[a]);if(p){if("number"!=typeof e)return p._stereo;p._stereo=e,p._pos=[e,0,0],p._node&&(p._pannerAttr.panningModel="equalpower",p._panner&&p._panner.pan||n(p,r),"spatial"===r?p._panner.setPosition(e,0,0):p._panner.pan.value=e),t._emit("stereo",p._id)}}return t},Howl.prototype.pos=function(e,o,t,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"pos",action:function(){i.pos(e,o,t,r)}}),i;if(o="number"!=typeof o?0:o,t="number"!=typeof t?-.5:t,void 0===r){if("number"!=typeof e)return i._pos;i._pos=[e,o,t]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var s=i._soundById(a[p]);if(s){if("number"!=typeof e)return s._pos;s._pos=[e,o,t],s._node&&(s._panner&&!s._panner.pan||n(s,"spatial"),s._panner.setPosition(e,o,t)),i._emit("pos",s._id)}}return i},Howl.prototype.orientation=function(e,o,t,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"orientation",action:function(){i.orientation(e,o,t,r)}}),i;if(o="number"!=typeof o?i._orientation[1]:o,t="number"!=typeof t?i._orientation[2]:t,void 0===r){if("number"!=typeof e)return i._orientation;i._orientation=[e,o,t]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var s=i._soundById(a[p]);if(s){if("number"!=typeof e)return s._orientation;s._orientation=[e,o,t],s._node&&(s._panner||(s._pos||(s._pos=i._pos||[0,0,-.5]),n(s,"spatial")),s._panner.setOrientation(e,o,t)),i._emit("orientation",s._id)}}return i},Howl.prototype.pannerAttr=function(){var e,o,t,r=this,i=arguments;if(!r._webAudio)return r;if(0===i.length)return r._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return t=r._soundById(parseInt(i[0],10)),t?t._pannerAttr:r._pannerAttr;e=i[0],void 0===o&&(r._pannerAttr={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:r._distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:r._maxDistance,panningModel:void 0!==e.panningModel?e.panningModel:r._panningModel,refDistance:void 0!==e.refDistance?e.refDistance:r._refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:r._rolloffFactor})}else 2===i.length&&(e=i[0],o=parseInt(i[1],10));for(var a=r._getSoundIds(o),p=0;p<a.length;p++)if(t=r._soundById(a[p])){var s=t._pannerAttr;s={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:s.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:s.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:s.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:s.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:s.maxDistance,panningModel:void 0!==e.panningModel?e.panningModel:s.panningModel,refDistance:void 0!==e.refDistance?e.refDistance:s.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:s.rolloffFactor};var l=t._panner;l?(l.coneInnerAngle=s.coneInnerAngle,l.coneOuterAngle=s.coneOuterAngle,l.coneOuterGain=s.coneOuterGain,l.distanceModel=s.distanceModel,l.maxDistance=s.maxDistance,l.panningModel=s.panningModel,l.refDistance=s.refDistance,l.rolloffFactor=s.rolloffFactor):(t._pos||(t._pos=r._pos||[0,0,-.5]),n(t,"spatial"))}return r},Sound.prototype.init=function(n){return function(){var e=this,o=e._parent;e._orientation=o._orientation,e._stereo=o._stereo,e._pos=o._pos,e._pannerAttr=o._pannerAttr,n.call(this),e._stereo?o.stereo(e._stereo):e._pos&&o.pos(e._pos[0],e._pos[1],e._pos[2],e._id)}}(Sound.prototype.init),Sound.prototype.reset=function(n){return function(){var e=this,o=e._parent;return e._orientation=o._orientation,e._pos=o._pos,e._pannerAttr=o._pannerAttr,n.call(this)}}(Sound.prototype.reset);var n=function(n,e){e=e||"spatial","spatial"===e?(n._panner=Howler.ctx.createPanner(),n._panner.coneInnerAngle=n._pannerAttr.coneInnerAngle,n._panner.coneOuterAngle=n._pannerAttr.coneOuterAngle,n._panner.coneOuterGain=n._pannerAttr.coneOuterGain,n._panner.distanceModel=n._pannerAttr.distanceModel,n._panner.maxDistance=n._pannerAttr.maxDistance,n._panner.panningModel=n._pannerAttr.panningModel,n._panner.refDistance=n._pannerAttr.refDistance,n._panner.rolloffFactor=n._pannerAttr.rolloffFactor,n._panner.setPosition(n._pos[0],n._pos[1],n._pos[2]),n._panner.setOrientation(n._orientation[0],n._orientation[1],n._orientation[2])):(n._panner=Howler.ctx.createStereoPanner(),n._panner.pan.value=n._stereo),n._panner.connect(n._node),n._paused||n._parent.pause(n._id,!0).play(n._id)}}();