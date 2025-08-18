<template>
  <div class="continue-bar">
    <div class="d-flex flex-row-reverse p-3 container">
      <ButtonComponent
        :label="buttonLabel"
        :has-loader="hasLoader"
        data-cy="continueBar"
        @click="onContinue()"
      />
    </div>
  </div>
</template>

<script>
import { ButtonComponent } from "common-lib-vue";

export default {
  name: "ContinueBar",
  components: {
    ButtonComponent: ButtonComponent,
  },
  props: {
    hasLoader: {
      type: Boolean,
      default: false,
    },
    buttonLabel: {
      type: String,
      default: "Continue",
    },
  },
  methods: {
    onContinue() {
      this.$emit("continue");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.continue-bar {
  background-color: #cdd9e4;
  position: sticky;
  bottom: 0;
}
@media print {
  .continue-bar {
    display: none;
  }
}
</style>
