var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
var id=getUrlParam('id')
var one=decodeURIComponent(getUrlParam('one'))
var two=decodeURIComponent(getUrlParam('two'))
var category_id=getUrlParam('cid')
$(".toptitle").html(id+"<span class='arrow'></span>"+one+"<span class='arrow'></span>"+two+'<button class="back" onclick="btnBack()">返回</button>')
sessionStorage.setItem('match',[])
sessionStorage.setItem('matchoe',[])
//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var pages=getUrlParam('pages')
function btnBack(){
    window.location.href = '../upload-matching.html?pages='+pages

}
$(".tabbtn1").click(function(){
	$(".carselect").show()
	$(".oeinp").hide()
	$(this).removeClass('tabbtn').siblings('.tabbtn2').addClass('tabbtn')
	$(".cartabwrap").show()	
	$('.oetabwrap').hide()
})
$(".tabbtn2").click(function(){
	$(".carselect").hide()
	$(".oeinp").show()
	$(this).removeClass('tabbtn').siblings('.tabbtn1').addClass('tabbtn')
	$(".cartabwrap").hide()
	$('.oetabwrap').show()
})
$("#loading").show()
/*主机厂*/
$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getManufacture",
		cache: false,
		crossDomain: true == !(document.all),
		data:{
			'Year_of_production':''
		},
		success:function(data){
			$("#loading").hide()
			$.each(data.list,function(key,value){
				var div1 = $("<div class='num_name' title="+value.Manufacture_CN+">").html(value.Manufacture_CN);
				var div2 = $("<div class='sort_list'>");
				div1.appendTo(div2);
				div2.appendTo(".sort_box");	
			})
			initials();				
		},error:function(){
			$("#loading").hide()
			swal("请求失败!", "", "error");('请求失败')
		}
	});
/*获取车型*/
var add='<a style="text-decoration:none;font-size:16px" class="ml-5 delthis add" href="javascript:;" title="添加"><i class="Hui-iconfont Hui-iconfont-gengduo4"></i></a>'
var rem='<a style="text-decoration:none;font-size:16px" class="ml-5 delthis rem" href="javascript:;" title="添加"><i class="Hui-iconfont Hui-iconfont-shenhe-tingyong"></i></a>'
$(document).on('click','.cartabwrap .sort_list',function(){
	var matching=sessionStorage.getItem('match')
	$(this).addClass('this')
	$(this).siblings().removeClass('this')	
	$('.cartabwrap .cartype').html('')
	$('.engine').html('')
	$('.underpan').html('')
	$('.cartabwrap .year').html('')
	$('.cartabwrap .carname').html('')
	var car=$(this).text()
	$("#loading").show()
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getVehicleName",
		cache: false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':car,
			'Year_of_production':''
		},
		success:function(data){	
			$("#loading").hide()
			$.each(data.list, function(key,value) {
				var jsonstr=JSON.stringify({'Manufacture':car,'VehicleName':value.Vehicle_Name_CN,'Engine_Code':'','ChassisNumber':'','Year_of_production':'','Name_of_sales':''})
				if(matching.indexOf(jsonstr)<0){
					var caroption=$("<p title="+value.Vehicle_Name_CN+">").html(value.Vehicle_Name_CN+add)	
				}else{
					var caroption=$("<p title="+value.Vehicle_Name_CN+">").html(value.Vehicle_Name_CN+rem)	
				}			
				caroption.appendTo('.cartabwrap .cartype')
				sessionStorage.getItem('match').lastIndexOf()
			});
		},error:function(){
			$("#loading").hide()
//			swal("请求失败!", "", "error");('请求失败')
		}
	});
})
/*获取发动机*/
$('.cartabwrap .cartype').on('click','p',function(){
	var matching=sessionStorage.getItem('match')
	$(this).addClass('this')
	$(this).siblings().removeClass('this')	
	$('.cartabwrap .engine').html('')
	$('.cartabwrap .underpan').html('')
	$('.cartabwrap .year').html('')
	$('.cartabwrap .carname').html('')
	var car=$(".sort_box").find('.this').text()
	var cartype=$(this).text()
	$("#loading").show()
	engine(cartype)
	year('')
	if($(this).find('a').prop('class')=='ml-5 delthis rem'){
		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	}
})
/*获取底盘号*/
//$(document).on('click','.cartabwrap .engine p',function(){
//	$(this).addClass('this')
//	$(this).siblings().removeClass('this')	
//	$('.underpan').html('')
//	$('.cartabwrap .year').html('')
//	$('.cartabwrap .carname').html('')
//	engine($(this).text())
//})
function engine(cartype,year){
	var matching=sessionStorage.getItem('match')
	$('.cartabwrap .engine').html('')
//	$('.cartabwrap .year').html('')
	$('.cartabwrap .carname').html('')
	var car=$(".sort_box").find('.this').text()
//	var cartype=$(".cartabwrap .cartype").find('.this').text()
	var Engine_Code=''
	$("#loading").show()
//	$.ajax({
//		type:"post",
//		url:network+"/MattrioEcModel/original_oe/getChassisNumber",
//		cache: false,
//		async:false,
//		crossDomain: true == !(document.all),
//		data:{			
//			'Manufacture':car,
//			'VehicleName':cartype,
//			'Name_of_sales':'',
//			'Year_of_production':year,
//			'Engine_Code':''
//		},
//		success:function(data){
//			$("#loading").hide()
//			if(data.list==''||data.list.length==0){	
//				return false;
//			}			
//			$.each(data.list, function(key,value) {
//				var jsonstr=JSON.stringify({'Manufacture':car,'VehicleName':cartype,'Engine_Code':Engine_Code,'ChassisNumber':value.ChassisNumber,'Year_of_production':'','Name_of_sales':''})
//			if(matching.indexOf(jsonstr)<0){
//				var caroption=$("<p title="+value.ChassisNumber+">").html(value.ChassisNumber+add)	
//			}else{
//				var caroption=$("<p title="+value.ChassisNumber+">").html(value.ChassisNumber+rem)	
//			}					
//				caroption.appendTo('.cartabwrap .underpan')
//			});	
//		},error:function(){
//			$("#loading").hide()
////			swal("请求失败!", "", "error");('请求失败')
//		}
//	})
$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getEngineCode",
		cache: false,
		async:false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':car,
			'VehicleName':cartype,
			'Name_of_sales':'',
			'ChassisNumber':'',
			'Year_of_production':year
		},
		success:function(data){
			$("#loading").hide()
			if(data.list==[]||data.list.length==0){
				return false
			}	
			$.each(data.list, function(key,value) {
				var jsonstr=JSON.stringify({'Manufacture':car,'VehicleName':cartype,'Engine_Code':value.Engine_Code,'ChassisNumber':'','Year_of_production':'','Name_of_sales':''})
				if(matching.indexOf(jsonstr)<0){
					var caroption=$("<p title="+value.Engine_Code+">").html(value.Engine_Code+add)
				}else{
					var caroption=$("<p title="+value.Engine_Code+">").html(value.Engine_Code+rem)
				}				
				caroption.appendTo('.cartabwrap .engine')
			});
		},error:function(){
			$("#loading").hide()
			swal("请求失败!", "", "error");('请求失败')
		}
	});
}
/*获取年份*/
$('.engine').on('click','p',function(){
    $(this).addClass('this')
	$(this).siblings().removeClass('this')	
	var thistext=$(this).text()
    year(thistext)
	if($(this).find('a').length==0||$(this).find('a').prop('class')=='ml-5 delthis rem'){
		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	}
})
function year(ChassisNumber){
    var thisye=$('.ye .this').text()
	var matching=sessionStorage.getItem('match')
	$('.cartabwrap .year').html('')
	$('.cartabwrap .carname').html('')
	var car=$(".sort_box").find('.this').text()
	var cartype=$(".cartabwrap .cartype").find('.this').text()
//	var Engine_Code=$('.engine').find('.this').text()
	var Engine_Code=''
	$("#loading").show()
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getyear",
		cache: false,
		async:false,
		crossDomain: true == !(document.all),
		data:{			
			'Manufacture':car,
			'VehicleName':cartype,
			'Name_of_sales':'',
			'ChassisNumber':Engine_Code,
			'Engine_Code':ChassisNumber
		},
		success:function(data){		
			$("#loading").hide()
			$.each(data.list, function(key,value) {
				if(value.Year_of_production!='待查'){
				    var jsonstr=JSON.stringify({'Manufacture':car,'VehicleName':cartype,'Engine_Code':Engine_Code,'ChassisNumber':ChassisNumber,'Year_of_production':value.Year_of_production,'Name_of_sales':''})
                    if (value.Year_of_production==thisye){
                        var caroption=$("<p class='this' title="+value.Year_of_production+">")
                    }else{
                        var caroption=$("<p title="+value.Year_of_production+">")
                    }
					if(matching.indexOf(jsonstr)<0){
                        caroption.html(value.Year_of_production+add)
					}else{
                        caroption.html(value.Year_of_production+rem)
					}					
						caroption.appendTo('.cartabwrap .year')
				}
			});
            if ($('.year .this').text()){
                $('.cartabwrap .year .this').click()
            }
		},error:function(){
			$("#loading").hide()
//			swal("请求失败!", "", "error");('请求失败')
		}
	});	
}
/*获取销售名称*/
$('.cartabwrap .year').on('click','p',function(){
	var matching=sessionStorage.getItem('match')
	$(this).addClass('this')
	$(this).siblings().removeClass('this')	
	$('.cartabwrap .carname').html('')
	var car=$(".sort_box").find('.this').text()
	var cartype=$(".cartabwrap .cartype").find('.this').text()
//	var Engine_Code=$('.engine').find('.this').text()
	var Engine_Code=''
	var ChassisNumber=$('.underpan').find('.this').text()
	var Year_of_production=$(this).text()
	$("#loading").show()
	if($('.engine').find('.this').length==0){
		engine(cartype,Year_of_production)	
	}
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getNameofsales",
		cache: false,
		async:false,
		crossDomain: true == !(document.all),
		data:{
			'Manufacture':car,
			'VehicleName':cartype,
			'Year_of_production':Year_of_production,
			'ChassisNumber':ChassisNumber,
			'Engine_Code':Engine_Code
		},
		success:function(data){	
			$("#loading").hide()
			$.each(data.list, function(key,value) {
				var jsonstr=JSON.stringify({'Manufacture':car,'VehicleName':cartype,'Engine_Code':Engine_Code,'ChassisNumber':ChassisNumber,'Year_of_production':Year_of_production,'Name_of_sales':value.Name_of_sales})
			if(matching.indexOf(jsonstr)<0){
				var caroption=$("<p title="+value.Name_of_sales+">").html(value.Name_of_sales+add)
			}else{
				var caroption=$("<p title="+value.Name_of_sales+">").html(value.Name_of_sales+rem)	
			}				
				caroption.appendTo('.cartabwrap .carname')
			});		
		},error:function(){
			$("#loading").hide()
//			swal("请求失败!", "", "error");('请求失败')
		}
	});
	if($(this).find('a').length==0||$(this).find('a').prop('class')=='ml-5 delthis rem'){
		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	}
})
/*添加*/
var matcharr=[]
var matchoearr=[]
$('.cartabwrap').on('click','.add',function(e){
	stopPropagation(e)
	$(this).parents('p').addClass('this').siblings('p').removeClass('this')
	$(this).parents('p').append(rem)
	var title=$(this).parents('.cartab').find('.tit').text()
	$(this).parents('.cartab').nextAll('.cartab').find('a').remove()	
	var x=$(this).offset().left
	var y=$(this).offset().top
	var X1=$('.matching').offset().left+30
	var Y1=$('.matching').offset().top	
	var div=$('<div class="div">')
		div.css({
			'left':x+'px',
			'top':y+'px'
		})
		div.appendTo('.wrap')		
		$('.div').animate({
			'left':X1+'px',
			'top':Y1+'px'
		},500,function(){
			$('.div').remove()
		})
	$(this).remove()
	var cartext=$(".sort_box").find('.this').text()
	var cartypetext=$(".cartabwrap .cartype").find('.this').text()
	var enginetext=$(".cartabwrap .engine").find('.this').text()
	var underpantext=$(".cartabwrap .underpan").find('.this').text()
	var yeartext=$(".cartabwrap .year").find('.this').text()
	var carnametext=$(".cartabwrap .carname").find('.this').text()
	if(title=='选择车型'){
		var children={'Manufacture':cartext,'VehicleName':cartypetext,'Engine_Code':'','ChassisNumber':'','Year_of_production':'','Name_of_sales':''}
		if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
			matcharr.push(children)
		}
	}else if(title=='选择发动机型号'){
		var children={'Manufacture':cartext,'VehicleName':cartypetext,'Engine_Code':enginetext,'ChassisNumber':'','Year_of_production':'','Name_of_sales':''}
		if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
			matcharr.push(children)
		}
	}else if(title=='选择底盘号'){
		var children={'Manufacture':cartext,'VehicleName':cartypetext,'Engine_Code':enginetext,'ChassisNumber':underpantext,'Year_of_production':'','Name_of_sales':''}
		if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
			matcharr.push(children)
		}
	}else if(title=='选择年份'){
		var children={'Manufacture':cartext,'VehicleName':cartypetext,'Engine_Code':enginetext,'ChassisNumber':underpantext,'Year_of_production':yeartext,'Name_of_sales':''}
		if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
			matcharr.push(children)
		}
	}else{
		var children={'Manufacture':cartext,'VehicleName':cartypetext,'Engine_Code':enginetext,'ChassisNumber':underpantext,'Year_of_production':yeartext,'Name_of_sales':carnametext}
		if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
			matcharr.push(children)
		}
	}
	sessionStorage.setItem('match',JSON.stringify(matcharr))
})
/*车型查询删除*/
$('.cartabwrap').on('click','.rem',function(){
	var title=$(this).parents('.cartab').find('.tit').text()
	var match=JSON.parse(sessionStorage.getItem('match'))
	$(this).parents('p').addClass('this').siblings('p').removeClass('this')
	$(this).parents('p').append(add)
	$(this).remove()
	if(title=='选择车型'){
		var cartext=$(".sort_box").find('.this').text()
		var cartypetext=$(".cartabwrap .cartype").find('.this').text()
		var enginetext=''
		var underpantext=''
		var yeartext=''
		var carnametext=''
	}else if(title=='选择底盘号'){
		var cartext=$(".sort_box").find('.this').text()
		var cartypetext=$(".cartabwrap .cartype").find('.this').text()
		var enginetext=''
		var underpantext=$(".cartabwrap .underpan").find('.this').text()
		var yeartext=''
		var carnametext=''
	}else if(title=='选择年份'){
		var cartext=$(".sort_box").find('.this').text()
		var cartypetext=$(".cartabwrap .cartype").find('.this').text()
		var enginetext=''
		var underpantext=$(".cartabwrap .underpan").find('.this').text()
		var yeartext=$(".cartabwrap .year").find('.this').text()
		var carnametext=''
	}else{
		var cartext=$(".sort_box").find('.this').text()
		var cartypetext=$(".cartabwrap .cartype").find('.this').text()
		var enginetext=''
		var underpantext=$(".cartabwrap .underpan").find('.this').text()
		var yeartext=$(".cartabwrap .year").find('.this').text()
		var carnametext=$(".cartabwrap .carname").find('.this').text()
	}
	$.each(match, function(key,value) {
		if(value.Manufacture==cartext&&value.VehicleName==cartypetext&&value.Engine_Code==''&&value.ChassisNumber==underpantext&&value.Year_of_production==yeartext&&value.Name_of_sales==carnametext){
				matcharr.splice(key,1)
		}
		
	});
	sessionStorage.setItem('match',JSON.stringify(matcharr))
//	swal("请求失败!", "", "error");('已添加')
})
/*匹配*/
$('.matching').click(function(){
	$('#tbody').html('')
	$(".cartype,.underpan,.year,.carname,.engine").html('')
	$('.this').removeClass('this')
	$('.meng').show()
	if(sessionStorage.getItem('match')==''){
		return false
	}
	var data=JSON.parse(sessionStorage.getItem('match'))
	$.each(data, function(key,value) {
		var td1=$("<td>").html(value.Manufacture)
		var td2=$("<td>").html(value.VehicleName)
		if(value.Engine_Code){
			var td3=$("<td>").html(value.Engine_Code)
		}else{
			var td3=$("<td>").html('所有')
		}
		// if(value.ChassisNumber){
		// 	var td4=$("<td>").html(value.ChassisNumber)
		// }else{
		// 	var td4=$("<td>").html('所有')
		// }
		if(value.Year_of_production){
			var td5=$("<td>").html(value.Year_of_production)
		}else{
			var td5=$("<td>").html('所有')	
		}
		if(value.Name_of_sales){
			var td6=$("<td>").html(value.Name_of_sales)
		}else{
			var td6=$("<td>").html('所有')
		}
		var td7 = $("<td class='shanchu'>").html('<a style="text-decoration:none;color:#e02a41;" class="ml-5" href="javascript:;" title="删除" onclick="shanchu(this)"><i class="Hui-iconfont">&#xe6e2;</i></a>');
		var tr=$('<tr>')
		td1.appendTo(tr)
		td2.appendTo(tr)
		td3.appendTo(tr)
		// td4.appendTo(tr)
		td5.appendTo(tr)
		td6.appendTo(tr)
		td7.appendTo(tr)
		tr.appendTo('#tbody')		
	});	
})
$(".shut").click(function(){
	$('.meng').hide()
})
$(".meng").click(function(e){
	stopPropagation(e)
	$('.meng').hide()
})
$('.tankuang').click(function(e){
	stopPropagation(e)
})
///*匹配列表中删除*/
function shanchu(th){
	matcharr.splice($(th).parents('tr').index(),1)
	$(th).parents('tr').remove()
	sessionStorage.setItem('match',JSON.stringify(matcharr))	
}
/*一键匹配*/
$('.match').click(function(){
	var data=sessionStorage.getItem('match')
	$('#loading').show()
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/QueryProduct3",
		data:{
			'car':data
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			if(data.list==[]||data.list.length==0){
				$('#loading').hide()
				swal("暂无车型!", "", "error");			
				return false
			}
			var arr = [],      /*如果有相同的值则跳过，不相同则push进数组*/
			len = data.list.length;
			for(i = 0; i < len; i++){
				for(j = i + 1; j < len; j++){
					 if(data.list[i].mikey == data.list[j].mikey){
						j = ++i;
					 }
				}
				arr.push(data.list[i]);
			}
			var oemk=[];
			$.each(arr, function(key,value) {
				oemk.push({
					'mikey':value.mikey,
					'category_id':category_id,
					'oenumber':'',
					'product_id':id,
					'img':'',
					'brand_id':username_id
				})	
			});
			$.ajax({
				type:"post",
				url:network+"/MattrioEcModel/original_oe/insertbindingoe",
				data:{
					'oemk':	JSON.stringify(oemk)		
				},
				success:function(data){
					$('#loading').hide()					
					swal("匹配成功", "", "success");
					$('.confirm').click(function(){
					    window.location.href='../upload-matching.html?pages='+pages
					})
				},error:function(){
					swal("请求失败!", "", "error")
				}
			})		
			
		},error:function(){
			swal("匹配失败", "请重新进行匹配", "error")
		}
	});
})
/*清空*/
function datadel(){
	$('#tbody').html('')
	$('.rem').parents('p').append(add)
	$('.rem').remove()
	matcharr=[]
	sessionStorage.setItem('match','')	
}
/*OE查询*/
var oelist=''
$('#btnsubmit').click(function(){
	$(".oetabwrap .car,.oetabwrap .cartype,.oetabwrap .year,.oetabwrap .carname").html('')
	var matchingoe=sessionStorage.getItem('matchoe')
	var oeinp=$(".oe").val()
	if(oeinp==''||oeinp.length==0){
		swal("请输入OE号码!", "", "error");
		return false;
	}
	$('#loading').show()
	$.ajax({
		type:"post",
		url:"https://www.51macc.com/api/Mattrio/ProductInterface/getOeCars",
		data:{
			'oenumber':oeinp,
			'userid':'e8324d9d-b480-4467-8feb-30f22ba0ac71'
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$('#loading').hide()
			if(data.list==[]||data.list.length==0){
				swal("暂无数据!", "", "error");
				return false
			}
			oelist=data.list;
			$.each(data.list, function(key,value) {			
				if($('.oetabwrap .car').text().indexOf(value.Manufacture_CN)<0){
					var car=value.Manufacture_CN
					var num=0;
					var nums=0;
					$.each(oelist, function(k,val){
						if(car==val.Manufacture_CN)
							num++					
					});
					var jsonstr=JSON.stringify({'Manufacture':car,'VehicleName':value.Vehicle_Name_CN,'Engine_Code':'','ChassisNumber':'','Year_of_production':value.Vehicle_of_year,'Name_of_sales':value.Name_of_sales,'oe':true})
					if(matchingoe!==''&&matchingoe.length!=0){
						$.each(JSON.parse(matchingoe), function(k,val) {
							if(matchingoe.indexOf(jsonstr)>0){
								nums++
							}					
						});
					}
					if(nums==num){
						var p1=$("<p title="+value.Manufacture_CN+">").html(value.Manufacture_CN+rem)
					}else{
						var p1=$("<p title="+value.Manufacture_CN+">").html(value.Manufacture_CN+add)
					}	
					p1.appendTo('.oetabwrap .car')

				}
			});
					
		},error:function(){
			$("#loading").hide()
			swal("请求失败!", "", "error");
		}
	});
})
/*OE主机厂点击*/
$('.oetabwrap .car').on('click','p',function(){
	var matchingoe=sessionStorage.getItem('matchoe')
	$(this).addClass('this')
	$(this).siblings().removeClass('this')	
	$('.oetabwrap .cartype').html('')
	$('.oetabwrap .year').html('')
	$('.oetabwrap .carname').html('')
	var thistext=$(this).text()
	$.each(oelist, function(key,value) {	
		if(thistext==value.Manufacture_CN){
			if($('.oetabwrap .cartype').text().indexOf(value.Vehicle_Name_CN)<0){
				var cartype=value.Vehicle_Name_CN
				var num=0;
				var nums=0;
				$.each(oelist, function(k,val){
					if(cartype==val.Vehicle_Name_CN)
						num++					
				});
				var jsonstr=JSON.stringify({'Manufacture':thistext,'VehicleName':value.Vehicle_Name_CN,'Engine_Code':'','ChassisNumber':'','Year_of_production':value.Vehicle_of_year,'Name_of_sales':value.Name_of_sales,'oe':true})
				if(matchingoe!==''&&matchingoe.length!=0){
					$.each(JSON.parse(matchingoe), function(k,val) {
						if(matchingoe.indexOf(jsonstr)>0){
							nums++
						}					
					});
				}
				if(nums==num){
					var p1=$("<p title="+value.Vehicle_Name_CN+">").html(value.Vehicle_Name_CN+rem)	
				}else{
					var p1=$("<p title="+value.Vehicle_Name_CN+">").html(value.Vehicle_Name_CN+add)				
				}	
				p1.appendTo('.oetabwrap .cartype')	
			}
		}
	})
	if($(this).find('a').length==0||$(this).find('a').prop('class')=='ml-5 delthis rem'){
		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	}
})
/*OE车型点击*/
$('.oetabwrap .cartype').on('click','p',function(){
	var matchingoe=sessionStorage.getItem('matchoe')
	$(this).addClass('this')
	$(this).siblings().removeClass('this')	
	$('.oetabwrap .year').html('')
	$('.oetabwrap .carname').html('')
	var thiscar=$(".oetabwrap .car .this").text()
	var thistext=$(this).text()
	var yeararr=[]
	$.each(oelist, function(key,value) {			
		if(thiscar==value.Manufacture_CN&&thistext==value.Vehicle_Name_CN){
			if(yeararr.indexOf(value.Vehicle_of_year)<0){	
				var year=value.Vehicle_of_year
				var num=0;
				var nums=0;
				$.each(oelist, function(k,val){
					if(year==val.Vehicle_of_year)
						num++					
				});
				var jsonstr=JSON.stringify({'Manufacture':thiscar,'VehicleName':thistext,'Engine_Code':'','ChassisNumber':'','Year_of_production':value.Vehicle_of_year,'Name_of_sales':value.Name_of_sales})	
				if(matchingoe!==''&&matchingoe.length!=0){
					$.each(JSON.parse(matchingoe), function(k,val) {
						if(matchingoe.indexOf(jsonstr)>0){
							nums++
						}					
					});
				}				
				if(nums==num){
					yeararr.push({
						'year':value.Vehicle_of_year,
						'a':rem
					})
				}else{
					yeararr.push({
						'year':value.Vehicle_of_year,
						'a':add
					})		
				}		
			}	
		}
	})
	yeararr.sort(fun)
	function fun(a,b){
		return b.year-a.year
	}
	$.each(yeararr, function(key,value) {
		if($('.oetabwrap .year').text().indexOf(value.year)<0){
			var p1=$("<p title="+value.year+">").html(value.year+value.a)
			p1.appendTo('.oetabwrap .year')	
		}	
	});
	if($(this).find('a').length==0||$(this).find('a').prop('class')=='ml-5 delthis rem'){
		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	}
})
/*OE年份点击*/
$('.oetabwrap .year').on('click','p',function(){
	var matchingoe=sessionStorage.getItem('matchoe')
	$(this).addClass('this')
	$(this).siblings().removeClass('this')	
	$('.oetabwrap .carname').html('')
	var thiscar=$(".oetabwrap .car .this").text()
	var thiscartype=$(".oetabwrap .cartype .this").text()
	var thistext=$(this).text()
	$.each(oelist, function(key,value) {			
		if(thiscar==value.Manufacture_CN&&thiscartype==value.Vehicle_Name_CN&&thistext==value.Vehicle_of_year){
			if($('.oetabwrap .carname').text().indexOf(value.Name_of_sales)<0){
				var jsonstr=JSON.stringify({'Manufacture':thiscar,'VehicleName':thiscartype,'Engine_Code':'','ChassisNumber':'','Year_of_production':thistext,'Name_of_sales':value.Name_of_sales})
				if(matchingoe.indexOf(jsonstr)<0){
					var p1=$("<p title="+value.Name_of_sales+">").html(value.Name_of_sales+add)
				}else{
					var p1=$("<p title="+value.Name_of_sales+">").html(value.Name_of_sales+rem)
				}
				p1.appendTo('.oetabwrap .carname')	
			}
		}
	})
	if($(this).find('a').length==0||$(this).find('a').prop('class')=='ml-5 delthis rem'){
		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	}
})
var oelist=[]
/*OE车型添加*/
$('.oetabwrap').on('click','.add',function(e){
	stopPropagation(e)
	var title=$(this).parents('.cartab').find('.tit').text()
	$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
	$(this).parents('p').addClass('this').siblings('p').removeClass('this')
	$(this).parents('p').append(rem)
	var x=$(this).offset().left
	var y=$(this).offset().top
	var X1=$('.matching').offset().left+30
	var Y1=$('.matching').offset().top	
	var div=$('<div class="div">')
		div.css({
			'left':x+'px',
			'top':y+'px'
		})
		div.appendTo('.wrap')		
		$('.div').animate({
			'left':X1+'px',
			'top':Y1+'px'
		},500,function(){
			$('.div').remove()
		})
	$(this).remove()
	var cartext=$(".oetabwrap .car").find('.this').text()
	var cartypetext=$(".oetabwrap .cartype").find('.this').text()
	var enginetext=''
	var underpantext=''
	var yeartext=$(".oetabwrap .year").find('.this').text()
	var carnametext=$(".oetabwrap .carname").find('.this').text()
//	if($(this).find('a').prop('class')=='ml-5 delthis rem'){
//		$(this).parents('.cartab').nextAll('.cartab').find('a').remove()
//	}
	if(title=='选择主机厂'){
		$.each(oelist,function(key,value){
			if(value.Manufacture_CN==cartext){
				var children={'Manufacture':value.Manufacture_CN,'VehicleName':value.Vehicle_Name_CN,'Engine_Code':'','ChassisNumber':'','Year_of_production':value.Vehicle_of_year,'Name_of_sales':value.Name_of_sales,'oe':true}
				if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
					matcharr.push(children)
					matchoearr.push(children)
				}
			}			
		})
	}else if(title=='选择车型'){
		$.each(oelist,function(key,value){
			if(value.Manufacture_CN==cartext&&value.Vehicle_Name_CN==cartypetext){
				var children={'Manufacture':value.Manufacture_CN,'VehicleName':value.Vehicle_Name_CN,'Engine_Code':'','ChassisNumber':'','Year_of_production':value.Vehicle_of_year,'Name_of_sales':value.Name_of_sales,'oe':true}
				if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
					matcharr.push(children)
					matchoearr.push(children)
				}
			}			
		})
	}else if(title=='选择年份'){
		$.each(oelist,function(key,value){
			if(value.Manufacture_CN==cartext&&value.Vehicle_Name_CN==cartypetext&&value.Vehicle_of_year==yeartext){
				var children={'Manufacture':value.Manufacture_CN,'VehicleName':value.Vehicle_Name_CN,'Engine_Code':'','ChassisNumber':'','Year_of_production':value.Vehicle_of_year,'Name_of_sales':value.Name_of_sales,'oe':true}
				if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
					matcharr.push(children)
					matchoearr.push(children)
				}
			}			
		})
	}else{
		var children={'Manufacture':cartext,'VehicleName':cartypetext,'Engine_Code':enginetext,'ChassisNumber':underpantext,'Year_of_production':yeartext,'Name_of_sales':carnametext,'oe':true}
		if(JSON.stringify(matcharr).indexOf(JSON.stringify(children))<0){
			matcharr.push(children)
			matchoearr.push(children)
		}
	}		
	sessionStorage.setItem('match',JSON.stringify(matcharr))
	sessionStorage.setItem('matchoe',JSON.stringify(matchoearr))
})
/*oe车型删除*/
$('.oetabwrap').on('click','.rem',function(){
	var title=$(this).parents('.cartab').find('.tit').text()
	var match=JSON.parse(sessionStorage.getItem('match'))
	var matchoe=JSON.parse(sessionStorage.getItem('matchoe'))
	$(this).parents('p').addClass('this').siblings('p').removeClass('this')
	$(this).parents('p').append(add)
	$(this).remove()
	if(title=='选择主机厂'){
		var cartext=$(".oetabwrap .car").find('.this').text()
		var cartypetext=''
		var enginetext=''
		var underpantext=''
		var yeartext=''
		var carnametext=''
		for(var i=0;i<matcharr.length;i++){
			if(matcharr[i].Manufacture==cartext&&matcharr[i].oe==true){
					matcharr.splice(i,1)
					i--
			}	
		}
		for(var i=0;i<matchoearr.length;i++){
			if(matchoearr[i].Manufacture==cartext&&matchoearr[i].oe==true){
					matchoearr.splice(i,1)
					i--
			}	
		}
	}else if(title=='选择车型'){
		var cartext=$(".oetabwrap .car").find('.this').text()
		var cartypetext=$(".oetabwrap .cartype").find('.this').text()
		var enginetext=''
		var underpantext=''
		var yeartext=''
		var carnametext=''
		for(var i=0;i<matcharr.length;i++){
			if(matcharr[i].Manufacture==cartext&&matcharr[i].VehicleName==cartypetext&&matcharr[i].oe==true){
					matcharr.splice(i,1)
					i--
			}	
		}
		for(var i=0;i<matchoearr.length;i++){
			if(matchoearr[i].Manufacture==cartext&&matchoearr[i].VehicleName==cartypetext&&matchoearr[i].oe==true){
					matchoearr.splice(i,1)
					i--
			}	
		}
	}else if(title=='选择年份'){
		var cartext=$(".oetabwrap .car").find('.this').text()
		var cartypetext=$(".oetabwrap  .cartype").find('.this').text()
		var enginetext=''
		var underpantext=''
		var yeartext=$(".oetabwrap  .year").find('.this').text()
		var carnametext=''
		for(var i=0;i<matcharr.length;i++){	
			if(matcharr[i].Manufacture==cartext&&matcharr[i].VehicleName==cartypetext&&matcharr[i].Year_of_production==yeartext&&matcharr[i].oe==true){
					matcharr.splice(i,1)
					i--
			}
		}
		for(var i=0;i<matchoearr.length;i++){
			if(matchoearr[i].Manufacture==cartext&&matchoearr[i].VehicleName==cartypetext&&matchoearr[i].Year_of_production==yeartext&&matchoearr[i].oe==true){
					matchoearr.splice(i,1)
					i--
			}	
		}
	}else{
		var cartext=$(".oetabwrap .car").find('.this').text()
		var cartypetext=$(".oetabwrap  .cartype").find('.this').text()
		var enginetext=''
		var underpantext=''
		var yeartext=$(".oetabwrap .year").find('.this').text()
		var carnametext=$(".oetabwrap  .carname").find('.this').text()
		for(var i=0;i<matcharr.length;i++){	
			if(matcharr[i].Manufacture==cartext&&matcharr[i].VehicleName==cartypetext&&matcharr[i].Engine_Code==''&&matcharr[i].ChassisNumber==''&&matcharr[i].Year_of_production==yeartext&&matcharr[i].Name_of_sales==carnametext&&matchoearr[i].oe==true){
					matcharr.splice(i,1)
					i--
			}
		}
		for(var i=0;i<matchoearr.length;i++){
			if(matchoearr[i].Manufacture==cartext&&matchoearr[i].VehicleName==cartypetext&&matchoearr[i].Engine_Code==''&&matchoearr[i].ChassisNumber==''&&matchoearr[i].Year_of_production==yeartext&&matchoearr[i].Name_of_sales==carnametext&&matchoearr[i].oe==true){
					matchoearr.splice(i,1)
					i--
			}	
		}
	}
	sessionStorage.setItem('match',JSON.stringify(matcharr))
	sessionStorage.setItem('matchoe',JSON.stringify(matchoearr))
})
$('.oe').on('input',function(){
	var inpval=$('.oe').val()
	$.ajax({
		type:"post",
		url:"https://www.51macc.com/api/Mattrio/OeInterface/LikeOeList",
		cache: false,
		crossDomain: true == !(document.all),
		data:{
			'oe_number':inpval,
			'userid':'e8324d9d-b480-4467-8feb-30f22ba0ac71'
		},
		success:function(data){
			$('.listwrap').html('')
			$('.listwrap').removeClass('active')
			if(data.list==[]||data.list.length==0){
				$('.listwrap').addClass('active')
				return false
			}
			$.each(data.list,function(key,value){
				var str1=value.oe_number.substring(0,value.oe_number.indexOf(inpval.toUpperCase()))
				var str3=value.oe_number.substring(value.oe_number.indexOf(inpval.toUpperCase())+inpval.length)
				var p=$('<p title='+value.oe_number+'>').html(str1+'<span style="color:red;">'+inpval.toUpperCase()+'</span>'+str3).appendTo('.listwrap')				
			})
			
		},error:function(){
			
		}
	});
})
$('.listwrap').on('click','p',function(e){
	stopPropagation(e)
	$('.oe').val($(this).text())
	$('.listwrap').addClass('active')	
})


//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 