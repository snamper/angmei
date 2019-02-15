if (localStorage) {
	var network = localStorage.getItem("network");
	var cont = JSON.parse(sessionStorage.cont);
}else{
	var network = $.cookie("network");
	var cont = $.JSONCookie("cont");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

$("#loading").show();
var nplblk = getUrlParam('?e');
var hmodtyp = getUrlParam('?f');
var oe = getUrlParam('?oe');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var name1 = getUrlParam('?h');
var name2 = getUrlParam('?i');
var image = getUrlParam('?imgsrc');;
var parameters=getUrlParam('?parameters');
var localtion=getUrlParam('?localtion');
var type=getUrlParam('?type');
if(name1){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}
$(".name1").html(name1);
$(".name2").html(name2);
$("<img class='img' src='"+image+"'>").appendTo("#viewer2");
$(".img").load(function(){
	getEpcInfo(userid,nplblk,hmodtyp);
})

var width;
//$(function(){
//	var imgSrc = $(".img").attr("src");
//	getImageWidth(imgSrc,function(w,h){
//		width = w;
//	});
//});

function getImageWidth(url,callback){
	var img = new Image();
	img.src = url;
	if(img.complete){
		callback(img.width, img.height);
	}else{
		img.onload = function(){
			callback(img.width, img.height);
		}
	}
}

//上下翻页
if(epcnum == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
}
if(epcnum == cont.length-1){
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
if(choice == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
var num = parseInt(epcnum);
$("#next").click(function(){
	$("#loading").show();
	$("#topone").removeAttr("disabled");
	$('#topone').css("background","#e94740");
	num += 1;
	if(num >= cont.length-1){
		$('#next').attr('disabled',"true");
		$('#next').css("background","#ccc");
		num = cont.length-1;
	}
	var nplblk = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
	$("#viewer2").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo("#viewer2");
	getEpcInfo(userid,nplblk,hmodtyp);
})
$("#topone").click(function(){
	$("#loading").show();
	$("#next").removeAttr("disabled");
	$('#next').css("background","#e94740");
	num -= 1;
	if(num <= 0){
		$('#topone').attr('disabled',"true");
		$('#topone').css("background","#ccc");
		num = 0;
	}
	var nplblk = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
	$("#viewer2").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo("#viewer2");
	getEpcInfo(userid,nplblk,hmodtyp);
})

function getEpcInfo(userid,nplblk,hmodtyp){
	if(type=="11"){
		var ourl=network+"/Mattrio/ChangChengEpcInterface/getChangChengOes"
		$(".th").show()
	}else{
		var ourl=network+"/Mattrio/HaimaEpcInterface/getHaimaOes"
	}
	$.ajax({
		type:"post",
		url:ourl,
		data:{
			"userid":userid,
			"category_id2":nplblk,
			"parameters":parameters
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			if(data.recode=='-3'){
	            alert("当天次数已用完!");
	            $("#loading").hide();
	            return false;
	        }
			$("#loading").hide();
			$("tbody").html("");
			$.each(data.list,function(key,value){
				if(localtion== ""){
					var tr = $("<tr>");
				}else if(value.location == localtion){
					var tr = $("<tr class='tr1'>");
				}else{
					var tr = $("<tr>");
				}
//				var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox'  name='gay'></span></p></td>");
//				var td1 = $("<td>").html(value.callout);
				if(value.location){
					var td2 = $("<td>").html(value.location);
				}else{
					var td2 = $("<td>").html("");
				}
				if(value.oe_number){
					var td3 = $("<td class='oecont'>").html("<span>"+value.oe_number+"</span>");
				}else{
					var td3 = $("<td class='oecont'>").html("");
				}
				if(value.oe_name){
					var td4 = $("<td>").html(value.oe_name);
				}else{
					var td4 = $("<td>").html("");
				}
				if(value.number){
					var td5 = $("<td>").html(value.number);
				}else{
					var td5 = $("<td>").html("");
				}
//				td0.appendTo(tr);
//				td1.appendTo(tr);
				td2.appendTo(tr);
				td3.appendTo(tr);
				td4.appendTo(tr);
				if(type=="11"){
					if(value.price){
						var td6 = $("<td>").html(value.price);
					}else{
						var td6 = $("<td>").html("");
					}
					if(value.remark){
						var td7 = $("<td class='td' title='"+value.remark+"'>").html(value.remark);
					}else{
						var td7 = $("<td>").html("");
					}
					td7.appendTo(tr);
					td6.appendTo(tr);
				}
				td5.appendTo(tr);
				tr.appendTo("tbody");
			})
//			$(function(){
//				$("#checkbox").selectCheck();
//			})
//			//点击获取坐标
			if(type!="11"){
				$.each(data.points,function(key,value){
					var widx=value.x2-value.x
					var heigy=value.y2-value.y
					$(function(){
						var imgSrc = $(".img").attr("src");
						getImageWidth(imgSrc,function(w,h){
								width = w;
							});
					});
					var scale = $("#viewer2 img").width()/width;
					var span = $("<span style='position:absolute;top:"+(value.y*scale-3)+"px;left:"+(value.x*scale-3+parseInt($("#viewer2 img").css("margin-left")))+"px;width:"+widx+"px;height:"+heigy+"px;' class='span"+value.location+"'>");
					span.appendTo("#viewer2");
				})
			}
//
			$("#viewer2 span").click(function(){
				$("tbody tr").removeClass("tr1");
				$(this).css({"border":"2px solid red"}).siblings("span").css({"border":"0"});
				for(var i = 0 ; i< $("tbody tr").length; i++ ){
					if($("tbody tr").eq(i).children("td").eq(0).html() == $(this)[0].className.split("n")[1]){
						$("tbody tr").eq(i).addClass("tr1");
					}
				}

				var height = 0;
				$.each($("tbody tr"),function(key,value){
					if(key < $(".tr1").index()-1){
						height += Number($(value).height());
					}
				})
				$('html, body').animate({  
                    scrollTop:height+600
                }, 400);
			})
//			
//			//OE
			var height = 0;
			$.each($("tbody tr"),function(key,value){
				if(key < $(".tr1").index()){
					height += Number($(value).height());
				}

			})

			if(oe == ""){
				$('html, body').animate({  
	                scrollTop:height
	            }, 400);
			}else{
				$('html, body').animate({  
	                scrollTop:height+600
	            }, 400);
			}
//			//下载
//			$("#btn").click(function(){
//				var id_array=new Array();  
//				$('input[name="gay"]:checked').each(function(){
//				    id_array.push($(this).parent("span").parent("p").parent("td").parent("tr").index());//向数组中添加元素  
//				});
//				if(id_array.length == 0){
//					alert("选择您要导出的选项");
//					return false;
//				}
//				var iarray=new Array(); 
//				$.each(id_array,function(key,value){			
//					iarray.push(data.list[value].oe);
//				})
//				var oenumbers = iarray.join(",");
//				window.location.href = network+"/Mattrio/HondaEpcInterface/exportOeExcel?&oenumbers="+oenumbers+"&NPL="+npl+"&hmodtyp="+hmodtyp;
//			})
			$("tbody tr").click(function(){
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$("#viewer2 span").css({"border":"0"})
				for(var i = 0 ; i< $("#viewer2 span").length; i++ ){
					if($("#viewer2 span")[i].className.split("n")[1] == $(this).children("td").eq(0).html()){
						$($("#viewer2 span")[i]).css({"border":"2px solid red"});
					}
				}
			})
		},
		error:function(data){
//			console.log(data);
		}
	})
}
$("#bottom").click(function(){
	$('html, body').animate({scrollTop:$("body").height()}, 200); 
})
$(document).on("click",".oecont span",function(){
//	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
	window.location.href="../../content/maintain/oecont/oecont.html?oenumber="+$(this).html()
})
