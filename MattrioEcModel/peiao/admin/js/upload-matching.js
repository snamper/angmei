if(!sessionStorage.getItem("user")){
			window.location.href = "./login.html";
		}
//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
var pages=getUrlParam('pages')
if(!pages){
    pages=1
}
$(".import").click(function() {
	$("#xlsxinput").click();
});
$('.img').click(function() {
	$('.meng').show();
});
$('.meng').click(function() {
	$(this).hide();
});
/*获取一级分类*/
var onearr=[];
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
		$(".list1").html('');
		onearr=data.list;
		fun('#tbody','#tbody2',"/MattrioEcModel/original_oe/selectcarno",pages);
	},error:function(){
		swal("获取一级分类失败!", "", "error");
	}	
});
$('.tabwrap button').click(function(){
	if($(this).text()=='未匹配列表'){
        $('.auditl').hide()
        $('#tbody2,#tbody3,.thead2').addClass('active')
        $('.inpwrap,.thinp,.matchingl,#addBtn,#OEnumber').show()
		$(this).addClass('tab');
		$(this).siblings('button').removeClass('tab');
		$('.importwrap,#tbody,.thead1').removeClass('active');
		fun('#tbody','#tbody2',"/MattrioEcModel/original_oe/selectcarno",1);
	}else if($(this).text()=='未审核列表'){
        $('#OEnumber,#addBtn,.inpwrap').hide()
        $(".importwrap,#tbody,#tbody2,.thead1").addClass('active')
        $("#tbody3,.thead2").removeClass('active')
        $(this).addClass('tab');
        $(this).siblings('button').removeClass('tab');
        $('.matchingl').hide();
        $('.auditl').show()
        tbody('/MattrioEcModel/original_oe/selectcar','.tbody1','',1)
    }else{
	    $('.inpwrap').show()
        $('.thinp,.matchingl,#addBtn,#OEnumber,.auditl').hide()
		$(this).addClass('tab');
		$(this).siblings('button').removeClass('tab');
		$('.importwrap,.thead2,#tbody3').addClass('active');
        $("#tbody2,.thead1").removeClass('active')
		fun('#tbody2','#tbody','/MattrioEcModel/Auditdatamanagement/selectlongmikeyoeproduct',1);
	}
});
function fun(tbodys,tbodyh,url,pages){
	$(tbodyh).addClass('active');
	$(tbodys).html('');
	$(tbodys).removeClass('active');
	$(".wartno").addClass('active');
	$('.warting').removeClass('active');
    var req;
    if(req !=null) req.abort();
    req =$.ajax({
		type:"post",
		url:network+url,
		data:{
			'brand_id':username_id,
			'pageindex':pages
		},
		crossDomain: true == !(document.all),
		success:function(data){
			$('#loading').hide();
			$(".alltotal").text(data.listsize);
			$('.warting').addClass('active');
			if(data.list.length==0||data.list==[]){
				$(".wartno").removeClass('active');
				$(".warting").addClass('active');
				$(".zxf_pagediv").addClass('active');
//				alert('暂无')
				return false;
			}
			$(".warting").addClass('active');
			$(".zxf_pagediv").removeClass('active');
			$.each(data.list,function(key,value){
				list(value,tbodys);
			});
			$(".zxf_pagediv").createPage({
					 pageNum: Math.ceil(data.listsize/10),//总页码
					  current: parseInt(pages),//当前页
				      backfun: function(e) {
				      	var pageindex = e.current;
				      	$(tbodys).html('');
				      	$('.warting').removeClass('active');
				      	if(req !=null) req.abort();
				      	req =$.ajax({
				      		type:"post",
				      		url:network+url,
							data:{
								'brand_id':username_id,
								'pageindex':pageindex
							},
							crossDomain: true == !(document.all),
							success:function(data){	
								$('.warting').addClass('active');
								$.each(data.list,function(key,value){
									list(value,tbodys);
								});
							},error:function(){
								swal("请求失败!", "", "error");
							}
				     	});
				      }
				})
		},error:function(){
			swal("请求失败!", "", "error");
		}
		
	});
}
function list(value,tbodys){
	var td0=$("<td>").html('<input name="id" type="checkbox" value="">');
	var td1=$("<td>").html(value.product_id);
	if(tbodys=='#tbody'){
		var td6=$("<td class='oe'>").html(value.oe_number);
	}else{
		var td6=$("<td class='oe'>").html(value.oenumber);
	}
	var td2;
	if(value.parent_id){
		$.each(onearr,function(k,val){
			if(val.category_id==value.parent_id){
				td2=$("<td>").html("<div class='sel select1'><p class='p1' id="+value.parent_id+">"+val.category_name+"</p></div><div class='list list1'></div>")
			}
		});
	}else{
		td2=$("<td>").html('<div class="sel select1"><p class="p1">请选择一级分类<img class="triangle" src="images/triangle.png"/></p></div><div class="list list1"></div>')
	}
	if(value.category_name){
		var td3=$("<td>").html('<div class="sel select2"><p class="p2" id='+value.category_id+'>'+value.category_name+'</p></div><div class="list list2"></div>')
	}else{
		var td3=$("<td>").html('<div class="sel select2"><p class="p2">请选择二级分类<img class="triangle" src="images/triangle.png"/></p></div><div class="list list2"></div>')
	}
	var td4=$("<td>").html('<span class="matching">车型匹配</span>');
	
	var td5=$("<td>").html('<a style="text-decoration:none;color:#e02a41;" class="ml-5 delthis1" href="javascript:;" title="删除"><i class="Hui-iconfont"></i></a>');
	var tr=$("<tr>");
    if(tbodys=='#tbody'){
        td0.appendTo(tr);
    }
	td1.appendTo(tr);
	td6.appendTo(tr);
	td2.appendTo(tr);
	td3.appendTo(tr);
	td4.appendTo(tr);
	if(tbodys=='#tbody'){
		td5.appendTo(tr);
	}
	tr.appendTo(tbodys);
}
/*一级分类*/
$(document).on('click','.select1',function(e){
	stopPropagation(e);
	var list1=$(this).siblings('.list1');
	list1.html('');
	$.each(onearr, function(key,value) {
		var p=$('<p id='+value.category_id+'>').html(value.category_name);
		p.appendTo(list1);
	});
	$('.list1').hide();
	list1.show();
});
$(document).on('click','.list1 p',function(e){
	stopPropagation(e);
	var that=$(this);
	that.parents('.list1').siblings('.select1').find('.p1').text($(this).text());
	that.parents('.list1').siblings('.select1').find('.p1').prop('id',$(this).prop('id'));
	$('.list1').hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':that.parents('.list1').siblings('.select1').find('.p1').prop('id')
		},
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			var list2=that.parents('td').siblings().find('.list2');
			list2.html('');
			$.each(data.list, function(key,value) {
				var p=$('<p id='+value.category_id+'>').html(value.category_name);
				p.appendTo(list2);
			});
			
		},error:function(){
//			alert('获取二级分类失败')
		}
	});
	$(this).parents('td').siblings().find('.list2').show()	
});
/*二级分类*/
$(document).on('click','.select2',function(e){
	stopPropagation(e);
	$(".list1").hide();
	var that=$(this);
	var onetext=that.parents('tr').find('.p1').text();
	if(onetext=='请选择一级分类'){
		swal("请选择一级分类!", "", "error");
		return false;
	}
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/selectcategory2",
		data:{
			'brand_id':username_id,
			'category_id':that.parents('tr').find('.p1').prop('id')
		},
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
			var list2=that.siblings('.list2');
			list2.html('');
			$.each(data.list, function(key,value) {
				var p=$('<p id='+value.category_id+'>').html(value.category_name);
				p.appendTo(list2);
			});
			
		},error:function(){
//			alert('获取二级分类失败')
		}
	});
//	$('.list2').hide()
	that.siblings('.list2').show()
});
$(document).on('click','.list2 p',function(e){
	stopPropagation(e);
	var that=$(this);
	that.parents('.list2').siblings('.select2').find('.p2').text($(this).text());
	that.parents('.list2').siblings('.select2').find('.p2').prop('id',$(this).prop('id'));
	$('.list2').hide();
	var id=that.parents('tr').find('td').eq(1).text();
	var two=that.parents('tr').find('.p2').prop('id');
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/original_oe/insertcategory",
		data:{
			'brand_id':username_id,
			'category_id':two,
			'product_id':id
		},
		cache:false,
		crossDomain: true == !(document.all),
		success:function(data){
					
		},error:function(){
//			alert('失败')	
		}
	});
});
$(document).on('click','.matching',function(){
	$('.list').hide();
    if ($('.tab').text()=='未匹配列表') {
        var id=$(this).parents('tr').find('td').eq(1).text();
    }else{
        var id=$(this).parents('tr').find('td').eq(0).text();
    }
	var one=$(this).parents('tr').find('.p1').text();
	var two=$(this).parents('tr').find('.p2').text();
	var cid=$(this).parents('tr').find('.p2').prop('id');
	if(one=='请选择一级分类'){
		swal("请选择一级分类!", "", "error");
		return false;
	}
	if(two=='请选择二级分类'){
		swal("请选择二级分类!", "", "error");
		return  false;
	}
	var oe=$(this).parents('tr').find('.oe').text();
	window.location.href='./matching/matching.html?id='+id+'&one='+encodeURIComponent(one)+'&two='+encodeURIComponent(two)+'&cid='+cid+'&oe='+oe+'&pages='+$('.current').text()
});
$(document).click(function(e){
	stopPropagation(e);
	$('.list').hide()
});
$(document).on('click','.delthis1',function(){
    if ($('.current').text()==1||$('#tbody tr').length>1){
        var page=$('.current').text();
    } else{
        var page=$('.current').text()-1;
    }
	var arr=[{
		'product_id':$(this).parents('tr').find('td').eq(1).text()
	}];
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
				url:network+"/MattrioEcModel/original_oe/deleteproduct_id",
				data:{
					'brand_id':username_id,
					'product_id':JSON.stringify(arr)
				},
				cache:false,
				crossDomain: true == !(document.all),
				success:function(data){
					fun('#tbody','#tbody2',"/MattrioEcModel/original_oe/selectcarno",page);
					swal("操作成功!", "已成功删除数据！", "success");
				},error:function(){
					swal("OMG", "删除操作失败了!", "error");
				}
			});
	});
});
$('#btnsubmit').click(function(){
	// console.log($("#inpsubmit").val())
	if($("#inpsubmit").val()==''||$("#inpsubmit").val().length==0){
		swal("请输入您要查询的内容!", "", "error");
		return false;
	}
	if($('.tab').text()=='未匹配列表'){
		search('#tbody','/MattrioEcModel/original_oe/querycarno')
	}else{
		search('#tbody2','/MattrioEcModel/Auditdatamanagement/querylongmikeyoeproduct')
	}	
});
$('#inpsubmit').on('input',function(){
	if($(this).val()==''||$(this).val().length==0){
		if($('.tab').text()=='未匹配列表'){
			fun('#tbody','#tbody2',"/MattrioEcModel/original_oe/selectcarno",$(".current").text())
		}else{
			fun('#tbody2','#tbody','/MattrioEcModel/Auditdatamanagement/selectlongmikeyoeproduct',$(".current").text())
		}	
	}
});
function search(tbody,url){
	$.ajax({
				type:"post",
				url:network+url,
				data:{
					'brand_id':username_id,
					'product_id':$("#inpsubmit").val()
				},
				cache:false,
				crossDomain: true == !(document.all),
				success:function(data){
					if(data.list==[]||data.list.length==0){
						swal("查询不到", "", "error");
						return false;
					}
					$(tbody).html('');
					list(data.list[0],tbody);
					$(".zxf_pagediv").addClass('active')
				},error:function(){
					
				}
			});
}
/*批量删除*/
function delall(){
	var arr=[];
		$('input[name="id"]:checked').each(function(){
		    arr.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
		});
	
		if(arr.length == 0 || arr == []){
			swal("OMG", "请选择您要删除的数据!", "error");
			return false;
		}
        if ($('.current').text()==1||$('input[name="id"]:checked').length<$('#tbody tr').length){
            var page=$('.current').text();
        } else{
            var page=$('.current').text()-1;
        }
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
				url:network+"/MattrioEcModel/original_oe/deleteproduct_id",
				data:{
					'brand_id':username_id,
					'product_id':JSON.stringify(arr)
				},
				cache:false,
				crossDomain: true == !(document.all),
				success:function(data){
					fun('#tbody','#tbody2',"/MattrioEcModel/original_oe/selectcarno",page);
					swal("操作成功!", "已成功删除数据！", "success");
				},error:function(){
					swal("OMG", "删除操作失败了!", "error");
				}
			});
	});
		
}
/*全部删除*/
function delalls(){
	if($('#tbody').html()==''){
		swal("无可删除的数据！", "", "error");
		return false;
	}
	swal({
			title: "您确定要删除吗？", 
			text: "您确定要全部删除数据？", 
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "是的，我要删除",
			confirmButtonColor: "#ec6c62"
			}, function() {
			$.ajax({
				type:"post",
				url:network+"/MattrioEcModel/original_oe/deleteAllproduct_id",
				data:{
					'brand_id':username_id
				},
				cache:false,
				crossDomain: true == !(document.all),
				success:function(data){
					swal("操作成功!", "已成功删除数据！", "success");
					fun('#tbody','#tbody2',"/MattrioEcModel/original_oe/selectcarno",$(".current").text())
				},error:function(){
					swal("OMG", "删除操作失败了!", "error");
				}
			});
	});
}
/*未审核列表*/

/*获取匹配的数据*/
function tbody(url,show,hide,page){
    $(hide).hide()
    $(show).html('')
    $(".wartno").addClass('active')
    $(".warting").removeClass('active')
    var req;
    if(req !=null) req.abort();
    req = $.ajax({
        type:"post",
        url:network+url,
        data:{
            'brand_id':username_id,
            'pageindex':page
        },
        cache: false,
        crossDomain: true == !(document.all),
        success:function(data){
            $(".warting").addClass('active')
            $(".alltotal").text(data.listsize)
            if(data.list==[]||data.list.length==0){
                $(".zxf_pagediv").addClass("active");
                $(".wartno").removeClass('active')
                return false;
            }
            $(show).show()
            $(".wartno").addClass('active')
            $.each(data.list,function(key,value){
                var a=new Date(value.time.time)
                var td13=$("<td>").html(value.postion)
                var td1=$("<td>").html(value.mikey)
                var td2=$("<td>").html(value.Manufacture_CN)
                var td3=$("<td>").html(value.Vehicle_Name_CN)
                var td4=$("<td>").html(value.Name_of_sales)
                var td5=$("<td>").html(value.ChassisNumber)
                var td6=$("<td class="+value.category_id+">").html(value.category_name)
                var td11=$("<td>").html(value.Engine_Code)
                var td12=$("<td>").html(value.Year_of_production)
                var td7=$("<td>").html(value.product_id)
                var tr=$("<tr class='text-c'>")
                td13.appendTo(tr)
                td1.appendTo(tr)
                td2.appendTo(tr)
                td3.appendTo(tr)
                td4.appendTo(tr)
                td12.appendTo(tr)
                td5.appendTo(tr)
                td11.appendTo(tr)
                td6.appendTo(tr)
                td7.appendTo(tr)
                $('.th').addClass("active")
                // $('.pass').parent('span').addClass('active')
                // $('.btn-danger').addClass('active')
                if(show=='.tbody1'){
                    $('.pass').parent('span').removeClass('active')
                    $('.btn-danger').removeClass('active')
                    $('.th').removeClass("active")
//							var td0 = $("<td>").html('<input name="id" type="checkbox" value="">');
                    var td8=$("<td>").html(a.toLocaleString())
                    var td9=$("<td>").html('<a style="text-decoration:none;color:#3dadf5;" onclick="pass(this)" href="javascript:;" title="审核">审核</a>')
                    var td10 = $("<td>").html('<a style="text-decoration:none;color:#e02a41;" class="ml-5 delthis2" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
//							td0.prependTo(tr)
                    td8.appendTo(tr)
                    td9.appendTo(tr)
                    td10.appendTo(tr)
                }
                tr.appendTo(show)
            })
            $(".zxf_pagediv").removeClass("active");
            $(".zxf_pagediv").createPage({
                pageNum: Math.ceil(data.listsize/10),//总页码
                current: parseInt(page),//当前页
                backfun: function(e) {
                    var pageindex = e.current;
                    if(req !=null) req.abort();
                    req =  $.ajax({
                        type:"post",
                        url:network+url,
                        data:{
                            'brand_id':username_id,
                            'pageindex':pageindex
                        },
                        cache: false,
                        crossDomain: true == !(document.all),
                        success:function(dat){
                            $(show).html('')
                            $(show).show()
                            $(".alltotal").text(data.listsize)
                            $('th').find('input').prop('checked',false)
                            $.each(dat.list,function(key,value){
                                var a=new Date(value.time.time)
//										var td0 = $("<td>").html('<input name="id" type="checkbox" value="">');
                                var td13 = $("<td>").html(value.postion);
                                var td1=$("<td>").html(value.mikey)
                                var td2=$("<td>").html(value.Manufacture_CN)
                                var td3=$("<td>").html(value.Vehicle_Name_CN)
                                var td4=$("<td>").html(value.Name_of_sales)
                                var td5=$("<td>").html(value.ChassisNumber)
                                var td6=$("<td class="+value.category_id+">").html(value.category_name)
                                var td11=$("<td>").html(value.Engine_Code)
                                var td12=$("<td>").html(value.Year_of_production)
                                var td7=$("<td>").html(value.product_id)
                                var tr=$("<tr class='text-c'>")
//										td0.appendTo(tr)
                                td13.appendTo(tr)
                                td1.appendTo(tr)
                                td2.appendTo(tr)
                                td3.appendTo(tr)
                                td4.appendTo(tr)
                                td12.appendTo(tr)
                                td5.appendTo(tr)
                                td11.appendTo(tr)
                                td6.appendTo(tr)
                                td7.appendTo(tr)
                                $('.th').addClass("active")
                                if(show=='.tbody1'){
                                    $('.th').removeClass("active")
                                    var td8=$("<td>").html(a.toLocaleString())
                                    var td9=$("<td>").html('<a style="text-decoration:none;color:#3dadf5;" onclick="pass(this)" href="javascript:;" title="审核">审核</a>')
                                    var td10 = $("<td>").html('<a style="text-decoration:none;color:#e02a41;" class="ml-5 delthis2" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
                                    td8.appendTo(tr)
                                    td9.appendTo(tr)
                                    td10.appendTo(tr)
                                }
                                tr.appendTo(show)
                            })
                        }
                    });
                }
            })
        },error:function(){
            $(".warting").addClass('active')
            swal("请求失败!", "", "error");
        }

    });
}
/*单个删除*/
$(document).on('click','.delthis2',function(){
    if($('.current').text()==1||$('tbody tr').length>1){
        var pageindex=$('.current').text();
    } else{
        var pageindex=$('.current').text()-1;
    }
    var postion=$(this).parents('tr').find('td').eq(0).text()
    swal({
        title: "您确定要删除吗？",
        text: "您确定要删除这条数据？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的，我要删除",
        confirmButtonColor: "#ec6c62"
    }, function() {
        var mikeyarr=[{
            'postion':postion
        }]
        $.ajax({
            type:"post",
            url:network+"/MattrioEcModel/updatematch/deleteproduct",
            data:{
                'postion':JSON.stringify(mikeyarr)
            },
            dataType:"json",
            cache: false,
            crossDomain: true == !(document.all),
            success:function(data){
                $('.tbody1').html('')
                $('th').find('input').prop('checked',false)
                swal("操作成功!", "已成功删除数据！", "success");
                $(".tab").eq(0).addClass('this').siblings('.tab').removeClass('this')
                tbody('/MattrioEcModel/original_oe/selectcar','.tbody1','.tbody2,.tbody3',pageindex)
            },
            error:function(data){
                swal("OMG", "删除操作失败了!", "error");
            }
        })
    });
})
/*全部删除*/
function del(){
    if($(".tbody1").html()==''||$(".tbody1").html().length==0){
        swal("无可删除的数据!", "", "error");
        return false;
    }
    swal({
        title: "您确定要删除吗？",
        text: "您确定要全部删除数据？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的，我要删除",
        confirmButtonColor: "#ec6c62"
    }, function() {
        $.ajax({
            type:"post",
            url:network+"/MattrioEcModel/updatematch/deleteoriginal_oe_third",
            data:{
                'brand_id':username_id,
            },
            crossDomain: true == !(document.all),
            success:function(data){
                var pageindex=$('.current').text()
                tbody('/MattrioEcModel/original_oe/selectcar','.tbody1','.tbody2,.tbody3',pageindex)
                swal("操作成功!", "已成功删除数据！", "success");
            },error:function(){
                swal("OMG", "删除操作失败了!", "error");
            }
        });
    });
}
/*单个审核通过*/
function pass(a){
    if ($('.current').text()==1||$('tbody tr').length>1){
        var pageindex=$('.current').text();
    } else{
        var pageindex=$('.current').text()-1;
    }
    var passarr=[];
    var postion=$(a).parents("tr").children().eq(0).html()
    passarr.push({
        'postion':postion
    })
    swal({
        title: "是否审核通过当前的数据？",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的，审核通过",
        confirmButtonColor: "#ec6c62"
    }, function() {
        $.ajax({
            type:"post",
            url:network+"/MattrioEcModel/updatematch/insertlongmikeyoeproduct",
            data:{
                'postion':JSON.stringify(passarr),
                'brand_id':username_id
            },
            dataType:"json",
            cache: false,
            crossDomain: true == !(document.all),
            success:function(data){
                $('th').find('input').prop('checked',false)
                tbody('/MattrioEcModel/original_oe/selectcar','.tbody1','.tbody2,.tbody3',pageindex)
                swal("操作成功!", "已审核通过！", "success");
            },error:function(){
                swal("OMG", "审核通过失败!", "error");
            }
        });
    });
}
/*全部审核痛过*/
function passall(){
    if($(".tbody1").html()==''||$(".tbody1").html().length==0){
        swal("无可审核的数据!", "", "error");
        return false;
    }
    swal({
        title: "是否全部审核通过？",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的，审核通过",
        confirmButtonColor: "#ec6c62"
    }, function() {
        $.ajax({
            type:"post",
            url:network+"/MattrioEcModel/updatematch/updateoriginal_oe_third",
            data:{
                'brand_id':username_id,
            },
            crossDomain: true == !(document.all),
            success:function(data){
                var pageindex=$('.current').text()
                tbody('/MattrioEcModel/original_oe/selectcar','.tbody1','.tbody2,.tbody3',pageindex)
                swal("操作成功!", "已审核通过！", "success");
            },error:function(){
                swal("OMG", "审核通过失败!", "error");
            }
        });
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