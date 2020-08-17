<template>
  <div class="login">
    <div class="logform">
      <p class="logProName">
        <img :src="pic" alt="">
        <span>义乌市源荷储智能集成平台</span>
      </p>
      <div>
        <img :src="factory">
        <div>
          <h3>登录</h3>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
            <el-form-item label="用户名" placeholder="请输入用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" placeholder="请输入密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
          </el-form>

          <div class="dologin">
            <el-button type="primary" style="width:100%" :loading="loging" @click="dologin('ruleForm')">登录</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { login } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      loging:false,
      pic: require('../assets/img/logo.png'),
      factory: require('../assets/img/type.png'),
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.keyupEnter()
  },
  methods: {
    ...mapMutations(['setToken','setUser']),
    dologin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loging = true
          login({
            username: this.ruleForm.username,
            password: this.ruleForm.password,
          }).then((res) => {
            this.setToken(res.headers.authorization)
            this.setUser(this.ruleForm.username)
            res = res.data
            this.loging = false
            let type = res.code == 200 ? 'success' : 'error'
            this.$message({ type, message: res.msg })
            if (res.code == 200) {
              this.$router.push({ name: 'home' })
            }
          })
        }
      })
    },
    keyupEnter() {
      document.onkeydown = (e) => {
        if (e.keyCode === 13) {
          this.dologin('ruleForm')
        }
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/login.css';
</style>
