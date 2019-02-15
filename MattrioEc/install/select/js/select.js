var network = localStorage.getItem("network");
$(".num_name").click(function(){
	$("#loading").show();
	var carname = $(this).html();
	localStorage.setItem("carname",$(this).html());
	$.ajax({
		type:"post",	
		url:network+"/BaoYouLiangIntface/getVehicleNam",
		data:{
			"Manufactur":carname
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			//console.log(data);
			$(".content").hide();
			$(".nav").hide();
			$(".provinceheader").show();

			$.each(data,function(key,value){
				//console.log(value)
				$("<li>").html(value.VehicleNam).appendTo(".provincecar ul");
			})

			$(".provinceheader li").click(function(){
				$("#loading").show();
				$(".car").hide();
				$(".provinceheader").hide();
				$(".cityheader").show();
				$(".cityheader ul").html("");
				//console.log($(this).html());
				var carput = $(this).html();
				//console.log(carput);
				localStorage.setItem("carput",carput);
				$.ajax({
					type:"post",	
					url:network+"/BaoYouLiangIntface/getCapacity",
					data:{
						"Manufactur":carname,
						"VehicleNam":carput
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						//console.log(data);
						$.each(data,function(key,value){
							$("<li>").html(value.capacity).appendTo($(".cityheader ul"));
						})
						$(".cityheader ul li").click(function(){
							localStorage.setItem("carpai",$(this).html());
							window.location.href = "../index.html?carall="+carname+"-"+carput+"-"+$(this).html()+'&type=1';
							
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










$(".provincespan").click(function(){
	$(".provinceheader").hide();
	$(".content").show();
	$(".nav").show();
})
$(".cityspan").click(function(){
	$(".cityheader").hide();
	$(".provinceheader").show();
})