var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
var pageindex =1;

function fn(){
	$(".warting").removeClass("active");
	if($("#inpsubmit").val() == ""){
		var productid = "";
	}else{
		var productid = $("#inpsubmit").val();
	}
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/ProductInfoIntface/getProInfoList",
		data:{
			"brand_id":username_id,
			"pageindex":pageindex,
			"productid":productid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".warting").addClass("active");
			if(data.list.length == 0 || data.list == []){
				// alert("暂无数据");
				$(".alltotal").html("0");
				$("tbody").html("");
				$(".wartno").removeClass("active");
				$(".zxf_pagediv").addClass("active");
			}else{
				$("tbody").html("");
				$(".alltotal").html(data.listsize);
				$.each(data.list,function(key,value){

					// var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
					var td2 = $("<td>").html(value.postion);
					var td3 = $("<td>").html(value.product_id);
					var td4 = $("<td>").html(value.parameter_cn);
					var td5 = $("<td>").html(value.describe);
					var td6 = $("<td>").html('<a style="text-decoration:none" href="javascript:;" title="编辑" class="endior"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
					var tr = $("<tr class='text-c'>");
					
					var tr = $("<tr class='text-c'>");
					// td1.appendTo(tr);
					td2.appendTo(tr);
					td3.appendTo(tr);
					td4.appendTo(tr);
					td5.appendTo(tr);
					td6.appendTo(tr);
					
					$(tr).appendTo("tbody");
				})

				$(".delthis").click(function(){
					var postion = $(this).parents("td").parents("tr").children().eq(0).html();
					del(postion);
				})

				$(".endior").click(function(){
					var number = $(this).parents("td").parents("tr").index();
					window.location.href = "prouncu-revise.html?postion="+data.list[number].postion+"&parameter_cn="+data.list[number].parameter_cn+"&describe="+data.list[number].describe+"&product_id="+data.list[number].product_id;
				})



				$(".zxf_pagediv").createPage({
					pageNum: Math.ceil(data.listsize/10),//总页码
					current: 1,//当前页
					shownum: 10,//每页显示个数
					// activepage: "",//当前页选中样式
					activepaf: "",//下一页选中样式
					backfun: function(e) {
						// console.log(e.current);//回调
						$(".warting").removeClass("active");
						$("tbody").html("");
						var pageindex = e.current;
						// fn1();
						$.ajax({
							type:"post",
							url:network+"/MattrioEcModel/ProductInfoIntface/getProInfoList",
							data:{
								"brand_id":username_id,
								"pageindex":pageindex,
								"productid":productid
							},
							dataType:"json",
							cache: false,
							crossDomain: true == !(document.all),
							success:function(data){
								// console.log(data);
								$(".warting").addClass("active");
								
								$(".alltotal").html(data.listsize);
								$.each(data.list,function(key,value){
									// var td1 = $("<td>").html('<input name="id" type="checkbox" value="">');
									var td2 = $("<td>").html(value.postion);
									var td3 = $("<td>").html(value.product_id);
									var td4 = $("<td>").html(value.parameter_cn);
									var td5 = $("<td>").html(value.describe);
									var td6 = $("<td>").html('<a style="text-decoration:none" href="javascript:;" title="编辑" class="endior"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5 delthis" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>');
									var tr = $("<tr class='text-c'>");
									
									var tr = $("<tr class='text-c'>");
									// td1.appendTo(tr);
									td2.appendTo(tr);
									td3.appendTo(tr);
									td4.appendTo(tr);
									td5.appendTo(tr);
									td6.appendTo(tr);
									
									$(tr).appendTo("tbody");
								})
								$(".delthis").click(function(){
									var postion = $(this).parents("td").parents("tr").children().eq(0).html();
									del(postion);
								})

								$(".endior").click(function(){
									var number = $(this).parents("td").parents("tr").index();
									// console.log(number);
									window.location.href = "prouncu-revise.html?postion="+data.list[number].postion+"&parameter_cn="+data.list[number].parameter_cn+"&describe="+data.list[number].describe+"&product_id="+data.list[number].product_id;
								})

							},
							error:function(data){
								// console.log(data);
							}
						})
					}
				});
			}
		},
		error:function(data){
			// console.log(data);
		}
	})
}


fn();


$("#btnsubmit").click(function(){
	if($("#inpsubmit").val() == ""){
		alert("请输入您要查询的条件");
		return false;
	}
	fn();
})


function del(postion){
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioEcModel/ProductInfoIntface/deleteProInfo",
			data:{
				"brand_id":username_id,
				"postion":postion
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				fn();
			},
			error:function(data){
				// console.log(data)
			}
		})
	}
}