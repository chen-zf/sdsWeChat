// pages/play-video/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsData:{},
    getPlayVideoData: [],
    isAttention: 0,
    selectTyp: 2,
    plData:[],
    certificate:[],
    detailsImg:[],
    page:1,
    totalPage: 1,
    focus: false,
    isreply: false,
    sendVal:'',
    isAttention: 0,
    isDianZan: 0,     // 是否为视频点赞
    likesNum: 0,      //  视频点赞数
    myPlaceholderVal:'输入您想说的...',
    messageNameVal: '',
    messageTelVal:'',
    textareaVal:'', 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showShareMenu({
      withShareTicket:true,
      success(res){
        console.log(res)
      }
    })
    this.getTheVideoDetails(options.did, options.pid,1)
    this.setData({
      optionsData: options
    })
  },
  onShow(options){
    app.authorizationFunc()
    this.setData({
      page: 1
    })
    this.getPlContent()
  },
  getTheVideoDetails(did, pid, page) {
    var self = this
    wx.request({
      url: URL.getTheVideoDetails,
      data: {
        did: did,
        id: app.globalData.userInfo.id,
        page: page,
        pid: pid
      },
      success(res){
        console.log(res.data.data)
        var _data = res.data.data
        self.setData({
          getPlayVideoData: _data,
          isAttention: _data.guanzhu,
          certificate: _data.certificate ? _data.certificate.split(","):[],
          detailsImg: _data.imgs ? _data.imgs.split(","):[],
          isAttention: _data.guanzhu,
          isDianZan: _data.dianzan,     
          likesNum: _data.likes, 
        })
      }
    })
  },
  followFunc(){
     var self = this
    console.log(self.data.optionsData)
      wx.request({
        url: URL.setUserAttention,
        data: {
          id: app.globalData.userInfo.id,
          pid: self.data.optionsData.pid
        },
        success(res){
          console.log(res.data.info)
          var isAttention = 0
          res.data.info&&res.data.info.indexOf("关注成功") > -1 ?isAttention = 1 : isAttention = 0
          self.setData({
            isAttention: isAttention
          })
        }
      })
  },  
  // 详情和评论
  selectFunc(e){
    this.setData({
      selectTyp: e.currentTarget.dataset.typ
    })
  },
  // 留言板
  messageNameValFunc(e) {
    this.setData({
      messageNameVal: e.detail.value
    })
  },
  messageTelValFunc(e) {
    this.setData({
      messageTelVal: e.detail.value
    })
  },
  textareaFunc(e) {
    this.setData({
      textareaVal: e.detail.value
    })
  },
  postMessageFunc(){
    var self = this
    wx.request({
      url: URL.postMessage,
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        user_id: app.globalData.userInfo.id,  //用户id
        name: self.data.messageNameVal, //真实姓名
        phone: self.data.messageTelVal, //联系电话
        content: self.data.textareaVal, // 内容
        pid: self.data.optionsData.pid,     //视频用户id
        did: self.data.optionsData.did,     //视频id
      },
      success(res){
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
        self.setData({
          messageNameVal: '',
          messageTelVal: '',
          textareaVal: ''
        })
      }
    })
  },
  // 获取视频评论 
  getPlContent() {
    var self = this
    wx.request({
      url: URL.getDynamicPl,
      data: {
        did: self.data.optionsData.did,
        id: app.globalData.userInfo.id,
        page: self.data.page,
        pid: self.data.optionsData.pid,
        heat:1   // 1 按时间   0按热度
      },
      success(res){
        console.log(res)
        self.setData({
          plData: self.data.plData.concat(res.data.data.ping),
          totalPage: res.data.data.pagecount
        })
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  // 失去焦点重置回复
  initInputValFunc(val){
    this.setData({
      sendVal: '',
      isreply: false,
      focus: false,
      myPlaceholderVal: '输入您想说的...'
    })
  },
  replyVideoFuncA(val) {
    this.setData({
      sendVal: '',
      isreply: false,
      focus: true,
      myPlaceholderVal: '输入您想说的...'
    })
  },
  // 获取输入值
  bindinputFunc(e){
    this.setData({
      sendVal: e.detail.value 
    })
  },
  bindblurFunc(e){
    // this.initInputValFunc(e.detail.value)
  },
  // 发送评论
  sendplFunc(){
    var self = this 
    var sendVal = self.data.sendVal
    if (sendVal.length < 1) {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return;
    }
    var obj = {
      content: sendVal,
      id: app.globalData.userInfo.id,
      act_id: self.data.optionsData.did,
    }
    console.log(self.data.isreply)
    if (self.data.isreply) {
      obj = {
        content: sendVal,
        id: app.globalData.userInfo.id,
        act_id: self.data.optionsData.did,
        pid: self.data.replayObj.pid,
        npingre: self.data.replayObj.npingre,
        uidt: self.data.replayObj.uidt
      }
    }
    wx.request({
      url: URL.setUserComment,
      method:"POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:obj,
      success(res){
        self.initInputValFunc('')
        self.setData({
          page:1,
          plData:[]
        })
        self.getPlContent()
      }

    })
  },
  // 触摸用户评论实现回复
  totouchstartFunc(event){
    var _data = event.currentTarget.dataset
    console.log(_data)
    this.setData({
      replayObj : {
        pid: _data.pid,         //评论id
        uidt: _data.uid,       //被评论者
        npingre: _data.pingre
      },
      isreply : true,
      focus: true,
      myPlaceholderVal: "@ " + _data.pingre
    })
  },
  // 点赞   0 动态  1 评论
  likeFunc(e){
    var self = this
    var _data = e.currentTarget.dataset
    wx.request({
      url: URL.setUserLikes,
      data:{
        did: _data.did,
        type: _data.type,
        id: app.globalData.userInfo.id,
        pid: self.data.optionsData.pid
      },
      success(res){
        var _obj = {}
        if (res.data.info.includes('点赞成功')){
          if (_data.type==0){
            _obj = {
              isDianZan: 1,
              likesNum: self.data.likesNum+1, 
            }
          }else{
            var _index = _data.index
            var _plData = self.data.plData
            _plData[_index].dianzan = 1
            ++_plData[_index].zan
            _obj = {
              plData: _plData
            }
          }
        }else{
          if (_data.type == 0) {
            _obj = {
              isDianZan: 0,
              likesNum: self.data.likesNum - 1 ,
            }
          } else {
            var _index = _data.index
            var _plData = self.data.plData
            _plData[_index].dianzan = 0
            --_plData[_index].zan 
            _obj = {
              plData: _plData
            }
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
  // 关注用户
  followFunc(){
    var self = this
    wx.request({
      url: URL.setUserAttention,
      data:{
        //id传用户id
        //pid传被关注用户id
        id: app.globalData.userInfo.id,
        pid: self.data.optionsData.pid 
      },
      success(res){
        var _isAttention = 0
        res.data.info.indexOf('关注成功') > -1 ? (_isAttention = 1) : ( _isAttention = 0);
        self.setData({
          isAttention: _isAttention
        })
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
      }
    })
  },
  // 分享转发
  getShareInfo(){
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1,
      listData: []
    })
    this.getPlContent()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = ++this.data.page
    console.log("111111" + this.data.totalPage)
    console.log("222222"+this.data.page)
    if (this.data.page <= this.data.totalPage) {
      this.setData({
        page: page
      })
      this.getPlContent()
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },
  // 分享
  onShareAppMessage: function () {
    var self = this
    console.log(self.data.optionsData.pid)
    console.log(self.data.optionsData.did)  
    return {
      title: self.data.getPlayVideoData.title,
      path: '/pages/play-video/index?pid=' + self.data.optionsData.pid + '&did=' + self.data.optionsData.did,
      success: function(res) {
        wx.request({
          url: URL.setVideoShare,
          data:{
            did: self.data.optionsData.did
          },
          success(res){
            wx.showToast({
              title: '转发成功',
              icon: 'none'
            })
          }
        })
        
      },
      fail(res){
        wx.showToast({
          title: '转发失败',
          icon: 'none'
        })
      }
    }
  },
})