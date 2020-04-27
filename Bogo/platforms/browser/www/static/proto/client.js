var fs=require('fs');

var PATH = "./client/";
creatId();//根据协议号生成客户端用json文件

creatClass();//创建消息号的枚举
//进行客户端Proto拼接，up与down
creatProto();
creatProtoDown();

//
function creatClass()
{
	var data=fs.readFileSync("msgDefinition.lua",'utf-8');
	var reg = /\w+\s+\=\s+\d+/g;
	var endArr = data.match(reg);
	var endStr = "class MsgDefine{\n";
	for(var i = 0; i < endArr.length; i++)
	{

		endStr += '    public static ' + endArr[i].match(/\w+\b/) + ' = "'+ endArr[i].match(/\w+\b/) + '" ;\n'
	}
	endStr += '}'

	console.log(endStr);
	fs.writeFile(PATH + "MsgDefine" + ".ts", endStr, function (err) {
		    if (err) throw err;
		    console.log('It\'s saved!'); //文件被保存
		})
}

function creatId()
{
	var data=fs.readFileSync("msgDefinition.lua",'utf-8');
	var reg = /\w+\s+\=\s+\d+/g;
	var endArr = data.match(reg);
	var endStr = "";
	for(var i = 0; i < endArr.length; i++)
	{
		endStr += '    "' + endArr[i].match(/\d+\b/) + '":"'+ endArr[i].match(/\w+\b/) + '",\n'
	}
	endStr += '    "0":"NULL"\n'
	endStr = endStr.substring(0,endStr.length - 1);
	endStr = "{\n" + endStr + "\n}";
	console.log(endStr);
	fs.writeFile(PATH + "ProtoConfig" + ".json", endStr, function (err) {
		    if (err) throw err;
		    console.log('It\'s saved!'); //文件被保存
		})
}

function creatProto()
{
	var up2=fs.readFileSync("up2.proto",'utf-8');
	var common2=fs.readFileSync("common2.proto",'utf-8');
	var temp = 'syntax = "proto2";';
	console.log("读取文件成功");
	common2=common2.substring(common2.indexOf(temp) + temp.length,common2.length);
	var temp2 = 'package up;';
	up2=up2.substring(up2.indexOf(temp2) + temp2.length,up2.length);


	var target = temp + "\n" + temp2 + "\n" + common2 + up2;

fs.writeFile(PATH + "up2.proto", target, function (err) {
		    if (err) throw err;
		    console.log('It\'s saved!'); //文件被保存
		})
}


function creatProtoDown()
{
	var down2=fs.readFileSync("down2.proto",'utf-8');
	var common2=fs.readFileSync("common2.proto",'utf-8');
	var temp = 'syntax = "proto2";';
	console.log("读取文件成功");
	common2=common2.substring(common2.indexOf(temp) + temp.length,common2.length);
	var temp2 = 'package down;';
	down2=down2.substring(down2.indexOf(temp2) + temp2.length,down2.length);


	var target = temp + "\n" + temp2 + "\n" + common2 + down2;

	fs.writeFile(PATH + "down2.proto", target, function (err) {
		    if (err) throw err;
		    console.log('It\'s saved!'); //文件被保存
		})


}



