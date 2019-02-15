var network = localStorage.getItem("network");
var network	='http://192.168.125.131:8080'
var username_id = localStorage.getItem("username_id");
username_id='luosheng'
var carlist=''
$(".tabbtn1").click(function(){
	$(".carselect").show()
	$(".oeinp").hide()
	$(this).removeClass('tabbtn').siblings('button').addClass('tabbtn')
})
$(".tabbtn2").click(function(){
	$(".carselect").hide()
	$(".oeinp").show()
	$(this).removeClass('tabbtn').siblings('button').addClass('tabbtn')
})
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
		url:network+"/MattrioEcModel/original_oe/getyear",
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
			var caroption=$("<p>").html('选择年份')				
				caroption.appendTo('.yearlist')
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
	if($(this).text()!='选择年份'){
		$('.year').css('color','#333')	
	}else{
		$('.underpan').css('color','#9a9a9a')	
	}
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
		url:network+"/MattrioEcModel/original_oe/getManufacture",
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
				var caroption=$("<p>").html('选择主机厂')				
				caroption.appendTo('.carlist')
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
	if($(this).text()=='选择主机厂'){
		$('#car').val('')
	}
	$('.carlist').hide()
	$('.carlist2').hide()
})
/*车型*/
$('.cartype').click(function(e){
	e.stopPropagation()
	if($('#car').val()==''){
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
		url:network+"/MattrioEcModel/original_oe/getVehicleName",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'Year_of_production':year
		},
		success:function(data){
			console.log(data)
			var caroption=$("<p>").html('选择车型')				
				caroption.appendTo('.cartypelist')
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
	if($(this).text()!='选择车型'){
		$('.cartype').css('color','#333')	
	}else{
		$('.underpan').css('color','#9a9a9a')	
	}
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
	var underpan=$(".underpan").text()
	if(underpan=='选择底盘号'){
		underpan=''
	}
	var engine=$(".engine").text()
	if(engine=='选择发动机'){
		engine=''
	}
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').hide()
	$('.carnamelist').show()
	$(".underpanlist").hide()
	$(".enginelist").hide()
	$('.carnamelist').html('')
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getNameofsales",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'VehicleNameCN':$('.cartype').text(),
			'Year_of_production':year,
			'ChassisNumber':underpan,
			'Engine_Code':engine,
		},
		success:function(data){
			console.log(data)
			var caroption=$("<p>").html('选择销售名称')				
				caroption.appendTo('.carnamelist')
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
	if($(this).text()!='选择销售名称'){
		$('.carname').css('color','#333')	
	}else{
		$('.underpan').css('color','#9a9a9a')	
	}
	$('.carnamelist').hide()
})

/*底盘号*/
$('.underpan').click(function(e){
	e.stopPropagation()
	$(".underpanlist").html('')
	var year=$('.year').html()
	var cartype=$(".cartype").text()
	if(cartype=='选择车型'){
		alert('请选择车型')
		return false
	}
	var carname=$(".carname").text()
	if(carname=='选择销售名称'){
		carname=''
	}
	if(year=='选择年份'){
		year=''
	}
	var engine=$(".engine").text()
	if(engine=='选择发动机'){
		engine=''
	}
//	$(".engine").text('选择发动机')
//	$('.engine').css('color','#9a9a9a')
	$('.yearlist').hide()
	$('.carlist').hide()
	$('.cartypelist').hide()
	$('.carnamelist').hide()
	$('.underpanlist').show()
	$(".enginelist").hide()
	$('.underpanlist').html('')
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getChassisNumber",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'VehicleName':cartype,
			'Name_of_sales':carname,
			'Year_of_production':year,
			'Engine_Code':engine
		},
		success:function(data){
			console.log(data)
			if(data.list==''||data.list.length==0){
				alert('暂无数据')
				return false
			}
			var caroption=$("<p>").html('选择底盘号')				
				caroption.appendTo('.underpanlist')
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
	if($(this).text()!='选择底盘号'){
		console.log($(this).text())
		$('.underpan').css('color','#333')	
	}else{
		$('.underpan').css('color','#9a9a9a')	
	}
	$('.underpanlist').hide()
})

/*发动机*/
$('.engine').click(function(e){
	e.stopPropagation()
	$(".enginelist").html('')
	var year=$('.year').html()
	var cartype=$(".cartype").text()
	if(cartype=='选择车型'){
		alert('选择车型')
		return false;
	}
	var carname=$('.carname').text()
	if(carname=='选择销售名称'){
		carname=''
	}
	var underpan=$(".underpan").text()
	if(underpan=='选择底盘号'){
		underpan=''
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
		url:network+"/MattrioEcModel/original_oe/getEngineCode",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':$('#car').val(),
			'VehicleName':cartype,
			'Name_of_sales':carname,
			'ChassisNumber':underpan,
			'Year_of_production':year
		},
		success:function(data){
			console.log(list)
			if(data.list==''||data.list.length==0){
				alert('暂无数据')
				return false
			}
			var caroption=$("<p>").html('选择发动机')				
				caroption.appendTo('.enginelist')
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
	if($(this).text()!='选择发动机'){
		$('.engine').css('color','#333')	
	}else{
		$('.underpan').css('color','#9a9a9a')	
	}
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
		url:network+"/MattrioEcModel/original_oe/QueryProduct",
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
//				var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
				var td2 = $("<td>").html(value.mikey);
				var td3 = $("<td>").html(value.Manufacture_CN);
				var td4 = $("<td>").html(value.Vehicle_Name_CN);
				var td5 = $("<td>").html(value.Name_of_sales);
				var td6 = $("<td>").html(value.ChassisNumber);
				var td7 = $("<td>").html(value.Engine_Code);
				var td8 = $("<td>").html(value.Year_of_production);
				var td9 = $("<td>").html('<a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="添加"><i class="iconfont icon-tianjia"></i></a>');
				var tr = $("<tr class='text-c'>");
//					td1.appendTo(tr);
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
								url:network+"/MattrioEcModel/original_oe/QueryProduct",
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
//										var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
										var td2 = $("<td>").html(value.mikey);
										var td3 = $("<td>").html(value.Manufacture_CN);
										var td4 = $("<td>").html(value.Vehicle_Name_CN);
										var td5 = $("<td>").html(value.Name_of_sales);
										var td6 = $("<td>").html(value.ChassisNumber);
										var td7 = $("<td>").html(value.Engine_Code);
										var td8 = $("<td>").html(value.Year_of_production);
										var td9 = $("<td>").html('<a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="添加"><i class="iconfont icon-tianjia"></i></a>');
										var tr = $("<tr class='text-c'>");
//											td1.appendTo(tr);
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
	
})
$('#btnsubmit').click(function(){
	var oeinp=$(".oe").val()
	console.log($(".oe"))
	if(oeinp==''||oeinp.length==0){
		alert('请输入OE号码')
		return false;
	}
	$.ajax({
		type:"post",
		url:"http://www.51macc.com:8080/Mattrio/ProductInterface/getOeCars",
		data:{
			'oenumber':oeinp,
			'userid':'1a966545-b1ad-4833-9e6b-0c4da021f1e6'
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			console.log()
		},error:function(){
			
		}
	});
})
$(".namebtn").click(function(){
	var name=$('#nameinp').val()
	if(name==''||name.length==0){
		alert('请输入名称')
		return false;
	}
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/selectcategoryname",
		data:{
			'brand_id':'luosheng',
			'category_name':'球头'
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			
		},error:function(){
			
		}
	});
})
/*三级分组*/
//$('.one p').click(function(){
//	$(this).addClass('pclick1').siblings('p').removeClass('pclick1')
//	var str = ["A","B","C","D","E","F","G"];
//	var categoryid = str[$(this).index()];
//	$(".two").html('')
//	$('.three').html('')
//	$('.threetitle').html('<span>'+$(this).text()+'<span class="arrow"></span></span>')
//	$.ajax({
//		type:"post",
//		url:"http://www.51macc.com:8080/Mattrio/ProductInterface/getCategory2",
//		data:{
//			"categoryid":categoryid,
//			"mikey":'MIA010220A006',
//			"userid":'1a966545-b1ad-4833-9e6b-0c4da021f1e6'
//		},
//		cache: false,
//		crossDomain: true == !(document.all),
//		success:function(data){
//			console.log(data)
//			if(data.list == [] || data.list.length == 0){
//				var div=$("<p>").text('暂无数据')
//				div.appendTo('.three')
//				return false
//			}
//			$.each(data.list, function(key,value) {
//				var div=$("<p id="+value.category_id+">").text(value.category_name)
//				div.appendTo('.two')
//			});
//			
//		},error:function(){
//			alert('请求失败')
//		}
//	})
//});
//$(document).on('click','.two p',function(){
//	$(this).addClass('pclick2').siblings('p').removeClass('pclick2')
//	$('.three').html('')
//	$('.threetitle').html('<span>'+$('.pclick1').text()+'<span class="arrow"></span></span><span>'+$(this).text()+'<span class="arrow"></span></span>')
//	$.ajax({
//		type:"post",
//		url:"http://www.51macc.com:8080/Mattrio/ProductInterface/getCategory3",
//		data:{
//			"categoryid":$(this).attr('id'),
//			"mikey":'MIA010220A006',
//			"userid":'1a966545-b1ad-4833-9e6b-0c4da021f1e6'
//		},
//		cache: false,
//		crossDomain: true == !(document.all),
//		success:function(data){
//			console.log(data)
//			if(data.list == [] || data.list.length == 0){
//				var div=$("<p>").text('暂无数据')
//				div.appendTo('.three')
//				return false
//			}
//			$.each(data.list, function(key,value) {
//				var div=$("<p id="+value.category_id+">").text(value.category_name)
//				div.appendTo('.three')
//			});
//			
//		},error:function(){
//			alert('请求失败')
//		}
//	})
//});
//$(document).on('click','.three p',function(){
//	$(this).addClass('pclick3').siblings('p').removeClass('pclick3')
//	$('.threetitle').html('<span>'+$('.pclick1').text()+'<span class="arrow"></span></span><span>'+$('.pclick2').text()+'<span class="arrow"></span></span></span><span>'+$(this).text()+'<span class="arrow"></span></span><span class="none">×</span>')		
//})
$.ajax({
	type:"post",
	url:"http://ec.51macc.com/MattrioEcModel/SelectCarIntface/getBrandCategory",
	data:{
		"brand_id":username_id,
	},
	cache: false,
	async: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$.each(data.list, function(key,value) {
			var p=$("<p id="+value.category_id+">").html(value.category_name)
			p.appendTo('.one')
		});
	},error:function(){
		alert('请求失败')	
	}
});
$(document).on('click','.one p',function(){
	$(this).addClass('pclick1').siblings('p').removeClass('pclick1')
	$('.two').html('')
	$('.two p').removeClass('pclick2')	
	$('.threetitle').html('<span>'+$('.pclick1').text()+'<span class="arrow"></span></span>')		
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/selectcategory2",
		data:{
			"brand_id":username_id,
			'category_id':$(this).attr('id')
		},
		cache: false,
		async: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$.each(data.list, function(key,value) {
				var p=$("<p id="+value.category_id+">").html(value.category_name)
				p.appendTo('.two')
			});
		},error:function(){
			alert('请求失败')	
		}
	});
})
$(document).on('click','.two p',function(){
	$(this).addClass('pclick2').siblings('p').removeClass('pclick2')
	$('.threetitle').html('<span>'+$('.pclick1').text()+'<span class="arrow"></span></span><span>'+$('.pclick2').text()+'<span class="arrow"></span></span><span class="none">×</span>')		
})
$(document).on('click','.none',function(){
	$('.threetitle').html('')
	$(".one p").removeClass('pclick1')
	$(".two").html('')
})
$(".slide").click(function(){
	$(".catalogwrap").slideToggle()
	$(this).find('img').toggleClass('img')
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
		url:network+"/MattrioEcModel/original_oe/insertbindingoe",
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
