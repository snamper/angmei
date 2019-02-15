var network = localStorage.getItem("network");

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var product_id =getUrlParam('?id');
// console.log(oenumber)
getCar();
function getCar(){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/OeInterface/queryPrductCars",
		data:{
			"product_id":product_id
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			$.each(data,function(key,value){
				var tr = $("<tr>");
				tr.html("<td>"+value.mikey+"</td><td>"+value.Manufacture_CN+"</td><td>"+value.Name_of_sales+"</td><td>"+value.Vehicle_Name_CN+"</td><td>"+value.Year_of_production+"</td><td><button class='del_tr size-S btn btn-danger radius'>刪除</button></td>");
				tr.appendTo(".tab tbody");
			})
			$(function () {
		        $('#example').DataTable({
		            columns:[
		                {data:"firstname"},
		                {data:"lastname"},
		                {data:"phone"},
		                {data:"one"},
		                {data:"two"},
		                {data:"three"}
		            ]
		        });
		    });
		}
	})	
}
//删除
$(document).on("click",".del_tr",function(){
	// console.log($(this).parent("td").parent("tr").children("td:eq(0)").html())
	var mikey = $(this).parent("td").parent("tr").children("td:eq(0)").html();
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/BrandController/deleteMikeyProduct",
		data:{
			"product_id":product_id,
			"mikey":mikey
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			alert("删除成功");
			window.location.reload();
		}
	})
})

$("#add_mikey").click(function(){
	if($("#city2").val() == ""){
		alert("主机厂不能为空");
		return false;
	}
	var str = new Array();
	$.each($("#car_table td .select_div"),function(key,value){
		str.push($(this).attr('class').split(" ")[1].split("select_")[1])
	})
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
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/CarMatchController/getFilterCars",
		dataType: "json",
		data:_data,
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			console.log(data);
		},
		error: function(data) {
			// console.log(data)
		}
	})
})
