const app = getApp()
import tempObj from '../../template/template'
Page({
  data: {
    tabbarData: {
      navActive: [0, 1, 0, 0, 0]
    },
    topnavActive: [1, 0, 0],
    data: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],[1,2,1,1],[1,1,1,1,1,1,1,1,1,1,1,1]],
    curr_id: '',
    attentionData:  [
      {
        id: 1, src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://ow74m25lk.bkt.clouddn.com/shilan.jpg'
      }, {
        id: 2, src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://ow74m25lk.bkt.clouddn.com/shilan.jpg'
      },
      {
        id: 3, src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://ow74m25lk.bkt.clouddn.com/shilan.jpg'
      },
      {
        id: 4, src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
      },
      
    ]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关注'
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
    let that = this;
    setTimeout(function(){
      that.setData({
        attentionData: that.data.attentionData.concat(that.data.data[1])
      })
    },2000)
  },
  tabbarReLaunchFunc: tempObj.tabbarReLaunchFunc,
  navSwitchFunc(event){
    let newTopNavActive = [0, 0, 0];   // 初始化一个新数组
    let typeNo = event.currentTarget.dataset.typeno;   // 获取对应的typeno值
    newTopNavActive.splice(typeNo,1,1);  // 修改数组显示高亮
    this.setData({
      topnavActive: newTopNavActive,
      attentionData: this.data.data[typeNo]
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })

  }
})