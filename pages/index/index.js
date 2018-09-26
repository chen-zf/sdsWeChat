//index.js
//获取应用实例
const app = getApp()
import tempObj from '../../template/template'
const URL = require('../../config.js')
Page({
  data: {
    checkList: ['推荐','厨艺','吃货天堂','品牌','设备','名人堂'],
    checkindex:0,
    isShowSearch:false,
    tabbarData: {
      navActive: [1, 0, 0, 0, 0]
    },
    roomsData:[],
    bulletinData: []
  },

  //事件处理函数
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc,
  navClick: function (e) {
    this.getIndexDataFunc(1, e.target.dataset.num)
    this.setData({
      checkindex:e.target.dataset.num
    })
  },
  showSearch:function(){
    wx.request({
      url: URL.getMyThanks,
      method: 'get',
      success(res) {
        console.log(res)
      }
    })
    this.setData({
      isShowSearch: true
    }) 
  },
  onShow(){
    app.authorizationFunc()
    this.getIndexDataFunc(1, 0)
    this.getHomeBulletinFunc()
  },
  hiddenSearch: function () {
    this.setData({
      isShowSearch: false
    })
  },
  getIndexDataFunc(page,type){
    var self = this
    wx.request({
      url: URL.getIndexData,
      data: {
        page: page,
        type: type
      },
      success(res) {
        console.log(res.data.data)
        if (res.data.data.data){
          self.setData({
            roomsData: res.data.data.data
          })
        }else{
          self.setData({
            roomsData: []
          })
        }
      }
    })
  },
  getHomeBulletinFunc(){
    var self = this
    wx.request({
      url: URL.getHomeBulletin,
      success(res) {
        console.log(res.data.data)
        self.setData({
          bulletinData: res.data.data
        })
      }
    })
  }
  
})
