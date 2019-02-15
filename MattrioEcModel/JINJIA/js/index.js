//localStorage.setItem("network","http://192.168.125.117:8080");  
localStorage.setItem("networkmodel","http://ec.51macc.com");
localStorage.setItem("username_id","mishu");  
var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");  
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var app=new Vue({
	el:'#app',
	data:{
		carlist:'',/*获取的车型*/
		carlists:'',/*获取的车型*/
		fcarlist:'',/*国外获取的车型*/
		fcarlists:'',/*guowai获取的车型*/
		inp:'',/*input的值*/
		finp:'',/*国外input的值*/
		num:0,
		fnum:0,
		none:'可搜索如:宝马',
		typelist:'',
		type:'请选择车型',
		ftypelist:'',/*国外车型*/
		ftype:'请选择车型',
		yearlist:'',
		year:'请选择年份',
		fyearlist:'',/*国外年份*/
		fyear:'请选择年份',
		Launch_year:'',
		EOP_Year:'',
		outputlist:'',
		output:'请选择排量',
		foutputlist:'',/*国外排量*/
		foutput:'请选择排量',
		Engine_Code:'',
		oe:'',
		foe:'',
		sh:'',
		numtab:true,/*编码查询切换*/
		cartab:true/*车型查询切换*/,
		loading:false
	},
	mounted:function(){
		//获取全部主机厂
		var that=this;
		that.loading=true
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
				data= data.sort (function(item1,item2){
				    return item1.szm.localeCompare(item2.szm)
				})
				that.carlist=data
				that.carlists=data
				that.loading=false
			},error:function(){
				alert("请求失败");
			}
		});
	},
	methods:{
	    oninput:function(e){
	    	this.typelist=''
	    	fun(true)
		},
		inpfocus:function(num){
			this.inp=''
		   	this.num=num
		   	this.type='请选择车型'
	    	this.year='请选择年份'
	    	this.output='请选择排量'
		   	fun(true)
		},
		carclick:function(car,num,which){
			var that=this
		   	that.num=num
		   	that.loading=true
		   	if(which==1){
		   		/*获取车型*/
		   		app.inp=car
		   		$.ajax({
					type:"post",
					url:network+'/MattrioEcModel/SelectLongCarIntface/getVehicleName',
					data:{
						"brand_id":username_id,
						"Manufacture":that.inp
					},
					success:function(data){
						that.typelist=data	
						that.loading=false
						that.num=which+1
					},error:function(){
						alert("请求失败");	
					}
				});
		   	}else if(which==2){
		   		/*年份*/
		   		that.type=car
		   		that.year='请选择年份'
	    		that.output='请选择排量'
	    		$.ajax({
					type:"post",
					url:network+'/MattrioEcModel/SelectLongCarIntface/getYear',
					data:{
						"brand_id":username_id,
						"Manufacture":that.inp,
						"Vehicle_Name":that.type
					},
					success:function(data){
							that.yearlist=data
							that.loading=false
							that.num=which+1
					},error:function(){
						alert("请求失败");	
					}
				});
		   	}else if(which==3){
		   		/*排量*/
		   		that.year=car	
		   		that.output='请选择排量'
		   		$.ajax({
					type:"post",
					url:network+'/MattrioEcModel/SelectLongCarIntface/getCapacity',
					data:{
						"brand_id":username_id,
						"Manufacture":that.inp,
						"Vehicle_Name":that.type,
					    "Year":app.year
					},
					success:function(data){
							that.outputlist=data	
							that.loading=false
							that.num=which+1
					},error:function(){
						alert("请求失败");	
					}
				});
		   	}else if(which==4){
		   		that.output=car	
		   		that.loading=false
		   	}
		},
		typeclick:function(num){	
          if(num==2){
          	/*车型*/
          	 if(app.inp==''){
	          	alert('请选择主机厂')
	          	return false;
	          }
          }else if(num==3){
          	/*年款*/
          	if(app.type=='请选择车型'){
	          	alert('请选择车型')
	          	return false;
	          }
          }else if(num==4){
          	/*排量*/
          	if(app.year=='请选择年份'){
	          	alert('请选择年份')
	          	return false;
	        }
          }
          app.num=num
		},
		/*车型查询*/
		car:function(inland){
			/*国内*/
			var that=this;
			if(inland){
				if(that.inp==''){
					alert('请选择主机厂')
					return false;
				}else if(that.type=='请选择车型'){
					alert('请选择车型')
					return false;
				}else if(that.year=='请选择年份'){
					alert('请选择年份')
					return false;
				}else if(that.output=='请选择排量'){
					alert('请选择排量')
					return false;
				}
				this.loading=true
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/SelectLongCarIntface/getProducts",
					data:{
						"brand_id":username_id,
						"category_id": "'A'",
						"Manufacture":that.inp,
						"Vehicle_Name":that.type,
						"Year":that.year,
					    "Capacity":that.output
					},
					success:function(data){
						if(data.list.length == 0 || data.list == []){
			        		alert("没有查询到结果");
			        		return false;
			        }
						sessionStorage.setItem('data',JSON.stringify(data.list))
						var cartitle=encodeURIComponent(that.inp+' '+that.type)
						this.loading=false
						window.location.href='content/particulars/particulars.html?car='+cartitle+'&show=2'
					},error:function(){
						alert("请求失败");	
					}
				});
			}else{
				/*国外*/
				if(that.finp==''){
					alert('请选择主机厂')
					return false;
				}else if(that.ftype=='请选择车型'){
					alert('请选择车型')
					return false;
				}else if(that.fyear=='请选择年份'){
					alert('请选择年份')
					return false;
				}else if(that.foutput=='请选择排量'){
					alert('请选择排量')
					return false;
				}
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/SelectCarIntface/QueryCarEn",
					data:{
						"brand_id":username_id,
						"Manufacture_EN":that.finp,
						"Vehicle_Name_EN":that.ftype,
					    "Capacity":that.foutput,
					    'Engine_Code':that.Engine_Code,
					    "Launch_year":that.Launch_year,
					    'EOP_Year':that.EOP_Year
					},
					success:function(data){
						if(data.list.length == 0 || data.list == []){
			        		alert("没有查询到结果");
			        		return false;
			        	}
						sessionStorage.setItem('data',JSON.stringify(data.list))
						var cartitle=that.finp+' '+that.ftype
						this.loading=false
						window.location.href='content/particulars/particulars.html?car='+cartitle+'&show=2'+'&foreign=true'
					},error:function(){
						alert("请求失败");	
					}
				});
			}
		},
		/*产品编码oe查询*/
		btn:function(inland){
			var that=this;
//			if(inland){
//				if(that.oe!=''){
					numberajax(app.oe.replace(/\s+/g,""),true,1)				
//				}else if(that.sh!=''){
//					that.loading=true
//					$.ajax({
//				        type:"post",
//				        url:network+"/MattrioEcModel/ProductIntface/getBrandProductId",
//				        data:{
//				        	"brand_id":username_id,
//				            "brand_product_id":app.sh.replace(/\s+/g,""),
//				        },
//				        dataType:"json",
//				        success:function(data){
//				        	that.loading=false
//				        	if(data.list.length == 0 || data.list == []){
//				        		alert("没有查询到结果");
//				        		return false;
//				        	}
//				        	numberajax(data.list[0].product_id,false,3,data)				  
//				        },
//				        error:function(data){
//							alert("请求失败");
//				        }	
//		   		 })
//				}else{
//					alert("请输入编码");
//				}	
//			}
//			else{
//				if(that.foe==''){
//					alert('请输入编码')
//					return false;
//				}
//				that.loading=true
//				$.ajax({
//					type:"POST",
//					url:network+"/MattrioEcModel/SelectCarIntface/getProductEn",
//					data:{
//						"brand_id":username_id,	
//						'product_id':app.foe,
//						'group_name':'Manufacture_EN,Vehicle_Name_EN'
//					},
//					dataType:"json",
//					success:function(data){
//						that.loading=false
//						if(data.list==[]||data.list.length==0){
//							alert('暂无数据')
//							return false;
//						}
//						sessionStorage.setItem('data',JSON.stringify(data.list)) 	
//						window.location.href='content/particulars/particulars.html?number='+app.foe+'&show=1'+'&foreign=true'
//					},error:function(){
//						
//					}
//				});
//			}
		},
		cpfocus:function(){
			this.sh=''			
		},
		shfocus:function(){
			this.oe=''
		},
		mengshow:function(){
			$(".meng").show()
		},
		menghide:function(){
			$(".meng").hide()
		},
		/*国内*/
		numinland:function(){
			this.numtab=true
		},
		carinland:function(){
			this.cartab=true
		},
		/*国外编码*/
		numforeign:function(){
			this.numtab=false
		},
		carforeign:function(){
			this.cartab=false
		},
		/*国外*/
		foreign:function(){
			var that=this
			if(that.fcarlists==[]||that.fcarlists.length==0){
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/SelectCarIntface/getManufactureEn",
					data:{
						'brand_id':username_id
					},
					success:function(data){
						$.each(data,function(key,value){
							value.szm=value.Manufacture_EN.charAt(0).toUpperCase()	
						})
						data= data.sort (function(item1,item2){
					   		 return item1.Manufacture_EN.localeCompare(item2.Manufacture_EN)
						})
						that.fcarlist=data
						that.fcarlists=data
						that.loading=false
					}
				});	
			}
		},
		finpfocus:function(num){
			this.finp=''
			this.fnum=num
			this.ftype='请选择车型'
	    	this.fyear='请选择年份'
	    	this.foutput='请选择排量'
	    	this.Engine_Code=''
		   	fun()
		},
		foreignclick:function(car,which,car2){
			var that=this;
		   	that.fnum=0	
		   	/*获取车型*/
		   	that.loading=true
		   	if(which==1){
		   		that.finp=car
		   		$.ajax({
					type:"post",
					url:network+'/MattrioEcModel/SelectCarIntface/getVehicleNameEn',
					data:{
						"brand_id":username_id,
						"Manufacture_EN":that.finp
					},
					success:function(data){
						that.ftypelist=data	
						that.loading=false
						that.fnum=which+1
					},error:function(){
						alert("请求失败");	
					}
				});
		   	}else if(which==2){
		   		/*获取排量*/
		   		that.ftype=car
		   		that.fyear='请选择年份'
	    		that.foutput='请选择排量'
	    		that.Engine_Code=''
	    		$.ajax({
					type:"post",
					url:network+'/MattrioEcModel/SelectCarIntface/getCapacityEn',
					data:{
						"brand_id":username_id,
						"Manufacture_EN":that.finp,
						"Vehicle_Name_EN":that.ftype
					},
					success:function(data){
							that.foutputlist=data
							that.loading=false
							that.fnum=which+1
					},error:function(){
						alert("请求失败");	
					}
				});
		   	}else if(which==3){
		   		/*获取年份*/
		   		that.foutput=car	
		   		that.Engine_Code=car2
		   		that.fyear='请选择年份'		
		   		$.ajax({
					type:"post",
					url:network+'/MattrioEcModel/SelectCarIntface/getYearEn',
					data:{
						"brand_id":username_id,
						"Manufacture_EN":that.finp,
						"Vehicle_Name_EN":that.ftype,
					    "Capacity":that.foutput,
					    'Engine_Code':that.Engine_Code
					},
					success:function(data){
							that.fyearlist=data	
							that.loading=false
							that.fnum=which+1
					},error:function(){
						alert("请求失败");	
					}
				});
		   	}else if(which==4){
		   		that.Launch_year=car,
		   		that.EOP_Year=car2
		   		that.fyear=car+'-'+car2	
		   		that.loading=false
		   	}
		},
		foninput:function(e){
	    	this.ftypelist=''
	    	fun()
		},
		ftypeclick:function(num){	
          if(num==2){
          	/*车型*/
          	 if(this.finp==''){
	          	alert('请选择主机厂')
	          }
          }else if(num==3){
          	/*年款*/
          	if(this.ftype=='请选择车型'){
	         	alert('请选择车型')
	          }
          }else if(num==4){
          	/*排量*/
          	if(this.foutput=='请选择排量'){
	          	alert('请选择排量')
	        }
          }
          this.fnum=num
		},
		doc:function(){
			this.fnum=0;
			this.num=0
		}
		
	   
	}
})


$(document).click(function(e){
	e.stopPropagation()
	this.num=0
})
$('.gotop').click(function(){
	$('html,body').animate({
		'scrollTop':'0px'
	},400)
})

  function fun(Manufacture){
			var arr=[]
			if(Manufacture){
				$.each(app.carlists,function(key,value) {
					if(value.Manufacture_CN.indexOf(app.inp.toUpperCase())!=-1||value.szm.indexOf(app.inp.toUpperCase())!=-1){
						arr.push(value)
					}
				});
	
				if(arr==[]||arr.length==0){
					app.carlist=arr
				}else if(app.inp==''){
					app.none='可搜索如:宝马'
					app.carlist=app.carlists
				}else{
					app.none='可搜索如:宝马'
					app.carlist=arr
				}	
			}else{
				$.each(app.fcarlists,function(key,value) {
					if(value.Manufacture_EN.indexOf(app.finp.toUpperCase())!=-1||value.szm.indexOf(app.finp.toUpperCase())!=-1){
						arr.push(value)
					}
				});
				if(arr==[]||arr.length==0){
					app.fcarlist=arr
				}else if(app.finp==''){
					app.none='可搜索如:宝马'
					app.fcarlist=app.fcarlists
				}else{
					app.none='可搜索如:宝马'
					app.fcarlist=arr
				}				
			}


 }
  function numberajax(num,cp,show,parentsdata){
  	app.loading=true
  	$.ajax({
			        type:"post",
			        url:network+"/MattrioEcModel/SelectLongCarIntface/getOeNumber",
			        data:{
			        	"brand_id":username_id,
			            "oenumber":num,
			            'group_name':'product_id'
			        },
			        dataType:"json",
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
									        	app.loading=false
									        	if(data.list.length == 0 || data.list == []){
									        		alert("没有查询到结果");
									        		return false;
									        	}
									        	numberajax(data.list[0].product_id,false,3,data)				  
									        },
									        error:function(data){
												alert("请求失败");
									        }	
							   		 	})
										return false;
									}
									app.loading=false
									sessionStorage.setItem('data',JSON.stringify(data.list)) 	
									window.location.href='content/particulars/particulars.html?number='+num+'&show=1'+'&foreign=true'
								},error:function(){
									
								}
							});			        		
			        		return false;
			        	}	
			        	app.loading=false
			        	if(cp){
			        		addDataList('cp', app.oe.replace(/\s+/g,""));	
			        	}else{
			        		addDataList('sh', app.sh.replace(/\s+/g,""));
			        	}
			        	if(show==3){
			        		num=parentsdata.list[0].parameter_cn+'：'+parentsdata.list[0].describe
			        	}

			        	sessionStorage.setItem('data',JSON.stringify(data.list)) 	
						window.location.href='content/particulars/particulars.html?number='+num+'&show='+show
			        },
			        error:function(data){
						alert("请求失败");
			        }	
	   		 })
  }
  function addDataList(key, value) {
    var list = localStorage.getItem(key);
    if (list == null) {
        list = "";
        list += value + ',';
        localStorage.setItem(key, list);
    } else {
        if (list.indexOf(value) == -1) {
            list += value + ',';
            localStorage.setItem(key, list);
        }
    }
}