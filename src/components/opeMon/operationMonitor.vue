<template>
  <div class="modelContent">
    <div class="modelCon_left">
      <ul class="modelConLeftUl">
        <li class="monitorIcon monitorIconActive">
          <router-link tag="div" to='cellAndAir'>
            <img src="@/assets/img/opeMon/powerIcon_active.png" alt="">
          </router-link>
        </li>
        <li class="monitorIcon">
          <router-link tag="div" to='loadAnalyze'>
            <img src="@/assets/img/opeMon/analyzeIcon.png" alt="">
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
    name: "operationMonitor"
  }
</script>

<style scoped>

</style>
