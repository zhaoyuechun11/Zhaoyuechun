import Response from './down.js';
import Request from './up.js';
import Types from './types.js';

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {error: error};
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}

var DefaultSocket = (function () {

  function DefaultSocket(host, port, useSSL, verbose) {
    if (useSSL === void 0) {
      useSSL = false;
    }
    if (verbose === void 0) {
      verbose = false;
    }
    this.host = host;
    this.port = port;
    this.useSSL = useSSL;
    this.verbose = verbose;
    this.cIds = {};
    this.callbacks = {};
    this.connectIntervalTimer = 2 * 1000;
    this.connectIntervalObject = null;
    this.onErrorCallback = null;
    this.timeOutObj = null;
    this.timeOutCloseObj = null;
    this.timeOut = 10 * 1000;
    this.isLogin = false;
    this.index = 0;
    this.serverTime = 0;
    this.serverTimeDelay = 0;
    this.isDebug = false;
    this.isLoopConnect = false;
  }

  DefaultSocket.prototype.generatecid = function () {
    return __spread(Array(30)).map(function () {
      return Math.random().toString(36)[3];
    }).join('');
  };


  DefaultSocket.prototype.setDebug = function (debug) {
    this.isDebug = debug;
  }

  DefaultSocket.prototype.connect = function () {

    let _this = this;
    if (_this.IsConnected()) {
      if (_this.isDebug) {
        console.log('Connected Resolve ');
      }
      return new Promise(function (resolve, reject) {
        resolve('connected');
      });
    }

    if ( _this.IsConnecting() == false ) {
      let scheme = (this.useSSL) ? "wss://" : "ws://";
      let url = "" + scheme + this.host + ":" + this.port;

      try {
        _this.socket = new WebSocket(url);
        _this.socket.binaryType = "arraybuffer";
      } catch (e) {
        console.log(e);
      }

      _this.socket.onclose = function (evt) {
        //判断是否是自己关闭过
        if (_this.isDebug) {
          //alert('网络断开....')
          console.log("网络断开....");
        }

        //console.log(_this.callbacks['network_on_close'])
        if (_this.callbacks['network_on_close'] != undefined
          && _this.callbacks['network_on_close'].length > 0) {
          _this.callbacks['network_on_close'][0]();
        }

        //结束心跳
        if (_this.timeOutObj) {
          clearTimeout(_this.timeOutObj);
        }

        if (_this.timeOutCloseObj) {
          clearTimeout(_this.timeOutCloseObj);
        }

        _this.LoopReconnect();
      };

      _this.socket.onerror = function (evt) {
        _this.disconnect();
        if (_this.isDebug)
          console.log('Connect Socket Error Callback  1 ');
        console.log(evt);
      };

      _this.socket.onmessage = function (evt) {

        let buf = evt.data;
        let dv = new DataView(buf);
        let id = dv.getUint8(0);
        let code = dv.getUint16(1);
        let length = dv.getUint16(3);
        let body = buf.slice(5, 5 + length);

        if (_this.isDebug && _this.verbose && window && window.console && code !== Types.MsgEnum.keepalive) {
          console.log("Response: %o Msg: %o", code, evt.data);
        }

        if (code === Types.MsgEnum.keepalive) {
          _this.heartCheck();
          let msg = new Uint8Array(body);
          let keepalive = Response.down.keepalive.decode(msg);
          this.serverTime = Number(keepalive._something);
          this.serverTimeDelay = Date.now() - this.serverTime;
          return;
        }

        // deal with callbacks
        let message = new Uint8Array(body);
        let calls = _this.callbacks[code];
        if (calls) {
          for (let i = 0, len = calls.length; i < len; ++i) {
            if (calls[i])
              calls[i](message);
          }
        }

        //error message
        if (code == Types.MsgEnum.exception) {
          let error = Response.down.exception.decode(message);

          if (_this.isDebug)
          {
            console.log(error);
            console.log('Reject reponse %o', error._msg_id);
          }

          let executor = _this.cIds[error._msg_id];
          if (!executor) {
            if (_this.isDebug && _this.verbose && window && window.console) {
              console.log("No promise executor for message: %o", message);
              //alert('Request Message Id: ' + error._msg_id + ' Error: ' + error._result._err_desc );
            }
            return;
          }

          delete _this.cIds[error._msg_id];
          executor.reject(message);
        } else {
          let executor = _this.cIds[code];
          if (!executor) {
            if (_this.verbose && window && window.console) {
              console.log("No promise executor for message: %o", message);
            }
            return;
          }

          delete _this.cIds[code];
          executor.resolve(message);

          if (_this.isDebug)
            console.log('Resolve reponse %o', code);
        }
      };
    }

    return new Promise(function (resolve, reject) {
      _this.socket.onopen = function (evt) {
        if (_this.isDebug) {
          console.log(evt);
        }
        _this.heartCheck();
        resolve("connected");
      };
      _this.socket.onerror = function (evt) {
        if (_this.isDebug) {
          console.log("Connect Socket Error Callback 2 ");
        }
        if ( resolve )
          reject('error');
      };
    });
  };

  DefaultSocket.prototype.LoopReconnect = function () {
        var _this = this;
        if (_this.connectIntervalObject) {
          clearInterval(_this.connectIntervalObject);
        }
        _this.isLoopConnect = true;
        _this.loopConnectTime = 0;
        _this.connectIntervalObject = setInterval(function () {
        _this.loopConnectTime++;
        if (_this.isDebug) {
            console.log('Begin Connect ' + (_this.loopConnectTime));
            console.log(new Date());
        }
        _this.DoReconnect();
    }, _this.connectIntervalTimer);
  };

  DefaultSocket.prototype.DoReconnect = function () {
    var _this = this;

    if (_this.IsNetworkOnline() == false)
      return;

    if (_this.IsConnecting()) {
      _this.isLoopConnect = false;
      clearInterval(_this.connectIntervalObject);
    } else {
      _this.reconnect();
      if (_this.isDebug) {
        console.log('Do Reconnect Server ');
      }
    }
  };

  DefaultSocket.prototype.heartCheck = function () {
    const _this = this;

    if (_this.timeOutObj != null) {
      clearTimeout(_this.timeOutObj);
    }

    if (_this.timeOutCloseObj != null) {
      clearTimeout(_this.timeOutCloseObj);
    }

    _this.timeOutObj = setTimeout(function () {
      let msg = Request.up.keepalive.create();
      let buf = Request.up.keepalive.encode(msg).finish();
      _this.send(Types.MsgEnum.keepalive, buf, false);
      if (_this.isDebug) {
        console.log('Send Heart Check :  ');
        console.log(new Date());
      }
    }, _this.timeOut * 1);

    _this.timeOutCloseObj = setTimeout(function () {
      if (_this.socket != undefined) {
        _this.disconnect();
      }
      if (_this.isDebug) {
        console.log('Heart Check Time Out : ');
        console.log(new Date());
      }
    }, _this.timeOut * 1.5);
  };

  DefaultSocket.prototype.reconnect = function () {
    let _this = this;
    if (_this.IsNetworkOnline() == false)
      return;

    _this.connect().then(() => {

      if (_this.isDebug) {
        alert('开始登录：' + _this.isLogin + " Time: " + _this.loopConnectTime);
      }

      if (_this.isLogin) {
        if (_this.isDebug)
          alert('服务器链接成功 登录游戏服');

        let token = localStorage.getItem("tokenKey");
        let loginData = {
          _login_type: 4,
          _password: token,
          _bind_data: ''
        };

        let buf = Request.up.login.encode(loginData).finish();
        _this.send(Types.MsgEnum.login, buf).then((msg) => {
            let user = Response.down.login.decode(msg);
            if (user._uid > 0) {
              if (_this.isDebug)
                console.log('reconnect login success ');
            } else {
              if (_this.isDebug)
                console.log('reconnect login fail ');
            }
            if (_this.isDebug)
              alert('登录游戏服成功');

            if (_this.connectIntervalObject) {
              clearInterval(_this.connectIntervalObject);
            }
          },
          (msg) => {
            if (_this.isDebug) {
              console.log("reconnect login server error ");
            }
          })
      }
      if (_this.isDebug) {
        console.log("Reconnect Server Opened");
      }

    }, (msg) => {
      if (_this.isDebug) {
        console.log("Connect Server Error " + msg);
      }
    });
  };

  DefaultSocket.prototype.setLogin = function (islogin) {
    this.isLogin = islogin;
  };

  DefaultSocket.prototype.disconnect = function () {
    if (this.socket !== undefined) {
      this.socket.close();
      if (this.isDebug) {
        console.log('Close Socket By Self');
        //alert('Disconnect self ')
      }
    }
  };

  DefaultSocket.prototype.setErrorCallback = function (callback) {
    this.onErrorCallback = callback;
  };

  DefaultSocket.prototype.addcallback = function (event, callback) {
    if (this.callbacks[event] == undefined) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  };

  DefaultSocket.prototype.removecallback = function (event, callback) {
    if (this.callbacks[event] != undefined) {
      if (this.callbacks[event].length == 1) {
        delete this.callbacks[event];
        return;
      }
      if (this.isDebug)
        console.log(this.callbacks[event]);
      let i = this.callbacks[event].indexOf(callback);
      if (~i) this.callbacks[event].splice(i, 1);
    }
  };

  DefaultSocket.prototype.sendData = function (m, code, async, resolve, reject) {
    const _this = this;
    var data = new ArrayBuffer(5 + m.length);
    var dataView = new DataView(data);
    var id = _this.getIndex();
    dataView.setUint8(0, 0);
    dataView.setUint16(1, code);
    dataView.setUint16(3, m.length);

    for (var i = 0; i < m.length; i++) {
      dataView.setUint8(5 + i, m[i]);
    }

    if (async == false) {
      resolve();
    } else {
      _this.cIds[code] = {resolve: resolve, reject: reject};
      _this.cIds[id] = {resolve: resolve, reject: reject};
    }

    _this.socket.send(data);

    if (_this.isDebug && _this.verbose && window && window.console && code !== Types.MsgEnum.keepalive) {
      console.log("Request: %o Msg: %o", code, m);
    }
  };

  DefaultSocket.prototype.getIndex = function () {
    return 0;
  };

  DefaultSocket.prototype.IsWifiOnline = function () {
    const connectType = navigator.connection.type;
    if (connectType != null) {
      return connectType == 'wifi';
    }
    return false;
  };

  DefaultSocket.prototype.CheckNetworkOnline = function () {

    if (this.IsNetworkOnline()) {
      return true;
    } else {
      if (this.onErrorCallback) {
        this.onErrorCallback('Network unavailable. Play try again');
      }
      return false;
    }
  };

  DefaultSocket.prototype.IsNetworkOnline = function () {
    const connectType = navigator.connection.type;
    console.log(connectType);
    if (connectType != undefined) {
      return (connectType != Connection.NONE);
    }
    return true;
  };

  DefaultSocket.prototype.IsConnecting = function () {
    return (this.socket !== undefined && this.socket.readyState <= 1);
  };

  DefaultSocket.prototype.IsConnected = function () {
    return (this.socket !== undefined && this.socket.readyState == 1);
  };

  DefaultSocket.prototype.send = function (code, message, async = true) {
    let _this = this;
    let _msg = message;

    return new Promise(function (resolve, reject) {
      if (_this.socket !== undefined && _this.socket.readyState === 1) {
        _this.sendData(_msg, code, async, resolve, reject);
      } else {
        if (_this.IsNetworkOnline() && _this.IsLoopConnect == false) {
          // 重新链接
          _this.disconnect();
          if (_this.isDebug)
            console.log('socket is not null, disconnect');
        }


        if (_this.onErrorCallback) {
          if (_this.isDebug)
            console.log('network error callback');

          _this.onErrorCallback('Network unavailable. Play try again');
        }
      }
    });

  };

  return DefaultSocket;
}());

export {DefaultSocket};
