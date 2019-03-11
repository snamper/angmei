if (localStorage) {
	var network = localStorage.getItem("network");
	var cont = JSON.parse(sessionStorage.cont);
}else{
	var network = $.cookie("network");
	var cont = JSON.parse(sessionStorage.cont);
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

var heig = $(window).height() - 96;
if(heig >= 480){
    $(".cont").css("height",heig);
}else{
    $(".cont").css("height","480");
}
$("#loading").show();

$(".divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var module_pic_num = getUrlParam('?module');
var oe_code = getUrlParam('?oecode');
var car_model_code = getUrlParam('?car_model_code');
var make_year = getUrlParam('?make_year');
var image = getUrlParam('?image');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var type = getUrlParam('?type');
var years = getUrlParam('?years');
var vin = getUrlParam('?vin');
var brand = (type==12)?'volkswagen':'audi';
var urlstr = (type==12)?"/Mattrio/VwEpcInterface/getVwOes":"/Mattrio/AudiEpcInterface/getAudiOes"
if(vin=='null'||vin==''||vin==null){
    vin ==''
    $('#novin').hide()
}

var disable=true;
var recode='';
if(name1){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}
/*智障放大*/
$('.switch').show();
if (localStorage.flex&&localStorage.flex.indexOf(userid)>=0){
    $('.switch').prop('title','上下分布');
    $('.flexWrap').addClass('flex');
}else{
    $('.switch').prop('title','左右分布');
}
$('.switch').click(function () {
    if ($('.flexWrap').hasClass('flex')){
        localStorage.removeItem('flex');
        history.go(0)
    }else{
        localStorage.setItem('flex',userid+'flex');
        history.go(0)
    }
})
var imgSrc = image;
$("#viewer2").iviewer({
    src: image
})
// var img = $("<img src='"+image+"' class='img'>").appendTo("#viewer2");
var width;
var height;
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

$(".name1").html(name1);
$(".name2").html(name2);
$('#novin').click(function(){
    $("#loading").show();
    if(disable){
        getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,'','')
        disable=false;
        $("#novin").text("未过滤")
    }else{
        getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,years,vin,true)
        disable=true;
        $("#novin").text("已过滤")
    }
})
if(type==12){
    vin?getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,years,vin,true):getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,'','',true)
}else{
    getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,years,vin,true)
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
    $(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src",cont[num].img.split("?")[0]);
    module_pic_num = cont[num].category_id2;
    imgSrc = cont[num].img.split("?")[0];
    disable=true;
    make_year = module_pic_num.split(',')[0]
    module_pic_num = module_pic_num.split(',')[1]
    window.history.replaceState(null,null,'?brand='+brand+'&car_model_code='+car_model_code+"&make_year="+make_year+"&module="+module_pic_num+"&image="+cont[num].img.split("?")[0]+'&type='+type+'&fi=1&years='+years+'&vin='+vin+'&epcnum='+num+'&name1='+name1+'&name2='+name2)
    $("#novin").text("已过滤")
	if(type==12){
        getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,years,vin,true)
    }else{
        getEpcInfo2(urlstr,userid,car_model_code,brand,make_year,module_pic_num,years,vin,true);
    }
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
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src",cont[num].img.split("?")[0]);
    module_pic_num = cont[num].category_id2;
    imgSrc = cont[num].img.split("?")[0];
    disable=true;
    make_year = module_pic_num.split(',')[0]
    module_pic_num = module_pic_num.split(',')[1]
    window.history.replaceState(null,null,'?brand='+brand+'&car_model_code='+car_model_code+"&make_year="+make_year+"&module="+module_pic_num+"&image="+cont[num].img.split("?")[0]+'&type='+type+'&fi=1&years='+years+'&vin='+vin+'&epcnum='+num+'&name1='+name1+'&name2='+name2)
    if(type==12){
        getEpcInfo2("/Mattrio/VwEpcInterface/getVwOes",userid,car_model_code,brand,make_year,module_pic_num,years,vin,true)
        $("#novin").text("已过滤")
    }else{
        getEpcInfo2("/Mattrio/AudiEpcInterface/getAudiOes",userid,car_model_code,brand,make_year,module_pic_num,years,vin,true);
    }
})
function getEpcInfo2(url,userid,car_model_code,brand,make_year,module_pic_num,yearstr,vin,guolv){
    $.ajax({
        type:'post',
        url:network+url,
        data:{
            'userid':userid,
            'kat':car_model_code,
            'epc_type':brand,
            'category_id1':make_year,
            'category_id2':module_pic_num,
            'year':yearstr,
            'vin':vin
        },
        dataType: "json",
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
            $('thead').find('th').eq(7).hide()
            data.list.sort(fun)
            function fun(a,b){
                var aNum=a.location;
                var bNum=b.location;
                aNum=='-'?aNum='0':''
                bNum=='-'?bNum='0':''
                return parseInt(aNum.replace(/[A-Za-z]|\-|\(|\)/g,''))-parseInt(bNum.replace(/[A-Za-z]|\-|\(|\)/g,''));
            }
            var arr1=[],arr2=[];
            for(value of data.list){
                if(value.location){
                    arr1.push(value)
                }else{
                    arr2.push(value)
                }
            }
            for(let i=0;i<arr1.length;i++){
                for(let j=0;j<arr2.length;j++){
                    if(arr2[j].oe_number.indexOf(arr1[i].oe_number)>0){
                        i++
                        arr1.splice(i,0,arr2[j])
                        arr2.splice(j,1)
                        j--
                    }
                }
            }
            arr1.concat(arr2)
            var formerlist='';
            if(guolv){
                $.each(data.list,function (key,value) {
                    !value.oe_number?value.oe_number='':value.oe_number
                    delete  data.list[key]['model']
                    delete  data.list[key]['pr']
                })
                sessionStorage.setItem('datalist',JSON.stringify(data.list))
            }else{
                sessionStorage.getItem('datalist')?formerlist=sessionStorage.getItem('datalist'):formerlist='';
            }
            var trHeight=0;
            $('.cont .box').remove()
            $('.tbody tr').removeClass('tr')
            $.each(arr1,function(key,value){
                var td=$('<td>').html('<p><span class=\'check_span\'><input type=\'checkbox\' name=\'gay\'></span></p>')
                var td1=$('<td>').html(value.location)
                if (value.oe_number) {
                    var td2=$('<td class="oecont">').html('<span>'+value.oe_number+'</span>')
                }else{
                    var td2=$('<td>').html('')
                }
                if(value.oe_name){
                    var td3=$('<td>').html(value.oe_name)
                }else{
                    var td3=$('<td>').html('')
                }
                var td4=$('<td title="'+value.oe_name2.replace(/\$/g,"")+'">').html('<div>'+value.oe_name2.replace(/\$/g,"")+'</div>')
                var td5=$('<td>').html(value.remark)
                var td6=$('<td>').html(value.number)
                if(!oe_code){
                    var tr = $("<tr></tr>");
                }else if(value.oe_number == oe_code){
                    var tr = $("<tr class='tr'></tr>");
                }else{
                    var tr = $("<tr></tr>");
                }
                if (formerlist != '' && formerlist.indexOf(JSON.stringify(value)) < 0) {
                    tr.css('color', 'red')
                }
                td.appendTo(tr)
                td1.appendTo(tr)
                td2.appendTo(tr)
                td3.appendTo(tr)
                td4.appendTo(tr)
                td5.appendTo(tr)
                td6.appendTo(tr)
                $("tbody").append(tr);
                trHeight+=tr.height()
            })
            if (trHeight>500){
                $('tr td:last-child').width('64')
            }
            $(function(){
                $("#checkbox").selectCheck();
            })

            $("#btn").click(function(){
                var id_array=new Array();
                $('input[name="gay"]:checked').each(function(){
                    id_array.push($('.oecont').eq($(this).parents("tr").index()).text());//向数组中添加元素
                });
                if(id_array.length == 0){
                    alert("选择您要导出的选项");
                    return false;
                }
                var iarray=new Array();
                window.location.href = network+"/Mattrio/VwEpcInterface/exportOeExcel?oenumbers="+id_array.join(",")+'&kat='+car_model_code+'&epc_type='+brand
            })
            //点击获取坐标
            getImageWidth(imgSrc,function(w,h){
                width = w;
                height = h;
                $('.cont img').attr('wid',width)
                if($(".cont img").attr('alt')!=undefined&&$(".cont img").attr('alt')!='undefined'){
                    var scale = $(".cont img").attr('alt') / width;
                }else{
                    var scale = $(".cont img").width() / width;
                }
                $.each(data.callouts,function(key,value){
                    var scale_x = value.x * scale;
                    var scale_y = value.y * scale;
                    var imgLeft=$(".cont img").position().left+scale_x
                    var imgTop=$(".cont img").position().top+scale_y
                    var span = $("<span alt="+value.x+","+value.y+" style='position:absolute;top:"+imgTop+"px;left:"+imgLeft+"px;width:"+scale*30+"px;height:"+scale*30+"px;' class='box spclick span"+value.location+"'>");
                    var span2 = $("<span alt="+value.x+","+value.y+" style='background-color:rgba(255,255,255,.8);position:absolute;top:"+imgTop+"px;left:" +imgLeft+ "px;width:"+scale*30+"px;height:"+scale*30+"px;' class='box' ></span>");
                    var isfind = 0;
                    for(var i = 0; i < $("tbody tr").length; i++) {
                        if(value.location == Number($("tbody tr").eq(i).children("td").eq(1).html())) {
                            isfind = 1;
                        }
                    }
                    if(isfind == 1) {
                        $(".viewer").append(span);
                    } else {
                        $(".viewer").append(span2);
                    }
                })
                $(".viewer .spclick").click(function(){
                    $("tbody tr").removeClass("tr");
                    $(this).css({"border":"2px solid red"}).siblings("span").css({"border":"0"});
                    for(var i = 0 ; i< $("tbody tr").length; i++ ){
                        if($("tbody tr").eq(i).children("td").eq(1).html() == $(this)[0].className.split("n")[1]){
                            $("tbody tr").eq(i).addClass("tr");
                        }
                    }
                    var height = 0;
                    $.each($("tbody tr"),function(key,value){
                        if(key < $(".tr").index()-1){
                            height += Number($(value).height());
                        }
                    })
                    if(localStorage.flex&&localStorage.flex.indexOf(userid)>=0){
                        $('tbody').animate({
                            scrollTop:height
                        }, 400);
                    }else{
                        $('html, body').animate({
                            scrollTop:height+600
                        }, 400);
                    }
                })
                $("tbody tr").click(function(){
                    $(this).addClass("tr").siblings("tr").removeClass("tr");
                    $(".viewer span").css({"border":"0"})
                    for(var i = 0 ; i< $(".viewer span").length; i++ ){
                        if(Number($(".viewer span")[i].className.split("n")[1]) == Number($(this).children("td").eq(1).html())){
                            $($(".viewer span")[i]).css({"border":"2px solid red"});
                        }
                    }
                })
            });
        },error:function(){
            $('#loading').hide()
            alert('请求失败');
        }
    })
}
$(document).on("click",".oecont span",function(){
//	window.open("../../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
	window.location.href="../../../content/maintain/oecont/oecont.html?oenumber="+$(this).html()
})