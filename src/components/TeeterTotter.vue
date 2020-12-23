<template>
  <div class="teeter-totter">
    <div class="teeter-totter-body" :style="boardStyles">
      <ShapeComponent
        v-for="shape in droppedShapes"
        :key="shape.id"
        :shape="shape"
        on-board
      />
      <ShapeComponent
        v-for="shape in randomePlacedShapes"
        :key="shape.id"
        :shape="shape"
        on-board
        isRandom
      />
    </div>

    <div class="teeter-totter-footer"></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import ShapeComponent from "./ShapeComponent.vue";
export default {
  name: "TeeterTotter",
  components: { ShapeComponent },
  methods: {
    ...mapMutations(["generateShape"]),
  },
  computed: {
    ...mapState(["droppedShapes", "randomePlacedShapes"]),
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    boardStyles() {
      return {
        transform: `rotate(${this.boardBendingAngle / 2}deg)`,
        height: "6px",
      };
    },
    shapesDiff() {
      return this.droppedShapes.length - this.randomePlacedShapes.length;
    },
  },
  watch: {
    shapesDiff(current) {
      if (current && this.isBoardAngleWithinLimits) {
        this.generateShape(true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.teeter-totter {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.teeter-totter-body {
  position: relative;
  width: 100%;
  background-color: #d74545;
  transition: 300ms ease-in-out;
}
.teeter-totter-footer {
  width: 0;
  height: 0;
  border-left: 48px solid transparent;
  border-right: 48px solid transparent;
  border-bottom: 128px solid #9b9b9b;
}
</style>
