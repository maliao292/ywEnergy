<template>
  <div class="login">
    <div class="logform">
      <h2>欢迎登录！</h2>
      <div>
        <div>
          <div class="companyname">
            <img :src="pic" alt="">
            <span>星洲园区能效分析系统</span>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
            <el-form-item label="用户名" placeholder="请输入用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" placeholder="请输入密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
          </el-form>

          <div class="dologin">
            <el-button type="primary" style="width:100%" @click="dologin('ruleForm')">登录</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { login } from '@/api'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      pic: require('../assets/img/logo.png'),
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.keyupEnter()
  },
  methods: {
    // ...mapMutations(['setUserInfo']),
    dologin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login({
            username: this.ruleForm.username,
            password: this.ruleForm.password,
          }).then(res => {
            console.log(res)
            let type = res.code == 200 ? 'success' : 'error'
            this.$message({ type, message: res.msg })
          })
        }
      })
    },
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13) {
          console.log('enter')
          this.dologin('ruleForm')
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
