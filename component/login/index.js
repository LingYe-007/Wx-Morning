// component/login/index.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      showLogin:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
     tapOne:function(){
       var that=this
       wx.showModal({
         content:"不登陆功能无法使用哟",
         cancelText:"不授权",
          confirmText:"授权",
          success:function(){
            let animation= wx.createAnimation({
              delay: 100,
            })
            that.animation=animation
            that.animation.translateY(1000).scale(0).opacity(0).step();
            that.setData({
              animation:that.animation.export()
            })
          }
       })
          console.log("ASDAS")
     },
     tapTwo:function (){
      let animation= wx.createAnimation({
        delay: 100,
      })
        var that=this;
        wx.showLoading({
          title: '正在登录···',
        })
        wx.login({
          success:function(res){
            let code = res.code;
            if(code){
              wx.getSetting({
                success: function (res) {
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
                        app.openid=res.data.openid;
                        that.animation=animation
                        that.animation.translateY(1000).opacity(0).scale(0).step();
                        that.setData({
                          animation:that.animation.export()
                        })
                        wx.hideLoading({
                          success: (res) => {
                            wx.showToast({
                              title: '登录成功',
                              icon:"success",
                              duration:800
                            })
                          },
                        })
                      }
                      })
                      // app.globalData.userInfo = res.userInfo;
                    }
                   })
               
                }}
              })
            }
        }})  
     }
  }
})
