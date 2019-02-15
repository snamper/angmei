
var network = localStorage.getItem("networkmodel");
var oe = JSON.parse(localStorage.oe);

// console.log(oe)

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var oenumber = getUrlParam('?oenumber');
var oename = getUrlParam('?oename');


$(".td1").html(oenumber);
$(".td2").html(oename);



$.each(oe.products,function(key,value){
	//console.log(value);
	var img = $("<img src='"+value.brand_img+"'>");
	var p1 = $("<p class='listimg'>");
	img.appendTo(p1);
	var p2 = $("<p class='listtle'>").html("产品编号："+value.product_id);
	var p3 = $("<p class='listtle'>").html("品牌："+value.brand_name);
	//var p4 = $("<p class='listtle'>").html("分类："+value.other);
	
	var li =$("<li>");
	p1.appendTo(li);
	p2.appendTo(li);
	p3.appendTo(li);
	//p4.appendTo(li);
	li.appendTo(".content ul")
})









