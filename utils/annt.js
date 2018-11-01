const jsanntq = {
  checkTel(tel) {
    var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!pattern.test(tel) || tel == "") {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      })
      return true
    }
  },
  checkBankCard(card) {
    var pattern = /^([1-9]{1})(\d{15}|\d{18})$/
    if (!pattern.test(card) || card == '') {
      wx.showToast({
        title: '请输入正确的银行卡号',
        icon: "none"
      })
      return true
    }
  },
  checkUserName(name) {
    if (name == '') {
      wx.showToast({
        title: '请输入正确的持卡人',
        icon: "none"
      })
      return true
    }
  },
  checkBankName(name) {
    if (name == '') {
      wx.showToast({
        title: '请输入正确的银行',
        icon: "none"
      })
      return true
    }
  },
  getBankIconUrl(bankName) {
    var result = ''
    switch (bankName) {
      // 中国银行 BOC
      case 'BOC':
        result = '../../image/bank/bank-01.png'
        break;
      // 中国工商银行 
      case 'ICBC':
        result = '../../image/bank/bank-02.png'
        break;
      // 华夏银行 
      case 'HXBANK':
        result = '../../image/bank/bank-03.png'
        break;
      // 中国交通银行
      case 'COMM':
        result = '../../image/bank/bank-04.png'
        break;
      // 广东省农村信用社联合社 
      case 'GDRCC':
        result = '../../image/bank/bank-05.png'
        break;
      // 中国农业银行
      case 'ABC':
        result = '../../image/bank/bank-06.png'
        break;
      // 浦东发展银行
      case 'SPDB':
        result = '../../image/bank/bank-08.png'
        break;
      // 中国光大银行
      case 'CEB':
        result = '../../image/bank/bank-09.png'
        break;
      // 中国建设银行
      case 'CCB':
        result = '../../image/bank/bank-10.png'
        break;
      // 中国民生银行
      case 'CMBC':
        result = '../../image/bank/bank-11.png'
        break;
      // 中国邮政
      case 'PSBC':
        result = '../../image/bank/bank-12.png'
        break;
      // 招商银行
      case 'CMB':
        result = '../../image/bank/bank-13.png'
        break;
      default:
        result = '../../image/bank/bank-00.png'
    }
    return result
  }
}

module.exports = jsanntq