
var timeLabel=['6 months ago','3 months ago','1 month ago','7 days ago','3 days ago','1 day ago'
,'12 hours ago','5 hours ago','1 hour ago','20 mins ago','5 mins ago','3 mins ago','1 min ago','now'
]
export { timeLabel }

/**
 * 绑定事件
 * @param {String} headPortraitFrameArray 头像集合
 * @param {String} userInfo 用户信息
 */
const  getHeadPortraitFrameImage = function (headPortraitFrameArray,userInfo,callBack) {
    console.log("utils getHeadPortraitFrameImage")
    if(null==userInfo){
      callBack(null)
    }
    if ((null != headPortraitFrameArray) && (headPortraitFrameArray.length > 0)) {
      for (let headPortraitFrame of headPortraitFrameArray) {
        if (headPortraitFrame.id == userInfo.headPortraitFrame) {
          callBack(headPortraitFrame);
          return;
        }
      }
      callBack(null)
      return null
    } else {
      callBack(null)
      return null
    }
  };
export { getHeadPortraitFrameImage }

/**
 * 根据id获取当前用户的头像圈图片路径
 * @param headPortraitFrameArray
 * @param userInfo
 * @returns {*}
 */
const getHeadPortraitById=function (headPortraitFrameArray,userInfo) {
  if(userInfo==null){
    return null
  }
  if ((null != headPortraitFrameArray) && (headPortraitFrameArray.length > 0)) {
    for (let headPortraitFrame of headPortraitFrameArray) {
      if (headPortraitFrame.id == userInfo.headPortraitFrame) {
        return headPortraitFrame.image;
      }
    }
    return null
  }
  return null
};
export {getHeadPortraitById}

/**
 * 跳转到聊天页面
 * @param self
 * @param userName
 * @param userId
 * @param userHead
 * @param headPortraitFrame
 */
const toChatPage=function (self,userName,userId,userHead,headPortraitFrame) {
  self.$f7router.navigate({name: 'ChatPage'}, {
    props: {
      toUser : {
        userName: userName,
        userId: userId,
        userHead: userHead,
        headPortraitFrame:headPortraitFrame
      }
    }
  })
};
export { toChatPage }

/**
 *
 * @param self
 * @param userId
 * @param type 1,非好友;0，好友
 */
const toPersonInfoPage=function (self,userId,type) {
  self.$f7router.navigate({
    name: 'PersonalInfo',
    params: {uid:userId,type:type },
  })
}
export { toPersonInfoPage }

/**
 * 获取到年份
 * @param currentDate
 * @returns {*}
 */
const getYear=function (currentDate) {
 if(currentDate==null){
   return null
 }
 var dateArray=currentDate.split("-")
 return dateArray[0]
};
export { getYear }

/**
 * 获取到月份
 * @param currentDate
 * @returns {*}
 */
const getMon=function (currentDate) {
  if(currentDate==null){
    return null
  }
  var dateArray=currentDate.split("-")
  return dateArray[1]
};
export { getMon }

/**
 * 获取到月份
 * @param currentDate
 * @returns {*}
 */
const getDay=function (currentDate) {
  if(currentDate==null){
    return null
  }
  var dateArray=currentDate.split("-")
  return dateArray[2]
};
export { getDay }

const getSystemNowDate=function () {
  let date=new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour=date.getHours();
  let min=date.getMinutes();
  return [year,month,day,hour,min]
}
export { getSystemNowDate }

/**
 *
 * @param currentTime YYYY-MM-DD-HH-mm
 * @returns {*[]}
 */
const getTimeLabel=function (currentTime) {
  if(currentTime==null||currentTime.length==0){
    return timeLabel[0]
  }
  var label="7days ago"
  var timeArray=currentTime.split('-')
  var systemTimeArray=getSystemNowDate()
  if(systemTimeArray[0]-parseInt(timeArray[0])>0){
    return timeArray[0]+'-'+timeArray[1]+'-'+timeArray[2]
  }else{
    if(systemTimeArray[1]-parseInt(timeArray[1])>=6){
      return timeLabel[0]
    }else{
      if(systemTimeArray[1]-parseInt(timeArray[1])>=3){
        return timeLabel[1]
      }else if(systemTimeArray[1]-parseInt(timeArray[1])>=1){
        return timeLabel[2]
      }else{
        if(systemTimeArray[2]-parseInt(timeArray[2])>=7){
          return timeLabel[3]
        }else if(systemTimeArray[2]-parseInt(timeArray[2])>=3){
          return timeLabel[4]
        }else if(systemTimeArray[2]-parseInt(timeArray[2])>=1){
          return timeLabel[5]
        }else{
          if(systemTimeArray[3]-parseInt(timeArray[3])>=12){
            return timeLabel[6]
          }else if(systemTimeArray[3]-parseInt(timeArray[3])>=5){
            return timeLabel[7]
          }else if(systemTimeArray[3]-parseInt(timeArray[3])>=1){
            return timeLabel[8]
          }else{
            if(systemTimeArray[4]-parseInt(timeArray[4])>=20){
              return timeLabel[9]
            }else if(systemTimeArray[4]-parseInt(timeArray[4])>=5){
              return timeLabel[10]
            }else if(systemTimeArray[4]-parseInt(timeArray[4])>=3){
              return timeLabel[11]
            }else if(systemTimeArray[4]-parseInt(timeArray[4])>=1){
              return timeLabel[12]
            }else{
              return timeLabel[13]
            }
          }
        }
      }
    }
  }
}
export { getTimeLabel }

const getNowTimeLab=function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour=date.getHours();
  var minute=date.getMinutes();
  var currentDate=year+"-"+month+"-"+day+"-"+hour+"-"+minute;
  return currentDate;
}
export { getNowTimeLab }

const getTimeFromTimestamp=function (timestamp) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour=date.getHours();
  var minute=date.getMinutes();
  var currentDate=year+"-"+month+"-"+day+"-"+hour+"-"+minute;
  return currentDate;
}
export { getTimeFromTimestamp }

//压缩
const lzwCompress=function (str) {
  var b = new Binary(),
    code_index = -1,
    char_len = 8;
  var str = str.replace(/[\u0100-\uFFFF]/g,
    function(s) {
      return "\&\#u" + pad(s.charCodeAt(0).toString(16), 4) + ";";
    });
  var dic = {},
    cp = [],
    cpi,
    bl = 8;
  b.setBitLength(bl);
  for (var i = 0; i < (1 << char_len) + 2; i++) dic[i] = ++code_index;
  cp[0] = str.charCodeAt(0);
  for (var i = 1; i < str.length; i++) {
    cp[1] = str.charCodeAt(i);
    cpi = (cp[0] << 16) | cp[1];
    if (dic[cpi] == undefined) {
      dic[cpi] = (++code_index);
      if (cp[0] > m(bl)) {
        b.write(0x80);
        b.setBitLength(++bl);
      }
      b.write(cp[0]);
      cp[0] = cp[1];
    } else {
      cp[0] = dic[cpi];
    }
  }
  b.write(cp[0]);
  function pad(s, len) {
    return (new Array(len + 1)).join("0").substring(s.length) + s;
  }
  function m(len) {
    return (1 << len) - 1;
  }
  return b.toCString();

}
export { lzwCompress }

// 解压
const lzwDecompress=function(s) {
  var b = new
  function() {
    var d = [],
      p = 0,
      l = 0,
      L = 13,
      k = m(L),
      _m = 0xFFFFFFFF;
    this.r = function() {
      var r;
      if (32 - (p % 32) < L) r = (((d[p >> 5] & m(32 - (p % 32))) << ((p + L) % 32)) | (d[(p >> 5) + 1] >>> (32 - ((p + L) % 32)))) & k;
      else r = (d[p >> 5] >>> (32 - (p + L) % 32)) & k;
      p += L;
      return r;
    };
    this.w = function(i) {
      i &= k;
      if (32 - (l % 32) < L) {
        d[l >> 5] |= i >>> (L - (32 - (l % 32)));
        d[(l >> 5) + 1] |= (i << (32 - ((l + L) % 32))) & _m;
      } else d[l >> 5] |= (i << (32 - ((l + L) % 32))) & _m;
      l += L;
    };
    this.e = function() {
      return p >= l;
    };
    this.l = function(len) {
      L = Math.max(len | 0, 1);
      k = m(L);
    };
    function m(len) {
      return (1 << len) - 1;
    }
    function pad(s, l) {
      return (new Array(l + 1)).join("0").substring(s.length) + s;
    }
    for (var i = 2; i < s.length; i++) this.w(s.charCodeAt(i) - 0x4e00);
    l = ((s.charCodeAt(0) - 0x4e00) << 13) | ((s.charCodeAt(1) - 0x4e00) & m(13));
    p = 0;
  };
  var R = [],
    C = -1,
    D = {},
    P = [],
    L = 8;
  for (var i = 0; i < (1 << L) + 2; i++) D[i] = String.fromCharCode(++C);
  b.l(L);
  P[0] = b.r();
  while (!b.e()) {
    P[1] = b.r();
    if (P[1] == 0x80) {
      b.l(++L);
      P[1] = b.r();
    }
    if (D[P[1]] == undefined) D[++C] = D[P[0]] + D[P[0]].charAt(0);
    else D[++C] = D[P[0]] + D[P[1]].charAt(0);
    R.push(D[P[0]]);
    P[0] = P[1];
  }
  R.push(D[P[0]]);
  return R.join("").replace(/\&\#u[0-9a-fA-F]{4};/g,
    function(w) {
      return String.fromCharCode(parseInt(w.substring(3, 7), 16));
    });
}
export { lzwDecompress }

const Binary=function (initData, p, l, bl) {
  var data = initData && initData.constructor == Array ? initData.slice() : [],
    p = p | 0,
    l = l | 0,
    bl = Math.max((bl || 8) | 0, 1),
    mask = m(bl),
    _m = 0xFFFFFFFF; //数据，指针，长度，位长度，遮罩
  this.data = function(index, value) {
    if (!isNaN(value)) data[index] = (value | 0) || 0;
    if (!isNaN(index)) return data[index];
    else return data.slice();
  }

  this.read = function() {
    var re;
    if (p >= l) return 0;
    if (32 - (p % 32) < bl) {
      re = (((data[p >> 5] & m(32 - (p % 32))) << ((p + bl) % 32)) | (data[(p >> 5) + 1] >>> (32 - ((p + bl) % 32)))) & mask;
    } else {
      re = (data[p >> 5] >>> (32 - (p + bl) % 32)) & mask;
    }
    p += bl;
    return re;
  }

  this.write = function(i) {
    var i, hi, li;
    i &= mask;
    if (32 - (l % 32) < bl) {
      data[l >> 5] |= i >>> (bl - (32 - (l % 32)));
      data[(l >> 5) + 1] |= (i << (32 - ((l + bl) % 32))) & _m;
    } else {
      data[l >> 5] |= (i << (32 - ((l + bl) % 32))) & _m;
    }
    l += bl;
  }

  this.eof = function() {
    return p >= l;
  }

  this.reset = function() {
    p = 0;
    mask = m(bl);
  }
  this.resetAll = function() {
    data = [];
    p = 0;
    l = 0;
    bl = 8;
    mask = m(bl);
    _m = 0xFFFFFFFF;
  }

  this.setBitLength = function(len) {
    bl = Math.max(len | 0, 1);
    mask = m(bl);
  }

  this.toHexString = function() {
    var re = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i] < 0) {
        re.push(pad((data[i] >>> 16).toString(16), 4) + pad((data[i] & 0xFFFF).toString(16), 4));
      } else {
        re.push(pad(data[i].toString(16), 8));
      }
    }
    return re.join("");
  }

  this.toBinaryString = function() {
    var re = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i] < 0) {
        re.push(pad((data[i] >>> 1).toString(2), 31) + (data[i] & 1));
      } else {
        re.push(pad(data[i].toString(2), 32));
      }
    }
    return re.join("").substring(0, l);
  }

  this.toCString = function() {
    var _p = p,
      _bl = bl,
      re = [];
    this.setBitLength(13);
    this.reset();
    while (p < l) re.push(C(this.read()));
    this.setBitLength(_bl);
    p = _p;
    return C(l >>> 13) + C(l & m(13)) + re.join("");
  }

  this.fromCString = function(str) {
    this.resetAll();
    this.setBitLength(13);
    for (var i = 2; i < str.length; i++) this.write(D(str, i));
    l = (D(str, 0) << 13) | (D(str, 1) & m(13));
    return this;
  }

  this.clone = function() {
    return new Binary(data, p, l, bl);
  }
  function m(len) {
    return (1 << len) - 1;
  }
  function pad(s, len) {
    return (new Array(len + 1)).join("0").substring(s.length) + s;
  }
  function C(i) {
    return String.fromCharCode(i + 0x4e00);
  }
  function D(s, i) {
    return s.charCodeAt(i) - 0x4e00;
  }
}

const  getViewPortSize=function () {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}
export { getViewPortSize }


