// 需求: 登录拦截,如果当前用户未登录,拦截到登录页
// 由于前段不知道用户的登录状态,但是后端知道,所以发送请求询问即可
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: 'json',
    success: function(res){
        console.log(res.success);
        if(res.error){
            location.href = "login.html";
        }
        if(res.success){
            console.log("当前用户已登录");
        }
    }
});