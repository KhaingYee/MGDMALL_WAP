<template>
  <div style="height:100vh">
    <!-- <keep-alive> -->
            <!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
        <!-- 这里是会被缓存的视图组件 -->  
        <!-- </keep-alive> -->
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      
    }
  },
    created() {
        this.registerMethod();
    },
    methods: {
      registerMethod() {
        this.axios
            .post(this.$httpConfig.getloginMethod)
            .then(res => {
              this.$store.state.loginMethod = res.data.data;
            })
            .catch(error => {
                console.log(error);
            });
      },
    },
}
</script>
