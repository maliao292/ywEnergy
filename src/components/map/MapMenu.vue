<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" background-color="#000710" text-color="#fff" active-text-color="#ffd04b">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="icon iconfont icon-caidan"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu> -->
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.stationName">
            <template slot="title">
              <i class="icon iconfont icon-caidan"></i>
              <span>{{item.stationName}}</span>
            </template>
            <el-menu-item v-for="itemc in item.children" :key="itemc.id" :index="itemc.stationName" @click="changeStation(itemc.stationName)">{{itemc.stationName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapTree } from '@/api'
export default {
  props:{
    stationid:null
  },
  components: {},
  data() {
    return {
      menuList: [],
    }
  },
  watch: {
     stationid() {
        this.getMapTree()
    },
  },
  created() {
    this.getMapTree()
  },

  methods: {
    async getMapTree() {
      let res = await mapTree({userType:this.stationid})
      this.menuList = res.data
    },
    changeStation(s){
      this.$emit('setmarker',{s})
    },
    handleOpen(key, keyPath) {
    },

  },
}
</script>
<style scoped>
.menuList {
  width: 100%;
}
</style>>
  
</style>
