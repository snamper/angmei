const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/*购物车*/
function gwc() {
  wx.navigateTo({
    url: '../shoppingcart/shoppingcart',
  })
}
module.exports = {
  formatTime: formatTime,
  gwc:gwc,
}


