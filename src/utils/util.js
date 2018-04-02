const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          let code = res.code;
          wx.getUserInfo({
            success: (res) => {
              wx.setStorageSync('userInfo', res.userInfo);
              wx.request({
                url: 'https://holdrop.com/api/v1/loginByWeixin',
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: code
                },
                success: (token) => {
                  resolve(token);
                }
              })
            }
          });
        } else {
          reject(null);
        }
      }
    });
  });
};

module.exports = {
  formatTime: formatTime,
  login: login
}