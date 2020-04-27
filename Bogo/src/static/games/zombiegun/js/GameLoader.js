/**
 * GameLoader.js v.0.1
 */
var yahooIN=yahooIN||undefined;
var yahooTest= (yahooTest === undefined) ? undefined : yahooTest;
// console.log(yahooTest);
var strGamePath = strGamePath || "";

var jsJsonTable;

var i_JSFileMax;
var i_curJSFile;

var console = { log: function() {} , warn:function () {}};

$.getJSON(strGamePath+'json/jsTable.json', function (json) {
    // css 로드
    var link = document.createElement( "link" );
    link.href = strGamePath+"font/HYSUPB/hy_sup_b.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

    jsJsonTable = json;
    i_JSFileMax = jsJsonTable.jsData.length;
    i_curJSFile = 0;

    LoadJS();

    // link.onload = function () {
    //     jsJsonTable = json;
    //     i_JSFileMax = jsJsonTable.jsData.length;
    //     i_curJSFile = 0;
    //
    //     LoadJS();
    // }
});

var LoadJS = function () {
    var _path = jsJsonTable.jsData[i_curJSFile].path + jsJsonTable.jsData[i_curJSFile].jsName;

    $.getScript(strGamePath+_path,function () {
        if(i_curJSFile < i_JSFileMax-1) {
            i_curJSFile++;
            LoadJS();
        }
    });
};