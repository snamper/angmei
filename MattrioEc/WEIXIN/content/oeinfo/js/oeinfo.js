var network = localStorage.getItem("network");
var img = localStorage.getItem("img");
var oename = localStorage.getItem("oename");
var prod = JSON.parse(localStorage.prod);

if(img == "undefined" ||　img == ""){
	$("<img src='../../image/blank.jpg'>").appendTo(".contentimg");
}else{
	$("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+img+"'>").appendTo(".contentimg");
}

$(".contentdiv").html(oename);

$.each(prod,function(key,value){
	var ul = $("<ul class='clearfix'>");
	var li1 = $("<li class='name_left name_top'>").html("<span>主机厂</span>");
	var li2 = $("<li class='name_right name_top'>").html(value.Manufacture_CN);
	var li3 = $("<li class='name_left'>").html("<span>通用OE</span>");
	var li4 = $("<li class='name_right'>").html(value.oe_numbers);

	li1.appendTo(ul);
	li2.appendTo(ul);
	li3.appendTo(ul);
	li4.appendTo(ul);
	ul.appendTo(".proct");
})

