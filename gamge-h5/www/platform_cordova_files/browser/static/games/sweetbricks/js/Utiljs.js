//------ WebStorm shortcut -------------------------------←→↑↓↗↙↖↘
//--navigation--
//Ctrl+F12           - file structure popup

//Alt+Up             - previous/next method
//Alt+Down

//F2                 - navigate to next/previous error or warning
//Shift+F2

//Ctrl+[             - navigate to start/end of code block
//Ctrl+]

//------ WebStorm shortcut -------------------------------

//------ WebStorm shortcut2 -------------------------------
//Ctrl+j              많이쓰는코드형태를 자동완성
//Ctrl+/
//Ctrl+//
//Ctrl++              괄호접고펴기
//Ctrl+-
//Ctrl+Space          자동완성기능호출
//Ctrl+Alt+i          자동들여쓰기
//Ctrl+Alt+Back       마지막수정한곳으로 점프
//------ WebStorm shortcut2 -------------------------------

//------ WebStorm shortcut3 -------------------------------
//Alt+j               동일변수선택하면서 이동
//Alt+Shift+j         동일변수선택취소하면서 뒤로이동
//Ctrl+Alt+Shift+j    동일변수 모두선택
//------ WebStorm shortcut3 -------------------------------

//------ WebStorm shortcut4 (일본)-------------------------------https://ics.media/entry/11642
//Ctrl+LMB            정의한 곳으로 (Ctrl+b)
//F12                 정의한 곳으로
//Alt+F7              변수 사용한 모든 곳 찾기
//Ctrl+Shift+n        소스파일 열기(빠른검색으로)
//Ctrl+Alt+Shift+n    심볼이름찾기(빠른검색으로)      --변수,함수,클래스도 포함
//Shift, Shift        소스,심볼이름찾기(빠른검색으로) --모든검색
//Ctrl+Shift+BackSp   마지막으로 편집 한 행으로 이동
//Shift+F6            리펙토링
//Ctrl+Alt+v          자동변수이름
//Ctrl+Alt+l          코드정리
//------ WebStorm shortcut3 -------------------------------


//------ XDK shortcut ---------
// ctrl+shift+o       퀵오픈(행이동 :, 함수리스트 @)
// ctrl+e             함수 빠른 편집
// ctrl+k             quick doc (esc: 닫기)
// ctrl+space         힌트창 강제나오기

// ctrl+z             실행취소
// ctrl+y             재실행


// ctrl+g             라인번호 이동
// ctrl+l             선택 현재라인

// ctrl+f             찾기(앞으로 f3, 뒤로 shift+f3)
// alt+f3             현재단어 찾기후, 선택          ---->주의 alt+f4 윈도우종료
// ctrl+b             찾기후, 선택 더하기
// ctrl+shift+b       찾기후, 선택 다시

// ctrl+u             선택내용 복구
// ctrl+shift+u       선택내용 Redo

// ctrl+shift+↑       블록 이동
// ctrl+shift+f       찾기 모든파일
// ctrl+shift+d       라인 삭제

// ctrl+/             라인 주석
// ctrl+shift+/       블록 주석
//------ XDK shortcut ---------

//--err---
//function findBoneInSkeleton(skel, attach) {
//    for (var i = 0; i < skel.slots.length; i++) {
//        if (skel.slots[i].sprites.hasOwnProperty(attach))
//            return skel.slots[i].sprites[attach];
//    }
//    return null;
//}
////var spearSprite = findBone(spine.skeleton, "spear");
////spearSprite.getBounds()
////var x = spear.worldTransform.tx, y= spear.worldTransform.ty
//--err---
//한번 더 선언
var ColorSet = {
    white: 0xffffff,
    red: 0xff0000,
    red_kukugo: 0xFF2020,
    green: 0x00ff00,
    blue: 0x0000ff,
    black: 0x000000,
    yellow: 0xffff00,
    sky: 0xcceeff,
    cyan: 0x00ffff,
    magenta: 0xff00ff,
    grey: 0x808080,
    gray: 0x808080,
    orange: 0xffa500,
    pink: 0xff8080,
    fontlevel: 0xfff57d,
    lightgrey: (0x808080 * 1.5),
    darkgrey: (0x808080 * 0.5),
    brown: 0xa52a2a,
    darkblue: 0x000080,

    uioliv: 0xFFF799,
    uisky: 0xBFFFFF,
    uired: 0xFF7F7E,
    uiblue: 0x7EA7F9,
    uigreen: 0x7FE591,
    uipurple: 0xC983C1,
    uigray: 0x979797,
    uigreenbtn: 0x19BD9B

};

var ArrowKey = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};
var mouseBTN = 0;
//var MOUSE=0;
//var TOUCH=1;
//var InputMode= isTouchDevice()===true ? TOUCH:MOUSE;
//사용예
//var spr = SpriteLoad(spine_space_ship_ani, "img/bubble_1.png", 0, -150, 0.2, 0.5); //스프라이트 생성
//spr.name = "bubble";                          
//debug_Sprite(spr, InfoPos.on, MovePos.on);                                        //디버깅정보 생성

//수학함수

function getMoneyFormatFromNum(n) {
    var c = 0; //표시자리
    var d = ".";
    var t = ",";
    var s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var convertTimeFormatFromSec = function (num) { //두개 다 거의 비슷
    var hrs = Math.floor(num / 3600);
    var mins = Math.floor((num % 3600) / 60);
    var secs = num % 60;
    return (hrs > 0 ? hrs + ":" : "") + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
};

function secondsToTime(secs) { //두개 다 거의 비슷
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    //var ret_obj = {"h": hours, "m": minutes, "s": seconds };
    return (
        (hours > 0 ? hours + ":" : "") + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

//game.rnd.integerInRange(0, 10);//페이저랜덤모드는 min,max를 포함

//min~max까지 랜덤 float 값 리턴
function generateRandomNumber(min, max) {
    return (Math.random() * (max - min) + min);
}
//1~~9까지 랜덤값 리턴 //Math.floor(generateRandomNumber(1, 10)); //max값 포함안됨

//자바스크립트배열 기능--시작 -------------------------
//배열랜덤섞기함수
function shuffleByArray(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        arr[i - 1] = a[j];
        arr[j] = x;
    }
}

//배열함수최대값
var compArr = [1, 10, 5, 11, 2];
var maxResult = compArr.reduce(function (previous, current) {
    return previous > current ? previous : current;
});
//배열함수최소값
var minResult = compArr.reduce(function (previous, current) {
    return previous > current ? current : previous;
});
//배열 인덱스위치로 서로 교체
var swapArrayElements = function (arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};
//배열합치기-시작
function unionByArr(a, b) { //전체 a+b  //전체값과 중복포함
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++) tmp[b[j]] = 1;
    for (var k in tmp) res.push(k);
    return res;
}

function intersectByArr(a, b) { //교집합 a&&b //중복값부분만
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++)
        if (tmp[b[j]]) res.push(b[j]);
    return res;
}

function diffByArr(a, b) { //차집합 a-b // a 리턴(b 다 제거)
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++) {
        if (tmp[b[j]]) delete tmp[b[j]];
    }
    for (var k in tmp) res.push(k);
    return res;
}

function sym_diffByArr(a, b) { //대칭차 a+b-(a&&b) //중복값부분 제거된 합집합
    var tmp = {},
        res = [];
    for (var i = 0; i < a.length; i++) tmp[a[i]] = 1;
    for (var j = 0; j < b.length; j++) {
        if (tmp[b[j]]) delete tmp[b[j]];
        else tmp[b[j]] = 1;
    }
    for (var k in tmp) res.push(k);
    return res;
}
//var arr1 = ['A', 'B', 'C', 'D'];
//var arr2 = ['C', 'D', 'E', 'F'];
//console.log( unionByArr(arr1, arr2) );     // ["A", "B", "C", "D", "E", "F"]
//console.log( intersectByArr(arr1, arr2) ); // ["C", "D"]
//console.log( diffByArr(arr1, arr2) );      // ["A", "B"]
//console.log( sym_diffByArr(arr1, arr2) );  // ["A", "B", "E", "F"]
//배열합치기-끝


function rangeByArr(start, edge, step) { //rangeByArr(10) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] //마지막값 포함 안됨
    // If only one number was passed in make it the edge and 0 the start.
    if (arguments.length == 1) {
        edge = start;
        start = 0;
    }

    // Validate the edge and step numbers.
    edge = edge || 0;
    step = step || 1;

    // Create the array of numbers, stopping befor the edge.
    for (var ret = []; (edge - start) * step > 0; start += step) {
        ret.push(start);
    }
    return ret;
    //console.log(convertStr2Arr1D(rangeByArr(10)));            //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    //console.log(convertStr2Arr1D(rangeByArr(65, 69)));        //[65, 66, 67, 68]                   //마지막값 포함안됨!!
    //console.log(convertStr2Arr1D(rangeByArr(10, -10.1, -5))); //[10, 5, 0, -5, -10]                //마지막값 포함 시키려면
    //console.log(convertStr2Arr1D(rangeByArr(10, 1)));         //[]
    //console.log(convertStr2Arr1D(rangeByArr(1, 3)));          //[1,2]                              //마지막값 포함안됨!!
    //console.log(convertStr2Arr1D(rangeByArr(5, 2, -1)));      //[5,4,3]                            //마지막값 포함안됨!!
}

function fillArray0(cnt, value) {//제로베열 [0,0,0,0,0,0,...]
    var arr = [], i = 0;
    for (; i < cnt;)arr[i++] = value;
    return arr;
}
function filledArray(len, value) {//제로배열 [0,0,0,0,0,0,...]
    if (len <= 0) return [];
    var result = [value];
    while (result.length < len / 2) {
        result = result.concat(result);
    }
    return result.concat(result.slice(0, len - result.length));
}
function filledArrayString(cnt, txt) {    //filledArrayString(2, "abc")); //['a','b','c','a','b','c']
    return new Array(cnt + 1).join(txt).split('');
}

function convertStr2Arr1D(arr) {//디버깅용 [a,b,c] ---> "[0]:a, [1]:b, [3]:c,"
    if(typeof(arr) === 'undefined') {
        console.log( "err: arr==undefined");
        return;
    }
    if(typeof(arr.length) === 'undefined') {
        console.log( "err: arr.length==undefined");
        return;
    }

    var s = "";
    for (var i = 0; i < arr.length; i++) {
        s += "[" + i + "]:" + arr[i].toString() + ", ";
    }
    return s;
}
function convertStr2Arr2D(arr) {
    if(typeof(arr) === 'undefined') {
        console.log( "err: arr==undefined");
        return;
    }
    if(typeof(arr.length) === 'undefined') {
        console.log( "err: arr.length==undefined");
        return;
    }
    if(typeof(arr[0].length) === 'undefined') {
        console.log( "err: arr[0].length==undefined");
        return;
    }
    var s = "";
    for (var i = 0; i < arr.length; i++) {
        s += "[" + i + "]:";
        for (var k = 0; k < arr[i].length; k++) {
            s += " [" + k + "]:" + arr[i][k];
        }
        s += "\n";
    }
    return s;
}

function deepEqual(x, y) { //비교함수
    if ((typeof x === "object" && x !== null) && (typeof y === "object" && y !== null)) {
        if (Object.keys(x).length !== Object.keys(y).length) return false;
        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (! deepEqual(x[prop], y[prop])) return false;
            }
            else return false;
        }
        return true;
    }
    else if (x !== y) return false;
    else return true;
}
//deepEqual([1,2,'hello'], [1,2,'hello']); //true
//deepEqual([1,2,'hello'], [1,'2','hello']); //false

//Fast & low GC 1item-splice: //가비지콜렉트줄이는 아이템제거 스프라이스
function splc1(arr, idx){ //arr[idx]만 제거      // 보통splice(a,2)는 배열[a+0],[a+1]제거한다.
    var len=arr.length;
    if (len){
        while (idx<len){
            arr[idx++] = arr[idx];
        }
        --arr.length;
    }
}
//자바스크립트배열 끝-------------------------


//수학<-----------------
//var VxV  = Math.pow(3, 2)            //3^2=9//제곱
//var modV = 5 % 2                     //1    //나머지값

function clamp_MathHelper(value, min, max) { //최대최소값minmax
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
function lerp__MathHelper(value1, value2, amount) { //인터폴레이션,보간,
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
}

function distance2D(x1, y1, x2, y2) { //거리구하기
    if (!x2) x2 = 0;
    if (!y2) y2 = 0;
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
//Math.dist(0,0, 3,4); //the output will be 5
//Math.dist(1,1, 4,5); //the output will be 5
//Math.dist(3,4); //the output will be 5

//범위 포함, 램덤 정수 생성
function randRangeFromInt(low, high) // Get a random int between low and high, inclusive
{
    return Math.floor(low + Math.random() * (high - low + 1));
}

//--------------------------공A중심xy, 공A반지름, 공B중심xy, 공B반지름 //충돌체크
function circleIntersectionFromPos(x1, y1, r1, x2, y2, r2) {
    // Calculate the distance between the centers
    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);

    if (len < r1 + r2) {
        // Circles intersect
        return true;
    }

    return false;
}
//사용예 //레벨에 공이 들어갔을때 충돌체크
//        for (var i=0; i<level.columns; i++) {
//            for (var j=0; j<level.rows; j++) {
//                var tile = level.tiles[i][j];
//                if (circleIntersection(player.bubble.x + level.tilewidth/2,
//                                       player.bubble.y + level.tileheight/2,
//                                       level.radius*0.5,
//                                       coord.tilex + level.tilewidth/2,
//                                       coord.tiley + level.tileheight/2,
//                                       level.radius))
//                {
//                    snapBubble();//충돌처리
//                    return;
//                }
//            }
//        }


//포지션에서 각도를 계산할 때
//라디안값을 각도값으로
function radToDeg(angle) // Convert radians to degrees
{
    return angle * (180 / Math.PI);
}

//각도에서 포지션을 계산할 때
//각도값를 라디안값으로
function degToRad(angle) // Convert degrees to radians
{
    return angle * (Math.PI / 180);
}

function interpolateAngles(a1, a2, weight, radians) {  // interpolated between angles (short leg, scaled to -180..180 / -PI..PI)
    if (typeof radians === 'undefined') { radians = true; }
    var wrap = (radians) ? Math.PI : 180;
    if (Math.abs(a2 - a1) > wrap) {
        if (a2 > a1) {
            a1 += wrap * 2;
        } else {
            a2 += wrap * 2;
        }
    }
    var out = (a1 + ((a2 - a1) * weight));
    if (out >= 0 && out <= wrap * 2) { return out; }
    return (out % (wrap * 2));
}

function moveToAngle(angle, dist) //각도로 거리만큼 이동(로컬좌표리턴)
{
    var ret = [0, 0];
    ret[0] = dist * Math.cos(degToRad(angle));
    ret[1] = dist * -1 * Math.sin(degToRad(angle));
    return ret;
}

//주어진 degree값만큼 회전
function rotateFromPos(cx, cy, x, y, angle) //지정위치에서 회전계산함수
{
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

function getAngleFromPos(centerX, centerY, X, Y) {
    //   html screen
    //   (0,0)+---+
    //        |   |
    //        +---+(625,625)
    var mouseangle = radToDeg(Math.atan2(centerY - Y, X - centerX));
    //              (90)
    //               |
    //          179  |   1 
    //      (-180)--중심--(0)
    //          -179 |  359
    //               |
    //             (-90)
    while (mouseangle < 0) {
        mouseangle = mouseangle + 360;
    }
    while (mouseangle > 360) {
        mouseangle = mouseangle - 360;
    }
    //               (90)
    //                 |    
    //         (180)--중심--(0) Math.floor(mouseangle)시
    //                 |
    //               (270)

    return mouseangle;
}

function cropAngleWith180(angle, min, max) {
    //               (90)
    //                 |    
    //         (180)--중심--(0) 좌표계
    //                 |
    //               (270)    
    if (angle > 90 && angle < 270) // Left
    {
        if (angle > max) {
            angle = max;
        }
    } else // Right
    {
        if (angle < min || angle >= 270) {
            angle = min;
        }
    }
    return angle;
}
//원 안에서 랜덤위치(로컬)
function randomPointOnCircle(radius) { //randomPointOnCircle(2); // → 리턴값 [x,y] = [0.3667, 1.966]
    var angle = Math.random() * 2 * Math.PI;
    return [ radius * Math.cos(angle),radius * Math.sin(angle)];
}
//수학> 끝-----------------

if(typeof(ref_)!=='undefined') {
    var chkval2 = (typeof(kData.userData) === 'undefined') ? 'undefined' : "value";//언디파인드예외처리undefined예외처리
    console.log("userData:" + chkval2);
}


//강제정지
function delayTime(ms) {
    var cur_d = new Date();
    var cur_ticks = cur_d.getTime();
    var ms_passed = 0;
    while (ms_passed < ms) {
        var d = new Date(); // Possible memory leak?
        var ticks = d.getTime();
        ms_passed = ticks - cur_ticks;
        // d = null;  // Prevent memory leak?
    }
}
function toDelayRun() {
    setTimeout(function () {
        //
    }, 500); //0.5초 뒤
}
function float2int(f) { //소수->정수
    return Math[f < 0 ? 'ceil' : 'floor'](f);
}

function float2int_fast(f) { //소수->정수
    return f | 0;
}
function rgb2hex(rgbArr) //[1.0,1.0,1.0]->0x000000==[255,255,255] //픽시버젼에 문제가 잇어서 따로사용 
{
    return ((rgbArr[0] * 255 << 16) + (rgbArr[1] * 255 << 8) + rgbArr[1] * 255 << 0);
}
function hex2rgb(hex) { //픽시에 있음, 똑같음
    return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF) / 255];
}
function hex2str(hex) //샵버젼 //0x000000->"#000000"
{
    hex = hex.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;
    return '#' + hex;
}

function ref_string() {
    var isfind = "Hello".includes("hell");
}

function str2int(str) { //스트링을정수로변환,정수변환
    //parseInt("010", 10)  // == 10
    //parseInt("4.23")     // == 4
    //parseInt("012.23")   // == 12
    //parseInt("5.2aa")    // == 5
    //parseInt("5.2aa")    // == NaN
    //parseInt("aaa")      // == NaN
    //Number("aaa")        // == NaN //속도가 더 빠르고, 오류발생요건이 많다
    //"2"*1;               //2       //속도가 더 느림
    return Number(str);
}
function str2float(str) { //소수변환
    //parseFloat('2.34cms')  //Output: 2.34
    //parseFloat('12.5')     //Output: 12.5
    //parseFloat('012.3')    //Output: 12.3
    //parseFloat("34 45 66") //Output: 34
    return parseFloat(str);
}
function int2str(num) {  //스트링변환
    return num.toString();
}
function float2str(num) { //스트링변환
    return num.toString();
}
function floatFixed(num, count) {//소수점 제한
    return num.toFixed(count);
}
function str2int_limited(the_str) {//정수변환 //10배 빠름(Number랑 비교)
    var ret = 0;
    var len = the_str.length;
    if (len >= 1) ret += (the_str.charCodeAt(0) & 0xff) << 0;
    if (len >= 2) ret += (the_str.charCodeAt(1) & 0xff) << 8;
    if (len >= 3) ret += (the_str.charCodeAt(2) & 0xff) << 16;
    if (len >= 4) ret += (the_str.charCodeAt(3) & 0xff) << 24;
    return ret;
}

function number_pad1( a,b ) { //예,pad (1234, 3) => "234" //zerostring,제로스트링 만들기
    return (
        1e15 + a + // combine with large number
        "" // convert to string
    ).slice(-b) // cut leading "1"
}

// function number_pad2(input) { //zerostring,제로스트링 만들기(크기가4로 제한)
//     // var BASE = "0000";
//     // var thiscount =  Math.ceil(input / 10);
//     // return input ? BASE.substr(0, 4 - Math.ceil(input / 10)) + input : BASE;
//     //오류가 있다.
//     //   1 --> 0001,
//     //  11 --> 0011,
//     // 111 -->  111,
//     //1111 --> 1111,
//
//
//     // var BASE = "0000";
//     // var inputcount =  Math.ceil(input / 10);
//     // var sub = BASE.substr(0, 4 - inputcount);
//     // var ret = sub + input;
//     // return ret;
//
//     var BASE = zeropad;//"0000";
//     return input ? BASE.substr(0, (zeropad.length+1) - Math.ceil(input / 10)) + input : BASE;
//
//
//
// }
// function number_pad3(num, count){
//     var ret = num.toLocaleString('en-US',
//         {
//             style: 'decimal',
//             minimumIntegerDigits: count,
//             //minimumFractionDigits: 2, //표시 5.00
//             useGrouping: false
//         });
//     return ret;
// }

function int2str_limited(the_int) { //toString() 보다 빠르다
    /*
     Examples:
     int2str( str2int("test") ) == "test" // true
     int2str( str2int("t€st") ) // "t¬st", because "€".charCodeAt(0) is 8364, will be AND'ed with 0xff
     Limitations:
     max 4 chars, so it fits into an integer
     */
    var tmp = [
        (the_int & 0x000000ff) >> 0,
        (the_int & 0x0000ff00) >> 8,
        (the_int & 0x00ff0000) >> 16,
        (the_int & 0xff000000) >> 24
    ];
    var ret = "";
    for (var i = 0; i < 4; i++) {
        if (tmp[i] === 0)
            break;
        ret += String.fromCharCode(tmp[i]);
    }
    return ret;
}
//--날짜비교<-------------------------
function convertZeroDay(y, m, d) { //int 2017,8,11 --> string '20170811'
    return ""+y+(m<10?('0'+m):m)+(d<10?('0'+d):d);
}

//오늘날짜
var dt = new Date();
var month = dt.getMonth()+1; //0~11이므로 +1해야만 함
var day = dt.getDate();
var year = dt.getFullYear();
var datetoday = convertZeroDay(year, month, day);
if(typeof(dm)!=='undefined') { //dm모드가 언디파인드상태이므로
    if (dm)
        console.log("datetoday:" + datetoday);
}

//한계날짜
var dt_limit = new Date(2017, 7.9, 11, 14, 52, 10, 0); //y,m,d,h=14,mi=52,s=10,ms=0
var month2 = dt_limit.getMonth()+1; //0~11이므로 +1해야만 함
var day2 = dt_limit.getDate();
var year2 = dt_limit.getFullYear();
var datelimit = convertZeroDay(year2, month2, day2);
if(typeof(dm)!=='undefined') {
    if (dm)
        console.log("datelimit:" + datelimit);
}

if(typeof(dm)!=='undefined') {
    if(dm) {
        if (datetoday <= datelimit) console.log("today is before"); //같은 날짜까지 유효
        else console.log("today is over");
    }
}
//--날짜비교>-------------------------

//다이얼로그--트윈 시작-------------
function onFadeoutScale(con, fnEnd) //스케일작게사라지게
{
    //스케일트윈
    TweenMax.fromTo( con.scale,
        0.15, //time
        {
            x: 1,
            y: 1

        }, { //메달트윈
            x: 0.5,
            y: 0.5,
            ease: Linear.easeNone,
            onComplete: fnEnd,
            //onComplete: function(){ runFadeinScale(con);},
            delay: 0.2
        }
    );
    //알파트윈
    TweenMax.fromTo( con,
        0.15, //time
        {
            alpah: 1
        }, { //메달트윈
            alpha: 0,
            ease: Linear.easeNone,
            delay: 0.2
        }
    );
}
function onFadeinScale(con, fnEnd) //스케일크며보이기
{
    con.alpha = 0;
    //스케일트윈
    TweenMax.fromTo( con.scale,
        0.25, //time
        {
            x: 0.5,
            y: 0.5

        }, { //메달트윈
            x: 1,
            y: 1,
            ease: Elastic.easeOut,
            onComplete: fnEnd,
            delay: 0.2
        }
    );
    //알파트윈
    TweenMax.fromTo( con,
        0.25, //time
        {
            alpah: 0
        }, { //메달트윈
            alpha: 1,
            ease: Linear.easeNone,
            delay: 0.2
        }
    );
}
function onFadeout(con, begin, fnEnd) //사라지게
{
    //알파트윈
    TweenMax.fromTo( con,
        0.15, //time
        {
            alpah: begin
        }, { //메달트윈
            alpha: 0,
            ease: Linear.easeNone,
            delay: 0.2
        }
    );
}
function onFadein(con, end, fnEnd) //보이게
{
    //알파트윈
    TweenMax.fromTo( con,
        0.25, //time
        {
            alpah: 0
        }, { //메달트윈
            alpha: end,
            ease: Linear.easeNone,
            delay: 0.2
        }
    );
}
//다이얼로그--트윈 끝-------------


if(typeof(ref_)!=='undefined') {

    //빈객체 생성 //2가지
    var arr = {}; //오브젝트로 초기화
    //err var arr = new Object();

    arr = [1, 2, 3, 4]; //배열로 초기화
    arr = new Array(10, 11, 12, 13, 14, 15, 16, 17, 18, 19); //비추천
    arr.name = "simple array";
    //err arr["name"] =  "tiny array";

    var whatType = typeof (arr[90]); //undefined
    arr[arr.length] = 111; //안전하게 덧붙이기
    var ret111 = arr.pop(); //맨뒤값 리턴, 맨뒤값 제거
    arr.push(222); //맨뒤값 추가(Add),
    var ret10 = arr.shift(); //맨앞값 리턴, 맨앞값 제거
    arr.unshift(-111); //맨앞값 추가
    arr.reverse(); //
    var retC = arr.slice(1, 3); //인덱스[1]~인덱스[3-1]까지 값을 추려서, 결과값 리턴
    arr.sort(CompareForSort); //
    arr.sort(function (a, b) {
        return a.id - b.id
    });
    var retA = arr.splice(2, 3); //[2]부터 3개 제거, 제거값 리턴
    var retB = arr.splice(2, 3, 444, 555); //[2]부터 3개 제거후, [2]에 추가, 제거값 리턴

    arr.toString();
    arr.toLocaleString();
    var retF = arr.concat([20, 21, 22, 23, 24, 25, 26, 27, 28, 29]); //새배열로 연결후, 리턴
    var retG = arr.join(" and "); //스트링 결과 리턴

    //sort용 비교함수
    function CompareForSort(first, second) {
        if (first == second) return 0;
        if (first < second) return -1;
        else return 1;
    }

    for (var i = 0, leng = arr.length; i < leng; i++) {} //참조줄이기

    // //http://stackoverflow.com/questions/10557486/in-an-array-of-objects-fastest-way-to-find-the-index-of-an-object-whose-attribu
    //인덱스리턴소트 sort return index find index
    var test = ['b', 'c', 'd', 'a'];
    var len = test.length;
    var indices = new Array(len);
    for (var i = 0; i < len; ++i) indices[i] = i;
    //indices.sort(function (a, b) { return test[a] < test[b] ? -1 : test[a] > test[b] ? 1 : 0; });//작은-->큰
    indices.sort(function (a, b) {
        return test[a] > test[b] ? -1 : test[a] < test[b] ? 1 : 0;
    });//큰-->작은
    if (dm) console.log(indices);

    //객체
    var obj = {
        name: "Carrot",
        "for": "Max",
        details: {
            color: "orange",
            size: 12
        }
    };

    //객체접근
    var cName1 = obj.details.color;
    //err var cName2 = obj["details"]["size"];

    var hA = "hello";
    var h1 = hA.charAt(0); //h
    var iInt = parseInt("0120", 10); //120
    var rA = hA.replace("hel", "gal"); // gallo
    var hBig = hA.toUpperCase();

    var bA = Boolean(""); //false   //비워있으면 false
    var bB = Boolean(234); //true

    var aString = "1" + 1 + 1; //111   //형변환은 첨것으로 판별
    var aInt = 1 + 1 + "1"; //3

    //err var bTypeA = (1==true);   //true  //형변환하므로
    var bTypeB = (1 === true); //false //반대로 !== 연산자

    var nameA = arr[0] && arr[0].getName();
    var nameB = arr[0] || "default";

    //물음표문
    var allowed = (arr[0] > 18) ? "yes" : "no";

    //스위치문
    switch (arr[0]) {
        case 0:
            break;
        case 1:
            break;
        default:
            break;
    }

    //forin포인반복문 //포문in//포인문
    for (var arr1 in arr) { console.log(arr1);}

    //반전포문//반대포문//역방향포문//역순포문
    var iRevArr = [0,1,2];
    for (var i = iRevArr.length - 1; i >= 0; i--) { console.log(iRevArr[i]); }

    //와일문 //while문 //적어도 1번실행
    var iA = 0;
    do {
        iA += 10;
    } while (iA < 100);

    //일반적인 while
    var iB = 0;
    while (true) {
        iB += 1;
        if (iB > 1000) break; //조건 탈출
    }


    function avg() { //평균함수 //인자를 가변적으로 사용하기
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            sum += arguments[i];
        }
        return sum / arguments.length;
    }

    var retH = avg(2, 3, 4, 5, 6); //인자를 가변적으로 사용하기
    var retI = avg.apply(null, [2, 3, 4, 5, 6]); //배열인자

    var avgF = function () { //평균함수 //함수를 변수로 지정
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            sum += arguments[i];
        }
        return sum / arguments.length;
    }; //변수

    //사용자 정의 객체 --어설프고, 전역 이름공간에 관련 함수가 주렁
    function makePerson(first, last) {
        return {
            first: first,
            last: last
        };
    }

    function personFullName(person) {
        return person.first + ' ' + person.last;
    }

    function personFullNameReversed(person) {
        return person.last + ', ' + person.first;
    }

    var sTemp = makePerson("Simon", "Willison");
    personFullName(sTemp); //Simon Willison
    personFullNameReversed(sTemp); //Willison, Simon

    //사용자 정의 객체
    function makePerson(first, last) {
        return {
            first: first,
            last: last,
            fullName: function () {
                return this.first + ' ' + this.last;
            },
            fullNameReversed: function () {
                return this.last + ', ' + this.first;
            }
        }; //변수
    }

    var sName = makePerson("Simon", "Willison");
    var sFull = sName.fullName(); //Simon Willison
    var sReve = sName.fullNameReversed(); //Willison, Simon
    //문제요지
    var sErr = makePerson("Simon", "Willison");
    var fullName = sErr.fullName;
    fullName(); // undefined undefined //전역변수를 참조하려함

    //사용자 정의 객체 --'this'코드의 이점
    function Person(first, last) {
        this.first = first;
        this.last = last;
        this.fullName = function () {
            return this.first + ' ' + this.last;
        };
        this.fullNameReversed = function () {
            return this.last + ', ' + this.first;
        };
    }

    var sNameThis = new Person("Simon", "Willison");

    //사용자 정의 객체 --prototype는 인스턴스
    function Person(first, last) {
        this.first = first;
        this.last = last;
    }

    Person.prototype.fullName = function () {
        return this.first + ' ' + this.last;
    };
    Person.prototype.fullNameReversed = function () {
        return this.last + ', ' + this.first;
    };
    Person.prototype.firstNameCaps = function () {
        return this.first.toUpperCase();
    };
    String.prototype.reversed = function () { //스트링에 추가도 됨
        var r = "";
        for (var i = this.length - 1; i >= 0; i--) {
            r += this[i];
        }
        return r;
    };
    Person.prototype.toString = function () {
        return '<Person: ' + this.fullName() + '>';
    };
    var sPtInst = new Person("Simon", "Willison");
    sPtInst.firstNameCaps(); //SIMON
    var sString = "Simon";
    sString.reversed(); //스트링에 추가된 함수 호출
    //print// sPtInst;                                        //<Person: Simon Willison>

    function lastNameCaps() {
        return this.last.toUpperCase();
    }

    lastNameCaps.call(sPtInst); //apply()는 call이라는 이름을 가진 자매 함수를 가짐
    //apply()와는 대조적으로 확장된 메소드 리스트를 가짐

    //내장함수 //지역 전역 //전역 범위에 들어 있는 함수의 수를 낮게 유지
    function betterExampleNeeded() {
        var a = 1;

        function oneMoreThanA() {
            return a + 1;
        }

        return oneMoreThanA();
    }

    //클로져 //닫힌 주머니 //컨트롤하지 못하는 내부변수 //쉽게 메모리 누출
    function makeAdder(a) {
        return function (b) {
            return a + b;
        };
    }

    var xClosures = makeAdder(5);
    var yClosures = makeAdder(20);
    //xClosures(6); // 11을 돌려줌
    //yClosures(7); // 27을 돌려줌

    //메모리누출 테스트
    var document;

    function leakMemory() {
        var el = document.getElementById('el');
        var o = {
            'el': el
        };
        el.o = o; //el와 o에 의해 사용되는 메모리를 반환하지 못합
    }

    function addHandler() {
        var el = document.getElementById('el'); //JavaScript 객체 (내부 함수)와 원시 객체 (el)간에 순환 참조
        el.onclick = function () { //익명 내부 함수 때문에 생성된 클로져
            this.style.backgroundColor = 'red';
        };
    }

    //메모리누출방지
    function addHandler() {
        var el = document.getElementById('el');
        el.onclick = function () {
            this.style.backgroundColor = 'red';
        };
        el = null; //순환 참조 고리를 끊을
    }

    function addHandler() {
        var clickHandler = function () {
            this.style.backgroundColor = 'red';
        } //순환 참조를 고리를 끊기 위한 한 요령은 또다른 클로져를 추가하는 것
        (function () {
            var el = document.getElementById('el');
            el.onclick = clickHandler;
        })(); //내부 함수는 실행되고 바로 사라지므로서, clickHandler와 함께 생성된 클로져로부터 그 내용을 숨깁니다.
    }

    //---------------정수변환
    var int_a = Math.floor(value); //정수
    var int_b = Math.round(value); //반올림정수
    var int_c = Math.ceil(value); //그냥올림정수

    //---------------트윈맥스모음 ----------------------------------------------------------------------
    var bzPath = [
        {
            x: 0, y: 0
        },
        {
            x: dx, y: 80
        },
        {
            x: dx + dtx, y: dty * 0.5
        },
        {
            x: dtx, y: dty
        }
    ];
    TweenMax.to(nbBubble[index].item, dirdist * 0.00125, //time
        {
            bezier: {
                //type:"cubic",
                type: "soft", //강추
                //autoRotate:true,
                values: bzPath
            },
            ease: Linear.easeNone,
            delay: 0
        }
    );


    //딜레이콜
    TweenMax.delayedCall(0.1, //time
        function () {
            //console.log();
        }
    );



    //작동중인 트윈맥스제거1
    if (TweenMax.isTweening(textobj))
        TweenMax.killTweensOf(textobj);

    //작동중인 트윈맥스제거2
    var dotsTL;
    //순차적 스케일 만들고
    dotsTL = new TimelineMax({repeat: -1});
    dotsTL.add(TweenMax.staggerTo(dots, 0.5, {scale: 0.1}, 0.05));
    dotsTL.add(TweenMax.staggerTo(dots, 0.2, {scale: 1}, 0.05));
    //순차적 스케일 제거
    dotsTL.totalTime(dotsTL.totalDuration()).kill();


    //이동트윈
    TweenMax.fromTo(this, //object
        0.35, //time
        {
            x: 0, y: 0                        //pos
        }, {
            x: 100, y: 0,
            ease: Power1.easeOut,
            //yoyo:true,
            //repeat:1,

            delay: 0.1
        }
    );

    CustomEase.create(
        "bouncing1",
        "M0,0 C0.105,0 0.374,0.058 0.478,0.206 0.632,0.42 0.724,0.963 0.732,1 0.74,0.985 0.79,0.906 0.874,0.906 0.966,0.906 1,1 1,1"//바운드
    );
    //스케일트윈
    TweenMax.fromTo(obj.scale, 1,//time
        {
            x: 0.1, y: 0.1
        }, {
            x: 1, y: 1,
//            ease: RoughEase.ease.config(
//                {
//                    template:  Power0.easeNone,//Power1.easeOut
//                    strength: 0.2,
//                    points: 10,
//                    taper: "none",  //none,in(시작시노이즈없게),out(끝노이즈없게),both(시작끝노이즈없게)
//                    randomize: false, //true(rand),false(regular)
//                    clamp: false
//                }
//            ),
            ease: Linear.easeNone,
            //ease: SteppedEase.config(12),
            //ease: SlowMo.ease.config(0.1, 0.4),
            //ease: "bouncing1", //<--- CustomEase.create
            //ease: Power0.easeOut
            //ease: Sine.easeOut
            //ease: Power1.easeOut,
            //ease: Elastic.easeOut,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1, //무한 -1
            //repeatDelay:0.5
            // onStart: function(){};
            // onUpdate: function(){},
            // onComplete: function (){console.log("~ ~ twMaxOncomplete:"+0)},
            // onRepeat: function(){},
            delay: 0
        }
    );

    ///루핑스케일
    TweenMax.fromTo(obj.scale, 0.25, //time
        {
            x: 0.98, y: 0.98
        }, {
            x: 1.02, y: 1.02,
            repeat: -1,
            delay: 1.25,
            ease: Power1.easeInOut,
            yoyo: true
        }
    );

    //트윈맥스투
    var tween = TweenMax.to(obj, 2,//time
        {
            scaleX: 153,
            ease: Linear.easeNone
        }
    );


    //값트윈
    var twVal = {score: 0};
    twVal.score = 0; //시작시초기화
    TweenMax.fromTo(twVal, 0.5, //time
        {
            score: 0
        }, {
            score: 1234,
            ease: Linear.easeNone,
            onUpdate: function () {
                twText.text = getMoneyFormatFromNum(twVal.score);
            },
            delay: 0.5
        }
    );

    //트윈맥스스태거
    grp.z_stagging = true;
    TweenMax.staggerFrom(grp.dlbg.sIcons, 0.15, //1개당시간
        {
            alpha: 0,
            ease: Linear.easeNone, //ease:Power1.easeOut, ease:Elastic.easeOut,
            delay: 0 //첫시작1번만
        },
        0.03,//다음트윈까지시간
        function () {
            grp.z_stagging = false;
        }//onCompleteAll
    );

    //트윈맥스로컬이동//로컬트윈맥스
    var combo = grp;
    TweenMax.set(combo, {alpha: 1, y:0});
    TweenMax.to(combo, 0.5, {
        y: "-=100",
        alpha: 0,
        ease: Linear.easeNone,
        onComplete: function () { combo.onHide(); },
        onUpdate: function () { console.log(combo.y); }
    });

    //---------------트윈맥스종료 ----------------------------------------------------------------------
} //if(typeof(ref_)!=='undefined')


if(typeof(ref_)!=='undefined') {
    function _ref_objectindex() { //오브젝트 인덱스
        //오브젝트 {}를  값을 인덱스로 가져오기
        (function () {
            if (!Array.prototype.indexOfPropertyValue) {
                Array.prototype.indexOfPropertyValue = function (prop, value) {
                    for (var index = 0; index < this.length; index++) {
                        if (this[index][prop]) {
                            if (this[index][prop] == value) {
                                return index;
                            }
                        }
                    }
                    return -1;
                }
            }
        })();
        // usage:
        var Data = [
            {id_list: 1, name: 'Nick', token: '312312'}, {id_list: 2, name: 'John', token: '123123'}];
        Data.indexOfPropertyValue('name', 'John'); // returns 1 (index of array);
    }
} //if(typeof(ref_)!=='undefined')

//------------------------해쉬테이블--시작-------------------
if(typeof(ref_)!=='undefined') {
//http://www.mojavelinux.com/articles/javascript_hashes.html
    function HashTable(obj) {
        this.length = 0;
        this.items = {};
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.items[p] = obj[p];
                this.length++;
            }
        }

        this.setItem = function (key, value) {
            var previous = undefined;
            if (this.hasItem(key)) {
                previous = this.items[key];
            }
            else {
                this.length++;
            }
            this.items[key] = value;
            return previous;
        },

            this.getItem = function (key) {
                return this.hasItem(key) ? this.items[key] : undefined;
            },

            this.hasItem = function (key) {
                return this.items.hasOwnProperty(key);
            },

            this.removeItem = function (key) {
                if (this.hasItem(key)) {
                    previous = this.items[key];
                    this.length--;
                    delete this.items[key];
                    return previous;
                }
                else {
                    return undefined;
                }
            },

            this.keys = function () {
                var keys = [];
                for (var k in this.items) {
                    if (this.hasItem(k)) {
                        keys.push(k);
                    }
                }
                return keys;
            },

            this.values = function () {
                var values = [];
                for (var k in this.items) {
                    if (this.hasItem(k)) {
                        values.push(this.items[k]);
                    }
                }
                return values;
            },

            this.each = function (fn) {
                for (var k in this.items) {
                    if (this.hasItem(k)) {
                        fn(k, this.items[k]);
                    }
                }
            },

            this.clear = function () {
                this.items = {}
                this.length = 0;
            }
    }
}//if(typeof(ref_)!=='undefined') {
// 해쉬 사용법
// var h = new HashTable({one: 1, two: 2, three: 3, "i'm no 4": 4});
//
// alert('original length: ' + h.length);
// alert('value of key "one": ' + h.getItem('one'));
// alert('has key "foo"? ' + h.hasItem('foo'));
// alert('previous value of key "foo": ' + h.setItem('foo', 'bar'));
// alert('length after setItem: ' + h.length);
// alert('value of key "foo": ' + h.getItem('foo'));
// alert('value of key "i'm no 4": ' + h.getItem("i'm no 4"));
// h.clear();
// alert('length after clear: ' + h.length);
//------------------------해쉬테이블--끝-------------------


//---"~해쉬디버그"-----------------------
//--디버그text스타일--
var style_debug = {
    font: "30px Arial",
    fill: hex2str(ColorSet.white),
    align: "right",
    stroke: hex2str(ColorSet.black),
    strokeThickness: 5,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
//--디버그text스타일--
//--text오브젝트 만들기--
// this.txDebug =  uigame.add.text(0, 0, "debug:", style_debug);
// this.txDebug.anchor.setTo(1,1);
// this.txDebug.position.setTo(720,1280);
// txdebug = this.txDebug;
//--text오브젝트 만들기--

var hsDebug = {};
hsDebug_len = 0; //해쉬갯수
hsDebug_str = "";       //해쉬의 스트링화
hsDebug_h1 = undefined; //실제 해쉬

hsDebug.onUpdateHash = function ( ) {
    //디버그해쉬-->text출력
    hsDebug_str = "";
    hsDebug_len = 0;
    for (var hsDebug_h1 in hsDebug) {
        //hsDebug_h1 단순string이므로
        if (hsDebug_h1[0] === "~") {
            if(hsDebug_h1[1]==="i"){
                hsDebug_str += ( hsDebug[hsDebug_h1][0] + ": " + float2int_fast(hsDebug[hsDebug_h1][1]) + ",\n" );
            }else {
                hsDebug_str += ( hsDebug[hsDebug_h1][0] + ": " + hsDebug[hsDebug_h1][1] + ",\n" );
            }
            hsDebug_len++; //해쉬갯수
        }
    }
    if (typeof txdebug !== 'undefined') { //if (txdebug !== undefined) { //언디파인처리
        if (hsDebug_str !== txdebug.text) {        //text업데이트횟수 줄일려고, 스트링검사
            txdebug.text = hsDebug_str;
        }
    }
};

//해쉬디버그에 등록(초기화겸 업데이트)
hsDebug.onSet = function (name, val) { //해쉬디버그에 값대입만
    hsDebug["~" + name] = [name, val];
};
hsDebug.onMax = function (name, val) { //해쉬디버그에 최대값만
    hsDebug_h1 = hsDebug["~" + name];
    if (hsDebug_h1 === undefined) {
        hsDebug["~" + name] = [name, val]; //처음일때
    }else {
        if (val > hsDebug_h1[1]) hsDebug["~" + name] = [name, val];
    }
};
hsDebug.onMin = function (name, val) { //해쉬디버그에 최소값만
    hsDebug_h1 = hsDebug["~" + name];
    if (hsDebug_h1 === undefined) {
        hsDebug["~" + name] = [name, val]; //처음일때
    }else {
        if (val < hsDebug_h1[1]) hsDebug["~" + name] = [name, val];
    }
};
hsDebug.onAdd = function (name, val) { //해쉬디버그에 더하기
    hsDebug_h1 = hsDebug["~" + name];
    if (hsDebug_h1 === undefined) {
        hsDebug["~" + name] = [name, val]; //처음 입력되는 변수
    }
    else {
        hsDebug["~" + name] = [name, val + hsDebug_h1[1]]; //기존 변수 업데이트
    }
};

//hsDebug.onSet("~os", 1234);
//hsDebug.onSet("~v1", "aa");
//hsDebug.onSet("~os", "ios");
//if(dm) hsDebug.onAdd("elapsed", this.game.time.elapsed);
//if(dm) hsDebug.onUpdateHash();
//--"~해쉬디버그"----------------------