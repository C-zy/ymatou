// 设置搜索框的显示与隐藏
$(".input-search").focus(() => {
    $(".search-recomend").show()
})
$(".input-search").blur(() => {
    $(".search-recomend").hide()
})
// 设置分类模块的显示与隐藏
$(".category-box").hover(() => {
    $(".current").addClass('select')
    if ($(".category-downlist").css("display") == 'none') {
        $(".current").removeClass('select')
    }
})
$(".current").hover(() => {
    if ($(".category-downlist").css("display") == 'none') {
        $(".current").removeClass('select')
    }
})
//限时抢轮播图
$("#btn-prev").click(() => {
    var i = $(".swith-img-active").index()
    $("#xbanner li").eq(i).removeClass('swith-img-active')
    $("#xbanner li").eq(i).addClass('swith-img-prev')
    $("#xbanner li").eq(i).prev().removeClass('swith-img-prev')
    $("#xbanner li").eq($(".swith-img-next").index()).next().addClass('swith-img-next')
    $("#xbanner li").eq(i).next().removeClass('swith-img-next')
    $("#xbanner li").eq(i).next().addClass('swith-img-active')
    if (i == 2) {
        $("#xbanner li").first().addClass('swith-img-next')
    }
    if (i == 3) {
        $("#xbanner li").eq(1).addClass('swith-img-next')
        $("#xbanner li").eq(0).addClass('swith-img-active')
        $("#xbanner li").eq(0).removeClass('swith-img-next')
        $("#xbanner li").eq(3).removeClass('swith-img-active')
        $("#xbanner li").eq(3).prev().removeClass('swith-img-prev')
    }
    if (i == 0) {
        $("#xbanner li").last().removeClass('swith-img-prev')
        $("#xbanner li").eq(0).addClass('swith-img-prev')
    }
})
$("#btn-next").click(() => {
    var i = $(".swith-img-active").index()
    $("#xbanner li").eq(i).removeClass('swith-img-active')
    $("#xbanner li").eq(i).addClass('swith-img-next')
    $("#xbanner li").eq(i).next().removeClass('swith-img-next')
    $("#xbanner li").eq($(".swith-img-prev").index()).prev().addClass('swith-img-prev')
    $("#xbanner li").eq(i).prev().removeClass('swith-img-prev')
    $("#xbanner li").eq(i).prev().addClass('swith-img-active')
    if (i == 1) {
        $("#xbanner li").last().addClass('swith-img-prev')
    }
    if (i == 0) {
        $("#xbanner li").eq(2).addClass('swith-img-prev')
        $("#xbanner li").last().addClass('swith-img-active')
        $("#xbanner li").last().removeClass('swith-img-prev')
        $("#xbanner li").first().removeClass('swith-img-active')
        $("#xbanner li").first().addClass('swith-img-next')
        $("#xbanner li").eq(1).removeClass('swith-img-next')
    }
    if (i == 3) {
        $("#xbanner li").first().removeClass('swith-img-next')
    }
})
var str = window.location.search
var id = str.split("=")[1];
$.ajax({
    type: "GET",
    url: "http://localhost/ymatou/php/index.php?id=" + id,
    data: {},
    dataType: "json",
    async: true,
    success: function (data) {
        var str = data[0].type.split(" ");
        $("title").get(0).innerHTML = data[0].name;
        $("#global").get(0).innerHTML = `
                <span  class="title_hover">首页</span><i>></i>
                <span class="title_hover">${str[0]}</span><i>></i>
                <span class="title_hover">${str[1]}</span><i>></i>
                <span class="type_name">${data[0].name}</span>
        `;
        $("#pdw-hd-img").html(`
                <img src=${data[0].url} class="pdw-hd_imgtop" style="z-index:-2">
                <img src=${data[0].class_img1} class="pdw-hd_imgtop">
                <img src=${data[0].class_img2} class="pdw-hd_imgtop">
                <img src=${data[0].class_img3} class="pdw-hd_imgtop">
        `);
        $("#imgbottom").html(`
                <li class="imgurl"  id="0" style="border:2px solid #c33;"><img src=${data[0].url}></li>
                <li class="imgurl"  id="1"><img src=${data[0].imgmoreone}></li>
                <li class="imgurl"  id="2"><img src=${data[0].imgmoretwo}></li>
                <li class="imgurl"  id="3"><img src=${data[0].imgmorethree}></li>
        `);
        $("#hf-title").html(data[0].name);
        $("#hf-title").attr("name", data[0].id);
        $("#hf-price-span1").html(`￥${data[0].price}
`);
        $("#type-1").html(data[0].type1);
        $("#type-2").html(data[0].type2);
        $("#type-3").html(data[0].type3);
        $("#stork").html(`${data[0].stork}件`);
        $("#info_img").html(`
            <img src=${data[0].url}>
            <img src=${data[0].imgmoreone}>
            <img src=${data[0].imgmoretwo}>
            <img src=${data[0].imgmorethree}>
        `);
        $("#head").html(`
            <img src=${data[0].head}>
        `);
        $("#headName").html(data[0].headName);
        $("#fans").html(data[0].fans);
        $(".imgurl").mouseenter(function () {
            $(this).css({
                "border": "2px solid #c33"
            }).siblings().css({
                "border": "1px solid #f1f1f1"
            });
            $(".pdw-hd_imgtop,.boxbig img").eq($(this).attr("id")).css({
                "z-index": "-3"
            }).siblings().css({
                "z-index": "-4"
            });
        });
        //点击实现加减
        $("#add").click(function () {
            var addnum = $(this).prev().html()
            addnum++;
            $(this).prev().html(addnum);
            var b = $(this).prev().html()
            $("#hf-price-span1").html("￥" + data[0].price * b + ".00")
        })
        $("#reduce").click(function () {
            var reducenum = $(this).next().html()
            reducenum--;
            if (reducenum <= 1) {
                reducenum = 1;
            }
            $(this).next().html(reducenum);
            var b = $(this).next().html();
            $("#hf-price-span1").html("￥" + data[0].price * b + ".00")
        });
        // 选类型边框变色
        $("#type-1,#type-2,#type-3").click(function () {
            $(this).toggleClass("border-clo").siblings().removeClass("border-clo");
            $("#hf-type").css({
                "border": "none"
            });
            $("#popup").css({
                "display": "none"
            })
        })
        // 点击加入购物车
        $(".join-cart").click(function () {
            if(sessionStorage.name){
                // 点击购物车前必须选中一个类型
                if ($("#type-1").hasClass("border-clo") || $("#type-2").hasClass("border-clo") || $("#type-3").hasClass("border-clo")) {
                    $(".succes").css({
                        "display": "block",
                    });
                    $.ajax({
                        type: "GET",
                        url: "http://localhost/ymatou/php/update.php?id=" + data[0].id,
                        data: {},
                        dataType: "json",
                        async: true,
                        success: function (data) {
                            console.log(data)
                        }
                    });
                } else {
                    $("#hf-type").css({
                        "border": "2px solid #c33"
                    });
                    $("#popup").css({
                        "display": "block"
                    })
                };
                var a = setTimeout(function () {
                    $(".succes").css({
                        "display": "none",
                    })
                }, 2000)
            }else{
                window.location.href="login.html";
            }
            
        })
    }
});
// 点击立即购买
$(".buy").click(function () {
    if(sessionStorage.name){
        if ($("#type-1").hasClass("border-clo") || $("#type-2").hasClass("border-clo") || $("#type-3").hasClass("border-clo")) {
            location.href = "http://localhost/ymatou/checkout.html"
            var nameID = $("#hf-title").attr("name")
            $.ajax({
                type: "GET",
                url: "http://localhost/ymatou/php/account.php?id="+nameID,
                data1: {},
                dataType: "json",
                async: true,
                success: function (data1) { }
            })
        }
        else {
            $("#hf-type").css({
                "border": "2px solid #c33"
            });
            $("#popup").css({
                "display": "block"
            })
        };
    }else{
        window.location.href="login.html";
    }
    

})
$.ajax({
    type: "GET",
    url: "http://localhost/ymatou/php/youlike.php",
    data1: {},
    dataType: "json",
    async: true,
    success: function (data1) {
        for (var i = 0; i < data1.length; i++) {
            $("#ul").get(0).innerHTML += `
                <li class="like_item-1">
                    <img src=${data1[i].url}>
                    <span>${data1[i].name}</span>
                    <p>￥${data1[i].price}</p>
                </li>
            `;
            $("#left1-ajax").get(0).innerHTML += `
                <li class="left1-each">
                     <img src="${data1[i].url}">
                     <p class="left1-name">${data1[i].name}</p>
                     <p class="left1-price">￥${data1[i].price}</p>
                </li>
            `;
        }
    }
});
// $(".cut").click(function () {
//     console.log(1111)
// });
//二维码显示
$(".sao-img").mouseenter(function () {
    $(".QR").css({
        "display": "block",
        "border": "1px solid gray"
    })
});
$(".sao-img").mouseleave(function () {
    $(".QR").css({
        "display": "none",
    })
});
//详情页面的放大镜功能
$("#pdw-hd_imgtop").mousemove(function () {
    $(".boxsmall,.boxbig").addClass("block");
    $(".boxsmall").css({
        "left": event.offsetX - 100 + "px",
        "top": event.offsetY - 100 + "px"
    })
    $(".boxbig").html($("#pdw-hd-img").html())
    if (event.offsetX < 100) {
        $(".boxsmall").css({
            "left": "0"
        })
    } else if (event.offsetX >= 300) {
        $(".boxsmall").css({
            "left": "200px"
        })
    }
    if (event.offsetY < 100) {
        $(".boxsmall").css({
            "top": "0"
        })
    } else if (event.offsetY >= 300) {
        $(".boxsmall").css({
            "top": "200px"
        })
    }
    $(".boxbig img").css({
        "left": event.offsetX * (-0.88) + "px",
        "top": event.offsetY * (-0.88) + "px"
    })
})
$("#pdw-hd_imgtop").mouseleave(function () {
    $(".boxsmall,.boxbig").removeClass("block")
})


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
    // 判断是否登录来确定网页跳转的页面
    $(".head-shopping a").attr("href","shopping.html")
    $(".head-order a").attr("href","order_form.html")
    $(".head-per a").attr("href","personal.html")
}else{
    $(".head-shopping a").attr("href","login.html")
    $(".head-order a").attr("href","login.html")
    $(".head-per a").attr("href","login.html")
}
// 退出登录
function esc(){
    sessionStorage.removeItem('name')
    $(".us").show();
    $(".head-d").remove()
    $(".head-shopping a").attr("href","login.html")
    $(".head-order a").attr("href","login.html")
    $(".head-per a").attr("href","login.html")
}


