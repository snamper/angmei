var network = localStorage.getItem("network");
var year = JSON.parse(localStorage.year);
// console.log(year);

var arr;

//点击其他地方隐藏盒子
/*function stopPropagation(e) { 
	if (e.stopPropagation) 
		e.stopPropagation(); 
	else {
		e.cancelBubble = true; 
	}
} 
$(document).bind('click',function(){ 
	$('#s1').addClass('active'); 
	$('#s2').addClass('active'); 
	$('#s3').addClass('active'); 
}); 
$('.s1').bind('click',function(e){ 
	stopPropagation(e); 
});
$('.s2').bind('click',function(e){ 
	stopPropagation(e); 
});
$('.s3').bind('click',function(e){ 
	stopPropagation(e); 
});*/

$(".title img").click(function(){
	$("#s1").addClass("active");
	$("#s2").addClass("active");
	$("#s3").addClass("active");
})



//点击获取配件品牌
$(".s1").click(function(){
	$("#s1").toggleClass("active");
	$("#s2").addClass("active");
	$("#s3").addClass("active");
})
$("#s1 p").click(function(){
	$(".s1").html($(this).html());
	$("#s1").toggleClass("active");

	$("#s2 .cont2").html("");
	$(".s2").html("请选择品牌");

	$("#loading").show();
	var str = ["A","B","C","D","E","F","G"];
	categoryid = str[$(this).index()];
	$.ajax({
		type:"post",
		url:network+"/Mattrio/ProductInterface/getCategory2",
		data:{
			"categoryid":categoryid,
			"mikey":year.mikey
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			arr = data;
			$("#loading").hide();
			$.each(data.list,function(key,value){
				var p = $("<p>").html(value.category_name);
				p.appendTo("#s2 .cont2");
			})
			$(".s2").click();
		},
		error:function(data){
			//onsole.log(data);
		}
	})
})
//点击获取选择品牌
$(".s2").click(function(){
	$("#s2").toggleClass("active");
	$("#s1").addClass("active");
	$("#s3").addClass("active");
	if($(".s1").html() == "请选择分类"){
		$("#s2").addClass("active");
		$(".alert").show();
		$(".alert_big").html("请选择分类");
		$(".alert_sm").html("Please choose the classification");
		return false;
	}
})
var b;
$(".contentsel").on("click","#s2 p",function(){
	$("#s2").toggleClass("active");
	$(".s2").html($(this).html());
	$("#s3 .cont3").html("");
	$(".s3").html("请选择配件");
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/ProductInterface/getCategory3",
		data:{
			"categoryid":arr.list[$(this).index()].category_id,
			"mikey":year.mikey
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			b =data;
			$.each(data.list,function(key,value){
				var p = $("<p>").html(value.category_name);
				p.appendTo("#s3 .cont3");
			})
			$(".s3").click();
		}
	})
})
$(".s3").click(function(){
	if($(".s2").html() == "请选择品类"){
		$("#s3").addClass("active");
		$(".alert").show();
		$(".alert_big").html("请选择品类");
		$(".alert_sm").html("Please choose the category");
		return false;
	}
	if(b.list.length == 0){
		$(".alert").show();
		$(".alert_big").html("抱歉 没有搜到您想要的数据");
		$(".alert_sm").html("Sorry for not searching for the data you want");
		return false;
	}
	$("#s3").toggleClass("active");
	$("#s1").addClass("active");
	$("#s2").addClass("active");
})



$(".div3").on("click","#s3 p",function(){
	$(".s3").html($(this).html());
	$("#s3").toggleClass("active");
	$(".contentsub").removeClass("active");
	$(".contentsou").addClass("active");
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/MattrioEc/ProductInterface/getOeNumber",
		data:{
			"categoryid":b.list[$(this).index()].category_id,
			"mikey":year.mikey
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".contentinp input").val("");
			if(data.list.length == 0 || data.list == []){
				$(".alert").show();
				$(".alert_big").html("抱歉 没有搜到您想要的数据");
				$(".alert_sm").html("Sorry for not searching for the data you want");
				$(".contentsubtab").hide();

			}else{
				$(".contentsubtab").show();
				$(".contentsubtab").html("");
				
				var table = $("<table>");

				var tr2 = $("<tr>");
				var th2 = $("<th>").html("名称");
				var td2 = $("<td>").html(data.list[0].category_name);
				th2.appendTo(tr2);
				td2.appendTo(tr2);
				tr2.appendTo(table);

				var tr1 = $("<tr>");
				var th1 = $("<th>").html("分类");
				var td1 = $("<td>").html(data.list[0].parent_name);
				th1.appendTo(tr1);
				td1.appendTo(tr1);
				tr1.appendTo(table);

				var tr5 = $("<tr>");
				var th5 = $("<th>").html("别名");
				var td5 = $("<td>").html(data.list[0].name1);
				th5.appendTo(tr5);
				td5.appendTo(tr5);
				tr5.appendTo(table);

				var tr3 = $("<tr>");
				var th3 = $("<th>").html("OE号码");
				var td3 = $("<td>").html(data.list[0].oe_numbers);
				th3.appendTo(tr3);
				td3.appendTo(tr3);
				tr3.appendTo(table);

				var tr4 = $("<tr>");
				var th4 = $("<th>").html("4s店价格");
				var td4 = $("<td>").html(data.list[0].system_market_price);
				th4.appendTo(tr4);
				td4.appendTo(tr4);
				tr4.appendTo(table);

				table.appendTo($(".contentsubtab"));
			}
		},
		error:function(data){
			//console.log(data);
		}
	})

})

$(".contentinp button").click(function(){

	if($(".contentinp input").val() == "" || $(".contentinp input").val() == null){
		$(".alert").show();
		$(".alert_big").html("输入内容不能为空");
		$(".alert_sm").html("The input content can not be empty");
		return false;
	}

	$(".s1").html("请选择分类");
	$(".s2").html("请选择品类");
	$(".s3").html("请选择配件");

	var souname = $(".contentinp input").val();
	$(".contentsou").removeClass("active");
	$(".contentsub").addClass("active");
	$(".contentsou").html("");
	$("#loading").show();

	$.ajax({
		type:"post",
		url:network+"/MattrioEc/ProductInterface/LikeQueryOes",
		data:{
			"like_name":encodeURI(souname),
			"mikey":year.mikey
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(data.list.length == 0 || data.list == []){
				$(".alert").show();
				$(".alert_big").html("抱歉 没有搜到您想要的数据");
				$(".alert_sm").html("Sorry for not searching for the data you want");
				return false;
			}
			$.each(data.list,function(key,value){
				//console.log(value);
				
				var p = $("<p>").html(value.category_name);
				var div1 = $("<div class='contentsuboe'>");
				p.appendTo(div1);

				table = $("<table>");

				var tr2 = $("<tr>");
				var th2 = $("<th>").html("分类");
				var td2 = $("<td>").html(value.category_name);
				th2.appendTo(tr2);
				td2.appendTo(tr2);
				tr2.appendTo(table);

				var tr1 = $("<tr>");
				var th1 = $("<th>").html("名称");
				var td1 = $("<td>").html(value.parent_name);
				th1.appendTo(tr1);
				td1.appendTo(tr1);
				tr1.appendTo(table);

				var tr5 = $("<tr>");
				var th5 = $("<th>").html("别名");
				var td5 = $("<td>").html(data.list[0].name1);
				th5.appendTo(tr5);
				td5.appendTo(tr5);
				tr5.appendTo(table);

				var tr3 = $("<tr>");
				var th3 = $("<th>").html("OE信息");
				var td3 = $("<td>").html(value/**/.oe_numbers);
				th3.appendTo(tr3);
				td3.appendTo(tr3);
				tr3.appendTo(table);

				var tr4 = $("<tr>");
				var th4 = $("<th>").html("4s店价格");
				var td4 = $("<td>").html(value/**/.system_market_price);
				th4.appendTo(tr4);
				td4.appendTo(tr4);
				tr4.appendTo(table);

				var div2 = $("<div class='contentsubtab'>")
				table.appendTo(div2);

				div1.appendTo(".contentsou");
				div2.appendTo(".contentsou");
			})
		
		},
		error:function(data){
			//console.log(data);
		}
	})
})

$(".alert_bottom").click(function(){
	$(".alert").hide();
})