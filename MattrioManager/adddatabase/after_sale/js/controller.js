var network = localStorage.getItem("network");
$(function(){
	$("#arrcity").suggest(citys,{hot_list:commoncitys,dataContainer:'#arrcity_3word', attachObject:'#suggest'});
	$("#city2").suggest(citys,{hot_list:commoncitys,attachObject:"#suggest2"});
});

$(".select_div div").click(function(){
	$(this).next("ul").toggle();
	$(this).parent("div").parent("td").siblings("td").children("div").children("ul").hide()
})
$(".select_div ul li").click(function(){
	$(this).parent("ul").prev("div").html($(this).html());
	$(this).parent("ul").hide();
})
//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true; 
	}
}
$(document).bind('click',function(){
	$('.select_div ul').css('display','none');
});
$('.select_div').bind('click',function(e){
	stopPropagation(e);
});

//获取主机厂
$.ajax({
	type:"post",
	url:network+"/MattrioManager/CarManager/getManufacture",
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
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
		// console.log(data)
	}
})


$(".select_div div").click(function(){
	var name = $(this).parents(".select_div").attr('class').split(" ")[1].split("select_")[1];
	// console.log(name);
	$(".select_"+name+" ul").html("");
	if($("#city2").val() == ""){
		alert("主机厂不能为空");
		$(".select_"+name+" ul").hide();
		return false;
	}
	var Manufacture_CN ="Manufacture_CN=" + $("#city2").val();
	var Manufacture_CN1 ="Manufacture_CN";
	var str = new Array;
	$.each($("#car_table td .select_div"),function(key,value){
		str.push($(this).attr('class').split(" ")[1].split("select_")[1])
	})

	var parm = "";
	var parm1 = "";
	var class_name = "";
	var class_name1= "";
	
	// 遍历组件_data
	$.each(str,function(k,v){
		if($(".select_"+v+" div").html() == "不选择"){
			var class_name = "";
			var class_name1 = "";
		}else{
			var class_name ="&"+v+"=" + $(".select_"+v+" div").html();
			var class_name1 =","+v;
		}
		parm += class_name;
		parm1 += class_name1;
	})
	var data = Manufacture_CN+parm+"&query_parameter="+name+"&type=macc&parameters="+Manufacture_CN1+parm1;
	$(".select_"+name+" ul").html("");
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/CarMatchController/getCarParameterFilterValue",
		dataType: "json",
		data:data,
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			var li1 = $("<li>").html("不选择");
			$(".select_"+name+" ul").append(li1);
			$(".select_"+name+" ul").show();
			$.each(data.list,function(key,value){
				var li = $("<li>").html(value[name]);
				$(".select_"+name+" ul").append(li);
			})
			$(".select_div ul li").click(function(){
				$(this).parent("ul").prev("div").html($(this).html());
				$(this).parent("ul").hide();
			})
		},
		error: function(data) {
			// console.log(data)
		}
	})
})


$("#city2").change(function(){
	$(".select_Vehicle_Name_CN div").html("不选择");
	$(".select_Vehicle_of_year div").html("不选择");
	$(".select_Capacity div").html("不选择");
})



