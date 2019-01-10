$(function(){
    var id;
    $.ajax({
        url: "/category/queryTopCategory",
        type: "get",
        success: function( res ){
            console.log( res );
            var htmlStr = template("ltleft_ptl",res);
            $(".lt_left ul").html( htmlStr );
             id = res.rows[0].id;
             renderById( id );

             $(".lt_left ul").on("click","a", function(){
                $(this).addClass("current");
                $(this).parent().siblings().find("a").removeClass("current");
                id = $(this).data("id");
                renderById( id );
            });
        }
    });
    function renderById( id ){
        $.ajax({
            url: "/category/querySecondCategory",
            type: "get",
            data: {id: id},
            dataType: "json",
            success: function( res ){
                console.log( res );
                var htmlStr = template("ltright_ptl",res);
                $(".lt_right ul").html(htmlStr);
            }
        });
    }
});