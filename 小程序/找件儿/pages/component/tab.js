// pages/component/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		 current: {
            type: Number,
            value: 0
        }
  },

  /**
   * 组件的初始数据
   */
  data: {
			"list": [
				{
          "pagePath": "../inde/inde",
					"iconPath": "../image/syicon.png",
          "selectedIconPath": "../image/syicont.png",
					"text": "首页"
				},
				{
          "pagePath": "../classify/classify",
          "iconPath": "../image/ddicon.png",
          "selectedIconPath": "../image/ddicont.png",
					"text": "配件查询"
				},
				{
          "pagePath": "../my/my",
          "iconPath": "../image/myicon.png",
          "selectedIconPath": "../image/myicont.png",
					"text": "我的"
				}
			]
  },

  /**
   * 组件的方法列表
   */
  methods: {
			tabclick(e){
					
			},
  }
})
