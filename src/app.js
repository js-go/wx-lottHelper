//app.js
const util = require('../../utils/util.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    let self = this;
    // 登录
    if (!token) {
      util.login().then((token) => {
       if (token) wx.setStorageSync('token', token);
      })
    }
 
    //  用户再去执行一些需要验证身份的动作的时候，要带上一个 
    //  Authorization 这个 Header，对应的值是 Bearer 空格后面再加上具体的 Token 的值。
    
    //  wx.request({
    //   url: `${ API_BASE }/${ API_ROUTE }`,
    //   method: 'POST',
    //   header: {
    //     'Authorization': `Bearer ${ token }`
    //   },
    //   data: {
    //     ...
    //   },
    //   success: (res) => {
      
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})