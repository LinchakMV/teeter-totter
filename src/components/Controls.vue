<template>
  <div class="">
    <v-app-bar
      flat
      dense
      class="d-flex justify-space-between mb-6 controls"
      height="60"
    >
      <div class="shapes-stats">
        <div>
          Total weight:
          <span class="shapes-stats-weight">
            {{ this.getTotalWeight(this.droppedShapes) }} kg
          </span>
        </div>
        <div>
          Current:
          <span class="shapes-stats-weight">
            {{ fallingShapes[0] && fallingShapes[0].weight }} kg
          </span>
        </div>
      </div>
      <div>
        <v-btn id="play-btn" class="controls-btn" @click="onClickPlay">
          {{ isGamePaused ? "play" : "pause" }}
        </v-btn>
        <v-btn
          class="controls-btn"
          type="is-success"
          size="is-medium"
          icon-left="refresh"
          tabindex="-1"
          @click="onClickInit"
          outlined
        >
          Restart game
        </v-btn>
      </div>
      <div class="shapes-stats">
        <div>
          Total weight:
          <span class="shapes-stats-weight">
            {{ this.getTotalWeight(this.randomePlacedShapes) }} kg
          </span>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    window.addEventListener("keydown", this.handleSpaceClick);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleSpaceClick);
  },
  methods: {
    getTotalWeight(shapes = []) {
      return shapes.reduce((total, current) => (total += current.weight), 0);
    },
    async onClickPlay(e) {
      e.preventDefault();
      await this.$store.dispatch("toggleSimulation");
    },
    async onClickInit(e) {
      e.preventDefault();
      await this.$store.dispatch("initGame");
    },
    async handleSpaceClick(event) {
      event.preventDefault();
      if (event.keyCode === 32 && !this.isModalShown) {
        await this.$store.dispatch("toggleSimulation");
      }
    },
  },
  computed: {
    ...mapState([
      "droppedShapes",
      "fallingShapes",
      "isGamePaused",
      "isModalShown",
      "randomePlacedShapes",
    ]),
  },
};
</script>
<style lang="scss">
.v-toolbar__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: -10px;
}
</style>
<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  flex: 0 0 96px;
  padding: 8px 24px;
}
.controls-btn {
  transition: 300ms ease-out;
  outline: none;
  &:first-of-type {
    margin-right: 8px;
  }
}
.shapes-stats {
  font-size: 14px;
}
.shapes-stats-weight {
  font-size: 16px;
  font-weight: 500;
}
</style>
