// component/search/search.js
const app =getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      poverty:[],
      chooseItem:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ChangeSearch(e){
      let search=e.detail.value
      this.setData({
        search:search
      })
      this.Search(search)
    },
    Search:function(QueryString){
      let result=[]
      app.markers.map(item => {
        let string=item.data
        if(string.indexOf(QueryString)!==-1)
      {result.push(item)}
    })
      console.log(result)
      result.map(item=>{
        if(item.iconPath=="https://pic.liviolet.site/catmap/raccon.png"){
        item.color="#CFC6C6",
        item.fillColor="#CFC6C6",
        item.radius=40,
        item.strokeWidth=5
      }
      if(item.iconPath=="https://pic.liviolet.site/catmap/cow.png"){
        item.color="#685E5E",
        item.fillColor="#685E5E",
        item.radius=40,
        item.strokeWidth=5
      }
      if(item.iconPath=="https://pic.liviolet.site/catmap/lion.png"){
        item.color="#CFC6C6",
        item.fillColor="#CFC6C6",
        item.radius=40,
        item.strokeWidth=5
      }
      if(item.iconPath=="https://pic.liviolet.site/catmap/orange.png"){
        item.color="#E0AC8A",
        item.fillColor="#E0AC8A",
        item.radius=40,
        item.strokeWidth=5
      }
      if(item.iconPath=="https://pic.liviolet.site/catmap/threColor.png"){
        item.color="#EFDAC3",
        item.fillColor="#EFDAC3",
        item.radius=40,
        item.strokeWidth=5
      }
      if(item.iconPath=="https://pic.liviolet.site/catmap/litter_daji.png"){
        item.color="#B4A49C",
        item.fillColor="#B4A49C",
        item.radius=40,
        item.strokeWidth=5
      }
      if(item.iconPath=="https://pic.liviolet.site/catmap/black.png")
      {
        item.color="#7D7482",
        item.fillColor="#7D7482",
        item.radius=40,
        item.strokeWidth=5
      }
      })
      this.triggerEvent("myevent",result)
    },
    screen:function(){
      this.setData({
        chooseItem:!this.data.chooseItem
      })
    },
    chooseTip:function(e){
      var that=this
      if(this.data.poverty.findIndex(item=>item===e.target.dataset.text)===-1){
      this.data.poverty.push(e.target.dataset.text)
      this.setData({
        poverty:this.data.poverty
      })
      this.data.poverty.map(item=>{that.Search(item)})
    }
    else{
      wx.showToast({
        icon:"error",
        duration:1000,
        title:"你已经加入过了"
      })
    } 
    },
    removeTip:function(e){
      this.data.poverty.splice(e.target.dataset.index,1)
      this.setData({
        poverty:this.data.poverty
      })
    },
    Goback:function(e){
      this.setData({
        chooseItem:!this.data.chooseItem
      })
    }
  }
})
