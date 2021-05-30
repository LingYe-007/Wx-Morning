// component/header/index.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  externalClasses:['nav-content'],
  properties: {
      back_image:{
          type:String,
          value:[]
      },
      back_color:{
        type:String,
        value:[]
      },
      page_title:{
        type: String,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight //导航栏高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
