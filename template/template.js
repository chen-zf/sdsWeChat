var temp = {
  redirectToURLs: ['/pages/index/index', '/pages/attention/index', '/pages/publish_video/index','/pages/info-center/index','/pages/my/index'],
  tabbarReLaunchFunc: function (event) {
    let pagesno = event.currentTarget.dataset.pagesno
    if (pagesno==2){
      // 保留当前页面，跳转到应用内的某个页面
      wx.navigateTo({
        url: temp.redirectToURLs[2]
      })
    }else{
      // 关闭所有页面，打开到应用内的某个页面。
      wx.reLaunch({
        url: temp.redirectToURLs[pagesno]
      })
    }
    
  }
}
//导出，供外部使用
export default temp