if (localStorage) {
    var network = localStorage.getItem("network");
    var cont = JSON.parse(sessionStorage.cont);
} else {
    var network = $.cookie("network");
    var cont = $.JSONCookie("cont");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
var recode = '';

$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

$("#loading").show();
var MLBPNO = getUrlParam('?a');
var gmugno = getUrlParam('?b');
var GIILPG = getUrlParam('?c');
var txuc01 = getUrlParam('?d');
var txuc02 = getUrlParam('?e');
var txuc03 = getUrlParam('?f');
var txuc04 = getUrlParam('?g');
var txuc05 = getUrlParam('?h');
var img = getUrlParam('?i');
var oe = getUrlParam('?oe');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var parameters=localStorage.getItem('ModernParameters');
var vin=getUrlParam('?vin');
var disable=true;
var compile=false;
var carType='现代';
$.ajax({
    type:"post",
    url:network+"/Mattrio/EpcCategoryInterface/getEpcCategoryPermission",
    async:false,
    data:{
        "userid": userid
    },
    success:function(data){
        if(data.list==[]||data.list.length==0){
            compile=false
        }else{
            compile=true
        }
    },error:function(){
        alert('获取权限失败')
    }
});
if(!vin||vin==null||vin=='null'){
	vin=''
	$('#novin').hide()
}
var image = img;
// $(document).ready(function(){  
// 	var iv2 = $("#viewer2").iviewer({
// 		src: image
// 	});
// });

if(oe == ""){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}

$("<img class='img' src='"+image+"'>").appendTo(".contentleft");
$(".img").load(function(){
	getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05,vin,true);
})
$(".name1").html(name1);
$(".name2").html(name2);
var width;
var height_y;
$(function(){
	var imgSrc = $(".img").attr("src");
	getImageWidth(imgSrc,function(w,h){
		width = w;
		height_y = h;
	});
});

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
/*过滤点击*/
$("#novin").click(function(){
	if(disable){
		getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05,'');
		$("#novin").text("未过滤");
		disable=false;
	}else{
		getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05,vin);
		$("#novin").text("已过滤");
		disable=true;
	}
})


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
	gmugno = cont[num].category_id2.split(",")[0];
	GIILPG = cont[num].category_id2.split(",")[1];
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05,vin,true);
    window.history.replaceState(null,null,'?a='+MLBPNO+'&b='+gmugno+'&c='+GIILPG+'&d='+txuc01+'&e='+txuc02+'&f='+txuc03+'&g='+txuc04+'&h='+txuc05+'&i='+cont[num].img.split("?")[0]+'&oe='+oe+'&epcnum='+num+'&choice='+choice+'&name1='+name1+'&name2='+name2+'&vin='+vin+'&parameters='+parameters)
    disable=true;
	$("#novin").text("已过滤");
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
	gmugno = cont[num].category_id2.split(",")[0];
	GIILPG = cont[num].category_id2.split(",")[1];
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05,vin,true);
    window.history.replaceState(null,null,'?a='+MLBPNO+'&b='+gmugno+'&c='+GIILPG+'&d='+txuc01+'&e='+txuc02+'&f='+txuc03+'&g='+txuc04+'&h='+txuc05+'&i='+cont[num].img.split("?")[0]+'&oe='+oe+'&epcnum='+num+'&choice='+choice+'&name1='+name1+'&name2='+name2+'&vin='+vin+'&parameters='+parameters)
    disable=true;
	$("#novin").text("已过滤");
})

function getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05,vin,guolv){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/HyundaiEpcInterface/getHyundaiOes",
		data:{
			"userid":userid,
			"MLBPNO":MLBPNO,
			"gmugno":gmugno,
			"GIILPG":GIILPG,
			"txuc01":txuc01,
			"txuc02":txuc02,
			"txuc03":txuc03,
			"txuc04":txuc04,
			"txuc05":txuc05,
			"parameters":parameters,
			'vin':vin
		},
		dataType:"json",
		cache: false,
        timeout: 10000, //超时时间（单位：毫秒）
		crossDomain: true == !(document.all),
		success:function(data){
			recode=frequencyfun(userid,recode)
			if(recode==0){
	            alert("当天次数已用完!");
	            $("#loading").hide();
	            return false;
	        }
			if(data.recode == -2){
				alert("请重新登陆");
				window.location.href = "/Mattrio/login/login.html";
				return false;
			}
			$("#loading").hide();
			$("tbody").html("");
			var formerlist=''
			if(guolv){
                $.each(data.list,function (key,value) {
                    !value.oe_number?value.oe_number='':value.oe_number
                    delete  data.list[key]['TXOPCT']
                    delete  data.list[key]['remark']
                })
				sessionStorage.setItem('datalist',JSON.stringify(data.list))
			}else{
                sessionStorage.getItem('datalist')?formerlist=sessionStorage.getItem('datalist'):formerlist='';
			}
			$(".contentleft").find('span').remove()
            var arr=[]
			$.each(data.list,function(key,value){
                var td1=$('<td>').html("<p><span class='check_span'><input type='checkbox' name='gay'></span></p>")
                var td2=$('<td>').html(value.callout)
                var td5=$('<td class="oecont">').html('<span>'+value.oe_number+'</span>')
				if(oe == ""){
					var tr = $("<tr></tr>");
				}else if(value.oe_number == oe){
					var tr = $("<tr class='tr1'></tr>");
				}else{
					var tr = $("<tr></tr>");
				}
				/*不一样就红色显示*/
				if(formerlist!=''&&formerlist.indexOf(JSON.stringify(value))<0){
					tr.css('color','red')
				}
                if(compile){
                    var td3 = $("<td class='name'>")
                    var img=$('<img class="compileImg none" src="../../image/compile.png">')
                    img.appendTo(td3)
                    var tdp2=$('<p class="p2">').html(value.oe_name)
                    tdp2.appendTo(td3)
                    var tdp=$('<p class="tdp none">').html('点此进行编辑')
                    tdp.appendTo(td3)
                    var div=$('<div class="compileWrap clearfix">').html('<input class="compileInp" type="text" placeholder="请输入名称" /><button><img src="../../image/compileYes.png" /></button><div class="namList"></div>')
                    div.appendTo(td3)
                    td3.click(function (e) {
                        stopPropagation(e)
                    })
                    td3.on('click','.compileImg,.tdp',function(){
                        $('.p2').removeClass('none')
                        img.addClass('none')
                        tdp.addClass('none')
                        tdp2.addClass('none')
                        td3.parents('tr').siblings('tr').find('.compileWrap').hide()
                        div.find('input').val('').attr('placeholder','请输入名称')
                        div.show()
                    })
                    $(document).click(function(e){
                        stopPropagation(e)
                        div.hide()
                        $('.p2').removeClass('none')
                    })
                    td3.on('input','.compileInp',function(){
                        if($(this).val()==''||$(this).val().length==0){
                            return false;
                        }
                        $.ajax({
                            type:"post",
                            async: false,
                            url:network+"/Mattrio/CategoryInterface/LikeCategoryList",
                            data:{
                                "category_name":$(this).val(),
                                "size":"10"
                            },
                            success:function(data){
                                td3.find('.namList').html('')
                                td3.find('.namList').show()
                                data.list.sort(fun)
                                function fun(a,b){
                                    return a.category_name.length-b.category_name.length
                                }
                                $.each(data.list, function(key,val) {
                                    var p1=$("<p class="+val.category_id+">"+val.category_name+"</p>")
                                    p1.appendTo(".namList")
                                });
                            }
                        })
                    })
                    td3.on('click','.namList p',function(){
                        td3.find('.compileInp').attr('id',$(this).attr('class'))
                        td3.find('.compileInp').val($(this).text())
                        td3.find('.namList').hide()
                    })
                    function getAjax(){
                        $.ajax({
                            type:"post",
                            url:network+"/Mattrio/EpcCategoryInterface/getEpcCategoryList",
                            data:{
                                'userid':userid,
                                'oe_name_list':arr.substring(0,arr.length-1),
                                'type':carType
                            },
                            success:function(da){
                                td3.find('.p2').html(td3.find('.compileInp').val()).addClass('col')
                                $.each(da.list, function(key,value) {
                                    $('.oe_name2').each(function(index,text){
                                        if($(text).text()==value.oe_name){
                                            var a=new Date(value.time.time)
                                            $(text).prev('.name').attr('title',a.toLocaleString()+'更新')
                                            $(text).prev('.name').find('.p2').html(value.category_name).prop('id',value.postion).addClass('col')
                                        }
                                    })
                                });

                            },
                            error:function(){

                            }
                        });
                    }
                    td3.on('click','button',function(){
                        if(td3.find('.compileInp').val()==''){
                            if(window.confirm('是否删除当前别名')){
                                $.ajax({
                                    type:'post',
                                    url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                    data:{
                                        'userid':userid,
                                        'oe_name':td3.next('td').text(),
                                        'category_name':'',
                                        'category_id':'',
                                        'type':carType,
                                        'oe_number':td2.text(),
                                        'state':1
                                    },
                                    dataType: "json",
                                    cache: false,
                                    crossDomain: true == !(document.all),
                                    success:function(data){
                                        div.hide()
                                        alert('删除成功')
                                        if(data.msg=='添加成功'){
                                            getAjax()
                                        }
                                    },error:function(){
                                        alert('删除失败')
                                    }
                                })
                            }
                            return false;
                        }
                        if(!td3.find('.col').length){
                            $.ajax({
                                type:'post',
                                url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                data:{
                                    'userid':userid,
                                    'oe_name':td3.next('td').text(),
                                    'category_name':td3.find('.compileInp').val(),
                                    'category_id':td3.find('.compileInp').attr('id'),
                                    'type':carType,
                                    'oe_number':td5.text(),
                                    'state':0
                                },
                                dataType: "json",
                                cache: false,
                                crossDomain: true == !(document.all),
                                success:function(data){
                                    div.hide()
                                    if(data.msg=='添加成功'){
                                        getAjax()
                                    }
                                }
                            })
                        }else{
                            $.ajax({
                                type:'post',
                                url:network+'/Mattrio/EpcCategoryInterface/updateUserEpcCategory',
                                data:{
                                    'userid':userid,
                                    'oe_name':td3.next('td').text(),
                                    'category_name':td3.find('.compileInp').val(),
                                    'category_id':td3.find('.compileInp').attr('id'),
                                    'postion':tdp2.attr('id'),
                                    'oe_number':td5.text()
                                },
                                dataType: "json",
                                cache: false,
                                crossDomain: true == !(document.all),
                                success:function(data){
                                    div.hide()
                                    if(data.msg=='成功修改'){
                                        getAjax()
                                    }
                                }
                            })
                        }
                    })
                }else{
                    var td3 = $("<td>").html(value.oe_name)
                }
                arr+="'"+value.oe_name2+"',"
				if(value.oe_name2){
					var td4 = $("<td class='oe_name2'>").html(value.oe_name2);
				}else{
					var td4 = $("<td>").html('');
				}
				if(value.number){
					var td6 = $("<td>").html(Number(value.number));
				}else{
					var td6 = $("<td>").html('');
				}
				if(value.price){
					var td7 = $("<td>").html(value.price);
				}else{
					var td7 = $("<td>").html('');
				}
                td1.appendTo(tr)
                td2.appendTo(tr)
                td5.appendTo(tr)
                td3.appendTo(tr)
                td4.appendTo(tr)
                td6.appendTo(tr)
                td7.appendTo(tr)
				$("tbody").append(tr);
                if(key==data.list.length-1&&compile){
                    $.ajax({
                        type:"POST",
                        url:network+"/Mattrio/EpcCategoryInterface/getEpcCategoryList",
                        data:{
                            'userid':userid,
                            'oe_name_list':arr.substring(0,arr.length-1),
                            'type':carType
                        },success:function(da){
                            if(da.list!=[]||da.list.length!=0){
                                $.each(da.list, function(key,value) {
                                    $('.oe_name2').each(function(index,text){
                                        if($(text).text()==value.oe_name){
                                            var a=new Date(value.time.time)
                                            $(text).prev('.name').attr('title',a.toLocaleString()+'更新')
                                            $(text).prev('.name').find('.p2').html(value.category_name).prop('id',value.postion).addClass('col')
                                        }
                                    })
                                });
                            }
                        },error:function(){

                        }
                    });
                }
			})
            $("td.name").hover(function(){
                if($(this).find('.compileWrap').is(':hidden')){
                    $(this).find('.p2').addClass('none')
                    $(this).find('.tdp,.compileImg').removeClass('none')
                }
            },function(){
                if(!$(this).find('.compileWrap ').is(':visible')){
                    $(this).find('.p2').removeClass('none')
                }
                $(this).find('.tdp,.compileImg').addClass('none')
            })
			$(function(){
				$("#checkbox").selectCheck();
			})
			//点击获取坐标
			$.each(data.poinlist,function(key,value){
				var scale_x = $(".contentleft img").width()/width;
				var scale_y = $(".contentleft img").height()/height_y;
				var span = $("<span style='position:absolute;top:"+(value.OROCY1*scale_y-2)+"px;left:"+(value.OROCX1*scale_x-2)+"px;width:"+(value.OROCW1*scale_x+4)+"px;height:"+(value.OROCH1*scale_y+4)+"px;' class='span"+value.ORPNCD+"'></span>");
                var span2 = $("<div disabled='disabled' style='background-color:rgba(255,255,255,.8);position:absolute;top:"+(value.OROCY1*scale_y-2)+"px;left:"+(value.OROCX1*scale_x-2)+"px;width:"+(value.OROCW1*scale_x+4)+"px;height:"+(value.OROCH1*scale_y+4)+"px;' ></div>");
                var isfind = 0;
                for(var i = 0; i < $("tbody tr").length; i++) {
                    if(value.ORPNCD == Number($("tbody tr").eq(i).children("td").eq(1).html())) {
                        isfind = 1;
                    }
                }
                if(isfind == 1) {
                    $(".contentleft").append(span);
                } else {
                    $(".contentleft").append(span2);
                }
			})
			$(".contentleft span").click(function(){
				$("tbody tr").removeClass("tr1");
				$(this).css({"border":"2px solid red"}).siblings("span").css({"border":"0"});
				for(var i = 0 ; i< $("tbody tr").length; i++ ){
					if($("tbody tr").eq(i).children("td").eq(1).html() == $(this)[0].className.split("n")[1]){
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
			
			//OE
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
			// 下载
			$("#btn").click(function(){
				var id_array=new Array();  
				$('input[name="gay"]:checked').each(function(){
				    id_array.push($(this).parent("span").parent("p").parent("td").parent("tr").index());//向数组中添加元素  
				});
				if(id_array.length == 0){
					alert("选择您要导出的选项");
					return false;
				}
				var iarray=new Array(); 
				$.each(id_array,function(key,value){
					iarray.push(data.list[value].oe_number);
				})
				var oenumbers = iarray.join(",")
				window.location.href = network+"/Mattrio/HyundaiEpcInterface/exportOeExcel?oenumbers="+oenumbers+"&mlbpno="+MLBPNO;
			})
			$("tbody tr").click(function(){
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$(".contentleft span").css({"border":"0"})
				for(var i = 0 ; i< $(".contentleft span").length; i++ ){
					if($(".contentleft span")[i].className.split("n")[1] == $(this).children("td").eq(1).html()){
						$($(".contentleft span")[i]).css({"border":"2px solid red"});
					}
				}
			})
		},
		error:function(data){
            $('#loading').hide()
            alert('请求失败');
		}
	})
}

$(document).on("click",".oecont span",function(){
//	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
	window.location.href="../../content/maintain/oecont/oecont.html?oenumber="+$(this).html()
})
//点击其他地方隐藏盒子
function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }else {
        e.cancelBubble = true;
    }
}