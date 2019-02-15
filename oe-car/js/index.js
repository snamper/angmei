	var num =0;
	var wb;//读取完成的数据
	var rABS = false; //是否将文件读取为二进制字符串
	var excel='';  
	var j=0;
	var percent=0;
	var msg=0;
	var zanting=false;
	      function xlsx(obj){
	      	$(".numwrap").text('0')
                        //导入
	                if(!obj.files) {
	                    return;
	                }
	                const IMPORTFILE_MAXSIZE = 1*1024; //控制文件大小
	                var f = obj.files[0];     
	                var suffix=f.name.substring(f.name.lastIndexOf('.')+1)
	               	if(suffix != 'xls' && suffix !='xlsx'){
			            alert('导入的文件格式不正确!')
			            $('#xlsxinput').val("")
			            return false;
			        }
//			        if(f.size/1024 > IMPORTFILE_MAXSIZE){
//			            alert('导入的表格文件不能大于1M')
//			            $('#xlsxinput').val("")
//			            return false;
//			        }
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
	                    excel=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
//						console.log(excel)
	                };
	            
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
	      var tab=$('table')
	      $("input:radio[name='ra']").change(function(){
	      		$(".numwrap").text('0');
	      		zanting=false;
	      		$("#zanting").text('暂停')
	      })
	      /*按钮点击进行获取适配车型*/
	       $('#filebtn').click(function(){
	       		if($("#zanting").text()=='暂停'){
	       			zanting=false;
	       			tab.html('')
		       		num=0
		      		filebtn(num)
	       		}else{
	       			alert('请点击继续')
	       		}
	      })
	       /*暂停*/
	      $('#zanting').click(function(){
		      	if(num==0){
		      		alert('请开始获取在进行操作')
		      		return false;
		      	}
		      	if($(".numwrap").text()==100){
		      		alert('以获取完成')
		      		return false;
		      	}
		      	if($(this).text()=='继续'){
		      		zanting=false;
	      			$("#zanting").text('暂停')
		      		filebtn(num)
	      			return false;
		      	}
	      		zanting=true;
	      		$("#zanting").text('继续')
	      })
	      
	     	/*导出*/    
	       $("#btnExport").click(function () {	
		      	if(	$(".numwrap").text()=='0'){
		      		alert('请在获取完数据后进行导出')
		      		return false;
		      	}
			       $('table').table2excel({
			          exclude : ".noExl", //过滤位置的 css 类名
			          filename : "表格.xls", //文件名称
			          name: "Excel Document Name.xlsx",
			          exclude_img: true,
			          exclude_links: true,
			          exclude_inputs: true
			       });
		      });
	function filebtn(num){
			var oearr=[];
			var ztnum = '';
	      	$(".numwrap").text('0')
	      	if($('input:checked').length==0){
	      		alert('请选择你要导出的内容');
	      		return false;
	      	}
	      	if(excel==''||excel.length==0){
	      	 	alert('请选择您要上传的excel表格')
	      	 	return false;
	      	}
	      	var exceli=JSON.stringify(excel[0])
	      	var keyname=exceli.substring(exceli.indexOf('{"')+2,exceli.indexOf('":"'))
	      	oearr.push(keyname)
	      	$.each(excel,function(key,value){
	      		oearr.push(value[keyname])
	      	})
	      	var len=oearr.length;
	      	if($('input:checked').attr('id')=='name'){
	      		namefun();
	      		nameajax(oearr,len);
			}else{
				cartypefun();
	      		cartypeajax(oearr,len);
			} 
	    }
	
	function namefun(){
		var td=$('<td>').text('OE')
		var td1=$('<td>').text('category_name')
		var td2=$('<td>').text('parent_name')
		var td3=$('<td>').text('name1')
		var td4=$('<td>').text('oe_numbers')
		var td5=$('<td>').text('remark')
		var td6=$('<td>').text('system_market_price')
		var tr=$('<tr>')
		td.appendTo(tr)
		td1.appendTo(tr)
		td2.appendTo(tr)
		td3.appendTo(tr)
		td4.appendTo(tr)
		td5.appendTo(tr)
		td6.appendTo(tr)
		tab.append(tr)
	}
	function nameajax(oearr,len){
		if(zanting==true){
			alert('暂停了')
			return false;
		}
		oe=oearr[num]
		$.ajax({
			type: "post",
			url: "http://www.51macc.com:8080/Mattrio/OeInterface/queryOenumber",
			data: {
				"oenumber": oe,
				"userid": '808c1a13-8cb9-1035-9ce5-6abd7619172b'
			},
			dataType: "json",
			cache: false,
			async: true,
			crossDomain: true == !(document.all),
			success: function(data) {
				if(data.recode == -3) {
					msg = -3
					alert(data.msg)
					return false;
				}
				$.each(data.list, function(key, value) {
					var td = $('<td>').text(oe)
					var td1 = $('<td>').text(value.category_name)
					var td2 = $('<td>').text(value.parent_name)
					var td3 = $('<td>').text(value.name1)
					var td4 = $('<td>').text(value.oe_numbers)
					var td5 = $('<td>').text(value.remark)
					var td6 = $('<td>').text(value.system_market_price)
					var tr = $('<tr>')
					td.appendTo(tr)
					td1.appendTo(tr)
					td2.appendTo(tr)
					td3.appendTo(tr)
					td4.appendTo(tr)
					td5.appendTo(tr)
					td6.appendTo(tr)
					tr.appendTo(tab)
				});
				num++;
				if(num<=len){
					nameajax(oearr,len);
					$(".numwrap").text((num / len * 100).toFixed(2));
					if($(".numwrap").text()==100){
						alert('请点击导出Excel')
					}
				}
			},
			error: function(data) {
				//console.log(data);
			}
		})
	}
	function cartypefun(){
					var td=$('<td>').text('OE')
					var td5 = $('<td>').text('mikey')
					var td1 = $('<td>').text('Manufacture_CN')
					var td2 = $('<td>').text('Vehicle_Name_CN')
					var td3 = $('<td>').text('Vehicle_of_year')
					var td4 = $('<td>').text('Name_of_sales')
					var tr = $('<tr>')
					td.appendTo(tr)
					td5.appendTo(tr)
					td1.appendTo(tr)
					td2.appendTo(tr)
					td3.appendTo(tr)
					td4.appendTo(tr)
					tab.append(tr)
	}
	function cartypeajax(oearr,len){
		if(zanting==true){
			alert('暂停了')
			return false;
		}
		oe=oearr[num];
//		console.log(num)
		$.ajax({
			type: "post",
			url: "http://www.51macc.com:8080/Mattrio/ProductInterface/getOeCars",
			data: {
				"oenumber": oe,
				"userid": '808c1a13-8cb9-1035-9ce5-6abd7619172b'
			},
			dataType: "json",
			cache: false,
			async: true,
			crossDomain: true == !(document.all),
			success: function(data) {
				if(data.recode == -3) {
					alert(data.msg)
					return false;
				}
				$.each(data.list, function(key, value) {
					var td = $('<td>').text(oe)
					var td5 = $('<td>').text(value.mikey)
					var td1 = $('<td>').text(value.Manufacture_CN)
					var td2 = $('<td>').text(value.Vehicle_Name_CN)
					var td3 = $('<td>').text(value.Vehicle_of_year)
					var td4 = $('<td>').text(value.Name_of_sales)
					var tr = $('<tr>')
					td.appendTo(tr)
					td5.appendTo(tr)
					td1.appendTo(tr)
					td2.appendTo(tr)
					td3.appendTo(tr)
					td4.appendTo(tr)
					tr.appendTo(tab)
				})
				num++;
				if(num<=len){
					cartypeajax(oearr,len);
					$(".numwrap").text((num / len * 100).toFixed(2));
					if($(".numwrap").text()==100){
						alert('请点击导出Excel')
					}
				}
		
			},
			error: function(data) {
				//console.log(data);
			}
		})
	}
	