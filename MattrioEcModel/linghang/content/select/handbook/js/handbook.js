var network = localStorage.getItem("networkmodel");

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var scoll = getUrlParam('?scoll');
var mikey = getUrlParam('?mikey');



var str = ["行驶里程","机油","机油滤清器","空气滤清器","空调滤清器","燃油滤清器","制动液","变速箱油","火花塞","防冻液","汽油添加剂"]
$table = $("<table>");
$.each(str,function(key,value){
	$tr = $("<tr>");
	$("<td>").html(value).appendTo($tr);
	$tr.appendTo($table)
});
$(".contentleft").html($table)



$("#loading").show();
$.ajax({
	type:"post",
	url:network+"/MattrioEc/MaintenanceCycleInterface/getMcTable",
	data:{
		"mikey":mikey,
		"mileage":scoll
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		// console.log(data);
		$("#loading").hide();
		if(data == [] || data.length == 0){
			$(".contentleft").hide();
			$(".contenttop").show();
			return false;
		}
		var minnum = [data[3952].length,data[1072].length,data[399].length,data[760].length,data[486].length,data[3954].length,data[1769].length,data[1208].length,data[3953].length,data[3955].length];
		var minnumber = Math.min.apply(null, minnum);
			$.each(data[3952],function(key,value){
				if(minnumber > key){
					var $td = $('<td></td>');
					var $td0 = $('<td></td>');
					$($td).html(value.mileages+"km").appendTo(".tr");
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td0);
					} else {
						$('<span>').html('--').appendTo($td0);
					}
					$td0.appendTo('.tr0');
				}
			})
			$.each(data[1072],function(key,value){
				if(minnumber > key){
					var $td4 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td4);
					} else {
						$('<span>').html('--').appendTo($td4);
					}
					$td4.appendTo('.tr1');
				}
			})
			$.each(data[399],function(key,value){
				if(minnumber > key){
					var $td1 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td1);
					} else {
						$('<span>').html('--').appendTo($td1);
					}
					$td1.appendTo('.tr2');
				}
			})
			$.each(data[760],function(key,value){
				if(minnumber > key){
					var $td2 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td2);
					} else {
						$('<span>').html('--').appendTo($td2);
					}
					$td2.appendTo('.tr3');
				}
				
			})
			$.each(data[486],function(key,value){
				if(minnumber > key){
					var $td3 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td3);
					} else {
						$('<span>').html('--').appendTo($td3);
					}
					$td3.appendTo('.tr4');
				}
				
			})
			
			$.each(data[3953],function(key,value){
				if(minnumber > key){
					var $td6 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td6);
					} else {
						$('<span>').html('--').appendTo($td6);
					}
					$td6.appendTo('.tr5');
				}
				
			})
			$.each(data[1769],function(key,value){
				if(minnumber > key){
					var $td7 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td7);
					} else {
						$('<span>').html('--').appendTo($td7);
					}
					$td7.appendTo('.tr6');
				}
			})
			$.each(data[1208],function(key,value){
				if(minnumber > key){
					var $td8 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td8);
					} else {
						$('<span>').html('--').appendTo($td8);
					}
					$td8.appendTo('.tr7');
				}
			})
			$.each(data[3953],function(key,value){
				if(minnumber > key){
					var $td9 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td9);
					} else {
						$('<span>').html('--').appendTo($td9);
					}
					$td9.appendTo('.tr8');
				}
			})
			$.each(data[3955],function(key,value){
				if(minnumber > key){
					var $td5 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td5);
					} else {
						$('<span>').html('--').appendTo($td5);
					}
					$td5.appendTo('.tr9');
				}
			})

		$(".tr td:first").css("color","#E7161A");
		$.each($(".contentbottom td span"),function(key,value){
			if($(this).html() == "换"){
				$(this).css({"color":"#E7161A","font-size":"16px"})
			}else if($(this).html() == "--"){
				$(this).css({"color":"green","font-size":"16px"})
			}
		})
	},error:function(data){
		//console.log(data);
	}
})








