var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");  
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
 $(".search").click(function(){
 	window.location.href=" search.html"
 })
var car ;
var type;
var year;
var output;

$("#touch-search-show").click(function(){
	window.location.href="search.html"
})

  //所有的车
	$.ajax({
			type:"post",
			url:"https://www.51macc.com/api/Mattrio/SelectCar/getAllManufacture",
			dataType:"json",
			data:{
				"brand_id":username_id
			},
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				var arr=[];
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/SelectCarIntface/getManufacture",
					dataType:"json",
					data:{
						"brand_id":username_id
					},
					cache: false,
					crossDomain: true == !(document.all),
					success:function(datarr){
						$.each(datarr,function(key,val){
							val.car_icon=''
							$.each(data.all,function(ke,value){
								if(val.Manufacture_CN==value.car_name){
									val.car_icon=value.car_icon
								}
							})
						})
						
					var logos=[]
					var name=[]
					$.each(datarr,function(key,val){
	                   if(logos.indexOf(val.car_icon)=="-1"&&val.car_icon!=""){
	                   	  logos.push(val.car_icon)
	                   	  if(val.Manufacture_CN.indexOf("(")=="-1"){
	                   	  	 name.push(val.Manufacture_CN)
	                   	  }else{
	                   	  	name.push(val.Manufacture_CN.substring(0,val.Manufacture_CN.indexOf("(")))
	                   	  }                   	  
	                   }else if(val.car_icon==""){
		                   	logos.push("")
		                   	name.push(val.Manufacture_CN)
	                   }else if(logos.indexOf(val.car_icon)!=-1&&name.indexOf(val.Manufacture_CN)==-1&&val.Manufacture_CN.indexOf("(")=="-1"){
	                   		logos.push(val.car_icon)
		                   	name.push(val.Manufacture_CN)
	                   }
				})
				
				$.each(logos,function(key,val){
					var img1=$("<img src='"+val+"'/>")
					var div1 = $("<span class='num_name'>").html(name[key]);
					var div2 = $("<div class='sort_list clearfix'>");
					if(val!=""&&val.slice(val.lastIndexOf("/")+1)!=0){
						img1.appendTo(div2);
					}
					div1.appendTo(div2);
					div2.appendTo(".sort_box");	
				})
				initials();
								
				$(document).on("click",".sort_list",function(){
					$(".meng").show()
					$("body").addClass("overy")
					$('.initials').hide()
					$(".right_car").addClass("fixright")
					var stext=$(this).find('span').text()
					$(".right_car").html("")
					var that=$(this)
					$.each(datarr, function(key,val) {
						if(val.Manufacture_CN.indexOf(stext)!=-1&&val.Manufacture_CN.substr(0,stext.length)==stext){
							$.ajax({
								type:"post",
								url:network+"/MattrioEcModel/SelectCarIntface/getVehicleName",
								dataTyp:"json",
								data:{
									"brand_id":username_id,
									"Manufacture":val.Manufacture_CN
								},
								crossDomain: true == !(document.all),
								async: false,
								success:function(data){
									if(data==""){
										alert("暂无数据")
										return false
									}
										var div1=$("<div class='car_name_children'>")
										var div2=$("<div class='pos'>")
										var div3=$('<div class="pos_title">'+val.Manufacture_CN+'</div>')
										div3.appendTo(div2)
										div2.appendTo(div1)
										div1.appendTo(".right_car")
										var wrapcar=$("<div class='wrap_car'>")
										/*宝马搞特权  非得分类*/
										function fun(what1, what2) {
											var div = $("<div class='type_car_wrap'>").text(what2)
											$.each(data, function(key, val) {
												if (val.Vehicle_Series_Name_CN == what2) {
													var div1 = $("<div class='type_car'>").html(val.Vehicle_Name_CN);
													div1.appendTo(div);
												}
											})
											if(div.children().length==1){
												div.text(div.children().text()).prop('class','type_car')
												div.appendTo(wrapcar);
											}else{
												div.appendTo(wrapcar);
											}
										}
										var arr=[]
                                       if(val.Manufacture_CN=='宝马(华晨宝马)'){
                                         		fun(val.Vehicle_Series_Name_CN,'1系')
                                         		fun(val.Vehicle_Series_Name_CN,'X1')
                                         		fun(val.Vehicle_Series_Name_CN,'5系')
                                         		fun(val.Vehicle_Series_Name_CN,'3系')
                                         		fun(val.Vehicle_Series_Name_CN,'2系')
                                       }else if(val.Manufacture_CN=='宝马(进口)'){
												fun(val.Vehicle_Series_Name_CN,'Z3')
                                         		fun(val.Vehicle_Series_Name_CN,'2 Series [2系]')
                                         		fun(val.Vehicle_Series_Name_CN,'Z8')
                                         		fun(val.Vehicle_Series_Name_CN,'1 Series [1系]')
                                         		fun(val.Vehicle_Series_Name_CN,'Z4')
                                         		fun(val.Vehicle_Series_Name_CN,'X6')
                                         		fun(val.Vehicle_Series_Name_CN,'X5')
                                         		fun(val.Vehicle_Series_Name_CN,'X4')
                                         		fun(val.Vehicle_Series_Name_CN,'M Series [M系]')
                                         		fun(val.Vehicle_Series_Name_CN,'X3')
                                         		fun(val.Vehicle_Series_Name_CN,'i8')
                                         		fun(val.Vehicle_Series_Name_CN,'7 Series [7系]')
                                         		fun(val.Vehicle_Series_Name_CN,'5 Series [5系]')
                                         		fun(val.Vehicle_Series_Name_CN,'6 Series [6系]')
                                         		fun(val.Vehicle_Series_Name_CN,'4 Series [4系]')
                                         		fun(val.Vehicle_Series_Name_CN,'Alpina-B7')
                                         		fun(val.Vehicle_Series_Name_CN,'8 Series [8系]')
                                         		fun(val.Vehicle_Series_Name_CN,'3 Series [3系]')                                       	
                                       }else if(val.Manufacture_CN=='奔驰(北京奔驰)'){
                                       			fun(val.Vehicle_Series_Name_CN,'C级')
                                       			fun(val.Vehicle_Series_Name_CN,'E级')
                                       			fun(val.Vehicle_Series_Name_CN,'GLA级')
                                       			fun(val.Vehicle_Series_Name_CN,'GLC级')
                                       			fun(val.Vehicle_Series_Name_CN,'GLK级')
                                       }else if(val.Manufacture_CN=='奔驰(福建奔驰)'){
                                       			fun(val.Vehicle_Series_Name_CN,'V级')
                                       			fun(val.Vehicle_Series_Name_CN,'凌特')
                                       			fun(val.Vehicle_Series_Name_CN,'唯雅诺')
                                       			fun(val.Vehicle_Series_Name_CN,'威霆')
                                       }else if(val.Manufacture_CN=='奔驰(进口)'){
												fun(val.Vehicle_Series_Name_CN,'E-Class [E级]')
                                       			fun(val.Vehicle_Series_Name_CN,'S-Class [S级]')
                                       			fun(val.Vehicle_Series_Name_CN,'A-Class [A级]')
                                       			fun(val.Vehicle_Series_Name_CN,'A-Class AMG [A级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'AMG GT')
                                       			fun(val.Vehicle_Series_Name_CN,'B-Class [B级]')
                                       			fun(val.Vehicle_Series_Name_CN,'C-Class [C级]')
                                       			fun(val.Vehicle_Series_Name_CN,'C-Class AMG [C级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'CL-Class [CL级]')
                                       			fun(val.Vehicle_Series_Name_CN,'CLA-Class AMG [CLA级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'CLS-Class [CLS级]')
                                       			fun(val.Vehicle_Series_Name_CN,'E-Class [E级]')
                                       			fun(val.Vehicle_Series_Name_CN,'E-Class AMG [E级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'CExelero')
                                       			fun(val.Vehicle_Series_Name_CN,'G-Class [G级]')
                                       			fun(val.Vehicle_Series_Name_CN,'G-Class AMG [G级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'GL-Class [GL级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GL-Class AMG [GL级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLA-Class [GLA级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLA-AMG [GLA级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLC-Class [GLC级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLC-AMG [GLC级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLE-Class [GLE级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLE-AMG [GLE级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'CLE-Class [CLE级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLK-Class [GLK级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLS-Class [GLS级]')
                                       			fun(val.Vehicle_Series_Name_CN,'GLS-Class AMG [GLS级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'MB100')
                                       			fun(val.Vehicle_Series_Name_CN,'M-Class [M级]')
                                       			fun(val.Vehicle_Series_Name_CN,'M-Class AMG [M级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'R-Class [R级]')
                                       			fun(val.Vehicle_Series_Name_CN,'R-Class AMG [R级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'S-Class [S级]')
                                       			fun(val.Vehicle_Series_Name_CN,'MAYBACK S-Class [迈巴赫S级]')
                                       			fun(val.Vehicle_Series_Name_CN,'S-Class AMG [S级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'SL-Class [SL级]')
                                       			fun(val.Vehicle_Series_Name_CN,'SL-Class AMG [SL级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'SLC-Class [SLC级]')
                                       			fun(val.Vehicle_Series_Name_CN,'SLK-Class [SLK级]')
                                       			fun(val.Vehicle_Series_Name_CN,'SLK-Class AMG [SLK级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'SLR-Class [SLR级]')
                                       			fun(val.Vehicle_Series_Name_CN,'SLS-Class AMG [SLS级 AMG]')
                                       			fun(val.Vehicle_Series_Name_CN,'Viano [唯雅诺]')
                                       			fun(val.Vehicle_Series_Name_CN,'凌特')
                                       			fun(val.Vehicle_Series_Name_CN,'威霆')
                                       			fun(val.Vehicle_Series_Name_CN,'斯宾特')
                                       			fun(val.Vehicle_Series_Name_CN,'迈巴赫')
                                       			fun(val.Vehicle_Series_Name_CN,'马可波罗')
                                       			
                                       }else{
	                                       	$.each(data,function(key,val){
													var div1 = $("<div class='type_car'>").html(val.Vehicle_Name_CN);
													div1.appendTo(wrapcar);
													
											})	
                                       }
										wrapcar.appendTo(div2)
								},
								error:function(data){
					//				console.log(data)
								}
							})
						}else if(val.Manufacture_CN==stext){		
							var div1=$("<div class='car_name_children'>").html("<div class='pos'><div class='pos_title'>"+val.Manufacture_CN+"</div></div>");
							div1.appendTo(".right_car")
							$.ajax({
								type:"post",
								url:network+"/MattrioEcModel/SelectCarIntface/getVehicleName",
								dataTyp:"json",
								data:{
									"brand_id":username_id,
									"Manufacture":val.Manufacture_CN
								},
								crossDomain: true == !(document.all),
								success:function(data){
									if(data==""){
										alert("暂无数据")
										return false
									}

										var wrapcar=$("<div class='wrap_car'>")
										wrapcar.appendTo(".pos")
										$.each(data,function(key,val){
												var div1 = $("<div class='type_car'>").html(val.Vehicle_Name_CN);
												div1.appendTo(".wrap_car");
										})	

								},
								error:function(data){
					//				console.log(data)
								}
							})
						}
					});
					history.replaceState(null, null, "?car="+$(this).text());
		            car=getUrlParam('?car')
				})
									
					}
				})
							
			},
			error:function(data){
				$("#loading").hide();
			}
	})
	$(document).on("click",".type_car_wrap",function(){
		$(this).find('.type_car').toggle().siblings('.type_car_wrap').find('.type_car').hide()
		$(this).parents('.car_name_children').siblings('.car_name_children').find('.type_car').hide()
	})
	//车型
	
	//年份
	$(document).on("click",".type_car",function(){
		history.replaceState(null, null, "?car="+$(this).parents('.wrap_car').siblings('.pos_title').text());
		car=getUrlParam('?car')
		$(".meng").hide()
		$("body").removeClass("overy")
		$('.wrap_year').show()
		var that=$(this)
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/SelectCarIntface/getVehicleYear",
			dataTyp:"json",
			data:{
				"brand_id":username_id,
				"Manufacture":car,
				"Vehicle_Name":that.text()
			},
			crossDomain: true == !(document.all),
			success:function(data){
				if(data.length==0||data==[]){
					alert("暂无数据")
					return false
				}
				$('.wrap_year').html('')
				$(".sort_box").hide()
				var arr=[]
				$.each(data,function(key,val){
					if(val.Vehicle_of_year!='待查'){
						if(arr.indexOf(val.Vehicle_of_year)==-1){
							arr.push(val.Vehicle_of_year)
							var year1= $("<div class='year'><div class='car_year' title="+val.Vehicle_of_year+">"+val.Vehicle_of_year+"<img class='right' src='image/left.png'/>"+"</div></div>")
					    year1.appendTo(".wrap_year")
						}
					}
						
				})
				$(".back_top").children(".p3").show().siblings("p").hide()
			}
		})
		history.replaceState(null, null, "?car="+car+"&type="+that.text());
		type=getUrlParam('?type')
		
	})
	//排量
	var outputdata;
	$(document).on("click",".car_year",function(){
		var outputarr=[]
		var that=$(this)
		that.parents('.wrap_year').hide()
		year2=that.prop('title')
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/SelectCarIntface/getCapacityForVehicleyear",
			dataTyp:"json",
			data:{
				"brand_id":username_id,
				"Manufacture":car,
				"Vehicle_Name":type,
			    "Year":that.prop('title'),	
			    'Year2':that.prop('title').substr(0,4)
			},
			crossDomain: true == !(document.all),
			success:function(data){
				outputdata=data
				$('.wrap_output').show().html('')
				$('.p4').show().siblings('p').hide()
                    $.each(data,function(key,value){
                    	if(JSON.stringify(outputarr).indexOf(value.Capacity)==-1){
                    		outputarr.push(value)
                    	}
                    })
//                  console.log(outputarr)
					$.each(outputarr,function(key,value){
						var a=''
						if(value.Air_intake_form=='自然吸气'){
							a='L'
						}else{
							a='T'
						}
							var div1 = $("<div class='car_output' id="+value.Capacity+" title="+value.LaunchEOPYear+">").html(value.Capacity+a+"<img class='right' src='image/left.png'/>");
							div1.appendTo(".wrap_output");
					})

			}
		})
		history.replaceState(null, null, "?car="+car+"&type="+type+"&year="+that.prop('title'));
		year=getUrlParam('?year')
	})
	
var fdjlist=''	;
// 点击获取产品	
	$(document).on("click",".car_output",function(){
		var yeararr=[];
		history.replaceState(null, null, "?car="+car+"&type="+type+"&year="+year+"&output="+$(this).text());	
		output=getUrlParam('?output')
		var Capacity=$(this).prop('id')
		var A=$(this).text().substr(-1,1)
		$.each(outputdata,function(key,value){
			if(JSON.stringify(value).indexOf(Capacity)!=-1){
				yeararr.push(value.LaunchEOPYear)
			}
		})
		var carlist=[];
		var cplist=[]
		$.each(yeararr,function(ke,val) {
			$.ajax({
				type:"post",
				url:network+"/MattrioEcModel/SelectCarIntface/getProducts",
				async:false,
				data:{
					"brand_id":username_id,
					"category_id": "'A'",
					"Manufacture":car,
					"Vehicle_Name":type,
					"Year":val,
				    "Capacity":Capacity
				},
				success:function(data){
					$.ajax({
						type:"post",
						url:network+"/MattrioEcModel/SelectCarIntface/getTransmission",
						async:false,
						data:{
							"brand_id":username_id,
							"category_id": "'A'",
							"Manufacture":car,
							"Vehicle_Name":type,
							"Year":year2,
						    "Capacity":Capacity
						},
						success:function(dat){
							if(data.list!=''){	
								$.each(data.list, function(key,value) {
									carlist.push(value)	
								});
								$.each(dat, function(key,value) {
									cplist.push(value)	
								});

								}else{
									alert("暂无数据")
								}	
					
						},				
						
					})
			
				},error:function(){
					alert("请求失败")
					return false;
				}
				
		})
			
		});
		var len=cplist.length;
		for(var i = 0; i < len; i++) {
			for(var j = i + 1; j < len; j++) {
				if(cplist[i].amt_des == cplist[j].amt_des) { //通过id属性进行匹配；
					cplist.splice(j, 1); //去除重复的对象；
					len--;
					j--;
			 	}
			}

		}
								
//		var result = [],      /*如果有相同的值则跳过，不相同则push进数组*/
//		len = cplist.length;
//		for(i = 0; i < len; i++){
//			for(j = i + 1; j < len; j++){
//				 if(cplist[i].transmission_mikey == cplist[j].transmission_mikey){
//					j = ++i;
//				 }
//			}
//			result.push(cplist[i]);
//		}
															
								
		sessionStorage.setItem("data",JSON.stringify(carlist))
		sessionStorage.setItem("fdj",JSON.stringify(cplist))
		window.location.href='list/list.html?A='+A+'&year='+year2
	
	})
	
	/*蒙版显示 禁止滑动  禁止点击*/
	$('.meng').click(function(){
		$(".right_car").removeClass("fixright")
		$("body").removeClass("overy")
		$(this).hide()
		$(".initials").show()
	})
	
	//返回
	function fun(){
		if(year){
			 history.replaceState(null, null, "?car="+car+"&type="+type);
			 $('.wrap_output').hide()
			 $('.wrap_year').show()
			 $('.p3').show().siblings('p').hide() 
			 year=false
		}else if(type){
		    history.replaceState(null, null, "?car="+car);
			$(".p1").show().siblings("p").hide()
			$(".wrap_year").hide()
			$(".right_car").removeClass("fixright")
			$(".sort_box").show()
			$(".initials").show()
			$("body").removeClass("overy")	
			type=false
		}else if(car){
		    history.replaceState(null, null, "?car=");
			$(".back_top").children(".p2").show().siblings("p").hide()
			$(".right_car").removeClass("fixright")
			$(".initials").show()
			$("body").removeClass("overy")	
			car=false
		}else if(!car){
			window.location.href="../index.html"
		}
	}

