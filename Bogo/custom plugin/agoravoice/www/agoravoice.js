var exec = require('cordova/exec');

exports.voiceChat = function (arg0, success, error) {
	var token=arg0.token
	var channel=arg0.channel
	var extraString=arg0.extraString
	var uid=arg0.uid
	var args = [token,channel,extraString,uid];
    exec(success, error, 'VoicePlugin', 'voiceChat', args);
}

exports.muteLocalAudioStream = function (arg0, success, error) {
    exec(success, error, 'VoicePlugin', 'muteLocalAudioStream', [arg0]);
}

exports.leaveChannel = function (arg0, success, error) {
    exec(success, error, 'VoicePlugin', 'leaveChannel', [arg0]);
}

exports.destroy = function (arg0, success, error) {
    exec(success, error, 'VoicePlugin', 'destroy', [arg0]);
}

exports.muteRemoteAudioStream = function (arg0, success, error) {
	var state=arg0.state
	var uid=arg0.uid
	var args = [state,uid];
    exec(success, error, 'VoicePlugin', 'muteRemoteAudioStream', args);
}

