// pages/redact/tag/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:[],
    sumNum:3,//可选总标签
    setNum:0,  //选中的标签
    labelType:'',
    flag:true

  },
  bindLiClick(e){
    var index = e.currentTarget.dataset.index;
    var dataArray = this.data.dataArray;
    var setNum = this.data.setNum;
    if (dataArray[index].selected){
      dataArray[index].selected = false;
      this.setData({
        flag: true,
      })
      setNum--
    }else{
      if (this.data.sumNum - this.data.setNum <0){
        this.setData({
          flag: false,
        })
      }
      dataArray[index].selected = true;
      setNum++
    } 
    this.setData({
      dataArray: dataArray,
      setNum: setNum,
    })
  },
  sumbitTag(e){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var labelStr = "";
    var labelId = "";
    var dataArray = this.data.dataArray;
    if (dataArray.length>0){
      for (var item in dataArray){
        if (dataArray[item].selected){
          labelStr+=dataArray[item].name+' ';
          labelId += dataArray[item].id+',';
        }
      }
      labelStr = labelStr.substring(0, labelStr.length-1);
      labelId = labelId.substring(0, labelId.length - 1)
    }
    switch (this.data.labelType){
      case "tag":
        prevPage.setData({
          labelStr: labelStr,
          labelId: labelId,
          labelArray: dataArray
        })
        break;
      case "expertise":
        prevPage.setData({
          expertiseStr: labelStr,
          expertiseId: labelId,
          expertiseArray: dataArray
        })
        break;
      default:
        wx.navigateBack({
          url: '../redact/index'
        })
    }  
    wx.navigateBack({
      url:'../redact/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataArray = JSON.parse(options.DataStr);
    var sumNum = dataArray.length;
    var setNum = 0;
    for (var item in dataArray){
      if (dataArray[item].selected){
        setNum++
      }
    }
    this.setData({
      dataArray: dataArray,
      setNum: setNum,
      labelType: options.type
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