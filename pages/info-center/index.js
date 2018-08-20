const app = getApp()
import tempObj from '../../template/template'   // 引入模板对象
Page({
  data: {
    tabbarData: {
      navActive: [0, 0, 0, 1, 0]
    },
  },
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc   // 调用模板方法
})