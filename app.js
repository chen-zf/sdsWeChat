//app.js
const api = require('config.js')
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        this.globalData.code = res.code
      }
    })

    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              var self = this
              wx.request({
                url: api.getAuthorization,
                data: {
                  'code': this.globalData.code,
                  'iv': res.iv,
                  'encryptedData': res.encryptedData
                },
                success: function(res) {
                  self.globalData.userInfo = res.data.data
                }
              })
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/index'
          })
        }
      }
    })
  },
  authorizationFunc() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          return 
        } else {
          wx.navigateTo({
            url: '/pages/login/index'
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code: '',
  }
})