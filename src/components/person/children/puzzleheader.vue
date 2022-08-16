<template>
  <div class="com_head">
    <div class="header">
      <img src="../../../assets/activity/re.png" alt @click="returnBefore" />
      <p class="title">拼团</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    returnBefore() {
      window.history.back();
    }
  }
};
</script>
<style lang="less" scope>
.com_head {
  .header {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    background: #fff;
    img {
      height: 0.5rem;
      width: 0.5rem;
      padding-left: 0.2rem;
    }
    .title {
      font-size: 0.35rem;
      margin: 0 38%;
    }
  }
}
</style>