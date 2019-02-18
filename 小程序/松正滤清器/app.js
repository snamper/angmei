//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('network', 'https://ec.51macc.com')
    wx.setStorageSync('username_id', 'songzheng') 
    wx.setStorageSync('appname','松正滤清器查询系统') 
  },
  globalData: {
    
  }
})