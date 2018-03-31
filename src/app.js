//app.js
const util = require('../../utils/util.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

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
                  wx.request({
                    url: '', // 要使用https的api接口
                    method: 'post',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      encryptedData: res.encryptedData, 
                      iv: res.iv, 
                      code: code
                    },
                    success: _getUserInfo
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

    // 解密成功后 获取自己服务器返回的结果
    function _getUserInfo(res) {
      
    }
  },
  globalData: {
    userInfo: null
  }
})