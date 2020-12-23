<template>
  <div class="text-center">
    <v-dialog v-model="isModalShown" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Game Over!
        </v-card-title>
        <v-card-text>
          Is out of balance
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onClickTryAgain">
            Try again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    async onClickTryAgain() {
      await this.$store.dispatch("initGame");
    },
  },
  computed: {
    isModalShown() {
      return this.$store.state.isModalShown;
    },
  },
};
</script>
