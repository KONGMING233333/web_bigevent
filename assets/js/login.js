$(function () {
  // 点击“去注册账号”按钮
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击“去登录”按钮
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  //从layui 中获取form 对象
  var form = layui.form
  var layer = layui.layer
  //通过 form.verify()函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //阻止提交事件
    e.preventDefault()
    //发起ajax请求
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录')
        //模拟人的点击行为
        $('#link_login').click()
      })
  })

  //监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    var data2 = { username: $('#form_login [name=title]').val(), password: $('#form_login [name=password]').val() }
    $.ajax({
      url: '/api/login',
      method: 'POST',
      //快速获取表单数据
      data: data2,
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          console.log(res.message)
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        localStorage.setItem('token', res.token)
        //跳转后台主页
        location.href = '/index.html'
      }
    })
  })
})