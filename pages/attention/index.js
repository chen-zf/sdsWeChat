const app = getApp()
import tempObj from '../../template/template'
const URL = require('../../config.js')
Page({
  data: {
    tabbarData: {
      navActive: [0, 1, 0, 0, 0]
    },
    topnavActive: [1, 0, 0],
    curr_id: '',
    attentionData:  [],
    page: 1,
    types: 1,
    totalPage:1
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关注'
    })
    this.getAttentionData(1,1)
  },
  getAttentionData(type, page) {
    var self = this
    // if(self.data.types != type)
    wx.request({
      url: URL.getFollowList,
      data: {
        page: page,
        types: type,
        user_id: app.globalData.userInfo.id
      },
      success(res) {
        console.log(res.data.data.info['types' + type])
        self.setData({
          attentionData: self.data.attentionData.concat(res.data.data.info['types'+type]),
          totalPage: res.data.data.totalPage
        })
      }
    })
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  videoPlay(e) {
    console.log(e)
    this.setData({
      curr_id: e.currentTarget.dataset.id,
    })
    console.log(this.videoContext)
    this.videoContext.play()
  },

  onReachBottom(){ 
    if (page<this.data.totalPage){
      var page = ++this.data.page
      this.getAttentionData(this.data.types, page)
    }else{
      wx.showToast({
        title: '暂时更多数据',
        icon: 'none'
      })
    }
  },
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc,
  navSwitchFunc(event){
    let newTopNavActive = [0, 0, 0];   // 初始化一个新数组
    let typeNo = event.currentTarget.dataset.typeno;   // 获取对应的typeno值
    newTopNavActive.splice(typeNo,1,1);  // 修改数组显示高亮
    this.setData({
      types: typeNo - 0 + 1,
      topnavActive: newTopNavActive,
      attentionData: [],
      page: 1
    })
    this.getAttentionData(typeNo-0+1,1)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  // 点赞   0 动态  1 评论
  likeFunc(e) {
    var self = this
    var _data = e.currentTarget.dataset
    wx.request({
      url: URL.setUserLikes,
      data: {
        did: _data.did,
        type: 0,
        id: app.globalData.userInfo.id,
        pid: _data.pid
      },
      success(res) {
        var _obj = {}
        var _index = _data.index
        var _attentionData = self.data.attentionData
        if (res.data.info.includes('点赞成功')) {
          _attentionData[_index].is_dianzan = 1
          ++_attentionData[_index].likes
            _obj = {
              attentionData: _attentionData
            }
        } else {
          _attentionData[_index].is_dianzan = 0
          --_attentionData[_index].likes
            _obj = {
              attentionData: _attentionData
            }
        }
        self.setData(_obj)
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
      }
    })
  },
})