var network = localStorage.getItem("network");
var year = sessionStorage.getItem("year");
var carname = sessionStorage.getItem("carname");
var deptcar = sessionStorage.getItem("deptcar");
var outputheader = sessionStorage.getItem("outputheader");
var vinname = sessionStorage.getItem("vinname");
var oename = sessionStorage.getItem("oename");



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






//点击跳转到另一个页面
$(".ructcxsel").click(function(){
	$(".runpseltex").show();

})
$(".runpseltex").hide();
//获取年份
$(".yearm").click(function(){
	$(".yearheader").show();
	$(".footer").hide();
	$(".yearheader ul").html("");
	var str = [2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985];
		$.each(str,function(key,value){
			//console.log(value);
			$("<li>").html(value).appendTo(".yearheader ul");
		})

		$(".yearheader ul li").click(function(){
			sessionStorage.setItem("year",$(this).html());
			$(".yearheader").hide();
			$(".yearm").html("");
			$(".yearm").html($(this).html());
			$(".footer").show();
			$(".carm").html("选择主机厂 &gt;");
			$(".deptm").html("选择车型 &gt;");
			$(".outputm").html("选择排量 &gt;");
		})
})

$(".yeartmk span").click(function(){
	$(".yearheader").hide();
	$(".carheader").hide();
	$(".deptheader").hide();
	$(".outputheader").hide();
	$(".footer").show();
	$("#loading").hide();
})

//获取主机厂
$(".carm").click(function(){
	if($(".yearm").html() == "选择年份 &gt;"){
		alert("请选择年份");
		return false;
	}
	$(".sort_box").html("");
	$("#loading").show();
	$(".carheader").show();
	$(".footer").hide();
	$(".button").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEc/SelectCarIntface/Manufacture",
		data:{
			"year":$(".yearm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			
			$.each(data,function(key,value){
				//console.log(value)
				var div1 = $("<div class='num_name'>").html(value.Manufacture);
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
		alert("选择主机厂");
		return false;
	}
	$(".deptcar ul").html("")
	$("#loading").show();
	$(".button").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEc/SelectCarIntface/VehicleName",
		data:{
			"year":$(".yearm").html(),
			"Manufacture":$(".carm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			//console.log(data)
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
				sessionStorage.setItem("deptcar",$(this).html());
			})
		},
		error:function(data){
			$("#loading").hide();
			//console.log(data);
		}
	})

})
//排量
$(".outputm").click(function(){
	if($(".deptm").html() == "选择车型 &gt;"){
		alert("选择车型");
		return false;
	}
	$(".outputheader ul").html("");
	$("#loading").show();
	$(".button").hide();
	$.ajax({
		type:"post",
		url:network+"/MattrioEc/SelectCarIntface/Nameofsales",
		data:{
			"year":$(".yearm").html(),
			"Manufacture":encodeURI($(".carm").html()),
			"VehicleName":$(".deptm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".button").show();
			//console.log(data);
			if(data == [] || data.length == 0){
				$(".outputm").html("");
				return false;
			}
			$(".outputheader").show();
			$(".footer").hide();
			$.each(data,function(key,value){
				$("<li>").html(value.Name_of_sales).appendTo(".outputheader ul");
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
	//console.log($(".carm").html())
	if($(".deptm").html() == "选择车型 &gt;"){
		alert("请选择您要查询的值");
		return false;
	}
	if($(".outputm").html() == "选择排量 &gt;"){
		alert("请选择您要查询的排量");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/MattrioEc/SelectCarIntface/QueryCar",
		data:{
			"year":$(".yearm").html(),
			"Manufacture":$(".carm").html(),
			"VehicleName":$(".deptm").html(),
			"Nameofsales":$(".outputm").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(data == [] || data.length == 0){
        		alert("暂无数据");
        		return false;
        	}
			localStorage.year =JSON.stringify(data[0]);
			window.location.href = "./content/select/select.html";
		},
		error:function(data){
			$("#loading").hide();
			//console.log(data);
		}
	})
	
})



//vin查询
function vinsubmit(){
    var runprcbh = $(".runprckipt").val();
    var reg = /^\w{17}$/;
    if(runprcbh.match(reg) == null){
        alert("请输入17位VIN码");
        return false;
    }
    $("#loading").show();
    sessionStorage.setItem("vinname",runprcbh);
    $.ajax({
        type:"post",
        url:network+"/MattrioEc/VinIntface/queryVin",
        data:{
            vin:runprcbh
        },
        dataType:"json",
        success:function(data){
        	$("#loading").hide();
        	if(data == [] || data.length == 0){
        		alert("暂无数据");
        		return false;
        	}
			localStorage.year =JSON.stringify(data[0]);
			window.location.href="./content/select/select.html";
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


	//oe查询
	function OEsubmit(){
        var oenum = $("#oenum").val();
        //console.log(oenum);
        if(oenum == ""){
            alert("请填写OE号码或编号");
            return false;
        }
        $("#loading").show();
        sessionStorage.setItem("oename",oenum);
        $.ajax({
           type:"post",
            url:network+"/MattrioEc/OEIntface/queryOenumber",
            data:{
                oenumber:oenum
            },
            dataType:"json",
            success:function(data){
            	$("#loading").hide();
                if(typeof data.oes === "object" && !(data.oes instanceof Array) && data.products.length == 0){
                    alert("没有查询到结果");
                    return false;
                }
                localStorage.oe =JSON.stringify(data);
            	window.location.href="./content/particulars/particularsoe.html";
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