// pages/login/login.js
// pages/component/tab.js
var network = wx.getStorageSync('network')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loginshow: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: '',
    dxyzm: '获取短信验证码',
    disable: 'true',
    nodx: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
      let that = this;
      console.log(wx.getStorageSync('phoneinp'))
      that.setData({
        phone: wx.getStorageSync('phoneinp')
      })
      console.log()
    },
    phone(e) {
      let that = this;
      wx.setStorageSync('phoneinp', e.detail.value)
      // console.log(wx.getStorageSync('phoneinp'))
      that.setData({
        phone: e.detail.value
      })
    },
    yzm(e) {
      let that = this;
      that.setData({
        yzm: e.detail.value
      })
    },
    /*获取短信 */
    dxyzm() {
      console.log(1)
      let that = this;
      let phone = that.data.phone
      if (phone == "" || phone == null) {
        wx.showToast({
          title: '请输入您的手机号码',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
      if (phone.match(reg) == null) {
        wx.showToast({
          title: '电话号码格式错误',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
      if (that.data.disable) {
        var userid = wx.getStorageSync('userid')
        console.log
        wx.request({
          url: network + '/Mattrio/RegeditInterface/sendMsg3',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            "userid": userid,
            "phone": phone
          },
          method: 'POST',
          success: function (re) {
            if (re.data.recode == -1) {
              wx.showToast({
                title: re.data.msg,
                icon: 'none',
                duration: 1000
              })
            } else if (re.data.recode == -2) {
              wx.showToast({
                title: re.data.msg,
                icon: 'none',
                duration: 1000
              })
            } else if (re.data.recode == -3) {
              wx.showToast({
                title: re.data.msg,
                icon: 'none',
                duration: 1000
              })
            } else if (re.data.recode == 200) {
              var timer = setInterval(run, 1000);
              var num = 60;
              function run() {
                if (num == 0) {
                  that.setData({
                    dxyzm: "获取短信验证码",
                    disable: 'true',
                    nondx: ""
                  })
                  clearInterval(timer);
                } else {
                  that.setData({
                    dxyzm: num + "秒后再次获取",
                    disable: '',
                    nondx: "true"
                  })
                  num--;
                }
              }
            }
            /*加载提示框隐藏*/
            wx.hideLoading()
          }, fail: function () {
            wx.showToast({
              title: '找件儿：获取验证码失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      } else {
        // console.log(2)
      }
    },
    btn() {
      var userid = wx.getStorageSync('userid')
      let that = this;
      if (that.data.yzm == '' || that.data.yzm == undefined || that.data.yzm == 'undefined') {
        wx.showToast({
          title: '找件儿：验证码不能为空',
          icon: 'none',
          duration: 1000
        })
        return false
      }
      wx.request({
        url: network + '/Mattrio/RegeditInterface/bindPhone',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          "yzm": that.data.yzm,
          "phone": that.data.phone,
          "userid": userid
        },
        method: 'POST',
        success: function (re) {
          console.log(re)
          if (re.data.msg == '绑定手机号码成功') {
            that.setData({
              loginshow: 1
            })
            wx.setStorageSync('phone', re.data.phone)
          } else {
            wx.showToast({
              title: '找件儿：' + re.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
          /*加载提示框隐藏*/
          wx.hideLoading()
        }, fail: function () {
          wx.showToast({
            title: '找件儿：获取验证码失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    },

  }
})
