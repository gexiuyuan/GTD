Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      ['2015-2016 ', '2016-2017 ', '2017-2018(大一) ', '2018-2019(大二) ', '2019-2020(大三) ', '2020-2021(大四) ', '2021-2022 ', '2022-2023 ', '2023-2024 ', '2024-2025 ', '2026-2027 '],
      ['第一学期', '第二学期', '第三学期', '第四学期']
      
    ],
    index:0,
    index1:0,
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value[0],
      index1: e.detail.value[1]
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})