if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
var recode ='';
var hback=false;
//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var disc_no = getUrlParam('?a');
var hmodtyp = getUrlParam('?b');
var nserepcend = getUrlParam('?c');
var npl = getUrlParam('?d');
var nserepcstrt = getUrlParam('?f');
var year = getUrlParam('?year');
var mikey = getUrlParam('?mikey');
var vin = getUrlParam('?vin');
var type =getUrlParam('?type');
if(type=="null"||type==null){
	type="10"
}
if(vin==null||vin=='null'){
    vin=''
}
$("#loading").show();
$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

var parameters = "";
demo();
var arr=[]
function demo(){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory1",
		data:{
			"userid":userid,
			"type":type,
			"mikey":mikey,
            "vin":vin
		},
		dataType:"json",
		cache: false,
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
			$("#loading").hide();
			$(".content_left").html("");
			parameters = data.parameters;
            localStorage.setItem('HMCCParameters',parameters)
			if(data.car_info == [] || data.car_info.length == 0){
			}else{
				$(".contname").html(data.car_info[0].Manufacture_CN+" "+data.car_info[0].Vehicle_Name_CN+" "+data.car_info[0].Year_of_production);
			}
			if(data.categorys1 == [] || data.categorys1.length == 0){
				alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
				window.location.href="javascript:history.back();";
				return false;
			}
			$.each(data.categorys1,function(key,value){
				var p = $("<p class='contentp' title='"+key+":"+value.category_name1+"'>").html(key+":"+value.category_name1);
				if(type=="11"){
					arr.push(value.category_id1)
					
				}
				var ul = $("<ul class='contentul'>");
				p.appendTo(".content_left");
				ul.appendTo(".content_left");
			})
			var category_id1 = data.categorys1[0].category_id1;
			var name1 = data.categorys1[0].category_name1;
			var oe = "";
			$.ajax({
				type:"post",
				url:network+"/Mattrio/EpcApi/EpcCategory2",
				data:{
					"userid":userid,
					"parameters":parameters,
					"category_id1":category_id1,
					"type":type
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					
					if(data.categorys2.length=="0"){
						$(".content_left").hide()
						$("#loading").hide();
						if(confirm("暂无数据，点击确认返回")){
							window.history.back();
						}
						return false;
					}
					$(".content_left").show()
					$("#loading").hide();
					$(".row").html("");
					leftName(data);
					rightClick(data,name1,oe);
				}
			})
		},error:function(){
			$("#loading").hide();
			alert("暂无数据")
			window.history.back();
		}
	})
}
$(document).keydown(function(e){
	if(e.keyCode==13){
      if($("#query").is(':focus')){
      	$('#searchtwo').click()    	
      }else if($('.inputbox').is(':focus')){
      	$('#btn').click()
      }
	}
})

function leftName(data){
	$.each(data.categorys2,function(key,value){
		var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
			div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"?x-oss-process=style/min_img'><p>"+value.category_name2+"</p></div></a>");
	
		div1.appendTo(".row");
	});
}

function rightClick(data,name1,oe,index){
	$(".epc_a").click(function(){
	    var inde=index?index:$(this).parents().index()
        var e = data.categorys2[inde].category_id2;
        var i = data.categorys2[inde].category_name2;
        var imgsrc=data.categorys2[inde].img;
		if(sessionStorage) {
			sessionStorage.cont = JSON.stringify(data.categorys2);
		} else {
			$.JSONCookie("cont", data.categorys2, {path: '/'});
		}
		// console.log($(this).parents(".contentname").index())
		$(this).attr("href","../content_haima_epc/content_haima_epc.html?a="+npl+"&b="+disc_no+"&c="+nserepcend+"&d="+nserepcstrt+"&e="+e+"&f="+hmodtyp+"&h="+name1+"&oe="+oe+"&epcnum="+inde+"&i="+i+"&imgsrc="+imgsrc+"&type="+type);
	});
}

function leftLi(data,name1,_this,oe){
	$(_this).css("border",'1px solid red').siblings().css("border",'1px solid #ccc');
	$(".row").html("");
	$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(_this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(_this).index()].img+"?x-oss-process=style/min_img'><p>"+data.categorys2[$(_this).index()].category_name2+"</p></div></a></div>");
	var e = data.categorys2[$(_this).index()].category_id2;
	var i = data.categorys2[$(_this).index()].category_name2;
	rightClick(data,name1,oe,$(_this).index());
}
///Mattrio/EpcApi/queryCategory
$(document).on("click",".contentp",function(){
	hback=true;
	var category_id1 = $(this).html().split(":")[0];
    var name1 =  $(this).html().split(":")[1];
	if(type=="11"){
		var name2 =  arr[$(this).html().split(":")[0]];
	}else{
		var name2 =  $(this).html().split(":")[1];
	}
	var oe = "";
	$("#loading").show();
	$(this).next().slideToggle().siblings('.content ul').slideUp();
	$(".contentul").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory2",
		data:{
			"userid":userid,
			"parameters":parameters,
			"category_id1":name2,
			"type":type
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
					div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"?x-oss-process=style/min_img'><p>"+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var li = $("<li title='"+value.category_name2+"'>").html(value.category_name2);
				li.appendTo(".contentul");
			});
			rightClick(data,name1,oe);
			$(".contentul li").click(function(){
				var _this = this;
				$(_this).css("border",'1px solid red').siblings().css("border",'1px solid #ccc');
				$(".row").html("");
					$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(_this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(_this).index()].img+"?x-oss-process=style/min_img'><p>"+data.categorys2[$(_this).index()].category_name2+"</p></div></a></div>");
				var e = data.categorys2[$(_this).index()].category_id2;
				var i = data.categorys2[$(_this).index()].category_name2;
				var epcnum = $(_this).index();
				$(".epc_a").click(function(){
					var e = data.categorys2[epcnum].category_id2;
					var i = data.categorys2[epcnum].category_name2;
					var imgsrc=data.categorys2[epcnum].img;
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					if(type=="11"){
						$(this).attr("href","../content_haima_epc/content_haima_epc.html?a="+npl+"&b="+disc_no+"&c="+nserepcend+"&d="+nserepcstrt+"&e="+e+"&f="+hmodtyp+"&h="+name1+"&oe="+oe+"&epcnum="+epcnum+"&i="+i+"&imgsrc="+imgsrc+"&type=11");
					}else{
						$(this).attr("href","../content_haima_epc/content_haima_epc.html?a="+npl+"&b="+disc_no+"&c="+nserepcend+"&d="+nserepcstrt+"&e="+e+"&f="+hmodtyp+"&h="+name1+"&oe="+oe+"&epcnum="+epcnum+"&i="+i+"&imgsrc="+imgsrc);
					}
				});
			})
		}
	})
})


$("#searchtwo").click(function(){
	if($.trim($(".searchtwo").val()) == ""){
		alert("查询内容不能为空");
		return false;
	}
	$("#loading").show();
	var oe = "";
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":type,
			"query_str":$.trim($(".searchtwo").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
//			 console.log(data)	
			$("#loading").hide();
			$(".row").html("");
			$(".content_left").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"?x-oss-process=style/min_img'><p>"+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var div = $("<div class='eachdiv' title='"+value.category_id2+":"+value.category_name2+"'>").html(value.category_name2);	
				div.appendTo(".content_left");
			});
			var name1 = "";
			$(".eachdiv").click(function(){
				var _this = $(this);
				leftLi(data,name1,_this,oe);
			})
			rightClick(data,name1);
		}
	})
})
$("#goback").click(function(){
	$(".searchtwo").val("");
	demo();
})

$("#btn").click(function(){
	var reg = /^\w{5,}$/;
	if($.trim($("#search").val().match(reg)) == null){
		alert("OE号不少于5位");
		return false;
	}
	$("#loading").show();
	$(".contentbackright").html("");
	var oe = $.trim($("#search").val());
	var name1 = "";
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":type,
			"query_str":$.trim($("#search").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			leftName(data);
			rightClick(data,name1,oe);
		}
	})
})
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