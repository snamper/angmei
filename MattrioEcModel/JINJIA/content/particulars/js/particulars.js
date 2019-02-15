var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
var data=JSON.parse(sessionStorage.data)
//console.log(data)
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var title=getUrlParam('number')
var show=getUrlParam('show')
var car=decodeURIComponent(getUrlParam('car'))
var foreign=getUrlParam('foreign')
//console.log(foreign)
datalistfun(data)
function datalistfun(data){
	var len=data.length;
		for(var i = 0; i < len; i++) {
			for(var j = i + 1; j < len; j++) {
				if(data[i].product_id == data[j].product_id) { //通过id属性进行匹配；
					data.splice(j, 1); //去除重复的对象；
					len--;
					j--;
			 	}
			}

		}
	$.each(data, function(key,value) {
		value.src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/mishu/'+value.product_id+'.jpg'
	});
}
var app=new Vue({
	el:'#app',
	data:{
		show:show,
		title:title,
		cartitle:car,
		datalist:data,
		arrl:[],
		arri:[],
		arrs:[],
		zjclist:'',
		cartype:'',
		year:'',
		output:'',
		isShow:[],
		length:data.length,
		oe:'',
		foe:'',
		sh:'',
		foreign:false,
		numtab:foreign,
		num:4,
		Manufacture:'',
		Vehicle_Name:'请选择车型',
		Year_of_production:'请选择年份',
		year_EN:'请选择年份',
		EOP_Year:'',
		Capacity:'请选择排量',
		Engine_Code:'',
		loading:false,
        errorShow:false,
        product_id:'',
        new_product_id:'',
        phone:'',
        name:''
	},
	mounted:function(){
		var that=this;
		that.loading=true
		fun(that.datalist,that)
		if(!foreign){
			$.ajax({
				type:"post",
				url:network+"/MattrioEcModel/SelectLongCarIntface/getManufacture",
				async:false,
				data:{
					"brand_id":username_id
				},
				success:function(data){
					$.each(data,function(key,value){
						value.szm=makePy(value.Manufacture_CN.charAt(0))[0].toUpperCase()	
					})
	//				console.log(data)
					data= data.sort (function(item1,item2){
					    return item1.szm.localeCompare(item2.szm)
					})
					that.zjclist=data
					that.zjclists=data
					that.loading=false
				},error:function(){
						
				}
			});	
		}else{
			$.ajax({
				type:"post",
				url:network+"/MattrioEcModel/SelectCarIntface/getManufactureEn",
				async:false,
				data:{
					"brand_id":username_id
				},
				success:function(data){
					$.each(data,function(key,value){
						value.szm=value.Manufacture_EN.charAt(0).toUpperCase()	
					})
					data= data.sort (function(item1,item2){
					    return item1.szm.localeCompare(item2.szm)
					})
					that.zjclist=data
					that.zjclists=data
					that.loading=false
//					console.log(that.zjclist)
				},error:function(){
						
				}
			});	
		}
	},
	methods:{
		//查看完整产品细节
		btn:function(id,name,oe,mikey){
			if(mikey){
				window.open('../../content/detail/detail.html?id='+id+'&name='+encodeURIComponent(name)+'&oe='+oe+'&mikey='+mikey+'&foreign=true',' ','width=1000px,height=500px,left=50px,top=50px,toolbar=yes,menubar=yes, scrollbars=yes, resizable=yes, location=no, status=no')	
			}else{
				window.open('../../content/detail/detail.html?id='+id+'&name='+encodeURIComponent(name)+'&oe='+oe,' ','width=1000px,height=500px,left=50px,top=50px,toolbar=yes,menubar=yes, scrollbars=yes, resizable=yes, location=no, status=no')
			}
		},
		click:function(index){
			this.num=index
		},
		oninput:function(){
	    	funInput()
		},
		/*车型*/
		zjcclick:function(Manufacture){
			var that=this;
			that.loading=true
			if(!foreign){
				$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/SelectLongCarIntface/getVehicleName',
					data:{
					    "brand_id":username_id,
					    "Manufacture":Manufacture
					},
					success:function(data){
						that.num=1
						that.cartype=data
						that.Manufacture=Manufacture
						that.Vehicle_Name='请选择车型',
						that.Year_of_production='请选择年份',
						that.Capacity='请选择排量'
						that.loading=false
					},error:function(){
						
					}
				})	
			}else{
				$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/SelectCarIntface/getVehicleNameEn',
					data:{
					    "brand_id":username_id,
					    "Manufacture_EN":Manufacture
					},
					success:function(data){
						that.num=1
						that.cartype=data
						that.Manufacture=Manufacture
						that.Vehicle_Name='请选择车型',
						that.year_EN='请选择年份'
						that.Capacity='请选择排量'
						that.Engine_Code=''
						that.loading=false
					},error:function(){
						
					}
				})
			}
		},
		/*年份*/
		typeclick:function(cartype){
			var that=this;
			that.loading=true
			if(!foreign){
				$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/SelectLongCarIntface/getYear',
					data:{
					    "brand_id":username_id,
						"Manufacture":that.Manufacture,
						"Vehicle_Name":cartype
					},
					success:function(data){
						that.year=data
						that.num=2
						that.Vehicle_Name=cartype
						that.Year_of_production='请选择年份',
						that.Capacity='请选择排量'
						that.loading=false
					},error:function(){
						
					}
				})	
			}else{
				$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/SelectCarIntface/getCapacityEn',
					data:{
					    "brand_id":username_id,
						"Manufacture_EN":that.Manufacture,
						"Vehicle_Name_EN":cartype
					},
					success:function(data){
						that.year=data
						that.num=2
						that.Vehicle_Name=cartype
						that.year_EN='请选择年份'
						that.Capacity='请选择排量'
						that.Engine_Code=''
						that.loading=false
					},error:function(){
						
					}
				})
			}
		},
		/*排量*/
		yearclick:function(year,Engine_Code){
			var that=this;
			that.loading=true
			if(!foreign){
				$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/SelectLongCarIntface/getCapacity',
					data:{
					     "brand_id":username_id,
					      "Manufacture":that.Manufacture,
					      "Vehicle_Name":that.Vehicle_Name,
					      "Year":year
					},
					success:function(data){
						that.output=data
						that.num=3
						that.Year_of_production=year
						that.Capacity='请选择排量'
						that.loading=false
					},error:function(){
						
					}
				})	
			}else{
				$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/SelectCarIntface/getYearEn',
					data:{
					     "brand_id":username_id,
					      "Manufacture_EN":that.Manufacture,
					      "Vehicle_Name_EN":that.Vehicle_Name,
					      "Capacity":year,
					      "Engine_Code":Engine_Code
					},
					success:function(data){
						that.output=data
						that.num=3
						that.Capacity=year
						that.Engine_Code=Engine_Code
						that.year_EN='请选择年份'
						that.loading=false						
					},error:function(){
						
					}
				})
			}
		},
		/*排量点击*/
		outputclick:function(output,EOP_Year){
			this.outputshow=false;
			this.num=4
			if(!foreign){
				this.Capacity=output;
			}else{
				this.year_EN=output+'-'+EOP_Year
				this.Year_of_production=output;
				this.EOP_Year=EOP_Year;
			}
		},
		carbtn:function(){
			var that=this;
			if(that.Manufacture==''){
				alert('请选择主机厂')
				return false;
			}
			if(that.Vehicle_Name=='请选择车型'){
				alert('请选择车型')
				return false;
			}
			if(!foreign){
				if(that.Year_of_production=='请选择年份'){
					alert('请选择年份')
					return false;
				}else if(that.Capacity=='请选择排量'){
					alert('请选择排量')
					return false;
				}
			}else if(foreign){
				if(that.Capacity=='请选择排量'){
					alert('请选择排量')
					return false;
				}else if(that.year_EN=='请选择年份'){
					alert('请选择年份')
					return false;
				}
			}
			
			that.loading=true
			if(!foreign){
				$.ajax({
					type:'post',
					url:network+"/MattrioEcModel/SelectLongCarIntface/getProducts",
					data:{
					    "brand_id":username_id,
						"category_id": "'A'",
						"Manufacture":that.Manufacture,
						"Vehicle_Name":that.Vehicle_Name,
						"Year":that.Year_of_production,
						"Capacity":that.Capacity
					},
					success:function(data){
						datalistfun(data.list)
						that.length=data.list.length
						$.each(data.list, function(key,value) {
							value.src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/mishu/'+value.product_id+'.jpg'	
						});
						sessionStorage.setItem('data',JSON.stringify(data.list))
						that.datalist=JSON.parse(sessionStorage.data)
						that.show=2
						that.cartitle=that.Manufacture+' '+that.Vehicle_Name
						history.replaceState(null, null, "?number="+'&car='+encodeURIComponent(that.cartitle)+'&show=2');
						fun(that.datalist,that)
						that.loading=false
					},error:function(){
						
					}
				})
			}else{
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/SelectCarIntface/QueryCarEn",
					data:{
					    "brand_id":username_id,
						"Manufacture_EN":that.Manufacture,
						"Vehicle_Name_EN":that.Vehicle_Name,
						"Capacity":that.Capacity,
						"Engine_Code":that.Engine_Code,
						'Launch_year':that.Year_of_production,
						'EOP_Year':that.EOP_Year
					},
					success:function(data){
						datalistfun(data.list)
						that.length=data.list.length
						$.each(data.list, function(key,value) {
							value.src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/mishu/'+value.product_id+'.jpg'	
						});
						sessionStorage.setItem('data',JSON.stringify(data.list))
						that.datalist=JSON.parse(sessionStorage.data)
						that.show=2
						that.cartitle=that.Manufacture+' '+that.Vehicle_Name
						history.replaceState(null, null, "?number="+'&car='+encodeURIComponent(that.cartitle)+'&show=2&foreign=true');
						fun(that.datalist,that)
						that.loading=false
					},error:function(){
						
					}
				});
			}
		},
		//获取部分适配车型
		carclick:function(id,index,mikey){
			var that=this;
            that.isShow[index] = !that.isShow[index];
            if(!mikey){
            	$.ajax({
					type:'post',
					url:network+'/MattrioEcModel/ProductIntface/getProductLongCars',
					async:false,
					data:{
						'brand_id':username_id,
						'product_id':id,
						'group_name':'Manufacture_CN'
					},
					success:function(data){
						that.arrl.splice(index,1,data.list)
						if(data.info!=[]||data.info.length!=0){
							var ar=[]
							var arr=[]
							$.each(data.info,function(key,value){
								if(value.parameter_cn=='流量L/H'||value.parameter_cn=='压力BAR'||value.parameter_cn=='压力bar'){
									ar.push(value)
								}else{
									arr.push(value)
								}
							})
							that.arri.splice(index,1,ar)
							that.arrs.splice(index,1,arr)
						}
					},error:function(){
						
					}
				})		
           }else{
            	$.ajax({
            		type:"post",
            		url:network+"/MattrioEcModel/ProductIntface/getProductEnCars",
            		async:false,
					data:{
						'brand_id':username_id,
						'product_id':id,
						'mikey':mikey,
						'group_name':'Manufacture_EN,Vehicle_Name_EN'					
					},
					success:function(data){
						app.foreign=true
						that.arrl.splice(index,1,data.car_info)
						if(data.info!=[]||data.info.length!=0){
							var ar=[]
							var arr=[]
							$.each(data.info,function(key,value){
								if(value.parameter_cn=='流量L/H'||value.parameter_cn=='压力BAR'||value.parameter_cn=='压力bar'){
									ar.push(value)
								}else{
									arr.push(value)
								}
							})
							that.arri.splice(index,1,ar)
							that.arrs.splice(index,1,arr)
						}
					},error:function(){
						
					}
            	});
            }
		},
		/*品牌编码oe查询*/
		numbtn:function(){
			var that=this;
			if(that.oe!=''){
				that.loading=true
				oenum(that,that.oe)
			}else{
				alert('请输入编码')
			}
		},
		cpfocus:function(){
			this.sh=''			
		},
		shfocus:function(){
			this.oe=''
		},
		doc:function(){
			this.num=4;
		},
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
function oenum(that,num){
	$.ajax({
						type:'post',
						url:network+"/MattrioEcModel/SelectLongCarIntface/getOeNumber",
						async:false,
						data:{
							'brand_id':username_id,
							'oenumber':num.replace(/\s+/g,""),
							'group_name':'product_id'
						},
						success:function(data){
							if(data.list.length == 0 || data.list == []){
				        		$.ajax({
									type:"POST",
									url:network+"/MattrioEcModel/SelectCarIntface/getProductEn",
									data:{
										"brand_id":username_id,	
										'product_id':num,
										'group_name':'Manufacture_EN,Vehicle_Name_EN'
									},
									dataType:"json",
									success:function(data){
										if(data.list==[]||data.list.length==0){
											$.ajax({
											        type:"post",
											        url:network+"/MattrioEcModel/ProductIntface/getBrandProductId",
											        data:{
											        	"brand_id":username_id,
											            "brand_product_id":num.replace(/\s+/g,""),
											        },
											        dataType:"json",
											        success:function(data){
											        	if(data.list.length == 0 || data.list == []){
											        		that.loading=false
											        		alert("没有查询到结果");
											        		return false;
											        	}
										        		var num=data.list[0].parameter_cn+'：'+data.list[0].describe
										        		oenum(that,data.list[0].product_id)										        		
											        },
											        error:function(data){
														alert("请求失败");
											        }	
									   		 })											
											return false;
										}
										that.loading=false
										datalistfun(data.list)
										addDataList(num.replace(/\s+/g,""))
										that.datalist=data.list
										fun(data.list,that)
										that.show=1
										that.title=num.replace(/\s+/g,"")
										that.length=data.list.length
										$.each(data.list, function(key,value) {
											value.src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/mishu/'+value.product_id+'.jpg'	
										});
							        	sessionStorage.setItem('data',JSON.stringify(data.list)) 	
							        	history.replaceState(null, null, "?number="+num.replace(/\s+/g,"")+"&show=1"+"&foreign=true");									        	
									},error:function(){
										
									}
								});
				        		return false;
				        }
							datalistfun(data.list)
							addDataList(app.oe.replace(/\s+/g,""))
							that.datalist=data.list
							fun(data.list,that)
							that.show=1
							that.title=that.oe.replace(/\s+/g,"")
							that.length=data.list.length
							$.each(data.list, function(key,value) {
								value.src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/mishu/'+value.product_id+'.jpg'	
							});
				        	sessionStorage.setItem('data',JSON.stringify(data.list)) 	
				        	history.replaceState(null, null, "?number="+that.oe.replace(/\s+/g,"")+"&show=1");				        	
				        	that.loading=false
						},error:function(){
							
						}
					})
}
  function funInput(){
			var arr=[]
				$.each(app.zjclists,function(key,value) {
					if(!foreign){
						if(value.Manufacture_CN.indexOf(app.Manufacture.toUpperCase())!=-1||value.szm.indexOf(app.Manufacture.toUpperCase())!=-1){
							arr.push(value)
						}	
					}else{
						if(value.Manufacture_EN.indexOf(app.Manufacture.toUpperCase())!=-1||value.szm.indexOf(app.Manufacture.toUpperCase())!=-1){
							arr.push(value)
						}	
					}					
				});
	
				if(arr==[]||arr.length==0){
					app.zjclist=arr
				}else if(app.Manufacture==''){
					app.none='可搜索如:宝马'
					app.zjclist=app.zjclists
				}else{
					app.none='可搜索如:宝马'
					app.zjclist=arr
				}	


 }
/*点击返回最顶部*/
$('.gotop').click(function(){
	$('html,body').animate({
		'scrollTop':'0px'
	},400)
})
  /*input添加历史搜索栏*/
  function addDataList(value) {
    var list = localStorage.getItem('number');
    if (list == null) {
        list = "";
        list += value + ',';
        localStorage.setItem('number', list);
    } else {
        if (list.indexOf(value) == -1) {
            list += value + ',';
            localStorage.setItem('number', list);
        }
    }
}
  /*手动进行分组*/
function fun(data,that){
		that.arrl=[];
		that.arri=[];
		that.arrs=[];
		that.isShow=[];
		$.each(data, function(key,value) {
				that.arrl.push([])
				that.arri.push([])
				that.arrs.push([])
				that.isShow.push(true)
		});
}
