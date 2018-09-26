// pages/like/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objA: { "a": 1, "b": 2 },
    likeData: {
      type: 1,
      data: []
    },
    likePraise: [],
    page: 1,
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '看过我的'
    })
  },
  initLike() {
    var self = this
    wx.request({
      url: URL.getVisitorList,
      data: {
        user_id: app.globalData.userInfo.id,
        page: self.data.page
      },
      success(res) {
        if (res.data.error==0){
          var _likeData = self.finsDataHandle(self.data.likePraise.concat(res.data.data.visitor))

          var _obj = {}
          _obj.type = 1
          _obj.data = _likeData

          self.setData({
            likeData: _obj,
            likePraise: self.data.likePraise.concat(res.data.data.visitor),
            totalPage: res.data.data.totalPage
          })
        }else{
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1500)
       
        }
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  // 处理数据
  getDataTitle(time) {
    let _time = time.split(".")
    let _month = _time[1].indexOf('0') == 0 ? _time[1].substr(1, 1) + '月' : _time[1] + '月'
    let _date = _time[2].indexOf('0') == 0 ? _time[2].substr(1, 1) + '日' : _time[2] + '日'
    return _month + _date
  },
  finsDataHandle(data) {
    var self = this
    var _obj = {}
    var _likeData = []
    if (data.length>0){
      for (let i = 0, len = data.length; i < len; i++) {
        var _title = new Date(data[i].yuetime).getTime()
        if (_obj[_title]) {
          _obj[_title].data.push(data[i])
        } else {
          _obj[_title] = {
            title: self.getDataTitle(data[i].yuetime),
            data: []
          }
          _obj[_title].data.push(data[i])
        }
      }
      for (let key in _obj) {
        _likeData.push(_obj[key])
      }
    }
    return _likeData
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initLike()
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      likeData: {
        type: 1,
        data: []
      },
      likePraise: [],
    })
    this.initLike()
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = ++this.data.page
    if (this.data.page <= this.data.totalPage) {
      this.setData({
        page: page,
      })
      this.initLike()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },
})