
var network = localStorage.getItem("network");
var oe = JSON.parse(localStorage.oe);

if(oe.oes.length == 0 || oe.oes ==[]){
	$(".td1").html("暂无OE号码");
}else{
	$(".td1").html(oe.oes[0].oe_numbers);
	$(".td2").html(oe.oes[0].category_name);
	$(".td3").html(oe.oes[0].other);
}




$.each(oe.products,function(key,value){
	//console.log(value);
	var img = $("<img src='"+value.brand_img+"'>");
	var p1 = $("<p class='listimg'>");
	img.appendTo(p1);
	var p2 = $("<p class='listtle'>").html("产品编号："+value.product_id);
	var p3 = $("<p class='listtle'>").html("品牌："+value.brand_name);
	//var p4 = $("<p class='listtle'>").html("分类："+value.other);
	var p5 = $("<p class='listtex'>");
	var button = $("<button>").html("查看明细");
	button.appendTo(p5);
	var li =$("<li>");
	p1.appendTo(li);
	p2.appendTo(li);
	p3.appendTo(li);
	//p4.appendTo(li);
	p5.appendTo(li);
	li.appendTo(".content ul")
})



$(".listtex button").click(function(){
	$("#loading").show();
	var num = $(this).parent().parent().index();
	//console.log(num);
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
				alert("暂无数据");
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






