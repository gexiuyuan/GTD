//app.js
const app = getApp()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    uid:null,
    openid:null, 
    backDate:0,
    appid:'wxc2ed48f75449db71',
    secret:'e792a57ed1150a069e81c25432f3cc59'
  }
  ,
  data:{
    host:'47.104.87.209:80',
  }
  ,
  formatDate :function (date, format) {
    if (!date) return;
    if (!format)
      format = "yyyy-MM-dd";
    switch (typeof date) {
    case "string":
      date = new Date(date.replace(/-/, "/"));
      break;
    case "number":
      date = new Date(date);
      break;
    }
    if (!date instanceof Date) return;
    var dict = {
      "yyyy" : date.getFullYear(),
      "M" : date.getMonth() + 1,
      "d" : date.getDate(),
      "H" : date.getHours(),
      "m" : date.getMinutes(),
      "s" : date.getSeconds(),
      "MM" : ("" + (date.getMonth() + 101)).substr(1),
      "dd" : ("" + (date.getDate() + 100)).substr(1),
      "HH" : ("" + (date.getHours() + 100)).substr(1),
      "mm" : ("" + (date.getMinutes() + 100)).substr(1),
      "ss" : ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
      return dict[arguments[0]];
    });
  },
  trimLeft : function (s){  
    if(s == null) {  
        return "";  
    }  
    var whitespace = new String(" \t\n\r");  
    var str = new String(s);  
    if (whitespace.indexOf(str.charAt(0)) != -1) {  
        var j=0, i = str.length;  
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1){  
            j++;  
        }  
        str = str.substring(j, i);  
    }  
    return str;  
  }  
})