var network = localStorage.getItem("network");
$(".warting").removeClass("active");
// sessionStorage.setItem("pages",1)
var pages = sessionStorage.getItem("pages");
// console.log(page);
fn();

function fn(){

	var pageindex = 1;

	if($("#arrcity").val() == ""){
		var Manufacture_CN = "";
	}else{
		var Manufacture_CN = $("#arrcity").val();
	};

	if($("#s3").html() == "请选择车型"){
		var Vehicle_Name_CN = "";
	}else{
		var Vehicle_Name_CN = $("#s3").html()
	};

	if($("#s4").html() == "请选择发动机型号"){
		var Engine_Code = "";
	}else{
		var Engine_Code = $("#s4").html()
	};

	if($("#s1").html() == "请选择排量"){
		var Capacity = "";
	}else{
		var Capacity = $("#s1").html()
	};

	if($(".selectname2").val() == "按条件搜索"){
		var mikey = "";
		var Engine_Code ="";
		var Chassis_platform ="";
	}else if($(".selectname2").val() == "Mi-Key"){
		var mikey = $("#inpsubmit").val();
		var Engine_Code ="";
		var Chassis_platform ="";
	}else if($(".selectname2").val() == "发动机型号"){
		var mikey = "";
		var Chassis_platform = "";
		var Engine_Code = $("#inpsubmit").val();
	}else if($(".selectname2").val() == "底盘号"){
		var mikey = "";
		var Chassis_platform = $("#inpsubmit").val();
		var Engine_Code = "";
	}

	$.ajax({
		url:network+"/MattrioManager/ShortCarManagerController/queryCarList",
		type:"post",
		data:{
			"pageindex":pageindex,
			"Manufacture_CN":Manufacture_CN,
			"Vehicle_Name_CN":Vehicle_Name_CN,
			"Capacity":Capacity,
			"mikey":mikey,
			"Engine_Code":Engine_Code,
			"Chassis_platform":Chassis_platform
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			$("tbody").html("");
			$(".alltotal").html(data.listsize);
			$(".warting").addClass("active");
			if(data.list.length == 0){
				$(".wartno").removeClass("active");
			};
			$(".wartno").addClass("active");
			$.each(data.list,function(key,value){
				$("<tr>").html("<td style='text-align: center;'><input type='checkbox' name='gay' value=''></td>"+value+"<td style='text-align: center;'> <a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a> <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
			});
			//分页
			$(".zxf_pagediv").createPage({
				pageNum: Math.ceil(data.listsize/10),//总页码
				current: Number(pageindex),//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){

					$(".warting").removeClass("active");
					$("tbody").html("");
					var pageindex = e.current;
					$.ajax({
						type:"post",
						url:network+"/MattrioManager/ShortCarManagerController/queryCarList",
						data:{
							"pageindex":pageindex,
							"Manufacture_CN":Manufacture_CN,
							"Vehicle_Name_CN":Vehicle_Name_CN,
							"Capacity":Capacity,
							"mikey":mikey,
							"Engine_Code":Engine_Code,
							"Chassis_platform":Chassis_platform
						},
						dataType:"json",
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$(".warting").addClass("active");
							$(".warting").addClass("active");
							if(data.list.length == 0){
								$(".wartno").removeClass("active");
							};
							$(".wartno").addClass("active");
							$.each(data.list,function(key,value){
								$("<tr>").html("<td style='text-align: center;'><input type='checkbox' name='gay' value=''></td>"+value+"<td style='text-align: center;'><a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a> <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
							});
						},
						error:function(data){
							console.log(data);
						}
					})
				}
			})
		}
	})
}

//删除
$(document).on("click",".delthis",function(){
	sessionStorage.setItem("pages",$(".current").html());
	var postion = $(this).parents("td").parents("tr").children().eq(1).html();
	// console.log(postion);
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/ShortCarManagerController/deleteCarInfo",
			data:{
				"postion":postion
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				// console.log(data)
				fn();
			},
			error:function(data){
				console.log(data);
			}
		})
	}
});

//批量删除
function datadel(){
	sessionStorage.setItem("pages",$(".current").html());
	var id_array=new Array();  
	$('input[name="gay"]:checked').each(function(){
	    id_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});  

	if(id_array.length == 0 || id_array == []){
		alert("请选择您要删除的选项");
		return false;
	}
	// console.log(id_array.join(","))
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/ShortCarManagerController/deleteCarInfos",
			data:{
				"postions":id_array.join(",")
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				$("tbody").html("");
				fn();
			},
			error:function(data){
				console.log(data)
			}
		});
	}
};

//修改内容
$(document).on("click",".endior",function(){
	// console.log($(".current").html())
	sessionStorage.setItem("pages",$(".current").html());
	window.location.href =  "shortlibray-revise.html?postion="+$(this).parents("td").parents("tr").children().eq(1).html();
});



//获取主机厂
$.ajax({
	type:"post",
	url:network+"/MattrioManager/ShortCarManagerController/getManufacture",
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
	$(".conts1").addClass("active");
	$(".conts3").addClass("active");
	$(".conts4").addClass("active");
	$("#s3").html("请选择车型");
	$("#s3").css("color","#999");
	$("#s4").html("请选择发动机型号");
	$("#s4").css("color","#999");
	$("#s1").html("请选择排量");
	$("#s1").css("color","#999");
})

$("#s3").click(function(){
	$(".conts3").toggleClass("active").html("");
	$(".conts4").addClass("active");
	$(".conts1").addClass("active");
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/ShortCarManagerController/getVehicleName",
		data:{
			"Manufacture":$("#arrcity").val()
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
	$(".conts3").toggleClass("active");
	$(".conts4").addClass("active");
	$(".conts1").addClass("active");
	$("#s3").css("color","#000");
	$("#s4").html("请选择发动机型号");
	$("#s4").css("color","#999");
	$("#s1").html("请选择排量");
	$("#s1").css("color","#999");

})


//获取年份
$("#s4").click(function(){
	$(".conts4").toggleClass("active").html("");
	$(".conts1").addClass("active");
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/ShortCarManagerController/getEngineCode",
		data:{
			"Manufacture":$("#arrcity").val(),
			"Vehicle_Name":$("#s3").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){	
		// console.log(data)	
			$("#loading").hide();
				$.each(data,function(key,value){
					$("<p>").html(value.Engine_Code).appendTo($(".conts4"));
				})
				$(".conts4 p").click(function(){
					$(".conts4").addClass("active");
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
	$(".conts1").toggleClass("active").html("");
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/ShortCarManagerController/getCapacity",
		data:{
			"EngineCode":$("#s4").html(),
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
	$(".conts1").addClass("active");
	$("#s1").html($(this).html());
	$("#s1").css("color","#000");
});
$(".btnyear").click(function(){
	$(".selectname2").val("按条件搜索"); 
	$("#inpsubmit").val("");
	$("#inpsubmit").attr("placeholder","选择条件");
	fn();
});

$(".selectname2").change(function(){
	$("#inpsubmit").val("");
	if($(".selectname2").val() == "按条件搜索"){
		$("#inpsubmit").attr("placeholder","选择条件");
	}else if($(".selectname2").val() == "Mi-Key"){
		$("#inpsubmit").attr("placeholder","Mi-Key");
	}else if($(".selectname2").val() == "发动机型号"){
		$("#inpsubmit").attr("placeholder","发动机型号");
	}else if($(".selectname2").val() == "底盘号"){
		$("#inpsubmit").attr("placeholder","底盘号");
	}
});

$("#btnsubmit").click(function(){
	if($(".selectname2").val() == "按条件搜索"){
		alert("请选择查询条件");
	}else if($("#inpsubmit").val() == ""){
		alert("请输入要查询的值");
	}else if($(".selectname2").val() == "Mi-Key"){

		$("#arrcity").val("");
		$("#s3").html("请选择车型");
		$("#s3").css("color","#999");
		$("#s4").html("请选择发动机型号");
		$("#s4").css("color","#999");
		$("#s1").html("请选择排量");
		$("#s1").css("color","#999");
		$(".warting").addClass("active");
		$("tbody").html("");

		fn();

	}else if($(".selectname2").val() == "发动机型号"){

		$("#arrcity").val("");
		$("#s3").html("请选择车型");
		$("#s3").css("color","#999");
		$("#s4").html("请选择发动机型号");
		$("#s4").css("color","#999");
		$("#s1").html("请选择排量");
		$("#s1").css("color","#999");
		$(".warting").addClass("active");
		$("tbody").html("");

		fn();

	}else if($(".selectname2").val() == "底盘号"){

		$("#arrcity").val("");
		$("#s3").html("请选择车型");
		$("#s3").css("color","#999");
		$("#s4").html("请选择发动机型号");
		$("#s4").css("color","#999");
		$("#s1").html("请选择排量");
		$("#s1").css("color","#999");
		$(".warting").addClass("active");
		$("tbody").html("");

		fn();
	}
});
$(document).on("click","tbody tr",function(){
	$(this).addClass("back_ground").siblings("tr").removeClass("back_ground");
})