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
		var query_str = $("#inpsubmit").val();
	}
	$.ajax({
		url:network+"/MattrioManager/MnumManager/queryModelidMikey",
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
				$("<tr>").html("<td style='text-align: center;'><input type='checkbox' name='gay' value=''></td>"+value+"<td style='text-align: center;'> <a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a> <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
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
						url:network+"/MattrioManager/MnumManager/queryModelidMikey",
						data:{
							"pageindex":pageindex,
							"query_str":query_str
						},
						dataType:"json",
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$(".warting").addClass("active");
							$(".warting").addClass("active");
							if(data.list.length == 0){
								$(".wartno").removeClass("active");
							};
							$(".wartno").addClass("active");
							$.each(data.list,function(key,value){
								$("<tr>").html("<td style='text-align: center;'><input type='checkbox' name='gay' value=''></td>"+value+"<td style='text-align: center;'> <a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a>  <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>").appendTo("tbody");
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
	var postion = $(this).parents("td").parents("tr").children().eq(1).html();
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/MnumManager/deleteModelidMikey",
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

//批量删除
function datadel(){
	sessionStorage.setItem("pages",$(".current").html());
	var id_array=new Array();  
	$('input[name="gay"]:checked').each(function(){
	    id_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});  

	if(id_array.length == 0 || id_array == []){
		alert("请选择您要删除的选项");
		return false;
	}
	if(confirm("是否删除")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/MnumManager/deleteModelidMikeys",
			data:{
				"postions":id_array.join(",")
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				$("tbody").html("");
				fn();
			},
			error:function(data){
				console.log(data);
			}
		});
	}
};

//修改内容
$(document).on("click",".endior",function(){
	sessionStorage.setItem("pages",$(".current").html());
	window.location.href =  "mikey_qxb_revise.html?postion="+$(this).parents("td").parents("tr").children().eq(1).html();
});

$("#btnsubmit").click(function(){
	if($("#inpsubmit").val() == ""){
		alert("输入内容不能为空");
		return false;
	}
	fn();
});