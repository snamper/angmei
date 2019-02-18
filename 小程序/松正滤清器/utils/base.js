function showToast(text,icon,time){
  wx.showToast({
    title: text,
    icon: icon,
    duration: time
  })
}
function request(url, method, json,success,fail){
  wx.request({
    url: 'https://ec.51macc.com' + url,
    method: method ,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: json,
    success(e) {
      success(e)
    },
    fail() {
      wx.hideLoading()
      showToast('请求失败','none',1e3)
    }
  })
}
/*VIN查询封装 */
function VIN(that,username_id,vin){
  if (that.data.vin == '') {
    showToast('VIN不能为空', 'none', 1e3)
    return false;
  }
  /*显示消息提示框 */
  wx.showLoading({
    title: '加载中',
  })
  request('/MattrioEcModel/VinIntface/queryVinLongCar', 'POST',
    {
      "brand_id": username_id,
      "category_id": '"A"',
      "vin":vin
    },
    function (e) {
      /*隐藏消息提示框 */
      wx.hideLoading();
      // console.log(e)
      if(e.data.list==[]||e.data.list.length==0){
        showToast('暂无数据', 'none', 1e3)
        return false;
      }
      let carlist = e.data.car_info[0]
      e.data.list.forEach(function (item, index) {
        item.Manufacture_CN = carlist.Manufacture_CN + carlist.Vehicle_Name_CN + carlist.Capacity
        item.Year_of_production = carlist.Year_of_production
        item.Capacity = carlist.Capacity
        item.Engine_Code = carlist.Engine_Code
        item.mikey = e.data.mikeys[0].mikey
      })
      wx.setStorageSync('datalist', JSON.stringify(e.data.list))
      wx.navigateTo({
        url: '../list/list'
      })

    }
  )
}
/*OE查询封装 */
function OE(that, username_id,oe){
  if (that.data.oe == '') {
    showToast('OE不能为空', 'none', 1e3)
    return false;
  }
  wx.showLoading({
    title: '加载中',
  })
  request('/MattrioEcModel/SelectLongCarIntface/getOeNumber', 'POST',
    {
      "brand_id": username_id,
      "oenumber": oe
    },
    function (e) {
      wx.hideLoading()
      if (e.data.list == [] || e.data.list.length == 0) {
        showToast('暂无数据', 'none', 1e3)
        return false;
      }
      wx.setStorageSync('datalist', JSON.stringify(e.data.list))
      wx.navigateTo({
        url: '../list/list'
      })
    }

  )
}
module.exports = {
  showToast: showToast,
  request: request,
  num:1,
  OE:OE,
  VIN:VIN
}