// pages/inde/inde.js
var util = require('../../utils/util.js');
var network = wx.getStorageSync('network');
const plugin = requirePlugin("WechatSI")
const manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    nickNameshow:true,
    translateText:'',
    loginshow:1
  },

  /*语音识别  好像很牛B的样子*/
  streamRecord: function () {
    manager.start({
      lang: 'zh_CN',
    })
  },
  endStreamRecord: function () {   
    manager.stop()
  },
  initRecord: function () {
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      let text = res.result
      this.setData({
        translateText: text,
      })
    }
    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result
      if (text == '') {
        // 用户没有说话，可以做一下提示处理...
        return
      }
      // console.log(res.result)
      // console.log(text)
      this.setData({
        translateText: text.substring(0,text.length-1),
      })
      // 得到完整识别内容就可以去翻译了
      this.translateTextAction()
    }
  },
  translateTextAction: function () { },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initRecord()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    /*获取版本判断是否需要更新 */
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showToast({
        title: '新的版本下载失败',
        icon: 'none',
        duration: 1000
      })
    })

    wx.login({
      success: res => {
        var code = res.code; //返回code
        // console.log(code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: network +'/Mattrio/WeixinControllerAPP/wxRedirect',
            data: {
              "code": code,
            },
            header: {
              'content-type': 'json'
            },
            method: 'GET',
            success: function (res) {
              // console.log(res)
              var openid = res.data.openid //返回openid
              // console.log(openid)              
              wx.setStorageSync('openid', openid)
              wx.getUserInfo({
                lang: 'zh_CN ',
                success: function (res) {
                  that.setData({
                    nickName: res.userInfo.nickName,
                    nickNameshow: false
                  })
                  wx.request({
                    url: network + '/Mattrio/LoginInterface/appwxlogin',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      "openid": openid,
                      "nickname": that.data.nickName
                    },
                    method: 'POST',
                    success: function (re) {
                      wx.setStorageSync('userid', re.data.user_id)
                      // wx.setStorageSync('userid', '4927d30f-9ca7-1035-9ac6-76e82a18fca6')
                      if (re.data.phone == '' || re.data.phone.length == 0) {
                        that.setData({
                          loginshow:!1
                        })
                        return false;
                      }
                      /*加载提示框隐藏*/
                      // wx.hideLoading()
                    }, fail: function () {
                      wx.showToast({
                        title: '找件儿：请求数据失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  })
                }, fail: function (res) {
                  wx.showToast({
                    title: '请点击授权按钮',
                    icon: 'none',
                    duration: 1500
                  })
                  return false;
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '登录失败！' + res.errMsg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })

  },
  
  classify: function () {
    if (this.data.nickName == '') {
      wx.showToast({
        title: '请点击授权按钮',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.navigateTo({
      url: 'vin/vin',
    })
  },
  /*ocr*/
  ocr: function () {
    if (this.data.nickName==''){
      wx.showToast({
        title: '请点击授权按钮',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.navigateTo({
      url: '../ocr/ocr',
    })
  },
  bindGetUserInfo: function (e) {
    let that=this;
    that.setData({
      nickName: e.detail.userInfo.nickName,
      nickNameshow: false
    })
    wx.request({
      url: network + '/Mattrio/LoginInterface/appwxlogin',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "openid": wx.getStorageSync('openid'),
        "nickname": that.data.nickName
      },
      method: 'POST',
      success: function (re) {
        wx.setStorageSync('userid', re.data.user_id)
        // console.log(wx.getStorageSync('userid'))     
        if (re.data.phone == '' || re.data.phone.length == 0) {
          that.setData({
            loginshow: !1
          })
          return false;
        }
        /*加载提示框隐藏*/
        // wx.hideLoading()
      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let that = this;
    return {
      title: '找件儿',
      imageUrl:'/pages/image/car.jpg',
      path: '/pages/inde/inde'
    }
  }
})