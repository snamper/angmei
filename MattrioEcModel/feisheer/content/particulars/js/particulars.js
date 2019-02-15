var network = localStorage.getItem("networkmodel");  
var username_id = localStorage.getItem("username_id"); 

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
 var product_id=getUrlParam('fdjlist')
 var year=getUrlParam('year')
$.ajax({
	type:"post",
    url:network+"/MattrioEcModel/ProductIntface/getProductCars",
    data:{
        "brand_id":username_id,
        "product_id":product_id
    },
    dataType:"json",
    success:function(data){
//     console.log(data)
       $.each(data.list,function(key,value){
       					var a=''
						if(value.Air_intake_form=='自然吸气'){
							a='L'
						}else{
							a='T'
						}
    		var li1=$('<li class="list-two clearfix">').html('<span class="span1">主机厂</span><span class="span2">'+value.Manufacture_CN+'</span>')
    		var li2=$('<li class="list-two clearfix">').html('<span class="span1">车型</span><span class="span2">'+value.Vehicle_Name_CN+'</span>')
    		var li3=$('<li class="list-two clearfix">').html('<span class="span1">排量</span><span class="span2">'+value.Capacity+a+'</span>')
    		li1.appendTo('.ul2')
    		li2.appendTo('.ul2')
    		li3.appendTo('.ul2')
    	})
       $.each(data.info,function(key,value){
       	    if(value.parameter_cn=='建议使用油品'){
       	    	 var li1=$('<li class="list-two clearfix">').html('<span class="span1">'+value.parameter_cn+'<br/><br/><b>'+value.describe+'</b></span>'+'<img class="image" src="http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/'+value.describe+'.jpg" title='+value.parameter_cn+value.describe+' />')
       	    }else if(value.parameter_cn=='年款'){
       	    	var li1=$('<li class="list-two clearfix">').html('<span class="span1">年款</span><span class="span2">'+year+'</span>')
       	    }else if(value.parameter_cn=='油液检查位置图片'){
       	    var li1=$('<li class="list-two clearfix">').html('<span class="span1">'+value.parameter_cn+'</span>'+'<img src="http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/fer/'+value.describe+'.jpg" title='+value.parameter_cn+' />')
       	    }else if(value.parameter_cn=='检查接口图片'){
       	    	var li1=$('<li class="list-two clearfix">').html('<span class="span1">换油机接口图片</span>'+'<img src="http://mattrioec-img.oss-cn-shanghai.aliyuncs.com/fer/'+value.describe+'.jpg" title="换油机接口图片" />')
       	    }else{
       	    	var li1=$('<li class="list-two clearfix">').html('<span class="span1">'+value.parameter_cn+'</span><span class="span2">'+value.describe+'</span>')
       	    }
    		li1.appendTo('.ul2')
    	})
    },
    error:function(data){
        // console.log(1)
    }
})
$(document).on('click','.list-two img',function(e){
	e.stopPropagation()
	var that=$(this)
	$('.meng').show()
	$('.imgwrap').removeClass('width')
	$('.imgwrap').html('')
	var imgwrap=$('<div class="img"></div>')
	imgwrap.appendTo('.imgwrap')
	var loading=$('<img class="load" src="../image/loading.gif"/>')
	loading.appendTo('.img')
	setTimeout(function(){
		$('.load').hide()
		var p=$('<p>').html(that.prop('title'))
		p.prependTo('.imgwrap')
		if(that.prop('class')=='image'){
			var imgwrap=$('<img  src='+that.prop('src')+' class='+that.prop('class')+' /><div class="none"></div>')	
			$('.imgwrap').addClass('width')
		}else{
			var imgwrap=$('<img  src='+that.prop('src')+' /><div class="none"></div>')
		}
		imgwrap.appendTo('.img')
	},500)
})
$(document).on('click','.none',function(e){
	e.stopPropagation()
	$('.meng').hide()
})
function fun(){
	window.location.href='../list/list.html'
}