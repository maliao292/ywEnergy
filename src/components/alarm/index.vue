<template>
  <div class="modelContent">
    <div class="modelCon_left">
      <ul class="modelConLeftUl">
        <li class="monitorIcon">
          <router-link tag="div" to='/home/alarm/alarmSearch'>
            <span class="backOne backTwoIcon_report"></span>
          </router-link>
        </li>
        <li class="monitorIcon">
          <router-link tag="div" to='/home/alarm/alarmConfiguration'>
            <span class="backOne backOneIcon_report"></span>
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

</style>
