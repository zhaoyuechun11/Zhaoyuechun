var yahooIN=yahooIN||undefined;
var yahooTest= (yahooTest === undefined) ? undefined : yahooTest;
var strGamePath = strGamePath || "";

var jsJsonTable;
var i_JSFileMax;
var i_curJSFile;

$.getJSON(strGamePath+'json/jsTable.json', function (json) {
	// css 로드
	/*var link = document.createElement( "link" );
	link.href =  strGamePath+"css/font.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	link.media = "screen,print";
	document.getElementsByTagName("head")[0].appendChild(link);*/

	jsJsonTable = json;
	i_JSFileMax = jsJsonTable.jsData.length;
	i_curJSFile = 0;

	LoadJS();
    /*
     document.getElementsByTagName("head")[0].appendChild(link);
     link.onload = function () {
     jsJsonTable = json;
     i_JSFileMax = jsJsonTable.jsData.length;
     i_curJSFile = 0;

     LoadJS();
     }
     */
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