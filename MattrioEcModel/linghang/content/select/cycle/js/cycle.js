var network = localStorage.getItem("networkmodel");
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var mikey = getUrlParam('?mikey');
var year = getUrlParam('?year');

var str =[
        {data:[
            {id:'1', value:'2017年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'}]},
            {id:'2', value:'2016年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'3', value:'2015年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'4', value:'2014年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'5', value:'2013年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'6', value:'2012年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'7', value:'2011年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'8', value:'2010年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'9', value:'2009年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'10', value:'2008年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'11', value:'2007年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'12', value:'2006年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'13', value:'2005年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'14', value:'2004年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'15', value:'2003年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'16', value:'2002年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'17', value:'2001年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'18', value:'2000年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'19', value:'1999年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'20', value:'1998年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'21', value:'1997年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'22', value:'1996年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'23', value:'1995年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'24', value:'1994年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'25', value:'1993年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'26', value:'1992年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'27', value:'1991年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'28', value:'1990年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'29', value:'1989年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'30', value:'1988年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'31', value:'1987年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'32', value:'1986年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'33', value:'1985年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
            {id:'34', value:'1984年',childs:[{id:'1',value:'1月'},{id:'2',value:'2月'},{id:'3',value:'3月'},{id:'4',value:'4月'},{id:'5',value:'5月'},{id:'6',value:'6月'},{id:'7',value:'7月'},{id:'8',value:'8月'},{id:'9',value:'9月'},{id:'10',value:'10月'},{id:'11',value:'11月'},{id:'12',value:'12月'}]},
        ]}
    ]; 

var arr = [];
$.each(str[0].data,function(key,val){
    if(year-1 <= val.value.split("年")[0]){
        arr.push(val);
    }
})
var demo = [{data:arr}];

var mobileSelect4 = new MobileSelect({
    trigger: '#trigger4',
    wheels:demo ,
    transitionEnd:function(indexArr, data){
        //console.log(data);
    },
    callback:function(indexArr, data){
        // console.log(data);
    }  
});





$.ajax({
    type:"post",
    url:network+"/Mattrio/MaintenanceCycleInterface/getMileages",
    data:{
        "mikey":mikey
    },
    dataType:"json",
    success:function(res){
        if(res.length == 0 || res == []){
            alert("暂无保养周期数据");
            window.location.href="javascript:history.back();";
            return false;
        }
        var str  = [];
        var arr = [];
        $.each(res,function(key,value){
            str.push(value.section);
            arr.push(value.mileage);
        })

        var  weekdayArr = str;

        //只有trigger 和 wheels 是必要参数  其他都是选填参数
        var mobileSelect1 = new MobileSelect({
            trigger: '#trigger1',
            wheels: [{data: weekdayArr}],
            position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
            transitionEnd:function(indexArr, data){
               // console.log(data);
            },
            callback:function(indexArr, data){
               sessionStorage.setItem("number",arr[indexArr[0]]);
            }
        });
    },
    error:function(data){
        // console.log(data);
    }
})


var yearname = sessionStorage.getItem("yearname");
var mile = sessionStorage.getItem("mile");
var k = JSON.parse(sessionStorage.k);

if((yearname !== "") && (mile !== "")){
    $("#trigger4").html(yearname);
    $("#trigger1").html(mile);
}

if(k !== ""){
    if(jQuery.isEmptyObject(k)){
        $(".contentbottomno").show();
        $(".contentbottom").hide();
    }else{
        $(".contentbottom").show();
        $(".contentbottomno").hide();
        $(".price span").html(k.maintenance_cost);
        var div = $("<div>");
        $.each(k.categorys,function(key,value){
            var table = $("<table>");
            th = $("<th colspan='2'>").html(value.categoryname);
            var tr1 = $("<tr>");
            th.appendTo(tr1);

            if(value.oes == [] ||value.oes.length == 0){
                var tr2 = $("<tr class='active'>");
                var td21 = $("<td>").html("需要更换（暂无oe号码）");
                td21.appendTo(tr2);
                var tr3 = $("<tr class='active'>");
                var tr4 = $("<tr class='active'>");
            }else{
                var tr2 = $("<tr class='active'>");
                var td21 = $("<td>").html("oe号码");
                var td22 = $("<td>").html(value.oes[0].oe_numbers);
                td21.appendTo(tr2);
                td22.appendTo(tr2);

                var tr3 = $("<tr class='active'>");
                var td31 = $("<td>").html("金额");
                var td32 = $("<td>").html(value.oes[0].system_market_price);
                td31.appendTo(tr3);
                td32.appendTo(tr3);

                var tr4 = $("<tr class='active'>");
                var td41 = $("<td>").html("售后品牌");
                var td42 = $("<td>").html("<button>查询</button>");
                td41.appendTo(tr4);
                td42.appendTo(tr4);

            }

            tr1.appendTo(table);
            tr2.appendTo(table);
            tr3.appendTo(table);
            tr4.appendTo(table);
            table.appendTo(div);
        })
       $(".contenttable").html(div);

       $(".contenttable th").click(function(){
            $(this).parent().siblings("tr").toggleClass("active");
       })

        $(".contenttable button").click(function(){
            var num = $(this).parent().parent().parent().parent().index();
            $("#loading").show();
            localStorage.setItem("img",k.categorys[num].img);
            localStorage.setItem("oename",k.categorys[num].categoryname)
            $.ajax({
                type:"post",
                url:network+"/MattrioEc/OEIntface/queryPrductOfCategory",
                data:{
                    "mikey":mikey,
                    "category_id":k.categorys[num].categoryid
                },
                dataType:"json",
                cache: false,
                crossDomain: true == !(document.all),
                success:function(data){
                    console.log(data);
                    $("#loading").hide();
                    localStorage.oe =JSON.stringify(data);
                   window.location.href = "../particulars/particulars.html?oenumber="+k.categorys[num].oes[0].oe_numbers+"&oename="+k.categorys[num].categoryname;
                },
                error:function(data){
                    //console.log(data);
                }
            })
        })
    }
}


$(".contenttop button").click(function(){

    if($("#trigger4").html() == "请选择时间"){
        alert("请选择上路时间");
        return false;
    }
    if($("#trigger1").html() == "行驶里程"){
        alert("请选择行驶里程");
        return false;
    }


    $("#loading").show();
    var time = $("#trigger4").html().split("年")[0]+"-"+$("#trigger4").html().split("年")[1].split("月")[0];

    sessionStorage.setItem("yearname",$("#trigger4").html());
    sessionStorage.setItem("mile",$("#trigger1").html());
    var number = sessionStorage.getItem("number");
    $.ajax({
        type:"post",
        url:network+"/MattrioEc/MaintenanceCycleInterface/getMcForMikey",
        data:{
            "mikey":mikey,
            "mileage":number,
            "time":time
        },
        dataType:"json",
        cache: false,
        crossDomain: true == !(document.all),
        success:function(data){
            sessionStorage.k=JSON.stringify(data);
            var str;
            str = data;
            $("#loading").hide();
            //判断值data是否为空
            if(data.categorys.length == 0 || data.categorys == []){
                $(".contentbottomno").show();
                $(".contentbottom").hide();
            }else{
                $(".contentbottom").show(); 
                $(".contentbottomno").hide(); 
                $(".price span").html(data.maintenance_cost);
                var div = $("<div>");
                $.each(data.categorys,function(key,value){
                    //console.log(value);
                    var table = $("<table>");
                    th = $("<th colspan='2'>").html(value.categoryname);
                    var tr1 = $("<tr>");
                    th.appendTo(tr1);

                    if(value.oes == [] || value.oes.length == 0){
                        var tr2 = $("<tr class='active'>");
                        var td21 = $("<td>").html("需要更换（暂无OE号码）");
                        td21.appendTo(tr2);
                        var tr3 = $("<tr class='active'>");
                        var tr4 = $("<tr class='active'>");
                    }else{
                        var tr2 = $("<tr class='active'>");
                        var td21 = $("<td>").html("OE号码");
                        var td22 = $("<td>").html(value.oes[0].oe_numbers);
                        td21.appendTo(tr2);
                        td22.appendTo(tr2);

                        var tr3 = $("<tr class='active'>");
                        var td31 = $("<td>").html("金额");
                        var td32 = $("<td>").html(value.oes[0].system_market_price);
                        td31.appendTo(tr3);
                        td32.appendTo(tr3);

                        var tr4 = $("<tr class='active'>");
                        var td41 = $("<td>").html("售后品牌");
                        var td42 = $("<td>").html("<button>查 询</button>");
                        td41.appendTo(tr4);
                        td42.appendTo(tr4);
                    }

                    tr1.appendTo(table);
                    tr2.appendTo(table);
                    tr3.appendTo(table);
                    tr4.appendTo(table);
                    table.appendTo(div);
                })
                $(".contenttable").html(div);
                
                $(".contenttable th").click(function(){
                    $(this).parent().siblings("tr").toggleClass("active");
                })

                $(".contenttable button").click(function(){
                    var num = $(this).parent().parent().parent().parent().index();
                    $("#loading").show();
                    localStorage.setItem("img",data.categorys[num].img);
                    localStorage.setItem("oename",data.categorys[num].categoryname)
                    $.ajax({
                        type:"post",
                        url:network+"/MattrioEc/OEIntface/queryPrductOfCategory",
                        data:{
                            "mikey":mikey,
                            "category_id":data.categorys[num].categoryid
                        },
                        dataType:"json",
                        cache: false,
                        crossDomain: true == !(document.all),
                        success:function(data){
                            $("#loading").hide();
                            //console.log(data);
                            localStorage.oe =JSON.stringify(data);
                            window.location.href = "../particulars/particulars.html?oenumber="+str.categorys[num].oes[0].oe_numbers+"&oename="+str.categorys[num].categoryname;
                        },
                        error:function(data){
                            //console.log(data);
                        }
                    })
                })
            }
           
        },error:function(data){
            // console.log(data);
        }
    })
})



$(".contentbottomdiv span").click(function(){
    var number = sessionStorage.getItem("number");
    window.location.href="../handbook/handbook.html?scoll="+number+"&mikey="+mikey;
})