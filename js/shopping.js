
function skip(id) {
    window.open("http://localhost/ymatou/detail.html?id=" + id);
}
$.ajax({
    type: "GET",
    url: "http://localhost/ymatou/php/x2.php",
    data: {},
    dataType: "json",
    async: true,
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#commodity").get(0).innerHTML += `
                    <li class="lists" onclick="skip(${data[i].id})">
                    <img src=${data[i].url} title=${data[i].name}>
                    <span>${data[i].name}</span>
                    <p class="price">￥${data[i].price}元</p>
                    </li>
            `;
        }
    }
})
// 购物车里面的商品显示
$.ajax({
    type: "GET",
    url: "http://localhost/ymatou/php/gain.php",
    data: {},
    dataType: "json",
    success: function (data) {
        if (data.length > 0) {
            block_cart();
            for (var i = 0; i < data.length; i++) {
                var str = data[i].type.split(" ");
                $("#cart_gain").get(0).innerHTML += `
                <div class="selectDel">
                    <div class="table_city">
                        <span class="span1"><input type="checkbox" class="checkbox2" name="all"></span>
                        <span class="table_head"> <img src=${data[i].head}></span>
                        <span>${data[i].headName}</span>
                        <span class="table_head"><img src=${data[i].city_img}></span>
                        <span>${data[i].city}</span>
                        <span class="xinxi"><img src="img/inform.svg"></span>
                    </div>
                    <div class="table_list">
                        <input type="checkbox" class="checkbox3">
                        <span class="list_img clearfix">
                            <p>
                                <img src=${data[i].url}>
                            </p>
                            <p class="fade_name">
                                <i class="fade">包邮包退</i>
                                <span>${data[i].name}<span>    
                            </p>
                            <p class="list_img_p3">
                                <i>类型分类:</i>
                                <span>${str[0]}/</span>
                                <span>${str[1]}</span>
                            <p>
                            <p class="pin">
                                <span><img src="img/baoyou.svg">拼邮</span>    
                                <span><img src="img/ben.svg">本土退货</span>    
                            </p>
                        </span>
                            <p class="cart-price">${data[i].price}</p>
                            <p class="cart-num">
                                <span class="cart-reduce">-</span>
                                <span class="amount">1</span>
                                <span class="cart-add">+</span>
                            </p>
                            <p class="now-price">${data[i].price}</p>
                            <p class="del" id=${data[i].id}>删除</p>
               </div>
            `;
            }
        } else {
            none_cart()
        };
        $(".checkbox1,.checkbox4").prop("checked", false);
        // 购车车login显示与影藏
        function none_cart() {
            $(".cart_img").css({
                "display": "block"
            });
            $(".account,.cart_p1-title").css({
                "display": "none"
            });
        }
        function block_cart() {
            $(".cart_img").css({
                "display": "none"
            });
            $(".account,.cart_p1-title").css({
                "display": "block"
            });
        }
        // 点击删除并且修改数据库中的字段值
        $(".del").click(function () {
            $(this).parent().parent().remove();
            var id = $(this).attr("id");
            $.ajax({
                type: "GET",
                url: "http://localhost/ymatou/php/del.php?id=" + id,
                data: {},
                dataType: "json",
                async: true,
                success: function (data) {
                    console.log(data)
                }
            });
            if ($(".del").length <= 0) {
                none_cart();
            }
            selectAll()
            if ($(".checkbox2").prop("checked")) {
                $(".close-count").css({
                    "background": "#c33"
                })
            } else {
                $(".close-count").css({
                    "background": "#cecece"
                })
            };
            // 点击删除商品数量每次减
            $("#font-num").html($(".table_list").length)
            // 最终价格
            final_price()
            // 点击删除操作选中数量的变化
            var selectdel = 0
            for (var i = 0; i < $(".table_list").length; i++) {
                if ($(".checkbox2").eq(i).prop("checked")) {
                    selectdel++;
                }
                $("#select-num").html(selectdel)
            }
        })
        // 商品数量
        $("#font-num").html($(".table_list").length)
        // 点击增加、减少数量操作
        $(".cart-add").click(function () {
            var num_count = 0;
            var add = $(this).prev().html()
            add++;
            $(this).prev().html(add);
            $(this).parent().next().html(($(this).prev().html()) * $(this).parent().prev().html() + ".00");
            final_price();
            // console.log($(this).parent().parent().children(":first").prop("checked"));
            if ($(this).parent().parent().children(":first").prop("checked")) {
                $(".em-count").html(parseInt($(this).prev().html()) * parseInt($(this).parent().prev().html()) + ".00")
            }
            for (var i = 0; i < $(".table_list").length; i++) {
                if ($(".checkbox2").eq(i).prop("checked")) {
                    num_count = num_count + parseInt($(".now-price").eq(i).html() + ".00")
                }
                $(".em-count").html(num_count + ".00")
            }
        });
        $(".cart-reduce").click(function () {
            var num_count = 0;
            var reducenum = $(this).next().html()
            reducenum--;
            if (reducenum <= 1) {
                reducenum = 1;
            }
            $(this).next().html(reducenum);
            $(this).parent().next().html(($(this).next().html()) * $(this).parent().prev().html() + ".00");
            final_price()
            if ($(this).parent().parent().children(":first").prop("checked")) {
                $(".em-count").html(parseInt($(this).next().html()) * parseInt($(this).parent().prev().html()) + ".00")
            }
            for (var i = 0; i < $(".table_list").length; i++) {
                if ($(".checkbox2").eq(i).prop("checked")) {
                    num_count = num_count + parseInt($(".now-price").eq(i).html() + ".00")
                }
                $(".em-count").html(num_count + ".00")
            }
        });
        // 复选框
        $(".checkbox2").click(function () {
            if ($(this).prop("checked")) {
                $(this).parent().parent().next().children(":first").prop("checked", true)
                $(".close-count").css({
                    "background": "#c33"
                })
                $(this).parent().parent().next().css({
                    "background-color": "rgba(0,0,0,.05)"
                });
                $(".em-count").html(parseInt($(".em-count").html()) + parseInt($(this).parent().parent().next().children().eq(4).html()) + ".00");
            } else {
                $(this).parent().parent().next().children(":first").prop("checked", false)
                $(".close-count").css({
                    "background": "#cecece"
                });
                $(this).parent().parent().next().css({
                    "background-color": "white"
                });
                $(".em-count").html(parseInt($(".em-count").html()) - parseInt($(this).parent().parent().next().children().eq(4).html()) + ".00");
            }
            // 全选操作
            selectAll()
            // 点击实现结算框的高亮
            close_col();
            // 选中商品数量及选中商品价钱
            click_count();
            //    点击删除选中
            selDel()
        });
        //根据复选框的状态计算选中数量
        function click_count() {
            var count = 0;
            var price = 0;
            for (var i = 0; i < $(".selectDel").length; i++) {
                if ($(".checkbox2").eq(i).prop("checked")) {
                    count++;
                    $("#select-num").html(count);
                } else {
                    $("#select-num").html(count);
                }
            }
        }
        // 点击实现结算框的高亮
        function close_col() {
            for (var i = 0; i < $(".checkbox2").length; i++) {
                if ($(".checkbox2").eq(i).prop("checked")) {
                    $(".close-count").css({
                        "background": "#c33"
                    })
                }
            }
        }
        $(".checkbox3").click(function () {
            if ($(this).prop("checked")) {
                $(this).parent().prev().children(":first").children(":first").prop("checked", true);
                $(".close-count").css({
                    "background": "#c33"
                })
                $(this).parent().css({
                    "background-color": "rgba(0,0,0,.05)"
                })
                $(".em-count").html(parseInt($(".em-count").html()) + parseInt($(this).parent().children().eq(4).html()) + ".00")
            } else {
                $(this).parent().prev().children(":first").children(":first").prop("checked", false)
                $(".close-count").css({
                    "background": "#cecece"
                })
                $(this).parent().css({
                    "background-color": "white"
                })
                $(".em-count").html(parseInt($(".em-count").html()) - parseInt($(this).parent().children().eq(4).html()) + ".00")
            }
            // 全选操作
            selectAll()
            // 点击实现结算框的高亮
            close_col();
            // 选中商品数量及选中商品价钱
            click_count();
            //    点击删除选中
            selDel()
        });
        // 全选框
        $(".checkbox1").click(function () {
            if ($(".checkbox1").prop("checked")) {
                $(".checkbox4,.checkbox2,.checkbox3").prop("checked", true);
                $(".close-count").css({
                    "background": "#c33"
                })
                $("#select-num").html($(".table_list").length);
                $(".table_list").css({
                    "background": "rgba(0,0,0,.05)"
                });
            } else {
                $(".checkbox4,.checkbox2,.checkbox3").prop("checked", false);
                $(".close-count").css({
                    "background": "#cecece"
                })
                $("#select-num").html(0);
                $(".table_list").css({
                    "background": "white"
                })
            }

            // 最终价格
            final_price();
            // 点击全选然后点击删除选中按钮删除全部商品
            selectAllDel()
        })
        // 最终价格
        function final_price() {
            if ($(".checkbox1").prop("checked")) {
                var a = 0;
                for (var i = 0; i < $(".selectDel").length; i++) {
                    var a = a + parseInt($(".now-price").eq(i).html());
                }
                $(".em-count").html(a + ".00")
            } else {
                $(".em-count").html("0.00")
            }
        }
        $(".checkbox4").click(function () {
            if ($(".checkbox4").prop("checked")) {
                $(".checkbox1,.checkbox2,.checkbox3").prop("checked", true)
                $(".close-count").css({
                    "background": "#c33"
                });
                $(".table_list").css({
                    "background": "rgba(0,0,0,.05)"
                })
                $("#select-num").html($(".table_list").length);

            } else {
                $(".checkbox1,.checkbox2,.checkbox3").prop("checked", false)
                $(".close-count").css({
                    "background": "#cecece"
                })
                $("#select-num").html(0);
                $(".table_list").css({
                    "background": "white"
                })
            }
            // 最终价格
            final_price();
            // 点击全选然后点击删除选中按钮删除全部商品
            selectAllDel();
        });
        //全选删除
        function selectAllDel() {
            // 点击全选然后点击删除选中按钮删除全部商品
            $(".del-opt").click(function () {
                if ($(".checkbox4").prop("checked")) {
                    for (var i = 0; i < $(".table_list").length; i++) {
                        var id = $(".del").eq(i).attr("id");
                        $.ajax({
                            type: "GET",
                            url: "http://localhost/ymatou/php/del.php?id=" + id,
                            data: {},
                            dataType: "json",
                            async: true,
                            success: function (data) {
                                console.log(data)
                            }
                        });
                    }
                    $(this).parent().parent().remove()
                    none_cart();
                    $("#font-num").html($(".table_list").length);
                }
            })
        }
        // 点击删除选中
        function selDel() {
            $(".del-opt").click(function () {
                for (var i = 0; i < $(".table_list").length; i++) {
                    if ($(".checkbox2").eq(i).prop("checked")) {
                        var id = $(".del").eq(i).attr("id")
                        $.ajax({
                            type: "GET",
                            url: "http://localhost/ymatou/php/zero.php?id=" + id,
                            data: {},
                            async: true,
                            dataType: "json",
                            success: function (data) {
                            }
                        })
                        $(".checkbox2").eq(i).parent().parent().parent().remove();
                    }
                };
                $("#font-num").html($(".table_list").length);
                if ($(".checkbox1").prop("checked")) {
                    none_cart()
                };
                click_count();
                $(".em-count").html("0.00")
            })
        }
        // 实现全选功能

        function selectAll() {
            var conut = 0;
            for (var i = 0; i < $(".checkbox2").length; i++) {
                if ($(".checkbox2").eq(i).prop("checked")) {
                    conut++;
                }
                if (conut < $(".checkbox2").length) {
                    $(".checkbox1").prop("checked", false)
                    $(".checkbox4").prop("checked", false)
                }
                else {
                    $(".checkbox1").prop("checked", true)
                    $(".checkbox4").prop("checked", true)
                }
            }
        };
    }
})
// 点击结算跳转
$(".close-count").click(function () {
    for (var i = 0; i < $(".checkbox2").length; i++) {
        if ($(".checkbox2").eq(i).prop("checked")) {
            var id = $(".del").eq(i).attr("id")
            location.href = "http://localhost/ymatou/checkout.html";
            $.ajax({
                type: "GET",
                url: "http://localhost/ymatou/php/account.php?id=" + id,
                data: {},
                async: true,
                dataType: "json",
                success: function (data) {
                }
            })
        }
    }
})