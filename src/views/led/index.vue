<template>
  <div id="led">
    <a-row class="title">
      <a-col :span="24">
        <span>{{ title }}</span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="10" :offset="9" class="time">
        <Clock ref="clock"></Clock>
        <div>&emsp; &emsp;厂区共{{ totalOnlineNum }}人</div>
      </a-col>
    </a-row>

    <vue-seamless-scroll class="content" :data="onlineStaffList" :class-option="classOption">
      <div v-for="(item, index) in onlineStaffList" :key="index">
        <a-row>
          <a-col :span="12" class="subTitle">{{ item.companyName }} ({{ item.totalNum }}人)</a-col>
        </a-row>
        <div v-for="(dept, deptIndex) in item.deptStaffList" :key="deptIndex" class="staff">
          <a-row>
            <a-col :span="5" class="subTitle">{{ dept.deptName }} ({{ dept.totalNum }}人)</a-col>
          </a-row>
          <a-row type="flex">
            <a-col v-for="(staff, staffIndex) in dept.staffs" :key="staffIndex" :span="2" style="font-size: 18px;">
              <p>{{ staff }}</p>
            </a-col>
          </a-row>

        </div>
      </div>
    </vue-seamless-scroll>

  </div>
</template>


<script>
import Clock from '@/components/clock'
import {createSocket} from '@sven0706/websocket'
import {getOnlineData} from '@/api/led'

export default {
  name: 'Led',
  components: {
    Clock
  },
  data() {
    return {
      classOption: {
        // 鼠标悬停是否停止
        hoverStop: false,
        // 滚动速度，越小越慢
        step: 0.8,
        // 开始滚动条数
        limitMoveNum: 1
      },
      title: 'XXX公司',
      totalOnlineNum: 3680,
      onlineStaffList:
          [
            {
              companyId: 1,
              companyName: 'A公司',
              totalNum: 1300,
              deptStaffList: [
                {
                  deptId: 11,
                  deptName: '生产技术科科办',
                  totalNum: 13,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                },
                {
                  deptId: 12,
                  deptName: '质量管理科运行班',
                  totalNum: 26,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华',
                    '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                }
              ]
            },
            {
              companyId: 2,
              companyName: 'B公司',
              totalNum: 230,
              deptStaffList: [
                {
                  deptId: 11,
                  deptName: '生产技术',
                  totalNum: 13,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                },
                {
                  deptId: 12,
                  deptName: '质量管理科运行班',
                  totalNum: 26,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华',
                    '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                }
              ]


            },
            {
              companyId: 2,
              companyName: 'C公司',
              totalNum: 230,
              deptStaffList: [
                {
                  deptId: 11,
                  deptName: '生产技术',
                  totalNum: 13,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                },
                {
                  deptId: 12,
                  deptName: '质量管理科运行班',
                  totalNum: 26,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华',
                    '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                },
                {
                  deptId: 12,
                  deptName: '质量管理科运行班',
                  totalNum: 26,
                  staffs: ['徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华',
                    '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华', '徐振华']
                }
              ]
            },
          ],
    }
  },
  mounted() {
    this.$refs.clock.start()
    createSocket(process.env.VUE_APP_WS_URL)
    this.receive()
  },
  methods: {
    receive() {
      const getSocketData = e => { // 创建接收消息函数
        const data = e && e.detail.data
      }
      window.addEventListener('onmessageWS', getSocketData) // 注册监听事件
    },
    // 定时取统计数据
    getData(){
      getOnlineData()
    }
  }
}
</script>

<style lang="less" scoped>
#led {
  color: red;
}

#led .title {
  padding-top: 20px;
  letter-spacing: 5px;
  font-weight: bold;
  font-size: 30px;
}

#led .time {
  display: inline-flex;
  text-decoration: underline;
  font-weight: bold;
  font-size: 23px;
}

#led .content {
  margin: 0 auto;
  overflow: hidden;
  height: 750px;
}

.subTitle {
  font-size: 18px;
  font-weight: bold
}

.staff {
  margin-left: 20%;
  margin-right: 20%
}


</style>
