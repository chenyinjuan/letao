$(function () {
    var current = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: current,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var htmlStr = template("first_tpl", res);
                $('tbody').html(htmlStr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: current,
                    totalPages: Math.ceil(res.total / res.size),
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        current = page;
                        // console.log(page);
                        render();
                    }
                });
            }
        });
    }
    // 2.点击生成模态框
    $(".add").click(function () {
        console.log(111);
        $("#firstModal").modal("show");
    });
    // 3.进行校验配置
    $("#form").bootstrapValidator({
        // 校验字段,一定要先配置input的name
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove', //校验失败
            validating: 'glyphicon glyphicon-refresh' //校验中
        },
        fields: {
            categoryName: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入一级分类名称",
                    }
                }
            }
        }
    });
    // 4.注册表单校验成功事件,在成功准备提交表单时,阻止默认的提交,通过ajax提交
    $("form").on("success.form.bv", function( e ){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            dataType: 'json',
            data: $("#form").serialize(),
            success: function( res ){
                // console.log(res);
                $("#firstModal").modal("hide");
                current = 1;
                render();
                // 重置表单内容,内容和状态都重置
                $("#form").data("bootstrapValidator").resetForm(true);
            }
        });
    });
});