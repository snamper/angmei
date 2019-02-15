var network = localStorage.getItem("network");

var category_id = "";
var classname = ".selectname3";
fn(category_id,classname);

function fn(category_id,classname){
	$(classname).html("");
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/BrandController/getCategoryBrand",
		dataType: "json",
		data:{
			"category_id":category_id
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			var option = $("<option>全部产品</option>");
			option.appendTo(classname);
			$.each(data.list,function(key,value){
				var option1 = $("<option value='"+value.brand_category_id+"'>"+value.brand_name+"</option>");
				option1.appendTo(classname);
			});
		}
	})
};

$(".select_top_top").change(function(){
	if($(this).val() == "全部类型"){
		var category_id = "";
	}else{
		var category_id = $(this).val();
	}
	var classname = ".select_top_bottom";
	fn(category_id,classname);
});
$(".select_middle_top").change(function(){
	if($(this).val() == "全部类型"){
		var category_id = "";
	}else{
		var category_id = $(this).val();
	}
	var classname = ".select_middle_bottom";
	fn(category_id,classname);
});
$(".select_bottom_top").change(function(){
	if($(this).val() == "全部类型"){
		var category_id = "";
	}else{
		var category_id = $(this).val();
	}
	var classname = ".select_bottom_bottom";
	fn(category_id,classname);
});

$(".p span").click(function(){
	$("#loading").show();
	$(this).addClass("span").siblings("span").removeClass("span");
	$(".tab").children("div:eq("+$(this).index()+")").removeClass("active").siblings("div").addClass("active");

	if($(".select_top_bottom").val() == "全部产品"){
		var brand_category_id = "";
	}else{
		var brand_category_id = $(".select_top_bottom").val();
	}

	if($(this).index() == 0){
		var apellation = ".all tbody";
		var match_state = "";
		var page = ".zxf_all";
		loadOn(apellation,brand_category_id,match_state,page);
	}else if($(this).index() == 1){
		var match_state = "1";
		var apellation = ".marry tbody";
		var page = ".zxf_marry";
		loadOn(apellation,brand_category_id,match_state,page);
	}else if($(this).index() == 2){
		var match_state = "0";
		var apellation = ".marry_no tbody";
		var page = ".zxf_marry_no";
		loadOn(apellation,brand_category_id,match_state,page);
	}
});

var brand_category_id = "";
var match_state = "";
var apellation = ".all tbody";
var page = ".zxf_all";

loadOn(apellation,brand_category_id,match_state,page);
function loadOn(apellation,brand_category_id,match_state,page){
	var apellation = apellation;
	var brand_category_id = brand_category_id;
	var match_state = match_state;
	var page = page;
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/BrandController/getBrandProducts",
		dataType: "json",
		data:{
			"brand_category_id":brand_category_id,
			"match_state":match_state,
			"pageindex":"1"
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			$("#loading").hide();
			$(".alltotal").html(data.list_size);
			if(data.list.length == 0 || data.list == []){
				$(".tab").addClass("active");
				$(".wartno").removeClass("active");
			}else{
				$(".tab").removeClass("active");
				$(".wartno").addClass("active");
			};
			$(apellation).html("");
			fnEach(data,apellation);
			$(page).createPage({
				pageNum: Math.ceil(data.list_size/10),//总页码
				current: 1,//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){
					$(apellation).html("");
					var pageindex = e.current;
					$.ajax({
						type: "post",
						url:  network+"/MattrioManager/BrandController/getBrandProducts",
						dataType: "json",
						data:{
							"brand_category_id":brand_category_id,
							"match_state":match_state,
							"pageindex":pageindex
						},
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$(apellation).html("");
							fnEach(data,apellation);
						}
					})
				}
			})
		}
	})
};
function fnEach(data,apellation){
	$.each(data.list,function(key,value){
		var tr = $("<tr>");
		if(value.match_state == "1"){
			var match_state = "适用车型";
			var othercar = "othercar";
		}else{
			var match_state = "未匹配";
			var othercar = "";
		};
		tr.html("<td>"+value.category_name+"</td><td>"+value.brand_name+"</td><td>"+value.product_id+"</td><td class='"+othercar+"'>"+match_state+"</td><td class='property'>查看明细</td>");
		tr.appendTo(apellation);
	});
	$(".property").click(function() {
		window.location.href = "after_sale_property.html?id="+$(this).prev().prev().html()+"&name="+$(this).prev().prev().prev().html();
	});
};
$("#btnsubmit").click(function(){
	$("#loading").show();
	if($(".select_top_bottom").val() == "全部产品"){
		if($(".select_top_top").val() == "全部类型"){
			var brand_category_id = "";
		}else{
			var brand_category_id = $(".select_top_top").val();
		}
	}else{
		var brand_category_id = $(".select_top_bottom").val();
	};
	var match_state = "";
	var apellation = ".all tbody";
	var page = ".zxf_all";
	$(".all").removeClass("active").siblings("div").addClass("active");
	$(".p span:first").addClass("span").siblings("span").removeClass("span");
	loadOn(apellation,brand_category_id,match_state,page);
});

$(document).on("click",".othercar",function(){
	window.location.href = "after_sale_detail.html?id="+$(this).prev().html();
})

$(document).on("click",".carmikey",function(){
	// window.location.href = "http://www.51macc.com?mieky="+$(this).prev().html();
	window.open("http://www.51macc.com?mikey="+$(this).prev().html())
	/*$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarManager/queryCarList",
		data:{
			"pageindex":"1",
			"mikey":$(this).prev().html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			console.log(data);
		}
	})*/
})

// 按车型看产品
var mikeys = "MIA010268A004";
var product_id = "";
fnCar(mikeys,product_id);
$("#add_mikey").click(function(){
	if($("#city2").val() == ""){
		alert("主机厂不能为空");
		return false;
	}else{
		var Manufacture_CN ="Manufacture_CN=" + $("#city2").val();
		var Manufacture_CN1 ="Manufacture_CN";
	}
	var str = new Array;
	$.each($(".select_mikey td .select_div"),function(key,value){
		str.push($(this).attr('class').split(" ")[1].split("select_")[1])
	})
	var mikeys = "";
	// 遍历组件_data
	var parm = "";
	var parm1 = "";
	var class_name = "";
	var class_name1= "";
	$.each(str,function(k,v){
		if($(".select_"+v+" div").html() == "不选择"){
			var class_name = "";
			var class_name1 = "";
		}else{
			var class_name ="&"+v+"=" + $(".select_"+v+" div").html();
			var class_name1 =","+v;
		}
		parm += class_name;
		parm1 += class_name1;
	})
	var _data = Manufacture_CN+parm+"&car_fileds="+Manufacture_CN1+"&type=macc&parameters="+Manufacture_CN1+parm1;
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/CarMatchController/getFilterCars",
		dataType: "json",
		data:_data,
		cache: false,
		async:false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$.each(data.list,function(key,value){
				mikeys += value.mikey+"," 
			})
		},
		error: function(data) {
			// console.log(data)
		}
	})
	var product_id = "";
	fnCar(mikeys,product_id);
})
function fnCar(mikeys,product_id){
	if($(".select_middle_bottom").val() == "全部产品"){
		if($(".select_middle_top").val() == "全部类型"){
			var brand_category_id = "";
		}else{
			var brand_category_id = $(".select_middle_top").val();
		}
	}else{
		var brand_category_id = $(".select_middle_bottom").val();
	};
	$.ajax({
	    type: "post",
	    url:  network+"/MattrioManager/BrandController/getMikeyProducts",
	    dataType: "json",
	    data:{
	    	"brand_category_id":brand_category_id,
	        "mikeys":mikeys,
	        "pageindex":"1",
	        "product_id":product_id
	    },
	    cache: false,
	    crossDomain: true == !(document.all),
	    success:function(data){
	        // console.log(data);
	        $(".attributes_to").html(data.list_size);
	        $(".tab_car tbody").html("");
	        $.each(data.list,function(key,value){
	        	var tr = $("<tr>");
	        	tr.html("<td class='"+value.postion+"'>"+value.mikey+"</td><td class='carmikey'>"+value.Manufacture_CN+" "+value.Vehicle_Name_CN+" "+value.Year_of_production+" "+value.Capacity+"</td><td class='"+value.brand_category_id+"'>"+value.other+"</td><td>"+value.Vehicle_Name_CN+"</td><td>"+value.product_id+"</td><td><button class='revise_td size-S btn btn-primary radius endior'>修改</button></td>");
	        	tr.appendTo(".tab_car tbody");
	        })
	        $(".zxf_page").createPage({
				pageNum: Math.ceil(data.list_size/10),//总页码
				current: 1,//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){
					$(".tab_car tbody").html("");
					var pageindex = e.current;
					$.ajax({
						type: "post",
						url:  network+"/MattrioManager/BrandController/getMikeyProducts",
						dataType: "json",
						data:{
							"brand_category_id":brand_category_id,
					        "mikeys":mikeys,
					        "pageindex":pageindex,
					        "product_id":product_id
						},
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$(".tab_car tbody").html("");
							 $.each(data.list,function(key,value){
					        	var tr = $("<tr>");
					        	tr.html("<td class='"+value.postion+"'>"+value.mikey+"</td><td class='carmikey'>"+value.Manufacture_CN+" "+value.Vehicle_Name_CN+" "+value.Year_of_production+" "+value.Capacity+"</td><td class='"+value.brand_category_id+"'>"+value.other+"</td><td>"+value.Vehicle_Name_CN+"</td><td>"+value.product_id+"</td><td><button class='revise_td size-S btn btn-primary radius endior'>修改</button></td>");
					        	tr.appendTo(".tab_car tbody");
					        })
						}
					})
				}
			})
	    }
	})
}
$("#btnsubmit_code").click(function(){
	var product_id = $(".car_input").val();
	if(product_id == ""){
		alert("不能为空");
		return false;
	}
	var mikeys = "";
	fnCar(mikeys,product_id);
})
$(document).on("click",".endior",function(){
	if($(this).html() == "修改"){
		$(this).parents("td").prev("td").html("<input type='text' class='input-text' value='"+$(this).parents("td").prev("td").html()+"'>");
		$(this).html("保存");
		$(this).removeClass("btn-primary").addClass("btn-success");
	}else if($(this).html() == "保存"){
		if($(this).parents("td").prev("td").children("input").val() == ""){
			$(this).parents("td").prev("td").html("-");
		}else{
			$(this).parents("td").prev("td").html($(this).parents("td").prev("td").children("input").val());
		}
		$(this).html("修改");
		$(this).removeClass("btn-success").addClass("btn-primary");

		var postion = $(this).parents("td").prev("td").prev("td").prev("td").prev("td").prev("td").attr("class");
		var product_id = $(this).parents("td").prev("td").html();
		var mikey_id = $(this).parents("td").prev("td").prev("td").prev("td").prev("td").prev("td").html();
		var brand_category_id_id = $(this).parents("td").prev("td").prev("td").prev("td").attr("class");
		var other = $(this).parents("td").prev("td").prev("td").prev("td").html();
		$.ajax({
			type: "post",
			url:  network+"/MattrioManager/BrandController/updateMikeyProduct",
			dataType: "json",
			data:{
				"postion":postion,
				"product_id":product_id,
				"mikey":mikey_id,
				"brand_category_id":brand_category_id_id,
				"other":other
			},
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				alert(data.msg);
			}
		})
	}
});


// 按产品看车型
var brand_category_id = "";
var product_id = "";
loadOncar(brand_category_id,product_id);
function loadOncar(brand_category_id,product_id){
	$.ajax({
		type: "post",
		url:  network+"/MattrioManager/BrandController/getBrandProducts",
		dataType: "json",
		data:{
			"brand_category_id":brand_category_id,
			"product_id":product_id,
			"match_state":"1",
			"pageindex":"1"
		},
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".attributes_total").html(data.list_size);
			if(data.list.length == 0 || data.list == []){
				$(".tab").addClass("active");
				$(".wartno").removeClass("active");
			}else{
				$(".tab").removeClass("active");
				$(".wartno").addClass("active");
			};
			$(".tab_product tbody").html("");
			fnEachcar(data);
			$(".cx_page").createPage({
				pageNum: Math.ceil(data.list_size/10),//总页码
				current: 1,//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){
					$("#loading").show();
					var pageindex = e.current;
					$.ajax({
						type: "post",
						url:  network+"/MattrioManager/BrandController/getBrandProducts",
						dataType: "json",
						data:{
							"brand_category_id":brand_category_id,
							"product_id":product_id,
							"match_state":"1",
							"pageindex":pageindex
						},
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$("#loading").hide();
							$(".tab_product tbody").html("");
							fnEachcar(data);
						}
					})
				}
			})
		}
	})
};
function fnEachcar(data){
	$.each(data.list,function(key,value){
		var tr = $("<tr>");
		if(value.match_state == "1"){
			var match_state = "适用车型";
			var othercar = "othercar";
		}else{
			var match_state = "未匹配";
			var othercar = "";
		};
		tr.html("<td>"+value.category_name+"</td><td>"+value.brand_name+"</td><td>"+value.product_id+"</td><td class='"+othercar+"'>"+match_state+"</td>");
		tr.appendTo(".tab_product tbody");
	});
    $(".property").click(function() {
        window.location.href = "after_sale_property.html?id="+$(this).prev().prev().html()+"&name="+$(this).prev().prev().prev().html();
    });
};

$("#btnsubmit_car").click(function(){
	if($(".select_bottom_bottom").val() == "全部产品"){
		if($(".select_bottom_top").val() == "全部类型"){
			var brand_category_id = "";
		}else{
			var brand_category_id = $(".select_bottom_top").val();
		}
	}else{
		var brand_category_id = $(".select_bottom_bottom").val();
	};
	var product_id = $("#btnsubmit_car_input").val();
	loadOncar(brand_category_id,product_id);
})