<template>
  <div>
      <div class="box">
          <mid-left></mid-left>
          <mid-mid></mid-mid>
          <mid-right></mid-right>
      </div>
  </div>
</template>

<script>
import MidLeft from './midLeft/midLeft.vue'
import MidMid from './midmid/MidMid.vue'
import MidRight from './midRight/midRight.vue'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {MidLeft, MidMid, MidRight},
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.box{
    display: flex;
}
</style>