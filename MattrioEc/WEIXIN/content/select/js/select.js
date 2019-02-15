var year = JSON.parse(localStorage.year);
// console.log(year)


var img = $("<img src='http://oqebrtdnm.bkt.clouddn.com/"+year.car_img+"'>");
var span = $("<span>").html(year.Manufacture_CN+" "+year.Name_of_sales);
span.appendTo(".contenttop");
img.appendTo(".contenttop");

$(".allbtn").click(function(){
	window.location.href = "../allcar/allcar.html";
})
$(".partbtn").click(function(){
	window.location.href = "../maintenance/maintenance.html";
})

$(".cyclebtn").click(function(){
	sessionStorage.setItem("yearname","");
    sessionStorage.setItem("mile","");
    sessionStorage.k=JSON.stringify("");
	window.location.href = "./cycle/cycle.html?mikey="+year.mikey+"&year="+year.Year_of_production;
})

