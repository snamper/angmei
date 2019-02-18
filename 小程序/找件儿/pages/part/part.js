// pages/part/part.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    imgsrc: '../image/q.jpg',
    mikey: '',
    color: 'red',
    startX1: '0',
    startY1: '0',
    arr: [
      {
        'l': 0.19,
        't': 0.045,
        'r': 0.85,
        'b': 0.8
      },
      {
        'l': 0.04,
        't': 0.045,
        'r': 0.96,
        'b': 0.6
      },
      {
        'l': 0.035,
        't': 0.05,
        'r': 0.97,
        'b': 0.65
      },
      {
        'l': 0.23,
        't': 0.055,
        'r': 0.81,
        'b': 0.71
      }
    ],
    width: wx.getSystemInfoSync().windowWidth,
    content: '',
    numbers: ''
  },
  search: function (e) {
    let that = this;
    wx.navigateTo({
      url: 'search/search?mikey=' + that.data.mikey,
    })

  },
  /*切换方向 */
  listclick: function (e) {
    let that = this;
    var content = that.data.content 
    that.setData({
      num: e.currentTarget.dataset.num,
      imgsrc: e.currentTarget.dataset.src,
      content: '',
      numbers: ''
    })
    let ctx = wx.createCanvasContext('myCanvas')
    let width = that.data.width
    ctx.clearRect(0, 0, width, 500)
    ctx.draw()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      mikey: options.mikey,
      vin: options.vin,
    })
  },
  touchStart: function (e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()

    this.context.setStrokeStyle(this.data.color)
    this.context.setLineWidth('5')
    this.context.setLineCap('round') // 让线条圆润
    this.context.beginPath()
    let ctx = wx.createCanvasContext('myCanvas')
    let width = this.data.width
    this.setData({
      content: '',
      numbers:''
    })
    ctx.clearRect(0, 0, width, 500)
    ctx.draw()
  
  },
  //手指触摸后移动
  touchMove: function (e) {
    let that = this;
    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y
    this.setData({
      startX1: startX1,
      startY1: startY1
    })
    this.context.moveTo(this.startX, this.startY)
    this.context.lineTo(startX1, startY1)
    this.context.stroke()

    this.startX = startX1;
    this.startY = startY1;

    // }
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })
    /*前坐标判断 */
    // console.log(this.data.startX1)
    
    var content = that.data.content/*配件 */
    let x = this.data.startX1
    let y = this.data.startY1
    let width = this.data.width/*宽度 */
    let index = that.data.num
    if (index == 0) {
      var bili = 579 / 720
    } else if (index == 1) {
      var bili = 418 / 720
    } else if (index == 2) {
      var bili = 395 / 720
    } else if (index == 3) {
      var bili = 539 / 720
    }
    let height = width * bili;/*高度 */
    this.setData({
      height: height
    })
    let arr = this.data.arr
    /*上4格 */
    let numbers = that.data.numbers
    if ( that.data.num == 1 || that.data.num == 2) {
      let lnone = width * arr[index].l
      let tnone = height * arr[index].t
      let rnone = width * arr[index].r
      let bnone = height * arr[index].b
      let width4 = (width * (arr[index].r - arr[index].l)) / 4;/*4列宽度 */
      let height2 = (height * (arr[index].b - arr[index].t)) / 2;/*2行高度 */
      if (x > lnone && y > tnone && x < width4 + lnone && y < height2 + tnone) {
        /*1格 */
        console.log('前1')
         if (index == 1) {
           if (x > width * 0.066 && y > height * 0.26){
             numbers += 1
          }
        } else if (index == 2) {
          if (x > width * 0.04 ){
            numbers += 1
          }
        }
      } else if (x > width4 + lnone && y > tnone && x < width4 * 2 + lnone && y < height2 + tnone) {
        /*2格 */ 
        console.log('前2')
        if (index == 1) {
            numbers += 2
        } else if (index == 2) {
          numbers += 2
        }
      } else if (x > width4 * 2 + lnone && y > tnone && x < width4 * 3 + lnone && y < height2 + tnone) {
        /*3格 */
        console.log('前3')
        if (index == 1) {
          if (y > height * 0.13){
            numbers += 3
          }
        } else if (index == 2) {
          if (y>height*0.078){
            numbers += 3 
          }

        }

      } else if (x > width4 * 3 + lnone && y > tnone && x < rnone && y < height2 + tnone) {
        /*4格 */
        console.log('前4')
        if (index == 1) {
          if (x < width * 0.84 && y > height * 0.08){
            numbers += 4
          }

        } else if (index == 2) {
          if (x < width * 0.94 && y > height * 0.21){
            numbers += 4
          }

        }
      } else if (x > lnone && y > height2 + tnone && x < width4 + lnone && y < bnone) {
        /*5格 */
        console.log('前5')
       if (index == 1) {
         numbers += 5
        } else if (index == 2) {
         numbers += 5
        }
      } else if (x > width4 + lnone && y > height2 + tnone && x < width4 * 2 + lnone && y < bnone) {
        /*6格 */
        console.log('前6')
       if (index == 1) {
         if (x < height*0.68){
           numbers += 6
         }
        } else if (index == 2) {
         if (x < height * 0.65){
           numbers += 6
         }
        }

      } else if (x > width4 * 2 + lnone && y > height2 + tnone && x < width4 * 3 + lnone && y < bnone) {
        /*7格 */
        console.log('前7')
        if (index == 1) {
          if (x < height * 0.68){
            numbers += 7
          }
        } else if (index == 2) {
          if (x < height * 0.65) {
            numbers += 7
          }
        }
      } else if (x > width4 * 3 + lnone && y > height2 + tnone && x < rnone && y < bnone) {
        /*8格 */
        console.log('前8')
        if (index == 1) {
          numbers += 8
        } else if (index == 2) {
          numbers += 8
        }
      }

    } else if (that.data.num == 3) {
      let lnone = width * arr[index].l
      let tnone = height * arr[index].t
      let rnone = width * arr[index].r
      let bnone = height * arr[index].b
      let width2 = (width * (arr[index].r - arr[index].l)) / 2;/*3列宽度 */
      let height3 = (height * (arr[index].b - arr[index].t)) / 3;/*3行宽度 */
      if (x > lnone && y > tnone && x < width2 + lnone && y < height3 + tnone) {
        /*1格 */
        console.log('前1')
        if (x > width*0.25){
          numbers += 1
        }
      } else if (x > width2 + lnone && y > tnone && x < rnone && y < height3 + tnone) {
        /*2格 */
        console.log('前2')
        if (x < width * 0.75){
          numbers += 2
        }
      } else if (x > lnone && y > height3 + tnone && x < width2 + lnone && y < height3 * 2 + tnone) {
        /*3格 */
        console.log('前3')
        numbers += 3
      } else if (x > width2 + lnone && y > height3 + tnone && x < rnone && y < height3 * 2 + tnone) {
        /*4格 */
        console.log('前4')
        numbers += 4
      } else if (x > lnone && y > height3 * 2 + tnone && x < width2 + lnone && y < bnone) {
        /*5格 */
        console.log('前5')
        numbers += 5
      } else if (x > width2 + lnone && y > height3 * 2 + tnone && x < rnone && y < bnone) {
        /*6格 */
        console.log('前6')
        numbers += 6
      }
      /* */
    } else if (that.data.num == 0){
        let lnone = width * arr[index].l
        let tnone = height * arr[index].t
        let rnone = width * arr[index].r
        let bnone = height * arr[index].b
        let width2 = (width * (arr[index].r - arr[index].l)) / 2;/*2列宽度 */
        let height4 = (height * (arr[index].b - arr[index].t)) / 4;/*4行高度 */
      if (x > lnone && y > tnone && x < width2 + lnone && y < height4 + tnone){
        if (x > width * 0.26) {
          console.log('前1')
          numbers += 1
        }
      } else if (x > lnone + width2 && y > tnone && x < lnone + width2 * 2 && y < height4 + tnone){
        console.log('前2')
        if (x < width*0.75){
          numbers += 2
        }
      } else if (x > lnone && y > height4 + tnone && x < width2 + lnone && y < height4 * 2 + tnone){
        console.log('前3')
        numbers += 3
      } else if (x > lnone + width2 && y > height4 + tnone && x < lnone + width2 * 2 && y < height4 * 2 + tnone){
        console.log('前4')
        numbers += 4
      } else if (x > lnone && y > height4 * 2 + tnone && x < width2 + lnone && y < height4 * 3 + tnone){
        console.log('前5')
        numbers += 5
      } else if (x > lnone + width2 && y > height4 * 2 + tnone && x < lnone + width2 * 2 && y < height4 * 3 + tnone){
        console.log('前6')
        numbers += 6
      } else if (x > lnone && y > height4 * 3 + tnone && x < width2 + lnone && y < height4 * 4 + tnone){
        console.log('前7')
        numbers += 7 
      } else if (x > lnone + width2 && y > height4 * 3 + tnone && x < lnone + width2 * 2 && y < height4 * 4 + tnone){
        console.log('前8')
        numbers += 8
      }
    }

    /* */
    var o = {};
    //遍历str，统计每个字符出现的次数
    for (var i = 0, length = numbers.length; i < length; i++) {
      //当前第i个字符
      var char = numbers.charAt(i);
      //char就是对象o的一个属性，o[char]是属性值，存储出现的次数
      if (o[char]) {  //如果char属性存在，属性值+1 
        o[char]++;  //次数加1
      } else {        //char属性不存在为1（即字符第一次出现） 
        o[char] = 1;    //若第一次出现，次数记为1
      }
    }
    //输出的是完整的对象，记录着每一个字符及其出现的次数
    //输出{a:1, c:3, d:2, e:1, f:1, h:3, i:3, o:2, u:5, z:3}
    // console.log(o);
    //遍历对象，找到出现次数最多的字符和次数
    var max = 0;        //存储出现次数最多的次数
    var maxChar = null; //存储出现次数最多的字符
    for (var key in o) {
      if (max < o[key]) {
        max = o[key];   //max始终储存次数最大的那个
        maxChar = key;  //那么对应的字符就是当前的key
      }
    }
    console.log("最多的字符是" + maxChar);
    // console.log("出现的次数是" + max);
    if (maxChar == '1') {
      if (index == 1) {
        content = '车身总成 车壳,' + '前叶子板 左侧,' + '发动机罩,' + '前隔壁板总成'
      } else if (index == 2) {
        content = '燃油箱口盖,' + '后叶子板 右侧,' + '侧围骨架 右侧,' + '后叶子板内衬 右侧,' + '后门三角玻璃 右侧,' + '行李箱后装饰板' + '车身总成 车壳,' + '车顶总成'
      } else if (index == 0){
        content = '前风挡玻璃,' + '前风挡玻璃胶条 右侧,'
      }else if(index == 3){
        content = '尾门总成,' + '尾门玻璃,' + '尾门密封胶条,' + '阅读灯,' + '高位刹车灯,' + '后行李箱线束,'
      }

    } else if (maxChar == '2') {
      if (index == 1) {
        content = '车顶前扶手,' + '驾驶员座椅总成,' +'天窗玻璃,' + '前门安全气囊 左侧,' + '前门框密封条 左侧,' + '前门上铰链 左侧,' + '前门锁机构 左侧,' + ' 侧围骨架 左侧,' + '前门玻璃升降开关装饰板 左侧,' + '前门玻璃升降开关 左侧,' + '前门密封胶条 左侧,' + '仪表台杂物箱,' + '仪表台侧护板 左侧,' + '驾驶员座椅安全带,' + 'A柱外板 左侧,' + 'A柱加强筋 左侧,' + '车顶边梁外板 左侧,' + '车顶外板,' + '车顶内衬,' + '车顶横粱  前部,' + '前门玻璃 左侧,' + '前门壳 左侧,' + '前门内饰板 左侧,' + '前门外拉手饰盖 左侧,' + '前门扶手 左侧,' + '前门内拉手 左侧,' + '点烟器,' + '倒车镜总成 左侧,'+'天窗遮阳板,'+'后视镜（倒车镜）,'
      } else if (index == 2) {
        content = '车顶总成,' + '后门玻璃 右侧,' + '后座椅总成,' + '后门内饰板 右侧,' + '后门外拉手 右侧,' + '后门内拉手 右侧,' + '前门窗框外饰板 右后,' + '后门锁总成 右侧,' + ' 后门上铰链 右侧,' + '后座椅侧安全带 右侧,' + '前门壳 右侧,' + '前门内饰板 右侧,' + '前门外拉手 右侧,' + '前门内拉手 右侧,' + '前门扶手 右侧,' + '尾门玻璃密封条,' + '侧围骨架 右侧,' + '后门总成 右侧,' + '车顶扶手,' + '天窗玻璃,' + '后门框密封条 右侧,' + '车顶边梁外板 右侧,' + '车顶外板,' + '车顶内衬,' + '车顶横粱  前部,' + '阅读灯,' + '车身总成 车壳'
      } else if (index == 0){
        content = '前风挡玻璃,' + '雨量传感器,' + '前风挡玻璃胶条 左侧,'
      }else if(index == 3){
        content = '尾门总成,' + '尾门玻璃,' + '尾门玻璃密封条,' + '阅读灯,' + '高位刹车灯,' + '后行李箱线束,'
      }
    } else if (maxChar == '3') {
      if (index == 1) {
        content = '后门总成,' + '后门玻璃密封条,' + '后门框密封条 左侧,' + '前门窗框外饰板 左侧,' + ' 后门锁总成 左侧,' + '后门上铰链 左侧,' + '后门三角玻璃 左侧,' + '后座椅侧安全带 左侧,' + '后门玻璃 左侧,' + '天窗玻璃,' + '后门外拉手 左侧,' +'后门内拉手 右侧,' + '侧围骨架 左侧,' + '车顶边梁外板 左侧,' + '车顶外板,' + '车顶内衬,' + '车顶横粱 中间 ,' + '车顶总成,' + '后座椅总成,' + '后门内饰板 左侧,' + '车身总成 车壳,' + '后门壳 左侧,' + '前门内饰板 左侧,' + '前门外拉手 左侧,' + '前门内扶手,' + '前门内拉手框 左侧'
      } else if (index == 2) {
        content = '前门壳 右侧,' + '前门玻璃 右侧,' + '前门内饰板 右侧,' + '前门外拉手 右侧,' + '前门内拉手 右侧,' + '前门扶手 右侧,' + '遮阳板 右侧,' + '前门玻璃内压条 右侧,' + '副驾驶员座椅总成,' + '前门上铰链 右侧,' + '前门锁机构 右侧,' + '前门玻璃升降开关装饰板 右侧,' + '前门扬声器罩 右侧,' + '前门密封胶条 右侧,' + '仪表台侧护板 右侧,' + '前座椅侧安全带 右侧,' + '前挡风玻璃密封条,' + '车顶内饰板 前部,' + 'A柱外板 右侧,' + 'A柱加强筋 右侧,' + '前门扬声器 右侧,' + '前门框密封条 右侧,' + '前门锁总成 右侧,' + '侧围骨架 右侧,' + '仪表台杂物箱,' + '前门锁栓 右侧,' + '前门线束 右侧,' + '变速器换挡杆头,' + '车顶扶手,' + '副驾驶员安全气囊,' + '车顶边梁外板 右侧,' + '车顶外板,' + '车顶内衬,' + '车顶横粱,' + '倒车镜总成 右侧,' + '阅读灯,'+ '车顶总成,'
      }else if(index == 0){
        content = '仪表台骨架,' + '仪表台壳,' + '发动机罩,' + '发动机罩内衬,' + '发动机隔热板,' + '副气囊,' + '侧气囊,'+ '前风挡玻璃,' + '发动机罩铰链 右侧,' +'前叶子板 右侧,' + 'ABS电脑,' + '散热器补水壶,' + '前罩板导水板,' +'大灯 右侧,'
      }else if(index == 3){
        content = '外尾灯 左侧,' + '尾门壳,' + '后行李箱线束,' + '行李箱后装饰板,' + '保险盒总成,' + '蓄电池'
      }
    } else if (maxChar == '4') {
      if (index == 1) {
        content = '后叶子板内衬 左侧,' + '后叶子板 左侧,' + '行李箱后装饰板,' + '燃油箱口盖,' + '后叶子板 左侧,' + '后门三角玻璃 左侧,' + '侧围骨架 左侧,' + '车顶总成,' + '车身总成 车壳'

      } else if (index == 2) {
        content = '前翼子板标识 右侧,' + '变速箱总成,' + '前叶子板 右侧,' + '发动机罩,' + '车身总成 车壳'
      }else if(index == 0){
        content = '前叶子板 左侧,' + '发动机罩内衬,' + '气囊卷簧,' + '副气囊,' + '侧气囊,' + '前风挡雨刮连杆,' + '前风挡雨刮电机,' + '仪表台骨架,' + '仪表台壳,' + '发动机罩,' + '发动机隔热板,' + '倒车镜总成 左侧,' + '前风挡玻璃,' + '发动机电脑,' + '驾驶员安全气囊,' + '散热器补水壶,' + '前罩板导水板,' +'大灯 左侧,'
      }else if(index == 3){
        content = '外尾灯 右侧,' + '尾门壳,' + '后行李箱线束,' + '行李箱后装饰板,' + '保险盒总成'
      }
    } else if (maxChar == '5') {
      if (index == 1) {
        content = '前转向节 左侧,' + '前下摆臂 左侧,' + '前轮毂,' + '轮胎,' + '前制动钳 左侧,' + '转向横拉杆拉杆球头 左侧,' + '前下摆臂 左侧,' + '前平衡杆,' + '前半轴 左侧,' + '元宝梁,' + '轮毂盖,' + '前轮罩板 左侧,' + '前转向节 左侧,' + '前上摆臂 左侧,' + '前下控制臂 左侧,' + '转向管柱下十字连接轴,' + '转向管柱,' + '前制动钳 左侧,' + '前叶子板 左侧,' + '前减震器总成 左侧,' + '散热器电子扇总成,' + '散热器补水壶,' + '发动机支架 左侧,' + '前雾灯 左侧,' + '前制动器挡泥板 左侧,' + '车身总成 车壳,' + '大灯 左侧'
      } else if (index == 2) {
        content = '减震器总成,' + '后保险杠皮,' + '后保险杠支架,' + '后轮罩 右侧,' + '备胎槽,' + '燃油滤清器,' + '后制动钳,' + '后刹车片,' + '后下摆臂 右侧,' + '轮毂,' + '钢圈,' + '燃油泵,' + '后制动盘,' + '后制动钳 右侧,' + '制动助力器,' + '轮毂盖,' + '后地板,' + '后制动分泵 右侧,' + '燃油箱'
      } else if (index == 0){
        content = '大灯 右侧,' + '蓄电池,' + '前隔壁板总成,' + '前隔壁板隔热板,' + 'ABS泵,' + '发动机罩徽标,' + '前隔壁板上挡板,' + '发动机罩内衬,' +'前叶子板 右侧,' + '发动机罩,' + '发动机隔热板,' + '前风挡雨刮清洗器泵,' + '蓄电池电缆,' + '保险盒总成,' + '发动机线束,' + '空调泵,' + '散热器风圈,' + '散热器框架,' + '前保险杠支架 右侧,' + '高音喇叭,' + '大灯喷水嘴 右侧,' + '发动机罩进气格栅,' + '发动机总成,' + '发动机支架,' + '散热器上护板,' + '散热器密封条,' + '转向助力泵,' + '大灯安装底板 右侧,'
      }else if(index == 3){
        content = '后保险杠骨架,' + '后保险杠内衬,' + '后保险杠缓冲器,' + '后保险杠支架,' + '后保险杠' + '后纵梁 左侧,' + '消声器,'
      }
    } else if (maxChar == '6') {
      if (index == 1) {
        content = '前门下铰链 左侧,' + '底大边 左侧,' + '仪表台下护板 左侧,' + ' 前门扬声器 左侧,' + '前门框密封条 左侧,' + '前门锁总成 左侧,' + '前门锁机构 左侧,' + '前门扬声器罩 左侧,' + '前门密封胶条 左侧,' + '仪表台杂物箱,' + '驾驶员座椅安全带,' + '前门锁栓 左侧,' + '前门线束 左侧,' + '门锁遥控器总成,' + '底盘线束,' + '点烟器,' + '前门壳 左侧,' + '前门内饰板 左侧,' + '前门外拉手 左侧,' + '前门扶手 左侧,' + '前门内拉手 左侧'
      } else if (index == 2) {
        content = '底大边 右侧,' + '后门下铰链 右侧,' + '后座椅总成,' + ' 后门内饰板,' + '变速器差速器,' + '后门锁总成 右侧,' + '后座椅侧安全带 右侧,' + '前车门总成,' + '前门内饰板 右侧,' + '前门外拉手 右侧,' + '前门扶手 右侧,' + '后门总成 右侧,' + '燃油泵,' + '后门框密封条 右侧,' + '后地板,' + '燃油箱,' + '底盘线束,' + '车身总成 车壳'
      } else if (index == 0){
        content = '大灯 左侧,' + '前隔壁板总成,' + '发动机罩拉线手柄,' + '前隔壁板上挡板,' + '前叶子板 左侧,' + '蓄电池,' + '气囊电脑,' + '发动机罩内衬,' + '前保险杠支架 左侧,' + '大灯安装底板 左侧,' + '大灯喷水嘴 左侧,' + '前隔壁板隔热板,' + '发动机罩徽标,' + '空调泵,' + '散热器风圈,' + '发动机罩进气格栅,' + '发动机支架,' + '散热器上护板,' + '高音喇叭,' + '前风挡雨刮清洗器泵,' + '散热器框架,' + '发动机隔热板,' + '散热器密封条,' + '发动机总成,' + '转向助力泵,'
      }else if(index == 3){
        content = '后保险杠骨架,' + '后保险杠内衬,' + '后保险杠缓冲器,' + '后保险杠支架,' + '后保险杠皮' + '后纵梁 右侧,' + '消声器,'
      }
    } else if (maxChar == '7') {
      if (index == 1) {
        content = '变速器差速器,' + '后地板,' + '后门下铰链 左侧,' + '燃油箱,' + '后门框密封条 左侧,' + '底大边 左侧,' + '后门锁总成 左侧,' + '后座椅侧安全带 左侧,' + '后座椅总成,' + '后门内饰板 左侧,' + '底盘线束,' + '车身总成 车壳,' + '前门壳 左侧,' + '前门内饰板 左侧,' + '前门外拉手 左侧,' + '前门扶手 左侧,' + '前门内拉手 左侧'
      } else if (index == 2) {
        content = '前门下铰链 右侧,' + '仪表台下护板 右侧,' + '副驾驶员座椅总成,' + '前门锁机构 右侧,' + '底大边 右侧,' + '前门扬声器罩 右侧,' + '前门密封胶条 右侧,' + '副驾驶员座椅安全带,' + '前门壳 右侧,' + '前门内饰板 右侧,' + '前门外拉手 右侧,' + '前门扶手 右侧,' + '前门内拉手 右侧,' + '前门扬声器 右侧,' + '前门框密封条 右侧,' + '前门锁总成 右侧,' + '仪表台杂物箱,' + '前门锁栓 右侧,' + '前门线束 右侧,' + '底盘线束,' + '车身总成 车壳'
      }else if(index == 0){
        content = '前隔壁板总成,' + '前保险杠皮 上端,' + '前雾灯 右侧,' + '前轮挡泥板 右侧,' + '前保险杠拖车钩盖板,' + '前雾灯支座 右侧,' + '前雾灯护罩 右侧,' + '元宝梁,' + '增压中冷器,' + '冷凝器,' + '散热器,' + '散热器电子扇总成,' + '转向器,' + '前保险杠牌照板,' + '前纵梁,' + '前保险杠皮,'
      }
    } else if (maxChar == '8') {
      if (index == 1) {
        content = '后保险杠总成,' + '后保险杠支架,' + '后轮罩 左侧,' + '后下摆臂 左侧,' + '后轮毂 左侧,' + '轮毂盖,' + '后地板,' + '备胎槽,' + '燃油箱,' + '前减震器总成 左侧,' + '车身总成 车壳'
      } else if (index == 2) {
        content = '前减震器总成 右侧,' + '前转向节 右侧,' + '转向横拉杆,' + '转向横拉杆拉杆球头 右侧,' + '前下摆臂 右侧,' + '前平衡杆,' + '前半轴 右侧,' + '元宝梁,'  + '前轮罩板 右侧,' + '前转向节 右侧,' + '前上摆臂 右侧,' + '前下控制臂 右侧,' + '前雾灯 右侧,' + '前制动器挡泥板 右侧,' + '前下摆臂 右侧,' + '前轮毂 左侧,' + '轮胎,' + '轮毂盖,' + '前叶子板 右侧,' + '大灯 右侧,' + '车身总成 车壳'
      }else if(index == 0){
        content = '前隔壁板总成,' + '前雾灯 左侧,' + '前雾灯支座 左侧,' + '前雾灯护罩 左侧,' + '前保险杠拖车钩盖板,' + '增压中冷器,' + '冷凝器,' + '散热器,' + '散热器电子扇总成,' + '前保险杠牌照板,' + '前纵梁,' + '前保险杠皮,' + '元宝梁,' + '转向横拉杆拉杆球头,' + '前保险杠皮 上端,' + '转向器,' 
      }
    }

    that.setData({
      content: content,
      numbers: numbers
    })

  },
/*下一步 */
  btn() {
    let that = this;
    console.log(that.data.content)
    if (that.data.content == '' || that.data.content == undefined || that.data.content == 'undefined') {
      wx.showToast({
        title: '请标记正确的位置',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    wx.navigateTo({
      url: 'peijianlist/peijianlist?content=' + that.data.content + '&mikey=' + that.data.mikey + '&vin=' + that.data.vin
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
    let that = this;
    that.setData({
      content: ''
    })
    let ctx = wx.createCanvasContext('myCanvas')
    let width = that.data.width
    ctx.clearRect(0, 0, width, 500)
    ctx.draw()
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