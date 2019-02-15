var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var product_id=getUrlParam('id')
var name=decodeURIComponent(getUrlParam('name'))
var oe=getUrlParam('oe')
var mikey=getUrlParam('mikey')
var foreign=getUrlParam('foreign')
if(foreign==null||foreign=='null'){
	foreign=false
}

var app=new Vue({
	el:'#app',
	data:{
		id:product_id,
		name:name,
		oe:oe,
		datalist:'',
		arrl:[],
		arri:[],
		arrs:[],
		src:'http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/mishu/'+oe+'.jpg',
		foreign:foreign,
        errorShow:false,
        product_id:'',
        new_product_id:'',
        phone:'',
        name:''
	},
	created:function(){
		var that=this
		if(!foreign){
			$.ajax({
				type: 'post',
				url: network + '/MattrioEcModel/ProductIntface/getProductLongCars',
				async: false,
				data: {
					'brand_id': username_id,
					'product_id': product_id,
					'group_name': 'Manufacture_CN'
				},
				success: function(data) {
					that.arrl=data.list					
					if(data.info != [] || data.info.length != 0) {
						var ar = []
						var arr = []
						$.each(data.info, function(key, value) {
							if(value.parameter_cn == '流量L/H' || value.parameter_cn == '压力BAR'||value.parameter_cn == '压力bar') {
								ar.push(value)
							} else {
								arr.push(value)
							}
						})
						that.arri=ar
						that.arrs=arr
					}
				},
				error: function() {
			
				}	
			})
			$.ajax({
				type: 'post',
				url: network + '/MattrioEcModel/ProductIntface/getProductLongCars',
				async: false,
				data: {
					'brand_id': username_id,
					'product_id': product_id
				},
				success: function(data) {
					that.datalist=data.list					
				},
				error: function() {
					
				}	
			})
		}else{
			$.ajax({
				type: 'post',
				url:network+'/MattrioEcModel/ProductIntface/getProductEnCars',
				data: {
					'brand_id': username_id,
					'product_id': product_id,
					'mikey':mikey,
					'group_name':'Manufacture_EN,Vehicle_Name_EN'
				},
				success: function(data) {
					that.datalist=data.list
					that.arrl=data.car_info
					if(data.info != [] || data.info.length != 0) {
						var ar = []
						var arr = []
						$.each(data.info, function(key, value) {
							if(value.parameter_cn == '流量L/H' || value.parameter_cn == '压力BAR'||value.parameter_cn == '压力bar') {
								ar.push(value)
							} else {
								arr.push(value)
							}
						})
						that.arri=ar
						that.arrs=arr
					}
				},
				error: function() {
			
				}	
			})	
		}
	},
    methods:{
        /*纠错*/
        errorClick:function(){
            this.errorShow=true;
            this.product_id='';
            this.new_product_id='';
            this.phone='';
            this.name='';
        },
        btnNone:function(){
            this.errorShow=false;
        },
        btnYes:function(){
            if(this.product_id==''){
                alert('请填写产品编码')
                return false;
            }else if(this.new_product_id==''){
                alert('请填写您认为的错误')
                return false;
            }else if(this.phone==''){
                alert('请填写手机号码')
                return false;
            }else if(this.name==''){
                alert('请填写姓名')
                return false;
            }
            if(confirm('是否提交错误')){
                $.ajax({
                    type:"post",
                    url:network+"/MattrioEcModel/ProductErrorCorrectionIntface/addProductErrorCorrection",
                    data:{
                        "brand_id":username_id,
                        "product_id":this.product_id,
                        "new_product_id":this.new_product_id,
                        "phone":this.phone,
                        "name":this.name
                    },
                    dataType:"json",
                    success:function(data){
                        alert("提交成功");
                        app.errorShow=false;
                    },
                    error:function(data){
                        alert("提交失败");
                    }
                })
            }
        }
    }

})