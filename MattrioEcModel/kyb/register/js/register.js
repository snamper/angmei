var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id"); 

//验证用户名
$("#username").blur(function(){
	var username = $("#username").val();
	if(username==null||username==""){
		$(".span1").html("用户名不为空");	
		return false;
	};
	$(".span1").html("");
})


//验证密码： 字母数字下划线组成 6-12
$("#pwd").blur(function(){
	var pwd = $("#pwd").val();
	var reg = /^\w{6,}$/;
	if(pwd.match(reg) == null){
		$(".span2").html("密码由数字字母下划线组成,不少与六位");
		return false;
	}
	$(".span2").html("");
})


$("#pwd2").blur(function(){
	var pwd = $("#pwd").val();
	var repwd = $("#pwd2").val();
	//验证确认密码
	var repwd = repwd;
	if(repwd !== pwd){
		$(".span3").html("两次密码不一致");
		return false;
	}
	$(".span3").html("");
})


$("#phone").blur(function(){
	var phone = $("#phone").val();
	//验证电话号码
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if(phone.match(reg) == null){
		$(".span4").html("电话号码格式错误")
		return false;
	}
	$(".span4").html("");
})

$("#name").blur(function(){
	var name = $("#name").val();
	//姓名
	if(name==null||name==""){
		$(".span5").html("姓名不能为空");	
		return false;
	};
	$(".span5").html();
})

$("#company").blur(function(){
	var company = $("#company").val();
	//用公司
	if(company==null||company==""){
		$(".span6").html("公司名称不能为空");	
		return false;
	};
	$(".span6").html();
})








$(".logocbtno").click(function(){
	var username = $("#username").val();
	var pwd = $("#pwd").val();
	var repwd = $("#pwd2").val();
	var phone = $("#phone").val();
	var name = $("#name").val();
	var company = $("#company").val();
	//验证用户名
	if(username==null||username==""){
		$(".span1").html("用户名不为空");	
		return false;
	};
	$(".span1").html("");
	//验证密码： 字母数字下划线组成 6-12
	var reg = /^\w{6,}$/;
	if(pwd.match(reg) == null){
		$(".span2").html("密码由数字字母下划线组成,不少与六位");
		return false;
	}
	$(".span2").html("");

	//验证确认密码
	var repwd = repwd;
	if(repwd !== pwd){
		$(".span3").html("两次密码不一致");
		return false;
	}
	$(".span3").html("");
//验证电话号码
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if(phone.match(reg) == null){
		$(".span4").html("电话号码格式错误")
		return false;
	}
	$(".span4").html("");
//用姓名
	if(name==null||name==""){
		$(".span5").html("姓名不能为空");	
		return false;
	};
	$(".span5").html();
//用公司
	if(company==null||company==""){
		$(".span6").html("公司名称不能为空");	
		return false;
	};
	$(".span6").html();



	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/RegeditIntface/regedit",
		data:{
			"brand_id":username_id,
			"username":username,
			"password":pwd,
			"phone":phone,
			"name":name,
			"company":company
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			console.log(data);



			
		},
		error:function(data){
			//console.log(data);
		}
	})


})


$(".runtasclor").click(function(){
	window.location.href = "javascript:history.back();"
})