if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var hback=false;
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
$(".divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var mikey =getUrlParam('?mikey');
var vin =getUrlParam('?vin');
var car =getUrlParam('?car');
var type =getUrlParam('?type');
$("#loading").show();
/*var cont;
var name1;*/
var brand = "";
var car_model_code = "";
var make_year = "";
var recode='';
if((car.indexOf('大众')>=0&&car!='大众EPC')||(car.indexOf('奥迪')>=0&&car!='奥迪EPC'))
$.ajax({
    type:'post',
    url:network+"/Mattrio/VwEpcInterface/getVwMikey",
    data:{
        "userid":userid,
        "mikey":mikey,
        'type':type
    },
    dataType:"json",
    async:false,
    crossDomain: true == !(document.all),
    success:function(data){
        recode=frequencyfun(userid,recode)
        if(recode == 0){
            alert("当天次数已用完");
            window.location.href = "javascript:history.back();";
            return false;
        }
        if(data.recode == -2){
            alert("请重新登陆");
            window.location.href = "/Mattrio/login/login.html";
            return false;
        }
        if(data.length == 0){
            $("#loading").hide();
            alert("暂无数据");
            window.location.href = "javascript:history.back();";
            return false;
        }
        brand = data[0].epc_type;
        car_model_code = data[0].kat;

    },error:function(){

    }
})
var parameters = "";
var year;
demo(type);
function demo(type){
	$(".content_left").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory1",
		data:{
			"userid":userid,
			"mikey":mikey,
			"vin":vin,
			"type":type
		},
		dataType:"json",

		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			recode=frequencyfun(userid,recode)
            if(data.recode == '-1'){
                alert("暂无数据");
                window.location.href = "javascript:history.back();";
                return false;
            }
			if(recode == 0){
				alert("当天次数已用完");
				window.location.href = "javascript:history.back();";
				return false;
			}
			parameters = data.parameters;
			var category_id1 = data.categorys1[0].category_id1;
			var name1 = data.categorys1[0].category_name1;
			if(data.car_info[0].Manufacture_CN){
                $(".contname").html(data.car_info[0].Manufacture_CN+' '+data.car_info[0].Vehicle_Name_CN+' '+data.car_info[0].Year_of_production)
            }else{
                $(".contname").html('')
            }
			if(car.indexOf('EPC')>0){
                year=data.year;
                car_model_code=data.kat;
                if(!data.kat){
                    alert('暂无数据')
                    window.location.href='../../index.html'
                    return false;
                }
                localStorage.setItem('yearvin',data.year+","+vin)
            }else{
                year=data.car_info[0].Year_of_production;
            }
			$.each(data.categorys1,function(key,value){
				var p = $("<p class='contentp' title='"+value.category_id1+":"+value.category_name1+"'>").html(value.category_id1+":"+value.category_name1);
				var ul = $("<ul class='contentul'>");
				p.appendTo(".content_left");
				ul.appendTo(".content_left");
			})
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
					$("#loading").hide();
					$(".row").html("");
					$.each(data.categorys2,function(key,value){
						var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
						div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_name2+"</p></div></a>");
						div1.appendTo(".row");
					});
					$(".epc_a").click(function(){
						if(sessionStorage) {
							sessionStorage.cont = JSON.stringify(data.categorys2);
						} else {
							$.JSONCookie("cont", data.categorys2, {path: '/'});
						}
                        $(this).attr("href","./contentepc/contentepc.html?car_model_code="+car_model_code+"&make_year="+data.categorys2[$(this).parents().index()].category_id2.split(',')[0]+"&module="+data.categorys2[$(this).parents().index()].category_id2.split(',')[1]+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]+'&type='+type+'&fi=1&years='+year+'&vin='+vin+'&epcnum='+$(this).parents("div").index()+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2)
					});
				}
			})
		}
	})
}
$(document).on("click",".contentp",function(){
	hback=true;
	var thatindex;
	var category_id1 = $(this).html().split(":")[0];
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
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
				if (type ==12){
                    var li = $("<li title='"+value.category_name2+"'>").html(value.category_id2.split(',')[1]+': '+value.category_name2);
                } else {
                    var li = $("<li title='"+value.category_name2+"'>").html(value.category_name2);
                }
				li.appendTo(".contentul");
			});
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
                $(this).attr("href","./contentepc/contentepc.html?car_model_code="+car_model_code+"&make_year="+data.categorys2[$(this).parents().index()].category_id2.split(',')[0]+"&module="+data.categorys2[$(this).parents().index()].category_id2.split(',')[1]+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]+'&type='+type+'&fi=1&years='+year+'&vin='+vin+'&epcnum='+$(this).parents("div").index()+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2)
			});
			$(".contentul li").click(function(e){
				e.stopPropagation()
				thatindex=$(this).index()
				$(this).css("border",'1px solid red').siblings("li").css("border",'1px solid #ccc');
				$(".row").html("");
				$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_name2+"</p></div></a></div>");

				var module = data.categorys2[$(this).index()].category_id2
				var name2 = data.categorys2[$(this).index()].category_name2
                var index=$(this).index();
				$(".epc_a").click(function(){
					if(sessionStorage) {

						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
                    $(this).attr("href","./contentepc/contentepc.html?car_model_code="+car_model_code+"&make_year="+data.categorys2[index].category_id2.split(',')[0]+"&module="+data.categorys2[index].category_id2.split(',')[1]+"&image="+data.categorys2[index].img.split("?")[0]+'&type='+type+'&fi=1&years='+year+'&vin='+vin+'&epcnum='+index+"&name1="+name1+"&name2="+data.categorys2[index].category_name2)
				});
			})
		}
	})
})

$("#btn").click(function(){
	if($.trim($("#search").val()) == "" || $.trim($("#search").val()) == null){
		alert("输入内容不能为空");
		return false;
	}
	if($.trim($("#search").val()) == "配件编号"){
		alert("输入内容不能为空");
		return false;
	}
	$("#loading").show();
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
			$("#loading").hide();
			if(data.categorys2.length == 0){
				$(".row").html("");
				$(".row").html("<p style='font-size:20px;text-align:center;'>没有查询到您要查询的数据</p>");
				return false;
			}
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
			});
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","./contentepc/contentepc.html?car_model_code="+car_model_code+"&make_year="+data.categorys2[$(this).parents().index()].category_id2.split(',')[0]+"&module="+data.categorys2[$(this).parents().index()].category_id2.split(',')[1]+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]+'&type='+type+'&fi=1&years='+year+'&vin='+vin+'&epcnum='+$(this).parents("div").index()+'&oecode='+$.trim($("#search").val()))
			});
		}
	})
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
			"type":type,
			"query_str":$.trim($(".searchtwo").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			var name1=$.trim($(".searchtwo").val());
			if(data.categorys2.length == 0){
				$(".row").html("");
				$(".row").html("<p style='font-size:20px;text-align:center;'>没有查询到您要查询的数据</p>");
				// alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
				return false;
			}
			$(".row").html("");
			$(".content_left").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");

				var div = $("<div class='eachdiv' title='"+value.category_id2+":"+value.category_name2+"'>").html(value.category_id2+":"+value.category_name2);
				div.appendTo(".content_left");
			});
			$(".eachdiv").click(function(){
				$(this).css("border",'1px solid red').siblings("div").css("border",'1px solid #ccc');
				$(".row").html("");
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_id2+" "+data.categorys2[$(this).index()].category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var module = data.categorys2[$(this).index()].category_id2
				var name2 = data.categorys2[$(this).index()].category_name2
                var  index=$(this).index();
				$(".epc_a").click(function(){
                    if(sessionStorage) {
					    sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
                    $(this).attr("href","./contentepc/contentepc.html?car_model_code="+car_model_code+"&make_year="+data.categorys2[index].category_id2.split(',')[0]+"&module="+data.categorys2[index].category_id2.split(',')[1]+"&image="+data.categorys2[index].img.split("?")[0]+'&type='+type+'&fi=1&years='+year+'&vin='+vin+'&epcnum='+index+"&name1="+name1+"&name2="+data.categorys2[index].category_name2)
				});
			})
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
                $(this).attr("href","./contentepc/contentepc.html?car_model_code="+car_model_code+"&make_year="+data.categorys2[$(this).parents().index()].category_id2.split(',')[0]+"&module="+data.categorys2[$(this).parents().index()].category_id2.split(',')[1]+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]+'&type='+type+'&fi=1&years='+year+'&vin='+vin+'&epcnum='+$(this).parents("div").index()+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2)
			});
		}
	})
})
$("#goback").click(function(){
	$(".searchtwo").val("");
	demo(type);
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
function backfanhui(){
	hback?back():window.history.back();
}
function back() {
	var query = document.getElementById('query');
	query.value = '';
	$(".searchtwo").val("");
	demo(type);
	hback=false;
};