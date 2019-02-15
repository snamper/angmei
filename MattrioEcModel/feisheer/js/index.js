//localStorage.setItem("network","http://192.168.125.117:8080");  
localStorage.setItem("networkmodel","http://ec.51macc.com");
localStorage.setItem("username_id","fer");  
var network = localStorage.getItem("networkmodel");  
var username_id = localStorage.getItem("username_id"); 
$(".bottomwrap").click(function(){
	$(".show").hide()
})
$("#btn").click(function(){
	window.location.href='./content/car.html'
})
$('.wrap').css('height',$(window).height())
/*VIN查询*/
$(".vinwrap button").click(function(){
	 var runprcbh = $(".vininput").val().toUpperCase();
    if(runprcbh == ""){
        alert("请填写正确的VIN");
        return false;bottomwrap
    }
	$.ajax({
        type:"post",
        url:network+"/MattrioEcModel/VinIntface/queryVin",
        data:{
        	"brand_id":username_id,
            "vin":runprcbh
        },
        dataType:"json",
        success:function(data){
        	if(data.list.length == 0 || data.list == []){
        		alert("没有查询到结果");
        		return false;
        	}
//      	console.log(data.mikeys)
        	$.ajax({
		        type:"post",
		        url:network+"/MattrioEcModel/SelectCarIntface/getFilterTransmissionProducts",
		        data:{
		        	"brand_id":username_id,
		            "mikey_short":data.mikeys[0].mikey_short,
		            'mikey_transmission':data.mikeys[0].mikey_transmission
		        },
		        dataType:"json",
		        success:function(dat){
		        	 sessionStorage.setItem("data",JSON.stringify(data))
					 sessionStorage.setItem("fdj",JSON.stringify(dat))	
		         	 window.location.href="content/list/list.html?vin=true"
		        },
		        error:function(dat){
		
		        }
		    })
        },
        error:function(data){

        }
    })
})
