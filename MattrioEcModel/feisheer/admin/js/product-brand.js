var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
//获取总条数

$(".warting").removeClass("active");





function del(postion,pageindex,Manufacture_CN,oenumber){
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/ProductListIntface/DeleteProduct",
			data:{
				"brand_id":username_id,
				"postion":postion
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				$("tbody").html("");
				fn(pageindex,Manufacture_CN,oenumber);
			},
			error:function(data){
				// console.log(data)
			}
		})
	}
}

var cont;

$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/ProductListIntface/getCategory",
	dataType:"json",
	data:{
		"brand_id":username_id,
		"categoryid":"A"
	},
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		// console.log(data);
		cont = data;
		$.each(data.list,function(key,value){
			var option = $("<option>").html(value.category_name);
			option.appendTo(".selectname1");
		})

	},
	error:function(data){
		// console.log(data);
	}
})
//滤清器
$(".selectname1").change(function(){

	$(".selectname2").val("按条件搜索");
	$("#inpsubmit").attr("placeholder","选择条件");
	$(".warting").addClass("active");
	$("tbody").html("");

	var Manufacture_CN = $("#arrcity").val();

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

	// console.log(Manufacture_CN)

	if($(".selectname1").val() == "产品类型"){
		fn(1,Manufacture_CN,"",Vehicle_Name_CN,LaunchEOPYear,Capacity);
		return false;
	}

	var num ;
	$.each(cont.list,function(key,value){
		if(value.category_name == $(".selectname1").val()){
			num = key;
		}
	})

	fn(1,Manufacture_CN,"",Vehicle_Name_CN,LaunchEOPYear,Capacity,cont.list[num].category_id);
	

})


$(".selectname2").change(function(){
	if($(".selectname2").val() == "按条件搜索"){
		$("#inpsubmit").attr("placeholder","选择条件");
	}else if($(".selectname2").val() == "oe号码："){
		$("#inpsubmit").attr("placeholder","oe号码：");
	}else if($(".selectname2").val() == "双宇编号搜索："){
		$("#inpsubmit").attr("placeholder","双宇编号搜索：");
	}
})





$("#btnsubmit").click(function(){
	if($("#inpsubmit").val() == ""){
		alert("请输入要查询的条件");
	}else if($(".selectname2").val() == "按条件搜索"){

		alert("请选择查询条件");
	}else if($(".selectname2").val() == "oe号码："){

		$("#arrcity").val("");

		$("#s3").html("请选择车系");
		$("#s3").css("color","#999");
		$("#s4").html("请选择年份");
		$("#s4").css("color","#999");
		$("#s1").html("请选择排量");
		$("#s1").css("color","#999");
		$(".selectname1").val("产品类型");

		$(".warting").addClass("active");
		$("tbody").html("");
		fn(1,"",$("#inpsubmit").val());
	}else if($(".selectname2").val() == "双宇编号搜索："){

		$("#arrcity").val("");
		$("#s3").html("请选择车系");
		$("#s3").css("color","#999");
		$("#s4").html("请选择年份");
		$("#s4").css("color","#999");
		$("#s1").html("请选择排量");
		$("#s1").css("color","#999");
		$(".selectname1").val("产品类型");

		$(".warting").addClass("active");
		$("tbody").html("");
		fn(1,"","","","","","",$("#inpsubmit").val());
	}
})


fn(1);

function fn(pageindex,Manufacture_CN,oenumber,Vehicle_Name_CN,LaunchEOPYear,Capacity,category_id,product_id){
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/ProductListIntface/QueryProduct",
		data:{
			"brand_id":username_id,
			"pageindex":pageindex,
			"Manufacture_CN":Manufacture_CN,
			"oenumber":oenumber,
			"Vehicle_Name_CN":Vehicle_Name_CN,
			"LaunchEOPYear":LaunchEOPYear,
			"Capacity":Capacity,
			"category_id":category_id,
			"product_id":product_id
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
//			 console.log(data)
			if(data.list.length == 0 || data.list == []){
				// alert("暂无数据");
				$(".alltotal").html("0");
				$(".wartno").removeClass("active");
				$(".zxf_pagediv").addClass("active");
			}else{
				$(".warting").addClass("active");
				$(".wartno").addClass("active");
				$(".zxf_pagediv").removeClass("active");
				$(".alltotal").html(data.listsize);
				$.each(data.list,function(key,value){
					// console.log(value);
					var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
					var td2 = $("<td>").html(value.postion);
					var td3 = $("<td>").html(value.oenumber);
					var td4 = $("<td>").html(value.product_id);
					var td7 = $("<td>").html(value.Vehicle_Name_CN);
					var td6 = $("<td>").html(value.Manufacture_CN);
					var td5 = $("<td>").html(value.category_name);
					var td8 = $("<td>").html(value.Capacity+"T");
					var td9 = $("<td>").html(value.Launch_year);
					var td10 = $("<td>").html(value.EOP_Year);
					var td11 = $("<td>").html(value.EOP_Year);
					var td12 = $("<td>").html('<a style="text-decoration:none" href="javascript:;" title="编辑" class="endior"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
					var tr = $("<tr class='text-c'>");
					td1.appendTo(tr);
					td2.appendTo(tr);
					td3.appendTo(tr);
					td4.appendTo(tr);
					td5.appendTo(tr);
					td6.appendTo(tr);
					td7.appendTo(tr);
					td8.appendTo(tr);
					td10.appendTo(tr);
					td11.appendTo(tr);
					td12.appendTo(tr);
					$(tr).appendTo("tbody");
				})
				$(".delthis").click(function(){
					var postion = $(this).parents("td").parents("tr").children().eq(1).html();
					del(postion,pageindex,Manufacture_CN);

				})

				$(".endior").click(function(){
					var number = $(this).parents("td").parents("tr").index();
					// console.log(data)
					window.location.href =  "product-add.html?postion="+data.list[number].postion+"&short_mikey="+data.list[number].short_mikey+"&category_id="+data.list[number].category_id+"&oenumber="+data.list[number].oenumber+"&product_id="+data.list[number].product_id+"&category_name="+data.list[number].category_name;
						
				})

				$(".zxf_pagediv").createPage({
					pageNum: Math.ceil(data.listsize/10),//总页码
					current: Number(pageindex),//当前页
					shownum: 10,//每页显示个数
					// activepage: "",//当前页选中样式
					activepaf: "",//下一页选中样式
					backfun: function(e) {
						// console.log(e);//回调
						$(".warting").removeClass("active");
						$("tbody").html("");
						var pageindex = e.current;
					    $.ajax({
							type:"post",
							url:network+"/MattrioEcModel/ProductListIntface/QueryProduct",
							data:{
								"brand_id":username_id,
								"pageindex":pageindex,
								"Manufacture_CN":Manufacture_CN,
								"oenumber":oenumber,
								"Vehicle_Name_CN":Vehicle_Name_CN,
								"LaunchEOPYear":LaunchEOPYear,
								"Capacity":Capacity,
								"category_id":category_id,
								"product_id":product_id
							},
							dataType:"json",
							cache: false,
							crossDomain: true == !(document.all),
							success:function(data){
								// console.log(data);
								$(".warting").addClass("active");
								$.each(data.list,function(key,value){
									// console.log(value);
									var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
								var td2 = $("<td>").html(value.postion);
								var td3 = $("<td>").html(value.oenumber);
								var td4 = $("<td>").html(value.product_id);
								var td7 = $("<td>").html(value.Vehicle_Name_CN);
								var td6 = $("<td>").html(value.Manufacture_CN);
								var td5 = $("<td>").html(value.category_name);
								var td8 = $("<td>").html(value.Capacity+"T");
								var td9 = $("<td>").html(value.Launch_year);
								var td10 = $("<td>").html(value.EOP_Year);
								var td11 = $("<td>").html(value.EOP_Year);
								var td12 = $("<td>").html('<a style="text-decoration:none" href="javascript:;" title="编辑" class="endior"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
								var tr = $("<tr class='text-c'>");
								td1.appendTo(tr);
								td2.appendTo(tr);
								td3.appendTo(tr);
								td4.appendTo(tr);
								td5.appendTo(tr);
								td6.appendTo(tr);
								td7.appendTo(tr);
								td8.appendTo(tr);
								td10.appendTo(tr);
								td11.appendTo(tr);
								td12.appendTo(tr);
								$(tr).appendTo("tbody");
								})
								$(".delthis").click(function(){
									var postion = $(this).parents("td").parents("tr").children().eq(1).html();
									del(postion,pageindex,Manufacture_CN);
								})
								$(".endior").click(function(){
									var number = $(this).parents("td").parents("tr").index();
									// console.log(e);
									window.location.href =  "product-add.html?postion="+data.list[number].postion+"&short_mikey="+data.list[number].short_mikey+"&category_id="+data.list[number].category_id+"&oenumber="+data.list[number].oenumber+"&product_id="+data.list[number].product_id;
								})
								
							},
							error:function(data){
								// console.log(data)
							}
						})
					}
				});
			}
		},
		error:function(data){
			// console.log(data);
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
			// console.log(data);
			$.each(data,function(key,value){
				//console.log(value);
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
	$(".selectname1").val("产品类型");
	$(".selectname2").val("按条件搜索");
	$("#inpsubmit").val("");
	if($("#arrcity").val() == "中文/拼音"){
		alert ("请选择您要查询的条件");
		return false;
	}
	if($("#s3").html() == "请选择车系"){
		$("tbody").html("");
		fn(1,$("#arrcity").val());
		return false;
	};
	if($("#s4").html() == "请选择年份") {
		$("tbody").html("");
		fn(1,$("#arrcity").val(),"",$("#s3").html());
		return false;
	}
	if($("#s1").html() == "请选择排量"){
		$("tbody").html("");
		fn(1,$("#arrcity").val(),"",$("#s3").html(),$("#s4").html());
		return false;
	}
		$("tbody").html("");
		fn(1,$("#arrcity").val(),"",$("#s3").html(),$("#s4").html(),$("#s1").html());

})







//批量删除
function datadel(){
	var id_array=new Array();  
	$('input[name="id"]:checked').each(function(){
	    id_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});  
	console.log(id_array.join(","));
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/ProductListIntface/DeleteProducts",
			data:{
				"brand_id":username_id,
				"postions":id_array.join(",")
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){

				$("tbody").html("");
				fn(1);
				
			},
			error:function(data){
				console.log(data)
			}
		})
	}

}