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
$("<img src='"+network+"/MattrioEcModel/upload/img/soyo/"+particulars.list[id].img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">").appendTo($(".contentimg"));
$(".contentdiv").html(particulars.list[id].category_name);
$(".proct").html("");

var span11 = $("<span class='proctspan'>").html("产品类型：");
var span12 = $("<span>").html(particulars.list[id].category_name);
var p1 = $("<p>");
span11.appendTo(p1);
span12.appendTo(p1);
p1.appendTo(".proct");

var span21 = $("<span class='proctspan'>").html("产品编码：");
var span22 = $("<span>").html(particulars.list[id].product_id);
var p2 = $("<p>");
span21.appendTo(p2);
span22.appendTo(p2);
p2.appendTo(".proct");

var span31 = $("<span class='proctspan'>").html("ＯＥ编码：");
var span32 = $("<span>").html(particulars.list[id].oenumber);
var p3 = $("<p>");
span31.appendTo(p3);
span32.appendTo(p3);
p3.appendTo(".proct");

$.ajax({
	type:"post",
    url:network+"/MattrioEcModel/ProductIntface/getProductCars",
    data:{
        "brand_id":username_id,
        "product_id":particulars.list[id].product_id
    },
    dataType:"json",
    success:function(data){
        $.each(data.info,function(key,value){
            // console.log(value);
            var span4 = $("<span class='proctspan'>").html(value.parameter_cn+"：");
            var span5 = $("<span>").html(value.describe);
            var p = $("<p>");
            span4.appendTo(p);
            span5.appendTo(p);
            p.appendTo(".proct");
        })

    	$.each(data.list,function(key,value){
    		var p = $("<p>");
            var $span1 = $("<span>").html(value.Manufacture_CN);
            var $span2 = $("<span>").html(value.Vehicle_Name_CN);
            var $span3 = $("<span>").html(value.LaunchEOPYear);
            var $span4 = $("<span>").html(value.Capacity+"T");
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
	window.location.href="../particulars/particulars.html";
})


$(".error").click(function(){
    $(".errorcontent").show();
    $(".td1").html(particulars.list[id].product_id)
})
$(".errordel").click(function(){
    $(".errorcontent").hide();
})
$(".clear").click(function(){
    $(".errorcontent").hide();
})
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
                $(".errorcontent").hide();
            },
            error:function(data){
                alert("提交失败");
            }
        })
    }else{
        // console.log(2);
    }


})