$(".runtasclor").click(function(){
	if($(".ul1").css("display")=="none"){
		$(".ul1").show()
		$(".ul2").hide()
	}else{
		window.location.href="../../index.html";
	}

})

var network = localStorage.getItem("network");
var username_id = localStorage.getItem("username_id"); 
var particulars = JSON.parse(localStorage.particulars);
//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

var brand = getUrlParam('?brand');

if(brand == null){
	var Harr=[]
	var Sarr=[]
	var Darr=[];
	$.each(particulars.list,function(key,value){
		if(value.category_name.substr(0,1)=='H'){
			Harr.push({
				content:value,
				index:key
			})
		}else if(value.category_name.substr(0,1)=='S'){
			Sarr.push({
					content:value,
					index:key
				})
		}else if(value.category_name.substr(0,1)=='D'){
			Darr.push({
				content:value,
				index:key
			})
		}
	})
	if(Harr.length>0){
			var $li = $("<li class='li1'>");
			var $a = $("<a href='#' class='clearfix'>");
			var $p1 = $("<p class='listimg'>");	
			var $img = $("<img class='img1' src='../../image/D.jpg'\>");
			$img.appendTo($p1);
			var $p = $("<p class='listtle right'>").html("米其林混合式雨刮器");
			$p1.appendTo($a);
			$p.appendTo($a);
			$a.appendTo($li);
			$li.appendTo($(".content .ul1"));		
	}
	if(Sarr.length>0){
			var $li = $("<li class='li1'>");
			var $a = $("<a href='#' class='clearfix'>");
			var $p1 = $("<p class='listimg'>");	
			var $img = $("<img class='img2' src='../../image/H.jpg'\>");
			$img.appendTo($p1);
			var $p = $("<p class='listtle right''>").html("米其林S2混合式雨刮器");
			$p1.appendTo($a);
			$p.appendTo($a);
			$a.appendTo($li);
			$li.appendTo($(".content .ul1"));
	}
	if(Darr.length>0){
			var $li = $("<li class='li1'>");
			var $a = $("<a href='#' class='clearfix'>");
			var $p1 = $("<p class='listimg' >");	
			var $img = $("<img class='img3' src='../../image/S.jpg'\>");
			$img.appendTo($p1);
			var $p = $("<p class='listtle right''>").html("后风挡雨刮片");
			$p1.appendTo($a);
			$p.appendTo($a);
			$a.appendTo($li);
			$li.appendTo($(".content .ul1"));
	}
}else{
	var $li = $("<li class='li2' id='0'>");
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
	$li.appendTo($(".content .ul1"));
}




$(".li1").click(function(){
	$(".ul1").hide()
	$(".ul2").html("")
	$(".ul2").show()
	if($(this).find(".listtle").text()=="米其林混合式雨刮器"){
		fun(Harr)	
	}else if($(this).find(".listtle").text()=="米其林S2混合式雨刮器"){
		fun(Sarr)
	}else if($(this).find(".listtle").text()=="后风挡雨刮片"){
		fun(Darr)
	}
})
$(document).on("click",".li2",function(){
	 window.location.href="../oeinfo/oeinfo.html?id="+$(this).attr('id')+"&mikey="+particulars.list[$(this).index()].mikey;
})
   

function fun(arr){
	$.each(arr,function(key,value){
			var $li = $("<li class='li2' id="+value.index+">");
			var $a = $("<a href='#'>");
			var $p1 = $("<p class='listimg'>");		
			var $img = $("<img src='"+network+"/MattrioEcModel/upload/img/sp/"+value.content.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
			$img.appendTo($p1);
			var $p = $("<p class='listtle'>").html(value.content.category_name.substring(1));
			if(value.content.product_id){
				var $p3 = $("<p class='listtle_p'>").html(value.content.product_id);
			}else{
				var $p3 = $("<p class='listtle_p'>").html("暂无编号");
			}
			var $p4 = $("<p class='listtex'>").html("车型："+value.content.Manufacture_CN+" "+value.content.Vehicle_Name_CN);
			var $p5 = $("<p class='listtex'>").html("OE："+value.content.oenumber);
			var $p6 = $("<p class='listtex'>").html("排量："+value.content.Capacity);
			$p1.appendTo($a);
			$p.appendTo($a);
			$p3.appendTo($a);
			$p4.appendTo($a);
			$p6.appendTo($a);
			$p5.appendTo($a);
			$a.appendTo($li);
			$li.appendTo($(".content .ul2"));
		})
}
