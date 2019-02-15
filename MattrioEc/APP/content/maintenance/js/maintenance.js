var network = localStorage.getItem("network");
var year = JSON.parse(localStorage.year);
// console.log(year);
var mikey = year.mikey;
//console.log(network)


$("#loading").show();
$.ajax({
	type:"get",
	url:network+"/Mattrio/OeInterface/getByCategorys",
	data:{
		"mikey":year.mikey
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		// console.log(data)
		$("#loading").hide();
		if(data.Categorys.length == 0){
			alert("暂无数据");
			window.location.href = "javascript:history.back();";
		}
		$.each(data.Categorys,function(key,value){
			//console.log(value);
			var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+value.img+"'>");
			var p1 = $("<p class='listimg'>");
			img.appendTo(p1);
			var p2 = $("<p class='listtle'>").html(value.category_name);
			var li = $("<li>");
			p1.appendTo(li);
			p2.appendTo(li);
			li.appendTo(".content ul");
		})


		$(".content ul li").click(function(){
			$("#loading").show();
			localStorage.setItem("img",data.Categorys[$(this).index()].img);
			localStorage.setItem("oename",data.Categorys[$(this).index()].category_name);
			$("#loading").show();
			var category_id = data.Categorys[$(this).index()].category_id;
			$.ajax({
				type:"post",
				url:network+"/MattrioEc/OEIntface/queryPrductOfCategory",
				data:{
					"mikey":mikey,
					"category_id":category_id
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					$("#loading").hide();
					//console.log(data);
					localStorage.oe =JSON.stringify(data);
					window.location.href = "../particulars/particulars.html"
				},
				error:function(data){
					//console.log(data);
				}
			})

		})
		
	},
	error:function(data){
		//console.log(data);
	}
})



