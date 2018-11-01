const BASEURL = 'https://cjxiuxiu.cn/index.php/app/'

const config = {
  getAuthorization: BASEURL + 'index/index',                // 授权接口       20180920
  getIndexData: BASEURL + 'Dynamic/index/',                // 获取首页详情    20180920
  getTheVideoDetails: BASEURL + 'Dynamic/dynamic_in',      // 获取视频详情    20180920
  setUserAttention: BASEURL + 'Dynamic/guanzhu',           // 设置用户关注    20180920
  setUserLikes: BASEURL + 'Dynamic/dianzan',               // 设置用户点赞    20180920
  setUserComment: BASEURL + 'Dynamic/pinglen',             // 设置用户评论    20180920
  getHomeBulletin: BASEURL + 'Dynamic/announcement',    // 获取首页公告    20180920
  getGiftData: BASEURL + 'Dynamic/gift',                // 获取礼物数据   20180920
  getPayData: BASEURL + 'Appletpay/getPayData',                 // 打赏调起支付    20180920
  getFollowList: BASEURL + 'Member/followList',                 // 获取关注列表    20180916
  getRecommend: BASEURL + 'Member/recommend',                   // 获取精彩推荐  20180916
  getRewardRecord: BASEURL + 'Member/reward_record',            // 获取回复感谢
  setThanks: BASEURL + 'Member/thank',            // 回复感谢内容 20180916
  getMyThanks: BASEURL + 'Member/mythank',            // 感谢打赏 20180916
  getReadMyList: BASEURL + 'Member/visitor',       //获取访客列表  20180916
  getMyData: BASEURL + 'Member/index',  // 我的 20180916
  postMyImage: BASEURL + 'Upload/imageupload', // 图片上传 20180916
  postMyVideo: BASEURL + 'Upload/uploadVideo', //视频上传 20180916
  postPublishVideo: BASEURL + 'Upload/dynamic',  //发布视频 20180916
  getUserInfo: BASEURL + 'Member/getuserinfo',  //获取用户信息
  getMyVideo: BASEURL + 'Member/myvideo',  // 我的视频  20180916
  delMyVideo: BASEURL + 'Member/deldynamic',  // 删除我的视频  20180916
  postMyTickling: BASEURL + 'Member/feedback',  // 我要反馈 20180917
  getAboutUs: BASEURL + 'Member/about_us',  // 关于餐匠 20180917
  getAssistant: BASEURL + 'Member/assistant',  // 餐匠助手 20180917
  getAnnouncement: BASEURL + 'Member/announcement',  // 餐匠公告 20180917
  getMyInfoCenter: BASEURL + 'Member/my_info_center',  // 消息中心 20180917
  getMyFansList: BASEURL + 'Member/FansList',  // 消息中心 20180917
  getGiveLikeList: BASEURL + 'Member/mypraise',  //获取我的点赞用户列表 20180917
  getVisitorList: BASEURL + 'Member/visitor',  //获取看过我的用户列表 20180921
  setApplyCooperateData: BASEURL + 'Member/Apply_cooperation',  //提交合作申请 20180917
  getMyComment: BASEURL + 'Member/mycomment',  // 获取评论  20180918
  setVideoShare: BASEURL + 'Dynamic/share',         // 设置视频分享 20180921
  postMessage: BASEURL + 'Dynamic/message',             // 留言 20180920
  getDynamicPl: BASEURL + 'Dynamic/dynamic_pinglen',         // 获取评论 20180920
  getPlDetails: BASEURL + 'Dynamic/pinglendie',         // 查看更多评论 20180925
  setUserInfo: BASEURL + 'Member/EditUserInfo', //修改用户信息 20180926
  setAddCard: BASEURL + 'Extraction/addidcard',   // 添加银行卡 20181010
  getMyWallet: BASEURL + 'Extraction/my_ballet',   // 获取银行卡 20181010
  postMyWithdraw: BASEURL + 'Extraction/withdraw',   //  提现申请
  delBankCard: BASEURL + 'Extraction/del_idcard',   //  删除银行卡
  
        
}


module.exports = config