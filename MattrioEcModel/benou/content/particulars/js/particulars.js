$(".runtasclor").click(function(){
	window.location.href="../../index.html";
})

var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id"); 
var particulars = JSON.parse(localStorage.particulars);

var arr = particulars.list;
var hash = {};
var result = [];
for(var i = 0, len = arr.length; i < len; i++){
    if(!hash[arr[i].product_id]){
        result.push(arr[i]);
        hash[arr[i].product_id] = true;
    }
}
console.log(result)
$.each(result,function(key,value){
	var $li = $("<li>");
	var $a = $("<a href='#'>");
	var $p1 = $("<p class='listimg'>");		
	var $img = $("<img src='"+network+"/MattrioEcModel/upload/img/bengou/"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
	$img.appendTo($p1);
	var $p = $("<p class='listtle'>").html(value.category_name);
	var $p2 = $("<p class='listtle'>").html(value.category);
	var $p3 = $("<p class='listtex'>").html("奔欧编码："+value.product_id);
	var $p4 = $("<p class='listtex'>").html("车型："+value.Manufacture_CN+" "+value.Vehicle_Name_CN+value.Capacity);
	var $p5 = $("<p class='listtex'>").html("年款："+value.LaunchEOPYear);
	var $p7 = $("<p class='listtex'>").html("必能编码："+value.oenumber);
	var $p8 = $("<p class='listtex'>").html("发动机型号："+value.Engine_Code);
	$p1.appendTo($a);
	$p.appendTo($a);
	$p2.appendTo($a);
	$p3.appendTo($a);
	$p4.appendTo($a);
	$p5.appendTo($a);
	$p7.appendTo($a);
	$p8.appendTo($a);

	$a.appendTo($li);
	$li.appendTo($(".content ul"));
	
})


$("li").click(function(){
    window.location.href="../oeinfo/oeinfo.html?id="+$(this).index();
})






