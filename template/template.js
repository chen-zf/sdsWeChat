const app = getApp()

pages({
  data:{
    redirectToUrl: ['../../logs/logs', '../../logs/logs','../../logs/logs','../pages/my/index']
  },
  bindViewTap: function (viewNo) {
    var redirectToUrl =  '../../logs/logs';
    wx.navigateTo({
      url: redirectToUrl
    })
  },
})