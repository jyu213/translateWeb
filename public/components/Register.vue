<template>
  <div class="xm-wrapper">
    <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="register" ref="registerForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="register.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="register.password" auto-complete="off"></el-input>
        <p class="tips">Tips: 密码为明文存储 -,-</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <router-link to="login" class="tips">已有帐号，点击登录</router-link>
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
      register: {
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
    // authorList: 'getAuthorList'
  }),
  created () {
    // this.$store.dispatch('getAuthorList')
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.register
          this.$store.dispatch('addUser', params).then(() => {
            // @BUG: cannot catch action failed
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push('list')
          }).catch((err) => {
            this.$message.error(`${err}`)
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
