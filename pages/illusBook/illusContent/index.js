// pages/illusBook/illusContent/index.js
const app = getApp()
const util=require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
      wx.request({
        method:"GET",
        url: 'https://www.liviolet.site/getCatById',
        data:{
          school:"WHT",
          cat_id:app.catid
        },
        success:function(res){
          console.log(res.data)
          that.setData({
            cat_data:res.data.data
          })
        }
      })
      wx.request({
        url: 'https://www.liviolet.site/getActiveById',
        data:{
          school:"WHT",
          cat_id:app.catid
        },
        success:function(res){
          let cat_active=res.data.data
          cat_active.map(item=>{
            item.showComment=false
            item.img_url=item.img_url.split("||")
          })
          that.setData({
            cat_active:cat_active
          })
        }
      })
      wx.request({
        url: 'https://www.liviolet.site/getCatImgById',
        data:{
          school:"WHT",
          cat_id:app.catid
             },
        success:function(res){
          console.log(res.data.data)
          that.setData({
            swiper_img:res.data.data
          })
        }
      })
  },
  inputValue:function(e){
    let value=e.detail.value
    this.setData({
      content:value
    })
},
  like:function(e){
    let that=this
    let index=e.currentTarget.dataset.index
    wx.request({
      url: 'https://www.liviolet.site/addActiveLikesById',
      data:{
        school:"WHT",
        active_id:e.currentTarget.dataset.active_id,
        open_id:app.openid
      },
      success:function(res){
        if(res.data.data==0){
          that.setData({
            [`cat_active[${index}].whetherLike`]:1,
            [`cat_active[${index}].likes_num`]:that.data.cat_active[`${index}`].likes_num+1
          })
          wx.showToast({
            icon:"success",
            title: '你已经成功点赞了',
            duration:600
          })
        }
        if(res.data.data==1){
          that.setData({
            [`cat_active[${index}].whetherLike`]:1
          })
          wx.showToast({
            icon:"success",
            title: '你已经点赞过了',
            duration:600
          })
        } 
      }
    })
  },
  commitValue:function(e){
    if(this.data.content!==undefined){
       var that =this
       let year=util.formatDate(new Date())
       let  TIME=util.formatTime(new Date());
       let date=year+" "+TIME
       if(!app.nickname){
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
               wx.request({
                 url: 'https://www.liviolet.site/addCommentById'+"?school=WHT",
                 method:"POST",
                 data:{
                   active_id:e.currentTarget.dataset.active_id,
                   open_id:app.openid,
                   nickname:app.nickname,
                   content:that.data.content,
                   face_url:app.avatarUrl,
                   school:"WHT",
                   dime:date
                 },
                 success:function(){
                   wx.showToast({
                     title: '评论提交成功',
                     icon:"success",
                     duration:500
                   })
                   that.setData({
                     content:""
                   })
                 }
               })
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
     }
     else{
       wx.request({
         url: 'https://www.liviolet.site/addCommentById'+"?school=WHT",
         method:"POST",
         data:{
           active_id:e.currentTarget.dataset.active_id,
           open_id:app.openid,
           nickname:app.nickname,
           content:that.data.content,
           face_url:app.avatarUrl,
           school:"WHT",
           dime:date
         },
         success:function(){
           wx.showToast({
             title: '评论提交成功',
             icon:"success",
             duration:500
           })
           that.setData({
             content:""
           })
         }
       })
     }
   }
       else{
         wx.showToast({
           title: '内容不能为空',
           icon:"error",
           duration:500
         })
       }
     },
     previewImage: function (e) {
      let that=this
      var current = e.target.dataset.src;
      var imgList = [];
      imgList.push(current)
      // let index=e.currentTarget.dataset.index
      // console.log(index)
      // for (let i = 0;i<that.data.cat_active[`${index}`].img_url.length; i++) {
      //  imgList.push(that.data.cat_active[`${index}`].img_url[`${i}`]);
      // }
      wx.previewImage({
       current: current,
       urls:imgList
      })
     },
     comment:function(e){
      var that=this
      let index=e.currentTarget.dataset.index
      wx.request({
        url: 'https://www.liviolet.site/getCommentById',
        data:{
          school:"WHT",
          active_id:e.currentTarget.dataset.active_id,
        },
        success:function(res){
          if(res){
            that.setData({
              commentList:res.data.data,
              [`cat_active[${index}].showComment`]:!that.data.cat_active[`${index}`].showComment
            })
          }
          else{
            that.setData({
              showComment:!that.data.showComment
            })
            wx.showToast({
              title: '暂时还没有人评论',
              duration:100,
              icon:"Error"
            })
          }
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
  TabBack:function(){
   wx.switchTab({
    url: '../illusBook',
   })
  },
  newActive:function(){
    app.squre='illusbook'
    wx.redirectTo({
      url: '/pages/square/newActive/new',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})