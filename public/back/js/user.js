// 一进入页面发送ajax请求,拿到数据,利用模板引擎渲染数据
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                // var htmlstr = template("模板id","数据对象");
                var htmlStr = template("user_tpl", res);
                $('tbody').html(htmlStr);
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(res.total / res.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    onPageClicked: function (event, originalEvent, type, page) {
                        //    console.log(page);
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }
    // 给所有的按钮添加点击事件
    // 事件委托
    var id;
    var isDelete;
    $('tbody').on('click', '.btn',function(){
        id = $(this).parent().data("id");
        console.log(id);
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        console.log(isDelete);
        $('#userModal').modal('show');
        // 点击确认按钮, 发送ajax请求, 修改用户状态
        $("#userModal #userBtn").click( function(){
            // 获取当前用户的id值
            // 如果是禁用按钮 ? 禁用状态 0: 启用状态 1
            $.ajax({
                url: '/user/updateUser',
                type: 'post',
                dataType: 'json',
                data: {
                    id: id,
                    isDelete: isDelete,
                },
                success: function( res ){
                    console.log(res);
                    if(res.success){
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            });
        });
    });
});