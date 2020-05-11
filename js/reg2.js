let zh = /^[a-z0-9A-Z_-]{4,16}$/;
let mm = /^[a-z0-9_-]{6,18}$/;


let S = [0, 0, 0];

$("#name").blur(function () {
    if ($(this).val() == "") {
        alert("请输入账号");
        return
    }

    if (zh.test($(this).val())) {
        $(this).next("span").css("color", "green");
        $(this).next("span").html("√");

        $.get("./php/reg2.php", { name: `${$(this).val()}` }, (a) => {
            if (a == 1) {
                $(this).next("span").css("color", "red");
                $(this).next("span").html("该用户名已存在！");
                S[0] = 0;
            } else if (a == 0) {
                $(this).next("span").html("√");
                S[0] = 1;
            }
        })
    } else {
        $(this).next("span").css("color", "red");
        $(this).next("span").html("×");
        S[0] = 0;
    }
});
$("#name").focus(function () {
    S[0] = 0;
});
$("#password").focus(function () {
    S[1] = 0;
});
$("#passwords").focus(function () {
    S[2] = 0;
});

$("#password").blur(function () {
    if ($(this).val() == "") {
        alert("请输入密码");
        return
    }

    if (mm.test($(this).val())) {
        $(this).next("span").css("color", "green");
        $(this).next("span").html("√");
        S[1] = 1;
    } else {
        $(this).next("span").css("color", "red");
        $(this).next("span").html("×");
        S[1] = 0;
    }

});

$("#passwords").blur(function () {
    if ($(this).val() == "") {
        alert("请输入密码");
        return
    }
    if ($(this).val() == $("#password").val() && $(this).val() != "") {
        $(this).next("span").css("color", "green");
        $(this).next("span").html("√");
        S[2] = 1;
    } else {
        $(this).next("span").css("color", "red");
        $(this).next("span").html("两次密码不一致！");
        S[2] = 0;
    }
});

$("#zc").click(function () {

    if (S[0] == 1 && S[1] == 1) {

        if ($("#password").val() == $("#passwords").val()) {

            $.post("./php/reg02.php", {
                name: `${$("#name").val()}`,
                password: `${$("#password").val()}`
            }, function (a) {
                if (a == 1) {
                    $("#name").val("");
                    $("#name").next().html("");
                    $("#password").val("");
                    $("#password").next().html("");
                    $("#passwords").val("");
                    $("#passwords").next().html("");

                    let q = confirm("注册成功，去登录？");
                    if (q) {
                        open("./reg1.html");
                    }
                } else {
                    alert("服务器出错啦！！！！")
                }
            });

        } else {
            $("#passwords").next("span").css("color", "red");
            $("#passwords").next("span").html("两次密码不一致！");
        }
    } else {
        console.log("注册失败");
    }


});
