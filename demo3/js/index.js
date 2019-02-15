localStorage.setItem("network","https://www.51macc.com/api");
var network = localStorage.getItem("network");
var userid = '3e36d360-e6dd-4330-8573-7e1008cb1275'
var listIndex=0;
var textarr;
var stop=false;
var numarr=[];
 //读取表格
 		function xlsx(obj){
			$('.progress-value').text('0%');
		    $('.progress-bar').css('width','0%');
		    stop=false;
			$('.stopImg').show();
			$('.stopAction').hide();
			index=0;
 			listIndex=0;
			numarr=[];
 			$('textarea').val('')
 				var allow;;
	      		var wb;//读取完成的数据
	            var rABS = false; //是否将文件读取为二进制字符串
	            var excel='';  
	            var j=0;
                        //导入
	                if(!obj.files) {
	                    return;
	                }
	                const IMPORTFILE_MAXSIZE = 1*1024; //控制文件大小
	                var f = obj.files[0];
	                //判断上传的文件是否是excel
	                var suffix=f.name.substring(f.name.lastIndexOf('.')+1)
	               	if(suffix != 'xls' && suffix !='xlsx'){
			            alert('导入的文件格式不正确!')
			            $('#xlsxinput').val("")
			            return false;
			        }
	               	// 控制解析的表格的大小
			        if(f.size/1024 > IMPORTFILE_MAXSIZE){
			            alert('导入的表格文件不能大于1M')
			            $('#xlsxinput').val("")
			            return false;
			        }
	                var reader = new FileReader();
	                reader.onload = function(e) {
	                    var data = e.target.result;
	                    if(rABS) {
	                        wb = XLSX.read(btoa(fixdata(data)),{//手动转化
	                            type: 'base64'
	                        });
	                    } else {
	                        wb = XLSX.read(data,{
	                            type: 'binary'
	                        });
	                    }
	                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
	                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
	                           
	//                  document.getElementById("demo").innerHTML=JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
							//表格内容	
	                    excel=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
	                    var exceli=JSON.stringify(excel[0])
						var keyname=wb.Sheets[wb.SheetNames[0]].A1.w
						numarr.push(keyname)
						/*获取全部的编码转换为数组并去重*/
						$.each(excel,function(key,value){
							if(numarr.indexOf(value[keyname])<0&&value[keyname].replace(/\s+/g,"")!=''){
								numarr.push(value[keyname])	
							}
						})
						$.each(numarr,function(key,value){
							$("textarea").val(function(n,c){ 
								return c + value+',';
							})
						})	
						textarr=numarr
	                };
	            	$("#xlsxinput").val('')
	                if(rABS) {
	                    reader.readAsArrayBuffer(f);
	                } else {
	                    reader.readAsBinaryString(f);
	                }
	            function fixdata(data) { //文件流转BinaryString
	                var o = "",
	                    l = 0,
	                    w = 10240;
	                for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	                return o;
	            }
	      }

$(".input-vin").on('input',function(){
	if($(this).val()==''||$(this).val().length==0){
		$(".carname").text('')		
		$('textarea').val('')
		listIndex=0;
		textarr='';
		stop=false;
		numarr=[];
	}
})
$('.input-vin').change(function(){
	var inpval=$(this).val()
	if(inpval==''||inpval.length==0){
		$('.carname').text('')
		return false;
	}
	if(inpval.length==17){
		$('.nameInput').prop('placeholder','请稍等······')
		$.ajax({
			type:"post",
			url:network+"/Mattrio/VinInterface/queryvin",
			data:{
				'vin': inpval,
				'userid': userid
			},
            setTimeout:10000,
			success:function(data){
			    if(data.list==[]||data.list.length==0){
                    $(".carname").text('');
                }else{
                    $(".carname").text(data.list[0].Manufacture_CN+' '+data.list[0].Vehicle_Name_CN+' '+data.list[0].Capacity);
                }
			    $('tbody').html('')
                var tr1 = $('<tr>').appendTo('tbody');
                add(tr1);
                var tr2 = $('<tr>').appendTo('tbody');
                add(tr2);
				$('.nameInput').prop('placeholder','配件名称，配件编号(支持通用名称查询，如：龙门架)')
			},error:function(){
				alert('获取车型失败,请重新获取')
			}
		});
	}else{
		$('.carname').text('请输入正确的VIN码')	
	}
})
$('textarea').on('change',function(){
	$('.progress-value').text('0%');
    $('.progress-bar').css('width','0%');
    stop=false;
	$('.stopImg').show();
	$('.stopAction').hide();
	index=0;
	textarr=$('textarea').val().replace(/[\n，]/g,',').split(',');
    $('textarea').val('');
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
$(".fileBtn").click(function(){
    $('.file').click()
})
$('tbody').on('input','.nameInput',function(){
	var that=$(this);
	var inpval=$(this).val();
	if($(".input-vin").val()==''){
		$(this).val('');
		$(this).prop('placeholder','请先输入VIN码');
		return false;
	}
	if(inpval==''){
        var that=$(this);
    	that.val('');
    	that.parents('tr').find('.tdImg').attr('src','');
    	that.parents('tr').find('.td2').text('');
    	that.parents('tr').find('.td3').text('');
        that.parents('tr').find('.td4').text('');
        that.parents('tr').find('.td5').text('');
    	that.parents('tr').find('.oe').text('');
    	that.parents('tr').find('.money').text('');
    	that.parents('tr').find('.imgbox').hide();
    	that.parents('tr').find('.p').hide();
        that.sibling('.tdImg').attr('src','')
    }
	$.ajax({
		type:"post",
		url:network+"/Mattrio/CategoryInterface/LikeCategoryList",
		async:false,
		data:{
			"category_name":inpval,
			"size":"10"
		},
		success:function(data){
			if(data.list==[]||data.list.length==0){
				$('.listwrap').hide()			
				return false;
			}
			var listwrap=that.siblings('.listwrap');
			listwrap.html('');
			listwrap.show();
            data.list.sort(fun)
			function fun(a,b){
                return a.category_name.length-b.category_name.length
            }
			$.each(data.list,function(key,value){
				var p=$('<p class='+value.category_id+'>').html(value.category_name);
				p.appendTo(listwrap);
			})
		},error:function(){
			
		}
	})
})
$(document).on('click','.listwrap p',function(){
	var that=$(this);
	var valinp=$(this).text();
	var thtr=$(this).parents('tr');
	that.parents('.listwrap').siblings('.nameInput').val(valinp);
	$('.listwrap').hide();
	thtr.find('.td2').text('正在获取数据......');
	thtr.find('.tdImg').attr('src','img/loading.gif');
	$.ajax({
		type:"post",
		url:network+"/Mattrio/VinPartTestInterface/VinOeName",
		data:{
			'category_name':valinp,
			'vin': $('.input-vin').val(),
			'category_id':$(this).attr('class'),
			'oe_number':'',
			'userid': userid
		},
		success:function(data){
			if(data.oelist==[]||data.oelist.length==0){
				thtr.find('.tdImg').attr('src','img/jingshi.png');
				thtr.find('.td2').text('暂无数据');
				thtr.find('.td3').text('');
                thtr.find('.td4').text('');
                thtr.find('.td5').text('');
				thtr.find('.oe').text('');
				thtr.find('.money').text('');
				thtr.find('.imgbox').text('');
				thtr.find('.del').show();
                if(data.recode=='-1'){
                    alert('该车型暂无EPC')
                }
                return false;
			}
                $.each(data.oelist, function(key,val) {
                    if(key==0){
                        thtr.find('.tdImg').attr('src','img/duihao.png');
                        thtr.find('.td2').text(val.mattrio_category_name);
                        thtr.find('.td4').text(val.oe_name);
                        thtr.find('.td5').text(val.remark);
                        thtr.find('.oe').html('<a href="https://www.51macc.com/content/maintain/oecont/oecont.html?demo3=true&oenumber='+val.oe_number+'" target="_blank" title="点击跳转查看该OE更多信息">'+val.oe_number+'</a>');
                        thtr.find('.money').text('￥'+val.price);
                        thtr.find('.imgbox').show();
                        // if(val.epc_categorys==[]||val.epc_categorys.length==0){
                        //     thtr.find('.imgbox').hide();
                        //     thtr.find('.p').show();
                        // }else{
                        //     thtr.find('.imgbox').html('<img onerror="imgError(this)" src='+val.epc_categorys[0].img+' title='+val.epc_categorys[0].category_name+' alt='+val.epc_categorys[0].location+'/>')
                        // }
                    }else{
                        var tr=$('<tr>');
                        thtr.after(tr);
                        add(tr)
                        tr.find('.nameInput').val(valinp)
                        tr.find('.tdImg').attr('src','img/duihao.png');
                        tr.find('.td2').text(val.mattrio_category_name);
                        tr.find('.td4').text(val.oe_name);
                        tr.find('.td5').text(val.remark);
                        tr.find('.oe').html('<a href="https://www.51macc.com/content/maintain/oecont/oecont.html?demo3=true&oenumber='+val.oe_number+'" target="_blank" title="点击跳转查看该OE更多信息">'+val.oe_number+'</a>');
                        tr.find('.money').text('￥'+val.price);
                        tr.find('.imgbox').show();
                        // if(val.epc_categorys==[]||val.epc_categorys.length==0){
                        //     tr.find('.imgbox').hide();
                        //     tr.find('.p').show();
                        // }else{
                        //     tr.find('.imgbox').html('<img onerror="imgError(this)" src='+val.epc_categorys[0].img+' title='+val.epc_categorys[0].category_name+' alt='+val.epc_categorys[0].location+'/>')
                        // }
                    }
                });
			// thtr.remove();
		},error:function(){
			alert('获取失败，请重新获取')
		}
	});
})
$('.del').click(function(){
	$(this).parents('tr').remove();
})
$('.add').click(function(){
    var tr = $('<tr>').appendTo('tbody');
    add(tr)
})
function add(tr){
    var td2 = $('<td>').html('<div class="nameinpwrap"><input type="text" class="nameInput" placeholder="配件名称，配件编号(支持通用名称查询，如：龙门架)" /><img class="tdImg" src="" /><div class="listwrap"></div></div>').appendTo(tr)
    var td3 = $('<td class="td2">').html('').appendTo(tr);
    var td5 = $('<td class="td4">').html('').appendTo(tr);
    var td10 = $('<td class="td5">').html('').appendTo(tr);
    var td6 = $('<td class="oe">').html('').appendTo(tr);
    var td7 = $('<td class="money">').html('').appendTo(tr);
    // var td8 = $('<td class="tdimg">').html('<p class="p">暂无图片</p><div class="imgbox"></div>').appendTo(tr);
    var td9 = $('<td class="tddel">').html('<p class="del">删除</p>').appendTo(tr);
    td9.on('click', '.del', function() {
        tr.remove();
    })
}
function imgError(that){
	$(that).parent('.imgbox').hide();
	$(that).parent('.imgbox').siblings('.p').show();
}
/*批量查询*/
$('.btn2').click(function(){
    if($('.input-vin').val()==''){
        alert('请输入VIN码');
        return false;
    }else if(stop){
        alert('已暂停');
        return false;
    }
    listIndex=0;
    $('tbody').html('');
    $('.progress-value').text('0%');
    $('.progress-bar').css('width','0%');
    textarr=$('textarea').val().split(',');
    textarr.pop()
    ajaxid()
    function ajaxid(){
        $.ajax({
            type:"post",
            url:"https://www.51macc.com/api/Mattrio/ProductInterface/getCategoryNameList",
            async:false,
            data:{
                'category_list':"'"+textarr.join("','")+"'"
            },
            success:function(data){
                textarr=data.list;
                nameFun(textarr);
            },error:function(){
                ajaxid();
            }
        });
    }
})
$('.stop').click(function(){
    if($('.progress-value').text()=='0%'){
        alert('请先开始获取数据');
        return false;
    }else if($('.progress-value').text()=='100%'){
        alert('已经获取完');
        return false;
    }
    if(stop){
        stop=false;
        $('.stopImg').show();
        $('.stopAction').hide();
        nameFun(textarr);
    }else{
        stop=true;
        $('.stopImg').hide();
        $('.stopAction').show();
    }
})
function nameFun(value){
	if(stop){
		alert('已暂停');
		return false;
	}
	$.ajax({
		type:"post",
		url:network+"/Mattrio/VinPartInterface/VinOe",
		data:{
			'category_name':value[listIndex].category_name,
			'vin': $('.input-vin').val(),
			'category_id':value[listIndex].category_id,
			'oe_number':'',
			'userid': userid
		},
		success:function(data){
			if(data.oelist==[]||data.oelist.length==0){
				var tr=$('<tr>').appendTo('tbody');
                add(tr)
                tr.find('.tdImg').attr('src','img/jingshi.png');
				tr.find('.td2').text('暂无数据');
//				tr.find('.td3').text('')
				tr.find('.td4').text('');
				tr.find('.oe').text('');
				tr.find('.money').text('');
				// tr.find('.imgbox').text('');
				listIndex++;
				$('.progress-value').text((listIndex/value.length*100).toFixed(2)+'%');
				$('.progress-bar').css('width',(listIndex/value.length*100).toFixed(2)+'%');
				if(listIndex==value.length){
					$('.progress-bar').removeClass('active');
				}
				if(listIndex<value.length){
					nameFun(value);
				}
				return false;
			}
			$.each(data.oelist, function(ke,val) {
				var tr=$('<tr>').appendTo('tbody');
                add(tr)
                tr.find('.tdImg').attr('src','img/duihao.png')
				tr.find('.td2').text(val.mattrio_category_name);
	//			tr.find('.td3').text(data.oelist[0].oe_name)
				tr.find('.td4').text(val.oe_name)
				tr.find('.oe').text(val.oe_number)
				tr.find('.money').text('￥'+val.price)
				// tr.find('.imgbox').show()
                tr.find('.nameInput').val(value[listIndex].category_name)
				// if(val.epc_categorys==[]||val.epc_categorys.length==0){
				// 	tr.find('.imgbox').hide();
				// 	tr.find('.p').show();
				// }else{
				// 	tr.find('.imgbox').html('<img onerror="imgError(this)" src='+val.epc_categorys[0].img+' title='+val.epc_categorys[0].category_name+' alt='+val.epc_categorys[0].location+'/>')
				// }
				function imgError(that){
					that.parents('.imgbox').hide();
					that.parents('.imgbox').siblings('.p').show();
				}
				return false;
			});
				listIndex++
						$('.progress-value').text((listIndex/value.length*100).toFixed(2)+'%')
						$('.progress-bar').css('width',(listIndex/value.length*100).toFixed(2)+'%')
						if(listIndex==value.length){
							$('.progress-bar').removeClass('active')	
						}
						if(listIndex<value.length){
							nameFun(value)	
						}
		},error:function(){
			
		}
	});
}
/*end*/

$('.imgwrap').click(function(e){
	stopPropagation(e)
})
//var index=0;
//var num=0;
$(document).on('click','.imgbox img',function(){
	num=0;
//	index=$(this).parents('tr').index()
	var src=$(this).prop('src')
	$('.small').prop('src',src)
	$('.large').css('background','url("'+src+'") no-repeat')
	$('.oename').text($(this).prop('title')).attr('title',$(this).prop('title'))
	$('.location').text($(this).prop('alt'))
	var native_width = 0;
	var native_height = 0;
//	console.log(list)
//	if(list[index].list.length==1){
//		$('.left,.right').attr('disabled',true).addClass('none')
//	}else{
//		$('.left,.right').attr('disabled',false)
//		$('.left').addClass('none')
//		$('.right').removeClass('none')
//	}
	$(".imgCarname").text($('.carname').text())
	$('.small').load(function(){
	var img_obj = new Image();
	img_obj.src = $('.small').prop('src')
		native_width = img_obj.width;
		native_height = img_obj.height;
		$('.meng').fadeIn(100,function(){
				$('.magnify').mousemove(function(e){
					var magnify_offset = $(this).offset();
					var mouse_x = e.pageX - magnify_offset.left;
					var mouse_y = e.pageY - magnify_offset.top;
					if( mouse_x > 10 && mouse_y > 10 && mouse_x < $(this).width()-10 && mouse_y < $(this).height()-10 ){
						$('.large').fadeIn(100);
					}else{
						$('.large').fadeOut(100);
					}
					if($('.large').is(':visible')){
						var rx = Math.round(mouse_x/$('.small').width()*native_width - $('.large').width()/2)*-1;
						var ry = Math.round(mouse_y/$('.small').height()*native_height - $('.large').height()/2)*-1;
						var bgp = rx+ 'px ' + ry + 'px';
						var gx = mouse_x - $('.large').width()/2;
						var gy = mouse_y - $('.large').height()/2;
						$('.large').css({
							'left':gx,		
							'top':gy,		
							'backgroundPosition':bgp		
						})
					}
				})
		})
	})
})
//$(".right").click(function(){
//	num+=1
//	if(num>=list[index].list.length-1){
//		num=list[index].list.length-1
//		$(this).addClass('none')
//	}
//	$('.left').removeClass('none')
//	var imgContent=list[index].list[num]
//	$('.small').prop('src',imgContent.img)
//	$('.large').css('background','url("'+imgContent.img+'") no-repeat')
//	$('.oename').text(imgContent.category_name).attr('title',imgContent.category_name)
//	$('.location').text(imgContent.callout)
//})
//$(".left").click(function(){
//	num-=1
//	if(num<=0){
//		num=0
//		$(this).addClass('none')
//	}
//	$('.right').removeClass('none')
//	var imgContent=list[index].list[num]
//	$('.small').prop('src',imgContent.img)
//	$('.large').css('background','url("'+imgContent.img+'") no-repeat')
//	$('.oename').text(imgContent.category_name).attr('title',imgContent.category_name)
//	$('.location').text(imgContent.callout)
//})

$('.meng').click(function(e){
	stopPropagation(e)
	$('.meng').hide()
})
$(document).click(function(e){
	stopPropagation(e)
	$(".listwrap").hide()
})
//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 