var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
username_id='luosheng'
var carlist=''
/*年份*/
$('.year').click(function(e){
	e.stopPropagation()
	var car=$('#car').val()
	var cartype=$('.cartype').text()
	var carname=$('.carname').text()	
	var underpan=$('.underpan').text()	
	var engine=$('.engine').text()	
	if(car=='选择主机厂'){
		car=''
	}
	if(cartype=='选择车型'){
		cartype=''
	}
	if(carname=='选择销售名称'){
		carname=''
	}
	if(underpan=='选择底盘号'){
		underpan=''
	}
	if(engine=='选择发动机'){
		engine=''
	}
	$('.yearlist').show()
	$(".carlist").hide()
	$(".cartypelist").hide()
	$(".carnamelist").hide()
	$(".underpanlist").hide()
	$(".enginelist").hide()
	$(".yearlist").html('')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/getyear",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':car,
			'VehicleName':cartype,
			'Name_of_sales':carname,
			'ChassisNumber':underpan,
			'Engine_Code':engine
		},
		success:function(data){
			console.log(data)
			data.list.sort(fun)
			function fun(a,b){
				return b.Year_of_production-a.Year_of_production
			}
			$.each(data.list, function(key,value) {
				var caroption=$("<p>").html(value.Year_of_production)				
				caroption.appendTo('.yearlist')
			});
////			
		},error:function(){
			alert('请求失败')
		}
	});
})
$(document).on('click','.yearlist p',function(){
	$('.year').text($(this).text()).prop('title',$(this).text())
	$('.year').css('color','#333')
	$('.yearlist').hide()
})
/*主机厂*/
$('.car').click(function(e){
	e.stopPropagation()
	var year=$('.year').text()
	if(year=='选择年份'){
		year=''
	}
	$('.carlist').html('')
	$('.yearlist').hide()
	$('.carlist').show()
	$('.carlist2').hide()
	$('#car').val('')
	$(".cartypelist").hide()
	$(".carnamelist").hide()
	$(".underpanlist").hide()
	$(".enginelist").hide()
	$(".cartype").text('选择车型')
	$(".carname").text('选择销售名称')
	$(".underpan").text('选择底盘号')
	$(".engine").text('选择发动机')
	$('.cartype,.carname,.underpan,.engine').css('color','#9a9a9a')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/getManufacture",
		cache: false,
		crossDomain: true == !(document.all),
		data:{
			'Year_of_production':year
		},
		success:function(data){
//			console.log(data)
			$.each(data.list,function(key,value){
					value.szm=makePy(value.Manufacture_CN)[0].toLowerCase()
					value.pinyin=ConvertPinyin(value.Manufacture_CN)
				})
				data.list= data.list.sort (function(item1,item2){
				    return item1.szm[0].localeCompare(item2.szm[0])
				})
				carlist=data.list
			$.each(data.list, function(key,value) {
				var caroption=$("<p>").html(value.Manufacture_CN)				
				caroption.appendTo($('.carlist'))
			});
//			console.log(data.list)			
		},error:function(){
			alert('请求失败')
		}
	});
	
})
/*车型手动输入*/
$("#car").on('input',function(){
	var val=$(this).val().toLowerCase()
	$('.carlist2').html('')
	if(val!=''&&val.length!=0){
		$.each(carlist, function(key,value) {
			if(JSON.stringify(value).indexOf(val)>0){
				var caroption=$("<p>").html(value.Manufacture_CN)				
				caroption.appendTo('.carlist2')	
			}
		});	
		$(".carlist").hide()
		$(".carlist2").show()
	}else{
		$(".carlist").show()
		$(".carlist2").hide()
	}
})
/*车点击*/
$(document).on('click','.carlist p,.carlist2 p',function(){
	$('#car').val($(this).text())
	$('.carlist').hide()
	$('.carlist2').hide()
})
/*车型*/
$('.cartype').click(function(e){
	e.stopPropagation()
	if($('#car').val()=='选择主机厂'){
		alert('请选择主机厂')
		return false
	}
	var year=$('.year').text()
	if(year=='选择年份'){
		year=''
	}
	$(".carname").text('选择销售名称')
	$(".underpan").text('选择底盘号')
	$(".engine").text('选择发动机')
	$('.carname,.underpan,.engine').css('color','#9a9a9a')
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').show()
	$(".carnamelist").hide()
	$(".underpanlist").hide()
	$(".enginelist").hide()
	$(".cartypelist").html('')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/getVehicleName",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'Year_of_production':year
		},
		success:function(data){
			console.log(data)
			$.each(data.list, function(key,value) {
				var caroption=$("<p>").html(value.Vehicle_Name_CN)				
				caroption.appendTo('.cartypelist')
			});
////			
		},error:function(){
			alert('请求失败')
		}
	});
})
$(document).on('click','.cartypelist p',function(){
	$('.cartype').text($(this).text()).prop('title',$(this).text())
	$('.cartype').css('color','#333')
	$('.cartypelist').hide()
	$('.carname').text('选择销售名称')
	$('.underpan').text('选择底盘号')
	$('.engine').text('选择发动机')
	$('.carname,.underpan,.engine').css('color','#9a9a9a')
})
/*销售名称*/
$('.carname').click(function(e){
	e.stopPropagation()
	$(".carnamelist").html('')
	var year=$('.year').html()
	if($('#car').val()=='选择主机厂'){
		alert('请请选择主机厂')
		return false
	}
	if($('.cartype').text()=='选择车型'){
		alert('请选择车型')
		return false
	}
	if(year=='选择年份'){
		year=''
	}
	$(".underpan").text('选择底盘号')
	$(".engine").text('选择发动机')
	$('.underpan,.engine').css('color','#9a9a9a')
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').hide()
	$('.carnamelist').show()
	$(".underpanlist").hide()
	$(".enginelist").hide()
	$('.carnamelist').html('')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/getNameofsales",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'VehicleNameCN':$('.cartype').text(),
			'Year_of_production':year
		},
		success:function(data){
			console.log(data)
			$.each(data.list, function(key,value) {
				var caroption=$("<p>").html(value.Name_of_sales)				
				caroption.appendTo('.carnamelist')
			});			
		},error:function(){
			alert('请求失败')
		}
	});
})
$(document).on('click','.carnamelist p',function(){
	$('.carname').text($(this).text()).prop('title',$(this).text())
	$('.carname').css('color','#333')
	$('.carnamelist').hide()
})

/*底盘号*/
$('.underpan').click(function(e){
	e.stopPropagation()
	$(".underpanlist").html('')
	var year=$('.year').html()
	if($(".carname").text()=='选择销售名称'){
		alert('请选择销售名称')
		return false
	}
	if(year=='选择年份'){
		year=''
	}
	$(".engine").text('选择发动机')
	$('.engine').css('color','#9a9a9a')
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').hide()
	$('.carnamelist').hide()
	$('.underpanlist').show()
	$(".enginelist").hide()
	$('.underpanlist').html('')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/getChassisNumber",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'VehicleName':$('.cartype').text(),
			'Name_of_sales':$('.carname').text(),
			'Year_of_production':year
		},
		success:function(data){
			console.log(data)
			if(data.list==''||data.list.length==0){
				alert('暂无数据')
				return false
			}
			$.each(data.list, function(key,value) {
				var caroption=$("<p>").html(value.ChassisNumber)				
				caroption.appendTo('.underpanlist')
			});
////			
		},error:function(){
			alert('请求失败')
		}
	});
})
$(document).on('click','.underpanlist p',function(){
	$('.underpan').text($(this).text()).prop('title',$(this).text())
	$('.underpan').css('color','#333')
	$('.underpanlist').hide()
})

/*发动机*/
$('.engine').click(function(e){
	e.stopPropagation()
	$(".enginelist").html('')
	var year=$('.year').html()
	if($(".underpan").text()=='选择底盘号'){
		alert('请选择底盘号')
		return false
	}
	if(year=='选择年份'){
		year=''
	}
	$('.enginelist').html('')
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').hide()
	$('.carnamelist').hide()
	$('.underpanlist').hide()
	$('.enginelist').show()
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/getEngineCode",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'VehicleName':$('.cartype').text(),
			'Name_of_sales':$('.carname').text(),
			'ChassisNumber':$('.underpan').text(),
			'Year_of_production':year
		},
		success:function(data){
			console.log(data)
			if(data.list==''||data.list.length==0){
				alert('暂无数据')
				return false
			}
			$.each(data.list, function(key,value) {
				var caroption=$("<p>").html(value.Engine_Code)				
				caroption.appendTo('.enginelist')
			});
////			
		},error:function(){
			alert('请求失败')
		}
	});
})
$(document).on('click','.enginelist p',function(){
	$('.engine').text($(this).text()).prop('title',$(this).text())
	$('.engine').css('color','#333')
	$('.enginelist').hide()
})

/*按车型查询*/
$('.carbtn').click(function(e){
	e.stopPropagation()
	var Year_of_production=$('.year').text()
	if($('.year').text()=='选择年份'){
		Year_of_production=''
	}
	var Manufacture=$('#car').val()
	if($('#car').val()=='选择主机厂'){
		Manufacture=''
	}
	var VehicleName=$('.cartype').text()
	if($('.cartype').text()=='选择车型'){
		VehicleName=''
	}
	var Name_of_sales=$('.carname').text()
	if($('.carname').text()=='选择销售名称'){
		Name_of_sales=''
	}
	var ChassisNumber=$('.underpan').text()
	if($('.underpan').text()=='选择底盘号'){
		ChassisNumber=''
	}
	var Engine_Code=$(".engine").text()
	if($(".engine").text()=='选择发动机'){
		Engine_Code=''
	}
	$("tbody").html("");
	$(".warting").removeClass("active");
	$(".product_id").val('')	
	$(".noselect").addClass('active')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/QueryProduct",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':Manufacture,
			'VehicleName':VehicleName,
			'Name_of_sales':Name_of_sales,
			'ChassisNumber':ChassisNumber,
			'Engine_Code':Engine_Code,
			'Year_of_production':Year_of_production,
			'pageindex':1
		},
		success:function(data){
			console.log(data)
			if(data.list==''||data.list.length==0){
				$(".alltotal").html("0");
				$(".wartno").removeClass("active");
				$(".zxf_pagediv").addClass("active");
				return false
			}
				$(".noselect").addClass("active");
				$(".warting").addClass("active");
				$(".wartno").addClass("active");
				$(".zxf_pagediv").removeClass("active");
				$(".alltotal").html(data.listsize);
			$.each(data.list, function(key,value) {
				var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
				var td2 = $("<td>").html(value.mikey);
				var td3 = $("<td>").html(value.Manufacture_CN);
				var td4 = $("<td>").html(value.Vehicle_Name_CN);
				var td5 = $("<td>").html(value.Name_of_sales);
				var td6 = $("<td>").html(value.ChassisNumber);
				var td7 = $("<td>").html(value.Engine_Code);
				var td8 = $("<td>").html(value.Year_of_production);
				var td9 = $("<td>").html('<a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
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
					$(tr).appendTo("tbody");
			});
			$(".zxf_pagediv").createPage({
			        pageNum: Math.ceil(data.listsize/10),//总页码
			        current: 1,//当前页
			        backfun: function(e) {
//		                  console.log(e);//回调
		                  var pageindex = e.current;
		                  console.log(pageindex)
		                  $(".warting").removeClass("active");
		                  $("tbody").html("");
		                  $.ajax({
								type:"post",
								url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/QueryProduct",
								data:{			
									'Manufacture':Manufacture,
									'VehicleName':VehicleName,
									'Name_of_sales':Name_of_sales,
									'ChassisNumber':ChassisNumber,
									'Engine_Code':Engine_Code,
									'Year_of_production':Year_of_production,
									'pageindex':pageindex
								},
								cache: false,
								crossDomain: true == !(document.all),
								success:function(data){
									console.log(data)
									$(".warting").addClass("active");
									$.each(data.list, function(key,value) {
										var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
										var td2 = $("<td>").html(value.mikey);
										var td3 = $("<td>").html(value.Manufacture_CN);
										var td4 = $("<td>").html(value.Vehicle_Name_CN);
										var td5 = $("<td>").html(value.Name_of_sales);
										var td6 = $("<td>").html(value.ChassisNumber);
										var td7 = $("<td>").html(value.Engine_Code);
										var td8 = $("<td>").html(value.Year_of_production);
										var td9 = $("<td>").html('<a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
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
											$(tr).appendTo("tbody");
									});
										
								},error:function(){
									alert('请求失败')
								}
							});
		        }
		    });
			
		},error:function(){
			alert('请求失败')
		}
	});
})
$(document).click(function(e){
	e.stopPropagation()
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').hide()
	$('.carnamelist').hide()
	$('.underpanlist').hide()
	$('.enginelist').hide()
})
$(document).on('click','.delthis',function(){
	$(this).parents('tr').remove()
})
$.ajax({
	type:"post",
	url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/selectcategory",
	data:{
		'brand_id':username_id	
	},
	success:function(data){
		$.each(data.list, function(key,value) {
			var div=$("<p id="+value.category_id+">").text(value.category_name)
			div.appendTo('.one')
		});
		
	},error:function(){
		alert('请求失败')
	}
});
$(document).on('click','.one p',function(){
	$(this).addClass('pclick')
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':$(this).prop('id')
		},
		success:function(data){
			console.log(data)
			$.each(data.list, function(key,value) {
				var div=$("<p id="+value.category_id+">").text(value.category_name)
				div.appendTo('.two')
			});
			
		},error:function(){
			alert('请求失败')
		}
	})
});
$(document).on('click','.two p',function(){
	$(this).addClass('pclick')
	$(this).siblings().removeClass('pclick')
});
$(document).on('click','.text-c',function(){
	$(this).addClass('pitch-on')
	$(this).siblings().removeClass('pitch-on')
})
$(".matching").click(function(){
	var mikey=$('.pitch-on').find('td').eq('1').html()
	if(mikey==undefined||mikey=='undefined'){
		alert('请在表格中选中您要匹配的车型')
		return false;
	}
	var category_id=$('.two .pclick').attr('id')
	console.log(category_id)
	if(category_id==undefined||category_id=='undefined'){
		alert('请选择产品类型')
		return false;
	}
	var product_id=$('.product_id').val()
	if(product_id==''||product_id.length==0){
		alert('请输入您的产品编码')
		return false;
	}
	var oemk=[{
			'mikey':mikey,
			'category_id':category_id,
			'oenumber':'',
			'product_id':product_id,
			'img':'',
			'brand_id':username_id
	}]
	$.ajax({
		type:"post",
		url:"http://192.168.125.131:8080/MattrioEcModel/original_oe/insertbindingoe",
		data:{
			'oemk':	JSON.stringify(oemk)		
		},
		success:function(data){
			console.log(data.msg)
			alert(data.msg)
			
		},error:function(){
			alert('请求失败')
		}
	})

})
