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
    wx.checkSession({
      fail: function() {
        // session_key过期
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              let code = res.code;
              wx.getUserInfo({
                success: (res) => {
                  self.globalData.userInfo = res.userInfo;
                  wx.setStorageSync('userInfo', res.userInfo);
                  // 用于注册用户
                  wx.request({
                    url: 'https://域名/loginByWechat', // 要使用https的api接口
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      encryptedData: res.encryptedData, 
                      iv: res.iv, 
                      code: code
                    },
                    success: _loginToken
                  })
                }
              });
            } else {
              // 登录失败
            }
          }
        })
      }
    });
    function _loginToken(token) {
      // save token
      wx.setStorageSync('token', token);
      // 返回token，下次用户再去执行一些需要验证身份的动作的时候，要带上一个 
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
    }
  },
  globalData: {
    userInfo: null
  }
})
