 var numarr=[];
 //读取表格

 		function xlsx(obj){

 		    $('textarea').text('')
 				var allow;
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