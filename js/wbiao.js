//头部广告栏
$(".close_slider").click(function(){
    $(".sliders").slideUp("1000");
})
//客户服务
$(".dengs_righttwo").mouseover(function(){
    $(".client").animate({top: '27px'}, 500);
})
$(".dengs_righttwo").mouseout(function(){
    $(".client").animate({top: '-200px'}, 500);
})
//搜索框
$(".inputsou_text").focus(function(){
    this.placeholder = "";
    $(".inputsou_div").css("display","block");
})
$(".inputsou_text").blur(function(){
    this.placeholder = "劳力士";
    $(".inputsou_div").css("display","none");
})
//大牌滚动
$(".img_left").click(function(){
    $(".bigdiv_one").animate({left: '-580px'}, 800);
    $(".bigdiv_two").animate({left: '0px'}, 800);
})
$(".img_right").click(function(){
    $(".bigdiv_one").animate({left: '0px'}, 800);
    $(".bigdiv_two").animate({left: '640px'}, 800);
})
// 大牌右边轮播图
let s1 = new Slider(
    $(".dapai_right")[0],
    190,
    280,
    ["images/03.gif","images/04.gif","images/05.gif"],
    "white",
    "red",
    8,
    true,
    1300
);
s1.autoPlay();
// 达人   划过每个li:改变背景颜色,改变图片
$(function(){
    // 达人
    $lisone = $(".daren_topone").children();
    $daren_imgone = $(".daren_imgone");
    $lisone.mouseover(function(){
        $lisone.css({background:"#e6e6e6",color:"#666"});//全部变色
        $daren_imgone.css({display:"none"}); //全部隐藏
        $(this).css({background:"#333333",color:"#f2d291"});//划过哪个让哪个改变颜色/显示
        $indexs = $(this).attr("index");   //划过哪个获取哪个获取下标，并显示这个下表的div
        $daren_imgone.eq($indexs).css({display:"block"});
    })
    // 排位
    $listwo = $(".daren_toptwo").children();
    $daren_imgtwo = $(".daren_imgtwo");
    $listwo.mouseover(function(){
        $listwo.css({background:"#e6e6e6",color:"#666"});//全部变色
        $daren_imgtwo.css({display:"none"}); //全部隐藏
        $(this).css({background:"#333333",color:"#f2d291"});//划过哪个让哪个改变颜色/显示
        $indexs = $(this).attr("index");   //划过哪个获取哪个获取下标，并显示这个下表的div
        $daren_imgtwo.eq($indexs).css({display:"block"});
    })
})
