<template>
  <div class="shape" :class="shapeClasses">
    <div class="shape-weight">{{ shape.weight }} kg</div>
  </div>
</template>

<script>
import { CIRCLE, TRIANGLE, SQUARE } from "../utils/constants";
export default {
  name: "ShapeComponent",
  props: {
    onBoard: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: Object,
      required: true,
    },
    isRandom: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.setAppearance();
    this.$watch("shape.left", this.setShapePosition, { immediate: true });
  },
  methods: {
    setAppearance() {
      const { style } = this.$el;
      const { color, scale, type } = this.shape;
      if (type === TRIANGLE) {
        style.borderBottomColor = color;
      } else {
        style.backgroundColor = color;
      }
      style.transform = `scale(${scale})`;
      if (this.onBoard) {
        style.transform += " translateY(-100%)";
      }
    },
    setShapePosition(left) {
      const { width } = this.$el.getBoundingClientRect();
      const start = this.isRandom ? 60 : 0;
      if (this.isRandom && left > 25) {
        this.$el.style.left = `calc(${start + left}% - ${width}px)`;
        return;
      }

      this.$el.style.left = `${start + left}%`;
    },
  },
  computed: {
    shapeClasses() {
      const { type } = this.shape;
      return {
        "shape-circle": type === CIRCLE,
        "shape-triangle": type === TRIANGLE,
        "shape-square": type === SQUARE,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top left;
  .shape-weight {
    font-size: 10px;
    font-weight: 500;
    color: #fff;
  }
}
.shape-square,
.shape-circle {
  width: 36px;
  height: 36px;
}
.shape-circle {
  border-radius: 50%;
}
.shape-triangle {
  width: 0;
  height: 0;
  border-left: 24px solid transparent;
  border-right: 24px solid transparent;
  border-bottom: 32px solid;
  .shape-weight {
    position: absolute;
    top: calc(100% + 16px);
    width: 72px;
    text-align: center;
  }
}
</style>
