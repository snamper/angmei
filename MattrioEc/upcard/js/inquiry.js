// localStorage.setItem("network","http://192.168.1.112:8080/MattrioEc");
localStorage.setItem("network","https://www.51macc.com/api/MattrioEc");


var network = localStorage.getItem("network");


$(".gridtable").hide();





$(".yearm").click(function(){
	$(".yearyear").show();
	$(".yearmouth").hide();

})
$(".yearyear p").click(function(){
	$(".yearyear").hide();
	$(".yearm").html($(this).html());
	$(".provincem").html("选择省份 &gt;");
	$(".yearmoth").html("选择月份 &gt;");
	$(".carm").html("选择车型 &gt;");

	if($(this).html() == 2017 ){
		$(".city").show();
		$(".yearmouth2").show();
		$(".namecity").show();
		$(".citym").html("选择地级市 &gt;");
	}else{
		$(".city").hide();
		$(".yearmouth1").show();
		$(".citym").html("");
		$(".namecity").hide();
	}
})

$(".yearmoth").click(function(){
	if($(".yearm").html() == "选择年份 &gt;"){
		alert("请选择年份");
		return false;
	}
	$(".yearmouth").show();

})
$(".yearmouth p").click(function(){
	$(".yearmoth").html($(this).html());
	$(".yearmouth").hide();
})



$(".yeartmk span").click(function(){
	$(".provinceheader").hide();
	$(".cityheader").hide();
	$(".carheader").hide();
	$(".carfooter2").hide();
	$(".carfooter3").hide();
	$(".carfooter4").hide();
	$("#loading").hide();
})





//选择省份
$(".provincem").click(function(){
	$("#container").hide();
	$("table").hide();
	if($(".yearmoth").html() == "选择月份 &gt;"){
		alert("请选择您要查询的年份");
		return false;
	}
	$(".provinceheader").show();
	$(".provincecar ul li").click(function(){
		$(".provinceheader").hide();
		$(".provincem").html($(this).html());

		$(".citym").html("");
	})
		
	
})


//城市
$(".citym").click(function(){
	$("#container").hide();
	$("table").hide();
	$(".cityheader ul").html("");

	if($(".provincem").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}

	$(".cityheader").show();
	//console.log($(".provincem").html());

	$.ajax({
		type:"post",
		url:network+"/ShangPaiLiangIntface/getCity",
		data:{
			"month":$(".yearmoth").html(),
			"province":$(".provincem").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			//console.log(data);
			$.each(data,function(key,value){
				$("<li>").html(value.city).appendTo(".cityheader ul");
			})
			$(".cityheader ul li").click(function(){
				$(".cityheader").hide();
				$(".citym").html($(this).html());
				$(".carm").html("选择车型 &gt;");
			})
		}
	})
})
var carname;
var car;
var carpai;
var carcap;

$(".carm").click(function(){
	if($(".yearm").html() == "选择年份 &gt;"){
		alert("请选择您要查询的年份");
		return false;
	}
	if($(".provincem").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}
	if($(".citym").html() == "选择地级市 &gt;"){
		alert("请选择您要查询的条件");
		return false;
	}
	$(".carheader").show();
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/ShangPaiLiangIntface/getManufactur",
		data:{
			"year":$(".yearm").html(),
			"month":$(".yearmoth").html(),
			"province":$(".provincem").html(),
			"city":$(".citym").html()
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".sort_box").html("");
			$("#loading").hide();
			//console.log(data);
			$.each(data,function(key,value){
				var div1 = $("<div class='sort_list'>");
				var div2 = $("<div class='num_name'>").html(value.Manufactur);
				div2.appendTo(div1);
				div1.appendTo(".sort_box");
			})
			initials();

			$(".num_name").click(function(){
				$(".carheader").hide();
				$(".carfooter2").show();
				$(".carfooter2 ul").html("");
				$("#loading").show();
				carname = $(this).html()
				$.ajax({
					type:"post",
					url:network+"/ShangPaiLiangIntface/getVehicleNam",
					data:{
						"year":$(".yearm").html(),
						"month":$(".yearmoth").html(),
						"province":$(".provincem").html(),
						"city":$(".citym").html(),
						"Manufactur":carname
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						$(".carheader").hide();
						//console.log(data);
						$.each(data,function(key,value){
							$("<li>").html(value.VehicleNam).appendTo(".carfooter2 ul");
						})
						$(".carfooter2 li").click(function(){
							$(".carfooter2").hide();
							$(".carfooter3").show();
							$(".carfooter3 ul").html("");
							$("#loading").show();
							//console.log($(this).html())
							car = $(this).html();
							$.ajax({
								type:"post",
									url:network+"/ShangPaiLiangIntface/getNameSales",
									data:{
										"year":$(".yearm").html(),
										"month":$(".yearmoth").html(),
										"province":$(".provincem").html(),
										"city":$(".citym").html(),
										"Manufactur":carname,
										"VehicleNam":car
									},
									dataType:"json",
									cache: false,
									crossDomain: true == !(document.all),
									success:function(data){
										$("#loading").hide();
										//console.log(data);
										$.each(data,function(key,value){
											$("<li>").html(value.NameSales).appendTo(".carfooter3 ul");
										})

										$(".carfooter3 li").click(function(){
											$(".carfooter4").show();
											$("#loading").show();
											$(".carfooter4 ul").html("");
											 carpai = $(this).html();
											$.ajax({
												type:"post",
												url:network+"/ShangPaiLiangIntface/getCapacity",
												data:{
													"year":$(".yearm").html(),
													"month":$(".yearmoth").html(),
													"province":$(".provincem").html(),
													"city":$(".citym").html(),
													"Manufactur":carname,
													"VehicleNam":car,
													"NameSales":carpai
												},
												dataType:"json",
												cache: false,
												crossDomain: true == !(document.all),
												success:function(data){
													//console.log(data);
													$("#loading").hide();
													$.each(data,function(key,value){
														$("<li>").html(value.capacity).appendTo(".carfooter4 ul");
													})
													$(".carfooter4 li").click(function(){
														$(".carheader").hide();
														$(".carfooter2").hide();
														$(".carfooter3").hide();
														$(".carfooter4").hide();
														$(".gridtable").hide();
														$(".carm").html(carname+car);
														var carcap = $(this).html();
													})
												},
												error:function(data){
													//console.log(data);
												}
											})
										})


									}
							})
						})
					},
					error:function(data){
						//console.log(data);
					}
				})
			})

		},
		error:function(data){
			//console.log(data);
		}
	})
})














//点击查询

$(".button button").click(function(){
	if($(".carm").html() == "选择车型 &gt;"){
		alert("请选择您要查询的条件");
		return false;
	}
	if($(".provincem").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}
	if($(".provincem").html() == "选择省份 &gt;"){
		alert("请选择您要查询的省份");
		return false;
	}

	$("#container").show();
	$("table").show();
	$("contbox").hide();
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/ShangPaiLiangIntface/getShangPaiLiang",
		data:{
			"year":$(".yearm").html(),
			"month":$(".yearmoth").html(),
			"province":$(".provincem").html(),
			"city":$(".citym").html(),
			"Manufactur":carname,
			"VehicleNam":car,
			"NameSales":carpai,
			"capacity":carcap
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			//console.log(data);
			$(".td1").html(data.result[0].Manufactur)
			$(".td2").html(data.result[0].NameSales)
			$(".td3").html(data.result[0].VehicleNam)
			$(".td4").html(data.result[0].capacity)
			$(".td4").html(data.result[0].city)
			$(".td5").html(data.result[0].month)
			$(".td6").html(data.result[0].province)
			$(".td7").html(data.result[0].shangpailiang)
			$(".td8").html(data.result[0].year)


		},error:function(data){
			console.log(data);
		}
	})

});
	
