// pages/part/search1/search.js
var network = wx.getStorageSync('network')
var userid = wx.getStorageSync('userid')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pjzllist: [
      { category_name: '底盘部分', category_id: 'A' },
      { category_name: '发动机与变速器', category_id: 'B' },
      { category_name: '车身部分', category_id: 'C' },
      { category_name: '电器及照明系统', category_id: 'D' },
      { category_name: '内外饰部分', category_id: 'E' },
      { category_name: '工具', category_id: 'F' },
      { category_name: '辅料项目', category_id: 'G' }
    ],
    pjpllist:'',
    titleshow:false,
    title:'',
    pjpl: true,
    xzpj: false,
    xzpjlist:'',
    backshow:false,
    num:'1',
    listnum:0,
    yxlist: [],
    yxshow:false,
    mengshow:false,
    content:'',
    rmlb: [
      { category_name: '转向横拉杆', bg:999 },
      { category_name: '氧传感器', bg: 999  },
      { category_name: '点火线圈', bg: 999  },
      { category_name: '减震器液压泵支架', bg: 999  },
      { category_name: '前减震器总成 右侧', bg: 999  },
      { category_name: '后刹车片', bg: 999  },
      { category_name: '转向横拉杆球头', bg: 999  },
      { category_name: '前刹车片 套', bg: 999  },
      { category_name: '减震器调节控制电脑', bg: 999  },
      { category_name: '轮胎', bg: 999  },
      { category_name: '蓄电池', bg: 999 },
      { category_name: '副驾驶侧雨刮片', bg: 999  },
      { category_name: '驾驶侧雨刮片', bg: 999  },
      { category_name: '后减震器 右侧', bg: 999 },
      { category_name: '后刹车片 套', bg: 999 },
      { category_name: '减震器液压泵', bg: 999  },
      { category_name: '减震器液压泵储液罐', bg: 999  },
      { category_name: '后制动盘', bg: 999 },
      { category_name: '前制动盘', bg: 999  },
      { category_name: '前刹车片', bg: 999 },
      { category_name: '前减震器总成 左侧', bg: 999 },
      { category_name: '空调滤芯器', bg: 999 },
      { category_name: '转向助力油', bg: 999  },
      { category_name: '燃油滤芯器', bg: 999  }
    ],
    rmlbshow:true,
    mikey:'',
    inpvalue:''
    
  },
  /*左面点击 */
  rmlist(e){
    console.log(e)
    let that = this;
    that.setData({
      titleshow: false,
      pjpl: false,
      xzpj: false,
      num: e.target.dataset.num,
      rmlbshow: true
    })
    that.setData({
      rmlb: that.data.rmlb
    })

  },
  /*配件总类 qdpush*/
  llist(e){
    let that = this;
    that.setData({
      titleshow:true,
      title: e.target.dataset.text,
      title1: e.target.dataset.text,      
      num: e.target.dataset.id
    })
    /*加载提示框显示*/
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network + '/Mattrio/ProductInterface/getCategory2',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "categoryid": e.target.dataset.id,
        "mikey": that.data.mikey,
      },
      method: 'POST',
      success: function (re) {
        /*加载提示框隐藏*/
        wx.hideLoading()
        if (re.data.list == [] || re.data.list.length == 0) {
          
        }
        that.setData({
          pjpl:true,
          xzpj:false,
          rmlbshow: false,
          pjpllist: re.data.list
        })
        /*加载提示框隐藏*/
        wx.hideLoading()
        
      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    }) 
  },
  /*配件品类 */
  plclick(e){
    // console.log(e)
    let that = this;
    /*加载提示框显示*/
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: network + '/Mattrio/ProductInterface/getCategory3',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "categoryid": e.target.dataset.id,
        "mikey": that.data.mikey,
      },
      method: 'POST',
      success: function (re) {
        /*加载提示框隐藏*/
        wx.hideLoading()
        if (re.data.list == [] || re.data.list.length == 0) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1000
          })
          return false
        }
        that.setData({
          pjpl:false,
          xzpj:true,
          xzpjlist: re.data.list,
          backshow:true,
          title: e.target.dataset.text
        })
        that.data.xzpjlist.forEach(function (item, index) {
          item.bg = 9999
        })
        if (that.data.yxlist != [] || that.data.yxlist.length !=0){
          that.data.yxlist.forEach(function (item, index) {
            that.data.xzpjlist.forEach(function (ite, inde) {
              if (item.category_name == ite.category_name){
                ite.bg = inde
              }
            })
          }) 
        }
        that.setData({
          xzpjlist: that.data.xzpjlist
        })
            
        /*加载提示框隐藏*/
        wx.hideLoading()
      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    }) 
  },
  back(){
    let that = this;
    that.setData({
      pjpl: true,
      xzpj: false,
      backshow:false,
      title: that.data.title1
    })
  },
  yxlistclick(){
    let that = this;
    that.setData({
      yxshow:true,
      mengshow:true
    })  
  },
  mengclick(){
    let that = this;
    that.setData({
      yxshow: false,
      mengshow: false
    })
  },
  input(e){
    let that=this;
    that.setData({
      inpvalue: e.detail.value
    })
  },
  /*手动输入添加 */
  qdpush(e){
    let that=this;
    var reg = /^[A-Za-z0-9]*$/;
    var re = /[a-z,A-Z]/g;
    console.log(that.data.inpvalue.match(re))
    if (that.data.inpvalue==''){
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (that.data.inpvalue.match(reg) != null){
      wx.showToast({
        title: '输入有误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (that.data.yxlist.length == 0 || that.data.yxlist == []) {
      console.log(1)
      that.data.yxlist.push({
        'category_name': that.data.inpvalue,
        'S': 'S'
      })
      wx.showToast({
        title: '找件儿：添加成功',
        icon: 'none',
        duration: 1000
      })
    } else {
      console.log(2)
      let shuliang = ''
      for (var i = 0; i < that.data.yxlist.length; i++) {
        if (that.data.yxlist[i].category_name.indexOf(that.data.inpvalue) < 0) {
          shuliang++
        }
        if (shuliang == that.data.yxlist.length) {
          that.data.yxlist.push({
            'category_name': that.data.inpvalue,
            'S': 'S'
          })
          wx.showToast({
            title: '找件儿：添加成功',
            icon: 'none',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '找件儿：该配件已加入',
            icon: 'none',
            duration: 1000
          })
        }
      }
    }
    that.setData({
      yxlist: that.data.yxlist,
      listnum: that.data.yxlist.length,
      inpvalue:''
    })

  },
  /*热门添加 */
  pushr(e){
    let that = this;
    // console.log(that.data.yxlist)
    // console.log(e.target.dataset.text)
    if (that.data.yxlist.length == 0 || that.data.yxlist == []) {
      // console.log(1)
      that.data.yxlist.push({
        'category_name': e.target.dataset.text,
        'num': e.target.dataset.index,
        'R':'R'
      })
      that.data.rmlb.forEach(function (item, index) {
        if (index == e.target.dataset.index)
          item.bg = index
      })
    } else {
      // console.log(2)      
      let shuliang = ''
      for (var i = 0; i < that.data.yxlist.length; i++) {
        if (that.data.yxlist[i].category_name != e.target.dataset.text) {
          shuliang++
        }
        if (shuliang == that.data.yxlist.length) {
          that.data.yxlist.push({
            'category_name': e.target.dataset.text,
            'num': e.target.dataset.index,
            'R': 'R'            
          })
          that.data.rmlb.forEach(function (item, index) {
            if (index == e.target.dataset.index)
              item.bg = index
          })
        }
      }
    }
    that.setData({
      rmlb: that.data.rmlb,
      yxlist: that.data.yxlist,
      listnum: that.data.yxlist.length
    })
  },
  /*添加 */
  pushp(e) {
    let that = this;
    if (that.data.yxlist.length == 0 || that.data.yxlist==[]){
      that.data.yxlist.push({
        'category_name': e.target.dataset.text,
        'num': e.target.dataset.index
      })
      that.data.xzpjlist.forEach(function (item, index) {
        if (index == e.target.dataset.index)
          item.bg = index
      })
    }else{
      let shuliang=''
      for (var i = 0; i < that.data.yxlist.length; i++) {
        if (that.data.yxlist[i].category_name != e.target.dataset.text) {
          shuliang++
        }
        if (shuliang == that.data.yxlist.length){
          that.data.yxlist.push({
            'category_name': e.target.dataset.text,
            'num': e.target.dataset.index
          })
          that.data.xzpjlist.forEach(function (item, index) {
            if (index == e.target.dataset.index)
              item.bg = index
          })
        }
      }
    }

    // if (that.data.xzpjlist[e.target.dataset.index].bg == e.target.dataset.index) {
    // } else {
    //   that.data.yxlist.push({
    //     'category_name': e.target.dataset.text,
    //     'num': e.target.dataset.index
    //   })
    //   that.data.xzpjlist.forEach(function (item, index) {
    //     if (index == e.target.dataset.index)
    //       item.bg = index
    //   })
    // }

    that.setData({
      xzpjlist: that.data.xzpjlist,
      yxlist: that.data.yxlist,
      listnum: that.data.yxlist.length
    })
  },
  /*删除 */
  delete(e){
    let that = this;  
    console.log(e.currentTarget.dataset.index)
    let index = that.data.yxlist[e.currentTarget.dataset.index].num
    if (that.data.yxlist[e.currentTarget.dataset.index].R){
      that.data.rmlb[index].bg = 999
      that.data.yxlist.splice(e.currentTarget.dataset.index, 1)
      that.setData({
        rmlb: that.data.rmlb,
        yxlist: that.data.yxlist,
        listnum: that.data.yxlist.length
      }) 
    } else if (that.data.yxlist[e.currentTarget.dataset.index].S){
      that.data.yxlist.splice(e.currentTarget.dataset.index, 1)
      that.setData({
        yxlist: that.data.yxlist,
        listnum: that.data.yxlist.length
      }) 
    }else{
      that.data.xzpjlist[index].bg = 999
      that.data.yxlist.splice(e.currentTarget.dataset.index, 1)
      that.setData({
        xzpjlist: that.data.xzpjlist,
        yxlist: that.data.yxlist,
        listnum: that.data.yxlist.length
      }) 
    } 
  },
  /* 清空*/
  qkclick(){
    let that = this;    
    if (that.data.xzpjlist){
      that.data.xzpjlist.forEach(function (item, index) {
        item.bg = 999
      })
    }
    that.data.rmlb.forEach(function (item, index) {
      item.bg = 999
    })
    that.setData({
      rmlb: that.data.rmlb,
      xzpjlist: that.data.xzpjlist,
      yxlist: [],
      listnum: 0
    })
  },
  chaxun(){
    let that=this;
    console.log(that.data.yxlist)
    that.setData({
      content:''
    })
    that.data.yxlist.forEach(function (item, index) {    
      that.data.content += item.category_name+','
    })
    console.log(that.data.content)
    that.setData({
      content: that.data.content
    })
    if (that.data.content == '' || that.data.content.length==0){
      wx.showToast({
        title: '请选择配件',
        icon: 'none',
        duration: 1000
      })
        return false;
    }
    wx.navigateTo({
      url: '../peijianlist/peijianlist?content=' + that.data.content + '&mikey=' + that.data.mikey + "&vin=" + that.data.vin,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    let that=this;
    that.setData({
      mikey: options.mikey,
      vin: options.vin
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