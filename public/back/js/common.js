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
    }, 500)
});