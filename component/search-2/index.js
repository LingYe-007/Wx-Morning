// // component/search-2/index.js
const app=getApp()
Component({                                                                                                                                                                                                  //    */
  properties: {

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
      ChangeSearch:function(e){
        this.setData({
          search:e.detail.value
        })
      },
      search:function(e){
        var that=this;
        let search=this.data.search
        wx.request({
          url: 'https://www.liviolet.site/search'+"?school=WHT",
          data:{
            string:search
          },
          success:function(res){
            app.catList=res.data
            that.triggerEvent('myevent',app.catList)
            wx.switchTab({
              url:'../../pages/illusBook/illusBook',
            })
          }
        })
      }
  }
})
// component/search/search.js
