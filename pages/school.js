// pages/school.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      schools:[
        {name:"华中农业大学",pic:"https://pic.liviolet.site/college/hznydx.jpg"},
        {name:"华中师范大学",pic:"https://pic.liviolet.site/college/hzsfdx.jpg"},
        {name:"湖北第二师范学院",pic:"https://pic.liviolet.site/college/hbdesfxy.jpg"},
        {name:"湖北工业大学",pic:"https://pic.liviolet.site/college/hbgydx.jpg"},
        {name:"湖北经济学院",pic:"https://pic.liviolet.site/college/hbjjxy.jpg"},
        {name:"中南民族大学",pic:"https://pic.liviolet.site/college/znmzdx.png"},
        {name:"武汉理工大学",pic:"https://pic.liviolet.site/college/whlgdx.jpg"},
        {name:"武汉工程大学",pic:"https://pic.liviolet.site/college/whgcdx.jpg"},
        {name:"武汉交通职业学院",pic:"https://pic.liviolet.site/college/whjtzyxy.jpg"},
        {name:"中南财经政法大学",pic:"https://pic.liviolet.site/college/zncjzfdx.jpg"}
      ]
  },
  ChangeSearch:function(e){
    this.setData({
      search:e.detail.value
    })
  },
  chooseSchool:function(e){
    console.log(e)
    app.school=this.data.schools[e.currentTarget.dataset.index].name
    this.setData({
      school:app.school
    })
  },
  search:function(){
   let school=this.data.schools.filter(item=>(item.name.indexOf(this.data.search)!==-1))
   console.log(school)
    this.setData({
      schools:school
    })
  },
  TabBack:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navheight:app.globalData.navBarHeight
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
      this.setData({
        school:app.school
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})