const actions = {
  initGame({ commit, state }) {
    if (!state.isGamePaused) {
      commit("toggleSimulation");
    }
    if (state.isModalShown) {
      commit("toggleModal");
    }

    commit("updateFallingIntervalGap", true);
    commit("clearAllShapeArrs");

    // Generates shapes for user
    commit("generateShape");
    commit("generateShape");

    // Generates shape on the right side
    commit("generateShape", true);
  },

  toggleSimulation({ commit }) {
    commit("toggleSimulation");
  },

  toggleModal({ commit }) {
    commit("toggleModal");
  },
};

export default actions;
