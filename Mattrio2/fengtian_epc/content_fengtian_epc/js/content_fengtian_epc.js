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
var nserepcend = getUrlParam('?c');
var nserepcstrt = getUrlParam('?d');
var nplblk = getUrlParam('?e');
var hmodtyp = getUrlParam('?f');
var oe = getUrlParam('?oe');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var name1 = getUrlParam('?h');
var name2 = getUrlParam('?i');
var image = getUrlParam('?imgsrc');;
var parameters=localStorage.getItem('ToyotaParameters');
var localtion=getUrlParam('?localtion');
var vin=getUrlParam('?vin');
var disable=true;
var carType='丰田';
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

if(name1){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}
$(".name1").html(name1);
$(".name2").html(name2);
$("#viewer2").iviewer({
    src: image
})
// $("<img class='img' src='"+image+"'>").appendTo("#viewer2");
// $(".img").load(function(){
	getEpcInfo(userid,nserepcend,nserepcstrt,nplblk,hmodtyp,vin,true);
// })

var width;
$(function(){
	var imgSrc = image;
	getImageWidth(imgSrc,function(w,h){
		width = w;
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
	$("#loading").show();
	if(disable){
		getEpcInfo(userid,nserepcend,nserepcstrt,nplblk,hmodtyp,'');
		$("#novin").text("未过滤");
		disable=false;
	}else{
		getEpcInfo(userid,nserepcend,nserepcstrt,nplblk,hmodtyp,vin);
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
	nplblk = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
    $("#viewer2 img").attr("src",cont[num].img.split("?")[0])
	getEpcInfo(userid,nserepcend,nserepcstrt,nplblk,hmodtyp,vin,true);
    window.history.replaceState(null,null,'?c='+nserepcend+'&d='+nserepcstrt+'&e='+nplblk+'&f='+hmodtyp+'&oe='+oe+'&epcnum='+num+'&choice='+choice+'&h='+name1+'&i='+name2+'&vin='+vin+'&imgsrc='+cont[num].img.split("?")[0]+'&localtion='+localtion)
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
	nplblk = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
    $("#viewer2 img").attr("src",cont[num].img.split("?")[0])
	getEpcInfo(userid,nserepcend,nserepcstrt,nplblk,hmodtyp,vin,true);
    window.history.replaceState(null,null,'?c='+nserepcend+'&d='+nserepcstrt+'&e='+nplblk+'&f='+hmodtyp+'&oe='+oe+'&epcnum='+num+'&choice='+choice+'&h='+name1+'&i='+name2+'&vin='+vin+'&imgsrc='+cont[num].img.split("?")[0]+'&localtion='+localtion)
    disable=true;
	$("#novin").text("已过滤");	
})


function getEpcInfo(userid,nserepcend,nserepcstrt,nplblk,hmodtyp,vin,guolv){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/ToyotaEpcInterface/getToyotaOes",
		data:{
			"userid":userid,
			"category_id2":nplblk,
			"parameters":parameters,
			'vin':vin
		},
		dataType:"json",
        timeout: 10000, //超时时间（单位：毫秒）
		cache: false,
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
			$('html, body').animate({  
                 scrollTop:0
            }, 400);
			var formerlist=''
			if(guolv){
				sessionStorage.setItem('datalist',JSON.stringify(data.list))
			}else{
                sessionStorage.getItem('datalist')?formerlist=sessionStorage.getItem('datalist'):formerlist='';
			}
            var arr=[];
			$.each(data.list,function(key,value){
				if(localtion== ""){
					var tr = $("<tr>");
				}else if(value.localtion == localtion){
					var tr = $("<tr class='tr1'>");
				}else{
					var tr = $("<tr>");
				}
				/*不一样就红色显示*/
				if(formerlist!=''&&formerlist.indexOf(JSON.stringify(value.oe_number))<0){
					tr.css('color','red')
				}
//				var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox'  name='gay'></span></p></td>");
//				var td1 = $("<td>").html(value.callout);
				if(value.localtion){
					var td2 = $("<td>").html(value.localtion);
				}else{
					var td2 = $("<td>").html("");
				}
				if(value.oe_number){
					var td3 = $("<td class='oecont'>").html("<span>"+value.oe_number+"</span>");
				}else{
					var td3 = $("<td class='oecont'>").html("");
				}
                var oe_name=value.oe_name?value.oe_name:'';
                if(compile){
                    var td4 = $("<td class='name'>")
                    var img=$('<img class="compileImg none" src="../../image/compile.png">')
                    img.appendTo(td4)
                    var tdp2=$('<p class="p2">').html(oe_name)
                    tdp2.appendTo(td4)
                    var tdp=$('<p class="tdp none">').html('点此进行编辑')
                    tdp.appendTo(td4)
                    var div=$('<div class="compileWrap clearfix">').html('<input class="compileInp" type="text" placeholder="请输入名称" /><button><img src="../../image/compileYes.png" /></button><div class="namList"></div>')
                    div.appendTo(td4)
                    td4.click(function(e){
                        stopPropagation(e)
                    })
                    td4.on('click','.compileImg,.tdp',function(){
                        $('.p2').removeClass('none')
                        img.addClass('none')
                        tdp.addClass('none')
                        tdp2.addClass('none')
                        td4.parents('tr').siblings('tr').find('.compileWrap').hide()
                        div.find('input').val('').attr('placeholder','请输入名称')
                        div.show()
                    })
                    $(document).click(function(e){
                        stopPropagation(e)
                        div.hide()
                        $('.p2').removeClass('none')
                    })
                    td4.on('input','.compileInp',function(){
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
                                td4.find('.namList').html('')
                                td4.find('.namList').show()
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
                    td4.on('click','.namList p',function(){
                        td4.find('.compileInp').attr('id',$(this).attr('class'))
                        td4.find('.compileInp').val($(this).text())
                        td4.find('.namList').hide()
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
                                td4.find('.p2').html(td4.find('.compileInp').val()).addClass('col')
                                $.each(da.list, function(key,value) {
                                    $('.oe_name2').each(function(index,text){
                                        if($(text).text()==oe_name){
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
                    td4.on('click','button',function(){
                        if(td4.find('.compileInp').val()==''){
                            if(window.confirm('是否删除当前别名')){
                                $.ajax({
                                    type:'post',
                                    url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                    data:{
                                        'userid':userid,
                                        'oe_name':td4.next('td').text(),
                                        'category_name':'',
                                        'category_id':'',
                                        'type':carType,
                                        'oe_number':td3.text(),
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
                        if(!td4.find('.col').length){
                            $.ajax({
                                type:'post',
                                url:network+'/Mattrio/EpcCategoryInterface/addEpcCategory',
                                data:{
                                    'userid':userid,
                                    'oe_name':td4.next('td').text(),
                                    'category_name':td4.find('.compileInp').val(),
                                    'category_id':td4.find('.compileInp').attr('id'),
                                    'type':carType,
                                    'oe_number':td3.text(),
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
                                    'oe_name':td4.next('td').text(),
                                    'category_name':td4.find('.compileInp').val(),
                                    'category_id':td4.find('.compileInp').attr('id'),
                                    'postion':tdp2.attr('id'),
                                    'oe_number':td3.text()
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
                    var td4 = $("<td>").html(oe_name)
                }
                arr+="'"+value.oe_name2+"',"
				if(value.oe_name2){
					var td7 = $("<td class='oe_name2'>").html(value.oe_name2);
				}else{
					var td7 = $("<td class='oe_name2'>").html("");
				}
				if(value.number){
					var td5 = $("<td>").html(value.number);
				}else{
					var td5 = $("<td>").html("");
				}
				if(value.price){
					var td6 = $("<td>").html(value.price);
				}else{
					var td6 = $("<td>").html("");
				}
				if(value.remark){
					var td8 = $("<td title='"+value.remark+"'>").text(value.remark);
				}else{
					var td8 = $("<td>").text("");
				}
//				td0.appendTo(tr);
//				td1.appendTo(tr);
				td2.appendTo(tr);
				td3.appendTo(tr);
				td4.appendTo(tr);
				td7.appendTo(tr);
				td5.appendTo(tr);
				td6.appendTo(tr);
				td8.appendTo(tr);
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
//			$(function(){
//				$("#checkbox").selectCheck();
//			})
//			//点击获取坐标
//			$.each(data.points,function(key,value){
//				var scale = $("#viewer2 img").width()/width;
//				var span = $("<span style='position:absolute;top:"+(value.MIN_Y*scale-3)+"px;left:"+(value.MAX_X*scale-18)+"px;width:25px;height:25px;' class='span"+value.callout+"'>");
//				span.appendTo("#viewer2");
//			})
//
			$("#viewer2 span").click(function(){
				$("tbody tr").removeClass("tr1");
				$(this).css({"border":"2px solid red"}).siblings("span").css({"border":"0"});
				for(var i = 0 ; i< $("tbody tr").length; i++ ){
					if(Number($("tbody tr").eq(i).children("td").eq(1).html()) == Number($(this)[0].className.split("n")[1])){
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
//			var height = 0;
//			$.each($("tbody tr"),function(key,value){
//				if(key < $(".tr1").index()){
//					height += Number($(value).height());
//				}
//
//			})
//
//			if(oe == ""){
//				$('html, body').animate({  
//	                scrollTop:height
//	            }, 400);
//			}else{
//				console.log(height)
//				$('html, body').animate({  
//	                scrollTop:height+600
//	            }, 400);
//			}
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
					if(Number($("#viewer2 span")[i].className.split("n")[1]) == Number($(this).children("td").eq(1).html())){
						$($("#viewer2 span")[i]).css({"border":"2px solid red"});
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
$("#bottom").click(function(){
	$('html, body').animate({scrollTop:$("body").height()}, 200); 
})

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