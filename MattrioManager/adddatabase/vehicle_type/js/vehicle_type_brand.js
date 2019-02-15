var network = localStorage.getItem("network");
$(".warting").removeClass("active");
// sessionStorage.setItem("pages",1)
// var pages = sessionStorage.getItem("pages");
// console.log(network);
$(".selectname2").change(function(){
	$("#inpsubmit").val("");
	if($(".selectname2").val() == "按条件搜索"){
		$("#inpsubmit").attr("placeholder","按条件搜索");
	}else if($(".selectname2").val() == "Mi-Key"){
		$("#inpsubmit").attr("placeholder","Mi-Key");
	}else if($(".selectname2").val() == "立洋ID"){
		$("#inpsubmit").attr("placeholder","立洋ID");
	}else if($(".selectname2").val() == "K-type"){
		$("#inpsubmit").attr("placeholder","K-type");
	}else if($(".selectname2").val() == "精友ID"){
		$("#inpsubmit").attr("placeholder","精友ID");
	}
})

fn();
function fn(){
	var page_index = 1;
	
	if($("#inpsubmit").val() == ""){
		var query_str = ""
	}else{
		var query_str = $("#inpsubmit").val();
	}
	if($(".selectname2").val() == "按条件搜索"){
		var query_type = "";
	}else if($(".selectname2").val() == "Mi-Key"){
		var query_type = "mikey";
	}else if($(".selectname2").val() == "立洋ID"){
		var query_type = "type0";
	}else if($(".selectname2").val() == "K-type"){
		var query_type = "type1";
	}else if($(".selectname2").val() == "精友ID"){
		var query_type = "type2";
	}
	$.ajax({
		url:network+"/MattrioManager/CarMatchController/getMikeyCaridList",
		type:"post",
		data:{
			"query_type":query_type,
			"query_str":query_str,
			"types":"type0,type1,type2",
			"page_index":page_index
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			// console.log(data)
			$("tbody").html("");
			$(".alltotal").html(data.list_size);
			$(".warting").addClass("active");
			$.each(data.list,function(key,value){
				demo(value);
			})
			//分页
			$(".zxf_pagediv").createPage({
				pageNum: Math.ceil(data.list_size/10),//总页码
				current: Number(page_index),//当前页
				shownum: 10,//每页显示个数
				// activepage: "",//当前页选中样式
				activepaf: "",//下一页选中样式
				backfun: function(e){
					$(".warting").removeClass("active");
					$("tbody").html("");
					var page_index = e.current;
					$.ajax({
						url:network+"/MattrioManager/CarMatchController/getMikeyCaridList",
						type:"post",
						data:{
							"query_type":query_type,
							"query_str":query_str,
							"types":"type0,type1,type2",
							"page_index":page_index
						},
						dataType:"json",
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$(".warting").addClass("active");
							$(".warting").addClass("active");
							if(data.list.length == 0){
								$(".wartno").removeClass("active");
							};
							$(".wartno").addClass("active");
							$.each(data.list,function(key,value){
								demo(value);
							})
						},
						error:function(data){
							// console.log(data);
						}
					})
				}
			})
		}
	})
}

//删除
$(document).on("click",".delthis",function(){
	sessionStorage.setItem("pages",$(".current").html());
	var mikeys = $(this).parents("td").parents("tr").children().eq(1).html();
	if(confirm("是否删除")){
		delCont(mikeys);
	}
});

//批量删除
function datadel(){
	sessionStorage.setItem("pages",$(".current").html());
	var id_array=new Array();  
	$('input[name="gay"]:checked').each(function(){
	    id_array.push($(this).parent("td").parent("tr").children().eq(1).html());//向数组中添加元素  
	});

	if(id_array.length == 0 || id_array == []){
		alert("请选择您要删除的选项");
		return false;
	}
	var mikeys = id_array.join(",");
	if(confirm("是否删除")){
		delCont(mikeys);
	}
};

function delCont(mikeys){
	$.ajax({
		type:"post",
		url:network+"/MattrioManager/CarMatchController/deleteMikeyCarids",
		data:{
			"mikeys":mikeys
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			fn();
		},
		error:function(data){
			// console.log(data);
		}
	})
}






//修改内容
$(document).on("click",".endior",function(){
	// console.log($(".current").html())
	sessionStorage.setItem("pages",$(".current").html());
	window.location.href =  "vehicle_type_revise.html?id1="+$(this).parents("td").parents("tr").children().eq(1).html()+"&id2="+$(this).parents("td").parents("tr").children().eq(2).html()+"&id3="+$(this).parents("td").parents("tr").children().eq(3).html()+"&id4="+$(this).parents("td").parents("tr").children().eq(4).html();
});

$("#btnsubmit").click(function(){
	if($("#inpsubmit").val() == ""){
		alert("输入内容不能为空");
		return false;
	}
	if($(".selectname2").val() == "按条件搜索"){
		alert("选择要查询的条件");
		return false;
	}
	fn();
});

function demo(value){
	if(value.type0){
		var type_0 = value.type0;
	}else{
		var type_0 = "";
	}
	if(value.type1){
		var type_1 = value.type1;
	}else{
		var type_1 = "";
	}
	if(value.type2){
		var type_2 = value.type2;
	}else{
		var type_2 = "";
	}
	if(value.Manufacture_CN){
		var Manufacture_CN = value.Manufacture_CN;
	}else{
		var Manufacture_CN = "";
	}
	if(value.Vehicle_Name_CN){
		var Vehicle_Name_CN = value.Vehicle_Name_CN;
	}else{
		var Vehicle_Name_CN = "";
	}
	if(value.Name_of_sales){
		var Name_of_sales = value.Name_of_sales;
	}else{
		var Name_of_sales = "";
	}
	if(value.Year_of_production){
		var Year_of_production = value.Year_of_production;
	}else{
		var Year_of_production = "";
	}
	var tr = $("<tr>").html("<td><input type='checkbox' name='gay' value=''></td><td>"+value.mikey+"</td><td>"+type_0+"</td><td>"+type_1+"</td><td>"+type_2+"</td><td>"+Manufacture_CN+"</td><td>"+Vehicle_Name_CN+"</td><td>"+Name_of_sales+"</td><td>"+Year_of_production+"</td><td><a style='text-decoration:none' href='javascript:;' title='编辑' class='endior'><i class='Hui-iconfont'>&#xe6df;</i></a> <a style='text-decoration:none' class='ml-5 delthis' href='javascript:;' title='删除'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>");
	tr.appendTo("tbody");
}