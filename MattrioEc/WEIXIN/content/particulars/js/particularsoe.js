
var network = localStorage.getItem("network");
var oe = JSON.parse(localStorage.oe);
//console.log(oe);


$(".td1").html("<span>"+oe.oes.oe_numbers+"</span>");
$(".td2").html("<span>"+oe.oes.category_name+"</span>");
localStorage.setItem("img",oe.oes.category_img);
localStorage.setItem("oename",oe.oes.category_name);


$.each(oe.products,function(key,value){
	// console.log(value);
	var img = $("<img src='http:www.51macc.com//Mattrio/static/images/brands/"+value.brand_img+"'>");
	var p1 = $("<p class='listimg'>");
	img.appendTo(p1);
	var p2 = $("<p class='listtle'>").html("产品编号："+value.product_id);
	var p3 = $("<p class='listtle'>").html("品牌："+value.brand_name);
	
	var p5 = $("<p class='listtex'>");
	var button = $("<button>").html("查看明细");
	button.appendTo(p5);
	var li =$("<li>");
	p1.appendTo(li);
	p2.appendTo(li);
	p3.appendTo(li);

	p5.appendTo(li);
	li.appendTo(".content ul")
})



$(".listtex button").click(function(){
	var num = $(this).parent().parent().index();
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/MattrioEc/OEIntface/queryPrductDetail",
		data:{
			"product_id":oe.products[num].product_id,
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(data == [] || data.length == 0){
				$(".alert").show();
				return false;
			}
			localStorage.prod =JSON.stringify(data);
			window.location.href="../oeinfo/oeinfo.html";
		},
		error:function(data){
			//console.log(data);
		}
	})
})


$(".alert_bottom").click(function(){
	$(".alert").hide();
})



