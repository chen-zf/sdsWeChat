// pages/publish_video/publish_video.js、
const URL = require('../../config.js')
const utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioTypeItem:[
      { typ: 1,value: '厨艺', checked: 'true'},
      { typ: 2,value: '秀美食'},
      { typ: 3,value: '设备' },
      { typ: 4,value: '品牌' },
    ],
    radioPurposeItems:[
      [
        { name: 'show', value: '秀一秀', checked: 'true' },
        { name: 'work', value: '找工作' },
      ],
      [],
      [
        { name: 'show', value: '秀设备', checked: 'true' },
        { name: 'sell', value: '卖设备' },
        { name: 'benefit', value: '专利让利' },
      ],
      [
        { name: 'show', value: '秀一秀', checked: 'true' },
        { name: 'add', value: '招商加盟' },
      ]
    ],
    ccieData:[],
    detailsData:[],
    TypeStr:1,
    publishFlag:false,
    windowOpen:false,
    title: '',
    content: '',
    purpose: '秀一秀',
    score:1,
    name:'',
    store_name:'',
    imgUrl: '',
    videoUrl: '',
    isdisabled:true,
    isUploadImg: true,
    isUploadVideo: true
  },
  bindTitleInput(e){
    this.setData({
      title: e.detail.value
    })
  },
  bindContentInput(e){
    this.setData({
      content: e.detail.value
    })
  },
  // 上传图片事件
  uploadImageFunc(){
    var self = this
    if (self.data.isUploadImg){
      wx.chooseImage({
        count: 1,
        success(res) {
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          self.setData({
            imgUrl: '',
            isUploadImg: false
          })
          wx.uploadFile({
            url: URL.postMyImage,
            filePath: tempFilePaths[0],
            name: 'file',
            header: { "Content-Type": "multipart/form-data" },
            success(res) {
              const data = res.data
              if (data.indexOf('上传失败') > -1) {
                wx.showToast({
                  title: data,
                  icon: 'none'
                })
                self.setData({
                  isUploadImg: true
                })
              } else {
                self.setData({
                  imgUrl: data,
                  isUploadImg: true
                })
                self.isdisabledFunc()
              }
            }
          })
        }
      })
    }else{
      wx.showToast({
        title: '正在上传图片，请稍等',
        icon: 'none'
      })
    }
  },
  // 上传多图片事件
  uploadImagesFunc(e) {
    var self = this
    if (self.data.isUploadImg) {
      var _count = 8
      var _dataTyp = e.currentTarget.dataset
      if (_dataTyp.typ == "details") {
        _count = 8 - self.data.detailsData.length
      } else if (_dataTyp.typ == "ccie") {
        _count = 8 - self.data.ccieData.length
      }
      if(_count<1){
        wx.showToast({
          title: '最多可上传8张图片',
          icon: 'none'
        })
        return
      }
      wx.chooseImage({
        count: _count,
        success(res) {
          const tempFilePaths = res.tempFilePaths
          self.setData({
            isUploadImg: false
          })
          self.isdisabledFunc()
          for (let i = 0, leng = tempFilePaths.length; i<leng; i++){
            wx.uploadFile({
              url: URL.postMyImage,
              filePath: tempFilePaths[i],
              name: 'file',
              header: { "Content-Type": "multipart/form-data" },
              success(res) {
                const data = res.data
                if (data.indexOf('上传失败') > -1) {
                  wx.showToast({
                    title: data,
                    icon: 'none'
                  })
                } else {
                  var _obj = {}
                  var dataLen = 0
                  if (_dataTyp.typ == "details") {
                    var _detailsData = self.data.detailsData
                    _detailsData.push(data)
                    dataLen = _detailsData.length
                    _obj = {
                      detailsData: _detailsData
                    }
                  } else if (_dataTyp.typ == "ccie") {
                    var _ccieData = self.data.ccieData
                    _ccieData.push(data)
                    dataLen = _ccieData.length
                    _obj = {
                      ccieData: _ccieData
                    }
                  }
                  self.setData(_obj)
                  if (dataLen == leng) {
                    self.setData({
                      isUploadImg: true
                    })

                  }
                  self.isdisabledFunc()
                }

              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '正在上传图片，请稍等',
        icon: 'none'
      })
    }
  },
  // 上传视频事件
  uploadVideoFunc(){
    var self =this
    if (self.data.isUploadVideo){
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          self.setData({
            videoUrl: '',
            isUploadVideo: false
          })
          if (res.duration > 60) {
            wx.showToast({
              title: '视频最长时间为60秒',
              icon: 'none'
            })
            return
          }
       
          const tempFilePath = res.tempFilePath
          console.log(tempFilePath)
          wx.uploadFile({
            url: URL.postMyVideo,
            filePath: tempFilePath,
            name: 'file',
            header: { "Content-Type": "multipart/form-data" },
            success(res) {
              const data = res.data
              if(data.indexOf('上传失败')>-1){
                wx.showToast({
                  title: data,
                  icon: 'none'
                })
              }else{
                self.setData({
                  videoUrl: data,
                  isUploadVideo: true
                })
                self.isdisabledFunc()
              }
              
            }
          })
        }
      })
    }else{
      wx.showToast({
        title: '正在上传视频，请稍等',
        icon: 'none'
      })
    }
    
  },

  // 发布按钮禁用判断事件
  isdisabledFunc() {
    var isdisabled = true
    if (this.data.isUploadImg && this.data.imgUrl.length > 0 && this.data.videoUrl.length > 0) {
      isdisabled = false
    }
    this.setData({
      isdisabled: isdisabled
    })
  },
  // 发布视频事件
  publishVideoFunc(){
    this.setData({
      isdisabled: true
    })
    var sendData = {
      uid: app.globalData.userInfo.id,
      title: this.data.title,
      content: this.data.content,
      types: this.data.TypeStr,
      image: this.data.imgUrl,
      video: this.data.videoUrl,
      certificate: this.data.ccieData.join(","),
      imgs: this.data.detailsData.join(",")
      
    }
    if(this.data.TypeStr==2){
      sendData.score = this.data.score
      sendData.name = this.data.name
      sendData.store_name = this.data.store_name
    }else{
      sendData.purpose = this.data.purpose 
    }
    var self = this
    wx.request({
      url: URL.postPublishVideo,
      data: sendData,
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success(res){
        console.log(res)
        if(res.data.info.indexOf('发布成功')>-1){
          self.setData({
            TypeStr: 1,
            publishFlag: false,
            windowOpen: false,
            title: '',
            content: '',
            purpose: '秀一秀',
            score: 1,
            name: '',
            store_name: '',
            imgUrl: '',
            videoUrl: '',
            isdisabled: true,
            isUploadImg: true,
            isUploadVideo: true
          })
          wx.navigateTo({
            url: '/pages/myvideo/index'
          })
        }else{
          wx.showToast({
            title: res.data.info,
            icon: 'none'
          })
        
        }
      }
    })
  },
  // 发布目的事件
  radioChangeGoal(e){
    console.log(e.detail.value)
    this.setData({
      purpose: e.detail.value
    })
  },
  // 发布类型事件
  radioChange:function(e){
    var val = e.detail.value
    var flag = true;
    var purpose = ''
    if (val==1){
      flag=false
    }
    if(val!=2){
      purpose = this.data.radioPurposeItems[val-1][0].value
      console.log(purpose)
    }
    this.setData({
      TypeStr: val,
      publishFlag: flag,
      purpose: purpose,
      imgUrl: '',
      videoUrl: '',
      ccieData: [],
      isUploadImg: true,
      isUploadVideo: true,
      detailsData: [],
    })
    this.isdisabledFunc()

  },
  // 美食评分事件
  starClickFunc:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      score: index
    })
  },
  minePublishFunc:function(){
    this.setData({
      publishFlag: false
    })
  },
  openWindowFunc:function(){
    this.setData({
      windowOpen: true
    })
  },
  closeWindowFunc: function () {
    this.setData({
      windowOpen: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
})