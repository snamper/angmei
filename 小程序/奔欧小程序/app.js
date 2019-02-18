//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('network', 'https://ec.51macc.com')
    wx.setStorageSync('username_id', 'bengou') 

  },
  globalData: {
    
  }
})