//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    code: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    uid: app.globalData.uid
  },
  //导入课程表
  class: function (e) {
    wx.navigateTo({
      url: '../class/class',

      success: function (e) {
        console.log("success");
        console.log(e)
      },
      fail: function (e) {
        console.log("fail");
        console.log(e)
      },
      complete: function (e) {
        console.log("complete");
        console.log(e)
      }
    })
  },
  //反馈
  feedback: function (e) {
    wx.navigateTo({
      url: '../feedback/feedback',

      success: function (e) {
        console.log("success");
        console.log(e)
      },
      fail: function (e) {
        console.log("fail");
        console.log(e)
      },
      complete: function (e) {
        console.log("complete");
        console.log(e)
      }
    }
    )
  },
  //帮助
  help: function (e) {
    wx.navigateTo({
      url: '../help/help',

      success: function (e) {
        console.log("success");
        console.log(e)
      },
      fail: function (e) {
        console.log("fail");
        console.log(e)
      },
      complete: function (e) {
        console.log("complete");
        console.log(e)
      }
    }
    )
  },
  //设置跳转页面
  set_content: function () {
    wx.navigateTo({
      url: '../set_content/set_content',

      success: function (e) {
        console.log("success");
        console.log(e)
      },
      fail: function (e) {
        console.log("fail");
        console.log(e)
      },
      complete: function (e) {
        console.log("complete");
        console.log(e)
      }
    }
    )
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  get_set: function (e) {
    wx.navigateTo({
      url: '../get_set/get_set',

      success: function (e) {
        console.log("success");
        console.log(e)
      },
      fail: function (e) {
        console.log("fail");
        console.log(e)
      },
      complete: function (e) {
        console.log("complete");
        console.log(e)
      }
    }
    )
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (app.globalData.uid == null) {
      app.globalData.userInfo = {}
      this.setData({
        userInfo: {},
        hasUserInfo: false
      });
      wx.showToast({
        title: '请先微信登陆',

      })
    }

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var that = this
    wx.login({
      success: function (res) {
        console.log(res.errMsg);
        if (res.code) {
          console.log("我是登录凭证:" + res.code);

          wx.request({
            url: 'http://' + app.data.host + '/gtd/controller/getopenid.php',  //后台获取openid的链接，该链接域名需要添加到小程序request 合法域名
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            data: {
              code: res.code,
              appid: app.globalData.appid,
              appsecret: app.globalData.secret
            },
            success: function (res) {
              app.globalData.openid = res.data.openid;
              that.data.openid = res.data.openid;
              console.log("openid:" + res.data.openid);
              //请求后台服务器添加数据
              wx.request({
                url: 'http://' + app.data.host + '/gtd/controller/addUserOpenId.php',  //后台获取openid的链接，该链接域名需要添加到小程序request 合法域名
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                method: "POST",
                data: {
                  openId: app.globalData.openid
                },
                success: function (d) {
                  console.log(d);
                  app.globalData.uid = d.data.uid;
                  if (d.data.flag) {
                    wx.showToast({
                      title: '微信登陆成功'
                    })
                  }
                }
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log('获取用户登录态失败！' + res.errMsg)
      },
      complete: function () {
        console.log('complete');
      }
    })

  },logout:function(){
    app.globalData.userInfo = {}
    app.globalData.uid = null;

    this.setData({
      userInfo: {},
      hasUserInfo: false
    });
    this.onLoad();
    this.onShow();
  }
})
