// component/tabbar/tabbar.js
import tabbarList from "../router"
import imgList from '../../icons/img_router'
Component({
  options:{
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:false,
    tabbarList:tabbarList,
    activeID:2,
    imgList:imgList,
    isShouldchange:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navRise(){
      var active=!this.data.active
      this.setData({
        active:active
      })
    },
      ChangeNav(e){
        const{
          path,
          id
        }=e.currentTarget.dataset
        if(id===this.data.id){

        }
        wx.setStorageSync('_activeID',id)
        wx.switchTab({
          url: `${path}`,
        })
      }
  },
  pageLifetimes:{
    show:function(){
      this.setData({
        activeID:wx.getStorageSync('_activeID')
      })
    }
  }
})
