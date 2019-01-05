$(function () {
    // 前端校验功能
    // 1.用户名不能为空
    // 2.密码不能为空
    // 3.密码在6-18个字符内
    // 重置功能（内容、校验）
    $("#form").bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //校验成功
            invalid: 'glyphicon glyphicon-remove', //校验失败
            validating: 'glyphicon glyphicon-refresh' //校验中
        },
        // 配置校验字段:
        fields: {
            username: {
                validators: {
                    // 非空
                    notEmpty: {
                        message: "用户名不能为空",
                    },
                    // 长度
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在 2-6 位'
                      },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空",
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "用户长度必须是 6-12 位"
                    },
                    callback: {
                        message: "密码不存在"
                    }
                }
            }
        }
    });

    // 点击按钮发送ajax请求
    // submit 会提交表单

    // 插件有个特征,按钮用submit来提交,又不希望发生跳转
    $("#form").on( 'success.form.bv',function( e ){
        e.preventDefault();
        console.log("阻止了默认的提交, 通过ajax提交");

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            // 表单序列化
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( res ){
                console.log(res);
                if(res.error === 1000){
                    $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
                    return;
                }
                if(res.error === 1001){
                    $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
                    return;
                }
                if(res.success){
                    location.href = "index.html";
                    return;
                }
            }
        });
        // return false;
    });

    // 3.表单重置
    // $("#form").data("bootstrapValidator"); 创建插件实例
    // resetForm(); 不传参,只重置校验状态
    // resetForm(true); 传true, 内容和状态都重置
    // reset按钮本生可以重置内容
    $("[type='reset']").click( function(){
        // console.log("啦啦");
        $("#form").data('bootstrapValidator').resetForm();
    });

});