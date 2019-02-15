$(".runtasclor").click(function(){
	window.location.href="../../index.html";
})

var network = localStorage.getItem("networkmodel");
var username_id = localStorage.getItem("username_id"); 
var particulars = JSON.parse(localStorage.particulars);
localStorage.setItem('result',JSON.stringify(particulars.list))
var arr = particulars.list;
var hash = {};
var result = [];
for(var i = 0, len = arr.length; i < len; i++){
    if(!hash[arr[i].product_id]){
        result.push(arr[i]);
        hash[arr[i].product_id] = true;
    }
}
var arrName=[];
$.each(result,function (k,val) {
    var str=val.category_name.substring(0,val.category_name.length-1);
    if (arrName.indexOf(str)<0){
        arrName.push(str)
        $.each(result,function(key,value){
            if (str==value.category_name.substring(0,value.category_name.length-1)){
                var $li = $("<li>");
                var $a = $("<a href='#'>");
                var $p1 = $("<p class='listimg'>");
                var $img = $("<img src='"+network+"/MattrioEcModel/upload/img/luosheng/"+value.img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">");
                $img.appendTo($p1);
                var $p = $("<p class='listtle'>").html(value.category_name);
                var $p2 = $("<p class='listtle'>").html(value.category);
                var $p3 = $("<p class='listtex'>").html("产品编号："+value.product_id);
                var $p4 = $("<p class='listtex'>").html("车型："+particulars.car_info[0].Manufacture_CN+" "+particulars.car_info[0].Vehicle_Name_CN);
                var $p5 = $("<p class='listtex'>").html("年款："+particulars.car_info[0].Year_of_production);
                var $p6 = $("<p class='listtex'>").html("排量："+particulars.car_info[0].Capacity);
                $p1.appendTo($a);
                $p.appendTo($a);
                $p2.appendTo($a);
                $p3.appendTo($a);
                $p4.appendTo($a);
                $p5.appendTo($a);
                $p6.appendTo($a);

                $a.appendTo($li);
                $li.appendTo($(".content ul"));
            }
        })
    }
})
$("li").click(function(){
    window.location.href="../oeinfo/oeinfo.html?id="+$(this).index();
})






