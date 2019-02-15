 //读取表格
 		function xlsx(obj){
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
//每点击上传1000条
	      function filebtn(){
	      	   	allow=false;
	          	var length=0;
	          	var exceljson='';
	          	j+1000>excel.length?length=excel.length:length=j+1000;
	          	for(var i=j;i<length;i++){
	          	    exceljson+=excel[i]
	          	}
	          	if(!allow){
	          		 if(length!=excel.length){
			               	$.ajax({
			               		type:"POST",
			               		url:"http://192.168.125.117:8080/Mattrio/upload/testarray",
			               		async:false,
			               		data:{
			               			upload_json:exceljson
			               		},
			               		success:function(data){
			               			allow=true;
			               			console.log(data)
			               			j+=1000;
			               			j>excel.length?j-=1000:j;
			               			
			               		},
			               		error:function(data){
	                                alert("上传失败")
			               		}
			               })
			               	$("#bar").html(Math.round(j/excel.length*100)+"%")
		             }else{
		             		$("#bar").html(100+"%")
		             }
	          	}else{
	          		alert("请稍后")
	          	}
	            
	      }