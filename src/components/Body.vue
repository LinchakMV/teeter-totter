<template>
  <div class="body-wrap">
    <ShapeComponent
      v-for="shape in fallingShapes"
      :key="shape.id"
      :shape="shape"
      :id="`shape-${shape.id}`"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import ShapeComponent from "./ShapeComponent.vue";
export default {
  name: "Body",
  components: { ShapeComponent },
  data() {
    return {
      interval: null,
      shapeLimit: null,
    };
  },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["fallingIntervalGap", "fallingShapes", "isGamePaused"]),
    fallingShapeEl() {
      const { id } = this.fallingShapes[0];
      return document.getElementById(`shape-${id}`);
    },
  },
  mounted() {
    const boardEl = document.querySelector(".teeter-totter-body");
    boardEl.addEventListener("transitionend", this.handleBoardTransitionEnd);
    window.addEventListener("keydown", this.moveFallingShape);
    this.$once("hook:beforeDestroy", () => {
      boardEl.removeEventListener(
        "transitionend",
        this.handleBoardTransitionEnd
      );
      window.removeEventListener("keydown", this.moveFallingShape);
    });
  },
  methods: {
    ...mapMutations([
      "addDroppedShape",
      "generateShape",
      "moveShape",
      "toggleModal",
      "updateFallingIntervalGap",
    ]),
    animateShape() {
      this.interval = setInterval(() => {
        if (this.fallingShapes[0].top >= this.shapeLimit) {
          const droppedShape = this.fallingShapes.shift();
          clearInterval(this.interval);
          this.addDroppedShape(droppedShape);
          this.updateFallingIntervalGap();
          this.generateShape();
          this.animateShape();
        } else {
          this.fallingShapes[0].top += 1;
          this.fallingShapeEl.style.top = `${this.fallingShapes[0].top}px`;
        }
      }, this.fallingIntervalGap);
    },
    getShapeBottomLimit() {
      const boardBounds = document
        .querySelector(".teeter-totter-body")
        .getBoundingClientRect();
      const panelBounds = document
        .querySelector(".controls")
        .getBoundingClientRect();
      const shapeBounds = this.fallingShapeEl.getBoundingClientRect();
      // Similarity of triangles
      const totter = boardBounds.bottom - boardBounds.top - 6;
      const similar = (this.fallingShapes[0].left * totter) / 100;
      if (this.boardBendingAngle >= 0) {
        this.shapeLimit =
          boardBounds.top + similar - shapeBounds.height - panelBounds.height;
        return;
      }

      this.shapeLimit =
        boardBounds.bottom - similar - shapeBounds.height - panelBounds.height;
    },
    async handleBoardTransitionEnd() {
      if (this.isGamePaused) return;
      if (this.isBoardAngleWithinLimits) {
        this.getShapeBottomLimit();
      } else {
        await this.$store.dispatch("toggleSimulation");
        this.toggleModal(true);
      }
    },
    moveFallingShape({ keyCode }) {
      const isArrowKeyPressed = [37, 39].includes(keyCode);
      if (this.isGamePaused || !isArrowKeyPressed) return;
      const shapeWidth = this.fallingShapeEl.getBoundingClientRect().width;
      const areaWidth = document
        .querySelector(".body-wrap")
        .getBoundingClientRect().width;
      this.moveShape({
        moveLeft: keyCode === 37,
        width: (shapeWidth / areaWidth) * 100,
      });
      this.$nextTick(this.getShapeBottomLimit);
    },
  },
  watch: {
    isGamePaused: {
      handler(current) {
        if (current) {
          clearInterval(this.interval);
        } else {
          this.getShapeBottomLimit();
          this.animateShape();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.body-wrap {
  position: relative;
  flex: 1 1 50%;
}
</style>
