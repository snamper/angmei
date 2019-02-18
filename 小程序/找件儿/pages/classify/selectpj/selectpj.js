// pages/classify/selectpj/selectpj.js
var userid = wx.getStorageSync('userid')
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    carname:"",
    caryear:"",
    cartype:"",
    caroutput:"",
    mikey: '',
    pjzl: [
      { name: "底盘部分", categoryid:'A'},
      { name: "发动机与变速器", categoryid: 'B'},
      { name: "车身部分", categoryid: 'C'},
      { name: "电器及照明系统", categoryid: 'D'},
      { name: "内外饰部分", categoryid: 'E'},
      { name: "工具", categoryid: 'F'},
      { name: "辅料项目", categoryid: 'G'}
      ],
    pjpl:[
      { category_name: "请先选择配件总类" }
    ],
    xzpj: [
      { category_name: "请先选择配件品类" }
    ],
    pjzlnum:'',
    pjplnum:''

  },
  /*配件选择*/
  pjclick:function(e){
     let that=this;
     that.setData({
       num: e.currentTarget.dataset.index
     })
  },
  bindchange:function(e){
     let that=this;
     that.setData({
       num: e.detail.current
     })
  },
  /*配件总类列表点击*/
  zllistclick:function(re){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network +'/Mattrio/ProductInterface/getCategory2',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        "categoryid": re.currentTarget.dataset.text,
        "mikey": that.data.mikey,
        "userid": userid
      },
      method: 'POST',
      success:function(e){
        wx.hideLoading()
        if (e.data.list == [] || e.data.list.length==0){
          that.setData({
            num: '1',
            pjpl: [{category_name: "暂无数据" }],
            pjzlnum: re.currentTarget.dataset.text
          })
        }else{
          that.setData({
            num: '1',
            pjpl: e.data.list,
            pjzlnum: re.currentTarget.dataset.text
          })
        }
      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /*配件品类list点击*/
  pllistclick:function(re){
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network + '/Mattrio/ProductInterface/getCategory3',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "categoryid": re.currentTarget.dataset.text,
        "mikey": that.data.mikey,
        "userid": userid
      },
      method: 'POST',
      success: function (e) {
        wx.hideLoading()
        if (e.data.list == [] || e.data.list.length == 0) {
          that.setData({
            num: '2',
            xzpj: [{ category_name: "暂无数据" }],
            pjplnum: re.currentTarget.dataset.text
          })
        } else {
          that.setData({
            num: '2',
            xzpj: e.data.list,
            pjplnum: re.currentTarget.dataset.text
          })
        }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    let that=this;
    that.setData({
      carname: options.car,
      caryear: options.year,
      cartype: options.cartype,
      caroutput: options.output,
      mikey: options.mikey
    })
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
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '找件儿',
      imageUrl: '/pages/image/car.jpg',
      path: '/pages/inde/inde'
    }
  }
})