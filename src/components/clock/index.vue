<template>
  <div>{{ timeStr }}</div>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      timeStr: ''
    }
  },
  methods: {
    //判断时间是否为个位数，如果时间为个位数就在时间之前补上一个“0”
    check(val) {
      if (val < 10) {
        return ('0' + val)
      } else {
        return (val)
      }
    },
    displayTime() {
      //获取系统当前的年、月、日、小时、分钟、毫秒
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minutes = date.getMinutes()
      const second = date.getSeconds()
      this.timeStr = year + '年' + month + '月' + day + '日  ' + this.check(hour)
          + ':' + this.check(minutes) + ':' + this.check(second)
    },

    //每隔1秒调用一次displayTime函数
    start() {
      window.setInterval(this.displayTime, 1000)//单位是毫秒
    }

  }
}
</script>

<style scoped>

</style>
