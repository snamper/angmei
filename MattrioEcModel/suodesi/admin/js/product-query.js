 if(!sessionStorage.getItem("user")){
			window.location.href = "./login.html";
	}
var network = 'https://www.51macc.com/api'
var username_id = localStorage.getItem("username_id");
$(".warting").removeClass("active");

var page = sessionStorage.getItem("page");
// console.log(page)
// console.log((window.innerWidth-700)/2+200)


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

	if($("#s4").html() == "请选择销售名称"){
		var Name_of_sales = "";
	}else{
		var Name_of_sales = $("#s4").html();
	};

	if($("#s1").html() == "请选择年款"){
		var Vehicle_of_year = "";
	}else{
		var Vehicle_of_year = $("#s1").html()
	};


	if($(".selectname2").val() == "按条件搜索"){
		var mikey = "";
		var Engine_Code ="";
	}else if($(".selectname2").val() == "Mi-Key"){
		var mikey = $("#inpsubmit").val();
		var Engine_Code ="";
	}else if($(".selectname2").val() == "发动机型号"){
		var mikey = "";
		var Engine_Code = $("#inpsubmit").val();
	};
	$("tbody").html("");
	$(".warting").removeClass('active');
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarManager/queryCarList",
		data:{
			"pageindex":pageindex,
			"Vehicle_of_year":Vehicle_of_year,
			"Manufacture_CN":Manufacture_CN,
			"Vehicle_Name_CN":Vehicle_Name_CN,
			"Name_of_sales":Name_of_sales,
			"mikey":mikey,
			"Engine_Code":Engine_Code
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			$(".alltotal").html(data.listsize);
			$(".warting").addClass('active');
			if(data.list.length == 0||data.list==[]){
				$(".wartno").removeClass("active");
				return false;
			};
			$(".wartno").addClass('active');
			$.each(data.list,function(key,value){
				$("<tr>").html(value+'<td style="text-align: center;"><span class="matching">匹配</span></td>').appendTo(".tbody1");
				$('tbody').find('tr').eq(key).find('td').hide()
				$('tbody').find('tr').eq(key).find('td').eq(1).show()/*mikey*/
				$('tbody').find('tr').eq(key).find('td').eq(2).show()/*主机厂*/
				$('tbody').find('tr').eq(key).find('td').eq(3).show()/*车系*/
				$('tbody').find('tr').eq(key).find('td').eq(4).show()/*车型*/
				$('tbody').find('tr').eq(key).find('td').eq(5).show()/*销售名称*/
				$('tbody').find('tr').eq(key).find('td').eq(6).show()/*销售版本*/
				$('tbody').find('tr').eq(key).find('td').eq(7).show()/*年款*/
				$('tbody').find('tr').eq(key).find('td').eq(14).show()/*生产年份*/
				$('tbody').find('tr').eq(key).find('td').eq(22).show()/*排量*/
				$('tbody').find('tr').eq(key).find('td').eq(23).show()/*进气形式*/
				$('tbody').find('tr').eq(key).find('td').eq(48).show()/*变速器描述*/
				$('tbody').find('tr').eq(key).find('td').last().show()/*操作*/
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
						url:network+"/MattrioManager/CarManager/queryCarList",
						data:{
							"pageindex":pageindex,
							"Vehicle_of_year":Vehicle_of_year,
							"Manufacture_CN":Manufacture_CN,
							"Vehicle_Name_CN":Vehicle_Name_CN,
							"Name_of_sales":Name_of_sales,
							"mikey":mikey,
							"Engine_Code":Engine_Code
						},
						dataType:"json",
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$(".warting").addClass("active");
							if(data.list.length == 0){
								$(".wartno").removeClass("active");
							};
							$(".wartno").addClass('active');
							$.each(data.list,function(key,value){
								$("<tr>").html(value+'<td style="text-align: center;"><span class="matching">匹配</span></td>').appendTo(".tbody1");
								$('tbody').find('tr').eq(key).find('td').hide()
								$('tbody').find('tr').eq(key).find('td').eq(1).show()/*mikey*/
								$('tbody').find('tr').eq(key).find('td').eq(2).show()/*主机厂*/
								$('tbody').find('tr').eq(key).find('td').eq(3).show()/*车系*/
								$('tbody').find('tr').eq(key).find('td').eq(4).show()/*车型*/
								$('tbody').find('tr').eq(key).find('td').eq(5).show()/*销售名称*/
								$('tbody').find('tr').eq(key).find('td').eq(6).show()/*销售版本*/
								$('tbody').find('tr').eq(key).find('td').eq(7).show()/*年款*/
								$('tbody').find('tr').eq(key).find('td').eq(14).show()/*生产年份*/
								$('tbody').find('tr').eq(key).find('td').eq(22).show()/*排量*/
								$('tbody').find('tr').eq(key).find('td').eq(23).show()/*进气形式*/
								$('tbody').find('tr').eq(key).find('td').eq(48).show()/*变速器描述*/
								$('tbody').find('tr').eq(key).find('td').last().show()/*操作*/
							});
						},
						error:function(data){
							swal("请求失败!", "", "error");
						}
					})
				}
			})
		},
		error:function(data){
//			swal("请求失败!", "", "error");
//			fn()
			window.location.reload()
		}
	});
}
/*获取一级分类*/
var onearr=[];
onelist();
function onelist(){
	$.ajax({
		type:"post",
		url:"http://ec.51macc.com/MattrioEcModel/original_oe/selectcategory",
		data:{
			'brand_id':username_id
		},
		timeout:5000,
		async:false,
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".list1").html('')
			onearr=data.list
		},error:function(){
	//		swal("获取一级分类失败!", "", "error");
			onelist()
		}	
	});
}
//匹配
$(document).on('click','.matching',function(){
	$('.tbody2').html('')
	var tr=$('<tr>')
	var td1=$('<td class="mikey">').html($(this).parents('tr').find('td').eq(1).html()).appendTo(tr)
	var td2=$('<td>').html($(this).parents('tr').find('td').eq(2).html()).appendTo(tr)
//	var td3=$('<td>').html($(this).parents('tr').find('td').eq(3).html()).appendTo(tr)
	var td4=$('<td>').html($(this).parents('tr').find('td').eq(4).html()).appendTo(tr)
	var td5=$('<td>').html($(this).parents('tr').find('td').eq(5).html()).appendTo(tr)
//	var td6=$('<td>').html($(this).parents('tr').find('td').eq(6).html()).appendTo(tr)
	var td7=$('<td>').html($(this).parents('tr').find('td').eq(7).html()).appendTo(tr)
//	var td8=$('<td>').html($(this).parents('tr').find('td').eq(14).html()).appendTo(tr)
//	var td9=$('<td>').html($(this).parents('tr').find('td').eq(22).html()).appendTo(tr)
	var td10=$('<td>').html($(this).parents('tr').find('td').eq(23).html()).appendTo(tr)
	var td11=$('<td>').html($(this).parents('tr').find('td').eq(48).html()).appendTo(tr)
	var td12=$('<td>').html('<div class="sel select1"><p class="p1">请选择一级分类<img class="triangle" src="images/triangle.png"/></p></div><div class="list list1"></div>').appendTo(tr)
	var td13=$('<td>').html('<div class="sel select2"><p class="p2">请选择二级分类<img class="triangle" src="images/triangle.png"/></p></div><div class="list list2"></div>').appendTo(tr)
	var td14=$('<td>').html('<input class="bg-1 inp" type="text" name="" id="" value="" placeholder="请输入产品编码"/>').appendTo(tr)
	var td14=$('<td>').html('<button class="btn match">匹配</button>').appendTo(tr)
	tr.appendTo('.tbody2')
	$('.meng').show()
})
/*一级分类*/
$(document).on('click','.select1',function(){
	var list1=$(this).siblings('.list1')
	list1.html('')
	$.each(onearr, function(key,value) {
		var p=$('<p id='+value.category_id+'>').html(value.category_name)
		p.appendTo(list1)		
	});
	$('.list1').hide()
	list1.show()
})
$(document).on('click','.list1 p',function(){
	var that=$(this)
	that.parents('.list1').siblings('.select1').find('.p1').text($(this).text())
	that.parents('.list1').siblings('.select1').find('.p1').prop('id',$(this).prop('id'))
	$('.list1').hide()
	$.ajax({
		type:"post",
		url:"http://ec.51macc.com/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':that.parents('.list1').siblings('.select1').find('.p1').prop('id')
		},
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			var list2=that.parents('td').siblings().find('.list2')
			list2.html('')
			$.each(data.list, function(key,value) {
				var p=$('<p id='+value.category_id+'>').html(value.category_name)
				p.appendTo(list2)			
			});
			
		},error:function(){
//			alert('获取二级分类失败')
		}
	});
	$(this).parents('td').siblings().find('.list2').show()	
})
/*二级分类*/
$(document).on('click','.select2',function(){
	$(".list1").hide()
	var that=$(this)
	var onetext=that.parents('tr').find('.p1').text()
	if(onetext=='请选择一级分类'){
		swal("请选择一级分类!", "", "error");
		return false;
	}
	$.ajax({
		type:"post",
		url:"http://ec.51macc.com/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':that.parents('tr').find('.p1').prop('id')
		},
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			var list2=that.siblings('.list2')
			list2.html('')
			$.each(data.list, function(key,value) {
				var p=$('<p id='+value.category_id+'>').html(value.category_name)
				p.appendTo(list2)			
			});
			
		},error:function(){
//			alert('获取二级分类失败')
		}
	});
	that.siblings('.list2').show()
})
$(document).on('click','.list2 p',function(){
	var that=$(this)
	that.parents('.list2').siblings('.select2').find('.p2').text($(this).text())
	that.parents('.list2').siblings('.select2').find('.p2').prop('id',$(this).prop('id'))
	$('.list2').hide()	
})
$('.shut').click(function(){
	$('.meng').hide()
})
$(document).on('click','.match',function(e){
	if($('.p2').text()=='请选择二级分类'){
		swal("请选择产品类型", "", "error")
		return false;
	}
	if($('.inp').val()==''){
		swal("请输入产品编码", "", "error")
		return false;
	}
	var oemk=[{
		'mikey': $('.mikey').text(),
		'category_id': $('.p2').prop('id'),
		'oenumber': '',
		'product_id': $('.inp').val(),
		'img': '',
		'brand_id': username_id
	}]
	$.ajax({
		type: "post",
		url:"http://ec.51macc.com/MattrioEcModel/original_oe/insertbindingoe",
		data: {
			'oemk': JSON.stringify(oemk)
		},
		success: function(data) {
			$('#loading').hide()
			$('.meng').hide()
			swal("匹配成功", "", "success");
		},
		error: function() {
			swal("匹配失败", "请重新进行匹配", "error")
		}
	})
})

//删除
$(document).on("click",".delthis",function(){
	sessionStorage.setItem("page",$(".current").html());
	var postion = $(this).parents("td").parents("tr").children().eq(1).html();
	
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/CarManager/deleteCarInfo",
			data:{
				"postion":postion
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				fn();
			},
			error:function(data){
				alert('删除失败')
			}
		})
	}
});

//修改内容
$(document).on("click",".endior",function(){
	// console.log($(".current").html())
	sessionStorage.setItem("page",$(".current").html());
	window.location.href =  "product-revise.html?postion="+$(this).parents("td").parents("tr").children().eq(1).html();
});

// 修改图片
$(document).on("click",".pic",function(){
	sessionStorage.setItem("page",$(".current").html());
	window.location.href = "product_images.html?pic="+$(this).parents("td").parents("tr").children().eq(1).html();
});
//批量删除
function datadel(){
	sessionStorage.setItem("page",$(".current").html());
	var id_array=new Array();  
	$('input[name="gay"]:checked').each(function(){
	    id_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});  

	if(id_array.length == 0 || id_array == []){
		alert("请选择您要删除的选项");
		return false;
	}
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/CarManager/deleteCarInfos",
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
				alert('删除失败')
			}
		});
	}
};
carlist()
function carlist(){
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarManager/getManufacture",
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			 data.all.sort(fun)
			 function fun(a,b){
			 	return a[2].substr(0,1).localeCompare(b[2].substr(0,1));
			 }
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
//			swal("获取主机厂失败!", "", "error");
			carlist()
		}
	})
}
$("#box").click(function(){
	$(".conts1").addClass('active');
	$(".conts3").addClass('active');
	$(".conts4").addClass('active');
	$(".custom-combobox input").val("");
	$("#s3").html("请选择车型");
	$("#s3").css("color","#999");
	$("#s4").html("请选择销售名称");
	$("#s4").css("color","#999");
	$("#s1").html("请选择年款");
	$("#s1").css("color","#999");
})

$("#s3").click(function(e){
	stopPropagation(e)
	if($('#arrcity').val()==''){
		swal("请选择主机厂", "", "error");
		return false
	}
	$(".conts3").html("").removeClass('active');
	$(".conts4").addClass('active');
	$(".conts1").addClass('active');
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarManager/getVehicleName",
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
			$("#ui-id-1").css("left",((window.innerWidth-725)/2+300)+"px");
		},error:function(data){
			//console.log(data);
		}
	})
});

$(document).on("click",".conts3 p",function(){
	$("#s3").html($(this).html());
	$(".conts3").addClass('active')
	$("#s3").css("color","#000");
	$("#s4").html("请选择销售名称");
	$("#s4").css("color","#999");
//	$("#s1").html("请选择年款");
//	$("#s1").css("color","#999");

	
})
$("#s4").click(function(e){
	stopPropagation(e)
	if($('#s3').text()=='请选择车型'){
		swal("请选择车型", "", "error");
		return false
	}
	$(".conts4").removeClass('active').html('');
	$(".conts1").addClass('active');
	$(".conts3").addClass('active');
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarManager/getNameofsales",
		data:{
			"Manufacture":$("#arrcity").val(),
			"VehicleName":$("#s3").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)	
			$("#loading").hide();
			$("#s4").show();
			$.each(data,function(key,value){
				$("<p>").html(value).appendTo($(".conts4"));
			})
			$(".conts4 p").click(function(){
				$(".conts4").addClass('active');
				$("#s4").html($(this).html());
				$("#s4").css("color","#000");
//				$("#s1").html("请选择年款");
//				$("#s1").css("color","#999");
			})
		},error:function(data){
			//console.log(data);
		}
	})
})

$("#s1").click(function(e){
	stopPropagation(e)
	$("#loading").show();
	$(".conts1").html("").removeClass('active');
	$(".conts3").addClass('active');
	$(".conts4").addClass('active');
	var carname=$("#s4").html()
	if(carname=='请选择销售名称'){
		carname=''
	}
	var Manufacture=$("#arrcity").val()
	var VehicleName=$("#s3").html()
	if(VehicleName=='请选择车型'){
		VehicleName=''	
	}
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarManager/getVehicleofyear",
		data:{
			"Nameofsales":carname,
			"Manufacture":Manufacture,
			"VehicleName":VehicleName
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			data.sort(fun)
			function fun(a,b){
				return b.year-a.year				
			}
			$.each(data,function(key,value){
				$("<p>").html(value.Vehicle_of_year).appendTo($(".conts1"));
			})
			$(".conts1 p").click(function(e){
				stopPropagation(e)
				console.log($(this).text())
				$(".conts1").addClass("active");
				$("#s1").html($(this).text());
				$("#s1").css("color","#000");
			})
		},error:function(data){
			//console.log(data);
		}
	})
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
	}
});


$("#btnsubmit").click(function(){
	if($(".selectname2").val() == "按条件搜索"){
		swal("请选择查询条件!", "", "error");
	}else if($("#inpsubmit").val() == ""){
		swal("请输入要查询的值!", "", "error");
	}else if($(".selectname2").val() == "Mi-Key"){


		$("#arrcity").val("");
		$("#s3").html("请选择车型");
		$("#s3").css("color","#999");
		$("#s4").html("请选择销售名称");
		$("#s4").css("color","#999");
		$("#s1").html("请选择年款");
		$("#s1").css("color","#999");;
		$(".selectname1").val("产品类型");
		$(".warting").hide();
		$("tbody").html("");

		fn();

	}else if($(".selectname2").val() == "发动机型号"){

		$("#arrcity").val("");
		$("#s3").html("请选择车型");
		$("#s3").css("color","#999");
		$("#s4").html("请选择销售名称");
		$("#s4").css("color","#999");
		$("#s1").html("请选择年款");
		$("#s1").css("color","#999");
		$(".selectname1").val("产品类型");
		$(".warting").hide();
		$("tbody").html("");

		fn();
	}
});
$(document).click(function(e){
	stopPropagation(e)
	$('.conts3,.conts1,.conts4').addClass('active')
})
//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 