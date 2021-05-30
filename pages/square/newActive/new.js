// pages/square/newActive/new.js
var uploadImage = require("../../../utils/uploadFile");//地址换成你自己存放文件的位置
var util = require('../../../utils/util');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLogin:true,
    navBarHeight: app.globalData.navBarHeight,
    img_list:"",
    positionText:"获取当前位置",
    result:"",
    result:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.showModal({
      title: '温馨提示',
      content: '正在请求您的个人信息',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
          desc: "获取你的昵称、头像、地区及性别",
          success: res => {
            console.log(res)
            let wxUserInfo = res.userInfo;
            app.avatarUrl=wxUserInfo.avatarUrl;
            app.nickname=wxUserInfo.nickName;
          },
          fail: res => {
             //拒绝授权
            that.showErrorModal('您拒绝了请求');
            return;
          }
        })} else if (res.cancel) {
          //拒绝授权 showErrorModal是自定义的提示
          that.showErrorModal('您拒绝了请求');
          return;
        }
      }
    })
    // wx.getLocation({
    //   success: res=> {
    //     wx.chooseLocation({
    //       latitude: res.latitude,
    //       longitude:res.longitude,
    //       success:function(data){
    //         console.log(data.address)
    //         that.setData({
    //           active_place:data.address
    //         })
    //       }
    //     })
    //     // console.log(res);
    //     // this.setData({
    //     //   location: res,
    //     // })
    //     // console.log(app.globalData.location);
    //   }
    // })
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
      positionText:app.active_place
    })
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
        }
        else {
          //调用wx.getLocation的API
        }
      }
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

  },
  storage_content:function(e){
    this.setData({
      user_content:e.detail.value
    })
  },
  TabBack:function(){
    wx.switchTab({
     url: '../square',
    })
   },
   closeTab:function(){
     wx.switchTab({
       url: '../square',  
     })
   },
   chooseImg:function(){
     var that=this
     wx.chooseImage({
        count:9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res){
          that.setData({
            img_list:res.tempFilePaths
          })
        }
     })
   },
async_get:function(baseUrl){
  var that=this
  let result1=null
  for(let i=0; i<this.data.img_list.length;i++){
    wx.showLoading({
      title: '上传中'+(i+1) + '/'+this.data.img_list.length,
      mask:true
    })
     uploadImage(that.data.img_list[i],'active-img/',
      function (result){
       console.log("====上传图片地址为:",result)
      if(result1!==null)
      result1=result+"||"+result1
      else
      result1=result
      if(that.data.img_list[i]===that.data.img_list[that.data.img_list.length-1])
      {
        that.req(baseUrl,result1)
      }
      },function(result){
        console.log("===上传失败===",result)
        wx.showToast({
          title: '上传失败',
          icon:"error",
          duration:400
        })
      }
    )
  }
},
 summit_img:function(){
         var that = this;
         if(app.avatarUrl&&app.nickname){
        if(app.cat_id){
          let baseUrl='https://www.liviolet.site/squareActiveAdd'
        if(this.data.img_list.length!==0){
        that.async_get(baseUrl)
      }
        else{
          that.req(baseUrl,"");
        }}
        else{
          let baseUrl='https://www.liviolet.site/catActiveAdd'
          if(this.data.img_list.length!==0){
            that.async_get(baseUrl)
          }
          else{
            that.req(baseUrl,"")
          }
        }}
        else{
          wx.showToast({
            title: '请授权后再尝试',
            duration:500,
            icon:"error"
          })
        }
   },
   getPosition:function(){
    wx.getLocation({
        success: res=> {
          wx.chooseLocation({
            latitude: res.latitude,
            longitude:res.longitude,
            success:function(data){
              app.active_place=data.address
            }
          })
        }
      })
   },
    req:function (baseUrl,result) {
      var that=this
      let year=util.formatDate(new Date())
      let  TIME=util.formatTime(new Date());
      let date=year+" "+TIME
      let user_content=that.data.user_content
      let active_place=that.data.active_place
      wx.request({
        method:"POST",
        url:baseUrl+"?school=WHT",
        header:{
          // 'content-type': 'application/x-www-form-urlencoded'
          'Content-Type':'application/json'
        },
        data:{
          open_id:app.openid,
          nickname:app.nickname,
          face_url:app.avatarUrl,
          content:user_content,
          dime:date,
          active_place:that.data.positionText,
          img_url:result,
          cat_id:app.catid
        },
        success:function(res){
          console.log(res)
          wx.redirectTo({
            url: '../success',
          })
        },
        fail:function(){
         wx.showToast({
           icon:"error",
           title: '上传失败',
           duration:300
         })
        }
      })
    }
})