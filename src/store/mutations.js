import { getRandomColor, getRandomNumber } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";

const mutations = {
  addDroppedShape(state, shape = {}) {
    state.droppedShapes.push(shape);
  },

  clearAllShapeArrs(state) {
    state.droppedShapes = [];
    state.fallingShapes = [];
    state.randomePlacedShapes = [];
  },

  toggleSimulation(state) {
    state.isGamePaused = !state.isGamePaused;
  },

  generateShape(state, randomlyPlaced = false) {
    const weight = getRandomNumber(1, 10 - 1);
    const type = getRandomNumber(1, 2);
    const left = getRandomNumber(0, 40);
    const color = getRandomColor();
    const top = 0;
    const scale = 1 + 0.08 * (weight - 1);
    const id = uuidv4();

    const shape = { id, color, left, scale, top, type, weight };

    if (randomlyPlaced) {
      state.randomePlacedShapes.push(shape);
    } else {
      state.fallingShapes.push(shape);
    }
  },

  moveShape(state, { moveLeft, width }) {
    const shape = state.fallingShapes[0];

    const canMoveLeft = shape.left - 1 >= 0;
    const canMoveRight = shape.left + width + 1 <= 45;

    if (moveLeft) {
      canMoveLeft && shape.left--;
    } else {
      canMoveRight && shape.left++;
    }
  },

  toggleModal(state, isShown = false) {
    state.isModalShown = isShown;
  },

  updateFallingIntervalGap(state, reset = false) {
    if (reset) {
      state.fallingIntervalGap = 10;
    } else if (state.fallingIntervalGap > 5) {
      state.fallingIntervalGap--;
    }
  },
};

export default mutations;
