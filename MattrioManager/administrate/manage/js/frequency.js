var network = localStorage.getItem("network");

var start_time = "";
var mydate = new Date();
var end_time = mydate.getFullYear() + "-"+(mydate.getMonth()+1) + "-"+mydate.getDate();
var interface_name = "";
var userid = "";
$("#loading").show();
fn(start_time,end_time,interface_name,userid);
function fn(start_time,end_time,interface_name,userid){
	$.ajax({
		url:network+"/MattrioManager/InterfaceController/getInterfaceList",
		type:"post",
		data:{
			"start_time":start_time,
			"end_time":end_time,
			"interface_name":interface_name,
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$("tbody").html("");
			if(data.list.length == 0 || data.list == []){
				$("tbody").html("<tr class='text-c'><td colspan=2>暂无数据</td><tr>");
				return false;
			}
			$.each(data.list,function(key,value){
				var tr = $("<tr class='text-c'><td>"+value.interface_name+"</td><td>"+value.interface_count+"</td></tr>");
				tr.appendTo("tbody");
			})
		}
	})
}
$("#data").click(function(){
	var start_time = $("#datemin").val();
	if($("#datemax").val() == ""){
		var mydate = new Date();
		var end_time = mydate.getFullYear() + "-"+(mydate.getMonth()+1) + "-"+mydate.getDate();
	}else{
		var end_time = $("#datemax").val();
	}
	if( $("#brand").val() == "全部"){
		var interface_name = "";
	}else{
		var interface_name = $("#brand").val();
	}
	var userid = "";
	$("#loading").show();
	fn(start_time,end_time,interface_name,userid);
})

$("#user_id").click(function(){
	var start_time = $("#datemin").val();
	if($("#datemax").val() == ""){
		var mydate = new Date();
		var end_time = mydate.getFullYear() + "-"+(mydate.getMonth()+1) + "-"+mydate.getDate();
	}else{
		var end_time = $("#datemax").val();
	}
	if( $("#brand").val() == "全部"){
		var interface_name = "";
	}else{
		var interface_name = $("#brand").val();
	}
	if( $("#user").val() == ""){
		var userid = "";
	}else{
		var userid = $("#user").val();
	}
	$("#loading").show();
	fn(start_time,end_time,interface_name,userid);
})

