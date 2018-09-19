const BASEURL = 'http://cjxiuxiu.cn/index.php/app/'

const config = {
  getAuthorization: BASEURL + 'index/index',                // 授权接口
  getIndexData: BASEURL + 'Dynamic/index/',                // 获取首页详情
  getTheVideoDetails: BASEURL + 'Dynamic/dynamic_in',      // 获取视频详情
  setUserAttention: BASEURL + 'Dynamic/guanzhu',           // 设置用户关注
  setUserLikes: BASEURL + 'Dynamic/dianzan',               // 设置用户点赞
  setUserComment: BASEURL + 'Dynamic/pinglen',             // 设置用户评论
  getHomeBulletin: BASEURL + 'Dynamic/announcement',    // 获取首页公告    
  getGiftData: BASEURL + 'Dynamic/gift',                // 获取礼物数据   
  getPayData: BASEURL + 'Appletpay/getPayData',                 // 打赏调起支付   
  getFollowList: BASEURL + 'Member/followList',                 // 获取关注列表   
  getRecommend: BASEURL + 'Member/recommend',                   // 获取精彩推荐  6 
  getRewardRecord: BASEURL + 'Member/reward_record',            // 获取回复感谢
  setThanks: BASEURL + 'Member/thank',            // 回复感谢内容
  getMyThanks: BASEURL + 'Member/mythank',            // 感谢打赏 6
  getReadMyList: BASEURL + 'Member/visitor',       //获取访客列表 
  getMyData: BASEURL + 'Member/index',  // 我的 6
  postMyImage: BASEURL + 'Upload/imageupload', // 图片上传 6
  postMyVideo: BASEURL + 'Upload/uploadVideo', //视频上传 6
  postPublishVideo: BASEURL + 'Upload/dynamic',  //发布视频 6
  getUserInfo: BASEURL + 'Member/getuserinfo',  //获取用户信息
  getMyVideo: BASEURL + 'Member/myvideo',  // 我的视频  6
  delMyVideo: BASEURL + 'Member/deldynamic',  // 删除我的视频  6
  postMyTickling: BASEURL + 'Member/feedback',  // 我要反馈 20180917
  getAboutUs: BASEURL + 'Member/about_us',  // 关于餐匠 20180917
  getAssistant: BASEURL + 'Member/assistant',  // 餐匠助手 20180917
  getAnnouncement: BASEURL + 'Member/announcement',  // 餐匠公告 20180917
  getMyInfoCenter: BASEURL + 'Member/my_info_center',  // 消息中心 20180917
  getMyFansList: BASEURL + 'Member/FansList',  // 消息中心 20180917
  getGiveLikeList: BASEURL + 'Member/mypraise',  //获取我的点赞用户列表 20180917
  setApplyCooperateData: BASEURL + 'Member/Apply_cooperation',  //提交合作申请 20180917
  getMyComment: BASEURL + 'Member/mycomment',  // 获取评论  20180918
        
}


module.exports = config