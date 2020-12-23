import { MAX_BENDING_ANGLE, MIN_BENDING_ANGLE } from "../utils/constants";
import { getProportionShapes } from "../utils/helpers";

const getters = {
  boardBendingAngle(state, { droppedShapesSum, randomShapesSum }) {
    let angle = 0;

    if (!droppedShapesSum) {
      angle = MAX_BENDING_ANGLE;
    } else {
      const subtraction = Math.abs(droppedShapesSum - randomShapesSum);

      if (droppedShapesSum > randomShapesSum) {
        angle = (subtraction / droppedShapesSum) * -50;
      } else {
        angle = (subtraction / randomShapesSum) * 50;
      }
    }

    return angle;
  },

  droppedShapesSum({ droppedShapes }) {
    return getProportionShapes(droppedShapes, true);
  },

  isBoardAngleWithinLimits(state, { boardBendingAngle }) {
    return (
      boardBendingAngle > MIN_BENDING_ANGLE &&
      boardBendingAngle < MAX_BENDING_ANGLE
    );
  },

  randomShapesSum({ randomePlacedShapes }) {
    return getProportionShapes(randomePlacedShapes);
  },
};

export default getters;
