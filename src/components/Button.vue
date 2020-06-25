<template>
  <button :disabled="isDisabled" @click="handleClick" class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop() disabled?: boolean

  get isDisabled(): boolean {
    if (_.isUndefined(this.disabled)) {
      return false
    }
    return this.disabled
  }

  handleClick(_event: Event) {
    this.$emit('action')
  }
}
</script>

<style scoped>
.button {
  width: 300px;
  margin: auto;
  padding: 20px;
  background-color: aqua;
}
.button[disabled] {
  color: white;
  background-color: gray;
}
</style>
