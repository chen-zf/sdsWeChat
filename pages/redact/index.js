// pages/redact/index.js
const URL = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:'',   //头像路径
    nickname:'',   //昵称
    synopsis:'',   //个性签名
    redactDate: '',  //出生日期
    labelStr:'',   //个性标签[显示]
    labelId: '',//个性标签[提交]
    expertiseStr:'', //厨艺[显示]
    expertiseId: '',//厨艺[提交]
    sexIndex:'',   
    feelIndex:'',
    industryIndex:'',   //行业类型索引
    video_notice: '',  //视频公告
    regionNow: ['广东省', '广州市', '海珠区'],
    homeTown: '',
    mobile_phone: '',   //手机号码
    wxchat_number: '',   //微信号
    reg_email: '',    //邮箱
    Explain: '',//个人说明

    sexPicker:['保密','男','女'],  //设置性别
    feelPicker:['保密','单身','热恋','已婚','离异'],   //设置情感状态
    industryPicker:[],  //储存行业类型数组
    labelArray:[],  //个性标签数组
    expertiseArray: []  //厨艺数组

  },
  setMyheadFunc(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        var imageSrc = res.tempFilePaths[0]
        that.setData({
          imageSrc: imageSrc
        })
        console.log("****************"+imageSrc)
        var uploadTask = wx.uploadFile({
          url: "http://upload.qiniup.com/?a=1&b=2",
          filePath: imageSrc,
          name: 'uploadfile_ant',
          formData: {
            'imgIndex': 1
          },
          header: {
            "Content-Type": "multipart/form-data"
          },  
          success(res){
            console.log(res)
            wx.showToast({
              title: '上传成功',
              icon:'success',
              duration: 1000
            })
          },
          fail({errMsg}){
            console.log(errMsg)
            wx.showToast({
              title: '上传失败',
              icon: 'fail',
              duration: 1000
            })
          }
        })
      },
    })  
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      redactDate: e.detail.value
    })
  },
  bindRegionNowChange: function (e) {
    debugger;
    this.setData({
      regionNow: e.detail.value
    })
  },
  bindRegionHomeChange: function (e) {
    this.setData({
      regionHome: e.detail.value
    })
  },
  bindPickerSexChange(e){
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindPickerFeelChange(e) {
    this.setData({
      feelIndex: e.detail.value
    })
  },
  bindPickerindustryChange(e) {
    var industryPicker = this.data.industryPicker
    this.setData({
      industryIndex: e.detail.value,
      industryId: industryPicker[e.detail.value].id
    })
  },
  bindSynopsisInput(e){
    this.setData({
      synopsis: e.detail.value
    })
  },
  bindVideoNoticeInput(e){
    this.setData({
      video_notice: e.detail.value
    })
  },
  bindMobilePhoneInput(e) {
    this.setData({
      mobile_phone: e.detail.value
    })
  },
  bindWxchatNumberInput(e) {
    this.setData({
      wxchat_number: e.detail.value
    })
  },
  bindRegEmailInput(e) {
    this.setData({
      reg_email: e.detail.value
    })
  },
  bindExplainInput(e) {
    this.setData({
      Explain: e.detail.value
    })
  },
  bindTagClick(e){
    var labelStr = JSON.stringify(this.data.labelArray);
    wx.navigateTo({
      url: '../redact/tag/index?DataStr=' + labelStr+'&type=tag',
    })
  },
  bindExpertiseClick(e){
    var labelStr = JSON.stringify(this.data.expertiseArray);
    wx.navigateTo({
      url: '../redact/tag/index?DataStr=' + labelStr + '&type=expertise',
    })
  },
  bindNicknameInput(e){
    this.setData({
      nickName: e.detail.value
    })
  },
  bindHomeTownInput(e){
    this.setData({
      homeTown: e.detail.value
    })
  },
  arrayToStrFunc(array) {
    var Str = "";
    if (array && array.length > 0) {
      for (var item in array) {
        Str += array[item].name + " ";
      }
    }
    return Str;
  },
  arrayToStrIdFunc(array) {
    var Str = "";
    if (array && array.length > 0) {
      for (var item in array) {
        Str += array[item].id + ",";
      }
    }
    return Str.substring(0, Str.length - 1);
  },
  submitUserInfo(e){
      var data ={
        user_id: app.globalData.userInfo.id,
        birth: this.data.redactDate,
        nickName: this.data.nickname,
        autograph: this.data.synopsis,
        sex: this.data.sexIndex,
        label: this.data.labelId,
        feeling_status: this.data.feelIndex,
        video_descript: this.data.video_notice,
        industry_type: this.data.industryId,
        beGoodat: this.data.expertiseId,
        // province: this.area,
        // province_id: this.province_id,
        // city_id: this.city_id,
        // district_id: this.district_id,
        homeTown: this.data.homeTown,
        Phone: this.data.mobile_phone,
        wxChat_num: this.data.wxchat_number,
        Email: this.data.reg_email,
        Explain: this.data.Explain,
        // cooking_img: imgCerArrayStr
      }
    console.log(data);
    wx.request({
      url: URL.setUserInfo,
      data: data,
      success:(res=>{
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
        if (res.data.error=="0")
        {
            wx.navigateTo({
              url: '/pages/my/index',
            })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo()
  },
  // 获取用户数据
  initUserInfo(){
    var self = this;
    wx.request({
      url: URL.getUserInfo,
      data: {
        user_id: app.globalData.userInfo.id
      },
      success(res) {
        console.log(res)
        if (res.data.error=="0"){
          var dataList = res.data.data.user_info;

          //组装labelArray数组
          var labelArray = res.data.data.label;//总标签数组
          var labelSetArray = [];//已选标签
          if (dataList.label != null && dataList.label!=""){
            labelSetArray = dataList.label.split(",");
          }
          for (var items in labelArray) {
            labelArray[items].selected = false;
            if (labelSetArray.length>0){
              for (var keys in labelSetArray) {
                if (labelArray[items].id == labelSetArray[keys]) {
                  labelArray[items].selected = true;
                  break;
                }
              }
            }
          }

          //组装expertiseArray数组
          var expertiseArray = res.data.data.expertise;//总标签数组
          var expertiseSetArray = [];//已选标签
          if (dataList.expertise != null && dataList.expertise != "") {
            expertiseSetArray = dataList.expertise.split(",");
          }
          for (var items in expertiseArray) {
            expertiseArray[items].selected = false;
            if (expertiseSetArray.length > 0) {
              for (var keys in expertiseSetArray) {
                if (expertiseArray[items].id == expertiseSetArray[keys]) {
                  expertiseArray[items].selected = true;
                  break;
                }
              }
            }
          }
          var industryIndex = 0;
          var industry_type = res.data.data.industry_type;
          if (industry_type.length>0){
            for (var item in industry_type){
              if (industry_type[item].id == dataList.industry){
                break;
              }
              ++industryIndex;
            }
          }
          self.setData({
            imageSrc: dataList.head_pic,
            nickname: dataList.nickname,
            synopsis: dataList.synopsis,
            redactDate: dataList.birth == null ? "" : dataList.birth,
            sexIndex: dataList.sex,
            feelIndex: dataList.feeling,
            expertiseId: self.arrayToStrIdFunc(dataList.expertises),
            expertiseStr: self.arrayToStrFunc(dataList.expertises),
            labelId: self.arrayToStrIdFunc(dataList.labels),
            labelStr: self.arrayToStrFunc(dataList.labels),   
            video_notice: dataList.video_notice,
            wxchat_number: dataList.wxchat_number,
            mobile_phone: dataList.mobile_phone,
            reg_email: dataList.reg_email,
            Explain: dataList.user_explain,
            homeTown: dataList.city,
            industryPicker: res.data.data.industry_type,
            industryIndex: industryIndex,
            industryId: dataList.industry,
            labelArray: labelArray,
            expertiseArray: expertiseArray
          })
        }
      }
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})