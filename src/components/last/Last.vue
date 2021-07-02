<template>
  <div>
      <div class="box1">
          <last-left></last-left>
          <last-right></last-right>
      </div>
  </div>
</template>

<script>
import LastLeft from '../last/lastLeft/lastLeft.vue'
import LastRight from '../last/lastright/lastRight'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {
    LastLeft,
    LastRight

  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.box1{
    display: flex;
}

</style>