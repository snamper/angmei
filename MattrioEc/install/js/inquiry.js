// localStorage.setItem("network","http://192.168.1.112:8080/MattrioEc");
localStorage.setItem("network","https://www.51macc.com/api/MattrioEc");

var network = localStorage.getItem("network");
var carname = localStorage.getItem("carname");
var carput = localStorage.getItem("carput");
var carpai = localStorage.getItem("carpai");


$(".container").hide();
$(".gridtable1").hide();
$(".contbox").hide();

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var carall = getUrlParam('?carall');
var tab=getUrlParam('?tab');
var type=getUrlParam('?type');


if(type==1){
	$(".runpro").show()
	$(".upcardwrap").hide()
	$(".gridtable1").show()
	$(".gridtable2").hide()
	$(".install").addClass("click").siblings().removeClass("click") 
	history.replaceState(null, null, "?type=1");	
}else{
	$(".runpro").hide()
	$(".upcardwrap").show()
	$(".gridtable1").hide()
	$(".gridtable2").show()
	$(".upcard").addClass("click").siblings().removeClass("click")
	history.replaceState(null, null, "?type=2");
}
$(document).click(function(e){
	alert('页面维护中,如若需要请联系：021-5221-2966。')
	return false;
})
/*
if(tab!="null"&tab!=null){
	if(tab=="A"){
		$(".runpro").show()
		$(".upcardwrap").hide()
		$(".gridtable1").show()
		$(".gridtable2").hide()
		$(".install").addClass("click").siblings().removeClass("click") 
		
	}else{	
		$(".runpro").hide()
		$(".upcardwrap").show()
		$(".gridtable1").hide()
		$(".gridtable2").show()
		$(".upcard").addClass("click").siblings().removeClass("click")
	}
}

if(carall == null){
	$(".carm1").html("选择车型 &gt;");
}else{
	$(".carm1").html("<div>"+carall+"</div>")
}

$(".runpseltex").hide();
//获取年份

$(".carm1").click(function(){
	window.location.href="./select/select.html";	
})



$(".yearm1").click(function(){
	$(".yearheader").show();
	$("#container").hide();
	$(".gridtable1").hide();
	$(".contbox").hide();
	$(".yearheader ul").html("");

	var str = [2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998];
		$.each(str,function(key,value){
			//console.log(value);
			$("<li>").html(value).appendTo(".yearheader ul");
		})

		$(".yearheader ul li").click(function(){
			//console.log($(this).html());
			$(".yearheader").hide();
			$(".yearm1").html("");
			$(".yearm1").html($(this).html());
			if($(this).html() > 2015){
				$(".city1").hide();
				$(".provincem1").html("选择省份 &gt;");
				$(".citym1").html("");
			}else{
				$(".city1").show();
				$(".provincem1").html("选择省份 &gt;");
				$(".citym1").html("选择地级市 &gt;");
			}
			

		})
})

$(".yeartmk span").click(function(){
	$(".yearheader").hide();
	$(".provinceheader1").hide();
	$(".cityheader").hide();
})



var num;

//选择省份
$(".provincem1").click(function(){
	$("#container").hide();
	$(".gridtable1").hide();
	if($(".yearm1").html() == "选择年份 &gt;"){
		alert("请选择您要查询的年份");
		return false;
	}
	$(".provinceheader1").show();
	$(".provincecar ul li").click(function(){
		$(".provinceheader1").hide();
		$(".provincem1").html($(this).html());
		num = $(this).index()+1;


		$(".citym1").html("选择地级市 &gt;")
	})
		
	
})

var n ;

$(".citym1").click(function(){
	$("#container").hide();
	$(".gridtable1").hide();
	$(".cityheader ul").html("");

	if($(".provincem1").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}


	$(".cityheader").show();
	//console.log($(".provincem").html());

	$.ajax({
		type:"post",
		url:network+"/BaoYouLiangIntface/getCity",
		data:{
			"address_id":num
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			//console.log(data);
			$.each(data,function(key,value){
				$("<li>").html(value.address_name).appendTo(".cityheader ul");
			})
			$(".cityheader ul li").click(function(){
				//console.log($(this).index());
				n = data[$(this).index()].address_id;
				
				$(".cityheader").hide();
				$(".citym1").html($(this).html());
			})
		}
	})

})




$(".button1 button").click(function(){
	if($(".carm1").html() == "选择车型 &gt;"){
		alert("请选择您要查询的条件");
		return false;
	}
	if($(".provincem1").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}
	if($(".yearm1").text()<=2015&&$(".citym1").text()=="选择地级市 >"){
		alert("请选择您要查询的地级市");
		return false;
	}
	$("#loading").show();
	
	$.ajax({
		type: "post",
		url: network+"/BaoYouLiangIntface/getInstallationBase",
		data: {
			"shengfen":num,
			"city":n,
			"Manufactur":carname,
			"VehicleNam":carput,
			"capacity":carpai,
			"year": $(".yearm1").html()
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			sessionStorage.setItem("data",JSON.stringify(data))
			window.location.href="./result/result.html?tab=A";	
			
			$("#container").show();
			$(".gridtable1").show();
			$(".contbox").show();

			if(data.car_info.byl1 == 0){
				$("#container").hide();
				$(".contbox").hide();
			}

			//console.log(data);
			

//			$('#car_icon').attr('src','http://oqebrtdnm.bkt.clouddn.com/' + data.car_info.car_icon+'');
//			$('#car_Manufactur').html(data.car_info.Manufactur);
//			$('#car_VehicleNam').html(data.car_info.VehicleNam);
//			$('#car_capacity').html(data.car_info.capacity);
//			$('#car_year').html(data.car_info.year);
//			$('#car_byl1').html(data.car_info.byl1);
//			$('#car_byl2').html(data.car_info.byl2);
//			$('#car_byl_name1').html(data.car_info.byl_name1);
//			$('#car_byl_name2').html(data.car_info.byl_name2);

//			$('#container').highcharts({
//				chart: {
//					plotBackgroundColor: null,
//					plotBorderWidth: null,
//					plotShadow: false
//				},
//				colors: ['#90ed7d', '#f7a35c'],
//				title: {
//					text: data.shengfen
//				},
//				tooltip: {
//					headerFormat: '{series.name}<br>',
//					pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
//				},
//				plotOptions: {
//					pie: {
//						allowPointSelect: true,
//						cursor: 'pointer',
//						dataLabels: {
//							enabled: true,
//							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//							style: {
//								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//							}
//						}
//					}
//				},
//				series: data.list
//			});
		},
		error: function(data) {
			//console.log(data);
		}
	});

});
	
//点击切换
$(".install").click(function(){
	$(".runpro").show()
	$(".upcardwrap").hide()
	$(".gridtable1").show()
	$(".gridtable2").hide()
	$(this).addClass("click").siblings().removeClass("click") 
	history.replaceState(null, null, "?type=1");	
})
$(".upcard").click(function(){
	$(".runpro").hide()
	$(".upcardwrap").show()
	$(".gridtable1").hide()
	$(".gridtable2").show()
	$(this).addClass("click").siblings().removeClass("click")
	history.replaceState(null, null, "?type=2");
})





//上排量
$(".gridtable").hide();





$(".yearm2").click(function(){
	$(".yearyear").show();
	$(".yearmouth").hide();

})
$(".yearyear p").click(function(){
	$(".yearyear").hide();
	$(".yearm2").html($(this).html());
	$(".provincem2").html("选择省份 &gt;");
	$(".yearmoth").html("选择月份 &gt;");
	$(".carm2").html("选择车型 &gt;");

	if($(this).html() == 2017 ){
		$(".city2").show();
		$(".yearmouth2").show();
		$(".namecity").show();
		$(".citym2").html("选择地级市 &gt;");
	}else{
		$(".city2").hide();
		$(".yearmouth1").show();
		$(".citym2").html("");
		$(".namecity").hide();
	}
})
var year=''
$(".yearmoth").click(function(){
	if($(".yearm2").html() == "选择年份 &gt;"){
		alert("请选择年份");
		return false;
	}

	if($(".yearm2").text()==2017){
		$(".yearmouth2").show();
	    $(".yearmouth1").hide();	
	}else{
	    $(".yearmouth1").show();
		$(".yearmouth2").hide();    
	}
	if($(".yearmoth").html()<=9){
    	 year='0'+$(".yearmoth").html()
    }else{
    	 year=$(".yearmoth").html()
    }
    console.log(year)

})
$(".yearmouth p").click(function(){
	$(".yearmoth").html($(this).html());
	$(".yearmouth").hide();
	$(".provincem2").html('选择省份 >')
//	$(".citym2").html("选择地级市 >")
	$(".carm2").html("选择车型 >")
})



$(".yeartmk span").click(function(){
	$(".provinceheader2").hide();
	$(".cityheader").hide();
	$(".carheader").hide();
	$(".carfooter2").hide();
	$(".carfooter3").hide();
	$(".carfooter4").hide();
	$("#loading").hide();
})





//选择省份
$(".provincem2").click(function(){
	$("#container").hide();
	$("table").hide();
	if($(".yearmoth").html() == "选择月份 &gt;"){
		alert("请选择您要查询的年份");
		return false;
	}
	$(".provinceheader2").show();
	$(".provincecar ul li").click(function(){
		$(".provinceheader2").hide();
		$(".provincem2").html($(this).html());

//		$(".citym2").html("");
	})
		
	
})


//城市
$(".citym2").click(function(){
	$("#container").hide();
	$("table").hide();
	$(".cityheader ul").html("");

	if($(".provincem2").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}
	if($(".yearmoth").html()<=9){
    	 year='0'+$(".yearmoth").html()
    }else{
    	 year=$(".yearmoth").html()
    }
	$(".cityheader").show();
	//console.log($(".provincem").html());
	$.ajax({
		type:"post",
		url:network+"/ShangPaiLiangIntface/getCity",
		data:{
			"month":year,
			"province":$(".provincem2").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			//console.log(data);
			$.each(data,function(key,value){
				$("<li>").html(value.city).appendTo(".cityheader ul");
			})
			$(".cityheader ul li").click(function(){
				$(".cityheader").hide();
				$(".citym2").html($(this).html());
				$(".carm2").html("选择车型 &gt;");
			})
		}
	})
})
var carname;
var car;
var carpai;
var carcap;

$(".carm2").click(function(){
	if($(".yearm2").html() == "选择年份 &gt;"){
		alert("请选择您要查询的年份");
		return false;
	}
	if($(".provincem2").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}
	if($(".citym2").html() == "选择地级市 &gt;"){
		alert("请选择您要查询的条件");
		return false;
	}
	$(".carheader").show();
	$("#loading").show();
	if($(".yearmoth").html()<=9){
    	 year='0'+$(".yearmoth").html()
    }else{
    	 year=$(".yearmoth").html()
    }
//	$(".button2 button").css("background","#E7161A")
	$.ajax({
		type:"post",
		url:network+"/ShangPaiLiangIntface/getManufactur",
		data:{
			"year":$(".yearm2").html(),
			"month":year,
			"province":$(".provincem2").html(),
			"city":$(".citym2").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".sort_box").html("");
			$("#loading").hide();
			//console.log(data);
			$.each(data,function(key,value){
				var div1 = $("<div class='sort_list'>");
				var div2 = $("<div class='num_name'>").html(value.Manufactur);
				div2.appendTo(div1);
				div1.appendTo(".sort_box");
			})
			initials();

			$(".num_name").click(function(){
				$(".carheader").hide();
				$(".carfooter2").show();
				$(".carfooter2 ul").html("");
				$("#loading").show();
				carname = $(this).html()
				$.ajax({
					type:"post",
					url:network+"/ShangPaiLiangIntface/getVehicleNam",
					data:{
						"year":$(".yearm2").html(),
						"month":year,
						"province":$(".provincem2").html(),
						"city":$(".citym2").html(),
						"Manufactur":carname
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						$(".carheader").hide();
						//console.log(data);
						$.each(data,function(key,value){
							$("<li>").html(value.VehicleNam).appendTo(".carfooter2 ul");
						})
						$(".carfooter2 li").click(function(){
							$(".carfooter2").hide();
							$(".carfooter3").show();
							$(".carfooter3 ul").html("");
							$("#loading").show();
							//console.log($(this).html())
							car = $(this).html();
							$.ajax({
								type:"post",
									url:network+"/ShangPaiLiangIntface/getNameSales",
									data:{
										"year":$(".yearm2").html(),
										"month":year,
										"province":$(".provincem2").html(),
										"city":$(".citym2").html(),
										"Manufactur":carname,
										"VehicleNam":car
									},
									dataType:"json",
									cache: false,
									crossDomain: true == !(document.all),
									success:function(data){
										$("#loading").hide();
										//console.log(data);
										$.each(data,function(key,value){
											$("<li>").html(value.NameSales).appendTo(".carfooter3 ul");
										})

										$(".carfooter3 li").click(function(){
											$(".carfooter4").show();
											$("#loading").show();
											$(".carfooter4 ul").html("");
											 carpai = $(this).html();
											$.ajax({
												type:"post",
												url:network+"/ShangPaiLiangIntface/getCapacity",
												data:{
													"year":$(".yearm2").html(),
													"month":year,
													"province":$(".provincem2").html(),
													"city":$(".citym2").html(),
													"Manufactur":carname,
													"VehicleNam":car,
													"NameSales":carpai
												},
												dataType:"json",
												cache: false,
												crossDomain: true == !(document.all),
												success:function(data){
													//console.log(data);
													$("#loading").hide();
													$.each(data,function(key,value){
														$("<li>").html(value.capacity).appendTo(".carfooter4 ul");
													})
													$(".carfooter4 li").click(function(){
														$(".carheader").hide();
														$(".carfooter2").hide();
														$(".carfooter3").hide();
														$(".carfooter4").hide();
														$(".gridtable").hide();
														$(".carm2").html(carname+car);
														var carcap = $(this).html();
													})
												},
												error:function(data){
													//console.log(data);
												}
											})
										})


									}
							})
						})
					},
					error:function(data){
						//console.log(data);
					}
				})
			})

		},
		error:function(data){
			//console.log(data);
		}
	})
})














//点击查询

$(".button2 button").click(function(){
	if($(".carm2").html() == "选择车型 &gt;"){
		alert("请选择您要查询的条件");
		return false;
	}
	if($(".provincem2").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}
	if($(".provincem2").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}

	$("#container").show();
	$("table").show();
	$("contbox").hide();
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/ShangPaiLiangIntface/getShangPaiLiang",
		data:{
			"year":$(".yearm2").html(),
			"month":year,
			"province":$(".provincem2").html(),
			"city":$(".citym2").html(),
			"Manufactur":carname,
			"VehicleNam":car,
			"NameSales":carpai,
			"capacity":carcap
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			sessionStorage.setItem("data",JSON.stringify(data))
			window.location.href="./result/result.html?tab=B";	
			
			//console.log(data);
//			$(".td1").html(data.result[0].Manufactur)
//			$(".td2").html(data.result[0].NameSales)
//			$(".td3").html(data.result[0].VehicleNam)
//			$(".td4").html(data.result[0].capacity)
//			$(".td4").html(data.result[0].city)
//			$(".td5").html(data.result[0].month)
//			$(".td6").html(data.result[0].province)
//			$(".td7").html(data.result[0].shangpailiang)
//			$(".td8").html(data.result[0].year)


		},error:function(data){
			console.log(data);
		}
	})

});
*/