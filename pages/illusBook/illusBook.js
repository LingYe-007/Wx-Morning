// pages/illusBook/illusBook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      activeID:"d2",
      Girl:"../../icons/Girl.png",
      Boy:"../../icons/Boy.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   let that=this
    wx.request({
      url: 'https://www.liviolet.site/getCatList',
      data:{
        school:"WHT"
      },
      success:function(res){
        that.setData({
          catData:res.data.data
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
  touchStart:function(e){
   let touchDotX = e.touches[0].pageX; // 获取触摸时的原点
   let touchDotY = e.touches[0].pageY;
   this.setData(
     {
       touchDotX:touchDotX,
       touchDotY:touchDotY
     }
   )
  },
  touchMove:function(e){
    console.log(e)
  },
  touchEnd:function(e){
    let touchMoveX = e.changedTouches[0].pageX;
    let touchMoveY = e.changedTouches[0].pageY;
    let tmX=touchMoveX-this.touchDotX
    let tmY=touchMoveY-this.touchDotY
    let absX=Math.abs(tmX)
    let absY=Math.abs(tmY)
    let distance=Math.sqrt(absX*absX+absY*absY);
    if(distance>60){
      if(absX>absY){
        if(tmX<0){
          
        }
        if(tmY>0){

        }
      }
    }
  },
  myevent(e){
    console.log(e)
    if(e.detail.data.length!==0){
      this.setData({
        catData:e.detail.data
      })
    }
    else{
      wx.showToast({
        title: '信息库里没有信息!',
        icon:"error",
        duration:500
      })
    }
  },
  TabBack:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  storage_cat:function(e){
    let catid=e.currentTarget.dataset.catid
    app.catid=catid
    wx.redirectTo({
      url: '../illusBook/illusContent/index',
    })
  }
})