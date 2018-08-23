// pages/person_information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modlueArray:[
      {
        text:"基本信息",
        imgSrc:"../../image/icon/personImfor_check_bq1.png",
        active:true,
        type:"basic"
      },
      {
        text: "更多信息",
        imgSrc: "../../image/icon/personImfor_bq2.png",
        active: false,
        type: "more"
      },
      {
        text: "视频动态",
        imgSrc: "../../image/icon/personImfor_bq3.png",
        active: false,
        type: "videos"
      }
    ],
    personType:"basic"
  },
  TurnClickFunc:function(e){
    var index = e.currentTarget.dataset.num;
    var modlueArray = this.data.modlueArray;
    var personType = "";
    for (var i = 0; i < modlueArray.length;i++){
      if (i==index){
        modlueArray[i].active=true;
        modlueArray[i].imgSrc = "../../image/icon/personImfor_check_bq" + (i + 1) +".png";
        personType = modlueArray[i].type
      }else{
        modlueArray[i].active = false;
        modlueArray[i].imgSrc = "../../image/icon/personImfor_bq" + (i + 1) + ".png";
      }
    }
    this.setData({
      modlueArray: modlueArray
    })
    if (personType!="")
    {
      this.setData({
        personType: personType
      })
    }

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