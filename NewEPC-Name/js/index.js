// var network='http://192.168.125.117:8080'
var network='https://www.51macc.com/api'
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
var author=decodeURI(getUrlParam('author'));
var arr=[];
var AjaxList=[];
if (localStorage.getItem(author)){
    $('#brand').val(localStorage.getItem(author))
}
if (!getUrlParam('author')){
    alert('暂无工作人员名称')
}else{
    $('.author').text(author)
}
var dataList;
$.ajax({
    type:'get',
    url:"js/nameList.json",
    cache:false,
    success:function(data){
        dataList=data
    },error:function () {
        alert('获取标准名名称失败')
    }
})
$('.search').click(function () {
    arr = [];
    AjaxList=[];
    var typeName=$('#brand').val();
    var query_str=$('#inp').val()
    if ($('#inp').val()==''){
        alert('请输入EPC名称')
        return false;
    }
    $('#checkAll').attr("checked",false)
    $('.check').attr("checked",false)
    $('#loading').show()
    $.ajax({
        type:'post',
        url:network+'/MattrioManager/EpcCategoryListController/queryEpcOeNameList',
        cache:false,
        timeout:15000,
        data:{
            'type':typeName,
            'query_str':query_str
        },
        success:function (data) {
            $('#loading').hide()
            if ($('#example').hasClass('dataTable')) {
                var table = $('#example').dataTable();
                table.fnClearTable(); //清空一下table
                table.fnDestroy(); //还原初始化了的datatable
            }
            // $('tbody').html('')
            if(data.list==[]||data.list.length==0){
                $('.num').text('0')
                alert('暂无')
                return false;
            }
            $('.num').text(data.list.length)
            $.each(data.list,function (key,value) {
                value.oenumberkey=value.oenumber+key
                var $tr = $("<tr></tr>");
                var $td0= $("<td class='tdcheck'></td>").html('<input class="check" type="checkbox">');
                // var $td= $("<td class='index'></td>").html(key+1);
                var $td1 = $("<td></td>").html(value.type);
                var $td2 = $("<td class='oenumber' title='"+value.oenumber+key+"'></td>").html('<a href="https://www.51macc.com/content/maintain/oecont/oecont.html?demo3=true&oenumber='+value.oenumber+'" target="_blank" title="点击跳转查看该OE更多信息">'+value.oenumber+'</a>');
                var $td3 = $("<td class='oe_name' title='"+value.oe_name+"'></td>").html('<div>'+value.oe_name+'</div>');
                var $td4 = $("<td class='remark' title='"+value.remark+"'></td>").html('<div>'+value.remark+'</div>');
                var $td5 = $("<td></td>").html(query_str);
                $td0.appendTo($tr);
                // $td.appendTo($tr);
                $td1.appendTo($tr);
                $td2.appendTo($tr);
                $td3.appendTo($tr);
                $td4.appendTo($tr);
                $td5.appendTo($tr);
                $tr.appendTo($("tbody"));
            })
            AjaxList=data.list;
            $('#example').DataTable({
                "pagingType": "full_numbers",
                "ordering":false,
                columns:[
                    {data:"inp"},
                    // {data:"index"},
                    {data:"type"},
                    {data:"oenumber"},
                    {data:"oe_name"},
                    {data:"remark"},
                    {data:"query_str"}
                ]
            });
            $('#example_filter input').attr('placeholder','请输入表格内容进行检索')
            
        },error:function (xml,textStatus) {
            $('#loading').hide()
            if (textStatus == 'timeout') {
                alert('请求超时')
                return false;
            }
            alert('请求失败')
        }
    })
})
$('#checkAll').click(function (e) {
    e.stopPropagation()
    var check=$('#checkAll').is(':checked')
    if (check){
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('title'))<0) {
                arr.push($(value).parents('tr').find('.oenumber').attr('title'))
            }
        })
    } else{
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('title'))>=0){
                arr.splice(arr.indexOf($(value).parents('tr').find('.oenumber').attr('title')),1)
            }
        })
    }
    $(".check").attr("checked",check);
})
$('tbody').on('click','.check',function (e) {
    e.stopPropagation()
    var num=0;
    var check=$(this).is(':checked')
    var oenumber=$(this).parents('tr').find('.oenumber').attr('title')
    if (check){
        $(".check").each(function (key,value) {
            if ($(value).attr("checked")){
                num++
            }
        })
        arr.push(oenumber)
    }else{
        arr.splice(arr.indexOf(oenumber),1)
    }
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }
})
$(document).on('click','.thcheck',function (e) {
    e.stopPropagation()
    var check=$('#checkAll').is(':checked')
    $('#checkAll').attr('checked',!check)
    if (!check){
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('title'))<0) {
                arr.push($(value).parents('tr').find('.oenumber').attr('title'))
            }
        })
    } else{
        $(".check").each(function (key,value) {
            if (arr.indexOf($(value).parents('tr').find('.oenumber').attr('title'))>=0){
                arr.splice(arr.indexOf($(value).parents('tr').find('.oenumber').attr('title')),1)
            }
        })
    }
    $(".check").attr("checked",!check);
})
$(document).on('click','.tdcheck',function (e) {
    e.stopPropagation()
    var num=0;
    var check=$(this).find('.check').is(':checked')
    var oenumber=$(this).parents('tr').find('.oenumber').attr('title')
    $(this).find('.check').attr('checked',!check)
    if (!check){
        $(".check").each(function (key,value) {
            if ($(value).attr("checked")){
                num++
            }
        })
        arr.push(oenumber)
    }else{
        arr.splice(arr.indexOf(oenumber),1)
    }
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }
})
$(document).on('click','.paginate_button',function () {
    $('#checkAll').attr("checked",false)
    var num=0;
    $(".check").each(function (key,value) {
        if ($(value).attr("checked")){
            num++
        }
    })
    if (num == $(".check").length){
        $('#checkAll').attr("checked",true);
    }else{
        $('#checkAll').attr("checked",false);
    }
})
$('.normName').on('input',function(){
    $('.normName').attr('id','')
    var normNameval=$.trim($('.normName').val())
    $('.nameList').html('')
    if (normNameval==''){
        $('.nameList').hide()
        $('.img').attr('src','')
        return false;
    }
    $('.img').attr('src','image/jingshi.png')
    $('.nameList').show()
    $.each(dataList, function (key,value) {
        if (value.name.indexOf(normNameval)>=0){
            value.name.split(normNameval)[0]
            var $p=$('<p id="'+value.id+'">').html('<span>'+value.name.split(normNameval)[0]+'<span style="color:red">'+normNameval+'</span>'+value.name.split(normNameval)[1]+'</span>--'+value.id)
            $p.appendTo('.nameList')
        }
        if (key==dataList.length-1){
            if ($('.nameList').text() =='' ){
                $('.img').attr('src','image/jingshi.png')
                var $p=$('<span style="font-size: 14px;margin-left: 10px;color: red;">').html('输入的名称不标准,请重新输入')
                $p.appendTo('.nameList')
            }
        }
    })
    if($('.nameList').text()==''){
        $('.nameList').hide()
    }
})
$('.nameList').on('click','p',function () {
    $('.normName').val($(this).children('span').text()).attr('id',$(this).attr('id'))
    $('.img').attr('src','image/duihao.png')
    $('.nameList').hide()
})
$('.saveBtn').click(function () {
    var numindex=0;
    var typeName=$('#brand').val();
    var category_id=$('.normName').attr('id');
    var category_name=$('.normName').val();
    var author=$('.author').text();
    var len=arr.length;
    if (category_id==''){
        alert('请选择匹配的标准名')
        return false;
    }
    if(category_name==''){
        alert('请输入并选择标准名称')
        return false;
    }
    if (len==0){
        alert('请勾选你要保存的数据')
        return false;
    }
    if(confirm('是否保存查询结果')){
        $('#loading2 p').text('正在插入中')
        $('.arrNum').text('')
        $('.progress-bar').width(0)
        $('#loading2').show()
        arrAjax(arr,numindex,typeName,category_id,category_name,author)
    }
})
function arrAjax(arr,index,typeName,category_id,category_name,author){
    $.each(AjaxList,function(ke,val){
        if (arr[index]==val.oenumberkey){
            $.ajax({
                type: 'post',
                url: network + '/MattrioManager/EpcCategoryListController/addEpcOeNameList',
                cache: false,
                timeout:15000,
                data: {
                    'type': typeName,
                    'oe_name': val.oe_name,
                    'remark': val.remark,
                    'category_id': category_id,
                    'category_name': category_name,
                    'author': author
                }, success: function (data) {
                    index++
                    $('.arrNum').text(index)
                    $('.progress-bar').width(index/arr.length*100+'%')
                    if (index<arr.length){
                        arrAjax(arr,index,typeName,category_id,category_name,author)
                    }else{
                        $('#loading2 p').text('插入成功')
                        setTimeout(function () {
                            $('#loading2').hide()
                        },2000)
                    }
                }, error: function (xml,textStatus) {
                    index++
                    $('.arrNum').text(index)
                    $('.progress-bar').width(index/arr.length*100+'%')
                    if (index<arr.length){
                        arrAjax(arr,index,typeName,category_id,category_name,author)
                    }else{
                        $('#loading2 p').text('插入成功')
                        setTimeout(function () {
                            $('#loading2').hide()
                        },2000)
                    }
                }
            })
        }
    })
}
$('.close').click(function () {
    $('#progress').hide()
})
$('.go').click(function () {
    window.open('./MatchedNameList/index.html?author='+author)
})
$('#brand').change(function(){
    localStorage.setItem(author,$('#brand').val())
    if ($('#example').hasClass('dataTable')) {
        var table = $('#example').dataTable();
        table.fnClearTable(); //清空一下table
        table.fnDestroy(); //还原初始化了的datatable
    }
    $('#inp').val('')
    $('.normName').val('')
    $('.img').attr('src','')
})