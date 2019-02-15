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
	var table = $("<table>");
	var tr1 = $("<tr>");
	var tr2 = $("<tr>");
	var th1 = $("<th>").html("主机厂");
	var td1 = $("<td>").html(value.Manufacture_CN);
	var th2 = $("<th>").html("通用OE");
	var td2 = $("<td>").html(value.oe_numbers);

	th1.appendTo(tr1);
	td1.appendTo(tr1);
	th2.appendTo(tr2);
	td2.appendTo(tr2);
	tr1.appendTo(table);
	tr2.appendTo(table);
	table.appendTo(".proct");
})

