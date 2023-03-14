$(function () {
    //调用getUserInfo获取用户基本信息
    getUserInfo()


    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储中的 token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });
    })
})
//获取用户的基础信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //无论成功或失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('执行了回调');
        //     // console.log(res);
        //     //在complete回调函数中，可以调用
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空token
        //         console.log('ok');
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }

    })
}

//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;' + name)
    //3.按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1渲染用户头像
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        //将文本的第一个字母转化为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}