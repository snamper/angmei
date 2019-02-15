if (localStorage) {
    var network = localStorage.getItem("network");
} else {
    var network = $.cookie("network");
}

$(".img_left").css("top", -$(".img_left").height() + "px");
setTimeout(runImg, 1000);

function runImg() {
    $(".img_left").animate({ "top": "0px" }, 500);
    $(".img_right").animate({ "right": "10px" }, 500);
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
var loginid = getUrlParam('?loginid');
var mikey = getUrlParam('?mikey');
var recode='';
if(mikey){
    $(".contentcxmikey").addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
//  $(".contentsh").hide();
}
if (loginid) {
    if (localStorage) {
        localStorage.setItem("network", "https://www.51macc.com/api");
        var network = localStorage.getItem("network");
    } else {
        $.cookie("network", "https://www.51macc.com/api", { path: "/" });
        var network = $.cookie("network");
    }
    $.ajax({
        type: "post",
        url: network + "/Mattrio/LoginInterface/AuthorizedLogin",
        data: {
            "loginid": loginid
        },
        dataType: "json",
        cache: false,
        async: false,
        crossDomain: true == !(document.all),
        success: function(data) {
             if (data.recode == -3) {
                alert(data.msg);
                window.location.href = "./index.html";
                return false;
            }
            $.cookie("username", data.other, { expires: 7, path: "/" });
            $.cookie("frequency", data.frequency.frequency, { expires: 7, path: "/" });
            $.cookie("user_id", data.user_id, { expires: 7, path: "/" });
            $.cookie("phone", data.phone, { expires: 7, path: "/" });
            $.cookie("loginmode", "第三方", { expires: 7, path: "/" });
        }
    })
}
var userid = $.cookie("user_id");
var name = $.cookie("username");
var frequency = $.cookie("frequency");
var phone = $.cookie("phone");
$(".user_phone").val(phone)

if($.cookie("loginmode") == undefined){
    var loginmode = "" ;
}else{
    var loginmode = $.cookie("loginmode");
}
$("#loading").hide();

$(".contentcxyear").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".contentyear").show();
    $(".cont_vin").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
//  $(".contentsh").hide();
    $(".cont_epc").hide();
})
$(".contentcxvin").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").show();
    $(".contentyear").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
//  $(".contentsh").hide();
    $(".cont_epc").hide();
});
$(".contentcxmikey").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
//  $(".contentsh").hide();
    $(".cont_epc").hide();
});


$(".contentcxgz").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentgz").show();
    $(".contentoe").hide();
//  $(".contentsh").hide();
    $(".cont_epc").hide();
});

$(".contentcxoe").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentgz").hide();
    $(".contentoe").show();
//  $(".contentsh").hide();
    $(".cont_epc").hide();
    $('.tooltip').addClass('tooltip-show')
    setTimeout(function(){
    	$('.tooltip').removeClass('tooltip-show')	
    },4000)
});
$("#login").click(function(e){
    e.stopPropagation()
     $('.loginImg p').each(function(key,value){
    	$(value).css('animation-delay',0.1*key+'s')
    })
    $(".images_al").show()
    $(".images_bottom").hide()
    $('.loginwrap').show().addClass('animated bounceIn')
    $('.loginImg p').addClass('animated bounceInRight')
})
$('.loginwrap .none').click(function(){
	$(document).click()
})

$(".oelistimg").click(function(){
	$(this).toggleClass('oelisttog')
	$(".contentoe textarea").slideToggle(500,function(){
		$(".contentoe input").toggle()
	})
})
$("#s1,#btn,.btnyear,.mikeybtn,.gzhbtn,.oebtn,.shcxbtn,.oelistimg,.biemingimg,.bianma").click(function(e) {
    stopPropagation(e)
 	if((name == undefined || name == "undefined" || name == "null" || name == null)){
 		// if (confirm("是否登录") == true) {
            $(".images_al").show()
            $(".images_bottom").hide()
            $('.loginwrap').show().addClass('animated bounceIn')
	        // window.location.href = "./login/login.html";
	    // }
 	}else if(phone == undefined || phone == "undefined" || phone == "null" || phone == null || phone == ""){
 		if (confirm("您还没有绑定手机号码，需要绑定手机号码后才能查询")) {
	        $(".b_phone").fadeIn();
	        $(".bingtit span").click(function() {
	            $(".b_phone").fadeOut();
	        });
	    }
 	}
});
//退出登录
$(".tuichu").click(function() {
    $.cookie("username", null, { path: '/' }); 
    window.location.href = "./index.html";
})
if (name == undefined || name == "undefined" || name == "null" || name == null) {
    //没有登录
    $(".navright").show();
    $(".navright1").hide();
} else if (phone == undefined || phone == "undefined" || phone == "null" || phone == null || phone == "") {
	$(".navright").hide();
    $(".navright1").show();
    if (confirm("您还没有绑定手机号码，需要绑定手机号码后才能查询")) {
        $(".b_phone").fadeIn();
        $(".bingtit span").click(function() {
            $(".b_phone").fadeOut();
        });
    }
    $(".navrighttel").html(name);
    $(".navcenter").html(frequency);
} else {
	/*别名*/
	// if(!sessionStorage.getItem('bieming')){
	// 	$('.biemingmeng').show()
	// 	$('.biemingwrap').fadeIn(400)
	// }
	// sessionStorage.setItem('bieming','yes')
	$('.biemingimg').click(function(){
		$('.biemingmeng').fadeIn(100)
		$('.biemingwrap').fadeIn(400)
	})
	$(".bianma").click(function(){
		window.location.href='content/batchexport/batchexport.html'	
	})
	$('.biemingmeng').click(function(e){
		e.stopPropagation()
		$('.biemingmeng').fadeOut(100)
	})
	$('#close').click(function(){
		$('.biemingmeng').fadeOut(100)
	})
	
    //有
    frequencyfun(userid,recode)
    frequency = $.cookie("frequency");
    $(".navright").hide();
    $(".navright1").show();
    $(".navrighttel").html(name);
    $(".navcenter").html(frequency);
    // ==============按年份查询
    $("#loading").show();
    $.ajax({
        type: "post",
        url: network + "/Mattrio/SelectCar/Manufacture",
        data: {
            "year": "",
            "userid": userid
        },
        dataType: "json",
        cache: false,
        crossDomain: true == !(document.all),
        success: function(data) {
            $("#loading").hide();
            commoncitys.splice(0, commoncitys.length);
            citys.splice(0, citys.length);
            for (var i = 0; i < data.all.length; i++) {
                commoncitys[i] = data.all[i];
            }
            for (var i = 0; i < data.all.length; i++) {
                citys[i] = data.all[i];
            }
        },
        error: function(data) {
				$("#loading").hide()
            	alert('请求失败')
        }
    })
    $("#s1").click(function() {
        fn1();
        $(".conts1").toggle().html("");
        $(".conts3").hide();
        $(".conts4").hide();
        if ($("#arrcity").val() == "") {
            var str = ['2018','2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985'];
            $.each(str, function(key, value) {
                $("<p>").html(value).appendTo($(".conts1"));
            })
        } else {
            if ($("#s3").html() == "请选择车型") {
                var VehicleName = "";
            } else {
                var VehicleName = $("#s3").html();
            }
            if ($("#s4").html() == "请选择销售名称") {
                var Nameofsales = "";
            } else {
                var Nameofsales = $("#s4").html();
            }
            $("#loading").show();
            $.ajax({
                type: "post",
                url: network + "/Mattrio/SelectCar/Years",
                data: {
                    "Manufacture": $("#arrcity").val(),
                    "VehicleName": VehicleName,
                    "Nameofsales": Nameofsales,
                    "userid": userid
                },
                dataType: "json",
                cache: false,
                crossDomain: true == !(document.all),
                success: function(data) {
                    $("#loading").hide();  
                    //降序排序
       				data.sort(fn);
			        function fn(a,b){	
			        	return b.year-a.year;
			        }       
                    $.each(data, function(key, value) {
                        $("<p>").html(value.year).appendTo($(".conts1"));
                    })
                },error:function(){
                	$("#loading").hide()
            		alert('请求失败')
                }
            })
        }
    })

    $(document).on("click", ".conts1 p", function() {
        fn1();
        $("#loading").show();
        $(".conts1").hide();
        $("#s1").html($(this).html());
        $("#s1").css("color", "#000");
        if ($("#s1").html() == "选择年份") {
            var year = "";
        } else {
            var year = $("#s1").html();
        }
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/Manufacture",
            data: {
                "year": year,
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                commoncitys.splice(0, commoncitys.length);
                citys.splice(0, citys.length);
                for (var i = 0; i < data.all.length; i++) {
                    commoncitys[i] = data.all[i];
                }
                for (var i = 0; i < data.all.length; i++) {
                    citys[i] = data.all[i];
                }
            },
            error: function(data) {
            	$("#loading").hide()
            	alert('请求失败')

            }
        })
    });
    $("#box").click(function() {
        $(".conts1").hide();
        $(".conts3").hide();
        $(".conts4").hide();
        $('#arrcity').val('')
        $("#s3").html("请选择车型");
        $("#s3").css("color", "#999");
        $("#s4").html("请选择销售名称");
        $("#s4").css("color", "#999");
        if($('#arrcity').val()==''||$('#arrcity').val().length==0){
			$("#suggest").show()		
		}
    })
    $("#s3").click(function() {
        fn1();
        $("#loading").show();
        $(".conts3").toggle().html("");
        $(".conts4").hide();
        $(".conts1").hide();
        if ($("#s1").html() == "选择年份") {
            var year = "";
        } else {
            var year = $("#s1").html();
        }
        if ($("#arrcity").val() == "") {
            alert("请选择主机厂");
            $("#loading").hide();
            return false;
        }
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/VehicleName",
            data: {
                "year": year,
                "Manufacture": encodeURI($("#arrcity").val()),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                $.each(data, function(key, value) {
                    $("<p>").html(value.Vehicle_Name_CN).appendTo($(".conts3"));
                })
            },
            error: function(data) {
            	$("#loading").hide()
            	alert('请求失败')
                //console.log(data);
            }
        })
    });

    $(document).on("click", ".conts3 p", function() {
        $("#s3").html($(this).html());
        $(".conts3").hide();
        $("#s4").show();
        $(".conts4").hide();
        $("#s4").show().html("请选择销售名称");
        $("#s3").css("color", "#000");
        $("#s4").css("color", "#999");
    })
    $("#s4").click(function() {
        fn1();
        $("#loading").show();
        if ($("#s1").html() == "选择年份") {
            var year = "";
        } else {
            var year = $("#s1").html();
        }
         if ($("#arrcity").val() == "") {
            alert("请选择主机厂");
            $("#loading").hide();
            return false;
        }
         if ($("#s3").text() == "请选择车型") {
            alert("请选择车型");
            $("#loading").hide();
            return false;
        }
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/Nameofsales",
            data: {
                "year": year,
                "Manufacture": encodeURI($("#arrcity").val()),
                "VehicleName": $("#s3").html(),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                if (data == null || data.length == 0) {
                    // $("#s4").hide();
                } else {
                    $("#s4").show();
                    $(".conts4").toggle().html("");
                    $.each(data, function(key, value) {
                        $("<p>").html(value.Name_of_sales).appendTo($(".conts4"));
                    })
                    $(".conts4 p").click(function() {
                        $(".conts4").hide();
                        $("#s4").html($(this).html());
                        $("#s4").css("color", "#000");
                        if ($("#s1").html() == "选择年份") {
                            $("#s1").click();
                        }
                    })
                }
            },
            error: function(data) {
            	$("#loading").hide()
            	alert('请求失败')
                //console.log(data);
            }
        })
    });
//车型查询
    $(".btnyear").click(function() {
        var userid = $.cookie("user_id");
        fn1();
        if ($("#s1").html() == "选择年份") {
            $("#loading").hide();
            alert("请选择年份");
            return false;
        }
        if ($("#s3").html() == "请选择车型") {
            $("#loading").hide();
            alert("请选择车型");
            return false;
        }
        if ($("#s4").html() == "请选择销售名称") {
            $("#loading").hide();
            alert("请选择销售名称");
            return false;
        }
        if (sessionStorage) {
            sessionStorage.setItem("searc", "");
        } else {
            $.cookie("searc", null, { path: "/" });
        }

        $("#loading").show();
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/QueryCar",
            cache: false,
            data: {
                "year": $("#s1").html(),
                "Manufacture": encodeURI($("#arrcity").val()),
                "VehicleName": $("#s3").html(),
                "Nameofsales": $("#s4").html(),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                recode=frequencyfun(userid,recode)
                if(recode==0){
                	alert("当天次数已用完!");
                	return false;
                }
                _czc.push(["_trackEvent", "在首页四步查询",name + phone + loginmode, 0, "btnyear"]);
                fn(data);
            },
            error: function(data) {
            	$("#loading").hide()
            	alert('请求失败')
            }
        })

    });
    //vin查询
    $("#btn").click(function() {
        var userid = $.cookie("user_id");
        fn1();
        if (!jQuery("#search").val()) {
            alert("输入的内容不能是空");
            return false;
        }
        var vin = $.trim($("#search").val());
//      var reg = /^\w{17}$/;
//      if (vin.match(reg) == null) {
//          alert("请填写正确的VIN码");
//          return false;
//      }
        var search = $.trim($("#search").val().toUpperCase());
        
        $("#loading").show();
        if(search.length<17&&search.substr(0,1)=='M'){
        	if(sessionStorage) {
	            sessionStorage.setItem("searc", "");
	        } else {
	            $.cookie("searc", null, { path: "/" });
	        }
        	$.ajax({
	            type: "post",
	            url: network + "/Mattrio/CarInterface/query_mikey",
	            data: {
	                "mikey": search,
	                "userid": userid
	            },
	            dataType: "json",
	            cache: false,
	            crossDomain: true == !(document.all),
	            success: function(data) {
	                $("#loading").hide();
	                recode=frequencyfun(userid,recode)
	                if(recode==0){
	                	alert("当天次数已用完!");
	                	return false;
	                }
	                fn1(data);
	                _czc.push(["_trackEvent","查询mikey", name + phone + loginmode ,  0, "mikeybtn"]);
	                if (sessionStorage) {
	                    addDataList('vinlist', search);
	                }
	                fn(data);
	            },
	            error: function(data) {
	                //console.log(data);
	            }
	        })
        }else{
        	if (sessionStorage) {
	            var searc = sessionStorage.setItem("searc", search);
	        } else {
	            var searc = $.cookie("searc", search);
	        }
        	$.ajax({
	            type: "post",
	            url: network + "/Mattrio/VinInterface/queryvin",
	            data: {
	                "userid": userid,
	                "vin": search
	            },
	            dataType: "json",
	            cache: false,
	            crossDomain: true == !(document.all),
	            success: function(data) {
	                $("#loading").hide();
	                recode=frequencyfun(userid,recode)
	                if(recode==0){
	                	alert("当天次数已用完!");
	                	return false;
	                }
	                if (sessionStorage) {
	                    addDataList('vinlist', search);
	                }
	                 _czc.push(["_trackEvent","在首页查询VIN", name + phone + loginmode , 0, "vinbtn"]);
	                fn(data,search);
	            },
	            error: function(data) {
	            	$("#loading").hide()
					alert('请求失败')
	            }
	        })
        }
        return false
    })
    function fn(data,vin){
        var data = data;
        if (data.recode == -3) {
            $("#loading").hide();
            alert(data.msg);
            return false;
        }
        if (data.recode == -999) {
            alert(data.msg);
            $.cookie("username", null, { path: '/' });
            window.location.href = "./login/login.html";
            return false;
        }
        if (data.recode == -5) {
            $("#loading").hide();
            alert("格式不正确");
            return false;
        } else {
            $("#loading").hide();
            //判断是去哪个页面
            if (data.list.length == 0) {
                alert("暂无数据");
                return false
            } else if (data.list.length > 1) {
                if (sessionStorage) {
                    sessionStorage.key1 = JSON.stringify(data);
                } else {
                    $.JSONCookie("key1", data, { path: '/' });
                }
                window.location.href = "./content/particulars/particulars_select.html?vin="+vin;
                return false;
            } else {
                if (sessionStorage) {
                    sessionStorage.keyname = JSON.stringify(data.list[0]);
                } else {
                    $.JSONCookie("keyname", data.list[0], { path: '/' });
                }
                window.location.href = "./content/particulars/particulars.html?vin="+vin;
            }
        }
    }
    //oe查询
    $(".oebtn").click(function() {
        fn1(); 
         _czc.push(["_trackEvent", "在首页查询oe",name + phone + loginmode , 0, "oebtn"]);
        if($("#oehao").is(':visible')){
	        if (!$(".contentoe input").val()) {
	            alert("输入的内容不能是空");
	            return false;
	        }	
	        if($("#oehao").val() == "") {
				alert("请输入您要查询的编码");
				return false;
			}
	        $("#loading").show();
		    searchoe($("#oehao").val())
        	
       }else{
			var numlistarr=$('textarea').val()
			sessionStorage.setItem('numlist',JSON.stringify(numlistarr))
			window.location.href='content/batchexport/batchexport.html'	
       }   
    })
    $('.tab').click(function(){
    	 $(this).addClass('tabbg').siblings('.tab').removeClass('tabbg')
    	 if($(this).text()=='OE信息'){
			$(".oetable").show()
			$(".shtable").hide()
			$(".nonetable").hide()
		}else if($(this).text()=='售后品牌'){
			$(".oetable").hide()
			$(".shtable").show()
			$(".nonetable").hide()
		}else{
			$(".oetable").hide()
			$(".shtable").hide()
			$(".nonetable").show()
		}
    })
    $('.images_all_oe').click(function(e){
    	e.stopPropagation() 	
    })
    //oe模糊匹配
	$(document).on("input","#oehao",function(){
	   	mohupipei("#oehao","#oelist","/Mattrio/OeInterface/LikeOeList")
	})
	fun("#oehao","p","#oelist")
}
function fn1(){
    if (userid == undefined || userid == "undefined" || userid ==null || userid == "null") {
        $.cookie("username", null, { path: '/' });
        window.location.href = "./login/login.html";
        return false;
    }
}
//oe模糊搜索
function mohupipei(inputid,divid,ajurl){
	var ar=[]
   	var oezz=$(inputid).val().toLowerCase().replace(/\s+|-/g,"")
   	var oelength=oezz.length
   	if(oezz==''||oezz.length==0){
   		$(divid).hide()
   		$("#oehao").attr('list','oedatalist')
   		return false;
   	}
   	$("#oehao").attr('list','')
   	$.ajax({
   		type:"post",
        dataType: "json",
   		url: network +ajurl,
   		data:{"oe_number":oezz},
   		success:function(data){
   			if($(inputid).val()==''||$(inputid).val().length==0){
   				$(divid).hide()
   				return false;
   			}
   			if(data.list==[]||data.list.length==0){
   				$(divid).hide()
   				return false;
   			}
	         $(divid).show()
	         $(divid).html('')
	         //数组去重
			 $.each(data.list,function(key,val){
				if(ar.indexOf(val.oe_number)<0){
					ar.push(val.oe_number)
				}	
			})
			 //突出输入的值  为红色
			 $.each(ar,function(key,val){
			 	var strArr=val.split(oezz.toUpperCase())
				var oelist =$('<p title='+val+'>').html(strArr[0]+"<span style='color:red'>"+oezz.toUpperCase()+"</span>"+strArr[1])
				oelist.appendTo(divid)
			})
   		},
   		error:function(){	
   			
   		}	
   	});
}
//OE查询
function searchoe(num){
	var oenum=num;
	 $.ajax({
					type: "post",
					url: network + "/Mattrio/OeInterface/queryOenumber",
					data: {
						"oenumber": oenum.replace(/\s|-/g, ""),
						"userid": userid
					},
					dataType: "json",
					cache: false,
					crossDomain: true == !(document.all),
					success: function(data) {
						recode=frequencyfun(userid,recode)
						if(recode==0){
							$("#loading").hide()
		                	alert("当天次数已用完!");
		                	return false;
		                }
						if(data.list.length==0){
							 $.ajax({
									type: "post",
									url:  network +"/Mattrio/OeInterface/queryPrductRelevant",
									data: {
										"product_id":$.trim(oenum),
										"userid": userid
									},
									dataType: "json",
									cache: false,
									crossDomain: true == !(document.all),
									success: function(da) {
										$("#loading").hide()
										recode=frequencyfun(userid,recode)
										if(recode==0){
						                	alert("当天次数已用完!");
						                	return false;
						                }
										if(da.products.length==0){
											 alert("暂无数据");
										}else{
											addDataList('oedatalist',$.trim(oenum));
											if(da.type=="1"){
												window.location.href ="./content/aftermarket/afterdsf/afterdsf.html?product_id=" + $.trim($("#oehao").val()); 
											}else{								
												window.location.href = "./content/aftermarket/aftermarket.html?product_id=" + $.trim($("#oehao").val());
											}	
										}
									},
									error: function(data) {
										$("#loading").hide()
										alert("请求失败")
									}
							})						 
						}else{
							addDataList('oedatalist',oenum.replace(/\s|-/g, ""));
							$("#loading").hide()
							if(data.list[0].parent_name=="第三方"){
								window.location.href ="./content/maintain/oedsf/oedsf.html?oenumber=" + data.list[0].oe_numbers;						
							}else{
								window.location.href ="./content/maintain/oecont/oecont.html?oenumber=" + data.list[0].oe_numbers;							
							}
						}
					},
					error: function(data) {
						$("#loading").hide()
						alert("请求失败")
					}
			})
}
//回车
$(document).keydown(function(e){
    if(e.keyCode==13){
    	if($('.cont_vin').is(':visible')){
			$('#btn').click()
		}else if($('.contentmikey').is(':visible')){
			$('.mikeybtn').click()
		}else if($('.cont_epcinp').is(':visible')){
			$('#btn_epc').click()
		}else if($('.contentyear').is(':visible')){
			$('.btnyear').click()
		}
    }
})
//模糊搜索事件
function fun(haoma,haomap,hmlist){
	$(haoma).click(function(e){
	   	 	e.stopPropagation()
	  })
	$(haoma).focus(function(e){
	   	 e.stopPropagation()
	   	 if($(this).val()!=''||$(this).val().length!=0){
	   	 	$(hmlist).show()	
	   	 }
	})
	$(hmlist).on('click',haomap,function(e){
	   	e.stopPropagation()
	   	$(haoma).val($(this).text())
	   	$(hmlist).hide()
	})
}
// 新改页面
$(".images_top_left").click(function(e){
    $(".images_al").fadeIn(500);
    $(".images_bottom").show();
    $(".images_all_oe").hide()
    $(".images_al").show()
    $('.loginwrap').hide().removeClass('animated bounceIn')
    $('.loginImg p').removeClass('animated bounceInRight')
    $('.images_bottom').show()
})
$('.loginwrap').click(function(e){
    stopPropagation(e)
})
$(".images .images_bottom_car img").mouseover(function(){
    $(this).stop().animate({width:"56px","margin-top":"-3px","margin-left":"-3px"},100)
}).mouseout(function(){
    $(this).stop().animate({width:"46px","margin-top":"2px","margin-left":"0px"},100)
})
$(".images .images_top img").mouseover(function(){
    $(this).stop().animate({width:"145px"},100)
}).mouseout(function(){
    $(this).stop().animate({width:"130px"},100)
})
$(".images_allcar_close").click(function(){
    $(".images_all").fadeOut();
    $(".images_al").fadeOut()
    $("body,html").animate({scrollTop:0},0);
})
var carlog={"dazhong.jpg":"大众","aodi.jpg":"奥迪","baoma.jpg":"宝马","benchi.jpg":"奔驰","bentian.jpg":"本田","xiandai.jpg":"现代","richan.jpg":"日产","rongwei.jpg":"荣威","yingfeinidi.jpg":"英菲尼迪","ouge.jpg":"讴歌","MINI.jpg":"MINI","smart.jpg":"SMART","MG.jpg":"名爵","mazida.jpg":"马自达","fengtian.jpg":"丰田","kaidilake.jpg":"凯迪拉克","bieke.jpg":"别克","xuefolan.jpg":"雪佛兰","haima.jpg":"海马","zhangcheng.jpg":"长城","wey.jpg":"魏派", "hafu.jpg":"哈弗(长城)"};
var carligDisable={"DS.jpg":"DS(长安标致雪铁龙)","fute.jpg":"福特","baoshijie.jpg":"保时捷(进口)","jiebao.jpg":"捷豹(进口)","luhu.jpg":"路虎(进口)","sikeda.jpg":"斯柯达","xiyate.jpg":"西雅特(进口)","xuetielong.jpg":"雪铁龙","biyadi.jpg":"比亚迪","zhongtai.jpg":"众泰"};
$.each(carlog,function(key,value){
    var li = $("<li class='li' title='"+value+"' id='"+key.charAt(0)+"'>").html("<div class='box'><img src='https://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/"+key+"' title='"+value+"'></div><p>"+value+"</p>");
	var p=$('<p title="'+key.charAt(0)+'">').html('<img src="https://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/'+key+'">'+value)
    p.appendTo('.carname')
    li.appendTo(".images_bottom ul");
})
// var EPCarr1 =   $('.li');
// EPCarr1.sort(function(a,b){
//     return a.getAttribute('id').localeCompare(b.getAttribute('id'))
// });
// //对li进行排序
// $('.images_bottom ul').empty().append(EPCarr1);
// var EPCarr2 =  $('.carname p');
// EPCarr2.sort(function(a,b){
//     return a.getAttribute('title').localeCompare(b.getAttribute('title'))
// });
// //对li进行排序
// $('.carname').empty().append(EPCarr2);
$.each(carligDisable,function (key,value) {
    var li = $("<li class='eli' title='"+value+"'>").html("<div class='disable'></div><div class='box'><img src='https://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/"+key+"' title='"+value+"'></div><p>"+value+"</p>");
    li.appendTo(".images_bottom ul");
})
/*epc查询*/
$(".images_bottom").click(function(e){
	e.stopPropagation()
})
$(".images_bottom ul .li").click(function(e){
	e.stopPropagation()
    // var vinlist=['LFV3B28U9G3033123','LBV5S1109GSL57385','LE4HG3GB5EL164061','LHGGM363992000771','LSGKE54H7GW244067','LFV2A21K6E4003382','JTEGD54M57A002582','LH17CKJF58H233258','LGWEF4A55GH074071','LSGAR5AL0GH118503','','WMWZG3107CTY44765','LSJW24H33AS044296','','LGBF5AE06DR032830','LSJW34RAXDG108769','WMEEJ3CA3FK813730','LGWEF7A78HH250910','LBEADADC2GX010031','LSGVT54Z15Y028499','JNKCY11E9FM672726','LGWEF7A78HH250910'];
	var vinlist=['LFV2A21K6E4003382','LFV3B28U9G3033123','LBV5S1109GSL57385','LE4HG3GB5EL164061','LHGGM363992000771','LBEADADC2GX010031','LGBF5AE06DR032830','LSJW34RAXDG108769','JNKCY11E9FM672726','','WMWZG3107CTY44765','WMEEJ3CA3FK813730','LSJW24H33AS044296','','JTEGD54M57A002582','LSGAR5AL0GH118503','LSGKE54H7GW244067','LSGVT54Z15Y028499','LH17CKJF58H233258','LGWFFEA59CF099507','LGWEF7A78HH250910','LGWEF4A55GH074071'];
//	$('.images_all_men').show()
	$(".cont_epcinp ").show()
    $(".cont_epcinp span").html("<img src='"+$(this).find("img").attr("src")+"'/>"+$(this).find("img").attr("title"));
    $(".images_al").fadeOut();
    if($(this).find("img").attr("title")=='哈弗(长城)'){
    	$('#epc_inp').attr('list','哈弗长城') 
    }else{
    	$('#epc_inp').attr('list',$(this).find("img").attr("title")) 
    } 
    $('.Epclist').attr('id',$(this).find("img").attr("title"))
    $('.Epclist').html('')
    if($(this).find("img").attr("title")=='哈弗(长城)'){
    	initDataList('哈弗长城'); 
    }else{
    	initDataList($(this).find("img").attr("title"));  
    } 
    $('.example .name').text($(this).find("img").attr("title"))
    $('.example .vin').text(vinlist[$(this).index()])
})
$(".contentepc").click(function(e){
	e.stopPropagation()
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
    $(".cont_epc").show();
})
//弹框
$(".images_bottom ul .eli").click(function(){
	$(".tkmeng").show()
})
$(".confirm").click(function(e){
	e.stopPropagation()
	$(".tkmeng").fadeOut()	
})
$(".tkcontent,.tkmeng").click(function(e){
	e.stopPropagation()	
})
$(document).on("click",".images_all_con div",function(e){
    e.stopPropagation()
})
$(document).on("click",".images_all_con div p",function(){
    $(".images_al").hide();
    $(".cont_epc ").hide()
    $(".contentyear ").hide()
    $(".cont_epcinp ").hide()
    $(".cont_vin").show()
    $('.contentcxvin ').addClass('active').siblings('p').removeClass('active')
    
})
$(document).on("click",".images_all_con div span",function(){
//	$('.images_all_men').hide()
    $(".images_all_con").fadeOut();
})
$(document).click(function(e) {
    e.stopPropagation()
	$('.images_all_meng').hide()
    $('.images_all_con').hide()
    $('.images_al').fadeOut()
    $('#oelist').hide()
    $('.carname').hide()
})
function addDataList(key, value) {
    var list = localStorage.getItem(key);
    if (list == null) {
        list = "";
        list += value + ',';
        localStorage.setItem(key, list);
    } else {
        if (list.indexOf(value) == -1) {
            list += value + ',';
            localStorage.setItem(key, list);
        }
    }
}