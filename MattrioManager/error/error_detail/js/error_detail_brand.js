var network = localStorage.getItem("network");
$(".warting").removeClass("active");
fn();
function fn(){
	$.ajax({
		url:network+"/MattrioManager/FeedbackListController/getFeedbackList",
		type:"post",
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("tbody").html("");
			$(".alltotal").html(data.list.length);
			$(".warting").addClass("active");
			if(data.list.length == 0){
				$(".wartno").removeClass("active");
			};
			$(".wartno").addClass("active");
			$.each(data.list,function(key,value){
				$("<tr>").html("<td style='text-align: center;'>"+value.postion+"</td><td style='text-align: center;'>"+value.user_name+"</td><td style='text-align: center;'>"+value.user_id+"</td><td style='text-align: center;'>"+value.mikey+"</td><td style='text-align: center;'>"+value.brand_name+"</td><td style='text-align: center;'>"+value.category_name+"</td><td style='text-align: center;'>"+value.part_number+"</td><td style='text-align: center;'>"+value.new_part_number+"</td><td style='text-align: center;'>"+value.type+"</td><td style='text-align: center;'>"+format(value.time.time)+"</td><td style='text-align: center;'>"+value.state+"</td><td style='text-align: center;'> <a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a></td>").appendTo("tbody");
			});
		}
	})
}

function format(shijianchuo){
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
};


$(document).on("click",".endior", function(){
	var postion = $(this).parents("td").parents("tr").children("td:eq(0)").html();
	if($(this).parents("td").parents("tr").children("td:eq(10)").html() == "已解决"){
		alert("已标记为已解决");
		return false;
	}
	if(confirm("是否标记已解决")){
		$.ajax({
			url:network+"/MattrioManager/FeedbackListController/updateFeedbackState",
			type:"post",
			data:{
				"postion":postion
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				alert("标记成功");
				fn();
			}
		})
	}
})