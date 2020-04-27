//176.9.127.88 外网
//172.31.2.107 虚拟机
//120.132.18.158
//46.4.66.144 外网2
//game1.bongogames.info
//国内阿里云测试环境：
//inland.bongogames.info:1099/
//德国测试环境：
//res.bongogames.info:1099/
//德国正式环境：
//gate.bongogames.info:1099
export default {
  deviceName: "browser", // "browser, android, ios"
  connectIp: "res.bongogames.info",
  connectPort: "1099",
  debug:false,
  downLoadUrl: "http://res.bongogames.info:8585/bongo-test/",
  proxyHeadPortraitFrame: "https://cors-anywhere.herokuapp.com/",
  loginType: "default",
  androidDev: true,
  achievementUrl:"config/achievement.json",
}
