/**
 * Created by juho on 2016-03-29.
 */

var Util = {
    // 자릿수 맞춰 문자열 반환
    zeroStr:function(num, total){
        var str = num.toString();
        var i = total - str.length;
        while(i--){
            str = '0' + str;
        }
        return str;
    },
    // 랜덤 숫자 반환
    randomNumber:function(total, point){
        var p = 10*point || 1;
        return Math.floor((Math.random()*total*p)/p);
    },
    hitTest:function(bound, point){
        if(point.x >= bound.x && point.x <= (bound.x + bound.width) && point.y >= bound.y && point.y <= (bound.y + bound.height)) return true;
        return false;
    },
    // 배열에 중복값 삭제
    uniqueArray:function(arr){
        var a = [];
        for (var i=0, l=arr.length; i<l; i++)
            if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
                a.push(arr[i]);
        return a;
    },
    // 문자열에 콤마 추가
    comma:function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    // 배열 섞기
    shuffle:function(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    },
    // 특정 값만 배열에서 삭제
    grep:function(ary, removeItem){
        return jQuery.grep(ary, function(value) {
            return value != removeItem;
        });
    },
    // url 파라미터 반환
    getParam:function(str) {
        var v = window.location.search.match(new RegExp('(?:[\?\&]'+str+'=)([^&]+)'));
        return v ? v[1] : null;
    },
    mobileCheck:function() {
        if(navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            return true;
        }else {
            return false;
        }
    },
    radiansToDegrees:function(degrees){
        return degrees * Math.PI / 180;
    },
    degreesToradians:function(radians){
        return radians * 180 / Math.PI;
    },

    getNowDate:function(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y+'.'+m+'.'+d;
    },
};