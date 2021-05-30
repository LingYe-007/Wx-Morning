// pages/feedback/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      navBarHeight: app.globalData.navBarHeight,//导航栏高度
      menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
      menuHeight: app.globalData.menuHeight //导航栏高度
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
  ChangeValue:function(e){
   this.setData({
     use_content:e.detail.value
   })
  },
  ChangeMethod:function(e){
    this.setData({
      methodValue:e.detail.value
    })
  },
  summit:function(){
      wx.request({
        url: 'https://www.liviolet.site/feedback'+"?school=WHT",
        method:"POST",
        data:{
          content:this.data.use_content,
          contact:this.data.methodValue
        },
        success:function(){
          wx.redirectTo({
            url: '../feedback/success',
          })
        }
      })
  },
  TabBack:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})