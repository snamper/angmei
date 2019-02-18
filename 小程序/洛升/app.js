//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('network', 'https://ec.51macc.com')
    wx.setStorageSync('username_id', 'luosheng') 
    wx.setStorageSync('appname', '中国·洛升查询系统') 
  },
  globalData: {
    
  }
})