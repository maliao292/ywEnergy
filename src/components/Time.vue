<template>
 <span class='time'>{{times}}</span>
</template>

<script>
export default {
  data () {
    return {
      times: ''
    }
  },
  mounted() {
    this.newtime()
     setInterval(() => { this.newtime() }, 1000)
  },
  methods: {
     newtime() {
      var date = new Date()
      function timeAdd0(str) {
        if (str < 10) {
          str = '0' + str;
        }
        return str
      }
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mm = date.getMinutes();
      var s = date.getSeconds();
      this.times = y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  color: #cccccc;
}
</style>
