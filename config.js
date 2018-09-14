const BASEURL = 'http://cjxiuxiu.cn/index.php/app/'

const config = {
  getIndexData: BASEURL + 'Dynamic/index/',
  getTheVideoDetails: BASEURL + 'Dynamic/dynamic_in',      // 获取视频详情
  setUserAttention: BASEURL + 'Dynamic/guanzhu',           // 设置用户关注
  setUserLikes: BASEURL + 'Dynamic/dianzan',               // 设置用户点赞
  setUserComment: BASEURL + 'Dynamic/pinglen',             // 设置用户评论
  getHomeBulletin: BASEURL + 'Dynamic/announcement',    // 获取首页公告    
  getGiftData: BASEURL + 'Dynamic/gift',                // 获取礼物数据   
  getPayData: BASEURL + 'Appletpay/getPayData',                 // 打赏调起支付   
  getFollowList: BASEURL + 'Member/followList',                 // 获取关注列表   
  getRecommend: BASEURL + 'Member/recommend',                   // 获取精彩推荐 
  getRewardRecord: BASEURL + 'Member/reward_record',            // 获取回复感谢
  setThanks: BASEURL + 'Member/thank',            // 回复感谢内容
  getMyThanks: BASEURL + 'Member/mythank',            // 感谢打赏
  getReadMyList: BASEURL + 'Member/visitor',       //获取访客列表
  getMyData: BASEURL + 'Member/index',  // 我的
  postMyImage: BASEURL + 'Upload/imageupload', // 图片上传
  postMyVideo: BASEURL + 'Upload/uploadVideo', //视频上传
  postPublishVideo: BASEURL + 'Upload/dynamic',  //发布视频
  getUserInfo: BASEURL + 'Member/getuserinfo',  //获取用户信息
                
}


module.exports = config