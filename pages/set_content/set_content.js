Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //关于我们
  us:function(e)
  {
    wx.navigateTo({
      url: '../about_us/about_us',

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
  //版权信息
  copyright:function(e)
  {
    wx.navigateTo({
      url: '../copyright/copyright',

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
  //微信小程序码
  weixin:function(e)
{
    wx.navigateTo({
      url: '../weixin/weixin',

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
    
  }
})