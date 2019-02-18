//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('network', 'https://ec.51macc.com')
    wx.setStorageSync('username_id', 'suodesi') 
    wx.setStorageSync('appname', '索德斯查询系统')
  },
  globalData: {
    
  }
})