var network = localStorage.getItem("network");
var name = sessionStorage.getItem("user");
var pwd = sessionStorage.getItem("pwd");
// console.log(name,pwd)


fn();
function fn(){
	var pageindex = 1;
	if($("#inpsubmit").val() == ""){
		var query_str = "";
	}else{
		var query_str = $("#inpsubmit").val();
	}
	$.ajax({
		url:network+"/MattrioManager/InterfaceController/queryInterfaceUser",
		type:"post",
		data:{
			"pageindex":pageindex,
			"query_str":query_str
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			$("tbody").html("");
			$(".alltotal").html(data.listsize);
			$(".warting").addClass("active");
			if(data.list.length == 0){
				$(".wartno").removeClass("active");
			};
			$.each(data.list,function(key,value){
				$("<tr>").html(value+"<td style='text-align: center;'> <a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a><a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
			})
			$(".zxf_pagediv").createPage({
				pageNum: Math.ceil(data.listsize/10),//总页码
				current: Number(pageindex),//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){
					// console.log(e);
					$(".warting").removeClass("active");
					$("tbody").html("");
					var pageindex = e.current;

					$.ajax({
						type:"post",
						url:network+"/MattrioManager/InterfaceController/queryInterfaceUser",
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
								$("<tr>").html(value+"<td style='text-align: center;'> <a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a><a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
							});
						},
						error:function(data){
							console.log(data);
						}
					})
				}
			})

		},
		error:function(data){
			console.log(data);
		}
	})
}

//删除
$(document).on("click",".delthis",function(){
	sessionStorage.setItem("pages",$(".current").html());
	var postion = $(this).parents("td").parents("tr").children().eq(0).html();
	// console.log(postion);
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/InterfaceController/deleteInterfaceUserInfo",
			data:{
				"postion":postion
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				// console.log(data)
				fn();
			},
			error:function(data){
				console.log(data);
			}
		})
	}
});
//修改内容
$(document).on("click",".endior",function(){
	// console.log($(".current").html())
	sessionStorage.setItem("pages",$(".current").html());
	window.location.href =  "manage_revise.html?postion="+$(this).parents("td").parents("tr").children().eq(0).html();
	// console.log($(this).parents("td").parents("tr").children().eq(0).html())
});

$("#btnsubmit").click(function(){
	if($("#inpsubmit").val() == ""){
		alert("输入内容不能为空");
		return false;
	}
	fn();
})

function picture_rem(){
	if(confirm("是否一键重置")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/InterfaceController/ResetFrequency",
			data:{
				"username":name,
				"password":pwd
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				alert(data.msg);
				fn();
			},
			error:function(data){
				console.log(data);
			}
		})
	}
}