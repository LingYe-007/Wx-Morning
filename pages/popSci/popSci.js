// pages/popSci/popSci.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      floatList:[
        {text:"疾病",pathUrl:"./diseases/index"},
        {text:"急救",pathUrl:"./resues/index"},
        {text:"查",pathUrl:"./search/index"},
        {text:"绝育",pathUrl:"./ster/index"},
        {text:"喂食",pathUrl:"./feed/index"}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        method:"GET",
        url: 'https://www.liviolet.site/feed',
        success(res){
          console.log(res.data)
        }                  
      })
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
  // 页面方法
  JumpTo:function(e){
    let path=e.currentTarget.dataset.path
    wx.navigateTo({
      url: path,
    })
  },
  TabBack:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})