if(localStorage) {
	var network = localStorage.getItem("network");
} else {
	var network = $.cookie("network");
}
var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

$(".divname span").html(username);
$(".divnum span").html(frequency);

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

var categoryid = getUrlParam('?categoryid');
var mikey = getUrlParam('?mikey');
var str = getUrlParam('?str');
var oenumber = getUrlParam('?oenumber');
var Manufacture = getUrlParam('?Manufacture');
var type = getUrlParam('?type');
var recode='';

$("#loading").show();
$('.selectcar').hide()
//点击搜索



$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/queryOenumber",
		data: {
			"oenumber": oenumber,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		async:false,
		crossDomain: true == !(document.all),
		success: function(data) {
//			console.log(data.list[0].parent_name)
			$("#loading").hide();
			$(".content ul").html("");
			recode=frequencyfun(userid,recode)
			if(recode == 0){
				alert(data.msg);
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			if(data.recode == -2){
				alert("请重新登陆");
				window.location.href = "/Mattrio/login/login.html";
				return false;
			}
			if(data.list.length == 0 || data.list == []) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			$(".content").show();
			$(".nocontent").hide();
			
			if(data.list[0].parent_name!="第三方"){
				window.location.href="../oecont/oecont.html?oenumber="+$("#search").val().replace(/\s/g, "")	
				return false;
			}
			oe = data;
			$.each(data.list, function(key, value) {
				$("<li>").html("品类：" + value.category_name + "<br>" + "OE号：" + value.oe_numbers).appendTo($("ul"));
			})
			$(".content ul li:first").addClass("active");
			$(".td1").html(data.list[0].parent_name);
			$(".td2").html(data.list[0].category_name);
			$(".td3").html(data.list[0].oe_numbers);
			if(data.list[0].system_market_price == ""){
				$(".td4").html("暂无价格");
			}else{
				$(".td4").html("￥"+data.list[0].system_market_price);
			}
//			demoAjax(userid, data.list[0].oe_numbers); 
			//参数
			$(".canshucontent").html("")
				$.each(data.list[0].fileds,function(key,value){
					var p1=$("<div title="+value.filed_name.replace(/\s/g,"")+'：'+value.filed_value.replace(/\s/g,"")+">").html("<b>"+value.filed_name+"</b>"+"："+value.filed_value+"</br>")
					p1.appendTo(".canshucontent")
				})
		    	
		    	//发动机
		    	
		    	$(".contentbottom1 table").html("");
		    	if(data.list[0].engines.length=='0'){
		    		$(".contentbottom1 table").html("暂无数据");
		    	}else{
		    		$.each(data.list[0].engines, function(key, value) {
						$("<tr>").html("<td>"+value.manuf_des+"</td><td>"+value.engine_code+"</td>").appendTo(".contentbottom1 table ");
					})
		    	}
				
		    		    	
		      	//适配车型
		        $(".contentbottom2 div").html("");
		        if(data.list[0].cars.length=='0'){
		        	 $(".contentbottom2 div").html("暂无数据");
		        }else{
		        	$.each(data.list[0].cars, function(key, value) {
		        		if(value.engine_code=="undefined"||value.engine_code==undefined){
		        			value.engine_code=""
		        		}
						$("<p>").html(value.vehicle_des + "&nbsp; " + value.pcon_start + "&nbsp; " + value.pcon_end + "&nbsp; " + value.engine_code).appendTo(".contentbottom2 div");
						$('<option>').html(value.vehicle_des + "&nbsp; " + value.pcon_start + "&nbsp; " + value.pcon_end + "&nbsp; " + value.engine_code).appendTo('.selectcar')
					})
		        }
			
		},
		error: function(data) {
			//console.log(data);
		}
	})
fn(oenumber)
fun(oenumber)



$("#btn").click(function() {
	if($("#search").val() == "") {
		alert("请输入您要查询的OE号码");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/queryOenumber",
		data: {
			"oenumber": $("#search").val().replace(/\s/g, ""),
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			$(".content ul").html("");
			recode=frequencyfun(userid,recode)
			if(recode == 0){
				alert(data.msg);
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			if(data.list.length == 0 || data.list == []) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			$(".content").show();
			$(".nocontent").hide();
			
			if(data.list[0].parent_name!="第三方"){
				window.location.href="../oecont/oecont.html?oenumber="+$("#search").val().replace(/\s/g, "")	
				return false;
			}
			oe = data;
			$.each(data.list, function(key, value) {
				$("<li>").html("品类：" + value.category_name + "<br>" + "OE号：" + value.oe_numbers).appendTo($("ul"));
			})
			$(".content ul li:first").addClass("active");
			$(".td1").html(data.list[0].parent_name);
			$(".td2").html(data.list[0].category_name);
			$(".td3").html(data.list[0].oe_numbers);
			if(data.list[0].system_market_price == ""){
				$(".td4").html("暂无价格");
			}else{
				$(".td4").html("￥"+data.list[0].system_market_price);
			}
//			demoAjax(userid, data.list[0].oe_numbers); 
		//参数
			$(".canshucontent").html("")
				$.each(data.list[0].fileds,function(key,value){
					var p1=$("<div title="+value.filed_name.replace(/\s/g,"")+'：'+value.filed_value.replace(/\s/g,"")+">").html("<b>"+value.filed_name+"</b>"+"："+value.filed_value+"</br>")
					p1.appendTo(".canshucontent")
				})
		    	
		    	//发动机
		    	$(".contentbottom1 table").html("");
		    	if(data.list[0].engines.length=="0"){
		    		$(".contentbottom1 table").html("暂无数据");
		    	}else{
		    		$.each(data.list[0].engines, function(key, value) {
						$("<tr>").html("<td>"+value.manuf_des+"</td><td>"+value.engine_code+"</td>").appendTo(".contentbottom1 table ");
					})
		    	}		    
		    	
		      	//适配车型
		        $(".contentbottom2 div").html("");
		        if(data.list[0].cars.length=="0"){
		        	 $(".contentbottom2 div").html("暂无数据");
		        }else{
		        	
		        	$.each(data.list[0].cars, function(key, value) {
		        		if(value.engine_code=="undefined"||value.engine_code==undefined){
		        			value.engine_code=""
		        		}
						$("<p>").html(value.vehicle_des + "&nbsp; " + value.pcon_start + "&nbsp; " + value.pcon_end + "&nbsp; " + value.engine_code).appendTo(".contentbottom2 div");
					})
		        }
					
		},
		error: function(data) {
			//console.log(data);
		}
	})
	fn($("#search").val().replace(/\s/g, ""))
	fun($("#search").val().replace(/\s/g, ""))
})


$(".top").click(function(){
	$("html,body").animate({scrollTop:0}, 500);
})

function fn(oe){
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/getThirdPartyOeProduct",
		data: {
			"userid": userid,
			"oenumber": oe
		},
		dataType: "json",
		cache: true,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(!data.products){
				$(".shpp").hide();
				return false;
			}
			$(".nocontent").hide();
			$(".shpp").show();
			$(".contentbrand .table1 tbody").html("");
			$(".contentbrand .table2 tbody").html("");
			
			var array1 = new Array();
			var array2 = new Array();
			$.each(data.products,function(key,value){
				if(key%2){
					array1.push(value);
				}else{
					array2.push(value);
				}
			})
			$.each(array1,function(key,value){
				 $(".table2 tbody").append("<tr><td>"+value.brand+"</td><td>"+value.product_id+"</td></tr>");
			})
			$.each(array2,function(key,value){
				 $(".table1 tbody").append("<tr><td>"+value.brand+"</td><td>"+value.product_id+"</td></tr>");
			})
//			if(array1.length < array2.length){
//				$(".table2 tbody").append("<tr><td> </td><td> </td></tr>");
//			}
		}
	})
}

function fun(oe){
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/getReplace",
		data: {
			"userid": userid,
			"oenumber":oe
		},
		dataType: "json",
		cache: true,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".thoe").hide()
			$(".oebody").html("")
			if(data.list.length!=0){
				$(".thoe").show()

				$(".contentbrand .tableoe1 tbody").html("");
				$(".contentbrand .tableoe2 tbody").html("");
				
				var array1 = new Array();
				var array2 = new Array();
				$.each(data.list,function(key,value){
					if(key%2){
						array1.push(value);
					}else{
						array2.push(value);
					}
				})
				$.each(array1,function(key,value){
					 $(".tableoe2 tbody").append("<tr><td>"+value.brand+"</td><td>"+value.oe_number+"</td></tr>");
				})
				$.each(array2,function(key,value){
					 $(".tableoe1 tbody").append("<tr><td>"+value.brand+"</td><td>"+value.oe_number+"</td></tr>");
				})
//				if(array1.length < array2.length){
//					$(".tableoe2 tbody").append("<tr><td> </td><td> </td></tr>");
//				}
	
			}
			
			
			
            
		}
	})
}



//模糊匹配
 $(document).on("input","#search",function(){
   	var ar=[]
   	var oezz=$('#search').val().toLowerCase().replace(/\s+|-/g,"")
   	var oelength=oezz.length
   	$.ajax({
   		type:"post",
        dataType: "json",
   		url: network +"/Mattrio/OeInterface/LikeOeList",
   		data:{"oe_number":oezz},
   		async:true,
   		success:function(data){
	         $('#oelist').show()
	         $('#oelist').html('')
	         //数组去重
			 $.each(data.list,function(key,val){
				if(ar.indexOf(val.oe_number)==-1){
					ar.push(val.oe_number)
				}	
			})
			 //突出输入的值  为红色
			 $.each(ar,function(key,val){
			 	var oeval=val.indexOf(oezz.toUpperCase())
			 	if(oeval==0){
			 		var qian=''
			 	}else{
			 		var qian=val.substring(0,oeval)
			 	}
			 	var spa=val.substr(oeval,oelength)
			 	if(oeval+oelength==val.length){
			 		var hou=''
			 	}else{
			 		var hou=val.substring(oeval+oelength)
			 	}
				var oelist =$('<p>').html(qian+"<span style='color:red'>"+spa+"</span>"+hou)
				oelist.appendTo("#oelist")
			})	
   		},
   		error:function(){	
   		}
   		
   	});
   })
$(document).on('click',"#search",function(e){
   	 	e.stopPropagation()
   })
$(document).click(function(e){
	e.stopPropagation()
	$('#oelist').hide()
})
$(document).on('focus',"#search",function(e){
   	 e.stopPropagation()
   	  $('#oelist').show()
})
$(document).on('click',"#oelist p",function(e){
   	e.stopPropagation()
   	  $("#search").val($(this).text())
})
//绑定回车键
$(document).keydown(function(even){
	if(event.keyCode==13){
		$("#btn").click();
	}
})

function stopPropagation(e) {
	if(e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}
$(".error").bind('click', function() {
	$('.error').fadeOut();
});

$('.errorcont').bind('click', function(e) {
	stopPropagation(e);
});

$(".contentp").click(function() {
	$(".error").fadeIn()
	$(".oenum").val($(".td3").html());
	$(".category_name").val($(".td2").html())
})

$(".onbtn").click(function() {
	$('.error').fadeOut();
})

/*判断是纠错哪个*/
$('.selecterror').change(function(){
	if($(this).val()=='适配车型'){
		$('.oenum').hide()
		$(".selectcar").show()
		$('.category_name').val('适配车型')
	}else{
		$('.oenum').show()
		$(".selectcar").hide()
		$(".category_name").val($(".td2").html())	
	}
})
$(".offbtn").click(function() {
	var err = $(".oenum").val()
	if($(".new_oenum").val() == "") {
		alert("请填写您认为的");
		return false;
	}
	if($(".selecterror").val()=='适配车型'){
		err=$(".selectcar").val()
	}
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeProductErrorCorrectionInterface/addErrorCorrection",
		data: {
			"part_number": err,
			"user_id": userid,
			"category_name": $(".category_name").val(),
			"type": "OE号码(全车件)",
			"new_part_number": $(".new_oenum").val(),
			"brand_name": "",
			"mikey": mikey
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			alert("纠错成功");
			$('.error').fadeOut();
		}
	})
})
