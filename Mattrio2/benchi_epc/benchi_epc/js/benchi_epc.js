if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
var recode = '';

//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var vin = getUrlParam('?vin');
var mikey = getUrlParam('?mikey');
var fgstnr_mospid = getUrlParam('?fgstnr_mospid');
var fztyp_einsatz = getUrlParam('?fztyp_einsatz');
var fgstnr_prod = getUrlParam('?fgstnr_prod');

$("#loading").show();
$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

var CATNUM = "";
demo();

var parameters = "";
var Vehicle_Name_CN = "";
function demo(){
	$("#loading").hide();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory1",
		data:{
			"userid":userid,
			"type":"5",
			"mikey":mikey,
			"vin":vin
		},
		dataType:"json",
		cache: false,
        timeout: 10000, //超时时间（单位：毫秒）
		crossDomain: true == !(document.all),
		success:function(data){
			recode=frequencyfun(userid,recode)
			if(recode==0){
	            alert("当天次数已用完!");
	            $("#loading").hide();
	            return false;
	        }
			if(data.recode == -2){
				alert("请重新登陆");
				window.location.href = "/Mattrio/login/login.html";
				return false;
			}
			CATNUM = data.CATNUM;
			$(".content_left").html("");
			Vehicle_Name_CN = data.car_info[0].Vehicle_Name_CN
			parameters = data.parameters;
			if(data.categorys1.length=="0"){
				alert("暂无数据")
				backfanhui()
				return false
			}
			if(data.car_info == [] || data.car_info.length == 0){
			}else{
				$(".contname").html(data.car_info[0].Manufacture_CN+" "+data.car_info[0].Vehicle_Name_CN+" "+data.car_info[0].Year_of_production);
			}
            data.categorys1.sort(fun)
            function fun(a,b){
			    return a.category_id1.split('-')[1]-b.category_id1.split('-')[1]
            }
			$.each(data.categorys1,function(key,value){
				var p = $("<p class='contentp' title='"+value.category_id1+":"+value.category_name1+"'>").html(value.category_id1.split('-')[1]+":"+value.category_name1);
				var ul = $("<ul class='contentul'>");
				p.appendTo(".content_left");
				ul.appendTo(".content_left");
			})
			var category_id1 = data.categorys1[0].category_id1;
			var name1 = data.categorys1[0].category_name1;
			$.ajax({
				type:"post",
				url:network+"/Mattrio/EpcApi/EpcCategory2",
				data:{
					"userid":userid,
					"parameters":parameters,
					"category_id1":category_id1,
					"type":"5"
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					$("#loading").hide();
					$(".row").html("");
					$.each(data.categorys2,function(key,value){
						var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
						div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+value.category_name2+"</p></div></a>");
						div1.appendTo(".row");
					});
					$(".epc_a").click(function(){
						if(sessionStorage) {
							sessionStorage.cont = JSON.stringify(data.categorys2);
						} else {
							$.JSONCookie("cont", data.categorys2, {path: '/'});
						}
						$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+category_id1.split('-')[1]+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split("?")[0]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+name1+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&Vehicle_Name_CN="+Vehicle_Name_CN+"&vin="+vin+'&f='+category_id1.split('-')[0]);
					});
				}
			})
		},error:function(){
            $('#loading').hide()
            alert('请求失败');
        }
	})
}

$(document).on("click",".contentp",function(){
	hback=true;
	var category_id1 = $(this).attr('title').split(':')[0];
	var name1 =  $(this).html().split(":")[1]
	$("#loading").show();
	$(this).next().slideToggle().siblings('.content ul').slideUp();
	$(".contentul").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory2",
		data:{
			"userid":userid,
			"parameters":parameters,
			"category_id1":category_id1,
			"type":"5"
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'  onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var li = $("<li title='"+value.category_name2+"'>").html(value.category_name2);
				li.appendTo(".contentul");
			});
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+category_id1.split('-')[1]+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split("?")[0]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+name1+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&Vehicle_Name_CN="+Vehicle_Name_CN+"&vin="+vin+'&f='+category_id1.split('-')[0]);
			});
			$(".contentul li").click(function(){
				$(this).css("border",'1px solid red').siblings("li").css("border",'1px solid #ccc');
				$(".row").html("");
				$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'  onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+data.categorys2[$(this).index()].category_name2+"</p></div></a></div>");
                var index=$(this).index();
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+category_id1.split('-')[1]+"&c="+data.categorys2[index].category_id2+"&d="+data.categorys2[index].img.split("?")[0]+"&oe="+"&epcnum="+index+"&h="+name1+"&i="+data.categorys2[index].category_name2+"&Vehicle_Name_CN="+Vehicle_Name_CN+"&vin="+vin+'&f='+category_id1.split('-')[0]);
				});
				
			})
		}
	})
})

$("#btn").click(function(){
	var reg = /^\w{5,}$/;
	if($.trim($("#search").val().match(reg)) == null){
		alert("OE号不少于5位");
		return false;
	}
	$("#loading").show();
	$(".contentbackright").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":"5",
			"query_str":$.trim($("#search").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'  onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
			});
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+data.categorys2[$(this).parents().index()].category_id1.split('-')[1]+"&c="+data.categorys2[$(this).parents().index()].category_id2+","+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&d="+data.categorys2[$(this).parents().index()].img.split("?")[0]+"&oe="+$.trim($("#search").val())+"&epcnum="+$(this).parents(".contentname").index()+"&h="+$(".searchtwo").val()+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&no=-1"+"&Vehicle_Name_CN="+Vehicle_Name_CN+"&vin="+vin+'&f='+category_id1.split('-')[0]);
			});
		}
	})
})
$(document).keydown(function(e){
	if(e.keyCode==13){
      if($("#query").is(':focus')){
      	$('#searchtwo').click()    	
      }else if($('.inputbox').is(':focus')){
      	$('#btn').click()
      }
	}
})

$("#searchtwo").click(function(){
	if($.trim($(".searchtwo").val()) == ""){
		alert("查询内容不能为空");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":"5",
			"query_str":$.trim($(".searchtwo").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$(".content_left").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var div = $("<div class='eachdiv' title='"+value.category_id2+":"+value.category_name2+"'>").html(value.category_id2+":"+value.category_name2);	
				div.appendTo(".content_left");
                value.category_id2+=','+value.img.split('benzimg/')[1].split('.jpg?x-oss')[0];
			});
			$(".eachdiv").click(function(){
				$(this).css("border",'1px solid red').siblings("div").css("border",'1px solid #ccc');
				$(".row").html("");
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_id2+" "+data.categorys2[$(this).index()].category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var index=$(this).index();
				var GROUPNUM = data.categorys2[index].category_id1;
				var SUBGRP = data.categorys2[index].category_id2+","+data.categorys2[index].img.split(".jpg")[0].split("benzimg/")[1];
				var img = data.categorys2[index].img.split("?")[0];
				var name2 = data.categorys2[index].category_name2;
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}

					$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+GROUPNUM.split('-')[1]+"&c="+SUBGRP+","+img+"&d="+img+"&oe="+$("#search").val()+"&epcnum="+index+"&i="+name2+"&no=-1"+"&Vehicle_Name_CN="+Vehicle_Name_CN+"&vin="+vin+'&f='+data.categorys2[index].category_id1.split('-')[0]);
				});
			})
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+data.categorys2[$(this).parents().index()].category_id1.split('-')[1]+"&c="+data.categorys2[$(this).parents().index()].category_id2+","+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&d="+data.categorys2[$(this).parents().index()].img.split("?")[0]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+$(".searchtwo").val()+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&no=-1"+"&Vehicle_Name_CN="+Vehicle_Name_CN+"&vin="+vin+'&f='+data.categorys2[$(this).parents().index()].category_id1.split('-')[0]);
			});
		}
	})
})
$("#goback").click(function(){
	$(".searchtwo").val("");
	demo();
})
var hback=false;
function backfanhui(){
	hback?back():window.history.back();
}
function back() {
	var query = document.getElementById('query');
	query.value = '';
	$(".searchtwo").val("");
	demo();
	hback=false;
};