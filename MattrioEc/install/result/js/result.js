var data=JSON.parse(sessionStorage.data)
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var tab=getUrlParam("?tab")
if(tab=="A"){
	$('.wrap p .red').text("保有量")
	$('.ul1').show()
	$('.ul2').hide()
	$('.ul1 li').eq("0").find(".right").text(data.car_info.Manufactur)
	$('.ul1 li').eq("1").find(".right").text(data.car_info.VehicleNam)
	$('.ul1 li').eq("2").find(".right").text(data.car_info.capacity)
	$('.ul1 li').eq("3").find(".right").text(data.car_info.year)
	$('.ul1 li').eq("4").find(".left").text(data.car_info.byl_name1)
	$('.ul1 li').eq("5").find(".left div").text(data.car_info.byl_name2)
	$('.ul1 li').eq("4").find(".right").text(data.car_info.byl1)
	$('.ul1 li').eq("5").find(".right").text(data.car_info.byl2)
}else{
	$('.wrap p .red').text("上排量")
	$('.ul1').hide()
	$('.ul2').show()
	$('.ul2 li').eq("0").find(".right").text(data.result[0].year)
	$('.ul2 li').eq("1").find(".right").text(data.result[0].month)
	$('.ul2 li').eq("2").find(".right").text(data.result[0].province)
	$('.ul2 li').eq("3").find(".right").text(data.result[0].Manufactur)
	$('.ul2 li').eq("4").find(".right div").text(data.result[0].NameSales)
	$('.ul2 li').eq("5").find(".right").text(data.result[0].VehicleNam)
	$('.ul2 li').eq("6").find(".right").text(data.result[0].shangpailiang)
}
$('.back').click(function(){
	if(tab=="A"){
		window.location.href="../index.html?tab=A";
	}else{
		window.location.href="../index.html?tab=B";
	}	
})
