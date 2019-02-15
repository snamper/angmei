$(".runtasclor").click(function(){
	window.location.href="../../index.html";
})

var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id"); 
var particulars = JSON.parse(localStorage.particulars);
localStorage.setItem('result',JSON.stringify(particulars.list))
$.each(particulars.list,function(key,value){
	var $li = $("<li>");
	var $a = $("<a href='#'>");
	var $p1 = $("<p class='listimg'>");	
	var $img = $("<img src='http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/aohan/"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
	$img.appendTo($p1);
	var $p = $("<p class='listtle'>").html(value.category_name);
	var $p2 = $("<p class='listtle'>").html(value.category);
	var $p3 = $("<p class='listtex'>").html("产品编号："+value.product_id);
	var $p4 = $("<p class='listtex'>").html("车型："+particulars.car_info[0].Manufacture_CN+" "+particulars.car_info[0].Vehicle_Name_CN);
	var $p5 = $("<p class='listtex'>").html("年款："+particulars.car_info[0].LaunchEOPYear);
	var $p6 = $("<p class='listtex'>").html("排量："+particulars.car_info[0].Capacity);
	$p1.appendTo($a);
	$p.appendTo($a);
	$p2.appendTo($a);
	$p3.appendTo($a);
	$p4.appendTo($a);
	$p5.appendTo($a);
	$p6.appendTo($a);

	$a.appendTo($li);
	$li.appendTo($(".content ul"));
	
})


$("li").click(function(){
    window.location.href="../oeinfo/oeinfo.html?id="+$(this).index();
})






