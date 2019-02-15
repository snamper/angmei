if(localStorage) {
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
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

$("#loading").show();
var CATNUM = getUrlParam('?a');
var GROUPNUM = getUrlParam('?b');
var SUBGRP = getUrlParam('?c');
var image = getUrlParam('?d');
var oe = getUrlParam('?oe');
var no = getUrlParam('?no');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var name1 = getUrlParam('?h');
var name2 = getUrlParam('?i');
var SALESDES = getUrlParam('?Vehicle_Name_CN');
var vin = getUrlParam('?vin');
var f = getUrlParam('?f');
var disable=true;
var compile=false;
var carType='奔驰';
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

$(".name1").html(name1);
$(".name2").html(name2);
$("<img class='img' src='" + image + "' onerror=\"javascript:this.src='../../image/blank.jpg'\">").appendTo("#viewer2");

var width;
$(function() {
    var imgSrc = $(".img").attr("src");
    getImageWidth(imgSrc, function(w, h) {
        width = w;
    });
});
function getImageWidth(url, callback) {
    var img = new Image();
    img.src = url;
    if(img.complete){
        callback(img.width, img.height);
    } else {
        img.onload = function() {
            callback(img.width, img.height);
        }
    }
}
getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES,vin,true);

$('#novin').click(function(){
	if(disable){
		getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES,'');	
		disable=false;
		$("#novin").text("未过滤")
	}else{
		getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES,vin);	
		disable=true;
		$("#novin").text("已过滤")
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
	if(no == "-1"){
		GROUPNUM = cont[num].category_id1.split('-')[1];
        f = cont[num].category_id1.split('-')[0]
	}else{
        GROUPNUM = getUrlParam('?b');
        f = getUrlParam('?f');
	}
	SUBGRP = cont[num].category_id2;
	image = cont[num].img.split("?")[0];
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src",image);
	disable=true;
	getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES,vin,true);
    window.history.replaceState(null,null,'?a='+CATNUM+'&b='+GROUPNUM+'&c='+SUBGRP+'&d='+image+'&oe='+oe+'&no='+no+'&epcnum='+num+'&choice='+choice+'&h='+name1+'&i='+name2+'&vin='+vin+'&Vehicle_Name_CN='+SALESDES+'&f='+f)
    $("#novin").text("已过滤")
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
	if(no == "-1"){
		GROUPNUM = cont[num].category_id1.split('-')[1];
        f = cont[num].category_id1.split('-')[0]
	}else{
		GROUPNUM = getUrlParam('?b');
        f = getUrlParam('?f');
	}
	SUBGRP = cont[num].category_id2;
    image = cont[num].img.split("?")[0];
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src", image);
	disable=true;
	getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES,vin,true);
    window.history.replaceState(null,null,'?a='+CATNUM+'&b='+GROUPNUM+'&c='+SUBGRP+'&d='+image+'&oe='+oe+'&no='+no+'&epcnum='+num+'&choice='+choice+'&h='+name1+'&i='+name2+'&vin='+vin+'&Vehicle_Name_CN='+SALESDES+'&f='+f)
    $("#novin").text("已过滤")
})
function getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES,vin,guolv){
	$("#loading").show();
	$.ajax({
		type: "post",
		url: network + "/Mattrio/BenzEpcInterface/getBenzEpcOEs",
		data: {
			"userid": userid,
			"CATNUM": CATNUM,
			"GROUPNUM": GROUPNUM,
			"SUBGRP": SUBGRP,
			"SALESDES":SALESDES,
			"vin":vin
		},
		dataType: "json",
		cache: false,
        timeout: 10000, //超时时间（单位：毫秒）
		crossDomain: true == !(document.all),
		success: function(data) {
			recode=frequencyfun(userid,recode);
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
            $('#viewer2').find('span,div').remove();
            var formerlist='';
            if(guolv){
                sessionStorage.setItem('datalist',JSON.stringify(data.list));
            }else{
                sessionStorage.getItem('datalist')?formerlist=sessionStorage.getItem('datalist'):formerlist='';
            }
			if(data.list.length == 0 || data.list == []){
				$("tbody").html("<tr><td colspan='7'>暂无数据</td><tr>");
				return false;
			}
            var arr=[];
            data.list.sort(function(a,b){
                return a.CALLOUT-b.CALLOUT
            })
			$.each(data.list, function(key, value) {
                var div;
                if (oe == "") {
                    var tr = $("<tr>");
                } else if (value.oe == oe) {
                    var tr = $("<tr class='tr1'>");
                } else {
                    var tr = $("<tr>");
                }
                if (formerlist != '' && formerlist.indexOf(JSON.stringify(value)) < 0) {
                    tr.css('color', 'red')
                }
                // var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox'  name='gay'></span></p></td>");
                var td1 = $("<td>").html(value.CALLOUT);
                var td2 = $("<td class='oecont'>").html("<span>" + value.oe + "</span>");
                var td3 = $("<td class='oe_name2'>").html(value.NOUN);
                if(value.replace_oe){
                    var replace_oe=' 替换号: '+value.replace_oe+'（单向替换）'
                }else{
                    var replace_oe=''
                }
                if (value.NEUTRAL) {
                    var td4 = $("<td>").html(value.NEUTRAL+replace_oe);
                } else {
                    var td4 = $("<td>").html(replace_oe);
                }
                if (value.RANKING_NUMBER) {
                    var td6 = $("<td>").html(value.RANKING_NUMBER);
                } else {
                    var td6 = $("<td>").html("");
                }

                if (value.price=='') {
                    var td7 = $("<td>").html("暂无价格");
                } else {
                    var td7 = $("<td>").html(value.price);
                }
                if (compile) {
                    var td8 = $("<td class='name'>")
                    var img = $('<img class="compileImg none" src="../../image/compile.png">')
                    img.appendTo(td8)
                    var tdp2 = $('<p class="p2">').html(value.oe_name)
                    tdp2.appendTo(td8)
                    var tdp = $('<p class="tdp none">').html('点此进行编辑')
                    tdp.appendTo(td8)
                    div = $('<div class="compileWrap clearfix">').html('<input class="compileInp" type="text" placeholder="请输入名称" /><button><img src="../../image/compileYes.png" /></button><div class="namList"></div>')
                    div.appendTo(td8)
                    td8.click(function(e){
                        stopPropagation(e)
                    })
                    td8.on('click','.compileImg,.tdp',function(){
                        $('.p2').removeClass('none')
                        img.addClass('none')
                        tdp.addClass('none')
                        tdp2.addClass('none')
                        td8.parents('tr').siblings('tr').find('.compileWrap').hide()
                        div.find('input').val('').attr('placeholder','请输入名称')
                        div.show()
                    })
                    $(document).click(function(e){
                        stopPropagation(e)
                        div.hide()
                        $('.p2').removeClass('none')
                    })
                    td8.on('input','.compileInp',function(){
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
                                td8.find('.namList').html('')
                                td8.find('.namList').show()
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
                    td8.on('click','.namList p',function(){
                        td8.find('.compileInp').attr('id',$(this).attr('class'))
                        td8.find('.compileInp').val($(this).text())
                        td8.find('.namList').hide()
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
                                td8.find('.p2').html(td8.find('.compileInp').val()).addClass('col')
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
                    td8.on('click','button',function(){
                        if(td8.find('.compileInp').val()==''){
                            if(window.confirm('是否删除当前别名')){
                                $.ajax({
                                    type:'post',
                                    url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                    data:{
                                        'userid':userid,
                                        'oe_name':td8.next('td').text(),
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
                        if(!td8.find('.col').length){
                            $.ajax({
                                type:'post',
                                url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                data:{
                                    'userid':userid,
                                    'oe_name':td8.next('td').text(),
                                    'category_name':td8.find('.compileInp').val(),
                                    'category_id':td8.find('.compileInp').attr('id'),
                                    'type':carType,
                                    'oe_number':td2.text(),
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
                                    'oe_name':td8.next('td').text(),
                                    'category_name':td8.find('.compileInp').val(),
                                    'category_id':td8.find('.compileInp').attr('id'),
                                    'postion':tdp2.attr('id'),
                                    'oe_number':td2.text()
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
                    var td8 = $("<td>").html(value.oe_name)
                }
                arr+="'"+value.NOUN+"',"
				// td0.appendTo(tr);
				td1.appendTo(tr);
				td2.appendTo(tr);
				td8.appendTo(tr);
				td3.appendTo(tr);
				td4.appendTo(tr); 
				td6.appendTo(tr);
				td7.appendTo(tr);
				tr.appendTo("tbody");
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
			$(function() {
				$("#checkbox").selectCheck();
			})
//点击获取坐标
            $.each(data.xylist, function(key, value) {
                var scale = $("#viewer2 img").width() / width;
                var span = $("<span style='position:absolute;top:" + (value.py * scale-14) + "px;left:" + (value.px * scale-6) + "px;width:30px;height:25px;' class='span" + value.callout + "'></span>");
                var span2 = $("<div disabled='disabled' style='background-color:rgba(255,255,255,.8);position:absolute;top:" + (value.py * scale-14) + "px;left:" + (value.px * scale-6) + "px;width:30px;height:25px;' ></div>");
                var isfind = 0;
                for(var i = 0; i < $("tbody tr").length; i++) {
                    if(value.callout == Number($("tbody tr").eq(i).children("td").eq(0).html())) {
                        isfind = 1;
                    }
                }
                if(isfind == 1) {
                    $("#viewer2").append(span);
                } else {
                    $("#viewer2").append(span2);
                }
            })
            $("#viewer2 span").click(function() {
                $("tbody tr").removeClass("tr1");
                $(this).css({
                    "border": "2px solid red"
                }).siblings("span").css({
                    "border": "0"
                });
                for(var i = 0; i < $("tbody tr").length; i++) {
                    if(Number($("tbody tr").eq(i).children("td").eq(0).html()) == Number($(this)[0].className.split("n")[1])) {
                        $("tbody tr").eq(i).addClass("tr1");
                    }
                }
                var height = 0;
                $.each($("tbody tr"), function(key, value) {
                    if(key < $(".tr1").index() - 1) {
                        height = Number($(value).height()*key);
                    }
                })
                $('html, body').animate({
                    scrollTop:height+600
                }, 400);
            })
			//OE
			var height = 0;
			$.each($("tbody tr"), function(key, value) {
				if(key < $(".tr1").index()) {
					height += Number($(value).height());
				}
			})

			$("tbody tr").click(function() {
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$("#viewer2 span").css({
					"border": "0"
				})
				for(var i = 0; i < $("#viewer2 span").length; i++) {
					if(Number($("#viewer2 span")[i].className.split("n")[1]) == Number($(this).children("td").eq(0).html())) {
						$($("#viewer2 span")[i]).css({
							"border": "2px solid red"
						});
					}
				}
			})
		},
		error: function(data) {
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