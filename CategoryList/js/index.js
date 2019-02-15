var network='https://192.168.125.117:88/api'
var currentAjax;
var inpval;
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
$('.youName').text(decodeURI(getUrlParam('author')))
$('#search').click(function () {
    inpval=$('#inp').val()
    if (inpval==''){
        alert('请输入别名')
        return false;
    }
    $('#loading').show()
    if (currentAjax){
        currentAjax.abort()
    }
    Ajax(inpval)
})
function Ajax(inpval){
    currentAjax = $.ajax({
        type:'post',
        url:network+'/MattrioManager/CategoryListController/getQueryCategoryList',
        data:{
            'query_str':inpval
        },
        cache:false,
        timeout:5000,
        success:function(data){
            $('#loading').hide()
            $("tbody").html('')
            if(data.list.length==0){
                alert('暂无别名数据')
                return false;
            }
            $.each(data.list,function (key,vlaue) {
                var tr=$('<tr>')
                var td1=$('<td class="name1">').html(vlaue.query_name)
                var td2=$('<td class="id1">').html(vlaue.query_id)
                var td3=$('<td class="name2">').html(vlaue.category_name)
                var td4=$('<td class="id2">').html(vlaue.category_id)
                var td5=$('<td class="author">').html(vlaue.author)
                var td6=$('<td>').html(new Date(vlaue.time.time).toLocaleString())
                var td7=$('<td>').html('<span class="del">删除</span>')
                td5.appendTo(tr)
                td1.appendTo(tr)
                td2.appendTo(tr)
                td3.appendTo(tr)
                td4.appendTo(tr)
                td6.appendTo(tr)
                td7.appendTo(tr)
                tr.appendTo('tbody')
            })

        },error:function(XMLHttpRequest, textStatus){
            $('#loading').hide()
            if (textStatus == 'timeout') {
                currentAjax.abort();
                alert('请求超时')
                return false;
            }
        }

    })
}
$('tbody').on('click','.del',function(){
    var query_name=$(this).parents('tr').find('.name1').text()
    var query_id=$(this).parents('tr').find('.id1').text()
    var category_name=$(this).parents('tr').find('.name2').text()
    var category_id=$(this).parents('tr').find('.id2').text()
    var author=$(this).parents('tr').find('.author').text()
    if(confirm('是否删除')){
        $('#loading').show()
        $.ajax({
            type:'post',
            url:network+'/MattrioManager/CategoryListController/delQueryCategoryList',
            data:{
                'query_name':query_name,
                'query_id':query_id,
                'category_name':category_name,
                'category_id':category_id,
                'author':author
            },
            cache:false,
            timeout:5000,
            success:function (data) {
                $('#loading').hide()
                alert(data.msg)
                Ajax(inpval)
            },error:function (XMLHttpRequest, textStatus) {
                $('#loading').hide()
                if (textStatus == 'timeout') {
                    alert('请求超时')
                    return false;
                }
            }
        })
    }
})
$('#addBtn').click(function () {
    var addname1=$('.addname1').val()
    var addid1=$('.addid1').val()
    var addname2=$('.addname2').val()
    var addid2=$('.addid2').val()
    if (addname1==''){
        alert('请输入别名')
        return false;
    }else if (addid1==''){
        alert('请输入别名ID')
        return false;
    } else if (addname2==''){
        alert('请输入三级分组名称')
        return false;
    }else if (addid2==''){
        alert('请输入三级分组ID')
        return false;
    }
    if(confirm('是否添加')){
        $('#loading').show()
        $.ajax({
            type:'post',
            url:network+'/MattrioManager/CategoryListController/addQueryCategoryList',
            cache:false,
            timeout:5000,
            data:{
                'query_name':addname1,
                'query_id':addid1,
                'category_name':addname2,
                'category_id':addid2,
                'author':$('.youName').text()
            },
            success:function (data) {
                $('#loading').hide()
                alert(data.msg)
                Ajax(inpval)
            },error:function (XMLHttpRequest, textStatus) {
                $('#loading').hide()
                if (textStatus == 'timeout') {
                    alert('请求超时')
                    return false;
                }
            }
        })
    }
})