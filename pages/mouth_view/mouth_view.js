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
    weeks: [],
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
  onLoad: function (e) {
    var weekArray = this.getMouthView();
    console.log(weekArray);
    this.setData({
      weeks: weekArray
    });
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
  getMouthView: function () {
    //星期数组
    var weekArray = new Array();
    //获取到的星期几
    var date = new Date();
    //得到上一个月的最后一天
    date.setMonth(date.getMonth());
    date.setDate(0);
    var last1 = app.formatDate(date, 'dd');

    //得到当前月的最后一天
    date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    var last = date.getDay();
    var last2 = app.formatDate(date, 'dd');

    //得到当前月第一天
    var firstDate = this.data.year + '/' + this.data.mouth + '/01';
    //获取到当前月第一天是星期几
    var first = new Date(firstDate).getDay()

    var weekArray = new Array();
    var before = last1;

    var after = 1;

    //当前日期下标
    var index = 1;

    //先添加第一行部分的日期
    weekArray[0] = new Array(7).fill(0);
    for (var i = first - 1; i > 0; i--) {
      var da = new Object();
      da.value = before--
      //flag 0 是溢出当前月部分
      da.flag = 0
      weekArray[0][i - 1] = da;
    }
    for (var i = first; i < 7; i++) {
      var da = new Object()
      da.value = index++
      da.flag = 1
      weekArray[0][i - 1] = da;
    }
    var da = new Object()
    da.value = index++
    da.flag = 1
    weekArray[0][6] = da;
    //中间部分
    here: for (var i = 1; ; i++) {
      weekArray[i] = new Array(7).fill(0);
      for (var j = 1; j < 7; j++) {
        if (index > last2) {
          break here;
        }
        var da = new Object()
        da.value = index++
        da.flag = 1
        weekArray[i][j - 1] = da;
      }
      var da = new Object()
      da.value = index++
      da.flag = 1
      weekArray[i][6] = da;
    }

    //添加后半部分月视图
    for (var i = last + 1; i < 7; i++) {
      var da = new Object()
      da.value = after++
      da.flag = 2
      weekArray[weekArray.length - 1][i - 1] = da;
    }
    var da = new Object()
    da.value = after++
    da.flag = 2
    weekArray[weekArray.length - 1][6] = da;

    return weekArray;
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
  toPage1: function (e) {
    var tapDate = e.target.dataset.index.substring(0,e.target.dataset.index.length - 1)
    var tapFlag = e.target.dataset.index.substring(e.target.dataset.index.length - 1)

    var d = ''
    if(tapFlag == 0){
      if(this.data.mouth == 1){
        this.data.mouth = 12;
        --this.data.year;
      }else{
        --this.data.mouth
      }
      var d = this.data.year +'/'+ this.data.mouth +'/'+ tapDate
    }else if(tapFlag == 1){
      var d = this.data.year +'/'+ this.data.mouth +'/'+ tapDate
    }else {
      if(this.data.mouth == 12){
        this.data.mouth = 1
        ++this.data.year
      }else{
        ++this.data.mouth
      }
      var d = this.data.year +'/'+ this.data.mouth +'/'+ tapDate
    }
    console.log(d)
    var date = new Date(d);
    app.globalData.backDate = app.formatDate(date,'yyyy-MM-dd')
    wx.reLaunch({
      url: '../page1/page1'
    })
  }
})