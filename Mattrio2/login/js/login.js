if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
var openID=getUrlParam('openID')
if(openID){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/LoginInterface/QQLogin",
		data:{
			'oppen_id':openID
		},
		success:function(data){
			$.cookie("username", data.user_name, { expires: 7, path: "/" });
            $.cookie("frequency", data.frequency.frequency, { expires: 7, path: "/" });
            $.cookie("user_id", data.user_id, { expires: 7, path: "/" });
            $.cookie("phone", data.phone, { expires: 7, path: "/" });
            $.cookie("loginmode", data.other, { expires: 7, path: "/" });
            window.location.href="../index.html";
		}
	});
}
$("#loading").hide();
var user_name = $.cookie("username");
var pasword = $.cookie("password");
//判断是否有localStorage
if(user_name == undefined || user_name == "null" || user_name == null){
	$("#inputEmail3").val("");
	$("#inputPassword3").val("");
}else{
	$("#inputEmail3").val(user_name);
	$("#inputPassword3").val(pasword);
}
yzAjax()
function yzAjax(){
    $.ajax({
        url: network+"/Mattrio/GeetestInterface/StartCaptcha",
        type: "get",
        dataType: "json",
        success: function (data) {
            $('#text').hide();
            $('#wait').show();
            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
                // 以下 4 个配置参数为必须，不能缺少
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

                product: "float", // 产品形式，包括：float，popup
                width: "300px"

                // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, handler);
        },error:function(){
            yzAjax()
        }
    })
}

//登录请求
 var handler = function (captchaObj) {
        captchaObj.appendTo('#captcha');
        captchaObj.onReady(function () {
            $("#wait").hide();
        });
		$("#btn").click(function(){
			var username = $("#inputEmail3").val();
			var pwd = $("#inputPassword3").val();
			var security = $("#security").val();
			if(username == "" || username == null){
				alert('请输入用户名');
				return false;
			}
			if(pwd == "" || pwd == null){
				alert("请输入您的密码");
				return false;
			}
			var result = captchaObj.getValidate();
		    if (!result) {
		        return alert('请完成验证');
		    }else{
		    	$("#loading").show();	
		    }
			$.ajax({
				type:"post",
		        url:network+"/Mattrio/LoginInterface/login",
		        data:{
		            "user_name":username,
		            "password":pwd,
		            "verifyCode":security,
		            'geetest_challenge': result.geetest_challenge,
		            'geetest_validate': result.geetest_validate,
		            'geetest_seccode': result.geetest_seccode
		        },
		        dataType:"json",
				cache: false,
				xhrFields: {
		           withCredentials: true  /*执行跨域*/
		        },
		        crossDomain: true,
		        success:function(data){
		        	// console.log(data)
					$("#loading").hide();
		   			//正则验证用户名
			   		if (data.recode == -2) {
				   		alert("账户用户密码不正确");
				   		// window.location.reload()
				   	}else if(data.recode == -1){
				   		alert("验证码错误");
                        window.location.reload()
				   	}else if(data.recode == -999){
				   		alert(data.msg);
				   	}else{
						// _czc.push(["_trackEvent",username+"登录",0,"btn"]);						
		   				$.cookie("username",data.user_name,{expires:7,path: "/"});
		   				$.cookie("frequency",data.frequency,{expires:7,path: "/"});
		   				$.cookie("user_id",data.user_id,{expires:7,path: "/"});
		   				$.cookie("phone",data.phone,{expires:7,path: "/"});
		   				$.cookie("loginmode","",{expires:7,path: "/"});
			   		
			   			window.location.href="../index.html";
					}
		        },error:function(data){
		        }
			})
		
		});
		window.gt = captchaObj;
}


$("#bttn").click(function(){
	window.location.href="../register/register.html";
})


$(document).keydown(function(even){
	if(event.keyCode==13){
		$("#btn").click();
	}
})