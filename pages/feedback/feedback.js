var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: ''
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
  onShow: function () {

  },

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
  gettitle: function (e) {
    console.log(e.detail.value);
    this.setData({
      title: e.detail.value
    })
  },
  getcontent: function (e) {
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value
    })
  },
  formSubmit: function () {
    if(app.globalData.uid==null){
      wx.showToast({
        title:'请输先登录',
        icon:'none'
      })
    }
    if(this.data.title.length==0){
      wx.showToast({
        title:'请输入反馈标题',
        icon:'none'
      })
    }
    if(this.data.content.length==0){
      wx.showToast({
        title:'请输入反馈内容',
        icon:'none'
      })
    }
    console.log('------');
    var that = this;
    var host = getApp().data.host
    wx.request({
      url: 'http://' + host + '/gtd/controller/feedbackHandler.php',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: {
        uid: app.globalData.uid,
        title: that.data.title,
        content: that.data.content
      },
      method: 'POST',
      success: function (d) {
        console.log(d.data)
        if(d.data){
          wx.showToast({
            title:'反馈成功'
          })
        }
        that.setData({
          title: '',
          content: ''
        })
        that.onShow();
      }
    })
  }
})