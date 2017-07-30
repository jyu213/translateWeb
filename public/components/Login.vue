<template>
  <div class="xm-wrapper">
    <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="login" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="login.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="login.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      labelPosition: 'right',
      login: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      }
    }
  },
  computed: mapGetters({
  }),
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.login
          this.$store.dispatch('login', params).then((data) => {
            console.log('success!!!', data)
            this.$router.push('list')
          }).catch(() => {
            this.$message.error(`登录失败`)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .xm-wrapper{
    margin-top: 6%;
  }
  .tips{
    color: #999;
    font-size: 12px;
  }
</style>
