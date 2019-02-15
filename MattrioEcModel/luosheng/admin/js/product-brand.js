if(!sessionStorage.getItem("user")){
	window.location.href = "./login.html";
}
var network = localStorage.getItem("networkmodel");
//var network = 'http://192.168.125.131:8080'
var username_id = localStorage.getItem("username_id");
//获取总条数

$(".warting").removeClass("active");

function del(postion,pageindex,Manufacture_CN,oenumber){
    if ($('.current').text()==1||$('tbody tr').length>1){
        var page=$('.current').text();
    } else{
        var page=$('.current').text()-1;
    }
	var arr=JSON.stringify([{'postion':postion}]);
	 swal({
			title: "您确定要删除吗？", 
			text: "您确定要删除这条数据？", 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要删除",
			confirmButtonColor: "#ec6c62"
			}, function() {
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/Auditdatamanagement/deleteproduct",
					data:{
						"brand_id":username_id,
						"postion":arr
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("tbody").html("");
                        btnSubmit(page)
						swal("操作成功!", "已成功删除数据！", "success");
					},
					error:function(data){
						// console.log(data)
						swal("OMG", "删除操作失败了!", "error");
					}
				})	
			});
}
var content;
$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/original_oe/selectcategory",
	data:{
		'brand_id':username_id
	},
	timeout:5000,
	async:false,
	cache:false,
	crossDomain: true == !(document.all),
	success:function(data){
		content=data.list
		$.each(data.list,function(key,value){
			var option = $("<option>").html(value.category_name);
			option.appendTo(".selectname0");
		})
	},error:function(){
		swal("获取一级分类失败!", "", "error");
	}	
});
$(".selectname0").change(function(){
	$('.selectname1').html('')
	var option = $("<option>").html('请选择二级分组');
		option.appendTo(".selectname1");
	if($(".selectname0").val()=='请选择一级分组'){
		return false
	}
	var id=''
	$.each(content,function(key,value) {
		if($(".selectname0").val()==value.category_name.replace(/\s+/g,"")){
			id=value.category_id
		}
	});
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':id
		},
		async:false,
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			$.each(data.list,function(key,value){
				var option = $("<option value="+value.category_id+">").html(value.category_name);
				option.appendTo(".selectname1");
			})
			
		},error:function(){
//			alert('获取二级分类失败')
		}
	});
})
$(".selectname1").change(function(e){
	stopPropagation(e)

	$(".selectname2").val("按条件搜索");
	$(".warting").addClass("active");
	$("tbody").html("");

	var Manufacture_CN = $("#arrcity").val();
	if($("#s3").html() == "请选择车型"){
		var Vehicle_Name_CN = "";
	}else{
		var Vehicle_Name_CN = $("#s3").html()
	}

	if($("#s1").html() == "请选择年款"){
		var LaunchEOPYear = "";
	}else{
		var LaunchEOPYear = $("#s1").html()
	}

	if($("#s4").html() == "请选择销售名称"){
		var Capacity = "";
	}else{
		var Capacity = $("#s4").html()
	}

	if($(".selectname1").val() == "请选择二级分组"){
		fn(1,Manufacture_CN,"",Vehicle_Name_CN,LaunchEOPYear,Capacity);
		return false;
	}
	fn(1,Manufacture_CN,'',Vehicle_Name_CN,LaunchEOPYear,Capacity,$(this).val());

})
$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/updatematch/insertoe_vague_product_id",
	data: {
		'brand_id': username_id,
	},
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		
	},error:function(){
			
	}
});
/*模糊查询*/
$('#inpsubmit').on('input',function(){
	var inpval=$.trim($('#inpsubmit').val())
	if (inpval!=''){
        $.ajax({
            type:"post",
            url:network+"/MattrioEcModel/updatematch/selectoe_vague_product_id",
            data:{
                'brand_id':username_id,
                'num':inpval
            },
            cache: false,
            crossDomain: true == !(document.all),
            success:function(data){
                $(".listwrap").html('')
                $('.listwrap').removeClass('active')
                if(data.List==[]||data.List.length==0){
                    $('.listwrap').addClass('active')
                    return false;
                }
                $.each(data.List, function(key,value){
                    var arr=value.oenumber_product_id.split(inpval.toUpperCase())
                    var p=$('<p>').html(arr[0]+'<span style="color:red;">'+inpval.toUpperCase()+'</span>'+arr[1]).appendTo('.listwrap')
                });
            },error:function(){

            }
        });
    }else{
        $('.listwrap').addClass('active')
        fn(1);
    }
})
$('.listwrap').on('click',' p',function(e){
	stopPropagation(e)
	$('#inpsubmit').val($(this).text())
	$('.listwrap').addClass('active')
})

$("#btnsubmit").click(function(e){
	stopPropagation(e)
    btnSubmit(1)
})
function btnSubmit(page){
    var Manufacture_CN = $("#arrcity").val();
    if($("#s3").html() == "请选择车型"){
        var Vehicle_Name_CN = "";
    }else{
        var Vehicle_Name_CN = $("#s3").html()
    }

    if($("#s1").html() == "请选择年款"){
        var LaunchEOPYear = "";
    }else{
        var LaunchEOPYear = $("#s1").html()
    }

    if($("#s4").html() == "请选择销售名称"){
        var Capacity = "";
    }else{
        var Capacity = $("#s4").html()
    }
    $(".warting").addClass("active");
    $("tbody").html("");
    $('.listwrap').addClass('active')
    if($(".selectname1").val() == "请选择二级分组"){
        fn(page,Manufacture_CN,$.trim($("#inpsubmit").val()),Vehicle_Name_CN,LaunchEOPYear,Capacity);
        return false;
    }
    fn(page,Manufacture_CN,$.trim($("#inpsubmit").val()),Vehicle_Name_CN,LaunchEOPYear,Capacity,$('.selectname1').val());
}

fn(1);
function fn(pageindex,Manufacture_CN,oenumber,Vehicle_Name_CN,LaunchEOPYear,Capacity,category_id){
	$('input[type="checkbox"]').prop('checked',false)
	$('.warting').removeClass('active')
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/Auditdatamanagement/getproductnumbercar",
		data:{
			"brand_id":username_id,
			"pageindex":pageindex,
			"Manufacture_CN":Manufacture_CN,
			"Vehicle_Name_CN":Vehicle_Name_CN,
			"Year_of_production":LaunchEOPYear,
			"Name_of_sales":Capacity,
			"oenumber_product_id":oenumber,
			"category_id":category_id,
			'find_name':'Manufacture_CN,Vehicle_Name_CN,Year_of_production,Name_of_sales,ChassisNumber,Engine_Code,Launch_month'
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$('.warting').addClass('active')
			$("tbody").html("");
			// console.log(data)
			if(data.list.length == 0 || data.list == []){
				// alert("暂无数据");
				$(".alltotal").html("0");
				$(".wartno").removeClass("active");
				$(".warting").addClass('active')
				$(".zxf_pagediv").addClass("active");
			}else{
				$(".warting").addClass("active");
				$(".wartno").addClass("active");
				$(".zxf_pagediv").removeClass("active");
				$(".alltotal").html(data.listsize);
				$.each(data.list,function(key,value){
					var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
					var td2 = $("<td>").html(value.postion);
//					var td3 = $("<td>").html(value.oenumber);
					var td4 = $("<td>").html(value.product_id);
					var td7 = $("<td>").html(value.Vehicle_Name_CN);
					var td13 = $("<td>").html(value.Year_of_production);
					var td6 = $("<td>").html(value.Manufacture_CN);
					var td5 = $("<td>").html(value.category_name);
					var td8 = $("<td>").html(value.Name_of_sales);
					var td9 = $("<td>").html(value.ChassisNumber);
//					var td9 = $("<td>").html(value.Launch_year);
					var td10 = $("<td>").html(value.Engine_Code);
					var td11 = $("<td>").html(value.Launch_month);
//					var td10 = $("<td>").html(value.EOP_Year);
// 					var td12 = $("<td>").html('<a style="text-decoration:none" href="javascript:;" title="编辑" class="endior"><i class="Hui-iconfont">&#xe6df;</i></a>');
					var td14=$('<td>').html('<a style="text-decoration:none;color: #e02a41;" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>')
					var tr = $("<tr class='text-c'>");
					td1.appendTo(tr);
					td2.appendTo(tr);
//					td3.appendTo(tr);
					td4.appendTo(tr);
					td5.appendTo(tr);
					td6.appendTo(tr);
					td7.appendTo(tr);
					td13.appendTo(tr);
					td8.appendTo(tr);
					td9.appendTo(tr);
					td10.appendTo(tr);
					td11.appendTo(tr);
					// td12.appendTo(tr);
					td14.appendTo(tr);
					$(tr).appendTo("tbody");
				})
				$(".delthis").click(function(e){
					stopPropagation(e)
					var postion = $(this).parents("td").parents("tr").children().eq(1).html();
					del(postion,pageindex,Manufacture_CN);
				})

				$(".endior").click(function(e){
					stopPropagation(e)
					var number = $(this).parents("td").parents("tr").index();
					window.location.href =  "product-add.html?postion="+data.list[number].postion+"&short_mikey="+data.list[number].mikey+"&category_id="+data.list[number].category_id+"&oenumber="+data.list[number].oenumber+"&product_id="+data.list[number].product_id+"&category_name="+data.list[number].category_name;
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
							url:network+"/MattrioEcModel/Auditdatamanagement/getproductnumbercar",
							data:{
								"brand_id":username_id,
								"pageindex":pageindex,
								"Manufacture_CN":Manufacture_CN,
								"oenumber_product_id":oenumber,
								"Vehicle_Name_CN":Vehicle_Name_CN,
								"Year_of_production":LaunchEOPYear,
								"Name_of_sales":Capacity,
								"category_id":category_id,
								'find_name':'Manufacture_CN,Vehicle_Name_CN,Year_of_production,Name_of_sales,ChassisNumber,Engine_Code,Launch_month'
							},
							dataType:"json",
							cache: false,
							crossDomain: true == !(document.all),
							success:function(data){
								// console.log(data);
								$(".warting").addClass("active");
								$.each(data.list,function(key,value){
									var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
									var td2 = $("<td>").html(value.postion);
				//					var td3 = $("<td>").html(value.oenumber);
									var td4 = $("<td>").html(value.product_id);
									var td7 = $("<td>").html(value.Vehicle_Name_CN);
									var td13 = $("<td>").html(value.Year_of_production);
									var td6 = $("<td>").html(value.Manufacture_CN);
									var td5 = $("<td>").html(value.category_name);
									var td8 = $("<td>").html(value.Name_of_sales);
									var td9 = $("<td>").html(value.ChassisNumber);
				//					var td9 = $("<td>").html(value.Launch_year);
									var td10 = $("<td>").html(value.Engine_Code);
									var td11 = $("<td>").html(value.Launch_month);
				//					var td10 = $("<td>").html(value.EOP_Year);
				// 					var td12 = $("<td>").html('<a style="text-decoration:none" href="javascript:;" title="编辑" class="endior"><i class="Hui-iconfont">&#xe6df;</i></a>');
									var td14=$('<td>').html('<a style="text-decoration:none;color: #e02a41;" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>')
									var tr = $("<tr class='text-c'>");
									td1.appendTo(tr);
									td2.appendTo(tr);
				//					td3.appendTo(tr);
									td4.appendTo(tr);
									td5.appendTo(tr);
									td6.appendTo(tr);
									td7.appendTo(tr);
									td13.appendTo(tr);
									td8.appendTo(tr);
									td9.appendTo(tr);
									td10.appendTo(tr);
									td11.appendTo(tr);
									// td12.appendTo(tr);
									td14.appendTo(tr);
									$(tr).appendTo("tbody");
								})
								$(".delthis").click(function(e){
									stopPropagation(e)
									var postion = $(this).parents("td").parents("tr").children().eq(1).html();
									del(postion,pageindex,Manufacture_CN);
								})
								$(".endior").click(function(e){
									stopPropagation(e)
									var number = $(this).parents("td").parents("tr").index();
									// console.log(e);
									window.location.href =  "product-add.html?postion="+data.list[number].postion+"&short_mikey="+data.list[number].mikey+"&category_id="+data.list[number].category_id+"&oenumber="+data.list[number].oenumber+"&product_id="+data.list[number].product_id;
								})

							},
							error:function(data){
								swal("请求失败!", "", "error");
							}
						})
					}
				});
			}
		},
		error:function(data){
			swal("请求失败!", "", "error");
		}
	})
}

//按条件搜索

$.ajax({
	type:"post",
	url:"https://www.51macc.com/api/Mattrio/SelectCar/Manufacture",
	data:{
		'year':''
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		// console.log(data);
		data.all.sort(fun)
			function fun(a,b){
				return a[3].substr(0,1).localeCompare(b[3].substr(0,1))
				
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
//		swal("请求失败!", "", "error");
	}
})

$("#box").click(function(e){
	stopPropagation(e)
	$(".conts1").addClass('active');
	$(".conts3").addClass('active');
	$(".conts4").addClass('active');

	$("#s3").html("请选择车型");
	$("#s3").css("color","#999");
//	$("#s1").html("请选择年款");
//	$("#s1").css("color","#999");
	$("#s4").html("请选择销售名称");
	$("#s4").css("color","#999");
})

$("#s3").click(function(e){
	stopPropagation(e)
	var str =$("#arrcity").val();
	if(str==''){
		swal("请选择主机厂", "", "error");
		return false;
	}
	// console.log(str)
	$(".conts3").html("").removeClass('active');
	$(".conts4").addClass('active');
	$(".conts1").addClass('active');
	var year=$('#s1').text()
	if(year=='请选择年款'){
		year=''
	}
	$.ajax({
		type:"post",
		url:"https://www.51macc.com/api/Mattrio/SelectCar/VehicleName",
		data:{
			"Manufacture":encodeURI(str),
			'year':year
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
//			swal("请求失败!", "", "error");
		}
	})
});

$(document).on("click",".conts3 p",function(e){
	stopPropagation(e)
	$("#s3").html($(this).html());
	$(".conts3").addClass('active');
	$(".conts4").addClass('active');
	$(".conts1").addClass('active');
	$("#s3").css("color","#000");
//	$("#s1").html("请选择年款");
//	$("#s1").css("color","#999");
	$("#s4").html("请选择销售名称");
	$("#s4").css("color","#999");
})


//获取年份
$("#s1").click(function(e){
	stopPropagation(e)
	if($('#s3').text()==''){
		swal("请选择车型", "", "error");
		return false;
	}
	$('.conts1').html('')
	$("#loading").show();
	$(".conts4").addClass();
	$(".conts3").addClass('active');
	$(".conts1").removeClass('active');
	var carname=$("#s4").html()
	if(carname=='请选择销售名称'){
		carname=''
	}
	var Manufacture=$("#arrcity").val()
	var VehicleName=$("#s3").html()
	if(VehicleName=='请选择车型'){
		VehicleName=''	
	}
	if(carname==''&&Manufacture==''&&VehicleName==''){
		var str = ['请选择年款','2018','2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985'];
		$.each(str,function(key,value){
				$("<p>").html(value).appendTo($(".conts1"));
			})
		return false
	}
	$.ajax({
		type:"post",
		url:"https://www.51macc.com/api/Mattrio/SelectCar/Years",
		data:{
			"Manufacture":Manufacture,
			"VehicleName":VehicleName,
			'Nameofsales':carname
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){			
			$("#loading").hide();
			$(".conts1").html("").removeClass('active');
			data.sort(fun)
			function fun(a,b){
				return b.year-a.year
			}
				$.each(data,function(key,value){
					$("<p>").html(value.year).appendTo($(".conts1"));
				})
			
		},error:function(data){
//			swal("请求失败!", "", "error");
		}
	})
});
$(document).on("click",".conts1 p",function(e){
	stopPropagation(e)
	$(".conts1").addClass('active');
	$("#s1").html($(this).html());
	if($(this).html() == '请选择年款') {
		$("#s1").css("color", "#999");
	} else {
		$("#s1").css("color", "#000");
	}
	$.ajax({
		type:"post",
		url:"https://www.51macc.com/api/Mattrio/SelectCar/Manufacture",
		data:{
			'year':$(this).html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			data.all.sort(fun)
				function fun(a,b){
					return a[3].substr(0,1).localeCompare(b[3].substr(0,1))
					
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
	//		swal("请求失败!", "", "error");
		}
	})
});


$("#s4").click(function(e){
	stopPropagation(e)
	if($("#s3").text()=='请选择车型'){
		swal("请选择车型", "", "error");
		return false
	}
	$("#loading").show();
	$(".conts1").addClass('active');
	$(".conts3").addClass('active');
	$(".conts4").html("").removeClass('active');
	var car=encodeURI($("#arrcity").val())
	var year=$('#s1').text()
	if(year=='请选择年款'){
		year=''
	}
	$.ajax({
		type:"post",
		url:"https://www.51macc.com/api/Mattrio/SelectCar/Nameofsales",
		data:{
			"year":year,
			"Manufacture":encodeURI($("#arrcity").val()),
			"VehicleName":$("#s3").html()
		},
		dataType: "json",
        cache: false,
        crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			$.each(data,function(key,value){
				//console.log(value);
				$("<p>").html(value.Name_of_sales).appendTo($(".conts4"));
			})
		},error:function(data){
//			swal("请求失败!", "", "error");
		}
	})
});

$(document).on("click",".conts4 p",function(e){
	stopPropagation(e)
	$(".conts4").addClass('active');
	$("#s4").html($(this).html());
	$("#s4").css("color", "#000");
});

$(".btnyear").click(function(e){
	stopPropagation(e)
	$(".selectname1").val("请选择二级分组");
	$(".selectname2").val("按条件搜索");
	$("#inpsubmit").val("");
	var cartype=$("#s3").html()
	if(cartype == "请选择车型"){
		cartype=''
	};
	var year=$("#s1").html()
	if(year == "请选择年款"){
		year=''
	};
	var carname=$("#s4").html()
	if(carname == "请选择销售名称"){
		carname=''
	};
		$("tbody").html("");
		fn(1,$("#arrcity").val(),"",cartype,year,carname);

})

$(document).click(function(e){
	stopPropagation(e)
	$('.conts3').addClass('active')
	$(".conts4").addClass('active')
	$(".conts1").addClass('active')
	$('.listwrap').addClass('active')
})

//批量删除
function datadel(){
	var id_array=new Array();  
	$('input[name="id"]:checked').each(function(){
	    id_array.push({'postion':$(this).parent("td").parent("tr").children().eq(1).html()});//向数组中添加元素  
	}); 
	if(id_array==[]||id_array.length==0){
		swal("请勾选后在删除!", "", "error");
		return false;
	}
    if ($('.current').text()==1||$('input[name="id"]:checked').length<$('tbody tr').length){
        var page=$('.current').text();
    } else{
        var page=$('.current').text()-1;
    }
	swal({
			title: "您确定要删除吗？", 
			text: "您确定要批量删除数据？", 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要删除",
			confirmButtonColor: "#ec6c62"
			}, function() {
				$.ajax({
					type:"post",
					url:network+"/MattrioEcModel/Auditdatamanagement/deleteproduct",
					data:{
						"brand_id":username_id,
						"postion":JSON.stringify(id_array)
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("tbody").html("");
                        btnSubmit(page)
						swal("操作成功!", "已成功删除数据！", "success");
					},
					error:function(data){
						swal("OMG", "删除操作失败了!", "error");
					}
				})
			});

}
//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 