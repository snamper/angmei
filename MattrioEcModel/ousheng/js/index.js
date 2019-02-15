// localStorage.setItem("network","http://192.168.1.112:8080");  
localStorage.setItem("networkmodel","http://ec.51macc.com");
localStorage.setItem("username_id","ousheng");  
var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");  
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

if(sessionStorage.particulars!="undefined"&&sessionStorage.particulars!=undefined&&sessionStorage.particulars!=""){
	fun("particulars")

}

//if(getUrlParam("?hand")=="true"||getUrlParam("?hand")==true){
	if(sessionStorage.data!="undefined"&&sessionStorage.data!=undefined&&sessionStorage.data!=""){
	   fun("data")

    }
//}


//VIN or 手工查询
$(".left").click(function(){
	$(".wrap_vin").show()
	$(".wrap_car").hide()
	$(this).children("span").addClass("focus")
	$(".right").children("span").removeClass("focus")
	
})
$(".right").click(function(){
	$(".wrap_car").show()
	$(".wrap_vin").hide()
	$(this).children("span").addClass("focus")
	$(".left").children("span").removeClass("focus")
})

//二维码
$(".footer_qrcode").click(function(e){
	e.stopPropagation()
	$(".meng").show()
})

//VIN介绍
$('.wvin').click(function(e){
	e.stopPropagation()
	$(".vmeng").show()
})
$(".close").click(function(e){
	e.stopPropagation()
	$(".vmeng").hide()
})
//纠错
$(".errorsp").click(function(e){
	e.stopPropagation()
	$(".errormeng").show()
})
$(".turnoff,.cancel").click(function(e){
	e.stopPropagation()
	$(".errormeng").hide()
})
$(".jiucuo").click(function(e){
	e.stopPropagation()
	
})

$(document).click(function(e){
	e.stopPropagation()
	$(".vmeng").hide()
	$(".meng").hide()
	$(".errormeng").hide()
})
//手工选车
//$(".car").click(function(){
//	window.location.href="content/car1.html"
//})
$(".car_sg  .search ").click(function(e){
	e.stopPropagation()
 	window.location.href="content/search.html"	
})
	
//vin码查询
$(".vinma .vinbtn").click(function(){
    var runprcbh = $(".vininput").val().toUpperCase();
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
//  $("#loading").show();
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
//      	$("#loading").hide();
        	if(jQuery.isEmptyObject(data)){
        		alert("沒有数据");
        		return false;
        	}
        	if(data.list.length == 0 || data.list == []){
        		alert("没有查询到结果");
        		return false;
        	}
        	$(".vinul2").html("")
        	$(".name-span").text(data.car_info[0].Vehicle_Name_CN)
            $(".cn-span").text(data.car_info[0].Manufacture_CN)
            $(".year-span").text(data.car_info[0].LaunchEOPYear)  
            fenlei(data.list,".vinul2")
        	
//          localStorage.particulars =JSON.stringify(data);
//			window.location.href="./content/particulars_vin/particulars_vin.html?year="+vin_year;
        },
        error:function(data){
//          $("#loading").hide();
        }
    })
})
	


//纠错提交
$(".submit").click(function(){

    if($(".inp1").val() == ""){
        alert("请填写您的产品编号");
        return false;
    }
    //验证电话号码
    var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
    if($(".inp2").val().match(reg) == null){
         alert("请填写正确的手机号码");
        return false;
    }

    if($(".inp2").val() == ""){
        alert("请填写您的姓名");
        return false;
    }
    if(confirm("是否提交纠错")){
        $.ajax({
            type:"post",
            url:network+"/MattrioEcModel/ProductErrorCorrectionIntface/addProductErrorCorrection",
            data:{
                "brand_id":username_id,
                "product_id":$(".inp4").val(),
                "new_product_id":$(".inp1").val(),
                "phone":$(".inp2").val(),
                "name":$(".inp3").val()
            },
            dataType:"json",
            success:function(data){
                alert("提交成功");
                $(".errormeng").hide();
            },
            error:function(data){
                alert("提交失败");
            }
        })
    }else{
        // console.log(2);
    }


})



function fun(sename){
	
	$(".right").find("span").addClass("focus")
	$(".left").find("span").removeClass("focus")
	$(".wrap_vin").hide()
	$(".wrap_car").show()
	if(getUrlParam("?year")!=null&&getUrlParam("?year")!="null"){
		$(".carname").text(getUrlParam("?car"))
		var nian=getUrlParam("?year").substring(0,getUrlParam("?year").indexOf("/"))
	    $(".carname_content").text(nian+"年款"+" "+getUrlParam("?type")+" "+getUrlParam("?output")+"排量")
	    sessionStorage.setItem("carname",getUrlParam("?car"))
	    sessionStorage.setItem("text",nian+"年款"+" "+getUrlParam("?type")+" "+getUrlParam("?output")+"排量")
	}else{
		$(".carname").text(sessionStorage.carname)
		$(".carname_content").text(sessionStorage.text)
	}
	
	var datalist=JSON.parse(sessionStorage.getItem(sename))
    fenlei(datalist,".shou")

	console.log(datalist)
}

function fenlei(dataval,wrap){
		var jinarr=[];
		var yuanarr=[];
		var qianarr=[];
		var houarr=[];
		var houzhuanarr=[];
		var gaoarr=[];
		var daoarr=[];
	    var jinname;
	    var yuanname;
	    var qianname;
	    var houname;
	    var houzhuanname;
	    var gaoname;
	    var daoname;
	    
		$.each(dataval,function(key,val){	
			if(val.category_name.indexOf("近")!=-1){	
				jinname=val.category_name.substring(val.category_name.indexOf("近"),val.category_name.indexOf(" "))
				if(jinarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					jinarr.push(val.product_id.replace(/\s+/g,""))
				}
	
			}
			if(val.category_name.indexOf("远")!=-1){
				yuanname=val.category_name.substring(val.category_name.indexOf("远"),val.category_name.indexOf(" "))
				if(yuanarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					yuanarr.push(val.product_id.replace(/\s+/g,""))
				}
				
			}
			if(val.category_name.indexOf("前")!=-1){
				qianname=val.category_name.substring(val.category_name.indexOf("前"),val.category_name.indexOf(" "))
				if(qianarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					
					qianarr.push(val.product_id.replace(/\s+/g,""))
				}
				
			}
			if(val.category_name.indexOf("后雾")!=-1){
				houname=val.category_name.substring(val.category_name.indexOf("后雾"),val.category_name.indexOf(" "))
				if(houarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					houarr.push(val.product_id.replace(/\s+/g,""))
				}
				
			}
			if(val.category_name.indexOf("后转")!=-1){
				houzhuanname=val.category_name.substring(val.category_name.indexOf("后转"),val.category_name.indexOf(" "))
				if(houzhuanarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					houzhuanarr.push(val.product_id.replace(/\s+/g,""))
				}
				
			}
			if(val.category_name.indexOf("高")!=-1){
				gaoname=val.category_name.substring(val.category_name.indexOf("高"))
				if(gaoarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					gaoarr.push(val.product_id.replace(/\s+/g,""))
				}
				
			}
			if(val.category_name.indexOf("倒")!=-1){
				daoname=val.category_name.substring(val.category_name.indexOf("倒"))
				if(daoarr.indexOf(val.product_id.replace(/\s+/g,""))==-1){
					daoarr.push(val.product_id.replace(/\s+/g,""))
				}
				
			}
		      
		})
		if(jinarr.length>0){
			var jinid='';
			$.each(jinarr,function(key,value){
				jinid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+jinname+": </span><span>"+jinid+"</span>")
	
			li1.appendTo(wrap)
		}
	
		if(yuanarr.length>0){
			var yuanid='';
			$.each(yuanarr,function(key,value){
				yuanid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+yuanname+": </span><span>"+yuanid+"</span>")
	
			li1.appendTo(wrap)
		}
		if(qianarr.length>0){
			var qianid='';
			$.each(qianarr,function(key,value){
				qianid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+qianname+": </span><span>"+qianid+"</span>")
	
			li1.appendTo(wrap)
		}
		
		if(houarr.length>0){
			var houid='';
			$.each(houarr,function(key,value){
				houid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+houname+": </span><span>"+houid+"</span>")
	
			li1.appendTo(wrap)
		}
		
		if(houzhuanarr.length>0){
			var houzhuanid='';
			$.each(houzhuanarr,function(key,value){
				houzhuanid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+houzhuanname+": </span><span>"+houzhuanid+"</span>")
	
			li1.appendTo(wrap)
		}
		
		if(gaoarr.length>0){
			var gaoid='';
			$.each(gaoarr,function(key,value){
				gaoid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+gaoname+": </span><span>"+gaoid+"</span>")
	
			li1.appendTo(wrap)
		}
		
		if(daoarr.length>0){
			var daoid='';
			$.each(daoarr,function(key,value){
				daoid+=value+"&nbsp;&nbsp;&nbsp;"
			})
			var li1=$("<li>").html("<span>"+daoname+": </span><span>"+daoid+"</span>")
	
			li1.appendTo(wrap)
		}
		
	}