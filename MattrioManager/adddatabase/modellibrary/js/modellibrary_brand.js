// localStorage.setItem("network","http://192.168.125.112:8080");
var network = localStorage.getItem("network");

function picture_add(){
	// window.location.href = "longmikey_add.html";
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

var type_num = getUrlParam('?type');

$(".select_div div").click(function(){
	$(this).next("ul").toggle();
	$(".select_div1 ul").hide();
	$(this).parent("div").parent("td").siblings("td").children("div").children("ul").hide()
})
$(".select_div ul li").click(function(){
	$(this).parent("ul").prev("div").html($(this).html());
	$(this).parent("ul").hide();
})
$(".select_div1 div").click(function(){
	$(this).next("ul").toggle();
	$(".select_div ul").hide();
	$(this).parent("div").parent("td").siblings("td").children("div").children("ul").hide()
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

$(document).bind('click',function(){
	$('.select_div1 ul').css('display','none');
});
$('.select_div1').bind('click',function(e){
	stopPropagation(e);
});

var vals = new Array;
$.each($("#tab_id").find("tr td:nth-of-type(3)"), function(i, el) {
	vals[vals.length] = $(el).text();
});
// console.log($.unique(vals));

//获取主机厂
$.ajax({
	type: "post",
	url:  network+"/MattrioManager/CarMatchController/getManufacture",
	dataType: "json",
	data:{
		type:type_num
	},
	cache: false,
	crossDomain: true == !(document.all),
	success: function(data) {
		commoncitys.splice(0, commoncitys.length);
		for(var i = 0; i < data.all.length; i++) {
			commoncitys[i] = data.all[i];
		}
	},
	error: function(data) {
		// console.log(data)
	}
})

// 
$("#btn_sure").click(function(){
	$(".select_div").remove();
	$(".select_rem").remove();
	if($("#idDuoXuan").html() == "选择您需要的字段"){
		alert("还没有选择字段");
		return false;
	}
	var arr = $("#idDuoXuan").html().split(",");
	var arr_ = $("#idDuoXuan").attr("data-id").split("-");
	$.each(arr_,function(key,value){
		var td = $("<td class='select_rem'>");
		var div = ("<div class='select_div selectdiv_"+value+"'><div>不选择</div><ul><li></li></ul></div>");
		td.append(div);
		$(".add_td").before(td);
	})
	$("#tab_id thead tr").html("");
	var th1 = $("<th>").html("<input type='checkbox' name='' value='' class='inp_id'>");
	var th2 = $("<th>").html("ID");
	var th3 = $("<th>").html("主机厂");
	th1.appendTo("#tab_id thead tr");
	th2.appendTo("#tab_id thead tr");
	th3.appendTo("#tab_id thead tr");
	$.each(arr,function(key,value){
		var th = $("<th class='select_rem'>").html(value);
		$(".add_th").before(th);
		var th3 = $("<th>").html(value);
		th3.appendTo("#tab_id thead tr");
	})

	$(".select_div div").click(function(){
		var name = $(this).parents(".select_div").attr('class').split(" ")[1].split("selectdiv_")[1];
		$(".selectdiv_"+name+" ul").html("");
		if($("#arrcity").val() == ""){
			alert("主机厂不能为空");
			$(".select_"+name+" ul").hide();
			return false;
		}
		var Manufacture_CN ="Manufacture_CN=" + $("#arrcity").val();
		var Manufacture_CN1 ="Manufacture_CN";
		// 或去点击类
		
		var str = arr_;
		var str_ = new Array;
		$.each(str,function(key,value){
			if(name == value){

			}else{
				str_.push(value);
			}
		})
		var parm = "";
		var parm1 = "";
		var class_name = "";
		var class_name1= "";
		
		// 遍历组件_data
		$.each(str_,function(k,v){
			if($(".selectdiv_"+v+" div").html() == "不选择"){
				var class_name = "";
				var class_name1 = "";
			}else{
				var class_name ="&"+v+"=" + $(".selectdiv_"+v+" div").html();
				var class_name1 =","+v;
			}
			parm += class_name;
			parm1 += class_name1;
		})
		var _data = Manufacture_CN+parm+"&query_parameter="+name+"&type="+type_num+"&parameters="+Manufacture_CN1+parm1;

		$(".selectdiv_"+name+" ul").html("");
		$.ajax({
			type: "post",
			url:  network+"/MattrioManager/CarMatchController/getCarParameterFilterValue",
			dataType: "json",
			data:_data,
			cache: false,
			crossDomain: true == !(document.all),
			success: function(data) {
				var li1 = $("<li>").html("不选择");
				$(".selectdiv_"+name+" ul").append(li1);
				$(".selectdiv_"+name+" ul").show();
				$.each(data.list,function(key,value){
					var li = $("<li>").html(value[name]);
					$(".selectdiv_"+name+" ul").append(li);
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
})
$("#add").click(function(){
	var str = $("#idDuoXuan").attr("data-id").split("-");
	if($("#arrcity").val() == ""){
		alert("主机厂不能为空");
		return false;
	}
	
	var Manufacture_CN ="Manufacture_CN=" + $("#arrcity").val();
	var Manufacture_CN1 ="Manufacture_CN";
	// 遍历组件_data
	var parm = "";
	var parm1 = "";
	var class_name = "";
	var class_name1= "";
	$.each(str,function(k,v){
		if($(".selectdiv_"+v+" div").html() == "不选择"){
			var class_name = "";
			var class_name1 = "";
		}else{
			var class_name ="&"+v+"=" + $(".selectdiv_"+v+" div").html();
			var class_name1 =","+v;
		}
		parm += class_name;
		parm1 += class_name1;
	})
	var _data = Manufacture_CN+parm+"&car_fileds="+Manufacture_CN1+","+str.join(",")+"&type="+type_num+"&parameters="+Manufacture_CN1+parm1;
	$("#tab_id tbody").html("");
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/CarMatchController/getFilterCars",
		dataType: "json",
		data:_data,
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$.each(data.list,function(key,value){
				var _value = value;
				var tr = $("<tr>");
				var td1 = $("<td>").html("<input type='checkbox' name='new_gay' value=''>");
				var td2 = $("<td>").html(value.car_id);
				var td3 = $("<td>").html(value.Manufacture_CN);
				td1.appendTo(tr);
				td2.appendTo(tr);
				td3.appendTo(tr);
				$.each(str,function(k,v){
					var td = $("<td>").html(_value[v]);
					td.appendTo(tr);
				})
				tr.appendTo("#tab_id tbody");
			})
		},
		error: function(data) {
			// console.log(data)
		}
	})
})



// 获取mikey
$.ajax({
	type: "post",
	url: network+"/MattrioManager/CarManager/getManufacture",
	dataType: "json",
	data:{
		type:"macc"
	},
	cache: false,
	crossDomain: true == !(document.all),
	success: function(data) {
		citys.splice(0, citys.length);
		for(var i = 0; i < data.all.length; i++) {
			citys[i] = data.all[i];
		}
	},
	error: function(data) {
		// console.log(data)
	}
})
$("#btn_mikey").click(function(){
	$(".select_div1").remove();
	// $(".select_rem").remove();
	if($("#mikeyDuoXuan").html() == "选择您需要的字段"){
		alert("还没有选择字段");
		return false;
	}
	var arr = $("#mikeyDuoXuan").html().split(",");
	var arr_ = $("#mikeyDuoXuan").attr("data-id").split("-");
	$.each(arr_,function(key,value){
		var td = $("<td class='select_mieky'>");
		var div = ("<div class='select_div1 select_"+value+"'><div>不选择</div><ul><li></li></ul></div>");
		td.append(div);
		$(".add_mikey_td").before(td);
	})
	$("#tab_mikey thead tr").html("");
	var th1 = $("<th>").html("<input type='checkbox' name='' value='' class='inp_mikey'>");
	var th2 = $("<th>").html("mi-key");
	var th3 = $("<th>").html("主机厂");
	th1.appendTo("#tab_mikey thead tr");
	th2.appendTo("#tab_mikey thead tr");
	th3.appendTo("#tab_mikey thead tr");
	$.each(arr,function(key,value){
		var th = $("<th class='select_mieky'>").html(value);
		$(".add_mikey_th").before(th);
		var th3 = $("<th>").html(value);
		th3.appendTo("#tab_mikey thead tr");
	})

	$(".select_div1 div").click(function(){
		var name = $(this).parents(".select_div1").attr('class').split(" ")[1].split("select_")[1];

		$(".select_"+name+" ul").html("");
		if($("#city2").val() == ""){
			alert("主机厂不能为空");
			$(".select_"+name+" ul").hide();
			return false;
		}
		var Manufacture_CN ="Manufacture_CN=" + $("#city2").val();
		var Manufacture_CN1 ="Manufacture_CN";
		// 或去点击类
		
		var str = arr_;
		var str_ = new Array;
		$.each(str,function(key,value){
			if(name == value){

			}else{
				str_.push(value);
			}
		})
		var parm = "";
		var parm1 = "";
		var class_name = "";
		var class_name1= "";
		
		// 遍历组件_data
		$.each(str_,function(k,v){
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
		var _data = Manufacture_CN+parm+"&query_parameter="+name+"&type=macc&parameters="+Manufacture_CN1+parm1;

		$(".select_"+name+" ul").html("");
		$.ajax({
			type: "post",
			url:  network+"/MattrioManager/CarMatchController/getCarParameterFilterValue",
			dataType: "json",
			data:_data,
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
				$(".select_div1 ul li").click(function(){
					$(this).parent("ul").prev("div").html($(this).html());
					$(this).parent("ul").hide();
				})
			},
			error: function(data) {
				// console.log(data)
			}
		})
	})
})

$("#add_mikey").click(function(){
	var str = $("#mikeyDuoXuan").attr("data-id").split("-");
	if($("#city2").val() == ""){
		alert("主机厂不能为空");
		return false;
	}
	
	var Manufacture_CN ="Manufacture_CN=" + $("#city2").val();
	var Manufacture_CN1 ="Manufacture_CN";
	// 遍历组件_data
	var parm = "";
	var parm1 = "";
	var class_name = "";
	var class_name1= "";
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
	var _data = Manufacture_CN+parm+"&car_fileds="+Manufacture_CN1+","+str.join(",")+"&type=macc&parameters="+Manufacture_CN1+parm1;
	$("#tab_mikey tbody").html("");
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/CarMatchController/getFilterCars",
		dataType: "json",
		data:_data,
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$.each(data.list,function(key,value){
				var _value = value;
				var tr = $("<tr>");
				var td1 = $("<td>").html("<input type='checkbox' name='gay' value=''>");
				var td2 = $("<td>").html(value.mikey);
				var td3 = $("<td>").html(value.Manufacture_CN);
				td1.appendTo(tr);
				td2.appendTo(tr);
				td3.appendTo(tr);
				$.each(str,function(k,v){
					var td = $("<td>").html(_value[v]);
					td.appendTo(tr);
				})
				tr.appendTo("#tab_mikey tbody");
			})
		},
		error: function(data) {
			// console.log(data)
		}
	})
})


$("#addCarname").click(function(){
	$(".mieky_id tbody").html("");
	var newid_array=new Array();
	$('#tab_id input[name="new_gay"]:checked').each(function(){
	    newid_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});
	var id_array = new Array();
	$('#tab_mikey input[name="gay"]:checked').each(function(){
	    id_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});

	if(newid_array.length == 0 || id_array.length == 0 || newid_array.length == [] || id_array.length == []){
		alert("选择您要匹配的数据");
		return false;
	}

	$.each(newid_array,function(key,value){
		var _value = value;
		$.each(id_array,function(k,v){
			var tr = $("<tr>");
			var td1 = $("<td>").html(_value);
			var td2 = $("<td>").html(v);
			var td3 = $("<td>").html("<button class='del_tr btn btn-danger radius'>删除</button>");
			td1.appendTo(tr);
			td2.appendTo(tr);
			td3.appendTo(tr);
			tr.appendTo(".mieky_id tbody");
		})
	})
	$(".del_tr").click(function(){
		$(this).parent().parent().remove();
	})
})

$("#addid_mikey").click(function(){
	var jsonArray = new Array();
	var jsonObj = new Object();
	var type = "type"+type_num

	$.each($(".mieky_id tbody tr"),function(k,v){
		jsonObj.mikey = $(v).find("td:eq(1)").html();
		jsonObj[type] = $(v).find("td:eq(0)").html();
		jsonArray.push(jsonObj);
	})
	var carid_array = JSON.stringify(jsonArray);
	if(carid_array == "[]"){
		alert("选择您要匹配的数据");
		return false;
	}
	if (confirm("是否添加")) {
        $.ajax({
            type: "post",
            url: network + "/MattrioManager/CarMatchController/updateMikeyCarids",
            data: {
                "carid_array":carid_array
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
				alert(data.msg);
            }
        })
    }
})
