<template>
  <div class="home" ref="home">
      <div @click="incrementBy(100)">
          Add
          {{$store.state.count}}
      </div>
     </div>
</template>
<script>

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "home",
  data() {
    return {
      inc: null
    };
  },
  computed: {
    
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {

        ...mapActions([
          'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
        ])
  },
  destroyed() {

  },
  updated() {
    
  }
};
</script>
<style lang="less" scoped>

</style>