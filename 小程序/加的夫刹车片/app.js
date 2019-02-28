//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('network', 'https://ec.51macc.com')
    wx.setStorageSync('username_id', 'suodesi') 
    wx.setStorageSync('appname', '加的夫刹车片') 
  },
  globalData: {
    
  }
})