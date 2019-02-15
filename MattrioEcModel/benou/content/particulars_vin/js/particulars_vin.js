$(".runtasclor").click(function(){
	window.location.href="../../index.html";
})

var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id"); 
var particulars = JSON.parse(localStorage.particulars);
console.log(particulars)
if(particulars.list.length==0||particulars.list==[]){
		var $li = $("<li>");
		var $a = $("<a href='#'>");
		var $p1 = $("<p class='listimg'>");		
		var $img = $("<img src='../../image/blank.jpg'>");
		$img.appendTo($p1);
		var $p = $("<p class='listtle'>").html(particulars.car_info[0].Manufacture_CN);
		var $p4 = $("<p class='listtex'>").html("车型："+particulars.car_info[0].Vehicle_Name_CN);
		var $p7 = $("<p class='listtex'>").html("排量："+particulars.car_info[0].Capacity);
		var $p5 = $("<p class='listtex'>").html("年款："+particulars.car_info[0].LaunchEOPYear);
		var $p8 = $("<p class='listtex'>").html("发动机型号："+particulars.car_info[0].Engine_Code);
		$p1.appendTo($a);
		$p.appendTo($a);
		$p4.appendTo($a);
		$p5.appendTo($a);
		$p7.appendTo($a);
		$p8.appendTo($a);
		$a.appendTo($li);
		$li.appendTo($(".content ul"));
}else{
	$.each(particulars.list,function(key,value){
		var $li = $("<li>");
		var $a = $("<a href='#'>");
		var $p1 = $("<p class='listimg'>");		
		var $img = $("<img src='"+network+"/MattrioEcModel/upload/img/bengou/"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
		$img.appendTo($p1);
		var $p = $("<p class='listtle'>").html(value.category_name);
		var $p3 = $("<p class='listtex'>").html("奔欧编码："+value.product_id);
		var $p4 = $("<p class='listtex'>").html("车型："+particulars.car_info[0].Manufacture_CN+" "+particulars.car_info[0].Vehicle_Name_CN+particulars.car_info[0].Capacity);
		var $p5 = $("<p class='listtex'>").html("年款："+particulars.car_info[0].LaunchEOPYear);
		var $p7 = $("<p class='listtex'>").html("必能编码："+value.oenumber);
		var $p8 = $("<p class='listtex'>").html("发动机型号："+particulars.car_info[0].Engine_Code);
		$p1.appendTo($a);
		$p.appendTo($a);
		$p3.appendTo($a);
		$p4.appendTo($a);
		$p5.appendTo($a);
		$p7.appendTo($a);
		$p8.appendTo($a);
	
		$a.appendTo($li);
		$li.appendTo($(".content ul"));
		
	})
}


//$("li").click(function(){
//  window.location.href="../oeinfo/oeinfo.html?id="+$(this).index();
//})






