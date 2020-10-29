<template>
  <div class="modelContent">
    <div class="modelCon_left">
      <ul class="modelConLeftUl">
        <li class="monitorIcon">
          <router-link tag="div" to='/home/system/user'>
            <span class="icon iconfont icon-yonghuguanli iconStyle"></span>
          </router-link>
        </li>
        <li class="monitorIcon">
          <router-link tag="div" to='/home/system/role'>
            <span class="icon iconfont icon-yonghuguanli iconStyle"></span>
          </router-link>
        </li>
        <li class="monitorIcon">
          <router-link tag="div" to='/home/system/menu'>
            <span class="icon iconfont icon-yonghuguanli iconStyle"></span>
          </router-link>
        </li>
        <li class="monitorIcon">
          <router-link tag="div" to='/home/system/dict'>
            <span class="icon iconfont icon-yonghuguanli iconStyle"></span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="modelCon_right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "report"
  }
</script>

<style scoped>
  .iconStyle{
    color: rgb(173,187,200);
  }
  .active .iconStyle{
    color: rgb(66,140,229);
  }
</style>
