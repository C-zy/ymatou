$.ajax({
    type: "GET",
    url: "http://localhost/ymatou/php/gain.php",
    data: {},
    dataType: "json",
    success: function (data) {
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].mark == 2) {
                $(".commodity-list").get(0).innerHTML += `
                <div class="commodity-city" id=${data[i].id}>
                   <span class="city-head"> <img src=${data[i].head}></span>
                    <span>${data[i].headName}</span>    
                    <span class="city-head"><img src=${data[i].city_img}></span> 
                    <span>${data[i].city}</span>   
                </div>
                <div class="commodity-tr">
                    <span class="tr-1">商品</span>
                    <span class="tr-2">商品属性</span>
                    <span class="tr-3">单价(元)</span>
                    <span class="tr-4">数量</span>
                    <span class="tr-5">金额(元)</span>
                </div>
                <div class="commodity-de clearfix">
                    <p class="order-p"><span class="order">订单1</span></p>
                    <div class="commo-left">
                        <div class="co-l-1">
                            <img src=${data[i].url}>
                            <span class="co-l-name">${data[i].name}</span>
                            <p class="co-l-way">
                                <span><img src="img/plane.svg">第三方直邮</span>
                                <span><img src="img/ben.svg">本土退货</span>
                            </p>
                        </div>
                        <div class="co-l-2">
                            <span class="co-l-type">${data[i].type}</span>
                        </div>
                        <span class="co-l-3">${data[i].price}</span>
                        <span class="co-l-4">1</span>
                        <span class="co-l-5">${data[i].price}</span>
                    </div>    
                    <div class="commo-right">
                        <div class="co-r-1">
                            <p>配送信息:<em>第三方直邮</em></p>
                            <p>留言备注:</p>
                            <input type="text" class="liuyan" placeholder="这里可以留言给买手哦">
                        </div>
                    </div>    
                </div>
                <div class="account-price1"></div>
                <div class="account-price2">
                    <p>
                        <span class="price2-span1">共<em>1</em>件商品，总金额为:</span>
                        <span class="price2-span2"><em>￥</em><i class="count-money">${data[i].price}</i></span>
                    </p>
                    <p>
                        <span class="price2-span3">运费:</span>
                        <span class="price2-span2"><em>￥</em><i class="countMoney">0.00</i></span>
                    </p>
                </div>
              `;
            }
        };
        // 返回购物车修改
        $("#cart-date").click(function () {
            location.href = "shopping.html";
        })
        // 计算总价钱
        for (var i = 0; i < $(".account-price2").length; i++) {
            count = count + parseInt($(".count-money").eq(i).html());
            $("#key-count").html(count + ".00");
            $(".shopping-num1").html($(".commo-left").length);
            $("#key-count-price").html(count + ".00");
        }
        // 点击控制确认订单
        $("#true-check").click(function () {
            if ($(this).prop("checked")) {
                $(".cart-btn").addClass("cart-btn1");
                if ($(".commodity-list").children().length <= 0) {
                    $(".add-shopping").css({
                        "display": "block"
                    })
                    setTimeout(function () {
                        $(".add-shopping").css({
                            "display": "none"
                        })
                    }, 2000)
                }
            } else {
                $(".cart-btn").removeClass("cart-btn1");
            }

        })
    }
})
// 正则验证
$("#name").blur(function () {
    var nam = /^[\u4E00-\u9FA5]{1,6}|[a-zA-Z]{1,20}$/
    if (!nam.test($(this).val())) {
        $(".name-1").css({
            "display": "inline-block",
            "color": "#c33"
        })
    } else {
        $(".name-1").css({
            "display": "none",
        })
    }
})
$("#phone").blur(function () {
    var pho = /^1[3456789]\d{9}$/;
    if (!pho.test($(this).val())) {
        $(".name-2").css({
            "display": "inline-block",
            "color": "#c33"
        })
    } else {
        $(".name-2").css({
            "display": "none",
        })
    }
})
$("#phone1").blur(function () {
    var pho1 = /^[0-9]{6}$/;
    if (!pho1.test($(this).val())) {
        $(".name-3").css({
            "display": "inline-block",
            "color": "#c33"
        })
    } else {
        $(".name-3").css({
            "display": "none",
        })
    }
});
//三级联动
$(document).ready(function () {
    province();
    city();
    area();
})
// 请求省份
function province() {
    $.ajax({
        type: "GET",
        url: "http://localhost/ymatou/php/province.php",
        data: {},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#province").get(0).innerHTML += `<option id="${data[i].provinceID}" value="${data[i].province}">${data[i].province}</option>`;
            }
            city();
        }
    });

}
// 点击省份请求城市
$("#province").change(function () {
    city();
})
function city() {
    $("#city").empty()
    var id = $("#province").find("option:selected").attr("id")
    $.ajax({
        type: "GET",
        url: "http://localhost/ymatou/php/city.php?id=" + id,
        data: {},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#city").get(0).innerHTML += `
                    <option id="${data[i].cityID}" value="${data[i].city}">${data[i].city}</option>
                `
            }
            area()
        }
    });
}
// 点击市请求区县
$("#city").change(function () {
    area()
})
function area() {
    $("#area").empty()
    var id = $("#city").find("option:selected").attr("id")
    $.ajax({
        type: "GET",
        url: "http://localhost/ymatou/php/area.php?id=" + id,
        data: {},
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#area").get(0).innerHTML += `
                    <option value="${data[i].area}">${data[i].area}</option>
                `
            }
        }
    });
}
// 点击跳转
$(".cart-btn").click(function () {
    if ($("#true-check").prop("checked")) {
        if ($(".commodity-list").children().length > 0) {
            location.href = "http://localhost/ymatou/atonce.html?count=" + parseInt($("#key-count-price").html());
            for (var i = 0; i <= $(".commodity-city").length; i++) {
                var id = $(".commodity-city").eq(i).attr("id");
                $.ajax({
                    type: "GET",
                    url: "http://localhost/ymatou/php/zero.php?id=" + id,
                    data: {},
                    async: true,
                    dataType: "json",
                    success: function (data) {
                    }
                })
            }
        } else { 
            $(".add-shopping").css({
                "display": "block"
            })
            setTimeout(function () {
                $(".add-shopping").css({
                    "display": "none"
                })
            }, 2000)
        }
    }
})
// 判断是否登录
var n = sessionStorage.name;
// console.log(n);
if (n) {
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
} else {
    console.log(222)
}
// 退出登录
function esc() {
    sessionStorage.removeItem('name')
    $(".us").show();
    $(".head-d").remove()
}