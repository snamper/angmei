if(!sessionStorage.getItem("user")){
			window.location.href = "./login.html";
		}
var network = localStorage.getItem("networkmodel");
//network='http://192.168.125.131:8080'
var username_id = localStorage.getItem("username_id");
/*柱状图*/
//function(params){
//      	return params[0].marker+'{a}<br/>{b}:{c}%'
//      }
//'{a}<br/>{b}:{c}%'
$('.year').hide()
/*获取总共的*/
$(window).show(function(){
	$("#all").width($('#all').width())
})
var all = echarts.init(document.getElementById('all'));
all.showLoading({
	text : '正在努力的读取数据中...',
});
$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/coveragerate/carManufacture_CN",
	data:{
		'brand_id':username_id
	},
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		var num=data.suncount
			var pieall = {
				title: {
					text: '产品覆盖率',
					subtext: '',
					x: 'center',
					subtextStyle:{
						color:'#c92327',
						fontSize:14						
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						return "总共"+num+"个<br/>"+params.marker + params.name+':'+params.data.value+"个，占"+(params.data.value/num*100).toFixed(2)+'%'
					}
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: ['未覆盖','已覆盖']
				},
				series: [{
					type: 'pie',
					name: '占比率',
					radius: '75%',
					center: ['50%', '55%'],
					selected: true,
					data: [{
							value: data.suncount-data.covercount,
							name: '未覆盖'
						},
						{
							value: data.covercount,
							name: '已覆盖'
						}
					],
					label: {
		                show: true,
		                position: 'inside',
		                formatter: '{b}{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
		           },
				}],
//				color: ['#eeb147', '#64b3ee']
			}
			all.hideLoading();
			all.setOption(pieall);
	},error:function(){
	}
});
/*获取数量*/
$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/coveragerate/categorymatching",
	data:{
		'brand_id':username_id
	},
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$('.span1').html(data.uploading_mikey)	
		$('.span2').html(data.original_oe_third)	
		$('.span3').html(data.Matched)	
	},error:function(){
		swal("获取匹配,审核数量失败!", "", "error");
	}
});
/*一级目录*/
$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/original_oe/selectcategory",
	data:{
		'brand_id':username_id
	},
	async:false,
	cache:false,
	crossDomain: true == !(document.all),
	success:function(data){
		$(".list1").html('')
		onearr=data.list		
		$.each(data.list,function(key,value){
			var p=$("<p id="+value.category_id+">").html(value.category_name)
			p.appendTo('.list1')
		})
	},error:function(){
		swal("获取一级分类失败!", "", "error");
	}
});
$('.one').click(function(e){
	stopPropagation(e)
	$('.list1').show()
})
/*二级目录*/
$(document).on('click','.list1 p',function(e){
	stopPropagation(e)
	$('.one').find('img').hide()
	$('.p1').text($(this).text())
	$('.p1').prop('id',$(this).prop('id'))
	$('.list1').hide()
	twolist()
	
})
$(document).on('click','.two',function(e){
	stopPropagation(e)	
	if($('.p1').prop('id')==''){
		swal("请选择一级目录!", "", "error");
		return false
	}
	twolist()
})
$(document).on('click','.list2 p',function(e){
	stopPropagation(e)
	$('.two').find('img').hide()
	$('.p2').text($(this).text())
	$('.p2').prop('id',$(this).prop('id'))
	$('.list2').hide()
})
function twolist(){
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':$('.p1').prop('id')
		},
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			$('.list2').html('')
			$('.p2').text('请选择二级分类')
			$('.two').find('img').show()
			$.each(data.list, function(key,value) {
				var p=$('<p id='+value.category_id+'>').html(value.category_name)
				p.appendTo('.list2')			
			});
			$('.list2').show()			
		},error:function(){
			swal("获取二级分类失败!", "", "error");
		}
	});
}
/*主机厂*/
var carlist;
$('.car').click(function(e){
	stopPropagation(e)
	$("input").val('')
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/getManufacture",
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			$.each(data.list,function(key,value){
					value.szm=makePy(value.Manufacture_CN)[0].toLowerCase()
					value.pinyin=ConvertPinyin(value.Manufacture_CN)
			})
			data.list= data.list.sort (function(item1,item2){
				return item1.szm[0].localeCompare(item2.szm[0])
			})
			carlist=data.list		
			var title=$("<div style='color:red;padding-left:5px;'>").html('可拼音搜索如:bm(宝马)')				
			title.appendTo('.list3')
			$.each(data.list,function(key,value){
				var p=$('<p>').html(value.Manufacture_CN)
				p.appendTo('.list3')			
			})
			$('.list3').show()			
		},error:function(){
			swal("请求失败!", "", "error");
		}
	});
})
/*车型手动输入*/
$("input").on('input',function(){
	var val=$(this).val().toLowerCase()
//	console.log(val)
	$('.list3-2').html('')
	if(val!=''&&val.length!=0){
		$.each(carlist, function(key,value) {
			if(JSON.stringify(value).indexOf(val)>0){
				var caroption=$("<p>").html(value.Manufacture_CN)				
				caroption.appendTo('.list3-2')	
			}
		});	
		$(".list3").hide()
		$(".list3-2").show()
	}else{
		$(".list3").show()
		$(".list3-2").hide()
	}
})
$(document).on('click','.list3 p,.list3-2 p',function(e){
	stopPropagation(e)
	$('.car').find('img').hide()
	$("input").val($(this).text())
	$('.list3').hide()
	$('.list3-2').hide()
})
$('.analyze').click(function(){
	if($('.p1').text()=='请选择一级分类'){
		swal("请选择一级分类!", "", "error");
		return false;
	}else if($('.p2').text()=='请选择二级分类'){
		swal("请选择二级分类!", "", "error");
		return false;
	}else if($('.carinp').val()=='中文/拼音'||$('.carinp').val()==''){
		swal("请选择主机厂!", "", "error");
		return false;
	}
	var category=$('.p2').text()
	var category_id=$('.p2').prop('id')
	var inpval=$('.carinp').val()
	var pieall,pie,year;
	pieall = echarts.init(document.getElementById('pieall'));
	pieall.showLoading({
		text : '正在努力的读取数据中...',
	});
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/coveragerate/carcoveragerate2",
		data:{
			'brand_id':username_id,
			'Manufacture_CN':inpval,
			'category_id':category_id
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$('.back').hide()
			$('.year').hide()
			$('.piewrap').show()
			$('.tbody1').html('')
			$('.zxf_pagediv').hide()
			var num=data.size
			/*饼状图*/
			var pieoptionall = {
				title: {
					text: inpval+'覆盖率',
					subtext: category,
					x: 'center',
					subtextStyle:{
						color:'#c92327',
						fontSize:14						
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						return "总共"+num+"个<br/>"+params.marker + params.name+':'+params.data.value+"个，占"+(params.data.value/num*100).toFixed(2)+'%'
					}
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: ['未覆盖数量','已覆盖数量']
				},
				series: [{
					type: 'pie',
					name: '占比率',
					radius: '60%',
					center: ['50%', '50%'],
					selected: true,
					data: [{
							value: data.count,
							name: '未覆盖数量'
						},
						{
							value: data.size-data.count,
							name: '已覆盖数量'
						}
					],
					label: {
		                show: true,
		                position: 'inside',
		                formatter: '{b}{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
		           },
				}],
				color: ['#eeb147', '#64b3ee']
			}
			pieall.hideLoading()
			pieall.setOption(pieoptionall);
		},error:function(){
			swal("请求失败!", "", "error");
		}
	});
	pie = echarts.init(document.getElementById('pie'));
	pie.showLoading({
		text : '正在努力的读取数据中...',
	});
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/coveragerate/carcoveragerate1",
		data:{
			'brand_id':username_id,
			'Manufacture_CN':inpval,
			'category_id':category_id
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(dat){
			var piearr=[]
			var namearr=[]
			$.each(dat.list, function(key,val) {
				piearr.push({
					value:val.count,
					name:val.Vehicle_Name_CN
				})	
				namearr.push(val.Vehicle_Name_CN)
			});
			pie.off('click')
			var pieoption = {
				title: {
					text: inpval+'车型未覆盖数量 ',
					subtext: category,
					x: 'center',
					subtextStyle:{
						color:'#c92327',
						fontSize:14
					}
				},
				tooltip: {
					trigger: 'item',
					formatter:function(params){
						return '点击查看该车型详情'+"<br/>"+params.marker+params.data.name+':'+params.data.value+'个'
					}
				},
				legend: {
					type: 'scroll',
			        orient: 'vertical',
			        left:5,
			        top:0,
			        data: namearr,
			        formatter: function (params) {
						return (params.length > 14 ? (params.slice(0,14)+"...") : params ); 
					}

				},
				series: [{
					type: 'pie',
					name: '未覆盖车型数量',
					radius: '60%',
					center: ['55%', '50%'],				
					selected: true,
					label:{
						formatter:function(params){
							return (params.data.name.length > 14 ? (params.data.name.slice(0,14)+"...") : params.data.name );
						}
					},
					data: piearr
				}],
			}
			pie.hideLoading()
			pie.setOption(pieoption);
			/*年份*/
			pie.on('click',function(a){
				$('.back').show()
				$('.piewrap').hide()
				$('.year').show()
				var Vehicle_Name_CN=a.data.name;
				year = echarts.init(document.getElementById('year'));
				year.showLoading({
					text: '正在努力的读取数据中...',
				})
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/coveragerate/caryear",
					data:{
						'Manufacture_CN':inpval,
						'Vehicle_Name_CN':Vehicle_Name_CN,
						'category_id':category_id,
						'brand_id':username_id
					},
					cache: false,
					crossDomain: true == !(document.all),
					success:function(da){
						var yeararr=[]
						var namearr=[]
						$.each(da.list, function(key,val) {
							yeararr.push({
								value:val.Count,
								name:val.Year_of_production
							})	
							namearr.push(val.Year_of_production)
						});
						year.off('click')
						var yearpie = {
							title: {
								text: inpval+Vehicle_Name_CN+'未覆盖数量',
								subtext: category,
								x: 'center',
								subtextStyle:{
									color:'#c92327',
									fontSize:14
								}
							},
							tooltip: {
								trigger: 'item',
								formatter:function(params){
									return '点击查看详情'+params.marker+params.data.name+':'+params.data.value+'个'
								}
							},
							legend: {
								type: 'scroll',
						        orient: 'vertical',
						        left:5,
						        top:0,
						        data: namearr,						       
			
							},
							series: [{
								type: 'pie',
								name: '未覆盖车型数量',
								radius: '60%',
								center: ['55%', '50%'],				
								selected: true,
								data: yeararr
							}],
						}
						year.hideLoading()
						year.setOption(yearpie);
						year.on('click',function(a){
							$('.warting').removeClass('active')
							$.ajax({
								type:"post",
								url:network+"/MattrioEcModel/coveragerate/carNotcovered",
								data:{
									'Manufacture_CN':inpval,
									'Vehicle_Name_CN':Vehicle_Name_CN,
									'category_id':category_id,
									'Year_of_production':a.name,
									'brand_id':username_id
								},
								cache: false,
								crossDomain: true == !(document.all),
								success:function(d){
									$('.tbody1').html('')
									$('.warting').addClass('active')
									$('.alltotal').html(d.count)
									$.each(d.list, function(key,value) {
										if(key<10){
											fun(value)
										}										
									});
									$('.zxf_pagediv').show()
									$(".zxf_pagediv").createPage({
										pageNum: Math.ceil(d.count/10),//总页码
										current: 1,//当前页
										shownum: 10,//每页显示个数
										// activepage: "",//当前页选中样式
										activepaf: "",//下一页选中样式
										backfun: function(e){
											$('.tbody1').html('')
											var pageindex = e.current;
											if(pageindex*10>d.count){
												for(var i=(pageindex-1)*10;i<d.count;i++){
													fun(d.list[i])
												}
											}else{
												for(var i=(pageindex-1)*10;i<pageindex*10;i++){
													fun(d.list[i])
												}
											}
										}
									})
									
								},error:function(){
									
								}
							});
						})
					},error:function(){
						
					}
				});
			})
		},error:function(){
			swal("请求失败!", "", "error");
		}
	});
})	
$('.back').click(function(){
	$('.back').hide()
	$('.year').hide()
	$('.piewrap').show()
})
function fun(value){
//	var td1 = $('<td>').html(value.mikey)
	var td2 = $('<td>').html(value.Manufacture_CN)
	var td3 = $('<td>').html(value.Vehicle_Name_CN)
	var td4 = $('<td>').html(value.Year_of_production)
	var td5 = $('<td>').html(value.Name_of_sales)
	var td6 = $('<td>').html(value.Engine_Code)
	var td7 = $('<td>').html(value.ChassisNumber)
	var td8 = $('<td>').html(value.Drive_type)
	var tr = $('<tr>')
//	td1.appendTo(tr)
	td2.appendTo(tr)
	td3.appendTo(tr)
	td4.appendTo(tr)
	td5.appendTo(tr)
	td6.appendTo(tr)
	td7.appendTo(tr)
	td8.appendTo(tr)
	tr.appendTo('.tbody1')
}

$(document).click(function(e){
	stopPropagation(e)
	$('.list1').hide()
	$('.list2').hide()
	$('.list3').hide()
})
//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 