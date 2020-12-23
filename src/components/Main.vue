<template>
  <main class="main-wrap">
    <Body />
    <TeeterTotter />
  </main>
</template>

<script>
import Body from "./Body.vue";
import TeeterTotter from "./TeeterTotter.vue";
export default {
  components: {
    Body,
    TeeterTotter,
  },
  async created() {
    await this.$store.dispatch("initGame");
  },
};
</script>

<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding-top: 20px;
  padding-bottom: 100px;
  min-width: 600px;
  width: 80%;
  margin: 0 auto;
}
</style>
