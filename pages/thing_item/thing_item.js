var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: false,
    tid: '',
    dateIm: true,
    thingTime1: '',
    thingTime2: '',
    count: 0,
    thingName: '',
    thingDate: app.formatDate(new Date(), 'yyyy-MM-dd'),
    thingFlag: '0',
    thingType: '0',
    thingRemark: '',
    thingItemId1: '',
    thingItemId2: '',
    thingItemId3: '',
    thingItem1: '',
    thingItem2: '',
    thingItem3: '',
    thingImportance: -1,
  },
  //addtap：子任务
  addtap: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  changeDate: function (e) {
    this.setData({
      dateIm: !this.data.dateIm
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
    var that = this;
    var host = getApp().data.host
    wx.request({
      url: 'http://' + host + '/gtd/controller/thingItemHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        thingId: options.tid
      },
      method: 'POST',
      success: function (d) {
        console.log(d.data);
        if (d.data) {
          that.setData({
            tid: options.tid,
            dateIm: d.data.thing.thingType == 0,
            thingName: d.data.thing.thingName,
            thingDate: d.data.thing.thingDate.substring(0, 10),
            thingFlag: d.data.thing.thingFlag,
            thingType: d.data.thing.thingType,
            thingRemark: d.data.thing.thingRemark,
            thingTime1: d.data.thing.thingDate.substring(10, d.data.thing.thingDate.length),
            thingTime2: d.data.thing.thingDateEnd.substring(10, d.data.thing.thingDateEnd.length),
            thingImportance: d.data.thing.thingImportance
          });
          if (d.data.thingItemContent[0] != null || d.data.thingItemContent[0] != undefined) {
            that.setData({
              thingItem1: d.data.thingItemContent[0].thingItemContent,
              itemId1: d.data.thingItemContent[0].thingItemId
            })
          }
          if (d.data.thingItemContent[1] != null || d.data.thingItemContent[1] != undefined) {
            that.setData({
              thingItem2: d.data.thingItemContent[1].thingItemContent,
              itemId2: d.data.thingItemContent[1].thingItemId
            })
          }
          if (d.data.thingItemContent[2] != null || d.data.thingItemContent[2] != undefined) {
            that.setData({
              thingItem3: d.data.thingItemContent[2].thingItemContent,
              itemId3: d.data.thingItemContent[2].thingItemId
            })
          }
          that.onShow();
        } else {
          wx.showToast({
            title: '服务器忙'
          })
        }
      }
    })
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

    if(this.data.tid == ''){
      wx.showToast({
        title: '事件已经被删除\n无法再次保存',
        icon:'none'
      })
      return 
    }

    var time1 = this.data.thingTime1.split(':');
    var time2 = this.data.thingTime2.split(':');
    if(parseInt(time1[0]+time1[1]) <= parseInt(time2[0]+time2[1])){
      console.log(time1);
      console.log(time2);
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
      url: 'http://' + host + '/gtd/controller/thingUpdateHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        tid: this.data.tid,
        thingName: this.data.thingName,
        thingDate: this.data.thingDate,
        thingFlag: this.data.thingFlag,
        thingType: this.data.thingType,
        thingRemark: this.data.thingRemark,
        thingTime1: this.data.thingTime1,
        thingTime2: this.data.thingTime2,
        thingItem1: this.data.thingItem1,
        thingItemId1: this.data.itemId1,
        thingItem2: this.data.thingItem2,
        thingItemId2: this.data.itemId2,
        thingItem3: this.data.thingItem3,
        thingItemId3: this.data.itemId3,
        thingImportance: this.data.thingImportance
      },
      method: 'POST',
      success: function (d) {
        console.log(d.data);
        if (d.data.flag) {
          wx.showToast({
            title: '保存任务成功'
          })
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
    this.setData({
      thingItem1: e.detail.value
    });
  },
  getThingItem2: function (e) {
    this.setData({
      thingItem2: e.detail.value
    });
  },
  getThingItem3: function (e) {
    this.setData({
      thingItem3: e.detail.value
    });
  },
  getThingImport: function (e) {
    this.setData({
      thingImportance: e.detail.value
    });
  },
  bindTimeChange1: function (e) {
    this.setData({
      thingTime1: e.detail.value
    });
  },
  bindTimeChange2: function (e) {
    this.setData({
      thingTime2: e.detail.value
    });
  },
  delThing: function () {
    var that = this;
    var host = getApp().data.host
    wx.request({
      url: 'http://' + host + '/gtd/controller/thingDelHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        tid: that.data.tid,
      },
      method: 'POST',
      success: function (d) {
        console.log(d.data);
        if (d.data.flag) {
          wx.showToast({
            title: '删除任务成功'
          })
          that.setFirst();
          that.onShow();
        } else {
          wx.showToast({
            title: '删除任务失败'
          })
        }
      }
    })
  },
  setFirst: function () {
    this.setData({
      hiddenName: false,
      tid: '',
      dateIm: true,
      thingTime1: app.formatDate(new Date(), 'HH:mm'),
      thingTime2: app.formatDate(new Date(), 'HH:mm'),
      count: 0,
      thingName: '',
      thingDate: app.formatDate(new Date(), 'yyyy-MM-dd'),
      thingFlag: '0',
      thingType: '0',
      thingRemark: '',
      thingItemId1: '',
      thingItemId2: '',
      thingItemId3: '',
      thingItem1: '',
      thingItem2: '',
      thingItem3: '',
      thingImportance: -1,
    })
  }
})