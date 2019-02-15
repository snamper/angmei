var network = localStorage.getItem("networkmodel");
var year = sessionStorage.getItem("year");
var carname = sessionStorage.getItem("carname");
var deptcar = sessionStorage.getItem("deptcar");
var outputheader = sessionStorage.getItem("outputheader");
var deptgenre = sessionStorage.getItem("deptgenre");
var deptgenre_num = sessionStorage.getItem("deptgenre_num");
var vinname = sessionStorage.getItem("vinname");
var oename = sessionStorage.getItem("oename");
var brandname = sessionStorage.getItem("brandname");
var username_id = localStorage.getItem("username_id"); 


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
// if(deptgenre !== null){
// 	$(".genrem").html(deptgenre);
// }
if(vinname !== null){
	$("#findvin input").val(vinname);
}
if(oename !== null){
	$("#findoe input").val(oename);
}
if(brandname !== null){
	$("#findbrand input").val(brandname);
}

if(year == ""){
	$(".yearm").html("选择年份");
}
if(carname == ""){
	$(".carm").html("选择车系");
}
if(deptcar == ""){
	$(".deptm").html("选择车型");
}
if(outputheader == ""){
	$(".outputm").html("选择排量");
}


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
	$(".genreheader").hide();
	$(".footer").show();
	$(".button").show();
	$("#loading").hide();
})

$(".genrem").click(function(){
	$(".genreheader").show();
})


$("#loading").show();
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
		$("#loading").hide();
		category_Str = data;
		$(".depgenre ul").html("");
		$.each(data.list,function(key,value){
			$(".depgenre ul").append("<li>"+value.category_name+"</li>");
			fenlei+= "\'"+value.category_id +"\'" + ",";
		})
	}
})
var genrem_num = fenlei.split("fined")[1].substring(0,fenlei.split("fined")[1].length-1);




//获取主机厂
$(".carm").click(function(){
	$(".sort_box").html("");
	// $("#loading").show();
	$(".carheader").show();
	$(".footer").hide();
	$(".button").hide();
		$(".num_name").click(function(){
			$(".carm").html("");
			$(".carm").html($(this).html());
			$(".footer").show();
			$(".deptm").html("选择车型");
			$(".outputm").html("选择排量");
			$(".yearm").html("选择年份");
			$(".button").show();
			sessionStorage.setItem("carname",$(this).html());
			sessionStorage.setItem("deptcar","");
			sessionStorage.setItem("year","");
			sessionStorage.setItem("outputheader","");
			$(".deptm").click();
		})
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
			$("#loading").hide();
			$.each(data,function(key,value){
				var div1 = $("<div class='num_name'>").html(value.Manufacture_CN);
				var div2 = $("<div class='sort_list'>");
				div1.appendTo(div2);
				div2.appendTo(".sort_box");	
			})
			initials();
			$(".num_name").click(function(){
				$(".carm").html("");
				$(".carm").html($(this).html());
				$(".footer").show();
				$(".deptm").html("选择车型");
				$(".outputm").html("选择排量");
				$(".yearm").html("选择年份");
				$(".button").show();
				sessionStorage.setItem("carname",$(this).html());
				sessionStorage.setItem("deptcar","");
				sessionStorage.setItem("year","");
				sessionStorage.setItem("outputheader","");
				$(".deptm").click();
			})
		},
		error:function(data){
			$("#loading").hide();
		}
	})
})
//车型
$(".deptm").click(function(){
	$("html,body").animate({scrollTop: "0px"});
	if($(".carm").html() == "选择车系"){
		alert("选择车系");
		return false;
	}
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
			$(".carheader").hide();
			$("#loading").hide();
			$(".deptheader").show();
			$(".footer").hide();
			$.each(data,function(key,value){
				$("<li>").html(value.Vehicle_Name_CN).appendTo(".deptcar ul");
			})
			$(".deptcar ul li").click(function(){
				$(".deptm").html("");
				$(".deptm").html($(this).html());
				$(".footer").show();
				$(".outputm").html("选择排量");
				$(".yearm").html("选择年份");
				sessionStorage.setItem("deptcar",$(this).html());
				$(".yearm").click();
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
	if($(".deptm").html() == "选择车型"){
		alert("选择车型");
		return false;
	}
	$(".yearheader").show();
	$(".footer").hide();
	$(".yearheader ul").html("");
	$("#loading").show();
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
			$(".deptheader").hide();
			$("#loading").hide();
			$.each(data,function(key,value){
				$("<li>").html(value.LaunchEOPYear).appendTo(".yearheader ul");
			})
			$(".yearheader ul li").click(function(){
				sessionStorage.setItem("year",$(this).html());
				$(".yearm").html("");
				$(".yearm").html($(this).html());
				$(".outputm").html("选择排量");
				$(".outputm").click();
			})
		},
		error:function(data){
			// console.log(data);
		}
	})
})
//排量
$(".outputm").click(function(){
	if($(".yearm").html() == "选择年份"){
		alert("选择年份");
		return false;
	}
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
			$(".yearheader").hide();
			$("#loading").hide();
			if(data == [] || data.length == 0){
				$(".outputm").html("");
				return false;
			}
			$(".outputheader").show();
			$(".footer").hide();
			$.each(data,function(key,value){
				$("<li>").html(value.Capacity+"-"+value.Air_intake_form).appendTo(".outputheader ul");
			})
			$(".outputheader ul li").click(function(){
				$(".outputheader").hide();
				$(".outputm").html("");
				$(".outputm").html($(this).html());
				$(".button").show();
				sessionStorage.setItem("outputheader",$(this).html());
			})
		},
		error:function(data){
			$("#loading").hide();
		}
	})
})

//点击按钮
$(".button button").click(function(){
	if($(".deptm").html() == "选择车型"){
		alert("请选择您要查询的值");
		return false;
	}
	if($(".outputm").html() == "选择排量"){
		alert("请选择您要查询的排量");
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
        		alert("没有查询到结果");
        		return false;
        	}
        	sessionStorage.setItem("deptgenre_num",genrem_num);
			localStorage.particulars =JSON.stringify(data);
			window.location.href = "./content/particulars/particulars.html";
		},
		error:function(data){
			$("#loading").hide();
		}
	})
})

//vin码查询
function vinsubmit(){
    var runprcbh = $(".runprckipt").val().toUpperCase();
    if(runprcbh == ""){
        alert("请填写正确的VIN");
        return false;
    }
    var str = {"0":"2000","1":"2001","2":"2002","3":"2003","4":"2004","5":"2005","6":"2006","7":"2007","8":"2008","9":"2009","A":"2010","B":"2011","C":"2012","D":"2013","E":"2014","F":"2015","G":"2016","H":"2017","I":"2018"};
	var num = $.trim(runprcbh).substring(9,10);
	var vin_year;
	$.each(str,function(key,value){
		if(num == key){
			vin_year = value;
		}
	})
    $("#loading").show();
    sessionStorage.setItem("vinname",runprcbh);
     $.ajax({
        type:"post",
        url:network+"/MattrioEcModel/VinIntface/queryVin",
        data:{
        	"brand_id":username_id,
            "vin":runprcbh
        },
        dataType:"json",
        success:function(data){
        	$("#loading").hide();
        	if(jQuery.isEmptyObject(data)){
        		alert("沒有数据");
        		return false;
        	}
        	if(data.list.length == 0 || data.list == []){
        		alert("没有查询到结果");
        		return false;
        	}
            localStorage.particulars =JSON.stringify(data);
			window.location.href="./content/particulars_vin/particulars_vin.html?year="+vin_year;
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
        if(oenum == ""){
            alert("请填写编号");
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
	        		alert("没有查询到结果");
	        		return false;
	        	}
	            localStorage.particulars =JSON.stringify(data);
	            window.location.href="./content/particulars/particulars.html";
	        },
	        error:function(data){
	            $("#loading").hide();
	        }
		})
    }

//编码查询查询
	function Brandsubmit(){
        var brandnum = $("#brandnum").val();
        if(brandnum == ""){
            alert("请填写编号");
            return false;
        }
        $("#loading").show();
        sessionStorage.setItem("brandname",brandnum);
        $.ajax({
           type:"post",
            url:network+"/MattrioEcModel/SelectCarIntface/getProduct",
            data:{
            	"brand_id":username_id,
                "product_id":brandnum
            },
            dataType:"json",
            success:function(data){
            	// console.log(data);
            	$("#loading").hide();
                if(data.list.length == 0 || data.list == []){
	        		alert("没有查询到结果");
	        		return false;
	        	}
                localStorage.particulars =JSON.stringify(data);
            	window.location.href="./content/particulars/particulars.html?brand="+brandnum;
            },
            error:function(data){

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