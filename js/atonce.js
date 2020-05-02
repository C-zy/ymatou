var str = window.location.search;
var count = str.split("=")[1]
$("#md-he-1").click(function () {
    if ($(".check1").html() == "0") {
        $(this).prop("checked", false)
    }
})
// 点击边框高亮
$(".zfbwx").click(function () {
    $(this).css({
        "border": "1px solid #c33"
    }).siblings().css({
        "border": "1px solid #cecece"
    })
    $(this).children(":first").css({
        "display":"block"
    }).parent().siblings().children(":first").css({
        "display":"none"
    })
})
$("#yzf").html("￥"+count+".00")
$("#xzf").html("￥"+count+".00")

// 判断是否登录
var n=sessionStorage.name;
// console.log(n);
if(n){
    $(".us").hide()
    $(".usa").prepend(`
        <li class="nav-item head-d">
            <a href="" class="downmenu">
                <span class="title">${n}</span>
                <i class="arrow-bt"></i>
            </a>
            <div class="dropdownlist">
                <a href="#" onclick='esc()'">退出登录</a>
            </div>
        </li>
    `)
}else{
    console.log(222)
}
// 退出登录
function esc(){
    sessionStorage.removeItem('name')
    $(".us").show();
    $(".head-d").remove()
}