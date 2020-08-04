<template>
  <div class="modelContent">
    <div class="modelCon_left">
      <ul class="modelConLeftUl">
        <li class="monitorIcon">
          <router-link tag="div" to='reportTable'>
            <!--<img src="@/assets/img/opeMon/powerIcon_active.png" alt="">-->
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
