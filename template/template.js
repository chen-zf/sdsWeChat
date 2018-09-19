const URL = require("../config.js")
const temp = {

  redirectToURLs: ['/pages/index/index', '/pages/attention/index', '/pages/publish_video/index', '/pages/info-center/index', '/pages/my/index'],

  tabbarReLaunchFunc: function(event) {
    let pagesno = event.currentTarget.dataset.pagesno
    if (temp.redirectToURLs[pagesno].indexOf(getCurrentPages()[0].route)>-1){
        return;
    }
    else if (pagesno == 2) {
      // 保留当前页面，跳转到应用内的某个页面
      wx.navigateTo({
        url: temp.redirectToURLs[2]
      })
    } else {
      // 关闭所有页面，打开到应用内的某个页面。
      wx.reLaunch({
        url: temp.redirectToURLs[pagesno]
      })
    }
    console.log(1)

  },
  // delMyVideoFunc(e){
  //   wx.showModal({
  //     // title: '提示',
  //     content: '确定要删除吗？',
  //     success: function (sm) {
  //       if (sm.confirm) {
  //         wx.request({
  //           url: URL.delMyVideo,
  //           data: {
  //             did: e.currentTarget.dataset.id
  //           },
  //           success(res) {
  //            wx.showToast({
  //              title: res.data.info,
  //            })
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
}
//导出，供外部使用
export default temp