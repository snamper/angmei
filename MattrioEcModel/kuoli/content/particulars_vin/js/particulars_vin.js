$(".runtasclor").click(function(){
	window.location.href="../../index.html";
})

//获取通过url传的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}
var vin_year = getUrlParam('?year');

var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
var particulars = JSON.parse(localStorage.particulars);

$(".span1").html(particulars.car_info[0].Manufacture_CN);
$(".span2").html(particulars.car_info[0].Country);
$(".span3").html(particulars.car_info[0].Vehicle_Name_CN);
$(".span4").html(particulars.car_info[0].Capacity);
$(".span5").html(particulars.car_info[0].Vehicle_body_type);
$(".span6").html(particulars.car_info[0].Engine_Code);
$(".span7").html(particulars.car_info[0].Injection_type);
$(".span8").html(particulars.car_info[0].Drive_type);
$(".span9").html(vin_year);
$(".span10").html(particulars.car_info[0].KW);

$.each(particulars.list,function(key,value){
	var $li = $("<li>");
	var $a = $("<a href='#'>");
	var $p1 = $("<p class='listimg'>");		
	var $img = $("<img src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/kuoli/"+value.product_id+".jpg' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
	$img.appendTo($p1);
	var $p = $("<p class='listtle'>").html(value.category_name);
	var $p2 = $("<p class='listtle'>").html(value.category);
	if(value.product_id){
		var $p3 = $("<p class='listtle_p'>").html(value.product_id);
	}else{
		var $p3 = $("<p class='listtle_p'>").html("暂无编号");
	}
	var $p4 = $("<p class='listtex'>").html("车型："+particulars.car_info[0].Manufacture_CN+" "+particulars.car_info[0].Vehicle_Name_CN);
	var $p5 = $("<p class='listtex'>").html("OE："+value.oenumber);
	var $p6 = $("<p class='listtex'>").html("排量："+particulars.car_info[0].Capacity);
	$p1.appendTo($a);
	$p.appendTo($a);
	$p2.appendTo($a);
	$p3.appendTo($a);
	$p4.appendTo($a);
	$p6.appendTo($a);
	$p5.appendTo($a);
	$a.appendTo($li);
	$li.appendTo($(".content ul"));
})


$("li").click(function(){
    window.location.href="../oeinfo/oeinfo.html?id="+$(this).index()+"&mikey="+particulars.car_info[0].mikey;
})






