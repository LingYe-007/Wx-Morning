// pages/popSci/Showpage/Showpage.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgList:"",
      index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
      wx.request({
        url: 'https://www.liviolet.site/'+app.type,
        success:function(res){
          let imgList=res.data.data
          that.setData({
            imgList:imgList,
            index:app.current
          })
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
  TabBack:function(){
    wx.redirectTo({
      url: '/pages/popSci/'+app.type+'/index',
    })
  },
  catchStart:function(e){
    this.setData({
      pageX:e.changedTouches[0].pageX,
      pageY:e.changedTouches[0].pageY
    })
  },
  catchEnd:function(e){
    let touchX=e.changedTouches[0].pageX;
    let touchY=e.changedTouches[0].pageY;
    let tmX=touchX -this.data.pageX;
    let tmY=touchY-this.data.pageY;
    let absX=Math.abs(tmX);
    let absY=Math.abs(tmY);
    let delta =Math.sqrt(absX * absX + absY * absY);
   if(delta>=20){
    if(absX>absY){
      if(tmX<0){
        if(this.data.index<this.data.imgList.length-1)
        {this.setData({
          index:this.data.index+1
        })}
        else{
          wx.showToast({
            title: '已经没有了!',
            icon:"error",
            duration:300
          })
        }
      }
      else{
        if(this.data.index>0){
        this.setData({
          index:this.data.index-1
      })
    }
    else{
      wx.showToast({
        title: '已经没有了!',
        icon:"error",
        duration:300
      })}
    }
  }
  }}
})