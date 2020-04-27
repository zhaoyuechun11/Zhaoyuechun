/**
 * GameLoader.js v.0.1
 */
var yahooIN=yahooIN||undefined;
var yahooTest= (yahooTest === undefined) ? undefined : yahooTest;
var strGamePath = strGamePath || "";

var jsJsonTable;
var i_JSFileMax;
var i_curJSFile;

var xxSVer = 1;
var xxIVer = 1;

$.getJSON(strGamePath+'json/jsTable.json', function (json) {
	jsJsonTable = json;
	i_JSFileMax = jsJsonTable.jsData.length;
	i_curJSFile = 0;

	LoadJS();
});

var LoadJS = function () {
	var _path = jsJsonTable.jsData[i_curJSFile].path + jsJsonTable.jsData[i_curJSFile].jsName;
	//_path += ("?v="+xxSVer);
	//console.log("======= 11");

	$.getScript(strGamePath+_path, function () {
		if(i_curJSFile < i_JSFileMax-1) {
			i_curJSFile++;
			LoadJS();
		}
	});
};