// pages/popSci/disease/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    current1:1,
    imageList:[],
    visble:[true,true,true],
    index0:2,
    index1:1,
    swiperNumber:true,
    showSpan:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.request({
      method:"GET",
      url: 'https://www.liviolet.site/feed',
      success:function(res){
        that.setData({
            imageList:res.data.data
        })
      }
    })
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
      let imglist=this.data.imageList
      let index=this.data.index
      if (imglist[index]=='') {
          this.setData({
            [`visble[0]`]:false
          })
      }
      if (imglist[index+1]=='') {
        this.setData({
          [`visble[1]`]:false
        })
    }
    if (imglist[index+2]=='') {
      this.setData({
        [`visble[2]`]:false
      })
  }
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
  wx.switchTab({
    url: '/pages/popSci/popSci',
  })
  },
  Animation:function(translateXX){
    let animation = wx.createAnimation({
      duration:680,
      timingFunction:"ease",
    })
    let animation1 = wx.createAnimation({
      duration:680,
      timingFunction:"ease",
    });
    this.animation=animation
    this.animation1=animation1
    let index0=this.data.index0
    let index1=this.data.index1
    if(translateXX > 0){
      let len=this.data.imageList.length;
      if(this.data.current<=len-2){
        if(index0>index1){
          this.setData({
            index0:1,
            index1:2
          })
        }
        else{
          this.setData({
            index0:2,
            index1:1
          })
        }
       this.animation1.translateY(0).translateX(translateXX).opacity(0).step();
       this.animation.translateY(0).translateX(-20).scaleY(1.08).step();
       this.animation1.translateX(20).translateY(0).scaleY(0.9).opacity(1).rotate(0).step({
        duration:1,
      })
        this.setData({
          current:this.data.current+2,
          showSpan:!this.data.showSpan,
          animation1:this.animation1.export(),
           animation:this.animation.export(),
        })
        this.setData({
          swiperNumber:!this.data.swiperNumber
        })
      }
      else{
        wx.showToast({
          icon:"error",
          title: "已经滑到最右边了哟",
          duration:300
        })
      }
      // else{
      //   this.animation.translateY(0).translateX(0).scaleY(1).step();
      // }
    } 
    else{
      if(this.data.current>1){
        if(index0>index1){
          this.setData({
            index0:1,
            index1:2
          })
        }
        else{
          this.setData({
            index0:2,
            index1:1
          })
        }
      this.animation1.translateY(0).translateX(translateXX).opacity(0).step();
      this.animation.translateY(0).translateX(-20).scaleY(1.08).step();
      this.animation1.translateX(20).translateY(0).scaleY(0.9).opacity(1).rotate(0).step({
        duration:1
      })
      this.setData({
        current:this.data.current-2,
        showSpan:!this.data.showSpan,
        animation1:this.animation1.export(),
        animation:this.animation.export(),
      })
      this.setData({
        swiperNumber:!this.data.swiperNumber
      })
    }
    else{
      wx.showToast({
        icon:"error",
        title: "已经滑到最左边了哟",
        duration:350
      })
    }

}
  },
  Animation1:function(translateXX){
    let animation = wx.createAnimation({
      duration:680,
      timingFunction:"ease",
    })
    let animation1 = wx.createAnimation({
      duration:680,
      timingFunction:"ease",
    });
    this.animation=animation
    this.animation1=animation1
    let index0=this.data.index0
    let index1=this.data.index1
    if(translateXX > 0){
      let len=this.data.imageList.length;
      this.animation.translateX(translateXX).opacity(0).step();
      this.animation1.translateX(0).scaleY(1).step();
      this.animation.translateX(0).scaleY(1).opacity(1).rotate(0).step({
        duration:1
      })
      if(this.data.current1<=len-2){
        if(index0>index1){
          this.setData({
            index0:1,
            index1:2
          })
        }
        else{
          this.setData({
            index0:2,
            index1:1
          })
        }
      this.setData({
        current1:this.data.current1+2,
        showSpan:!this.data.showSpan,
        animation:this.animation.export(),
         animation1:this.animation1.export()
      })
      this.setData({
        swiperNumber:!this.data.swiperNumber
      })
    }
    else{
      wx.showToast({
         icon:"error",
         title: "已经滑到最右边了哟",
         duration:350
      })
    }
  
    }
    else{
      if(this.data.current>1){
      this.animation.translateX(translateXX).opacity(0).step();
      this.animation1.translateX(0).scaleY(1).step();
      this.setData({
        current1:this.data.current1-2,
        showSpan:!this.data.showSpan
      })
      this.animation.translateX(0).scaleY(1).opacity(1).rotate(0).step({
        duration:1
      })
      this.setData({
        animation1:this.animation1.export(),
        animation:this.animation.export()
      })
      this.setData({
        swiperNumber:!this.data.swiperNumber
      })
      if(index0>index1){
        this.setData({
          index0:1,
          index1:2
        })
      }
      else{
        this.setData({
          index0:2,
          index1:1
        })
      }
    }
    else{
      wx.showToast({
        icon:"error",
        title: "已经滑到最左边了哟",
        duration:50
     })
    }
    }
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
    let current=this.data.current
    let current1 = this.data.current1
    if(this.data.swiperNumber){
    if(delta >=60){
      if(absX > absY){
        if(tmX<0){
          this.Animation(-500) 
          console.log("我执行了吗1")
        }
        else{
          this.Animation(500)
          console.log("我执行了吗2")
        }
      }
      // this.setData({
      //   swiperNumber:!this.data.swiperNumber
      // })
    }
    else{
      app.current=(current>current1?current1:current)
      app.type='feed'
      wx.redirectTo({
        url: '../Showpage/Showpage',
      })
    }
  }
  },
  catchEnd1:function(e){
    let touchX=e.changedTouches[0].pageX;
    let touchY=e.changedTouches[0].pageY;
    let tmX=touchX -this.data.pageX;
    let tmY=touchY-this.data.pageY;
    let absX=Math.abs(tmX);
    let absY=Math.abs(tmY);
    let delta =Math.sqrt(absX * absX + absY * absY);
    let current=this.data.current
    let current1 = this.data.current1
    if(!this.data.swiperNumber){
    if(delta >=60){
      if(absX > absY){
        if(tmX<0){
          console.log("我执行了吗3")
          this.Animation1(-500)
        }
        else{
          console.log("我执行了吗4")
          this.Animation1(500)
        }
      }
    }
    else{
      app.current=(current>current1?current1:current)
      app.type='feed'
      wx.redirectTo({
        url: '../Showpage/Showpage',
      })
    }
  }},
  storage_data:function(e){
    console.log(e)
    //  app.current=e..current
  }
})