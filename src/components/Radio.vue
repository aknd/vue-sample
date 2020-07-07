<template>
  <div class="radio-group">
    <div v-for="option in options" :key="option.value" class="radio">
      <div>{{ option.label }}</div>
      <input
        type="radio"
        :value="option.value"
        :checked="option.value === value"
        v-model="localValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RadioOption } from './proptypes'

@Component
export default class Radio extends Vue {
  @Prop() options!: RadioOption[]
  @Prop() value!: string

  get localValue(): string {
    return this.value
  }

  set localValue(v: string) {
    this.$emit('input', v)
  }
}
</script>

<style scoped>
.radio-group {
  display: flex;
  justify-content: center;
  margin: 1em 0;
  padding: 0;
}
.radio {
  width: 100px;
}
</style>
