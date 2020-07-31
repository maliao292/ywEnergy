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
            <el-form-item label="用户名" placeholder="请输入用户名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
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
// import { login } from '@/api'
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      pic: require('../assets/img/logo.png'),
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
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
          // login({
          //   loginname: this.ruleForm.name,
          //   password: md5(this.ruleForm.password)
          // }).then(res => {
          //   let type = res.status == 1 ? 'success' : 'error'
          //   this.$message({ type, message: res.info })
          //   if (res.status == 1) {
          //     this.setUserInfo(res)
          //     this.$router.push({ name: 'yct' })
          //   }
          // })
          // this.$message.error('用户名或密码错误');
          // this.$router.push({ name: 'yct' })
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
