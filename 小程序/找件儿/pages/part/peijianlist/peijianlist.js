// pages/part/peijianlist/peijianlist.js
var userid = wx.getStorageSync('userid')
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pjlist: '',
    allcheck: false,
    show: '',
    mengshow: false,
    Mall:true,
    datalistnum:'',
    bottom:'-50%'
  },
  /**push
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    let that = this;
    var vin = options.vin
    if (options.vin == undefined || options.vin == 'undefined') {
      vin = ''
    }
    that.setData({
      content: options.content,
      mikey: options.mikey,
      vin: vin
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
    var userid = wx.getStorageSync('userid')
    let that = this;
    that.setData({
      allcheck: false
    })
    wx.showLoading({
      title: '加载中',
    })
    /*如果这次查询和上次一样就用缓存 */
    if (wx.getStorageSync('peijian').length > 0 && wx.getStorageSync('pjarguments') == that.data.content + that.data.mikey + that.data.vin){
      that.setData({
        pjlist: JSON.parse(wx.getStorageSync('peijian'))
      })
      /*隐藏加载框 */
      wx.hideLoading()
      return false;
    }
    wx.request({
      url: network + '/Mattrio/ProductInterface/LikeQueryOesForApp',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "userid": userid,
        "category_names": that.data.content,
        "mikey": that.data.mikey,
        "vin": that.data.vin
      },
      // that.data.mikey
      method: 'POST',
      success: function (re) {
        if (re.data.list == [] || re.data.list.length == 0) {
          /*隐藏加载框 */
          wx.hideLoading()
          wx.showToast({
            title: '找件儿：暂无数据',
            icon: 'none',
            duration: 1000
          })
          return false;
        }
        wx.setStorageSync('pjarguments', that.data.content + that.data.mikey + that.data.vin)
        /*分类 */
        var first = '尾门壳尾门玻璃外尾灯（左）尾门壳外尾灯（右）消声器后纵梁（左）后保险杠后纵梁（右）后保险杠皮前大灯（左）前大灯（右）前风挡玻璃前叶子板（左）发动机罩前隔壁板总成前叶子板（右）散热器框架前雾灯（左）前雾灯（右）发动机总成前纵梁前保险杠皮后叶子板（右）后门三角玻璃（右）后门玻璃（右）前门壳（右）后门总成（右）天窗玻璃前门玻璃（右）后视镜（倒车镜）减震器总成轮胎底大边（右）前减震器总成（右）前门玻璃（左）前门壳（左）后门总成后门三角玻璃（左）后门玻璃（左）后门壳（左）后叶子板（左）前减震器总成（左）底大边（左）后保险杠总成'
        var second = '高位刹车灯后行李箱线束行李箱后装饰板保险盒总成蓄电池仪表台壳ABS泵倒车镜总成（左）蓄电池电缆空调泵元宝梁高音喇叭转向助力泵燃油箱口盖车身总成车壳车顶总成后座椅总成副驾驶员座椅总成A柱加强筋（右）后轮罩（右）备胎槽后下摆臂（右）后轮毂后地板"燃油箱"变速器差速器燃油箱前下摆臂（右）前平衡杆前半轴（右）前轮罩板（右）前上摆臂（右）前制动器挡泥板（右）前轮毂（左）轮胎驾驶员座椅总成前门安全气囊A柱加强筋（左）前下摆臂（左）前轮毂前半轴（左）前轮罩板（左）前上摆臂（左）发动机支架（左）后轮罩（左）后下摆臂（左）后轮毂（左）'
        var thirdly = '阅读灯前风挡雨刮连杆前风挡雨刮电机前风挡雨刮清洗器泵保险盒总成前轮挡泥板（右）高音喇叭雨量传感器遮阳板（右）底盘线束点烟器前制动器挡泥板（左）门锁遥控器总成'
        var first_1 ='尾门密封胶条发动机罩内衬发动机罩徽标发动机隔热板发动机罩拉线手柄发动机罩铰链（右）发动机罩发动机电脑发动机线束发动机罩进气格栅前隔壁板隔热板前隔壁板上挡板散热器风圈增压中冷器冷凝器散热器散热器电子扇总成散热器补水壶散热器上护板散热器密封条前风挡玻璃胶条（左）前风挡玻璃胶条（右）前保险杠皮上端前保险杠支架（右）前保险杠支架（左）前保险杠拖车钩盖板发动机支架前保险杠牌照板前保险杠皮前雾灯支座（左）前雾灯支座（右）前雾灯护罩（左）前雾灯护罩（右）侧围骨架（右）后叶子板内衬（右）后门内饰板（右）后门外拉手（右）后门内拉手（右）后门锁总成（右）后门上铰链（右）后门框密封条（右）后门下铰链（右）后门内饰板后门玻璃密封条后门框密封条（左）后门锁总成（左）后门上铰链（左）后门外拉手（左）后门内饰板（左）后门下铰链（左）后门锁总成（左）前门窗框外饰板右后前门内饰板（右）前门外拉手（右）前门内拉手（右）前门扶手（右）前门玻璃内压条（右）前门上铰链（右）前门锁机构（右）前门玻璃升降开关装饰板（右）前门玻璃升降开关（右）前门扬声器罩（右）前门密封胶条（右）前门扬声器（右）前门框密封条（右）前门锁总成（右）前门锁栓（右）前门线束（右）前门下铰链（右）前门框密封条（左）前门上铰链（左）前门锁机构（左）前门玻璃升降开关装饰板（左）前门玻璃升降开关（左）前门密封胶条（左）前门内饰板（左）前门外拉手饰盖（左）前门扶手（左）前门内拉手（左）前门窗框外饰板（左）前门外拉手（左）前门内拉手框（左）前门下铰链（左）前门扬声器（左）前门锁总成（左）前门扬声器罩（左）前门锁栓（左）前门线束（左）前门扶手（左）前门内拉手（左）前门内拉手（左）侧围骨架（左）后叶子板内衬（左）天窗遮阳板后保险杠骨架后保险杠内衬后保险杠缓冲器后保险杠支架大灯安装底板（左）大灯喷水嘴（左）大灯喷水嘴（右）大灯安装底板（右）'
        var second_1 = 'ABS电脑气囊卷簧副气囊侧气囊气囊电脑后座椅侧安全带副驾驶员安全气囊前座椅侧安全带副驾驶员座椅安全带驾驶员座椅安全带车顶前扶手车顶边梁外板（右）车顶外板车顶内衬车顶横粱前部车顶内饰板前部车顶横粱车顶边梁外板（左）车顶横粱中间仪表台骨架仪表台侧护板（右）仪表台杂物箱仪表台下护板（右）仪表台侧护板（左）仪表台下护板（左）A柱外板（右）轮毂盖A柱外板（左）前转向节（右）转向横拉杆转向横拉杆拉杆球头（右）前下控制臂（右）前转向节（左）转向横拉杆拉杆球头（左）前下控制臂（左）转向管柱下十字连接轴转向管柱前制动钳（左）'
        var thirdly_1 = '前罩板导水板前风挡雨刮清洗器泵'
        re.data.list.forEach(function (item, index) {
          // console.log(item.category_name)
          /*分等级 */
          if (first.indexOf(item.category_name)>0){
            item.priority=1
          } else if (second.indexOf(item.category_name)>0){
            item.priority = 2
          } else if (thirdly.indexOf(item.category_name)>0){
            item.priority = 3
          }else{
            if (first_1.indexOf(item.category_name) > 0){
              item.priority = 1.1
            } else if (second_1.indexOf(item.category_name) > 0){
              item.priority = 2.1
            } else if (thirdly_1.indexOf(item.category_name) > 0){
              item.priority = 3.1
            }else{
              item.priority = 4
            }
          }
          /*添加勾选属性 默认为未勾选 */
          item.checked = false   
          /*添加图片路径*/       
          item.src = 'http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/' + item.category_id+'.jpg'
        })
        /*排序 */
        re.data.list.sort(fn)
        function fn(a,b){
          return a.priority - b.priority
        }
        /*进行归类 */
        var arr = re.data.list
        var map = {},
          dest = [];
        for (var i = 0; i < arr.length; i++) {
          var ai = arr[i];
          // console.log(ai)
          if (!map[ai.category_name]) {
            dest.push({
              category_name: ai.category_name,
              src: ai.src,
              checked: ai.checked,
              Mnum:0,
              data: [ai]
            });
            map[ai.category_name] = ai;
          } else {
            for (var j = 0; j < dest.length; j++) {
              var dj = dest[j];
              if (dj.category_name == ai.category_name) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        console.log(dest)
        /*根据长度判断是否双循环 */
        dest.forEach(function(item,key){
          if (item.data.length==1){
            dest.splice(key, 1, item.data[0])
          }else{
            item.for = true
          }
        })
        wx.setStorageSync('peijian', JSON.stringify(dest))
        that.setData({
          pjlist: dest
        })

        /*加载提示框隐藏*/
        wx.hideLoading()
      }, fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /*归的类点击*/
  datalistclick(e){
    let that=this;
    let index = e.currentTarget.dataset.num
    if (that.data.pjlist[index].checked){
      that.data.pjlist[index].data.forEach(function(item,key){
        item.checked=true
      })
    }
    that.setData({
      mengshow:true,
      datalist: that.data.pjlist[index].data,
      datalistnum: e.currentTarget.dataset.num
    })
    setTimeout(function(){
      that.setData({
       bottom:0
      })
    },100)
  },
  /*点击确定 */
  yesclick(){
    let that = this;
    that.setData({
      mengshow: false,
      bottom:'-50%'
    })
  },
  /*点击取消 */
  noclick(e) {
    let that = this;
    let datalistnum = that.data.datalistnum
    that.data.pjlist[datalistnum].checked = false
    that.data.pjlist[datalistnum].Mnum = 0
    that.data.pjlist[datalistnum].data.forEach(function(item,key){
      item.checked=false
    })
    that.setData({
      mengshow: false,
      pjlist: that.data.pjlist
    })
  },
  /*全选 */
  all(e) {
    let that = this;
    let all = !that.data.allcheck
    that.setData({
      allcheck: all
    })
    that.data.pjlist.forEach(function (item, index) {
      item.checked = that.data.allcheck
      if (item.for){
        item.data.forEach(function(ite,inde){
          ite.checked = that.data.allcheck
        })
      }
    })
    that.setData({
      pjlist: that.data.pjlist
    })
  },
  /*如果没有图片时 图片显示为找见儿logo */
  error(e) {
    let that=this;
    let src = e.target.dataset.src
    let index = e.target.dataset.index
    that.data.pjlist[index].src=src
    that.setData({
      pjlist: that.data.pjlist
    })
  },
  Merror(e){
    let that = this;
    let src = e.target.dataset.src
    let index = e.target.dataset.index
    that.data.datalist[index].src = src
    that.setData({
      datalist: that.data.datalist
    })
  },
/*单选 */
  listcheck(e) {
    let that = this;
    let box = that.data.pjlist[e.currentTarget.dataset.index].checked
    let list = that.data.pjlist[e.currentTarget.dataset.index]
    let tnum = 0;
    list.checked = !box
    console.log(that.data.pjlist)
    that.setData({
      pjlist: that.data.pjlist
    })
    for (let i = 0; i < that.data.pjlist.length; i++) {
      console.log(that.data.pjlist[i].checked)
      if (that.data.pjlist[i].checked) {
        tnum++
      } 
    }
    console.log(tnum)
    if (tnum == that.data.pjlist.length) {
      that.data.allcheck = true
    } else {
      that.data.allcheck = false
    }
    that.setData({
      allcheck: that.data.allcheck
    })
  },
  /*该配件归类后的列表 */
  Mlistcheck(e){
    console.log(e)
    let that=this;
    let index = e.currentTarget.dataset.index
    let check = !that.data.datalist[index].checked
    let Mnum = 0;
    let Mmnum=0;
    let datalistnum = that.data.datalistnum
    that.data.datalist[index].checked = check
    that.data.pjlist[datalistnum].data[index].checked = check
    for (var i = 0; i < that.data.datalist.length;i++){
      if (that.data.datalist[i].checked == false) {
        Mnum++
      }else{
        Mmnum++
      }
    }
    if (Mmnum == that.data.datalist.length) {
      that.data.pjlist[datalistnum].checked = true
    } else {
      that.data.pjlist[datalistnum].checked = false
    }
    that.data.pjlist[datalistnum].Mnum = Mmnum
    that.setData({
      pjlist: that.data.pjlist,
      datalist:that.data.datalist
    })

  },
  /*该配件归类的全选*/
  Malllistcheck(e){
    let that=this;
    let tnum=0;
    let index = e.target.dataset.index
    let check = !that.data.pjlist[index].checked
    that.data.pjlist[index].checked = check
    that.data.pjlist[index].data.forEach(function(item,key){
      item.checked = check
    })
    that.setData({
      pjlist: that.data.pjlist
    })
    for (let i = 0; i < that.data.pjlist.length; i++) {
      console.log(that.data.pjlist[i].checked)
      if (that.data.pjlist[i].checked) {
        tnum++
      }
    }
    if (tnum == that.data.pjlist.length) {
      that.data.allcheck = true
    } else {
      that.data.allcheck = false
    }
    that.setData({
      allcheck: that.data.allcheck
    })
  },
  /*确定 */
  confirm() {
    let that = this;
    let num = 0;
    var fxlistnum = 0;
    /*循环列表 */
    for (let i = 0; i < that.data.pjlist.length; i++) {
      if (that.data.pjlist[i].checked == true || that.data.pjlist[i].Mnum > 0) {
        /*获取我的分享列表 */
        var fxlist = wx.getStorageSync('myfx')
        /*当归的类有选中的配件时 */
        if (that.data.pjlist[i].for){
          if (that.data.pjlist[i].Mnum > 0 || that.data.pjlist[i].checked) {
            /*循环归类的配件 */
            console.log(that.data.pjlist[i])
            for (var r = 0; r < that.data.pjlist[i].data.length; r++) {
              /*循环我的分享 */
              console.log(that.data.pjlist[i].data[r])
              if (that.data.pjlist[i].data[r].checked) {
                for (var j = 0; j < fxlist.length; j++) {
                  console.log(that.data.pjlist[i].data[r].oe_number)
                  /*判断我的分享中有没有该配件 */
                  if (fxlist[j].oe_number == that.data.pjlist[i].data[r].oe_number) {
                    if (fxlist[j].category_name != that.data.pjlist[i].data[r].category_name) {
                      fxlistnum++
                    }
                  } else {
                    fxlistnum++
                  }

                }
                /*没有就添加 */
                if (fxlistnum == fxlist.length) {
                  fxlist.push(that.data.pjlist[i].data[r])
                  wx.setStorageSync('myfx', fxlist)
                  fxlistnum = 0
                }
              }
            }

          }
        
        }else{
          /*没有归类的配件 */
          /*循环我的分享 */
          for (var j = 0; j < fxlist.length; j++) {
            if (fxlist[j].oe_number == that.data.pjlist[i].oe_number) {
              if (fxlist[j].category_name != that.data.pjlist[i].category_name) {
                fxlistnum++
              }
            } else {
              fxlistnum++
            }
          }
          if (fxlistnum == fxlist.length) {
            fxlist.push(that.data.pjlist[i])
            wx.setStorageSync('myfx', fxlist)
            fxlistnum = 0
          }
        }
      } else {
        num++
      }
    }
    if (num == that.data.pjlist.length) {
      wx.showToast({
        title: '找件儿：请选择数据',
        icon: 'none',
        duration: 1000
      })
      return false
    }
    wx.showToast({
      title: '找件儿：添加成功',
      icon: 'none',
      duration: 1000
    })
    wx.navigateTo({
      url: '../../my/myfx/myfx',
    })

  },
  /*分享列表 */
  fxlb() {
    wx.navigateTo({
      url: '../../my/myfx/myfx',
    })
  },
  /*支持车型 */
  carclick(e) {
    let index = e.target.dataset.index
    let that = this;
    wx.request({
      url: network + '/Mattrio/ProductInterface/getOeCars',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "oenumber": e.target.dataset.oe.replace(/\s/g, "").replace(/\-/g, ""),
        "userid": userid
      },
      method: 'POST',
      success: function (e) {
        /*加载提示框隐藏*/
        wx.setStorageSync('cartype', e.data.list)
        wx.hideLoading()
      }, fail: function () {
        wx.showToast({
          title: '找件儿：请求数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
    wx.navigateTo({
      url: '../../epc/content-epc/oe/cartype/cartype?title=' + that.data.pjlist[index].category_name
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
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '找件儿',
      imageUrl: '/pages/image/car.jpg',
      path: '/pages/inde/inde'
    }
  }
})