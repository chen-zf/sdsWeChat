var temp = {
  redirectToURLs: ['/pages/index/index', '/pages/info-center/index', '/pages/info-center/index','/pages/info-center/index','/pages/my/index'],
  tabbarReLaunchFunc: function (event) {
    let pagesno = event.currentTarget.dataset.pagesno
    wx.reLaunch({
      url: temp.redirectToURLs[pagesno]
    })
  }
}
//导出，供外部使用
export default temp