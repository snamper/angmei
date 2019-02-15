if(localStorage) {
	var network = localStorage.getItem("network");
	var clicknum = sessionStorage.getItem("clicknum");
	var cont = JSON.parse(sessionStorage.cont);
} else {
	var network = $.cookie("network");
	var clicknum = $.cookie("clicknum");
	var cont = $.JSONCookie("cont");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
var recode = '';

$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

$("#loading").show();
var fgstnr_mospid = getUrlParam('?a');
var categoryid1 = getUrlParam('?b');
var categoryid2 = getUrlParam('?c');
var fztyp_einsatz = getUrlParam('?d');
var fgstnr_prod = getUrlParam('?e');
var bildtaf_btnr = getUrlParam('?f');
var image = getUrlParam('?g');
var oe = getUrlParam('?oe');
var type = getUrlParam('?type');
var choice = getUrlParam('?choice');
var category_name1 = getUrlParam('?h');
var category_name3 = getUrlParam('?i');
var vin=getUrlParam('?vin');
var disable=true;
var compile=false;
var carType='宝马';
$.ajax({
	type:"post",
	url:network+"/Mattrio/EpcCategoryInterface/getEpcCategoryPermission",
	async:false,
	data:{
		"userid": userid
	},
	success:function(data){
		if(data.list==[]||data.list.length==0){
			compile=false
		}else{
			compile=true
		}
	},error:function(){
		alert('获取权限失败')
	}
});

if(!vin){
	vin=''
	$('#novin').hide()
}

$(".name1").html(category_name1);
$(".name2").html(category_name3);
// $(document).ready(function(){
// 	var iv2 = $("#viewer2").iviewer({
// 		src: image
// 	});
// });
$("<img class='img' src='" + image + "'>").appendTo("#viewer2");
$(".img").load(function(){
	getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe,vin,true);
})
$('#novin').click(function(){
	if(disable){
		getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe,'');
		$("#novin").text('未过滤')
		disable=false;
	}else{
		getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe,vin);
		$("#novin").text('已过滤')
		disable=true;
	}
})


var width;
$(function() {
	var imgSrc = $(".img").attr("src");
	getImageWidth(imgSrc, function(w, h) {
		width = w;
	});
});
function getImageWidth(url, callback) {
	var img = new Image();
	img.src = url;
	if(img.complete){
		callback(img.width, img.height);
	} else {
		img.onload = function() {
			callback(img.width, img.height);
		}
	}
}
//上下翻页
if(clicknum == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
}
if(clicknum == cont.length-1){
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
if(choice == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
var num = parseInt(clicknum);
$("#next").click(function(){
	$("#loading").show();
	$("#topone").removeAttr("disabled");
	$('#topone').css("background","#e94740");
	num += 1;
	if(num >= cont.length-1){
		$('#next').attr('disabled',"true");
		$('#next').css("background","#ccc");
		num = cont.length-1;
	}
	categoryid1 = cont[num].category_id1;
	categoryid2 = cont[num].category_id2;
	bildtaf_btnr = cont[num].category_id3;
	var image = "http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + cont[num].bildtaf_grafikid + ".jpg";
	type = cont[num].type;
	$("#viewer2").html("");
	$(".name2").html(cont[num].category_name3);
	$("<img class='img' src='" + image + "'>").appendTo("#viewer2");
	disable=true;
	getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe,vin,true);
    window.history.replaceState(null,null,'?a='+fgstnr_mospid+'&b='+categoryid1+'&c='+categoryid2+'&d='+fztyp_einsatz+'&e='+fgstnr_prod+'&f='+bildtaf_btnr+'&g='+image+'&oe='+oe+'&type='+type+'&choice='+choice+'&h='+category_name1+'&i='+category_name3+'&vin='+vin)
    if(sessionStorage) {
        sessionStorage.setItem("clicknum",num);
    } else {
        $.cookie("clicknum", num, {path: "/"});
    }
	$("#novin").text('已过滤')
})
$("#topone").click(function(){
	$("#loading").show();
	$("#next").removeAttr("disabled");
	$('#next').css("background","#e94740");
	num -= 1;
	if(num <= 0){
		$('#topone').attr('disabled',"true");
		$('#topone').css("background","#ccc");
		num = 0;
	}
	categoryid1 = cont[num].category_id1;
	categoryid2 = cont[num].category_id2;
	bildtaf_btnr = cont[num].category_id3;
	var image = "http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + cont[num].bildtaf_grafikid + ".jpg";
	type = cont[num].type;
	$("#viewer2").html("");
	$(".name2").html(cont[num].category_name3);
	$("<img class='img' src='" + image + "'>").appendTo("#viewer2");
	disable=true;
	getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe,vin,true);
    window.history.replaceState(null,null,'?a='+fgstnr_mospid+'&b='+categoryid1+'&c='+categoryid2+'&d='+fztyp_einsatz+'&e='+fgstnr_prod+'&f='+bildtaf_btnr+'&g='+image+'&oe='+oe+'&type='+type+'&choice='+choice+'&h='+category_name1+'&i='+category_name3+'&vin='+vin)
    if(sessionStorage) {
        sessionStorage.setItem("clicknum",num);
    } else {
        $.cookie("clicknum", num, {path: "/"});
    }
    $("#novin").text('已过滤')
})
function getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe,vin,guolv){
	$("#loading").show();
	$.ajax({
		type: "post",
		url: network + "/Mattrio/BwmEpcInterface/getBwmEpcPartInfo",
		data: {
			"userid": userid,
			"fgstnr_mospid": fgstnr_mospid,
			"categoryid1": categoryid1,
			"categoryid2": categoryid2,
			"fztyp_einsatz": fztyp_einsatz,
			"fgstnr_prod": fgstnr_prod,
			"bildtaf_btnr": bildtaf_btnr,
			"type": type,
			"oenumber": oe,
			"vin":vin
		},
		dataType: "json",
        timeout: 10000, //超时时间（单位：毫秒）
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
            $("#loading").hide();
			recode=frequencyfun(userid,recode)
			if(recode==0){
	            alert("当天次数已用完!");
	            return false;
	        }
			if(data.recode == -2){
				alert("请重新登陆");
				window.location.href = "/Mattrio/login/login.html";
				return false;
			}
			//替换关系显示
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].price==null) {
					for (var j = 0; j < data.list.length; j++) {
						if (data.list[j].price>0&&data.list[i].location==data.list[j].location&&data.list[i].oe_name2==data.list[j].oe_name2&&data.list[i].supplement==data.list[j].supplement) {
							data.list[i].supplement='被'+data.list[j].oenumber+'替换';
						}
					}
				}
			}
			$("tbody").html("");
			var formerlist=''
			if(guolv){
				sessionStorage.setItem('datalist',JSON.stringify(data.list))
			}else{
                sessionStorage.getItem('datalist')?formerlist=sessionStorage.getItem('datalist'):formerlist='';
			}
			var arr=[];
			$('#viewer2').find('div,span').remove()
			$.each(data.list, function(key, value) {
					if(oe == "") {
						var tr = $("<tr></tr>");
					} else if(value.oenumber == oe) {
						var tr = $("<tr class='tr1'></tr>");
					} else {
						var tr = $("<tr></tr>");
					}
                if(formerlist!=''&&formerlist.indexOf(JSON.stringify(value))<0){
						tr.css('color','red')
					}
					var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox' name='gay'></span></p></td>");
					var td1 = $("<td>").html(value.location);
					var td2 = $("<td class='oecont'>").html("<span>"+value.oenumber+"</sapn>");
                if (value.oe_name){
                    var oe_name=value.oe_name;
                }else{
                    var oe_name='';
                }
                if(compile){
                    var td3 = $("<td class='name'>")
                    var img=$('<img class="compileImg none" src="../../../image/compile.png">')
                    img.appendTo(td3)
                    var tdp2=$('<p class="p2">').html(oe_name)
                    tdp2.appendTo(td3)
                    tdp2.hide()
                    var tdp=$('<p class="tdp none">').html('点此进行编辑')
                    tdp.appendTo(td3)
                    var div=$('<div class="compileWrap clearfix">').html('<input class="compileInp" type="text" placeholder="请输入名称" /><button><img src="../../../image/compileYes.png" /></button><div class="namList"></div>')
                    div.appendTo(td3)
                    td3.click(function (e) {
                        stopPropagation(e)
                    })
                    td3.on('click','.compileImg,.tdp',function(){
                        $('.p2').removeClass('none')
                        img.addClass('none')
                        tdp.addClass('none')
                        tdp2.addClass('none')
                        td3.parents('tr').siblings('tr').find('.compileWrap').hide()
                        div.find('input').val('').attr('placeholder','请输入名称')
                        div.show()
                    })
                    $(document).click(function(e){
                        stopPropagation(e)
                        div.hide()
                        $('.p2').removeClass('none')
                    })
                    td3.on('input','.compileInp',function(){
                        if($(this).val()==''||$(this).val().length==0){
                            return false;
                        }
                        $.ajax({
                            type:"post",
                            async: false,
                            url:network+"/Mattrio/CategoryInterface/LikeCategoryList",
                            data:{
                                "category_name":$(this).val(),
                                "size":"10"
                            },
                            success:function(data){
                                td3.find('.namList').html('')
                                td3.find('.namList').show()
                                data.list.sort(fun)
                                function fun(a,b){
                                    return a.category_name.length-b.category_name.length
                                }
                                $.each(data.list, function(key,val) {
                                    var p1=$("<p class="+val.category_id+">"+val.category_name+"</p>")
                                    p1.appendTo(".namList")
                                });
                            }
                        })
                    })
                    td3.on('click','.namList p',function(){
                        td3.find('.compileInp').attr('id',$(this).attr('class'))
                        td3.find('.compileInp').val($(this).text())
                        td3.find('.namList').hide()
                    })
                    function getAjax(){
                        $.ajax({
                            type:"post",
                            url:network+"/Mattrio/EpcCategoryInterface/getEpcCategoryList",
                            data:{
                                'userid':userid,
                                'oe_name_list':arr.substring(0,arr.length-1),
                                'type':carType
                            },
                            success:function(da){
                                td3.find('.p2').html(td3.find('.compileInp').val()).addClass('col')
                                $.each(da.list, function(key,value) {
                                    $('.oe_name2').each(function(index,text){
                                        if($(text).text()==oe_name){
                                            var a=new Date(value.time.time)
                                            $(text).prev('.name').attr('title',a.toLocaleString()+'更新')
                                            $(text).prev('.name').find('.p2').html(value.category_name).prop('id',value.postion).addClass('col')
                                        }
                                    })
                                });

                            },
                            error:function(){

                            }
                        });
                    }
                    td3.on('click','button',function(){
                        if(td3.find('.compileInp').val()==''){
                            if(window.confirm('是否删除当前别名')){
                                $.ajax({
                                    type:'post',
                                    url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                    data:{
                                        'userid':userid,
                                        'oe_name':td3.next('td').text(),
                                        'category_name':'',
                                        'category_id':'',
                                        'type':carType,
                                        'oe_number':td2.text(),
                                        'state':1
                                    },
                                    dataType: "json",
                                    cache: false,
                                    crossDomain: true == !(document.all),
                                    success:function(data){
                                        div.hide()
                                        alert('删除成功')
                                        if(data.msg=='添加成功'){
                                            getAjax()
                                        }
                                    },error:function(){
                                        alert('删除失败')
                                    }
                                })
                            }
                            return false;
                        }
                        if(!td3.find('.col').length){
                            $.ajax({
                                type:'post',
                                url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                data:{
                                    'userid':userid,
                                    'oe_name':td3.next('td').text(),
                                    'category_name':td3.find('.compileInp').val(),
                                    'category_id':td3.find('.compileInp').attr('id'),
                                    'type':carType,
                                    'oe_number':td2.text(),
                                    'state':0
                                },
                                dataType: "json",
                                cache: false,
                                crossDomain: true == !(document.all),
                                success:function(data){
                                    div.hide()
                                    if(data.msg=='添加成功'){
                                        getAjax()
                                    }
                                }
                            })
                        }else{
                            $.ajax({
                                type:'post',
                                url:network+'/Mattrio/EpcCategoryInterface/updateUserEpcCategory',
                                data:{
                                    'userid':userid,
                                    'oe_name':td3.next('td').text(),
                                    'category_name':td3.find('.compileInp').val(),
                                    'category_id':td3.find('.compileInp').attr('id'),
                                    'postion':tdp2.attr('id'),
                                    'oe_number':td2.text()
                                },
                                dataType: "json",
                                cache: false,
                                crossDomain: true == !(document.all),
                                success:function(data){
                                    div.hide()
                                    if(data.msg=='成功修改'){
                                        getAjax()
                                    }
                                }
                            })
                        }
                    })
                }else{
                    var td3 = $("<td>").html(oe_name)
                }
					arr+="'"+value.oe_name2+"',"
					var td8 = $("<td class='oe_name2'>").html(value.oe_name2);
	
					if(value.price) {
						var td4 = $("<td>").html(value.price);
					} else {
						var td4 = $("<td>").html('');
					}
					var td6 = $("<td>").html(value.number);
					if(value.supplement) {
						var td7 = $("<td>").html(value.supplement);
					} else {
						var td7 = $("<td>").html('');
					}
					td0.appendTo(tr)
					td1.appendTo(tr)
					td2.appendTo(tr)
					td3.appendTo(tr)
					td8.appendTo(tr)
					td4.appendTo(tr)
					td6.appendTo(tr)
					td7.appendTo(tr)
					$("tbody").append(tr);
					if(key==data.list.length-1&&compile){
						$.ajax({
							type:"POST",
							url:network+"/Mattrio/EpcCategoryInterface/getEpcCategoryList",
							data:{
								'userid':userid,
								'oe_name_list':arr.substring(0,arr.length-1),
								'type':carType
							},success:function(da){
								$("#loading").hide();
								$('.p2').show()
								if(da.list!=[]||da.list.length!=0){
									$.each(da.list, function(key,value) {
										$('.oe_name2').each(function(index,text){
											if($(text).text()==oe_name){
												var a=new Date(value.time.time)
                                                $(text).prev('.name').attr('title',a.toLocaleString()+'更新')
                                                $(text).prev('.name').find('.p2').html(value.category_name).prop('id',value.postion).addClass('col')
											}
										})
									});
								}
							},error:function(){
								alert('获取别名失败')
							}
						});
					}else{
                        $("#loading").hide();
                    }
				})
			$("td.name").hover(function(){
				if($(this).find('.compileWrap').is(':hidden')){
                    $(this).find('.p2').addClass('none')
                    $(this).find('.tdp,.compileImg').removeClass('none')
				}
			},function(){
			    if(!$(this).find('.compileWrap ').is(':visible')){
                    $(this).find('.p2').removeClass('none')
                }
				$(this).find('.tdp,.compileImg').addClass('none')
			})
			$(function() {
				$("#checkbox").selectCheck();
			})
			//点击获取坐标
			$.each(data.locations, function(key, value) {
				var scale = $("#viewer2 img").width() / width;
				var span = $("<span style='position:absolute;top:" + (value.top_y * scale - 3) + "px;left:" + (value.buttom_x * scale - 18) + "px;width:25px;height:25px;' class='span" + value.postion + "'></span>");
				var span2 = $("<div disabled='disabled' style='background-color:rgba(255,255,255,.8);position:absolute;top:" + (value.top_y * scale - 3) + "px;left:" + (value.buttom_x * scale - 18) + "px;width:20px;height:20px;' ></div>");
				var isfind = 0;
				for(var i = 0; i < $("tbody tr").length; i++) {
					if(value.postion == Number($("tbody tr").eq(i).children("td").eq(1).html())) {
						isfind = 1;
					}
				}
				if(isfind == 1) {
					$("#viewer2").append(span);
				} else {
					$("#viewer2").append(span2);
				}
			})
			$("#viewer2 span").click(function() {
				$("tbody tr").removeClass("tr1");
				$(this).css({
					"border": "2px solid red"
				}).siblings("span").css({
					"border": "0"
				});
				for(var i = 0; i < $("tbody tr").length; i++) {
					if(Number($("tbody tr").eq(i).children("td").eq(1).html()) == Number($(this)[0].className.split("n")[1])) {
						$("tbody tr").eq(i).addClass("tr1");
					}
				}
				var height = 0;
				$.each($("tbody tr"), function(key, value) {
					if(key < $(".tr1").index() - 1) {
						height = Number($(value).height()*key);
					}
				})
				$('html, body').animate({  
                    scrollTop:height+600
                }, 400); 
			})

			//OE
			var height = 0;
			$.each($("tbody tr"), function(key, value) {
				if(key < $(".tr").index()) {
					height += Number($(value).height());
				}
			})
			if(oe == ""){
				$('html, body').animate({  
	                scrollTop:height
	            }, 400);
			}else{
				$('html, body').animate({  
	                scrollTop:height+600
	            }, 400);
			}
			
			//下载
			$("#btn").click(function() {
				var id_array = new Array();
				$('input[name="gay"]:checked').each(function() {
					id_array.push($(this).parent("span").parent("p").parent("td").parent("tr").index()); //向数组中添加元素  
				});
				if(id_array.length == 0) {
					alert("选择您要导出的选项");
					return false;
				}
				var iarray = new Array();
				$.each(id_array, function(key, value) {
					iarray.push(data.list[value].oenumber);
				})
				window.location.href = network + "/Mattrio/BwmEpcInterface/exportOeExcel?fgstnr_mospid=" + fgstnr_mospid + "&bildtaf_btnr=" + bildtaf_btnr + "&categoryid1=" + categoryid1 + "&categoryid2=" + categoryid2 + "&fztyp_einsatz=" + fztyp_einsatz + "&fgstnr_prod=" + fgstnr_prod + "&ids=" + iarray.join(",");
			})

			$("tbody tr").click(function() {
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$("#viewer2 span").css({"border": "0"})
				for(var i = 0; i < $("#viewer2 span").length; i++) {
					if(Number($("#viewer2 span")[i].className.split("n")[1]) == Number($(this).children("td").eq(1).html())) {
						$("#viewer2 span").eq(i).css({"border": "2px solid red"});
					}
				}
			})
		},
		error: function(data) {
			$('#loading').hide()
            alert('请求失败');
		}
	})
}
$(document).on("click",".oecont span",function(){
//	window.open("../../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
	window.location.href="../../../content/maintain/oecont/oecont.html?oenumber="+$(this).html()
})
//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 