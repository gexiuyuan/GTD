//index.js
//获取应用实例
const app = getApp()

Page({
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
    var that = this;
    var host = getApp().data.host
    wx.request({
      url: 'http://' + host + '/gtd/controller/jobHandler.php',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: function (d) {
        var jobs = d.data;
        var js = [];
        for (var i = 0; i < jobs.length; i++) {
          js[i] = jobs[i].name;
        }
        that.setData({
          job: js
        });
      }
    })

    wx.request({
      url: 'http://' + host + '/gtd/controller/sexHandler.php',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: function (d) {
        var sexs = d.data;
        var ss = [];

        for (var i = 0; i < sexs.length; i++) {
          ss[i] = sexs[i].name;
        }
        that.setData({
          sex: ss
        });
      }
    })

    wx.request({
      url: 'http://' + host + '/gtd/controller/getUserHandler.php',
      header: { 'content-type': 'application/json' },
      method: 'GET',
      data: {
        uid: app.globalData.uid
      },
      success: function (d) {
        console.log(d.data);
        that.setData({
          signature: d.data.signature,
          date: d.data.birthdate,
          index: d.data.sex,
          index1: d.data.job,
          email: d.data.email,
          company: d.data.company,
          school: d.data.school
        })
      }
    })
  },
  data: {
    motto: 'Hello World',
    signature: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    date: app.formatDate(new Date(), 'yyyy-MM-dd'),
    job: [''],
    sex: [''],
    index: 0,
    index1: 0,
    email: '',
    company: '',
    school: ''
  },
  formSubmit: function () {
    //"application/x-www-form-urlencoded"
    //'content-type':'application/json'
    if (app.globalData.uid == null) {
      wx.showToast({
        title: '请先微信登陆'
      })
      return
    }
    var that = this;
    var host = getApp().data.host
    wx.request({
      url: 'http://' + host + '/gtd/controller/userHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        uid: app.globalData.uid,
        'nickName': this.data.userInfo.nickName == undefined ? '' : this.data.userInfo.nickName,
        'signature': this.data.signature == undefined ? '' : this.data.signature,
        'date': this.data.date == undefined ? '' : this.data.date,
        'sex': this.data.index == undefined ? '' : this.data.index,
        'job': this.data.index1 == undefined ? '' : this.data.index1,
        'company': this.data.company == undefined ? '' : this.data.company,
        'school': this.data.school == undefined ? '' : this.data.school,
        'email': this.data.email == undefined ? '' : this.data.email
      },
      method: 'POST',
      success: function (d) {
        console.log(d.data.flag);
        if (d.data.flag) {
          wx.showToast({
            title: '添加用户成功'
          })
        } else {
          wx.showToast({
            title: '添加用户失败'
          })
        }
        that.setData({
          'signature': '',
          'nickName': '',
          'date': getApp().formatDate(new Date(), 'yyyy-MM-dd'),
          'index': 0,
          'index1': 0,
          'company': '',
          'school': '',
          'email': ''
        });
        that.onLoad();
        that.onShow();
      },
      fail: function () {
        wx.showToast({
          title: '添加用户失败'
        })
      }
    })
  },
  //职业处理
  bindChangejob: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  //性别处理
  bindChange: function (e) {
    if (e.detail.value.length != 0) {
      this.setData({
        index: e.detail.value
      })
    }
  },
  //学校处理
  getSchool: function (e) {
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '请填写学校',

      })
    }
    this.setData({
      school: e.detail.value
    })
  },
  //日期处理
  bindDateChange: function (e) {
    if (e.detail.value.length != 0) {
      this.setData({
        date: e.detail.value
      })

    }
  },
  getCompany: function (e) {
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '请填写公司',

      })
    }
    this.setData({
      company: e.detail.value
    })

  },
  getSignature: function (e) {
    this.setData({
      signature: e.detail.value
    })
  },
  //邮箱填写规范
  set_mail: function (e) {
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '请填写邮箱',

      })
    }
    let email = e.detail.value
    let checkedNum = this.checkEmail(email)
    this.setData({
      'email': email
    });
  },
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
      wx.showToast({
        title: '邮箱格式不正确',

      })
      return false
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
