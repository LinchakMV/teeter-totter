<template>
  <div id="app" data-app>
    <Controls />
    <Main />
    <Modal />
  </div>
</template>

<script>
import Main from "./components/Main";
import Modal from "./components/Modal";
import Controls from "./components/Controls";

export default {
  components: {
    Controls,
    Main,
    Modal,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
html {
  overflow-y: auto !important;
}
#app {
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
