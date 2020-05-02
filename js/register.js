var patt1 = /^[0-9]{11}$/;
var patt2 = /^[0-9a-zA-Z]{6,20}$/;
var patt3 = /^[a-zA-Z0-9]{1,}$/;
$("#phone").blur(function(){
    if( $("#phone").val()==""){
        $("#error1").html("请输入您的手机号");
        $(".r-error").eq(0).css("display","block")
    }else if(!(patt1.test($("#phone").val()))){
        $("#error1").html("请输入正确的手机号");
        $(".r-error").eq(0).css("display","block")
    }else{
        $(".r-error").eq(0).css("display","none")
    }
})
$("#password").blur(function(){
    if(!(patt2.test($("#password").val()))){
        $(".r-error").eq(2).css("display","block")
    }else{
        $(".r-error").eq(2).css("display","none")
    }
})
$('#password1').on('blur',function(event){
    if($("#password1").val()!=$("#password").val()){
        $(".r-error").eq(3).css("display","block")
    }else{
        $(".r-error").eq(3).css("display","none")
    }
})
$('#user').blur(function(){
    if($("#user").val()==""){
        $("#error5").html("请输入您的用户名");
        $(".r-error").eq(4).css("display","block")
    }else if(!(patt3.test($("#user").val()))){
        $("#error5").html("当前字段是数组和字母组合");
        $(".r-error").eq(4).css("display","block")
    }else{
        $(".r-error").eq(4).css("display","none")
        
    }
})

function check(){
    // if($("#r-content-from-last").val()==""){
    //     $("#r-content-from-last").val("null")
    // }
    if($('#phone').val()==''){
        return false
    }else if( $(".r-error").eq(0).css("display")=="block"){
        return false
    }else if($("#r-content-from-input").val()==""){
        return false
    }else if( $(".r-error").eq(1).css("display")=="block"){
        return false
    }else if(($('#password').val()=='')){
        return false
    }else if($(".r-error").eq(2).css("display")=="block"){
        return false
    }else if(($('#password1').val()=='')){
        return false
    }else if($(".r-error").eq(3).css("display")=="block"){
        return false
    }else{
        return true;
    }
}


// var num=0;
// $(".r-content-from-one").click(function(){
//     if(num%2==0){
//         $("#password").attr("type","text");
//         $(this).css("background-position","-187px -137px")
//     }else{
//         $("#password").attr("type","password");
//         $(this).css("background-position","80px 102px")
//     }
//     num++;
// })
// var num1=0;
// $(".r-content-from-two").click(function(){
//     if(num1%2==0){
//         $("#password1").attr("type","text");
//         $(this).css("background-position","-187px -137px")
//     }else{
//         $("#password1").attr("type","password");
//         $(this).css("background-position","80px 102px")
       
//     }
//     num1++;
// })
