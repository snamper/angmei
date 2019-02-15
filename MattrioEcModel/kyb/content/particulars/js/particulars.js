$(".runtasclor").click(function(){
	window.location.href="../../index.html";
})

var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id"); 
var particulars = JSON.parse(localStorage.particulars);
console.log(particulars)
//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

var brand = getUrlParam('?brand');

if(brand == null){
	$.each(particulars.list,function(key,value){
		var $li = $("<li>");
		var $a = $("<a href='#'>");
		var $p1 = $("<p class='listimg'>");		
		var $img = $("<img src='"+network+"/MattrioEcModel/upload/img/sp/"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
		$img.appendTo($p1);
		var $p = $("<p class='listtle'>").html(value.category_name);
		if(value.product_id){
			var $p3 = $("<p class='listtle_p'>").html(value.product_id);
		}else{
			var $p3 = $("<p class='listtle_p'>").html("暂无编号");
		}
		var $p4 = $("<p class='listtex'>").html("车型："+value.Manufacture_CN+" "+value.Vehicle_Name_CN);
		var $p5 = $("<p class='listtex'>").html("OE："+value.oenumber);
		var $p6 = $("<p class='listtex'>").html("排量："+value.Capacity);
		$p1.appendTo($a);
		$p.appendTo($a);
		$p3.appendTo($a);
		$p4.appendTo($a);
		$p6.appendTo($a);
		$p5.appendTo($a);
		$a.appendTo($li);
		$li.appendTo($(".content ul"));
	})
}else{
	var $li = $("<li>");
	var $a = $("<a href='#'>");
	var $p1 = $("<p class='listimg'>");		
	var $img = $("<img src='"+network+"/MattrioEcModel/upload/img/sp/"+particulars.list[0].img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
	$img.appendTo($p1);
	var $p = $("<p class='listtle'>").html(particulars.list[0].category_name);
	if(particulars.list[0].product_id){
		var $p3 = $("<p class='listtle_p'>").html(particulars.list[0].product_id);
	}else{
		var $p3 = $("<p class='listtle_p'>").html("暂无编号");
	}
	var $p4 = $("<p class='listtex'>").html("车型："+particulars.list[0].Manufacture_CN+" "+particulars.list[0].Vehicle_Name_CN);
	var $p5 = $("<p class='listtex'>").html("年款："+particulars.list[0].oenumber);
	var $p6 = $("<p class='listtex'>").html("排量："+particulars.list[0].Capacity);
	$p1.appendTo($a);
	$p.appendTo($a);
	$p3.appendTo($a);
	$p4.appendTo($a);
	$p6.appendTo($a);
	$p5.appendTo($a);
	$a.appendTo($li);
	$li.appendTo($(".content ul"));
}




$("li").click(function(){
    window.location.href="../oeinfo/oeinfo.html?id="+$(this).index()+"&mikey="+particulars.list[$(this).index()].mikey;
})

