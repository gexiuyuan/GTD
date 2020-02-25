const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: app.globalData.uid,
    mouth: app.formatDate(new Date(), 'MM'),
    year: app.formatDate(new Date(), 'yyyy'),
    currentDate: parseInt(app.formatDate(new Date(), 'dd')),
    userDateThing: [],
    userTodoThing: [],
    day: "",
    day1: "",
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
    userInfo: {},
    hasUserInfo: false,
    backCurrent: 0,
    click: false,
    modalhidden: true,
    isgetmessage: true,
    messages: []
  },

  search: function (e) {
    wx.navigateTo({
      url: '../search/search',

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if (app.globalData.uid == null) {
      wx.showToast({
        title: '请先微信登陆',
      })
    } else {
      this.getAllThings(this.data.year + '-' + this.data.mouth + '-' + this.data.currentDate);
    }

    if (app.globalData.backDate != 0) {
      var backDate = app.globalData.backDate
      console.log(backDate)
      this.setData({
        year: app.formatDate(backDate, 'yyyy'),
        mouth: app.formatDate(backDate, 'MM'),
        currentDate: parseInt(app.formatDate(backDate, 'dd')),
      })
      this.getAllThings(this.data.year + '-' + this.data.mouth + '-' + this.data.currentDate);
    }
    var time = this.weekDays();
    this.setData({
      Sun: time[6],
      Mon: time[0],
      Tue: time[1],
      Wed: time[2],
      Thu: time[3],
      Fri: time[4],
      Sat: time[5],
    });
    if (app.globalData.uid != null) {
      this.getMessage();
    }
  },
  getMessage: function () {
    var host = app.data.host;
    var that = this
    if (this.data.isgetmessage) {
      wx.request({
        url: 'http://' + host + '/gtd/controller/messageHandler.php',
        header: { 'content-type': "application/x-www-form-urlencoded" },
        data: {
          currentDate: app.formatDate(new Date(), 'yyyy-MM-dd'),
          uid: app.globalData.uid,
        },
        method: 'POST',
        success: function (d) {
          that.setData({
            modalhidden: false,
            isgetmessage: false,
            messages_todo: d.data.todo,
            messages_date: d.data.date,
            messages_ibinhaosi: d.data.ibinhaosi
          }) 
          console.log(d.data);
        },
        fail: function () {
          wx.showToast({
            title: '服务器忙\n获取用户日程列表失败',
            icon: 'none'
          })
        }
      })
    }

  },
  getAllThings: function (now) {
    var that = this;
    var host = getApp().data.host
    console.log(now);
    wx.request({
      url: 'http://' + host + '/gtd/controller/indexHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        currentDate: now,
        uid: app.globalData.uid,
      },
      method: 'POST',
      success: function (d) {
        var res = d.data;
        var todoArray = [];
        var dateArray = [];
        var tindex = 0;
        var dindex = 0;

        if (d.data.length > 0) {

          for (var i = 0; i < res.length; i++) {
            if (res[i].type == 0) {
              todoArray[tindex++] = res[i];
            } else {
              dateArray[dindex++] = res[i];
            }
          }


          var displayArray = dateArray;
          dateArray = new Array(24).fill(0);
          var index = new Array(60).fill(0);
          for (var i = 0; i < 24; i++) {
            dateArray[i] = new Array(60).fill(0);
          }
          for (var i = 0; i < displayArray.length; i++) {
            var k = parseInt(displayArray[i].tdate.substring(11, 13));
            dateArray[k][index[k]++] = displayArray[i];

          }
          console.log(dateArray);
        }
        that.setData({
          userDateThing: dateArray,
          userTodoThing: todoArray
        });
      },
      fail: function () {
        console.log('fail');
      }
    })

  }
  ,
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  weekDays: function () {
    var weekArray = new Array();
    //获取到的星期几
    var date = new Date(this.data.year + '/' + this.data.mouth + '/' + this.data.currentDate);
    var week = date.getDay()

    //得到上一个月的最后一天
    date.setMonth(date.getMonth());
    date.setDate(0);
    var last1 = app.formatDate(date, 'dd');

    //得到当前月的最后一天
    date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    var last2 = app.formatDate(date, 'dd');

    var weekArray = new Array();
    var before = last1;

    var after = 1;

    //当前日期下标
    var today1 = this.data.currentDate
    var today = this.data.currentDate
    console.log(today)
    if (week == 0) {
      week = 7
    } else {
      week
    }
    for (var i = week; i > 0; i--) {
      weekArray[i - 1] = today--;
      if (weekArray[i - 1] <= 0) {
        weekArray[i - 1] = before--
      }
    }
    for (var i = week; i <= 7; i++) {
      weekArray[i - 1] = today1++
      if (weekArray[i - 1] > last2) {
        weekArray[i - 1] = after++
      }
    }
    return weekArray;
  },
  getDateThing: function (e) {
    console.log(e);
  },
  getTodoThing: function (e) {

  },
  getSomeDate1: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Mon;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });

  },
  getSomeDate2: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Tue;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });
  },
  getSomeDate3: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Wed;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });
  },
  getSomeDate4: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Thu;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });
  },
  getSomeDate5: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Fri;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });
  },
  getSomeDate6: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Sat;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });
  },
  getSomeDate7: function (e) {
    var y = this.data.year;
    var m = this.data.mouth;
    var d = this.data.Sun;
    if (d < 10) { d = '0' + d; }
    this.getAllThings(y + '-' + m + '-' + d);
    this.setData({
      currentDate: parseInt(d)
    });
  },
  getMouthView: function () {
    wx.navigateTo({
      url: '../mouth_view/mouth_view',

      success: function (e) {

      },
      fail: function (e) {

      },
      complete: function (e) {

      }
    }
    )
  },
  getDown: function (e) {
    var tid = e.target.dataset.index;
    var host = app.data.host;
    var that = this
    wx.request({
      url: 'http://' + host + '/gtd/controller/todoDoneHandler.php',
      header: { 'content-type': 'application/json' },
      data: {
        tid: tid
      },
      method: 'GET',
      success: function (d) {
        that.onShow()
      }
    })
  },
  sure: function () {
    console.log('sure');
    this.setData({
      modalhidden: true
    })
    this.onShow();
  },
  toItem: function (d) {
    console.log(d.target.dataset.index + '=============')
    wx.navigateTo({
      url: '../thing_item/thing_item?tid=' + d.target.dataset.index,

      success: function (e) {

      },
      fail: function (e) {

      },
      complete: function (e) {

      }
    }
    )
  }
})