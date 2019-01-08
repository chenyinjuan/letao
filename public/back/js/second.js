$(function () {
    // 一进入页面发送ajax请求
    var current = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
                page: current,
                pageSize: pageSize,
            },
            success: function (res) {
                console.log(res);
                var htmlStr = template("second_plt", res);
                $("tbody").html(htmlStr);
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
    // 点击显示模态框
    $(".add").click(function () {
        $("#secondModal").modal("show");
        // 显示模态框立刻发送请求,获取一级分类,渲染下拉菜单
        // 配置
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                var htmlStr = template("drop_plt", res);
                $("#form .dropdown-menu").html(htmlStr);
                $("#form .dropdown-menu").on("click", "a", function () {
                    var text = $(this).text();
                    $("#dropdownText").text(text);
                    // 获取id
                    // 设置给隐藏域
                    var id = $(this).data("id");
                    // 赋值
                    $("[name='categoryId']").val(id);
                    // 表单校验,把状态改成成功的状态
                    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
                });
            }
        });
    });

    // 配置fileupload进行初始化
    $("#fileupload").fileupload({
        dataType: "json",
        // e: 事件对象
        // data: 图片上传后的对象,通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            //  data.result.picAddr; 获取地址
            console.log(data.result.picAddr);
            $('#imgbox img').attr("src", data.result.picAddr);
            $("[name='brandLogo']").val(data.result.picAddr);
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    });

    // 5.表单验证校验
    $("#form").bootstrapValidator({
        // 配置不校验的类型,对hidden 需要进行校验
        excluded: [],
        // 校验字段,一定要先配置input的name
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove', //校验失败
            validating: 'glyphicon glyphicon-refresh' //校验中
        },
        fields: {
            categoryId: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请选择一级分类名称",
                    }
                }
            },
            categoryName: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入一级分类名称",
                    }
                }
            },
            brandLogo: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请上传图片",
                    }
                }
            }
        }
    });
      // 6.注册表单校验成功事件,在成功准备提交表单时,阻止默认的提交,通过ajax提交
      $("#form").on("success.form.bv", function( e ){
          e.preventDefault();
          $.ajax({
              url: "/category/addSecondCategory",
              dataType: "json",
              type: "post",
              data: $("#form").serialize(),
              success: function( res ){
                  console.log(res.success);
                  if(res.success){
                    $("#secondModal").modal("hide");
                  }
                  current = 1;
                  render();
              }
          });
      });
});