// pages/particulars/particulars.js\
var data=wx.getStorageInfoSync('data')
var network = wx.getStorageSync('network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoimg:'',
     car:'车型名称',
     cartype:'',
     output:'',
     vin:'',
     carimg:'',
     mikey: '', 
     year: '', 
     upyear: '', 
     engine: '',
     rylx:'',
     btns:''
  },
  // pjclick
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this;
      let data = wx.getStorageSync('data')[0]
      // console.log(options.vin)
      if (options.vin != undefined && options.vin != 'undefined') {
        that.setData({
          vin: options.vin
        })
      } else {
        that.setData({
          vin: ''
        })
       }      
      that.setData({
        logoimg: 'http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/' + data.car_icon,
        car: data.Manufacture_CN,
        cartype: data.Vehicle_Name_CN,
        output: data.Capacity,
        carimg: 'http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_img/' + data.car_img,
        mikey: data.mikey,
        year: data.Vehicle_of_year,
        upyear: data.Year_of_production,
        engine: data.Engine_Code,
        rylx: data.Fuel_Type,
        Manufacture_CN: data.Manufacture_CN,
        Vehicle_Name_CN: data.Vehicle_Name_CN,
        Vehicle_Series_Name_CN: data.Vehicle_Series_Name_CN,
        Name_of_sales: data.Name_of_sales,
        Sales_version: data.Sales_version,
        Emission_standards: data.Emission_standards,
        Vehicle_body_type: data.Vehicle_body_type,
        Vehicle_level: data.Vehicle_level,
        Guide_price: data.Guide_price,
        Launch_month: data.Launch_month,
        Launch_year: data.Launch_year,
        EOP_Year: data.EOP_Year,
        Production_status: data.Production_status,
        Sales_status: data.Sales_status,
        Country: data.Country,
        Domestic_joint_venture_imported: data.Domestic_joint_venture_imported,
        Engine_Code: data.Engine_Code,
        Capacity_ml: data.Capacity_ml,
        Capacity: data.Capacity,
        Air_intake_form: data.Air_intake_form,
        Fuel_label: data.Fuel_label,
        HP: data.HP,
        KW: data.KW,
        Maximum_power_speed: data.Maximum_power_speed,
        Peak_torque: data.Peak_torque,
        Maximum_torque_speed: data.Maximum_torque_speed,
        Cylinder_arrangement: data.Cylinder_arrangement,
        Number_of_cylinder: data.Number_of_cylinder,
        Number_of_valves_per_cylinder: data.Number_of_valves_per_cylinder,
        Compression_ratio: data.Compression_ratio,
        Injection_type: data.Injection_type,
        MiIT_integrated_fuel_consumption: data.MiIT_integrated_fuel_consumption
      })
      /*加载提示框显示*/
      wx.showLoading({
        title: '加载中',
      })
      /*获取第一个年份对应的排量*/
      wx.request({
        url: network + '/Mattrio/CarInterface/CheckButton',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          "mikey": data.mikey
        },
        method: 'POST',
        success: function (e) {
          /*加载提示框隐藏*/
          wx.hideLoading()
          that.setData({
            btns: e.data.btns.indexOf("epcbtn2")
          })
        }, fail: function () {
          wx.showToast({
            title: '找件儿：请求数据失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
  },
  imgerror:function(){
    let that = this;    
    that.setData({
      carimg: ''
    })
  }, 
  epcclick:function(){
    let that = this;
    if (that.data.btns<0){
     let carname = that.data.car
     var numtype = '0'
     if (carname.slice(0, 2) == '本田') {
       numtype = '1'
     } else if (carname.slice(0, 2) == '丰田') {
       numtype = '9'
     } else if (carname.slice(0, 2) == '日产') {
       numtype = '2'
     } else if (carname.slice(0, 2) == '现代') {
       numtype = '3'
     } else if (carname.slice(0, 2) == '荣威') {
       numtype = '4'
     } else if (carname.slice(0, 2) == '奔驰') {
       numtype = '5'
     } else if (carname.slice(0, 2) == '别克') {
       numtype = '7'
     }
     console.log(that.data.vin)
     wx.navigateTo({
       url: '../epc/epc?mikey=' + that.data.mikey + '&vin='+that.data.vin + '&type=' + numtype,
     })
   }else{
     wx.navigateTo({
       url: '../nodata/nodata'
     })
   }
  },
  partclick: function () {
    let that = this;
    if (that.data.btns < 0) {
      wx.navigateTo({
        url: '../part/part?mikey=' + that.data.mikey + '&vin=' + that.data.vin,
      })
     }else{
      wx.navigateTo({
        url: '../nodata/nodata'
      })
     }
  },
  /*点击切换车型 */
  tab(){
    wx.navigateTo({
      url: '../classify/classify',
    })
  },
  /*配件查询 */
  pjclick(){
    let that=this;
    // console.log(1)
    wx.navigateTo({
      url: '../part/search/search?mikey=' + that.data.mikey+'&vin='+that.data.vin
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