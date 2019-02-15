var wb;//读取完成的数据
	            var rABS = false; //是否将文件读取为二进制字符串
	            var excel='';  
	            var j=0;
	            var percent=0
	      function xlsx(obj){
	      	
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
			        if(f.size/1024 > IMPORTFILE_MAXSIZE){
			            alert('导入的表格文件不能大于1M')
			            $('#xlsxinput').val("")
			            return false;
			        }
			        console.log(f)
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
	                    excel=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
						console.log(wb)
						console.log(excel)
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
	      function filebtn(obj,num){
	      	 if(excel==''||excel.length==0){
	      	 	alert('请选择您要上传的excel表格')
	      	 	return false;
	      	 }
//	          	console.log(obj)
//	          	console.log(excel)
//	          	obj.prop('disabled','true');
	          	var exceljson='';
	          	if(j+num>excel.length){
	          		exceljson=excel.slice(j,excel.length);
	          		percent='100%';
	          		
	          	}else{
	          		exceljson=excel.slice(j,j+num);
	          		j+=num;	  
	          		percent=Math.round(j/excel.length*100)+"%"
	          	}
	          	
	          	console.log(exceljson)
//		               	$.ajax({
//		               		type:"POST",
//		               		url:"http://192.168.125.117:8080/Mattrio/upload/testarray",
//		               		async:false,
//		               		data:{
//		               			upload_json:exceljson
//		               		},
//		               		success:function(data){
//		               			obj.removeProp('disabled')
//		               			
//		               		},
//		               		error:function(data){
//		               			alert('上传失败，请重新上传')
//		               			j-=num
//		               		}
//		               })
////		               	$("#bar").html(Math.round(j/excel.length*100)+"%")
//	             }
	             	$("#bar").html(percent)
	      }
	      
	      /*按钮点击时每次上传*/
	       $('button').click(function(){
	      	filebtn($('button'),100)
