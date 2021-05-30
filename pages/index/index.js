// index.js
// 获取应用实例
const app = getApp()
wx.cloud.init({
  env:"lingye-4gbrmxhy99efa47d",
  traceUser:true
});

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）

Page({
  data: {
    visibleNote:1,
    navPath:['/pages/square/square','/pages/illusBook/illusBook','/pages/popSci/popSci'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.redirectTo({
         url: '../logs/logs'
    })
  },
  onLoad() {
    this.login()
  },
  ChooseSchool:function(){
    wx.redirectTo({
      url: '../school',
    })
  },
  navTo(e) {
    let path=e.currentTarget.dataset.path
    wx.switchTab({
      url: `${path}`,
    })
  },
  navMap(){
    wx.switchTab({
      url: '/pages/map/map',
    })
  },
  onShow:function(){
    this.setData({
      school:app.school
    })
  },
  getUserInfo: function(e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                name: res.userInfo.nickName
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      }
    })
  },
  login:function(){
    wx.login({
      success:function(res){
        let code = res.code;
        console.log(code)
        if(code){
          wx.getSetting({
            success: function (res) {
              console.log(res)
              if (res.authSetting['scope.userInfo']){ 
               wx.getUserInfo({
                withCredentials: true,
                success:res=>{
                  wx.request({
                    url: 'https://www.liviolet.site/api/wxapp/code2session',
                    data:{
                      "code": code,
                      "encryptedData": res.encryptedData,
                      "iv": res.iv
                    },
                  success(res){
                    // console.log(res.data)
                    // that.setData({
                    //   openid:res.data
                    // })
                    app.openid=res.data.openid;
                  }
                  })
                  // app.globalData.userInfo = res.userInfo;
                }
               })
           
            }}
          })
        }
    }})

  },
  navTo_1:function(){
    wx.redirectTo({
      url: "../feedback/index",
    })
  },
  // 打开权限设置页提示框
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  }
})
