var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    result:[],
    hasResult:false
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
  getKeyWord:function (e){
    this.setData({
      keyword:e.detail.value
    })
  },
  getResult:function(){
    if (app.globalData.uid == null) {
      wx.showToast({
        title: '请先微信登陆',
      })
      return 
    }
    var that = this
    console.log(this.data.keyword)
    if(this.data.keyword.trim().length == 0){
      wx.showToast({
        title:'请输入事件名称',
        icon:'none'
      })
      return 
    }

    var host = app.data.host;
    wx.request({
      url: 'http://' + host + '/gtd/controller/searchHandler.php',
      header: {'content-type':'application/json' },
      data:{
        keyword:this.data.keyword
      },
      method: 'GET',
      success: function (d) {
        console.log(d.data);
       if(d.data.length > 0){
        that.setData({
          result:d.data,
          hasResult:true
        })
       }
      }
    })
   },
   toItem:function (){
    wx.navigateTo({
      url: '../thing_item/thing_item'
    })
   }
})