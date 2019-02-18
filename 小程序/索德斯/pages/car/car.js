// pages/car/car.js
var wxaSortPicker = require('../../utils/wxaSortPicker/wxaSortPicker.js');
var network = wx.getStorageSync('network');
var username_id = wx.getStorageSync('username_id');
var base = require('../../utils/base.js');
var appname = wx.getStorageSync('appname');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    vague: '',
    oe: '',
    vin: '',
    logolist: [
      {
        name: '奥迪(一汽奥迪)',
        src: 'aodi.jpg'
      }, {
        name: '宝马(华晨宝马)',
        src: 'baoma.jpg'
      }, {
        name: '奔驰(北京奔驰)',
        src: 'benchi.jpg'
      }, {
        name: '别克(上汽通用)',
        src: 'bieke.jpg'
      }, {
        name: '大众(一汽大众)',
        src: 'dazhong.jpg'
      }, {
        name: '福特(长安福特马自达)',
        src: 'fute.jpg'
      }
    ],
    car: '',/*主机厂 */
    carshow: true,/*主机厂显示与否 */
    cartype: '',/*车型 */
    cartypelist: '',/*车型列表 */
    cartypeshow: false,/*车型显示与否 */
    year: '',/*年份 */
    yearshow: false,/*年份显示与否 */
    yearlist: '',/*年份列表显示与否 */
    outputshow: false,/*排量显示与否 */
    outputlist: '',/*排量列表 */
    fenlei: '',/*分类 */
    fenleilist: '',
    flindex: 999,
    fenleishow: false
  },
  /*tab切换点击 */
  tabclick(e) {
    // console.log(e)
    let that = this;
    that.setData({
      num: e.target.dataset.num
    })
  },
  /*swiper事件 */
  swiperchange(e) {
    let that = this;
    that.setData({
      num: e.detail.current
    })
  },
  /*模糊查询 */
  vagueinput(e) {
    let that = this;
    if (e.detail.value == '') {
      that.setData({
        vagueshow: false,
        carshow: true
      })
    }
    that.setData({
      vague: e.detail.value
    })
  },
  vagueclick(e) {
    let that = this;
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/LikeQueryIntface/LikeQueryLongCars', 'POST',
      {
        brand_id: username_id,
        query_str: that.data.vague
      },
      function (ev) {
        /*隐藏 loading 提示框 */
        wx.hideLoading()
        that.setData({
          vaguelist: ev.data.list,
          vagueshow: true,
          carshow: false,
          fenleishow: true
        })
      }
    )
  },
  mohuclick(e) {
    let that = this;
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/SelectLongCarIntface/getProducts', 'POST',
      {
        "brand_id": username_id,
        "category_id": that.data.fenlei,
        "Year": e.target.dataset.year,
        "Manufacture": e.target.dataset.car,
        "Vehicle_Name": e.target.dataset.cartype,
        "Capacity": e.target.dataset.output
      },
      function (ev) {
        /*隐藏 loading 提示框 */
        wx.hideLoading()
        if (ev.data.list == [] || ev.data.list.length == 0) {
          base.showToast('暂无数据', 'none', 1e3)
          return false;
        }
        wx.setStorageSync('datalist', JSON.stringify(ev.data.list))
        wx.navigateTo({
          url: '../list/list'
        })
      }
    )
  },
  /*分类点击 */
  fenleiclick(e) {
    let that = this
    // console.log(e.target.dataset.index)
    that.setData({
      flindex: e.target.dataset.index,
      fenlei: "\'" + e.target.dataset.fenlei + "\'"
    })
    // console.log(that.data.fenlei)
  },
  /*VIN查询 */
  vininput(e) {
    let that = this;
    // console.log(e)
    that.setData({
      vin: e.detail.value
    })
  },
  vinclick() {
    let that = this;
    base.VIN(that, username_id, that.data.vin)
  },
  /*ocr */
  ocr() {
    wx.navigateTo({
      url: '../ocr/ocr?source=2',
    })
  },
  /*oe查询 */
  oeinput(e) {
    let that = this;
    // console.log(e)
    that.setData({
      oe: e.detail.value
    })
  },
  oeclick() {
    let that = this;
    /*oe查询 */
    base.OE(that, username_id, that.data.oe)
  },
  /*主机厂点击 */
  wxaSortPickerItemTap(e) {
    let that = this;
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/SelectLongCarIntface/getVehicleName', 'POST',
      {
        'brand_id': username_id,
        'Manufacture': e.target.dataset.text
      },
      function (ev) {
        /*隐藏 loading 提示框 */
        wx.hideLoading()
        that.setData({
          scar: true,
          car: e.target.dataset.text,
          carshow: false,
          cartypeshow: true,
          cartypelist: ev.data,
          num: 0
        })
      }
    )
  },
  /** */
  /*车型点击 */
  cartypeclick(e) {
    let that = this;
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/SelectLongCarIntface/getYear', 'POST',
      {
        'brand_id': username_id,
        'Manufacture': that.data.car,
        'Vehicle_Name': e.target.dataset.text
      },
      function (ev) {
        /*隐藏 loading 提示框 */
        wx.hideLoading()
        that.setData({
          cartype: e.target.dataset.text,
          cartypeshow: false,
          yearshow: true,
          yearlist: ev.data,
          num: 0
        })
      }
    )
  },
  /*年份点击 */
  yearclick(e) {
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    base.request('/MattrioEcModel/SelectLongCarIntface/getCapacity', 'POST',
      {
        'brand_id': username_id,
        'Year': e.target.dataset.text,
        'Manufacture': that.data.car,
        'Vehicle_Name': that.data.cartype
      },
      function (ev) {
        /*隐藏 loading 提示框 */
        wx.hideLoading()
        that.setData({
          year: e.target.dataset.text,
          yearshow: false,
          outputshow: true,
          outputlist: ev.data,
          num: 0
        })
      }
    )
  },
  /*排量点击 */
  outputclick(e) {
    let that = this;
    /*显示 loading 提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/SelectLongCarIntface/getProducts', 'POST',
      {
        "brand_id": username_id,
        "category_id": that.data.fenlei,
        "Year": that.data.year,
        "Manufacture": that.data.car,
        "Vehicle_Name": that.data.cartype,
        "Capacity": e.target.dataset.text
      },
      function (ev) {
        /*隐藏 loading 提示框 */
        wx.hideLoading()
        if (ev.data.list == [] || ev.data.list.length == 0) {
          base.showToast('暂无数据', 'none', 1e3)
          return false;
        }
        wx.setStorageSync('datalist', JSON.stringify(ev.data.list))
        wx.navigateTo({
          url: '../list/list'
        })
      }
    )
  },
  /*顶部框里面的年份点击 */
  syearclick(e) {
    let that = this;
    that.setData({
      yearshow: true,
      outputshow: false,
      year: false
    })
  },
  /*顶部框里面的车型点击 */
  scartypeclick(e) {
    let that = this;
    that.setData({
      cartypeshow: true,
      yearshow: false,
      cartype: false,
      year: false
    })
  },
  /*顶部框里面的车点击 */
  carclick(e) {
    let that = this;
    that.setData({
      carshow: true,
      cartypeshow: false,
      car: false,
      cartype: false,
      year: false,
      scar: false,
      outputshow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.vin != undefined && options.vin != 'undefined') {
      that.setData({
        num: 1,
        vin: options.vin
      })
    }
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
    let that = this;
    /*显示消息提示框 */
    wx.showLoading({
      title: '加载中',
    })
    base.request('/MattrioEcModel/SelectCarIntface/getBrandCategory', 'POST',
      {
        "brand_id": username_id
      },
      function (e) {
        // console.log(e.data.list)
        e.data.list.forEach(function (item, index) {
          that.data.fenlei += "\'" + item.category_id + "\'" + ",";
        })
        // console.log(that.data.fenlei)
        that.setData({
          fenlei: that.data.fenlei.substring(0, that.data.fenlei.length - 1),
          fenleilist: e.data.list,
          carshow: true,
          cartypeshow: false,
          car: false,
          cartype: false,
          year: false,
          scar: false,
          outputshow: false,
          flindex: 999,
          fenleishow: false
        })
      }
    )
    base.request('/MattrioEcModel/SelectLongCarIntface/getManufacture', 'POST',
      {
        "brand_id": username_id
      },
      function (e) {
        /*隐藏消息提示框 */
        wx.hideLoading();
        wxaSortPicker.init(e.data, that);
      }
    )
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
    return {
      title: appname,
      path: '/pages/index/index'
    }
  }
})