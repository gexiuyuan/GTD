var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: true,
    dateIm: true,
    thingTime1: app.formatDate(new Date(), 'HH:mm'),
    thingTime2: app.formatDate(new Date(), 'HH:mm'),
    thingName: '',
    thingDate: app.formatDate(new Date(), 'yyyy-MM-dd'),
    thingFlag: '0',
    thingType: '0',
    thingRemark: '',
    thingItem1: '',
    thingItem2: '',
    thingItem3: '',
    thingImportance: -1
  },
  //addtap：子任务
  addtap: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  bind1: function (e) {
    wx.navigateTo({
      url: '../add_success/add_success',
      success: function (e) {
        console.log("success");
        console.log(e);
      },
      fail: function (e) {
        console.log("fail");
        console.log(e);
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
  onShow: function () {

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

    if (this.data.thingType == 1) {
      if (this.data.thingImportance == -1) {
        wx.showToast({
          title: '日程重要度\n没有选择',
          icon: 'none'
        });
        return;
      }
    }

    if (app.trimLeft(this.data.thingName).length == 0) {
      wx.showToast({
        title: '请先输入事件名'
      })
      return
    }

    var time1 = this.data.thingTime1.split(':');
    var time2 = this.data.thingTime2.split(':');
    if(parseInt(time1[0]+time1[1]) <= parseInt(time2[0]+time2[1])){
    }else{
      wx.showToast({
        title:'事件的开始时间必须\n小于事件的结束时间',
        icon:'none'
      });
      return ;
    }
    var that = this;
    var host = getApp().data.host
    wx.request({
      url: 'http://' + host + '/gtd/controller/thingHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        uid: app.globalData.uid,
        thingName: this.data.thingName,
        thingDate: this.data.thingDate,
        thingFlag: this.data.thingFlag,
        thingType: this.data.thingType,
        thingRemark: this.data.thingRemark,
        thingTime1: this.data.thingTime1,
        thingTime2: this.data.thingTime2,
        thingItem1: this.data.thingItem1,
        thingItem2: this.data.thingItem2,
        thingItem3: this.data.thingItem3,
        thingImportance: this.data.thingImportance
      },
      method: 'POST',
      success: function (d) {
        console.log(d.data);
        if (d.data.flag) {
          wx.showToast({
            title: '添加任务成功'
          })
          that.setData({
            hiddenName: true,
            dateIm: true,
            thingTime1: app.formatDate(new Date(), 'HH:mm'),
            thingTime2: app.formatDate(new Date(), 'HH:mm'),
            thingName: '',
            thingDate: app.formatDate(new Date(), 'yyyy-MM-dd'),
            thingFlag: '0',
            thingType: '0',
            thingRemark: '',
            thingItem1: '',
            thingItem2: '',
            thingItem3: '',
            thingImportance: -1
          });
          that.onLoad();
          that.onShow();
        } else {
          wx.showToast({
            title: '添加任务失败'
          })
        }
      }
    })
  },
  getThingName: function (e) {
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '请填写事件名',

      })
    }
    this.setData({
      thingName: e.detail.value
    });
  },
  getThingDate: function (e) {
    this.setData({
      thingDate: e.detail.value
    });
  },
  getThingFlag: function (e) {
    this.setData({
      thingFlag: e.detail.value
    });
  },
  getThingType: function (e) {
    this.setData({
      thingType: e.target.dataset.index
    });
    console.log(e.target.dataset.index);
    if (e.target.dataset.index == 1) {
      this.setData({
        dateIm: false
      });
      wx.showToast({
        title: '选择日程开始时间\n及其重要度',
        icon: 'none'
      })
    } else {
      this.setData({
        dateIm: true
      });
    }
  },
  getThingRemark: function (e) {
    this.setData({
      thingRemark: e.detail.value
    });
  },
  getThingItem1: function (e) {
    this.data.thingItem1 = e.detail.value;
  },
  getThingItem2: function (e) {
    this.data.thingItem2 = e.detail.value;
  },
  getThingItem3: function (e) {
    this.data.thingItem3 = e.detail.value;
  },
  getThingImport: function (e) {
    this.setData({
      thingImportance: e.detail.value
    });
  },
  bindTimeChange1: function (e) {
    console.log(e.detail.value);
    this.setData({
      thingTime1: e.detail.value
    });
  },
  bindTimeChange2: function (e) {
    this.setData({
      thingTime2: e.detail.value
    });
  }
})