$(function () {
    // 1.一进入页面发送ajax请求
    var current = 1;
    var pageSize = 2;
    var picArr = []; //存放所有的图片对象(图片名称,图片地址)
    render();

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: current,
                pageSize: pageSize,
            },
            success: function (res) {
                // console.log(res);
                var htmlStr = template("product_ptl", res);
                $(".second_table tbody").html(htmlStr);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: current,
                    totalPages: Math.ceil(res.total / res.size),
                    size: "small",
                    onPageClicked: function (event, originalEvent, type, page) {
                        current = page;
                        render();
                    }
                });
            }
        });
    }
    // 2.点击添加按钮显示模态框
    // 点击模态框的按钮发送ajax请求数据
    $(".add").click(function () {
        $("#productModal").modal("show");
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100,
            },
            success: function (res) {
                // console.log(res);
                var htmlStr = template('dropdown_ptl', res);
                $(".dropdown-menu").html(htmlStr);
            }
        });
    });

    // 3.给下拉菜单的所有a添加点击事件
    $(".dropdown-menu").on("click", "a", function () {
        // 获取文本
        // 获取id
        var txt = $(this).text();
        $("#dropdownText").text(txt);
        var id = $(this).data("id");
        $("[name='brandId']").val(id);
        // 手动将隐藏域校验状态改成成功状态
        $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID")
    });

    //4. 图片的多文件上传的回调函数
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            // console.log(data.result.picAddr);
            var picObj = data.result; // 后台返回的图片对象
            picArr.unshift(picObj);
            var picUrl = picObj.picAddr; //返回的图片地址
            // 将图片添加到 imgBox的最前面
            $("#imgBox").prepend('<img style="width: 100px; margin: 0 5px;" src="' + picUrl + '" alt="">');
            // $("#imgBox img").attr("src",data.result.picAddr);
            if (picArr.length > 3) {
                // 说明长度超过3了,新选的保留,去掉最后的
                picArr.pop();
                // 赵醉侯一个类型的img元素
                $("#imgBox img:last-of-type").remove();
                // 判断数组长度,如果满三张,说明校验成功了
            }
            if (picArr.length === 3) {
                // 将影藏与校验状态改成,成功状态
                $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
            console.log(picArr);
        }
    });

    // 6.对表单进行非空校验
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
            brandId: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请选择二级分类",
                    }
                }
            },
            proName: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入商品名称",
                    }
                }
            },
            proDesc: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入商品描述",
                    }
                }
            },
            num: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入商品库存",
                    },
                    // 库存格式必须是非零开头的数字
                    // 需要添加正则校验
                    // 正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式,必须是非零开头的数字',
                    }
                }
            },
            size: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入商品尺码",
                    },
                    // 要求: 必须是 xx-xx 的格式,xx为两位的数字
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是 xx-xx 的格式,xx为两位的数字',
                    },
                }
            },
            oldPrice: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入商品原价",
                    }
                }
            },
            price: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "请输入商品价格",
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片",
                    }
                }
            }
        }
    });

    // 7.注册表单校验成功事件,在成功准备提交表单时,阻止默认的提交,通过ajax提交
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        // 8.点击添加，模态框隐藏
            var paraStr = $("#form").serialize();
            // 还要拼接上图片的数据
            // paraStr += "&key=value";
            paraStr += "&picArr=" + JSON.stringify(picArr);
            console.log(paraStr);
            $.ajax({
                url: "/product/addProduct",
                dataType: "json",
                type: "post",
                data: paraStr,
                success: function (res) {
                    console.log(res);
                    if (res.success) {
                        $("#productModal").modal("hide");
                    }
                    current = 1;
                    render();
                    // 表单重置内容和状态
                    $("#form").data("bootsrapValidator").resetForm(true);
                    $("#dropdownText").text("请选择二级分类");
                    $("#imgBox img").remove();
                }
            });
        });


});