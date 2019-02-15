var network = localStorage.getItem("network");
$(".warting").removeClass("active");
// sessionStorage.setItem("pages",1)
// var pages = sessionStorage.getItem("pages");
// console.log(network);


fn();

function fn(){
	var pageindex = 1;
	if($("#inpsubmit").val() == ""){
		var query_str = ""
	}else{
		var query_str = $("#inpsubmit").val().substr(0,12);
	}

	$.ajax({
		url:network+"/MattrioManager/VinFilterController/queryVinMikey",
		type:"post",
		data:{
			"pageindex":pageindex,
			"query_str":query_str
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("tbody").html("");
			$(".alltotal").html(data.listsize);
			$(".warting").addClass("active");
			if(data.list.length == 0){
				$(".wartno").removeClass("active");
			};
			$(".wartno").addClass("active");
			$.each(data.list,function(key,value){
				$("<tr>").html(value+"<td style='text-align: center;'> <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
			});
			//分页
			$(".zxf_pagediv").createPage({
				pageNum: Math.ceil(data.listsize/10),//总页码
				current: Number(pageindex),//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){

					$(".warting").removeClass("active");
					$("tbody").html("");
					var pageindex = e.current;
					$.ajax({
						type:"post",
						url:network+"/MattrioManager/VinFilterController/queryVinMikey",
						data:{
							"pageindex":pageindex,
							"query_str":query_str
						},
						dataType:"json",
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							// console.log(data)
							$(".warting").addClass("active");
							$(".warting").addClass("active");
							if(data.list.length == 0){
								$(".wartno").removeClass("active");
							};
							$(".wartno").addClass("active");
							$.each(data.list,function(key,value){
								$("<tr>").html(value+"<td style='text-align: center;'> <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
							});
						},
						error:function(data){
							console.log(data);
						}
					})
				}
			})
		}
	})
}

//删除
$(document).on("click",".delthis",function(){
	sessionStorage.setItem("pages",$(".current").html());
	var del_mikey = $(this).parents("td").parents("tr").children().eq(0).html();
	var del_vin = $(this).parents("td").parents("tr").children().eq(1).html();
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/VinFilterController/deleteVinMikey",
			data:{
				"mikey":del_mikey,
				"vin":del_vin
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				fn();
			},
			error:function(data){
				console.log(data);
			}
		})
	}
});

$("#btnsubmit").click(function(){
	// console.log($("#inpsubmit").val())
	if($("#inpsubmit").val() == ""){
		alert("输入内容不能为空");
		return false;
	}
	var reg = /^\w{11}([\w]|\w{6})$/;
	if($("#inpsubmit").val().match(reg) == null){
		alert("请填写正确的VIN码");
		return false;
	}
	fn();
});