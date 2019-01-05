// 添加进度条效果
// 1. 在第一个ajax开始发送时,开启进度条
// 2. 在所有的ajax结束的时候,关闭进度条

// 需要借助ajax全局事件
// .ajaxComplete() 每个ajax完成时,都会调用 (不管是成功还是失败都调用)
// .ajaxSuccess() 每个成功的ajax都会调用 
// .ajaxSend() 每个ajax准备发送时,调用
// .ajaxStart() 当第一个ajax开始的时候 (开启进度条)
// .ajaxStop() 当所有的ajax完成时, 调用 (结束进度条)
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 1000)
});


// 公共功能
// 入口函数, 等待当前的dom结构, 加载完成后执行
// 1.左侧二级菜单切换功能
$( function(){
    $(".lt_aside .category").click( function(){
        console.log(111);
        $(this).next().stop().slideToggle();
    });
});
// 2.左边侧边栏切换功能
$(".lt_main .top_left").click( function(){
    // console.log(111);
    $(".lt_aside").toggleClass("hideMenu");
    $(".lt_main").toggleClass("pl");
    $(".lt_main .top").toggleClass("tpl");
});

// 3.退出功能
// (1)显示模态框
$(".lt_main .top_right").click( function(){
    // console.log(111);
    $('#myModal').modal('show');
});
// (2) 点击退出按钮, 发送ajax请求,实现退出
$("#logoutBtn").click( function(){
    console.log(111);
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        dataType: 'json',
        success: function( res ){
            // console.log(res);
            console.log(res.success);
            if(res.success){
                location.href = "login.html";
            }
        }
    })

});

