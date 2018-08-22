//index.js
//获取应用实例
const app = getApp()
import tempObj from '../../template/template'

Page({
  data: {
    checkList:['推荐','吃货天堂','厨艺','品牌','设备','名人堂'],
    checkindex:0,
    isShowSearch:false,
    tabbarData: {
      navActive: [1, 0, 0, 0, 0]
    },
  },
  onLoad: function () {

  },
  //事件处理函数
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc,
  navClick: function (e) {
    this.setData({
      checkindex: e.target.dataset.num
    })
  },
  showSearch:function(){
    this.setData({
      isShowSearch: true
    }) 
  },
  hiddenSearch: function () {
    this.setData({
      isShowSearch: false
    })
  }
  
})
