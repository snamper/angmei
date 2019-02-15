var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");

var pageindex =1;

function fn(){

	if($("#arrcity").val() == "中文/拼音"){
		var Manufacture_CN = "";
	}else{
		var Manufacture_CN = $("#arrcity").val();
	}
	if($("#s3").html() == "请选择车系"){
		var Vehicle_Name_CN = "";
	}else{
		var Vehicle_Name_CN = $("#s3").html()
	}

	if($("#s4").html() == "请选择年份"){
		var LaunchEOPYear = "";
	}else{
		var LaunchEOPYear = $("#s4").html()
	}

	if($("#s1").html() == "请选择排量"){
		var Capacity = "";
	}else{
		var Capacity = $("#s1").html()
	}

	if($("#inpsubmit").val() == ""){
		var mikey = "";
	}else{
		var mikey = $("#inpsubmit").val();
	}

	$(".warting").removeClass("active");

	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/ShortCarIntface/QueryCar",
		data:{
			"brand_id":username_id,
			"pageindex":pageindex,
			"Manufacture_CN":Manufacture_CN,
			"Vehicle_Name_CN":Vehicle_Name_CN,
			"LaunchEOPYear":LaunchEOPYear,
			"Capacity":Capacity,
			"mikey":mikey
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			if(data.list.length == 0 || data.list == []){
				$("tbody").html("");
				$(".alltotal").html("0");
				$(".wartno").removeClass("active");
				$(".warting").addClass("active");
				$(".zxf_pagediv").addClass("active");
			}else{
				$(".warting").addClass("active");
				$(".wartno").addClass("active");
				$(".zxf_pagediv").removeClass("active");

				$("tbody").html("");
				$(".alltotal").html(data.listsize);
				$.each(data.list,function(key,value){
					var td1 = $("<td>").html(value.mikey);
					var td2 = $("<td>").html(value.Manufacture_CN);
					var td3 = $("<td>").html(value.Vehicle_Series_Name_CN);
					var td4 = $("<td>").html(value.Vehicle_Name_CN);
					var td5 = $("<td>").html(value.Chassis_platform);
					var td6 = $("<td>").html(value.Vehicle_body_type);
					var td7 = $("<td>").html(value.Air_intake_form);
					var td8 = $("<td>").html(value.Engine_Code);
					var td9 = $("<td>").html(value.Capacity);
					var td10 = $("<td>").html(value.Capacity_ml);
					var td11 = $("<td>").html(value.KW);
					var td12 = $("<td>").html(value.HP);
					var td13 = $("<td>").html(value.Number_of_cylinder);
					var td14 = $("<td>").html(value.Number_of_valves_per_cylinder);
					var td15 = $("<td>").html(value.Fuel_Type);
					var td16 = $("<td>").html(value.Injection_type);
					var td17 = $("<td>").html(value.Drive_type);
					var td18 = $("<td>").html(value.Launch_year);
					var td19 = $("<td>").html(value.EOP_Year);
					var td20 = $("<td>").html(value.LaunchEOPYear);
					var tr = $("<tr class='text-c'>");
					td1.appendTo(tr);
					td2.appendTo(tr);
					td3.appendTo(tr);
					td4.appendTo(tr);
					td5.appendTo(tr);
					td6.appendTo(tr);
					td7.appendTo(tr);
					td8.appendTo(tr);
					td9.appendTo(tr);
					td10.appendTo(tr);
					td11.appendTo(tr);
					td12.appendTo(tr);
					td13.appendTo(tr);
					td14.appendTo(tr);
					td15.appendTo(tr);
					td16.appendTo(tr);
					td17.appendTo(tr);
					td18.appendTo(tr);
					td19.appendTo(tr);
					td20.appendTo(tr);
					$(tr).appendTo("tbody");
				})

				$(".zxf_pagediv").createPage({
					pageNum: Math.ceil(data.listsize/10),//总页码
					current: 1,//当前页
					shownum: 10,//每页显示个数
					// activepage: "",//当前页选中样式
					activepaf: "",//下一页选中样式
					backfun: function(e) {
						// console.log(e.current);//回调
						var pageindex = e.current;
						$("tbody").html("");
						$(".warting").removeClass("active");
						// fn1();
						$.ajax({
							type:"post",
							url:network+"/MattrioEcModel/ShortCarIntface/QueryCar",
							data:{
								"brand_id":username_id,
								"pageindex":pageindex,
								"Manufacture_CN":Manufacture_CN,
								"Vehicle_Name_CN":Vehicle_Name_CN,
								"LaunchEOPYear":LaunchEOPYear,
								"Capacity":Capacity,
								"mikey":mikey
							},
							dataType:"json",
							cache: false,
							crossDomain: true == !(document.all),
							success:function(data){
								$(".warting").addClass("active");
								// console.log(data);
								
								$(".alltotal").html(data.listsize);
								$.each(data.list,function(key,value){
									var td1 = $("<td>").html(value.mikey);
									var td2 = $("<td>").html(value.Manufacture_CN);
									var td3 = $("<td>").html(value.Vehicle_Series_Name_CN);
									var td4 = $("<td>").html(value.Vehicle_Name_CN);
									var td5 = $("<td>").html(value.Chassis_platform);
									var td6 = $("<td>").html(value.Vehicle_body_type);
									var td7 = $("<td>").html(value.Air_intake_form);
									var td8 = $("<td>").html(value.Engine_Code);
									var td9 = $("<td>").html(value.Capacity);
									var td10 = $("<td>").html(value.Capacity_ml);
									var td11 = $("<td>").html(value.KW);
									var td12 = $("<td>").html(value.HP);
									var td13 = $("<td>").html(value.Number_of_cylinder);
									var td14 = $("<td>").html(value.Number_of_valves_per_cylinder);
									var td15 = $("<td>").html(value.Fuel_Type);
									var td16 = $("<td>").html(value.Injection_type);
									var td17 = $("<td>").html(value.Drive_type);
									var td18 = $("<td>").html(value.Launch_year);
									var td19 = $("<td>").html(value.EOP_Year);
									var td20 = $("<td>").html(value.LaunchEOPYear);
									var tr = $("<tr class='text-c'>");
									td1.appendTo(tr);
									td2.appendTo(tr);
									td3.appendTo(tr);
									td4.appendTo(tr);
									td5.appendTo(tr);
									td6.appendTo(tr);
									td7.appendTo(tr);
									td8.appendTo(tr);
									td9.appendTo(tr);
									td10.appendTo(tr);
									td11.appendTo(tr);
									td12.appendTo(tr);
									td13.appendTo(tr);
									td14.appendTo(tr);
									td15.appendTo(tr);
									td16.appendTo(tr);
									td17.appendTo(tr);
									td18.appendTo(tr);
									td19.appendTo(tr);
									td20.appendTo(tr);
									$(tr).appendTo("tbody");
								})

							},
							error:function(data){
								// console.log(data);
							}
						})
					}
				});
			}
		},
		error:function(data){
			console.log(data);
		}
	})
}



//按条件搜索

$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/ProductListIntface/getManufacturePingying",
	data:{
		"brand_id":username_id
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		// console.log(data);
		commoncitys.splice(0,commoncitys.length);
  		citys.splice(0,citys.length);
		for(var i=0;i<data.all.length;i++){
			commoncitys[i]=data.all[i];
		}
		for(var i=0;i<data.all.length;i++){
				citys[i]=data.all[i];
		}
	},
	error:function(data){
		// console.log(data)
	}
})

$("#box").click(function(){
	$(".conts1").hide();
	$(".conts3").hide();
	$(".conts4").hide();

	$("#s3").html("请选择车系");
	$("#s3").css("color","#999");
	$("#s4").html("请选择年份");
	$("#s4").css("color","#999");
	$("#s1").html("请选择排量");
	$("#s1").css("color","#999");
})

$("#s3").click(function(){
	var str =$("#arrcity").val();
	// console.log(str)
	$(".conts3").show().html("");
	$(".conts4").hide();
	$(".conts1").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getVehicleName",
		data:{
			"brand_id":username_id,
			"Manufacture":str
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			$("#loading").hide();
			$.each(data,function(key,value){
				$("<p>").html(value.Vehicle_Name_CN).appendTo($(".conts3"));
			})
			
		},error:function(data){
			//console.log(data);
		}
	})
});

$(document).on("click",".conts3 p",function(){
	$("#s3").html($(this).html());
	$(".conts3").hide();
	$(".conts4").hide();
	$(".conts1").hide();
	$("#s3").css("color","#000");
	$("#s4").html("请选择年份");
	$("#s4").css("color","#999");
	$("#s1").html("请选择排量");
	$("#s1").css("color","#999");
})

//获取年份
$("#s4").click(function(){
	$("#loading").show();
	$(".conts1").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getYear",
		data:{
			"brand_id":username_id,
			"Manufacture":$("#arrcity").val(),
			"Vehicle_Name":$("#s3").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			
			$("#loading").hide();
			
				$("#s4").show();
				$(".conts4").show().html("");
				$.each(data,function(key,value){
					$("<p>").html(value.LaunchEOPYear).appendTo($(".conts4"));
				})
				$(".conts4 p").click(function(){
					$(".conts4").hide();
					$("#s4").html($(this).html());
					$("#s4").css("color","#000");
					$("#s1").html("请选择排量");
					$("#s1").css("color","#999");
				})
			
		},error:function(data){
			//console.log(data);
		}
	})
});


$("#s1").click(function(){
	$("#loading").show();
	$(".conts1").show().html("");
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getCapacity",
		data:{
			"brand_id":username_id,
			"Year":$("#s4").html(),
			"Manufacture":$("#arrcity").val(),
			"Vehicle_Name":$("#s3").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$.each(data,function(key,value){
				$("<p>").html(value.Capacity).appendTo($(".conts1"));
			})
		},error:function(data){
			//console.log(data);
		}
	})
});
$(document).on("click",".conts1 p",function(){
	$(".conts1").hide();
	$("#s1").html($(this).html());
	$("#s1").css("color","#000");
});

$(".btnyear").click(function(){
	$("#inpsubmit").val("");
	fn();
})


//查询MIKEY
$("#btnsubmit").click(function(){
	if($("#inpsubmit").val() == ""){
		alert("请输入您要查询的Mi-Key值");
		return false;
	}
	$("#arrcity").val("中文/拼音");
	$("#arrcity").css("color","#999");
	$("#s3").html("请选择车系");
	$("#s3").css("color","#999");
	$("#s4").html("请选择年份");
	$("#s4").css("color","#999");
	$("#s1").html("请选择排量");
	$("#s1").css("color","#999");
	fn();
})

fn();

