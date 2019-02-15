if(localStorage){
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var userid = $.cookie("user_id");
var index = 0;/*次数*/
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var excel = '';/*导入的数据*/
var stop = false;/*是否暂停*/
var numarr=[];/*导入的表格数组*/
var oearr=[];/*OE数组*/
var shouhuoarr=[];/*售后数组*/
var nonearr=[];/*售后数组*/
var len=''/*导入的表格长度*/
var dttable;
var textarr=[]
var recode='';
if(sessionStorage.getItem('numlist')){
	textarr=JSON.parse(sessionStorage.getItem('numlist')).replace(/\n|\s+/g,',').split(',')
	$('textarea').val('')
	var length=textarr.length;
			for(var i = 0; i < length; i++) {
				if(textarr[i]==''){
       				textarr.splice(i,1)
       				length--;
					i--;
       			}
				for(var j = i + 1; j < length; j++) {
					if(textarr[i] == textarr[j]) { //通过id属性进行匹配；
						textarr.splice(j, 1); //去除重复的对象；
						length--;
						j--;
				 	}
				}	
			}
	$.each(textarr,function(key,value){
			$("textarea").val(function(n,c){
				 return c + value+',';
			})
	})	
}

$('.import').click(function(){
	$('#xlsxinput').click()
})
function xlsx(obj) {
	index=0;/*清空index*/
	$("tbody").html('')/*清空表格*/
	numarr=[];
	textarr=[];
	$(".progress-bar").css('width','0%')
	$(".progress-value").text('0%')
	$(".stopimg").show()
	$(".actionimg").hide()
	$('textarea').val('')
	//导入
	if(!obj.files) {
		return;
	}
	const IMPORTFILE_MAXSIZE = 1 * 1024; //控制文件大小
	var f = obj.files[0];
	var suffix = f.name.substring(f.name.lastIndexOf('.') + 1)
	if(suffix != 'xls' && suffix != 'xlsx') {
		alert('导入的文件格式不正确!')
		$('#xlsxinput').val("")
		return false;
	}
	 if(f.size / 1024 > IMPORTFILE_MAXSIZE) {
	  	alert('导入的表格文件不能大于1M')
	  	$('#xlsxinput').val("")
	  	return false;
	  }
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		if(rABS) {
			wb = XLSX.read(btoa(fixdata(data)), { //手动转化
				type: 'base64'
			});
		} else {
			wb = XLSX.read(data, {
				type: 'binary'
			});
		}
		excel = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
		var exceli=JSON.stringify(excel[0])
		var keyname=wb.Sheets[wb.SheetNames[0]].A1.w
		numarr.push(keyname)
		/*获取全部的编码转换为数组并去重*/
		$.each(excel,function(key,value){
			if(numarr.indexOf(value[keyname])<0&&value[keyname].replace(/\s+/g,"")!=''){
				numarr.push(value[keyname])	
			}
		})
        var length=numarr.length;
        for(var i = 0; i < length; i++) {
            if(numarr[i]==''){
                numarr.splice(i,1)
                length--;
                i--;
            }
            for(var j = i + 1; j < length; j++) {
                if(numarr[i] == numarr[j]) { //通过id属性进行匹配；
                    numarr.splice(j, 1); //去除重复的对象；
                    length--;
                    j--;
                }
            }
        }
		$.each(numarr,function(key,value){
			$("textarea").val(function(n,c){
				return c + value+',';
			})
		})
		
		len=numarr.length;	
		textarr=numarr
		$("#xlsxinput").val('')
	};
	if(rABS) {
		reader.readAsArrayBuffer(f);
	} else {
		reader.readAsBinaryString(f);
	}
}
function fixdata(data) { //文件流转BinaryString
		var o = "",
			l = 0,
			w = 10240;
		for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
		return o;
}
$('textarea').on('change',function(){
	stop = false;
	index=0;/*清空index*/
	$("tbody").html('')/*清空表格*/
	$(".progress-bar").css('width','0%')
	$(".progress-value").text('0%')
	$(".stopimg").show()
	$(".actionimg").hide()	
	textarr=$('textarea').val().replace(/\n|\s+/g,',').split(',')
	$('textarea').val('')
	var length=textarr.length;
    for(var i = 0; i < length; i++) {
        if(textarr[i]==''){
            textarr.splice(i,1)
            length--;
            i--;
        }
        for(var j = i + 1; j < length; j++) {
            if(textarr[i] == textarr[j]) { //通过id属性进行匹配；
                textarr.splice(j, 1); //去除重复的对象；
                length--;
                j--;
            }
        }
    }
	$.each(textarr,function(key,value){
			$("textarea").val(function(n,c){
				 return c + value+',';
			})
	})
	
})

//获取数据
$('.getdata').click(function(){
	if($(".progress-value").text()!='0%'){
		if($(".progress-value").text()=='100.00%'){
			alert('已获取完可导出')
		}else{
			alert('正在获取')
		}
		return false;
	 }
	index=0;
	$(".progress-bar-striped").addClass('active')	
	if(textarr!=[]&&textarr.length>0){
		searchoe(textarr,oearr,shouhuoarr,textarr.length)
	}else{
		alert('请先导入表格或输入想查询的OE号码或售后编码')
		return false;	
	}
})
//放大
$('.course').click(function(){
	$(".meng").fadeIn(200)
	$(".pos").hide()
	$(".cou").show()
})
$(".meng").click(function(){
	$(this).fadeOut(200)
})
//暂停
$('.stop').click(function(){
	if($(".progress-value").text()=='0%'){
		alert('请先开始获取数据')
		return false
	}
	if($(".progress-value").text()=='100.00%'){
		alert('已经获取完')
		return false
	}
	if(!stop){
		$(".actionimg").show()
		$(".stopimg").hide()
		stop=true
	}else{
		$(".actionimg").hide()
		$(".stopimg").show()
		stop=false
		$(".progress-bar-striped").addClass('active')
		if(textarr!=[]&&textarr.length>0){
			searchoe(textarr,oearr,shouhuoarr,textarr.length)
		}else if(numarr!=[]&&numarr.length>0){
			searchoe(numarr,oearr,shouhuoarr,len)
		}
	}
})
//切换表格
$('.tab ').click(function(){
	$('.tab').removeClass('tabbg')
	$(this).addClass('tabbg')
	if($(this).text()=='OE信息'){
		$(".oetable").show().siblings('table').hide()
	}else if($(this).text()=='OE适配车型'){
		$(".oecartable").show().siblings('table').hide()
	}else if($(this).text()=='售后品牌'){
		$(".shtable").show().siblings('table').hide()
	}else{
		$(".nonetable").show().siblings('table').hide()
	}
})
//$(document).on("click",".oecont span",function(){
//	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
//})
//$(document).on("click",".socont span",function(){	
//	window.open("../../content/aftermarket/afterdsf/afterdsf.html?product_id="+$(this).html());
//})
/*导出*/
$(".export").click(function(){	
	if(index==0){
		alert('请在获取数据后导出')
		return false
	}
    if($('#oetable').is(':visible')){
        $('#oetable').table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: 'OE信息',
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
        // $('.tab').tableExport({ type: "multisheetxls", worksheetName: ["oetable", "oecartable", "shtable","nonetable"] });
    }else if($('#oecartable').is(':visible')){
        $('#oecartable').table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: 'OE适配车型',
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    }else if($('#shtable').is(':visible')){
        $('#shtable').table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: '售后品牌',
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    }else if($('#nonetable').is(':visible')){
        $('#nonetable').table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: '无结果',
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    }
})

/*用编码获取对应的OE信息或者是售后编码信息 并归类*/
function searchoe(numarr,oearr,shouhuoarr,len){
    // if($('#oecartable tbody tr').length>3000){
    //     $(".actionimg").show()
    //     $(".stopimg").hide()
    //     stop=true
    //     alert('数据量太大已暂停')
    //     return false;
    // }
	 if(stop==true){
		alert('暂停了')
		return false;
	 }
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/queryOenumber",
		data: {
			"oenumber": numarr[index].replace(/-/g, ""),
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			recode=frequencyfun(userid,recode)
			if(recode == 0) {
				alert("当天次数已用完!");
				stop=true
				return false;
			}
			if(data.recode == -2){
				alert("请重新登陆");
				stop=true
				window.location.href = "/Mattrio/login/login.html";
				return false;
			}
			if(data.list.length == 0) {
				$.ajax({
					type: "post",
					url: network + "/Mattrio/OeInterface/queryPrductRelevant",
					data: {
						"product_id":$.trim(numarr[index]),
						"userid": userid
					},
					dataType: "json",
					cache: false,
					crossDomain: true == !(document.all),
					success: function(da) {
						recode=frequencyfun(userid,recode)
						if(recode == 0) {
							alert("当天次数已用完!");
							return false;
						}
						if(data.recode == -2){
							alert("请重新登陆");
							stop=true
							window.location.href = "/Mattrio/login/login.html";
							return false;
						}
						if(da.products.length == 0) {
								numjieguo(nonearr,numarr,numarr[index], '无结果', '', len)
								return false;
						} else {
							numjieguo(shouhuoarr,numarr,numarr[index], '售后编码', da.products, len)
							return false;
						}
					},
					error: function(data) {
						$("#loading").hide()
						alert("请求失败")
					}
				})						 
			} else {
				numjieguo(oearr,numarr,numarr[index], 'OE编码', data.list, len)
			}
		},
		error: function(data) {
			alert("请求失败")
		}
	})
}
/*编码列表归类*/
function numjieguo(arr,numarr,num,name,data,len){
    // if($('#oecartable tbody tr').length>3000){
    //     $(".actionimg").show()
    //     $(".stopimg").hide()
    //     stop=true
    //     alert('数据量太大已暂停')
    //     return false;
    // }
	if(name=='OE编码'){
	    if($('.inpbox').is(':checked')){
            $.ajax({
                type: "post",
                url: network + "/Mattrio/ProductInterface/getOeCars",
                data: {
                    'oenumber': $.trim(num).replace(/\s+|-/g, ""),
                    'userid': userid
                },
                dataType: "json",
                cache: false,
                crossDomain: true == !(document.all),
                success: function(data) {
                    if(data.list==[]||data.list.length==0){
                        var tr=$("<tr>")
                        var td1=$("<td class='oecont'>").html("<span>"+num.replace(/^0/g,'0 ')+"</sapn>");
                        var td2=$("<td>").html("暂无数据");
                        td1.appendTo(tr)
                        td2.appendTo(tr)
                        tr.appendTo('.oecartable tbody')
                        return false;
                    }
                    $.each(data.list,function(kay,value){
                        var tr=$("<tr>")
                        var td1=$("<td class='oecont'>").html("<span>"+num.replace(/^0/g,'0 ')+"</sapn>");
                        var td2=$("<td>").html(value.mikey)
                        var td3=$("<td>").html(value.Manufacture_CN)
                        var td4=$("<td>").html(value.Vehicle_Name_CN)
                        var td5=$("<td>").html(value.Vehicle_of_year)
                        var td6=$("<td>").html(value.Name_of_sales)
                        td1.appendTo(tr)
                        td2.appendTo(tr)
                        td3.appendTo(tr)
                        td4.appendTo(tr)
                        td5.appendTo(tr)
                        td6.appendTo(tr)
                        tr.appendTo('.oecartable tbody')
                    })
                },
                error: function() {

                }
            });
        }
			$.each(data,function(kay,value){
				var tr=$("<tr>")
				var td1=$("<td class='oecont'>").html("<span>"+num.replace(/^0/g,'0 ')+"</sapn>");
				var td2=$("<td>").html(value.category_name)
				var td3=$("<td>").html(value.parent_name)
				var td4=$("<td>").html('￥'+value.system_market_price)
				td1.appendTo(tr)
				td2.appendTo(tr)
				td3.appendTo(tr)
				td4.appendTo(tr)
				tr.appendTo('.oetable tbody')
			})	
	}else if(name=='售后编码'){
		if(data[0].parent_name=='第三方'){
			var tr=$("<tr>")
			var td1=$("<td class='socont'>").html("<span>"+data[0].oe_numbers+"</sapn>");
			var td2=$("<td>").html(data[0].category_name)
			var td3=$("<td>").html('')
			var td4=$("<td>").html('')
			var td5=$("<td>").html(data[0].parent_name)
			td1.appendTo(tr)
			td2.appendTo(tr)
			td3.appendTo(tr)
			td5.appendTo(tr)
			td4.appendTo(tr)
			tr.appendTo('.shtable tbody')	
		}else{
			$.each(data,function(kay,value){
				if(value.product_id==num){
					var tr=$("<tr>")
					var td1=$("<td class='socont'>").html("<span>"+num+"</sapn>");
					var td2=$("<td>").html(value.category_name)
					var td3=$("<td>").html("<img src=http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+value.img +" />")
					var td4=$("<td>").html('<img src='+value.brand_img+'>')
					var td5=$("<td>").html(value.brand_name)
					td1.appendTo(tr)
					td2.appendTo(tr)
					td3.appendTo(tr)
					td5.appendTo(tr)
					td4.appendTo(tr)
					tr.appendTo('.shtable tbody')	
				}
			})	
		}
	}else{
		var tr=$("<tr>")
		var td1=$("<td>").html(num)
		td1.appendTo(tr)
		tr.appendTo('.nonetable tbody')
	}
		index++
		$(".progress-bar").css('width',((index/len)*100).toFixed(2)+'%')
		$(".progress-value").text(((index/len)*100).toFixed(2)+'%')
		if(index==len){			
			$(".progress-bar-striped").removeClass('active')		
			return false;
		}
		if(index < len) {
			searchoe(numarr,oearr,shouhuoarr,len)
		}
}
