 var network = localStorage.getItem("network");

$(".select").change(function(){
	if($(".select").val() == "每天次数(次/日)"){
		$(".datacial").show();
		$(".allcial").hide();
		$(".datemin").hide();
	}else if($(".select").val() == "总次数(次)"){
		$(".allcial").show();
		$(".datacial").hide();
		$(".datemin").hide();
	}else if($(".select").val() == "时间段"){
		$(".allcial").hide();
		$(".datacial").hide();
		$(".datemin").show();
	}
})


var myDate = new Date();
var h=myDate.getHours();     
var m=myDate.getMinutes();    
var s=myDate.getSeconds(); 
var datatime = h+":"+m+":"+s;

$("#admin-role-save").click(function(){
	if($("#company_name").val() == ""){
		alert("公司名称不能为空");
		return false;
	}
	
	if($("#user_name").val() == ""){
		alert("申请人不能为空");
		return false;
	}

	if($("#phone").val() == ""){
		alert("联系方式不能为空");
		return false;
	}
	//验证电话号码
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if($("#phone").val().match(reg) == null){
		alert("电话号码格式不正确")
		return false;
	}

	if($(".select").val() == "每天次数(次/日)"){
		if($("#datacial").val() == ""){
			alert("每天次数不为空");
			return false;
		}
		var reg =  /^\+?[1-9]\d*$/;
		if($("#datacial").val().match(reg) == null){
			alert("请输入大于零的整数");
			return false;
		}
		var type = 0;
		var day_type = $("#datacial").val();
		var total_frequency = "";
		var start_time = "";
		var end_time = "";

	}else if($(".select").val() == "总次数(次)"){
		if($("#allcial").val() == ""){
			alert("总数不为空");
			return false;
		}
		var reg =  /^\+?[1-9]\d*$/;
		if($("#allcial").val().match(reg) == null){
			alert("请输入大于零的整数");
			return false;
		}
		var type = 1;
		var day_type ="";
		var total_frequency = $("#allcial").val();
		var start_time = "";
		var end_time = "";
	}else if($(".select").val() == "时间段"){
		if($("#datemin").val() == ""){
			alert("最小时间");
			return false;
		}
		if($("#datemax").val() == ""){
			alert("最大时间");
			return false;
		}
		var type = 2;
		var day_type ="";
		var total_frequency = "";
		var start_time = $("#datemin").val()+" "+datatime;
		var end_time = $("#datemax").val()+" "+datatime;
	}

	var id_array=new Array();  
	$('input[name="gay"]:checked').each(function(){
	    id_array.push($(this).parent("span").parent("p").html().split("</span>")[1]);//向数组中添加元素  
	});
	if(id_array.join(",") == ""){
		alert("请选择接口类型");
		return false;
	}

	// console.log($('input:radio[name="radiobutton"]:checked').val());
	if(confirm("是否添加")){

	
		$.ajax({
			url:network+"/MattrioManager/InterfaceController/addInterfaceUser",
			type:"post",
			data:{
				"company_name":$("#company_name").val(),
				"user_name":$("#user_name").val(),
				"phone":$("#phone").val(),
				"interface_type":$('input:radio[name="radiobutton"]:checked').val(),
				"interface_name":id_array.join(","),
				"type":type,
				"day_type":day_type,
				"day_frequency":day_type,
				"total_frequency":total_frequency,
				"start_time":start_time,
				"end_time":end_time
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				alert("添加成功");
				window.location.href = "javascript:history.back()";
			},
			error:function(data){
				console.log(data);
			}
		})
	}
});
