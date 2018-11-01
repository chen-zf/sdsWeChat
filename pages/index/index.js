//index.js
//获取应用实例
const app = getApp()
import tempObj from '../../template/template'
const URL = require('../../config.js')
Page({
  data: {
    checkList: ['推荐', '厨艺', '吃货天堂', '设备', '品牌','名人堂'],
    checkindex:0,
    isShowSearch:false,
    tabbarData: {
      navActive: [1, 0, 0, 0, 0]
    },
    page: 1,
    totalPage: 1,
    roomsData:[],
    bulletinData: [],
    isShowNull: true
  },

  //事件处理函数
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc,
  navClick: function (e) {
    this.getIndexDataFunc(1, e.target.dataset.num,1)
    this.setData({
      checkindex: e.target.dataset.num,
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
    this.getIndexDataFunc(1, 0,1)
    this.getHomeBulletinFunc()
  },
  hiddenSearch: function () {
    this.setData({
      isShowSearch: false
    })
  },
  getIndexDataFunc(page,type,isNew=1){
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
          var _roomsData = res.data.data.data
          if (!isNew){
            _roomsData = self.data.roomsData.concat(_roomsData)
          }
          self.setData({
            roomsData: _roomsData,
            totalPage: res.data.data.pagecount
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
  },
  onReachBottom() {
    if (this.data.page < this.data.totalPage) {
      var page = ++this.data.page
      this.getIndexDataFunc(page, this.data.checkindex,0)
    } else {
      wx.showToast({
        title: '暂时更多数据',
        icon: 'none'
      })
    }
  },
  
})
