var network = localStorage.getItem("networkmodel");
var year = sessionStorage.getItem("year");
var carname = sessionStorage.getItem("carname");
var deptcar = sessionStorage.getItem("deptcar");
var outputheader = sessionStorage.getItem("outputheader");
var vinname = sessionStorage.getItem("vinname");
var oename = sessionStorage.getItem("oename");
var username_id = localStorage.getItem("username_id");




$(".qd").click(function(){
	$(".meng").hide()
})

if(year !== null){
	$(".yearm").html(year);
}
if(carname !== null){
	$(".carm").html(carname);
}
if(deptcar !== null){
	$(".deptm").html(deptcar);
}
if(outputheader !== null){
	$(".outputm").html(outputheader);
}
if(vinname !== null){
	$("#findvin input").val(vinname);
}
if(oename !== null){
	$("#findoe input").val(oename);
}

var fenlei;
var category_str;
$.ajax({
	type:"post",
	url:network+"/MattrioEcModel/SelectCarIntface/getBrandCategory",
	dataType:"json",
	data:{
		"brand_id":username_id
	},
	cache: false,
	async: false,
	crossDomain: true == !(document.all),
	success:function(data){
		category_Str = data;
		$(".depgenre ul").html("");
		$.each(data.list,function(key,value){
			$(".depgenre ul").append("<li>"+value.category_name+"</li>");
			fenlei+= "\'"+value.category_id +"\'" + ",";
		})
	}
})
var genrem_num = fenlei.split("fined")[1].substring(0,fenlei.split("fined")[1].length-1);

//点击跳转到另一个页面
$(".ructcxsel").click(function(){
	$(".runpseltex").show();

})
$(".runpseltex").hide();
$(".yeartmk span").click(function(){
	$(".yearheader").hide();
	$(".carheader").hide();
	$(".deptheader").hide();
	$(".outputheader").hide();
	$(".footer").show();
	$(".button").show();
	$("#loading").hide();
})

//获取主机厂
$(".carm").click(function(){
	// if($(".yearm").html() == "选择年份 &gt;"){
	// 	alert("请选择年份");
	// 	return false;
	// }
	$("html,body").animate({scrollTop:0}, 200);
	$(".sort_box").html("");
	$("#loading").show();
	$(".carheader").show();
	$(".footer").hide();
	$(".button").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getManufacture",
		dataType:"json",
		data:{
			"brand_id":username_id
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			$("#loading").hide();
			
			$.each(data,function(key,value){
				// console.log(value)
				var div1 = $("<div class='num_name'>").html(value.Manufacture_CN);
				var div2 = $("<div class='sort_list'>");
				div1.appendTo(div2);
				div2.appendTo(".sort_box");	
			})
			initials();

			$(".num_name").click(function(){
				$(".carheader").hide();
				$(".carm").html("");
				$(".carm").html($(this).html());
				$(".footer").show();
				$(".deptm").html("选择车型 &gt;");
				$(".outputm").html("选择排量 &gt;");
				$(".yearm").html("选择年份 &gt;");
				$(".button").show();
				sessionStorage.setItem("carname",$(this).html());
			})
		},
		error:function(data){
			$("#loading").hide();
			//console.log(data);
		}
	})
})
//车型
$(".deptm").click(function(){
	
	if($(".carm").html() == "选择主机厂 &gt;"){
		$(".content").text("选择主机厂")
				$(".meng").show()
				return false;
	}
	$("html,body").animate({scrollTop:0}, 200);
	$(".deptcar ul").html("")
	$("#loading").show();
	$(".button").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getVehicleName",
		data:{
			"brand_id":username_id,
			"Manufacture":$(".carm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			$("#loading").hide();
			$(".deptheader").show();
			$(".footer").hide();
			$(".button").show();
			//console.log(data);
			$.each(data,function(key,value){
				$("<li>").html(value.Vehicle_Name_CN).appendTo(".deptcar ul");
			})
			$(".deptcar ul li").click(function(){
				$(".deptheader").hide();
				$(".deptm").html("");
				$(".deptm").html($(this).html());
				$(".footer").show();
				$(".outputm").html("选择排量 &gt;");
				$(".yearm").html("选择年份 &gt;");
				sessionStorage.setItem("deptcar",$(this).html());
			})
		},
		error:function(data){
			$("#loading").hide();
			//console.log(data);
		}
	})

})
//获取年份
$(".yearm").click(function(){
	if($(".deptm").html() == "选择车型 &gt;"){
		$(".content").text("选择车型")
		$(".meng").show()
		return false;
	}
	$("html,body").animate({scrollTop:0}, 200);
	$(".yearheader").show();
	$(".footer").hide();
	$(".yearheader ul").html("");
	
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getYear",
		data:{
			"brand_id":username_id,
			"Manufacture":$(".carm").html(),
			"Vehicle_Name":$(".deptm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data);
			$.each(data,function(key,value){
				$("<li>").html(value.LaunchEOPYear).appendTo(".yearheader ul");
			})
			$(".yearheader ul li").click(function(){
				sessionStorage.setItem("year",$(this).html());
				$(".yearheader").hide();
				$(".yearm").html("");
				$(".yearm").html($(this).html());
				$(".footer").show();
				$(".outputm").html("选择排量 &gt;");
			})
		},
		error:function(data){
			// console.log(data);
		}
	})
		
})
//排量
$(".outputm").click(function(){
	if($(".yearm").html() == "选择年份 &gt;"){
		$(".content").text("选择年份")
		$(".meng").show()
		return false;
	}
	$("html,body").animate({scrollTop:0}, 200);
	$(".outputheader ul").html("");
	$("#loading").show();
	$(".button").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getCapacity",
		data:{
			"brand_id":username_id,
			"Year":$(".yearm").html(),
			"Manufacture":$(".carm").html(),
			"Vehicle_Name":$(".deptm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".button").show();
			if(data == [] || data.length == 0){
				$(".outputm").html("");
				return false;
			}
			$(".outputheader").show();
			$(".footer").hide();
			$.each(data,function(key,value){
				if(value.Fuel_Type=="柴油"){
				   $("<li>").html(value.Capacity+"-"+value.Air_intake_form+"-"+value.Fuel_Type).appendTo(".outputheader ul");
				}else{
				   $("<li>").html(value.Capacity+"-"+value.Air_intake_form).appendTo(".outputheader ul");
				}
			})
			$(".outputheader ul li").click(function(){
				$(".outputheader").hide();
				$(".outputm").html("");
				$(".outputm").html($(this).html());
				$(".footer").show();
				sessionStorage.setItem("outputheader",$(this).html());
			})
		},
		error:function(data){
			$("#loading").hide();
			//console.log(data);
		}
	})
})

//点击按钮
$(".button button").click(function(){
	if($(".deptm").html() == "选择车型 &gt;"){
		$(".content").text("请选择您要查询的值")
		$(".meng").show()
		return false;
	}
	if($(".outputm").html() == "选择排量 &gt;"){
		$(".content").text("请选择您要查询的排量")
		$(".meng").show()
		return false;
	}
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/MattrioEcModel/SelectCarIntface/getProducts",
		data:{
			"brand_id":username_id,
			"category_id":genrem_num,
			"Year":$(".yearm").html(),
			"Manufacture":$(".carm").html(),
			"Vehicle_Name":$(".deptm").html(),
			"Capacity":$(".outputm").html().split("-")[0]
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(data.list.length == 0 || data.list == []){
				$(".content").text("没有查询到结果")
				$(".meng").show()
				return false;
       }
			localStorage.particulars =JSON.stringify(data);
			window.location.href = "./content/particulars/particulars.html";
		},
		error:function(data){
			$("#loading").hide();
			//console.log(data);
		}
	})
	
})



//vin码查询
function vinsubmit(){
    var runprcbh = $(".runprckipt").val();
    if(runprcbh == ""){
    	$(".content").text("请填写VIN号码")
				$(".meng").show()
				return false;
    }
    $("#loading").show();
    sessionStorage.setItem("vinname",runprcbh);
     $.ajax({
        type:"post",
        url:network+"/MattrioEcModel/VinIntface/queryVin",
        data:{
        	"brand_id":username_id,
        	"category_id":genrem_num,
            "vin":runprcbh
        },
        dataType:"json",
        success:function(data){
        	$("#loading").hide();
//      	if(data.list.length == 0 || data.list == []){
//      		alert("没有查询到结果");
//      		return false;
//      	}
            localStorage.particulars =JSON.stringify(data);
			window.location.href="./content/particulars_vin/particulars_vin.html";
        },
        error:function(data){
            $("#loading").hide();
        }
    })
}


//搜索框模糊查询
	function findlike(){
		window.location.href="findlike.html"; 
	}


	//oe查询查询
	function OEsubmit(){
        var oenum = $("#oenum").val();
        //console.log(oenum);
        if(oenum == ""){
        	$(".content").text("请填写奔欧/必能编码")
				$(".meng").show()
				return false;
        }
        $("#loading").show();
        sessionStorage.setItem("oename",oenum);
        $.ajax({
	        type:"post",
	        url:network+"/MattrioEcModel/SelectCarIntface/getOeNumber",
	        data:{
	        	"brand_id":username_id,
	            "oenumber":oenum
	        },
	        dataType:"json",
	        success:function(data){
	        	$("#loading").hide();
	        	if(data.list.length == 0 || data.list == []){
	        		$(".content").text("没有查询到结果")
				$(".meng").show()
				return false;
	        	}
	        	
	            localStorage.particulars =JSON.stringify(data);
	            window.location.href="./content/particulars/particulars.html";
	        },
	        error:function(data){
	            //console.log(data);
	            $("#loading").hide();
	            //alert("没有查询到结果");
	        }
    })
    }




$(".li1").click(function(){
	$(".li1 .span1").removeClass("active");
	$(".li1 .span2").addClass("active");
	$(".li2 .span1").removeClass("active");
	$(".li2 .span2").addClass("active");
	$(".li3 .span1").removeClass("active");
	$(".li3 .span2").addClass("active");
})
$(".li2").click(function(){
	$(".li1 .span2").removeClass("active");
	$(".li1 .span1").addClass("active");
	$(".li2 .span2").removeClass("active");
	$(".li2 .span1").addClass("active");
	$(".li3 .span1").removeClass("active");
	$(".li3 .span2").addClass("active");
})
$(".li3").click(function(){
	$(".li1 .span2").removeClass("active");
	$(".li1 .span1").addClass("active");
	$(".li2 .span1").removeClass("active");
	$(".li2 .span2").addClass("active");
	$(".li3 .span2").removeClass("active");
	$(".li3 .span1").addClass("active");
})