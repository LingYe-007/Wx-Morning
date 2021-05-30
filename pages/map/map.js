// pages/map/map.js
const app=getApp()
var QQMapWx =require("../../qqmap-wx-jssdk")
var qqmapsdk;
var that= this
wx.cloud.init();
   
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nowLatitude_x:30.487114,
      nowLatitude_y:114.391799,
      hasmarkers:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     qqmapsdk = new QQMapWx({
       key:'D2QBZ-IXLKU-XLPV2-BSBRO-L7LI2-SVBMB'
     })
    //  const db =wx.cloud.database({
    //    env:"gye-4gbrmxhy99efa47d"
    //  })
    //  console.log("可以执行吗")
    //  db.collection('cat-position').get({
    //    success(res){
    //       console.log(1)
    //       console.log(res)
    //    },
    //    fail(res){
    //       console.log(res)
    //    }
    //  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map'); 
  //   qqmapsdk.search({
  //     keyword:'酒店',
  //     success:function(res){
  //       console.log(res)
  //     },
  //     fail:function(res){
  //       console.log(res)
  //     },
  //     complete:function(res){
  //       console.log(res)
  //     }
  //  });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db =wx.cloud.database({
      env:"gye-4gbrmxhy99efa47d"
    })
    // console.log("可以执行吗")
    db.collection('cat-position').get({
      success(res){
         this.setData({
           markers:res.data.data
         })
        //  console.log(this.data.markers)
      },
      fail(res){
         console.log(res)
      }
    })
  },

  myevent:function(e){
    console.log(e.detail)
    this.setData({
      circles:e.detail,
      markers:e.detail
    })
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
  onLoad:function(){
      this.queryData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  TabBack:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
 showLabel:function(e){
     wx.switchTab({
       url: '../illusBook/illusBook',
     })
 },
  queryData:function(){
    var that=this
    const db =wx.cloud.database({
      env:"lingye-4gbrmxhy99efa47d"
    })
    db.collection('cat_position').get({
      success(res){
         for(let i=0;i<res.data.length;i++){
           res.data[i].width=15
           res.data[i].height=15
         }
         that.setData({
           markers:res.data,
           hasmarkers:true
         })
         app.markers=res.data
      },
      fail(res){
      }
    })
  }
})