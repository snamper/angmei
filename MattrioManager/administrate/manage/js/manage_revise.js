var network = localStorage.getItem("network");

//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var postion = getUrlParam('?postion');

$(".select").change(function(){
	if($(".select").val() == "按天次"){
		$(".datacial").show();
		$(".allcial").hide();
		$(".datemin").hide();
	}else if($(".select").val() == "按总次"){
		$(".allcial").show();
		$(".datacial").hide();
		$(".datemin").hide();
	}else if($(".select").val() == "按时间"){
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

var interface_name;
$.ajax({
	type:"post",
	url:network+"/MattrioManager/InterfaceController/getInterfaceUserInfo",
	data:{
		"postion":postion
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		interface_name = data.list[0].interface_name;
		$("#company_name").val(data.list[0].postion);
		$("#user_name").val(data.list[0].user_id);

		if(data.list[0].interface_type == "正式"){
			$('input:radio[name="otherbutton"]').eq(0).attr("checked","checked");
		}else if(data.list[0].interface_type == "普通"){
			$('input:radio[name="otherbutton"]').eq(1).attr("checked","checked");
		}else if(data.list[0].interface_type == "测试"){
			$('input:radio[name="otherbutton"]').eq(2).attr("checked","checked");
		}


 		if(data.list[0].other == "正常"){
			$('input:radio[name="radiobutton"]').eq(0).attr("checked","checked");
		}else if(data.list[0].other == "封禁"){
			$('input:radio[name="radiobutton"]').eq(1).attr("checked","checked");
		}

		if(data.list[0].type == "按天次"){
			$(".select").val("按天次");
			$(".datacial").show();
			$(".allcial").hide();
			$(".datemin").hide();
			$("#datacial").val(data.list[0].day_type)
		}else if(data.list[0].type == "按总次"){
			$(".select").val("按总次");
			$(".allcial").show();
			$(".datacial").hide();
			$(".datemin").hide();
			$("#allcial").val(data.list[0].total_frequency)
			
		}else if(data.list[0].type == "按时间"){
			$(".select").val("按时间");
			$(".allcial").hide();
			$(".datacial").hide();
			$(".datemin").show();
			$("#datemin").val(data.list[0].start_time.split(" ")[0]);
			$("#datemax").val(data.list[0].end_time.split(" ")[0]);
		}

		
	},
	error:function(data){
		// console.log(data)
	}
})

$("#admin-role-save").click(function(){
	if($(".select").val() == "按天次"){
		var type = 0;
		var day_type = $("#datacial").val();
		var total_frequency = 0;
		var start_time = "";
		var end_time = "";

	}else if($(".select").val() == "按总次"){
		var type = 1;
		var day_type =0;
		var total_frequency = $("#allcial").val();
		var start_time = "";
		var end_time = "";
		
	}else if($(".select").val() == "按时间"){
		var type = 2;
		var day_type =0;
		var total_frequency = 0;
		var start_time = $("#datemin").val()+" "+datatime;
		var end_time = $("#datemax").val()+" "+datatime;
	}

	if(confirm("是否修改")){
		$.ajax({
			type:"post",
			url:network+"/MattrioManager/InterfaceController/updateInterfaceUserInfo",
			data:{
				"postion":$("#company_name").val(),
				"user_id":$("#user_name").val(),
				"interface_name":interface_name,
				"other":$('input:radio[name="radiobutton"]:checked').val(),
				"interface_type":$('input:radio[name="otherbutton"]:checked').val(),
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
			success:function(res){
				// console.log(res);
				alert("修改成功");
				window.location.href = "javascript:history.back()";
			},
			error:function(res){
				// console.log(res)
			}
		})
	}
})

