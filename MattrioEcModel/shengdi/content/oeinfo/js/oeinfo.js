var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id");
var particulars = JSON.parse(localStorage.particulars);

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

var id = getUrlParam('?id');
var mikey = getUrlParam('?mikey');

$("<img src='"+network+"/MattrioEcModel/upload/img/sp/"+particulars.list[id].img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">").appendTo($(".contentimg"));
$(".contentdiv").html(particulars.list[id].category_name);
$(".proct").html("");

var span11 = $("<span class='proctspan'>").html("产品类型");
var span12 = $("<span>").html("："+particulars.list[id].category_name);
var p1 = $("<p>");
span11.appendTo(p1);
span12.appendTo(p1);
p1.appendTo(".proct");

var span21 = $("<span class='proctspan'>").html("产品编码");
var span22 = $("<span>").html("："+particulars.list[id].product_id);
var p2 = $("<p>");
span21.appendTo(p2);
span22.appendTo(p2);
p2.appendTo(".proct");
$("#loading").show();
$.ajax({
	type:"post",
    url:network+"/MattrioEcModel/ProductIntface/getProductCars",
    data:{
        "brand_id":username_id,
        "product_id":particulars.list[id].product_id,
        "mikey":mikey
    },
    dataType:"json",
    success:function(data){
        $("#loading").hide();
        $("<p>").html("<span class='proctspan'>主机厂</span>：<span>"+data.car_info[0].Manufacture_CN+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>车型</span>：<span>"+data.car_info[0].Vehicle_body_type+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>底盘号</span>：<span>"+data.car_info[0].Chassis_platform+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>排量</span>：<span>"+data.car_info[0].Capacity+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>输出功率</span>：<span>"+data.car_info[0].HP+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>发动机号</span>：<span>"+data.car_info[0].Engine_Code+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>燃油方式</span>：<span>"+data.car_info[0].Injection_type+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>驱动方式</span>：<span>"+data.car_info[0].Drive_type+"</span>").appendTo(".proct");
        $("<p>").html("<span class='proctspan'>生产日期</span>：<span>"+data.car_info[0].EOP_Year+"</span>").appendTo(".proct");

        var guige ;
        var guige_1 ;
        $.each(data.info,function(key,value){
            var span4 = $("<span class='proctspan'>").html(value.parameter_cn);
            var span5 = $("<span>").html("："+value.describe);
            var p = $("<p>");
            span4.appendTo(p);
            span5.appendTo(p);
            p.appendTo(".proct");
        })
      

    	$.each(data.list,function(key,value){
    		var p = $("<p>");
            var $span1 = $("<span>").html(value.Manufacture_CN+" | ");
            var $span2 = $("<span>").html(value.Vehicle_Name_CN+" | ");
            var $span3 = $("<span>").html(value.LaunchEOPYear+" | ");
            var $span4 = $("<span>").html(value.Capacity);
            $span1.appendTo(p);
            $span2.appendTo(p);
            $span3.appendTo(p);
            $span4.appendTo(p);
            p.appendTo(".testcontent");
    	})

    },
    error:function(data){
        // console.log(1)
    }
})


$(".runtasclor").click(function(){
	window.location.href="javascript:history.back()";
})
$(".error").click(function(){
    $(".cont_error").show();
    $(".td1").html(particulars.list[id].product_id)
})
$(".errordel").click(function(){
    $(".cont_error").hide();
})
$(".clear").click(function(){
    $(".cont_error").hide();
})
//点击其他地方隐藏盒子
function stopPropagation(e) { 
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }else {
        e.cancelBubble = true; 
    }
} 
$('.errorcontent').bind('click',function(e){ 
    stopPropagation(e); 
});
$(".cont_error").bind('click',function(){ 
    $('.cont_error').hide();
});



$(".confirm").click(function(){

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
                "product_id":$(".td1").html(),
                "new_product_id":$(".inp1").val(),
                "phone":$(".inp2").val(),
                "name":$(".inp3").val()
            },
            dataType:"json",
            success:function(data){
                alert("提交成功");
                $(".cont_error").hide();
            },
            error:function(data){
                alert("提交失败");
            }
        })
    }else{
        // console.log(2);
    }


})