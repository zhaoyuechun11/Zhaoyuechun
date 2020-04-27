import { setGameUserConnectLocal } from '../utils/localStorageUtil.js';
import Response from '../socket/down.js';
import Request from '../socket/up.js';
import Types from '../socket/types.js';
import Axios from 'axios';
var GameManager = (function () {

  function GameManager() {
    this.gameData = {};
    this.gameHashData = {};
    this.homeGames = [];
    this.platform = 'browser';
    this.IsInGame = false;
    this.websocket = null;
    this.IsLogin = false;
    this.userId = 0;
    this.QuitGameCallback = null;
    this.gameUserConnectData = [];
  };

  GameManager.prototype.setPlatform = function (deviceName) {
    this.platform = deviceName;
  }

  GameManager.prototype.setWebsocket = function (socket) {
    this.websocket = socket;
  }

  GameManager.prototype.setLogin = function (login) {
    this.IsLogin = login;
  }

  GameManager.prototype.getLogin = function () {
    return this.IsLogin;
  }

  GameManager.prototype.init = function (data) {
    this.gameData = data;
    this.gameHashData = {};
    this.homeGames = [];
    for (let i = 0; i < data.gameList.length; i++) {

      if ((data.gameList[i].gameName!= 'Fun Link')||(data.gameList[i].gameName!= 'Slices')) {
        this.gameHashData[data.gameList[i].gameId] = data.gameList[i];

      }
   

      //console.info(data.gameList);

    }

    let homeGameIds = this.gameData.homeGames;
    for (let i = 0; i < homeGameIds.length; i++) {
      let games = [];
      for (let n = 0; n < homeGameIds[i].length; n++) {
        let gd = this.getGameData(homeGameIds[i][n]);
        if (gd != null) {
          games.push(gd)
        }
      }
      this.homeGames.push(games);
    }
  };

  GameManager.prototype.getGameList = function () {
    return this.gameData.gameList;
  };

  GameManager.prototype.getHomeGames = function () {
    return this.homeGames;
  };

  GameManager.prototype.getGameData = function (gameId) {
    return this.gameHashData[gameId];
  };

  /**
   * 保存两人对战信息，uid,rightUid,gameId,gameName
   * @param gameUserConnect
   */
  GameManager.prototype.addGameUserConnect = function (gameUserConnect) {
    let index = this.gameUserConnectData.indexOf(gameUserConnect)
    if (index < 0) {
      this.gameUserConnectData.push(gameUserConnect)
    } else {
      this.gameUserConnectData.splice(index, 1, gameUserConnect)
    }
    setGameUserConnectLocal(this.gameUserConnectData)
  };

  /**
   * 根据对手的id获取两人对战信息
   * @param rightId
   * @returns {*}
   */
  GameManager.prototype.getGameUserConnect = function (rightId) {
    var gameUserConnect = this.gameUserConnectData.find(function (element) {
      return element.rightId == rightId;
    });
    return gameUserConnect;
  };

  GameManager.prototype.hasDownGame = function (gameUrl, successCallback, failCallback) {

    if (this.platform == "browser") {
      let url = "./static/games/" + gameUrl;
      if (successCallback) {
        successCallback(url);
      }
      return;
    }
    

   let appUrl = cordova.file.applicationDirectory + "www/static/games/" + gameUrl;
    //let appUrl = cordova.file.applicationDirectory + 'file:///storage/emulated/0/cache/h5/juicypang/index.html'
    window.resolveLocalFileSystemURL(appUrl, function (entry) {
      if (successCallback) {
        successCallback(entry.toURL());
      }
    } , function (error) {
      let dataRoot = cordova.file.externalApplicationStorageDirectory + "games/" + gameUrl;

      //alert('has file ' + dataRoot);
      window.resolveLocalFileSystemURL(dataRoot, function (entry) {
        if (successCallback) {
          successCallback(entry.toURL());
        }
      }, function (error) {
        if (failCallback) {
          failCallback()
        }
      })
    })
  };

  GameManager.prototype.loginEnter = function (loginType, id, name, headUrl, accessToken, callback) {
    var _this = this;

    if (_this.IsLogin) {
      if (callback) {
        callback({
          state: 'logined',
          userId: _this.userId,
          token: localStorage.getItem('tokenKey')
        });
      }
      return;
    }

    var msg = null
    if (loginType == 'facebook') {//fb
      msg = Request.up.login.create({
        _login_type: 2,
        _name: id,
        _password: accessToken
      });
    } else if (loginType == 'google') {//google
      msg = Request.up.login.create({
        _login_type: 6,
        _name: name,
        _password: accessToken
      });
    } else if (loginType == 'auto') {
      msg = Request.up.login.create({
        _login_type: 4,
        _password: accessToken
      });
    } else if (loginType == 'guest') {
      msg = Request.up.login.create({
        _login_type: 3,
        _name: id
      });
    }
    console.log(msg);

    if (msg != null) {
      var buf = Request.up.login.encode(msg).finish();
      _this.websocket.send(Types.MsgEnum.login, buf).then((msg) => {
        // 登陆成功返回
        var resp = Response.down.login.decode(msg);
        _this.userId = resp._uid;
        if (callback) {
          callback({
            state: 'login',
            userId: resp._uid,
            token: resp._token
          });
        }
      },
        (msg) => {
          // 请求失败
          if (callback) {
            callback(null);
          }
        });
    } else {
      if (callback) {
        callback(null);
      }
    }
  }

  GameManager.prototype.createUser = function (userName, gender, headUrl, callback) {
    var msg = Request.up.create_user.create({
      _user_name: userName,
      _sex: gender,
      _head_portrait: headUrl
    });

    var buf = Request.up.create_user.encode(msg).finish();
    this.websocket.send(Types.MsgEnum.create_user, buf).then((msg) => {
      var loginInfo = Response.down.create_user.decode(msg);
      console.log(loginInfo.toJSON());
      if (callback) {
        callback({
          state: "success"
        });
      }

    }, (error) => {
      if (callback) {
        callback({
          state: "failure"
        });
      }
    });
  }


  GameManager.prototype.getFbUserInfo = function (accessToken, callback) {
    var fbUrl = "https://graph.facebook.com/me?fields=name,gender,birthday,picture&access_token=" + accessToken;
    Axios.get(fbUrl).then(response => {
      var data = response.data
      var fbHeadUrl = "http://graph.facebook.com/" + data.id + "/picture?width=512&height=512";
      if (callback != null) {
        callback(
          {
            userId: data.id,
            givenName: data.name,
            imageUrl: fbHeadUrl,
            accessToken: accessToken
          }
        )
      }
    }).catch(error => {
      if (callback) {
        callback(null);
      }
      //alert('fb user info error ');
    })
  }

  GameManager.prototype.bindAccount = function (loginType, userName, accessToken, callback) {
    var msg = Request.up.account_binding.create({
      _new_login_type: loginType,
      _new_name: userName,
      _new_password: accessToken,
    });

    var buf = Request.up.account_binding.encode(msg).finish();
    this.websocket.send(Types.MsgEnum.account_binding, buf).then((msg) => {
      var loginInfo = Response.down.account_binding.decode(msg);
      //alert('already binding ' + loginInfo._already_binding)
      //_uid _token
      if (callback) {
        callback({
          result: "success",
          isBinded: loginInfo._already_binding,
          user: {
            userId: loginInfo._uid,
            token: loginInfo._token,
          }
        });
      }

    }, (error) => {
      if (callback) {
        callback({
          result: "failure",
          msg: error
        });
      }
    });

  }

  GameManager.prototype.startLogin = function (loginType, callback) {
    var _this = this;
    if (loginType == 'facebook') {
      facebookConnectPlugin.getLoginStatus(function onLoginStatus(status) {
        if (status.status === 'connected') {
          //alert('facebook logined ...' + status.authResponse.userID + " " + status.authResponse.accessToken);
          var result = status;
          //获取个人信息
          _this.getFbUserInfo(result.authResponse.accessToken, (data) => {
            if (data != null) {
              if (callback) {
                callback(
                  {
                    result: "success",
                    user: {
                      userId: data.userId,
                      givenName: data.givenName,
                      imageUrl: data.imageUrl,
                      accessToken: data.accessToken
                    }
                  },
                )
              }
            }
            else {
              if (callback) {
                callback({
                  result: "failure"
                })
              }
            }
          })
        }
        else {
          facebookConnectPlugin.login(["public_profile", "user_friends"],
            function (fbResult) {
              //获取个人信息
              //alert('facebook logined ...' + status.authResponse.userID + " " + status.authResponse.accessToken);

              _this.getFbUserInfo(fbResult.authResponse.accessToken, (data) => {
                //alert('facebook get user info ...' + data.userId + " " + data.accessToken);
                if (data != null) {
                  if (callback) {
                    callback(
                      {
                        result: "success",
                        user: {
                          userId: data.userId,
                          givenName: data.givenName,
                          imageUrl: data.imageUrl,
                          accessToken: data.accessToken
                        }
                      },
                    )
                  }
                }
                else {
                  if (callback) {
                    callback({
                      result: 'failure'
                    })
                  }
                }
              })

            }, function (result) {
              if (callback) {
                callback({
                  result: 'failure'
                })
              }
            });
        }
      });
    }
    else if (loginType == 'google') {
      window.plugins.googleplus.login(
        {
          'webClientId': '572025193413-uh9sa0kopn55sh1rkacuk5e74jt8b5q5.apps.googleusercontent.com'
        },
        function (data) {
          //alert(data.userId + "     " + data.idToken );
          if (callback) {
            callback(
              {
                result: "success",
                user: {
                  userId: data.userId,
                  givenName: data.givenName,
                  imageUrl: data.imageUrl,
                  accessToken: data.idToken
                }
              },
            )
          }
        },
        function (msg) {
          if (callback) {
            callback({
              result: 'failure'
            })
          }
        }
      );
    }
    else if (loginType == 'phone') {

    }
  }

  GameManager.prototype.getTodayRank = function (gameId, page, callback) {
    var msg = Request.up.get_game_today_rank.create({
      _gid: gameId,
      _page_num: page,
    });

    var buf = Request.up.get_game_today_rank.encode(msg).finish();
    this.websocket.send(Types.MsgEnum.get_game_today_rank, buf).then((msg) => {
      var rankData = Response.down.get_game_today_rank.decode(msg);
      console.log(rankData.toJSON());
      if (callback) {
        callback(rankData);
      }

    }, (error) => {
      if (callback) {
        callback(null);
      }
    });
  }


  GameManager.prototype.getWordRank = function (gameId, page, callback) {
    var msg = Request.up.get_game_word_rank.create({
      _gid: gameId,
      _page_num: page,
    });

    var buf = Request.up.get_game_word_rank.encode(msg).finish();
    this.websocket.send(Types.MsgEnum.get_game_word_rank, buf).then((msg) => {
      var rankData = Response.down.get_game_word_rank.decode(msg);
      console.log(rankData.toJSON());
      if (callback) {
        callback(rankData);
      }

    }, (error) => {
      if (callback) {
        callback(null);
      }
    });
  }

  GameManager.prototype.sendRankData = function (gameId, score, level, callback) {
    var msg = Request.up.update_rank_game_data.create({
      _gid: gameId,
      _score: score,
      _level: level,
    });

    var buf = Request.up.update_rank_game_data.encode(msg).finish();
    this.websocket.send(Types.MsgEnum.update_rank_game_data, buf).then((msg) => {
      var rankData = Response.down.update_rank_game_data.decode(msg);
      console.log(rankData.toJSON());
      if (callback) {
        callback(rankData);
      }

    }, (error) => {
      if (callback) {
        callback(null);
      }
    });

  }

  return GameManager;
}());

export { GameManager }
