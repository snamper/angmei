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
					var dat=[]
					console.log(arr)
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
					$('.initials').hide()
					$(".right_car").addClass("fixright")
					var stext=$(this).find('span').text()
					$(".right_car").html("<p class='car_name'>"+stext+"</p>")
					$.each(datarr, function(key,val) {
						if(val.Manufacture_CN.indexOf(stext)!=-1&&val.Manufacture_CN.substr(0,stext.length)==stext){
							var div1=$("<div class='car_name_children'>").html("<div class='pos'><div class='pos_title'><img class='right' src='image/left.png'/>"+val.Manufacture_CN+"</div></div>"	);
							div1.appendTo(".right_car")
						}else if(val.Manufacture_CN==stext){
							var div1=$("<div class='car_name_children'>").html("<div class='pos'><div class='pos_title'><img class='right' src='image/left.png'/>"+val.Manufacture_CN+"</div></div>");
							div1.appendTo(".right_car")
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
	
	//车型
	$(document).on("click",".pos_title",function(e){
		$(this).find(".right").toggleClass("rotate")
		$(this).parents(".car_name_children").siblings(".car_name_children").find(".right").removeClass("rotate")
		$(".wrap_year").show()
		e.stopPropagation()
		var that=$(this)
	    that.parents(".car_name_children").siblings(".car_name_children").find(".wrap_car").addClass("none")
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/SelectCarIntface/getVehicleName",
			dataTyp:"json",
			data:{
				"brand_id":username_id,
				"Manufacture":that.text()
			},
			crossDomain: true == !(document.all),
			success:function(data){
				if(data==""){
					alert("暂无数据")
					return false
				}
				if(that.siblings(".wrap_car").html()==undefined){
					var wrapcar=$("<div class='wrap_car none'>")
					wrapcar.appendTo(that.parent(".pos"))
					$.each(data,function(key,val){
							var div1 = $("<div class='type_car'>").html(val.Vehicle_Name_CN);
							div1.appendTo(".wrap_car");
					})	
				}
				that.siblings(".wrap_car").toggleClass("none")
				$(".back_top").children(".p2").show().siblings("p").hide()
			},
			error:function(data){
//				console.log(data)
			}
		})
		history.replaceState(null, null, "?car="+that.text());
		car=getUrlParam('?car')
			
	})
	
	//年份
	$(document).on("click",".type_car",function(){
		$(".wrap_year").html("")
		var that=$(this)
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/SelectCarIntface/getYear",
			dataTyp:"json",
			data:{
				"brand_id":username_id,
				"Manufacture":car,
				"Vehicle_Name":that.text()
			},
			crossDomain: true == !(document.all),
			success:function(data){
				$(".sort_box").hide()
				
				$.each(data,function(key,val){
					var year1= $("<div class='year'><div class='car_year'>"+val.LaunchEOPYear+"<img class='right' src='image/left.png'/>"+"</div></div>")
				    year1.appendTo(".wrap_year")

					
				})
				$(".back_top").children(".p3").show().siblings("p").hide()
			}
		})
		history.replaceState(null, null, "?car="+car+"&type="+that.text());
		type=getUrlParam('?type')
		
	})
//	
	//排量
	$(document).on("click",".car_year",function(){
		var that=$(this)
		that.find(".right").toggleClass("rotate")
        that.parent(".year").siblings(".year").find(".right").removeClass("rotate")
		that.parent(".year").siblings(".year").find(".wrap_output").hide()
		that.siblings(".wrap_output").toggle()
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/SelectCarIntface/getCapacity",
			dataTyp:"json",
			data:{
				"brand_id":username_id,
				"Manufacture":car,
				"Vehicle_Name":type,
			    "Year":that.text(),	
			},
			crossDomain: true == !(document.all),
			success:function(data){
				if(that.siblings(".wrap_output").html()==undefined){
					var output=$("<div class='wrap_output none'>")
						output.appendTo(".year")
						$.each(data,function(key,value){
							var div1 = $("<div class='car_output'>").html(value.Capacity);
							div1.appendTo(".wrap_output");
					})
				}
				that.siblings(".wrap_output").toggleClass("none")
				$(".back_top").children(".p4").show().siblings("p").hide()

			}
		})
		history.replaceState(null, null, "?car="+car+"&type="+type+"&year="+that.text());
		year=getUrlParam('?year')
	})
	
	
// 点击获取产品	
	$(document).on("click",".car_output",function(){
		history.replaceState(null, null, "?car="+car+"&type="+type+"&year="+year+"&output="+$(this).text());	
		output=getUrlParam('?output')
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/SelectCarIntface/getProducts",
			data:{
				"brand_id":username_id,
				"category_id": "'HD','QZD','ZJWZD'",
				"Manufacture":car,
				"Vehicle_Name":type,
				"Year":year,
			    "Capacity":$(this).text()
			},
			success:function(data){
				if(data.list!=''){
					sessionStorage.setItem("data",JSON.stringify(data.list))
					window.location.href = "../index.html?hand="+true+"&car="+car+"&type="+type+"&year="+year+"&output="+output;
				}else{
					alert("暂无数据")
				}

		
			}
			
			
		})
		
	})
	
	//返回
	function fun(){
		if(type){
		    history.replaceState(null, null, "?car="+car);
			$(".back_top").children(".p1").show().siblings("p").hide()
			$(".wrap_year").hide()
			$(".right_car").removeClass("fixright")
			$(".sort_box").show()
			$(".initials").show()
			type=false
			car=false
		}else if(car){
		    history.replaceState(null, null, "?car=");
			$(".back_top").children(".p2").show().siblings("p").hide()
			$(".right_car").removeClass("fixright")
			$(".initials").show()
			car=false
		}else if(!car){
			window.location.href="../index.html"
		}
	}
	

